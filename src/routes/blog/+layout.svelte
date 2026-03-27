<script>
	import '$lib/assets/area_styles/blog.scss';
	import RouteSectionNav from '$lib/assets/components/route__components/route_section_nav.svelte';
	import { page } from '$app/state';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let { children } = $props();
	const blogSearchQuery = writable('');

	const leftItems = [
		{ href: '/blog', label: 'Home' },
		{ href: '/blog/data', label: 'Data' },
		{ href: '/blog/hobbies', label: 'Hobbies' },
		{ href: '/blog/projects', label: 'Projects' }
	];

	const rightItems = [{ href: '/', label: 'Portfolio' }];
	const blogSearchItems = $derived.by(() => {
		const segments = page.url.pathname.split('/').filter(Boolean);

		if (segments.length >= 3) {
			return [];
		}

		const groups = [
			...(page.data?.tocGroups ?? []),
			...(page.data?.tocGroup ? [page.data.tocGroup] : [])
		];

		return groups.flatMap((group) =>
			(group?.items ?? []).map((item) => ({
				title: item?.title || 'NEEDS WIRE',
				href: item?.href || '/blog',
				context: group?.title || item?.category || 'Blog'
			}))
		);
	});

	const navClassName = $derived.by(() => {
		const segments = page.url.pathname.split('/').filter(Boolean);
		return segments.length >= 3 ? 'route_section_nav--article' : 'route_section_nav--landing';
	});

	const shellClassName = $derived.by(() => {
		const segments = page.url.pathname.split('/').filter(Boolean);
		return segments.length >= 3 ? 'blog_shell--article' : 'blog_shell--landing';
	});

	setContext('blog-search-query', blogSearchQuery);

	$effect(() => {
		page.url.pathname;
		blogSearchQuery.set('');
	});
</script>

<div class={`blog_shell section_shell ${shellClassName}`.trim()}>
	<RouteSectionNav
		ariaLabel="Blog sections"
		{leftItems}
		{rightItems}
		searchItems={blogSearchItems}
		bind:searchQuery={$blogSearchQuery}
		searchLabel="Search blog"
		searchPlaceholder="Search articles"
		searchInputId="blog-search"
		className={navClassName}
		mobileMenu
	/>

	<section class="blog_content section_content">
		{@render children()}
	</section>
</div>
