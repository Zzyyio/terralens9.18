import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as REALMS, t as LABS } from "./catalog-OOT9SqiM.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { s as LAB_SCENES } from "./router-30Pb9LWH.mjs";
import { n as labStatus, t as isListed } from "./status-CNAXnHO9.mjs";
import { t as LabCard } from "./lab-card-CNY4vLyv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore-B10QLj98.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var UK = [
	"KS3",
	"GCSE",
	"A-level"
];
var US = [
	"NGSS MS",
	"HS Earth Sci",
	"APES"
];
var SHIPPED = LABS.filter((l) => LAB_SCENES[l.slug] && isListed(l.slug));
function Explore() {
	const [realm, setRealm] = (0, import_react.useState)("all");
	const [uk, setUk] = (0, import_react.useState)("all");
	const [us, setUs] = (0, import_react.useState)("all");
	const list = (0, import_react.useMemo)(() => SHIPPED.filter((l) => realm === "all" ? true : l.realm === realm).filter((l) => uk === "all" ? true : l.ages.includes(uk)).filter((l) => us === "all" ? true : l.ages.includes(us)), [
		realm,
		uk,
		us
	]);
	const complete = SHIPPED.filter((l) => labStatus(l.slug) === "complete").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-[1280px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Explore"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-3 font-display text-4xl text-chalk md:text-5xl",
				children: [
					SHIPPED.length,
					" labs. ",
					complete,
					" ready for a full lesson."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-mist",
				children: "Filter by realm, then by a curriculum tag if you need one. KS3 / GCSE / A-level / NGSS / APES are filters, not the identity of the studio. A lab without a model does not get a card."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterRow, {
						label: "Realm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: realm === "all",
							onClick: () => setRealm("all"),
							children: "All"
						}), REALMS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: realm === r.slug,
							onClick: () => setRealm(r.slug),
							children: r.title
						}, r.slug))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterRow, {
						label: "UK stage",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: uk === "all",
							onClick: () => setUk("all"),
							children: "All"
						}), UK.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: uk === a,
							onClick: () => setUk(a),
							children: a
						}, a))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilterRow, {
						label: "US framework",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: us === "all",
							onClick: () => setUs("all"),
							children: "All"
						}), US.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: us === a,
							onClick: () => setUs(a),
							children: a
						}, a))]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
				children: list.map((lab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabCard, { lab }, lab.slug))
			}),
			list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 max-w-lg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "This coordinate is empty ocean."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-mist",
						children: "No lab matches that pair. Try All, or another realm."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setRealm("all");
							setUk("all");
							setUs("all");
						},
						className: "mt-6 inline-flex h-11 items-center rounded-full bg-glacier px-5 text-sm text-basalt",
						children: "Explore labs"
					})
				]
			})
		]
	});
}
function FilterRow({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "section-label mb-3",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children
	})] });
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("inline-flex h-11 items-center rounded-full border px-3.5 text-sm", active ? "border-glacier/40 bg-glacier text-basalt" : "border-white/10 bg-white/6 text-chalk hover:bg-white/10"),
		children
	});
}
//#endregion
export { Explore as component };
