import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab-controls-hcJtd1eL.js
var useLabControls = create((set, get) => ({
	playing: false,
	speed: 1,
	t: .4,
	explode: 0,
	slice: 0,
	labels: true,
	examLanguage: false,
	graticule: false,
	trueScale: false,
	inspect: null,
	step: 0,
	panelTab: "why",
	params: {},
	layout: "hud",
	viewKey: 0,
	liveText: "",
	play: () => set({ playing: true }),
	pause: () => set({ playing: false }),
	toggle: () => set({ playing: !get().playing }),
	setSpeed: (speed) => set({ speed }),
	setT: (t) => set({ t: (t % 1 + 1) % 1 }),
	setExplode: (explode) => set({ explode: Math.min(1, Math.max(0, explode)) }),
	setSlice: (slice) => set({ slice: Math.min(1, Math.max(0, slice)) }),
	setLabels: (labels) => set({ labels }),
	setExam: (examLanguage) => set({ examLanguage }),
	setGraticule: (graticule) => set({ graticule }),
	setTrueScale: (trueScale) => set({ trueScale }),
	setInspect: (inspect) => set({ inspect }),
	setStep: (step) => set({ step }),
	setPanelTab: (panelTab) => set({ panelTab }),
	setParam: (key, value) => set({ params: {
		...get().params,
		[key]: value
	} }),
	setLayout: (layout) => set({ layout }),
	resetView: () => set({ viewKey: get().viewKey + 1 }),
	setLiveText: (liveText) => set({ liveText }),
	tick: (dt, rate) => {
		const { playing, speed, t } = get();
		if (!playing) return;
		const next = t + Math.min(dt, .1) * speed * rate;
		set({ t: next - Math.floor(next) });
	},
	reset: (defaults) => set({
		playing: false,
		speed: 1,
		t: .4,
		explode: 0,
		slice: 0,
		labels: true,
		graticule: false,
		trueScale: false,
		inspect: null,
		step: 0,
		panelTab: "why",
		params: defaults ?? get().params,
		viewKey: get().viewKey + 1
	}),
	hydrate: (defaults) => set({
		playing: false,
		speed: 1,
		t: .4,
		explode: 0,
		slice: 0,
		labels: true,
		examLanguage: false,
		graticule: false,
		trueScale: false,
		inspect: null,
		step: 0,
		panelTab: "why",
		params: defaults,
		layout: get().layout,
		viewKey: get().viewKey
	})
}));
//#endregion
export { useLabControls as t };
