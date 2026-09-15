import { M as SRGBColorSpace, r as useTexture, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { i as useQuality } from "./perf-Cy1NcWbY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/moon-DSIxiLbk.js
var import_jsx_runtime = require_jsx_runtime();
function MoonMesh({ radius = .27 }) {
	const map = useTexture("/textures/moon.jpg");
	map.colorSpace = SRGBColorSpace;
	map.anisotropy = 8;
	const q = useQuality();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
		radius,
		q.sphere,
		q.sphere
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
		map,
		bumpMap: map,
		bumpScale: .012,
		roughness: .92,
		metalness: .02,
		color: "#e8e2d6"
	})] });
}
function SunMesh({ radius = .28 }) {
	const q = useQuality();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
		radius,
		Math.max(32, q.sphere / 2),
		Math.max(32, q.sphere / 2)
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#E8B86D" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
		radius * 1.55,
		32,
		32
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
		color: "#E8B86D",
		transparent: true,
		opacity: .16,
		depthWrite: false
	})] })] });
}
//#endregion
export { SunMesh as n, MoonMesh as t };
