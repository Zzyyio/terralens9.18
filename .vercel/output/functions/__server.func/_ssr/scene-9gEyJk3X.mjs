import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, L as Vector2, O as PlaneGeometry, c as useFrame, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-9gEyJk3X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EPIC = [
	.22,
	1.82,
	.12
];
function SurfaceRipple() {
	const q = useQuality();
	const t = useLabControls((s) => s.t);
	const tRef = (0, import_react.useRef)(t);
	tRef.current = t;
	const { geom } = (0, import_react.useMemo)(() => {
		const geom = new PlaneGeometry(2.55, 1.85, Math.max(24, q.terrain / 6), Math.max(16, q.terrain / 10));
		const orig = Float32Array.from(geom.attributes.position.array);
		geom.userData.orig = orig;
		return { geom };
	}, [q.terrain]);
	useFrame(() => {
		const pos = geom.attributes.position;
		const orig = geom.userData.orig;
		const u = tRef.current;
		const amp = u > .32 ? Math.sin(Math.min(1, (u - .32) / .55) * Math.PI) * .09 : 0;
		for (let i = 0; i < pos.count; i++) {
			const x = orig[i * 3] - .22;
			const y = orig[i * 3 + 1] - .12;
			const r = Math.hypot(x, y);
			pos.setZ(i, orig[i * 3 + 2] + amp * Math.sin(r * 16 - u * 26) * Math.exp(-r * 1.15));
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
		position: [
			0,
			1.805,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#6a6258",
			roughness: .9,
			metalness: .04,
			transparent: true,
			opacity: .92
		})
	});
}
function Model() {
	useLabTick(1 / 7);
	const t = useLabControls((s) => s.t);
	const depth = useLabControls((s) => s.params.depth ?? .45);
	const q = useQuality();
	const nrm = useRockNormal();
	const nrmScale = (0, import_react.useMemo)(() => new Vector2(.85, .85), []);
	const segs = Math.max(16, Math.floor(q.sphere / 4));
	const FOCUS = [
		.22,
		MathUtils.lerp(1.58, .52, depth),
		.12
	];
	const pR = .06 + t * 2.65;
	const sR = t > .14 ? .06 + (t - .14) * 1.42 : 0;
	const shear = t > .14 ? Math.sin((t - .14) * 16) * .045 * Math.exp(-((t - .4) ** 2) / .07) : 0;
	const surfOn = t > .32;
	const damage = t > .52;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.22,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				3.6,
				.44,
				2.6,
				segs,
				2,
				segs
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.mantle.color,
				roughness: PBR.mantle.roughness,
				metalness: PBR.mantle.metalness
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				0,
				1.12,
				0
			],
			rotation: [
				0,
				0,
				shear
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					2.55,
					1.32,
					1.85,
					segs,
					Math.max(8, segs / 2),
					segs
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.rock.color,
					roughness: PBR.rock.roughness,
					metalness: PBR.rock.metalness,
					normalMap: nrm,
					normalScale: nrmScale,
					transparent: true,
					opacity: .78,
					depthWrite: false
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: FOCUS,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.07,
				q.sphere,
				q.sphere
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.magma.color,
				emissive: PBR.magma.emissive,
				emissiveIntensity: 1.15,
				roughness: .3
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				(FOCUS[0] + EPIC[0]) / 2,
				(FOCUS[1] + EPIC[1]) / 2,
				FOCUS[2]
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.012,
				.012,
				EPIC[1] - FOCUS[1],
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#3EE0C6",
				transparent: true,
				opacity: .55
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: EPIC,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.055,
				20,
				20
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3EE0C6",
				emissive: "#3EE0C6",
				emissiveIntensity: .7,
				roughness: .28
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: FOCUS,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				pR,
				q.sphere,
				Math.max(16, q.sphere / 2)
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#7FD4FF",
				transparent: true,
				opacity: .16,
				depthWrite: false,
				side: 2
			})]
		}),
		sR > .08 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: FOCUS,
			scale: [
				1.15,
				.72,
				1
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				sR,
				q.sphere,
				Math.max(16, q.sphere / 2)
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#E24B4B",
				transparent: true,
				opacity: .18,
				depthWrite: false,
				side: 2
			})]
		}),
		surfOn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				EPIC[0],
				1.84,
				EPIC[2]
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				Math.max(.04, (t - .32) * 1.55 - .1),
				(t - .32) * 1.55 + .05,
				48
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#E8B86D",
				transparent: true,
				opacity: .55,
				side: 2
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurfaceRipple, {}),
		damage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.95,
				1.95,
				.55
			],
			rotation: [
				0,
				.2,
				.18 + shear * 2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.18,
				.22,
				.16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#2a3234",
				roughness: .85
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-.85,
				1.95,
				-.5
			],
			rotation: [
				.12,
				-.3,
				-.2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.16,
				.2,
				.14
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3a4038",
				roughness: .85
			})]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				FOCUS[0],
				FOCUS[1] - .22,
				FOCUS[2] + .55
			],
			text: "Focus",
			tone: "magma",
			occlude: false,
			note: "Hypocentre: slip starts in the rock. Depth slider moves this spark."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				EPIC[0],
				EPIC[1] + .28,
				EPIC[2]
			],
			text: "Epicentre",
			tone: "glacier",
			occlude: false,
			note: "The map dot. Vertically above the focus, not a cave."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				FOCUS[0] + pR * .55,
				FOCUS[1] + .15,
				FOCUS[2]
			],
			text: "P",
			tone: "ice",
			occlude: false,
			note: "Fastest. Compressional. Travels through solid and liquid."
		}),
		sR > .2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				FOCUS[0] - .15,
				FOCUS[1] + .35,
				FOCUS[2] + sR * .4
			],
			text: "S",
			tone: "fault",
			occlude: false,
			note: "Shear. Slower than P. Dies in liquid — the outer-core argument."
		}),
		surfOn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.9,
				2.15,
				-.4
			],
			text: "Surface",
			tone: "sandstone",
			occlude: false,
			note: "Love and Rayleigh. Arrive later. Often the damage in town."
		}),
		damage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.95,
				2.28,
				.55
			],
			text: "Damage",
			tone: "magma",
			occlude: false,
			note: "Shallow focus plus surface waves. Deep quakes shake less at the desk."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				2.85,
				0
			],
			children: "P through all · S shears the block · surface wave does the damage"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				2.8,
				2.1,
				4.6
			],
			[
				.55,
				.95,
				2.35
			],
			[
				.2,
				4.4,
				.9
			],
			[
				3.1,
				1.15,
				1.5
			]
		] })
	] });
}
function EarthquakesScene() {
	const t = useLabControls((s) => s.t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "earthquakes",
		title: "Earthquakes",
		camera: {
			position: [
				2.8,
				2.1,
				4.6
			],
			fov: 40
		},
		liveText: `Focus is inside the rock. Now ${t < .14 ? "P-wave" : t < .32 ? "S-wave" : t < .52 ? "surface wave" : "damage"}. Epicentre is the map dot on the top face.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "earthquakes",
			title: "Earthquakes",
			caption: "Focus in the rock. Epicentre on the surface. P, then S, then damage."
		}),
		minDistance: 2.2,
		maxDistance: 12,
		target: [
			0,
			1.1,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { EarthquakesScene as default };
