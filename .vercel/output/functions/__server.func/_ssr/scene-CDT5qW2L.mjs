import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { r as latheGeometry } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-CDT5qW2L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Granite() {
	const q = useQuality();
	const nrm = useRockNormal();
	const nrmScale = (0, import_react.useMemo)(() => new Vector2(.55, .55), []);
	const crystals = (0, import_react.useMemo)(() => {
		const out = [];
		for (let i = 0; i < 16; i++) {
			const a = i * 2.21;
			out.push({
				p: [
					Math.sin(a) * .34,
					.08 + i % 5 * .1,
					Math.cos(a * 1.17) * .3
				],
				s: .11 + i % 4 * .028,
				r: [
					i * .41,
					i * .73,
					i * .19
				]
			});
		}
		return out;
	}, []);
	const plug = (0, import_react.useMemo)(() => latheGeometry([
		[.001, .55],
		[.22, .48],
		[.42, .22],
		[.5, .02],
		[.55, 0]
	], q.lathe), [q.lathe]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: plug,
		castShadow: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: PBR.granite.color,
			roughness: PBR.granite.roughness,
			metalness: PBR.granite.metalness,
			normalMap: nrm,
			normalScale: nrmScale
		})
	}), crystals.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: c.p,
		rotation: c.r,
		scale: c.s,
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dodecahedronGeometry", { args: [1, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: i % 3 === 0 ? "#d4c4b4" : PBR.granite.color,
			roughness: .62,
			metalness: .08
		})]
	}, i))] });
}
function Beds({ foliated }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: [
		0,
		1,
		2,
		3,
		4
	].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			foliated ? Math.sin(i * .9) * .06 : 0,
			i * .09 - .18,
			0
		],
		rotation: [
			0,
			foliated ? .15 : 0,
			foliated ? .42 + i * .05 : 0
		],
		scale: foliated ? [
			1.4,
			1,
			.52
		] : [
			1,
			1,
			1
		],
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			.95,
			.08,
			.72,
			8,
			1,
			6
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: foliated ? i % 2 ? "#8B9A97" : "#6a6560" : i % 2 ? PBR.limestone.color : PBR.sand.color,
			roughness: foliated ? .78 : i % 2 ? PBR.limestone.roughness : PBR.sand.roughness,
			metalness: .04
		})]
	}, i)) });
}
function Model() {
	useLabTick(1 / 10);
	const t = useLabControls((s) => s.t);
	const temp = useLabControls((s) => s.params.temp ?? .3);
	const pressure = useLabControls((s) => s.params.pressure ?? .3);
	const heat = (temp + pressure) * .5;
	const melt = heat > .42;
	const weather = heat < .58;
	const q = useQuality();
	const magmaGlow = .35 + heat * .55 + Math.sin(t * Math.PI * 2) * .12;
	const hot = "#FF6A3D";
	const cool = "#3EE0C6";
	const dim = "#3a4240";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-.55,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.42,
				q.sphere,
				q.sphere
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.magma.color,
				emissive: PBR.magma.emissive,
				emissiveIntensity: magmaGlow,
				roughness: PBR.magma.roughness,
				metalness: PBR.magma.metalness
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				0,
				1.22,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Granite, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				1.62,
				.22,
				.18
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Beds, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				-1.62,
				.22,
				-.12
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Beds, { foliated: true })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				.45,
				1.15,
				0
			],
			to: [
				1.35,
				.55,
				.12
			],
			color: weather ? cool : dim
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				1.35,
				.12,
				.12
			],
			to: [
				.4,
				.85,
				0
			],
			color: melt ? hot : dim
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				1.2,
				.35,
				.1
			],
			to: [
				-1.15,
				.35,
				-.08
			],
			color: melt ? hot : dim
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				-1.15,
				.12,
				-.08
			],
			to: [
				1.2,
				.12,
				.1
			],
			color: weather ? cool : dim
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				-.45,
				1.15,
				0
			],
			to: [
				-1.25,
				.55,
				-.08
			],
			color: melt ? hot : dim
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				-1.25,
				.12,
				-.08
			],
			to: [
				-.35,
				.85,
				0
			],
			color: melt ? hot : dim
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				0,
				.05,
				0
			],
			to: [
				0,
				.85,
				0
			],
			color: melt ? hot : dim
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				1.95,
				0
			],
			text: "Igneous · granite",
			tone: "magma",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.62,
				.95,
				.18
			],
			text: "Sedimentary · beds",
			tone: "sandstone",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-1.62,
				.95,
				-.12
			],
			text: "Metamorphic · foliated",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				-.05,
				.55
			],
			text: "Magma",
			tone: "magma",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.65,
				0
			],
			children: [
				"T ",
				temp.toFixed(2),
				" · P ",
				pressure.toFixed(2),
				" · arrows loop both ways, not a ladder"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				2.7,
				6.4
			],
			[
				.1,
				1.9,
				3.8
			],
			[
				2.1,
				1.5,
				4.4
			],
			[
				-2.1,
				1.45,
				4.3
			]
		] })
	] });
}
function RockCycleScene() {
	const temp = useLabControls((s) => s.params.temp ?? .3);
	const pressure = useLabControls((s) => s.params.pressure ?? .3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "rock-cycle",
		title: "Rock cycle",
		camera: {
			position: [
				0,
				2.7,
				6.4
			],
			fov: 40
		},
		liveText: `Rock cycle. Temperature ${temp.toFixed(2)}, pressure ${pressure.toFixed(2)}. Heat biases melt and metamorphism.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "rock-cycle",
			title: "Rock cycle",
			caption: "Igneous, sedimentary, metamorphic. Arrows loop both ways."
		}),
		minDistance: 2.6,
		maxDistance: 14,
		target: [
			0,
			.5,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { RockCycleScene as default };
