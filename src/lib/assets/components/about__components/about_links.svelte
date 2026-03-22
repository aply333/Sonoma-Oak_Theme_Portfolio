<script>
	let { links = [], contactEmail = '', availabilityTag = { enabled: false, text: '' } } = $props();

	/** @param {string} href */
	function isExternalLink(href) {
		return /^https?:\/\//.test(href);
	}

	/** @param {string} email */
	function createMailtoHref(email) {
		const normalizedEmail = email.trim().replace(/^mailto:/i, '');
		return normalizedEmail ? `mailto:${normalizedEmail}` : '';
	}

	/**
	 * @param {string} type
	 */
	function getIcon(type) {
		if (type === 'email') {
			return 'M3.75 6.75A2.25 2.25 0 0 1 6 4.5h12A2.25 2.25 0 0 1 20.25 6.75v10.5A2.25 2.25 0 0 1 18 19.5H6a2.25 2.25 0 0 1-2.25-2.25V6.75Zm1.83-.75 6.42 5.15L18.42 6H5.58Zm13.17 1.92-6.28 5.03a.75.75 0 0 1-.94 0L5.25 7.92v9.33c0 .41.34.75.75.75h12c.41 0 .75-.34.75-.75V7.92Z';
		}

		if (type === 'linkedin') {
			return 'M4.98 3.5a2.49 2.49 0 1 1 0 4.98 2.49 2.49 0 0 1 0-4.98ZM2.75 9.75h4.46v11.5H2.75V9.75ZM10 9.75h4.28v1.57h.06c.6-1.13 2.06-2.32 4.24-2.32 4.54 0 5.38 2.99 5.38 6.87v5.38H19.5v-4.77c0-1.14-.02-2.61-1.59-2.61-1.59 0-1.83 1.24-1.83 2.53v4.85H10V9.75Z';
		}

		if (type === 'github') {
			return 'M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.04 1.78 2.72 1.27 3.39.98.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.19 1.18a11.08 11.08 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.64 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.42.36.79 1.08.79 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5Z';
		}

		return 'M6 2.75h9a2.25 2.25 0 0 1 2.25 2.25v14a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 19V5A2.25 2.25 0 0 1 6 2.75Zm1.5 4.5h6.5m-6.5 3h6.5m-6.5 3h4.5';
	}

	const displayLinks = $derived(
		links.filter((link) => link?.href && link?.label && link.type !== 'email')
	);
	const mailtoHref = $derived(createMailtoHref(contactEmail));
</script>

<nav class="about_links" aria-label="Profile and resume links">
	{#if availabilityTag?.enabled && availabilityTag?.text}
		<p class="about_links__status">
			<span class="about_links__status_dot" aria-hidden="true"></span>
			<span>{availabilityTag.text}</span>
		</p>
	{/if}
	<div class="about_links__actions">
		{#if mailtoHref}
			<a class="about_link about_link--primary" href={mailtoHref} aria-label="Get in touch by email">
				<svg class="about_link__icon" viewBox="0 0 24 24" aria-hidden="true">
					<path d={getIcon('email')} />
				</svg>
				<span>Get in touch</span>
			</a>
			<span class="about_links__divider" aria-hidden="true">|</span>
		{/if}
		{#each displayLinks as link}
			<a
				class="about_link about_link--secondary"
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
	</div>
</nav>

<style lang="scss">
	.about_links {
		grid-column: 1 / 8;
		display: grid;
		gap: 1.6rem;
		justify-self: center;
		margin: 2.4rem 0 var(--section-gap);
		width: min(100%, 72rem);
	}

	.about_links__status {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		margin: 0;
		color: var(--text);
		font-size: 1.6rem;
		font-weight: 500;
		line-height: 1.4;
	}

	.about_links__status_dot {
		width: 0.9rem;
		height: 0.9rem;
		flex: 0 0 auto;
		border-radius: 999px;
		background: var(--primary);
		box-shadow: 0 0 0 0.5rem color-mix(in srgb, var(--primary) 18%, transparent);
	}

	.about_links__actions {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 1.2rem;
	}

	.about_links__divider {
		color: var(--border);
		font-size: 2rem;
		line-height: 1;
	}

	.about_link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.9rem;
		min-height: 4.8rem;
		padding: 0 2rem;
		border: 1px solid var(--border);
		border-radius: 1.2rem;
		font-size: 1.6rem;
		font-weight: 600;
		line-height: 1;
		text-decoration: none;
		transition:
			background-color 160ms ease,
			border-color 160ms ease,
			color 160ms ease,
			transform 160ms ease,
			box-shadow 160ms ease;
	}

	.about_link:hover,
	.about_link:focus-visible {
		transform: translateY(-1px);
		box-shadow: var(--shadow-soft);
	}

	.about_link:focus-visible {
		outline: none;
	}

	.about_link--primary {
		background: var(--leaf-dark);
		border-color: var(--leaf-dark);
		color: var(--bg);
	}

	.about_link--primary:hover,
	.about_link--primary:focus-visible {
		background: var(--primary);
		border-color: var(--primary);
	}

	.about_link--secondary {
		background: color-mix(in srgb, var(--bg) 92%, var(--bg-secondary));
		color: var(--text);
	}

	.about_link--secondary:hover,
	.about_link--secondary:focus-visible {
		background: var(--bg-secondary);
		border-color: color-mix(in srgb, var(--primary) 24%, var(--border));
		color: var(--primary);
		box-shadow: var(--shadow-soft);
	}

	.about_link--secondary:focus-visible,
	.about_link--primary:focus-visible {
		box-shadow: 0 0 0 0.3rem color-mix(in srgb, var(--primary) 18%, transparent), var(--shadow-soft);
	}

	.about_link span {
		white-space: nowrap;
	}

	.about_link path {
		fill: currentColor;
	}

	.about_link--secondary .about_link__icon {
		color: var(--leaf-dark);
	}

	.about_link--secondary:hover .about_link__icon,
	.about_link--secondary:focus-visible .about_link__icon {
		color: currentColor;
	}

	.about_link--primary .about_link__icon {
		color: currentColor;
	}

	.about_link__icon {
		width: 1.8rem;
		height: 1.8rem;
	}

	@media (max-width: 768px) {
		.about_links {
			grid-column: 1 / -1;
			width: 100%;
			margin-bottom: 0;
		}

		.about_links__actions {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, max-content));
			justify-content: start;
		}

		.about_link {
			padding-inline: 2rem;
		}

		.about_links__divider {
			display: none;
		}
	}

	@media (max-width: 540px) {
		.about_links__actions {
			grid-template-columns: 1fr;
		}
	}

	@media (prefers-color-scheme: dark) {
		.about_link--primary {
			background: var(--primary);
			border-color: var(--primary);
		}

		.about_link--primary:hover,
		.about_link--primary:focus-visible {
			background: var(--leaf-dark);
			border-color: var(--leaf-dark);
			color: var(--bg-fixed);
		}
	}
</style>
