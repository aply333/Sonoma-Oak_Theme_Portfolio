<script>
	import { PortableText } from '@portabletext/svelte';
	import BlogArticleHeader from '$lib/assets/components/blog_components/blog_article_header.svelte';
	import BlogArticleRelated from '$lib/assets/components/blog_components/blog_article_related.svelte';
	import BlogPortableImage from '$lib/assets/components/blog_components/blog_portable_image.svelte';
	import BlogSectionBreak from '$lib/assets/components/blog_components/blog_section_break.svelte';

	let { article } = $props();

	const portableComponents = {
		types: {
			image: BlogPortableImage,
			sectionBreak: BlogSectionBreak
		}
	};
</script>

<article class="blog_article page_stack">
	<BlogArticleHeader {article} />

	{#if article.featuredImage?.url}
		<div class="blog_article__hero">
			<img src={article.featuredImage.url} alt={article.featuredImage.alt || article.title} />
		</div>
	{/if}

	{#if article.body?.length}
		<div class="blog_article__body prose prose--article-body content_width">
			<PortableText value={article.body} components={portableComponents} />
		</div>
	{/if}

	{#if article.footerContentHtml}
		<section class="blog_article__footer prose prose--article-footer content_width">
			{@html article.footerContentHtml}
		</section>
	{/if}

	<BlogArticleRelated {article} />
</article>
