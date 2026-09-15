import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, L as Vector2, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, o as useSoilNormal, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry, t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-b_rzZqfz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tint = new Color();
function channelZ(x) {
	return 1.08 * Math.sin((x + 4.3) / 8.6 * Math.PI);
}
function depH(x, z) {
	const cz = channelZ(x);
	const d = z - cz;
	const ad = Math.abs(d);
	const inner = d * cz < 0;
	let h = .27;
	const dChan = z - (cz + Math.sign(cz || 1) * .09);
	h -= .17 * Math.exp(-(dChan * dChan) / .075);
	if (inner && ad > .2 && ad < 1.2) h += .1 * Math.exp(-((ad - .48) ** 2) / .09);
	if (!inner && ad > .22 && ad < .5) h += .035;
	h += .12 * Math.exp(-((ad - .52) ** 2) / .016);
	if (x > 2.55) {
		const u = (x - 2.55) / 2.1;
		const fade = Math.max(0, 1 - u);
		h += .11 * fade * Math.exp(-((z + .72 * (.55 + u)) ** 2) / .11);
		h += .11 * fade * Math.exp(-(z * z) / .1);
		h += .11 * fade * Math.exp(-((z - .72 * (.55 + u)) ** 2) / .11);
		if (x > 3.85) h = Math.min(h, .045);
	}
	return Math.max(.02, h);
}
function depColor(h) {
	if (h < .12) return tint.set(PBR.water.color);
	if (h < .22) return tint.set(PBR.sand.color);
	if (h < .32) return tint.set(PBR.crust.color);
	return tint.set(PBR.soil.color);
}
function Model() {
	useLabTick(1 / 12);
	const t = useLabControls((s) => s.t);
	const discharge = useLabControls((s) => s.params.discharge ?? t);
	const q = useQuality();
	const rock = useRockNormal();
	const soil = useSoilNormal();
	const nrm = (0, import_react.useMemo)(() => new Vector2(.45, .45), []);
	const qVal = MathUtils.clamp(discharge, 0, 1);
	const floodY = .155 + qVal * .2;
	const overbank = floodY > .27;
	const water = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let i = 0; i <= 90; i++) {
			const x = -4.4 + i / 90 * 8.6;
			const z = channelZ(x);
			pts.push([
				x,
				depH(x, z) + .028,
				z
			]);
		}
		return tubeGeometry(pts, .04, 90, 8);
	}, []);
	const segs = q.terrain;
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
				-.015,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [9, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#121814",
				roughness: .96,
				normalMap: soil,
				normalScale: nrm
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn: depH,
			width: 9.6,
			depth: 5.2,
			segX: segs,
			segZ: Math.floor(segs * .55),
			colorFn: depColor
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: water,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.water.color,
				roughness: PBR.water.roughness,
				metalness: PBR.water.metalness
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				.2,
				floodY,
				.15
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [8.8, 3.6] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.water.color,
				roughness: .08,
				metalness: .1,
				transparent: true,
				opacity: .22 + qVal * .28
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				4.15,
				.02,
				0
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [1.35, 28] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.water.color,
				roughness: .14,
				metalness: .08
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.01,
				0
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				4.9,
				5.15,
				40
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.rock.color,
				roughness: .9,
				normalMap: rock,
				normalScale: nrm
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-.15,
				.72,
				.15
			],
			text: "Point bar",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.55,
				.95,
				1.85
			],
			text: "Cut bank",
			tone: "fault"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.35,
				.78,
				1.35
			],
			text: "Levée",
			tone: "moss"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.4,
				.62,
				-1.35
			],
			text: "Floodplain",
			tone: "moss"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				3.55,
				.55,
				.15
			],
			text: "Delta · finger lobes",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.55,
				0
			],
			children: [
				"Discharge ",
				qVal.toFixed(2),
				" · flood ",
				floodY.toFixed(2),
				" · ",
				overbank ? "overbank" : "in-channel"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.3,
				4.4,
				7.6
			],
			[
				-1.2,
				2.4,
				4.6
			],
			[
				1.2,
				2.2,
				5
			],
			[
				3.6,
				2.4,
				5.4
			]
		] })
	] });
}
function RiverDepositionScene() {
	const t = useLabControls((s) => s.t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "river-deposition",
		title: "River deposition",
		camera: {
			position: [
				.3,
				4.4,
				7.6
			],
			fov: 40
		},
		exaggeration: "Vertical exaggeration ×8 · meander, levée, delta",
		liveText: `Meander deposition. Flood stage ${t.toFixed(2)}. Point bar, levée, floodplain, delta.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "river-deposition",
			title: "River deposition",
			caption: "Meander height field: point bar, cut bank, levées, floodplain, delta fingers. Play floods the plain."
		}),
		minDistance: 3,
		maxDistance: 16,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#07090C",
				12,
				26
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})]
	});
}
//#endregion
export { RiverDepositionScene as default };
