import { i as __toESM } from "../_runtime.mjs";
import { R as Vector3, S as LineSegments, p as BufferGeometry, x as LineBasicMaterial, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality } from "./perf-Cy1NcWbY.mjs";
import { a as fmtLatLon, s as latLonToVector3 } from "./geo-BTPpCsbm.mjs";
import { a as EarthMesh, o as Graticule, r as CityMarker, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3 } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-C_iAlRu-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUN = new Vector3(3.2, .45, 1.6);
function ll(lat, lon, r) {
	const v = latLonToVector3(lat, lon, r);
	return [
		v.x,
		v.y,
		v.z
	];
}
function Trace({ lat0, lon0, lat1, lon1, radius, color, fat = .0055 }) {
	const geom = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let i = 0; i <= 64; i++) {
			const u = i / 64;
			const lat = lat0 + (lat1 - lat0) * u;
			const lon = lon0 + (lon1 - lon0) * u;
			const v = latLonToVector3(lat, lon, radius);
			pts.push([
				v.x,
				v.y,
				v.z
			]);
		}
		return tubeGeometry(pts, fat, 64, 8);
	}, [
		lat0,
		lon0,
		lat1,
		lon1,
		radius,
		fat
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geom,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .38,
			metalness: .12
		})
	});
}
function ParallelRing({ lat, radius, color }) {
	const geom = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let lon = -180; lon <= 180; lon += 4) {
			const v = latLonToVector3(lat, lon, radius);
			pts.push([
				v.x,
				v.y,
				v.z
			]);
		}
		return tubeGeometry(pts, .006, 90, 8);
	}, [lat, radius]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geom,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .36,
			metalness: .1
		})
	});
}
function DenseGrid({ radius }) {
	const q = useQuality();
	const obj = (0, import_react.useMemo)(() => {
		const pts = [];
		const step = q.sphere >= 80 ? 2.5 : 4;
		for (let lat = -80; lat <= 80; lat += 10) for (let lon = -180; lon < 180; lon += step) pts.push(latLonToVector3(lat, lon, radius), latLonToVector3(lat, lon + step, radius));
		for (let lon = -180; lon < 180; lon += 15) for (let lat = -80; lat < 80; lat += step) pts.push(latLonToVector3(lat, lon, radius), latLonToVector3(lat + step, lon, radius));
		const g = new BufferGeometry().setFromPoints(pts);
		return new LineSegments(g, new LineBasicMaterial({
			color: 12965072,
			transparent: true,
			opacity: .45
		}));
	}, [radius, q.sphere]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", { object: obj });
}
function Globe() {
	const lat = useLabControls((s) => s.params.lat ?? 51.5);
	const lon = useLabControls((s) => s.params.lon ?? -.1);
	const hour = lon / 15;
	const marker = ll(lat, lon, 1.18);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, { sunDirection: SUN }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Graticule, { radius: 1.006 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DenseGrid, { radius: 1.012 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParallelRing, {
			lat: 0,
			radius: 1.02,
			color: "#3EE0C6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParallelRing, {
			lat: 23.44,
			radius: 1.018,
			color: "#E8B86D"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParallelRing, {
			lat: 66.56,
			radius: 1.017,
			color: "#7FD4FF"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trace, {
			lat0: -80,
			lon0: 0,
			lat1: 80,
			lon1: 0,
			radius: 1.021,
			color: "#F4EFE6",
			fat: .007
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityMarker, {
			lat,
			lon,
			radius: 1.038,
			color: "#E8B86D"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: ll(0, lon, 1.05),
			to: ll(lat * .92, lon, 1.05),
			color: "#E8B86D",
			radius: .012
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: ll(0, 0, 1.05),
			to: ll(0, Math.max(18, Math.min(40, Math.abs(lon) || 25)), 1.05),
			color: "#3EE0C6",
			radius: .012
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(2, 28, 1.2),
			text: "Equator",
			tone: "glacier",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(10, 0, 1.22),
			text: "Greenwich 0°",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(23.44, 48, 1.2),
			text: "Tropic of Cancer 23.44°N",
			tone: "sandstone",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(66.56, 8, 1.16),
			text: "Arctic Circle 66.56°N",
			tone: "ice",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: marker,
			text: fmtLatLon(lat, lon, 1),
			tone: "sandstone",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				1.58,
				0
			],
			children: [
				"Latitude from the equator · longitude from Greenwich · ",
				fmtLatLon(lat, lon, 2),
				" ·",
				" ",
				hour >= 0 ? "+" : "",
				hour.toFixed(1),
				" h · 15° of longitude = 1 hour"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				.32,
				3.35
			],
			[
				2.55,
				.45,
				2.15
			],
			[
				.4,
				2.35,
				2.6
			],
			[
				marker[0] * 2.1,
				marker[1] * 2.1 + .55,
				marker[2] * 2.1 + 1.2
			]
		] })
	] });
}
function GraticuleScene() {
	const lat = useLabControls((s) => s.params.lat ?? 51.5);
	const lon = useLabControls((s) => s.params.lon ?? -.1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "graticule",
		title: "Graticule and coordinates",
		camera: {
			position: [
				0,
				.32,
				3.35
			],
			fov: 42
		},
		liveText: `Point at ${fmtLatLon(lat, lon, 1)}. Latitude is measured from the equator. Longitude is measured from Greenwich.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "graticule",
			title: "Graticule and coordinates",
			caption: "Latitude is how far from the equator. Longitude is how far from Greenwich. Together they are an address."
		}),
		minDistance: 2,
		maxDistance: 7,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {})
	});
}
//#endregion
export { GraticuleScene as default };
