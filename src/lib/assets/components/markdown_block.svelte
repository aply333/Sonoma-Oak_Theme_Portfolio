<script>
	import { hasLegacyFormatting, renderLegacyBlock, renderMarkdown } from '$lib/utils/markdown';

	let { content } = $props();
</script>

<div class="markdown_block">
	{@html hasLegacyFormatting(content) ? renderLegacyBlock(content) : renderMarkdown(content)}
</div>

<style lang="scss">
	.markdown_block {
		:global(*:first-child) {
			margin-top: 0;
		}

		:global(*:last-child) {
			margin-bottom: 0;
		}

		:global(p),
		:global(ul),
		:global(ol),
		:global(blockquote),
		:global(pre) {
			margin: 0 0 1.2rem;
		}

		:global(ul),
		:global(ol) {
			padding-left: 2rem;
		}

		:global(a) {
			color: var(--link);
			text-decoration: underline;
			text-underline-offset: 0.16em;
		}

		:global(strong) {
			font-weight: 700;
		}

		:global(em) {
			font-style: italic;
		}

		:global(code) {
			font-family: 'Space Mono', monospace;
			font-size: 0.95em;
		}
	}
</style>
