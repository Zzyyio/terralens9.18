import { i as __toESM } from "../_runtime.mjs";
import { O as PlaneGeometry, f as BufferAttribute, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-BRBFJkpR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ridgeFn(x, y) {
	const axial = Math.exp(-(x * x) / .12) * .55;
	const flanks = .18 * Math.exp(-((Math.abs(x) - 1.6) ** 2) / 2.8);
	const transform = .04 * Math.sin(y * 1.6) * Math.exp(-(x * x) / .8);
	return .12 + axial + flanks + transform;
}
function Model() {
	useLabTick(1 / 10);
	const t = useLabControls((s) => s.t);
	const q = useQuality();
	const colorFn = (0, import_react.useMemo)(() => {
		return (h, x) => {
			const c = new Color();
			c.set(PBR.basalt.color);
			return c;
		};
	}, []);
	const stripes = (0, import_react.useMemo)(() => {
		const g = new PlaneGeometry(7.2, 4.6, 120, 8);
		const pos = g.attributes.position;
		const col = new Float32Array(pos.count * 3);
		const a = new Color("#1C2628");
		const b = new Color("#3EE0C6");
		for (let i = 0; i < pos.count; i++) {
			const x = pos.getX(i);
			const h = ridgeFn(x, pos.getY(i));
			pos.setZ(i, h + .02);
			(Math.floor((Math.abs(x) + t * .42 % .42) / .42) % 2 ? b : a).toArray(col, i * 3);
		}
		g.setAttribute("color", new BufferAttribute(col, 3));
		g.computeVertexNormals();
		return g;
	}, [t]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn: ridgeFn,
			width: 7.2,
			depth: 4.6,
			segX: q.terrain,
			segZ: Math.floor(q.terrain / 2),
			colorFn
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: stripes,
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.01,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				vertexColors: true,
				roughness: .78,
				metalness: .06,
				transparent: true,
				opacity: .72
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.62,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.05,
				.08,
				.7,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.magma.color,
				emissive: PBR.magma.emissive,
				emissiveIntensity: .55,
				roughness: .4
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				1.15,
				0
			],
			text: "Mid-Atlantic Ridge",
			tone: "magma"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.7,
				.55,
				1.8
			],
			text: "Magnetic stripes",
			tone: "glacier"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.6,
				.4,
				-1.4
			],
			text: "Older crust",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				1.7,
				0
			],
			children: "Play: new crust at the axis, mirror image, age increases away. Like a tape recorder."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				3.6,
				6.2
			],
			[
				0,
				1.8,
				3.4
			],
			[
				2.8,
				2.2,
				4.4
			],
			[
				0,
				3.6,
				6.2
			]
		] })
	] });
}
function SpreadingScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "seafloor-spreading",
		title: "Seafloor spreading",
		camera: {
			position: [
				0,
				3.6,
				6.2
			],
			fov: 42
		},
		exaggeration: "Vertical exaggeration ×12. The ridge is a mountain under the sea.",
		liveText: "Mid-ocean ridge. Magnetic stripes are a mirror. Crust ages away from the axis.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "seafloor-spreading",
			title: "Seafloor spreading",
			caption: "Ridge axis, magnetic stripes, age increasing away. A tape recorder in rock."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { SpreadingScene as default };
