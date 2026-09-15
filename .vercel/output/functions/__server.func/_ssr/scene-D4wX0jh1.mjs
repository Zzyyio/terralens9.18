import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-D4wX0jh1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tint = new Color();
function Model() {
	const cycles = useLabControls((s) => s.params.cycles ?? .45);
	const q = useQuality();
	const rock = useRockNormal();
	const nrm = (0, import_react.useMemo)(() => new Vector2(.7, .7), []);
	const wedge = .08 + cycles * .45;
	const fn = (0, import_react.useMemo)(() => (x, z) => {
		return .22 + .04 * Math.cos(x * 2.2) * Math.cos(z * 2.2) * cycles;
	}, [cycles]);
	const stones = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let i = 0; i < 18; i++) {
			const a = i / 18 * Math.PI * 2;
			const r = 1.15 + i % 3 * .08;
			pts.push([
				Math.cos(a) * r,
				.28 + cycles * .08,
				Math.sin(a) * r
			]);
		}
		return pts;
	}, [cycles]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn,
			width: 6.4,
			depth: 6.4,
			segX: q.terrain,
			segZ: q.terrain,
			colorFn: () => tint.set("#8a8478")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.05,
				0
			],
			rotation: [
				0,
				.2,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.18,
				wedge,
				2.8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				color: PBR.ice.color,
				roughness: .18,
				transmission: .4,
				thickness: .7,
				transparent: true,
				opacity: .85
			})]
		}),
		stones.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: p,
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dodecahedronGeometry", { args: [.09 + i % 3 * .03, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#5c564c",
				roughness: .92,
				normalMap: rock,
				normalScale: nrm
			})]
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				2.1,
				.18,
				-1.4
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.55,
				16,
				12,
				0,
				Math.PI * 2,
				0,
				Math.PI / 2
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#6a6560",
				roughness: .9
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				.55 + wedge,
				0
			],
			text: "Ice wedge",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.3,
				.7,
				.2
			],
			text: "Patterned ground",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.1,
				.85,
				-1.4
			],
			text: "Nivation hollow"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.15,
				0
			],
			children: [
				"Freeze–thaw ",
				cycles.toFixed(2),
				" · ice is in the ground, and it has thickness"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.4,
				3.4,
				6.8
			],
			[
				-1.2,
				1.6,
				4
			],
			[
				2.2,
				1.8,
				4.4
			],
			[
				.4,
				3.4,
				6.8
			]
		] })
	] });
}
function PeriglacialScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "periglacial",
		title: "Periglacial landforms",
		camera: {
			position: [
				.4,
				3.4,
				6.8
			],
			fov: 40
		},
		exaggeration: "Wedge thickness exaggerated. Real polygons take centuries. Not a U-trough.",
		liveText: "Freeze–thaw. Ice wedges and patterned ground. Cold without a glacier.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "periglacial",
			title: "Periglacial",
			caption: "Ice wedges and polygons. Not a glacier’s U-trough."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { PeriglacialScene as default };
