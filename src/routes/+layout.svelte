<script>
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/assets/global_styles/globals.scss';
	import content from '$lib/assets/content.json';
	import { stripFormattedText } from '$lib/utils/markdown';
	import { page } from '$app/state';

	let { children } = $props();
	const currentYear = new Date().getFullYear();
	const noticeStorageKey = 'aply-it-portfolio-notice-dismissed';

	let noticeDismissed = $state(true);

	const footerLabel = $derived.by(() => {
		const pathname = page.url.pathname;

		if (pathname.startsWith('/tools')) {
			return `Andrei's Tools, ${currentYear}.`;
		}

		if (pathname.startsWith('/blog')) {
			return `Andrei's Blog, ${currentYear}.`;
		}

		return `Andrei Portfolio, ${currentYear}.`;
	});

	const documentTitle = $derived.by(() => {
		const pathname = page.url.pathname;

		if (pathname === '/it' || pathname.startsWith('/it/')) {
			return 'Andrei Lysenko · IT Support & Systems';
		}

		if (pathname === '/blog') {
			return 'Blog';
		}

		if (pathname.startsWith('/blog/')) {
			const category = pathname.split('/')[2];

			if (category) {
				return `Blog | ${category.charAt(0).toUpperCase()}${category.slice(1)}`;
			}
		}

		if (pathname === '/tools') {
			return 'Tools';
		}

		if (pathname === '/site-map') {
			return 'Site Map';
		}

		if (pathname.startsWith('/tools/')) {
			const category = pathname.split('/')[2];

			if (category) {
				return `Tools | ${category.charAt(0).toUpperCase()}${category.slice(1)}`;
			}
		}

		return stripFormattedText(page.data?.content?.hero?.title || content.hero.title);
	});

	const isStandaloneRoute = $derived(
		page.url.pathname === '/it' || page.url.pathname.startsWith('/it/')
	);

	function dismissNotice() {
		noticeDismissed = true;

		try {
			localStorage.setItem(noticeStorageKey, 'true');
		} catch {
			// localStorage can be unavailable in strict privacy modes.
		}
	}

	onMount(() => {
		try {
			noticeDismissed = localStorage.getItem(noticeStorageKey) === 'true';
		} catch {
			noticeDismissed = false;
		}
	});
</script>

