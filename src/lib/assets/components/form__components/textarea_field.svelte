<script>
	let {
		id,
		name,
		label,
		rows = 5,
		placeholder = '',
		required = false
	} = $props();
</script>

<div class="form_field">
	<label for={id}>{label}</label>
	<textarea {id} {name} {rows} {placeholder} {required}></textarea>
</div>
