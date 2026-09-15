import { i as __toESM } from "../_runtime.mjs";
import { R as Vector3, k as Quaternion, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { s as latLonToVector3 } from "./geo-BTPpCsbm.mjs";
import { a as EarthMesh, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-BKI6UzEq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUN = new Vector3(.55, .42, 4.2);
var BIOMES = [
	{
		name: "A tropical",
		sample: "Amazon",
		note: "Af rainforest · no real winter",
		color: "#2d8a4e",
		lat: -3.1,
		lon: -60,
		tone: "moss"
	},
	{
		name: "B dry",
		sample: "Sahara",
		note: "BWh hot desert · evaporation beats rain",
		color: PBR.sand.color,
		lat: 23.4,
		lon: 12.5,
		tone: "sandstone"
	},
	{
		name: "C temperate",
		sample: "London",
		note: "Cfb · no dry season, warm summer",
		color: "#3EE0C6",
		lat: 51.51,
		lon: -.13,
		tone: "glacier"
	},
	{
		name: "D continental",
		sample: "Great Plains",
		note: "Dfa · hot summer, hard winter",
		color: "#6aa0c8",
		lat: 42,
		lon: -100,
		tone: "ice"
	},
	{
		name: "E polar",
		sample: "Greenland fringe",
		note: "ET tundra · plants as a slow thermometer",
		color: PBR.ice.color,
		lat: 70.5,
		lon: -44,
		tone: "chalk"
	}
];
function Patch({ lat, lon, color, r, active }) {
	const q = useQuality();
	const segs = Math.max(24, Math.round(q.sphere / 3));
	const { pos, quat } = (0, import_react.useMemo)(() => {
		const p = latLonToVector3(lat, lon, 1.02);
		return {
			pos: p,
			quat: new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), p.clone().normalize())
		};
	}, [lat, lon]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: pos,
		quaternion: quat,
		scale: [
			1,
			1,
			.38
		],
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			active ? r * 1.45 : r,
			segs,
			segs
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .48,
			metalness: .05,
			emissive: color,
			emissiveIntensity: active ? .38 : .07
		})]
	});
}
function Tiles() {
	const idx = Math.min(4, Math.max(0, Math.round(useLabControls((s) => s.params.biome ?? 2))));
	const b = BIOMES[idx] ?? BIOMES[2];
	const yaw = (0, import_react.useMemo)(() => {
		const p = latLonToVector3(b.lat, b.lon, 1);
		return Math.atan2(p.x, p.z);
	}, [b.lat, b.lon]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			rotation: [
				0,
				-yaw,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, { sunDirection: SUN }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
				BIOMES.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Patch, {
					lat: m.lat,
					lon: m.lon,
					color: m.color,
					r: .1,
					active: i === idx
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: latLonToVector3(m.lat, m.lon, 1.28).toArray(),
					text: m.name,
					tone: m.tone
				})] }, m.name))
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				1.58,
				0
			],
			children: [
				"Köppen ",
				b.name,
				" · ",
				b.sample,
				" · ",
				b.note
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.15,
				.45,
				3.3
			],
			[
				1.5,
				.9,
				2.5
			],
			[
				.1,
				1.7,
				2.6
			],
			[
				.15,
				.45,
				3.3
			]
		] })
	] });
}
function ClimateTypesScene() {
	const b = BIOMES[Math.min(4, Math.max(0, Math.round(useLabControls((s) => s.params.biome ?? 2))))] ?? BIOMES[2];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "climate-types",
		title: "Climate types",
		camera: {
			position: [
				.15,
				.45,
				3.3
			],
			fov: 40
		},
		liveText: `Köppen ${b.name}. Sample: ${b.sample}. ${b.note}`,
		exaggeration: "Patches are representative sites, not a legal climate map. Mountains punch holes in Köppen.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "climate-types",
			title: "Climate types",
			caption: "A tropical, B dry, C temperate, D continental, E polar. Amazon, Sahara, London, Great Plains, Greenland fringe."
		}),
		minDistance: 1.7,
		maxDistance: 7,
		target: [
			0,
			0,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tiles, {})
	});
}
//#endregion
export { ClimateTypesScene as default };
