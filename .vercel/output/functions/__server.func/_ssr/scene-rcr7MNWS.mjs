import { i as __toESM } from "../_runtime.mjs";
import { L as Vector2, d as BoxGeometry, z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as useRockNormal, i as useQuality, o as useSoilNormal, t as PBR } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
import { a as LabStudio, d as Tag, l as StepCamera, o as Readout, r as GenericFallback, u as StudioFloor } from "./studio-CNvjqO8z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scene-rcr7MNWS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PROFILES = [
	{
		name: "Brown earth",
		note: "UK woodland / farm default · weak pale E",
		layers: [
			{
				id: "O",
				h: .07,
				color: "#2c261c"
			},
			{
				id: "A",
				h: .28,
				color: "#5c4a36",
				soil: true
			},
			{
				id: "E",
				h: .14,
				color: "#d8d0c0"
			},
			{
				id: "B",
				h: .52,
				color: "#8a6234",
				soil: true
			},
			{
				id: "C",
				h: .42,
				color: "#c4a574"
			},
			{
				id: "R",
				h: .95,
				color: "#6a6560",
				rock: true
			}
		]
	},
	{
		name: "Mollisol",
		note: "Grassland · thick dark A · no E",
		layers: [
			{
				id: "O",
				h: .04,
				color: "#1a1610"
			},
			{
				id: "A",
				h: .72,
				color: "#3a2414",
				soil: true
			},
			{
				id: "B",
				h: .4,
				color: "#7a5a32",
				soil: true
			},
			{
				id: "C",
				h: .36,
				color: PBR.sand.color
			},
			{
				id: "R",
				h: .82,
				color: "#6a6560",
				rock: true
			}
		]
	},
	{
		name: "Oxisol",
		note: "Tropical · deep red B · E gone",
		layers: [
			{
				id: "O",
				h: .03,
				color: "#2a1810"
			},
			{
				id: "A",
				h: .18,
				color: "#6a3a22",
				soil: true
			},
			{
				id: "B",
				h: 1.12,
				color: "#c45a28",
				soil: true
			},
			{
				id: "C",
				h: .38,
				color: "#c4a070"
			},
			{
				id: "R",
				h: .7,
				color: "#6a6560",
				rock: true
			}
		]
	}
];
function Slab({ layer, y, segs, soilN, rockN }) {
	const nrmScale = (0, import_react.useMemo)(() => new Vector2(.85, .85), []);
	const geom = (0, import_react.useMemo)(() => {
		const g = new BoxGeometry(2.45, layer.h, 1.28, Math.max(8, segs), 2, Math.max(8, segs / 2));
		const pos = g.attributes.position;
		for (let i = 0; i < pos.count; i++) {
			const z = pos.getZ(i);
			const x = pos.getX(i);
			if (z > .4) {
				const n = Math.sin(x * 7.3 + y * 3.1) * .018 + Math.sin(x * 13.1) * .01 + (layer.rock ? Math.sin(x * 21) * .012 : 0);
				pos.setZ(i, z + n);
			}
		}
		g.computeVertexNormals();
		return g;
	}, [
		layer.h,
		layer.rock,
		segs,
		y
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		position: [
			0,
			y,
			0
		],
		geometry: geom,
		castShadow: true,
		receiveShadow: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: layer.color,
			roughness: layer.rock ? .82 : .93,
			metalness: layer.rock ? .08 : .02,
			normalMap: layer.soil ? soilN : layer.rock ? rockN : void 0,
			normalScale: nrmScale
		})
	});
}
function Stack() {
	const p = PROFILES[Math.min(2, Math.max(0, Math.round(useLabControls((s) => s.params.soil ?? s.params.profile ?? 0))))];
	const q = useQuality();
	const soilN = useSoilNormal();
	const rockN = useRockNormal();
	const segs = Math.max(12, Math.floor(q.sphere / 6));
	const placed = (0, import_react.useMemo)(() => {
		let y = 1.52;
		return p.layers.map((layer) => {
			y -= layer.h / 2;
			const at = y;
			y -= layer.h / 2;
			return {
				layer,
				y: at
			};
		});
	}, [p]);
	const present = new Set(p.layers.map((l) => l.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioFloor, { size: 10 }),
		placed.map(({ layer, y }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slab, {
			layer,
			y,
			segs,
			soilN,
			rockN
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				1.55,
				y,
				0
			],
			text: layer.id,
			tone: layer.id === "A" ? "sandstone" : layer.id === "R" ? "chalk" : "moss",
			occlude: false,
			note: layer.id === "O" ? "Organic litter. Thin on grassland, thicker in woodland." : layer.id === "A" ? "Mixed mineral-organic topsoil. The budget this lab spends." : layer.id === "E" ? "Eluviated: pale because clay and iron have washed down. Can be missing." : layer.id === "B" ? "Illuviated: clay and iron accumulate. Colour is not texture." : layer.id === "C" ? "Weathered parent material, not yet soil." : "R: unweathered rock. The floor of the profile."
		})] }, layer.id)),
		[
			"O",
			"A",
			"E",
			"B",
			"C",
			"R"
		].map((id, i) => present.has(id) ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			pos: [
				-1.85,
				1.35 - i * .28,
				0
			],
			text: `${id} absent`,
			tone: "fault",
			occlude: false
		}, `miss-${id}`)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Readout, {
			pos: [
				0,
				2.45,
				0
			],
			children: [
				p.name,
				" · ",
				p.note
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepCamera, { positions: [
			[
				2.5,
				.85,
				5.4
			],
			[
				1.3,
				2.15,
				3.3
			],
			[
				1.5,
				.35,
				3.5
			],
			[
				1.7,
				-.55,
				3.6
			]
		] })
	] });
}
function SoilProfileScene() {
	const p = PROFILES[Math.min(2, Math.max(0, Math.round(useLabControls((s) => s.params.soil ?? s.params.profile ?? 0))))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStudio, {
		slug: "soil-profile",
		title: "Soil profile",
		camera: {
			position: [
				2.5,
				.85,
				5.4
			],
			fov: 40
		},
		exaggeration: "Horizons are true relative thickness. The slab is a cut face, not a hillside.",
		liveText: `${p.name}. Horizons O A E B C R with real relative thickness. ${p.note}.`,
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenericFallback, {
			slug: "soil-profile",
			title: "Soil profile",
			caption: "O A E B C R stack. Brown earth, mollisol, oxisol."
		}),
		minDistance: 2.4,
		maxDistance: 12,
		target: [
			0,
			.4,
			0
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stack, {})
	});
}
//#endregion
export { SoilProfileScene as default };
