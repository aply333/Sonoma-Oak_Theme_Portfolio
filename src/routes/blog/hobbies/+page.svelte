<script>
	import BlogFeaturedCard from '$lib/assets/components/blog_components/blog_featured_card.svelte';
	import BlogRecentStrip from '$lib/assets/components/blog_components/blog_recent_strip.svelte';
	import BlogTocGroup from '$lib/assets/components/blog_components/blog_toc_group.svelte';

	const featuredPost = {
		title: 'Ender 3 Max Rebuild Log',
		datePosted: 'March 2, 2026',
		category: 'Hobbies',
		href: '/blog/hobbies',
		summary:
			'A running log of upgrades, repairs, and tuning changes while bringing a used printer back into stable working shape.'
	};

	const mostRecentPost = {
		title: 'Ender 3 Max Rebuild Log',
		datePosted: 'March 2, 2026',
		category: 'Hobbies',
		href: '/blog/hobbies'
	};

	const tocGroup = {
		title: 'Hobby Posts',
		middleColumnTitle: 'Tags',
		items: [
			{ title: 'Ender 3 Max Rebuild Log', tags: [['build', '#6b7280'], ['3D-printing', '#6c4f7d']], datePosted: 'March 2, 2026', shortDate: '3/2 - 2026', href: '/blog/hobbies' },
			{ title: 'Photography Notes From Recent Shoots', tags: [['photography', '#3f6f5a'], ['design', '#00c2b8']], datePosted: 'February 4, 2026', shortDate: '2/4 - 2026', href: '/blog/hobbies' },
			{ title: 'Linux Setup Changes Worth Keeping', tags: [['linux', '#4d5f2f'], ['code', '#2f5d7a']], datePosted: 'January 18, 2026', shortDate: '1/18 - 2026', href: '/blog/hobbies' }
		]
	};
</script>

<div class="blog_page">
	<div class="blog_page__header">
		<h1 class="title_1">Hobbies</h1>
		<p class="blog_page__intro">
			Build logs, experiments, side projects, and hobby notes that sit outside normal client or portfolio work.
		</p>
	</div>

	<BlogFeaturedCard post={featuredPost} />

	<BlogRecentStrip post={mostRecentPost} />

	<BlogTocGroup group={tocGroup} />
</div>

<style lang="scss">
	.blog_page {
		display: grid;
		gap: 3.2rem;
	}

	.blog_page__header {
		display: grid;
		gap: 1.6rem;
	}

	.blog_page__intro {
		max-width: 76rem;
		padding-left: 0;
	}

	@media (max-width: 768px) {
		.blog_page {
			gap: 2.4rem;
		}
	}
</style>
