<script>
	import BlogFeaturedCard from '$lib/assets/components/blog_components/blog_featured_card.svelte';
	import BlogRecentStrip from '$lib/assets/components/blog_components/blog_recent_strip.svelte';
	import BlogTocGroup from '$lib/assets/components/blog_components/blog_toc_group.svelte';

	const featuredPost = {
		title: 'Early Analysis Planning Notes',
		datePosted: 'March 6, 2026',
		category: 'Data',
		href: '/blog/data',
		summary:
			'Planning notes on shaping early data work into something measurable, including scope questions, source review, and what to clean up before analysis starts.'
	};

	const mostRecentPost = {
		title: 'Early Analysis Planning Notes',
		datePosted: 'March 6, 2026',
		category: 'Data',
		href: '/blog/data'
	};

	const tocGroup = {
		title: 'Data Posts',
		middleColumnTitle: 'Stack',
		items: [
			{ title: 'Early Analysis Planning Notes', stack: ['Python', 'CSV'], datePosted: 'March 6, 2026', shortDate: '3/6 - 2026', href: '/blog/data' },
			{ title: 'Structuring a Small Reporting Workflow', stack: ['Sheets', 'SQL'], datePosted: 'February 12, 2026', shortDate: '2/12 - 2026', href: '/blog/data' },
			{ title: 'Questions Before a First Dataset Pass', stack: ['Python', 'Pandas'], datePosted: 'January 29, 2026', shortDate: '1/29 - 2026', href: '/blog/data' }
		]
	};
</script>

<div class="blog_page">
	<div class="blog_page__header">
		<h1 class="title_1">Data</h1>
		<p class="blog_page__intro">
			Data-focused notes, early project breakdowns, reporting workflow ideas, and analysis planning.
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
