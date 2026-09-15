import { i as __toESM } from "../_runtime.mjs";
import { M as SRGBColorSpace, m as CanvasTexture, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as usdaClass } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-DlioXXB_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLS = {
	Sand: "#e8c98a",
	"Loamy sand": "#d7b56e",
	"Sandy loam": "#c4a056",
	Loam: "#8a7a48",
	"Silt loam": "#b8c47a",
	Silt: "#cfe08a",
	"Sandy clay loam": "#a07048",
	"Clay loam": "#7a5a38",
	"Silty clay loam": "#6a7040",
	"Sandy clay": "#8a5030",
	"Silty clay": "#5a6040",
	Clay: "#5a3a28"
};
function usdaTexture() {
	const size = 768;
	const c = document.createElement("canvas");
	c.width = size;
	c.height = size;
	const ctx = c.getContext("2d");
	ctx.fillStyle = "#121a1c";
	ctx.fillRect(0, 0, size, size);
	const sand = {
		x: size * .08,
		y: size * .9
	};
	const silt = {
		x: size * .92,
		y: size * .9
	};
	const clay = {
		x: size * .5,
		y: size * .08
	};
	const bary = (px, py) => {
		const det = (silt.y - clay.y) * (sand.x - clay.x) + (clay.x - silt.x) * (sand.y - clay.y);
		const a = ((silt.y - clay.y) * (px - clay.x) + (clay.x - silt.x) * (py - clay.y)) / det;
		const b = ((clay.y - sand.y) * (px - clay.x) + (sand.x - clay.x) * (py - clay.y)) / det;
		const c0 = 1 - a - b;
		return {
			sand: a * 100,
			silt: b * 100,
			clay: c0 * 100
		};
	};
	const img = ctx.createImageData(size, size);
	const hex = (h) => {
		const n = parseInt(h.slice(1), 16);
		return [
			n >> 16 & 255,
			n >> 8 & 255,
			n & 255
		];
	};
	for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
		const { sand: sa, silt: si, clay: cl } = bary(x + .5, y + .5);
		const i = (y * size + x) * 4;
		if (sa < -1 || si < -1 || cl < -1) {
			img.data[i + 3] = 0;
			continue;
		}
		if (sa < 0 || si < 0 || cl < 0) {
			img.data[i + 3] = 0;
			continue;
		}
		const [r, g, b] = hex(COLS[usdaClass(sa, cl)] ?? "#8a7a48");
		img.data[i] = r;
		img.data[i + 1] = g;
		img.data[i + 2] = b;
		img.data[i + 3] = 255;
	}
	ctx.putImageData(img, 0, 0);
	ctx.strokeStyle = "#f4efe6";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(sand.x, sand.y);
	ctx.lineTo(silt.x, silt.y);
	ctx.lineTo(clay.x, clay.y);
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = "#f4efe6";
	ctx.font = "28px ui-monospace, monospace";
	ctx.fillText("SAND", sand.x, sand.y + 36);
	ctx.fillText("SILT", silt.x - 70, silt.y + 36);
	ctx.fillText("CLAY", clay.x - 36, clay.y - 10);
	const tex = new CanvasTexture(c);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 8;
	return tex;
}
function Triangle() {
	const sand = useLabControls((s) => s.params.sand ?? 40);
	const clay = useLabControls((s) => s.params.clay ?? 20);
	const silt = Math.max(0, 100 - sand - clay);
	const cls = usdaClass(sand, clay);
	const tex = (0, import_react.useMemo)(() => typeof document === "undefined" ? null : usdaTexture(), []);
	const x = (silt - sand) / 100 * 1.55;
	const y = clay / 100 * 2.35 - .15;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 8 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-.18,
				0,
				0
			],
			position: [
				0,
				.02,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [3.4, 3.4] }), tex ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: tex,
				roughness: .7,
				metalness: .02
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1c2628" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				x,
				.12 + y * .05,
				y * .15 - .2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.07,
				24,
				24
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#E8B86D",
				emissive: "#E8B86D",
				emissiveIntensity: .35
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-1.55,
				.2,
				1.35
			],
			text: "Sand",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.55,
				.2,
				1.35
			],
			text: "Silt"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				2.15,
				-1.4
			],
			text: "Clay",
			tone: "magma"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, { children: [
			cls,
			" · sand ",
			sand.toFixed(0),
			" · silt ",
			silt.toFixed(0),
			" · clay ",
			clay.toFixed(0)
		] })
	] });
}
function SoilTextureScene() {
	const sand = useLabControls((s) => s.params.sand ?? 40);
	const clay = useLabControls((s) => s.params.clay ?? 20);
	const cls = usdaClass(sand, clay);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "soil-texture",
		title: "Soil texture triangle",
		camera: {
			position: [
				0,
				2.2,
				4.4
			],
			fov: 40
		},
		liveText: `USDA class ${cls}. Sand ${sand.toFixed(0)} percent, clay ${clay.toFixed(0)} percent.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "soil-texture",
			title: "Soil texture",
			caption: `Class: ${cls}`
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Triangle, {})
	});
}
//#endregion
export { SoilTextureScene as default };
