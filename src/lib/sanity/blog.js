import { createClient } from '@sanity/client';
import MarkdownIt from 'markdown-it';
import { env as privateEnv } from '$env/dynamic/private';
import { blogRootQuery } from '$lib/sanity/queries';
import {
	sanityApiVersion,
	sanityDataset,
	sanityPerspective,
	sanityProjectId,
	sanityUseCdn
} from '$lib/sanity/config';

export const sanityClient = createClient({
	projectId: sanityProjectId,
	dataset: sanityDataset,
	apiVersion: sanityApiVersion,
	useCdn: sanityUseCdn,
	perspective: sanityPerspective,
	token: privateEnv.SANITY_READ_TOKEN || undefined
});

const longDateFormatter = new Intl.DateTimeFormat('en-US', {
	month: 'long',
	day: 'numeric',
	year: 'numeric'
});

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
	month: 'numeric',
	day: 'numeric',
	year: 'numeric'
});

const markdown = new MarkdownIt({
	html: false,
	linkify: true,
	breaks: false
});

/**
 * @typedef {Object} BlogPostItem
 * @property {string} title
 * @property {string | undefined} [slug]
 * @property {string | undefined} [summary]
 * @property {string} category
 * @property {string} href
 * @property {string} datePosted
 * @property {string} shortDate
 * @property {string | null} publishedAt
 * @property {string | undefined} [metaDetail]
 * @property {string[] | undefined} [stack]
 * @property {[string, string][] | undefined} [tags]
 * @property {string | undefined} [middleText]
 */

/**
 * @param {string | null | undefined} value
 */
export function formatLongDate(value) {
	if (!value) {
		return 'NEEDS WIRE';
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return 'NEEDS WIRE';
	}

	return longDateFormatter.format(date);
}

/**
 * @param {string | null | undefined} value
 */
export function formatShortDate(value) {
	if (!value) {
		return 'NEEDS WIRE';
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return 'NEEDS WIRE';
	}

	const parts = shortDateFormatter.formatToParts(date);
	const month = parts.find((part) => part.type === 'month')?.value;
	const day = parts.find((part) => part.type === 'day')?.value;
	const year = parts.find((part) => part.type === 'year')?.value;

	if (!month || !day || !year) {
		return 'NEEDS WIRE';
	}

	return `${month}/${day} - ${year}`;
}

/**
 * @param {string | null | undefined} publishedAt
 */
export function fallbackPublishedLabel(publishedAt) {
	const formattedDate = formatLongDate(publishedAt);

	return formattedDate === 'NEEDS WIRE' ? 'NEEDS WIRE' : `Published ${formattedDate}`;
}

/**
 * @param {string | undefined} source
 */
export function renderMarkdown(source) {
	return markdown.render(source || 'NEEDS WIRE');
}

/**
 * @param {string} categoryHref
 * @param {string | undefined} slug
 */
function createHref(categoryHref, slug) {
	return slug ? `${categoryHref}/${slug}` : categoryHref;
}

/**
 * @param {Array<{title?: string, slug?: string, publishedAt?: string | null, excerpt?: string, skills?: string[]}> | null | undefined} posts
 * @param {string} category
 * @param {string} categoryHref
 * @returns {BlogPostItem[]}
 */
export function mapStackPosts(posts, category, categoryHref) {
	return (posts ?? []).map((post) => ({
		title: post?.title || 'NEEDS WIRE',
		slug: post?.slug,
		stack: post?.skills?.length ? post.skills : undefined,
		middleText: undefined,
		datePosted: formatLongDate(post?.publishedAt),
		shortDate: formatShortDate(post?.publishedAt),
		href: createHref(categoryHref, post?.slug),
		category,
		summary: post?.excerpt || fallbackPublishedLabel(post?.publishedAt),
		publishedAt: post?.publishedAt || null
	}));
}

/**
 * @param {Array<{title?: string, slug?: string, publishedAt?: string | null, excerpt?: string, tags?: Array<{title?: string, color?: string}>}> | null | undefined} posts
 * @param {string} category
 * @param {string} categoryHref
 * @returns {BlogPostItem[]}
 */
export function mapHobbyPosts(posts, category, categoryHref) {
	return (posts ?? []).map((post) => ({
		title: post?.title || 'NEEDS WIRE',
		slug: post?.slug,
		tags:
			post?.tags?.length
				? post.tags.reduce(
						/**
						 * @param {[string, string][]} items
						 * @param {{title?: string, color?: string}} tag
						 */
						(items, tag) => {
							if (tag?.title && tag?.color) {
								items.push([tag.title, tag.color]);
							}

							return items;
						},
						[]
					)
				: undefined,
		middleText: undefined,
		datePosted: formatLongDate(post?.publishedAt),
		shortDate: formatShortDate(post?.publishedAt),
		href: createHref(categoryHref, post?.slug),
		category,
		summary: post?.excerpt || fallbackPublishedLabel(post?.publishedAt),
		publishedAt: post?.publishedAt || null
	}));
}

/**
 * @param {BlogPostItem[]} posts
 * @returns {BlogPostItem[]}
 */
export function sortByPublishedAt(posts) {
	return [...posts].sort((left, right) => {
		const leftTime = left.publishedAt ? new Date(left.publishedAt).getTime() : -Infinity;
		const rightTime = right.publishedAt ? new Date(right.publishedAt).getTime() : -Infinity;

		return rightTime - leftTime;
	});
}

/**
 * @param {BlogPostItem | undefined} post
 * @param {string} fallbackHref
 * @param {string} fallbackCategory
 */
