<script>
	let { title } = $props();
</script>

<li class="project_section_break">
	<h3 class="project_section_break__title">{title}</h3>
	<span class="project_section_break__line" aria-hidden="true"></span>
</li>

<style lang="scss">
	.project_section_break {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.2rem;
		padding: 2.4rem 0 1.6rem;
	}

	.project_section_break__line {
		width: 80%;
		border-top: 0.1rem solid var(--border);
	}

	.project_section_break__title {
		color: var(--text-secondary);
		font-size: 1.4rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
</style>
