<script>
	let { portableText } = $props();

	const value = $derived.by(() => portableText?.value);
	const isCentered = $derived.by(() => value?.layout === 'center');
	const hasLabel = $derived.by(() => Boolean(value?.label));
</script>

<div
	class={`blog_section_break section_rule ${isCentered ? 'blog_section_break--center' : 'blog_section_break--left'} ${hasLabel ? '' : 'blog_section_break--unlabeled'}`.trim()}
	aria-hidden="true"
>
	{#if hasLabel}
		<div class="blog_section_break__rule blog_section_break__rule--left section_rule__line"></div>
		<span class="blog_section_break__label section_rule__label">{value.label}</span>
	{/if}
	<div class="blog_section_break__rule section_rule__line"></div>
</div>
