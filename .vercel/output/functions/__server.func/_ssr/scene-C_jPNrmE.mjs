import { i as __toESM } from "../_runtime.mjs";
import { N as Shape, R as Vector3, _ as ExtrudeGeometry, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry, t as HeightField } from "./terrain-CZC6vZE1.mjs";
import { t as CurveFlow } from "./particles-DYsHC89-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-C_jPNrmE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function hillH(x, y) {
	const slope = .62 - x * .1;
	const channel = .26 * Math.exp(-(y * y) / .11);
	const und = .07 * Math.sin(x * 1.7) * Math.cos(y * 2.1);
	return Math.max(.03, slope + und - channel);
}
function hillColor(urban) {
	const rural = new Color(PBR.crust.color);
	const paved = new Color("#3a4044");
	return (h) => {
		const c = rural.clone().lerp(paved, urban);
		if (h < .22) c.lerp(new Color(PBR.water.color), .45);
		return c;
	};
}
function dischargeAt(u, urban, rain = 1) {
	const lag = .4 - urban * .2;
	const peak = (.52 + urban * 1.08) * rain;
	if (u < .08) return .08;
	if (u < lag) {
		const k = (u - .08) / (lag - .08);
		return .08 + (peak - .08) * k ** 1.2;
	}
	return Math.max(.08, peak * Math.exp(-(u - lag) * (2.05 - urban * .65)));
}
function Rain({ t, count }) {
	const seeds = (0, import_react.useMemo)(() => {
		const a = [];
		for (let i = 0; i < count; i++) a.push([
			-1.55 + i % 8 * .4,
			2.15,
			-.95 + Math.floor(i / 8) * .38
		]);
		return a;
	}, [count]);
	if (t >= .35) return null;
	const fall = t / .35;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: seeds.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			p[0],
			p[1] - fall * 1.85 - i % 5 * .04,
			p[2]
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			.028,
			10,
			10
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#7FD4FF" })]
	}, i)) });
}
function Model() {
	useLabTick(1 / 8);
	const t = useLabControls((s) => s.t);
	const urban = useLabControls((s) => s.params.urban ?? .2);
	const rain = useLabControls((s) => s.params.rain ?? 1);
	const q = useQuality();
	const rock = useRockNormal();
	const lag = .4 - urban * .2;
	const peak = (.52 + urban * 1.08) * rain;
	const qNow = dischargeAt(t, urban, rain);
	const colorFn = (0, import_react.useMemo)(() => hillColor(urban), [urban]);
	const segs = Math.max(32, Math.floor(q.terrain / 4));
	const channel = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let i = 0; i <= 32; i++) {
			const u = i / 32;
			const x = -1.7 + u * 3.4;
			const z = Math.sin(u * 2.2) * .08;
			pts.push([
				x,
				hillH(x, z) + .04,
				z
			]);
		}
		return pts;
	}, []);
	const chTube = (0, import_react.useMemo)(() => tubeGeometry(channel, .045, 32, 10), [channel]);
	const chVec = (0, import_react.useMemo)(() => channel.map((p) => new Vector3(...p)), [channel]);
	const graph = (0, import_react.useMemo)(() => {
		const shape = new Shape();
		shape.moveTo(0, .04);
		for (let i = 0; i <= 48; i++) {
			const u = i / 48;
			shape.lineTo(u * 4.2, .04 + dischargeAt(u, urban, rain) * 1.35);
		}
		shape.lineTo(4.2, .04);
		shape.closePath();
		const g = new ExtrudeGeometry(shape, {
			depth: .22,
			bevelEnabled: false,
			steps: 1
		});
		g.translate(-2.1, 0, -.11);
		g.computeVertexNormals();
		return g;
	}, [urban, rain]);
	const gx = -2.1 + t * 4.2;
	const gy = .04 + qNow * 1.35;
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
				-.03,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [7, q.lathe] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#121814",
				roughness: .96,
				normalMap: rock
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				-1.15,
				0,
				-.35
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
					fn: hillH,
					width: 4.2,
					depth: 2.6,
					segX: segs,
					segZ: Math.floor(segs * .7),
					colorFn
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: chTube,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: PBR.water.color,
						roughness: PBR.water.roughness,
						metalness: PBR.water.metalness
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurveFlow, {
					pts: chVec,
					color: "#7FD4FF",
					count: 8,
					radius: .028
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rain, {
					t,
					count: Math.max(16, q.particles * 2)
				}),
				urban > .5 && [
					-1.1,
					-.35,
					.4
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						x,
						.42,
						.55
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.42,
						.38,
						.36
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#2a3034",
						roughness: .55,
						metalness: .14
					})]
				}, x)),
				urban <= .5 && [
					-.9,
					.15,
					.85
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						x,
						.48,
						.7
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
						.16,
						.48,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#3d6a40",
						roughness: .86
					})]
				}, x))
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				2.05,
				.15,
				.55
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: graph,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#3EE0C6",
						roughness: .38,
						metalness: .08,
						side: 2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						gx,
						gy + .08,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.08,
						12,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#FF6A3D" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.02,
						0
					],
					rotation: [
						0,
						0,
						Math.PI / 2
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.012,
						.012,
						4.4,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#8B9A97" })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-2.1 + lag * 4.2 + 2.05,
				.2 + peak * 1.35,
				.7
			],
			text: "peak",
			tone: "magma",
			note: "Peak discharge after the rain has stopped. Urban cover raises and advances the peak."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-.35,
				.55,
				1.15
			],
			text: "rising limb",
			tone: "glacier",
			note: "The rising limb. Rain plus urban cover steepens it."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.15,
				.42,
				.95
			],
			text: `lag ${(lag * 12).toFixed(1)} h`,
			note: "Lag from rain centroid to peak. Urban catchments lag less."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-2.2,
				1.35,
				-.2
			],
			text: urban > .5 ? "impermeable roofs" : "vegetated hill",
			tone: "moss",
			note: "Urban cover sheds water. Vegetation stores it. Rain slider is the input."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.65,
				0
			],
			children: [
				"Urban ",
				Math.round(urban * 100),
				"% · ",
				t < .35 ? "rain falling" : "catchment draining",
				" · peak ",
				urban > .5 ? "higher & earlier" : "later, lower"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.5,
				3.3,
				7.3
			],
			[
				-2.4,
				2.5,
				5.1
			],
			[
				2.4,
				2.2,
				5.2
			],
			[
				.5,
				3.3,
				7.3
			]
		] })
	] });
}
function HydrographScene() {
	const urban = useLabControls((s) => s.params.urban ?? .2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "hydrograph",
		title: "Storm hydrograph",
		camera: {
			position: [
				.5,
				3.3,
				7.3
			],
			fov: 40
		},
		liveText: `Storm hydrograph. Urban cover ${Math.round(urban * 100)}%. Rising limb, peak, lag, falling limb.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "hydrograph",
			title: "Hydrograph",
			caption: "Rain is the input. The river replies after a lag."
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
export { HydrographScene as default };
