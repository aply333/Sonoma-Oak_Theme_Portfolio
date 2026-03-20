<script>
	let { post } = $props();
</script>

<a class="most_recent_strip surface_card" href={post.href}>
	<span class="most_recent_strip__label">Most Recent Article</span>
	<span class="most_recent_strip__title">{post.title}</span>
	<span class="most_recent_strip__meta">{post.category} · {post.datePosted}</span>
</a>
