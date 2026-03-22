<script>
	import { page } from '$app/state';
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	/** @typedef {{ href?: string; label: string }} NavItem */

	let { ariaLabel, leftItems = [], rightItems = [], className = '', mobileMenu = false } = $props();

	const allItems = $derived.by(() => [...leftItems, ...rightItems]);
	const activeItem = $derived.by(
		() => allItems.find((item) => item.href === page.url.pathname) ?? leftItems.find((item) => item.href) ?? null
	);
	const activeLabel = $derived.by(() => activeItem?.label ?? leftItems[0]?.label ?? '');
	const articleNav = $derived.by(() => className.split(' ').includes('route_section_nav--article'));
	const mobileItems = $derived.by(() => allItems.filter((item) => item.href && item.href !== activeItem?.href));
	const mobileMenuHeight = $derived.by(
		() => `${mobileItems.length * 4.4 + Math.max(mobileItems.length - 1, 0) * 1 + 0.8}rem`
	);
	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	$effect(() => {
		page.url.pathname;
		mobileMenuOpen = false;
	});

	/**
	 * @param {HTMLElement} node
	 * @returns {{duration:number,easing:(t:number)=>number,css:(t:number,u:number)=>string}}
	 */
	function expandMenu(node) {
		const style = getComputedStyle(node);
		const height = parseFloat(style.getPropertyValue('--mobile-menu-height')) * 10 || node.offsetHeight;

		return {
			duration: 220,
			easing: cubicOut,
			css: (t) => `
				max-height: ${t * height}px;
				overflow: hidden;
			`
		};
	}
</script>

<nav class={`route_section_nav ${mobileMenu ? 'route_section_nav--mobile_enabled' : ''} ${className}`.trim()} aria-label={ariaLabel}>
	<div class="route_section_nav__desktop">
		<div class="route_section_nav__group">
			{#each leftItems as item}
				{#if item.href}
					<a
						href={item.href}
						aria-current={page.url.pathname === item.href ? 'page' : undefined}
						class:route_section_nav__link--active={page.url.pathname === item.href}
						class="route_section_nav__link type_rule_label link_default"
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
					class="route_section_nav__link type_rule_label link_default"
				>
					{item.label}
				</a>
			{/each}
		</div>
	</div>

	{#if mobileMenu}
		<div class="route_section_nav__mobile">
			<div class="route_section_nav__mobile_header">
				{#if articleNav && activeItem?.href}
					<a href={activeItem.href} class="route_section_nav__mobile_active route_section_nav__mobile_active_link type_rule_label link_default">
						{activeLabel}
					</a>
				{:else}
					<span class="route_section_nav__mobile_active type_rule_label">{activeLabel}</span>
				{/if}
				<button
					class="route_section_nav__menu_toggle"
					type="button"
					aria-expanded={mobileMenuOpen}
					aria-label="Toggle navigation menu"
					onclick={toggleMobileMenu}
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</div>

			{#if mobileMenuOpen}
				<div
					class="route_section_nav__mobile_menu"
					style={`--mobile-menu-height: ${mobileMenuHeight};`}
					transition:expandMenu
				>
					<div
						class="route_section_nav__mobile_menu_inner"
						in:fade={{ duration: 140, delay: 110 }}
						out:fade={{ duration: 90 }}
					>
						{#each mobileItems as item}
							<a href={item.href} class="route_section_nav__mobile_item type_rule_label link_default">
								{item.label}
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</nav>

<style lang="scss">
	.route_section_nav {
		padding-bottom: 1.6rem;
		border-bottom: 0.1rem solid var(--border);
	}

	.route_section_nav__desktop {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.6rem;
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

	.route_section_nav__mobile {
		display: none;
	}

	.route_section_nav--article {
		border-bottom: 0;
	}

	.route_section_nav--landing {
		border-bottom: 0;
	}

	@media (max-width: 768px) {
		.route_section_nav {
			padding-bottom: 1.2rem;
		}

		.route_section_nav__group {
			gap: 1.2rem 1.6rem;
		}

		.route_section_nav--mobile_enabled {
			padding-bottom: 0.8rem;
		}

		.route_section_nav--mobile_enabled .route_section_nav__desktop {
			display: none;
		}

		.route_section_nav__mobile {
			display: grid;
			gap: 0;
		}

		.route_section_nav__mobile_header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1.2rem;
		}

		.route_section_nav__mobile_active {
			color: var(--primary);
		}

		.route_section_nav__mobile_active_link {
			display: inline-flex;
			align-items: center;
			min-height: 4.4rem;
		}

		.route_section_nav__menu_toggle {
			position: relative;
			display: grid;
			place-items: center;
			min-width: 4.8rem;
			min-height: 4.8rem;
			padding: 0;
			border: none;
			background: transparent;
			color: var(--primary);
			border-radius: 0;
		}

		.route_section_nav__menu_toggle:is(:hover, :focus, :active) {
			background: transparent;
			color: var(--primary);
			transform: none;
		}

		.route_section_nav__menu_toggle:focus-visible {
			outline: none;
			box-shadow: 0 0 0 0.3rem color-mix(in srgb, var(--primary) 18%, transparent);
		}

		.route_section_nav__menu_toggle span {
			position: absolute;
			display: block;
			width: 2.2rem;
			height: 0.2rem;
			background-color: currentColor;
			border-radius: 999px;
			transition: transform 180ms ease, opacity 180ms ease;
		}

		.route_section_nav__menu_toggle span:nth-child(1) {
			transform: translateY(-0.6rem);
		}

		.route_section_nav__menu_toggle span:nth-child(2) {
			transform: translateY(0);
		}

		.route_section_nav__menu_toggle span:nth-child(3) {
			transform: translateY(0.6rem);
		}

		.route_section_nav__menu_toggle[aria-expanded='true'] span:nth-child(1) {
			transform: rotate(45deg);
		}

		.route_section_nav__menu_toggle[aria-expanded='true'] span:nth-child(2) {
			opacity: 0;
		}

		.route_section_nav__menu_toggle[aria-expanded='true'] span:nth-child(3) {
			transform: rotate(-45deg);
		}

		.route_section_nav__mobile_menu {
			display: block;
			padding: 0.8rem 0 0;
			transform-origin: top;
			overflow: hidden;
		}

		.route_section_nav__mobile_menu_inner {
			display: grid;
			justify-items: end;
			gap: 1rem;
		}

		.route_section_nav__mobile_item {
			display: inline-flex;
			align-items: center;
			min-height: 4.4rem;
			color: var(--text-secondary);
			font-size: 1.4rem;
			text-align: right;
			transition: color 160ms ease, transform 160ms ease;
		}

		.route_section_nav__mobile_item:hover,
		.route_section_nav__mobile_item:focus-visible {
			color: var(--primary);
			transform: translateX(-0.2rem);
		}
	}
</style>
