import { i as __toESM } from "../_runtime.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, c as SceneToggles, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, s as SceneBtn, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-D3wsGN7t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Loop() {
	useLabTick(1 / 16);
	const t = useLabControls((s) => s.t);
	const urban = (useLabControls((s) => s.params.urban) ?? 0) > .5;
	const q = useQuality();
	const day = t < .5;
	const strength = .55 + Math.sin((day ? t / .5 : (t - .5) / .5) * Math.PI) * .45;
	const r = (urban ? .055 : .038) * (.7 + strength * .5);
	const segs = Math.max(16, Math.round(q.lathe / 4));
	const landColor = urban ? "#2c2622" : PBR.soil.color;
	const landGlow = day ? urban ? .42 : .28 : urban ? .12 : .02;
	const seaGlow = day ? .02 : .14;
	const onshore = day ? [{
		from: [
			1.35,
			.42,
			.35
		],
		to: [
			-.15,
			.58,
			.35
		]
	}, {
		from: [
			1.35,
			.42,
			-.35
		],
		to: [
			-.15,
			.58,
			-.35
		]
	}] : [{
		from: [
			-1.2,
			.58,
			.35
		],
		to: [
			.35,
			.42,
			.35
		]
	}, {
		from: [
			-1.2,
			.58,
			-.35
		],
		to: [
			.35,
			.42,
			-.35
		]
	}];
	const aloft = day ? [{
		from: [
			-.85,
			1.72,
			.2
		],
		to: [
			1.15,
			1.62,
			.2
		]
	}, {
		from: [
			-.85,
			1.72,
			-.2
		],
		to: [
			1.15,
			1.62,
			-.2
		]
	}] : [{
		from: [
			1.05,
			1.62,
			.2
		],
		to: [
			-.75,
			1.55,
			.2
		]
	}, {
		from: [
			1.05,
			1.62,
			-.2
		],
		to: [
			-.75,
			1.55,
			-.2
		]
	}];
	const rise = day ? [
		-.95,
		.7,
		0
	] : [
		1.15,
		.5,
		0
	];
	const riseTo = day ? [
		-.95,
		1.78,
		0
	] : [
		1.15,
		1.7,
		0
	];
	const sink = day ? [
		1.2,
		1.68,
		0
	] : [
		-.95,
		1.6,
		0
	];
	const sinkTo = day ? [
		1.2,
		.5,
		0
	] : [
		-.95,
		.7,
		0
	];
	const sunX = Math.cos((.5 - t) * Math.PI) * 3.1;
	const sunY = Math.max(.28, Math.sin((.5 - t) * Math.PI) * 2.4 + 1.15);
	const buildings = (0, import_react.useMemo)(() => {
		const a = [];
		for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) a.push([
			-1.55 + i * .38,
			.55 + (i * 3 + j) % 4 * .12,
			-.55 + j * .4,
			.55 + (i + j) % 3 * .22
		]);
		return a;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 10 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				sunX,
				sunY,
				1.7
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				day ? .26 : .14,
				segs,
				segs
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: day ? "#E8B86D" : "#d5eaf4",
				emissive: day ? "#E8B86D" : "#8aa0b0",
				emissiveIntensity: day ? 1.15 : .28
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-1.15,
				.22,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				2.15,
				.44,
				2.5
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: landColor,
				roughness: PBR.soil.roughness,
				metalness: PBR.soil.metalness,
				emissive: "#ff6a3d",
				emissiveIntensity: landGlow
			})]
		}),
		urban && buildings.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				b[0],
				b[3] / 2 + .44,
				b[2]
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.22,
				b[3],
				.22
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1e2426",
				roughness: .86,
				metalness: .1
			})]
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				1.15,
				.12,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				2.15,
				.24,
				2.5
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.water.color,
				roughness: PBR.water.roughness,
				metalness: PBR.water.metalness,
				emissive: "#3aa0c8",
				emissiveIntensity: seaGlow
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				1.18,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				4.55,
				1.85,
				2.7
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#7FD4FF",
				transparent: true,
				opacity: .07,
				depthWrite: false,
				side: 2
			})]
		}),
		onshore.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: a.from,
			to: a.to,
			color: "#3EE0C6",
			radius: r
		}, `s${i}`)),
		aloft.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: a.from,
			to: a.to,
			color: "#7FD4FF",
			radius: r * .85
		}, `a${i}`)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: rise,
			to: riseTo,
			color: "#FF6A3D",
			radius: r
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: sink,
			to: sinkTo,
			color: "#7FD4FF",
			radius: r * .8
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-1.15,
				1.05,
				1.45
			],
			text: "land heats first",
			tone: "magma",
			occlude: false
		}),
		day ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.15,
				.28,
				.15
			],
			text: "sea breeze",
			tone: "glacier",
			occlude: false
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				.15,
				.28,
				.15
			],
			text: "land breeze",
			tone: "ice",
			occlude: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.55,
				0
			],
			children: [
				day ? "Day" : "Night",
				" · ",
				urban ? "urban heat, stronger loop" : "bare soil vs water",
				" · surface from cool column to warm"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				2.35,
				5.8
			],
			[
				-2.6,
				1.5,
				4.2
			],
			[
				2.4,
				1.7,
				4.4
			],
			[
				0,
				2.35,
				5.8
			]
		] })
	] });
}
function ThermalCirculationScene() {
	const urban = (useLabControls((s) => s.params.urban) ?? 0) > .5;
	const setParam = useLabControls((s) => s.setParam);
	const day = useLabControls((s) => s.t) < .5;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "thermal-circulation",
		title: "Thermal circulation",
		camera: {
			position: [
				0,
				2.35,
				5.8
			],
			fov: 40
		},
		liveText: `${day ? "Day sea breeze" : "Night land breeze"}. Land heats first. ${urban ? "Urban heat island, stronger loop." : "Soil vs water."}`,
		exaggeration: "The roll is a few kilometres high. Coriolis is a later lab.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "thermal-circulation",
			title: "Thermal circulation",
			caption: "Land heats first. Day: onshore at the surface, offshore aloft. Night reverses."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loop, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneToggles, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneBtn, {
		onClick: () => setParam("urban", urban ? 0 : 1),
		active: urban,
		children: ["Urban ", urban ? "on" : "off"]
	}) })] });
}
//#endregion
export { ThermalCirculationScene as default };
