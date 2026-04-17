<script>
	import { onMount } from 'svelte';
	import { PUBLIC_WDR_SUPABASE_URL, PUBLIC_WDR_SUPABASE_ANON_KEY } from '$env/static/public';
	import content from './week_day_rating_content.json';
	import TextInput from '$lib/assets/components/form__components/text_input.svelte';
	import SubmitButton from '$lib/assets/components/form__components/submit_button.svelte';

	let { data } = $props();

	const SESSION_KEY = 'wdr_code';

	// Build the full 0–10 scale, overlaying any labels defined in Sanity
	const labelMap = $derived(
		Object.fromEntries((data.ratingLabels ?? []).map((r) => [String(r.value), r.label]))
	);

	const ratingOptions = $derived(
		Array.from({length: 11}, (_, i) => {
			const value = String(10 - i);
			return { id: `rating_${value}`, value, marker: value, label: labelMap[value] ?? '' };
		})
	);

	const VERIFY_ENDPOINT = `${PUBLIC_WDR_SUPABASE_URL}/functions/v1/verify_session`;
	const SUBMIT_ENDPOINT = `${PUBLIC_WDR_SUPABASE_URL}/functions/v1/collection_n_auth`;

	const supabaseHeaders = {
		'Content-Type': 'application/json',
		apikey: PUBLIC_WDR_SUPABASE_ANON_KEY,
		Authorization: `Bearer ${PUBLIC_WDR_SUPABASE_ANON_KEY}`
	};

	let view = $state('loading'); // loading | code | rating | success
	let responder = $state(null);
	let selectedRating = $state(null);
	let error = $state('');
	let submitting = $state(false);

	async function callVerify(code) {
		const res = await fetch(VERIFY_ENDPOINT, {
			method: 'POST',
			headers: supabaseHeaders,
			body: JSON.stringify({ code })
		});
		return res.json();
	}

	async function callSubmit(code, rating) {
		const res = await fetch(SUBMIT_ENDPOINT, {
			method: 'POST',
			headers: supabaseHeaders,
			body: JSON.stringify({ code, rating })
		});
		return res.json();
	}

	onMount(async () => {
		if (!data.toolEnabled) {
			view = 'suspended';
			return;
		}

		const stored = sessionStorage.getItem(SESSION_KEY);
		if (stored) {
			try {
				const result = await callVerify(stored);
				if (result?.success) {
					responder = result.responder;
					view = 'rating';
				} else {
					sessionStorage.removeItem(SESSION_KEY);
					view = 'code';
				}
			} catch {
				sessionStorage.removeItem(SESSION_KEY);
				view = 'code';
			}
		} else {
			view = 'code';
		}
	});

	async function handleCodeSubmit(e) {
		e.preventDefault();
		error = '';
		submitting = true;
		const code = e.target.access_code.value.trim();

		if (!code) {
			error = 'Please enter your access code.';
			submitting = false;
			return;
		}

		try {
			const result = await callVerify(code);
			if (result.success) {
				sessionStorage.setItem(SESSION_KEY, code);
				responder = result.responder;
				view = 'rating';
			} else if (result.error === 'Invalid code') {
				error = 'That code was not recognised. Please try again.';
			} else {
				error = result.error ?? 'Something went wrong. Please try again.';
			}
		} catch {
			error = 'Unable to reach the server. Please try again.';
		}

		submitting = false;
	}

	async function handleRatingSubmit(e) {
		e.preventDefault();
		if (selectedRating === null) {
			error = 'Please select a rating before submitting.';
			return;
		}
		error = '';
		submitting = true;
		const code = sessionStorage.getItem(SESSION_KEY);

		try {
			const result = await callSubmit(code, Number(selectedRating));
			if (result.success) {
				view = 'success';
			} else if (result.error === 'Invalid code') {
				sessionStorage.removeItem(SESSION_KEY);
				responder = null;
				selectedRating = null;
				view = 'code';
				error = 'Your session expired. Please re-enter your code.';
			} else {
				error = result.error ?? 'Something went wrong. Please try again.';
			}
		} catch {
			error = 'Unable to reach the server. Please try again.';
		}

		submitting = false;
	}

	function handleLogout() {
		sessionStorage.removeItem(SESSION_KEY);
		responder = null;
		selectedRating = null;
		error = '';
		view = 'code';
	}
</script>

