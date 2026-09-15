import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, O as PlaneGeometry, R as Vector3, p as BufferGeometry, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-D1f-sWZM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SIZE = 6;
var KM = SIZE / 10;
function gridLines(origin, extent, n, y) {
	const pts = [];
	const [ox, oz] = origin;
	for (let i = 0; i <= n; i++) {
		const u = ox + i / n * extent;
		pts.push(new Vector3(u, y, oz), new Vector3(u, y, oz + extent));
		const v = oz + i / n * extent;
		pts.push(new Vector3(ox, y, v), new Vector3(ox + extent, y, v));
	}
	return new BufferGeometry().setFromPoints(pts);
}
function House({ pos }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: pos,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.055,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.09,
				.07,
				.08,
				6,
				4,
				6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#d8c4a8",
				roughness: .86,
				metalness: .04
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.11,
				0
			],
			rotation: [
				0,
				Math.PI / 4,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
				.078,
				.07,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.granite.color,
				roughness: .7,
				metalness: .05
			})]
		})]
	});
}
function Tile() {
	useLabTick(1 / 22);
	const t = useLabControls((s) => s.t);
	const playing = useLabControls((s) => s.playing);
	const eParam = useLabControls((s) => s.params.easting ?? 246);
	const nParam = useLabControls((s) => s.params.northing ?? 513);
	const e = Math.round(playing ? t * 999 : eParam);
	const n = Math.round(playing ? t * 2.15 % 1 * 999 : nParam);
	const q = useQuality();
	const nrm = useRockNormal();
	const kmE = Math.floor(e / 100);
	const kmN = Math.floor(n / 100);
	const mE = Math.floor(e % 100 / 10);
	const mN = Math.floor(n % 100 / 10);
	const x0 = -3;
	const z0 = SIZE / 2;
	const sqX = x0 + kmE * KM;
	const sqZ = z0 - (kmN + 1) * KM;
	const tileX = sqX + (mE + .5) * (KM / 10);
	const tileZ = sqZ + (1 - (mN + .5) / 10) * KM;
	const kmGrid = (0, import_react.useMemo)(() => gridLines([x0, -3], SIZE, 10, .018), [x0]);
	const inner = (0, import_react.useMemo)(() => gridLines([sqX, sqZ], KM, 10, .03), [sqX, sqZ]);
	const segs = Math.max(10, Math.floor(q.terrain / 16));
	const land = (0, import_react.useMemo)(() => {
		const g = new PlaneGeometry(SIZE, SIZE, segs, segs);
		const pos = g.attributes.position;
		for (let i = 0; i < pos.count; i++) pos.setZ(i, (Math.sin(pos.getX(i) * .7) + Math.cos(pos.getY(i) * .9)) * .04);
		g.computeVertexNormals();
		return g;
	}, [segs]);
	const six = `${String(e).padStart(3, "0")}${String(n).padStart(3, "0")}`;
	const four = `${String(kmE).padStart(2, "0")}${String(kmN).padStart(2, "0")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		rotation: [
			-.52,
			.38,
			.04
		],
		position: [
			0,
			.35,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: land,
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				receiveShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3d4a3a",
					roughness: .92,
					metalness: .02,
					normalMap: nrm,
					normalScale: new Vector2(.45, .45)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				position: [
					0,
					.008,
					0
				],
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [
					SIZE,
					SIZE,
					q.terrain > 120 ? 20 : 12,
					q.terrain > 120 ? 20 : 12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cfc6b0",
					roughness: .9,
					metalness: .02,
					transparent: true,
					opacity: .88
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineSegments", {
				geometry: kmGrid,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", { color: "#2a6b8a" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineSegments", {
				geometry: inner,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", { color: "#3EE0C6" })
			}, `${kmE}-${kmN}`),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					sqX + KM / 2,
					.012,
					sqZ + KM / 2
				],
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [KM * .98, KM * .98] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3EE0C6",
					transparent: true,
					opacity: .16,
					roughness: .7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					tileX,
					.028,
					tileZ
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					KM / 10,
					.03,
					KM / 10,
					6,
					2,
					6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#E8B86D",
					roughness: .55,
					metalness: .08,
					emissive: "#E8B86D",
					emissiveIntensity: .18
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { pos: [
				tileX,
				.04,
				tileZ
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
				from: [
					-3.15,
					.08,
					2.85
				],
				to: [
					-1.4,
					.08,
					2.85
				],
				color: "#E8B86D",
				radius: .028
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
				from: [
					-3.15,
					.08,
					2.85
				],
				to: [
					-3.15,
					.08,
					1.3
				],
				color: "#3EE0C6",
				radius: .028
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					-1.5,
					.28,
					2.85
				],
				text: "Easting first",
				tone: "sandstone",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					-3.15,
					.32,
					1.35
				],
				text: "Northing second",
				tone: "glacier",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: [
					tileX,
					.28,
					tileZ
				],
				text: "100 m",
				tone: "moss",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
				pos: [
					0,
					2.15,
					0
				],
				children: [
					"Six-figure ",
					six,
					" · 1 km square ",
					four,
					" · the 100 m tile is a square, not a pin · along the corridor, up the stairs"
				]
			})
		]
	});
}
function Stage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.2,
				5.6,
				6.2
			],
			[
				-2.4,
				3.2,
				4.8
			],
			[
				2.8,
				3.6,
				3.4
			],
			[
				.6,
				2.4,
				3.2
			]
		] })
	] });
}
function GridReferencesScene() {
	const e = Math.round(useLabControls((s) => s.params.easting ?? 246));
	const n = Math.round(useLabControls((s) => s.params.northing ?? 513));
	const six = `${String(e).padStart(3, "0")}${String(n).padStart(3, "0")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "grid-references",
		title: "Grid references",
		camera: {
			position: [
				.2,
				5.6,
				6.2
			],
			fov: 40
		},
		liveText: `OS six-figure ${six}. Eastings then northings. A six-figure reference is a 100 metre square, not a pin.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "grid-references",
			title: "Grid references",
			caption: "Eastings then northings. Four-figure is 1 km. Six-figure is a 100 m square, not a lamp-post."
		}),
		minDistance: 2.4,
		maxDistance: 14,
		target: [
			0,
			.2,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {})
	});
}
//#endregion
export { GridReferencesScene as default };
