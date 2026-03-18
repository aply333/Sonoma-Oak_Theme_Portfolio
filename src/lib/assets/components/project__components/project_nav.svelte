<script>
	import { cubicOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	let { nav, activeCategory, onSelect } = $props();

	const allItems = $derived.by(() => [nav.primary, ...nav.secondary]);
	const inactiveItems = $derived.by(() => allItems.filter((item) => item !== activeCategory));
	const mobileMenuHeight = $derived.by(() => `${inactiveItems.length * 4.8 + Math.max(inactiveItems.length - 1, 0) * 0.8 + 0.8}rem`);
	let mobileMenuOpen = $state(false);

	/** @param {string} category */
	function handleSelect(category) {
		onSelect(category);
		mobileMenuOpen = false;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	/** @param {string | null | undefined} value */
	function toId(value) {
		return (value ?? 'current').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
	}

	/**
	 * @param {KeyboardEvent} event
	 * @param {string} currentCategory
	 */
	function handleTabKeydown(event, currentCategory) {
		const key = event.key;

		if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) {
			return;
		}

		const currentTab = event.currentTarget;
		if (!(currentTab instanceof HTMLButtonElement)) {
			return;
		}

		const tabScope = currentTab.closest('.project_nav_bar__desktop, .project_nav_bar__mobile');
		if (!(tabScope instanceof HTMLElement)) {
			return;
		}

		/** @type {HTMLButtonElement[]} */
		const tabElements = Array.from(tabScope.querySelectorAll('[role="tab"]')).reduce(
			/** @param {HTMLButtonElement[]} buttons @param {Element} node */
			(buttons, node) => {
				if (node instanceof HTMLButtonElement && node.dataset.category) {
					buttons.push(node);
				}

				return buttons;
			},
			[]
		);

		const categories = tabElements.map((node) => node.dataset.category ?? '');
		const currentIndex = categories.indexOf(currentCategory);
		if (currentIndex === -1) {
			return;
		}

		event.preventDefault();

		let nextIndex = currentIndex;

		if (key === 'Home') {
			nextIndex = 0;
		} else if (key === 'End') {
			nextIndex = categories.length - 1;
		} else if (key === 'ArrowRight') {
			nextIndex = (currentIndex + 1) % categories.length;
		} else if (key === 'ArrowLeft') {
			nextIndex = (currentIndex - 1 + categories.length) % categories.length;
		}

		const nextCategory = categories[nextIndex];
		if (!nextCategory) {
			return;
		}

		handleSelect(nextCategory);

		requestAnimationFrame(() => {
			const nextTab = tabScope.querySelector(`[data-category="${CSS.escape(nextCategory)}"]`);
			if (nextTab instanceof HTMLButtonElement) {
				nextTab.focus();
			}
		});
	}

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
			css: (t, u) => `
				max-height: ${t * height}px;
				overflow: hidden;
			`
		};
	}
</script>

