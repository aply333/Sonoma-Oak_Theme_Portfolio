import { createClient } from '@sanity/client';
import { env } from '$env/dynamic/public';

const projectId = env.PUBLIC_SANITY_PROJECT_ID || 'zh3wqn4s';
const dataset = env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = env.PUBLIC_SANITY_API_VERSION || '2026-03-18';
const useCdn = env.PUBLIC_SANITY_USE_CDN !== 'false';

export const sanityClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn,
	perspective: 'published'
});

export function hasSanityConfig() {
	return Boolean(projectId && dataset);
}
