<script>
	import { hasLegacyFormatting, renderLegacyBlock, renderMarkdown } from '$lib/utils/markdown';

	let { content, proseVariant = 'compact', proseClass = '' } = $props();
</script>

<div class="markdown_block">
	<div class={`prose prose--${proseVariant} ${proseClass}`.trim()}>
		{@html hasLegacyFormatting(content) ? renderLegacyBlock(content) : renderMarkdown(content)}
	</div>
</div>
