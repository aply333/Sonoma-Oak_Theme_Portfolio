import { sanityClient } from '$lib/sanity/client';
import { itLandingContentQuery } from '$lib/sanity/queries';

const fallbackItLandingContent = {
	hero: {
		name: 'Andrei Lysenko',
		role: ['IT Support', 'Infrastructure', 'Security'],
		summary:
			'Technology professional with experience in web development, customer-facing technical support, and hands-on Linux systems. Transitioning toward IT support, infrastructure, and security-focused roles where troubleshooting, documentation, and practical systems knowledge matter. Background includes production web development, Geek Squad technical support, current Computer Science coursework, and ongoing security training.',
		availability: 'Sonoma, CA - open to IT support and infrastructure roles',
		links: [
			{ label: 'Resume (PDF)', href: '/resume.pdf', isPrimary: true },
			{ label: 'Andrei.lysenko@outlook.com', href: 'mailto:Andrei.lysenko@outlook.com' },
			{ label: 'github.com/aply333', href: 'https://github.com/aply333' }
		]
	},
	skills: {
		development: [
			'JavaScript',
			'Python',
			'PHP',
			'C++',
			'Bash',
			'React',
			'WordPress',
			'REST APIs',
			'SQL',
			'Git'
		],
		groups: [
			{
				title: 'IT & Support',
				items: [
					'Windows',
					'macOS',
					'Linux',
					'Hardware/software troubleshooting',
					'Customer support',
					'Service ticketing',
					'Documentation'
				]
			},
			{
				title: 'Infrastructure & Security',
				items: [
					'Networking fundamentals',
					'DNS',
					'VPN / Tailscale',
					'Docker',
					'Kubernetes / k3s',
					'Virtualization',
					'Monitoring',
					'Security fundamentals'
				]
			}
		],
		certifications: [
			{ status: 'In progress', title: 'Google Cybersecurity Certificate' },
			{ status: 'In progress', title: 'CompTIA Security+' },
			{
				status: 'In progress',
				title: 'TryHackMe',
				description: 'Plus networking and Linux administration training.'
			}
		]
	},
	experience: [
		{
			date: 'January 2023 - Present',
			organization: 'U.C.P.N.B. · Cypress School',
			title: "Teacher's Aide",
			bullets: [
				'Document daily progress notes and classroom observations in Ensora, communicating clear updates to teachers, behavioral staff, and therapy teams.',
				'Support multiple classrooms in high-pressure situations, following established procedures while adapting communication to individual student needs.'
			]
		},
		{
			date: 'April 2022 - December 2023',
			organization: 'Computer Courage',
			title: 'Full Stack Developer',
			bullets: [
				'Developed and launched four production websites from Figma designs using WordPress, React, PHP, and JavaScript, collaborating with clients and internal teams from implementation through deployment.',
				'Troubleshot browser, CMS, accessibility, performance, and legacy-code issues across production sites, using structured debugging to identify root causes and resolve defects.',
				'Built and maintained web platforms for institutional clients including UC Berkeley Human Rights Center and Haas Fund, improving accessibility, performance, and long-term maintainability.'
			]
		},
		{
			date: 'July 2019 - April 2022',
			organization: 'Best Buy · Geek Squad',
			title: 'Consultation Agent',
			bullets: [
				'Diagnosed hardware, software, operating system, connectivity, and peripheral issues across a high-volume customer support queue.',
				'Managed service tickets from intake through resolution or repair handoff, documenting symptoms, troubleshooting steps, device condition, and next actions.',
				'Explained technical issues and repair options clearly to nontechnical customers while coordinating with repair teams and escalating issues when needed.'
			]
		}
	],
	homelab: {
		date: '2025 - Present',
		organization: 'self-hosted',
		body: 'Built and maintain a Linux-based homelab for hosting local AI models, coordinating AI-agent workflows with Hermes, and running self-hosted services. Configure container networking, DNS, VPN access, monitoring, and deployment workflows while focusing on security and optimizing token usage.',
		tags: ['Linux', 'Kubernetes/k3s', 'Docker', 'Local AI Models', 'AI Agents', 'DNS', 'Tailscale', 'Monitoring']
	},
	clientWorks: {
		summary: {
			date: '2022 - 2023',
			organization: 'Computer Courage',
			body: 'Led development on production WordPress sites and tools, translating design requirements into responsive, accessible, maintainable platforms. Built custom theming, content relationships, editor workflows, animations, and interactive elements while balancing usability, performance, and long-term maintainability.',
			tags: ['WordPress', 'PHP', 'Twig', 'ACF', 'JavaScript', 'SCSS', 'WCAG']
		},
		projects: [
			{
				organization: 'UC Berkeley',
				year: '2023',
				title: 'Human Rights Center',
				description:
					'Custom WordPress platform with flexible theming and a taxonomy system, focused on performance, accessibility, and long-term usability for non-technical editors.',
				tags: ['WordPress', 'PHP', 'Twig', 'ACF', 'SCSS'],
				href: 'https://humanrights.berkeley.edu/',
				linkLabel: 'humanrights.berkeley.edu ->'
			},
			{
				organization: 'Computer Courage',
				year: '2023',
				title: 'Linea Creative',
				description:
					'Debut brand site built from detailed design specs into a responsive, production-ready site with complex SVG animations.',
				tags: ['WordPress', 'JavaScript', 'SVG', 'SCSS'],
				href: 'https://lineacreative.com/',
				linkLabel: 'lineacreative.com ->'
			},
			{
				organization: 'UC Berkeley · Haas',
				year: '2023',
				title: 'Haas Fund Pitch',
				description:
					'Internal pitch tool replacing static PDF workflows, with an animated breakdown of alumni funding built in vanilla JS and HTML5 Canvas.',
				tags: ['WordPress', 'HTML5 Canvas', 'JavaScript'],
				href: 'https://haas.berkeley.edu/giving/',
				linkLabel: 'haas.berkeley.edu ->'
			},
			{
				organization: 'Computer Courage',
				year: '2023',
				title: 'Hauskens Impact Learning',
				description:
					'WordPress site focused on flexible content management and long-term maintainability, with custom relationships between content types.',
				tags: ['WordPress', 'PHP', 'Twig'],
				href: 'https://hauskensimpactlearning.com/',
				linkLabel: 'hauskensimpactlearning.com ->'
			}
		],
		moreLink: {
			label: 'See the full web development portfolio at aply.tech ->',
			href: 'https://aply.tech'
		}
	},
	education: [
		{
			date: '2024 - Present',
			organization: 'Santa Rosa Junior College',
			title: 'A.S. in Computer Science (In Progress)'
		},
		{
			date: '2026 - Present',
			organization: 'self-directed',
			title: 'Security & IT Professional Development (In Progress)',
			body: 'Google Cybersecurity Certificate, CompTIA Security+, TryHackMe, networking, Linux administration'
		},
		{
			date: '2019 - 2021',
			organization: 'BloomTech',
			title: 'Full Stack Web Development & Computer Science'
		}
	],
	contact: {
		body: 'Sonoma, CA. Open to IT support, infrastructure, and security-focused roles, including education and nonprofit environments. Resume and references available on request.',
		links: [
			{ label: 'Resume (PDF)', href: '/resume.pdf', isPrimary: true },
			{ label: 'Email', href: 'mailto:Andrei.lysenko@outlook.com' },
			{ label: 'GitHub', href: 'https://github.com/aply333' }
		]
	},
	footer: {
		leftText: 'Andrei Lysenko · Sonoma, CA',
		rightLink: {
			label: 'aply.tech',
			href: 'https://aply.tech'
		},
		rightSuffix: 'web development portfolio'
	}
};

