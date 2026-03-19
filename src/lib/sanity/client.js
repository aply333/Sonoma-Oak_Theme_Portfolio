import { createClient } from '@sanity/client';
import { dev } from '$app/environment';
import {
	PUBLIC_SANITY_PROJECT_ID,
	PUBLIC_SANITY_DATASET,
	PUBLIC_SANITY_API_VERSION,
	PUBLIC_SANITY_PERSPECTIVE,
	PUBLIC_SANITY_USE_CDN
} from '$env/static/public';

const projectId = PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_DATASET;
const apiVersion = PUBLIC_SANITY_API_VERSION || '2026-03-18';
const perspective = PUBLIC_SANITY_PERSPECTIVE || 'published';

const useCdn = PUBLIC_SANITY_USE_CDN
	? PUBLIC_SANITY_USE_CDN === 'true'
	: !dev;

if (!projectId || !dataset) {
	throw new Error('Sanity env variables missing');
}

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
