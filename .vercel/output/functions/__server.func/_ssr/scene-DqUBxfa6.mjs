import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, o as useSoilNormal, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-DqUBxfa6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tint = new Color();
function mountainFn(x, y) {
	const r = Math.hypot(x, y);
	const peak = 1.78 * Math.exp(-(r * r) / .2);
	const spur = .42 * Math.exp(-((x - .42) ** 2 + (y + .22) ** 2) / .12);
	const arête = .36 * Math.exp(-(y * y) / .045) * Math.exp(-(x * x) / .85);
	return Math.max(.02, peak + spur + arête);
}
function hillFn(x, y) {
	const r = Math.hypot(x * .92, y * 1.05);
	return .07 + .58 * Math.exp(-(r * r) / .78);
}
function plateauFn(x, y) {
	const r = Math.hypot(x * 1.02, y * .96);
	const table = .5 * (1 + Math.tanh((.95 - r) * 11));
	const cap = .04 * Math.exp(-(r * r) / .55);
	return .05 + .9 * table + cap;
}
function plainFn(x, y) {
	return .05 + .045 * Math.sin(x * 1.35) * Math.sin(y * 1.05) + .02 * Math.sin(x * 2.8 + y * .7);
}
function mountainColor(h) {
	if (h < .35) return tint.set(PBR.crust.color);
	if (h < .95) return tint.set(PBR.rock.color);
	return tint.set(PBR.granite.color);
}
function hillColor(h) {
	if (h < .25) return tint.set(PBR.soil.color);
	return tint.set(PBR.crust.color);
}
function plateauColor(h) {
	if (h < .25) return tint.set(PBR.soil.color);
	if (h < .7) return tint.set(PBR.sand.color);
	return tint.set(PBR.limestone.color);
}
function plainColor(h) {
	return h < .08 ? tint.set(PBR.soil.color) : tint.set(PBR.crust.color);
}
function Patch({ fn, colorFn, position, segs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
		fn,
		width: 2.65,
		depth: 2.65,
		segX: segs,
		segZ: segs,
		colorFn,
		position
	});
}
function FootRing({ x, rock, nrm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			x,
			.015,
			0
		],
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
			1.28,
			1.36,
			40
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: PBR.rock.color,
			roughness: .9,
			normalMap: rock,
			normalScale: nrm
		})]
	});
}
function Model() {
	const q = useQuality();
	const rock = useRockNormal();
	const soil = useSoilNormal();
	const segs = Math.max(48, Math.floor(q.terrain * .42));
	const nrm = (0, import_react.useMemo)(() => new Vector2(.55, .55), []);
	const xs = [
		-4.7,
		-1.55,
		1.55,
		4.7
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 14 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-.01,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [9.5, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#121814",
				roughness: .96,
				metalness: .02,
				normalMap: soil,
				normalScale: nrm
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Patch, {
			fn: mountainFn,
			colorFn: mountainColor,
			position: [
				xs[0],
				0,
				0
			],
			segs
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Patch, {
			fn: hillFn,
			colorFn: hillColor,
			position: [
				xs[1],
				0,
				0
			],
			segs
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Patch, {
			fn: plateauFn,
			colorFn: plateauColor,
			position: [
				xs[2],
				0,
				0
			],
			segs
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Patch, {
			fn: plainFn,
			colorFn: plainColor,
			position: [
				xs[3],
				0,
				0
			],
			segs
		}),
		xs.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FootRing, {
			x,
			rock,
			nrm
		}, x)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.04,
				1.85
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				9.5,
				.02,
				.06
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3EE0C6",
				roughness: .4
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				xs[0],
				2.15,
				0
			],
			text: "Mountain · steep relief"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				xs[1],
				1.05,
				0
			],
			text: "Hill · rounded",
			tone: "moss"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				xs[2],
				1.35,
				0
			],
			text: "Plateau · flat top",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				xs[3],
				.55,
				0
			],
			text: "Plain · gentle",
			tone: "moss"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				.35,
				2.05
			],
			text: "Same scale bar",
			tone: "glacier"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				2.7,
				0
			],
			children: "Same scale, same ×8 exaggeration · height, slope, table, open"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				xs[0],
				2.9,
				5.4
			],
			[
				xs[1],
				2.2,
				4.8
			],
			[
				xs[2],
				2.5,
				4.9
			],
			[
				xs[3],
				1.8,
				4.6
			]
		] })
	] });
}
function LandformTypesScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "landform-types",
		title: "Landform types",
		camera: {
			position: [
				0,
				3.4,
				9.2
			],
			fov: 40
		},
		exaggeration: "Vertical exaggeration ×8 · four landforms, one scale",
		liveText: "Mountain, hill, plateau, plain at the same vertical exaggeration ×8.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "landform-types",
			title: "Landform types",
			caption: "Four height fields: steep mountain, rounded hill, flat-top plateau, gentle plain."
		}),
		minDistance: 3,
		maxDistance: 16,
		target: [
			0,
			.4,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#07090C",
				14,
				28
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})]
	});
}
//#endregion
export { LandformTypesScene as default };
