import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, L as Vector2, O as PlaneGeometry, c as useFrame, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-B6dWs3tb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MorphWater({ width, depth, position, plan }) {
	const q = useQuality();
	const t = useLabControls((s) => s.t);
	const tRef = (0, import_react.useRef)(t);
	tRef.current = t;
	const geom = (0, import_react.useMemo)(() => new PlaneGeometry(width, depth, Math.max(28, Math.floor(q.terrain / 4)), Math.max(12, Math.floor(q.terrain / 10))), [
		width,
		depth,
		q.terrain
	]);
	const orig = (0, import_react.useMemo)(() => Float32Array.from(geom.attributes.position.array), [geom]);
	useFrame(() => {
		const pos = geom.attributes.position;
		const u = tRef.current;
		const slip = Math.min(1, u / .12);
		for (let i = 0; i < pos.count; i++) {
			const x = orig[i * 3];
			const y = orig[i * 3 + 1];
			let h = 0;
			if (plan) {
				const travel = -1.7 + u * 3.4;
				const r = Math.hypot(x - travel, y * .35);
				const shoal = MathUtils.smoothstep(.2, 1.55, x);
				const amp = .05 + shoal * .42;
				const lambda = 1.9 - shoal * 1.2;
				h = amp * Math.sin(r / lambda * Math.PI * 2) * Math.exp(-((x - travel) ** 2) / (lambda * .9));
			} else {
				const shoal = MathUtils.smoothstep(.25, 1.85, x);
				const c = MathUtils.lerp(4.8, 1.5, shoal);
				const amp = .055 + shoal * .58;
				const lambda = 2.15 - shoal * 1.4;
				const travel = -2.2 + u * c * .7;
				const pulse = Math.exp(-((x - travel) ** 2) / (lambda * .65));
				h = Math.exp(-((x + 2.05) ** 2) / .2) * slip * .18 + amp * Math.sin((x - travel) / lambda * Math.PI * 2) * pulse * Math.min(1, u * 1.7);
			}
			pos.setZ(i, orig[i * 3 + 2] + h);
		}
		pos.needsUpdate = true;
		geom.computeVertexNormals();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geom,
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		position,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: PBR.water.color,
			roughness: PBR.water.roughness,
			metalness: PBR.water.metalness,
			transparent: true,
			opacity: .8
		})
	});
}
function Profile() {
	const t = useLabControls((s) => s.t);
	const q = useQuality();
	const nrm = useRockNormal();
	const lift = Math.min(1, t / .12) * .26;
	const segs = Math.max(12, Math.floor(q.sphere / 6));
	const coastFn = (0, import_react.useMemo)(() => (x, y) => {
		return .08 + MathUtils.smoothstep(-.4, .9, x) * (.85 + Math.sin(y * 2.2) * .08);
	}, []);
	const coastColor = (0, import_react.useMemo)(() => {
		const c = new Color(PBR.crust.color);
		return () => c;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-3.15,
			0,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.1,
					-.12,
					0
				],
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					5.1,
					.28,
					2.3,
					segs,
					1,
					segs
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.rock.color,
					roughness: PBR.rock.roughness,
					metalness: PBR.rock.metalness,
					normalMap: nrm,
					normalScale: new Vector2(.6, .6)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-2.05,
					-.02 + lift,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.35,
					.22,
					2.15,
					segs,
					1,
					segs
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.crust.color,
					roughness: .88,
					metalness: .03
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MorphWater, {
				width: 5,
				depth: 2.15,
				position: [
					.05,
					.38,
					0
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
				fn: coastFn,
				width: 1.7,
				depth: 2.3,
				segX: Math.max(16, Math.floor(q.terrain / 8)),
				segZ: Math.max(12, Math.floor(q.terrain / 10)),
				colorFn: coastColor,
				position: [
					2.15,
					.02,
					0
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					-2.05,
					.85 + lift,
					0
				],
				text: "Seafloor slip",
				tone: "magma",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					-.55,
					.95,
					.2
				],
				text: "Deep = fast and low",
				tone: "ice",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					1.55,
					1.15,
					0
				],
				text: "Shoaling",
				tone: "glacier",
				occlude: false
			})
		]
	});
}
function Plan() {
	const t = useLabControls((s) => s.t);
	const q = useQuality();
	const coastFn = (0, import_react.useMemo)(() => (x, y) => {
		const shore = MathUtils.smoothstep(.35, 1.15, x);
		const bay = Math.exp(-((y - .15) ** 2) / .55) * .18;
		return shore * (.55 + Math.sin(y * 3.1) * .08) - bay * shore;
	}, []);
	const coastColor = (0, import_react.useMemo)(() => {
		const wet = new Color("#5d7a52");
		const dry = new Color(PBR.sand.color);
		return (h) => h < .18 ? wet : dry;
	}, []);
	const inundation = t > .72;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			3.05,
			0,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MorphWater, {
				width: 3.6,
				depth: 2.8,
				position: [
					-.15,
					.12,
					0
				],
				plan: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
				fn: coastFn,
				width: 1.7,
				depth: 2.8,
				segX: Math.max(16, Math.floor(q.terrain / 8)),
				segZ: Math.max(16, Math.floor(q.terrain / 8)),
				colorFn: coastColor,
				position: [
					1.15,
					.02,
					0
				]
			}),
			inundation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				position: [
					1.05,
					.22,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.15, 1.6] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#7FD4FF",
					transparent: true,
					opacity: .28,
					depthWrite: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					-.9,
					.7,
					0
				],
				text: "Wave fronts",
				tone: "ice",
				occlude: false
			}),
			inundation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					1.2,
					.85,
					0
				],
				text: "Inundation",
				tone: "fault",
				occlude: false
			})
		]
	});
}
function Model() {
	useLabTick(1 / 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 14 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profile, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plan, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				2.55,
				0
			],
			children: "Profile left · plan right · the wave races, then stands up"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				3.4,
				8.2
			],
			[
				-3.1,
				1.7,
				5.1
			],
			[
				3.2,
				4.6,
				4.2
			],
			[
				2.6,
				1.9,
				4.8
			]
		] })
	] });
}
function TsunamiScene() {
	const t = useLabControls((s) => s.t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "tsunami",
		title: "Tsunami",
		camera: {
			position: [
				0,
				3.4,
				8.2
			],
			fov: 40
		},
		liveText: `Tsunami ${t < .12 ? "slip" : t < .72 ? "race" : "inundation"}. Deep water is fast and low. Nearshore the wave stands up.`,
		exaggeration: "Vertical exaggeration ×20. A real deep-water tsunami is centimetres high.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "tsunami",
			title: "Tsunami",
			caption: "Slip lifts the column. Deep: fast and low. Coast: tall."
		}),
		minDistance: 3,
		maxDistance: 16,
		target: [
			0,
			.4,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { TsunamiScene as default };
