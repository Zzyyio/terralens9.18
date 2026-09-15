import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, R as Vector3, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
import { t as CurveFlow } from "./particles-DYsHC89-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-BAInbw6V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function troughFn(nino) {
	return (x, y) => {
		const west = .72 * Math.exp(-((x + 2.65) ** 2) / .22);
		const east = .95 * Math.exp(-((x - 2.7) ** 2) / .28) * (y < .55 ? 1 : .35);
		const ocean = -.22 + .03 * Math.sin(x * 1.8) * Math.cos(y * 2.4);
		const pool = .08 * Math.exp(-((x - nino * 1.55) ** 2 + y * y) / 1.1);
		return Math.max(ocean + pool, west + east);
	};
}
function troughColor(nino) {
	return (h) => {
		const c = new Color();
		if (h < -.05) c.set(nino > .25 ? "#c45a32" : PBR.water.color);
		else if (h < .2) c.set(nino < -.25 ? "#1a3a58" : "#2a628c");
		else c.set(PBR.crust.color);
		return c;
	};
}
function phaseOf(nino) {
	if (nino > .28) return "El Niño";
	if (nino < -.28) return "La Niña";
	return "Walker · neutral";
}
function Model() {
	useLabTick(1 / 10);
	const t = useLabControls((s) => s.t);
	const nino = useLabControls((s) => s.params.nino ?? s.params.enso ?? t * 2 - 1);
	const q = useQuality();
	const rock = useRockNormal();
	const fn = (0, import_react.useMemo)(() => troughFn(nino), [nino]);
	const colorFn = (0, import_react.useMemo)(() => troughColor(nino), [nino]);
	const segs = Math.max(40, Math.floor(q.terrain / 3));
	const sph = Math.max(12, Math.floor(q.sphere / 3));
	const poolX = MathUtils.lerp(-1.55, 1.45, (nino + 1) / 2);
	const ninoOn = nino > .25;
	const riseX = ninoOn ? 1.15 : -1.45;
	const sinkX = ninoOn ? -1.35 : 1.55;
	const loop = (0, import_react.useMemo)(() => {
		const pts = [];
		const n = 40;
		for (let i = 0; i <= n; i++) {
			const u = i / n * Math.PI * 2;
			const x = (riseX + sinkX) * .5 + Math.cos(u) * (ninoOn ? -1.35 : 1.5);
			const y = .35 + (Math.sin(u) * .5 + .5) * 1.15;
			pts.push(new Vector3(x, y, .05));
		}
		return pts;
	}, [
		riseX,
		sinkX,
		ninoOn
	]);
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
				-.35,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [7, q.lathe] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#121814",
				roughness: .96,
				normalMap: rock
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn,
			width: 6.6,
			depth: 3.4,
			segX: segs,
			segZ: Math.floor(segs * .55),
			colorFn
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-2.65,
				.42,
				.15
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.55,
				.7,
				1.4
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.crust.color,
				roughness: .88
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				2.7,
				.55,
				-.15
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.5,
				.95,
				1.6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.soil.color,
				roughness: .9
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				poolX,
				.22,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.28 + Math.abs(nino) * .06,
				sph,
				sph
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#FF6A3D",
				roughness: .28,
				metalness: .08,
				emissive: "#FF6A3D",
				emissiveIntensity: .35
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				riseX,
				.18,
				.08
			],
			to: [
				riseX,
				1.42,
				.08
			],
			color: "#FF6A3D",
			radius: .032
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				riseX,
				1.42,
				.08
			],
			to: [
				sinkX,
				1.42,
				.08
			],
			color: "#7FD4FF",
			radius: .028
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				sinkX,
				1.42,
				.08
			],
			to: [
				sinkX,
				.18,
				.08
			],
			color: "#8B9A97",
			radius: .032
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				sinkX,
				.22,
				.08
			],
			to: [
				riseX,
				.22,
				.08
			],
			color: "#3EE0C6",
			radius: .028
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: loop,
			color: ninoOn ? "#FF6A3D" : "#7FD4FF",
			count: 10,
			radius: .03
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				poolX,
				.72,
				.15
			],
			text: "warm pool",
			tone: "magma"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				1.72,
				.1
			],
			text: "Walker",
			tone: "glacier"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.7,
				.85,
				.4
			],
			text: "El Niño",
			tone: "magma"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-1.7,
				.85,
				.4
			],
			text: "La Niña",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-2.65,
				1.05,
				.15
			],
			text: "west Pacific",
			tone: "moss"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.7,
				1.2,
				-.15
			],
			text: "east Pacific",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.55,
				0
			],
			children: [phaseOf(nino), " · a Pacific state, not a personality · we do not promise UK snow"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.15,
				2.6,
				6.6
			],
			[
				-2.4,
				1.8,
				4.6
			],
			[
				2.3,
				1.7,
				4.8
			],
			[
				.15,
				2.6,
				6.6
			]
		] })
	] });
}
function EnsoScene() {
	const nino = useLabControls((s) => s.params.nino ?? s.params.enso ?? 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "enso",
		title: "ENSO and the Walker cell",
		camera: {
			position: [
				.15,
				2.6,
				6.6
			],
			fov: 40
		},
		liveText: `${phaseOf(nino)}. Warm pool slides east in El Niño. We do not promise UK snow.`,
		exaggeration: "Schematic equatorial Pacific — not a forecast of UK snow.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "enso",
			title: "ENSO",
			caption: "Walker cell and warm pool. El Niño is not a personality. No UK snow promise."
		}),
		minDistance: 3,
		maxDistance: 14,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#07090C",
				12,
				24
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})]
	});
}
//#endregion
export { EnsoScene as default };
