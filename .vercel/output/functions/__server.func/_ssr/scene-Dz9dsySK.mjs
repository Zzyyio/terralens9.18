import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { i as useQuality } from "./perf-Cy1NcWbY.mjs";
import { a as EarthMesh, i as CloudLayer, s as Starfield } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-Dz9dsySK.js
var import_jsx_runtime = require_jsx_runtime();
var LAYERS = [
	{
		name: "Troposphere",
		km: 12,
		color: "#7FD4FF",
		note: "0–12 km · weather lives here",
		tone: "ice"
	},
	{
		name: "Stratosphere",
		km: 50,
		color: "#3EE0C6",
		note: "12–50 km · ozone",
		tone: "glacier"
	},
	{
		name: "Mesosphere",
		km: 80,
		color: "#E8B86D",
		note: "50–80 km",
		tone: "sandstone"
	},
	{
		name: "Thermosphere",
		km: 600,
		color: "#FF6A3D",
		note: "80–600 km · aurora",
		tone: "magma"
	}
];
function Shell({ r, color, gap }) {
	const q = useQuality();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			gap,
			0,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			r,
			q.sphere,
			q.sphere
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			transparent: true,
			opacity: .14,
			roughness: .12,
			metalness: .04,
			side: 2,
			depthWrite: false,
			emissive: color,
			emissiveIntensity: .08
		})]
	});
}
function Model() {
	const explode = useLabControls((s) => s.explode);
	const step = useLabControls((s) => s.step);
	const trueScale = useLabControls((s) => s.trueScale);
	const teach = trueScale ? 1 : 42;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, {
			radius: 1,
			clouds: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudLayer, { radius: 1.018 }),
		LAYERS.map((s, i) => {
			const r = 1 + s.km / 6371 * teach;
			const gap = explode * (.18 + i * .22);
			const labelR = r + gap + .02;
			const ang = (i - 1.5) * .32;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
				r,
				color: s.color,
				gap
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					Math.sin(ang) * labelR,
					Math.cos(ang) * labelR * .15,
					labelR * .15
				],
				text: `${s.name} · ${s.note}`,
				tone: s.tone,
				occlude: false,
				note: trueScale ? `${s.name} is ${s.km} km. Earth radius is 6371 km. Weather is a film.` : `${s.name} drawn ×42 so the film can be seen. True thickness is ${s.km} km on a 6371 km radius.`
			})] }, s.name);
		}),
		step >= 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				1.12,
				.2
			],
			text: "Clouds stop at the tropopause",
			tone: "ice",
			occlude: false,
			note: "Weather lives in the troposphere. We do not run out of air at 12 km."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				-1.85,
				0
			],
			children: trueScale ? "True scale. Troposphere is a film you can barely see." : "Thickness ×42. Troposphere is ~12 km; Earth radius is 6371 km."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				.4,
				4.6
			],
			[
				2.4,
				1.2,
				3.6
			],
			[
				0,
				2.8,
				5.2
			],
			[
				0,
				.4,
				4.6
			]
		] })
	] });
}
function AtmosphereLayersScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "atmosphere-layers",
		title: "Atmosphere layers",
		camera: {
			position: [
				0,
				.4,
				4.8
			],
			fov: 40
		},
		exaggeration: "Radial ×42. Troposphere is ~12 km; Earth radius is 6371 km.",
		liveText: "Exploded atmosphere. Weather lives in the troposphere. Thickness is exaggerated so the film can be seen.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "atmosphere-layers",
			title: "Atmosphere layers",
			caption: "Troposphere to thermosphere. Weather is only in the inner film."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { AtmosphereLayersScene as default };
