<script>
	import RichText from '$lib/assets/components/rich_text.svelte';

	let { project, hideDivider = false } = $props();

	/**
	 * @param {string} hex
	 */
	function getContrastTextColor(hex) {
		const normalized = hex.replace('#', '');
		const fullHex =
			normalized.length === 3
				? normalized
						.split('')
						.map((char) => char + char)
						.join('')
				: normalized;

		const red = parseInt(fullHex.slice(0, 2), 16);
		const green = parseInt(fullHex.slice(2, 4), 16);
		const blue = parseInt(fullHex.slice(4, 6), 16);
		const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

		return luminance > 0.6 ? '#111111' : '#ffffff';
	}
</script>

<li class:hide-divider={hideDivider} class="project_line">
	<div class="project_heading">
		<h3 class="title_3 project_title">{project.title}</h3>
		{#if project.timeRange}
			<p class="project_time_range">{project.timeRange}</p>
		{/if}
	</div>
	{#if project.tags?.length}
		<ul class="project_tags">
			{#each project.tags as [name, color]}
				<li
					class="project_tag"
					style={`background-color: ${color}; color: ${getContrastTextColor(color)};`}
				>
					#{name}
				</li>
			{/each}
		</ul>
	{/if}
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
	{#if project.linkHref && project.linkLabel}
		<a href={project.linkHref} class="live_site">{project.linkLabel}</a>
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
		}

		.project_tags {
			display: flex;
			flex-flow: row wrap;
			gap: 0.8rem;
			margin-bottom: 1.2rem;
			padding-left: 0;
		}

		.project_tag {
			margin-bottom: 0;
			padding: 0.4rem 1rem;
			border-radius: 999px;
			font-size: 1.4rem;
			font-weight: 600;
			list-style: none;
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