function cloneFallback() {
	return /** @type {any} */ (structuredClone(fallbackItLandingContent));
}

/**
 * @param {string | null | undefined} href
 */
function normalizeHref(href) {
	if (!href) return '';
	const trimmed = href.trim();

	if (
		trimmed.startsWith('/') ||
		trimmed.startsWith('#') ||
		/^[a-z][a-z0-9+.-]*:/i.test(trimmed)
	) {
		return trimmed;
	}

	if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
		return `mailto:${trimmed}`;
	}

	return `https://${trimmed}`;
}

/**
 * @param {any[] | null | undefined} links
 */
function normalizeLinks(links) {
	return (links ?? [])
		.filter((link) => link?.label && link?.href)
		.map((link) => ({
			...link,
			href: normalizeHref(link.href),
			isPrimary: Boolean(link.isPrimary)
		}));
}

/**
 * @param {any[] | null | undefined} links
 * @param {string | null | undefined} resumeUrl
 */
function applyResumeLink(links, resumeUrl) {
	const normalizedResumeUrl = normalizeHref(resumeUrl);

	if (!normalizedResumeUrl) {
		return links ?? [];
	}

	const existingLinks = links ?? [];
	const resumeLink = {
		label: 'Resume (PDF)',
		href: normalizedResumeUrl,
		isPrimary: true
	};

	return [
		resumeLink,
		...existingLinks
			.filter((link) => !/resume/i.test(link?.label ?? ''))
			.map((link) => ({
				...link,
				isPrimary: Boolean(link.isPrimary) && !resumeLink.isPrimary
			}))
	];
}

