<script>
	let { post } = $props();
</script>

<section class="featured_post_card">
	<p class="featured_post_card__eyebrow">Featured Article</p>
	<h2 class="title_2">
		<a href={post.href}>{post.title}</a>
	</h2>
	<p class="featured_post_card__meta">
		<span>{post.category}</span>
		<span>{post.datePosted}</span>
	</p>
	<p class="featured_post_card__summary">{post.summary}</p>
</section>

<style lang="scss">
	.featured_post_card {
		display: grid;
		gap: 1.2rem;
		padding: 2.4rem;
		border: 0.1rem solid var(--border);
		background:
			linear-gradient(135deg, color-mix(in srgb, var(--bg-secondary) 82%, white 18%) 0%, var(--bg-secondary) 100%);
		box-shadow: var(--shadow-soft);
	}

	.featured_post_card__eyebrow {
		margin: 0;
		color: var(--text-secondary);
		font-size: 1.2rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.featured_post_card h2 a {
		color: var(--text);
		text-decoration: none;
	}

	.featured_post_card h2 a:hover,
	.featured_post_card h2 a:focus-visible {
		text-decoration: underline;
	}

	.featured_post_card__meta {
		display: flex;
		flex-wrap: wrap;
		gap: 1.2rem;
		margin: 0;
		color: var(--text-secondary);
		font-size: 1.4rem;
	}

	.featured_post_card__summary {
		max-width: 78rem;
		margin: 0;
	}

	@media (max-width: 768px) {
		.featured_post_card {
			padding: 1.8rem;
		}
	}
</style>
