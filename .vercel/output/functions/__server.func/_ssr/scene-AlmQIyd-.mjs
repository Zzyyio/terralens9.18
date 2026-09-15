import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, o as useSoilNormal } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-AlmQIyd-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tint = new Color();
function Model() {
	const slope = useLabControls((s) => s.params.slope ?? .55);
	const q = useQuality();
	const soil = useSoilNormal();
	const nrm = (0, import_react.useMemo)(() => new Vector2(.7, .7), []);
	const steep = .6 + slope * 1.4;
	const fn = (0, import_react.useMemo)(() => (x, z) => .08 + (x + 3.4) / 6.8 * steep + .04 * Math.sin(z * 2), [steep]);
	const pits = [
		{
			x: -2.4,
			name: "Crest",
			layers: [
				.04,
				.12,
				.1
			],
			wet: false
		},
		{
			x: -.7,
			name: "Shoulder",
			layers: [
				.03,
				.1,
				.12
			],
			wet: false
		},
		{
			x: .9,
			name: "Backslope",
			layers: [
				.02,
				.08,
				.1
			],
			wet: false
		},
		{
			x: 2.5,
			name: "Toe",
			layers: [
				.08,
				.28,
				.22
			],
			wet: true
		}
	];
	const thin = 1.15 - slope * .55;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn,
			width: 7.4,
			depth: 4.2,
			segX: q.terrain,
			segZ: Math.floor(q.terrain * .5),
			colorFn: (h) => h > steep * .7 ? tint.set("#8a7a48") : tint.set("#7C9A6A")
		}),
		pits.map((p) => {
			const ground = .08 + (p.x + 3.4) / 6.8 * steep;
			const scale = p.name === "Crest" || p.name === "Backslope" ? thin : 1.15;
			let y = ground + .02;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					p.x,
					0,
					.9
				],
				children: [p.layers.map((h, i) => {
					const hh = h * scale;
					y += hh / 2;
					const at = y;
					y += hh / 2;
					const color = i === 0 ? "#2c261c" : i === 1 ? p.wet ? "#4a5a48" : "#5c4a36" : "#8a6234";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							at,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.55,
							hh,
							.4
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color,
							roughness: .94,
							normalMap: soil,
							normalScale: nrm
						})]
					}, i);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: [
						0,
						y + .18,
						0
					],
					text: p.name,
					tone: p.wet ? "ice" : "sandstone"
				})]
			}, p.name);
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				steep + 1.35,
				0
			],
			children: [
				"Slope ",
				slope.toFixed(2),
				" · crest exports · toe imports"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				3.2,
				8
			],
			[
				-2.2,
				2.2,
				5
			],
			[
				2.4,
				1.8,
				5
			],
			[
				0,
				3.2,
				8
			]
		] })
	] });
}
function SoilCatenaScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "soil-catena",
		title: "Soil catena",
		camera: {
			position: [
				0,
				3.2,
				8
			],
			fov: 40
		},
		exaggeration: "Four pits, one parent. Real hills have land use and mixed drift.",
		liveText: "One hillside, four soils. Crest thin and dry. Toe thick and wet.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "soil-catena",
			title: "Soil catena",
			caption: "Crest to toe. Water and sediment rewrite the profile."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { SoilCatenaScene as default };
