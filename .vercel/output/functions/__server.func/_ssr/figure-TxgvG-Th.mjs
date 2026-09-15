import { t as cn } from "./utils-C_uf36nf.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/figure-TxgvG-Th.js
var import_jsx_runtime = require_jsx_runtime();
function Figure({ src, alt, caption, credit, className, size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: cn("overflow-hidden rounded-[12px] border border-white/10 bg-void", size === "sm" ? "my-2" : "my-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			className: cn("w-full object-cover", size === "sm" ? "max-h-36" : "max-h-52"),
			loading: "lazy"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
			className: "px-3 py-2 font-mono text-[10px] leading-4 text-mist",
			children: [caption, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-mist/70",
				children: credit
			})]
		})]
	});
}
//#endregion
export { Figure as t };
