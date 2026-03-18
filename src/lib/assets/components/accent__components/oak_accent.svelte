<script>
	import oakAccentBranchesDark from '$lib/assets/images/oak_accent_branches_dark.svg?url';
	import oakAccentBranchesLight from '$lib/assets/images/oak_accent_branches_light.svg?url';
	import oakAccentLeavesDarkCompact from '$lib/assets/images/oak_accent_leaves_dark_compact.svg?url';
	import oakAccentLeavesDarkDesktop from '$lib/assets/images/oak_accent_leaves_dark_desktop.svg?url';
	import oakAccentLeavesLightCompact from '$lib/assets/images/oak_accent_leaves_light_compact.svg?url';
	import oakAccentLeavesLightDesktop from '$lib/assets/images/oak_accent_leaves_light_desktop.svg?url';
</script>

<div class="oak_accent">
	<div class="oak_accent__branches" aria-hidden="true">
		<picture>
			<source srcset={oakAccentBranchesDark} media="(prefers-color-scheme: dark)" />
			<img
				src={oakAccentBranchesLight}
				alt=""
				loading="lazy"
				decoding="async"
				draggable="false"
			/>
		</picture>
	</div>
	<div class="oak_accent__glow" aria-hidden="true"></div>
	<div class="oak_accent__leaves" aria-hidden="true">
		<picture>
			<source srcset={oakAccentLeavesDarkCompact} media="(max-width: 1239px) and (prefers-color-scheme: dark)" />
			<source srcset={oakAccentLeavesDarkDesktop} media="(prefers-color-scheme: dark)" />
			<source srcset={oakAccentLeavesLightCompact} media="(max-width: 1239px)" />
			<img
				src={oakAccentLeavesLightDesktop}
				alt=""
				loading="lazy"
				decoding="async"
				draggable="false"
			/>
		</picture>
	</div>
</div>

<style lang="scss">
	.oak_accent {
		display: grid;
		width: 100%;
	}

	.oak_accent__branches,
	.oak_accent__glow,
	.oak_accent__leaves {
		grid-area: 1 / 1;
	}

	.oak_accent__branches {
		z-index: 1;
	}

	.oak_accent__glow {
		z-index: 2;
		width: 100%;
		height: 100%;
		pointer-events: none;
		background: radial-gradient(
			circle at bottom left,
			var(--bg-secondary) 0%,
			rgba(0, 0, 0, 0) 60%
		);
	}

	.oak_accent__leaves {
		z-index: 3;
	}

	.oak_accent picture,
	.oak_accent img {
		display: block;
		width: 100%;
		height: auto;
	}

	.oak_accent img {
		transform: scaleX(-1);
		transform-origin: center;
	}

	// @media (min-width: 1240px) {
	// 	.oak_accent__branches--light {
	// 		display: none;
	// 	}

	// 	.oak_accent__branches--dark {
	// 		display: block;
	// 	}
	// }
</style>
