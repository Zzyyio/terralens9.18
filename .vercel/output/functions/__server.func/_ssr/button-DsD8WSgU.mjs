import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DsD8WSgU.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,color,border-color,opacity] duration-180 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-glacier active:scale-[0.98]", {
	variants: {
		variant: {
			primary: "bg-glacier text-basalt hover:bg-ice",
			secondary: "bg-white/8 text-chalk border border-white/10 hover:bg-white/12",
			ghost: "bg-transparent text-chalk hover:bg-white/8",
			magma: "bg-magma text-void hover:brightness-110"
		},
		size: {
			sm: "h-9 px-3.5 text-sm rounded-[10px]",
			md: "h-11 px-5 text-[15px] rounded-[10px]",
			lg: "h-12 px-6 text-base rounded-[10px]",
			pill: "h-11 px-5 text-[15px] rounded-full",
			icon: "size-11 rounded-[10px]",
			"icon-sm": "size-9 rounded-[10px]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { Button as t };
