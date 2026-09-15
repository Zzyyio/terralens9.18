import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-CvrglGTX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BEDS = [
	{
		color: PBR.sand.color,
		name: "Sandstone",
		h: .13
	},
	{
		color: PBR.limestone.color,
		name: "Limestone",
		h: .15
	},
	{
		color: PBR.soil.color,
		name: "Shale",
		h: .12
	},
	{
		color: PBR.granite.color,
		name: "Greywacke",
		h: .16
	},
	{
		color: PBR.basalt.color,
		name: "Basalt",
		h: .18
	}
];
function fold(x, y) {
	return Math.cos(x * .78) * .66 * (1 - y * y / 7.5);
}
var FNS = BEDS.map((_, i) => (x, y) => fold(x, y) + i * .128);
var COLFNS = BEDS.map((b) => {
	const c = new Color(b.color);
	return () => c;
});
function FoldStack() {
	const q = useQuality();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		BEDS.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn: FNS[i],
			width: 8.2,
			depth: 3.4,
			segX: q.terrain,
			segZ: Math.max(24, Math.floor(q.terrain / 6)),
			colorFn: COLFNS[i],
			position: [
				0,
				.04,
				0
			]
		}, b.name)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				1.45,
				0
			],
			text: "Anticline",
			tone: "moss",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				3.55,
				.55,
				0
			],
			text: "Syncline",
			tone: "sandstone",
			occlude: false
		})
	] });
}
function Wall({ shift, nrm }) {
	const placed = (0, import_react.useMemo)(() => {
		let acc = 0;
		return BEDS.map((b) => {
			const y = acc;
			acc += b.h;
			return {
				...b,
				y
			};
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: shift,
		children: placed.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				b.y + b.h / 2,
				0
			],
			castShadow: true,
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				1.35,
				b.h,
				1.7,
				18,
				4,
				14
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: b.color,
				roughness: .88,
				metalness: .04,
				normalMap: nrm,
				normalScale: new Vector2(.7, .7)
			})]
		}, b.name))
	});
}
function Fault({ kind, x, explode, nrm }) {
	const dip = .95;
	const throwN = .12 + explode * .42;
	const gap = .08 + explode * .55;
	const left = [
		-.7 - gap * .35,
		0,
		0
	];
	const right = kind === "normal" ? [
		.7 + gap * .35,
		-throwN,
		0
	] : kind === "reverse" ? [
		.7 + gap * .25,
		throwN,
		0
	] : [
		.7 + gap * .2,
		0,
		explode * .7
	];
	const label = kind === "normal" ? "Normal · hanging wall down" : kind === "reverse" ? "Reverse · hanging wall up" : "Strike-slip · lateral";
	const hwY = kind === "normal" ? .55 - throwN : kind === "reverse" ? .55 + throwN : .7;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			x,
			.08,
			3.35
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wall, {
				shift: left,
				nrm
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wall, {
				shift: right,
				nrm
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.05,
					.45,
					0
				],
				rotation: [
					0,
					0,
					kind === "strike" ? 0 : kind === "normal" ? -.95 : dip
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [
					1.9,
					1.35,
					12,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#E24B4B",
					transparent: true,
					opacity: .28,
					roughness: .5,
					side: 2
				})]
			}),
			kind !== "strike" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
				from: [
					.85,
					kind === "normal" ? .95 : .25,
					.2
				],
				to: [
					.85,
					kind === "normal" ? .25 : 1.05,
					.2
				],
				color: "#FF6A3D",
				radius: .022
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
				from: [
					.4,
					.85,
					-.4
				],
				to: [
					.4,
					.85,
					.85
				],
				color: "#E8B86D",
				radius: .022
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					.9,
					hwY + .35,
					.2
				],
				text: "Hanging wall",
				tone: "fault",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					-.85,
					.95,
					.2
				],
				text: "Footwall",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					0,
					1.45,
					0
				],
				text: label,
				tone: kind === "strike" ? "sandstone" : "magma",
				occlude: false
			})
		]
	});
}
function Stage() {
	const explode = useLabControls((s) => s.explode);
	const nrm = useRockNormal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 16 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoldStack, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fault, {
			kind: "normal",
			x: -3.3,
			explode,
			nrm
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fault, {
			kind: "reverse",
			x: 0,
			explode,
			nrm
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fault, {
			kind: "strike",
			x: 3.3,
			explode,
			nrm
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				2.45,
				0
			],
			children: "Beds bend as a sine fold — anticline up, syncline down · explode the three slips: hanging wall down, up, or sideways"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				4.2,
				9.2
			],
			[
				-3.2,
				2.4,
				7.4
			],
			[
				.2,
				2.5,
				7.2
			],
			[
				3.4,
				2.6,
				7.4
			]
		] })
	] });
}
function FoldsFaultsScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "folds-faults",
		title: "Folds and faults",
		camera: {
			position: [
				0,
				4.2,
				9.2
			],
			fov: 40
		},
		liveText: "Stratified beds bend into an anticline and syncline. Normal: hanging wall down. Reverse: hanging wall up. Strike-slip: lateral.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "folds-faults",
			title: "Folds and faults",
			caption: "Rocks bend or they break. Anticline, syncline, then normal, reverse, and strike-slip."
		}),
		minDistance: 3,
		maxDistance: 16,
		target: [
			0,
			.4,
			1.2
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {})
	});
}
//#endregion
export { FoldsFaultsScene as default };
