<script>
	import ProjectCategoryContent from '$lib/assets/components/project__components/project_category_content.svelte';
	import ProjectNav from '$lib/assets/components/project__components/project_nav.svelte';

	let { content } = $props();
	let activeCategory = $state();
	let transitionsEnabled = $state(false);
	let visibleCategory = $derived.by(() => content.categories[activeCategory] ?? []);

	/** @param {string} category */
	function setActiveCategory(category) {
		activeCategory = category;
	}

	$effect(() => {
		if (!activeCategory) {
			activeCategory = content.nav.primary;
		}

		if (!transitionsEnabled) {
			transitionsEnabled = true;
		}
	});
</script>

<div class="grid_wrapper project_gallery">
	<h2 class="title_2">{content.title}</h2>
	<p class="intro_text">{content.intro}</p>
	<ProjectNav nav={content.nav} {activeCategory} onSelect={setActiveCategory} />
	<div
		class="grid_wrapper project_view"
		role="tabpanel"
		id="project-panel"
		aria-label={`${activeCategory} projects`}
		tabindex="0"
	>
		{#key activeCategory}
			<ProjectCategoryContent category={visibleCategory} enableTransition={transitionsEnabled} />
		{/key}
	</div>
</div>

<style lang="scss">
	.title_2 {
		grid-column: span 9;
	}

	.intro_text {
		grid-column: span 6;
		margin-bottom: 2.4rem;
	}

	.project_view {
		grid-column: span 9;
		padding: 0 var(--inline-space);
		padding-bottom: 4rem;
	}

	@media (max-width: 768px) {
		.title_2,
		.intro_text,
		.project_view {
			grid-column: 1 / -1;
		}

		.project_view {
			padding: 0;
			padding-bottom: 4rem;
		}
	}
</style>
