import { n as LAB_BY_SLUG } from "./catalog-OOT9SqiM.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { t as Button } from "./button-DsD8WSgU.mjs";
import { v as Link, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Route$11, l as CASE_BY_SLUG } from "./router-30Pb9LWH.mjs";
import { t as Figure } from "./figure-TxgvG-Th.mjs";
import { t as MiniMap } from "./mini-map-Bxlqsa-r.mjs";
import { t as Badge } from "./badge-6eJ4zIxS.mjs";
import { n as labFigure } from "./figures-C-KLVjvI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/case._slug-bpJme6Zx.js
var import_jsx_runtime = require_jsx_runtime();
function CasePage() {
	const { slug } = Route$11.useParams();
	const c = CASE_BY_SLUG[slug];
	if (!c) throw notFound();
	const labs = c.labs.map((s) => LAB_BY_SLUG[s]).filter(Boolean);
	const openSlug = c.labs[0];
	const href = openSlug ? `/lab/${openSlug}${c.state ? `?${c.state}` : ""}` : "/explore";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-[720px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "section-label",
				children: ["Case study · ", c.region]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: c.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-glacier",
				children: c.place
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-lg leading-7 text-chalk/90",
				children: c.lede
			}),
			openSlug && labFigure(openSlug) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
				...labFigure(openSlug),
				className: "mt-6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniMap, {
					lat: c.lat,
					lon: c.lon,
					zoom: c.zoom,
					label: c.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-mono text-[11px] text-mist",
					children: [
						"Locator · OpenStreetMap / OpenFreeMap · ",
						c.lat.toFixed(2),
						"°, ",
						c.lon.toFixed(2),
						"°"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-4 text-[17px] leading-7 text-mist",
				children: c.body.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p.slice(0, 48)))
			}),
			openSlug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href,
						children: "Open this state in the lab"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-label",
						children: "Exam-style question"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-chalk",
						children: c.exam.prompt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-mist",
						children: ["Teacher hint: ", c.exam.hint]
					})
				]
			}),
			labs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-label mb-3",
					children: "Process labs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: labs.map((lab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/lab/$slug",
						params: { slug: lab.slug },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "ice",
							children: lab.title
						})
					}, lab.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-label mb-2",
					children: "Sources"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1 text-sm text-mist",
					children: c.sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: s.href,
						className: "text-ice hover:underline",
						target: "_blank",
						rel: "noreferrer",
						children: s.label
					}) : s.label }, s.label))
				})]
			})
		]
	});
}
//#endregion
export { CasePage as component };
