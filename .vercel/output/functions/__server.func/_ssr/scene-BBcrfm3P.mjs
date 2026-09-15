import { i as __toESM } from "../_runtime.mjs";
import { g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-BBcrfm3P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function rockFn(x, y) {
	const u = (x + 3.4) / 6.8;
	const trough = Math.exp(-((x + .2) ** 2) / .55) * (.55 + .35 * (y + 2.2) / 5);
	const left = 1.85 * Math.exp(-((x + 1.7) ** 2 + (y + 1.4) ** 2) / 1.15);
	const right = 1.65 * Math.exp(-((x - 1.35) ** 2 + (y + 1.6) ** 2) / .95);
	const horn = .55 * Math.exp(-((x + .15) ** 2 + (y + 1.85) ** 2) / .18);
	const floor = .12 + .04 * Math.sin(x * 2.2) * Math.cos(y * 1.4);
	return Math.max(.04, left + right + horn + floor - trough * 1.15) * (.85 + .08 * (1 - u));
}
/** Ice as a thick tongue sitting in the U-trough — not a white sticker. */
function IceTongue({ advance }) {
	const v = useLabControls((s) => s.trueScale) ? 1 / 5 : 1;
	const len = 1.35 + advance * 2.7;
	const thick = (.34 + advance * .52) * v;
	const width = .92 + advance * .12;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: [
			-.18,
			.18 + thick * .22,
			-.55 + advance * .95
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			scale: [
				width,
				thick,
				len
			],
			rotation: [
				.16,
				0,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.58,
				48,
				32
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
				color: PBR.ice.color,
				roughness: .12,
				metalness: .04,
				transmission: .44,
				thickness: 1.25,
				ior: 1.31,
				transparent: true,
				opacity: .88
			})]
		})
	});
}
function Model() {
	useLabTick(1 / 14);
	const t = useLabControls((s) => s.t);
	const q = useQuality();
	const nrm = useRockNormal();
	const advance = .15 + t * .85;
	const vScale = useLabControls((s) => s.trueScale) ? 1 / 6 : 1;
	const colorFn = (0, import_react.useMemo)(() => (h) => {
		const c = new Color();
		if (h > 1.55) c.set("#F4EFE6");
		else if (h > .9) c.set("#8a8478");
		else c.set(PBR.rock.color);
		return c;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
			fn: rockFn,
			width: 7.2,
			depth: 6.4,
			segX: q.terrain,
			segZ: q.terrain,
			colorFn,
			position: [
				0,
				0,
				0
			],
			vScale
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IceTongue, { advance }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.2,
				.16,
				2.35
			],
			rotation: [
				.05,
				.1,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				1.7,
				.22,
				.38
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#7C9A6A",
				roughness: .92,
				normalMap: nrm
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				1.55,
				.18,
				1.55
			],
			rotation: [
				0,
				.55,
				0
			],
			scale: [
				1.15,
				.35,
				.55
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.55,
				24,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#C4A574",
				roughness: .9
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-1.7,
				1.55,
				-.4
			],
			text: "Cirque",
			tone: "ice",
			note: "The armchair the ice sat in. A steep-walled bowl, often with a tarn."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-.1,
				2.15,
				-1.6
			],
			text: "Horn",
			note: "Three cirques back-to-back leave a pyramidal peak."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.9,
				1.85,
				-1.1
			],
			text: "Arête",
			tone: "sandstone",
			note: "Two cirques back-to-back leave a knife ridge."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-.2,
				.55,
				.9
			],
			text: "U-trough",
			tone: "moss",
			note: "Ice cut a wide floor and steep walls. Yosemite is this, not a river canyon."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-.2,
				.45,
				2.4
			],
			text: "Terminal moraine",
			tone: "moss",
			note: "Advance scrapes. Retreat dumps the load as a ridge of till."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.55,
				.7,
				1.55
			],
			text: "Drumlin",
			tone: "sandstone",
			note: "A streamlined hill of till. The blunt end faces up-ice."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				2.55,
				0
			],
			children: "Ice has thickness. Play advance / retreat · Lake District / Yosemite"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				3.2,
				3.4,
				6.4
			],
			[
				.4,
				1.6,
				4.2
			],
			[
				-2.4,
				2.8,
				3.4
			],
			[
				3.2,
				3.4,
				6.4
			]
		] })
	] });
}
function GlaciersScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "glaciers",
		title: "Glaciers",
		camera: {
			position: [
				3.2,
				3.4,
				6.4
			],
			fov: 40
		},
		exaggeration: "Vertical exaggeration ×6. Ice has thickness; it is not a white sticker.",
		liveText: "Cirque, arête, horn, U-trough, moraine. Ice advances and retreats as a thick flow.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "glaciers",
			title: "Glaciers",
			caption: "Cirque, horn, arête, U-trough, moraine. Ice is a thick river of ice."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { GlaciersScene as default };
