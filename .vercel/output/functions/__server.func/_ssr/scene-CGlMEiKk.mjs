import { i as __toESM } from "../_runtime.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-CGlMEiKk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MARKS = [
	{
		ma: 4500,
		name: "Earth forms",
		tone: "sandstone"
	},
	{
		ma: 540,
		name: "Cambrian",
		tone: "glacier"
	},
	{
		ma: 250,
		name: "Pangaea",
		tone: "magma"
	},
	{
		ma: 66,
		name: "K–Pg",
		tone: "fault"
	},
	{
		ma: 0,
		name: "Now",
		tone: "ice"
	}
];
function logT(ma) {
	return Math.log10(ma + 1) / Math.log10(4501);
}
function helix(u) {
	const turns = 3.2 * (1 - u);
	const r = .45 + 1.55 * u;
	return [
		Math.cos(turns * Math.PI * 2) * r,
		-1.6 + u * 3.4,
		Math.sin(turns * Math.PI * 2) * r
	];
}
function Model() {
	useLabTick(1 / 18);
	const t = useLabControls((s) => s.t);
	const pts = (0, import_react.useMemo)(() => {
		const a = [];
		for (let i = 0; i <= 80; i++) a.push(helix(i / 80));
		return a;
	}, []);
	const tube = (0, import_react.useMemo)(() => tubeGeometry(pts, .045, 80, 8), [pts]);
	const bead = helix(1 - t);
	const ma = Math.pow(10, (1 - t) * Math.log10(4501)) - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 10 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: tube,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3EE0C6",
				roughness: .45,
				metalness: .08
			})
		}),
		MARKS.map((m) => {
			const p = helix(1 - logT(m.ma));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: p,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.08,
					20,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#F4EFE6",
					roughness: .4
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: [
						.15,
						.18,
						0
					],
					text: `${m.name} · ${m.ma} Ma`,
					tone: m.tone
				})]
			}, m.name);
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: bead,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.12,
				24,
				18
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#FF6A3D",
				emissive: "#FF6A3D",
				emissiveIntensity: .35
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.15,
				0
			],
			children: [
				"Log spiral · ",
				ma < 1 ? `${(ma * 1e3).toFixed(0)} ka` : `${ma.toFixed(0)} Ma`,
				" · life and continents are marks, not a parade."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				3.2,
				1.6,
				5.4
			],
			[
				.4,
				.4,
				3.2
			],
			[
				-1.6,
				2.4,
				4.2
			],
			[
				3.2,
				1.6,
				5.4
			]
		] })
	] });
}
function GeologicTimeScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "geologic-time",
		title: "Geologic time",
		camera: {
			position: [
				3.2,
				1.6,
				5.4
			],
			fov: 40
		},
		liveText: "A log spiral of time in Ma. Marks for Earth, Cambrian, Pangaea, K–Pg, now.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "geologic-time",
			title: "Geologic time",
			caption: "Spiral of Ma. Life and continents are marks, not a cartoon parade."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { GeologicTimeScene as default };
