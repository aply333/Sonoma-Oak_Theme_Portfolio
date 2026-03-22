<script>
	import RichText from '$lib/assets/components/rich_text.svelte';
	import TagPillList from '$lib/assets/components/tag_pill_list.svelte';

	let { project, hideDivider = false } = $props();

	/** @typedef {{ label?: string, href?: string }} ProjectLink */

	const links = $derived.by(() => {
		if (project.links?.length) {
			return (/** @type {ProjectLink[]} */ (project.links)).filter((item) => item?.label && item?.href);
		}

		return project.linkHref && project.linkLabel
			? [{ label: project.linkLabel, href: project.linkHref }]
			: [];
	});
</script>

<li class:hide-divider={hideDivider} class="project_line">
	<div class="project_heading">
		<h3 class="title_3 project_title">{project.title}</h3>
		{#if project.timeRange}
			<p class="project_time_range">{project.timeRange}</p>
		{/if}
	</div>
	{#if project.role}
		<p class="project_role">{project.role}</p>
	{/if}
	<p class="about_project"><RichText text={project.description} /></p>
	{#if project.responsibilities?.length}
		<ul class="project_responsibilities">
			{#each project.responsibilities as responsibility}
				<li><RichText text={responsibility} /></li>
			{/each}
		</ul>
	{/if}
	{#if project.stack?.length}
		<ul class="project_stack">
			{#each project.stack as item}
				<li class="project_stack__item">{item}</li>
			{/each}
		</ul>
	{/if}
	{#if project.tags?.length}
		<TagPillList
			tags={project.tags}
			listClass={`project_tags ${links.length ? 'project_tags--with-links' : ''}`.trim()}
			itemClass="project_tag"
		/>
	{/if}
	{#if links.length}
		<p class="project_links">
			{#each links as link, index}
				<a href={link.href} class="live_site link_default" aria-label={`${link.label}: ${project.title}`}>
					{link.label}
				</a>
				{#if index < links.length - 1}
					<span class="project_links__separator" aria-hidden="true">|</span>
				{/if}
			{/each}
		</p>
	{/if}
</li>

<style lang="scss">
	.project_line {
		position: relative;
		padding: 1.6rem 0;
		margin-bottom: 2.4rem;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 50%;
			width: 80%;
			border-bottom: 0.1rem solid var(--border);
			transform: translateX(-50%);
		}

		&:last-child::after {
			content: none;
		}

		&.hide-divider::after {
			content: none;
		}

		.project_heading {
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			gap: 1.6rem;
			margin-bottom: 1.2rem;
		}

		.project_title {
			margin-bottom: 0;
			font-weight: 550;
		}

		p {
			padding-left: 0;
			margin-bottom: 1.2rem;
		}

		.project_time_range {
			flex-shrink: 0;
			color: var(--text-secondary);
			font-size: 1.4rem;
			margin-bottom: 0;
		}

		.project_role {
			color: var(--text-secondary);
			font-weight: 600;
		}

		.project_responsibilities {
			margin-bottom: 1.2rem;
			padding-left: 2rem;
			list-style: disc;

			li {
				margin-bottom: 0.6rem;
			}

			li:last-child {
				margin-bottom: 0;
			}
		}

		.project_stack {
			display: flex;
			flex-wrap: wrap;
			gap: 0.8rem;
			margin-bottom: 1.2rem;
			padding-left: 0;
		}

		.project_stack__item {
			list-style: none;
			color: var(--text-secondary);
			font-size: 1.4rem;
		}

		.project_stack__item:not(:last-child)::after {
			content: '|';
			margin-left: 0.8rem;
		}

		.live_site {
			color: var(--primary);
		}

		.project_links {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 0.8rem;
		}

		.project_links__separator {
			color: var(--text-secondary);
		}

		:global(.project_tags--with-links) {
			margin-bottom: 2.4rem;
		}
	}

	@media (max-width: 768px) {
		.project_line {
			margin-bottom: 1.6rem;

			.project_heading {
				flex-direction: column;
				align-items: flex-start;
				gap: 0.6rem;
			}

			.project_time_range {
				font-size: 1.3rem;
			}
		}
	}
</style>
