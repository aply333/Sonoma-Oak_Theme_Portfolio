import { getPortfolioContent } from '$lib/sanity/portfolio';

export async function load() {
	const content = await getPortfolioContent();

	return {
		content
	};
}
