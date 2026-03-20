<script>
	let { content, ariaLabel = 'Tool links', pageClass = '' } = $props();
</script>

<div class={`tool_category_page page_stack ${pageClass}`.trim()}>
	<header class="tool_category_page__header page_header">
		<h1 class="title_1">{content.title}</h1>
		<p class="tool_category_page__intro page_intro">{content.intro}</p>
	</header>

	{#if content.tools?.length}
		<section class="tool_category_page__links" aria-label={ariaLabel}>
			{#each content.tools as item}
				<a class="tool_category_page__card surface_card" href={item.href}>
					<div class="tool_category_page__card_header surface_card__header">
						<div class="tool_category_page__title_row title_row">
							<h2 class="title_3">{item.title}</h2>
						</div>
					</div>
					<p>{item.description}</p>
					{#if item.items?.length}
						<ul class="card_list">
							{#each item.items as listItem}
								<li>{listItem}</li>
							{/each}
						</ul>
					{/if}
				</a>
			{/each}
		</section>
	{/if}
</div>
