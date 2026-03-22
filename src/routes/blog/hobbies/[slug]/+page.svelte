<script>
	import BlogArticlePage from '$lib/assets/components/blog_components/blog_article_page.svelte';

	let { data } = $props();
</script>

<BlogArticlePage article={data.article} />