/**
 * @param {any} content
 */
export function normalizeItLandingContent(content) {
	const fallback = cloneFallback();

	if (!content) {
		return fallback;
	}

	const resumeUrl =
		content.hero?.resumeUrl ?? fallback.hero.links.find((link) => /resume/i.test(link.label))?.href;

	return {
		hero: {
			...fallback.hero,
			...content.hero,
			role: Array.isArray(content.hero?.role) ? content.hero.role.filter(Boolean) : fallback.hero.role,
			links: applyResumeLink(normalizeLinks(content.hero?.links), resumeUrl)
		},
		skills: {
			development: content.skills?.development ?? fallback.skills.development,
			groups: content.skills?.groups ?? fallback.skills.groups,
			certifications: content.skills?.certifications ?? fallback.skills.certifications
		},
		experience: content.experience ?? fallback.experience,
		homelab: {
			...fallback.homelab,
			...content.homelab,
			tags: content.homelab?.tags ?? fallback.homelab.tags
		},
		clientWorks: {
			summary: {
				...fallback.clientWorks.summary,
				...content.clientWorks?.summary,
				tags: content.clientWorks?.summary?.tags ?? fallback.clientWorks.summary.tags
			},
			projects: (content.clientWorks?.projects ?? fallback.clientWorks.projects).map((project) => ({
				...project,
				href: normalizeHref(project?.href),
				tags: project?.tags ?? []
			})),
			moreLink: {
				...fallback.clientWorks.moreLink,
				...content.clientWorks?.moreLink,
				href: normalizeHref(content.clientWorks?.moreLink?.href ?? fallback.clientWorks.moreLink.href)
			}
		},
		education: content.education ?? fallback.education,
		contact: {
			...fallback.contact,
			...content.contact,
			links: applyResumeLink(normalizeLinks(content.contact?.links), resumeUrl)
		},
		footer: {
			...fallback.footer,
			...content.footer,
			rightLink: {
				...fallback.footer.rightLink,
				...content.footer?.rightLink,
				href: normalizeHref(content.footer?.rightLink?.href ?? fallback.footer.rightLink.href)
			}
		}
	};
}

export async function getItLandingContent() {
	try {
		const content = await sanityClient.fetch(itLandingContentQuery);
		return normalizeItLandingContent(content);
	} catch (error) {
		console.error('Failed to fetch IT landing content from Sanity:', error);
		return cloneFallback();
	}
}
