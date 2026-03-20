<script>
	let { content, pageClass = '' } = $props();
</script>

<div class={`tool_detail_page page_stack content_width ${pageClass}`.trim()}>
	<div class="tool_detail_page__title_row title_row">
		<h1 class="title_1">{content.title}</h1>
	</div>
	{#each content.intro as paragraph}
		<p>{paragraph}</p>
	{/each}
</div>
