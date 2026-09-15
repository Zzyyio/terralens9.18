import { i as __toESM } from "../_runtime.mjs";
import { E as Object3D, L as Vector2, O as PlaneGeometry, c as useFrame, g as Color, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as useQuality, o as useSoilNormal, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { t as useLabTick } from "./tick-BajM2lC-.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, t as Arrow3, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
import { t as HeightField } from "./terrain-CZC6vZE1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-D0NIzO_B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Cover({ count }) {
	const q = useQuality();
	const dummy = (0, import_react.useMemo)(() => new Object3D(), []);
	const segs = Math.max(12, Math.floor(q.lathe / 6));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
		args: [
			void 0,
			void 0,
			count
		],
		castShadow: true,
		ref: (mesh) => {
			if (!mesh) return;
			let i = 0;
			for (let x = 0; x < 5; x++) for (let z = 0; z < 4; z++) {
				dummy.position.set(-.85 + x * .42, .28, -.62 + z * .4);
				dummy.rotation.set(0, (x * 5 + z) * .37, 0);
				dummy.scale.setScalar(.72 + (x * 3 + z) % 4 * .12);
				dummy.updateMatrix();
				mesh.setMatrixAt(i++, dummy.matrix);
			}
			mesh.instanceMatrix.needsUpdate = true;
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
			.09,
			.44,
			segs
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#4d6a42",
			roughness: .9,
			metalness: .02
		})]
	});
}
function RillField() {
	const q = useQuality();
	const t = useLabControls((s) => s.t);
	const tRef = (0, import_react.useRef)(t);
	tRef.current = t;
	const nrm = useSoilNormal();
	const nrmScale = (0, import_react.useMemo)(() => new Vector2(.8, .8), []);
	const geom = (0, import_react.useMemo)(() => new PlaneGeometry(2.4, 2.1, Math.max(28, q.terrain / 5), Math.max(22, q.terrain / 6)), [q.terrain]);
	const orig = (0, import_react.useMemo)(() => Float32Array.from(geom.attributes.position.array), [geom]);
	useFrame(() => {
		const pos = geom.attributes.position;
		const storm = tRef.current;
		for (let i = 0; i < pos.count; i++) {
			const x = orig[i * 3];
			const y = orig[i * 3 + 1];
			const channel = Math.max(0, .38 - Math.abs(Math.sin(x * 5.4))) * storm * .28 * (.55 + .45 * Math.cos(y * 3.1));
			const splash = storm * .025 * Math.sin(x * 16) * Math.sin(y * 14);
			pos.setZ(i, orig[i * 3 + 2] + .14 - channel - splash);
		}
		pos.needsUpdate = true;
		geom.computeVertexNormals();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: geom,
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		position: [
			0,
			0,
			0
		],
		receiveShadow: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: PBR.sand.color,
			roughness: .92,
			metalness: .02,
			normalMap: nrm,
			normalScale: nrmScale
		})
	});
}
function Splash() {
	const t = useLabControls((s) => s.t);
	const drops = (0, import_react.useMemo)(() => Array.from({ length: 18 }, (_, i) => ({
		x: -.95 + i % 6 * .38,
		z: -.7 + Math.floor(i / 6) * .55,
		phase: i * .137
	})), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: drops.map((d, i) => {
		const u = (t * 2.4 + d.phase) % 1;
		const y = 1.05 * (1 - u) + (u > .82 ? Math.sin((u - .82) * 22) * .08 : 0);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				d.x,
				Math.max(.12, y),
				d.z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.028,
				10,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#7FD4FF" })]
		}, i);
	}) });
}
function Model() {
	useLabTick(1 / 8);
	const t = useLabControls((s) => s.t);
	const q = useQuality();
	const nrm = useSoilNormal();
	const vegFn = (0, import_react.useMemo)(() => (x, y) => .16 + .03 * Math.sin(x * 3.2) * Math.cos(y * 2.4), []);
	const vegColor = (0, import_react.useMemo)(() => {
		const c = new Color(PBR.crust.color);
		return () => c;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 12 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				-2.15,
				0,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RillField, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow3, {
					from: [
						-1.15,
						.55,
						.2
					],
					to: [
						1.05,
						.72,
						-.15
					],
					color: "#E8B86D",
					radius: .028
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: [
						0,
						1.25,
						.85
					],
					text: "Splash",
					tone: "ice",
					occlude: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: [
						.15,
						.55,
						.2
					],
					text: "Rill",
					tone: "sandstone",
					occlude: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: [
						.85,
						.95,
						-.2
					],
					text: "Wind",
					tone: "sandstone",
					occlude: false
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				2.15,
				0,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.05,
						0
					],
					receiveShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						2.4,
						.12,
						2.1,
						12,
						1,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: PBR.soil.color,
						roughness: .95,
						metalness: .02,
						normalMap: nrm,
						normalScale: new Vector2(.55, .55)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeightField, {
					fn: vegFn,
					width: 2.4,
					depth: 2.1,
					segX: Math.max(16, Math.floor(q.terrain / 8)),
					segZ: Math.max(14, Math.floor(q.terrain / 10)),
					colorFn: vegColor
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cover, { count: 20 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
					pos: [
						0,
						1.05,
						.9
					],
					text: "Cover",
					tone: "moss",
					occlude: false
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.35,
				0
			],
			children: [
				"Storm ",
				t.toFixed(2),
				" · bare rills · vegetated plot stays intact"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				0,
				3.3,
				7.1
			],
			[
				-2.2,
				2.1,
				4.5
			],
			[
				2.2,
				2.1,
				4.5
			],
			[
				0,
				4.8,
				3.2
			]
		] })
	] });
}
function SoilErosionScene() {
	const t = useLabControls((s) => s.t);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "soil-erosion",
		title: "Soil erosion",
		camera: {
			position: [
				0,
				3.3,
				7.1
			],
			fov: 40
		},
		liveText: `Storm ${t.toFixed(2)}. Bare plot: splash, rill, wind. Vegetated plot holds the A horizon.`,
		exaggeration: "Rill depth ×40. Real rills are centimetres.",
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "soil-erosion",
			title: "Soil erosion",
			caption: "Bare vs vegetated. Splash, rill, wind. Cover holds the A horizon."
		}),
		minDistance: 2.8,
		maxDistance: 14,
		target: [
			0,
			.3,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Model, {})
	});
}
//#endregion
export { SoilErosionScene as default };