<svelte:head>
	<title>{documentTitle}</title>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="icon" href="/favicon-64.png" sizes="64x64" type="image/png" />
	<link rel="icon" href="/favicon-128.png" sizes="128x128" type="image/png" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if isStandaloneRoute}
	<div class="standalone_shell">
		<a class="skip_link" href="#main-content">Skip to main content</a>

		<main id="main-content" class="standalone_main">
			{@render children()}
		</main>
	</div>
{:else}
	<div class="site_shell">
		<a class="skip_link" href="#main-content">Skip to main content</a>

		{#if !noticeDismissed}
			<div class="site_notice" role="status">
				<p class="site_notice__text">
					Looking for IT support, infrastructure, or security work?
					<a class="site_notice__link" href="/it">View the IT portfolio</a>.
				</p>
				<button
					class="site_notice__close"
					type="button"
					aria-label="Dismiss IT portfolio notice"
					onclick={dismissNotice}
				>
					<span aria-hidden="true">x</span>
				</button>
			</div>
		{/if}

		<main id="main-content" class="main_container">
			{@render children()}
		</main>

		<footer class="grid_wrapper site_footer">
			<nav class="site_footer__nav site_footer__nav--left" aria-label="Site map">
				<a class="site_footer__link" href="/site-map">Site Map</a>
			</nav>

			<p class="site_footer__text">{footerLabel}</p>

			<nav class="site_footer__nav site_footer__nav--right" aria-label="Footer">
				<a class="site_footer__link" href="/tools">Tools</a>
				<a class="site_footer__link site_footer__blog_link" href="/blog">Blog</a>
			</nav>
		</footer>
	</div>
{/if}

<style lang="scss">
	.site_shell {
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow-x: clip;
	}

	.standalone_shell {
		min-height: 100svh;
	}

	.standalone_main {
		min-height: 100svh;
	}

	.site_notice {
		position: sticky;
		top: 0;
		z-index: 15;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.2rem;
		padding: 1rem clamp(1.6rem, 4vw, 3.2rem);
		background-color: color-mix(in srgb, var(--bg) 94%, var(--primary));
		border-bottom: 0.1rem solid color-mix(in srgb, var(--primary) 28%, var(--border));
		box-shadow: var(--shadow-soft);
	}

	.site_notice__text {
		margin: 0;
		color: var(--text);
		font-family: var(--font-mono);
		font-size: 1.25rem;
		line-height: 1.45;
		letter-spacing: 0.03em;
		text-align: center;
	}

	.site_notice__link {
		color: var(--primary);
		font-weight: 700;
		text-decoration: underline;
		text-decoration-thickness: 0.1rem;
		text-underline-offset: 0.25em;
	}

	.site_notice__link:hover,
	.site_notice__link:focus-visible {
		color: var(--leaf-dark);
	}

	.site_notice__close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.8rem;
		height: 2.8rem;
		flex: 0 0 auto;
		border: 0.1rem solid color-mix(in srgb, var(--primary) 28%, var(--border));
		border-radius: 999px;
		background-color: var(--bg-secondary);
		color: var(--text);
		font-family: var(--font-mono);
		font-size: 1.8rem;
		line-height: 1;
		transition:
			border-color 180ms ease,
			background-color 180ms ease,
			color 180ms ease;
	}

	.site_notice__close:hover,
	.site_notice__close:focus-visible {
		border-color: var(--primary);
		background-color: var(--bg-tertiary);
		color: var(--primary);
	}

	.skip_link {
		position: absolute;
		top: 1.6rem;
		left: 1.6rem;
		z-index: 20;
		padding: 1rem 1.4rem;
		border-radius: 0.8rem;
		background-color: var(--leaf-dark);
		color: #f7f9f8;
		border: 0.1rem solid var(--leaf-dark);
		box-shadow: var(--shadow-soft);
		transform: translateY(-200%);
		transition: transform 180ms ease;
	}

	.skip_link:focus-visible {
		transform: translateY(0);
	}

	.main_container {
		position: relative;
		z-index: 1;
		flex: 1 0 auto;
		max-width: 144rem;
		width: 95vw;
		margin: clamp(12rem, 10vw, 24rem) auto 0 auto;
	}

	.site_footer {
		margin-top: auto;
		padding: 1.6rem 2rem;
		background-color: var(--border);
	}

	.site_footer__text {
		max-width: 130rem;
		grid-column: 3 / 8;
		margin: 0 auto;
		padding: 0;
		color: var(--text);
		font-size: 1.3rem;
		line-height: 1.2;
		letter-spacing: 0.04em;
		text-align: center;
	}

	.site_footer__nav {
		display: flex;
		align-items: baseline;
		gap: 0.8rem;
	}

	.site_footer__nav--left {
		grid-column: 1 / 3;
		justify-content: flex-start;
	}

	.site_footer__nav--right {
		grid-column: 8 / 10;
		justify-content: flex-end;
	}

	.site_footer__link {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.4rem 0.6rem;
		margin: -0.4rem -0.6rem;
		color: var(--text);
		font-size: 1.3rem;
		line-height: 1.2;
		letter-spacing: 0.04em;
		text-decoration: none;
		border-radius: 0.4rem;
		transition: color 180ms ease;
	}

	.site_footer__link::after {
		content: '';
		position: absolute;
		left: 0.6rem;
		right: 0.6rem;
		bottom: 0.1rem;
		border-bottom: 0.1rem solid currentColor;
		opacity: 0.45;
		transform: scaleX(0.82);
		transform-origin: center;
		transition:
			opacity 180ms ease,
			transform 180ms ease;
	}

	.site_footer__link:hover::after,
	.site_footer__link:focus-visible::after {
		opacity: 0.85;
		transform: scaleX(1);
	}

	.site_footer__link:hover,
	.site_footer__link:focus-visible {
		color: var(--primary);
	}

	.site_footer__link:focus-visible {
		outline: none;
		box-shadow: 0 0 0 0.2rem color-mix(in srgb, var(--primary) 18%, transparent);
	}

	@media (min-width: 769px) {
		.site_footer__blog_link {
			margin-right: 2rem;
		}
	}

	@media (max-width: 768px) {
		.site_notice {
			align-items: flex-start;
			justify-content: space-between;
			padding: 1rem 1.6rem;
		}

		.site_notice__text {
			text-align: left;
		}

		.main_container {
			width: 92vw;
			margin: 6rem auto 0;
		}

		.site_footer {
			padding: 1.4rem 1.6rem;
		}

		.site_footer__text {
			grid-column: 1 / -1;
			width: 92vw;
		}

		.site_footer__nav {
			grid-column: 1 / -1;
			justify-content: center;
		}
	}
</style>
