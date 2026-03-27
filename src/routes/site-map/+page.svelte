<script>
	import LiveLinkSearch from '$lib/assets/components/search__components/live_link_search.svelte';

	let { data } = $props();
	let search_value = $state('');

	function normalizeValue(value) {
		return value.trim().toLowerCase();
	}

	const suggestion_items = $derived.by(() => {
		const items = [];

		for (const section of data.sections ?? []) {
			for (const page of section.pages ?? []) {
				items.push({
					title: page.title,
					href: page.href,
					context: section.title
				});

				for (const download of page.downloads ?? []) {
					items.push({
						title: download.title,
						href: download.href,
						context: `${page.title} download`
					});
				}

				for (const child of page.children ?? []) {
					items.push({
						title: child.title,
						href: child.href,
						context: page.title
					});

					for (const download of child.children ?? []) {
						items.push({
							title: download.title,
							href: download.href,
							context: `${child.title} download`
						});
					}
				}
			}
		}

		return items;
	});

	const filtered_sections = $derived.by(() => {
		const query = normalizeValue(search_value);

		if (!query) {
			return data.sections;
		}

		return (data.sections ?? [])
			.map((section) => {
				const pages = (section.pages ?? [])
					.map((page) => {
						const page_matches = normalizeValue(page.title).includes(query);
						const downloads = (page.downloads ?? []).filter((download) =>
							normalizeValue(download.title).includes(query)
						);
						const children = (page.children ?? [])
							.map((child) => {
								const child_matches = normalizeValue(child.title).includes(query);
								const child_downloads = (child.children ?? []).filter((download) =>
									normalizeValue(download.title).includes(query)
								);

								if (child_matches) {
									return child;
								}

								if (child_downloads.length) {
									return {
										...child,
										children: child_downloads
									};
								}

								return null;
							})
							.filter(Boolean);

						if (page_matches) {
							return page;
						}

						if (downloads.length || children.length) {
							return {
								...page,
								downloads,
								children
							};
						}

						return null;
					})
					.filter(Boolean);

				if (!pages.length) {
					return null;
				}

				return {
					...section,
					pages
				};
			})
			.filter(Boolean);
	});
</script>

<div class="site_map_page page_stack">
	<header class="site_map_page__header page_header">
		<h1 class="title_1">{data.pageTitle}</h1>
		<div class="site_map_page__intro page_intro prose prose--intro">{@html data.pageIntroHtml}</div>
	</header>

	<section class="site_map_page__search surface_card" aria-label="Site map search">
		<LiveLinkSearch
			items={suggestion_items}
			label="Search the site map"
			placeholder="Search pages, articles, and downloads"
			inputId="site-map-search"
			bind:query={search_value}
		/>
	</section>

	<nav class="site_map_page__tree" aria-label="Site Map">
		{#each filtered_sections as section}
			<section class="site_map_page__section surface_card">
				<div class="site_map_page__section_header surface_card__header">
					<h2 class="title_2">{section.title}</h2>
				</div>

				<ul class="site_map_page__section_list">
					{#each section.pages as page}
						<li class="site_map_page__item">
							<a class="site_map_page__page_link link_default" href={page.href}>{page.title}</a>

							{#if page.downloads?.length}
								<ul class="site_map_page__child_list">
									{#each page.downloads as download}
										<li class="site_map_page__child_item">
											<a
												class="site_map_page__child_link link_default"
												href={download.href}
												download
											>
												{download.title}
											</a>
										</li>
									{/each}
								</ul>
							{/if}

							{#if page.children?.length}
								<ul class="site_map_page__child_list">
									{#each page.children as child}
										<li class="site_map_page__child_item">
											<a class="site_map_page__child_link link_default" href={child.href}>
												{child.title}
											</a>

											{#if child.children?.length}
												<ul class="site_map_page__grandchild_list">
													{#each child.children as download}
														<li class="site_map_page__child_item">
															<a
																class="site_map_page__child_link link_default"
																href={download.href}
																download
															>
																{download.title}
															</a>
														</li>
													{/each}
												</ul>
											{/if}
										</li>
									{/each}
								</ul>
							{/if}
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</nav>
</div>

<style lang="scss">
	.site_map_page {
		--local-page-gap: clamp(3.2rem, 4vw, 4.8rem);
		padding-bottom: 6rem;
	}

	.site_map_page__tree {
		display: grid;
		gap: 2rem;
	}

	.site_map_page__search {
		gap: 1.6rem;
	}

	.site_map_page__section {
		gap: 2rem;
	}

	.site_map_page__section_list {
		display: grid;
		gap: 1.4rem;
		margin: 0;
		padding-left: calc(var(--inline-space) + 1.8rem);
	}

	.site_map_page__page_link {
		width: fit-content;
		color: var(--text);
		font-size: 1.9rem;
		font-weight: 600;
		text-decoration: none;
	}

	.site_map_page__child_list {
		display: grid;
		gap: 0.9rem;
		margin: 1rem 0 0;
		padding-left: calc(var(--inline-space) + 1.2rem);
	}

	.site_map_page__grandchild_list {
		display: grid;
		gap: 0.8rem;
		margin: 0.9rem 0 0;
		padding-left: 1.8rem;
	}

	.site_map_page__item::marker,
	.site_map_page__child_item::marker {
		color: var(--text-secondary);
	}

	.site_map_page__child_link {
		width: fit-content;
		color: var(--text-secondary);
		text-decoration: none;
	}

	@media (max-width: 768px) {
		.site_map_page {
			padding-bottom: 4rem;
		}

		.site_map_page__section_list {
			padding-left: 1.8rem;
		}

		.site_map_page__child_list {
			padding-left: 1.6rem;
		}
	}
</style>
