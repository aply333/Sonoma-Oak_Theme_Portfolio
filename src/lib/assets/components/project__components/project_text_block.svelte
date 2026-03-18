<script>
	import RichText from '$lib/assets/components/rich_text.svelte';

	let { title, body } = $props();
</script>

<li class="project_reflection">
	<div class="project_reflection__heading">
		<span class="project_reflection__line" aria-hidden="true"></span>
		<h3 class="project_reflection__title">{title}</h3>
		<span class="project_reflection__line" aria-hidden="true"></span>
	</div>
	<p class="project_reflection__body"><RichText text={body} /></p>
</li>

<style lang="scss">
	.project_reflection {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 3.2rem 0 1.6rem;
	}

	.project_reflection__heading {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		margin-bottom: 1.6rem;
		width: 100%;
	}

	.project_reflection__line {
		flex: 1;
		border-top: 0.1rem solid var(--border);
	}

	.project_reflection__title {
		flex-shrink: 0;
		color: var(--text-secondary);
		font-size: 1.4rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.project_reflection__body {
		max-width: 100rem;
		padding-left: 0;
		text-align: center;
	}
</style>
