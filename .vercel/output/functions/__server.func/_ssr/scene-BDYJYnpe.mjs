import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, f as WaterSheet, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-BDYJYnpe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tint = new Color();
function Model() {
	const wind = useLabControls((s) => s.params.wind ?? .4);
	const q = useQuality();
	const rock = useRockNormal();
	const nrm = (0, import_react.useMemo)(() => new Vector2(.5, .5), []);
	const pile = .08 + wind * .55;
	const fn = (0, import_react.useMemo)(() => (x, z) => {
		return .04 + .5 * (1 + Math.tanh((z - .9) * 6)) * .55;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 14 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn,
			width: 9.2,
			depth: 6.2,
			segX: q.terrain,
			segZ: Math.floor(q.terrain * .5),
			colorFn: (h) => h < .12 ? tint.set(PBR.sand.color) : tint.set("#7C9A6A")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				0,
				0,
				-.9
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterSheet, {
				width: 9.2,
				depth: 3.6,
				y: pile * .42,
				opacity: .74
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				-.2,
				.85 + pile,
				-2.4
			],
			to: [
				-.2,
				.55 + pile,
				.35
			],
			color: "#E8B86D",
			radius: .045
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				2.4,
				.42,
				1.05
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.42,
				.48,
				.22,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#8a6a48",
				roughness: .9,
				normalMap: rock,
				normalScale: nrm
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-.2,
				1.25 + pile,
				-1.2
			],
			text: "Onshore wind",
			tone: "sandstone",
			note: "Wind piles water on a shelf. The seafloor did not slip."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				.35 + pile,
				.2
			],
			text: `Surge · ${Math.round(pile * 8)} m school`,
			tone: "ice",
			note: "School metres on the pile. Real 1953 and Katrina numbers live in Why."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.4,
				.85,
				1.05
			],
			text: "Shelf coast",
			tone: "moss",
			note: "A wide shelf lets water pile. This is not a tsunami."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.55,
				0
			],
			children: [
				"Wind ",
				wind.toFixed(2),
				" · floor did not slip · this is not a tsunami"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.2,
				3.4,
				8.2
			],
			[
				-2.2,
				2.2,
				5.2
			],
			[
				2.6,
				2,
				5.4
			],
			[
				.2,
				3.4,
				8.2
			]
		] })
	] });
}
function StormSurgeScene() {
	const wind = useLabControls((s) => s.params.wind ?? .4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "storm-surge",
		title: "Storm surge",
		camera: {
			position: [
				.2,
				3.4,
				8.2
			],
			fov: 40
		},
		exaggeration: "School metres on the pile. Real 1953 and Katrina numbers live in the Why panel, cited.",
		liveText: `Storm surge. Onshore wind ${wind.toFixed(2)}. Water piles on a shelf. The seafloor did not slip.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "storm-surge",
			title: "Storm surge",
			caption: "Wind piles water on a shelf. Not a tsunami."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { StormSurgeScene as default };
