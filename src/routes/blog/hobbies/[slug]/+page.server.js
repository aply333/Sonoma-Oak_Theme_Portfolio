import { error } from '@sveltejs/kit';
import {
	hobbyBlogArticleQuery,
	hobbyBlogArticleSlugsQuery
} from '$lib/sanity/queries';
import {
	formatLongDate,
	renderMarkdown,
	sanityClient
} from '$lib/sanity/blog';

export async function entries() {
	const slugs = await sanityClient.fetch(hobbyBlogArticleSlugsQuery);
	const items = /** @type {{slug?: string}[]} */ (slugs ?? []);

	return items
		.filter((item) => item?.slug)
		.map((item) => ({ slug: /** @type {string} */ (item.slug) }));
}

export async function load({ params }) {
	const article = await sanityClient.fetch(hobbyBlogArticleQuery, { slug: params.slug });

	if (!article) {
		throw error(404, 'Hobby article not found');
	}

	const tags = /** @type {{title?: string, color?: string}[]} */ (article.tags ?? []);
	const relatedArticleItems = /** @type {{_id?: string, title?: string, slug?: string}[]} */ (
		article.relatedArticles ?? []
	);
	const relatedArticles = relatedArticleItems.filter(
		(item) => item?._id !== article._id && item?.title && item?.slug
	);
	const relatedEntries = article.relatedEntries ?? [];
	const relatedTags = /** @type {{title?: string}[]} */ (article.relatedTags ?? []);

	return {
		article: {
			category: 'Hobbies',
			title: article.title || 'NEEDS WIRE',
			datePosted: formatLongDate(article.publishedAt),
			excerptHtml: article.excerpt ? renderMarkdown(article.excerpt) : '',
			featuredImage: article.featuredImage,
			body: article.body ?? [],
			stack: undefined,
			tags: tags.reduce(
				/**
				 * @param {[string, string][]} items
				 * @param {{title?: string, color?: string}} item
				 */
				(items, item) => {
					if (item?.title && item?.color) {
						items.push([item.title, item.color]);
					}

					return items;
				},
				[]
			),
			footerContentHtml: article.footerContent ? renderMarkdown(article.footerContent) : '',
			relatedArticles: relatedArticles.map((item) => ({
				title: item.title,
				href: `/blog/hobbies/${item.slug}`
			})),
			relatedEntries,
			relatedMeta: relatedTags.map((item) => item?.title ? `#${item.title}` : '').filter(Boolean),
			relatedMetaLabel: 'Tags'
		}
	};
}
