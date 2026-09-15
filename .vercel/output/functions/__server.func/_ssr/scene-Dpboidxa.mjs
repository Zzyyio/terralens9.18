import { i as __toESM } from "../_runtime.mjs";
import { g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-Dpboidxa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tint = new Color();
function Model() {
	const ridge = useLabControls((s) => s.params.ridge ?? .7);
	const wind = useLabControls((s) => s.params.wind ?? .7);
	const q = useQuality();
	const hMax = .55 + ridge * 1.7;
	const fn = (0, import_react.useMemo)(() => (x, z) => {
		const r = Math.exp(-(x * x) / .85);
		return .08 + r * hMax + .04 * Math.sin(z * 1.2) * r;
	}, [hMax]);
	const rainN = Math.round(4 + wind * ridge * 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 14 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn,
			width: 9.2,
			depth: 6.4,
			segX: q.terrain,
			segZ: Math.floor(q.terrain * .6),
			colorFn: (h) => h > hMax * .7 ? tint.set("#d8d0c0") : h > .35 ? tint.set("#7C9A6A") : tint.set("#c4a574")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				-4.2,
				1.1,
				0
			],
			to: [
				-1.1,
				.55 + hMax,
				0
			],
			color: "#7FD4FF",
			radius: .04
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				1.1,
				.55 + hMax,
				0
			],
			to: [
				4,
				.7,
				0
			],
			color: "#E8B86D",
			radius: .04
		}),
		Array.from({ length: rainN }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-1.7 - i % 4 * .22,
				.9 + hMax * .35 - Math.floor(i / 4) * .28,
				-1.4 + i % 5 * .55
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.045,
				10,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#7FD4FF",
				roughness: .2
			})]
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-2.4,
				1.15 + hMax * .4,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.55 + wind * .25,
				16,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e8eef2",
				transparent: true,
				opacity: .35,
				depthWrite: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-2.6,
				1.6 + hMax * .3,
				0
			],
			text: "Windward · rain",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.6,
				1.15,
				0
			],
			text: "Lee · rain shadow",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				hMax + .45,
				0
			],
			text: "Barrier"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				hMax + 1.15,
				0
			],
			children: [
				"Ridge ",
				ridge.toFixed(2),
				" · wind ",
				wind.toFixed(2),
				" · air already dropped its water"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				3.2,
				9
			],
			[
				-3.2,
				2.2,
				6
			],
			[
				3.2,
				2,
				6
			],
			[
				0,
				3.2,
				9
			]
		] })
	] });
}
function RainShadowScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "rain-shadow",
		title: "Rain shadow",
		camera: {
			position: [
				0,
				3.2,
				9
			],
			fov: 40
		},
		exaggeration: "One ridge, one wind. Real Lake District weather also has fronts.",
		liveText: "Moist air rises, rains, descends dry. The mountain is a barrier, not a cloud factory.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "rain-shadow",
			title: "Rain shadow",
			caption: "Windward rain, leeward dry. Orographic lift."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { RainShadowScene as default };
