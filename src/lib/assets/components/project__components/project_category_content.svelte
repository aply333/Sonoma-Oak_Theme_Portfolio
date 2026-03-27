<script>
	import { fade } from 'svelte/transition';
	import ProjectCategoryList from '$lib/assets/components/project__components/project_category_list.svelte';

	let { category, enableTransition = false } = $props();
</script>

{#if enableTransition}
	<ul class="project_list list_reset" transition:fade={{ duration: 180 }}>
		<ProjectCategoryList {category} />
	</ul>
{:else}
	<ul class="project_list list_reset">
		<ProjectCategoryList {category} />
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
