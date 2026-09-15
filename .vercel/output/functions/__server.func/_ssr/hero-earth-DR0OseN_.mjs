import { i as __toESM } from "../_runtime.mjs";
import { R as Vector3, c as useFrame, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as usePrefersReducedMotion, s as useIsCompact } from "./perf-Cy1NcWbY.mjs";
import { n as useWebGL, t as ClientCanvas } from "./client-canvas-BQ6Rhz4H.mjs";
import { a as EarthMesh, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hero-earth-DR0OseN_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RotatingEarth({ paused, freeze }) {
	const g = (0, import_react.useRef)(null);
	const sun = (0, import_react.useMemo)(() => new Vector3(6, .5, 2.2), []);
	useFrame((_, raw) => {
		if (!g.current || freeze || paused) return;
		const d = Math.min(raw, .1);
		g.current.rotation.y += d * (Math.PI * 2 / 90);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: g,
		rotation: [
			0,
			.6,
			.35
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, {
			sunDirection: sun,
			clouds: true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {})]
	});
}
function HeroEarth() {
	const reduced = usePrefersReducedMotion();
	const compact = useIsCompact();
	const webgl = useWebGL();
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [want3d, setWant3d] = (0, import_react.useState)(!compact);
	if (!webgl || compact && !want3d) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 bg-void",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/textures/earth-day.jpg",
				alt: "",
				className: "size-full object-cover opacity-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent" }),
			compact && webgl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setWant3d(true),
				className: "absolute bottom-6 left-5 z-10 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm text-chalk backdrop-blur-xl md:left-1/2 md:-translate-x-1/2",
				children: "Play 3D globe"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0",
		onPointerEnter: () => setPaused(true),
		onPointerLeave: () => setPaused(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ClientCanvas, {
			camera: {
				position: [
					0,
					.2,
					3.15
				],
				fov: 38
			},
			frameloop: "always",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .18 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
					position: [
						6,
						.5,
						2.2
					],
					intensity: 2.1,
					color: "#fff4e0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotatingEarth, {
					paused,
					freeze: reduced
				})
			]
		})
	});
}
//#endregion
export { HeroEarth as t };
