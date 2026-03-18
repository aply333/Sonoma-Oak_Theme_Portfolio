<script>
	import AboutMe from '$lib/assets/components/about__components/about_me.svelte';
	import OakAccent from '$lib/assets/components/accent__components/oak_accent.svelte';
	import ProjectGallery from '$lib/assets/components/project__components/project_gallery.svelte';
	import RichText from '$lib/assets/components/rich_text.svelte';
	import content from '$lib/assets/content.json';
</script>

<div class="grid_wrapper home_page">
	<div class="title_heading fx-blur-frame fx-blur-frame--tablet-only">
		<h1 class="title_1">
			<RichText text={content.hero.title} />
		</h1>
		<p class="subscript_1">
			<RichText text={content.hero.subtitle} />
		</p>
	</div>
	<div class="about_me_grid">
		<div class="home_accent" aria-hidden="true">
			<OakAccent />
		</div>
		<div class="about_me_content">
			<AboutMe content={content.about} />
		</div>
	</div>
	<div class="projects_grid">
		<ProjectGallery content={content.projects} />
	</div>
</div>

<style lang="scss">
	.home_page {
		position: relative;
		isolation: isolate;
	}

	.title_heading {
		grid-column: 1 / 6;
		margin-bottom: calc(var(--section-gap) * 2.6);
		position: relative;
		z-index: 1;

		h1 {
			margin-bottom: 1.4rem;
		}

		p {
			font-size: 2.4rem;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		.title_heading.fx-blur-frame--tablet-only::after {
			background-color: color-mix(in srgb, var(--bg) 72%, transparent);
		}
	}

	.about_me_grid {
		grid-column: 1 / 10;
		margin-bottom: var(--section-gap);
		position: relative;
	}

	.about_me_content {
		position: relative;
		z-index: 1;
	}

	.home_accent {
		position: absolute;
		top: -44rem;
		right: 0;
		width: 244rem;
		pointer-events: none;
		z-index: -1;
		transform: translate(52%, -20%);
	}

	.projects_grid {
		grid-column: 1 / 10;
		position: relative;
		z-index: 1;
		padding-top: 5.6rem;
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--bg-secondary) 0%, transparent) 0%,
			color-mix(in srgb, var(--bg-secondary) 52%, transparent) 18%,
			color-mix(in srgb, var(--bg-secondary) 84%, transparent) 36%,
			var(--bg-secondary) 56%,
			var(--bg-secondary) 100%
		);
	}

	@media (min-width: 1920px) {
		.home_accent {
			width: 264rem;
			transform: translate(54%, -20%);
		}
	}

	@media (max-width: 768px) {
		.title_heading,
		.about_me_grid,
		.projects_grid {
			grid-column: 1 / -1;
		}

		.home_accent {
			top: -50rem;
			width: min(154rem, 242vw);
			transform: translate(50%, -20%);
		}

		.title_heading {
			margin-top: 16rem;
			margin-bottom: calc(var(--section-gap) * 1.5);

			p {
				font-size: 2rem;
				max-width: 80%;
			}
			
		}

		.projects_grid {
			padding-top: 14.4rem;
		}
	}
</style>
