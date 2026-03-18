<script>
	import ProjectLine from '$lib/assets/components/project__components/project_line.svelte';
	import ProjectSectionHeader from '$lib/assets/components/project__components/project_section_header.svelte';
	import ProjectTextBlock from '$lib/assets/components/project__components/project_text_block.svelte';

	let { category, resolveProject } = $props();

	/** @param {{ items?: unknown[] } | unknown[]} categoryData */
	function getItems(categoryData) {
		return Array.isArray(categoryData) ? categoryData : categoryData.items ?? [];
	}
</script>

{#if category.sections}
	{#each category.sections as section}
		<ProjectSectionHeader title={section.title} />
		{#each section.items as project, projectIndex}
			<ProjectLine
				project={resolveProject(project)}
				hideDivider={projectIndex === section.items.length - 1}
			/>
		{/each}
	{/each}
	{#if category.reflection}
		<ProjectTextBlock title={category.reflection.title} body={category.reflection.body} />
	{/if}
{:else}
	{#if category.introSection}
		<ProjectTextBlock title={category.introSection.title} body={category.introSection.body} />
	{/if}
	{#each getItems(category) as project}
		<ProjectLine project={resolveProject(project)} />
	{/each}
{/if}