export function toFeaturedPost(post, fallbackHref, fallbackCategory) {
	return post
		? {
				title: post.title,
				datePosted: post.datePosted,
				category: post.category,
				href: post.href,
				summary: post.summary || fallbackPublishedLabel(post.publishedAt),
				metaDetail: post.stack?.join(', '),
				tags: post.tags
			}
		: {
				title: 'NEEDS WIRE',
				datePosted: 'NEEDS WIRE',
				category: fallbackCategory,
				href: fallbackHref,
				summary: 'NEEDS WIRE',
				metaDetail: undefined,
				tags: undefined
			};
}

/**
 * @param {BlogPostItem | undefined} post
 * @param {string} fallbackHref
 * @param {string} fallbackCategory
 */
export function toMostRecentPost(post, fallbackHref, fallbackCategory) {
	return post
		? {
				title: post.title,
				datePosted: post.datePosted,
				category: post.category,
				href: post.href
			}
		: {
				title: 'NEEDS WIRE',
				datePosted: 'NEEDS WIRE',
				category: fallbackCategory,
				href: fallbackHref
			};
}

export function createBlogRootFallback() {
	return {
		pageTitle: 'Blog',
		pageIntroHtml: '<p>NEEDS WIRE</p>',
		featuredPost: {
			title: 'NEEDS WIRE',
			datePosted: 'NEEDS WIRE',
			category: 'NEEDS WIRE',
			href: '/blog',
			summary: 'NEEDS WIRE',
			metaDetail: undefined,
			tags: undefined
		},
		mostRecentPost: {
			title: 'NEEDS WIRE',
			datePosted: 'NEEDS WIRE',
			category: 'NEEDS WIRE',
			href: '/blog'
		},
		tocGroups: [
			{
				title: 'Projects',
				middleColumnTitle: 'Stack',
				accentRule: true,
				compactHeader: true,
				items: []
			},
			{
				title: 'Data',
				middleColumnTitle: 'Stack',
				accentRule: true,
				compactHeader: true,
				items: []
			},
			{
				title: 'Hobbies',
				middleColumnTitle: 'Tags',
				accentRule: true,
				compactHeader: true,
				items: []
			}
		]
	};
}

export async function loadBlogRootPage() {
	const fallback = createBlogRootFallback();

	try {
		const result = await sanityClient.fetch(blogRootQuery);
		const projectPosts = mapStackPosts(result?.projectPosts, 'Projects', '/blog/projects');
		const dataPosts = mapStackPosts(result?.dataPosts, 'Data', '/blog/data');
		const hobbyPosts = mapHobbyPosts(result?.hobbyPosts, 'Hobbies', '/blog/hobbies');
		const allPosts = sortByPublishedAt([...projectPosts, ...dataPosts, ...hobbyPosts]);
		const mostRecent = allPosts[0];

		return {
			pageTitle: result?.blogContent?.title || fallback.pageTitle,
			pageIntroHtml: renderMarkdown(result?.blogContent?.intro),
			featuredPost: toFeaturedPost(mostRecent, '/blog', 'Blog'),
			mostRecentPost: toMostRecentPost(mostRecent, '/blog', 'Blog'),
			tocGroups: [
				{
					title: 'Projects',
					middleColumnTitle: 'Stack',
					accentRule: true,
					compactHeader: true,
					items: projectPosts
				},
				{
					title: 'Data',
					middleColumnTitle: 'Stack',
					accentRule: true,
					compactHeader: true,
					items: dataPosts
				},
				{
					title: 'Hobbies',
					middleColumnTitle: 'Tags',
					accentRule: true,
					compactHeader: true,
					items: hobbyPosts
				}
			]
		};
	} catch (error) {
		console.error('Failed to load blog root content from Sanity.', error);
		return fallback;
	}
}

/**
 * @param {{
 *   query: string,
 *   mapPosts: (posts: any, category: string, href: string) => BlogPostItem[],
 *   category: string,
 *   href: string,
 *   pageTitle: string,
 *   tocTitle: string,
 *   middleColumnTitle: string,
 *   errorLabel: string
 * }} options
 */
export async function loadBlogCategoryLandingPage(options) {
	const fallback = {
		pageTitle: options.pageTitle,
		pageIntroHtml: '<p>NEEDS WIRE</p>',
		featuredPost: toFeaturedPost(undefined, options.href, options.category),
		mostRecentPost: toMostRecentPost(undefined, options.href, options.category),
		tocGroup: {
			title: options.tocTitle,
			middleColumnTitle: options.middleColumnTitle,
			items: []
		}
	};

	try {
		const result = await sanityClient.fetch(options.query);
		const posts = options.mapPosts(result?.posts, options.category, options.href);
		const featured = options.mapPosts(
			result?.pageContent?.featuredArticle ? [result.pageContent.featuredArticle] : [],
			options.category,
			options.href
		)[0];
		const mostRecent = sortByPublishedAt(posts)[0];

		return {
			pageTitle: result?.pageContent?.title || fallback.pageTitle,
			pageIntroHtml: renderMarkdown(result?.pageContent?.intro),
			featuredPost: toFeaturedPost(featured || mostRecent, options.href, options.category),
			mostRecentPost: toMostRecentPost(mostRecent, options.href, options.category),
			tocGroup: {
				title: options.tocTitle,
				middleColumnTitle: options.middleColumnTitle,
				items: posts
			}
		};
	} catch (error) {
		console.error(`Failed to load ${options.errorLabel}.`, error);
		return fallback;
	}
}
