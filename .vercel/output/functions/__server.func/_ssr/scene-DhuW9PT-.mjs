import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, R as Vector3, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { l as solarDeclination, n as dayLengthHours, o as formatDay, u as solarNoonAltitude } from "./geo-BTPpCsbm.mjs";
import { a as EarthMesh, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry, r as latheGeometry, t as HeightField } from "./terrain-CZC6vZE1.mjs";
import { n as SunMesh, t as MoonMesh } from "./moon-DSIxiLbk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-DhuW9PT-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DOME = 2.35;
var GNOMON_H = .5;
function sunUnit(lat, decl, hourT, out) {
	const H = (hourT - .5) * Math.PI * 2;
	out.set(-Math.cos(decl) * Math.sin(H), Math.sin(lat) * Math.sin(decl) + Math.cos(lat) * Math.cos(decl) * Math.cos(H), Math.cos(lat) * Math.sin(decl) - Math.sin(lat) * Math.cos(decl) * Math.cos(H));
	return out;
}
function Model() {
	useLabTick(1 / 24);
	const t = useLabControls((s) => s.t);
	const latDeg = useLabControls((s) => s.params.latitude ?? 51.5);
	const explode = useLabControls((s) => s.explode);
	const slice = useLabControls((s) => s.slice);
	const q = useQuality();
	const nrm = useRockNormal();
	const day = useLabControls((s) => s.params.day ?? 172);
	const lat = MathUtils.degToRad(latDeg);
	const decl = solarDeclination(day, 23.44);
	const noon = solarNoonAltitude(latDeg, decl);
	const length = dayLengthHours(latDeg, decl);
	const segs = Math.max(64, q.sphere);
	const domeR = DOME + explode * .35;
	const tmp = (0, import_react.useMemo)(() => new Vector3(), []);
	const pathPts = (0, import_react.useMemo)(() => {
		const out = [];
		for (let i = 0; i <= 72; i++) {
			sunUnit(lat, decl, i / 72, tmp);
			if (tmp.y > -.03) out.push([
				tmp.x * domeR,
				tmp.y * domeR,
				tmp.z * domeR
			]);
		}
		return out;
	}, [
		lat,
		decl,
		domeR
	]);
	const path = (0, import_react.useMemo)(() => pathPts.length >= 2 ? tubeGeometry(pathPts, .018, Math.max(48, pathPts.length), 10) : null, [pathPts]);
	sunUnit(lat, decl, t, tmp);
	const sunPos = [
		tmp.x * domeR,
		tmp.y * domeR,
		tmp.z * domeR
	];
	const up = tmp.y > .03;
	const k = up ? GNOMON_H / tmp.y : 0;
	const sx = up ? -tmp.x * k : 0;
	const sz = up ? -tmp.z * k : 0;
	const slen = Math.hypot(sx, sz);
	const haArg = -Math.tan(lat) * Math.tan(decl);
	const polar = haArg <= -1 ? "day" : haArg >= 1 ? "night" : "none";
	const ha = polar === "none" ? Math.acos(MathUtils.clamp(haArg, -1, 1)) : 0;
	const riseT = polar === "none" ? .5 - ha / (Math.PI * 2) : polar === "day" ? 0 : .5;
	const setT = polar === "none" ? .5 + ha / (Math.PI * 2) : polar === "day" ? 1 : .5;
	const rise = (0, import_react.useMemo)(() => sunUnit(lat, decl, riseT, new Vector3()).multiplyScalar(domeR), [
		lat,
		decl,
		riseT,
		domeR
	]);
	const noonP = (0, import_react.useMemo)(() => sunUnit(lat, decl, .5, new Vector3()).multiplyScalar(domeR), [
		lat,
		decl,
		domeR
	]);
	const setP = (0, import_react.useMemo)(() => sunUnit(lat, decl, setT, new Vector3()).multiplyScalar(domeR), [
		lat,
		decl,
		setT,
		domeR
	]);
	const landFn = (0, import_react.useMemo)(() => (x, y) => .012 + Math.sin(x * 1.3) * Math.cos(y * 1.1) * .018, []);
	const plinth = (0, import_react.useMemo)(() => latheGeometry([
		[.16, 0],
		[.14, .04],
		[.08, .05],
		[.05, .02]
	], 24), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 10 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn: landFn,
			width: 5.2,
			depth: 5.2,
			segX: q.terrain / 4,
			segZ: q.terrain / 4,
			position: [
				0,
				-.02,
				0
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.002,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [2.55, segs] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3d3a38",
				roughness: PBR.rock.roughness,
				metalness: PBR.rock.metalness,
				normalMap: nrm
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.014,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				2.4,
				2.48,
				segs
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#8B9A97",
				transparent: true,
				opacity: .55,
				side: 2
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			domeR,
			segs,
			segs,
			0,
			Math.PI * 2,
			0,
			Math.PI / 2
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#7FD4FF",
			transparent: true,
			opacity: .09,
			side: 1,
			depthWrite: false,
			roughness: 1
		})] }),
		tmp.y < .02 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, { count: Math.max(400, q.stars / 2) }),
		path && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: path,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#E8B86D",
				roughness: .28,
				metalness: .12,
				emissive: "#E8B86D",
				emissiveIntensity: .35
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: sunPos,
			visible: tmp.y > -.15,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunMesh, { radius: .14 })
		}),
		up && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: sunPos,
			to: [
				0,
				GNOMON_H,
				0
			],
			color: "#E8B86D",
			radius: .012
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: plinth,
			position: [
				0,
				0,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.granite.color,
				roughness: .78,
				metalness: .06,
				normalMap: nrm
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				GNOMON_H / 2,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.028,
				.034,
				GNOMON_H,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#E8B86D",
				roughness: .45,
				metalness: .1
			})]
		}),
		up && slen > .04 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				sx / 2,
				.012,
				sz / 2
			],
			rotation: [
				0,
				Math.atan2(sx, sz),
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.07,
				.01,
				slen
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#07090c",
				transparent: true,
				opacity: .5,
				depthWrite: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			visible: false,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, { radius: .05 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, { radius: .055 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonMesh, { radius: .02 })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.12,
				.12,
				2.15
			],
			text: "S",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.12,
				.12,
				-2.15
			],
			text: "N",
			occlude: false
		}),
		polar !== "night" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				noonP.x,
				noonP.y + .16,
				noonP.z
			],
			text: "noon",
			tone: "sandstone",
			occlude: false
		}),
		polar === "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				rise.x,
				Math.max(.2, rise.y + .12),
				rise.z
			],
			text: "sunrise",
			tone: "glacier",
			occlude: false
		}),
		polar === "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				setP.x,
				Math.max(.2, setP.y + .12),
				setP.z
			],
			text: "sunset",
			tone: "magma",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.55 + explode * .2,
				0
			],
			children: [
				formatDay(day),
				" · lat ",
				latDeg.toFixed(1),
				"° · noon altitude ",
				noon.toFixed(0),
				"° · day ",
				length.toFixed(1),
				" h",
				slice > .5 ? " · winter-side note: formula 90° − |φ − δ|" : ""
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.15,
				1.85,
				5.4
			],
			[
				1.1,
				.85,
				2.3
			],
			[
				-3.4,
				1.55,
				2.1
			],
			[
				.2,
				3.1,
				4.2
			]
		] })
	] });
}
function SolarAltitudeScene() {
	const t = useLabControls((s) => s.t);
	const lat = useLabControls((s) => s.params.latitude ?? 51.5);
	const day = useLabControls((s) => s.params.day ?? 172);
	const decl = solarDeclination(day, 23.44);
	const noon = solarNoonAltitude(lat, decl);
	const hour = t * 24;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "solar-altitude",
		title: "Solar altitude and sun path",
		camera: {
			position: [
				.15,
				1.85,
				5.4
			],
			fov: 40
		},
		liveText: `Latitude ${lat.toFixed(1)}°. Noon altitude ${noon.toFixed(0)}°. Hour ${hour.toFixed(1)}. Path is today's arc, not a magnetic compass.`,
		exaggeration: "Dome radius is a sky stand-in. Gnomon shadow is school geometry.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "solar-altitude",
			title: "Solar altitude",
			caption: "Noon altitude = 90° − |φ − δ|. The Sun is not overhead everywhere."
		}),
		minDistance: 2,
		maxDistance: 11,
		target: [
			0,
			.4,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { SolarAltitudeScene as default };
