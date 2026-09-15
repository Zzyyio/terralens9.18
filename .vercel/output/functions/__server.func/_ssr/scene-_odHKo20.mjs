import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, R as Vector3, k as Quaternion, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { a as EarthMesh, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry, r as latheGeometry, t as HeightField } from "./terrain-CZC6vZE1.mjs";
import { n as SunMesh, t as MoonMesh } from "./moon-DSIxiLbk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-_odHKo20.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUN_X = -5.35;
var SUN_R = .62;
var EARTH_R = .5;
var MOON_R = .18;
var MOON_A = 2.22;
function Model() {
	useLabTick(1 / 16);
	const t = useLabControls((s) => s.t);
	const align = (useLabControls((s) => s.params.align) ?? 0) > .5;
	const explode = useLabControls((s) => s.explode);
	const slice = useLabControls((s) => s.slice);
	const q = useQuality();
	const nrm = useRockNormal();
	const tiltDeg = align ? 0 : 5;
	const incl = MathUtils.degToRad(tiltDeg);
	const ang = t * Math.PI * 2;
	const moonA = MOON_A * (1 + explode * .28);
	const mx = Math.cos(ang) * moonA;
	const my = Math.cos(ang) * moonA * Math.sin(incl);
	const mz = Math.sin(ang) * moonA;
	const sunDir = (0, import_react.useMemo)(() => new Vector3(-1, 0, 0), []);
	const shadow = (0, import_react.useMemo)(() => {
		const moon = new Vector3(mx, my, mz);
		const sun = new Vector3(SUN_X, 0, 0);
		const dir = moon.clone().sub(sun).normalize();
		return {
			quat: new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), dir),
			moon
		};
	}, [
		mx,
		my,
		mz
	]);
	const umbra = (0, import_react.useMemo)(() => latheGeometry([
		[.16, 0],
		[.11, .7],
		[.045, 1.55],
		[.001, 2.6]
	], Math.max(32, q.lathe / 2)), [q.lathe]);
	const penumbra = (0, import_react.useMemo)(() => latheGeometry([
		[.2, 0],
		[.36, 1.05],
		[.58, 2.2],
		[.82, 3.35]
	], Math.max(32, q.lathe / 2)), [q.lathe]);
	const orbitPts = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let i = 0; i <= 96; i++) {
			const a = i / 96 * Math.PI * 2;
			pts.push([
				Math.cos(a) * moonA,
				Math.cos(a) * moonA * Math.sin(incl),
				Math.sin(a) * moonA
			]);
		}
		return pts;
	}, [moonA, incl]);
	const orbit = (0, import_react.useMemo)(() => tubeGeometry(orbitPts, .012, 96, 8), [orbitPts]);
	const ecliptic = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let i = 0; i <= 80; i++) {
			const a = i / 80 * Math.PI * 2;
			pts.push([
				Math.cos(a) * moonA,
				0,
				Math.sin(a) * moonA
			]);
		}
		return tubeGeometry(pts, .007, 80, 8);
	}, [moonA]);
	const newMoon = Math.cos(ang) < -.75;
	const fullMoon = Math.cos(ang) > .75;
	const miss = !align && (newMoon || fullMoon);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			intensity: .055,
			color: "#9bb0c8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				SUN_X,
				0,
				0
			],
			intensity: 42,
			distance: 24,
			color: "#fff1c4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: .001 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			visible: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
				fn: () => 0,
				width: .2,
				depth: .2,
				segX: 2,
				segZ: 2
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.02,
				8,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.basalt.color,
				roughness: .9,
				normalMap: nrm
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				SUN_X,
				0,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunMesh, { radius: SUN_R })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				-4.609999999999999,
				.2,
				0
			],
			to: [
				-.65,
				.2,
				0
			],
			color: "#E8B86D",
			radius: .016
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, {
			sunDirection: sunDir,
			radius: EARTH_R,
			clouds: true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, { radius: EARTH_R * 1.06 })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: ecliptic,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#8B9A97",
				transparent: true,
				opacity: .28
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: orbit,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#7FD4FF",
				transparent: true,
				opacity: .55
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: shadow.moon.toArray(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonMesh, { radius: MOON_R }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				quaternion: shadow.quat,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: umbra,
					renderOrder: 2,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#07090C",
						transparent: true,
						opacity: .55 * (1 - slice * .35),
						depthWrite: false,
						side: 2
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: penumbra,
					renderOrder: 1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#8B9A97",
						transparent: true,
						opacity: .16,
						depthWrite: false,
						side: 2
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				SUN_X,
				1,
				0
			],
			text: "Sun",
			tone: "sandstone",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				.88,
				0
			],
			text: "Earth",
			tone: "glacier",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				mx,
				my + MOON_R + .28,
				mz
			],
			text: "Moon",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				mx + .35,
				my - .15,
				mz
			],
			text: "umbra",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				mx + .55,
				my + .45,
				mz
			],
			text: "penumbra",
			tone: "sandstone",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.2,
				1.35,
				1.4
			],
			text: align ? "aligned · eclipse possible" : "orbit tilt 5° · most months miss",
			tone: align ? "fault" : "ice",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.15,
				0
			],
			children: [
				"t = month · tilt ",
				tiltDeg,
				"° · ",
				fullMoon ? "full" : newMoon ? "new" : "wax / wane",
				" · ",
				miss ? "shadow misses Earth" : align ? "node + syzygy" : "wait for a node"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.2,
				2.15,
				7.1
			],
			[
				-2.4,
				.7,
				4.2
			],
			[
				.1,
				6.4,
				.6
			],
			[
				.2,
				2.15,
				7.1
			]
		] })
	] });
}
function EclipsesScene() {
	const align = (useLabControls((s) => s.params.align) ?? 0) > .5;
	const t = useLabControls((s) => s.t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "eclipses",
		title: "Eclipses",
		camera: {
			position: [
				.2,
				2.15,
				7.1
			],
			fov: 40
		},
		liveText: `Moon orbit tilt ${align ? "0° — eclipse geometry" : "5° — most months miss"}. Phase ${t < .15 || t > .85 ? "full" : t > .42 && t < .58 ? "new" : "other"}. Umbra is the dark cone; penumbra is the pale one.`,
		exaggeration: "Sizes and distances are classroom-exaggerated. Nodes are the real rarity.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "eclipses",
			title: "Eclipses",
			caption: "Umbra and penumbra are cones. A 5° tilt is why most months miss."
		}),
		lights: false,
		minDistance: 3,
		maxDistance: 14,
		target: [
			0,
			0,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { EclipsesScene as default };
