import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as REALMS } from "./catalog-OOT9SqiM.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-6eJ4zIxS.mjs";
import { t as LabThumb } from "./lab-thumb-dlTGNI-V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab-card-CNY4vLyv.js
var import_jsx_runtime = require_jsx_runtime();
function LabCard({ lab, className }) {
	const realm = REALMS.find((r) => r.slug === lab.realm);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/lab/$slug",
		params: { slug: lab.slug },
		className: cn("group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-[border-color,background-color,transform] duration-280 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-glacier/40 hover:bg-white/[0.07]", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[16/10] overflow-hidden bg-trench",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabThumb, { slug: lab.slug }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-3 top-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "glacier",
					children: realm?.title
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl leading-snug text-chalk group-hover:text-glacier",
						children: lab.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "mt-1 size-4 shrink-0 text-mist transition-transform duration-180 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-glacier" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-3 text-sm leading-6 text-mist",
					children: lab.hook
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-auto flex flex-wrap gap-1.5 pt-2",
					children: lab.ages.slice(0, 3).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "mist",
						children: a
					}, a))
				})
			]
		})]
	});
}
//#endregion
export { LabCard as t };
