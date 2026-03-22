import { loadBlogRootPage } from '$lib/sanity/blog';

export async function load() {
	return loadBlogRootPage();
}
