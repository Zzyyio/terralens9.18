import { i as __toESM } from "../_runtime.mjs";
import { j as RingGeometry, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality } from "./perf-Cy1NcWbY.mjs";
import { s as Starfield } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback } from "./studio-CNvjqO8z.mjs";
import { n as SunMesh } from "./moon-DSIxiLbk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-D6bThSdZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PLANETS = [
	{
		name: "Mercury",
		au: .39,
		visA: 1.15,
		visR: .07,
		trueR: .009,
		color: "#8B9A97",
		p: .24
	},
	{
		name: "Venus",
		au: .72,
		visA: 1.55,
		visR: .11,
		trueR: .022,
		color: "#E8B86D",
		p: .62
	},
	{
		name: "Earth",
		au: 1,
		visA: 1.95,
		visR: .12,
		trueR: .023,
		color: "#3EE0C6",
		p: 1
	},
	{
		name: "Mars",
		au: 1.52,
		visA: 2.4,
		visR: .09,
		trueR: .012,
		color: "#FF6A3D",
		p: 1.88
	},
	{
		name: "Jupiter",
		au: 5.2,
		visA: 3.25,
		visR: .3,
		trueR: .26,
		color: "#C4A574",
		p: 11.9
	},
	{
		name: "Saturn",
		au: 9.58,
		visA: 4.15,
		visR: .26,
		trueR: .22,
		color: "#E8B86D",
		p: 29.5
	},
	{
		name: "Uranus",
		au: 19.2,
		visA: 4.95,
		visR: .17,
		trueR: .1,
		color: "#7FD4FF",
		p: 84
	},
	{
		name: "Neptune",
		au: 30.1,
		visA: 5.7,
		visR: .16,
		trueR: .097,
		color: "#3a6aa0",
		p: 165
	}
];
function Model() {
	useLabTick(1 / 18);
	const t = useLabControls((s) => s.t);
	const trueScale = (useLabControls((s) => s.params.trueScale) ?? 0) > .5;
	const q = useQuality();
	const segs = Math.max(24, Math.floor(q.sphere / 2));
	const rings = (0, import_react.useMemo)(() => PLANETS.map((p) => {
		const a = trueScale ? p.au * .42 : p.visA;
		return new RingGeometry(a - .012, a + .012, 96);
	}), [trueScale]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunMesh, { radius: trueScale ? .2 : .38 }),
		PLANETS.map((p, i) => {
			const a = trueScale ? p.au * .42 : p.visA;
			const r = trueScale ? Math.max(.012, p.trueR * .9) : p.visR;
			const ang = t * 2 * Math.PI / p.p;
			const x = Math.cos(ang) * a;
			const z = Math.sin(ang) * a;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					geometry: rings[i],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						color: "#8B9A97",
						transparent: true,
						opacity: .32,
						side: 2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						x,
						0,
						z
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						r,
						segs,
						segs
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: p.color,
						roughness: .55,
						metalness: .08
					})]
				}),
				p.name === "Saturn" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						x,
						0,
						z
					],
					rotation: [
						Math.PI / 2.35,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
						r * 1.35,
						r * 2.15,
						48
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						color: "#E8B86D",
						transparent: true,
						opacity: .7,
						side: 2
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: [
						x,
						r + .22,
						z
					],
					text: p.name
				})
			] }, p.name);
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				trueScale ? 2.4 : 1.6,
				0
			],
			children: trueScale ? "True distance (compressed AU). Planets are dust. Classroom models always lie here." : "Visible mode. Sizes and orbits are two different lies. Toggle True distance."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				4.6,
				8.4
			],
			[
				0,
				2.2,
				6.2
			],
			[
				0,
				6.5,
				12
			],
			[
				0,
				4.6,
				8.4
			]
		] })
	] });
}
function SolarSystemScene() {
	const trueScale = (useLabControls((s) => s.params.trueScale) ?? 0) > .5;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "solar-system",
		title: "Solar system",
		camera: {
			position: [
				0,
				4.6,
				8.4
			],
			fov: 42
		},
		lights: false,
		liveText: trueScale ? "True-distance mode. If orbits are honest, planets shrink to dust." : "Visible classroom model. Size and distance cannot both be true.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "solar-system",
			title: "Solar system",
			caption: "Eight planets. Visible mode vs true distance. The kit always lies somewhere."
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
				intensity: .12,
				color: "#c9d4d0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					0,
					0,
					0
				],
				intensity: 2.4,
				color: "#fff4dc",
				distance: 18
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
		]
	});
}
//#endregion
export { SolarSystemScene as default };
