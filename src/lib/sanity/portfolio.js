import fallbackContent from '$lib/assets/content.json';
import { sanityClient } from '$lib/sanity/client';
import { portfolioContentQuery } from '$lib/sanity/queries';

const highlightSections = [
	['languages', 'Languages'],
	['frameworks', 'Frameworks'],
	['tools', 'Tools'],
	['professionalSkills', 'Professional Skills']
];

function cloneFallback() {
	return /** @type {any} */ (structuredClone(fallbackContent));
}

/**
 * @param {{title?: string}[] | null | undefined} items
 */
function titles(items) {
	return (items ?? []).map((item) => item?.title).filter(Boolean);
}

/**
 * @param {any} about
 */
function normalizeHighlights(about) {
	const sections = highlightSections
		.map(([key, title]) => ({
			title,
			items: titles(about?.highlights?.[key])
		}))
		.filter((section) => section.items.length);

	return sections.length ? sections : null;
}

/**
 * @param {any} skill
 */
function skillTitle(skill) {
	return skill?.title;
}

/**
 * @param {any} entry
 */
function mapFeaturedProject(entry) {
	const stack = (entry?.skills ?? []).map(skillTitle).filter(Boolean);
	const categoryTitles = (entry?.categories ?? [])
		.map(
			/** @param {{title?: string}} category */
			(category) => category?.title
		)
		.filter(Boolean);

	return {
		title: entry?.title,
		stack,
		description: entry?.description,
		responsibilities: entry?.details ?? [],
		projectCategories: categoryTitles,
		linkLabel: entry?.link ? 'View Project' : undefined,
		linkHref: entry?.link
	};
}

/**
 * @param {any} entry
 */
function mapFeaturedHobby(entry) {
	return {
		title: entry?.title,
		description: entry?.description,
		responsibilities: entry?.responsibilities ?? [],
		tags: (entry?.tags ?? []).reduce(
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
	};
}

/**
 * @param {any} entry
 */
function mapFeaturedData(entry) {
	return {
		title: entry?.title,
		description: entry?.description,
		responsibilities: entry?.responsibilities ?? []
	};
}

/**
 * @param {any} projectGallery
 * @param {any} hobbyGallery
 * @param {any} dataGallery
 */
function mergeGalleryCategories(projectGallery, hobbyGallery, dataGallery) {
	/** @type {Record<string, any>} */
	const categories = {};

	const clientProjects = projectGallery?.clientEntries ?? [];
	const personalProjects = projectGallery?.personalEntries ?? [];

	if (clientProjects.length || personalProjects.length) {
		categories.Web = {
			sections: [
				...(clientProjects.length
					? [
							{
								title: 'Client Work',
								items: clientProjects.map(mapFeaturedProject)
							}
						]
					: []),
				...(personalProjects.length
					? [
							{
								title: 'Personal Projects',
								items: personalProjects.map(mapFeaturedProject)
							}
						]
					: [])
			]
		};
	}

	if (dataGallery?.featuredEntries?.length) {
		categories.Data = dataGallery.featuredEntries.map(mapFeaturedData);
	}

	if (hobbyGallery?.featuredEntries?.length) {
		categories.Hobby = {
			introSection: {
				title: hobbyGallery.title,
				body: hobbyGallery.intro
			},
			items: hobbyGallery.featuredEntries.map(mapFeaturedHobby)
		};
	}

	return categories;
}

/**
 * @param {any} sanityContent
 */
export function mergePortfolioContent(sanityContent) {
	const content = cloneFallback();

	if (!sanityContent) {
		return content;
	}

	if (sanityContent.external_links) {
		content.external_links = sanityContent.external_links;
	}

	if (sanityContent.hero) {
		content.hero = {
			...content.hero,
			...sanityContent.hero
		};
	}

	if (sanityContent.about) {
		content.about = {
			...content.about,
			...sanityContent.about
		};

		const highlights = normalizeHighlights(sanityContent.about);
		if (highlights) {
			content.about.highlights = highlights;
		}
	}

	const projectGallery = sanityContent.galleryContent?.projectGallery;
	const hobbyGallery = sanityContent.galleryContent?.hobbyGallery;
	const dataGallery = sanityContent.galleryContent?.dataGallery;

	if (projectGallery?.title || projectGallery?.intro) {
		content.projects = {
			...content.projects,
			title: projectGallery?.title || content.projects.title,
			intro: projectGallery?.intro || content.projects.intro
		};
	}

	const sanityCategories = mergeGalleryCategories(projectGallery, hobbyGallery, dataGallery);
	if (Object.keys(sanityCategories).length) {
		content.projects = {
			...content.projects,
			categories: {
				...content.projects.categories,
				...sanityCategories
			}
		};
	}

	if (hobbyGallery?.featuredEntries?.length) {
		content.hobbies = {
			title: hobbyGallery.title,
			intro: hobbyGallery.intro,
			items: hobbyGallery.featuredEntries.map(mapFeaturedHobby)
		};
	}

	if (dataGallery?.featuredEntries?.length) {
		content.data = {
			title: dataGallery.title,
			intro: dataGallery.intro,
			items: dataGallery.featuredEntries.map(mapFeaturedData)
		};
	}

	return content;
}

export async function getPortfolioContent() {
	try {
		const sanityContent = await sanityClient.fetch(portfolioContentQuery);
		return mergePortfolioContent(sanityContent);
	} catch (error) {
		console.error('Failed to fetch portfolio content from Sanity:', error);
		return cloneFallback();
	}
}
