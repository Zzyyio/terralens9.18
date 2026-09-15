import { i as __toESM } from "../_runtime.mjs";
import { t as LABS } from "./catalog-OOT9SqiM.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as Button } from "./button-DsD8WSgU.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as CASES, s as LAB_SCENES } from "./router-30Pb9LWH.mjs";
import { t as isListed } from "./status-CNAXnHO9.mjs";
import { t as GLOSSARY } from "./glossary-data-Bk2fu37U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-BACjqyRq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SHIPPED = LABS.filter((l) => LAB_SCENES[l.slug] && isListed(l.slug));
function SearchPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const needle = q.trim().toLowerCase();
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
			const el = e.target;
			const tag = el?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || el?.isContentEditable) return;
			e.preventDefault();
			inputRef.current?.focus();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const labs = (0, import_react.useMemo)(() => {
		if (!needle) return SHIPPED;
		return SHIPPED.filter((l) => [
			l.title,
			l.hook,
			l.objective,
			l.realm,
			...l.curriculum,
			...l.ages
		].join(" ").toLowerCase().includes(needle));
	}, [needle]);
	const terms = (0, import_react.useMemo)(() => {
		if (!needle) return GLOSSARY.slice(0, 12);
		return GLOSSARY.filter((g) => `${g.term} ${g.def} ${g.exam ?? ""}`.toLowerCase().includes(needle));
	}, [needle]);
	const cases = (0, import_react.useMemo)(() => {
		if (!needle) return CASES.slice(0, 8);
		return CASES.filter((c) => `${c.title} ${c.place} ${c.lede} ${c.body.join(" ")}`.toLowerCase().includes(needle));
	}, [needle]);
	const empty = needle.length > 0 && labs.length === 0 && terms.length === 0 && cases.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-[900px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Search"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl text-chalk md:text-5xl",
				children: "Find a lab, a word, a place."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-mist",
				children: "Press / to focus. SI names and ordinary English both work."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "relative mt-8 block",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Search TerraLens"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						autoFocus: true,
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Seasons, Holderness, Coriolis…",
						className: "h-12 w-full rounded-[16px] border border-white/10 bg-white/6 px-4 pr-24 text-chalk placeholder:text-mist/70",
						suppressHydrationWarning: true
					}),
					q && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setQ("");
							inputRef.current?.focus();
						},
						className: "absolute right-2 top-1/2 inline-flex h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full px-3 font-mono text-[11px] text-mist hover:text-chalk",
						children: "Clear"
					})
				]
			}),
			empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 max-w-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "This coordinate is empty ocean."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-mist",
						children: "Nothing on the chart matches that. Try a realm name, a landform, or a case."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/explore",
							children: "Explore labs"
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 space-y-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "section-label",
						children: ["Labs · ", labs.length]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-white/10 border-y border-white/10",
						children: labs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/lab/$slug",
							params: { slug: l.slug },
							className: "flex flex-col gap-1 py-4 hover:text-glacier",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl text-chalk",
								children: l.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-mist",
								children: l.hook
							})]
						}) }, l.slug))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "section-label",
						children: ["Glossary · ", terms.length]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-4",
						children: terms.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-chalk",
								children: g.term
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-mist",
								children: g.def
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/lab/$slug",
								params: { slug: g.lab },
								className: "text-sm text-ice hover:underline",
								children: g.labTitle
							})
						] }, `${g.term}-${g.lab}-${i}`))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "section-label",
						children: ["Cases · ", cases.length]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-4",
						children: cases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/case/$slug",
							params: { slug: c.slug },
							className: "hover:text-glacier",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl text-chalk",
								children: c.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-mist",
								children: c.lede
							})]
						}) }, c.slug))
					})] })
				]
			})
		]
	});
}
//#endregion
export { SearchPage as component };
