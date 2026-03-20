<script>
	import '$lib/assets/area_styles/blog.scss';
	import RouteSectionNav from '$lib/assets/components/route__components/route_section_nav.svelte';

	let { children } = $props();

	const leftItems = [
		{ href: '/blog', label: 'Home' },
		{ href: '/blog/data', label: 'Data' },
		{ href: '/blog/hobbies', label: 'Hobbies' },
		{ href: '/blog/projects', label: 'Projects' }
	];

	const rightItems = [{ href: '/', label: 'Portfolio' }];
</script>

<div class="blog_shell section_shell">
	<RouteSectionNav ariaLabel="Blog sections" {leftItems} {rightItems} />

	<section class="blog_content section_content">
		{@render children()}
	</section>
</div>
