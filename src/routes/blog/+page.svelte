<script>
	import BlogFeaturedCard from '$lib/assets/components/blog_components/blog_featured_card.svelte';
	import BlogRecentStrip from '$lib/assets/components/blog_components/blog_recent_strip.svelte';
	import BlogTocMiddleCell from '$lib/assets/components/blog_components/blog_toc_middle_cell.svelte';

	let { data } = $props();
</script>

<div class="blog_page page_stack">
	<div class="blog_page__hero">
		<div class="blog_page__header page_header">
			<h1 class="title_1">{data.pageTitle}</h1>
			<div class="blog_page__intro page_intro prose prose--intro">{@html data.pageIntroHtml}</div>
		</div>

		<BlogFeaturedCard post={data.featuredPost} />
	</div>

	<BlogRecentStrip post={data.mostRecentPost} />

	<section class="blog_toc_card blog_toc_card--root">
		<table class="blog_toc_table blog_toc_table--root">
			<colgroup>
				<col class="blog_toc_table__title-col" />
				<col class="blog_toc_table__middle-col" />
				<col class="blog_toc_table__date-col" />
			</colgroup>
			<thead>
				<tr>
					<th scope="col">Title</th>
					<th class="blog_toc_table__middle-column" scope="col">Details</th>
					<th class="blog_toc_table__date-column" scope="col">Date Posted</th>
				</tr>
			</thead>
			<tbody>
				{#each data.tocGroups as group}
					<tr class="blog_toc_table__section-row">
						<th class="blog_toc_table__section-heading" colspan="3" scope="colgroup">
							<span class="title_3">{group.title}</span>
						</th>
					</tr>
					{#each group.items as item}
						<tr>
							<td>
								<a class="link_default" href={item.href}>{item.title}</a>
							</td>
							<td class="blog_toc_table__middle-column">
								<BlogTocMiddleCell {item} />
							</td>
							<td class="blog_toc_table__date-column">
								<span class="blog_toc_table__date-long">{item.datePosted}</span>
								<span class="blog_toc_table__date-short">{item.shortDate}</span>
							</td>
						</tr>
					{/each}
				{/each}
			</tbody>
		</table>
	</section>
</div>
