import { hobbyBlogPageQuery } from '$lib/sanity/queries';
import {
	loadBlogCategoryLandingPage,
	mapHobbyPosts
} from '$lib/sanity/blog';

export async function load() {
	return loadBlogCategoryLandingPage({
		query: hobbyBlogPageQuery,
		mapPosts: mapHobbyPosts,
		category: 'Hobbies',
		href: '/blog/hobbies',
		pageTitle: 'Hobbies',
		tocTitle: 'Hobby',
		middleColumnTitle: 'Tags',
		errorLabel: 'hobby blog page content from Sanity'
	});
}
