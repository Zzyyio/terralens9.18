import { i as __toESM } from "../_runtime.mjs";
import { I as TubeGeometry, R as Vector3, g as Color, h as CatmullRomCurve3, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-C7kzAqat.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function landHeight(x, z) {
	const u = (x + 6.4) / 12.8;
	const valleyW = .18 + u * 1.55;
	const valley = .85 * Math.exp(-(z * z) / (valleyW * valleyW * .55));
	const hills = (1 - u) * .55 * Math.sin(x * .7) * Math.sin(z * 1.1);
	const step = u < .28 ? Math.max(0, .35 - Math.abs(u - .18) * 4) : 0;
	const flood = u > .72 ? .12 : 0;
	return (1 - u) * 1.55 + hills - valley + flood + step;
}
function riverPoint(u, cutoff) {
	const x = -6.2 + u * 12.6;
	const z = (u > .34 && u < .78 ? Math.sin(u * 13) * .95 * (1 - cutoff * .85) : 0) + (u > .5 && u < .62 ? Math.sin((u - .5) * 38) * .5 * (1 - cutoff) : 0);
	const y = landHeight(x, z) + .025;
	return new Vector3(x, y, z);
}
function Terrain() {
	const q = useQuality();
	const vScale = useLabControls((s) => s.trueScale) ? 1 / 12 : 1;
	const colorFn = (0, import_react.useMemo)(() => (h) => {
		const c = new Color();
		if (h < .22) c.set("#2d4a38");
		else if (h < .7) c.set("#7C9A6A");
		else if (h < 1.2) c.set("#8a7a48");
		else c.set("#d8d0c0");
		return c;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
		fn: landHeight,
		width: 13.2,
		depth: 6.2,
		segX: q.terrain,
		segZ: Math.floor(q.terrain / 2),
		colorFn,
		vScale
	});
}
function Water() {
	useLabTick(1 / 12);
	const t = useLabControls((s) => s.t);
	const qDischarge = useLabControls((s) => s.params.discharge ?? .7);
	const cutoff = Math.min(1, Math.max(0, (t - .35) * 2.2));
	const pts = (0, import_react.useMemo)(() => {
		const arr = [];
		for (let i = 0; i <= 140; i++) arr.push(riverPoint(i / 140, cutoff));
		return arr;
	}, [cutoff]);
	const width = .028 + qDischarge * .055;
	const curve = (0, import_react.useMemo)(() => new CatmullRomCurve3(pts), [pts]);
	const tube = (0, import_react.useMemo)(() => new TubeGeometry(curve, 140, width, 8, false), [curve, width]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: tube,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				color: PBR.water.color,
				roughness: .08,
				metalness: .05,
				transmission: .22,
				thickness: .35,
				ior: 1.333,
				transparent: true,
				opacity: .88
			})
		}),
		qDischarge > 1.05 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				4.4,
				.16,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [4.4, 2.6] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3EE0C6",
				transparent: true,
				opacity: .22,
				depthWrite: false
			})]
		}),
		cutoff > .75 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				1.15,
				.2,
				.9
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				.44,
				.045,
				10,
				28,
				Math.PI * 1.55
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.water.color,
				roughness: .14
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				6.5,
				.04,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [1.7, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				color: "#14344a",
				roughness: .08,
				metalness: .06,
				transmission: .2,
				thickness: .4,
				transparent: true,
				opacity: .9
			})]
		})
	] });
}
function RiversScene() {
	const q = useLabControls((s) => s.params.discharge ?? .7);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "rivers",
		title: "Rivers from source to mouth",
		camera: {
			position: [
				0,
				4.8,
				8.4
			],
			fov: 40
		},
		exaggeration: "Vertical exaggeration ×12 on the long profile. Water is a thin free surface in a valley, not a fat pipe.",
		liveText: `River discharge ${q.toFixed(2)} times. Upper V-valley to delta.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "rivers",
			title: "Rivers"
		}),
		minDistance: 3,
		maxDistance: 16,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
				attach: "fog",
				args: [
					"#07090C",
					12,
					26
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terrain, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Water, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					-5.2,
					2.35,
					0
				],
				text: "Upper · V-valley",
				note: "Steep, narrow, vertical erosion. A V, not a glacial U."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					-3.5,
					1.7,
					.35
				],
				text: "Waterfall / knickpoint",
				tone: "ice",
				note: "A nick in the long profile. Hard rock holds a step."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					.2,
					1.15,
					1.15
				],
				text: "Meanders",
				note: "Outer bend erodes, inner bend deposits. Play cuts the neck to an oxbow."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					3.5,
					.85,
					0
				],
				text: "Floodplain / levées",
				tone: "moss",
				note: "High discharge spills. Natural levées are the river’s own banks."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					6.2,
					.7,
					0
				],
				text: "Delta",
				tone: "sandstone",
				note: "Load dumped where the river meets standing water. UK ‘deltas’ are often estuaries."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
				pos: [
					0,
					3.3,
					0
				],
				children: [
					"Discharge ",
					q.toFixed(2),
					"× · play cuts the neck → oxbow"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
				[
					0,
					4.8,
					8.4
				],
				[
					-4.2,
					3.2,
					5.5
				],
				[
					1.2,
					2.8,
					6.2
				],
				[
					0,
					4.8,
					8.4
				]
			] })
		]
	});
}
//#endregion
export { RiversScene as default };
