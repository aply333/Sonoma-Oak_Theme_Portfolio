<script>
	let {
		id,
		name,
		label,
		type = 'text',
		placeholder = '',
		required = false
	} = $props();
</script>

<div class="form_field">
	<label for={id}>{label}</label>
	<input {type} {id} {name} {placeholder} {required} />
</div>