<div class="tool_page page_stack content_width">
	<div class="tool_page__title_row title_row">
		<h1 class="title_1">{content.title}</h1>
	</div>

	{#if view === 'loading' || view === 'code' || view === 'suspended'}
		{#each content.intro as paragraph}
			<p>{paragraph}</p>
		{/each}
	{/if}

	<hr />

	{#if view === 'loading'}
		<p class="wdr_status_text" role="status">Loading&hellip;</p>

	{:else if view === 'suspended'}
		<div class="wdr_suspended" role="alert">
			<p class="wdr_suspended__heading">Collection suspended</p>
			<p>This tool is currently offline. Please check back later or contact the administrator.</p>
		</div>

	{:else if view === 'code'}
		{#if error}
			<p id="code_error" class="wdr_error" role="alert">{error}</p>
		{/if}
		<form onsubmit={handleCodeSubmit} aria-busy={submitting} aria-describedby={error ? 'code_error' : undefined}>
			<TextInput
				id={content.codeField.id}
				name={content.codeField.name}
				label={content.codeField.label}
				placeholder={content.codeField.placeholder}
				required
			/>
			<SubmitButton label={submitting ? 'Verifying…' : content.codeSubmitLabel} />
		</form>

	{:else if view === 'rating'}
		<div class="wdr_greeting_row">
			<p class="wdr_greeting">
				Hello, <strong>{responder?.name ?? 'there'}</strong>
			</p>
			<button type="button" class="wdr_logout_btn" onclick={handleLogout}>Log out</button>
		</div>

		{#if error}
			<p id="rating_error" class="wdr_error" role="alert">{error}</p>
		{/if}

		<form onsubmit={handleRatingSubmit} aria-busy={submitting} aria-describedby={error ? 'rating_error' : undefined}>
			<fieldset class="form_group wdr_rating_group">
				<legend>{content.ratingLegend}</legend>

				{#if data.ratingPrompt}
					<p class="wdr_rating_prompt">{data.ratingPrompt}</p>
				{/if}

				{#each ratingOptions as option}
					<label
						class="wdr_rating_card"
						class:wdr_rating_card--selected={selectedRating === option.value}
					>
						<input
							type="radio"
							name="day_rating"
							value={option.value}
							bind:group={selectedRating}
						/>
						<span class="wdr_rating_card__marker">{option.marker}</span>
						{#if option.label}
							<span class="wdr_rating_card__body">
								<span class="wdr_rating_card__label">{option.label}</span>
							</span>
						{/if}
					</label>
				{/each}
			</fieldset>

			<SubmitButton label={submitting ? 'Submitting…' : content.submitLabel} />
		</form>

	{:else if view === 'success'}
		<div class="wdr_success">
			<p class="wdr_success__heading">Rating submitted.</p>
			<p>
				Thank you, <strong>{responder?.name ?? 'there'}</strong>. Your response has been recorded.
			</p>
			<button type="button" class="wdr_logout_btn" onclick={handleLogout}>Submit another</button>
		</div>
	{/if}
</div>

<style lang="scss">
	.tool_page p {
		padding-left: 0;
	}

	.wdr_status_text {
		color: var(--text-secondary);
	}

	.wdr_suspended {
		display: grid;
		gap: 1.2rem;
		padding: 2rem 2.4rem;
		border-radius: var(--radius-card);
		border: 0.15rem solid color-mix(in srgb, #b45309 35%, transparent);
		background-color: color-mix(in srgb, #b45309 7%, var(--bg));
	}

	.wdr_suspended__heading {
		font-size: 2rem;
		font-weight: 700;
		color: #b45309;
		margin: 0;
		padding-left: 0;
	}

	.wdr_suspended p {
		color: var(--text-secondary);
		padding-left: 0;
		margin: 0;
	}

	.wdr_error {
		padding: 1.2rem 1.6rem;
		border-radius: 0.8rem;
		border: 0.1rem solid color-mix(in srgb, #c0392b 40%, transparent);
		background-color: color-mix(in srgb, #c0392b 8%, var(--bg));
		color: #c0392b;
		font-size: 1.4rem;
		font-weight: 500;
	}

	.wdr_greeting_row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.6rem;
		flex-wrap: wrap;
	}

	.wdr_greeting {
		font-size: 2rem;
		font-weight: 500;
		color: var(--text);
		margin: 0;
	}

	.wdr_logout_btn {
		display: inline-flex;
		align-items: center;
		padding: 0.8rem 1.4rem;
		border: 0.1rem solid var(--border);
		border-radius: 0.8rem;
		background-color: var(--bg);
		color: var(--text-secondary);
		font-size: 1.4rem;
		font-weight: 600;
		cursor: pointer;
		transition: border-color 180ms ease, color 180ms ease, transform 180ms ease;

		&:hover {
			border-color: var(--primary);
			color: var(--primary);
			transform: translateY(-0.1rem);
		}

		&:focus-visible {
			outline: none;
			box-shadow: 0 0 0 0.3rem color-mix(in srgb, var(--primary) 18%, transparent);
		}
	}

	.wdr_rating_group {
		gap: 1.2rem;
	}

	.wdr_rating_prompt {
		font-size: 1.5rem;
		color: var(--text-secondary);
		padding-left: 0;
		margin: 0;
	}

	.wdr_rating_card {
		display: flex;
		align-items: center;
		gap: 1.6rem;
		padding: 1.6rem 2rem;
		border: 0.15rem solid var(--border);
		border-radius: var(--radius-card);
		background-color: var(--bg);
		cursor: pointer;
		transition: border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease;

		input[type='radio'] {
			width: auto;
			padding: 0;
			accent-color: var(--primary);
			flex-shrink: 0;
			margin: 0;
			cursor: pointer;
		}

		&:hover {
			border-color: color-mix(in srgb, var(--primary) 50%, transparent);
			background-color: color-mix(in srgb, var(--primary) 4%, var(--bg));
		}

		&.wdr_rating_card--selected {
			border-color: var(--primary);
			background-color: color-mix(in srgb, var(--primary) 8%, var(--bg));
			box-shadow: 0 0 0 0.2rem color-mix(in srgb, var(--primary) 16%, transparent);
		}
	}

	.wdr_rating_card__marker {
		font-size: 2.4rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: var(--primary);
		min-width: 3.2rem;
		text-align: center;
	}

	.wdr_rating_card__body {
		display: grid;
		gap: 0.2rem;
		flex: 1;
		min-width: 0;
	}

	.wdr_rating_card__label {
		font-size: 1.6rem;
		font-weight: 600;
		color: var(--text);
	}

	.wdr_rating_card__desc {
		font-size: 1.4rem;
		color: var(--text-secondary);
	}

	.wdr_success {
		display: grid;
		gap: 1.2rem;
	}

	.wdr_success__heading {
		font-size: 2.2rem;
		font-weight: 700;
		color: var(--primary);
		padding-left: 0;
		margin: 0;
	}

	@media (max-width: 768px) {
		.wdr_rating_card {
			padding: 1.4rem 1.6rem;
			gap: 1.2rem;
		}

		.wdr_rating_card__marker {
			font-size: 2rem;
			min-width: 2.8rem;
		}
	}
</style>
