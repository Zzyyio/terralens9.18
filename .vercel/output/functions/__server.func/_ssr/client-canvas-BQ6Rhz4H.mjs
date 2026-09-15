import { i as __toESM } from "../_runtime.mjs";
import { M as SRGBColorSpace, s as Canvas, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-canvas-BQ6Rhz4H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useWebGL() {
	const [ok, setOk] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		try {
			const c = document.createElement("canvas");
			const gl = c.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) || c.getContext("webgl");
			setOk(Boolean(gl));
		} catch {
			setOk(false);
		}
	}, []);
	return ok;
}
function ClientCanvas({ children, className, camera, frameloop, onCreated, gl, dpr, shadows }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const webgl = useWebGL();
	(0, import_react.useEffect)(() => setMounted(true), []);
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: className ?? "absolute inset-0 bg-void",
		"aria-hidden": true
	});
	if (!webgl) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		className: className ?? "absolute inset-0",
		dpr: dpr ?? [1, 1.75],
		camera: camera ?? {
			position: [
				0,
				.35,
				3.4
			],
			fov: 42
		},
		frameloop,
		shadows,
		gl: {
			antialias: true,
			alpha: false,
			powerPreference: "high-performance",
			localClippingEnabled: true,
			...gl
		},
		onCreated: (state) => {
			state.gl.toneMapping = 4;
			state.gl.toneMappingExposure = 1.12;
			state.gl.outputColorSpace = SRGBColorSpace;
			state.gl.localClippingEnabled = true;
			onCreated?.(state);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#07090C"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children
		})]
	});
}
//#endregion
export { useWebGL as n, ClientCanvas as t };
