import { i as __toESM } from "../_runtime.mjs";
import { D as Plane, L as Vector2, R as Vector3, b as Line, c as useFrame, f as BufferAttribute, p as BufferGeometry, x as LineBasicMaterial, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { s as Starfield } from "./earth-BMLTGowk.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, c as SceneToggles, d as Tag, o as Readout, r as GenericFallback, s as SceneBtn } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-bfisJJLl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** True radii as fraction of 6371 km. Teaching crust is ×4 continental thickness. */
var TRUE_CRUST_INNER = 1 - 35 / 6371;
var TEACH_CRUST_INNER = .978;
function layersFor(trueScale) {
	const crustInner = trueScale ? TRUE_CRUST_INNER : TEACH_CRUST_INNER;
	return [
		{
			id: "crust",
			name: "Crust",
			r: 1,
			inner: crustInner,
			note: trueScale ? "0–35 km continental crust. A film on a 6371 km radius." : "0–35 km continental · drawn ×4 here so the film can be seen."
		},
		{
			id: "mantle",
			name: "Mantle",
			r: crustInner,
			inner: .547,
			note: "Solid rock that creeps. Not a magma ocean."
		},
		{
			id: "outer",
			name: "Outer core",
			r: .547,
			inner: .191,
			note: "Liquid Fe–Ni. S-waves die. The magnetic field lives here."
		},
		{
			id: "inner",
			name: "Inner core",
			r: .191,
			inner: 0,
			note: "Solid Fe–Ni under immense pressure."
		}
	];
}
function Shell({ id, outer, inner, plane, offset }) {
	const q = useQuality();
	const slice = useLabControls((s) => s.slice);
	const nrm = useRockNormal();
	const nrmScale = (0, import_react.useMemo)(() => new Vector2(.85, .85), []);
	const clip = slice > .02 ? [plane] : [];
	const spin = (0, import_react.useRef)(null);
	useFrame((_, d) => {
		if (id === "outer" && spin.current) spin.current.rotation.y += Math.min(d, .1) * .12;
	});
	const matProps = id === "crust" ? {
		color: PBR.crust.color,
		roughness: .9,
		metalness: .02,
		normalMap: nrm,
		normalScale: nrmScale,
		emissive: "#000000",
		emissiveIntensity: 0
	} : id === "mantle" ? {
		color: PBR.mantle.color,
		roughness: .94,
		metalness: .05,
		normalMap: nrm,
		normalScale: nrmScale,
		emissive: "#000000",
		emissiveIntensity: 0
	} : id === "outer" ? {
		color: PBR.outerCore.color,
		roughness: .16,
		metalness: .82,
		emissive: "#a56a28",
		emissiveIntensity: .22
	} : {
		color: PBR.innerCore.color,
		roughness: .12,
		metalness: .9,
		emissive: "#c9a66a",
		emissiveIntensity: .08
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: spin,
		position: [
			-offset,
			0,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			outer,
			q.sphere,
			q.sphere
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			...matProps,
			side: 2,
			clippingPlanes: clip
		})] }), inner > .02 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			inner,
			q.sphere,
			q.sphere
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			...matProps,
			side: 1,
			clippingPlanes: clip
		})] })]
	});
}
function Waves() {
	const t = (0, import_react.useRef)(0);
	const pMat = (0, import_react.useMemo)(() => new LineBasicMaterial({ color: 8377599 }), []);
	const sMat = (0, import_react.useMemo)(() => new LineBasicMaterial({ color: 14830411 }), []);
	const pGeo = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		g.setAttribute("position", new BufferAttribute(/* @__PURE__ */ new Float32Array(240), 3));
		return g;
	}, []);
	const sGeo = (0, import_react.useMemo)(() => {
		const g = new BufferGeometry();
		g.setAttribute("position", new BufferAttribute(/* @__PURE__ */ new Float32Array(240), 3));
		return g;
	}, []);
	const pLine = (0, import_react.useMemo)(() => new Line(pGeo, pMat), [pGeo, pMat]);
	const sLine = (0, import_react.useMemo)(() => new Line(sGeo, sMat), [sGeo, sMat]);
	useFrame((_, raw) => {
		t.current += Math.min(raw, .1) * .28;
		const u = t.current % 1;
		write(pGeo.attributes.position, u, true);
		write(sGeo.attributes.position, u, false);
		pGeo.attributes.position.needsUpdate = true;
		sGeo.attributes.position.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", { object: pLine }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", { object: sLine })] });
}
function write(attr, u, pwave) {
	const n = attr.count;
	for (let i = 0; i < n; i++) {
		const ang = i / (n - 1) * Math.PI * .95 * Math.min(1, u * 1.12);
		const core = ang > .92;
		let r = 1.02;
		if (!pwave && core) {
			const tt = Math.min(1, (ang - .92) / .5);
			attr.setXYZ(i, Math.sin(.92) * .547 * (1 - tt * .02), Math.cos(.92) * .547 - tt * .28, 0);
			continue;
		}
		if (pwave && core) r = .2 + .82 * Math.abs(Math.cos((ang - .92) * 1.35));
		attr.setXYZ(i, Math.sin(ang) * r, Math.cos(ang) * r, 0);
	}
	attr.needsUpdate = true;
}
function Interior() {
	const explode = useLabControls((s) => s.explode);
	const slice = useLabControls((s) => s.slice);
	const waves = useLabControls((s) => s.params.waves ?? 0);
	const playing = useLabControls((s) => s.playing);
	const trueScale = useLabControls((s) => s.trueScale);
	const layers = layersFor(trueScale);
	const plane = (0, import_react.useMemo)(() => new Plane(new Vector3(1, 0, 0), 0), []);
	plane.constant = (slice - .5) * 2.2;
	const offsets = [
		explode * .55,
		explode * .28,
		explode * .12,
		0
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Starfield, {}),
		layers.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
			id: l.id,
			outer: l.r,
			inner: l.inner,
			plane,
			offset: offsets[i]
		}, l.id)),
		layers.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-(l.r + offsets[i] + .15),
				.95 - i * .55,
				.1
			],
			text: l.name,
			tone: i === 2 ? "sandstone" : i === 0 ? "moss" : "chalk",
			occlude: false,
			note: l.note
		}, l.id)),
		(waves > .5 || playing) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				-1.55,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-ice",
					children: "P"
				}),
				" through liquid · ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-fault",
					children: "S"
				}),
				" dies at outer core · ",
				trueScale ? "true scale" : "crust ×4"
			]
		})
	] });
}
function InteriorScene() {
	const setParam = useLabControls((s) => s.setParam);
	const waves = useLabControls((s) => s.params.waves ?? 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "earth-interior",
		title: "Earth interior",
		camera: {
			position: [
				2.6,
				1.1,
				3.5
			],
			fov: 40
		},
		exaggeration: "Crust drawn ×4 true thickness. Mantle is solid rock, not a magma ocean.",
		liveText: "Cut Earth. Crust a thin shell. S-waves stop at the liquid outer core.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "earth-interior",
			title: "Earth interior"
		}),
		lights: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Interior, {})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneToggles, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneBtn, {
		active: waves > .5,
		onClick: () => setParam("waves", waves > .5 ? 0 : 1),
		children: ["P / S waves ", waves > .5 ? "on" : "off"]
	}) })] });
}
//#endregion
export { InteriorScene as default };
