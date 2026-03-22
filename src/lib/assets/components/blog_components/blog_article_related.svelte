<script>
	let { article } = $props();

	/** @typedef {{ title?: string, href?: string }} RelatedArticle */
	/** @typedef {{ title?: string, href?: string }} RelatedEntry */

	const relatedArticles = $derived.by(() =>
		(/** @type {RelatedArticle[]} */ (article?.relatedArticles ?? [])).filter(
			(item) => item?.title && item?.href
		)
	);
	const relatedEntries = $derived.by(() =>
		(/** @type {RelatedEntry[]} */ (article?.relatedEntries ?? [])).filter((item) => item?.title)
	);
	const relatedMeta = $derived.by(() => (article?.relatedMeta ?? []).filter(Boolean));
</script>

{#if relatedArticles.length || relatedEntries.length || relatedMeta.length}
	<section class="blog_article__related content_width">
		<h2 class="title_3">Related</h2>
		{#if relatedArticles.length}
			<div class="blog_article__related_group">
				<p class="eyebrow">Articles</p>
				<ul class="blog_article__related_list">
					{#each relatedArticles as item}
						<li><a class="link_default" href={item.href}>{item.title}</a></li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if relatedEntries.length}
			<div class="blog_article__related_group">
				<ul class="blog_article__related_list">
					{#each relatedEntries as item}
						<li>
							{#if item.href}
								<a class="link_default" href={item.href}>{item.title}</a>
							{:else}
								{item.title}
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if relatedMeta.length}
			<div class="blog_article__related_group">
				<p class="eyebrow">{article.relatedMetaLabel}</p>
				<ul class="blog_article__related_meta list_reset">
					{#each relatedMeta as item}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		{/if}
	</section>
{/if}
