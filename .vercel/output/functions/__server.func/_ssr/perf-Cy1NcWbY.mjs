import { i as __toESM } from "../_runtime.mjs";
import { A as RepeatWrapping, M as SRGBColorSpace, r as useTexture } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-media-CiM4R1eH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useMediaQuery(query) {
	const [matches, setMatches] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia(query);
		const update = () => setMatches(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, [query]);
	return matches;
}
function usePrefersReducedMotion() {
	return useMediaQuery("(prefers-reduced-motion: reduce)");
}
function useIsCompact() {
	return useMediaQuery("(max-width: 1099px)");
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/perf-Cy1NcWbY.js
/** PBR presets. Colours encode mechanism, not decoration. */
var PBR = {
	rock: {
		color: "#5c564c",
		roughness: .92,
		metalness: .04
	},
	crust: {
		color: "#7C9A6A",
		roughness: .88,
		metalness: .02
	},
	mantle: {
		color: "#4f463c",
		roughness: .93,
		metalness: .06
	},
	outerCore: {
		color: "#c4a05a",
		roughness: .28,
		metalness: .72
	},
	innerCore: {
		color: "#e8d5a3",
		roughness: .18,
		metalness: .82
	},
	water: {
		color: "#1a4a6e",
		roughness: .08,
		metalness: .06
	},
	ice: {
		color: "#d5eaf4",
		roughness: .14,
		metalness: .04
	},
	soil: {
		color: "#6b5344",
		roughness: .96,
		metalness: .02
	},
	sand: {
		color: "#c4a574",
		roughness: .9,
		metalness: .02
	},
	magma: {
		color: "#ff6a3d",
		roughness: .35,
		metalness: .1,
		emissive: "#ff3b00",
		emissiveIntensity: .45
	},
	ash: {
		color: "#3a4038",
		roughness: .95,
		metalness: .02
	},
	limestone: {
		color: "#d8d0c0",
		roughness: .7,
		metalness: .04
	},
	basalt: {
		color: "#3d3a38",
		roughness: .86,
		metalness: .08
	},
	granite: {
		color: "#b8a090",
		roughness: .72,
		metalness: .06
	}
};
function useRockNormal() {
	const t = useTexture("/textures/rock-normal.png");
	t.wrapS = t.wrapT = RepeatWrapping;
	t.repeat.set(2, 2);
	t.colorSpace = "";
	t.anisotropy = 8;
	return t;
}
function useSoilNormal() {
	const t = useTexture("/textures/soil-normal.png");
	t.wrapS = t.wrapT = RepeatWrapping;
	t.repeat.set(3, 3);
	t.colorSpace = "";
	t.anisotropy = 8;
	return t;
}
function useCloudMap() {
	const t = useTexture("/textures/clouds.png");
	t.colorSpace = SRGBColorSpace;
	t.anisotropy = 8;
	t.wrapS = RepeatWrapping;
	return t;
}
/** USDA 12-class texture from sand/silt/clay percents (0–100). */
function usdaClass(sand, clay) {
	const silt = Math.max(0, 100 - sand - clay);
	if (clay >= 40 && sand <= 45 && silt < 40) return "Clay";
	if (clay >= 40 && silt >= 40) return "Silty clay";
	if (clay >= 35 && sand >= 45) return "Sandy clay";
	if (clay >= 27 && clay < 40 && sand <= 20) return "Silty clay loam";
	if (clay >= 27 && clay < 40 && sand > 45 && silt < 28) return "Sandy clay loam";
	if (clay >= 27 && clay < 40) return "Clay loam";
	if (silt >= 80 && clay < 12) return "Silt";
	if (silt >= 50 && clay < 27 && sand <= 20) return "Silt loam";
	if (clay >= 7 && clay < 27 && silt >= 28 && silt < 50 && sand < 52) return "Loam";
	if (clay < 20 && sand >= 43 && sand < 85 && silt + 1.5 * clay >= 15) {
		if (clay >= 7 && sand < 52) return "Sandy loam";
		return "Sandy loam";
	}
	if (sand >= 70 && clay <= 15 && silt + 2 * clay < 30) {
		if (sand >= 85 && clay < 10) return "Sand";
		return "Loamy sand";
	}
	if (sand >= 85 && clay < 10) return "Sand";
	if (sand >= 70) return "Loamy sand";
	if (silt >= 50) return "Silt loam";
	if (clay >= 20) return "Clay loam";
	return "Loam";
}
function useQuality() {
	if (useIsCompact()) return {
		sphere: 64,
		terrain: 128,
		lathe: 64,
		particles: 10,
		shadows: false,
		dpr: [1, 1.35],
		stars: 800
	};
	return {
		sphere: 128,
		terrain: 256,
		lathe: 128,
		particles: 24,
		shadows: true,
		dpr: [1, 2],
		stars: 2200
	};
}
//#endregion
export { useRockNormal as a, usePrefersReducedMotion as c, useQuality as i, usdaClass as n, useSoilNormal as o, useCloudMap as r, useIsCompact as s, PBR as t };
