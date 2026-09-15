import { i as labsInRealm, n as LAB_BY_SLUG } from "./catalog-OOT9SqiM.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { t as Button } from "./button-DsD8WSgU.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as LAB_SCENES } from "./router-30Pb9LWH.mjs";
import { t as LabCard } from "./lab-card-CNY4vLyv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/skills-80UFdxwY.js
var import_jsx_runtime = require_jsx_runtime();
function Skills() {
	const labs = labsInRealm("skills").filter((l) => LAB_SCENES[l.slug]);
	const extras = ["hydrograph", "soil-texture"].map((s) => LAB_BY_SLUG[s]).filter(Boolean).filter((l) => !labs.some((x) => x.slug === l.slug));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-[1100px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Skills studio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: "Read the map, then the hill."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-2xl text-lg leading-7 text-mist",
				children: "GCSE map questions are contour questions. Then the graticule, a projection, a grid reference, a hydrograph, a texture triangle — skills that earn their own bench."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
				children: labs.map((lab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabCard, { lab }, lab.slug))
			}),
			extras.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-16 font-display text-2xl",
				children: "Also a skill, housed in another realm"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
				children: extras.map((lab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabCard, { lab }, lab.slug))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-10",
				variant: "secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/explore",
					children: "All labs"
				})
			})
		]
	});
}
//#endregion
export { Skills as component };
