<script>
	import TagPillList from '$lib/assets/components/tag_pill_list.svelte';

	let { article } = $props();
</script>

<header class="blog_article__header">
	<div class="blog_article__header_inner page_header">
		<p class="eyebrow blog_article__eyebrow">
			<span>{article.category}</span>
			<span aria-hidden="true">|</span>
			<span>{article.datePosted}</span>
		</p>
		<h1 class="title_1">{article.title}</h1>
		{#if article.excerptHtml}
			<div class="blog_article__excerpt prose prose--article-excerpt content_width">
				{@html article.excerptHtml}
			</div>
		{/if}
		{#if article.tags?.length}
			<TagPillList tags={article.tags} listClass="blog_article__tags" itemClass="blog_article__tag" />
		{:else if article.stack?.length}
			<ul class="blog_article__stack list_reset">
				{#each article.stack as stackItem}
					<li class="blog_article__stack_item">{stackItem}</li>
				{/each}
			</ul>
		{/if}
	</div>
</header>
