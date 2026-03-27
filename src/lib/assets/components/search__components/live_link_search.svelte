<script>
	import { cubicOut } from 'svelte/easing';

	let {
		items = [],
		label = 'Search',
		placeholder = 'Search',
		inputId = 'live-link-search',
		query = $bindable(''),
		className = '',
		compact = false,
		collapseToIconOnMobile = false
	} = $props();

	let mobileOpen = $state(false);

	function normalizeValue(value) {
		return value.trim().toLowerCase();
	}

	const suggestedResults = $derived.by(() => {
		const normalizedQuery = normalizeValue(query);

		if (!normalizedQuery) {
			return [];
		}

		return (items ?? [])
			.filter((item) =>
				normalizeValue(`${item?.title || ''} ${item?.context || ''}`).includes(normalizedQuery)
			)
			.slice(0, 8);
	});

	function toggleMobileOpen() {
		mobileOpen = !mobileOpen;
	}

	$effect(() => {
		if (!collapseToIconOnMobile) {
			mobileOpen = true;
		}
	});

	/**
	 * @param {HTMLElement} node
	 * @returns {{duration:number,easing:(t:number)=>number,css:(t:number)=>string}}
	 */
	function expandPanel(node) {
		const height = node.scrollHeight;

		return {
			duration: 220,
			easing: cubicOut,
			css: (t) => `
				max-height: ${t * height}px;
				overflow: hidden;
			`
		};
	}
</script>

<div
	class={`live_link_search ${compact ? 'live_link_search--compact' : ''} ${
		collapseToIconOnMobile ? 'live_link_search--mobile_icon' : ''
	} ${className}`.trim()}
>
	{#if collapseToIconOnMobile}
		<button
			class="live_link_search__toggle"
			type="button"
			aria-expanded={mobileOpen}
			aria-controls={`${inputId}-panel`}
			aria-label={mobileOpen ? `Close ${label}` : `Open ${label}`}
			onclick={toggleMobileOpen}
		>
			<span class="live_link_search__icon" aria-hidden="true"></span>
		</button>
	{/if}

	<div
		id={`${inputId}-panel`}
		class={`live_link_search__panel ${
			collapseToIconOnMobile && !mobileOpen ? 'live_link_search__panel--closed_mobile' : ''
		}`.trim()}
		transition:expandPanel
	>
		<label class="live_link_search__label" for={inputId}>{label}</label>
		<input
			id={inputId}
			class="live_link_search__input"
			type="search"
			name={inputId}
			{placeholder}
			bind:value={query}
			autocomplete="off"
		/>

		{#if suggestedResults.length}
			<div class="live_link_search__results">
				<ul class="live_link_search__list list_reset">
					{#each suggestedResults as item}
						<li>
							<a class="live_link_search__link link_default" href={item.href}>
								<span>{item.title}</span>
								{#if item.context}
									<span class="live_link_search__context">{item.context}</span>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.live_link_search {
		display: grid;
		gap: 0.8rem;
		position: relative;
	}

	.live_link_search__panel {
		display: grid;
		gap: 0.8rem;
	}

	.live_link_search__label {
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.live_link_search__input {
		width: 100%;
		padding: 1.2rem 1.4rem;
		border: 0.1rem solid var(--border);
		border-radius: 1.2rem;
		background: var(--bg);
		color: var(--text);
		font: inherit;
	}

	.live_link_search__input:focus-visible {
		outline: none;
		border-color: var(--primary);
		box-shadow: 0 0 0 0.3rem color-mix(in srgb, var(--primary) 18%, transparent);
	}

	.live_link_search__results {
		position: absolute;
		top: calc(100% + 0.8rem);
		left: 0;
		right: 0;
		z-index: 30;
		display: grid;
		padding: 1.2rem;
		border: 0.1rem solid color-mix(in srgb, var(--border) 80%, transparent);
		border-radius: 1.4rem;
		background:
			linear-gradient(180deg, color-mix(in srgb, var(--primary) 4%, transparent), transparent 60%),
			var(--bg);
		box-shadow: var(--shadow-hover);
		backdrop-filter: blur(0.8rem);
		-webkit-backdrop-filter: blur(0.8rem);
	}

	.live_link_search__list {
		display: grid;
		gap: 0.8rem;
	}

	.live_link_search__link {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		color: var(--text);
		text-decoration: none;
	}

	.live_link_search__context {
		color: var(--text-secondary);
		font-size: 1.3rem;
		text-align: right;
	}

	.live_link_search--compact .live_link_search__label {
		display: none;
	}

	.live_link_search--compact .live_link_search__input {
		min-width: 24rem;
		padding: 0.9rem 1.2rem;
		font-size: 1.4rem;
		border-radius: 999px;
	}

	.live_link_search--compact .live_link_search__results {
		min-width: 28rem;
		right: auto;
	}

	.live_link_search__toggle {
		display: none;
	}

	.live_link_search__icon {
		position: relative;
		display: block;
		width: 1.6rem;
		height: 1.6rem;
		border: 0.18rem solid currentColor;
		border-radius: 50%;
	}

	.live_link_search__icon::after {
		content: '';
		position: absolute;
		right: -0.5rem;
		bottom: -0.45rem;
		width: 0.7rem;
		height: 0.18rem;
		background: currentColor;
		transform: rotate(45deg);
		transform-origin: center;
		border-radius: 999px;
	}

	@media (max-width: 768px) {
		.live_link_search__link {
			flex-direction: column;
			align-items: flex-start;
		}

		.live_link_search__context {
			text-align: left;
		}

		.live_link_search--mobile_icon {
			justify-items: end;
		}

		.live_link_search--mobile_icon .live_link_search__toggle {
			display: grid;
			place-items: center;
			width: 4.4rem;
			height: 4.4rem;
			padding: 0;
			border: none;
			background: transparent;
			color: var(--primary);
		}

		.live_link_search--mobile_icon .live_link_search__toggle:focus-visible {
			outline: none;
			box-shadow: 0 0 0 0.3rem color-mix(in srgb, var(--primary) 18%, transparent);
		}

		.live_link_search--mobile_icon .live_link_search__panel--closed_mobile {
			display: none;
		}

		.live_link_search--mobile_icon .live_link_search__panel {
			position: absolute;
			top: calc(100% + 0.6rem);
			right: 0;
			z-index: 35;
			width: min(30rem, 78vw);
			padding: 1rem;
			border: 0.1rem solid color-mix(in srgb, var(--border) 80%, transparent);
			border-radius: 1.4rem;
			background:
				linear-gradient(
					180deg,
					color-mix(in srgb, var(--primary) 4%, transparent),
					transparent 60%
				),
				var(--bg);
			box-shadow: var(--shadow-hover);
			backdrop-filter: blur(0.8rem);
			-webkit-backdrop-filter: blur(0.8rem);
		}

		.live_link_search--mobile_icon .live_link_search__results {
			position: static;
			width: 100%;
			padding: 0;
			border: 0;
			border-radius: 0;
			background: transparent;
			box-shadow: none;
			backdrop-filter: none;
			-webkit-backdrop-filter: none;
		}

		.live_link_search--mobile_icon .live_link_search__input {
			min-width: 0;
		}
	}
</style>
