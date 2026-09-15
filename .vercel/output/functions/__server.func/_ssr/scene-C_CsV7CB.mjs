import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, o as useSoilNormal, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry, t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-C_CsV7CB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tint = new Color();
function capH(x, z, t) {
	let h = 1.08 + .07 * Math.sin(x * .65) * Math.cos(z * .5);
	h -= .5 * Math.exp(-((z + 1.32) ** 2) / .2);
	const headZ = .62 - t * 2.05;
	const pirateProf = z > headZ ? 1 : Math.exp(-((z - headZ) ** 2) / .16);
	h -= (.38 + t * .42) * Math.exp(-(x * x) / .15) * pirateProf;
	if (t > .52) h -= .22 * (t - .52) * Math.exp(-(x * x) / .18) * Math.exp(-((z + 1.32) ** 2) / .18);
	return Math.max(.04, h);
}
function capColor(h) {
	if (h < .28) return tint.set(PBR.soil.color);
	if (h < .7) return tint.set(PBR.crust.color);
	if (h < 1) return tint.set(PBR.rock.color);
	return tint.set(PBR.granite.color);
}
function samplePath(pts, t, r = .038) {
	const lifted = pts.map(([x, , z]) => [
		x,
		capH(x, z, t) + .03,
		z
	]);
	return tubeGeometry(lifted, r, Math.max(24, lifted.length), 8);
}
function WaterMat({ color = PBR.water.color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
		color,
		roughness: .12,
		metalness: .08
	});
}
function Model() {
	useLabTick(1 / 12);
	const t = useLabControls((s) => s.t);
	const q = useQuality();
	const rock = useRockNormal();
	const soil = useSoilNormal();
	const nrm = (0, import_react.useMemo)(() => new Vector2(.5, .5), []);
	const captured = t > .52;
	const fn = (0, import_react.useMemo)(() => (x, y) => capH(x, y, t), [t]);
	const pirate = (0, import_react.useMemo)(() => {
		const headZ = .62 - t * 2.05;
		const pts = [];
		const z0 = captured ? -1.32 : headZ + .12;
		for (let i = 0; i <= 36; i++) pts.push([
			0,
			0,
			z0 + i / 36 * (2.45 - z0)
		]);
		return samplePath(pts, t, .042);
	}, [t, captured]);
	const highEast = (0, import_react.useMemo)(() => {
		const pts = [];
		const x1 = captured ? 0 : -3.15;
		for (let i = 0; i <= 36; i++) pts.push([
			3.15 - i / 36 * (3.15 - x1),
			0,
			-1.32
		]);
		return samplePath(pts, t, captured ? .04 : .036);
	}, [t, captured]);
	const beheaded = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let i = 0; i <= 24; i++) pts.push([
			-.55 - i / 24 * 2.6,
			0,
			-1.32
		]);
		return samplePath(pts, t, .028);
	}, [t]);
	const colY = capH(-.7, -1.32, t);
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [8.5, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#121814",
				roughness: .96,
				normalMap: soil,
				normalScale: nrm
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn,
			width: 8.4,
			depth: 6.4,
			segX: q.terrain,
			segZ: Math.floor(q.terrain * .7),
			colorFn: capColor
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: pirate,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterMat, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: highEast,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterMat, {})
		}),
		captured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: beheaded,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterMat, { color: "#6a7a78" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				capH(0, -1.32, t) + .02,
				-1.32
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.16, 16] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.rock.color,
				roughness: .88,
				normalMap: rock,
				normalScale: nrm
			})]
		}),
		captured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.7,
				colY + .03,
				-1.32
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				.12,
				.22,
				20
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.sand.color,
				roughness: .92
			})]
		}),
		captured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.05,
				capH(0, -1.32, t) + .55,
				-1.32
			],
			text: "Elbow of capture",
			tone: "magma"
		}),
		captured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-.85,
				colY + .5,
				-1.32
			],
			text: "Wind gap",
			tone: "sandstone"
		}),
		captured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-2.4,
				capH(-2.4, -1.32, t) + .48,
				-1.32
			],
			text: "Beheaded stream"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				capH(0, 1.6, t) + .45,
				1.6
			],
			text: "Pirate · lower level",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.2,
				capH(2.2, -1.32, t) + .45,
				-1.32
			],
			text: "Higher stream",
			tone: "moss"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				2.7,
				0
			],
			children: captured ? "Captured — water turns at the elbow" : "Headward erosion… pirate cutting back"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.2,
				5.2,
				7.4
			],
			[
				.1,
				2.8,
				4.2
			],
			[
				.2,
				2.6,
				2.2
			],
			[
				-2.2,
				2.8,
				4.8
			]
		] })
	] });
}
function RiverCaptureScene() {
	const t = useLabControls((s) => s.t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "river-capture",
		title: "River capture",
		camera: {
			position: [
				.2,
				5.2,
				7.4
			],
			fov: 40
		},
		exaggeration: "Vertical exaggeration ×10 · two valleys, one steal",
		liveText: `River capture ${t > .52 ? "complete" : "in progress"}. Elbow, wind gap, beheaded stream.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "river-capture",
			title: "River capture",
			caption: "Two valleys. The lower pirate cuts back, captures, leaves an elbow, wind gap and beheaded stream."
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
export { RiverCaptureScene as default };
