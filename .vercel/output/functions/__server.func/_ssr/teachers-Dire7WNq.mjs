import { r as REALMS, t as LABS } from "./catalog-OOT9SqiM.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as LAB_SCENES } from "./router-30Pb9LWH.mjs";
import { r as teacherScriptReady, t as isListed } from "./status-CNAXnHO9.mjs";
import { t as Figure } from "./figure-TxgvG-Th.mjs";
import { n as labFigure, r as labFigures, t as REALM_FIGURE } from "./figures-C-KLVjvI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/teachers-Dire7WNq.js
var import_jsx_runtime = require_jsx_runtime();
function Teachers() {
	const shipped = LABS.filter((lab) => LAB_SCENES[lab.slug] && isListed(lab.slug));
	const ready = shipped.filter((lab) => teacherScriptReady(lab.teacher.script));
	const pending = shipped.filter((lab) => !teacherScriptReady(lab.teacher.script));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-[800px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Teachers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl text-chalk md:text-5xl",
				children: "Fifteen minutes, projector on."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 text-lg leading-7 text-mist",
				children: [
					"No login. Open a lab, go full screen, talk. ",
					ready.length,
					" labs have a full demo script",
					pending.length ? `; ${pending.length} still thin` : "",
					". Each script names the misconception you will hear from the third row. Same count as Explore."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 space-y-16",
				children: REALMS.map((realm) => {
					const labs = ready.filter((lab) => lab.realm === realm.slug);
					if (labs.length === 0) return null;
					const realmFig = REALM_FIGURE[realm.slug];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-label",
							children: realm.kicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl text-chalk",
							children: realm.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-mist",
							children: realm.blurb
						}),
						realmFig && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
							...realmFig,
							className: "mt-5 max-w-xl"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 space-y-4",
							children: labs.map((lab) => {
								const shot = labFigures(lab.slug)[0] ?? labFigure(lab.slug);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-2xl border border-white/10 bg-white/[0.04] p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-[11px] uppercase tracking-[0.14em] text-glacier",
											children: lab.curriculum[0]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-1 font-display text-2xl",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/lab/$slug",
												params: { slug: lab.slug },
												className: "hover:text-glacier",
												children: lab.title
											})
										}),
										shot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
											...shot,
											className: "mt-3"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 whitespace-pre-line text-sm leading-6 text-chalk/90",
											children: lab.teacher.script
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "mt-3 list-disc pl-5 text-sm text-mist",
											children: lab.teacher.pitfalls.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: p }, p))
										})
									]
								}, lab.slug);
							})
						})
					] }, realm.slug);
				})
			})
		]
	});
}
//#endregion
export { Teachers as component };
