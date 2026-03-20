<script>
	import { page } from '$app/state';

	let { ariaLabel, leftItems = [], rightItems = [], className = '' } = $props();
</script>

<nav class={`route_section_nav ${className}`.trim()} aria-label={ariaLabel}>
	<div class="route_section_nav__group">
		{#each leftItems as item}
			{#if item.href}
				<a
					href={item.href}
					aria-current={page.url.pathname === item.href ? 'page' : undefined}
					class:route_section_nav__link--active={page.url.pathname === item.href}
					class="route_section_nav__link type_rule_label"
				>
					{item.label}
				</a>
			{:else}
				<span class="route_section_nav__context eyebrow">{item.label}</span>
			{/if}
		{/each}
	</div>

	<div class="route_section_nav__group route_section_nav__group--right">
		{#each rightItems as item}
			<a
				href={item.href}
				aria-current={page.url.pathname === item.href ? 'page' : undefined}
				class:route_section_nav__link--active={page.url.pathname === item.href}
				class="route_section_nav__link type_rule_label"
			>
				{item.label}
			</a>
		{/each}
	</div>
</nav>

<style lang="scss">
	.route_section_nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 1.6rem;
		border-bottom: 0.1rem solid var(--border);
	}

	.route_section_nav__group {
		display: flex;
		flex-wrap: wrap;
		gap: 1.6rem 2rem;
	}

	.route_section_nav__group--right {
		justify-content: flex-end;
	}

	.route_section_nav__link {
		font-size: 1.4rem;
		color: var(--primary);
	}

	.route_section_nav__context {
		white-space: nowrap;
	}

	.route_section_nav__link--active::after {
		transform: scaleX(1);
		opacity: 1;
	}

	@media (max-width: 768px) {
		.route_section_nav {
			flex-wrap: wrap;
			gap: 1.2rem 1.6rem;
			padding-bottom: 1.2rem;
		}

		.route_section_nav__group {
			gap: 1.2rem 1.6rem;
		}
	}
</style>
