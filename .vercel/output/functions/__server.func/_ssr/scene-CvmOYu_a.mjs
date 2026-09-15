import { i as __toESM } from "../_runtime.mjs";
import { R as Vector3, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { s as latLonToVector3 } from "./geo-BTPpCsbm.mjs";
import { a as EarthMesh, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry } from "./terrain-CZC6vZE1.mjs";
import { t as CurveFlow } from "./particles-DYsHC89-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-CvmOYu_a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ring(y, rx, rz, n, tilt = 0) {
	const pts = [];
	for (let i = 0; i <= n; i++) {
		const a = i / n * Math.PI * 2 + tilt;
		pts.push([
			Math.cos(a) * rx,
			y + Math.sin(a * 2) * .05,
			Math.sin(a) * rz
		]);
	}
	return pts;
}
function Swatch({ pos, color, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: pos,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			.22,
			.22,
			.22
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .4,
			metalness: .06
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				.28,
				0
			],
			text: label,
			occlude: false
		})]
	});
}
function Conveyor() {
	useLabTick(1 / 28);
	const rad = useQuality().particles > 12 ? 10 : 8;
	const surface = (0, import_react.useMemo)(() => ring(.62, 2.22, 1.15, 56, .15), []);
	const deep = (0, import_react.useMemo)(() => ring(-.58, 2.05, 1.02, 56, .15), []);
	const sink = (0, import_react.useMemo)(() => [
		[
			.15,
			.68,
			-1.12
		],
		[
			.12,
			.22,
			-1.08
		],
		[
			.08,
			-.18,
			-1.02
		],
		[
			.02,
			-.58,
			-.95
		]
	], []);
	const upwell = (0, import_react.useMemo)(() => [
		[
			-.15,
			-.58,
			.98
		],
		[
			-.12,
			-.15,
			1.02
		],
		[
			-.08,
			.28,
			1.08
		],
		[
			-.04,
			.64,
			1.12
		]
	], []);
	const surfaceTube = (0, import_react.useMemo)(() => tubeGeometry(surface, .055, 56, rad), [surface, rad]);
	const deepTube = (0, import_react.useMemo)(() => tubeGeometry(deep, .07, 56, rad), [deep, rad]);
	const sinkTube = (0, import_react.useMemo)(() => tubeGeometry(sink, .08, 24, rad), [sink, rad]);
	const upTube = (0, import_react.useMemo)(() => tubeGeometry(upwell, .06, 24, rad), [upwell, rad]);
	const surfaceVec = (0, import_react.useMemo)(() => surface.map((p) => new Vector3(...p)), [surface]);
	const deepVec = (0, import_react.useMemo)(() => deep.map((p) => new Vector3(...p)), [deep]);
	const sun = (0, import_react.useMemo)(() => new Vector3(2.4, .5, 1.6), []);
	const nadw = (0, import_react.useMemo)(() => latLonToVector3(62, -30, 1.04), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			scale: .72,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, { sunDirection: sun }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: nadw,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.05,
						12,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#102438" })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: surfaceTube,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#4a8aaa",
				roughness: .32,
				metalness: .08
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: deepTube,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#0d2438",
				roughness: .45,
				metalness: .06
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: sinkTube,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#102438",
				roughness: .4,
				metalness: .05
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: upTube,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#2a628c",
				roughness: .35,
				metalness: .07
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				.15,
				.82,
				-1.12
			],
			to: [
				.04,
				-.62,
				-.95
			],
			color: "#14344a",
			radius: .055
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				-.15,
				-.62,
				.98
			],
			to: [
				-.04,
				.78,
				1.14
			],
			color: "#3EE0C6",
			radius: .04
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: surfaceVec,
			color: "#E8B86D",
			count: 8,
			radius: .03
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: deepVec,
			color: "#7FD4FF",
			count: 8,
			radius: .028
		})
	] });
}
function ThermohalineScene() {
	const q = useQuality();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "thermohaline",
		title: "Thermohaline conveyor",
		camera: {
			position: [
				.2,
				1.7,
				6.4
			],
			fov: 40
		},
		liveText: "Schematic conveyor. Cold salty NADW sinks in the North Atlantic. Centuries, not a day.",
		exaggeration: "Schematic — density colour, not a pipe you can visit.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "thermohaline",
			title: "Thermohaline",
			caption: "Schematic: cold salty water sinks, deep return, Indo-Pacific upwell. Centuries."
		}),
		minDistance: 3,
		maxDistance: 14,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
				attach: "fog",
				args: [
					"#07090C",
					14,
					28
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				position: [
					0,
					-.02,
					0
				],
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [7, q.lathe] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0e1412",
					roughness: .96
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Conveyor, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swatch, {
				pos: [
					-3.15,
					.22,
					1.6
				],
				color: "#4a8aaa",
				label: "warm / light"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swatch, {
				pos: [
					-2.7,
					.22,
					1.6
				],
				color: "#0d2438",
				label: "cold-saline"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					.2,
					1.15,
					-1.35
				],
				text: "NADW sink · cold-saline",
				tone: "ice"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					-.1,
					1.05,
					1.4
				],
				text: "Indo-Pacific upwell",
				tone: "glacier"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					2.15,
					-.35,
					.2
				],
				text: "deep return",
				tone: "ice"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					0,
					1.85,
					0
				],
				text: "centuries, not a day",
				tone: "sandstone"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
				pos: [
					0,
					2.45,
					0
				],
				children: "Schematic · density (cold-saline darker) · NADW dives, then a slow global return"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
				[
					.2,
					1.7,
					6.4
				],
				[
					1.6,
					.9,
					4.4
				],
				[
					-1.4,
					1.2,
					4.6
				],
				[
					.2,
					1.7,
					6.4
				]
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.01,
					8,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: PBR.water.color })]
			})
		]
	});
}
//#endregion
export { ThermohalineScene as default };
