import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, R as Vector3, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, o as useSoilNormal, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { n as heightGeometry } from "./terrain-CZC6vZE1.mjs";
import { t as CurveFlow } from "./particles-DYsHC89-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-Bn_yQEa1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function landH(x, z) {
	const shore = 1 / (1 + Math.exp(-(x + 1.35) * 3.2));
	const mt = 1.95 * Math.exp(-((x - 2.55) ** 2 + (z + .85) ** 2) / 1.45);
	const hills = .16 * Math.sin(x * 1.15) * Math.sin(z * 1.35) * shore;
	const lake = -.28 * Math.exp(-((x - .35) ** 2 + (z - .75) ** 2) / .42);
	const res = -.22 * Math.exp(-((x - 1.45) ** 2 + (z - 1.4) ** 2) / .2);
	return shore * .32 + mt + hills + lake + res;
}
function Terrain() {
	const q = useQuality();
	const nrm = useSoilNormal();
	const rock = useRockNormal();
	const geom = (0, import_react.useMemo)(() => heightGeometry(landH, {
		width: 10.4,
		depth: 6.6,
		segX: q.terrain,
		segZ: Math.floor(q.terrain / 2),
		colorFn: (h) => {
			const c = new Color();
			if (h < .08) c.set("#3d5340");
			else if (h < .65) c.set(PBR.crust.color);
			else if (h < 1.35) c.set("#8a7a48");
			else c.set("#d8d0c0");
			return c;
		}
	}), [q.terrain]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		geometry: geom,
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		receiveShadow: true,
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			vertexColors: true,
			roughness: .92,
			metalness: .02,
			normalMap: nrm,
			normalScale: new Vector2(.55, .55)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			position: [
				2.55,
				.85,
				1.55
			],
			visible: false,
			"material-normalMap": rock
		})]
	});
}
function Stores() {
	const abs = useLabControls((s) => s.params.abstraction ?? 0);
	const basin = (useLabControls((s) => s.params.basin) ?? 0) > .5;
	const lakeH = .22 - abs * .08;
	const resH = .38 - abs * .32;
	const q = useQuality();
	const rock = useRockNormal();
	const evap = (0, import_react.useMemo)(() => [
		new Vector3(-3.15, .22, .15),
		new Vector3(-2.1, 1.35, .05),
		new Vector3(-.4, 2.45, -.15),
		new Vector3(.6, 2.7, -.2)
	], []);
	const precip = (0, import_react.useMemo)(() => [
		new Vector3(.7, 2.65, -.15),
		new Vector3(1.7, 2.4, -.5),
		new Vector3(2.45, 2.05, -.75)
	], []);
	const melt = (0, import_react.useMemo)(() => [
		new Vector3(2.2, 1.55, -.45),
		new Vector3(1.5, .85, .15),
		new Vector3(.45, .28, .7)
	], []);
	const infiltrate = (0, import_react.useMemo)(() => [
		new Vector3(.4, .18, .7),
		new Vector3(.15, -.12, .55),
		new Vector3(-.6, -.28, .2)
	], []);
	const gw = (0, import_react.useMemo)(() => [
		new Vector3(-.55, -.28, .15),
		new Vector3(-1.6, -.32, .05),
		new Vector3(-2.7, -.18, .1),
		new Vector3(-3.1, .05, .12)
	], []);
	const transpire = (0, import_react.useMemo)(() => [
		new Vector3(2.05, 1.05, 1.15),
		new Vector3(1.4, 1.85, .55),
		new Vector3(.55, 2.55, .05)
	], []);
	const runoff = (0, import_react.useMemo)(() => [
		new Vector3(1.45, .12 + resH, 1.35),
		new Vector3(.9, .22, 1),
		new Vector3(.4, .2, .75)
	], [resH]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-3.25,
				-.42,
				.1
			],
			rotation: [
				0,
				0,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				1.85,
				2.05,
				.85,
				32,
				1,
				true
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.rock.color,
				roughness: .94,
				metalness: .04,
				side: 2,
				normalMap: rock,
				normalScale: new Vector2(.7, .7)
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-3.25,
				-.84,
				.1
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				2.05,
				2.05,
				.08,
				32
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.basalt.color,
				roughness: .9
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-3.25,
				-.18,
				.1
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				1.72,
				1.72,
				.62,
				q.lathe
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.water.color,
				roughness: PBR.water.roughness,
				metalness: PBR.water.metalness,
				transparent: true,
				opacity: .86
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.2,
				.05,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				4.15,
				48,
				24,
				0,
				Math.PI * 2,
				0,
				Math.PI * .52
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#7FD4FF",
				transparent: true,
				opacity: .07,
				roughness: .15,
				metalness: .02,
				side: 2,
				depthWrite: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				2.55,
				1.72,
				-.85
			],
			rotation: [
				.12,
				.2,
				-.08
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.62,
				20,
				16,
				0,
				Math.PI * 2,
				0,
				Math.PI * .72
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.ice.color,
				roughness: PBR.ice.roughness,
				metalness: PBR.ice.metalness,
				transparent: true,
				opacity: .58
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				2.35,
				1.35,
				-.55
			],
			rotation: [
				.55,
				.1,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.28,
				.42,
				.7,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.ice.color,
				roughness: PBR.ice.roughness,
				metalness: PBR.ice.metalness,
				transparent: true,
				opacity: .5
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.85,
				.02,
				2.05
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				3.6,
				.22,
				.55
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.soil.color,
				roughness: PBR.soil.roughness,
				metalness: PBR.soil.metalness
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.55,
				-.28,
				1.55
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				3.2,
				.42,
				1.4
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#2a5a6a",
				roughness: .35,
				metalness: .06,
				transparent: true,
				opacity: .55
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.35,
				lakeH * .5,
				.75
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.62,
				.68,
				Math.max(.06, lakeH),
				24
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.water.color,
				roughness: PBR.water.roughness,
				metalness: PBR.water.metalness
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				1.45,
				resH * .5 + .02,
				1.38
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.42,
				.48,
				Math.max(.05, resH),
				20
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.water.color,
				roughness: PBR.water.roughness,
				metalness: PBR.water.metalness
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				1.45,
				.01,
				1.38
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				.48,
				.56,
				20
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#8B9A97",
				side: 2,
				roughness: .8
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				2.05,
				.55,
				1.15
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.05,
				.08,
				.7,
				6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#4a3a2a",
				roughness: .9
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				2.05,
				1.05,
				1.15
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.32,
				12,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3d6a40",
				roughness: .85
			})]
		}),
		basin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				.85,
				.12,
				.55
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				.35,
				2.35,
				48,
				1,
				.15,
				Math.PI * 1.55
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3EE0C6",
				transparent: true,
				opacity: .22,
				side: 2,
				roughness: .4,
				depthWrite: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: evap,
			color: "#7FD4FF",
			count: 12,
			radius: .04
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: precip,
			color: "#F4EFE6",
			count: 10,
			radius: .04
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: melt,
			color: "#3EE0C6",
			count: 8,
			radius: .038
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: infiltrate,
			color: "#E8B86D",
			count: 7,
			radius: .035
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: gw,
			color: "#8B9A97",
			count: 8,
			radius: .035
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: transpire,
			color: "#7C9A6A",
			count: 7,
			radius: .032
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
			pts: runoff,
			color: "#7FD4FF",
			count: 6,
			radius: .032
		})
	] });
}
function Model() {
	useLabTick(1 / 10);
	const abs = useLabControls((s) => s.params.abstraction ?? 0);
	const basin = (useLabControls((s) => s.params.basin) ?? 0) > .5;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terrain, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stores, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-3.25,
				.85,
				.2
			],
			text: "Ocean basin",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.6,
				3.05,
				-.2
			],
			text: "Atmosphere shell",
			tone: "glacier"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.55,
				2.45,
				-.85
			],
			text: "Ice sheet",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.55,
				.15,
				2.15
			],
			text: "Groundwater"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.85,
				.45,
				2.05
			],
			text: "Soil",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.35,
				.55,
				.75
			],
			text: "Lake",
			tone: "glacier"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.45,
				.7,
				1.38
			],
			text: "Reservoir",
			tone: "moss"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.05,
				1.55,
				1.15
			],
			text: "Transpiration",
			tone: "moss"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				3.45,
				0
			],
			children: [
				"Closed globally · local deficit ",
				Math.round(abs * 100),
				"%",
				basin ? " · basin overlay on" : ""
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.3,
				3.8,
				8.2
			],
			[
				-3.4,
				2.2,
				5.4
			],
			[
				2.4,
				2.8,
				5.6
			],
			[
				.3,
				3.8,
				8.2
			]
		] })
	] });
}
function WaterCycleScene() {
	const abs = useLabControls((s) => s.params.abstraction ?? 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "water-cycle",
		title: "Water cycle stores and flows",
		camera: {
			position: [
				.3,
				3.8,
				8.2
			],
			fov: 40
		},
		liveText: `Water cycle. Abstraction ${Math.round(abs * 100)}% lowers the reservoir, not the ocean.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "water-cycle",
			title: "Water cycle",
			caption: "Stores as volumes. Abstraction mines the local reservoir."
		}),
		minDistance: 3.2,
		maxDistance: 16,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#07090C",
				14,
				28
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})]
	});
}
//#endregion
export { WaterCycleScene as default };
