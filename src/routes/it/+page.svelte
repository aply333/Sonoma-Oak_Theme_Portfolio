<script>
	import { onMount } from 'svelte';

	let { data } = $props();

	const navItems = [
		['Skills', '#skills'],
		['Experience', '#experience'],
		['Homelab', '#homelab'],
		['Projects', '#projects'],
		['Education', '#education'],
		['Contact', '#contact']
	];

	const content = $derived(data.content);
	const roleLine = $derived((content.hero.role ?? []).join(' · '));
	const resumeLink = $derived(content.hero.links.find(isResumeLink));

	let theme = $state('light');

	const themeLabel = $derived(theme === 'dark' ? 'Light' : 'Dark');
	const themeAriaLabel = $derived(`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);

	/** @param {'light' | 'dark'} nextTheme */
	function applyTheme(nextTheme) {
		theme = nextTheme;

		try {
			localStorage.setItem('it-portfolio-theme', nextTheme);
		} catch {
			// localStorage may be blocked in private browsing contexts.
		}
	}

	/** @param {{label?: string}} link */
	function isResumeLink(link) {
		return /resume/i.test(link?.label ?? '');
	}

	/** @param {string | undefined} href */
	function isExternalLink(href) {
		return /^[a-z][a-z0-9+.-]*:/i.test(href ?? '');
	}

	onMount(() => {
		let savedTheme = null;

		try {
			savedTheme = localStorage.getItem('it-portfolio-theme');
		} catch {
			savedTheme = null;
		}

		if (savedTheme === 'light' || savedTheme === 'dark') {
			theme = savedTheme;
			return;
		}

		if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
			theme = 'dark';
		}
	});
</script>

<svelte:head>
	<meta
		name="description"
		content="Andrei Lysenko's IT support, infrastructure, and security portfolio."
	/>
</svelte:head>

<div class="it_page" data-it-theme={theme}>
	<nav class="nav" aria-label="IT portfolio sections">
		<a class="nav__brand" href="#top"><span class="dot"></span>{content.hero.name}</a>
		<div class="nav__links">
			{#each navItems as [label, href]}
				<a {href}>{label}</a>
			{/each}
		</div>
		<div class="nav__actions">
			{#if resumeLink}
				<a
					class="nav__resume"
					href={resumeLink.href}
					target="_blank"
					rel="noreferrer"
					download
					>Resume</a
				>
			{/if}
			<button
				class="nav__theme"
				type="button"
				aria-label={themeAriaLabel}
				aria-live="polite"
				onclick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
			>
				{themeLabel}
			</button>
		</div>
	</nav>

	<div class="wrap" id="top">
		<header class="hero">
			<h1>{content.hero.name}</h1>
			<p class="hero__role">{roleLine}</p>
			<p class="hero__lede">{content.hero.summary}</p>
			<div class="hero__meta">
				<span class="avail"><span class="pulse"></span>{content.hero.availability}</span>
				<div class="hero__links">
					{#each content.hero.links as link}
						{#if isResumeLink(link)}
							<a
								class:primary={link.isPrimary}
								href={link.href}
								target="_blank"
								rel="noreferrer"
								download>{link.label}</a
							>
						{:else if isExternalLink(link.href)}
							<a class:primary={link.isPrimary} href={link.href} target="_blank" rel="noreferrer"
								>{link.label}</a
							>
						{:else}
							<a class:primary={link.isPrimary} href={link.href}>{link.label}</a>
						{/if}
					{/each}
				</div>
			</div>
		</header>

		<section class="section" id="skills">
			<div class="section__label"><span class="num">01</span><h2>Skills</h2></div>
			<div class="skills">
				<div class="skills__wide">
					<h3>Development</h3>
					<ul>
						{#each content.skills.development as skill}
							<li>{skill}</li>
						{/each}
					</ul>
				</div>

				{#each content.skills.groups as group}
					<div>
						<h3>{group.title}</h3>
						<ul>
							{#each group.items as item}
								<li>{item}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>

			<div class="certs">
				{#each content.skills.certifications as cert}
					<div class="cert">
						<span class="cert__status">{cert.status}</span>
						<h3>{cert.title}</h3>
						{#if cert.description}
							<p>{cert.description}</p>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<section class="section" id="experience">
			<div class="section__label"><span class="num">02</span><h2>Experience</h2></div>
			<div class="rows">
				{#each content.experience as entry}
					<article class="row">
						<div class="row__aside">{entry.date}<span class="org">{entry.organization}</span></div>
						<div>
							<h3>{entry.title}</h3>
							{#if entry.body}
								<p>{entry.body}</p>
							{/if}
							{#if entry.bullets?.length}
								<ul class="bullets">
									{#each entry.bullets as bullet}
										<li>{bullet}</li>
									{/each}
								</ul>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section class="section" id="homelab">
			<div class="section__label"><span class="num">03</span><h2>Linux Homelab / AI Automation</h2></div>
			<div class="rows">
				<article class="row">
					<div class="row__aside">
						{content.homelab.date}<span class="org">{content.homelab.organization}</span>
					</div>
					<div>
						<p>{content.homelab.body}</p>
						<ul class="tags">
							{#each content.homelab.tags as tag}
								<li>{tag}</li>
							{/each}
						</ul>
					</div>
				</article>
			</div>
		</section>

		<section class="section" id="projects">
			<div class="section__label"><span class="num">04</span><h2>Client Works</h2></div>
			<div class="rows client_work">
				<article class="row">
					<div class="row__aside">
						{content.clientWorks.summary.date}<span class="org"
							>{content.clientWorks.summary.organization}</span
						>
					</div>
					<div>
						<p>{content.clientWorks.summary.body}</p>
						<ul class="tags">
							{#each content.clientWorks.summary.tags as tag}
								<li>{tag}</li>
							{/each}
						</ul>
					</div>
				</article>
			</div>

			<div class="project_subhead">
				<p class="subhead">Published projects</p>
			</div>
			<div class="projects">
				{#each content.clientWorks.projects as project}
					<a class="card" href={project.href} target="_blank" rel="noreferrer">
						<div class="card__top"><span>{project.organization}</span><span>{project.year}</span></div>
						<h3>{project.title}</h3>
						<p>{project.description}</p>
						<ul class="tags">
							{#each project.tags as tag}
								<li>{tag}</li>
							{/each}
						</ul>
						<span class="card__link">{project.linkLabel}</span>
					</a>
				{/each}
			</div>
			<div class="more">
				<a href={content.clientWorks.moreLink.href} target="_blank" rel="noreferrer"
					>{content.clientWorks.moreLink.label}</a
				>
			</div>
		</section>

		<section class="section" id="education">
			<div class="section__label"><span class="num">05</span><h2>Education &amp; Training</h2></div>
			<div class="rows">
				{#each content.education as entry}
					<article class="row">
						<div class="row__aside">{entry.date}<span class="org">{entry.organization}</span></div>
						<div>
							<h3>{entry.title}</h3>
							{#if entry.body}
								<p>{entry.body}</p>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</section>

		<section class="section" id="contact">
			<div class="section__label"><span class="num">06</span><h2>Contact</h2></div>
			<div class="contact">
				<p>{content.contact.body}</p>
				<div class="hero__links">
					{#each content.contact.links as link}
						{#if isResumeLink(link)}
							<a
								class:primary={link.isPrimary}
								href={link.href}
								target="_blank"
								rel="noreferrer"
								download>{link.label}</a
							>
						{:else if isExternalLink(link.href)}
							<a class:primary={link.isPrimary} href={link.href} target="_blank" rel="noreferrer"
								>{link.label}</a
							>
						{:else}
							<a class:primary={link.isPrimary} href={link.href}>{link.label}</a>
						{/if}
					{/each}
				</div>
			</div>
			<footer>
				<span>{content.footer.leftText}</span>
				<span
					><a href={content.footer.rightLink.href} target="_blank" rel="noreferrer"
						>{content.footer.rightLink.label}</a
					> -
					{content.footer.rightSuffix}</span
				>
			</footer>
		</section>
	</div>
</div>

<style lang="scss">
	.it_page {
		--it-primary: #3f6f5a;
		--it-primary-deep: #284d3b;
		--it-accent: #1ea8a1;
		--it-bg: #ffffff;
		--it-bg-secondary: #f7f9f8;
		--it-bg-tertiary: #eef3f0;
		--it-text: #2e2e2e;
		--it-text-secondary: #6b7280;
		--it-border: #e5e7eb;
		--it-font-sans: 'Quicksand', system-ui, sans-serif;
		--it-font-mono: 'Space Mono', ui-monospace, monospace;
		min-height: 100svh;
		color: var(--it-text);
		background: var(--it-bg);
		font-family: var(--it-font-sans);
		font-size: 1.6rem;
		font-weight: 450;
		line-height: 1.6;
		text-wrap: pretty;
		scroll-padding-top: 7rem;
	}

	.it_page[data-it-theme='dark'] {
		--it-bg: #0f1412;
		--it-bg-secondary: #151a18;
		--it-bg-tertiary: #1b2320;
		--it-text: #e6e8e7;
		--it-text-secondary: #a1a7a5;
		--it-primary: #5fa38b;
		--it-accent: #3fbdb6;
		--it-border: #2a3330;
	}

	.it_page :global(*) {
		box-sizing: border-box;
	}

	.it_page a {
		color: var(--it-primary);
		text-decoration: none;
	}

	.it_page a:hover {
		color: var(--it-primary-deep);
	}

	.it_page[data-it-theme='dark'] a:hover {
		color: var(--it-accent);
	}

	.it_page h1,
	.it_page h2,
	.it_page h3,
	.it_page p,
	.it_page ul {
		margin: 0;
	}

	.it_page h1,
	.it_page h2,
	.it_page h3 {
		font-weight: 600;
		line-height: 1.25;
	}

	.it_page ul {
		padding: 0;
		list-style: none;
	}

	.nav {
		position: sticky;
		top: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		padding: 1.2rem clamp(1.6rem, 5vw, 4rem);
		background: color-mix(in srgb, var(--it-bg) 90%, transparent);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border-bottom: 0.1rem solid var(--it-border);
		font-family: var(--it-font-mono);
		font-size: 1.2rem;
	}

	.nav__brand {
		display: inline-flex;
		align-items: center;
		gap: 0.9rem;
		color: var(--it-text);
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.nav__brand:hover {
		color: var(--it-text);
	}

	.nav__brand .dot {
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		background: var(--it-primary);
		box-shadow: 0 0 0 0.4rem color-mix(in srgb, var(--it-primary) 18%, transparent);
	}

	.nav__links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.nav__links a {
		padding: 0.5rem 1rem;
		border-radius: 999px;
		color: var(--it-text-secondary);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		transition:
			background 160ms ease,
			color 160ms ease;
	}

	.nav__links a:hover,
	.nav__links a:focus-visible {
		background: var(--it-bg-tertiary);
		color: var(--it-text);
	}

	.nav__actions {
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
	}

	.it_page .nav__resume {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 1.1rem;
		border: 0.1rem solid var(--it-primary);
		border-radius: 999px;
		background: var(--it-primary);
		color: #f7f9f8;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.it_page .nav__resume:hover,
	.it_page .nav__resume:focus-visible {
		border-color: var(--it-primary-deep);
		background: var(--it-primary-deep);
		color: #ffffff;
	}

	.it_page[data-it-theme='dark'] .nav__resume {
		color: #07100d;
	}

	.it_page[data-it-theme='dark'] .nav__resume:hover,
	.it_page[data-it-theme='dark'] .nav__resume:focus-visible {
		color: #ffffff;
	}

	.nav__theme {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.5rem 1.1rem;
		border: 0.1rem solid color-mix(in srgb, var(--it-text) 34%, var(--it-border));
		border-radius: 999px;
		background: var(--it-bg-secondary);
		color: var(--it-text);
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.nav__theme:hover,
	.nav__theme:focus-visible {
		background: var(--it-bg-tertiary);
		border-color: var(--it-primary);
	}

	.wrap {
		max-width: 82rem;
		margin: 0 auto;
		padding: 0 clamp(1.6rem, 5vw, 4rem) 10rem;
	}

	.section {
		padding: 5.5rem 0 0;
		scroll-margin-top: 7rem;
	}

	.section + .section {
		margin-top: 5.5rem;
		border-top: 0.1rem solid var(--it-border);
	}

	.section__label {
		display: flex;
		align-items: baseline;
		gap: 1.2rem;
		margin-bottom: 2.6rem;
		color: var(--it-text-secondary);
		font-family: var(--it-font-mono);
		font-size: 1.15rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}

	.section__label .num {
		color: var(--it-primary);
		font-weight: 700;
	}

	.section__label h2 {
		color: var(--it-text);
		font-family: var(--it-font-sans);
		font-size: 1.9rem;
		letter-spacing: 0;
		text-transform: none;
	}

	.hero {
		padding: 6.5rem 0 1rem;
		scroll-margin-top: 7rem;
	}

	.hero h1 {
		font-size: clamp(3.6rem, 7vw, 5.6rem);
		letter-spacing: -0.02em;
	}

	.hero__role {
		margin-top: 0.6rem;
		color: var(--it-primary);
		font-family: var(--it-font-mono);
		font-size: clamp(1.4rem, 2.4vw, 1.7rem);
		letter-spacing: 0.02em;
	}

	.hero__lede {
		max-width: 60ch;
		margin-top: 2.4rem;
		color: var(--it-text);
		font-size: 1.85rem;
	}

	.hero__meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.6rem 2.4rem;
		margin-top: 2.8rem;
		font-family: var(--it-font-mono);
		font-size: 1.25rem;
	}

	.avail {
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
		color: var(--it-text-secondary);
	}

	.avail .pulse {
		width: 0.8rem;
		height: 0.8rem;
		flex: 0 0 auto;
		border-radius: 50%;
		background: var(--it-accent);
		box-shadow: 0 0 0 0.35rem color-mix(in srgb, var(--it-accent) 20%, transparent);
	}

	.hero__links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
	}

	.hero__links a {
		padding: 0.7rem 1.4rem;
		border: 0.1rem solid var(--it-border);
		border-radius: 999px;
		color: var(--it-text);
		letter-spacing: 0.04em;
	}

	.hero__links a:hover,
	.hero__links a:focus-visible {
		border-color: var(--it-primary);
		background: var(--it-bg-tertiary);
		color: var(--it-text);
	}

	.hero__links a.primary {
		border-color: var(--it-primary);
		background: var(--it-primary);
		color: #ffffff;
	}

	.hero__links a.primary:hover,
	.hero__links a.primary:focus-visible {
		background: var(--it-primary-deep);
		color: #ffffff;
	}

	.it_page[data-it-theme='dark'] .hero__links a.primary {
		color: #0f1412;
	}

	.skills {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(26rem, 100%), 1fr));
		gap: 2.8rem 3.2rem;
	}

	.skills h3 {
		padding-bottom: 1rem;
		border-bottom: 0.1rem solid var(--it-border);
		color: var(--it-text-secondary);
		font-family: var(--it-font-mono);
		font-size: 1.15rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	.skills ul {
		display: grid;
		gap: 1.2rem;
		margin-top: 1.2rem;
	}

	.skills li {
		color: var(--it-text-secondary);
		font-size: 1.5rem;
	}

	.skills__wide {
		grid-column: 1 / -1;
	}

	.skills__wide ul {
		display: flex;
		flex-wrap: wrap;
		gap: 1.2rem 2.4rem;
	}

	.certs {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(24rem, 100%), 1fr));
		gap: 1.4rem;
		margin-top: 3.2rem;
	}

	.cert {
		padding: 2rem;
		border: 0.1rem solid var(--it-border);
		border-radius: 1rem;
		background: var(--it-bg-secondary);
	}

	.cert__status {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		color: var(--it-accent);
		font-family: var(--it-font-mono);
		font-size: 1.05rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.cert__status::before {
		content: '';
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		background: var(--it-accent);
	}

	.cert h3 {
		margin-top: 1rem;
		font-size: 1.7rem;
	}

	.cert p {
		margin-top: 0.6rem;
		color: var(--it-text-secondary);
		font-size: 1.4rem;
	}

	.rows {
		display: grid;
		gap: 0;
	}

	.row {
		display: grid;
		grid-template-columns: 14rem 1fr;
		gap: 1rem 3rem;
		padding: 2.6rem 0;
		border-top: 0.1rem dashed var(--it-border);
	}

	.row:first-child {
		padding-top: 0;
		border-top: 0;
	}

	.row__aside {
		color: var(--it-text-secondary);
		font-family: var(--it-font-mono);
		font-size: 1.2rem;
		letter-spacing: 0.04em;
	}

	.row__aside .org {
		display: block;
		margin-top: 0.4rem;
		color: var(--it-primary);
	}

	.row h3 {
		font-size: 1.9rem;
	}

	.row p {
		max-width: 62ch;
		margin-top: 1rem;
		margin-bottom: 1rem;
		color: var(--it-text-secondary);
	}

	.bullets {
		display: grid;
		gap: 0.7rem;
		max-width: 62ch;
		margin-top: 1.4rem;
	}

	.bullets li {
		position: relative;
		padding-left: 1.8rem;
		color: var(--it-text-secondary);
		font-size: 1.5rem;
	}

	.bullets li::before {
		content: '';
		position: absolute;
		top: 0.75em;
		left: 0;
		width: 0.7rem;
		height: 0.1rem;
		background: var(--it-primary);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		margin-top: 1.4rem;
	}

	.tags li {
		padding: 0.35rem 0.9rem;
		border-radius: 999px;
		background: var(--it-bg-tertiary);
		color: var(--it-text-secondary);
		font-family: var(--it-font-mono);
		font-size: 1.1rem;
	}

	.client_work {
		margin-bottom: 3.2rem;
	}

	.subhead {
		margin: 0 0 2rem;
		color: var(--it-text-secondary);
		font-family: var(--it-font-mono);
		font-size: 1.15rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	.project_subhead {
		padding-bottom: 2rem;
	}

	.projects {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
		gap: 1.4rem;
	}

	.card {
		display: flex;
		flex-direction: column;
		padding: 2.2rem;
		border: 0.1rem solid var(--it-border);
		border-radius: 1rem;
		background: var(--it-bg-secondary);
		transition:
			border-color 160ms ease,
			transform 160ms ease;
	}

	.card:hover,
	.card:focus-visible {
		border-color: var(--it-primary);
		color: var(--it-primary);
		transform: translateY(-2px);
	}

	.card__top {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1.6rem;
		color: var(--it-text-secondary);
		font-family: var(--it-font-mono);
		font-size: 1.15rem;
	}

	.card h3 {
		margin-top: 1rem;
		color: var(--it-text);
		font-size: 1.8rem;
	}

	.card > p {
		margin-top: 0.8rem;
		color: var(--it-text-secondary);
		font-size: 1.45rem;
	}

	.card .tags {
		margin-top: auto;
		padding-top: 1.6rem;
	}

	.card__link {
		margin-top: 1.4rem;
		color: var(--it-primary);
		font-family: var(--it-font-mono);
		font-size: 1.2rem;
	}

	.more {
		display: flex;
		justify-content: center;
		margin-top: 3.2rem;
	}

	.more a {
		padding: 1.1rem 2.4rem;
		border: 0.1rem solid var(--it-border);
		border-radius: 999px;
		background: var(--it-bg-secondary);
		color: var(--it-text);
		font-family: var(--it-font-mono);
		font-size: 1.25rem;
		letter-spacing: 0.04em;
		transition:
			border-color 160ms ease,
			background 160ms ease;
	}

	.more a:hover,
	.more a:focus-visible {
		border-color: var(--it-primary);
		background: var(--it-bg-tertiary);
		color: var(--it-text);
	}

	.contact {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 2.4rem;
	}

	.contact p {
		max-width: 50ch;
		color: var(--it-text-secondary);
	}

	footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1rem 2.4rem;
		margin-top: 5.5rem;
		padding: 3rem 0 0;
		border-top: 0.1rem solid var(--it-border);
		color: var(--it-text-secondary);
		font-family: var(--it-font-mono);
		font-size: 1.15rem;
	}

	@media (max-width: 820px) {
		.nav__links {
			display: none;
		}
	}

	@media (max-width: 700px) {
		.row {
			grid-template-columns: 1fr;
			gap: 0.8rem;
		}

		.hero__links a,
		.more a {
			max-width: 100%;
			overflow-wrap: anywhere;
		}
	}
</style>
