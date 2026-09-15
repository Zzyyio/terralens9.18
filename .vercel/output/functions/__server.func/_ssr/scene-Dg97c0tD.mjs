import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, o as useSoilNormal, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, f as WaterSheet, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { r as latheGeometry, t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-Dg97c0tD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tint = new Color();
var HEADS = [
	-4.15,
	-1.38,
	1.38,
	4.15
];
var STAGES = [
	"Cave",
	"Arch",
	"Stack",
	"Stump"
];
function coastH(x, z, wave) {
	let h = .03 + .5 * (1 + Math.tanh(z * 2.4)) * .16;
	h += (1 - wave) * .13 * Math.exp(-((z - .38) ** 2) / .048);
	const cliff = .5 * (1 + Math.tanh((z - (.95 + wave * .12)) * 9));
	h += cliff * (.32 + wave * .5);
	for (const hx of HEADS) {
		const head = Math.exp(-((x - hx) ** 2) / .26) * Math.exp(-((z - .12) ** 2) / .85);
		h += (.5 + wave * .18) * head * Math.max(.15, .9 - Math.max(0, -z) * .45);
	}
	if (z < -.15) h = Math.min(h, .02 + Math.max(0, .08 + z * .04));
	return Math.max(.01, h);
}
function coastColor(h) {
	if (h < .06) return tint.set(PBR.water.color);
	if (h < .22) return tint.set(PBR.sand.color);
	if (h < .55) return tint.set("#8a6a48");
	return tint.set(PBR.rock.color);
}
function pillar(h, r, segs) {
	return latheGeometry([
		[.01, h],
		[r * .52, h * .94],
		[r * .68, h * .55],
		[r * .92, h * .12],
		[r, 0]
	], segs);
}
function Model() {
	const q = useQuality();
	const rock = useRockNormal();
	const soil = useSoilNormal();
	const nrm = (0, import_react.useMemo)(() => new Vector2(.6, .6), []);
	const waveP = useLabControls((s) => s.params.wave);
	const cons = useLabControls((s) => s.params.constructive);
	const stage = Math.round(useLabControls((s) => s.params.stage ?? 1));
	const wave = waveP ?? ((cons ?? 1) > .5 ? 0 : 1);
	const fn = (0, import_react.useMemo)(() => (x, y) => coastH(x, y, wave), [wave]);
	const segs = q.lathe;
	const stack = (0, import_react.useMemo)(() => pillar(.95, .22, segs), [segs]);
	const stump = (0, import_react.useMemo)(() => pillar(.22, .26, segs), [segs]);
	const leg = (0, import_react.useMemo)(() => pillar(.62, .16, segs), [segs]);
	const till = wave > .5;
	const vScale = useLabControls((s) => s.trueScale) ? 1 / 6 : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 14 }),
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [9.5, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#121814",
				roughness: .96,
				normalMap: soil,
				normalScale: nrm
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn,
			width: 11.2,
			depth: 5.6,
			segX: q.terrain,
			segZ: Math.floor(q.terrain * .5),
			colorFn: coastColor,
			vScale
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				0,
				0,
				-1.55
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterSheet, {
				width: 11,
				depth: 2.4,
				y: .016,
				opacity: .76
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				HEADS[0],
				.32,
				-.42
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.16,
				.2,
				.38,
				Math.max(16, Math.floor(segs / 4))
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#07090C",
				roughness: .95
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				HEADS[1],
				0,
				-.55
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: leg,
					position: [
						-.28,
						0,
						0
					],
					castShadow: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						...PBR.rock,
						normalMap: rock,
						normalScale: nrm
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: leg,
					position: [
						.28,
						0,
						0
					],
					castShadow: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						...PBR.rock,
						normalMap: rock,
						normalScale: nrm
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.68,
						0
					],
					rotation: [
						0,
						0,
						Math.PI / 2
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
						.3,
						.11,
						14,
						segs,
						Math.PI
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						...PBR.rock,
						normalMap: rock,
						normalScale: nrm
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: stack,
			position: [
				HEADS[2],
				.02,
				-.78
			],
			castShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				...PBR.rock,
				normalMap: rock,
				normalScale: nrm
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: stump,
			position: [
				HEADS[3],
				.02,
				-.92
			],
			castShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#8B9A97",
				roughness: .9,
				metalness: .04,
				normalMap: rock,
				normalScale: nrm
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				-3.5,
				.28,
				.42
			],
			to: [
				3.6,
				.24,
				.12
			],
			color: "#3EE0C6",
			radius: .028
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				HEADS[0],
				1.25,
				.2
			],
			text: "Cave",
			tone: "sandstone",
			note: "Waves excavate a weakness. Same rock as the arch, stack and stump."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				HEADS[1],
				1.15,
				.15
			],
			text: "Arch",
			tone: "sandstone",
			note: "Two caves meet. The roof is still the headland."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				HEADS[2],
				1.25,
				-.6
			],
			text: "Stack",
			note: "The roof collapsed. A pillar of the same rock stands off the cliff."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				HEADS[3],
				.55,
				-.7
			],
			text: "Stump",
			note: "The stack has fallen. A stump is the last of the headland."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				.55,
				.55
			],
			text: "Longshore drift",
			tone: "glacier",
			note: "Swash at an angle, backwash down the slope. Sediment walks along the beach."
		}),
		till && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				2.2,
				1.05,
				1.15
			],
			text: "Till · Holderness",
			tone: "moss",
			note: "Glacial mud-gravel. Soft cliff, southward drift, Spurn Head spit."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				.42,
				-1.7
			],
			text: wave < .5 ? "Constructive · berm" : "Destructive · cut cliff",
			tone: "ice",
			note: wave < .5 ? "Low steepness: swash stronger than backwash. Beach builds." : "Steep storm waves: backwash strips the beach and undercuts the cliff."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.55,
				0
			],
			children: [
				"Wave ",
				wave < .5 ? "constructive" : "destructive",
				" · stage ",
				STAGES[Math.min(3, Math.max(0, stage))],
				" · cave→stump"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.2,
				3.6,
				8.2
			],
			[
				HEADS[Math.min(3, Math.max(0, stage))],
				2.2,
				4.6
			],
			[
				.2,
				2.4,
				5.2
			],
			[
				3.2,
				2.6,
				5.8
			]
		] })
	] });
}
function CoastsScene() {
	const waveP = useLabControls((s) => s.params.wave);
	const cons = useLabControls((s) => s.params.constructive);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "coasts",
		title: "Coasts",
		camera: {
			position: [
				.2,
				3.6,
				8.2
			],
			fov: 40
		},
		exaggeration: "Vertical exaggeration ×6 · headland life and the beach budget",
		liveText: `Coast. ${(waveP ?? ((cons ?? 1) > .5 ? 0 : 1)) < .5 ? "Constructive waves build a berm." : "Destructive waves cut the cliff."} Cave, arch, stack, stump.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "coasts",
			title: "Coasts",
			caption: "Headland stages cave–arch–stack–stump. Constructive berm vs destructive cliff. Longshore drift."
		}),
		minDistance: 3,
		maxDistance: 16,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#07090C",
				12,
				26
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})]
	});
}
//#endregion
export { CoastsScene as default };
