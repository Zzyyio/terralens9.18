import { i as labsInRealm, r as REALMS, t as LABS } from "./catalog-OOT9SqiM.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { t as Button } from "./button-DsD8WSgU.mjs";
import { t as HeroEarth } from "./hero-earth-DR0OseN_.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as LAB_SCENES } from "./router-30Pb9LWH.mjs";
import { n as labStatus, t as isListed } from "./status-CNAXnHO9.mjs";
import { t as LabCard } from "./lab-card-CNY4vLyv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C3wuqmGB.js
var import_jsx_runtime = require_jsx_runtime();
var FEATURED = [
	"seasons",
	"earth-interior",
	"contours",
	"rivers"
];
function Home() {
	const featured = FEATURED.map((s) => LABS.find((l) => l.slug === s)).filter(Boolean);
	const ready = (slug) => Boolean(LAB_SCENES[slug] && isListed(slug));
	const nLabs = LABS.filter((l) => ready(l.slug)).length;
	const nReady = LABS.filter((l) => ready(l.slug) && labStatus(l.slug) === "complete").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative h-dvh min-h-[40rem] overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroEarth, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-end px-5 pb-16 pt-24 md:justify-center md:pb-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-label",
								children: "Geoscience studio"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 max-w-xl font-display text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.05] text-chalk",
								children: "See how the Earth works."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-md text-lg leading-7 text-mist",
								children: "Free 3D labs for geography and Earth science students."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pointer-events-auto mt-8 flex flex-wrap gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "pill",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/explore",
											children: "Explore labs"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "pill",
										variant: "secondary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/atlas",
											children: "Atlas"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "pill",
										variant: "ghost",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/teachers",
											children: "Teachers"
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pointer-events-auto mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-mist",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/glossary",
										className: "hover:text-glacier",
										children: "Glossary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/about",
										className: "hover:text-glacier",
										children: "About"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/privacy",
										className: "hover:text-glacier",
										children: "Privacy"
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-[1280px] px-5 py-16 md:py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-label",
						children: "Realms"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl text-chalk md:text-4xl",
						children: "Eight rooms. Eight ways in."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: REALMS.map((r) => {
							const n = labsInRealm(r.slug).filter((l) => ready(l.slug)).length;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/realms/$realm",
								params: { realm: r.slug },
								className: "rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-280 hover:border-glacier/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[11px] uppercase tracking-[0.14em] text-glacier",
										children: n === 1 ? "1 lab" : `${n} labs`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 font-display text-2xl text-chalk",
										children: r.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-6 text-mist",
										children: r.blurb
									})
								]
							}, r.slug);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-[1280px] px-5 pb-16 md:pb-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-label",
						children: "Featured labs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl text-chalk",
						children: "Built to read from the back of the room."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/explore",
						className: "hidden text-sm text-glacier hover:underline md:inline",
						children: "All labs"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4",
					children: featured.map((lab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabCard, { lab }, lab.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-white/10 bg-basalt",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-[1280px] gap-10 px-5 py-16 md:grid-cols-2 md:py-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-label",
							children: "Classroom"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl text-chalk",
							children: "Fifteen minutes. Projector on."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-md text-mist",
							children: "Space plays. Arrows scrub time. L labels. R reset. F fullscreen. P projector. No login."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-6",
							variant: "secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/teachers",
								children: "Teacher scripts"
							})
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-label",
							children: "On the bench"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 font-mono text-sm text-glacier",
							children: [
								nLabs,
								" labs · ",
								nReady,
								" ready for a full lesson"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-md text-sm leading-6 text-mist",
							children: "International English. SI units first. Keyboard for every 3D control. No login, no ads, no paywall. Free for students and teachers. Always."
						})
					] })]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
