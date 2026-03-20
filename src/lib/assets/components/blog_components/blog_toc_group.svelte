<script>
	import BlogTocMiddleCell from '$lib/assets/components/blog_components/blog_toc_middle_cell.svelte';

	let { group } = $props();
</script>

<section class="blog_toc_card" data-compact-header={group.compactHeader ?? false}>
	<div class="blog_toc_card__header">
		<h2 class="title_3">{group.title}</h2>
		{#if group.accentRule ?? false}
			<div class="blog_toc_card__rule" aria-hidden="true"></div>
		{/if}
	</div>
	<table class="blog_toc_table">
		<thead>
			<tr>
				<th scope="col">Title</th>
				{#if group.showMiddleColumn ?? true}
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
					{#if group.showMiddleColumn ?? true}
						<td>
							<BlogTocMiddleCell {item} />
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
