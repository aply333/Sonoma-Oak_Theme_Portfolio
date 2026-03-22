<script>
	let { item } = $props();
</script>

{#if item.tags?.length}
	<ul class="blog_toc_stack list_reset">
		{#each item.tags as [name]}
			<li class="blog_toc_stack__item">{name}</li>
		{/each}
	</ul>
{:else if item.stack?.length}
	<ul class="blog_toc_stack list_reset">
		{#each item.stack as stackItem}
			<li class="blog_toc_stack__item">{stackItem}</li>
		{/each}
	</ul>
{:else if item.middleText}
	<span class="blog_toc_fallback">{item.middleText}</span>
{/if}
