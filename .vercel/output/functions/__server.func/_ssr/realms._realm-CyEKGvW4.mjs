import { i as labsInRealm, r as REALMS } from "./catalog-OOT9SqiM.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$7, s as LAB_SCENES } from "./router-30Pb9LWH.mjs";
import { t as isListed } from "./status-CNAXnHO9.mjs";
import { t as Figure } from "./figure-TxgvG-Th.mjs";
import { t as REALM_FIGURE } from "./figures-C-KLVjvI.mjs";
import { t as LabCard } from "./lab-card-CNY4vLyv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/realms._realm-CyEKGvW4.js
var import_jsx_runtime = require_jsx_runtime();
function RealmPage() {
	const { realm } = Route$7.useParams();
	const meta = REALMS.find((r) => r.slug === realm);
	if (!meta) throw notFound();
	const labs = labsInRealm(meta.slug).filter((l) => LAB_SCENES[l.slug] && isListed(l.slug));
	const fig = REALM_FIGURE[meta.slug];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "mx-auto max-w-[1280px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Realm"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl md:text-5xl",
				children: meta.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-glacier",
				children: meta.kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-2xl text-mist",
				children: meta.blurb
			}),
			fig && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
				...fig,
				className: "mt-8 max-w-xl"
			}),
			labs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-16 max-w-lg text-mist",
				children: "No shipped lab in this realm yet, so there is no empty card. Start with Explore."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
				children: labs.map((lab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabCard, { lab }, lab.slug))
			})
		]
	});
}
//#endregion
export { RealmPage as component };
