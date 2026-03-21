<script>
	let { links } = $props();

	/** @param {string} href */
	function isExternalLink(href) {
		return /^https?:\/\//.test(href);
	}

	/**
	 * @param {string} type
	 */
	function getIcon(type) {
		if (type === 'linkedin') {
			return 'M4.98 3.5a2.49 2.49 0 1 1 0 4.98 2.49 2.49 0 0 1 0-4.98ZM2.75 9.75h4.46v11.5H2.75V9.75ZM10 9.75h4.28v1.57h.06c.6-1.13 2.06-2.32 4.24-2.32 4.54 0 5.38 2.99 5.38 6.87v5.38H19.5v-4.77c0-1.14-.02-2.61-1.59-2.61-1.59 0-1.83 1.24-1.83 2.53v4.85H10V9.75Z';
		}

		if (type === 'github') {
			return 'M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.04 1.78 2.72 1.27 3.39.98.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.19 1.18a11.08 11.08 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.64 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.42.36.79 1.08.79 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5Z';
		}

		return 'M6 2.75h9a2.25 2.25 0 0 1 2.25 2.25v14a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 19V5A2.25 2.25 0 0 1 6 2.75Zm1.5 4.5h6.5m-6.5 3h6.5m-6.5 3h4.5';
	}
</script>

<nav class="about_links" aria-label="Profile and resume links">
	{#each links as link}
		<a
			class="about_link link_default"
			href={link.href}
			target={isExternalLink(link.href) ? '_blank' : undefined}
			rel={isExternalLink(link.href) ? 'noreferrer' : undefined}
			aria-label={isExternalLink(link.href) ? `${link.label} (opens in a new tab)` : link.label}
		>
			<svg class="about_link__icon" viewBox="0 0 24 24" aria-hidden="true">
				<path d={getIcon(link.type)} />
			</svg>
			<span>{link.label}</span>
		</a>
	{/each}
</nav>

<style lang="scss">
	.about_links {
		grid-column: 1 / 8;
		display: flex;
		gap: 2.4rem;
		justify-self: center;
		justify-content: center;
		margin: 1.6rem 0 var(--section-gap);
		width: 80%;
	}

	.about_link {
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
		color: var(--primary);
	}

	.about_link__icon {
		width: 2rem;
		height: 2rem;
		fill: currentColor;
	}

	@media (max-width: 768px) {
		.about_links {
			grid-column: 1 / -1;
			flex-wrap: wrap;
			gap: 1.6rem;
			width: 100%;
			margin-bottom: 0;
		}
	}
</style>
