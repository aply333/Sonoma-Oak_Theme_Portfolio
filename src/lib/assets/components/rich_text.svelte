<script>
	let { text } = $props();

	/**
	 * @param {string} value
	 */
	function parseText(value) {
		/** @type {{ value: string; italic: boolean; accent: boolean; bold: boolean }[]} */
		const parts = [];
		const pattern = /\*([icb]+)\/(.*?)\/\1\*/g;
		let lastIndex = 0;
		let match;

		while ((match = pattern.exec(value)) !== null) {
			const flags = new Set(match[1].split(''));

			if (match.index > lastIndex) {
				parts.push({
					value: value.slice(lastIndex, match.index),
					italic: false,
					accent: false,
					bold: false
				});
			}

			parts.push({
				value: match[2],
				italic: flags.has('i'),
				accent: flags.has('c'),
				bold: flags.has('b')
			});

			lastIndex = pattern.lastIndex;
		}

		if (lastIndex < value.length) {
			parts.push({
				value: value.slice(lastIndex),
				italic: false,
				accent: false,
				bold: false
			});
		}

		return parts;
	}
</script>

<span class="rich_text">
	{#each parseText(text) as part}
		<span
			class:type_italic={part.italic}
			class:type_emphasis={part.accent}
			class:type_bold={part.bold}
		>
			{part.value}
		</span>
	{/each}
</span>

<style>
	.rich_text {
		display: contents;
	}
</style>
