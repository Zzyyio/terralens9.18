import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, R as Vector3, a as Html, n as OrbitControls, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as ClientCanvas } from "./client-canvas-BQ6Rhz4H.mjs";
import { a as EarthMesh, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { n as SunMesh, t as MoonMesh } from "./moon-DSIxiLbk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-B8TvmRAX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PHASES = [
	"New",
	"Waxing crescent",
	"First quarter",
	"Waxing gibbous",
	"Full",
	"Waning gibbous",
	"Last quarter",
	"Waning crescent"
];
function System() {
	useLabTick(1 / 22);
	const t = useLabControls((s) => s.t);
	const labels = useLabControls((s) => s.labels);
	const align = (useLabControls((s) => s.params.align) ?? 0) > .5;
	const tilt = align ? 0 : 5;
	const angle = t * Math.PI * 2;
	const moonR = 2.35;
	const incl = MathUtils.degToRad(tilt);
	const mx = Math.cos(angle) * moonR;
	const my = Math.sin(angle) * moonR * Math.sin(incl);
	const mz = Math.sin(angle) * moonR * Math.cos(incl);
	const phaseIdx = Math.round(t * 8) % 8;
	const sunDir = (0, import_react.useMemo)(() => new Vector3(1, 0, 0), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .06 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				12,
				0,
				0
			],
			intensity: 3.2,
			color: "#fff4dc"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				8.5,
				0,
				0
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunMesh, { radius: .55 })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, {
			sunDirection: sunDir,
			radius: .55
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, { radius: .58 })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				mx,
				my,
				mz
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonMesh, { radius: .27 })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				incl,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				2.3400000000000003,
				2.36,
				96
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#8B9A97",
				transparent: true,
				opacity: .35,
				side: 2
			})]
		}),
		labels && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
				position: [
					0,
					1.55,
					0
				],
				center: true,
				style: { pointerEvents: "none" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[16px] border border-white/10 bg-basalt/70 px-3 py-2 text-center font-mono text-[11px] text-chalk",
					children: [
						PHASES[phaseIdx],
						" · day ",
						(t * 29.53).toFixed(1),
						" of synodic month",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-mist",
							children: [
								"Orbit tilt ",
								tilt.toFixed(0),
								"° · ",
								align ? "eclipse possible" : "usually misses shadow"
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
				position: [
					mx,
					my + .38,
					mz
				],
				center: true,
				style: { pointerEvents: "none" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] text-chalk",
					children: "Moon"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
				position: [
					0,
					-.78,
					0
				],
				center: true,
				style: { pointerEvents: "none" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[10px] text-chalk",
					children: "Earth"
				})
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseDisc, { t })
	] });
}
function PhaseDisc({ t }) {
	if (!useLabControls((s) => s.labels)) return null;
	const k = (1 - Math.cos(t * Math.PI * 2)) / 2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
		position: [
			-3.2,
			-1.6,
			0
		],
		center: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[16px] border border-white/10 bg-basalt/75 p-3 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-mist",
					children: "UK / US night sky"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					width: "72",
					height: "72",
					viewBox: "0 0 72 72",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "36",
							cy: "36",
							r: "30",
							fill: "#1C2628"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "36",
							cy: "36",
							r: "30",
							fill: "#F4EFE6"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: 36 + (t < .5 ? 30 * (1 - 2 * t) * 2 : 0),
							cy: "36",
							rx: Math.abs(Math.cos(t * Math.PI * 2)) * 30,
							ry: "30",
							fill: t < .5 ? "#1C2628" : "#F4EFE6"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: t < .5 ? 6 : 36,
							y: "6",
							width: "30",
							height: "60",
							fill: t < .5 ? "#1C2628" : "#F4EFE6"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-mono text-[10px] text-mist",
					children: [Math.round(k * 100), "% lit"]
				})
			]
		})
	});
}
function MoonScene() {
	const setParam = useLabControls((s) => s.setParam);
	const align = useLabControls((s) => s.params.align ?? 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ClientCanvas, {
		camera: {
			position: [
				0,
				2.4,
				6.2
			],
			fov: 42
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(System, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
			enablePan: false,
			minDistance: 4,
			maxDistance: 12
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setParam("align", align > .5 ? 0 : 1),
		className: "pointer-events-auto absolute right-6 top-[7.5rem] z-10 hidden rounded-full border border-white/10 bg-basalt/70 px-3 py-1.5 font-mono text-[11px] text-chalk backdrop-blur-xl md:block",
		children: ["Eclipse alignment ", align > .5 ? "on (0° tilt)" : "off (5° tilt)"]
	})] });
}
//#endregion
export { MoonScene as default };
