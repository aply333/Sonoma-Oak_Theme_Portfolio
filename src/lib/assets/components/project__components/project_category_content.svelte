<script>
	import { fade } from 'svelte/transition';
	import ProjectCategoryList from '$lib/assets/components/project__components/project_category_list.svelte';

	let { category, enableTransition = false } = $props();

	/** @param {unknown} project */
	function resolveProject(project) {
		if (
			!project ||
			typeof project !== 'object' ||
			!category?.tagCatalog ||
			!('tagIndexes' in project) ||
			!Array.isArray(project.tagIndexes) ||
			!project.tagIndexes.length
		) {
			return project;
		}

		return {
			...project,
			tags: project.tagIndexes
				.map(/** @param {number} index */ (index) => category.tagCatalog[index])
				.filter(Boolean)
		};
	}
</script>

{#if enableTransition}
	<ul class="project_list" transition:fade={{ duration: 180 }}>
		<ProjectCategoryList {category} {resolveProject} />
	</ul>
{:else}
	<ul class="project_list">
		<ProjectCategoryList {category} {resolveProject} />
	</ul>
{/if}

<style lang="scss">
	.project_list {
		grid-column: 1 / 9;
	}

	@media (max-width: 768px) {
		.project_list {
			grid-column: 1 / -1;
		}
	}
</style>
