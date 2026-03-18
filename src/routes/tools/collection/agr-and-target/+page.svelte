<script>
	import content from './agr_target_content.json';
	import RadioGroup from '$lib/assets/components/form__components/radio_group.svelte';
	import RangeField from '$lib/assets/components/form__components/range_field.svelte';
	import SubmitButton from '$lib/assets/components/form__components/submit_button.svelte';
	import TextInput from '$lib/assets/components/form__components/text_input.svelte';
	import TextareaField from '$lib/assets/components/form__components/textarea_field.svelte';
</script>

<div class="tool_page page_stack content_width">
	<div class="tool_page__title_row title_row">
		<h1 class="title_1">{content.title}</h1>
	</div>
	{#each content.intro as paragraph}
		<p>{paragraph}</p>
	{/each}
	<hr/>
	<form action="#" method="post">
		{#each content.textInputs as field}
			<TextInput id={field.id} name={field.name} label={field.label} />
		{/each}

		{#each content.radioGroups as group}
			<RadioGroup
				legend={group.legend}
				prompt={group.prompt}
				name={group.name}
				options={group.options}
			/>
		{/each}

		<RangeField
			id={content.rangeField.id}
			name={content.rangeField.name}
			label={content.rangeField.label}
			prompt={content.rangeField.prompt}
			min={content.rangeField.min}
			max={content.rangeField.max}
			step={content.rangeField.step}
			value={content.rangeField.value}
			scale={content.rangeField.scale}
		/>

		<TextareaField
			id={content.textareaField.id}
			name={content.textareaField.name}
			label={content.textareaField.label}
			rows={content.textareaField.rows}
			placeholder={content.textareaField.placeholder}
		/>

		<SubmitButton label={content.submitLabel} />
	</form>
</div>

<style lang="scss">
	.tool_page p {
		padding-left: 0;
	}
</style>
