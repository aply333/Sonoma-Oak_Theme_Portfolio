<script>
	let { value } = $props();
</script>

{#if value?.url}
	<figure class="blog_portable_image">
		<img src={value.url} alt={value.alt || ''} loading="lazy" />
		{#if value.caption}
			<figcaption>{value.caption}</figcaption>
		{/if}
	</figure>
{/if}
