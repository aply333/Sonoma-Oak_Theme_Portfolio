<script>
	let { value } = $props();
</script>

<div class="blog_section_break section_rule" aria-hidden="true">
	<div class="blog_section_break__rule section_rule__line"></div>
	{#if value?.label}
		<span class="blog_section_break__label section_rule__label">{value.label}</span>
	{/if}
</div>
