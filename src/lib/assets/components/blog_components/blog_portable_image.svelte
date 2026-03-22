<script>
	let { portableText } = $props();

	const value = $derived.by(() => portableText?.value);
	const imageUrl = $derived.by(
		() => value?.url || value?.asset?.url || value?.assetData?.url || ''
	);
	const imageAlt = $derived.by(() => value?.alt || value?.caption || '');
</script>

{#if imageUrl}
	<figure class="blog_portable_image">
		<img src={imageUrl} alt={imageAlt} loading="lazy" />
		{#if value.caption}
			<figcaption>{value.caption}</figcaption>
		{/if}
	</figure>
{/if}
