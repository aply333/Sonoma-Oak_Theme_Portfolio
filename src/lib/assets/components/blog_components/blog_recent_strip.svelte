<script>
	let { post } = $props();
</script>

<a class="most_recent_strip" href={post.href}>
	<span class="most_recent_strip__label">Most Recent Article</span>
	<span class="most_recent_strip__title">{post.title}</span>
	<span class="most_recent_strip__meta">{post.category} · {post.datePosted}</span>
</a>

<style lang="scss">
	.most_recent_strip {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 1.6rem;
		align-items: center;
		padding: 1.2rem 1.6rem;
		border: 0.1rem solid var(--border);
		background-color: color-mix(in srgb, var(--bg-secondary) 70%, transparent);
		color: var(--text);
		text-decoration: none;
	}

	.most_recent_strip__label {
		color: var(--text-secondary);
		font-size: 1.2rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.most_recent_strip__title {
		font-weight: 600;
	}

	.most_recent_strip__meta {
		color: var(--text-secondary);
		font-size: 1.4rem;
		text-align: right;
	}

	.most_recent_strip:hover .most_recent_strip__title,
	.most_recent_strip:focus-visible .most_recent_strip__title {
		text-decoration: underline;
	}

	@media (max-width: 1024px) {
		.most_recent_strip {
			grid-template-columns: 1fr;
			gap: 0.6rem;
		}

		.most_recent_strip__meta {
			text-align: left;
		}
	}
</style>
