import { i as __toESM } from "../_runtime.mjs";
import { h as CatmullRomCurve3, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/particles-DYsHC89-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CurveFlow({ pts, color, count = 10, radius = .045 }) {
	const t = useLabControls((s) => s.t);
	const curve = (0, import_react.useMemo)(() => new CatmullRomCurve3(pts), [pts]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: Array.from({ length: count }).map((_, i) => {
		const u = (t + i / count) % 1;
		const p = curve.getPoint(u);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: p,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				radius,
				8,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color })]
		}, i);
	}) });
}
//#endregion
export { CurveFlow as t };
