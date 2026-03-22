/**
 * @param {string} hex
 */
export function getContrastTextColor(hex) {
	const normalized = normalizeHexColor(hex);
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

/**
 * @param {string} hex
 * @param {number} amount
 */
export function darkenHexColor(hex, amount = 0.2) {
	const normalized = normalizeHexColor(hex);
	const fullHex =
		normalized.length === 3
			? normalized
					.split('')
					.map((char) => char + char)
					.join('')
			: normalized;

	const clamp = (value) => Math.max(0, Math.min(255, value));
	const scale = Math.max(0, 1 - amount);
	const red = clamp(Math.round(parseInt(fullHex.slice(0, 2), 16) * scale));
	const green = clamp(Math.round(parseInt(fullHex.slice(2, 4), 16) * scale));
	const blue = clamp(Math.round(parseInt(fullHex.slice(4, 6), 16) * scale));

	return `#${[red, green, blue].map((value) => value.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * @param {string} hex
 */
function normalizeHexColor(hex) {
	return hex.replace('#', '');
}
