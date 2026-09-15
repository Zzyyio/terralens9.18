import { i as __toESM } from "../_runtime.mjs";
import { R as Vector3, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry, r as latheGeometry, t as HeightField } from "./terrain-CZC6vZE1.mjs";
import { t as CurveFlow } from "./particles-DYsHC89-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-DDklZoiy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EXAG = 8;
function basinH(x, y) {
	const r = Math.hypot(x * .7, y * .92);
	const bowl = .042 * r * r;
	const rim = .125 * Math.exp(-((r - 2.52) ** 2) / .16);
	const sourceHill = .08 * Math.exp(-((x + 2.28) ** 2 + (y + .12) ** 2) / .62);
	const mainCh = .05 * Math.exp(-(y * y) / (.15 + Math.max(.04, x + 2.5) * .055));
	const tribN = .032 * Math.exp(-((y - 1.08 - x * .12) ** 2) / .13) * Math.max(0, 1.05 - Math.abs(x + .15));
	const tribS = .028 * Math.exp(-((y + 1.02 + x * .1) ** 2) / .12) * Math.max(0, .95 - Math.abs(x + .35));
	const mouth = Math.max(0, (x - 2.15) * .018);
	const sea = x > 2.82 ? -.035 : 0;
	return (.035 + bowl + rim + sourceHill - mainCh - tribN - tribS + mouth + sea) * EXAG;
}
function basinColor(h) {
	const c = new Color();
	if (h < .2) c.set(PBR.water.color);
	else if (h < .55) c.set(PBR.crust.color);
	else if (h < 1.05) c.set(PBR.soil.color);
	else c.set("#d4ccc0");
	return c;
}
function ry(x, z) {
	return basinH(x, z) + .048;
}
function path2(fn, n) {
	const pts = [];
	for (let i = 0; i <= n; i++) {
		const [x, z] = fn(i / n);
		pts.push([
			x,
			ry(x, z),
			z
		]);
	}
	return pts;
}
function Network() {
	useLabTick(1 / 12);
	const overlay = (useLabControls((s) => s.params.overlay) ?? 1) > .5;
	const q = useQuality();
	const rock = useRockNormal();
	const rad = q.particles > 12 ? 10 : 8;
	const main = (0, import_react.useMemo)(() => path2((u) => {
		return [-2.35 + u * 5.35, Math.sin(u * 3.6) * .1 * u];
	}, 48), []);
	const tribA = (0, import_react.useMemo)(() => path2((u) => {
		return [-.95 + u * 1.42, 1.48 - u * 1.4];
	}, 28), []);
	const tribB = (0, import_react.useMemo)(() => path2((u) => {
		return [-1.15 + u * 1.55, -1.38 + u * 1.32];
	}, 26), []);
	const divide = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let i = 0; i <= 72; i++) {
			const a = i / 72 * Math.PI * 1.72 + .28;
			const x = Math.cos(a) * 2.62;
			const z = Math.sin(a) * 2.18;
			pts.push([
				x,
				basinH(x, z) + .07,
				z
			]);
		}
		return pts;
	}, []);
	const mainTube = (0, import_react.useMemo)(() => tubeGeometry(main, .055, 48, rad), [main, rad]);
	const tribATube = (0, import_react.useMemo)(() => tubeGeometry(tribA, .032, 28, rad), [tribA, rad]);
	const tribBTube = (0, import_react.useMemo)(() => tubeGeometry(tribB, .028, 26, rad), [tribB, rad]);
	const divideTube = (0, import_react.useMemo)(() => tubeGeometry(divide, .03, 64, 8), [divide]);
	const spring = (0, import_react.useMemo)(() => latheGeometry([
		[.02, 0],
		[.14, .03],
		[.1, .1],
		[.045, .16]
	], q.lathe), [q.lathe]);
	const mainVec = (0, import_react.useMemo)(() => main.map((p) => new Vector3(...p)), [main]);
	const water = {
		color: PBR.water.color,
		roughness: PBR.water.roughness,
		metalness: PBR.water.metalness
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: mainTube,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { ...water })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: tribATube,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { ...water })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: tribBTube,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { ...water })
		}),
		overlay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: divideTube,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3EE0C6",
				roughness: .35,
				emissive: "#3EE0C6",
				emissiveIntensity: .2
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: spring,
			position: [
				-2.32,
				ry(-2.32, -.12),
				-.12
			],
			castShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.ice.color,
				roughness: .22,
				metalness: .04,
				transparent: true,
				opacity: .72
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				3.2,
				.015,
				.12
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [1.2, 32] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { ...water })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				-.04,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [6.2, q.lathe] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#121814",
				roughness: .96,
				normalMap: rock
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: mainVec,
			color: "#7FD4FF",
			count: 10,
			radius: .032
		})
	] });
}
function DrainageBasinScene() {
	const overlay = (useLabControls((s) => s.params.overlay) ?? 1) > .5;
	const q = useQuality();
	const segs = Math.max(48, Math.floor(q.terrain / 2));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "drainage-basin",
		title: "Drainage basin",
		camera: {
			position: [
				.35,
				5.4,
				7.6
			],
			fov: 40
		},
		liveText: `Watershed ${overlay ? "overlay on" : "hidden"}. Source, tributary, confluence, mouth.`,
		exaggeration: "Vertical exaggeration ×8 — the rim is the watershed, not a paint fill.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "drainage-basin",
			title: "Drainage basin",
			caption: "A 3D watershed: rim, source, tributary, confluence, mouth."
		}),
		minDistance: 3.4,
		maxDistance: 16,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
				attach: "fog",
				args: [
					"#07090C",
					12,
					26
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
				fn: basinH,
				width: 8.6,
				depth: 6.4,
				segX: q.terrain,
				segZ: segs,
				colorFn: basinColor
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					-2.32,
					1.95,
					-.12
				],
				text: "source",
				tone: "ice"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					-.25,
					1.22,
					1.38
				],
				text: "tributary",
				tone: "glacier"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					.42,
					.92,
					.04
				],
				text: "confluence",
				tone: "moss"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					2.88,
					.58,
					.18
				],
				text: "mouth"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					.15,
					2.22,
					-2.08
				],
				text: "watershed",
				tone: "sandstone"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
				pos: [
					0,
					3.45,
					0
				],
				children: ["Rain inside the rim is this river · overlay ", overlay ? "on" : "off"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
				[
					.35,
					5.4,
					7.6
				],
				[
					-2.5,
					3.3,
					4.1
				],
				[
					.55,
					2.5,
					4.9
				],
				[
					2.9,
					2.7,
					5.3
				]
			] })
		]
	});
}
//#endregion
export { DrainageBasinScene as default };
