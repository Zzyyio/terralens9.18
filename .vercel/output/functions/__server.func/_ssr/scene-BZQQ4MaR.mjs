import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, R as Vector3, k as Quaternion, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality } from "./perf-Cy1NcWbY.mjs";
import { s as latLonToVector3 } from "./geo-BTPpCsbm.mjs";
import { a as EarthMesh, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3 } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-BZQQ4MaR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var IN = 340;
var SUN = new Vector3(4, .35, .55);
function ll(lat, lon, r) {
	const v = latLonToVector3(lat, lon, r);
	return [
		v.x,
		v.y,
		v.z
	];
}
function fluxR(w) {
	return .012 + Math.max(0, w) * 1e-4;
}
/** Several dayside beams. Width encodes insolation, not decoration. */
var BEAMS = [
	{
		lat: 4,
		lon: 88,
		w: 1
	},
	{
		lat: 28,
		lon: 74,
		w: .82
	},
	{
		lat: -22,
		lon: 102,
		w: .86
	},
	{
		lat: 52,
		lon: 64,
		w: .48
	},
	{
		lat: -48,
		lon: 96,
		w: .5
	}
];
function DaysideGlow({ absorbed }) {
	const q = useQuality();
	const quat = (0, import_react.useMemo)(() => new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), SUN.clone().normalize()), []);
	const k = MathUtils.clamp(absorbed / IN, .08, 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		quaternion: quat,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			1.018,
			q.sphere,
			q.sphere,
			0,
			Math.PI * 2,
			0,
			Math.PI * .52
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#ff8a4c",
			emissive: "#ff6a3d",
			emissiveIntensity: .2 + k * .95,
			transparent: true,
			opacity: .18 + k * .32,
			depthWrite: false
		})]
	});
}
function Budget() {
	const albedo = useLabControls((s) => s.params.albedo ?? .3);
	const gh = (useLabControls((s) => s.params.greenhouse) ?? 1) > .5;
	const reflected = IN * albedo;
	const absorbed = IN * (1 - albedo);
	const surfaceUp = gh ? 398 : absorbed;
	const back = gh ? 333 * (.72 + (1 - albedo) * .28) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, {
			sunDirection: SUN,
			radius: 1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DaysideGlow, { absorbed }),
		BEAMS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: ll(b.lat, b.lon, 2.22),
			to: ll(b.lat, b.lon, 1.14),
			color: "#F5D76E",
			radius: fluxR(IN * b.w)
		}, `sw-${b.lat}`)),
		BEAMS.filter((b) => Math.abs(b.lat) < 40).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: ll(b.lat + 6, b.lon - 8, 1.16),
			to: ll(b.lat + 14, b.lon - 18, 2.05),
			color: "#F4EFE6",
			radius: fluxR(reflected * b.w)
		}, `alb-${b.lat}`)),
		BEAMS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: ll(b.lat - 4, b.lon + 10, 1.08),
			to: ll(b.lat - 8, b.lon + 16, 1.92),
			color: "#FF6A3D",
			radius: fluxR(surfaceUp * (.55 + b.w * .45))
		}, `lw-${b.lat}`)),
		gh && BEAMS.slice(0, 4).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: ll(b.lat + 8, b.lon + 6, 1.52),
			to: ll(b.lat + 2, b.lon + 2, 1.1),
			color: "#E24B4B",
			radius: fluxR(back * .55 * b.w)
		}, `gh-${b.lat}`)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(8, 88, 1.72),
			text: "shortwave",
			tone: "sandstone",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(22, 58, 1.68),
			text: `albedo · ${albedo.toFixed(2)}`,
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(-12, 112, 1.7),
			text: "longwave",
			tone: "magma",
			occlude: false
		}),
		gh && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(32, 96, 1.58),
			text: "greenhouse",
			tone: "fault",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				1.62,
				0
			],
			children: [
				"in ",
				IN,
				" · bounce ",
				reflected.toFixed(0),
				" · absorbed ",
				absorbed.toFixed(0),
				" W/m² · arrow width = flux"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				2.4,
				.55,
				2.8
			],
			[
				3.2,
				1.1,
				1.4
			],
			[
				1.2,
				2.2,
				2.6
			],
			[
				2.4,
				.55,
				2.8
			]
		] })
	] });
}
function EnergyBudgetScene() {
	const albedo = useLabControls((s) => s.params.albedo ?? .3);
	const gh = (useLabControls((s) => s.params.greenhouse) ?? 1) > .5;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "energy-budget",
		title: "Earth’s energy budget",
		camera: {
			position: [
				2.4,
				.55,
				2.8
			],
			fov: 40
		},
		liveText: `Albedo ${albedo.toFixed(2)}. Absorbed ${(IN * (1 - albedo)).toFixed(0)} W/m². Greenhouse ${gh ? "on" : "off"}. Arrow width is flux.`,
		exaggeration: "Arrow width = flux. School-box global means, not a forecast.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "energy-budget",
			title: "Energy budget",
			caption: "Yellow shortwave hits the dayside. The ground glows. Longwave leaves. Greenhouse returns a thinner IR beam."
		}),
		minDistance: 1.8,
		maxDistance: 8,
		target: [
			0,
			0,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Budget, {})
	});
}
//#endregion
export { EnergyBudgetScene as default };
