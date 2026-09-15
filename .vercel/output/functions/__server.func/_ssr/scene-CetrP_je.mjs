import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, o as useSoilNormal, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { r as latheGeometry, t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-CetrP_je.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tint = new Color();
function yardangH(x, z) {
	let h = .05;
	for (let i = -2; i <= 2; i++) {
		const zc = i * .58;
		const ridge = Math.exp(-((z - zc) ** 2) / .032);
		const elongate = Math.exp(-(x * x) / 2.6);
		const taper = .38 + .62 * (.5 + .5 * Math.tanh(-x * 1.15));
		h += .44 * ridge * elongate * taper;
	}
	return h;
}
function barchanH(x, z) {
	const stoss = Math.exp(-((x + .18) ** 2) / .26) * Math.exp(-(z * z) / .4);
	const slip = x > .02 ? Math.max(0, 1 - x * 2.35) : 1;
	const hornL = Math.exp(-((x - .58) ** 2) / .16) * Math.exp(-((z - .6) ** 2) / .065);
	const hornR = Math.exp(-((x - .58) ** 2) / .16) * Math.exp(-((z + .6) ** 2) / .065);
	return .02 + .54 * stoss * Math.max(0, slip) + .2 * (hornL + hornR);
}
function sandColor(h) {
	if (h < .08) return tint.set("#b39262");
	if (h < .28) return tint.set(PBR.sand.color);
	return tint.set("#e0c48a");
}
function SandMat({ nrm, soil }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
		color: PBR.sand.color,
		roughness: PBR.sand.roughness,
		metalness: PBR.sand.metalness,
		normalMap: soil,
		normalScale: nrm
	});
}
function Model() {
	useLabTick(1 / 16);
	const t = useLabControls((s) => s.t);
	const q = useQuality();
	const soil = useSoilNormal();
	const nrm = (0, import_react.useMemo)(() => new Vector2(.85, .85), []);
	const segs = Math.max(48, Math.floor(q.terrain * .55));
	const migrate = t * 1.35;
	const nabkha = (0, import_react.useMemo)(() => latheGeometry([
		[.01, .22],
		[.18, .16],
		[.42, .06],
		[.7, 0]
	], q.lathe), [q.lathe]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 13 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-.015,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [8.5, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SandMat, {
				nrm,
				soil
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn: yardangH,
			width: 4.6,
			depth: 3.6,
			segX: segs,
			segZ: Math.floor(segs * .75),
			colorFn: sandColor,
			position: [
				-2.35,
				0,
				0
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn: barchanH,
			width: 2.5,
			depth: 2.2,
			segX: segs,
			segZ: segs,
			colorFn: sandColor,
			position: [
				1.55 + migrate,
				0,
				.55
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn: barchanH,
			width: 2.2,
			depth: 1.95,
			segX: Math.floor(segs * .85),
			segZ: Math.floor(segs * .85),
			colorFn: sandColor,
			position: [
				2.05 + migrate * .85,
				0,
				-.85
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: nabkha,
			position: [
				.15,
				0,
				1.55
			],
			castShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SandMat, {
				nrm,
				soil
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				-3.4,
				.85,
				0
			],
			to: [
				3.3,
				.85,
				0
			],
			color: "#E8B86D",
			radius: .03
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-2.35,
				1.15,
				-1.15
			],
			text: "Yardang · carved",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.55 + migrate,
				.95,
				.55
			],
			text: "Barchan · built",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.15 + migrate,
				.55,
				1.05
			],
			text: "Horns downwind",
			tone: "moss"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				2.35,
				0
			],
			children: "Wind → · yardangs erode parallel to it · barchans migrate, horns downwind"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.2,
				3.4,
				7.2
			],
			[
				-2.4,
				2.2,
				4.6
			],
			[
				1.8 + migrate,
				2,
				4.4
			],
			[
				.2,
				3.4,
				7.2
			]
		] })
	] });
}
function AeolianScene() {
	const t = useLabControls((s) => s.t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "aeolian",
		title: "Wind landforms",
		camera: {
			position: [
				.2,
				3.4,
				7.2
			],
			fov: 40
		},
		exaggeration: "Vertical exaggeration ×8 · carved yardangs, built barchans",
		liveText: `Aeolian. Wind to +x. Barchans migrating ${t.toFixed(2)}. Horns point downwind.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "aeolian",
			title: "Wind landforms",
			caption: "Yardangs are wind-carved ridges. Barchans are built crescents with horns downwind."
		}),
		minDistance: 2.8,
		maxDistance: 14,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#07090C",
				11,
				24
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})]
	});
}
//#endregion
export { AeolianScene as default };
