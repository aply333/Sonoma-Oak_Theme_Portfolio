<script>
	let { legend, prompt, name, options = [] } = $props();
</script>

<fieldset class="form_group">
	<legend>{legend}</legend>
	{#if prompt}
		<p>{prompt}</p>
	{/if}

	{#each options as option}
		<div class="form_option">
			<input type="radio" id={option.id} {name} value={option.value} />
			<label for={option.id} class="form_option__label">
				{#if option.marker}
					<span class="form_option__marker">{option.marker}</span>
				{/if}
				<span class="form_option__text">{option.label}</span>
			</label>
		</div>
	{/each}
</fieldset>
