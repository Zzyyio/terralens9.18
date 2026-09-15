import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-BV7fkMFZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tint = new Color();
function Model() {
	const table0 = useLabControls((s) => s.params.table ?? .55);
	const pump = useLabControls((s) => s.params.pump ?? 0);
	const confined = (useLabControls((s) => s.params.confined) ?? 0) > .5;
	const rock = useRockNormal();
	const q = useQuality();
	const nrm = (0, import_react.useMemo)(() => new Vector2(.6, .6), []);
	const table = Math.max(.12, table0 - pump * .28);
	const cone = pump * .35;
	const host = (0, import_react.useMemo)(() => (x, z) => {
		return .35 + .18 * Math.exp(-(x * x) / 8) + .04 * Math.sin(x * .8) * Math.cos(z * 1.1);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 10 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn: host,
			width: 6.4,
			depth: 3.4,
			segX: q.terrain,
			segZ: Math.floor(q.terrain * .45),
			colorFn: (h) => tint.set(h > .48 ? "#7C9A6A" : "#c4a574"),
			position: [
				0,
				0,
				0
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				table * .85,
				.02
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				2.05,
				2.15,
				Math.max(.08, table * 1.1),
				32,
				1
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				color: PBR.water.color,
				roughness: .08,
				transmission: .28,
				thickness: .6,
				transparent: true,
				opacity: .48,
				depthWrite: false
			})]
		}),
		confined && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.12,
				.02
			],
			rotation: [
				-.04,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				2.2,
				2.25,
				.1,
				28,
				1
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#5c564c",
				roughness: .9,
				normalMap: rock,
				normalScale: nrm
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.85,
				.95,
				.15
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.055,
				.055,
				1.85,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#8B9A97",
				metalness: .45,
				roughness: .38
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.85,
				table * .7 - cone,
				.15
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
				.55 + pump * .4,
				.1 + cone,
				20
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				color: "#1a4a6e",
				transparent: true,
				opacity: .55,
				roughness: .12
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				1.95,
				table * 1.05,
				.7
			],
			rotation: [
				.45,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.025,
				.04,
				.55,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				color: "#7FD4FF",
				roughness: .1,
				transmission: .4,
				transparent: true,
				opacity: .8
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-1.6,
				table * 1.35 + .2,
				.6
			],
			text: "Water table",
			tone: "ice",
			note: "The free surface in the pores. Not an underground lake."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.85,
				1.95,
				.4
			],
			text: "Well",
			note: "A well mines a store and draws a cone of depression."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.15,
				table * 1.2,
				1
			],
			text: "Spring",
			tone: "glacier",
			note: "Where the table meets the slope, water leaves as a spring."
		}),
		confined && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				1.4,
				.7
			],
			text: "Aquitard lid",
			tone: "sandstone",
			note: "A low-permeability lid. Confined water is still in pores."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.45,
				0
			],
			children: [
				"Table ",
				table.toFixed(2),
				" · pump ",
				pump.toFixed(2),
				" · pores, not a cave lake"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				2.8,
				1.4,
				5.2
			],
			[
				.8,
				1.6,
				3.4
			],
			[
				2.2,
				.6,
				3.8
			],
			[
				2.8,
				1.4,
				5.2
			]
		] })
	] });
}
function GroundwaterScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "groundwater",
		title: "Groundwater",
		camera: {
			position: [
				2.8,
				1.4,
				5.2
			],
			fov: 40
		},
		exaggeration: "A glass-tank cutaway. Real Chalk is fractures plus matrix. Real Ogallala is sediment.",
		liveText: "Water table in the pores. A well mines a store and draws a cone of depression.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "groundwater",
			title: "Groundwater",
			caption: "Water table, well, cone of depression. Pores, not a lake."
		}),
		target: [
			0,
			.6,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { GroundwaterScene as default };
