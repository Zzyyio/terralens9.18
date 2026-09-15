import { i as __toESM } from "../_runtime.mjs";
import { C as MathUtils, R as Vector3, a as Html, i as Line, n as OrbitControls, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as useWebGL, t as ClientCanvas } from "./client-canvas-BQ6Rhz4H.mjs";
import { l as solarDeclination, n as dayLengthHours, o as formatDay, t as CITIES, u as solarNoonAltitude } from "./geo-BTPpCsbm.mjs";
import { a as EarthMesh, n as AxisLine, o as Graticule, r as CityMarker, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { n as SunMesh } from "./moon-DSIxiLbk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-CNYpp1Su.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SeasonsFallback() {
	const t = useLabControls((s) => s.t);
	const tilt = useLabControls((s) => s.params.tilt ?? 23.44);
	const day = t * 365;
	const theta = (t - 80 / 365) * Math.PI * 2;
	const cx = 200 + 120 * Math.sin(theta);
	const cy = 110 - 48 * Math.cos(theta);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex size-full items-center justify-center bg-void p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-label mb-3",
					children: "2D fallback"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 400 220",
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							width: "400",
							height: "220",
							fill: "#07090C"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: "200",
							cy: "110",
							rx: "120",
							ry: "48",
							fill: "none",
							stroke: "#8B9A97",
							strokeDasharray: "3 4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "200",
							cy: "110",
							r: "14",
							fill: "#E8B86D"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							transform: `translate(${cx} ${cy}) rotate(${-tilt})`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								r: "16",
								fill: "#1a4a6e",
								stroke: "#3EE0C6"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "0",
								y1: "-24",
								x2: "0",
								y2: "24",
								stroke: "#F4EFE6"
							})]
						}),
						[
							"Mar",
							"Jun",
							"Sep",
							"Dec"
						].map((m, i) => {
							const a = i * Math.PI / 2;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								x: 200 + 148 * Math.sin(a),
								y: 114 - 62 * Math.cos(a),
								fill: "#8B9A97",
								fontSize: "10",
								textAnchor: "middle",
								fontFamily: "monospace",
								children: m
							}, m);
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-mono text-sm text-mist",
					children: [
						formatDay(day),
						" · tilt ",
						tilt.toFixed(1),
						"° · WebGL unavailable"
					]
				})
			]
		})
	});
}
var ORBIT_A = 2.85;
function System() {
	useLabTick(1 / 28);
	const t = useLabControls((s) => s.t);
	const params = useLabControls((s) => s.params);
	const labels = useLabControls((s) => s.labels);
	const graticule = useLabControls((s) => s.graticule);
	const tilt = params.tilt ?? 23.44;
	const ecc = params.ecc ?? 0;
	const earthG = (0, import_react.useRef)(null);
	const sunDir = (0, import_react.useMemo)(() => new Vector3(), []);
	const day = t * 365;
	const theta = Math.PI * 2 * (t - 80 / 365);
	const nu = theta - Math.PI * 2 * (3 / 365);
	const r = ORBIT_A * (1 - ecc * ecc) / Math.max(.35, 1 + ecc * Math.cos(nu));
	const x = -r * Math.sin(theta);
	const z = r * Math.cos(theta);
	sunDir.set(-x, 0, -z).normalize();
	const decl = solarDeclination(day, tilt);
	const cities = [
		{
			...CITIES.london,
			color: "#3EE0C6"
		},
		{
			...CITIES.cairo,
			color: "#E8B86D"
		},
		{
			...CITIES.nairobi,
			color: "#7C9A6A"
		},
		{
			...CITIES.sydney,
			color: "#7FD4FF"
		},
		{
			...CITIES.ushuaia,
			color: "#FF6A3D"
		}
	];
	const orbitPts = (0, import_react.useMemo)(() => {
		const pts = [];
		for (let i = 0; i <= 128; i++) {
			const a = i / 128 * Math.PI * 2;
			const rr = ORBIT_A;
			pts.push(new Vector3(-2.85 * Math.sin(a), 0, rr * Math.cos(a)));
		}
		return pts;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .08 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				0,
				0,
				0
			],
			intensity: 40,
			distance: 24,
			color: "#fff1c4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
			points: orbitPts,
			color: "#8B9A97",
			transparent: true,
			opacity: .35
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunMesh, { radius: .22 }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			ref: earthG,
			position: [
				x,
				0,
				z
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				rotation: [
					0,
					0,
					MathUtils.degToRad(tilt)
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, {
						sunDirection: sunDir,
						radius: 1.02,
						clouds: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, { radius: 1.06 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AxisLine, {
						radius: 1.28,
						tiltDeg: 0
					}),
					graticule && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Graticule, { radius: 1.03 }),
					cities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityMarker, {
						lat: c.lat,
						lon: c.lon,
						radius: 1.05,
						color: c.color
					}), labels && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
						position: latLonHtml(c.lat, c.lon, 1.22),
						center: true,
						style: { pointerEvents: "none" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full border border-white/15 bg-basalt/80 px-2 py-0.5 font-mono text-[10px] text-chalk whitespace-nowrap",
							children: c.name
						})
					})] }, c.name))
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {
			day,
			tilt,
			decl,
			ecc
		})
	] });
}
function latLonHtml(lat, lon, r) {
	const phi = MathUtils.degToRad(90 - lat);
	const th = MathUtils.degToRad(lon + 180);
	return [
		-r * Math.sin(phi) * Math.sin(th),
		r * Math.cos(phi),
		r * Math.sin(phi) * Math.cos(th)
	];
}
function Hud({ day, tilt, decl, ecc }) {
	if (!useLabControls((s) => s.labels)) return null;
	const rows = [
		["London", CITIES.london.lat],
		["Nairobi", CITIES.nairobi.lat],
		["Sydney", CITIES.sydney.lat],
		["Ushuaia", CITIES.ushuaia.lat]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
		position: [
			0,
			2.35,
			0
		],
		center: true,
		style: {
			pointerEvents: "none",
			width: 520
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[16px] border border-white/10 bg-basalt/70 px-3 py-2 font-mono text-[11px] text-chalk backdrop-blur-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between text-mist",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDay(day) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"tilt ",
						tilt.toFixed(1),
						"°"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"δ ",
						MathUtils.radToDeg(decl).toFixed(1),
						"°"
					] }),
					ecc > .02 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sandstone",
						children: "e exaggerated"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: rows.map(([name, lat]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-mist",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "tabular-nums",
					children: [
						dayLengthHours(lat, decl).toFixed(1),
						" h · noon",
						" ",
						solarNoonAltitude(lat, decl).toFixed(0),
						"°"
					]
				})] }, name))
			})]
		})
	});
}
function Callouts() {
	const setParam = useLabControls((s) => s.setParam);
	const setGraticule = useLabControls((s) => s.setGraticule);
	const graticule = useLabControls((s) => s.graticule);
	const ecc = useLabControls((s) => s.params.ecc ?? 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-auto absolute right-6 top-[7.5rem] z-10 hidden flex-col gap-2 md:flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setGraticule(!graticule),
			className: "rounded-full border border-white/10 bg-basalt/70 px-3 py-1.5 font-mono text-[11px] text-chalk backdrop-blur-xl",
			children: ["Graticule ", graticule ? "on" : "off"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setParam("ecc", ecc > .05 ? 0 : .32),
			className: "rounded-full border border-white/10 bg-basalt/70 px-3 py-1.5 font-mono text-[11px] text-chalk backdrop-blur-xl",
			children: ecc > .05 ? "Real eccentricity" : "Exaggerate distance"
		})]
	});
}
function SeasonsScene() {
	if (!useWebGL()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonsFallback, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ClientCanvas, {
		camera: {
			position: [
				0,
				1.85,
				6.4
			],
			fov: 38
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(System, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
			enablePan: false,
			minDistance: 4,
			maxDistance: 12,
			target: [
				0,
				0,
				0
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callouts, {})] });
}
//#endregion
export { SeasonsScene as default };
