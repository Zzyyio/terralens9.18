import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, N as Shape, O as PlaneGeometry, R as Vector3, _ as ExtrudeGeometry, f as BufferAttribute, g as Color, p as BufferGeometry, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { s as latLonToVector3 } from "./geo-BTPpCsbm.mjs";
import { a as EarthMesh, o as Graticule, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-kb5dXyFz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUN = new Vector3(3, .5, 1.8);
function ll(lat, lon, r) {
	const v = latLonToVector3(lat, lon, r);
	return [
		v.x,
		v.y,
		v.z
	];
}
function modeOf(proj, morph, step) {
	if (proj !== void 0 && !Number.isNaN(proj)) return MathUtils.clamp(Math.round(proj), 0, 2);
	if (morph !== void 0 && morph > .04) return morph < .38 ? 0 : morph < .7 ? 1 : 2;
	return MathUtils.clamp(step, 0, 2);
}
function extrude(pts, depth) {
	const s = new Shape();
	s.moveTo(pts[0][0], pts[0][1]);
	for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
	s.closePath();
	const g = new ExtrudeGeometry(s, {
		depth,
		bevelEnabled: false
	});
	g.computeVertexNormals();
	return g;
}
var AFRICA = [
	[.02, .72],
	[.28, .55],
	[.38, .18],
	[.32, -.22],
	[.18, -.62],
	[.02, -.7],
	[-.18, -.48],
	[-.28, -.08],
	[-.22, .32],
	[-.08, .62]
];
var GREENLAND_MERC = [
	[-1.35, 1.15],
	[-.15, 1.05],
	[.05, 1.85],
	[-.45, 2.35],
	[-1.45, 2.15],
	[-1.55, 1.45]
];
function Land({ pts, color, depth, position, rotation, scale = 1 }) {
	const geom = (0, import_react.useMemo)(() => extrude(pts, depth), [pts, depth]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geom,
		position,
		rotation,
		scale,
		castShadow: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .82,
			metalness: .04
		})
	});
}
function GlobeView() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, { sunDirection: SUN }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Graticule, { radius: 1.012 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: ll(8, 22, 1.04),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.16,
				24,
				20
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.crust.color,
				roughness: .88,
				metalness: .03,
				transparent: true,
				opacity: .55
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: ll(72, -42, 1.03),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.055,
				20,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.ice.color,
				roughness: .28,
				metalness: .04,
				transparent: true,
				opacity: .7
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(8, 22, 1.28),
			text: "Africa",
			tone: "moss",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(72, -42, 1.22),
			text: "Greenland",
			tone: "ice",
			occlude: false
		})
	] });
}
function Gores() {
	const q = useQuality();
	const strips = (0, import_react.useMemo)(() => {
		const out = [];
		const segs = Math.max(24, Math.floor(q.terrain / 6));
		for (let i = 0; i < 8; i++) {
			const g = new PlaneGeometry(.82, 2.55, 4, segs);
			const pos = g.attributes.position;
			const col = new Float32Array(pos.count * 3);
			const lon0 = -180 + i * 45 + 22.5;
			for (let v = 0; v < pos.count; v++) {
				const y = pos.getY(v);
				const lat = y / 1.275 * 90;
				const half = Math.max(.08, Math.cos(MathUtils.degToRad(lat)) * .4);
				pos.setX(v, pos.getX(v) * 2 * half);
				pos.setZ(v, (1 - Math.abs(y) / 1.28) * .08);
				const lon = lon0 + pos.getX(v) * 40;
				const c = new Color(lon > -10 && lon < 50 && lat > -35 && lat < 35 ? PBR.crust.color : lon > -60 && lon < -15 && lat > 58 ? PBR.ice.color : PBR.water.color);
				col[v * 3] = c.r;
				col[v * 3 + 1] = c.g;
				col[v * 3 + 2] = c.b;
			}
			g.setAttribute("color", new BufferAttribute(col, 3));
			g.computeVertexNormals();
			out.push(g);
		}
		return out;
	}, [q.terrain]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			0,
			.2,
			0
		],
		rotation: [
			-.18,
			0,
			0
		],
		children: [
			strips.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: g,
				position: [
					(i - 3.5) * .92,
					0,
					0
				],
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					vertexColors: true,
					roughness: .78,
					metalness: .04,
					side: 2
				})
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					(4 / 8 - 3.5) * .92,
					.15,
					.2
				],
				text: "Africa",
				tone: "moss",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					138 / 45 * .92 - 3.22,
					1.05,
					.2
				],
				text: "Greenland",
				tone: "ice",
				occlude: false
			})
		]
	});
}
function Mercator() {
	const q = useQuality();
	const grid = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let lon = -180; lon <= 180; lon += 30) {
			const x = lon / 180 * 3.4;
			pts.push(new Vector3(x, .02, -2.2), new Vector3(x, .02, 2.4));
		}
		for (let lat = -75; lat <= 80; lat += 15) {
			const zz = Math.log(Math.tan(Math.PI / 4 + MathUtils.degToRad(MathUtils.clamp(lat, -85, 85)) / 2)) / 2.4 * 1.35;
			pts.push(new Vector3(-3.4, .02, zz), new Vector3(3.4, .02, zz));
		}
		return new BufferGeometry().setFromPoints(pts);
	}, []);
	const segs = Math.max(12, Math.floor(q.terrain / 12));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		rotation: [
			-.42,
			.2,
			0
		],
		position: [
			0,
			.15,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [
					7.2,
					5.2,
					segs,
					segs
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.water.color,
					roughness: .28,
					metalness: .08
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineSegments", {
				geometry: grid,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", {
					color: "#8B9A97",
					transparent: true,
					opacity: .45
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Land, {
				pts: AFRICA,
				color: PBR.crust.color,
				depth: .05,
				position: [
					.55,
					.03,
					.05
				],
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				scale: 1.15
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Land, {
				pts: GREENLAND_MERC,
				color: PBR.ice.color,
				depth: .05,
				position: [
					0,
					.03,
					0
				],
				rotation: [
					-Math.PI / 2,
					0,
					0
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					.7,
					.35,
					.1
				],
				text: "Africa",
				tone: "moss",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					-.7,
					.55,
					-1.7
				],
				text: "Greenland",
				tone: "ice",
				occlude: false
			})
		]
	});
}
function Stage() {
	const step = useLabControls((s) => s.step);
	const mode = modeOf(useLabControls((s) => s.params.proj), useLabControls((s) => s.params.morph), step);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		mode !== 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 14 }),
		mode === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobeView, {}),
		mode === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gores, {}),
		mode === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mercator, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				mode === 0 ? 1.55 : 2.35,
				0
			],
			children: [mode === 0 ? "Globe · no projection" : mode === 1 ? "Orange-peel gores · tears at the cuts" : "Mercator-like flatten · Greenland balloons", " · every flat map lies somewhere · Greenland vs Africa is the giveaway"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				.4,
				3.4
			],
			[
				0,
				2.1,
				6.4
			],
			[
				0,
				4.2,
				6.8
			],
			[
				3.2,
				2.4,
				5.2
			]
		] })
	] });
}
function MapProjectionsScene() {
	const step = useLabControls((s) => s.step);
	const mode = modeOf(useLabControls((s) => s.params.proj), useLabControls((s) => s.params.morph), step);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "map-projections",
		title: "Map projections",
		camera: {
			position: [
				0,
				.4,
				3.4
			],
			fov: 42
		},
		liveText: `Projection view: ${[
			"globe",
			"gores",
			"Mercator"
		][mode]}. Peel an orange and the skin tears. Greenland is the size lie.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "map-projections",
			title: "Map projections",
			caption: "Globe, orange-peel gores, then Mercator. Greenland is not the size of Africa."
		}),
		minDistance: 2,
		maxDistance: 12,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {})
	});
}
//#endregion
export { MapProjectionsScene as default };
