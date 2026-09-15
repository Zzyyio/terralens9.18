import { n as LAB_BY_SLUG } from "./catalog-OOT9SqiM.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { t as Button } from "./button-DsD8WSgU.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./router-30Pb9LWH.mjs";
import { t as LabCard } from "./lab-card-CNY4vLyv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/topic._slug-AgqNNULk.js
var import_jsx_runtime = require_jsx_runtime();
function TopicPage() {
	const { slug } = Route.useParams();
	const lab = LAB_BY_SLUG[slug];
	if (!lab) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-5 pt-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl",
			children: "Topic not shipped."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/explore",
				children: "Explore labs"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-[720px] px-5 pb-24 pt-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "section-label",
				children: "Topic"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl",
				children: lab.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-lg text-mist",
				children: lab.hook
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 max-w-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabCard, { lab })
			})
		]
	});
}
//#endregion
export { TopicPage as component };
