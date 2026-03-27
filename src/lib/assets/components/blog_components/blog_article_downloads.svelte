<script>
	let { article } = $props();

	const downloads = $derived.by(() =>
		/** @type {{title?: string, href?: string, fileName?: string}[]} */ (
			article?.downloadableFiles ?? []
		).filter((item) => item?.href && (item?.title || item?.fileName))
	);
</script>

{#if downloads.length}
	<section class="blog_article__downloads">
		<h2 class="title_3">Downloads</h2>
		<div class="blog_article__related_group">
			<ul class="blog_article__related_list">
				{#each downloads as item}
					<li>
						<a class="link_default" href={item.href} download>
							{item.title || item.fileName}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}
