import { i as __toESM } from "../_runtime.mjs";
import { P as SphereGeometry, R as Vector3, c as useFrame, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality } from "./perf-Cy1NcWbY.mjs";
import { a as EarthMesh, s as Starfield, t as Atmosphere } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback } from "./studio-CNvjqO8z.mjs";
import { n as SunMesh, t as MoonMesh } from "./moon-DSIxiLbk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-tVDETOuA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WaterBulge() {
	const q = useQuality();
	const geom = (0, import_react.useMemo)(() => new SphereGeometry(1.045, q.sphere, q.sphere), [q.sphere]);
	const rest = (0, import_react.useMemo)(() => Float32Array.from(geom.attributes.position.array), [geom]);
	const mesh = (0, import_react.useRef)(null);
	const moonDir = (0, import_react.useRef)(new Vector3(1, 0, 0));
	const sunDir = (0, import_react.useRef)(new Vector3(1, .05, 0));
	const t = useLabControls((s) => s.t);
	const tmp = (0, import_react.useMemo)(() => new Vector3(), []);
	const nrm = (0, import_react.useMemo)(() => new Vector3(), []);
	useFrame(() => {
		if (!mesh.current) return;
		const ang = t * Math.PI * 2;
		moonDir.current.set(Math.cos(ang), .02, Math.sin(ang));
		sunDir.current.set(1, .04, 0).normalize();
		const pos = geom.attributes.position;
		for (let i = 0; i < pos.count; i++) {
			nrm.set(rest[i * 3], rest[i * 3 + 1], rest[i * 3 + 2]).normalize();
			const moon = 3 * Math.pow(nrm.dot(moonDir.current), 2) - 1;
			const sun = 1.4 * (3 * Math.pow(nrm.dot(sunDir.current), 2) - 1);
			const r = 1.045 + moon * .045 + sun * .018;
			tmp.copy(nrm).multiplyScalar(r);
			pos.setXYZ(i, tmp.x, tmp.y, tmp.z);
		}
		pos.needsUpdate = true;
		geom.computeVertexNormals();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		ref: mesh,
		geometry: geom,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
			color: "#1a4a6e",
			roughness: .12,
			metalness: .06,
			transparent: true,
			opacity: .55,
			transmission: .15,
			thickness: .4
		})
	});
}
function Model() {
	useLabTick(1 / 20);
	const ang = useLabControls((s) => s.t) * Math.PI * 2;
	const mx = Math.cos(ang) * 2.35;
	const mz = Math.sin(ang) * 2.35;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				-4.6,
				.2,
				-1.2
			],
			scale: .55,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SunMesh, { radius: .42 })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarthMesh, {
			radius: 1,
			clouds: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, { radius: 1.05 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaterBulge, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: [
				mx,
				.05,
				mz
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonMesh, { radius: .27 })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				mx,
				.5,
				mz
			],
			text: "Moon"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.25,
				.15,
				0
			],
			text: "Tidal bulge",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-1.25,
				.15,
				0
			],
			text: "Opposite bulge",
			tone: "ice"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				1.7,
				0
			],
			children: [Math.abs(Math.cos(ang)) > .85 ? "Spring tide · Sun and Moon aligned · two bulges add" : "Neap · quadrature · bulges fight", ". Mesh is deformed, not a sticker."]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				1.6,
				5.4
			],
			[
				2.8,
				1.2,
				3.2
			],
			[
				-1.4,
				2.4,
				4.6
			],
			[
				0,
				1.6,
				5.4
			]
		] })
	] });
}
function TidesScene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "tides",
		title: "Tides",
		camera: {
			position: [
				0,
				1.6,
				5.4
			],
			fov: 40
		},
		exaggeration: "Bulge height exaggerated × thousands. Two bulges: toward the Moon and opposite.",
		liveText: "Two tidal bulges. Spring when Sun and Moon align; neap at right angles. Water is a deformed mesh.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "tides",
			title: "Tides",
			caption: "Two bulges. Spring and neap. Alignment with the Sun, not the season named spring."
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { TidesScene as default };
