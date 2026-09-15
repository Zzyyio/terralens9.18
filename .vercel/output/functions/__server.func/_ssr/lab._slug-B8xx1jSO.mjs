import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as LAB_BY_SLUG } from "./catalog-OOT9SqiM.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { s as useIsCompact } from "./perf-Cy1NcWbY.mjs";
import { v as Link, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Play, f as Maximize, h as Focus, i as Spline, l as Pause, m as Layers2, o as RotateCcw, p as Link2, r as Tags, s as Projector, u as Minimize } from "../_libs/lucide-react.mjs";
import { d as siteOrigin, i as Route$10, s as LAB_SCENES, u as learningResourceJsonLd } from "./router-30Pb9LWH.mjs";
import { t as Figure } from "./figure-TxgvG-Th.mjs";
import { t as Badge } from "./badge-6eJ4zIxS.mjs";
import { i as termFigure, r as labFigures } from "./figures-C-KLVjvI.mjs";
import { t as LabThumb } from "./lab-thumb-dlTGNI-V.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab._slug-B8xx1jSO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function defaultParams(lab) {
	const d = {};
	for (const e of lab.controls.extra ?? []) if (e.default !== void 0) d[e.key] = e.default;
	else if (e.key === "tilt") d.tilt = 23.44;
	else if (e.key === "interval") d.interval = 10;
	else if (e.key === "discharge") d.discharge = .7;
	else if (e.key === "ageMa") d.ageMa = 0;
	else if (e.key === "abstraction") d.abstraction = 0;
	else d[e.key] = (e.min + e.max) / 2;
	for (const t of lab.controls.toggles ?? []) d[t.key] = t.defaultOn ? 1 : 0;
	return d;
}
function StepRail({ lab }) {
	const step = useLabControls((s) => s.step);
	const setStep = useLabControls((s) => s.setStep);
	const setPanelTab = useLabControls((s) => s.setPanelTab);
	const current = lab.steps[step] ?? lab.steps[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "pointer-events-auto flex max-h-[min(58vh,32rem)] w-full flex-col gap-3 overflow-y-auto rounded-[20px] border border-white/10 bg-basalt/75 p-4 backdrop-blur-xl lg:w-[min(100%,18rem)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Steps"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex flex-col gap-1",
				children: lab.steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setStep(i);
						if (s.id === "check") setPanelTab("check");
					},
					className: cn("flex w-full items-center gap-3 rounded-[10px] px-2 py-2 text-left text-sm", i === step ? "bg-white/10 text-chalk" : "text-mist hover:bg-white/6 hover:text-chalk"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("inline-flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px]", i === step ? "bg-glacier text-basalt" : "bg-white/8 text-mist"),
						children: i + 1
					}), s.title]
				}) }, s.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[13px] leading-5 text-chalk/90",
				children: current.body
			})
		]
	});
}
var WHY_LABELS = [
	"Why this matters",
	"The mechanism",
	"How to drive the model",
	"If the model will not spin"
];
function WhyPanel({ lab }) {
	const tab = useLabControls((s) => s.panelTab);
	const setTab = useLabControls((s) => s.setPanelTab);
	const exam = useLabControls((s) => s.examLanguage);
	const setExam = useLabControls((s) => s.setExam);
	const pairs = lab.misconceptions?.length ? lab.misconceptions : [lab.misconception];
	const figs = labFigures(lab.slug);
	const seenTermSrc = /* @__PURE__ */ new Set();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "pointer-events-auto flex max-h-[min(68vh,40rem)] w-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-basalt/75 backdrop-blur-xl lg:w-[min(100%,22rem)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex border-b border-white/10",
			children: [
				["why", "Why"],
				["terms", "Terms"],
				["check", "Check"],
				["teach", "Teacher"]
			].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setTab(id),
				className: cn("flex-1 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em]", tab === id ? "text-glacier" : "text-mist hover:text-chalk"),
				children: label
			}, id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-y-auto p-4 text-[13px] leading-5",
			children: [
				tab === "why" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						figs[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, { ...figs[0] }),
						lab.why.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "section-label",
								children: WHY_LABELS[i] ?? `Note ${i + 1}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[13px] leading-6 text-chalk/90",
								children: w
							}),
							i === 0 && figs[1] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, { ...figs[1] })
						] }, w.slice(0, 56))),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-label",
							children: "Misconceptions"
						}),
						pairs.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[10px] border border-fault/30 bg-fault/10 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-fault",
								children: m.claim
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-chalk",
								children: m.truth
							})]
						}, m.claim)),
						lab.cases.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-label mb-2",
							children: "Cases"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-1",
							children: lab.cases.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/case/$slug",
								params: { slug: c.slug },
								className: "text-ice hover:underline",
								children: c.label
							}) }, c.slug))
						})] })
					]
				}),
				tab === "terms" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center justify-between gap-2 text-mist",
						children: ["Exam language", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: exam,
							onChange: (e) => setExam(e.target.checked),
							className: "accent-glacier"
						})]
					}), lab.glossary.map((g) => {
						const tfig = termFigure(g.term);
						const show = tfig && !seenTermSrc.has(tfig.src);
						if (tfig && show) seenTermSrc.add(tfig.src);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-chalk",
								children: exam && g.exam ? g.exam : g.term
							}),
							exam && g.exam && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] text-mist",
								children: g.term
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-mist",
								children: g.def
							}),
							show && tfig && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
								...tfig,
								size: "sm"
							})
						] }, g.term);
					})]
				}),
				tab === "check" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckList, { lab }),
				tab === "teach" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						(figs[1] ?? figs[0]) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
							...figs[1] ?? figs[0],
							size: "sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-label",
							children: "8–12 minute demo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-line text-chalk/90",
							children: lab.teacher.script
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-label",
							children: "Common misconceptions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "list-disc space-y-1 pl-4 text-mist",
							children: lab.teacher.pitfalls.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: p }, p))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "section-label",
							children: "Sources"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-1 text-mist",
							children: lab.sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: s.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: s.href,
								className: "text-ice hover:underline",
								target: "_blank",
								rel: "noreferrer",
								children: s.label
							}) : s.label }, s.label))
						})
					]
				})
			]
		})]
	});
}
function CheckList({ lab }) {
	const [picked, setPicked] = (0, import_react.useState)({});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-5",
		children: lab.questions.map((q, i) => {
			const choice = picked[i];
			const shown = choice !== void 0;
			const ok = shown && choice === q.answer;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-medium text-chalk",
					children: [
						i + 1,
						". ",
						q.prompt
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1.5",
					children: q.choices.map((c, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPicked((p) => ({
							...p,
							[i]: j
						})),
						className: cn("min-h-11 w-full rounded-[10px] border px-3 py-2 text-left text-[13px]", choice === j ? ok ? "border-moss/50 bg-moss/15 text-chalk" : "border-fault/50 bg-fault/15 text-chalk" : "border-white/10 text-mist hover:border-white/25 hover:text-chalk"),
						children: c
					}) }, c))
				}),
				shown && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[12px] leading-5 text-mist",
					children: q.explain
				})
			] }, q.prompt);
		})
	});
}
var KEYS = [
	"t",
	"step",
	"labels",
	"explode",
	"slice",
	"speed"
];
function applyLabUrl() {
	const u = readLabUrl();
	const s = useLabControls.getState();
	if (u.t != null) s.setT(u.t);
	if (u.step != null) s.setStep(Math.max(0, Math.floor(u.step)));
	if (u.labels != null) s.setLabels(u.labels);
	if (u.explode != null) s.setExplode(u.explode);
	if (u.slice != null) s.setSlice(u.slice);
	if (u.speed != null) s.setSpeed(u.speed);
	if (u.layout) s.setLayout(u.layout);
	for (const [k, v] of Object.entries(u.params)) s.setParam(k, v);
}
function write() {
	if (typeof window === "undefined") return;
	const s = useLabControls.getState();
	const q = new URLSearchParams();
	q.set("t", s.t.toFixed(3));
	q.set("step", String(s.step));
	q.set("labels", s.labels ? "1" : "0");
	if (s.explode > .01) q.set("explode", s.explode.toFixed(2));
	if (s.slice > .01) q.set("slice", s.slice.toFixed(2));
	if (s.speed !== 1) q.set("speed", String(s.speed));
	if (s.layout === "projector") q.set("layout", "projector");
	for (const [k, v] of Object.entries(s.params)) if (typeof v === "number" && Number.isFinite(v)) q.set(k, String(Number(v.toFixed(3))));
	const next = `${window.location.pathname}?${q.toString()}`;
	if (next !== `${window.location.pathname}${window.location.search}`) window.history.replaceState(null, "", next);
}
function readLabUrl() {
	if (typeof window === "undefined") return { params: {} };
	const q = new URLSearchParams(window.location.search);
	const params = {};
	q.forEach((v, k) => {
		if (KEYS.includes(k) || k === "layout") return;
		const n = Number(v);
		if (Number.isFinite(n)) params[k] = n;
	});
	const num = (k) => {
		const v = q.get(k);
		if (v == null) return void 0;
		const n = Number(v);
		return Number.isFinite(n) ? n : void 0;
	};
	return {
		t: num("t"),
		step: num("step"),
		labels: q.has("labels") ? q.get("labels") !== "0" : void 0,
		explode: num("explode"),
		slice: num("slice"),
		speed: num("speed"),
		layout: q.get("layout") === "projector" ? "projector" : void 0,
		params
	};
}
/** Persist lab state into the query string. Hydrate from LabPlayer after defaults. */
function useLabUrlSync() {
	(0, import_react.useEffect)(() => {
		let timer = 0;
		const unsub = useLabControls.subscribe(() => {
			window.clearTimeout(timer);
			timer = window.setTimeout(write, 80);
		});
		return () => {
			window.clearTimeout(timer);
			unsub();
		};
	}, []);
}
function labShareUrl() {
	if (typeof window === "undefined") return "";
	write();
	return window.location.href;
}
function ControlBar({ lab, fullscreen, onToggleFullscreen }) {
	const playing = useLabControls((s) => s.playing);
	const speed = useLabControls((s) => s.speed);
	const t = useLabControls((s) => s.t);
	const labels = useLabControls((s) => s.labels);
	const explode = useLabControls((s) => s.explode);
	const slice = useLabControls((s) => s.slice);
	const params = useLabControls((s) => s.params);
	const layout = useLabControls((s) => s.layout);
	const toggle = useLabControls((s) => s.toggle);
	const setSpeed = useLabControls((s) => s.setSpeed);
	const setT = useLabControls((s) => s.setT);
	const setLabels = useLabControls((s) => s.setLabels);
	const setExplode = useLabControls((s) => s.setExplode);
	const setSlice = useLabControls((s) => s.setSlice);
	const setParam = useLabControls((s) => s.setParam);
	const reset = useLabControls((s) => s.reset);
	const resetView = useLabControls((s) => s.resetView);
	const setLayout = useLabControls((s) => s.setLayout);
	const trueScale = useLabControls((s) => s.trueScale);
	const setTrueScale = useLabControls((s) => s.setTrueScale);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const timeLabel = lab.controls.time === "year" ? "Year" : lab.controls.time === "day" ? "Day" : lab.controls.time === "month" ? "Month" : lab.controls.time === "none" ? null : "Process";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-auto mx-auto flex w-full max-w-[1100px] flex-col gap-2 rounded-[20px] border border-white/10 bg-basalt/80 px-3 py-2.5 backdrop-blur-xl md:flex-row md:flex-wrap md:items-center md:gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: playing ? "Pause" : "Play",
						onClick: toggle,
						children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" })
					}),
					lab.controls.time !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex rounded-[10px] bg-white/6 p-0.5",
						children: [
							1,
							2,
							4
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSpeed(s),
							className: cn("inline-flex h-11 min-w-11 items-center justify-center rounded-[8px] px-2 font-mono text-[11px]", speed === s ? "bg-glacier text-basalt" : "text-mist hover:text-chalk"),
							children: [s, "×"]
						}, s))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: "Reset lab",
						onClick: () => reset(defaultParams(lab)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: "Reset view",
						onClick: resetView,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focus, { className: "size-4" })
					})
				]
			}),
			timeLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-mist sm:inline",
						children: timeLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 1,
						step: .001,
						value: t,
						onChange: (e) => setT(Number(e.target.value)),
						className: "h-2 w-full accent-glacier",
						"aria-label": timeLabel,
						suppressHydrationWarning: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-10 shrink-0 font-mono text-[11px] tabular-nums text-chalk",
						children: t.toFixed(2)
					})
				]
			}),
			lab.controls.extra?.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex min-w-[9rem] items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whitespace-nowrap font-mono text-[11px] text-mist",
						children: ex.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: ex.min,
						max: ex.max,
						step: ex.step,
						value: params[ex.key] ?? ex.default ?? ex.min,
						onChange: (e) => setParam(ex.key, Number(e.target.value)),
						className: "h-2 w-24 accent-sandstone",
						"aria-label": ex.label,
						suppressHydrationWarning: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "w-12 shrink-0 font-mono text-[11px] tabular-nums text-chalk",
						children: [Number(params[ex.key] ?? ex.default ?? ex.min).toFixed(ex.step < 1 ? 1 : 0), ex.unit ?? ""]
					})
				]
			}, ex.key)),
			lab.controls.toggles?.map((tg) => {
				const on = (params[tg.key] ?? (tg.defaultOn ? 1 : 0)) > .5;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setParam(tg.key, on ? 0 : 1),
					className: cn("inline-flex h-11 shrink-0 items-center rounded-full border px-3 font-mono text-[11px]", on ? "border-glacier/40 bg-glacier/15 text-glacier" : "border-white/10 text-mist hover:text-chalk"),
					children: tg.label
				}, tg.key);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [
					lab.controls.explode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-1.5 pr-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers2, { className: "size-3.5 text-mist" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 1,
							step: .01,
							value: explode,
							onChange: (e) => setExplode(Number(e.target.value)),
							className: "h-2 w-16 accent-magma",
							"aria-label": "Explode layers",
							suppressHydrationWarning: true
						})]
					}),
					lab.controls.slice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-1.5 pr-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spline, { className: "size-3.5 text-mist" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 1,
							step: .01,
							value: slice,
							onChange: (e) => setSlice(Number(e.target.value)),
							className: "h-2 w-16 accent-ice",
							"aria-label": "Cross-section",
							suppressHydrationWarning: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: "Toggle labels",
						onClick: () => setLabels(!labels),
						active: labels,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tags, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: trueScale ? "Teaching exaggeration" : "True scale",
						onClick: () => setTrueScale(!trueScale),
						active: trueScale,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[10px]",
							children: trueScale ? "1:1" : "×"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: layout === "projector" ? "Classroom HUD" : "Projector layout",
						onClick: () => setLayout(layout === "projector" ? "hud" : "projector"),
						active: layout === "projector",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projector, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: copied ? "Link copied" : "Copy share link",
						onClick: () => {
							const url = labShareUrl();
							navigator.clipboard?.writeText(url).then(() => {
								setCopied(true);
								window.setTimeout(() => setCopied(false), 1600);
							});
						},
						active: copied,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: fullscreen ? "Exit fullscreen" : "Fullscreen",
						onClick: onToggleFullscreen,
						children: fullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "size-4" })
					})
				]
			})
		]
	});
}
function IconBtn({ children, onClick, label, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		title: label,
		onClick,
		className: cn("inline-flex size-11 items-center justify-center rounded-[10px] text-chalk hover:bg-white/10", active && "bg-glacier/20 text-glacier"),
		children
	});
}
function LabPlayer({ lab, scene }) {
	const hydrate = useLabControls((s) => s.hydrate);
	const toggle = useLabControls((s) => s.toggle);
	const reset = useLabControls((s) => s.reset);
	const setT = useLabControls((s) => s.setT);
	const t = useLabControls((s) => s.t);
	const setLabels = useLabControls((s) => s.setLabels);
	const labels = useLabControls((s) => s.labels);
	const setExplode = useLabControls((s) => s.setExplode);
	const explode = useLabControls((s) => s.explode);
	const setSlice = useLabControls((s) => s.setSlice);
	const slice = useLabControls((s) => s.slice);
	const layout = useLabControls((s) => s.layout);
	const setLayout = useLabControls((s) => s.setLayout);
	const setPanelTab = useLabControls((s) => s.setPanelTab);
	const setTrueScale = useLabControls((s) => s.setTrueScale);
	const trueScale = useLabControls((s) => s.trueScale);
	const compact = useIsCompact();
	const root = (0, import_react.useRef)(null);
	const [fs, setFs] = (0, import_react.useState)(false);
	const [drawer, setDrawer] = (0, import_react.useState)(null);
	const projector = layout === "projector" && !compact;
	useLabUrlSync();
	(0, import_react.useEffect)(() => {
		hydrate(defaultParams(lab));
		if (lab.controls.slice) useLabControls.getState().setSlice(.42);
		applyLabUrl();
	}, [
		lab.slug,
		hydrate,
		lab
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const tag = e.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA") return;
			if (e.code === "Space") {
				e.preventDefault();
				toggle();
			} else if (e.key === "r" || e.key === "R") reset(defaultParams(lab));
			else if (e.key === "l" || e.key === "L") setLabels(!labels);
			else if (e.key === "e" || e.key === "E") setExplode(explode > .5 ? 0 : 1);
			else if (e.key === "x" || e.key === "X") setSlice(slice > .5 ? 0 : 1);
			else if (e.key === "p" || e.key === "P") setLayout(layout === "projector" ? "hud" : "projector");
			else if (e.key === "f" || e.key === "F") toggleFs();
			else if (e.key === "t" || e.key === "T") setTrueScale(!trueScale);
			else if (e.key === "ArrowRight") setT(t + .02);
			else if (e.key === "ArrowLeft") setT(t - .02);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		toggle,
		reset,
		lab,
		setT,
		t,
		setLabels,
		labels,
		setExplode,
		explode,
		setSlice,
		slice,
		layout,
		setLayout,
		setTrueScale,
		trueScale
	]);
	async function toggleFs() {
		if (!root.current) return;
		if (!document.fullscreenElement) {
			await root.current.requestFullscreen().catch(() => void 0);
			setFs(true);
		} else {
			await document.exitFullscreen().catch(() => void 0);
			setFs(false);
		}
	}
	const titleBlock = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: projector ? "max-w-3xl" : "max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Lab"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-[24px] leading-8 text-chalk md:text-[32px] md:leading-10",
				children: lab.title
			}),
			!projector && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-lg text-sm leading-6 text-mist",
					children: lab.hook
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1.5",
					children: lab.curriculum.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "mist",
						className: "shrink-0 whitespace-nowrap",
						children: c
					}, c))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm leading-6 text-chalk/85",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-mist",
						children: "By the end you can "
					}), lab.objective.charAt(0).toLowerCase() + lab.objective.slice(1)]
				})
			] }),
			projector && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-mist",
				children: lab.objective
			})
		]
	});
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: root,
		id: "main",
		className: "flex h-dvh flex-col overflow-hidden bg-void",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative min-h-0 flex-[1.05]",
			children: scene
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "z-10 max-h-[48vh] shrink-0 overflow-y-auto border-t border-white/10 bg-basalt",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 pt-4",
					children: titleBlock
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-4 pt-2 text-xs text-mist",
					children: [
						"Best on a computer or projector.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-glacier underline",
							onClick: () => void navigator.clipboard?.writeText(labShareUrl()),
							children: "Copy this lab’s link"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 p-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepRail, { lab }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyPanel, { lab })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sticky bottom-0 px-3 pb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlBar, {
						lab,
						fullscreen: fs,
						onToggleFullscreen: () => void toggleFs()
					})
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: root,
		id: "main",
		className: "relative h-dvh overflow-hidden bg-void",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				children: scene
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 top-14 z-10 px-4 pt-3 md:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-auto",
					children: titleBlock
				})
			}),
			!projector && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute bottom-24 left-4 top-56 z-10 flex items-start md:left-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepRail, { lab })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute bottom-24 right-4 top-56 z-10 flex items-start md:right-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyPanel, { lab })
			})] }),
			projector && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-auto absolute right-4 top-16 z-20 flex gap-2 md:right-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-full border border-white/10 bg-basalt/80 px-4 text-sm text-chalk",
					onClick: () => setDrawer(drawer === "steps" ? null : "steps"),
					children: "Steps"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-full border border-white/10 bg-basalt/80 px-4 text-sm text-chalk",
					onClick: () => {
						setPanelTab("why");
						setDrawer(drawer === "why" ? null : "why");
					},
					children: "Why"
				})]
			}),
			projector && drawer === "steps" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-auto absolute bottom-24 left-4 top-24 z-20 md:left-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepRail, { lab })
			}),
			projector && drawer === "why" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-auto absolute bottom-24 right-4 top-24 z-20 md:right-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyPanel, { lab })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-3 z-10 px-3 md:bottom-4 md:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlBar, {
					lab,
					fullscreen: fs,
					onToggleFullscreen: () => void toggleFs()
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "pointer-events-none absolute bottom-[4.6rem] left-1/2 z-10 hidden -translate-x-1/2 font-mono text-[10px] text-mist/80 xl:block",
				children: [
					"Space play · arrows time · L labels · R reset · F fullscreen · P projector · T true scale · click a label",
					lab.controls.explode ? " · E explode" : "",
					lab.controls.slice ? " · X slice" : ""
				]
			})
		]
	});
}
function LabLoadFallback({ title }) {
	const [timedOut, setTimedOut] = (0, import_react.useState)(false);
	const play = useLabControls((s) => s.play);
	(0, import_react.useEffect)(() => {
		const id = window.setTimeout(() => setTimedOut(true), 2500);
		return () => window.clearTimeout(id);
	}, []);
	if (!timedOut) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full min-h-[42vh] items-center justify-center bg-void text-mist",
		children: "Loading lab…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-[42vh] flex-col items-center justify-center bg-void px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full max-w-md overflow-hidden rounded-2xl border border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-[16/10] bg-trench",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabThumb, { slug: "seasons" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-sm text-center text-sm text-mist",
				children: "The 3D bench is taking longer than a classroom projector likes. Use the still, or press play to keep waiting."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => play(),
				className: "mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-glacier px-5 text-sm font-medium text-basalt",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }),
					" Play ",
					title
				]
			})
		]
	});
}
function LabPage() {
	const { slug } = Route$10.useParams();
	const lab = LAB_BY_SLUG[slug];
	const Scene = LAB_SCENES[slug];
	if (!lab || !Scene) throw notFound();
	const jsonLd = learningResourceJsonLd({
		name: lab.title,
		description: lab.hook,
		url: `${siteOrigin()}/lab/${lab.slug}`,
		educationalLevel: lab.ages,
		about: lab.realm
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
			type: "application/ld+json",
			dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "sr-only",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: lab.title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: lab.hook }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["By the end you can ", lab.objective.charAt(0).toLowerCase() + lab.objective.slice(1)] }),
				lab.why.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: w }, w.slice(0, 40)))
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabLoadFallback, { title: lab.title }),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabPlayer, {
				lab,
				scene: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {})
			})
		})
	] });
}
//#endregion
export { LabPage as component };
