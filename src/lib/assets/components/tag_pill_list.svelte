<script>
	import { getContrastTextColor } from '$lib/utils/color.js';

	let { tags = [], listClass = '', itemClass = '', prefix = '#' } = $props();
</script>

<ul class={`tag_pill_list list_reset ${listClass}`.trim()}>
	{#each tags as [name, color]}
		<li
			class={`tag_pill ${itemClass}`.trim()}
			style={`background-color: ${color}; color: ${getContrastTextColor(color)};`}
		>
			{prefix}{name}
		</li>
	{/each}
</ul>
