<script>
	import '$lib/assets/area_styles/blog.scss';
	import RouteSectionNav from '$lib/assets/components/route__components/route_section_nav.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const leftItems = [
		{ href: '/blog', label: 'Home' },
		{ href: '/blog/data', label: 'Data' },
		{ href: '/blog/hobbies', label: 'Hobbies' },
		{ href: '/blog/projects', label: 'Projects' }
	];

	const rightItems = [{ href: '/', label: 'Portfolio' }];

	const navClassName = $derived.by(() => {
		const segments = page.url.pathname.split('/').filter(Boolean);
		return segments.length >= 3 ? 'route_section_nav--article' : '';
	});
</script>

<div class="blog_shell section_shell">
	<RouteSectionNav ariaLabel="Blog sections" {leftItems} {rightItems} className={navClassName} />

	<section class="blog_content section_content">
		{@render children()}
	</section>
</div>
