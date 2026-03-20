import {
	PUBLIC_SANITY_API_VERSION,
	PUBLIC_SANITY_DATASET,
	PUBLIC_SANITY_PERSPECTIVE,
	PUBLIC_SANITY_PROJECT_ID,
	PUBLIC_SANITY_USE_CDN
} from '$env/static/public';

export const sanityProjectId = PUBLIC_SANITY_PROJECT_ID || 'zh3wqn4s';
export const sanityDataset = PUBLIC_SANITY_DATASET || 'production';
export const sanityApiVersion = PUBLIC_SANITY_API_VERSION || '2026-03-18';
export const sanityUseCdn = PUBLIC_SANITY_USE_CDN === 'true';

export const sanityPerspective =
	PUBLIC_SANITY_PERSPECTIVE === 'drafts' || PUBLIC_SANITY_PERSPECTIVE === 'raw'
		? PUBLIC_SANITY_PERSPECTIVE
		: 'published';
