<script>
	let { title } = $props();
</script>

<li class="project_section_break section_rule">
	<h3 class="project_section_break__title section_rule__label">{title}</h3>
	<span class="project_section_break__line section_rule__line" aria-hidden="true"></span>
</li>

<style lang="scss">
	.project_section_break {
		--section-rule-align: center;
		--section-rule-gap: 1.2rem;
		--section-rule-padding: 2.4rem 0 1.6rem;
		--section-rule-width: 80%;
		--section-rule-thickness: 0.1rem;
		--section-rule-border: 0.1rem solid var(--border);
		--section-rule-label-size: 1.4rem;
	}
</style>
