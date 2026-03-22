<script>
	import {
		hasLegacyFormatting,
		renderInlineMarkdown,
		renderLegacyInline
	} from '$lib/utils/markdown';

	let { text } = $props();
</script>

<span class="rich_text">
	{@html hasLegacyFormatting(text) ? renderLegacyInline(text) : renderInlineMarkdown(text)}
</span>

<style>
	.rich_text {
		display: contents;
	}

	.rich_text :global(em) {
		font-style: italic;
	}

	.rich_text :global(strong) {
		font-weight: 700;
	}
</style>
