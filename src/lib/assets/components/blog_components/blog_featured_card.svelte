<script>
	import TagPillList from '$lib/assets/components/tag_pill_list.svelte';

	let { post } = $props();
</script>

<section class="featured_post_card surface_card">
	<h2 class="title_2">
		{post.title}
	</h2>
	<div class="featured_post_card__meta">
		<span>{post.category}</span>
		<span aria-hidden="true">|</span>
		<span>{post.datePosted}</span>
		{#if post.tags?.length}
			<span aria-hidden="true">|</span>
			<TagPillList tags={post.tags} listClass="featured_post_card__tags" itemClass="featured_post_card__tag" />
		{:else if post.metaDetail}
			<span aria-hidden="true">|</span>
			<span>{post.metaDetail}</span>
		{/if}
	</div>
	<p class="featured_post_card__summary">{post.summary}</p>
	<p class="featured_post_card__link_row">
		<a
			class="featured_post_card__link"
			href={post.href}
			aria-label={`View featured article: ${post.title}`}
		>
			View Article
		</a>
	</p>
</section>
