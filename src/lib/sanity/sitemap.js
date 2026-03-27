import { createClient } from '@sanity/client';
import { env as privateEnv } from '$env/dynamic/private';
import { renderMarkdown } from '$lib/sanity/blog';
import { siteMapQuery } from '$lib/sanity/queries';
import {
	sanityApiVersion,
	sanityDataset,
	sanityPerspective,
	sanityProjectId,
	sanityUseCdn
} from '$lib/sanity/config';

const defaultSections = [
	{
		sectionId: 'portfolio',
		title: 'Portfolio',
		pages: [{ pageId: 'home', title: 'Home', href: '/', pageType: 'static', display: true }]
	},
	{
		sectionId: 'blog',
		title: 'Blog',
		pages: [
			{ pageId: 'blog-root', title: 'Blog', href: '/blog', pageType: 'static', display: true },
			{
				pageId: 'blog-projects',
				title: 'Projects',
				href: '/blog/projects',
				pageType: 'projectBlogCollection',
				childSectionTitle: 'Project Articles',
				display: true
			},
			{
				pageId: 'blog-data',
				title: 'Data',
				href: '/blog/data',
				pageType: 'dataBlogCollection',
				childSectionTitle: 'Data Articles',
				display: true
			},
			{
				pageId: 'blog-hobbies',
				title: 'Hobbies',
				href: '/blog/hobbies',
				pageType: 'hobbyBlogCollection',
				childSectionTitle: 'Hobby Articles',
				display: true
			}
		]
	},
	{
		sectionId: 'tools',
		title: 'Tools',
		pages: [
			{ pageId: 'tools-root', title: 'Tools', href: '/tools', pageType: 'static', display: true },
			{
				pageId: 'tools-collection',
				title: 'Data Tools',
				href: '/tools/collection',
				pageType: 'static',
				display: true
			},
			{
				pageId: 'tools-agr-target',
				title: 'Distress and Target',
				href: '/tools/collection/agr-and-target',
				pageType: 'static',
				display: true
			},
			{
				pageId: 'tools-utilities',
				title: 'Project Utilities',
				href: '/tools/utilities',
				pageType: 'static',
				display: true
			},
			{
				pageId: 'tools-content-sync',
				title: 'Content Sync',
				href: '/tools/utilities/content-sync',
				pageType: 'static',
				display: true
			},
			{
				pageId: 'tools-creative',
				title: 'Creative Tools',
				href: '/tools/creative',
				pageType: 'static',
				display: true
			}
		]
	},
	{
		sectionId: 'site',
		title: 'Site',
		pages: [
			{
				pageId: 'site-map',
				title: 'Site Map',
				href: '/site-map',
				pageType: 'static',
				display: true
			}
		]
	}
];

const collectionResolvers = {
	projectBlogCollection: {
		key: 'projectPosts',
		hrefPrefix: '/blog/projects'
	},
	dataBlogCollection: {
		key: 'dataPosts',
		hrefPrefix: '/blog/data'
	},
	hobbyBlogCollection: {
		key: 'hobbyPosts',
		hrefPrefix: '/blog/hobbies'
	}
};

const sanityClient = createClient({
	projectId: sanityProjectId,
	dataset: sanityDataset,
	apiVersion: sanityApiVersion,
	useCdn: sanityUseCdn,
	perspective: sanityPerspective,
	token: privateEnv.SANITY_READ_TOKEN || undefined
});

function createFallbackContent() {
	return {
		title: 'Site Map',
		intro: 'Browse the main routes across the site.',
		sections: defaultSections
	};
}

/**
 * @param {Array<{title?: string, href?: string, fileName?: string}> | undefined} items
 */
function mapDownloads(items) {
	return (items ?? [])
		.filter((item) => item?.href && (item?.title || item?.fileName))
		.map((item) => ({
			title: item?.title || item?.fileName || 'Download',
			href: item?.href || '/'
		}));
}

/**
 * @param {Array<{title?: string, slug?: string, downloads?: Array<{title?: string, href?: string, fileName?: string}>}> | undefined} items
 * @param {string} hrefPrefix
 */
function mapCollectionChildren(items, hrefPrefix) {
	return (items ?? [])
		.filter((item) => item?.slug)
		.map((item) => ({
			title: item?.title || 'Untitled',
			href: `${hrefPrefix}/${item.slug}`,
			children: mapDownloads(item?.downloads)
		}));
}

/**
 * @param {any} payload
 */
function mapSections(payload) {
	const content = payload?.siteMapContent ?? createFallbackContent();

	return (content.sections ?? [])
		.map((section) => ({
			title: section?.title || 'Untitled Section',
			pages: (section?.pages ?? [])
				.filter((page) => page?.display !== false)
				.map((page) => {
					const collectionConfig = collectionResolvers[page?.pageType];
					const children = collectionConfig
						? mapCollectionChildren(payload?.[collectionConfig.key], collectionConfig.hrefPrefix)
						: [];
					const downloads =
						page?.pageId === 'home' ? mapDownloads(payload?.portfolioDownloads?.items) : [];

					return {
						title: page?.title || 'Untitled Page',
						href: page?.href || '/',
						childSectionTitle: page?.childSectionTitle || '',
						children,
						downloads
					};
				})
				.filter((page) => page.title && page.href)
		}))
		.filter((section) => section.pages.length);
}

export async function loadSiteMapPage() {
	try {
		const payload = await sanityClient.fetch(siteMapQuery);
		const content = payload?.siteMapContent ?? createFallbackContent();

		return {
			pageTitle: content.title || 'Site Map',
			pageIntroHtml: renderMarkdown(content.intro || 'Browse the main routes across the site.'),
			sections: mapSections(payload)
		};
	} catch (error) {
		console.error('Error loading site map content from Sanity', error);

		const fallback = createFallbackContent();

		return {
			pageTitle: fallback.title,
			pageIntroHtml: renderMarkdown(fallback.intro),
			sections: mapSections({ siteMapContent: fallback })
		};
	}
}
