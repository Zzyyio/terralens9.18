import { i as __toESM } from "../_runtime.mjs";
import { R as Vector3, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as CurveFlow } from "./particles-DYsHC89-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-BBU0Qqil.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Store({ pos, size, color, box, roughness = .7, metalness = .04, normalMap }) {
	const q = useQuality();
	const segs = Math.max(16, Math.floor(q.sphere / 2));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: pos,
		castShadow: true,
		children: [box ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dodecahedronGeometry", { args: [size * .72, 0] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			size * .62,
			segs,
			segs
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness,
			metalness,
			normalMap
		})]
	});
}
function Model() {
	useLabTick(1 / 10);
	const t = useLabControls((s) => s.t);
	const tap = useLabControls((s) => s.params.fossil ?? t);
	const q = useQuality();
	const rock = useRockNormal();
	const atmo = .72 + tap * .38;
	const fossil = Math.max(.28, .55 - tap * .22);
	const thick = .07 + tap * .06;
	const tapPath = (0, import_react.useMemo)(() => [
		new Vector3(.12, .38, -.2),
		new Vector3(.06, 1.05, -.05),
		new Vector3(0, 1.72, 0)
	], []);
	const fastPath = (0, import_react.useMemo)(() => [
		new Vector3(-1.85, .9, .22),
		new Vector3(-.9, 1.4, .1),
		new Vector3(0, 1.72, 0)
	], []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-.02,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [7, q.lathe] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#121814",
				roughness: .96,
				normalMap: rock
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.85,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				atmo * .72 + .18,
				Math.floor(q.sphere / 2),
				Math.floor(q.sphere / 3)
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#7FD4FF",
				transparent: true,
				opacity: .08,
				roughness: .2,
				side: 2,
				depthWrite: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
			pos: [
				0,
				1.85,
				0
			],
			size: atmo,
			color: "#7FD4FF",
			roughness: .22,
			metalness: .04
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
			pos: [
				-1.85,
				.55,
				.25
			],
			size: .7,
			color: PBR.crust.color,
			roughness: PBR.crust.roughness
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
			pos: [
				1.95,
				.42,
				.2
			],
			size: 1.05,
			color: PBR.water.color,
			roughness: PBR.water.roughness,
			metalness: PBR.water.metalness
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
			pos: [
				.1,
				-.42,
				-.35
			],
			size: 1.55,
			color: PBR.rock.color,
			box: true,
			roughness: PBR.rock.roughness,
			metalness: PBR.rock.metalness,
			normalMap: rock
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
			pos: [
				-1.55,
				-.28,
				.7
			],
			size: fossil,
			color: PBR.basalt.color,
			box: true,
			roughness: .9,
			metalness: .08
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				-1.85,
				1.05,
				.2
			],
			to: [
				-.45,
				1.55,
				.05
			],
			color: "#7C9A6A",
			radius: .018
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				-.4,
				1.62,
				.08
			],
			to: [
				-1.7,
				1.12,
				.22
			],
			color: "#8B9A97",
			radius: .016
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				.55,
				1.55,
				.08
			],
			to: [
				1.55,
				.95,
				.15
			],
			color: "#3EE0C6",
			radius: .02
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				1.5,
				1.02,
				.12
			],
			to: [
				.5,
				1.58,
				.06
			],
			color: "#7FD4FF",
			radius: .018
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				-1.55,
				.15,
				.35
			],
			to: [
				-.35,
				-.05,
				-.15
			],
			color: "#8B9A97",
			radius: .014
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				.15,
				.35,
				-.2
			],
			to: [
				.05,
				1.35,
				0
			],
			color: "#FF6A3D",
			radius: thick
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: tapPath,
			color: "#FF6A3D",
			count: Math.round(5 + tap * 10),
			radius: .035
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: fastPath,
			color: "#7C9A6A",
			count: 6,
			radius: .022
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				2.45,
				0
			],
			text: "atmosphere",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-1.85,
				1.15,
				.25
			],
			text: "biosphere",
			tone: "moss"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.95,
				1.15,
				.2
			],
			text: "ocean",
			tone: "glacier"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.1,
				.55,
				-.35
			],
			text: "sediment / rock · slow, huge",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-1.55,
				.22,
				.7
			],
			text: "fossil fuel · slow"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-1.15,
				1.45,
				.15
			],
			text: "fast",
			tone: "moss"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.85,
				.15,
				-.55
			],
			text: "slow",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.55,
				1.05,
				.15
			],
			text: "anthropogenic",
			tone: "magma"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				3.05,
				0
			],
			children: [
				"Fossil tap ",
				Math.round(tap * 100),
				"% · thick arrow is humans moving slow rock carbon into the air"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.2,
				2.4,
				7.2
			],
			[
				-2.2,
				1.6,
				5.2
			],
			[
				2.1,
				1.5,
				5.4
			],
			[
				.2,
				2.4,
				7.2
			]
		] })
	] });
}
function CarbonCycleScene() {
	const tap = useLabControls((s) => s.params.fossil ?? .2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "carbon-cycle",
		title: "Carbon cycle",
		camera: {
			position: [
				.2,
				2.4,
				7.2
			],
			fov: 40
		},
		liveText: `Carbon cycle. Fossil-fuel tap ${Math.round(tap * 100)}%. Fast thin arrows; thick anthropogenic flux.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "carbon-cycle",
			title: "Carbon cycle",
			caption: "Stores as volumes. The fossil tap is a thick arrow from slow rock to air."
		}),
		minDistance: 3.2,
		maxDistance: 14,
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
export { CarbonCycleScene as default };
