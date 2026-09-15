import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, R as Vector3, i as Line, p as BufferGeometry, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality } from "./perf-Cy1NcWbY.mjs";
import { s as latLonToVector3, t as CITIES } from "./geo-BTPpCsbm.mjs";
import { a as EarthMesh, n as AxisLine, o as Graticule, r as CityMarker, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, c as SceneToggles, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, s as SceneBtn } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-B5jnCLhh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CITIES_ROT = [
	CITIES.london,
	CITIES.cairo,
	CITIES.nairobi,
	CITIES.sydney,
	CITIES.sanFrancisco,
	CITIES.tokyo
];
var TILT = MathUtils.degToRad(23.44);
var SUN = new Vector3(1, .04, 0).normalize();
function fmtHour(h) {
	const x = (h % 24 + 24) % 24;
	const hh = Math.floor(x);
	const mm = Math.floor((x - hh) * 60);
	return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
function localHour(utc, lon) {
	return fmtHour(utc + lon / 15);
}
function TerminatorRing({ radius }) {
	const q = useQuality();
	const pts = (0, import_react.useMemo)(() => {
		const s = SUN.clone().normalize();
		const up = Math.abs(s.y) < .85 ? new Vector3(0, 1, 0) : new Vector3(0, 0, 1);
		const a = new Vector3().crossVectors(s, up).normalize();
		const b = new Vector3().crossVectors(s, a).normalize();
		const n = Math.max(96, q.sphere);
		const out = [];
		for (let i = 0; i <= n; i++) {
			const th = i / n * Math.PI * 2;
			out.push(a.clone().multiplyScalar(Math.cos(th) * radius).add(b.clone().multiplyScalar(Math.sin(th) * radius)));
		}
		return out;
	}, [radius, q.sphere]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
		points: pts,
		color: "#F4EFE6",
		transparent: true,
		opacity: .92,
		lineWidth: 1.6
	});
}
function ZoneMeridians() {
	const show = useLabControls((s) => (s.params.zones ?? 0) > .5);
	const geom = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let lon = -180; lon < 180; lon += 15) for (let lat = -78; lat < 78; lat += 3) {
			pts.push(latLonToVector3(lat, lon, 1.012));
			pts.push(latLonToVector3(lat + 3, lon, 1.012));
		}
		return new BufferGeometry().setFromPoints(pts);
	}, []);
	if (!show) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineSegments", {
		geometry: geom,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", {
			color: "#E8B86D",
			transparent: true,
			opacity: .42
		})
	});
}
function HourTicks() {
	const q = useQuality();
	const pts = (0, import_react.useMemo)(() => {
		const a = [];
		Math.max(24, q.sphere / 4);
		for (let lon = -180; lon < 180; lon += 15) {
			const inner = latLonToVector3(0, lon, 1.02);
			const outer = latLonToVector3(0, lon, 1.08);
			a.push(inner, outer);
		}
		return a;
	}, [q.sphere]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineSegments", {
		geometry: (0, import_react.useMemo)(() => new BufferGeometry().setFromPoints(pts), [pts]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", {
			color: "#3EE0C6",
			transparent: true,
			opacity: .55
		})
	});
}
function Globe() {
	useLabTick(1 / 24);
	const t = useLabControls((s) => s.t);
	const graticule = useLabControls((s) => s.graticule);
	const hour = t * 24;
	const rotY = t * Math.PI * 2;
	const sunDir = (0, import_react.useMemo)(() => SUN.clone(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			intensity: .055,
			color: "#9bb0c8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				8,
				.35,
				0
			],
			intensity: 3.1,
			color: "#fff4dc"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-5,
				.2,
				0
			],
			intensity: .08,
			color: "#1a2a44"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			rotation: [
				0,
				0,
				TILT
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				rotation: [
					0,
					rotY,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, {
						sunDirection: sunDir,
						clouds: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AxisLine, {
						tiltDeg: 0,
						radius: 1.26
					}),
					graticule && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Graticule, { radius: 1.018 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoneMeridians, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HourTicks, {}),
					CITIES_ROT.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityMarker, {
						lat: c.lat,
						lon: c.lon
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
						pos: latLonToVector3(c.lat, c.lon, 1.16).toArray(),
						text: `${c.name} · ${localHour(hour, c.lon)}`,
						occlude: false
					})] }, c.name))
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminatorRing, { radius: 1.035 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				.15,
				1.35
			],
			text: "Terminator · knife of dawn",
			tone: "ice",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.35,
				.2,
				0
			],
			text: "Noon",
			tone: "sandstone",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-1.35,
				.2,
				0
			],
			text: "Midnight",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				1.62,
				0
			],
			children: [
				"UTC ",
				fmtHour(hour),
				" · 15° of longitude = 1 hour · west to east"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				.45,
				3.2
			],
			[
				2.4,
				.8,
				2.6
			],
			[
				0,
				2.2,
				3.4
			],
			[
				0,
				.45,
				3.2
			]
		] })
	] });
}
function RotationScene() {
	const t = useLabControls((s) => s.t);
	const setGraticule = useLabControls((s) => s.setGraticule);
	const graticule = useLabControls((s) => s.graticule);
	const hour = t * 24;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "rotation",
		title: "Earth rotation and the terminator",
		camera: {
			position: [
				0,
				.45,
				3.2
			],
			fov: 42
		},
		liveText: `UTC ${fmtHour(hour)}. Earth turns west to east. The terminator is a sharp dawn line. Fifteen degrees of longitude is one hour.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "rotation",
			title: "Earth rotation",
			caption: "Earth turns west to east. 15° of longitude is one hour. Dawn is a terminator, not a jump."
		}),
		lights: false,
		minDistance: 2.1,
		maxDistance: 6.5,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneToggles, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneBtn, {
		onClick: () => setGraticule(!graticule),
		active: graticule,
		children: ["Graticule ", graticule ? "on" : "off"]
	}) })] });
}
//#endregion
export { RotationScene as default };
