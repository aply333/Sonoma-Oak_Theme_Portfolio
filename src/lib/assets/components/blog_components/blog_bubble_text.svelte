<script>
	import { onMount } from 'svelte';

	let { portableText } = $props();
	let bubbleElements = [];
	let bubbleHeights = $state([]);

	const value = $derived.by(() => portableText?.value ?? {});

	const bubbles = $derived.by(() =>
		(value?.inputs ?? []).map((item, index) => ({
			id: item?._key || `${item?.placement || 'left'}-${index}`,
			text: item?.text || '',
			placement:
				item?.placement ||
				(item?.direction === 'receiver' ? 'right' : item?.direction === 'sender' ? 'left' : 'left')
		}))
	);

	const bubbleRows = $derived.by(() =>
		bubbles.map((bubble, index) => {
			const previousBubble = bubbles[index - 1];
			const overlapsPrevious = Boolean(previousBubble && previousBubble.placement !== bubble.placement);
			const previousHeight = bubbleHeights[index - 1] ?? 0;

			return {
				...bubble,
				offset: overlapsPrevious ? previousHeight * 0.5 : 0
			};
		})
	);

	onMount(() => {
		const observer = new ResizeObserver(() => {
			bubbleHeights = bubbleElements.map((element) => element?.offsetHeight ?? 0);
		});

		for (const element of bubbleElements) {
			if (element) observer.observe(element);
		}

		bubbleHeights = bubbleElements.map((element) => element?.offsetHeight ?? 0);

		return () => observer.disconnect();
	});
</script>

{#if bubbleRows.length}
	<div class="blog_bubble_text">
		{#each bubbleRows as bubble, index (bubble.id)}
			<div
				class={`blog_bubble_text__row blog_bubble_text__row--${bubble.placement}`}
				style={`margin-top: ${index === 0 ? 0 : -bubble.offset}px;`}
			>
				<div class="blog_bubble_text__item" bind:this={bubbleElements[index]}>
					<p>{bubble.text}</p>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.blog_bubble_text {
		display: grid;
		gap: 0.75rem;
		margin: 2.5rem 0;
	}

	.blog_bubble_text__row {
		display: flex;
		width: 100%;
	}

	.blog_bubble_text__row--left {
		justify-content: flex-start;
	}

	.blog_bubble_text__row--center {
		justify-content: center;
	}

	.blog_bubble_text__row--right {
		justify-content: flex-end;
	}

	.blog_bubble_text__item {
		width: min(100%, 18rem);
		padding: 1rem 1.15rem;
		border: 0.2rem solid var(--accent);
		border-radius: 1.4rem;
		background-color: var(--bg-secondary);
		color: var(--text);
	}

	.blog_bubble_text__item p {
		margin: 0;
		line-height: 1.65;
		text-align: center;
		text-wrap: pretty;
	}

	@media (max-width: 640px) {
		.blog_bubble_text__item {
			width: min(100%, 15rem);
		}
	}
</style>
