import { i as __toESM } from "../_runtime.mjs";
import { R as Vector3, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality } from "./perf-Cy1NcWbY.mjs";
import { a as EarthMesh, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback } from "./studio-CNvjqO8z.mjs";
import { n as SunMesh } from "./moon-DSIxiLbk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-BdGcs943.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LATS = [
	-66,
	-45,
	-23.44,
	0,
	23.44,
	45,
	66
];
function Spots() {
	const q = useQuality();
	const spots = (0, import_react.useMemo)(() => [
		[
			.18,
			.22,
			.32
		],
		[
			-.28,
			.08,
			.3
		],
		[
			.05,
			-.3,
			.28
		],
		[
			.32,
			-.05,
			.18
		],
		[
			-.12,
			.34,
			.16
		],
		[
			.22,
			.12,
			-.3
		]
	], []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: spots.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: p,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			.055,
			Math.max(12, q.sphere / 6),
			Math.max(10, q.sphere / 8)
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#3a2a18",
			roughness: .9
		})]
	}, i)) });
}
function Model() {
	useLabTick(1 / 24);
	const t = useLabControls((s) => s.t);
	const spots = (useLabControls((s) => s.params.spots) ?? 0) > .5;
	const decl = 23.44 * Math.sin((t - 80 / 365) * 2 * Math.PI);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				-2.35,
				.15,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunMesh, { radius: .55 }),
				spots && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spots, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: [
						0,
						.85,
						0
					],
					text: "Sun · ~1366 W m⁻² at 1 AU",
					tone: "sandstone"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				2.15,
				0,
				0
			],
			rotation: [
				0,
				t * Math.PI * 2,
				.41
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, {
				radius: .95,
				clouds: true,
				sunDirection: new Vector3(-1, .05, 0)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, { radius: .99 })]
		}),
		LATS.map((lat) => {
			const inc = Math.max(0, Math.cos((lat - decl) * Math.PI / 180));
			const y = Math.sin(lat * Math.PI / 180) * .95;
			const z = Math.cos(lat * Math.PI / 180) * .95;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					2.23,
					y,
					z * .15
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.035,
					.035,
					.15 + inc * 1.15,
					14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#E8B86D",
					emissive: "#E8B86D",
					emissiveIntensity: .25 + inc * .55,
					roughness: .4
				})]
			}, lat);
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.15,
				1.15,
				0
			],
			text: "Equator",
			tone: "glacier"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.15,
				.72,
				.2
			],
			text: "55°N playground"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.15,
				-1.05,
				0
			],
			text: "Pole",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				1.85,
				0
			],
			children: "Same solar constant. Incidence changes with latitude. Sunspots are not seasons."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				1.4,
				6.2
			],
			[
				-1.6,
				.8,
				3.4
			],
			[
				3.2,
				.6,
				3.8
			],
			[
				0,
				1.4,
				6.2
			]
		] })
	] });
}
function SunEarthScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "sun-earth",
		title: "Sun and Earth",
		camera: {
			position: [
				0,
				1.4,
				6.2
			],
			fov: 40
		},
		liveText: "Solar constant is the same. Latitude changes incidence. Sunspots are a toggle, not astrology.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "sun-earth",
			title: "Sun and Earth",
			caption: "1366 W m⁻² at the top of the atmosphere. Latitude is why playgrounds disagree."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { SunEarthScene as default };
