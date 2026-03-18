<script>
	import RouteSectionNav from '$lib/assets/components/route__components/route_section_nav.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	/** @typedef {{ href?: string; label: string }} NavItem */

	const categoryLabels = {
		collection: 'Collection',
		utilities: 'Utilities',
		creative: 'Creative'
	};

	const currentCategory = $derived.by(() => {
		const [, toolsSegment, categorySegment] = page.url.pathname.split('/');

		if (toolsSegment !== 'tools' || !categorySegment) {
			return null;
		}

		return categoryLabels[/** @type {keyof typeof categoryLabels} */ (categorySegment)] ?? categorySegment.replace(/-/g, ' ');
	});

	const leftItems = $derived.by(() => {
		/** @type {NavItem[]} */
		const items = [{ href: '/tools', label: 'Tools' }];

		if (currentCategory) {
			items.push({ label: '|' });
			items.push({ label: currentCategory });
		}

		return items;
	});

	const rightItems = [
		{ href: '/blog', label: 'Blog' },
		{ href: '/', label: 'Portfolio' }
	];
</script>

<div class="tools_shell section_shell">
	<RouteSectionNav ariaLabel="Tools navigation" {leftItems} {rightItems} />

	<section class="tools_content section_content">
		{@render children()}
	</section>
</div>
