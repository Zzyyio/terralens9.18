import { i as __toESM } from "../_runtime.mjs";
import { N as Shape, _ as ExtrudeGeometry, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-C0VGnXvo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MONTHS = [
	"J",
	"F",
	"M",
	"A",
	"M",
	"J",
	"J",
	"A",
	"S",
	"O",
	"N",
	"D"
];
/** UK highland: nival spring snowmelt bump, winter rain in the wings. */
function ukNival(m) {
	const snowmelt = .88 * Math.exp(-((m - 4.15) ** 2) / 1.55);
	return .22 + (.2 + .16 * Math.cos((m - .4) / 12 * Math.PI * 2)) + snowmelt;
}
/** Mississippi: broader pluvial / rain-fed continental year. */
function msPluvial(m) {
	const rain = .58 * Math.exp(-((m - 5.6) ** 2) / 6.8);
	return .4 + .1 * Math.sin((m - 4.2) / 12 * Math.PI * 2) + rain;
}
function crest(fn, z) {
	const pts = [];
	for (let i = 0; i <= 48; i++) {
		const m = i / 48 * 12;
		pts.push([
			-2.5 + m / 12 * 5,
			fn(m) + .02,
			z
		]);
	}
	return pts;
}
function RegimeRibbon({ fn, z, color, month }) {
	const geom = (0, import_react.useMemo)(() => {
		const shape = new Shape();
		shape.moveTo(-2.5, .03);
		for (let i = 0; i <= 48; i++) {
			const m = i / 48 * 12;
			shape.lineTo(-2.5 + m / 12 * 5, fn(m));
		}
		shape.lineTo(2.5, .03);
		shape.closePath();
		const g = new ExtrudeGeometry(shape, {
			depth: .34,
			bevelEnabled: false,
			steps: 1
		});
		g.translate(0, 0, -.17);
		g.computeVertexNormals();
		return g;
	}, [fn]);
	const tube = (0, import_react.useMemo)(() => tubeGeometry(crest(fn, 0), .04, 48, 10), [fn]);
	const h = fn(month);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			0,
			z
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: geom,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color,
					roughness: .36,
					metalness: .08,
					side: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: tube,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color,
					roughness: .22,
					metalness: .1
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-2.5 + month / 12 * 5,
					h + .09,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.09,
					14,
					14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#FF6A3D" })]
			})
		]
	});
}
function Model() {
	useLabTick(1 / 14);
	const t = useLabControls((s) => s.t);
	const month = t * 12;
	const mi = Math.min(11, Math.floor(t * 12));
	const q = useQuality();
	const rock = useRockNormal();
	const snowOn = month > 2.2 && month < 5.4;
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
				0,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [6.5, q.lathe] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#121814",
				roughness: .95,
				normalMap: rock
			})]
		}),
		MONTHS.map((lab, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				-2.5 + i / 11 * 5,
				.02,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.018,
				.05,
				3.4
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#2a3230" })] })
		}, lab)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegimeRibbon, {
			fn: ukNival,
			z: -1.05,
			color: "#3EE0C6",
			month
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegimeRibbon, {
			fn: msPluvial,
			z: 1.05,
			color: "#7FD4FF",
			month
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.01,
				0
			],
			rotation: [
				0,
				0,
				Math.PI / 2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.01,
				.01,
				5.2,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#8B9A97" })]
		}),
		snowOn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-2.5 + 4.15 / 12 * 5,
				ukNival(4.15) + .22,
				-1.05
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.16,
				16,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.ice.color,
				roughness: PBR.ice.roughness,
				metalness: PBR.ice.metalness,
				transparent: true,
				opacity: .7
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.1,
				ukNival(month) + .52,
				-1.05
			],
			text: "nival · UK highland",
			tone: "glacier"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.1,
				msPluvial(month) + .52,
				1.05
			],
			text: "pluvial · Mississippi",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-2.5 + 4.15 / 12 * 5,
				1.62,
				-1.05
			],
			text: "snowmelt",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.55,
				0
			],
			children: [MONTHS[mi], " · two climates, two years — not one graph for all rivers"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.2,
				3.4,
				7.2
			],
			[
				.2,
				2.35,
				4.5
			],
			[
				2.15,
				2.2,
				5.3
			],
			[
				.2,
				3.4,
				7.2
			]
		] })
	] });
}
function RiverHydrologyScene() {
	const t = useLabControls((s) => s.t);
	const mi = Math.min(11, Math.floor(t * 12));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "river-hydrology",
		title: "River regime",
		camera: {
			position: [
				.2,
				3.4,
				7.2
			],
			fov: 40
		},
		liveText: `River regime. Month ${MONTHS[mi]}. UK highland nival vs Mississippi pluvial.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "river-hydrology",
			title: "River regime",
			caption: "Two annual 3D traces. Nival snowmelt vs broader pluvial year."
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
export { RiverHydrologyScene as default };
