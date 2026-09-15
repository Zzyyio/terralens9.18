import { i as __toESM } from "../_runtime.mjs";
import { O as PlaneGeometry, R as Vector3, S as LineSegments, a as Html, f as BufferAttribute, g as Color, n as OrbitControls, p as BufferGeometry, x as LineBasicMaterial, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as ClientCanvas } from "./client-canvas-BQ6Rhz4H.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-CgbbQpyR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Invented hill: knoll + spur + valley. Heights in metres. */
function height(x, y) {
	const knoll = 180 * Math.exp(-((x - .6) ** 2 + (y - .3) ** 2) / .35);
	const knoll2 = 120 * Math.exp(-((x + .9) ** 2 + (y + .7) ** 2) / .28);
	const ridge = 90 * Math.exp(-((y - .15 * x) ** 2) / .18) * (1 / (1 + Math.abs(x + .2)));
	const valley = -70 * Math.exp(-((x + .2 * y) ** 2) / .12) * Math.max(0, 1.2 - Math.abs(y));
	return Math.max(5, knoll + knoll2 + ridge + valley + 40);
}
function Terrain({ mode3d }) {
	const geom = (0, import_react.useMemo)(() => {
		const g = new PlaneGeometry(4.6, 4.6, 80, 80);
		const pos = g.attributes.position;
		const colors = new Float32Array(pos.count * 3);
		const c = new Color();
		for (let i = 0; i < pos.count; i++) {
			const h = height(pos.getX(i), pos.getY(i));
			pos.setZ(i, mode3d ? h / 120 : 0);
			if (h < 40) c.set("#1C2628");
			else if (h < 80) c.set("#7C9A6A");
			else if (h < 140) c.set("#E8B86D");
			else c.set("#F4EFE6");
			colors[i * 3] = c.r;
			colors[i * 3 + 1] = c.g;
			colors[i * 3 + 2] = c.b;
		}
		g.setAttribute("color", new BufferAttribute(colors, 3));
		g.computeVertexNormals();
		return g;
	}, [mode3d]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geom,
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		receiveShadow: true,
		castShadow: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			vertexColors: true,
			roughness: .85
		})
	});
}
function ContourLines({ interval, mode3d }) {
	const obj = (0, import_react.useMemo)(() => {
		const pts = [];
		const res = 90;
		const step = 4.6 / res;
		const levels = [];
		for (let h = interval; h <= 220; h += interval) levels.push(h);
		for (let i = 0; i < res; i++) for (let j = 0; j < res; j++) {
			const x0 = -4.6 / 2 + i * step;
			const y0 = -4.6 / 2 + j * step;
			const x1 = x0 + step;
			const y1 = y0 + step;
			const h00 = height(x0, y0);
			const h10 = height(x1, y0);
			const h01 = height(x0, y1);
			for (const L of levels) {
				march(pts, L, x0, y0, h00, x1, y0, h10, mode3d);
				march(pts, L, x0, y0, h00, x0, y1, h01, mode3d);
			}
		}
		const g = new BufferGeometry().setFromPoints(pts);
		const m = new LineBasicMaterial({ color: 1186332 });
		return new LineSegments(g, m);
	}, [interval, mode3d]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", { object: obj });
}
function march(pts, L, x0, y0, h0, x1, y1, h1, mode3d) {
	if ((h0 - L) * (h1 - L) > 0) return;
	const t = (L - h0) / (h1 - h0 + 1e-6);
	const x = x0 + (x1 - x0) * t;
	const y = y0 + (y1 - y0) * t;
	const z = mode3d ? L / 120 + .012 : .02;
	pts.push(new Vector3(x, z, -y), new Vector3(x + .018, z, -y));
}
function ContoursScene() {
	const interval = useLabControls((s) => s.params.interval ?? 10);
	const labels = useLabControls((s) => s.labels);
	const mode3d = (useLabControls((s) => s.params.mode3d) ?? 1) > .5;
	const setParam = useLabControls((s) => s.setParam);
	const setInspect = useLabControls((s) => s.setInspect);
	const inspect = useLabControls((s) => s.inspect);
	const [spot, setSpot] = (0, import_react.useState)({
		x: .6,
		y: .3,
		h: height(.6, .3)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ClientCanvas, {
			camera: {
				position: [
					3.2,
					3.4,
					3.6
				],
				fov: 42
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .5 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
					position: [
						4,
						6,
						2
					],
					intensity: 1.4,
					castShadow: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terrain, { mode3d }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContourLines, {
					interval,
					mode3d
				}),
				spot && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						spot.x,
						(mode3d ? spot.h / 120 : 0) + .05,
						-spot.y
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.05,
						12,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#E24B4B" })]
				}),
				labels && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
						position: [
							.7,
							1.7,
							-.3
						],
						center: true,
						style: { pointerEvents: "none" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-basalt/80 px-2 py-0.5 font-mono text-[10px] text-chalk",
							children: "Knoll"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
						position: [
							-.2,
							.9,
							1.1
						],
						center: true,
						style: { pointerEvents: "none" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-basalt/80 px-2 py-0.5 font-mono text-[10px] text-ice",
							children: "Valley"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
						position: [
							1.3,
							1.1,
							.6
						],
						center: true,
						style: { pointerEvents: "none" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-basalt/80 px-2 py-0.5 font-mono text-[10px] text-sandstone",
							children: "Spur"
						})
					}),
					spot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
						position: [
							spot.x,
							.4,
							-spot.y
						],
						center: true,
						style: { pointerEvents: "none" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-basalt/80 px-2 py-0.5 font-mono text-[10px] text-fault",
							children: [
								"Spot ",
								spot.h.toFixed(0),
								" m"
							]
						})
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						-Math.PI / 2,
						0,
						0
					],
					position: [
						0,
						-.01,
						0
					],
					onClick: (e) => {
						e.stopPropagation();
						const x = e.point.x;
						const y = -e.point.z;
						const h = height(x, y);
						setSpot({
							x,
							y,
							h
						});
						setInspect({
							name: `${h.toFixed(0)} m`,
							note: "The line through this point is this height. Toggle 2D / 3D: the lines are the hill."
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [4.6, 4.6] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						transparent: true,
						opacity: 0
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
					enablePan: true,
					maxPolarAngle: mode3d ? Math.PI / 2.05 : .02,
					minPolarAngle: mode3d ? .2 : 0
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto absolute right-6 top-[7.5rem] z-10 hidden flex-col gap-2 md:flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setParam("mode3d", mode3d ? 0 : 1),
				className: "rounded-full border border-white/10 bg-basalt/70 px-3 py-1.5 font-mono text-[11px] text-chalk backdrop-blur-xl",
				children: mode3d ? "2D map" : "3D hill"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] text-mist",
				children: "Click the hill to drop a spot height"
			})]
		}),
		inspect && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto absolute bottom-28 left-1/2 z-10 w-[min(28rem,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-white/10 bg-basalt/85 px-4 py-3 backdrop-blur-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] uppercase tracking-[0.14em] text-glacier",
					children: "Inspect"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-medium text-chalk",
					children: inspect.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[12px] leading-5 text-mist",
					children: inspect.note
				})
			]
		})
	] });
}
//#endregion
export { ContoursScene as default };
