import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, o as useSoilNormal, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, f as WaterSheet, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-C_ilw61r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tint = new Color();
function cliffH(x, z) {
	let h = .04 + .5 * (1 + Math.tanh((z + .4) * 3.2)) * .08;
	const cliff = .5 * (1 + Math.tanh((z - .35) * 8));
	h += cliff * 1.15;
	h += .08 * Math.sin(x * 1.4) * cliff;
	if (z < -.2) h = .03;
	return Math.max(.02, h);
}
function Model() {
	const rain = useLabControls((s) => s.params.rain ?? .15);
	const q = useQuality();
	const soil = useSoilNormal();
	const nrm = (0, import_react.useMemo)(() => new Vector2(.8, .8), []);
	const drop = rain * .42;
	const shove = rain * .55;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn: cliffH,
			width: 8.2,
			depth: 5.4,
			segX: q.terrain,
			segZ: Math.floor(q.terrain * .55),
			colorFn: (h) => h < .08 ? tint.set(PBR.sand.color) : tint.set("#8a6a48")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				0,
				0,
				-1.55
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterSheet, {
				width: 8.2,
				depth: 2.4,
				y: .03
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				.48 - drop * .55,
				.62 + shove * .35
			],
			rotation: [
				rain * .42,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					1.05,
					1.2,
					.55,
					18,
					1
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#6b5344",
					roughness: .95,
					normalMap: soil,
					normalScale: nrm
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-.08,
					.05
				],
				rotation: [
					.95,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.012,
					.012,
					1.45,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#e24b4b" })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-.2,
				1.55 - drop,
				.2
			],
			text: "Crown",
			tone: "fault",
			note: "The head of the slump drops. Pore pressure is the trigger, not a beach spit."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.2,
				.85 - drop * .5,
				.15
			],
			text: "Shear surface",
			note: "A curved spoon. Rotational slump, not a rock fall."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.4,
				.35,
				1.15 + shove
			],
			text: "Toe",
			tone: "sandstone",
			note: "The toe shoves forward as the crown drops."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.2,
				1.35,
				1.1
			],
			text: "Till · Holderness",
			tone: "moss",
			note: "Glacial till cliffs fail this way. Soft clay, not chalk."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.45,
				0
			],
			children: [
				"Pore pressure ",
				rain.toFixed(2),
				" · ",
				rain > .45 ? "slump rotating" : "cliff holding"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.2,
				2.8,
				7.2
			],
			[
				-1.4,
				1.6,
				4.4
			],
			[
				1.6,
				1.8,
				4.8
			],
			[
				.2,
				2.8,
				7.2
			]
		] })
	] });
}
function MassMovementScene() {
	const rain = useLabControls((s) => s.params.rain ?? .15);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "mass-movement",
		title: "Mass movement",
		camera: {
			position: [
				.2,
				2.8,
				7.2
			],
			fov: 40
		},
		exaggeration: "Vertical exaggeration ×4. One clean spoon-shaped shear. Real cliffs fail in many slices.",
		liveText: `Rotational slump. Pore pressure ${rain.toFixed(2)}. Crown drops, toe shoves.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "mass-movement",
			title: "Mass movement",
			caption: "Till cliff. Rain rotates a slump on a curved shear."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { MassMovementScene as default };
