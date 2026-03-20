<script>
	import { hasLegacyFormatting, renderLegacyBlock, renderMarkdown } from '$lib/utils/markdown';

	let { content } = $props();
</script>

<div class="markdown_block">
	<div class="markdown_content">
		{@html hasLegacyFormatting(content) ? renderLegacyBlock(content) : renderMarkdown(content)}
	</div>
</div>
