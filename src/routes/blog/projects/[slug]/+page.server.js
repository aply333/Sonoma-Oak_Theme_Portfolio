import { error } from '@sveltejs/kit';
import {
	projectBlogArticleQuery,
	projectBlogArticleSlugsQuery
} from '$lib/sanity/queries';
import {
	formatLongDate,
	renderMarkdown,
	sanityClient
} from '$lib/sanity/blog';

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

	const relatedEntries = article.relatedEntries ?? [];
	const relatedSkills = /** @type {{title?: string}[]} */ (article.relatedSkills ?? []);

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
			relatedEntries,
			relatedEntriesLabel: relatedEntries.length === 1 ? 'Project' : 'Projects',
			relatedMeta: relatedSkills.map((item) => item?.title).filter(Boolean),
			relatedMetaLabel: 'Skills'
		}
	};
}
