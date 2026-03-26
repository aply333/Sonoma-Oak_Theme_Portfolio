<script>
	import { PortableText } from '@portabletext/svelte';
	import BlogArticleHeader from '$lib/assets/components/blog_components/blog_article_header.svelte';
	import BlogBubbleText from '$lib/assets/components/blog_components/blog_bubble_text.svelte';
	import BlogCodeSnippet from '$lib/assets/components/blog_components/blog_code_snippet.svelte';
	import BlogArticleRelated from '$lib/assets/components/blog_components/blog_article_related.svelte';
	import BlogPortableImage from '$lib/assets/components/blog_components/blog_portable_image.svelte';
	import BlogSectionBreak from '$lib/assets/components/blog_components/blog_section_break.svelte';
	import BlogTwoColumnTable from '$lib/assets/components/blog_components/blog_two_column_table.svelte';

	let { article } = $props();

	const featuredImagePosition = $derived.by(() => {
		const x = 50 + (article.featuredImage?.placementX ?? 0);
		const y = 50 + (article.featuredImage?.placementY ?? 0);

		return `${x}% ${y}%`;
	});

	const portableComponents = {
		types: {
			image: BlogPortableImage,
			sectionBreak: BlogSectionBreak,
			bubbleText: BlogBubbleText,
			codeSnippet: BlogCodeSnippet,
			twoColumnTable: BlogTwoColumnTable,
			chainedStatements: BlogBubbleText,
			innerMonologue: BlogBubbleText
		}
	};
</script>

<article class="blog_article page_stack">
	<BlogArticleHeader {article} />

	{#if article.featuredImage?.url}
		<div class="blog_article__hero">
			<img
				src={article.featuredImage.url}
				alt={article.featuredImage.alt || article.title}
				style={`object-position: ${featuredImagePosition};`}
			/>
		</div>
	{/if}

	{#if article.body?.length}
		<div class="blog_article__body prose prose--article-body">
			<PortableText value={article.body} components={portableComponents} />
		</div>
	{/if}

	{#if article.footerContentHtml}
		<section class="blog_article__footer prose prose--article-footer">
			{@html article.footerContentHtml}
		</section>
	{/if}

	<BlogArticleRelated {article} />
</article>
