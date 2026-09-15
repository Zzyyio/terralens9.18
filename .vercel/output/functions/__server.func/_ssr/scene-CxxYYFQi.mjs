import { i as __toESM } from "../_runtime.mjs";
import { N as Shape, _ as ExtrudeGeometry, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-CxxYYFQi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useWedge(run, height, width, lip) {
	return (0, import_react.useMemo)(() => {
		const s = new Shape();
		s.moveTo(0, 0);
		s.lineTo(run, 0);
		s.lineTo(lip, height);
		s.closePath();
		const g = new ExtrudeGeometry(s, {
			depth: width,
			bevelEnabled: false,
			steps: 1
		});
		g.translate(0, 0, -width / 2);
		g.computeVertexNormals();
		return g;
	}, [
		run,
		height,
		width,
		lip
	]);
}
function RainBand({ pts, color, radius }) {
	const q = useQuality();
	const geom = (0, import_react.useMemo)(() => tubeGeometry(pts, radius, Math.max(24, q.sphere / 3), 10), [
		pts,
		radius,
		q.sphere
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geom,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			transparent: true,
			opacity: .4,
			roughness: .85,
			depthWrite: false
		})
	});
}
var RAIN_COLD = Array.from({ length: 15 }, (_, i) => [
	1.92,
	.95,
	-1.45 + i / 14 * 2.9
]);
var RAIN_WARM = Array.from({ length: 15 }, (_, i) => [
	-3.65,
	.52,
	-1.45 + i / 14 * 2.9
]);
function Fronts() {
	useLabTick(1 / 14);
	const t = useLabControls((s) => s.t);
	const q = useQuality();
	const occ = t > .62;
	const coldX = -3.15 + t * 2.7;
	const warmX = 4.35 - t * 1.45;
	const lift = occ ? .38 + (t - .62) * .75 : 0;
	const coldGeom = useWedge(2.05, 1.18, 3.1, .38);
	const warmGeom = useWedge(3.4, .78, 3.1, 2.45);
	const coldAir = useWedge(3.2, .32, 3.1, 2.7);
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
				.01,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [5.2, Math.max(32, q.sphere / 2)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1C2628",
				roughness: .94,
				metalness: .02
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: coldAir,
			position: [
				warmX - .35,
				.02,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.ice.color,
				transparent: true,
				opacity: .22,
				roughness: PBR.ice.roughness,
				depthWrite: false
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: coldGeom,
			position: [
				coldX,
				.02,
				0
			],
			castShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#4aa0d4",
				roughness: .48,
				metalness: .06,
				transparent: true,
				opacity: .9
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: warmGeom,
			position: [
				warmX,
				.02 + lift,
				0
			],
			rotation: [
				0,
				Math.PI,
				0
			],
			castShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#E24B4B",
				roughness: .52,
				metalness: .05,
				transparent: true,
				opacity: .78
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				coldX,
				0,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RainBand, {
				pts: RAIN_COLD,
				color: "#F4EFE6",
				radius: .16
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				warmX,
				lift,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RainBand, {
				pts: RAIN_WARM,
				color: "#c8d8e4",
				radius: .13
			})
		}),
		occ && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				(coldX + warmX) * .5 - .4,
				1.12 + lift,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.42,
				Math.max(16, q.sphere / 4),
				Math.max(16, q.sphere / 4)
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#E8B86D",
				transparent: true,
				opacity: .55,
				roughness: .6,
				depthWrite: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				coldX + .7,
				1.45,
				1.7
			],
			text: "cold wedge",
			tone: "ice",
			occlude: false,
			note: "Denser cold air undercuts. The slope is the front, not a TV-map line."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				warmX - 1.6,
				1.15 + lift,
				-1.7
			],
			text: "warm overrunning",
			tone: "magma",
			occlude: false,
			note: "Warm air rides up the cold wedge. Rain sits on the slope."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				coldX + 1.9,
				1.28,
				.15
			],
			text: "rain",
			tone: "glacier",
			occlude: false,
			note: "Narrow, heavier band on the cold front. Broader drizzle on the warm."
		}),
		occ && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.2,
				1.9,
				0
			],
			text: "occlusion",
			tone: "sandstone",
			occlude: false,
			note: "The cold wedge has caught the warm. The warm sector lifts off the ground."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.55,
				0
			],
			children: ["Fronts are wedges, not TV-map lines · ", occ ? "cold has caught the warm" : "play to occlude"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.2,
				2.6,
				6.4
			],
			[
				-2.8,
				1.6,
				4.6
			],
			[
				3,
				1.8,
				4.8
			],
			[
				.2,
				2.6,
				6.4
			]
		] })
	] });
}
function FrontsScene() {
	const t = useLabControls((s) => s.t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "fronts",
		title: "Fronts as wedges",
		camera: {
			position: [
				.2,
				2.6,
				6.4
			],
			fov: 40
		},
		liveText: t > .62 ? "Occlusion: the cold wedge has caught the warm ramp. Rain sits on the slopes." : "Cold air undercuts as a steep blue wedge. Warm air overruns on a gentle ramp.",
		exaggeration: "Vertical ×40. A real cold front slope is ~1:50 to 1:100.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "fronts",
			title: "Fronts",
			caption: "A cold front is a dense blue wedge. A warm front is a gentle ramp. Rain lives on the slope."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fronts, {})
	});
}
//#endregion
export { FrontsScene as default };