<div class="project_nav_bar" role="tablist" aria-label="Project categories">
	<div class="project_nav_bar__desktop">
		<div class="project_nav_bar__key">
			<button
				class:active={activeCategory === nav.primary}
				data-category={nav.primary}
				id={`project-tab-desktop-${toId(nav.primary)}`}
				type="button"
				role="tab"
				aria-selected={activeCategory === nav.primary}
				aria-controls="project-panel"
				tabindex={activeCategory === nav.primary ? 0 : -1}
				onkeydown={(event) => handleTabKeydown(event, nav.primary)}
				onclick={() => handleSelect(nav.primary)}
			>
				{nav.primary}
			</button>
		</div>
		<div class="project_nav_bar__additional">
			{#each nav.secondary as item}
				<button
					class:active={activeCategory === item}
					data-category={item}
					id={`project-tab-desktop-${toId(item)}`}
					type="button"
					role="tab"
					aria-selected={activeCategory === item}
					aria-controls="project-panel"
					tabindex={activeCategory === item ? 0 : -1}
					onkeydown={(event) => handleTabKeydown(event, item)}
					onclick={() => handleSelect(item)}
				>
					{item}
				</button>
			{/each}
		</div>
	</div>

	<div class="project_nav_bar__mobile">
		<div class="project_nav_bar__mobile_header">
			<button
				class="project_nav_bar__active"
				data-category={activeCategory}
				id={`project-tab-mobile-${toId(activeCategory)}`}
				type="button"
				role="tab"
				aria-selected="true"
				aria-controls="project-panel"
				onkeydown={(event) => handleTabKeydown(event, activeCategory)}
				onclick={() => handleSelect(activeCategory)}
			>
				{activeCategory}
			</button>
			<button
				class="project_nav_bar__menu_toggle"
				type="button"
				aria-expanded={mobileMenuOpen}
				aria-label="Toggle project categories"
				onclick={toggleMobileMenu}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>

		{#if mobileMenuOpen}
			<div
				class="project_nav_bar__mobile_menu"
				style={`--mobile-menu-height: ${mobileMenuHeight};`}
				transition:expandMenu
			>
				<div
					class="project_nav_bar__mobile_menu_inner"
					in:fade={{ duration: 140, delay: 110 }}
					out:fade={{ duration: 90 }}
				>
					{#each inactiveItems as item}
						<button
							class="project_nav_bar__mobile_item"
							data-category={item}
							id={`project-tab-mobile-${toId(item)}`}
							type="button"
							role="tab"
							aria-selected="false"
							aria-controls="project-panel"
							tabindex="-1"
							onkeydown={(event) => handleTabKeydown(event, item)}
							onclick={() => handleSelect(item)}
						>
							{item}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.project_nav_bar {
		grid-column: 1 / 9;
		border-bottom: 0.2rem solid var(--primary);

		&__desktop button,
		&__active,
		&__mobile_item {
			display: block;
			border: 0.2rem solid transparent;
			border-bottom: none;
			border-radius: 0.8rem 0.4rem 0 0;
			padding: 0.8rem var(--inline-space) 0.6rem;
			font-weight: 600;
			transition: all ease 300ms;
		}

		&__desktop button {
			text-decoration: none;
			text-decoration-thickness: 0.2rem;
			text-underline-offset: 0.3rem;
		}

		&__desktop button:hover {
			background-color: var(--primary);
			border-color: var(--primary);
			color: var(--bg);
			transform: none;
			opacity: 1;
		}

		&__desktop button:not([aria-selected='true']):hover {
			text-decoration: underline;
		}

		&__desktop button.active,
		&__desktop button[aria-selected='true'] {
			background-color: var(--primary);
			border-color: var(--primary);
			color: var(--bg);
			text-decoration: none;
			transform: none;
			opacity: 1;
		}

		&__desktop button:focus-visible,
		&__active:focus-visible,
		&__mobile_item:focus-visible {
			outline: none;
			box-shadow: 0 0 0 0.3rem color-mix(in srgb, var(--primary) 18%, transparent);
		}

		&__desktop {
			display: flex;
			justify-content: space-between;
		}

		&__additional {
			display: flex;
			flex-flow: row nowrap;

			button:not(:last-child) {
				margin-right: 2rem;
			}
		}

		&__mobile {
			display: none;
		}
	}

	@media (max-width: 768px) {
		.project_nav_bar {
			grid-column: 1 / -1;

			&__desktop {
				display: none;
			}

			&__mobile {
				display: grid;
				gap: 0;
				padding-bottom: 0;
			}

			&__mobile_header {
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				gap: 1.2rem;
				margin-bottom: -0.2rem;
			}

			&__active {
				max-width: calc(100% - 6.4rem);
				padding-top: 0.4rem;
			}

			&__menu_toggle {
				position: relative;
				display: grid;
				place-items: center;
				justify-content: center;
				min-width: 4.8rem;
				min-height: 4.8rem;
				padding: 0;
				border: none;
				background-color: transparent;
				color: var(--primary);
				border-radius: 0;
			}

			&__menu_toggle:is(:hover, :focus, :active) {
				background-color: transparent;
				border-color: transparent;
				color: var(--primary);
				transform: none;
			}

			&__menu_toggle:focus-visible {
				outline: none;
				box-shadow: 0 0 0 0.3rem color-mix(in srgb, var(--primary) 18%, transparent);
			}

			&__menu_toggle span {
				position: absolute;
				display: block;
				width: 2.2rem;
				height: 0.2rem;
				background-color: currentColor;
				border-radius: 999px;
				transition: transform 180ms ease, opacity 180ms ease;
			}

			&__menu_toggle span:nth-child(1) {
				transform: translateY(-0.6rem);
			}

			&__menu_toggle span:nth-child(2) {
				transform: translateY(0);
			}

			&__menu_toggle span:nth-child(3) {
				transform: translateY(0.6rem);
			}

			&__menu_toggle[aria-expanded='true'] span:nth-child(1) {
				transform: rotate(45deg);
			}

			&__menu_toggle[aria-expanded='true'] span:nth-child(2) {
				opacity: 0;
			}

			&__menu_toggle[aria-expanded='true'] span:nth-child(3) {
				transform: rotate(-45deg);
			}

			&__mobile_menu {
				display: block;
				padding: 0.8rem 0 0;
				transform-origin: top;
				overflow: hidden;
			}

			&__mobile_menu_inner {
				display: grid;
				justify-items: stretch;
				gap: 0.8rem;
			}

			&__mobile_item {
				width: 100%;
				padding: 0.8rem 0;
				border: none;
				border-radius: 0;
				background: transparent;
				color: var(--text-secondary);
				text-align: right;
				font-size: 1.4rem;
				font-weight: 600;
				letter-spacing: 0.06em;
				text-transform: uppercase;
				transition: color 160ms ease, transform 160ms ease;
			}

			&__mobile_item:hover {
				color: var(--primary);
				transform: translateX(-0.2rem);
			}

			&__mobile_item:focus-visible {
				color: var(--primary);
				transform: translateX(-0.2rem);
			}
		}
	}
</style>
