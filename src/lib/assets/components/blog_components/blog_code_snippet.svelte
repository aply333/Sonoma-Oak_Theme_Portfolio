<script>
	let { portableText } = $props();

	const LANGUAGE_CONFIG = {
		javascript: {
			pattern:
				/(?<comment>\/\/.*$|\/\*[\s\S]*?\*\/)|(?<string>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(?<keyword>\b(?:async|await|break|case|catch|class|const|continue|default|else|export|extends|false|finally|for|from|function|if|import|let|new|null|return|super|switch|this|throw|true|try|typeof|undefined|var|while)\b)|(?<number>\b\d+(?:\.\d+)?\b)|(?<function>\b[A-Za-z_$][\w$]*(?=\())/gm
		},
		python: {
			pattern:
				/(?<comment>#.*$)|(?<string>"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?<keyword>\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|False|finally|for|from|if|import|in|is|lambda|None|not|or|pass|raise|return|True|try|while|with|yield)\b)|(?<number>\b\d+(?:\.\d+)?\b)|(?<function>\b[A-Za-z_]\w*(?=\())/gm
		},
		cpp: {
			pattern:
				/(?<preprocessor>^\s*#\s*[A-Za-z_]\w*)|(?<comment>\/\/.*$|\/\*[\s\S]*?\*\/)|(?<string>"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(?<keyword>\b(?:auto|bool|break|case|catch|class|const|constexpr|continue|default|delete|do|double|else|false|float|for|if|include|inline|int|namespace|new|nullptr|private|protected|public|return|static|std|struct|switch|template|this|throw|true|try|using|void|while)\b)|(?<number>\b\d+(?:\.\d+)?\b)|(?<function>\b[A-Za-z_]\w*(?=\())/gm
		}
	};

	function escapeHtml(value) {
		return String(value)
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll('"', '&quot;')
			.replaceAll("'", '&#39;');
	}

	function highlightCodeSnippet(input, languageName) {
		const source = typeof input === 'string' ? input : '';
		const config = LANGUAGE_CONFIG[languageName];

		if (!source) return '';
		if (!config?.pattern) return escapeHtml(source);

		let html = '';
		let lastIndex = 0;

		for (const match of source.matchAll(config.pattern)) {
			const token = match[0] ?? '';
			const index = match.index ?? 0;
			const groups = match.groups ?? {};
			const tokenType = Object.keys(groups).find((key) => groups[key] !== undefined);

			html += escapeHtml(source.slice(lastIndex, index));
			html += tokenType
				? `<span class="blog_code_snippet__token blog_code_snippet__token--${tokenType}">${escapeHtml(token)}</span>`
				: escapeHtml(token);
			lastIndex = index + token.length;
		}

		html += escapeHtml(source.slice(lastIndex));
		return html;
	}

	const value = $derived.by(() => portableText?.value ?? {});

	const language = $derived.by(() => value?.language || 'text');
	const languageLabel = $derived.by(() => {
		if (language === 'javascript') return 'JavaScript';
		if (language === 'python') return 'Python';
		if (language === 'cpp') return 'C++';

		return language;
	});
	const code = $derived.by(() => value?.code || '');
	const highlightedCode = $derived.by(() => highlightCodeSnippet(code, language));
</script>

{#if code}
	<div class="blog_code_snippet">
		<div class="blog_code_snippet__label">{languageLabel}</div>
		<pre><code class={`language-${language}`}>{@html highlightedCode}</code></pre>
	</div>
{/if}

<style>
	.blog_code_snippet {
		width: 100%;
		min-width: 0;
		max-width: 100%;
		margin: 2.8rem 0;
		border: 0.1rem solid color-mix(in srgb, var(--border) 82%, transparent);
		border-radius: 1.8rem;
		overflow: hidden;
		background:
			linear-gradient(
				180deg,
				color-mix(in srgb, var(--primary) 4%, transparent),
				transparent 4.2rem
			),
			color-mix(in srgb, var(--bg) 94%, black 6%);
		box-shadow: var(--shadow-soft);
	}

	.blog_code_snippet__label {
		padding: 1rem 1.4rem 0;
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.blog_code_snippet pre {
		width: 100%;
		min-width: 0;
		max-width: 100%;
		box-sizing: border-box;
		margin: 0;
		padding: 1.4rem;
		overflow-x: auto;
		overflow-y: hidden;
		background: transparent;
		max-width: 100%;
		-webkit-overflow-scrolling: touch;
		overscroll-behavior-x: contain;
	}

	.blog_code_snippet code {
		display: block;
		min-width: max-content;
		width: max-content;
		max-width: none;
		font-family: var(--font-mono);
		font-size: 1.5rem;
		line-height: 1.7;
		color: var(--text);
		white-space: pre;
	}

	@media (max-width: 640px) {
		.blog_code_snippet {
			border-radius: 1.4rem;
			max-width: 80vw;
		}

		.blog_code_snippet__label {
			padding: 0.9rem 1rem 0;
		}

		.blog_code_snippet pre {
			padding: 1rem;
		}

		.blog_code_snippet code {
			font-size: 1.35rem;
			line-height: 1.6;
		}
	}

	.blog_code_snippet :global(.blog_code_snippet__token--comment) {
		color: color-mix(in srgb, var(--text-secondary) 88%, var(--leaf-light));
		font-style: italic;
	}

	.blog_code_snippet :global(.blog_code_snippet__token--string) {
		color: color-mix(in srgb, var(--oak-leaf-light) 72%, var(--accent));
	}

	.blog_code_snippet :global(.blog_code_snippet__token--keyword),
	.blog_code_snippet :global(.blog_code_snippet__token--preprocessor) {
		color: color-mix(in srgb, var(--primary) 78%, var(--leaf-dark));
		font-weight: 700;
	}

	.blog_code_snippet :global(.blog_code_snippet__token--number) {
		color: color-mix(in srgb, var(--accent) 84%, var(--oak-leaf-mid));
	}

	.blog_code_snippet :global(.blog_code_snippet__token--function) {
		color: color-mix(in srgb, var(--leaf-dark) 72%, var(--text));
	}
</style>
