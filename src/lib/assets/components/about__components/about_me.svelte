<script>
	import AboutLinks from '$lib/assets/components/about__components/about_links.svelte';
	import AboutHighlights from '$lib/assets/components/about__components/about_highlights.svelte';
	import RichText from '$lib/assets/components/rich_text.svelte';

	let { content } = $props();
</script>

<div class="grid_wrapper about_me">
	<h2 class="title_2 about_heading">{content.title}</h2>
	<div class="main_text fx-blur-frame fx-blur-frame--mobile-light-only">
		{#each content.paragraphs as paragraph}
			<p><RichText text={paragraph} /></p>
		{/each}
	</div>
	<AboutHighlights highlights={content.highlights} />
	<AboutLinks links={content.links} />
</div>

<style lang="scss">
	.about_heading {
		grid-column: span 9;
	}

	.main_text {
		grid-column: 1 / 6;
		padding-right: 4.8rem;

		p {
			margin-bottom: 1.24rem;
		}
	}

	@media (max-width: 768px) {
		.about_heading,
		.main_text {
			grid-column: 1 / -1;
		}

		.main_text {
			padding-right: 0;
		}
	}
</style>
