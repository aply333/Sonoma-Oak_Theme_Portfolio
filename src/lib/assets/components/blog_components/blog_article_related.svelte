<script>
	let { article } = $props();

	/** @typedef {{ title?: string, href?: string }} RelatedArticle */
	/** @typedef {{ title?: string, href?: string }} RelatedEntry */

	function hasText(value) {
		return typeof value === 'string' && value.trim().length > 0;
	}

	const relatedArticles = $derived.by(() =>
		/** @type {RelatedArticle[]} */ (article?.relatedArticles ?? []).filter(
			(item) => hasText(item?.title) && hasText(item?.href)
		)
	);
	const relatedEntries = $derived.by(() =>
		/** @type {RelatedEntry[]} */ (article?.relatedEntries ?? []).filter((item) =>
			hasText(item?.title)
		)
	);
	const relatedMeta = $derived.by(() =>
		(article?.relatedMeta ?? []).filter((item) => hasText(item))
	);
	const hasRelatedContent = $derived.by(
		() => relatedArticles.length > 0 || relatedEntries.length > 0 || relatedMeta.length > 0
	);
</script>

{#if hasRelatedContent}
	<section class="blog_article__related">
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
