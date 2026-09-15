import { i as __toESM } from "../_runtime.mjs";
import { R as Vector3, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { s as latLonToVector3 } from "./geo-BTPpCsbm.mjs";
import { a as EarthMesh, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry } from "./terrain-CZC6vZE1.mjs";
import { t as CurveFlow } from "./particles-DYsHC89-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-BHwnNXu1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function loopLatLon(lat, lon, rx, ry, n, r) {
	const pts = [];
	for (let i = 0; i <= n; i++) {
		const a = i / n * Math.PI * 2;
		const v = latLonToVector3(lat + Math.sin(a) * ry, lon + Math.cos(a) * rx, r);
		pts.push([
			v.x,
			v.y,
			v.z
		]);
	}
	return pts;
}
function pathLatLon(coords, r) {
	return coords.map(([lat, lon]) => {
		const v = latLonToVector3(lat, lon, r);
		return [
			v.x,
			v.y,
			v.z
		];
	});
}
function WarmTube({ pts, radius, color }) {
	const geom = (0, import_react.useMemo)(() => tubeGeometry(pts, radius, Math.max(32, pts.length * 2), 10), [pts, radius]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geom,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .28,
			metalness: .12
		})
	});
}
function Currents() {
	useLabTick(1 / 14);
	const r = useQuality().particles > 12 ? .016 : .02;
	const nAtl = (0, import_react.useMemo)(() => loopLatLon(28, -42, 34, 14, 40, 1.038), []);
	const nPac = (0, import_react.useMemo)(() => loopLatLon(26, -165, 42, 16, 44, 1.038), []);
	const sAtl = (0, import_react.useMemo)(() => loopLatLon(-22, -18, 28, 14, 36, 1.036), []);
	const gulf = (0, import_react.useMemo)(() => pathLatLon([
		[24, -80],
		[27, -79],
		[31, -76],
		[35, -72],
		[38, -62],
		[42, -50],
		[48, -38],
		[52, -22],
		[55, -10]
	], 1.044), []);
	const canary = (0, import_react.useMemo)(() => pathLatLon([
		[36, -18],
		[28, -22],
		[20, -24],
		[12, -22]
	], 1.04), []);
	const gulfVec = (0, import_react.useMemo)(() => gulf.map((p) => new Vector3(...p)), [gulf]);
	const nAtlVec = (0, import_react.useMemo)(() => nAtl.map((p) => new Vector3(...p)), [nAtl]);
	const nPacVec = (0, import_react.useMemo)(() => nPac.map((p) => new Vector3(...p)), [nPac]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarmTube, {
			pts: nAtl,
			radius: r,
			color: "#3d7ea6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarmTube, {
			pts: nPac,
			radius: r,
			color: "#2f6f9e"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarmTube, {
			pts: sAtl,
			radius: r * .9,
			color: "#2a628c"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarmTube, {
			pts: gulf,
			radius: r * 1.7,
			color: "#e24b2a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarmTube, {
			pts: canary,
			radius: r * .85,
			color: "#7FD4FF"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: gulfVec,
			color: "#FF6A3D",
			count: 12,
			radius: .02
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: nAtlVec,
			color: "#E8B86D",
			count: 8,
			radius: .015
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: nPacVec,
			color: "#7FD4FF",
			count: 8,
			radius: .015
		})
	] });
}
function OceanCurrentsScene() {
	const sun = (0, import_react.useMemo)(() => new Vector3(3, .45, 2), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "ocean-currents",
		title: "Ocean currents",
		camera: {
			position: [
				.15,
				.55,
				3.35
			],
			fov: 40
		},
		liveText: "Gyres as loops. Gulf Stream is a warm western-boundary ribbon — it helps Britain, it does not magically heat it alone.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "ocean-currents",
			title: "Ocean currents",
			caption: "Gyres as loops. Gulf Stream as a warm ribbon."
		}),
		minDistance: 1.6,
		maxDistance: 8,
		target: [
			0,
			0,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, { sunDirection: sun }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Currents, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: latLonToVector3(38, -62, 1.28).toArray(),
				text: "Gulf Stream",
				tone: "magma",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: latLonToVector3(28, -42, 1.26).toArray(),
				text: "gyre · N Atlantic",
				tone: "glacier",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: latLonToVector3(52, -8, 1.3).toArray(),
				text: "helps — not a magic heater",
				tone: "sandstone",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: latLonToVector3(26, -165, 1.26).toArray(),
				text: "gyre · N Pacific",
				tone: "ice",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
				pos: [
					0,
					1.58,
					0
				],
				children: "Colour is temperature · the Gulf Stream helps the UK but does not magically heat Britain alone"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
				[
					.15,
					.55,
					3.35
				],
				[
					1.55,
					.82,
					2.4
				],
				[
					-.4,
					1.35,
					2.55
				],
				[
					.15,
					.55,
					3.35
				]
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.01,
					8,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.water.color,
					roughness: PBR.water.roughness
				})]
			})
		]
	});
}
//#endregion
export { OceanCurrentsScene as default };
