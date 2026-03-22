<script>
	import favicon from '$lib/assets/favicon.svg';
	import "$lib/assets/global_styles/globals.scss";
	import content from '$lib/assets/content.json';
	import { stripFormattedText } from '$lib/utils/markdown';
	import { page } from '$app/state';

	let { children } = $props();
	const currentYear = new Date().getFullYear();

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

		if (pathname.startsWith('/tools/')) {
			const category = pathname.split('/')[2];

			if (category) {
				return `Tools | ${category.charAt(0).toUpperCase()}${category.slice(1)}`;
			}
		}

		return stripFormattedText(page.data?.content?.hero?.title || content.hero.title);
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

<div class="site-shell">
	<a class="skip_link" href="#main-content">Skip to main content</a>

	<main id="main-content" class="main-container">
		{@render children()}
	</main>

	<footer class="grid_wrapper site-footer">
		<p class="site-footer__text">{footerLabel}</p>
		<nav class="site-footer__nav" aria-label="Footer">
			<a class="site-footer__link" href="/tools">Tools</a>
			<a class="site-footer__link site-footer__blog-link" href="/blog">Blog</a>
		</nav>
	</footer>
</div>


<style lang="scss">
	.site-shell {
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow-x: clip;
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

	.main-container {
		position: relative;
		z-index: 1;
		flex: 1 0 auto;
		max-width: 144rem;
		width: 95vw;
		margin: clamp(12rem, 10vw, 24rem) auto 0 auto;
	}

	.site-footer {
		margin-top: auto;
		padding: 1.6rem 2rem;
		background-color: var(--border);
	}

	.site-footer__text {
		max-width: 130rem;
		grid-column: 1 / 9;
		margin: 0 auto;
		padding: 0;
		color: var(--text);
		font-size: 1.3rem;
		line-height: 1.2;
		letter-spacing: 0.04em;
		text-align: center;
	}

	.site-footer__nav {
		grid-column: 9 / 10;
		display: flex;
		align-items: baseline;
		justify-content: flex-end;
		gap: 0.8rem;
	}

	.site-footer__link {
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

	.site-footer__link::after {
		content: '';
		position: absolute;
		left: 0.6rem;
		right: 0.6rem;
		bottom: 0.1rem;
		border-bottom: 0.1rem solid currentColor;
		opacity: 0.45;
		transform: scaleX(0.82);
		transform-origin: center;
		transition: opacity 180ms ease, transform 180ms ease;
	}

	.site-footer__link:hover::after,
	.site-footer__link:focus-visible::after {
		opacity: 0.85;
		transform: scaleX(1);
	}

	.site-footer__link:hover,
	.site-footer__link:focus-visible {
		color: var(--primary);
	}

	.site-footer__link:focus-visible {
		outline: none;
		box-shadow: 0 0 0 0.2rem color-mix(in srgb, var(--primary) 18%, transparent);
	}

	@media (min-width: 769px) {
		.site-footer__blog-link {
			margin-right: 2rem;
		}
	}

	@media (max-width: 768px) {
		.main-container {
			width: 92vw;
			margin: 6rem auto 0;
		}

		.site-footer {
			padding: 1.4rem 1.6rem;
		}

		.site-footer__text {
			grid-column: 1 / -1;
			width: 92vw;
		}

		.site-footer__nav {
			grid-column: 1 / -1;
			justify-content: center;
		}
	}
</style>
