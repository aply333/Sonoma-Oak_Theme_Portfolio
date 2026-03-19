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
			'A closer breakdown of how the portfolio shifted from a static presentation into a more structured content system, including schema updates, page composition, and planned post rendering.'
	};

	const mostRecentPost = {
		title: 'Building the Portfolio System',
		datePosted: 'March 10, 2026',
		category: 'Projects',
		href: '/blog/projects'
	};

	const tocGroup = {
		title: 'Project Posts',
		middleColumnTitle: 'Stack',
		items: [
			{ title: 'Building the Portfolio System', stack: ['Svelte', 'Sanity'], datePosted: 'March 10, 2026', shortDate: '3/10 - 2026', href: '/blog/projects' },
			{ title: 'Reworking the Project Gallery', stack: ['Svelte', 'SCSS'], datePosted: 'February 21, 2026', shortDate: '2/21 - 2026', href: '/blog/projects' },
			{ title: 'Notes on Client Build Process', stack: ['WordPress', 'React'], datePosted: 'January 14, 2026', shortDate: '1/14 - 2026', href: '/blog/projects' }
		]
	};
</script>

<div class="blog_page">
	<div class="blog_page__header">
		<h1 class="title_1">Projects</h1>
		<p class="blog_page__intro">
			Longer project write-ups, process notes, implementation details, and post-build review.
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
