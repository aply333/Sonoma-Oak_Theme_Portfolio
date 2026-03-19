<script>
	import BlogFeaturedCard from '$lib/assets/components/blog_components/blog_featured_card.svelte';
	import BlogRecentStrip from '$lib/assets/components/blog_components/blog_recent_strip.svelte';
	import BlogTocGroup from '$lib/assets/components/blog_components/blog_toc_group.svelte';

	const featuredPost = {
		title: 'Building the Portfolio System',
		datePosted: 'March 10, 2026',
		category: 'Projects',
		href: '/blog/projects',
		summary:
			'A running write-up on restructuring the portfolio into a cleaner content system, including Sanity schema updates, route planning, and the work required to move from placeholders to live content.'
	};

	const mostRecentPost = {
		title: 'Building the Portfolio System',
		datePosted: 'March 10, 2026',
		category: 'Projects',
		href: '/blog/projects'
	};

	const tocGroups = [
		{
			title: 'Project Posts',
			showMiddleColumn: false,
			items: [
				{ title: 'Building the Portfolio System', stack: ['Svelte', 'Sanity'], datePosted: 'March 10, 2026', shortDate: '3/10 - 2026', href: '/blog/projects' },
				{ title: 'Reworking the Project Gallery', stack: ['Svelte', 'SCSS'], datePosted: 'February 21, 2026', shortDate: '2/21 - 2026', href: '/blog/projects' },
				{ title: 'Notes on Client Build Process', stack: ['WordPress', 'React'], datePosted: 'January 14, 2026', shortDate: '1/14 - 2026', href: '/blog/projects' }
			]
		},
		{
			title: 'Data Posts',
			showMiddleColumn: false,
			items: [
				{ title: 'Early Analysis Planning Notes', stack: ['Python', 'CSV'], datePosted: 'March 6, 2026', shortDate: '3/6 - 2026', href: '/blog/data' },
				{ title: 'Structuring a Small Reporting Workflow', stack: ['Sheets', 'SQL'], datePosted: 'February 12, 2026', shortDate: '2/12 - 2026', href: '/blog/data' },
				{ title: 'Questions Before a First Dataset Pass', stack: ['Python', 'Pandas'], datePosted: 'January 29, 2026', shortDate: '1/29 - 2026', href: '/blog/data' }
			]
		},
		{
			title: 'Hobby Posts',
			showMiddleColumn: false,
			items: [
				{ title: 'Ender 3 Max Rebuild Log', tags: [['build', '#6b7280'], ['3D-printing', '#6c4f7d']], datePosted: 'March 2, 2026', shortDate: '3/2 - 2026', href: '/blog/hobbies' },
				{ title: 'Photography Notes From Recent Shoots', tags: [['photography', '#3f6f5a'], ['design', '#00c2b8']], datePosted: 'February 4, 2026', shortDate: '2/4 - 2026', href: '/blog/hobbies' },
				{ title: 'Linux Setup Changes Worth Keeping', tags: [['linux', '#4d5f2f'], ['code', '#2f5d7a']], datePosted: 'January 18, 2026', shortDate: '1/18 - 2026', href: '/blog/hobbies' }
			]
		}
	];
</script>

<div class="blog_page">
	<div class="blog_page__header">
		<h1 class="title_1">Blog</h1>
		<p class="blog_page__intro">
			A root table of contents for blog writing across projects, data, and hobbies. These
			entries are placeholders for now and can later be replaced with live post data.
		</p>
	</div>

	<BlogFeaturedCard post={featuredPost} />

	<BlogRecentStrip post={mostRecentPost} />

	<div class="blog_toc_grid">
		{#each tocGroups as group}
			<BlogTocGroup {group} />
		{/each}
	</div>
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

	.blog_toc_grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
	}

	@media (max-width: 768px) {
		.blog_page {
			gap: 2.4rem;
		}
	}
</style>
