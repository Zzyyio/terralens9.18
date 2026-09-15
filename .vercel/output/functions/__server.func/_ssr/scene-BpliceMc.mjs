import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry, t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-BpliceMc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tint = new Color();
function karstH(x, z) {
	let h = .9;
	const fx = Math.abs((x + 40) % .5 - .25);
	const fz = Math.abs((z + 40) % .5 - .25);
	if (fx < .055) h -= .1 * (1 - fx / .055);
	if (fz < .055) h -= .1 * (1 - fz / .055);
	const d = Math.hypot(x - 1.12, z - .22);
	if (d < .78) h -= .82 * (1 - d / .78);
	return Math.max(.02, h);
}
function karstColor(h) {
	if (h < .25) return tint.set("#3a342c");
	if (h < .7) return tint.set(PBR.limestone.color);
	return tint.set("#e4dcc8");
}
function Stalactite({ pos, h, segs }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: pos,
		rotation: [
			Math.PI,
			0,
			0
		],
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
			.042,
			h,
			segs
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: PBR.limestone.color,
			roughness: PBR.limestone.roughness,
			metalness: PBR.limestone.metalness
		})]
	});
}
function Cave({ segs, nrm, rock }) {
	const cones = Math.max(16, Math.floor(segs / 3));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			1.12,
			-.12,
			.22
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					0,
					.2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.62,
					segs,
					Math.max(16, Math.floor(segs / 2)),
					0,
					Math.PI
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.limestone.color,
					roughness: .78,
					metalness: .04,
					side: 1,
					normalMap: rock,
					normalScale: nrm
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stalactite, {
				pos: [
					-.12,
					.42,
					.05
				],
				h: .28,
				segs: cones
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stalactite, {
				pos: [
					.08,
					.46,
					-.1
				],
				h: .34,
				segs: cones
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stalactite, {
				pos: [
					.18,
					.4,
					.14
				],
				h: .22,
				segs: cones
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stalactite, {
				pos: [
					-.22,
					.38,
					-.12
				],
				h: .2,
				segs: cones
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.05,
					-.28,
					.04
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
					.05,
					.18,
					cones
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.limestone.color,
					roughness: .72
				})]
			})
		]
	});
}
function Model() {
	const q = useQuality();
	const rock = useRockNormal();
	const nrm = (0, import_react.useMemo)(() => new Vector2(.7, .7), []);
	const cut = (useLabControls((s) => s.params.cutaway) ?? 0) > .5;
	const segs = q.terrain;
	const swallow = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let i = 0; i <= 18; i++) {
			const u = i / 18;
			const x = -.4 + u * 1.5;
			const z = -1.35 + u * 1.55;
			pts.push([
				x,
				karstH(x, z) + .025,
				z
			]);
		}
		return tubeGeometry(pts, .028, 18, 8);
	}, []);
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
				-.02,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [7.5, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#121814",
				roughness: .96
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				cut ? .08 : 0,
				cut ? .35 : 0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
				fn: karstH,
				width: 5.6,
				depth: 4.4,
				segX: segs,
				segZ: Math.floor(segs * .75),
				colorFn: karstColor
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: swallow,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.water.color,
					roughness: PBR.water.roughness,
					metalness: PBR.water.metalness
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				karstH(0, -1.1) + .01,
				-1.1
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.18, 16] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.limestone.color,
				roughness: PBR.limestone.roughness,
				metalness: PBR.limestone.metalness,
				normalMap: rock,
				normalScale: nrm
			})]
		}),
		cut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cave, {
			segs: q.lathe,
			nrm,
			rock
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-.85,
				1.28,
				-.85
			],
			text: "Clint",
			tone: "sandstone"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-.25,
				1.12,
				-.25
			],
			text: "Gryke"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.12,
				1.15,
				.22
			],
			text: "Doline · swallow hole",
			tone: "fault"
		}),
		cut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.12,
				.35,
				.85
			],
			text: "Cave",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.35,
				0
			],
			children: ["Carbonation along joints · pavement ", cut ? "+ cutaway chamber" : "· toggle cutaway"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.3,
				3.6,
				6.8
			],
			[
				-.6,
				2.2,
				3.8
			],
			[
				1.2,
				2.4,
				4.2
			],
			[
				1.3,
				1.2,
				3.4
			]
		] })
	] });
}
function KarstScene() {
	const cut = (useLabControls((s) => s.params.cutaway) ?? 0) > .5;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LabStudio, {
		slug: "karst",
		title: "Karst",
		camera: {
			position: [
				.3,
				3.6,
				6.8
			],
			fov: 40
		},
		exaggeration: "Vertical exaggeration ×6 · limestone pavement and doline",
		liveText: `Karst pavement. Clints and grykes. Doline. ${cut ? "Cave cutaway open." : "Cave hidden."}`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "karst",
			title: "Karst",
			caption: "Limestone pavement: clints, grykes, a conical doline, and a cutaway cave with stalactites."
		}),
		minDistance: 2.6,
		maxDistance: 14,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#07090C",
				10,
				22
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})]
	});
}
//#endregion
export { KarstScene as default };
