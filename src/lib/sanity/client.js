import { createClient } from '@sanity/client';
import { dev } from '$app/environment';
import {
	sanityApiVersion,
	sanityDataset,
	sanityPerspective,
	sanityProjectId,
	sanityUseCdn
} from '$lib/sanity/config';

const projectId = sanityProjectId;
const dataset = sanityDataset;
const apiVersion = sanityApiVersion;
const perspective = sanityPerspective;
const useCdn = sanityUseCdn || !dev;

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
