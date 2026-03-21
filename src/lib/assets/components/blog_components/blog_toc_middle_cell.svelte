<script>
	import TagPillList from '$lib/assets/components/tag_pill_list.svelte';

	let { item } = $props();
</script>

{#if item.tags?.length}
	<TagPillList tags={item.tags} listClass="blog_toc_tags" itemClass="blog_toc_tag" />
{:else if item.stack?.length}
	<ul class="blog_toc_stack list_reset">
		{#each item.stack as stackItem}
			<li class="blog_toc_stack__item">{stackItem}</li>
		{/each}
	</ul>
{:else if item.middleText}
	<span class="blog_toc_fallback">{item.middleText}</span>
{/if}
