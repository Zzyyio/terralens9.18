import { i as __toESM } from "../_runtime.mjs";
import { N as Shape, _ as ExtrudeGeometry, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, c as SceneToggles, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, s as SceneBtn, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-CVvaz9V8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function commaPts() {
	const pts = [];
	for (let i = 0; i <= 32; i++) {
		const u = i / 32;
		const a = -.35 + u * Math.PI * 1.42;
		const r = .42 + u * 1.72;
		pts.push([
			Math.cos(a) * r,
			.22 + (1 - u) * .16,
			Math.sin(a) * r
		]);
	}
	return pts;
}
function useWedge(run, height, width, lip) {
	return (0, import_react.useMemo)(() => {
		const s = new Shape();
		s.moveTo(0, 0);
		s.lineTo(run, 0);
		s.lineTo(lip, height);
		s.closePath();
		const g = new ExtrudeGeometry(s, {
			depth: width,
			bevelEnabled: false,
			steps: 1
		});
		g.translate(0, 0, -width / 2);
		g.computeVertexNormals();
		return g;
	}, [
		run,
		height,
		width,
		lip
	]);
}
function System() {
	useLabTick(1 / 12);
	const t = useLabControls((s) => s.t);
	const anti = (useLabControls((s) => s.params.anti) ?? 0) > .5;
	const q = useQuality();
	const segs = Math.max(20, Math.round(q.sphere / 3));
	const comma = (0, import_react.useMemo)(() => commaPts(), []);
	const commaGeom = (0, import_react.useMemo)(() => tubeGeometry(comma, .22, Math.max(40, q.sphere), 10), [comma, q.sphere]);
	const coldW = useWedge(1.55, .55, .85, .28);
	const warmW = useWedge(1.85, .38, .85, 1.25);
	const rot = t * Math.PI * 1.15;
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [5.4, Math.max(32, q.sphere / 2)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.water.color,
				roughness: .28,
				metalness: .08
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				.2,
				.12
			],
			position: [
				-.5,
				.04,
				.12
			],
			scale: [
				.7,
				1.25,
				1
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.48, segs] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.soil.color,
				roughness: PBR.soil.roughness,
				metalness: PBR.soil.metalness
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-.55,
				.22,
				.15
			],
			text: "UK",
			tone: "moss",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.6,
				.18,
				1.1
			],
			text: "North Sea",
			tone: "ice",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-2.1,
				.18,
				-1.4
			],
			text: "Atlantic",
			tone: "glacier",
			occlude: false
		}),
		!anti ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			rotation: [
				0,
				rot,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: commaGeom,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#e8eef2",
						transparent: true,
						opacity: .42,
						roughness: .9,
						depthWrite: false
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: coldW,
					position: [
						.55,
						.02,
						1.05
					],
					rotation: [
						0,
						.85,
						0
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#4aa0d4",
						transparent: true,
						opacity: .8,
						roughness: .5
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: warmW,
					position: [
						1.15,
						.02,
						-.15
					],
					rotation: [
						0,
						-.35,
						0
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#E24B4B",
						transparent: true,
						opacity: .72,
						roughness: .5
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.12,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.16,
						segs,
						segs
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#7FD4FF",
						emissive: "#3EE0C6",
						emissiveIntensity: .35
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: [
						0,
						.55,
						0
					],
					text: "LOW",
					tone: "ice",
					occlude: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: [
						.9,
						.85,
						1.35
					],
					text: "cold front",
					tone: "ice",
					occlude: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: [
						1.6,
						.7,
						-.2
					],
					text: "warm front",
					tone: "magma",
					occlude: false
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.15,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					1.55,
					segs,
					segs,
					0,
					Math.PI * 2,
					0,
					Math.PI * .48
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#E8B86D",
					transparent: true,
					opacity: .16,
					roughness: .35,
					depthWrite: false,
					side: 2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
				from: [
					0,
					1.55,
					0
				],
				to: [
					0,
					.35,
					0
				],
				color: "#E8B86D",
				radius: .045
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
				from: [
					.7,
					1.35,
					.4
				],
				to: [
					.35,
					.4,
					.2
				],
				color: "#E8B86D",
				radius: .03
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
				from: [
					-.65,
					1.35,
					-.3
				],
				to: [
					-.3,
					.4,
					-.15
				],
				color: "#E8B86D",
				radius: .03
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.12,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.18,
					segs,
					segs
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#E8B86D",
					emissive: "#E8B86D",
					emissiveIntensity: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					0,
					.55,
					0
				],
				text: "HIGH",
				tone: "sandstone",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					0,
					1.85,
					.2
				],
				text: "sinking · dry",
				tone: "sandstone",
				occlude: false
			})
		] }),
		!anti && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				2.15,
				0
			],
			text: "mid-latitude cyclone — not a hurricane",
			tone: "fault",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				2.55,
				0
			],
			children: anti ? "Anticyclone: clockwise in the NH, sink, often clearer. A British winter high can still fog." : "UK depression: comma cloud, fronts on the arms, LOW in the centre. Not a tropical cyclone."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.2,
				3.5,
				6.2
			],
			[
				-2.4,
				2.2,
				4.6
			],
			[
				2.6,
				2.4,
				4.4
			],
			[
				.2,
				3.5,
				6.2
			]
		] })
	] });
}
function CycloneScene() {
	const anti = (useLabControls((s) => s.params.anti) ?? 0) > .5;
	const setParam = useLabControls((s) => s.setParam);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "cyclone-anticyclone",
		title: "Cyclone and anticyclone",
		camera: {
			position: [
				.2,
				3.5,
				6.2
			],
			fov: 40
		},
		liveText: anti ? "Anticyclone: a clear sinking dome. Dry. Not a guarantee of sunshine in a British winter fog." : "Mid-latitude cyclone — not a hurricane. Comma cloud, warm and cold fronts, LOW at the centre.",
		exaggeration: "UK-honest: a depression is a frontal comma, not an eyewall.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "cyclone-anticyclone",
			title: "Cyclone",
			caption: "A mid-latitude cyclone is a spinning comma of fronts, not a hurricane."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(System, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneToggles, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneBtn, {
		onClick: () => setParam("anti", anti ? 0 : 1),
		active: anti,
		children: anti ? "Show cyclone" : "Show anticyclone"
	}) })] });
}
//#endregion
export { CycloneScene as default };
