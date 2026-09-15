import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, D as Plane, R as Vector3, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, c as SceneToggles, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, s as SceneBtn, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry, r as latheGeometry } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-yY7FRCqo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cycloneProfile(comma) {
	const h = MathUtils.lerp(1.42, .46, comma);
	const well = MathUtils.lerp(.1, .2, comma);
	return [
		[.001, well],
		[.16, well * .8],
		[.26, h],
		[.5, h * .78],
		[1.05, h * .36],
		[1.72, h * .14],
		[2.2, .05]
	];
}
function bandPts(arm, comma) {
	const pts = [];
	const off = arm / 3 * Math.PI * 2;
	for (let i = 0; i <= 48; i++) {
		const u = i / 48;
		const a = off + u * Math.PI * (1.75 + comma * .5);
		const r = .5 + u * (1.85 + comma * .7);
		const y = .38 + (1 - u) * .58 * (1 - comma * .72);
		const cx = comma * u * u * 1.25;
		pts.push([
			Math.cos(a) * r + cx,
			y,
			Math.sin(a) * r * (1 + comma * .4)
		]);
	}
	return pts;
}
function Storm() {
	useLabTick(1 / 9);
	const t = useLabControls((s) => s.t);
	const uk = (useLabControls((s) => s.params.uk) ?? 0) > .5;
	const intensity = useLabControls((s) => s.params.intensity ?? .7);
	const slice = useLabControls((s) => s.slice);
	const q = useQuality();
	const comma = uk ? 1 : 0;
	const plane = (0, import_react.useMemo)(() => new Plane(new Vector3(1, 0, 0), 0), []);
	plane.constant = (slice - .5) * 3.2;
	const clip = slice > .02 ? [plane] : [];
	const lathe = (0, import_react.useMemo)(() => latheGeometry(cycloneProfile(comma), q.lathe), [comma, q.lathe]);
	const bands = (0, import_react.useMemo)(() => [
		0,
		1,
		2
	].map((arm) => tubeGeometry(bandPts(arm, comma), .055 + intensity * .025, 64, 12)), [comma, intensity]);
	const frontCold = (0, import_react.useMemo)(() => tubeGeometry(Array.from({ length: 18 }, (_, i) => {
		const u = i / 17;
		return [
			.4 + u * 2.1,
			.22,
			-.15 - u * .85
		];
	}), .04, 24, 12), []);
	const frontWarm = (0, import_react.useMemo)(() => tubeGeometry(Array.from({ length: 18 }, (_, i) => {
		const u = i / 17;
		return [
			.35 + u * 1.9,
			.2,
			.2 + u * 1.05
		];
	}), .045, 24, 12), []);
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
				.01,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [3.4, q.lathe] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.water.color,
				roughness: PBR.water.roughness,
				metalness: PBR.water.metalness
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
				.03,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.55, 32] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3EE0C6",
				emissive: uk ? "#1a4a6e" : "#ff6a3d",
				emissiveIntensity: uk ? .05 : .55 + intensity * .35,
				roughness: .2
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			rotation: [
				0,
				t * Math.PI * 2,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: lathe,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e8eef2",
					roughness: .88,
					metalness: .02,
					transparent: true,
					opacity: .78,
					side: 2,
					clippingPlanes: clip
				})
			}), bands.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: g,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cfd8de",
					roughness: .86,
					transparent: true,
					opacity: .7,
					clippingPlanes: clip
				})
			}, i))]
		}),
		uk && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: frontCold,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#7FD4FF",
				roughness: .35,
				emissive: "#7FD4FF",
				emissiveIntensity: .2
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: frontWarm,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#FF6A3D",
				roughness: .35,
				emissive: "#FF6A3D",
				emissiveIntensity: .2
			})
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				uk ? .85 : 1.72,
				0
			],
			text: uk ? "not a hurricane" : "Eye",
			tone: uk ? "sandstone" : "chalk",
			occlude: false,
			note: uk ? "A UK winter storm is a midlatitude cyclone with fronts. Not Saffir–Simpson." : "Calm, warm, sinking air. The hole is not the damage."
		}),
		!uk && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.55,
				1.15,
				.2
			],
			text: "Eyewall",
			tone: "fault",
			occlude: false,
			note: "Ring of strongest wind and rain. Slice (X) to see the wall in section."
		}),
		!uk && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.7,
				.75,
				.4
			],
			text: "Rainbands",
			tone: "ice",
			occlude: false,
			note: "Spiral feeder bands. Intensity slider tightens the comma."
		}),
		!uk && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				.22,
				.9
			],
			text: "Warm sea = fuel",
			tone: "magma",
			occlude: false,
			note: "Warm ocean and low shear. Cut the heat and the machine dies."
		}),
		uk && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.6,
				.55,
				-.7
			],
			text: "Cold front",
			tone: "ice",
			occlude: false,
			note: "A wedge, not an eyewall. See the Fronts lab."
		}),
		uk && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.5,
				.55,
				.9
			],
			text: "Warm front",
			tone: "magma",
			occlude: false,
			note: "Warm air overrunning. This is extra-tropical, not a tropical cyclone."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				2.45,
				0
			],
			children: uk ? "Comma-shaped mid-latitude low · fronts, not an eyewall" : `Tropical cyclone · intensity ${intensity.toFixed(2)} · play spins the spiral`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				4.1,
				6.2
			],
			[
				.12,
				.85,
				1.55
			],
			[
				1.35,
				1.7,
				3.2
			],
			[
				0,
				3.5,
				5.4
			]
		] })
	] });
}
function TropicalCycloneScene() {
	const uk = (useLabControls((s) => s.params.uk) ?? 0) > .5;
	const setParam = useLabControls((s) => s.setParam);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "tropical-cyclone",
		title: "Tropical cyclone",
		camera: {
			position: [
				0,
				4.1,
				6.2
			],
			fov: 40
		},
		liveText: uk ? "Not a hurricane: a comma-shaped mid-latitude low with fronts." : "Eye, eyewall, rainbands. Warm sea is the fuel.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "tropical-cyclone",
			title: "Tropical cyclone",
			caption: "Eye, eyewall, spiral rainbands over a warm sea."
		}),
		minDistance: 1.4,
		maxDistance: 14,
		target: [
			0,
			.55,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Storm, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneToggles, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneBtn, {
		active: uk,
		onClick: () => setParam("uk", uk ? 0 : 1),
		children: uk ? "UK low" : "Hurricane"
	}) })] });
}
//#endregion
export { TropicalCycloneScene as default };
