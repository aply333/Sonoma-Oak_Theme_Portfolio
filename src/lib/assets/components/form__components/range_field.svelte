<script>
	let { id, name, label, prompt, min = 1, max = 10, step = 1, value = min, scale = [] } = $props();
</script>

<fieldset class="form_group">
	<legend>{label}</legend>
	{#if prompt}
		<p>{prompt}</p>
	{/if}

	<label for={id}>{`Intensity (${min} to ${max})`}</label>
	<input type="range" {id} {name} {min} {max} {step} {value} />

	{#if scale.length}
		<div class="form_scale">
			{#each scale as item}
				<p class="form_scale__item">
					<span class="form_scale__marker">{item.marker}</span>
					<span>{item.label}</span>
				</p>
			{/each}
		</div>
	{/if}
</fieldset>
