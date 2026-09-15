import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Figure } from "./figure-TxgvG-Th.mjs";
import { i as termFigure } from "./figures-C-KLVjvI.mjs";
import { t as GLOSSARY } from "./glossary-data-Bk2fu37U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/glossary-BdrZcOO9.js
var import_jsx_runtime = require_jsx_runtime();
var LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
function Glossary() {
	const present = new Set(GLOSSARY.map((g) => g.term.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase()).filter(Boolean));
	const shownSrc = /* @__PURE__ */ new Set();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-[800px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Glossary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: "Words used in the labs."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-mist",
				children: "Defined on first use in each lab. Collected here for revision. One entry per term; UK and US spellings both kept where they differ."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "A to Z",
				className: "mt-8 flex flex-wrap gap-1",
				children: LETTERS.map((L) => present.has(L) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `#letter-${L}`,
					className: "inline-flex size-11 items-center justify-center rounded-full border border-white/10 font-mono text-sm text-glacier hover:bg-white/8",
					children: L
				}, L) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex size-11 items-center justify-center font-mono text-sm text-mist/40",
					children: L
				}, L))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-12 divide-y divide-white/10 border-y border-white/10",
				children: GLOSSARY.map((g, i) => {
					const letter = g.term.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase();
					const prev = GLOSSARY[i - 1]?.term.replace(/[^A-Za-z]/g, "").charAt(0).toUpperCase();
					const start = letter && letter !== prev;
					const fig = termFigure(g.term);
					const show = fig && !shownSrc.has(fig.src);
					if (fig && show) shownSrc.add(fig.src);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-5",
						id: start ? `letter-${letter}` : void 0,
						children: [
							start && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-glacier",
								children: letter
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-display text-xl text-chalk",
								children: g.term
							}),
							g.exam && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-mono text-[11px] text-glacier",
								children: g.exam
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-2 text-mist",
								children: g.def
							}),
							show && fig && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
								...fig,
								className: "mt-3 max-w-md"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/lab/$slug",
									params: { slug: g.lab },
									className: "text-sm text-ice hover:underline",
									children: g.labTitle
								})
							})
						]
					}, `${g.term}-${g.lab}`);
				})
			})
		]
	});
}
//#endregion
export { Glossary as component };
