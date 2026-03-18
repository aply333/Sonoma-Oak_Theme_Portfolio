<script>
	let { highlights } = $props();
</script>

<div class="highlight">
	{#each highlights as section}
		<div class="skill_set fx-blur-frame fx-blur-frame--tablet-down">
			<h3 class="title_3 highlight__title">{section.title}</h3>
			<ul class="skill_list">
				{#each section.items as item}
					<li class="skill_item">{item}</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style lang="scss">
	.highlight {
		grid-column: 6 / 9;

		&__title {
			margin-bottom: 1.24rem;
		}
	}

	.skill_set {
		padding: 1.2rem;
		margin-bottom: 1.2rem;
	}

	.skill_list {
		display: flex;
		flex-flow: row wrap;
		margin-bottom: 0;
	}

	.skill_item::after {
		content: ',';
		margin-right: 0.35rem;
	}

	.skill_item:last-child::after {
		content: '';
		margin-right: 0;
	}

	@media (max-width: 768px) {
		.highlight {
			grid-column: 1 / -1;
			padding-left: var(--inline-space);
			padding-right: var(--inline-space);
		}

		.skill_set {
			padding: 1.4rem;
		}
	}
</style>
