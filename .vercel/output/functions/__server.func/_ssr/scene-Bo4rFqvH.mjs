import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, O as PlaneGeometry, c as useFrame, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-Bo4rFqvH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FrostBlock({ t }) {
	const q = useQuality();
	const nrm = useRockNormal();
	const gap = t * .16;
	const segs = Math.max(12, Math.floor(q.sphere / 6));
	const nrmScale = (0, import_react.useMemo)(() => new Vector2(.8, .8), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-2.45,
			.55,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.32 - gap / 2,
					0,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.62,
					1.15,
					1.15,
					segs,
					segs,
					segs
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.granite.color,
					roughness: PBR.granite.roughness,
					metalness: PBR.granite.metalness,
					normalMap: nrm,
					normalScale: nrmScale
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.32 + gap / 2,
					0,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.62,
					1.15,
					1.15,
					segs,
					segs,
					segs
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.granite.color,
					roughness: PBR.granite.roughness,
					metalness: PBR.granite.metalness,
					normalMap: nrm,
					normalScale: nrmScale
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.08,
					0
				],
				scale: [
					1,
					.3 + t * .85,
					.92
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.08 + gap,
					1.05,
					1.05
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.ice.color,
					roughness: PBR.ice.roughness,
					metalness: PBR.ice.metalness,
					transparent: true,
					opacity: .55 + t * .25
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					0,
					.95,
					0
				],
				text: "Physical",
				tone: "ice",
				occlude: false
			})
		]
	});
}
function KarstBlock({ t }) {
	const q = useQuality();
	const tRef = (0, import_react.useRef)(t);
	tRef.current = t;
	const geom = (0, import_react.useMemo)(() => new PlaneGeometry(1.25, 1.25, Math.max(24, q.terrain / 6), Math.max(24, q.terrain / 6)), [q.terrain]);
	const orig = (0, import_react.useMemo)(() => Float32Array.from(geom.attributes.position.array), [geom]);
	useFrame(() => {
		const pos = geom.attributes.position;
		const u = tRef.current;
		for (let i = 0; i < pos.count; i++) {
			const x = orig[i * 3];
			const y = orig[i * 3 + 1];
			const pits = Math.sin(x * 9.4) * Math.sin(y * 8.2);
			const hole = pits > .42 ? (pits - .42) * u * 1.05 : 0;
			pos.setZ(i, orig[i * 3 + 2] - hole - u * .05 * Math.abs(pits));
		}
		pos.needsUpdate = true;
		geom.computeVertexNormals();
	});
	const segs = Math.max(12, Math.floor(q.sphere / 6));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			.55,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.25,
					1.1,
					1.25,
					segs,
					4,
					segs
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.limestone.color,
					roughness: PBR.limestone.roughness,
					metalness: PBR.limestone.metalness
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: geom,
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				position: [
					0,
					.56,
					0
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.limestone.color,
					roughness: .62,
					metalness: .04
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					0,
					1.05,
					0
				],
				text: "Chemical",
				tone: "sandstone",
				occlude: false
			})
		]
	});
}
function RootBlock({ t }) {
	const q = useQuality();
	const nrm = useRockNormal();
	const gap = t * .1;
	const segs = Math.max(12, Math.floor(q.sphere / 6));
	const root = (0, import_react.useMemo)(() => {
		const len = .18 + t * .82;
		const pts = [];
		for (let i = 0; i <= 18; i++) {
			const u = i / 18;
			pts.push([
				Math.sin(u * 7) * .045,
				.72 - u * len,
				Math.cos(u * 5.5) * .03
			]);
		}
		return tubeGeometry(pts, .032, 28, 12);
	}, [t]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			2.45,
			.55,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.3 - gap / 2,
					0,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.58,
					1.12,
					1.12,
					segs,
					segs,
					segs
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.crust.color,
					roughness: .9,
					metalness: .03,
					normalMap: nrm,
					normalScale: new Vector2(.55, .55)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.3 + gap / 2,
					0,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.58,
					1.12,
					1.12,
					segs,
					segs,
					segs
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.crust.color,
					roughness: .9,
					metalness: .03
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: root,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#5a4030",
					roughness: .88,
					metalness: .02
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.02,
					.85,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.16,
					16,
					14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3a5a32",
					roughness: .9
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					0,
					1.25,
					0
				],
				text: "Biological",
				tone: "moss",
				occlude: false
			})
		]
	});
}
function Model() {
	useLabTick(1 / 8);
	const t = useLabControls((s) => s.t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrostBlock, { t }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KarstBlock, { t }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootBlock, { t }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				2.25,
				0
			],
			children: "Three mechanisms side by side — not a ranking"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				2.15,
				7
			],
			[
				-2.45,
				1.35,
				3.8
			],
			[
				0,
				1.4,
				3.8
			],
			[
				2.45,
				1.55,
				3.9
			]
		] })
	] });
}
function WeatheringScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "weathering",
		title: "Weathering",
		camera: {
			position: [
				0,
				2.15,
				7
			],
			fov: 40
		},
		liveText: "Physical frost wedging, chemical karst pitting, biological root in a joint. Play advances all three.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "weathering",
			title: "Weathering",
			caption: "Frost, carbonation, roots — three agents, not a ranking."
		}),
		minDistance: 2.6,
		maxDistance: 14,
		target: [
			0,
			.55,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { WeatheringScene as default };
