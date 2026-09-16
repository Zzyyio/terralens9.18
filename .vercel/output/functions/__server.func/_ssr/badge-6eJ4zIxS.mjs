import { t as cn } from "./utils-C_uf36nf.mjs";
import { p as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-6eJ4zIxS.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "mist", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.12em]", {
			mist: "text-mist border-white/12 bg-white/6",
			glacier: "text-glacier border-glacier/30 bg-glacier/10",
			magma: "text-magma border-magma/30 bg-magma/10",
			sandstone: "text-sandstone border-sandstone/30 bg-sandstone/10",
			ice: "text-ice border-ice/30 bg-ice/10",
			moss: "text-moss border-moss/30 bg-moss/10",
			fault: "text-fault border-fault/30 bg-fault/10"
		}[tone], className),
		...props
	});
}
//#endregion
export { Badge as t };
