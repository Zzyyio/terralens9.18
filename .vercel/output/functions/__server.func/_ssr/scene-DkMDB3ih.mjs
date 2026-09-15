import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, R as Vector3, k as Quaternion, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { s as latLonToVector3 } from "./geo-BTPpCsbm.mjs";
import { a as EarthMesh, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3 } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry, o as volcanoProfile, r as latheGeometry } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-DkMDB3ih.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUN = new Vector3(3.1, .55, 1.7);
var PLUME = [19.4, -155.3];
var YELLOW = [44.6, -110.6];
var AGES = [
	0,
	1,
	3,
	5,
	7,
	10
];
function ll(lat, lon, r) {
	const v = latLonToVector3(lat, lon, r);
	return [
		v.x,
		v.y,
		v.z
	];
}
function orient(lat, lon, r) {
	const p = latLonToVector3(lat, lon, r);
	return {
		p,
		q: new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), p.clone().normalize())
	};
}
function Plume({ lat, lon, color }) {
	const { p, q } = (0, import_react.useMemo)(() => orient(lat, lon, .72), [lat, lon]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: p,
		quaternion: q,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.16,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.018,
				.045,
				.55,
				20
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color,
				emissive: color,
				emissiveIntensity: .7,
				roughness: .35,
				metalness: .1
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.42,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.038,
				20,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color,
				emissive: color,
				emissiveIntensity: .85,
				roughness: .3
			})]
		})]
	});
}
function HawaiiPlate({ t }) {
	const q = useQuality();
	const young = (0, import_react.useMemo)(() => latheGeometry(volcanoProfile(.28), q.lathe), [q.lathe]);
	const old = (0, import_react.useMemo)(() => latheGeometry(volcanoProfile(.58), q.lathe), [q.lathe]);
	const { p, q: quat } = (0, import_react.useMemo)(() => orient(PLUME[0], PLUME[1], 1.018), []);
	const path = (0, import_react.useMemo)(() => {
		const pts = AGES.map((_, i) => [
			-(i * .095),
			.012,
			-(i * .058)
		]);
		return tubeGeometry(pts, .006, 20, 8);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: p,
		quaternion: quat,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				-t * .32,
				0,
				-t * .18
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: path,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#E8B86D",
					roughness: .4,
					metalness: .1
				})
			}), AGES.map((age, i) => {
				const scale = MathUtils.lerp(.055, .028, Math.min(1, age / 10));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						-(i * .095),
						0,
						-(i * .058)
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: age < 2 ? young : old,
						scale,
						castShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: age >= 7 ? PBR.basalt.color : age === 0 ? PBR.magma.color : PBR.rock.color,
							roughness: .82,
							metalness: .06,
							emissive: age === 0 ? PBR.magma.emissive : "#000000",
							emissiveIntensity: age === 0 ? .55 : 0
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
						pos: [
							0,
							scale * 2.5,
							0
						],
						text: `${age} Ma`,
						tone: age === 0 ? "magma" : "sandstone",
						occlude: false
					})]
				}, age);
			})]
		})
	});
}
function Slab() {
	const q = useQuality();
	const { p, q: quat } = (0, import_react.useMemo)(() => orient(YELLOW[0], YELLOW[1], 1.045), []);
	const track = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let i = 0; i < 6; i++) {
			const v = latLonToVector3(YELLOW[0] - i * 1.15, YELLOW[1] - i * 1.7, 1.05);
			pts.push([
				v.x,
				v.y,
				v.z
			]);
		}
		return tubeGeometry(pts, .01, 24, 8);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: p,
			quaternion: quat,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.46,
					.045,
					.28,
					14,
					2,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.crust.color,
					roughness: .88,
					metalness: .03
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.1,
					.035,
					-.03
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.04,
					.048,
					.035,
					Math.max(16, q.lathe / 4)
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: PBR.ash.color,
					roughness: .8,
					metalness: .04
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: track,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#E8B86D",
				roughness: .45,
				metalness: .08
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plume, {
			lat: YELLOW[0],
			lon: YELLOW[1],
			color: "#FF6A3D"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(YELLOW[0], YELLOW[1], 1.28),
			text: "Yellowstone plume",
			tone: "magma",
			occlude: false
		})
	] });
}
function Stage() {
	useLabTick(1 / 14);
	const t = useLabControls((s) => s.t);
	const hi = (useLabControls((s) => s.params.hawaii) ?? 1) > .5;
	const ye = (useLabControls((s) => s.params.yellowstone) ?? 0) > .5;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, { sunDirection: SUN }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
		hi && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HawaiiPlate, { t }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plume, {
				lat: PLUME[0],
				lon: PLUME[1],
				color: "#FF8A3A"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
				from: ll(22, -158, 1.12),
				to: ll(26, -166, 1.12),
				color: "#7FD4FF",
				radius: .014
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: ll(PLUME[0] - 4, PLUME[1], 1.26),
				text: "plume fixed",
				tone: "magma",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: ll(24, -162, 1.28),
				text: "plate moves",
				tone: "glacier",
				occlude: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				pos: ll(26.5, -168, 1.24),
				text: "age direction NW",
				tone: "sandstone",
				occlude: false
			})
		] }),
		ye && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slab, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				1.58,
				0
			],
			children: "Hawaii 0–10 Ma · plume stays, Pacific plate slides NW · Yellowstone is a second plume under a continent slab"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			ll(20, -158, 3.2),
			[
				.4,
				1.1,
				3.4
			],
			ll(44, -112, 3.1),
			[
				0,
				2.6,
				3.4
			]
		] })
	] });
}
function HotspotsScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "hotspots",
		title: "Hotspots",
		camera: {
			position: [
				.4,
				1.1,
				3.4
			],
			fov: 42
		},
		liveText: "Hawaii ages northwest. The plume is fixed; the Pacific plate moves. Yellowstone is a second, continental plume.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "hotspots",
			title: "Hotspots",
			caption: "Hawaii: young island, older seamounts northwest. The plume stays. The plate slides. Yellowstone is the continental analogue."
		}),
		minDistance: 2.1,
		maxDistance: 7,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {})
	});
}
//#endregion
export { HotspotsScene as default };
