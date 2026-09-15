import { t as LABS } from "./catalog-OOT9SqiM.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as LAB_SCENES } from "./router-30Pb9LWH.mjs";
import { t as isListed } from "./status-CNAXnHO9.mjs";
import { t as Figure } from "./figure-TxgvG-Th.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BzH6L0An.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	const n = LABS.filter((l) => LAB_SCENES[l.slug] && isListed(l.slug)).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-[720px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "About"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl text-chalk md:text-5xl",
				children: "A free Earth studio."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-5 text-[17px] leading-7 text-chalk/90",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "TerraLens is a free, English-language geoscience studio for secondary and high-school students worldwide. It is inspired by the idea that a process you can turn in your hands is a process you can explain." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
						src: "/photos/earth-apollo17.jpg",
						alt: "The whole Earth as a sphere seen from space, with Africa, Arabia and Antarctica under scattered cloud.",
						caption: "A process you can turn in your hands.",
						credit: "NASA / Apollo 17, public domain"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"After a lab, a student should be able to say the mechanism in their own words and recognise it on a map or in the field. That is the whole product. ",
						n,
						" labs sit on the bench."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Free forever. No paywall, no ads, no sponsorship banner, no login wall for content. International English. SI units first; US customary in parentheses where it helps. Colour and color, metre and meter, both accepted in copy." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Not affiliated with Kongsberg Geospatial or any other TerraLens product." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-2xl",
				children: "Website Producer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 overflow-hidden rounded-2xl border border-white/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/photos/li-zeyu-field.jpg",
					alt: "A student geologist in an orange hard hat kneeling on a dark laminated rock outcrop, holding a hand sample and a yellow-handled geological hammer.",
					className: "w-full object-cover object-top"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 py-3 font-mono text-[11px] text-mist",
					children: "Li Zeyu in the field."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 whitespace-pre-wrap text-[17px] leading-7 text-chalk/90",
				children: "Website Producer：Li Zeyu.  A Geoscience Lover. The President of Geoscience Club of Shanghai Pinghe School"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-2xl",
				children: "Curriculum tags"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-mist",
				children: "Labs are also mapped to KS3 / GCSE / A-level / NGSS / APES so a teacher can filter. Those tags are a filter, not the identity of the studio."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-2xl",
				children: "Licence"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-mist",
				children: [
					"Original lab models, copy, and diagrams: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-chalk",
						children: "CC BY-NC 4.0"
					}),
					". Teachers may project and print for class. Do not sell the models as a product. NASA Blue Marble imagery is public domain. Cite USGS, BGS, NOAA, and the Met Office if you reuse numbers in a handout."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-2xl",
				children: "Sources"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 space-y-2 text-mist",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "NASA Blue Marble and Scientific Visualization Studio — globe textures and seasonal geometry" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "USGS — interior, plates, rivers, water science, hazards" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "British Geological Survey — UK landforms and tectonics" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "NOAA / Met Office — insolation, day length, weather, water cycle" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Open-Meteo — educational live weather (not a forecast desk)" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Natural Earth — countries, states, coastlines" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "OpenStreetMap / OpenFreeMap — locators and the atlas, never as a tracker" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-14 font-display text-2xl",
				children: "Version"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-mist",
				children: [
					"Studio model pass, September 2026. See also",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "text-ice hover:underline",
						children: "Privacy"
					}),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 font-mono text-sm text-glacier",
				children: "Free for students and teachers. Always."
			})
		]
	});
}
//#endregion
export { About as component };
