import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { L as Vector2, R as Vector3, T as MeshStandardMaterial, a as Html, c as useFrame, k as Quaternion, n as OrbitControls, t as ContactShadows, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, c as usePrefersReducedMotion, i as useQuality } from "./perf-Cy1NcWbY.mjs";
import { n as useWebGL, t as ClientCanvas } from "./client-canvas-BQ6Rhz4H.mjs";
import { t as LabThumb } from "./lab-thumb-dlTGNI-V.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-CNvjqO8z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GenericFallback({ slug, title, caption }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex size-full flex-col items-center justify-center bg-void p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full max-w-lg overflow-hidden rounded-2xl border border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-[16/10] bg-trench",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabThumb, { slug })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 font-mono text-sm text-mist",
				children: [
					"2D fallback · ",
					title,
					" · WebGL unavailable"
				]
			}),
			caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-center text-sm text-chalk/80",
				children: caption
			})
		]
	});
}
function Tag({ pos, text, tone = "chalk", occlude = true, note }) {
	const labels = useLabControls((s) => s.labels);
	const layout = useLabControls((s) => s.layout);
	const inspect = useLabControls((s) => s.inspect);
	const setInspect = useLabControls((s) => s.setInspect);
	if (!labels) return null;
	const tones = {
		chalk: "text-chalk",
		glacier: "text-glacier",
		magma: "text-magma",
		sandstone: "text-sandstone",
		ice: "text-ice",
		moss: "text-moss",
		fault: "text-fault"
	};
	const name = text.split(" · ")[0] ?? text;
	const inspectNote = note ?? `${name} is a named part of this teaching model. Drive a slider or play; the geometry should change.`;
	const active = inspect?.name === name;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
		position: pos,
		center: true,
		occlude: occlude ? "blending" : void 0,
		zIndexRange: layout === "projector" ? [20, 0] : [10, 0],
		style: { pointerEvents: "auto" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: (e) => {
				e.stopPropagation();
				setInspect(active ? null : {
					name,
					note: inspectNote
				});
			},
			className: cn("whitespace-nowrap rounded-full border bg-basalt/85 px-2.5 py-1 font-mono text-[11px] shadow-lg", tones[tone], active ? "border-glacier/60 text-glacier" : "border-white/15"),
			children: text
		})
	});
}
function Readout({ pos = [
	0,
	2.2,
	0
], children }) {
	if (!useLabControls((s) => s.labels)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Html, {
		position: pos,
		center: true,
		style: {
			pointerEvents: "none",
			width: 440
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-[16px] border border-white/10 bg-basalt/80 px-3 py-2 text-center font-mono text-[11px] text-chalk backdrop-blur-md",
			children
		})
	});
}
function SceneToggles({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-auto absolute right-3 top-[6.5rem] z-10 hidden flex-col gap-2 md:right-6 md:flex lg:top-[7.5rem]",
		children
	});
}
function SceneBtn({ onClick, children, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("min-h-11 rounded-full border border-white/10 bg-basalt/70 px-3 py-2 text-left font-mono text-[11px] text-chalk backdrop-blur-xl", active && "border-glacier/40 text-glacier"),
		children
	});
}
/** Key + fill + weak rim. Dark studio void, not a grey room. */
function LabLights({ ambient = .28, keyIntensity = 2.05 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#9ec4d4",
			"#1c1814",
			.38
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			intensity: ambient,
			color: "#c9d4d0"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				4.2,
				5.8,
				3.2
			],
			intensity: keyIntensity,
			color: "#fff4e0",
			castShadow: true,
			"shadow-mapSize-width": 1024,
			"shadow-mapSize-height": 1024,
			"shadow-bias": -25e-5,
			"shadow-camera-near": .4,
			"shadow-camera-far": 28,
			"shadow-camera-left": -9,
			"shadow-camera-right": 9,
			"shadow-camera-top": 9,
			"shadow-camera-bottom": -9
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				-3.4,
				1.4,
				-2.4
			],
			intensity: .42,
			color: "#7fd4ff"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				.2,
				-2.4,
				4
			],
			intensity: .22,
			color: "#f4efe6"
		})
	] });
}
function StudioOrbit({ minDistance = 1.4, maxDistance = 18, target = [
	0,
	.2,
	0
] }) {
	const viewKey = useLabControls((s) => s.viewKey);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
		enablePan: false,
		enableDamping: true,
		dampingFactor: .08,
		minDistance,
		maxDistance,
		maxPolarAngle: Math.PI * .9,
		target,
		makeDefault: true
	}, viewKey);
}
/** Subtle studio ground so models sit, not float. */
function StudioFloor({ size = 14 }) {
	const mat = (0, import_react.useMemo)(() => new MeshStandardMaterial({
		color: "#0e1412",
		roughness: .95,
		metalness: 0
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		position: [
			0,
			-.02,
			0
		],
		material: mat,
		receiveShadow: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [size, 64] })
	});
}
function StepCamera({ positions }) {
	const step = useLabControls((s) => s.step);
	const tmp = (0, import_react.useMemo)(() => new Vector3(), []);
	useFrame(({ camera }) => {
		const p = positions[Math.min(step, positions.length - 1)] ?? positions[0];
		if (!p) return;
		tmp.set(p[0], p[1], p[2]);
		camera.position.lerp(tmp, .04);
	});
	return null;
}
function WaterSheet({ width, depth, y = .018, color = "#1a4a6e", opacity = .78 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		position: [
			0,
			y,
			0
		],
		receiveShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [
			width,
			depth,
			48,
			48
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
			color,
			roughness: .06,
			metalness: .06,
			transmission: .28,
			thickness: .55,
			ior: 1.333,
			transparent: true,
			opacity,
			envMapIntensity: .85
		})]
	});
}
/** Ice with thickness and a wet look. Not a white sticker. */
function IceVolume({ size, position, rotation = [
	0,
	0,
	0
] }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position,
		rotation,
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			size[0],
			size[1],
			size[2],
			10,
			6,
			8
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
			color: "#d5eaf4",
			roughness: .12,
			transmission: .42,
			thickness: 1.15,
			ior: 1.31,
			transparent: true,
			opacity: .88,
			clearcoat: .35,
			clearcoatRoughness: .2
		})]
	});
}
/** Rounded crustal block — not a raw Box as landform. */
function CrustalRaft({ size, position, color = "#7C9A6A" }) {
	const nrm = useRockNormal();
	const nrmScale = (0, import_react.useMemo)(() => new Vector2(.55, .55), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position,
		castShadow: true,
		receiveShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
			size[0] * .52,
			size[0] * .55,
			size[1],
			28,
			1
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .9,
			metalness: .03,
			normalMap: nrm,
			normalScale: nrmScale
		})]
	});
}
function Arrow3({ from, to, color = "#3EE0C6", radius = .03 }) {
	const { quat, mid, end, len } = (0, import_react.useMemo)(() => {
		const start = new Vector3(...from);
		const finish = new Vector3(...to);
		const dir = finish.clone().sub(start);
		const length = Math.max(.05, dir.length());
		return {
			quat: new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), dir.clone().normalize()),
			mid: start.clone().lerp(finish, .42),
			end: finish,
			len: length
		};
	}, [from, to]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: mid,
		quaternion: quat,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
			radius,
			radius,
			len * .78,
			12
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .42,
			metalness: .08
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: end,
		quaternion: quat,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
			radius * 2.4,
			len * .2,
			14
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .38,
			metalness: .08
		})]
	})] });
}
function LabStudio({ slug, title, camera, children, fallback, liveText, exaggeration, minDistance, maxDistance, target, lights = true }) {
	const webgl = useWebGL();
	const reduced = usePrefersReducedMotion();
	const playing = useLabControls((s) => s.playing);
	const trueScale = useLabControls((s) => s.trueScale);
	const setTrueScale = useLabControls((s) => s.setTrueScale);
	const inspect = useLabControls((s) => s.inspect);
	const setInspect = useLabControls((s) => s.setInspect);
	const q = useQuality();
	if (!webgl) return fallback ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
		slug,
		title,
		caption: liveText
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ClientCanvas, {
			camera: camera ?? {
				position: [
					0,
					1.4,
					5.4
				],
				fov: 40
			},
			dpr: q.dpr,
			frameloop: reduced && !playing ? "demand" : "always",
			shadows: q.shadows,
			children: [
				lights && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabLights, {}),
				children,
				lights && q.shadows && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
					opacity: .42,
					scale: 18,
					blur: 2.4,
					far: 8,
					resolution: 512,
					color: "#000000"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioOrbit, {
					minDistance,
					maxDistance,
					target
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "sr-only",
			"aria-live": "polite",
			children: liveText ?? title
		}),
		exaggeration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setTrueScale(!trueScale),
			className: "pointer-events-auto absolute left-1/2 top-[4.6rem] z-10 -translate-x-1/2 rounded-full border border-white/10 bg-basalt/80 px-3 py-1 font-mono text-[10px] text-mist backdrop-blur-md hover:text-chalk",
			children: trueScale ? "True scale · click for teaching exaggeration" : exaggeration
		}),
		inspect && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-auto absolute bottom-28 left-1/2 z-10 w-[min(28rem,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-white/10 bg-basalt/85 px-4 py-3 backdrop-blur-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
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
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "shrink-0 font-mono text-[11px] text-mist hover:text-chalk",
					onClick: () => setInspect(null),
					children: "Close"
				})]
			})
		})
	] });
}
//#endregion
export { LabStudio as a, SceneToggles as c, Tag as d, WaterSheet as f, IceVolume as i, StepCamera as l, CrustalRaft as n, Readout as o, GenericFallback as r, SceneBtn as s, Arrow3 as t, StudioFloor as u };
