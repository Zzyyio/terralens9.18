import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, L as Vector2, d as BoxGeometry, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { a as useVolcanoGeometry } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-ClpeDle5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function kindOf(visc) {
	if (visc < .18) return {
		name: "Fissure / rift · Iceland",
		tone: "magma"
	};
	if (visc < .48) return {
		name: "Shield · low-viscosity basalt",
		tone: "sandstone"
	};
	if (visc < .78) return {
		name: "Stratovolcano · andesite",
		tone: "fault"
	};
	return {
		name: "Steep plug · sticky, gassy",
		tone: "magma"
	};
}
function Conduit({ h, visc }) {
	const r = MathUtils.lerp(.2, .07, visc);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			0,
			h * .42,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
			r * .7,
			r,
			h * .9,
			24
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: PBR.magma.color,
			emissive: PBR.magma.emissive,
			emissiveIntensity: .55,
			roughness: .4
		})]
	});
}
/** Rift is LOW viscosity basalt, not a sticky plug. */
function Fissure({ on }) {
	const geom = (0, import_react.useMemo)(() => {
		const g = new BoxGeometry(5.2, .14, .38, 28, 1, 4);
		const pos = g.attributes.position;
		for (let i = 0; i < pos.count; i++) {
			const x = pos.getX(i);
			pos.setY(i, pos.getY(i) + Math.sin(x * 1.35) * .05);
		}
		g.computeVertexNormals();
		return g;
	}, []);
	if (!on) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geom,
		position: [
			.15,
			.12,
			.4
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: PBR.magma.color,
			emissive: PBR.magma.emissive,
			emissiveIntensity: .75,
			roughness: .32
		})
	});
}
/** Eruptive column only when sticky. Runny basalt has no column. */
function Column({ visc, h }) {
	if (visc < .62) return null;
	const colH = .4 + (visc - .62) * 4.6;
	const r = .22 + visc * .42;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			h + .05,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				colH * .45,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
				r,
				colH,
				18
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#c9c3b6",
				roughness: .92,
				transparent: true,
				opacity: .42,
				depthWrite: false
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				colH * .72,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				r * .85,
				16,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#9a958c",
				roughness: .95,
				transparent: true,
				opacity: .28,
				depthWrite: false
			})]
		})]
	});
}
function Model() {
	const visc = useLabControls((s) => s.params.visc ?? .25);
	const step = useLabControls((s) => s.step);
	const q = useQuality();
	const nrm = useRockNormal();
	const nrmScale = (0, import_react.useMemo)(() => new Vector2(.7, .7), []);
	const geom = useVolcanoGeometry(visc, q.lathe);
	const h = MathUtils.lerp(.72, 2.35, visc);
	const kind = kindOf(visc);
	const basaltic = visc < .48;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 10 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: geom,
			castShadow: true,
			receiveShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: basaltic ? PBR.basalt.color : "#6a5e52",
				roughness: basaltic ? .86 : .9,
				metalness: basaltic ? .08 : .04,
				normalMap: nrm,
				normalScale: nrmScale
			})
		}),
		step >= 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Conduit, {
			h,
			visc
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fissure, { on: visc < .18 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
			visc,
			h
		}),
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [6.5, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: basaltic ? "#2a2a28" : "#3a4038",
				roughness: .95
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				h + (visc > .62 ? 1.6 : .35),
				0
			],
			text: kind.name,
			tone: kind.tone,
			note: "Viscosity writes slope. Runny basalt = shield. Sticky andesite = steep cone. Rift is still runny."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				h * .45,
				visc < .33 ? 1.6 : .7
			],
			text: "Conduit",
			tone: "sandstone",
			note: "The pipe. Slice (X) to see magma rise. Not a hollow mountain."
		}),
		visc < .18 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.2,
				.45,
				2.2
			],
			text: "Fissure · low visc",
			tone: "magma",
			note: "Iceland-style rift. Low viscosity basalt, not a sticky plug."
		}),
		visc > .62 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.6,
				h + 1.1,
				0
			],
			text: "Ash column",
			tone: "fault",
			note: "Gas cannot escape sticky magma, so a column. Runny basalt has none."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				h + (visc > .62 ? 2.15 : .9),
				0
			],
			children: [
				"Viscosity ",
				visc.toFixed(2),
				" · ",
				basaltic ? "basalt pours" : "andesite stacks + column"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				2.8,
				8
			],
			[
				1.4,
				1.6,
				5.2
			],
			[
				0,
				3.2,
				7
			],
			[
				0,
				2.8,
				8
			]
		] })
	] });
}
function VolcanoesScene() {
	const visc = useLabControls((s) => s.params.visc ?? .25);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "volcanoes",
		title: "Volcanoes",
		camera: {
			position: [
				0,
				2.6,
				8
			],
			fov: 40
		},
		exaggeration: "Slope is honest. Size is not. Column only when magma is sticky.",
		liveText: `Volcano viscosity ${visc.toFixed(2)}. Shield is low viscosity; stratovolcano is sticky; fissure is runnier still.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "volcanoes",
			title: "Volcanoes",
			caption: "Shield, strato, fissure. Viscosity changes slope. Column only when sticky."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { VolcanoesScene as default };
