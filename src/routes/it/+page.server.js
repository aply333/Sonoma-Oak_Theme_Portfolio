import { getItLandingContent } from '$lib/sanity/it';

export async function load() {
	return {
		content: await getItLandingContent()
	};
}
