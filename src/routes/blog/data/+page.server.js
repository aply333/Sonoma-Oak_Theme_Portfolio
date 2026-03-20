import { dataBlogPageQuery } from '$lib/sanity/queries';
import {
	loadBlogCategoryLandingPage,
	mapStackPosts
} from '$lib/sanity/blog';

export async function load() {
	return loadBlogCategoryLandingPage({
		query: dataBlogPageQuery,
		mapPosts: mapStackPosts,
		category: 'Data',
		href: '/blog/data',
		pageTitle: 'Data',
		tocTitle: 'Data',
		middleColumnTitle: 'Stack',
		errorLabel: 'data blog page content from Sanity'
	});
}
