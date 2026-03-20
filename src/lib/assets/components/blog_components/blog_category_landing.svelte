<script>
	import BlogFeaturedCard from '$lib/assets/components/blog_components/blog_featured_card.svelte';
	import BlogRecentStrip from '$lib/assets/components/blog_components/blog_recent_strip.svelte';
	import BlogTocGroup from '$lib/assets/components/blog_components/blog_toc_group.svelte';

	let { data } = $props();
</script>

<div class="blog_page page_stack">
	<div class="blog_page__header page_header">
		<h1 class="title_1">{data.pageTitle}</h1>
		<div class="blog_page__intro page_intro markdown_content">{@html data.pageIntroHtml}</div>
	</div>

	<BlogFeaturedCard post={data.featuredPost} />

	<BlogRecentStrip post={data.mostRecentPost} />

	<BlogTocGroup group={data.tocGroup} />
</div>
