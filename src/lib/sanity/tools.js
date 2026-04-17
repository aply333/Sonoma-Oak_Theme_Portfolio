import { createClient } from '@sanity/client';
import { env as privateEnv } from '$env/dynamic/private';
import { toolsSettingsQuery } from '$lib/sanity/queries';
import {
	sanityApiVersion,
	sanityDataset,
	sanityPerspective,
	sanityProjectId,
	sanityUseCdn
} from '$lib/sanity/config';

const sanityClient = createClient({
	projectId: sanityProjectId,
	dataset: sanityDataset,
	apiVersion: sanityApiVersion,
	useCdn: sanityUseCdn,
	perspective: sanityPerspective,
	token: privateEnv.SANITY_READ_TOKEN || undefined
});

export async function getToolsSettings() {
	try {
		const result = await sanityClient.fetch(toolsSettingsQuery);
		return {
			weekDayRatingEnabled: result?.weekDayRatingEnabled ?? true,
			weekDayRatingPrompt: result?.weekDayRatingPrompt ?? null,
			weekDayRatingLabels: result?.weekDayRatingLabels ?? []
		};
	} catch {
		// Fail open — if Sanity is unreachable the tool stays usable
		return {
			weekDayRatingEnabled: true,
			weekDayRatingPrompt: null,
			weekDayRatingLabels: []
		};
	}
}
