import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, f as WaterSheet, i as IceVolume, l as StepCamera, n as CrustalRaft, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-rLKlBVlj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Model() {
	const ice = useLabControls((s) => s.params.ice ?? .55);
	const trueScale = useLabControls((s) => s.trueScale);
	const rock = useRockNormal();
	const nrm = (0, import_react.useMemo)(() => new Vector2(.5, .5), []);
	const sink = trueScale ? ice * .12 : ice * .55;
	const iceH = trueScale ? ice * .18 : ice * .9;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 10 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-.28,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				3.15,
				3.25,
				1.15,
				48,
				1
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.mantle.color,
				roughness: .93,
				metalness: .06,
				normalMap: rock,
				normalScale: nrm
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrustalRaft, {
			size: [
				3.4,
				.62,
				1.6
			],
			position: [
				0,
				.42 - sink,
				0
			]
		}),
		ice > .04 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IceVolume, {
			size: [
				2.15,
				Math.max(.08, iceH),
				1.55
			],
			position: [
				0,
				.74 - sink + iceH * .5,
				0
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterSheet, {
			width: 6.4,
			depth: 6.4,
			y: .55,
			opacity: .55
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				1.15 - sink + iceH,
				0
			],
			text: ice > .2 ? "Ice load" : "Unloaded",
			tone: "ice",
			note: "Ice is a load. Load down, unload up. Real rebound is millimetres a year."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				.5 - sink,
				1.4
			],
			text: "Crustal raft",
			tone: "moss",
			note: "Continental crust floats on solid mantle that creeps. Not a magma ocean."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				-.15,
				1.7
			],
			text: "Mantle · solid, creeps",
			tone: "sandstone",
			note: "Solid rock. Isostasy is a slow viscous balance, not a flood myth."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.35,
				0
			],
			children: [
				"Ice load ",
				ice.toFixed(2),
				" · ",
				ice > .5 ? "depressed" : "rebounds",
				" · millimetres a year in life"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				2.6,
				1.8,
				5.4
			],
			[
				.2,
				1.2,
				4.2
			],
			[
				2.4,
				.4,
				4
			],
			[
				2.6,
				1.8,
				5.4
			]
		] })
	] });
}
function IsostasyScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "isostasy",
		title: "Isostasy",
		camera: {
			position: [
				2.6,
				1.8,
				5.4
			],
			fov: 40
		},
		exaggeration: "Teaching sink. True scale is millimetres a year. Mantle is solid rock that creeps.",
		liveText: "Crust floats. Ice is a load. Load down, unload up. Scotland and Hudson Bay.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "isostasy",
			title: "Isostasy",
			caption: "Ice load sinks the crust. Unload, it rebounds."
		}),
		target: [
			0,
			.4,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { IsostasyScene as default };
