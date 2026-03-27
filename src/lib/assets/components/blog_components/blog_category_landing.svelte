<script>
	import BlogFeaturedCard from '$lib/assets/components/blog_components/blog_featured_card.svelte';
	import BlogRecentStrip from '$lib/assets/components/blog_components/blog_recent_strip.svelte';
	import BlogTocGroup from '$lib/assets/components/blog_components/blog_toc_group.svelte';
	import { getContext } from 'svelte';

	let { data } = $props();
	const blogSearchQuery = getContext('blog-search-query');

	function normalizeValue(value) {
		return value.trim().toLowerCase();
	}

	const filteredGroup = $derived.by(() => {
		const query = normalizeValue($blogSearchQuery || '');

		if (!query) {
			return data.tocGroup;
		}

		return {
			...data.tocGroup,
			items: (data.tocGroup?.items ?? []).filter((item) =>
				normalizeValue(`${item.title || ''} ${item.category || ''} ${item.summary || ''}`).includes(
					query
				)
			)
		};
	});
</script>

<div class="blog_page page_stack">
	<div class="blog_page__hero">
		<div class="blog_page__header page_header">
			<h1 class="title_1">{data.pageTitle}</h1>
			<div class="blog_page__intro page_intro prose prose--intro">{@html data.pageIntroHtml}</div>
		</div>

		<BlogFeaturedCard post={data.featuredPost} />
	</div>

	<BlogRecentStrip post={data.mostRecentPost} />

	<BlogTocGroup group={filteredGroup} />

	{#if !filteredGroup.items?.length}
		<p class="blog_page__search_empty copy_inline">No articles match that search.</p>
	{/if}
</div>

<style lang="scss">
	.blog_page__search_empty {
		margin: 0;
		color: var(--text-secondary);
	}
</style>
