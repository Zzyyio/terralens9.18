import { i as __toESM } from "../_runtime.mjs";
import { p as BufferGeometry, v as Float32BufferAttribute, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, c as SceneToggles, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, s as SceneBtn, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-HwNNtVmO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Column({ x, label, color, high }) {
	const q = useQuality();
	const segs = Math.max(20, Math.round(q.lathe / 3));
	const h = high ? 1.85 : 1.15;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			x,
			h / 2,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				high ? .38 : .32,
				high ? .42 : .36,
				h,
				segs
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color,
				roughness: .38,
				metalness: .08,
				transparent: true,
				opacity: .82,
				emissive: color,
				emissiveIntensity: .12
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				h / 2 + .28,
				0
			],
			text: label,
			tone: high ? "sandstone" : "ice",
			occlude: false
		})]
	});
}
function Wind() {
	const params = useLabControls((s) => s.params);
	const cor = (params.coriolis ?? 1) > .5;
	const fr = (params.friction ?? 0) > .5;
	const nh = (params.hemisphere ?? ((params.sh ?? 0) > .5 ? -1 : 1)) >= 0;
	const q = useQuality();
	const isobars = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		const pts = [];
		for (const x of [
			-1.2,
			-.4,
			.4,
			1.2
		]) pts.push(x, .04, -1.7, x, .04, 1.7);
		g.setAttribute("position", new Float32BufferAttribute(pts, 3));
		return g;
	}, []);
	const turn = !cor ? 0 : fr ? .55 : 1.28;
	const sign = nh ? -1 : 1;
	const wx = Math.cos(turn);
	const wz = sign * Math.sin(turn);
	const windTo = [
		wx * 1.85,
		.55,
		wz * 1.85
	];
	const corTo = [
		(nh ? wz : -wz) * 1.15,
		.7,
		(nh ? -wx : wx) * 1.15
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.01,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [4.6, Math.max(32, q.sphere / 2)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: PBR.basalt.color,
				roughness: PBR.basalt.roughness,
				metalness: PBR.basalt.metalness
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineSegments", {
			geometry: isobars,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", {
				color: "#8B9A97",
				transparent: true,
				opacity: .55
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
			x: -2.05,
			label: "H",
			color: "#E8B86D",
			high: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
			x: 2.05,
			label: "L",
			color: "#7FD4FF",
			high: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				-1.15,
				.72,
				0
			],
			to: [
				1.05,
				.72,
				0
			],
			color: "#E8B86D",
			radius: .045
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				1.15,
				.15
			],
			text: "PGF",
			tone: "sandstone",
			occlude: false
		}),
		cor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				.05,
				.7,
				.05
			],
			to: corTo,
			color: "#3EE0C6",
			radius: .032
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				corTo[0] * .7,
				1.22,
				corTo[2] * .7
			],
			text: "Coriolis",
			tone: "glacier",
			occlude: false
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				0,
				.55,
				0
			],
			to: windTo,
			color: "#7FD4FF",
			radius: .05
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				windTo[0] * .55,
				.28,
				windTo[2] * .55 + .15
			],
			text: fr ? "friction" : cor ? nh ? "NH right" : "SH left" : "along PGF",
			tone: fr ? "fault" : "ice",
			occlude: false
		}),
		cor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				0,
				2.05,
				1.6
			],
			text: nh ? "NH right" : "SH left",
			tone: "glacier",
			occlude: false
		}),
		fr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
			from: [
				.15,
				.38,
				wz * .4
			],
			to: [
				1.25,
				.38,
				wz * .15
			],
			color: "#E24B4B",
			radius: .028
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.55,
				0
			],
			children: [
				nh ? "Northern hemisphere" : "Southern hemisphere",
				" · Coriolis ",
				cor ? "on" : "off",
				" · friction ",
				fr ? "pulls across isobars toward L" : "off · geostrophic"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				3.4,
				5.4
			],
			[
				-2.2,
				2.2,
				4.2
			],
			[
				2.4,
				2.4,
				4
			],
			[
				0,
				3.4,
				5.4
			]
		] })
	] });
}
function WindScene() {
	const params = useLabControls((s) => s.params);
	const setParam = useLabControls((s) => s.setParam);
	const fr = (params.friction ?? 0) > .5;
	const nh = (params.hemisphere ?? ((params.sh ?? 0) > .5 ? -1 : 1)) >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "wind",
		title: "Wind, PGF and Coriolis",
		camera: {
			position: [
				0,
				3.4,
				5.4
			],
			fov: 40
		},
		liveText: `PGF from High to Low. ${nh ? "NH Coriolis deflects right." : "SH Coriolis deflects left."} Friction ${fr ? "on — surface wind cuts toward L." : "off."}`,
		exaggeration: "Forces are arrows, not a forecast. Basin-scale sinks are not Coriolis.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "wind",
			title: "Wind",
			caption: "PGF points High to Low. Coriolis bends right in the NH, left in the SH. Friction lets the wind cut toward Low."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneToggles, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneBtn, {
		onClick: () => {
			setParam("sh", nh ? 1 : 0);
			setParam("hemisphere", nh ? -1 : 1);
		},
		active: !nh,
		children: nh ? "Switch to SH" : "Switch to NH"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneBtn, {
		onClick: () => setParam("friction", fr ? 0 : 1),
		active: fr,
		children: ["Friction ", fr ? "on" : "off"]
	})] })] });
}
//#endregion
export { WindScene as default };
