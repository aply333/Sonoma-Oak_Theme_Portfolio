import { error } from '@sveltejs/kit';
import {
	dataBlogArticleQuery,
	dataBlogArticleSlugsQuery
} from '$lib/sanity/queries';
import {
	formatLongDate,
	renderMarkdown,
	sanityClient
} from '$lib/sanity/blog';

export async function entries() {
	const slugs = await sanityClient.fetch(dataBlogArticleSlugsQuery);
	const items = /** @type {{slug?: string}[]} */ (slugs ?? []);

	return items
		.filter((item) => item?.slug)
		.map((item) => ({ slug: /** @type {string} */ (item.slug) }));
}

export async function load({ params }) {
	const article = await sanityClient.fetch(dataBlogArticleQuery, { slug: params.slug });

	if (!article) {
		throw error(404, 'Data article not found');
	}

	const relatedEntries = article.relatedEntries ?? [];
	const relatedSkills = /** @type {{title?: string}[]} */ (article.relatedSkills ?? []);

	return {
		article: {
			category: 'Data',
			title: article.title || 'NEEDS WIRE',
			datePosted: formatLongDate(article.publishedAt),
			excerptHtml: article.excerpt ? renderMarkdown(article.excerpt) : '',
			featuredImage: article.featuredImage,
			body: article.body ?? [],
			stack: article.stack ?? [],
			tags: undefined,
			footerContentHtml: article.footerContent ? renderMarkdown(article.footerContent) : '',
			relatedEntries,
			relatedEntriesLabel: relatedEntries.length === 1 ? 'Data Entry' : 'Data Entries',
			relatedMeta: relatedSkills.map((item) => item?.title).filter(Boolean),
			relatedMetaLabel: 'Skills'
		}
	};
}
