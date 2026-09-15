import { i as __toESM } from "../_runtime.mjs";
import { R as Vector3, k as Quaternion, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { s as latLonToVector3 } from "./geo-BTPpCsbm.mjs";
import { a as EarthMesh, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback } from "./studio-CNvjqO8z.mjs";
import { i as tubeGeometry } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-DpSMH0wq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUN = new Vector3(3.2, .55, 2.1);
var LON_A = 18;
var LON_B = -162;
function ll(lat, lon, r) {
	const v = latLonToVector3(lat, lon, r);
	return [
		v.x,
		v.y,
		v.z
	];
}
/** Closed meridional cell: aloft latA→latB, return at the surface. */
function meridCell(latA, latB, lon) {
	const pts = [];
	const n = 16;
	for (let i = 0; i <= n; i++) {
		const u = i / n;
		const lat = latA + (latB - latA) * u;
		pts.push(ll(lat, lon, 1.05 + .2 * Math.sin(u * Math.PI)));
	}
	for (let i = n; i >= 0; i--) {
		const u = i / n;
		const lat = latA + (latB - latA) * u;
		pts.push(ll(lat, lon, 1.03));
	}
	return pts;
}
function CellTube({ pts, color, radius }) {
	const q = useQuality();
	const geom = (0, import_react.useMemo)(() => tubeGeometry(pts, radius, Math.max(48, q.sphere), 10), [
		pts,
		radius,
		q.sphere
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geom,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .42,
			metalness: .06,
			transparent: true,
			opacity: .78
		})
	});
}
function Cap({ lat }) {
	const q = useQuality();
	const { pos, quat } = (0, import_react.useMemo)(() => {
		const p = latLonToVector3(lat, 0, 1.012);
		return {
			pos: p,
			quat: new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), p.clone().normalize())
		};
	}, [lat]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: pos,
		quaternion: quat,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.22, Math.max(20, q.sphere / 4)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: PBR.ice.color,
			roughness: PBR.ice.roughness,
			metalness: PBR.ice.metalness,
			transparent: true,
			opacity: .55,
			side: 2
		})]
	});
}
function Cells() {
	useLabTick(1 / 22);
	const t = useLabControls((s) => s.t);
	const itcz = Math.round(Math.sin((t - .22) * Math.PI * 2) * 10);
	const nhH = (0, import_react.useMemo)(() => meridCell(itcz, 30, LON_A), [itcz]);
	const nhF = (0, import_react.useMemo)(() => meridCell(60, 30, LON_A), []);
	const nhP = (0, import_react.useMemo)(() => meridCell(60, 88, LON_A), []);
	const shH = (0, import_react.useMemo)(() => meridCell(itcz, -30, LON_A), [itcz]);
	const shF = (0, import_react.useMemo)(() => meridCell(-60, -30, LON_A), []);
	const shP = (0, import_react.useMemo)(() => meridCell(-60, -88, LON_A), []);
	const nhH2 = (0, import_react.useMemo)(() => meridCell(itcz, 30, LON_B), [itcz]);
	const shH2 = (0, import_react.useMemo)(() => meridCell(itcz, -30, LON_B), [itcz]);
	const nhF2 = (0, import_react.useMemo)(() => meridCell(60, 30, LON_B), []);
	const nhP2 = (0, import_react.useMemo)(() => meridCell(60, 88, LON_B), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, { sunDirection: SUN }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cap, { lat: 90 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cap, { lat: -90 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellTube, {
			pts: nhH,
			color: "#FF6A3D",
			radius: .022
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellTube, {
			pts: nhF,
			color: "#E8B86D",
			radius: .02
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellTube, {
			pts: nhP,
			color: "#7FD4FF",
			radius: .018
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellTube, {
			pts: shH,
			color: "#FF6A3D",
			radius: .022
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellTube, {
			pts: shF,
			color: "#E8B86D",
			radius: .02
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellTube, {
			pts: shP,
			color: "#7FD4FF",
			radius: .018
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellTube, {
			pts: nhH2,
			color: "#FF6A3D",
			radius: .018
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellTube, {
			pts: shH2,
			color: "#FF6A3D",
			radius: .018
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellTube, {
			pts: nhF2,
			color: "#E8B86D",
			radius: .016
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CellTube, {
			pts: nhP2,
			color: "#7FD4FF",
			radius: .015
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(itcz, 8, 1.55),
			text: "ITCZ",
			tone: "moss",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(16, 28, 1.58),
			text: "Hadley 0–30",
			tone: "magma",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(45, 28, 1.52),
			text: "Ferrel 30–60",
			tone: "sandstone",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(74, 20, 1.48),
			text: "Polar 60–90",
			tone: "ice",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(52, -8, 1.5),
			text: "surface westerlies",
			tone: "glacier",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: ll(12, -20, 1.46),
			text: "NE trades",
			tone: "magma",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				1.58,
				0
			],
			children: [
				"Three cells per hemisphere · ITCZ ",
				itcz >= 0 ? `${itcz}°N` : `${-itcz}°S`,
				" · not a one-cell planet"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				.2,
				.35,
				3.35
			],
			[
				1.6,
				.9,
				2.4
			],
			[
				.15,
				1.85,
				2.5
			],
			[
				.2,
				.35,
				3.35
			]
		] })
	] });
}
function ThreeCellScene() {
	const t = useLabControls((s) => s.t);
	const itcz = Math.round(Math.sin((t - .22) * Math.PI * 2) * 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "three-cell",
		title: "Three-cell circulation",
		camera: {
			position: [
				.2,
				.35,
				3.35
			],
			fov: 40
		},
		liveText: `Hadley, Ferrel and Polar cells in both hemispheres. ITCZ near ${itcz}°. UK sits in the surface westerlies.`,
		exaggeration: "Cells are school loops. Real midlatitudes are stormier than a clean Ferrel cell.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "three-cell",
			title: "Three-cell circulation",
			caption: "Hadley 0–30, Ferrel 30–60, Polar 60–90. The ITCZ walks with the seasons. One cell is the textbook error."
		}),
		minDistance: 1.7,
		maxDistance: 7,
		target: [
			0,
			0,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cells, {})
	});
}
//#endregion
export { ThreeCellScene as default };
