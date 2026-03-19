import { getPortfolioContent } from '$lib/sanity/portfolio';

export async function load() {
	return {
		content: await getPortfolioContent()
	};
}
