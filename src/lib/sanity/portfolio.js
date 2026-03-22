import { createClient } from '@sanity/client';
import fallbackContent from '$lib/assets/content.json';
import { env as privateEnv } from '$env/dynamic/private';
import { portfolioContentQuery } from '$lib/sanity/queries';
import {
	sanityApiVersion,
	sanityDataset,
	sanityPerspective,
	sanityProjectId,
	sanityUseCdn
} from '$lib/sanity/config';

const highlightSections = [
	['languages', 'Languages'],
	['frameworks', 'Frameworks'],
	['tools', 'Tools'],
	['professionalSkills', 'Professional Skills']
];

const jsonFallbackEnabled = privateEnv.DEBUG_ENABLE_JSON_FALLBACK === 'true';

const sanityClient = createClient({
	projectId: sanityProjectId,
	dataset: sanityDataset,
	apiVersion: sanityApiVersion,
	useCdn: sanityUseCdn,
	perspective: sanityPerspective,
	token: privateEnv.SANITY_READ_TOKEN || undefined
});

function cloneFallback() {
	return /** @type {any} */ (structuredClone(fallbackContent));
}

function createEmptyContent() {
	return {
		hero: {
			title: '',
			subtitle: ''
		},
		about: {
			title: '',
			links: [],
			paragraphs: [],
			highlights: []
		},
		projects: {
			title: '',
			intro: '',
			nav: {
				primary: 'Web',
				secondary: ['Work & Education', 'Data', 'Hobby']
			},
			categories: {
				Web: {
					sections: []
				},
				'Work & Education': {
					sections: [],
					reflection: null
				},
				Data: [],
				Hobby: {
					introSection: {
						title: '',
						body: ''
					},
					items: []
				}
			}
		},
		hobbies: {
			title: '',
			intro: '',
			items: []
		},
		data: {
			title: '',
			intro: '',
			items: []
		}
	};
}

/**
 * @param {Record<string, {title?: string}[] | null | undefined> | null | undefined} selectedHighlights
 */
function normalizeSelectedHighlights(selectedHighlights) {
	const sections = highlightSections
		.map(([key, title]) => ({
			title,
			items: (selectedHighlights?.[key] ?? []).map(skillTitle).filter(Boolean)
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
	const categoryTitle = entry?.category?.title;

	return {
		title: entry?.title,
		stack,
		description: entry?.description,
		responsibilities: entry?.details ?? [],
		projectCategory: categoryTitle,
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
 * @param {any} entry
 */
function mapWorkEducationEntry(entry) {
	return {
		title: entry?.title,
		timeRange: entry?.timeRange,
		role: entry?.role,
		description: entry?.description,
		responsibilities: entry?.responsibilities ?? [],
		linkLabel: entry?.linkLabel,
		linkHref: entry?.linkHref
	};
}

/**
 * @param {any} workEducationContent
 */
function mapWorkEducationCategory(workEducationContent) {
	const workEntries = workEducationContent?.workEntries ?? [];
	const educationEntries = workEducationContent?.educationEntries ?? [];
	const sections = [];

	if (workEntries.length) {
		sections.push({
			title: workEducationContent?.workTitle || 'Work History',
			items: workEntries.map(mapWorkEducationEntry)
		});
	}

	if (educationEntries.length) {
		sections.push({
			title: workEducationContent?.educationTitle || 'Education',
			items: educationEntries.map(mapWorkEducationEntry)
		});
	}

	if (!sections.length) {
		return null;
	}

	const hasReflection =
		Boolean(workEducationContent?.reflectionTitle) || Boolean(workEducationContent?.reflectionBody);

	return {
		sections,
		reflection: hasReflection
			? {
					title: workEducationContent?.reflectionTitle || 'Reflection',
					body: workEducationContent?.reflectionBody || ''
				}
			: null
	};
}

/**
 * @param {any} galleryContent
 */
function mergeGalleryCategories(galleryContent) {
	/** @type {Record<string, any>} */
	const categories = {};

	const clientProjects = galleryContent?.projectGallery?.clientEntries ?? [];
	const personalProjects = galleryContent?.projectGallery?.personalEntries ?? [];
	const featuredHobbies = galleryContent?.hobbyGallery?.featuredEntries ?? [];
	const featuredDataEntries = galleryContent?.dataGallery?.featuredEntries ?? [];

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

	if (featuredDataEntries.length) {
		categories.Data = featuredDataEntries.map(mapFeaturedData);
	}

	if (featuredHobbies.length) {
		categories.Hobby = {
			introSection: {
				title: galleryContent?.hobbyGallery?.title,
				body: galleryContent?.hobbyGallery?.intro
			},
			items: featuredHobbies.map(mapFeaturedHobby)
		};
	}

	return categories;
}

/**
 * @param {any} sanityContent
 */
export function mergePortfolioContent(sanityContent) {
	const content = jsonFallbackEnabled ? cloneFallback() : createEmptyContent();
	const portfolioContent = sanityContent?.portfolioContent;
	const workEducationContent = sanityContent?.workEducationContent;

	if (!sanityContent) {
		return content;
	}

	if (portfolioContent?.hero) {
		content.hero = {
			...content.hero,
			...portfolioContent.hero
		};
	}

	if (portfolioContent?.about) {
		content.about = {
			...content.about,
			...(portfolioContent.about.title ? { title: portfolioContent.about.title } : {}),
			...(Array.isArray(portfolioContent.about.links) ? { links: portfolioContent.about.links } : {}),
			...(Array.isArray(portfolioContent.about.paragraphs)
				? { paragraphs: portfolioContent.about.paragraphs }
				: {})
		};
	}

	const highlights = normalizeSelectedHighlights(portfolioContent?.about?.highlights);
	if (highlights) {
		content.about.highlights = highlights;
	}

	const projectGallery = portfolioContent?.galleryContent?.projectGallery;
	const hobbyGallery = portfolioContent?.galleryContent?.hobbyGallery;
	const dataGallery = portfolioContent?.galleryContent?.dataGallery;

	if (projectGallery?.title || projectGallery?.intro) {
		content.projects = {
			...content.projects,
			title: projectGallery?.title || content.projects.title,
			intro: projectGallery?.intro || content.projects.intro
		};
	}

	const sanityCategories = mergeGalleryCategories(portfolioContent?.galleryContent);
	if (Object.keys(sanityCategories).length) {
		content.projects = {
			...content.projects,
			categories: {
				...content.projects.categories,
				...sanityCategories
			}
		};
	}

	const workEducationCategory = mapWorkEducationCategory(workEducationContent);
	if (workEducationCategory) {
		content.projects = {
			...content.projects,
			categories: {
				...content.projects.categories,
				'Work & Education': workEducationCategory
			}
		};
	}

	const featuredHobbies = hobbyGallery?.featuredEntries ?? [];
	if (featuredHobbies.length) {
		content.hobbies = {
			title: hobbyGallery?.title || content.hobbies?.title,
			intro: hobbyGallery?.intro || content.hobbies?.intro,
			items: featuredHobbies.map(mapFeaturedHobby)
		};
	}

	const featuredDataEntries = dataGallery?.featuredEntries ?? [];
	if (featuredDataEntries.length) {
		content.data = {
			title: dataGallery?.title || content.data?.title,
			intro: dataGallery?.intro || content.data?.intro,
			items: featuredDataEntries.map(mapFeaturedData)
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
		return jsonFallbackEnabled ? cloneFallback() : createEmptyContent();
	}
}
