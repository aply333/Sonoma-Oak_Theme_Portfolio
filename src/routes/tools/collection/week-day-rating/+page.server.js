import { getToolsSettings } from '$lib/sanity/tools';

export async function load() {
	const settings = await getToolsSettings();
	return {
		toolEnabled: settings.weekDayRatingEnabled,
		ratingPrompt: settings.weekDayRatingPrompt,
		ratingLabels: settings.weekDayRatingLabels
	};
}
