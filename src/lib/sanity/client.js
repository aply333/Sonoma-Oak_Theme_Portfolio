import { createClient } from '@sanity/client';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/public';

const projectId = env.PUBLIC_SANITY_PROJECT_ID || 'zh3wqn4s';
const dataset = env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = env.PUBLIC_SANITY_API_VERSION || '2026-03-18';
const perspective = env.PUBLIC_SANITY_PERSPECTIVE || 'published';
const useCdn = env.PUBLIC_SANITY_USE_CDN
	? env.PUBLIC_SANITY_USE_CDN === 'true'
	: !dev;

export const sanityClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn,
	perspective
});

export function hasSanityConfig() {
	return Boolean(projectId && dataset);
}
