import { i as __toESM } from "../_runtime.mjs";
import { F as Timer } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as usePrefersReducedMotion } from "./perf-Cy1NcWbY.mjs";
import { t as useLabControls } from "./lab-controls-hcJtd1eL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tick-BajM2lC-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Advance lab time from a RAF loop so it works both inside and outside a Canvas.
* Uses THREE.Timer (Clock.getDelta() is not safe to call twice per frame).
* rate = full cycles per second at speed 1.
*/
function useLabTick(rate) {
	const tick = useLabControls((s) => s.tick);
	const reduced = usePrefersReducedMotion();
	(0, import_react.useEffect)(() => {
		const timer = new Timer();
		let id = 0;
		const loop = () => {
			timer.update();
			const dt = Math.min(timer.getDelta(), .1);
			if (!reduced) tick(dt, rate);
			id = requestAnimationFrame(loop);
		};
		id = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(id);
	}, [
		tick,
		rate,
		reduced
	]);
}
//#endregion
export { useLabTick as t };
