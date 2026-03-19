import MarkdownIt from 'markdown-it';

const legacyPattern = /\*([icb]+)\/(.*?)\/\1\*/g;

const inlineMarkdown = new MarkdownIt({
	html: false,
	linkify: false,
	typographer: false
});

const blockMarkdown = new MarkdownIt({
	html: false,
	linkify: false,
	typographer: false,
	breaks: true
});

/**
 * @param {string | null | undefined} value
 */
export function renderInlineMarkdown(value) {
	return inlineMarkdown.renderInline(value ?? '');
}

/**
 * @param {string | null | undefined} value
 */
export function renderMarkdown(value) {
	return blockMarkdown.render(value ?? '');
}

/**
 * @param {string | null | undefined} value
 */
export function hasLegacyFormatting(value) {
	legacyPattern.lastIndex = 0;
	return legacyPattern.test(value ?? '');
}

/**
 * @param {string} value
 */
function escapeHtml(value) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

/**
 * @param {string | null | undefined} value
 */
export function renderLegacyInline(value) {
	const source = value ?? '';
	let lastIndex = 0;
	let html = '';
	let match;

	legacyPattern.lastIndex = 0;

	while ((match = legacyPattern.exec(source)) !== null) {
		const flags = new Set(match[1].split(''));

		if (match.index > lastIndex) {
			html += escapeHtml(source.slice(lastIndex, match.index));
		}

		const classes = [
			flags.has('i') ? 'type_italic' : '',
			flags.has('c') ? 'type_emphasis' : '',
			flags.has('b') ? 'type_bold' : ''
		]
			.filter(Boolean)
			.join(' ');

		html += `<span class="${classes}">${escapeHtml(match[2])}</span>`;
		lastIndex = legacyPattern.lastIndex;
	}

	if (lastIndex < source.length) {
		html += escapeHtml(source.slice(lastIndex));
	}

	return html;
}

/**
 * @param {string | null | undefined} value
 */
export function renderLegacyBlock(value) {
	const source = value ?? '';
	const paragraphs = source
		.split(/\n{2,}/)
		.map((part) => part.trim())
		.filter(Boolean);

	if (!paragraphs.length) {
		return '';
	}

	return paragraphs.map((paragraph) => `<p>${renderLegacyInline(paragraph)}</p>`).join('');
}

/**
 * @param {string} value
 */
function decodeEntities(value) {
	return value
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
}

/**
 * @param {string | null | undefined} value
 */
export function stripMarkdownToText(value) {
	const rendered = renderInlineMarkdown(value ?? '');
	return decodeEntities(rendered.replace(/<[^>]*>/g, '')).trim();
}

/**
 * @param {string | null | undefined} value
 */
export function stripLegacyFormattingToText(value) {
	return (value ?? '').replace(legacyPattern, '$2').trim();
}

/**
 * @param {string | null | undefined} value
 */
export function stripFormattedText(value) {
	return hasLegacyFormatting(value)
		? stripLegacyFormattingToText(value)
		: stripMarkdownToText(value);
}
