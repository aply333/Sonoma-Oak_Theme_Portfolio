<script>
	let { article } = $props();
</script>

{#if article.relatedEntries?.length || article.relatedMeta?.length}
	<section class="blog_article__related content_width">
		<h2 class="title_3">Related</h2>
		{#if article.relatedEntries?.length}
			<div class="blog_article__related_group">
				<p class="eyebrow">{article.relatedEntriesLabel}</p>
				<ul class="blog_article__related_list">
					{#each article.relatedEntries as item}
						<li>{item.title}</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if article.relatedMeta?.length}
			<div class="blog_article__related_group">
				<p class="eyebrow">{article.relatedMetaLabel}</p>
				<ul class="blog_article__related_meta list_reset">
					{#each article.relatedMeta as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		{/if}
	</section>
{/if}
