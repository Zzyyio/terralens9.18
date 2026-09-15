import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, L as Vector2, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, o as useSoilNormal, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry, t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-CS-ZATUF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tint = new Color();
function erosionH(x, z, lip) {
	const up = .5 * (1 + Math.tanh((lip - x) * 5.8));
	const bed = .16 + 1.42 * up;
	const vW = MathUtils.lerp(.2, 1.25, MathUtils.smoothstep(lip - .2, lip + 2.6, x));
	const cut = (.2 + .58 * up) * Math.exp(-(z * z) / (vW * vW * .5));
	const gorge = Math.exp(-((x - (lip + .85)) ** 2) / .7) * (1 - up);
	const hills = .1 * (1 - Math.min(1, Math.abs(x) / 6)) * Math.cos(z * 2.4);
	const pothole = .06 * Math.exp(-((x - (lip + 1.6)) ** 2) / .08) * Math.exp(-(z * z) / .04);
	return Math.max(.02, bed - cut - .18 * gorge * Math.exp(-(z * z) / .32) + Math.abs(hills) - pothole);
}
function elevColor(h) {
	if (h < .22) return tint.set(PBR.soil.color);
	if (h < .55) return tint.set(PBR.crust.color);
	if (h < 1.05) return tint.set(PBR.rock.color);
	return tint.set(PBR.granite.color);
}
function WaterMat() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
		color: PBR.water.color,
		roughness: PBR.water.roughness,
		metalness: PBR.water.metalness
	});
}
function Model() {
	useLabTick(1 / 14);
	const t = useLabControls((s) => s.t);
	const q = useQuality();
	const rock = useRockNormal();
	const soil = useSoilNormal();
	const nrm = (0, import_react.useMemo)(() => new Vector2(.5, .5), []);
	const lip = 1.9 - t * 4.6;
	const fn = (0, import_react.useMemo)(() => (x, y) => erosionH(x, y, lip), [lip]);
	const water = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let i = 0; i <= 88; i++) {
			const x = -5.5 + i / 88 * 11;
			pts.push([
				x,
				erosionH(x, 0, lip) + .03,
				0
			]);
		}
		return tubeGeometry(pts, .038, 88, 8);
	}, [lip]);
	const fall = (0, import_react.useMemo)(() => {
		const y0 = erosionH(lip - .05, 0, lip) + .02;
		const y1 = erosionH(lip + .22, 0, lip) + .02;
		return tubeGeometry([
			[
				lip - .08,
				y0,
				0
			],
			[
				lip,
				(y0 + y1) * .5,
				0
			],
			[
				lip + .22,
				y1,
				0
			]
		], .032, 16, 8);
	}, [lip]);
	const segs = q.terrain;
	const lipY = erosionH(lip, 0, lip);
	const poolY = erosionH(lip + .35, 0, lip);
	const knickY = lipY + .55;
	const drop = Math.max(.2, erosionH(lip - .15, 0, lip) - erosionH(lip + .15, 0, lip));
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
			fn,
			width: 11.4,
			depth: 4.6,
			segX: segs,
			segZ: Math.floor(segs * .45),
			colorFn: elevColor
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: water,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterMat, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: fall,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterMat, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				lip,
				lipY * .45,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.08,
				drop,
				.55
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.rock.color,
				roughness: .88,
				normalMap: rock,
				normalScale: nrm
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				lip + .38,
				poolY + .02,
				0
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.22, 20] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.water.color,
				roughness: .08,
				metalness: .1,
				transparent: true,
				opacity: .7
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				lip + 1.6,
				erosionH(lip + 1.6, 0, lip) + .04,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.07,
				12,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.granite.color,
				roughness: .7,
				metalness: .06
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				lip,
				knickY,
				.55
			],
			text: "Knickpoint · fall lip",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-3.6,
				1.85,
				.15
			],
			text: "Incision · V-valley"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				lip + .9,
				.95,
				.45
			],
			text: "Gorge",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.6,
				.72,
				1.05
			],
			text: "Lateral erosion",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.85,
				0
			],
			children: [
				"Lip x=",
				lip.toFixed(2),
				" · play retreats the fall upstream · gorge is the scar · ×12"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.2,
				4.6,
				8.2
			],
			[
				-3.4,
				3.2,
				5.4
			],
			[
				lip,
				2.6,
				5.8
			],
			[
				2.8,
				2.4,
				5.6
			]
		] })
	] });
}
function RiverErosionScene() {
	const t = useLabControls((s) => s.t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "river-erosion",
		title: "River erosion",
		camera: {
			position: [
				.2,
				4.6,
				8.2
			],
			fov: 40
		},
		exaggeration: "Vertical exaggeration ×12 on the long profile",
		liveText: `Knickpoint retreating upstream. t=${t.toFixed(2)}. V-valley incision, then lateral widening.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "river-erosion",
			title: "River erosion",
			caption: "Long-profile height field: waterfall knickpoint walks upstream, V-valley then lateral erosion."
		}),
		minDistance: 3.2,
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
export { RiverErosionScene as default };
