import { i as __toESM } from "../_runtime.mjs";
import { g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, f as WaterSheet, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-DpL96nZk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAMES = [
	"Stable continent",
	"Rift",
	"Young ocean",
	"Wide ocean",
	"Closing · trench",
	"Collision"
];
var tint = new Color();
function Model() {
	const stage = Math.round(useLabControls((s) => s.params.stage ?? 2));
	const s = Math.min(5, Math.max(0, stage));
	const q = useQuality();
	const gap = s <= 1 ? .15 + s * .35 : s < 4 ? .5 + (s - 1) * .7 : Math.max(.08, 2.6 - (s - 3) * 1.2);
	const ridge = s >= 2 && s <= 4;
	const trench = s >= 4;
	const mountains = s >= 5 ? 1 : 0;
	const leftFn = (0, import_react.useMemo)(() => (x, z) => {
		return .12 + .5 * (1 + Math.tanh((-x - .2) * 4)) * (.55 + .08 * Math.sin(z * 1.4)) + mountains * .35 * Math.exp(-((x + .4) ** 2) / .4);
	}, [mountains]);
	const rightFn = (0, import_react.useMemo)(() => (x, z) => {
		return .12 + .5 * (1 + Math.tanh((x - .2) * 4)) * (.55 + .08 * Math.sin(z * 1.2)) + mountains * .55 * Math.exp(-((x - .15) ** 2) / .35);
	}, [mountains]);
	const ridgeFn = (0, import_react.useMemo)(() => (x, z) => .08 + .22 * Math.exp(-(x * x) / .08) + .03 * Math.sin(z * 3), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-.22,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				4.2,
				4.4,
				.55,
				40,
				1
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.mantle.color,
				roughness: .93
			})]
		}),
		s >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterSheet, {
			width: gap * 2.4 + 1.6,
			depth: 3.2,
			y: .16,
			opacity: .72
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				-1.35 - gap * .5,
				0,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
				fn: leftFn,
				width: 3.4,
				depth: 2.8,
				segX: Math.floor(q.terrain * .7),
				segZ: Math.floor(q.terrain * .45),
				colorFn: (h) => tint.set(h > .5 ? "#8a8478" : PBR.crust.color)
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				1.35 + gap * .5,
				0,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
				fn: rightFn,
				width: 3.4,
				depth: 2.8,
				segX: Math.floor(q.terrain * .7),
				segZ: Math.floor(q.terrain * .45),
				colorFn: (h) => tint.set(h > .5 ? "#8a8478" : PBR.crust.color)
			})
		}),
		ridge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				0,
				.02,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
				fn: ridgeFn,
				width: 1.1,
				depth: 2.6,
				segX: 18,
				segZ: 22,
				colorFn: () => tint.set(PBR.basalt.color)
			})
		}),
		trench && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.75,
				.02,
				0
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [
				.55,
				2.6,
				8,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#0a2433",
				roughness: .4
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				1.55 + mountains * .4,
				0
			],
			text: NAMES[s],
			tone: "sandstone",
			note: "Oceans open at rifts and close at trenches. The Wilson cycle is one ocean's life."
		}),
		ridge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				.7,
				1.1
			],
			text: "Ridge",
			tone: "magma",
			note: "New ocean crust. Magnetic stripes age away from the axis."
		}),
		trench && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.85,
				.55,
				1.1
			],
			text: "Trench",
			tone: "ice",
			note: "Old crust is consumed. A closing ocean, not a second rift."
		}),
		mountains > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.2,
				1.45,
				.7
			],
			text: "Caledonides / Appalachians",
			note: "A closed ocean. Collision mountains, not a volcanic arc."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.35,
				0
			],
			children: [
				"Stage ",
				s,
				" · ",
				NAMES[s],
				" · oceans open and close"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				2.6,
				7.2
			],
			[
				-2.2,
				1.6,
				5
			],
			[
				2.2,
				1.6,
				5
			],
			[
				0,
				2.6,
				7.2
			]
		] })
	] });
}
function WilsonCycleScene() {
	const stage = Math.round(useLabControls((s) => s.params.stage ?? 2));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "wilson-cycle",
		title: "Wilson cycle",
		camera: {
			position: [
				0,
				2.6,
				7.2
			],
			fov: 40
		},
		exaggeration: "Six clean stages, a strip not a sphere. Real cycles overlap and include terranes.",
		liveText: `Wilson cycle stage ${stage}. Rift to collision. Caledonides and Appalachians are a closed ocean.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "wilson-cycle",
			title: "Wilson cycle",
			caption: "Rift, ocean, trench, collision. Oceans open and close."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { WilsonCycleScene as default };
