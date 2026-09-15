import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, N as Shape, R as Vector3, _ as ExtrudeGeometry, k as Quaternion, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { s as latLonToVector3 } from "./geo-BTPpCsbm.mjs";
import { s as Starfield } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3 } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-T6b7mvbC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CONTINENTS = [
	{
		name: "S America",
		color: "#6f8f5e",
		pts: [
			[.1, .42],
			[.2, .18],
			[.16, -.12],
			[.24, -.48],
			[.02, -.58],
			[-.18, -.28],
			[-.2, .08],
			[-.08, .4]
		],
		pangaea: [2, -6],
		present: [-12, -58],
		yaw0: .15,
		yaw1: -.35,
		fossils: [
			[.16, .12],
			[.18, -.08],
			[.14, -.28]
		]
	},
	{
		name: "Africa",
		color: "#c4a05a",
		pts: [
			[.04, .62],
			[.26, .42],
			[.22, .08],
			[.3, -.22],
			[.12, -.58],
			[-.12, -.5],
			[-.24, -.12],
			[-.2, .28],
			[-.06, .55]
		],
		pangaea: [4, 16],
		present: [2, 20],
		yaw0: 0,
		yaw1: .05,
		fossils: [
			[-.2, .12],
			[-.22, -.08],
			[-.18, -.26]
		]
	},
	{
		name: "N America",
		color: "#7C9A6A",
		pts: [
			[-.08, .48],
			[.28, .42],
			[.38, .08],
			[.22, -.18],
			[-.02, -.22],
			[-.32, -.02],
			[-.3, .32]
		],
		pangaea: [28, -10],
		present: [44, -98],
		yaw0: .2,
		yaw1: -.4
	},
	{
		name: "Eurasia",
		color: "#8a7a5c",
		pts: [
			[-.55, .22],
			[-.1, .38],
			[.42, .32],
			[.62, .05],
			[.28, -.18],
			[-.22, -.12],
			[-.58, .02]
		],
		pangaea: [32, 34],
		present: [50, 45],
		yaw0: -.1,
		yaw1: .12
	},
	{
		name: "Australia",
		color: "#3EE0C6",
		pts: [
			[-.22, .12],
			[.18, .16],
			[.28, -.02],
			[.1, -.18],
			[-.2, -.14],
			[-.28, .02]
		],
		pangaea: [-18, 44],
		present: [-24, 134],
		yaw0: .3,
		yaw1: .05
	}
];
function shapeGeom(pts) {
	const s = new Shape();
	s.moveTo(pts[0][0], pts[0][1]);
	for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
	s.closePath();
	const g = new ExtrudeGeometry(s, {
		depth: .055,
		bevelEnabled: true,
		bevelThickness: .012,
		bevelSize: .012,
		bevelSegments: 3
	});
	g.rotateX(-Math.PI / 2);
	g.computeVertexNormals();
	return g;
}
function Continent({ def, k, fossils }) {
	const geom = (0, import_react.useMemo)(() => shapeGeom(def.pts), [def.pts]);
	const lat = MathUtils.lerp(def.pangaea[0], def.present[0], k);
	const lon = MathUtils.lerp(def.pangaea[1], def.present[1], k);
	const yaw = MathUtils.lerp(def.yaw0, def.yaw1, k);
	const { pos, quat } = (0, import_react.useMemo)(() => {
		const p = latLonToVector3(lat, lon, 1.18);
		const q = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), p.clone().normalize());
		const spin = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), yaw);
		q.multiply(spin);
		return {
			pos: p,
			quat: q
		};
	}, [
		lat,
		lon,
		yaw
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: pos,
		quaternion: quat,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: geom,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: def.color,
					roughness: .86,
					metalness: .04
				})
			}),
			fossils && def.fossils?.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					p[0],
					.07,
					p[1]
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.028,
					14,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#F4EFE6",
					roughness: .35,
					metalness: .08,
					emissive: "#F4EFE6",
					emissiveIntensity: .35
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					0,
					.22,
					0
				],
				text: def.name,
				occlude: false
			})
		]
	});
}
function Drift() {
	useLabTick(1 / 16);
	const t = useLabControls((s) => s.t);
	const playing = useLabControls((s) => s.playing);
	const ageMa = useLabControls((s) => s.params.ageMa ?? 200);
	const fossils = (useLabControls((s) => s.params.fossils) ?? 0) > .5;
	const q = useQuality();
	const k = MathUtils.clamp(playing ? t : 1 - ageMa / 250, 0, 1);
	const age = Math.round((1 - k) * 250);
	const atlantic = k > .18;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			1.12,
			q.sphere,
			q.sphere
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: PBR.water.color,
			roughness: .22,
			metalness: .08
		})] }),
		CONTINENTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Continent, {
			def: c,
			k,
			fossils
		}, c.name)),
		atlantic && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: latLonToVector3(8, -12, 1.22).toArray(),
			to: latLonToVector3(8, 8, 1.22).toArray(),
			color: "#7FD4FF",
			radius: .018
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: latLonToVector3(12, 8, 1.55).toArray(),
			text: k < .22 ? "Pangaea 250 Ma" : "Atlantic opening",
			tone: k < .22 ? "sandstone" : "glacier",
			occlude: false
		}),
		k < .22 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: latLonToVector3(-6, 6, 1.5).toArray(),
			text: "Pangaea 250 Ma",
			tone: "moss",
			occlude: false
		}),
		fossils && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: latLonToVector3(4, 2, 1.48).toArray(),
			text: "Matching fossils",
			tone: "ice",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				1.72,
				0
			],
			children: [age < 4 ? "Present" : `${age} Ma`, " · t=0 Pangaea, t=1 now · continents ride plates, they do not plough a static ocean"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.2,
				.9,
				3.6
			],
			[
				2.4,
				.6,
				2.6
			],
			[
				-1.6,
				1.4,
				3.2
			],
			[
				0,
				3.2,
				2.4
			]
		] })
	] });
}
function DriftScene() {
	const ageMa = useLabControls((s) => s.params.ageMa ?? 200);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "continental-drift",
		title: "Continental drift",
		camera: {
			position: [
				.2,
				.9,
				3.6
			],
			fov: 42
		},
		liveText: `${Math.round(ageMa)} million years before present. At 250 Ma the pieces fit as Pangaea. Fossils agree across the young Atlantic.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "continental-drift",
			title: "Continental drift",
			caption: "250 Ma the pieces fit. Fossils match across South America and Africa. Plates are the mechanism."
		}),
		minDistance: 2.2,
		maxDistance: 8,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drift, {})
	});
}
//#endregion
export { DriftScene as default };
