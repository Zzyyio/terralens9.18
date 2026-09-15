import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tools.index-D71PR2k-.js
var import_jsx_runtime = require_jsx_runtime();
var TOOLS = [
	{
		to: "/tools/earth-motion",
		title: "Earth-motion calculator",
		blurb: "Date and latitude to noon altitude, day length, declination, and season. Presets for London, New York, Sydney, Nairobi."
	},
	{
		to: "/tools/live-weather",
		title: "Live weather",
		blurb: "Click or drag a pin. Open-Meteo returns temperature, wind, rain, humidity, and cloud in SI. Educational and delayed."
	},
	{
		to: "/tools/map",
		title: "World map studio",
		blurb: "Readable world map. Relief, rivers, settlements, three colours of plate boundary, Köppen samples. OpenFreeMap, then OSM, then Natural Earth."
	},
	{
		to: "/atlas",
		title: "Atlas",
		blurb: "World countries, UK nations, US states. Capital, coordinates, two or three physical sentences, related labs."
	},
	{
		to: "/search",
		title: "Search",
		blurb: "Labs, glossary terms, case studies."
	}
];
function ToolsIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-[900px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Tools"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: "Calculators and maps, not gizmos."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-mist",
				children: "SI first. Educational disclaimers where the data is live. No third-party weather branding."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-4",
				children: TOOLS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: t.to,
					className: "rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:border-glacier/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-chalk",
						children: t.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-mist",
						children: t.blurb
					})]
				}, t.to))
			})
		]
	});
}
//#endregion
export { ToolsIndex as component };
