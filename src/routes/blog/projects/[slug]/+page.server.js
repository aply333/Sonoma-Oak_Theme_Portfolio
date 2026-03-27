import { error } from '@sveltejs/kit';
import { projectBlogArticleQuery, projectBlogArticleSlugsQuery } from '$lib/sanity/queries';
import { formatLongDate, renderMarkdown, sanityClient } from '$lib/sanity/blog';

export async function entries() {
	const slugs = await sanityClient.fetch(projectBlogArticleSlugsQuery);
	const items = /** @type {{slug?: string}[]} */ (slugs ?? []);

	return items
		.filter((item) => item?.slug)
		.map((item) => ({ slug: /** @type {string} */ (item.slug) }));
}

export async function load({ params }) {
	const article = await sanityClient.fetch(projectBlogArticleQuery, { slug: params.slug });

	if (!article) {
		throw error(404, 'Project article not found');
	}

	const relatedArticleItems = /** @type {{_id?: string, title?: string, slug?: string}[]} */ (
		article.relatedArticles ?? []
	);
	const relatedArticles = relatedArticleItems.filter(
		(item) => item?._id !== article._id && item?.title && item?.slug
	);
	const relatedEntries = /** @type {{title?: string, relatedArticleSlug?: string}[]} */ (
		article.relatedEntries ?? []
	);
	const relatedSkills = /** @type {{title?: string}[]} */ (article.relatedSkills ?? []);
	const downloadableFiles = /** @type {{title?: string, fileUrl?: string, fileName?: string}[]} */ (
		article.downloadableFiles ?? []
	);

	return {
		article: {
			category: 'Projects',
			title: article.title || 'NEEDS WIRE',
			datePosted: formatLongDate(article.publishedAt),
			excerptHtml: article.excerpt ? renderMarkdown(article.excerpt) : '',
			featuredImage: article.featuredImage,
			body: article.body ?? [],
			stack: article.stack ?? [],
			tags: undefined,
			footerContentHtml: article.footerContent ? renderMarkdown(article.footerContent) : '',
			relatedArticles: relatedArticles.map((item) => ({
				title: item.title,
				href: `/blog/projects/${item.slug}`
			})),
			relatedEntries: relatedEntries.map((item) => ({
				title: item.title,
				href: item.relatedArticleSlug ? `/blog/projects/${item.relatedArticleSlug}` : undefined
			})),
			downloadableFiles: downloadableFiles
				.filter((item) => item?.fileUrl && (item?.title || item?.fileName))
				.map((item) => ({
					title: item.title,
					href: item.fileUrl,
					fileName: item.fileName
				})),
			relatedMeta: relatedSkills.map((item) => item?.title).filter(Boolean),
			relatedMetaLabel: 'Skills'
		}
	};
}
