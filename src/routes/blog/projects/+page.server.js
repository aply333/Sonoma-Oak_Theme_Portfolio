import { projectBlogPageQuery } from '$lib/sanity/queries';
import {
	loadBlogCategoryLandingPage,
	mapStackPosts
} from '$lib/sanity/blog';

export async function load() {
	return loadBlogCategoryLandingPage({
		query: projectBlogPageQuery,
		mapPosts: mapStackPosts,
		category: 'Projects',
		href: '/blog/projects',
		pageTitle: 'Projects',
		tocTitle: 'Project',
		middleColumnTitle: 'Stack',
		errorLabel: 'project blog page content from Sanity'
	});
}
