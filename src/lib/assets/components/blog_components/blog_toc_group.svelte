<script>
	let { group } = $props();
	let showMiddleColumn = group.showMiddleColumn ?? true;

	/**
	 * @param {string} hex
	 */
	function getContrastTextColor(hex) {
		const normalized = hex.replace('#', '');
		const fullHex =
			normalized.length === 3
				? normalized
						.split('')
						.map((char) => char + char)
						.join('')
				: normalized;

		const red = parseInt(fullHex.slice(0, 2), 16);
		const green = parseInt(fullHex.slice(2, 4), 16);
		const blue = parseInt(fullHex.slice(4, 6), 16);
		const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

		return luminance > 0.6 ? '#111111' : '#ffffff';
	}
</script>

<section class="blog_toc_card">
	<div class="blog_toc_card__header">
		<h2 class="title_3">{group.title}</h2>
	</div>
	<table class="blog_toc_table">
		<thead>
			<tr>
				<th scope="col">Title</th>
				{#if showMiddleColumn}
					<th scope="col">{group.middleColumnTitle}</th>
				{/if}
				<th class="blog_toc_table__date-column" scope="col">Date Posted</th>
			</tr>
		</thead>
		<tbody>
			{#each group.items as item}
				<tr>
					<td>
						<a href={item.href}>{item.title}</a>
					</td>
					{#if showMiddleColumn}
						<td>
							{#if item.tags?.length}
								<ul class="blog_toc_tags">
									{#each item.tags as [name, color]}
										<li
											class="blog_toc_tag"
											style={`background-color: ${color}; color: ${getContrastTextColor(color)};`}
										>
											#{name}
										</li>
									{/each}
								</ul>
							{:else if item.stack?.length}
								<ul class="blog_toc_stack">
									{#each item.stack as stackItem}
										<li class="blog_toc_stack__item">{stackItem}</li>
									{/each}
								</ul>
							{/if}
						</td>
					{/if}
					<td class="blog_toc_table__date-column">
						<span class="blog_toc_table__date-long">{item.datePosted}</span>
						<span class="blog_toc_table__date-short">{item.shortDate}</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style lang="scss">
	.blog_toc_card {
		border: 0;
		background: transparent;
		box-shadow: none;
	}

	.blog_toc_card__header {
		padding: 0 0 1.2rem;
		border-bottom: 0;
	}

	.blog_toc_table {
		width: 100%;
		border-collapse: collapse;
	}

	.blog_toc_table th,
	.blog_toc_table td {
		padding: 1.2rem 0;
		text-align: left;
		vertical-align: top;
	}

	.blog_toc_table thead th {
		color: var(--text-secondary);
		font-size: 1.2rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		border-bottom: 0.1rem solid color-mix(in srgb, var(--border) 60%, transparent);
	}

	.blog_toc_table tbody tr:not(:last-child) td {
		border-bottom: 0.1rem solid color-mix(in srgb, var(--border) 78%, transparent);
	}

	.blog_toc_table a {
		color: var(--text);
		text-decoration: none;
	}

	.blog_toc_table a:hover,
	.blog_toc_table a:focus-visible {
		text-decoration: underline;
	}

	.blog_toc_tags,
	.blog_toc_stack {
		display: flex;
		flex-flow: row wrap;
		gap: 0.8rem;
		margin: 0;
		padding-left: 0;
	}

	.blog_toc_tag,
	.blog_toc_stack__item {
		list-style: none;
		margin-bottom: 0;
	}

	.blog_toc_tag {
		padding: 0.4rem 1rem;
		border-radius: 999px;
		font-size: 1.4rem;
		font-weight: 600;
		transition:
			background-color 160ms ease,
			color 160ms ease,
			transform 160ms ease;
	}

	.blog_toc_table tbody tr:hover .blog_toc_tag,
	.blog_toc_table tbody tr:focus-within .blog_toc_tag {
		transform: translateY(-0.1rem);
	}

	.blog_toc_stack__item {
		color: var(--text-secondary);
		font-size: 1.4rem;
	}

	.blog_toc_stack__item:not(:last-child)::after {
		content: '|';
		margin-left: 0.8rem;
	}

	.blog_toc_table__date-short {
		display: none;
	}

	.blog_toc_table th.blog_toc_table__date-column,
	.blog_toc_table td.blog_toc_table__date-column {
		text-align: right;
	}

	@media (max-width: 1200px) {
		.blog_toc_table__date-long {
			display: none;
		}

		.blog_toc_table__date-short {
			display: inline;
		}
	}

	@media (max-width: 768px) {
	}
</style>
