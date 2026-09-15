import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, R as Vector3, c as useFrame, f as BufferAttribute, p as BufferGeometry, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality } from "./perf-Cy1NcWbY.mjs";
import { a as EarthMesh, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback } from "./studio-CNvjqO8z.mjs";
import { n as SunMesh, t as MoonMesh } from "./moon-DSIxiLbk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-DbunT4n7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Model() {
	const zoom = useLabControls((s) => s.params.zoom) ?? 0;
	const q = useQuality();
	const camT = (0, import_react.useRef)(new Vector3(0, 1.2, 4.2));
	const look = (0, import_react.useMemo)(() => [
		new Vector3(0, 1.15, 4.4),
		new Vector3(0, 3.4, 9.5),
		new Vector3(0, 8, 22)
	], []);
	useFrame(({ camera }) => {
		const i = MathUtils.clamp(zoom, 0, 2);
		const a = Math.floor(i);
		const b = Math.min(2, a + 1);
		const f = i - a;
		camT.current.lerpVectors(look[a], look[b], f);
		camera.position.lerp(camT.current, .06);
	});
	const stars = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		const n = q.stars;
		const pos = new Float32Array(n * 3);
		for (let i = 0; i < n; i++) {
			const r = 14 + Math.random() * 18;
			const th = Math.random() * Math.PI * 2;
			const ph = Math.acos(2 * Math.random() - 1);
			pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
			pos[i * 3 + 1] = r * Math.cos(ph);
			pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
		}
		g.setAttribute("position", new BufferAttribute(pos, 3));
		return g;
	}, [q.stars]);
	const stage = zoom < .7 ? 0 : zoom < 1.45 ? 1 : 2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		stage === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, {
				radius: 1,
				clouds: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				position: [
					1.7,
					.1,
					.2
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonMesh, { radius: .27 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					0,
					1.2,
					0
				],
				text: "Earth · 12 742 km"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					1.7,
					.5,
					.2
				],
				text: "Moon · 30 Earth-diameters away (compressed)"
			})
		] }),
		stage === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunMesh, { radius: .4 }),
			[
				1.2,
				1.8,
				2.5,
				3.3
			].map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
					a - .01,
					a + .01,
					64
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#8B9A97",
					transparent: true,
					opacity: .35,
					side: 2
				})]
			}, a)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					0,
					.7,
					0
				],
				text: "1 AU · 150 million km",
				tone: "sandstone"
			})
		] }),
		stage === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
			geometry: stars,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
				color: "#F4EFE6",
				size: .04,
				sizeAttenuation: true
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				stage === 2 ? 3.2 : 1.85,
				0
			],
			children: [
				stage === 0 && "Stop 1 · Earth. Units: km.",
				stage === 1 && "Stop 2 · Solar system. Units: AU. Planets would be dust at true scale.",
				stage === 2 && "Stop 3 · Neighbouring stars. Units: light years. No cartoon galaxy tour."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				1.2,
				4.4
			],
			[
				0,
				3.4,
				9.5
			],
			[
				0,
				8,
				22
			],
			[
				0,
				1.2,
				4.4
			]
		] })
	] });
}
function UniverseScaleScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "universe-scale",
		title: "Universe scale",
		camera: {
			position: [
				0,
				1.2,
				4.4
			],
			fov: 42
		},
		liveText: "Powers of ten: Earth, then the system, then local stars. Each jump hides a scale.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "universe-scale",
			title: "Universe scale",
			caption: "Three stops only. Earth, solar system, neighbouring stars. No fake fly-through."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { UniverseScaleScene as default };
