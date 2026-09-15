import { i as __toESM } from "../_runtime.mjs";
import { R as Vector3, c as useFrame, i as Line, k as Quaternion, p as BufferGeometry, v as Float32BufferAttribute, w as Matrix4, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality } from "./perf-Cy1NcWbY.mjs";
import { s as latLonToVector3 } from "./geo-BTPpCsbm.mjs";
import { a as EarthMesh, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-B3f0a5ix.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KIND = {
	divergent: {
		color: "#3EE0C6",
		dash: false,
		label: "Divergent",
		style: "solid · ridge / rift"
	},
	convergent: {
		color: "#FF6A3D",
		dash: false,
		label: "Convergent",
		style: "teeth · trench / collision"
	},
	transform: {
		color: "#E8B86D",
		dash: true,
		label: "Transform",
		style: "dashed · slide past"
	}
};
var BOUNDARIES = [
	{
		kind: "divergent",
		pts: [
			[66, -18],
			[54, -30],
			[40, -30],
			[20, -40],
			[0, -28],
			[-20, -24],
			[-40, -28],
			[-54, -30]
		]
	},
	{
		kind: "divergent",
		pts: [
			[10, -105],
			[0, -102],
			[-15, -110],
			[-30, -112],
			[-50, -90]
		]
	},
	{
		kind: "divergent",
		pts: [
			[12, 38],
			[3, 36],
			[-3, 36],
			[-10, 34],
			[-18, 32]
		]
	},
	{
		kind: "convergent",
		pts: [
			[8, -80],
			[-5, -78],
			[-18, -72],
			[-32, -74],
			[-45, -76],
			[-55, -72]
		]
	},
	{
		kind: "convergent",
		pts: [
			[50, -130],
			[46, -126],
			[42, -125],
			[38, -123]
		]
	},
	{
		kind: "convergent",
		pts: [
			[55, 164],
			[50, 155],
			[42, 144],
			[35, 141],
			[24, 143],
			[12, 145]
		]
	},
	{
		kind: "convergent",
		pts: [
			[28, 86],
			[30, 81],
			[34, 76],
			[36, 72]
		]
	},
	{
		kind: "convergent",
		pts: [
			[22, 92],
			[10, 96],
			[-5, 102],
			[-10, 110],
			[-8, 118]
		]
	},
	{
		kind: "convergent",
		pts: [
			[-15, -175],
			[-22, -175],
			[-32, 180],
			[-38, 175]
		]
	},
	{
		kind: "transform",
		pts: [
			[40.5, -124.5],
			[37.7, -122.4],
			[35.5, -121],
			[34.5, -119.8],
			[32.7, -117]
		]
	},
	{
		kind: "transform",
		pts: [
			[41, 28],
			[40.5, 32],
			[40, 36],
			[39.2, 40]
		]
	},
	{
		kind: "transform",
		pts: [
			[-42, 172],
			[-43.5, 170],
			[-45, 168]
		]
	}
];
var HAWAII = [
	{
		ll: [19.5, -155.5],
		age: 0,
		name: "Hawaiʻi"
	},
	{
		ll: [20.9, -156.6],
		age: 1.3,
		name: "Maui"
	},
	{
		ll: [21.5, -158],
		age: 3,
		name: "Oʻahu"
	},
	{
		ll: [22.1, -159.5],
		age: 5,
		name: "Kauaʻi"
	},
	{
		ll: [28.2, -177.4],
		age: 28,
		name: "Midway"
	},
	{
		ll: [32, 172],
		age: 47,
		name: "bend"
	},
	{
		ll: [45, 170],
		age: 60,
		name: "Emperor"
	},
	{
		ll: [51, 168],
		age: 76,
		name: "Detroit"
	}
];
var SITES = [
	{
		id: "iceland",
		name: "Iceland",
		kind: "divergent",
		lat: 64.8,
		lon: -18,
		note: "Mid-Atlantic Ridge on land · new crust"
	},
	{
		id: "himalaya",
		name: "Himalaya",
		kind: "convergent",
		lat: 28.6,
		lon: 84,
		note: "India stacked on Eurasia · collision"
	},
	{
		id: "sanandreas",
		name: "San Andreas",
		kind: "transform",
		lat: 36.4,
		lon: -121.2,
		note: "Pacific vs N America · slide, few volcanoes"
	},
	{
		id: "cascadia",
		name: "Cascadia",
		kind: "convergent",
		lat: 45.2,
		lon: -125.2,
		note: "Juan de Fuca diving under N America"
	}
];
var ARROWS = [
	{
		lat: 8,
		lon: -38,
		dlat: 1,
		dlon: 14,
		kind: "divergent"
	},
	{
		lat: 8,
		lon: -12,
		dlat: 1,
		dlon: -12,
		kind: "divergent"
	},
	{
		lat: 16,
		lon: 78,
		dlat: 14,
		dlon: 2,
		kind: "convergent"
	},
	{
		lat: 36,
		lon: -123.5,
		dlat: 4,
		dlon: -3.5,
		kind: "transform"
	},
	{
		lat: 44,
		lon: -128.5,
		dlat: 0,
		dlon: 6,
		kind: "convergent"
	},
	{
		lat: -12,
		lon: -78,
		dlat: 0,
		dlon: 8,
		kind: "convergent"
	}
];
var INDIA_NOW = [
	[8, 77],
	[15, 74],
	[23, 70],
	[28, 76],
	[26, 88],
	[22, 88],
	[12, 80]
];
var INDIA_THEN = [
	[-38, 48],
	[-30, 44],
	[-22, 42],
	[-18, 50],
	[-22, 60],
	[-30, 58],
	[-38, 54]
];
function ll3(lat, lon, r) {
	const v = latLonToVector3(lat, lon, r);
	return [
		v.x,
		v.y,
		v.z
	];
}
function lerpLL(a, b, k) {
	return [a[0] * (1 - k) + b[0] * k, a[1] * (1 - k) + b[1] * k];
}
function sphericalPatch(pts, r) {
	const verts = pts.map(([lat, lon]) => latLonToVector3(lat, lon, r));
	const c = verts.reduce((acc, v) => acc.add(v), new Vector3()).normalize().multiplyScalar(r);
	const g = new BufferGeometry();
	const pos = [];
	const nrm = [];
	for (let i = 0; i < verts.length; i++) {
		const b = verts[i];
		const d = verts[(i + 1) % verts.length];
		pos.push(c.x, c.y, c.z, b.x, b.y, b.z, d.x, d.y, d.z);
		nrm.push(c.x, c.y, c.z, b.x, b.y, b.z, d.x, d.y, d.z);
	}
	g.setAttribute("position", new Float32BufferAttribute(pos, 3));
	g.setAttribute("normal", new Float32BufferAttribute(nrm, 3));
	return g;
}
function Arrow({ lat, lon, dlat, dlon, color }) {
	const { pos, quat } = (0, import_react.useMemo)(() => {
		const a = latLonToVector3(lat, lon, 1.045);
		const b = latLonToVector3(lat + dlat, lon + dlon, 1.045);
		const radial = a.clone().normalize();
		const y = b.clone().sub(a).normalize();
		const x = radial.clone().cross(y).normalize();
		const z = x.clone().cross(y).normalize();
		const m = new Matrix4().makeBasis(x, y, z);
		return {
			pos: a,
			quat: new Quaternion().setFromRotationMatrix(m)
		};
	}, [
		lat,
		lon,
		dlat,
		dlon
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: pos,
		quaternion: quat,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.04,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.007,
				.007,
				.08,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color,
				roughness: .35,
				metalness: .15
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.09,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
				.016,
				.046,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color,
				roughness: .32,
				metalness: .15
			})]
		})]
	});
}
function Teeth({ pts, color }) {
	const items = (0, import_react.useMemo)(() => {
		const out = [];
		for (let i = 0; i < pts.length - 1; i++) {
			const a = latLonToVector3(pts[i][0], pts[i][1], 1.028);
			const b = latLonToVector3(pts[i + 1][0], pts[i + 1][1], 1.028);
			const mid = a.clone().add(b).multiplyScalar(.5).normalize().multiplyScalar(1.028);
			const along = b.clone().sub(a).normalize();
			const radial = mid.clone().normalize();
			const y = new Vector3().crossVectors(radial, along).normalize();
			const x = along;
			const z = new Vector3().crossVectors(x, y).normalize();
			out.push({
				pos: mid,
				quat: new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(x, y, z))
			});
		}
		return out;
	}, [pts]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: it.pos,
		quaternion: it.quat,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
			.014,
			.042,
			16
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .4,
			metalness: .08
		})]
	}, i)) });
}
function Boundary({ kind, pts }) {
	const spec = KIND[kind];
	const points = (0, import_react.useMemo)(() => pts.map(([lat, lon]) => latLonToVector3(lat, lon, 1.018)), [pts]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
		points,
		color: spec.color,
		lineWidth: kind === "divergent" ? 2.2 : 1.8,
		dashed: spec.dash,
		dashSize: .045,
		gapSize: .028
	}), kind === "convergent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Teeth, {
		pts,
		color: spec.color
	})] });
}
function SitePin({ site, selected, onPick }) {
	const q = useQuality();
	const p = (0, import_react.useMemo)(() => latLonToVector3(site.lat, site.lon, 1.04), [site.lat, site.lon]);
	const color = KIND[site.kind].color;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: p,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			onClick: (e) => {
				e.stopPropagation();
				onPick();
			},
			onPointerOver: () => {
				document.body.style.cursor = "pointer";
			},
			onPointerOut: () => {
				document.body.style.cursor = "auto";
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				selected ? .038 : .026,
				q.sphere,
				q.sphere
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color,
				emissive: color,
				emissiveIntensity: selected ? .85 : .35,
				roughness: .3
			})]
		}), selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
			.045,
			.06,
			28
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			color,
			side: 2
		})] })]
	});
}
function GlobeRig({ lat, lon, children }) {
	const ref = (0, import_react.useRef)(null);
	const qTo = (0, import_react.useMemo)(() => new Quaternion(), []);
	const toward = (0, import_react.useMemo)(() => new Vector3(0, .14, 1).normalize(), []);
	const site = (0, import_react.useMemo)(() => new Vector3(), []);
	useFrame(() => {
		if (!ref.current) return;
		if (lat == null || lon == null) qTo.identity();
		else {
			const v = latLonToVector3(lat, lon, 1);
			site.copy(v).normalize();
			qTo.setFromUnitVectors(site, toward);
		}
		ref.current.quaternion.slerp(qTo, .055);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref,
		children
	});
}
function Model() {
	const age = useLabControls((s) => s.params.ageMa ?? 0);
	const hotspot = (useLabControls((s) => s.params.hotspot) ?? 0) > .5;
	const q = useQuality();
	const [picked, setPicked] = (0, import_react.useState)(null);
	const sun = (0, import_react.useMemo)(() => new Vector3(3.2, .45, 2.1), []);
	const k = Math.min(1, age / 200);
	const site = SITES.find((s) => s.id === picked) ?? null;
	const indiaPts = (0, import_react.useMemo)(() => INDIA_NOW.map((p, i) => lerpLL(p, INDIA_THEN[i], k)), [k]);
	const indiaGeom = (0, import_react.useMemo)(() => sphericalPatch(indiaPts, 1.012), [indiaPts]);
	const indiaOutline = (0, import_react.useMemo)(() => indiaPts.map(([lat, lon]) => latLonToVector3(lat, lon, 1.016)), [indiaPts]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlobeRig, {
			lat: site?.lat ?? null,
			lon: site?.lon ?? null,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, { sunDirection: sun }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
				BOUNDARIES.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundary, {
					kind: b.kind,
					pts: b.pts
				}, i)),
				ARROWS.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, {
					lat: a.lat,
					lon: a.lon,
					dlat: a.dlat,
					dlon: a.dlon,
					color: KIND[a.kind].color
				}, i)),
				SITES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SitePin, {
					site: s,
					selected: picked === s.id,
					onPick: () => setPicked(picked === s.id ? null : s.id)
				}, s.id)),
				k > .04 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: indiaGeom,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#FF6A3D",
						transparent: true,
						opacity: .15 + k * .45,
						roughness: .7,
						side: 2
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					points: indiaOutline,
					color: "#FF6A3D",
					lineWidth: 1.4,
					dashed: true,
					dashSize: .03,
					gapSize: .02
				})] }),
				hotspot && HAWAII.map((h, i) => {
					const p = latLonToVector3(h.ll[0], h.ll[1], 1.032);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: p,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							i === 0 ? .028 : .014,
							q.sphere,
							q.sphere
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: i === 0 ? "#FF6A3D" : "#E8B86D",
							emissive: i === 0 ? "#FF6A3D" : "#000",
							emissiveIntensity: i === 0 ? .55 : 0,
							roughness: .4
						})]
					}, h.name);
				}),
				hotspot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					points: HAWAII.map((h) => latLonToVector3(h.ll[0], h.ll[1], 1.03)),
					color: "#E8B86D",
					lineWidth: 1.1,
					dashed: true,
					dashSize: .03,
					gapSize: .02
				}),
				SITES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: ll3(s.lat, s.lon, 1.2),
					text: s.name,
					tone: s.kind === "divergent" ? "glacier" : s.kind === "convergent" ? "magma" : "sandstone",
					occlude: false,
					note: s.note
				}, `t-${s.id}`)),
				hotspot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: ll3(20, -155, 1.22),
					text: "Hawaii chain · older NW",
					tone: "magma",
					occlude: false,
					note: "Hotspot stays. The plate moves. Islands age northwest. Not a subduction arc."
				}),
				k > .15 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: ll3(indiaPts[3][0], indiaPts[3][1], 1.18),
					text: "India walks north",
					tone: "magma",
					occlude: false,
					note: "Continent–continent convergence. The Himalaya are the crumple, not a volcanic arc."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				2.05,
				.55,
				.4
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					points: [new Vector3(0, .42, 0), new Vector3(.42, .42, 0)],
					color: "#3EE0C6",
					lineWidth: 2
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: [
						.72,
						.42,
						0
					],
					text: "Divergent · solid",
					tone: "glacier",
					occlude: false,
					note: "Plates pull apart. Ridge or rift. New crust."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					points: [new Vector3(0, .18, 0), new Vector3(.42, .18, 0)],
					color: "#FF6A3D",
					lineWidth: 2
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: [
						.78,
						.18,
						0
					],
					text: "Convergent · teeth",
					tone: "magma",
					occlude: false,
					note: "Plates meet. Trench, island arc, or collision mountains."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
					points: [new Vector3(0, -.06, 0), new Vector3(.42, -.06, 0)],
					color: "#E8B86D",
					lineWidth: 2,
					dashed: true,
					dashSize: .05,
					gapSize: .03
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: [
						.78,
						-.06,
						0
					],
					text: "Transform · dashed",
					tone: "sandstone",
					occlude: false,
					note: "Plates slide past. San Andreas is this, not a volcanic arc."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readout, {
			pos: [
				0,
				-1.55,
				0
			],
			children: site ? `${site.name} · ${site.note}` : age < 2 ? "Present day · click Iceland / Himalaya / San Andreas / Cascadia" : `Pangaea reconstruction · ${age.toFixed(0)} Ma · Atlantic not yet open`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				.45,
				3.2
			],
			[
				.2,
				.7,
				2.7
			],
			[
				0,
				.35,
				3.4
			],
			[
				0,
				.45,
				3.2
			]
		] })
	] });
}
function PlatesScene() {
	const age = useLabControls((s) => s.params.ageMa ?? 0);
	const hotspot = (useLabControls((s) => s.params.hotspot) ?? 0) > .5;
	const live = age > 8 ? `Plate boundaries at ${age.toFixed(0)} Ma. Pangaea still packing; India has not yet hit Asia.` : hotspot ? "Hawaii hotspot chain: the plume stays, the Pacific plate slides northwest." : "Three boundary types: solid divergent, teeth convergent, dashed transform.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "plate-boundaries",
		title: "Plate boundaries",
		camera: {
			position: [
				0,
				.45,
				3.2
			],
			fov: 40
		},
		liveText: live,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "plate-boundaries",
			title: "Plate boundaries",
			caption: live
		}),
		minDistance: 2.1,
		maxDistance: 6,
		target: [
			0,
			0,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { PlatesScene as default };
