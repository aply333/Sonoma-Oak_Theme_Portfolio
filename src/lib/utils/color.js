/**
 * @param {string} hex
 */
export function getContrastTextColor(hex) {
	const normalized = hex.replace('#', '');
	const fullHex =
		normalized.length === 3
			? normalized
					.split('')
					.map((char) => char + char)
					.join('')
			: normalized;

	const red = parseInt(fullHex.slice(0, 2), 16);
	const green = parseInt(fullHex.slice(2, 4), 16);
	const blue = parseInt(fullHex.slice(4, 6), 16);
	const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

	return luminance > 0.6 ? '#111111' : '#ffffff';
}
