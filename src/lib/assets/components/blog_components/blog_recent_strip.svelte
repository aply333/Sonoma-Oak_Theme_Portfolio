<script>
	let { post } = $props();
</script>

<a class="most_recent_strip surface_card link_default" href={post.href}>
	<span class="most_recent_strip__label">Latest Article</span>
	<span class="most_recent_strip__title">{post.title}</span>
	<span class="most_recent_strip__meta">{post.category} · {post.datePosted}</span>
</a>
