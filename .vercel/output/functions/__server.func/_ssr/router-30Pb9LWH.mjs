import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as LAB_BY_SLUG, r as REALMS } from "./catalog-OOT9SqiM.mjs";
import { z as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as Button } from "./button-DsD8WSgU.mjs";
import { t as HeroEarth } from "./hero-earth-DR0OseN_.mjs";
import { F as redirect, _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Search, d as Menu, g as ChevronDown, n as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seo-BO0-yPHq.js
var SITE = typeof process !== "undefined" && process.env.VITE_PUBLIC_SITE_URL || "https://terralens.grok.me";
var INDEXABLE = typeof process !== "undefined" && process.env.VITE_INDEXABLE === "1" || false;
function siteOrigin() {
	return SITE.replace(/\/$/, "");
}
function shouldIndex() {
	return INDEXABLE;
}
function pageTitle(name) {
	return `${name} · TerraLens`;
}
function robotsMeta() {
	return {
		name: "robots",
		content: shouldIndex() ? "index,follow" : "noindex,nofollow"
	};
}
function canonicalLink(path) {
	return {
		rel: "canonical",
		href: `${siteOrigin()}${path}`
	};
}
function learningResourceJsonLd(opts) {
	return {
		"@context": "https://schema.org",
		"@type": "LearningResource",
		name: opts.name,
		description: opts.description,
		url: opts.url,
		isAccessibleForFree: true,
		inLanguage: "en",
		learningResourceType: "Interactive resource",
		educationalLevel: opts.educationalLevel,
		about: opts.about ?? "Earth science",
		provider: {
			"@type": "Organization",
			name: "TerraLens"
		}
	};
}
function headFor(opts) {
	return {
		meta: [
			{ title: pageTitle(opts.title) },
			{
				name: "description",
				content: opts.description
			},
			robotsMeta()
		],
		links: [canonicalLink(opts.path)]
	};
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/cases-HaYdPpf6.js
var CASES = [
	{
		slug: "uk-daylength",
		title: "UK seasonal day length",
		place: "London to Lerwick",
		region: "UK",
		labs: ["seasons", "solar-altitude"],
		lat: 51.51,
		lon: -.13,
		zoom: 4,
		state: "t=0.973&step=2&tilt=23.44",
		lede: "On the December solstice London keeps the Sun for about 7 h 50 m. Lerwick, in Shetland, keeps it for under six. Florida, near 28°N, still has a winter — but noon Sun stays high.",
		body: [
			"The difference is latitude on a tilted axis, not distance to the Sun. Earth’s orbit is only slightly elliptical. Perihelion — nearest the Sun — falls in early January, during northern winter. If distance caused seasons, London and Sydney would share summer. They do not.",
			"At 51.5°N, London’s noon solar altitude on the December solstice is about 15°. On the June solstice it is about 62°. Day length swings from under eight hours to about 16.5. Walk north to Lerwick, near 60°N, and the December day falls below six hours; June barely gets dark. The same geometry, stretched.",
			"A-level and AP students can treat this as insolation: the solar constant is the same. Incidence angle and duration are not. The energy received on a square metre of playground in December is a sliver of the June figure, even under a clear sky. UK solar farms know this in their yield curves. Field teachers know it in the last period on a winter Friday.",
			"Compare Miami, near 26°N. December noon altitude stays above 40°. The day shortens by a couple of hours, not eight. Growers in the Central Valley care about hours above a useful incidence angle — the same number UK horticulture cares about under glass. Tilt, not orbital distance, is why a Californian December is not a British one.",
			"Classroom move: freeze the seasons lab on 21 December. Read London’s day length, then Sydney’s. Ask which hemisphere is leaning toward the Sun before you reveal the tilt callout. Then scrub to June. The terminator walk is the whole argument."
		],
		exam: {
			prompt: "Explain why Lerwick’s December day is shorter than London’s, using axial tilt rather than distance from the Sun.",
			hint: "Latitude on a 23.44° axis. December: northern hemisphere leans away. Higher latitude → Sun lower and path shorter."
		},
		sources: [{ label: "Met Office — UK day length" }, {
			label: "NOAA Solar Calculator",
			href: "https://gml.noaa.gov/grad/solcalc/"
		}]
	},
	{
		slug: "florida-insolation",
		title: "Florida and California insolation",
		place: "Miami · Central Valley",
		region: "US",
		labs: ["seasons", "energy-budget"],
		lat: 25.76,
		lon: -80.19,
		zoom: 5,
		lede: "Miami in December still sees the Sun more than 40° up at noon. London does not. Same star, different incidence.",
		body: [
			"Insolation is incoming solar radiation at the surface. It depends on the solar constant, the angle of incidence, day length, and what the atmosphere and the ground do with the beam. The seasons lab isolates the first geometry: tilt. The energy-budget lab adds albedo and longwave.",
			"At the December solstice the Sun is overhead at 23.44°S. Miami, at about 26°N, still has a noon altitude near 40°. Day length is close to 10.5 hours. London’s noon altitude is about 15° and the day is under eight hours. Photosynthesis, heating load, and solar yield follow those numbers, not the calendar month.",
			"California’s Central Valley sits near 36°N. Winter days are short enough to matter for fog and for solar, long enough that citrus still works with irrigation. Summer days are long and noon Sun is high — a different energy budget from a Lake District valley at the same season.",
			"Students often say ‘Florida is closer to the Sun.’ It is not, in any sense that matters. Florida is closer to the subsolar latitude in northern winter than London is. That is a tilt-and-latitude sentence, not a distance sentence.",
			"Use the solar-altitude lab with Miami, London, and Nairobi marked. Scrub the date. Nairobi, on the equator, barely changes day length. Miami swings moderately. London swings hard. The three traces are the curriculum."
		],
		exam: {
			prompt: "Using noon solar altitude, explain why Miami’s December energy receipt exceeds London’s even on a cloudless day.",
			hint: "Incidence angle. Same solar constant; Miami’s beam is steeper, the day is longer."
		},
		sources: [{ label: "NOAA / NREL typical meteorological year" }, { label: "NASA Earth Observatory — insolation" }]
	},
	{
		slug: "holderness",
		title: "Holderness coast",
		place: "East Yorkshire",
		region: "UK",
		labs: ["coasts"],
		lat: 53.73,
		lon: -.05,
		zoom: 9,
		state: "step=2",
		lede: "Soft glacial till, a north-to-south longshore system, and villages that have already gone into the North Sea.",
		body: [
			"Holderness is the standard UK coastal case because the process is fast enough to see in a school lifetime. The cliffs are mostly glacial till — boulder clay dumped by ice, not lithified rock. Wave attack at the foot, sub-aerial weathering above, and a mass movement that is often a slump rather than a clean fall. Average erosion rates of one to two metres a year are widely cited from East Riding monitoring; locally the number is higher after a storm cluster.",
			"The dominant wave approach is from the north-east. Swash runs up the beach at an angle; backwash returns down the steepest slope. Sediment therefore moves south in a longshore-drift conveyor. Spurn Head is the textbook spit at the southern end: a sand-and-shingle finger built where the coast turns into the Humber, with saltmarsh in the lee. It is not immortal. Storms breach it. The river and the sea then argue about where the mouth sits.",
			"Mappleton’s rock groynes, placed in 1991, are a choice about whose beach is allowed to keep sand. Up-drift of a groyne, the beach widens. Down-drift, the supply is starved and erosion can accelerate. That is the classic ‘protection here, problem there’ sentence. Withernsea and Hornsea have sea walls and groynes of their own. Skipsea and the sites of lost villages such as Ravenser Odd sit on the other side of that bargain.",
			"Constructive waves, with a strong swash, build a wider beach when the till supply and the drift allow it. Destructive waves, steeper, drag material back and attack the cliff. The Holderness fetch across the North Sea can throw destructive waves at a soft cliff for hours. Management options — do nothing, hold the line, managed realignment — are political, not just physical. The physics does not care about a caravan park. The budget does.",
			"Compare a US barrier: the Outer Banks of North Carolina. There the sediment is sand in a barrier-island chain, not till in a cliff. Longshore drift still moves material alongshore. Storms still punch inlets. The landform is different; the budget idea is the same. Students who can say ‘supply, transport, deposition, interruption’ can move between Holderness and the Banks without learning a new subject.",
			"Classroom move: run the coasts lab, turn on longshore particles, then freeze on the spit. Ask where a groyne would starve the spit. Then open this locator and point at Mappleton and Spurn. The 3D model is the process; this map is the place."
		],
		exam: {
			prompt: "Explain how longshore drift and groynes together change the sediment budget of Holderness, using Mappleton and Spurn Head.",
			hint: "NE waves → southward drift. Groynes trap up-drift, starve down-drift. Spurn is the depositional end-member."
		},
		sources: [
			{ label: "BGS — Holderness coastal erosion" },
			{ label: "East Riding of Yorkshire coastal monitoring" },
			{ label: "Environment Agency shoreline management" }
		]
	},
	{
		slug: "jurassic-coast",
		title: "Jurassic Coast",
		place: "Dorset and East Devon",
		region: "UK",
		labs: ["coasts", "rock-cycle"],
		lat: 50.62,
		lon: -2.25,
		zoom: 8,
		lede: "A World Heritage rock sequence, and a coastline that writes cave–arch–stack–stump in Lias and chalk.",
		body: [
			"The Jurassic Coast is a teaching gift because lithology changes along the shore. Harder bands stand as headlands; weaker bands cut back as bays. Concordant and discordant patterns both appear. Durdle Door is an arch in limestone. Old Harry Rocks are chalk stacks off the Foreland. Lulworth Cove is a bay cut through a hard band into softer Wealden clays behind.",
			"The cave–arch–stack–stump sequence needs a headland, joints or bedding the sea can exploit, and enough energy to keep working the same lines. Hydraulic action, abrasion, and attrition do the cutting. Weathering opens the joints from above. When the arch roof fails, a stack stands. When the stack fails, a stump sits in the surf. The lab animates that sequence; this coast is where UK students are taken to see it in rock.",
			"Landslides at Black Ven and Stonebarrow remind a class that coasts are not only waves. Rain, groundwater, and a clay layer can send a whole undercliff toward the beach. The 2012 landslip near Bridport closed the coast path. Process on a cliff is always two-sided: marine at the toe, sub-aerial on the face.",
			"Tourism, fossil collecting, and shoreline management sit on top of the geology. Students should not be asked to memorise every cove. They should be able to match a named landform to a process and a rock type, then say what happens if the energy or the lithology changes."
		],
		exam: {
			prompt: "Using a named Jurassic Coast landform, describe the sequence from cave to stump.",
			hint: "Joints → cave → arch (Durdle Door) → collapse → stack (Old Harry) → stump."
		},
		sources: [{ label: "Jurassic Coast Trust / UNESCO" }, { label: "BGS — Dorset coast" }]
	},
	{
		slug: "lake-district",
		title: "A UK upland river",
		place: "Lake District",
		region: "UK",
		labs: [
			"rivers",
			"glaciers",
			"contours"
		],
		lat: 54.45,
		lon: -3.09,
		zoom: 9,
		lede: "Steep glacially-overdeepened valleys, waterfalls on resistant bands, and a short run to a lake or the Irish Sea.",
		body: [
			"A Lake District beck in spate is the upper course of the rivers lab made walkable. Gradient is steep. The channel is narrow. Vertical erosion cuts a V into a valley that ice had already overdeepened into a U. Waterfalls sit on resistant bands — Borrowdale volcanic rocks, Skiddaw slates, granite — with plunge pools and retreat of the nick point.",
			"Upper-course landforms sit close together. Students can stand at a waterfall and look downstream to a ribbon lake. The long profile is short. There is often no classic delta, because the load meets a lake or a tide that can take it. Compare the Mississippi: same processes, different scale and a different coast.",
			"Contour Vs in the valley floors are the same Vs as in the contours lab. A spur between two becks shows Vs pointing downhill. A stream in a trough shows Vs pointing uphill. OS Explorer interval is 10 m. The 3D hill in the contours lab is this skill without the sheep.",
			"Ice is the older author. Cirques (cwms), arêtes, and a pyramidal peak sit above the fluvial work. Helvellyn’s Red Tarn is a cirque lake. Striding Edge is an arête. The river lab does not invent those; the glaciers lab does. A good path walks ice first, then water."
		],
		exam: {
			prompt: "Explain why a Lake District valley may be U-shaped in cross-profile but still host a V-shaped inner channel.",
			hint: "Glacial trough, then post-glacial stream cutting a V into the floor."
		},
		sources: [{ label: "OS / BGS Northern England" }, { label: "National Trust / Lake District National Park" }]
	},
	{
		slug: "snowdonia",
		title: "Snowdonia / Eryri",
		place: "North Wales",
		region: "UK",
		labs: ["contours", "glaciers"],
		lat: 53.07,
		lon: -4.08,
		zoom: 11,
		lede: "A classroom-perfect contour map: cwms, arêtes, a pyramidal peak, and a railway that cheats the gradient.",
		body: [
			"Closed loops around Yr Wyddfa; V-shapes in the cwms. Interval on OS Explorer is 10 m. The same hill in 3D is the point of the contours lab. Spot heights sit on the summit and on the ridges. Tight contours on the east face are a steep drop; wider contours on some western approaches are a gentler slope — until they are not.",
			"Glacial landforms do the naming. A cirque is a armchair hollow with a steep backwall. An arête is a knife ridge between two cirques. A pyramidal peak is three or more cirques eating a mountain from different sides. Crib Goch is an arête students remember with their hands. Glaslyn and Llyn Llydaw sit in scooped rock.",
			"The railway is a sentence about gradient. A contour skill that can explain why a train hairpins is a skill that will survive the map paper. Grid references on this sheet are the grid-references lab’s natural homework.",
			"Compare Yosemite: a deeper U, granite, hanging valleys, and a rim that reads as coincident contours. Same ice logic, different rock and a different national-park poster."
		],
		exam: {
			prompt: "On an OS-style extract of Yr Wyddfa, how would you distinguish a cirque from a spur using contours alone?",
			hint: "Cirque: steep backwall, closed or tight curves around a hollow. Spur: Vs pointing downhill."
		},
		sources: [{ label: "Ordnance Survey" }, { label: "BGS Wales" }]
	},
	{
		slug: "yorkshire-dales",
		title: "Yorkshire Dales karst",
		place: "North Yorkshire",
		region: "UK",
		labs: ["karst", "weathering"],
		lat: 54.15,
		lon: -2.15,
		zoom: 9,
		lede: "Carboniferous limestone, clints and grykes, swallow holes, and caves that take a whole beck underground.",
		body: [
			"Karst is what happens when carbonation and jointing get ahead of surface drainage. Rainwater picks up carbon dioxide and becomes a weak carbonic acid. It works on calcium carbonate along bedding and joints. The surface becomes a limestone pavement: clints (blocks) and grykes (fissures). A stream that meets a swallow hole leaves the surface. It may return as a resurgence kilometres away.",
			"The Yorkshire Dales are the UK’s classroom for this. Malham Cove’s pavement is walked by GCSE groups every spring. Gaping Gill takes Fell Beck into a chamber high enough for a cathedral, then the water moves through the cave system toward Ingleborough’s flanks. Gordale Scar is a different argument — a gorge, possibly a collapsed cavern or a glacial meltwater cut, still debated, still useful.",
			"Soil is thin. Weathering is chemical first, mechanical on the frost days. Farmers talk about limestone in the same breath as drainage. Students should be able to sequence: rainfall → carbonation → widened joints → swallow hole → cave passage → stalactite if the drip has time.",
			"Mammoth Cave, Kentucky, is the US pair: a longer, lower-gradient carbonate system in the Mississippian limestones of the Chester Upland. Same chemistry, a different map scale. The karst lab’s pavement, sinkhole, and cave passage are both places."
		],
		exam: {
			prompt: "Explain how a swallow hole forms and what it implies for the drainage network on Carboniferous limestone.",
			hint: "Carbonation along joints. Surface stream captured underground. Watershed on the surface may not match the cave."
		},
		sources: [{ label: "BGS — Yorkshire Dales karst" }, { label: "Natural England / Malham" }]
	},
	{
		slug: "somerset-levels",
		title: "Somerset Levels",
		place: "Somerset",
		region: "UK",
		labs: [
			"hydrograph",
			"rivers",
			"drainage-basin"
		],
		lat: 51.13,
		lon: -2.83,
		zoom: 9,
		lede: "A low floodplain, peat and clay, pumped drainage, and a hydrograph that goes wrong when rain sits on saturated ground.",
		body: [
			"The Somerset Levels are a flood story written on a almost-flat long profile. Rivers such as the Parrett and Tone meander across peat and clay. Gradient is tiny. When rain is heavy and the ground is already wet, there is nowhere for water to go but up and out. The 2013–14 floods sat on villages for weeks. That is a hydrograph with a fat falling limb, not a flashy upland peak.",
			"Land use matters. Drained pasture, rhynes (ditches), pumps, and a few raised towns. Urban surfaces upstream shorten lag. Saturated peat does not infiltrate. High tide in the Parrett can hold fluvial water back — a reminder that a drainage basin has a mouth with its own schedule.",
			"Management is a choice among dredging, pumping, wetland restoration, and ‘making space for water’. Each changes a different part of the hydrograph. Dredging argues about channel efficiency. Restoration argues about storage on the floodplain. Students should be able to sketch both and say who wins in a wet January.",
			"Pair with the Mississippi: levées, cut-offs, and a bird-foot delta. Same machine, continental scale. The Levels are the UK size of that argument."
		],
		exam: {
			prompt: "Using the idea of lag time, explain why the Somerset Levels can stay flooded long after the rain has stopped.",
			hint: "Low gradient, saturated peat, tide lock, limited storage exit. Long falling limb."
		},
		sources: [{ label: "Environment Agency — Somerset" }, { label: "UKCEH hydrology" }]
	},
	{
		slug: "thames",
		title: "Thames and Severn",
		place: "Southern Britain",
		region: "UK",
		labs: [
			"water-cycle",
			"drainage-basin",
			"river-hydrology"
		],
		lat: 51.5,
		lon: -.12,
		zoom: 7,
		lede: "Two basins, heavy abstraction, and a tide that still owns the lower Thames.",
		body: [
			"The global water cycle is closed. July in the London basin is a local deficit covered by reservoirs in the upper Thames, the London ring main, and abstraction licences. The ocean store did not notice. The town would, if the taps failed.",
			"The Thames is a lowland river with a large population on its floodplain. Groundwater in the chalk, soil moisture, and surface reservoirs are the stores that matter to a water company. Transfers are pumping and pipes as well as tributaries. The Severn, longer and wetter in its upland headwaters, is a different regime: more flashy in Wales, then a huge tidal range in the estuary — among the largest in the world.",
			"A drainage-basin overlay on the water-cycle lab is this case. The watershed is the divide. Rain on one side goes to the Thames, on the other to a neighbour. Abstraction is a tap on a local store. Over-draw it, and the reservoir falls even if the ocean is unchanged.",
			"Climate change moves the flows: heavier winter bursts, drier summers in the south-east. It does not invent a new cycle. Students who can name stores and transfers can then talk about drought without saying ‘the water ran out of the planet’."
		],
		exam: {
			prompt: "Why can a reservoir in the Thames basin fall in a dry summer even though the global water cycle is closed?",
			hint: "Local store, abstraction > recharge. Global mass conserved; location and timing are not."
		},
		sources: [{ label: "UKCEH / Environment Agency" }, { label: "Thames Water / Defra abstraction" }]
	},
	{
		slug: "iceland",
		title: "Iceland and Eyjafjallajökull",
		place: "Mid-Atlantic Ridge",
		region: "Shared",
		labs: [
			"plate-boundaries",
			"volcanoes",
			"seafloor-spreading"
		],
		lat: 63.63,
		lon: -19.62,
		zoom: 6,
		lede: "A divergent boundary above water, plus a hotspot. The 2010 ash plume closed northwest European airspace.",
		body: [
			"Iceland sits on the Mid-Atlantic Ridge, a divergent boundary, and on a mantle plume. New oceanic crust is made here. Thingvellir is a rift you can walk. The island is the ridge plus extra magma from the hotspot — which is why it stands above water when most of the ridge does not.",
			"Eyjafjallajökull in 2010 was a subglacial, explosive eruption of relatively evolved magma. Ice plus silica-rich melt made fine ash. High-level winds carried it over Europe. Aviation avoids ash because it damages turbine blades. UK specifications treat the eruption as a tectonic and atmospheric case. The ridge itself is the plate story; the ash is the hazard story.",
			"Compare the Himalaya: continent–continent convergence, crust stacked, not made. Compare Hawaii: a hotspot without a plate boundary. Compare Cascadia: subduction, not divergence. Three colours of boundary, plus a plume, cover the exam list.",
			"Seafloor spreading on either side of Iceland lays down magnetic stripes. The seafloor-spreading lab is that tape recorder. Iceland is where the tape is a country."
		],
		exam: {
			prompt: "Explain why Iceland has both basaltic fissure eruptions and occasional explosive, ash-rich events such as 2010.",
			hint: "Ridge + hotspot: usually basalt. Ice, evolved magma, and a central volcano can still go explosive."
		},
		sources: [
			{ label: "IMO / Icelandic Met Office" },
			{ label: "BGS — Eyjafjallajökull 2010" },
			{ label: "NASA Earth Observatory" }
		]
	},
	{
		slug: "san-andreas",
		title: "San Andreas Fault",
		place: "California",
		region: "US",
		labs: [
			"plate-boundaries",
			"folds-faults",
			"earthquakes"
		],
		lat: 35.9,
		lon: -120.43,
		zoom: 6,
		lede: "A transform boundary you can walk. Pacific plate northwest, North American plate southeast.",
		body: [
			"The San Andreas is a right-lateral transform boundary between the Pacific and North American plates. The 1906 San Francisco and 1989 Loma Prieta earthquakes are this boundary in living memory. Offset fences, streams, and roads are the field evidence. Creep along some segments is slow and almost quiet; locked segments store elastic strain and then slip.",
			"Transform boundaries slide. They do not make a volcano chain. That is the exam contrast with Cascadia to the north, a subduction zone with a volcanic arc (the Cascades) and a different tsunami story. Students who colour both boundaries the same have missed the point of the plates lab.",
			"Strike-slip is the folds-faults lab’s third fault type. The San Andreas is the named example. Focus and epicentre, P and S waves, and a shake-map are the earthquakes lab. Parkfield has been an instrumented laboratory for decades because a repeating magnitude-6 sequence made it famous.",
			"UK students need this as the US pair to the Mid-Atlantic Ridge and the Himalaya. Three colours, three landforms, three hazards. The locator puts you on the Carrizo Plain, where the fault is a line in the grass."
		],
		exam: {
			prompt: "Why does the San Andreas system produce large earthquakes but not a volcanic arc, unlike Cascadia?",
			hint: "Transform vs subduction. Slide-past does not melt a slab; Cascadia does."
		},
		sources: [{
			label: "USGS Earthquake Hazards Program",
			href: "https://www.usgs.gov/programs/earthquake-hazards"
		}, { label: "USGS San Andreas fact sheets" }]
	},
	{
		slug: "cascadia",
		title: "Cascadia subduction zone",
		place: "Pacific Northwest",
		region: "US",
		labs: [
			"plate-boundaries",
			"earthquakes",
			"tsunami",
			"volcanoes"
		],
		lat: 46.2,
		lon: -124,
		zoom: 5,
		lede: "A locked megathrust, a volcanic arc, and a tsunami story written in drowned forests.",
		body: [
			"The Juan de Fuca plate dives under North America. That is convergence: a trench offshore, earthquakes on the megathrust, and a chain of stratovolcanoes inland — Rainier, St Helens, Hood, Shasta. The 1700 Cascadia earthquake is dated from Japanese tsunami records and from drowned coastal forests in Oregon and Washington. The next one is a regional planning problem, not a myth.",
			"Subduction makes magma by adding water to the mantle wedge. Viscosity and gas make stratovolcanoes explosive. Shield volcanoes, like Hawaii, are a different chemistry and a different setting. The volcanoes lab’s viscosity slider is this contrast.",
			"A tsunami here would start with seafloor slip, not with a meteor. The tsunami lab is the physics: a water column lifted, a wave that is fast in deep water and tall in shallow water. Coastal schools in this region drill for that wave.",
			"Hold this case next to San Andreas. Same coast, different boundary, different volcano story, different tsunami story. That is the whole point of colouring plates."
		],
		exam: {
			prompt: "Describe how a Cascadia megathrust earthquake can generate both a volcanic arc (over time) and a tsunami (in minutes).",
			hint: "Watered mantle → arc over geologic time. Seafloor slip → tsunami in minutes."
		},
		sources: [{ label: "USGS Cascadia" }, { label: "NOAA / NWS tsunami" }]
	},
	{
		slug: "yellowstone",
		title: "Yellowstone",
		place: "Wyoming",
		region: "US",
		labs: [
			"earth-interior",
			"hotspots",
			"volcanoes"
		],
		lat: 44.6,
		lon: -110.5,
		zoom: 7,
		lede: "A mantle plume under a continent. Caldera, hydrothermal system, and a track of older calderas toward the southwest.",
		body: [
			"The plume is not a plate boundary. It is a hole the plate is sliding over — the continental cousin of Hawaii. Older calderas in the Snake River Plain get older toward the southwest, which is the track. The present hydrothermal system — geysers, hot springs — is magma heat under a continental crust that is still there.",
			"Seismic tomography, not a drill hole, is how we argue for the plume. The Kola Superdeep borehole, the deepest hole in rock, did not reach the mantle. We infer layering from P and S waves. Yellowstone’s magma reservoir is imaged the same way: geophysics, not a sample bottle from the core.",
			"A ‘supervolcano’ headline is not a teaching plan. The teacher script is: hotspot versus boundary, continental crust versus oceanic, rhyolite versus basalt, caldera versus stratovolcano. The interior lab’s liquid outer core is a different liquid from this melt. Students mix those liquids if you let them."
		],
		exam: {
			prompt: "How does the age pattern of calderas in the Snake River Plain support a hotspot under a moving plate?",
			hint: "Age increases southwest along the track. Plate moved; plume stayed relatively fixed."
		},
		sources: [{ label: "USGS Yellowstone Volcano Observatory" }, { label: "USGS hotspot track" }]
	},
	{
		slug: "hawaii",
		title: "Hawaii hotspot track",
		place: "Hawaiʻi to Emperor seamounts",
		region: "US",
		labs: [
			"hotspots",
			"volcanoes",
			"plate-boundaries"
		],
		lat: 19.4,
		lon: -155.3,
		zoom: 6,
		lede: "A plume under an oceanic plate. Shield volcanoes, a chain that gets older toward the northwest, and a bend into the Emperor seamounts.",
		body: [
			"Loihi and the Island of Hawaiʻi are young. Maui, Oʻahu, Kauaʻi are older. The Emperor seamounts are older still and trend north. The Pacific plate is moving over a relatively fixed mantle plume. That is the track. The bend records a change in plate motion about 47 million years ago — a sentence for A-level, not a KS3 requirement.",
			"Shield volcanoes here are basalt, low viscosity, long lava flows, gentle slopes. Mauna Loa and Kīlauea are the type. They are not stratovolcanoes. Viscosity, not ‘bigger explosion’, is the difference. The volcanoes lab’s slider is this.",
			"A hotspot can sit far from a plate boundary. That is the misconception to kill: not all volcanoes sit on the Ring of Fire. Hawaii is the exhibit. Yellowstone is the continental exhibit. Iceland is the ridge-plus-plume exhibit."
		],
		exam: {
			prompt: "Why are Hawaiian volcanoes shields rather than stratovolcanoes, and how does the island chain record plate motion?",
			hint: "Low-viscosity basalt. Age increases away from the active plume as the plate slides."
		},
		sources: [{ label: "USGS Hawaiian Volcano Observatory" }, { label: "NOAA / ocean exploration seamounts" }]
	},
	{
		slug: "grand-canyon",
		title: "Grand Canyon",
		place: "Arizona",
		region: "US",
		labs: [
			"rock-cycle",
			"weathering",
			"landform-types"
		],
		lat: 36.05,
		lon: -112.14,
		zoom: 9,
		lede: "A plateau cut by a river, a stack of sedimentary rocks, and a timeline in metres of cliff.",
		body: [
			"The Grand Canyon is not a rift and not a glacial trough. It is incision: the Colorado River cutting down through the Colorado Plateau as the land was high enough and the river persistent enough. Horizontal beds of sandstone, shale, and limestone make cliffs and slopes according to resistance. The Vishnu Schist at the bottom is metamorphic basement.",
			"The rock-cycle lab’s sedimentary stack is this wall. Weathering opens joints; mass movement delivers; the river exports. The landform is a canyon in a plateau — one of the five types in the landform-types lab, cut rather than built.",
			"Do not invent a date for ‘the canyon formed in X years’ unless you cite USGS. The rocks are Proterozoic to Palaeozoic; the incision is much younger. Students should separate the age of the rock from the age of the hole."
		],
		exam: {
			prompt: "Distinguish the age of the rocks in the Grand Canyon walls from the age of the canyon as a landform.",
			hint: "Rocks: hundreds of millions of years. Incision: much younger uplift and downcutting."
		},
		sources: [{ label: "USGS / NPS Grand Canyon" }]
	},
	{
		slug: "mississippi",
		title: "Mississippi and delta",
		place: "Lower Mississippi",
		region: "US",
		labs: [
			"rivers",
			"river-deposition",
			"hydrograph"
		],
		lat: 29.15,
		lon: -89.25,
		zoom: 6,
		lede: "A continental drain with levées, cut-offs, and a bird-foot delta fighting subsidence and a rising Gulf.",
		body: [
			"The long profile ends in stiller water and a huge load. Tides in the Gulf here are modest, so a delta can persist. Distributaries, levées, and a floodplain the size of a country are the lower-course kit. The 1927 flood and the Old River Control Structure are human attempts to keep the river from jumping to the Atchafalaya — a capture story at engineering scale.",
			"Meander cut-offs, oxbows, and artificial straightening sit on the same helicoidal-flow logic as the rivers lab. Raise discharge and competence rises; the floodplain takes water when the levée is overtopped or fails. Hurricane Katrina’s flooding of New Orleans was a storm-surge and levée-failure story on this coast, not a simple fluvial hydrograph — keep the mechanisms honest.",
			"Compare a Lake District beck: same processes, no delta, because the load and the coast disagree. Compare the Nile or the Ganges only if you keep the numbers sourced. This case is USGS and USACE territory."
		],
		exam: {
			prompt: "Explain why the Mississippi can maintain a bird-foot delta while many UK rivers end in estuaries.",
			hint: "Huge load, modest tides, shallow Gulf. UK: smaller load, larger tidal range, often drowned valleys."
		},
		sources: [{ label: "USGS Mississippi River" }, { label: "USACE Mississippi River & Tributaries" }]
	},
	{
		slug: "yosemite",
		title: "Yosemite Valley rim",
		place: "Sierra Nevada",
		region: "US",
		labs: [
			"contours",
			"glaciers",
			"moon-phases"
		],
		lat: 37.74,
		lon: -119.57,
		zoom: 11,
		lede: "A U-shaped valley so deep the rim is a cliff on the map: coincident contours and a spot height at Half Dome.",
		body: [
			"USGS quads make the same spur/valley argument as an OS sheet. The interval is just in feet on older plates. Yosemite Valley is a glacial trough in granite. Hanging valleys dump waterfalls (Yosemite Falls, Bridalveil). El Capitan and Half Dome are the walls. Moraines sit down-valley. Cirques and arêtes sit in the high Sierra above.",
			"The glaciers lab’s U-trough, hanging valley, and truncated spur are this place. The contours lab’s coincident lines are the cliffs. A full Moon over Half Dome is the moon-phases geometry — the same phase as Snowdonia that night, a different rise time because Earth is still rotating.",
			"Ice here is mostly gone as glaciers; the landforms remain. Students should not say ‘Yosemite is a canyon like the Grand Canyon.’ One is ice, one is a river in a plateau. Cross-profile tells them apart."
		],
		exam: {
			prompt: "How would a contour map distinguish Yosemite Valley from a V-shaped river gorge of similar depth?",
			hint: "U: wide flat floor, steep walls, hanging valleys. V: evenly closing contours to a stream."
		},
		sources: [{ label: "USGS / NPS Yosemite" }]
	},
	{
		slug: "katrina-sandy",
		title: "Katrina and Sandy",
		place: "New Orleans · New York Bight",
		region: "US",
		labs: ["tropical-cyclone", "coasts"],
		lat: 29.95,
		lon: -90.07,
		zoom: 5,
		lede: "Two North Atlantic cyclones, two different coasts, one shared physics: low pressure, wind, surge, and a shoreline that was already under stress.",
		body: [
			"Hurricane Katrina (2005) hit the Gulf Coast as a large tropical cyclone. The catastrophe in New Orleans was a surge and a levée-and-floodwall failure on a city below some water surfaces, on a sinking delta. The eye and eyewall of a tropical cyclone are the lab; the social and engineering failure is the case. Keep them both in the script, and do not invent fatality numbers — cite NOAA.",
			"Hurricane Sandy (2012) was a late-season hybrid that struck the New York–New Jersey Bight. Storm surge in a funnel-shaped coast, high tide, and a dense urban shoreline. It was not ‘just rain’. Surge is a water-level story; rainfall is a hydrograph story. Students mix them.",
			"The tropical-cyclone lab shows the eye, eyewall, and rainbands. It does not claim that every UK windy day is a hurricane. Midlatitude cyclones are a different machine (the fronts lab). Sandy’s hybrid nature is a teacher’s caution, not a KS3 requirement.",
			"UK pair: North Sea storm surges (1953, and the Thames Barrier’s reason for existing). Same surge idea, extra-tropical storms. Honest language: do not call a UK winter storm a hurricane unless the Met Office does."
		],
		exam: {
			prompt: "Distinguish storm surge from river flooding in the Katrina disaster, and say which lab models the cyclone itself.",
			hint: "Surge: sea level driven by wind and pressure. River/levée: inland water. Lab: tropical cyclone eye/eyewall."
		},
		sources: [{ label: "NOAA / NHC Katrina and Sandy reports" }, { label: "USGS surge and high-water marks" }]
	},
	{
		slug: "dust-bowl",
		title: "Dust Bowl",
		place: "Southern Great Plains",
		region: "US",
		labs: [
			"soil-erosion",
			"weathering",
			"aeolian"
		],
		lat: 36.68,
		lon: -101.48,
		zoom: 5,
		lede: "A drought, a plough, and a wind that took the A horizon off the plains.",
		body: [
			"The 1930s Dust Bowl is the US soil-erosion case. Deep ploughing of prairie, drought, and strong winds. Rain splash and rill were not the headline; wind was. Without vegetation, the A horizon had no anchor. Black blizzards moved soil across state lines. The soil-erosion lab’s vegetation toggle is this sentence.",
			"Aeolian landforms — yardangs, barchans — are the world-example kit, not a Great Plains default. On the plains the process was deflation and transport of farmed silt and sand, not a desert textbook dune field. Keep the landform names honest.",
			"UK pair: peaty upland erosion and blown sand on some coasts, at a smaller scale. The physics of an unsheltered particle is the same. The history is American.",
			"Do not invent tonnages. USDA and NOAA historical summaries are the sources. The teaching point is land use plus climate plus wind, not a morality play."
		],
		exam: {
			prompt: "Explain how vegetation removal made Great Plains soils vulnerable to wind erosion in the 1930s.",
			hint: "Roots and cover trap particles and raise roughness. Bare dry A horizon → deflation."
		},
		sources: [{ label: "NOAA / NCEI drought and Dust Bowl" }, { label: "USDA NRCS soil erosion history" }]
	},
	{
		slug: "colorado",
		title: "Colorado River reservoirs",
		place: "Powell and Mead",
		region: "US",
		labs: ["water-cycle", "river-hydrology"],
		lat: 36.06,
		lon: -114.74,
		zoom: 6,
		lede: "A bathtub ring is abstraction plus a drier hydroclimate drawn on a canyon wall.",
		body: [
			"The ocean store did not shrink by the volume of Lake Mead. The local store did. Powell and Mead are managed reservoirs on a river whose compact was signed in a wetter early twentieth century. A bathtub ring is the last high shoreline as a stain.",
			"The water-cycle lab’s abstraction slider is this. A closed global cycle still allows a basin to be in deficit. Snowpack in the Rockies is the headwater store. A drier hydroclimate plus upstream use plus evaporation from open reservoirs is the budget.",
			"Students should not say ‘the Colorado is running out of water on Earth.’ They should say ‘the allocated flow exceeds the river that is actually there in a dry decade.’"
		],
		exam: {
			prompt: "Using stores and transfers, explain a falling Lake Mead level without claiming the global water cycle is leaking.",
			hint: "Local store. Abstraction + evaporation + reduced inflow. Global mass conserved."
		},
		sources: [{ label: "USBR / USGS Colorado River" }]
	},
	{
		slug: "greenwich",
		title: "Greenwich meridian",
		place: "London",
		region: "UK",
		labs: ["rotation", "graticule"],
		lat: 51.477,
		lon: -.0015,
		zoom: 12,
		lede: "Longitude zero is a political choice laid on a rotating sphere. The 15°/hour arithmetic is not.",
		body: [
			"The Prime Meridian at the Royal Observatory is the civil fiction. Solar noon is when the Sun crosses your local meridian. Time zones are a human overlay on 360° / 24 h = 15° per hour. The terminator ignores the jogs in the zone boundaries.",
			"Stand on the meridian line and you have not stopped the planet. You have labelled a longitude. The rotation lab’s 15° callout is the physics. Greenwich is the plaque.",
			"The graticule lab puts this line on a 3D Earth with the rest of the net. Students who think the equator is ‘a line painted on the sea’ need that lab more than this plaque, but the plaque helps."
		],
		exam: {
			prompt: "Why is 15° of longitude equal to one hour, and why is the Greenwich meridian not required for that arithmetic?",
			hint: "360/24 = 15. Zero longitude is a convention; the spin is not."
		},
		sources: [{ label: "Royal Observatory Greenwich" }]
	},
	{
		slug: "time-zones-us",
		title: "US lower-48 time zones",
		place: "Eastern to Pacific",
		region: "US",
		labs: ["rotation", "graticule"],
		lat: 39.8,
		lon: -98.6,
		zoom: 3,
		lede: "Four civil zones across about 60° of longitude, with jogs for state lines. The terminator ignores the jogs.",
		body: ["Noon in Boston is still morning in Seattle because the planet has not finished that 15° × 3 turn. Eastern, Central, Mountain, Pacific are civil bands. They jog around cities and state lines. The Sun does not.", "The rotation lab’s time-zone overlay is this. Toggle it on, then off. The terminator is the machinery. The colours are the timetable."],
		exam: {
			prompt: "If solar noon has just reached New York, about how long until solar noon in a place 45° of longitude further west?",
			hint: "45/15 = 3 hours."
		},
		sources: [{ label: "NIST / USNO" }]
	},
	{
		slug: "kola",
		title: "Kola Superdeep borehole",
		place: "Kola Peninsula",
		region: "Shared",
		labs: ["earth-interior"],
		lat: 69.4,
		lon: 30.6,
		zoom: 5,
		lede: "The deepest hole in rock, about 12 km. Continental crust goes on for another 20 km. The mantle was never reached.",
		body: ["We know the outer core is liquid because of S-wave shadows, not because someone brought back a sample. Kola is the humility exhibit: the crust is a skin, drilling is hard, temperature and rock strength win.", "The interior lab’s explode and slice, then P and S waves, are how we actually know. Kola is how we do not."],
		exam: {
			prompt: "Why is the Kola borehole not evidence for the composition of the outer core?",
			hint: "12 km vs ~2900 km to the core-mantle boundary. Seismology, not drilling, is the tool."
		},
		sources: [{ label: "BGS / USGS interior summaries" }]
	},
	{
		slug: "snowdonia-moon",
		title: "Moonrise, Snowdonia",
		place: "Eryri",
		region: "UK",
		labs: ["moon-phases"],
		lat: 53.07,
		lon: -4.08,
		zoom: 9,
		lede: "A full Moon over Tryfan is the Moon opposite the Sun. The same night, California sees the same phase.",
		body: ["Phase is global. Rise time is local, because Earth is still rotating. Full Moon plus a node crossing would be a lunar eclipse. Most months, the Moon misses Earth’s shadow by 5° of orbital tilt.", "The moon-phases lab’s UK/US night-sky inset is this sentence. Photographers wait on geometry, not on a different Moon."],
		exam: {
			prompt: "Why can two observers, one in Snowdonia and one in Yosemite, see the same lunar phase on the same date but at different clock times?",
			hint: "Phase: Sun–Moon–Earth angle. Clock time: rotation and longitude."
		},
		sources: [{ label: "NASA Moon phases" }]
	},
	{
		slug: "yosemite-moon",
		title: "Full Moon, Yosemite",
		place: "Yosemite Valley",
		region: "US",
		labs: ["moon-phases"],
		lat: 37.74,
		lon: -119.57,
		zoom: 11,
		lede: "Photographers wait for a full Moon to clear Half Dome. They are waiting on geometry, not weather.",
		body: ["Full Moon plus a node crossing would be a lunar eclipse. Most months, the Moon misses Earth’s shadow by 5° of orbital tilt. The same phase is up in Snowdonia that night. Weather is local. Phase is not."],
		exam: {
			prompt: "Why is a full Moon necessary but not sufficient for a lunar eclipse?",
			hint: "Full = opposite the Sun. Eclipse also needs the Moon near a node of its 5° tilt."
		},
		sources: [{ label: "NASA / NPS" }]
	},
	{
		slug: "outer-banks",
		title: "Outer Banks",
		place: "North Carolina",
		region: "US",
		labs: ["coasts"],
		lat: 35.25,
		lon: -75.53,
		zoom: 7,
		lede: "A barrier-island chain, longshore drift, storm inlets, and a different sediment budget from Holderness till cliffs.",
		body: [
			"The Outer Banks are sand in motion. Barrier islands sit offshore, with a lagoon or sound behind. Longshore drift moves sand along the chain. Storms punch inlets; some inlets stay, some heal. Cape Hatteras is a famous turn in the conveyor.",
			"Unlike Holderness, there is no till cliff retreating at two metres a year. The landform is a barrier, not a cliff. The budget idea is the same: supply, transport, deposition, interruption. Groynes and beach nourishment are the management cousins of Mappleton’s rocks.",
			"Constructive waves can build the berm. Destructive storm waves can overwash the island and roll it toward the mainland. Students should be able to say that a barrier is not a permanent wall."
		],
		exam: {
			prompt: "Compare the Holderness cliff and the Outer Banks as sediment systems. What is shared, and what is not?",
			hint: "Shared: longshore budget. Different: till cliff vs barrier sand, rates, landforms."
		},
		sources: [{ label: "USGS barrier islands" }, { label: "NOAA / NPS Cape Hatteras" }]
	},
	{
		slug: "mammoth-cave",
		title: "Mammoth Cave",
		place: "Kentucky",
		region: "US",
		labs: ["karst"],
		lat: 37.19,
		lon: -86.1,
		zoom: 9,
		lede: "A long carbonate cave system: the US pair to the Yorkshire Dales pavement and swallow holes.",
		body: ["Mammoth Cave sits in Mississippian limestones. Surface streams sink. Passages follow joints and bedding. Sinkholes pock the Chester Upland. The chemistry is carbonation, the same as Malham, at a different scale.", "The karst lab’s cave passage is this. Do not claim a world-length ranking unless you cite NPS. Claim the process."],
		exam: {
			prompt: "Why do sinkholes and caves cluster on carbonate rocks rather than on granite?",
			hint: "Carbonation of CaCO₃ along joints. Granite does not dissolve that way."
		},
		sources: [{ label: "NPS / USGS Mammoth Cave" }]
	},
	{
		slug: "phoenix-heat",
		title: "Phoenix urban heat",
		place: "Arizona",
		region: "US",
		labs: ["thermal-circulation", "energy-budget"],
		lat: 33.45,
		lon: -112.07,
		zoom: 8,
		lede: "A desert city that stores heat in asphalt and roofs. The sea breeze lab’s urban-heat toggle, at city scale.",
		body: ["An urban heat island is a surface-energy-budget story. Dark, dry materials absorb shortwave, emit longwave, and lack the evaporative cooling of vegetation. Nights stay warmer than the surrounding desert. Phoenix is a clear US example; a UK school playground is a small one.", "The thermal-circulation lab’s two columns — heat one, watch the loop — is the physics. Land–sea breeze is the coastal cousin. Urban heat is the dry, paved cousin."],
		exam: {
			prompt: "Explain why a city can stay warmer than surrounding desert at night, using albedo and latent heat.",
			hint: "Low albedo, little evapotranspiration, stored heat released as longwave at night."
		},
		sources: [{ label: "NOAA / NWS urban heat" }]
	},
	{
		slug: "uk-sea-breeze",
		title: "UK sea breeze",
		place: "South coast",
		region: "UK",
		labs: ["thermal-circulation", "wind"],
		lat: 50.8,
		lon: -1.1,
		zoom: 7,
		lede: "A coastal school feels the sea breeze at last period for a reason: land heats, a loop starts, the cool air comes in from the water.",
		body: ["On a sunny day the land surface warms faster than the sea. Air over land rises. Air over the sea replaces it. The return flow aloft closes the loop. By last period the onshore flow can be a forecast the Met Office will name as a sea breeze.", "The thermal-circulation lab is this. Toggle land–sea. Then toggle urban heat and see a different loop. Coriolis barely matters at this scale; it matters on the three-cell lab."],
		exam: {
			prompt: "Draw and label a sea-breeze circulation for a calm, sunny afternoon on the south coast.",
			hint: "Land warm, sea cool. Onshore at surface, rise over land, return aloft, sink over sea."
		},
		sources: [{ label: "Met Office sea breezes" }]
	},
	{
		slug: "cairngorms-albedo",
		title: "Cairngorms snow albedo",
		place: "Scottish Highlands",
		region: "UK",
		labs: ["energy-budget"],
		lat: 57.08,
		lon: -3.67,
		zoom: 8,
		lede: "Fresh snow bounces a large share of incoming shortwave. Bare peat does not. The ground’s colour is the first control.",
		body: ["Albedo is the fraction of incoming shortwave a surface reflects. Fresh snow can reflect most of the beam. Dark peat and heather absorb. The energy-budget lab’s bounce arrows are this hillside in March versus August.", "Arizona desert is the US pair: high Sun, often high albedo on pale sand, but dry ground that still runs hot because there is little water to evaporate."],
		exam: {
			prompt: "Why does a snow-covered Cairngorm plateau heat the air less than a snow-free peat surface under the same incoming solar radiation?",
			hint: "Higher albedo → less absorbed shortwave → less longwave and sensible heat from the surface."
		},
		sources: [{ label: "Met Office / CEH snow and peat" }]
	},
	{
		slug: "denver-air",
		title: "Denver mile-high air",
		place: "Colorado",
		region: "US",
		labs: ["atmosphere-layers"],
		lat: 39.74,
		lon: -104.99,
		zoom: 7,
		lede: "A kilometre and a half up, the troposphere is thinner above you and the air is already the ‘high’ part of the weather layer.",
		body: ["Weather lives in the troposphere. Denver sits at about 1,600 m. Air pressure is lower; the same lapse-rate story starts from a higher platform. A UK radiosonde from a Met Office station is the pair: a balloon through troposphere toward tropopause, temperature falling, then the inversion at the tropopause.", "The atmosphere-layers lab’s exploded shells are this. Composition readout (nitrogen, oxygen, argon, CO₂) is the same at Denver as at sea level in proportion; density is not."],
		exam: {
			prompt: "Why is Denver’s weather still ‘troposphere’ weather even though the city is a mile above sea level?",
			hint: "The tropopause is still many kilometres above the city. Weather’s layer is thick compared with a mile."
		},
		sources: [{ label: "NOAA / NWS Denver" }, { label: "Met Office radiosondes" }]
	}
];
var CASE_BY_SLUG = Object.fromEntries(CASES.map((c) => [c.slug, c]));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/registry-HMs26b5V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var LAB_SCENES = {
	seasons: (0, import_react.lazy)(() => import("./scene-CNYpp1Su.mjs")),
	rotation: (0, import_react.lazy)(() => import("./scene-B5jnCLhh.mjs")),
	"moon-phases": (0, import_react.lazy)(() => import("./scene-B8TvmRAX.mjs")),
	"earth-interior": (0, import_react.lazy)(() => import("./scene-bfisJJLl.mjs")),
	"plate-boundaries": (0, import_react.lazy)(() => import("./scene-B3f0a5ix.mjs")),
	contours: (0, import_react.lazy)(() => import("./scene-CgbbQpyR.mjs")),
	rivers: (0, import_react.lazy)(() => import("./scene-C7kzAqat.mjs")),
	"water-cycle": (0, import_react.lazy)(() => import("./scene-Bn_yQEa1.mjs")),
	"solar-system": (0, import_react.lazy)(() => import("./scene-D6bThSdZ.mjs")),
	"sun-earth": (0, import_react.lazy)(() => import("./scene-BdGcs943.mjs")),
	"solar-altitude": (0, import_react.lazy)(() => import("./scene-DhuW9PT-.mjs")),
	eclipses: (0, import_react.lazy)(() => import("./scene-_odHKo20.mjs")),
	tides: (0, import_react.lazy)(() => import("./scene-tVDETOuA.mjs")),
	"universe-scale": (0, import_react.lazy)(() => import("./scene-DbunT4n7.mjs")),
	"geologic-time": (0, import_react.lazy)(() => import("./scene-CGlMEiKk.mjs")),
	"continental-drift": (0, import_react.lazy)(() => import("./scene-T6b7mvbC.mjs")),
	hotspots: (0, import_react.lazy)(() => import("./scene-DkMDB3ih.mjs")),
	"seafloor-spreading": (0, import_react.lazy)(() => import("./scene-BRBFJkpR.mjs")),
	earthquakes: (0, import_react.lazy)(() => import("./scene-9gEyJk3X.mjs")),
	volcanoes: (0, import_react.lazy)(() => import("./scene-ClpeDle5.mjs")),
	tsunami: (0, import_react.lazy)(() => import("./scene-B6dWs3tb.mjs")),
	"tropical-cyclone": (0, import_react.lazy)(() => import("./scene-yY7FRCqo.mjs")),
	"atmosphere-layers": (0, import_react.lazy)(() => import("./scene-Dz9dsySK.mjs")),
	"energy-budget": (0, import_react.lazy)(() => import("./scene-BZQQ4MaR.mjs")),
	"thermal-circulation": (0, import_react.lazy)(() => import("./scene-D3wsGN7t.mjs")),
	wind: (0, import_react.lazy)(() => import("./scene-HwNNtVmO.mjs")),
	"three-cell": (0, import_react.lazy)(() => import("./scene-DpSMH0wq.mjs")),
	fronts: (0, import_react.lazy)(() => import("./scene-CxxYYFQi.mjs")),
	"cyclone-anticyclone": (0, import_react.lazy)(() => import("./scene-CVvaz9V8.mjs")),
	"climate-types": (0, import_react.lazy)(() => import("./scene-BKI6UzEq.mjs")),
	enso: (0, import_react.lazy)(() => import("./scene-BAInbw6V.mjs")),
	"drainage-basin": (0, import_react.lazy)(() => import("./scene-DDklZoiy.mjs")),
	hydrograph: (0, import_react.lazy)(() => import("./scene-C_jPNrmE.mjs")),
	"river-hydrology": (0, import_react.lazy)(() => import("./scene-C0VGnXvo.mjs")),
	"ocean-currents": (0, import_react.lazy)(() => import("./scene-BHwnNXu1.mjs")),
	thermohaline: (0, import_react.lazy)(() => import("./scene-CvmOYu_a.mjs")),
	"carbon-cycle": (0, import_react.lazy)(() => import("./scene-BBU0Qqil.mjs")),
	"landform-types": (0, import_react.lazy)(() => import("./scene-DqUBxfa6.mjs")),
	"river-erosion": (0, import_react.lazy)(() => import("./scene-CS-ZATUF.mjs")),
	"river-deposition": (0, import_react.lazy)(() => import("./scene-b_rzZqfz.mjs")),
	"river-capture": (0, import_react.lazy)(() => import("./scene-C_CsV7CB.mjs")),
	coasts: (0, import_react.lazy)(() => import("./scene-Dg97c0tD.mjs")),
	glaciers: (0, import_react.lazy)(() => import("./scene-BBcrfm3P.mjs")),
	karst: (0, import_react.lazy)(() => import("./scene-BpliceMc.mjs")),
	"folds-faults": (0, import_react.lazy)(() => import("./scene-CvrglGTX.mjs")),
	aeolian: (0, import_react.lazy)(() => import("./scene-CetrP_je.mjs")),
	"rock-cycle": (0, import_react.lazy)(() => import("./scene-CDT5qW2L.mjs")),
	"soil-profile": (0, import_react.lazy)(() => import("./scene-rcr7MNWS.mjs")),
	"soil-texture": (0, import_react.lazy)(() => import("./scene-DlioXXB_.mjs")),
	weathering: (0, import_react.lazy)(() => import("./scene-Bo4rFqvH.mjs")),
	"soil-erosion": (0, import_react.lazy)(() => import("./scene-D0NIzO_B.mjs")),
	graticule: (0, import_react.lazy)(() => import("./scene-C_iAlRu-.mjs")),
	"map-projections": (0, import_react.lazy)(() => import("./scene-kb5dXyFz.mjs")),
	"grid-references": (0, import_react.lazy)(() => import("./scene-D1f-sWZM.mjs")),
	"mass-movement": (0, import_react.lazy)(() => import("./scene-C_ilw61r.mjs")),
	"rain-shadow": (0, import_react.lazy)(() => import("./scene-Dpboidxa.mjs")),
	groundwater: (0, import_react.lazy)(() => import("./scene-BV7fkMFZ.mjs")),
	isostasy: (0, import_react.lazy)(() => import("./scene-rLKlBVlj.mjs")),
	"wilson-cycle": (0, import_react.lazy)(() => import("./scene-DpL96nZk.mjs")),
	"soil-catena": (0, import_react.lazy)(() => import("./scene-AlmQIyd-.mjs")),
	periglacial: (0, import_react.lazy)(() => import("./scene-D4wX0jh1.mjs")),
	"storm-surge": (0, import_react.lazy)(() => import("./scene-BDYJYnpe.mjs"))
};
Object.keys(LAB_SCENES);
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/redirects-CpbTB0cH.js
var LAB_ALIASES = {
	hydrographs: "hydrograph",
	"soil-textures": "soil-texture",
	"moon-phase": "moon-phases",
	"plate-boundary": "plate-boundaries",
	volcano: "volcanoes",
	earthquake: "earthquakes",
	"river-regime": "river-hydrology",
	regime: "river-hydrology"
};
var REALM_ALIASES = {
	"soils-rocks": "soils",
	"water-carbon": "water",
	"interior-plates": "interior"
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-30Pb9LWH.js
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-void px-6 text-center text-chalk",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-magma",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-mist",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var TOOLS$1 = [
	{
		to: "/tools/earth-motion",
		label: "Earth-motion calculator",
		hint: "Date + latitude → noon Sun"
	},
	{
		to: "/tools/live-weather",
		label: "Live weather",
		hint: "Open-Meteo on a MapLibre map"
	},
	{
		to: "/tools/map",
		label: "World map studio",
		hint: "Relief, rivers, plates, climate"
	},
	{
		to: "/search",
		label: "Search",
		hint: "Labs, glossary, cases"
	}
];
function Header({ variant = "default" }) {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [realmsOpen, setRealmsOpen] = (0, import_react.useState)(false);
	const [toolsOpen, setToolsOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
		setRealmsOpen(false);
		setToolsOpen(false);
	}, [pathname]);
	const lab = variant === "lab";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("fixed inset-x-0 top-0 z-40 h-14 transition-[background-color,backdrop-filter,border-color] duration-280 ease-[cubic-bezier(0.22,1,0.36,1)]", lab || scrolled ? "border-b border-white/10 bg-basalt/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-full max-w-[1280px] items-center justify-between px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-baseline gap-2.5",
				"aria-label": "TerraLens home",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-[22px] leading-none text-chalk",
					children: "TerraLens"
				}), !lab && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden font-mono text-[11px] tracking-wide text-mist lg:inline",
					children: "See how the Earth works"
				})]
			}), lab ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center gap-0.5",
				"aria-label": "Lab",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						to: "/explore",
						children: "Explore"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						to: "/teachers",
						className: "hidden md:inline-flex",
						children: "Teachers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/search",
						className: "ml-1 inline-flex size-11 items-center justify-center rounded-[10px] text-mist hover:bg-white/8 hover:text-chalk",
						"aria-label": "Search",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" })
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "hidden items-center gap-0.5 lg:flex",
				"aria-label": "Primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoverMenu, {
						label: "Realms",
						open: realmsOpen,
						setOpen: setRealmsOpen,
						width: "w-72",
						children: REALMS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/realms/$realm",
							params: { realm: r.slug },
							className: "block rounded-[10px] px-3 py-2 hover:bg-white/8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-chalk",
								children: r.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-mist",
								children: r.kicker
							})]
						}, r.slug))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						to: "/explore",
						children: "Explore"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						to: "/atlas",
						children: "Atlas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoverMenu, {
						label: "Tools",
						open: toolsOpen,
						setOpen: setToolsOpen,
						width: "w-80",
						children: TOOLS$1.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: t.to,
							className: "block rounded-[10px] px-3 py-2 hover:bg-white/8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-chalk",
								children: t.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-mist",
								children: t.hint
							})]
						}, t.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
						to: "/teachers",
						children: "Teachers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/search",
						className: "ml-1 inline-flex size-11 items-center justify-center rounded-[10px] text-mist hover:bg-white/8 hover:text-chalk",
						"aria-label": "Search",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "inline-flex size-11 items-center justify-center rounded-[10px] text-chalk lg:hidden",
				"aria-label": open ? "Close menu" : "Open menu",
				onClick: () => setOpen((v) => !v),
				children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
			})] })]
		}), open && !lab && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10 bg-basalt/95 backdrop-blur-xl lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex max-h-[calc(100dvh-3.5rem)] flex-col gap-1 overflow-y-auto px-4 py-4",
				"aria-label": "Mobile",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-label px-3 pb-2",
						children: "Realms"
					}),
					REALMS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/realms/$realm",
						params: { realm: r.slug },
						className: "rounded-[10px] px-3 py-3 text-chalk hover:bg-white/8",
						children: r.title
					}, r.slug)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/explore",
						className: "rounded-[10px] px-3 py-3 text-chalk hover:bg-white/8",
						children: "Explore"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/atlas",
						className: "rounded-[10px] px-3 py-3 text-chalk hover:bg-white/8",
						children: "Atlas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-label px-3 pb-2 pt-3",
						children: "Tools"
					}),
					TOOLS$1.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: t.to,
						className: "rounded-[10px] px-3 py-3 text-chalk hover:bg-white/8",
						children: t.label
					}, t.to)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/teachers",
						className: "rounded-[10px] px-3 py-3 text-chalk hover:bg-white/8",
						children: "Teachers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/search",
						className: "rounded-[10px] px-3 py-3 text-chalk hover:bg-white/8",
						children: "Search"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/glossary",
						className: "rounded-[10px] px-3 py-3 text-chalk hover:bg-white/8",
						children: "Glossary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/about",
						className: "rounded-[10px] px-3 py-3 text-mist hover:bg-white/8",
						children: "About"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "rounded-[10px] px-3 py-3 text-mist hover:bg-white/8",
						children: "Privacy"
					})
				]
			})
		})]
	});
}
function NavLink({ to, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: cn("inline-flex h-11 items-center rounded-[10px] px-3 text-sm text-chalk/90 hover:bg-white/8", className),
		children
	});
}
function HoverMenu({ label, open, setOpen, width, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		onMouseEnter: () => setOpen(true),
		onMouseLeave: () => setOpen(false),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "inline-flex h-11 items-center gap-1 rounded-[10px] px-3 text-sm text-chalk/90 hover:bg-white/8",
			"aria-expanded": open,
			"aria-haspopup": "true",
			children: [
				label,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5 text-mist" })
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("absolute left-0 top-full rounded-2xl border border-white/10 bg-basalt/95 p-2 shadow-2xl backdrop-blur-xl", width),
			children
		})]
	});
}
var STUDIO = [
	{
		to: "/explore",
		label: "Explore"
	},
	{
		to: "/teachers",
		label: "Teachers"
	},
	{
		to: "/search",
		label: "Search"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/privacy",
		label: "Privacy"
	}
];
var TOOLS = [
	{
		to: "/tools/map",
		label: "World map studio"
	},
	{
		to: "/tools/live-weather",
		label: "Live weather"
	},
	{
		to: "/atlas",
		label: "Atlas"
	},
	{
		to: "/glossary",
		label: "Glossary"
	}
];
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-white/10 bg-basalt",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[1280px] gap-10 px-5 py-14 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl text-chalk",
						children: "TerraLens"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-sm leading-6 text-mist",
						children: "Free 3D labs for geography and Earth science students. Always."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 font-mono text-xs text-mist",
						children: "Free for students and teachers. Always."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-label mb-3",
					children: "Studio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm",
					children: STUDIO.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "text-chalk/90 hover:text-glacier",
						children: l.label
					}) }, l.to))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-label mb-3",
					children: "Tools"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm",
					children: TOOLS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "text-chalk/90 hover:text-glacier",
						children: l.label
					}) }, l.to))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "section-label mb-3",
						children: "Sources"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-2 text-sm text-mist",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "NASA Blue Marble / SVS" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "USGS · BGS · NOAA" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Met Office · Natural Earth" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "OpenStreetMap where mapped" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-xs leading-5 text-mist",
						children: "Lab geometry is original to TerraLens (CC BY-NC 4.0). NASA Blue Marble is public domain. Cite USGS, BGS, NOAA, and the Met Office for numbers. SI units first."
					})
				] })
			]
		})
	});
}
function SiteShell({ children }) {
	const isLab = useRouterState({ select: (s) => s.location.pathname }).startsWith("/lab/");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-void text-chalk",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-glacier focus:px-4 focus:py-2 focus:text-basalt",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { variant: isLab ? "lab" : "default" }),
			children,
			!isLab && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function NotFoundPage() {
	(0, import_react.useEffect)(() => {
		document.title = pageTitle("Not on the chart");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "main",
		className: "relative flex min-h-dvh items-center px-6 pt-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 opacity-50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroEarth, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 mx-auto max-w-lg py-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "section-label",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl text-chalk",
					children: "This coordinate is empty ocean."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-mist",
					children: "The page is not on the chart. The globe still turns. Pick a lab and start from a coast you know."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/explore",
							children: "Explore labs"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Home"
						})
					})]
				})
			]
		})]
	});
}
var styles_default = "/assets/styles-CrvN8ogc.css";
var APP_NAME = "TerraLens";
var Route$22 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Free 3D labs for geography and Earth science students. See how the Earth works."
			},
			{
				name: "theme-color",
				content: "#07090C"
			},
			robotsMeta()
		],
		links: [
			{
				rel: "icon",
				type: "image/x-icon",
				href: "/favicon.ico"
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap"
			}
		]
	}),
	notFoundComponent: NotFoundPage,
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-void text-chalk",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("noscript", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						padding: 24,
						color: "#f4efe6",
						fontFamily: "Georgia, serif"
					},
					children: "TerraLens is a free geoscience studio. Enable JavaScript for the 3D labs, or read the lab titles and objectives as static pages."
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$21 = () => import("./routes-C3wuqmGB.mjs");
var Route$21 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$21, "component"),
	head: () => headFor({
		title: "See how the Earth works",
		description: "Free 3D labs for geography and Earth science students.",
		path: "/"
	})
});
var $$splitComponentImporter$20 = () => import("../_-DE2J8EPM.mjs");
var Route$20 = createFileRoute("/$")({
	beforeLoad: () => {
		throw notFound();
	},
	component: lazyRouteComponent($$splitComponentImporter$20, "component"),
	head: () => ({ meta: [
		{ title: pageTitle("Not on the chart") },
		{
			name: "description",
			content: "This coordinate is empty ocean. The page is not on the chart."
		},
		robotsMeta()
	] })
});
var $$splitComponentImporter$19 = () => import("./about-BzH6L0An.mjs");
var Route$19 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$19, "component"),
	head: () => headFor({
		title: "About",
		description: "A free Earth studio for secondary and high-school students worldwide.",
		path: "/about"
	})
});
var $$splitComponentImporter$18 = () => import("./atlas-CedMs-sP.mjs");
var Route$18 = createFileRoute("/atlas")({
	component: lazyRouteComponent($$splitComponentImporter$18, "component"),
	head: () => headFor({
		title: "Atlas",
		description: "World countries, the UK’s constituent countries, and US states. Capital, coordinates, physical geography, related labs.",
		path: "/atlas"
	})
});
var $$splitComponentImporter$17 = () => import("./explore-B10QLj98.mjs");
var Route$17 = createFileRoute("/explore")({
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	head: () => headFor({
		title: "Explore labs",
		description: "Filter TerraLens labs by realm or curriculum tag.",
		path: "/explore"
	})
});
var $$splitComponentImporter$16 = () => import("./glossary-BdrZcOO9.mjs");
var Route$16 = createFileRoute("/glossary")({
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: () => headFor({
		title: "Glossary",
		description: "Words used in the TerraLens labs, collected for revision.",
		path: "/glossary"
	})
});
var $$splitComponentImporter$15 = () => import("./privacy-CzM--UDJ.mjs");
var Route$15 = createFileRoute("/privacy")({
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => headFor({
		title: "Privacy",
		description: "TerraLens does not run accounts, ads, or student tracking.",
		path: "/privacy"
	})
});
var $$splitComponentImporter$14 = () => import("./search-BACjqyRq.mjs");
var Route$14 = createFileRoute("/search")({
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => headFor({
		title: "Search",
		description: "Find a TerraLens lab, glossary term, or case study.",
		path: "/search"
	})
});
var $$splitComponentImporter$13 = () => import("./skills-80UFdxwY.mjs");
var Route$13 = createFileRoute("/skills")({
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	head: () => headFor({
		title: "Skills studio",
		description: "Contours, graticule, projections, and grid references.",
		path: "/skills"
	})
});
var $$splitComponentImporter$12 = () => import("./teachers-Dire7WNq.mjs");
var Route$12 = createFileRoute("/teachers")({
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	head: () => headFor({
		title: "Teachers",
		description: "Fifteen-minute projector scripts for TerraLens labs. No login.",
		path: "/teachers"
	})
});
var $$splitComponentImporter$11 = () => import("./case._slug-bpJme6Zx.mjs");
var Route$11 = createFileRoute("/case/$slug")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: ({ params }) => {
		const c = CASE_BY_SLUG[params.slug];
		return headFor({
			title: c?.title ?? "Case",
			description: c?.lede ?? "A TerraLens case study.",
			path: `/case/${params.slug}`
		});
	}
});
var $$splitComponentImporter$10 = () => import("./lab._slug-B8xx1jSO.mjs");
var Route$10 = createFileRoute("/lab/$slug")({
	beforeLoad: ({ params }) => {
		const alias = LAB_ALIASES[params.slug];
		if (alias) throw redirect({
			to: "/lab/$slug",
			params: { slug: alias }
		});
		if (!LAB_BY_SLUG[params.slug] || !LAB_SCENES[params.slug]) throw notFound();
	},
	head: ({ params }) => {
		const lab = LAB_BY_SLUG[params.slug];
		if (!lab) return { meta: [
			{ title: pageTitle("Not on the bench") },
			{
				name: "description",
				content: "This slug is not a shipped lab."
			},
			robotsMeta()
		] };
		return {
			meta: [
				{ title: pageTitle(lab.title) },
				{
					name: "description",
					content: lab.hook
				},
				robotsMeta()
			],
			links: [canonicalLink(`/lab/${lab.slug}`)]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./paths.index-BaR9QA2m.mjs");
var Route$9 = createFileRoute("/paths/")({
	beforeLoad: () => {
		throw redirect({ to: "/explore" });
	},
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./paths._slug-CdAaDISU.mjs");
var Route$8 = createFileRoute("/paths/$slug")({
	beforeLoad: () => {
		throw redirect({ to: "/explore" });
	},
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./realms._realm-CyEKGvW4.mjs");
var Route$7 = createFileRoute("/realms/$realm")({
	beforeLoad: ({ params }) => {
		const alias = REALM_ALIASES[params.realm];
		if (alias) throw redirect({
			to: "/realms/$realm",
			params: { realm: alias }
		});
	},
	head: ({ params }) => {
		const meta = REALMS.find((r) => r.slug === params.realm);
		return headFor({
			title: meta?.title ?? "Realm",
			description: meta?.blurb ?? "TerraLens realm.",
			path: `/realms/${params.realm}`
		});
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./tools.index-D71PR2k-.mjs");
var Route$6 = createFileRoute("/tools/")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => headFor({
		title: "Tools",
		description: "Earth-motion calculator, live weather, world map studio, atlas, and search.",
		path: "/tools"
	})
});
var $$splitComponentImporter$5 = () => import("./tools.atlas-Dsfe7y9h.mjs");
var Route$5 = createFileRoute("/tools/atlas")({
	beforeLoad: () => {
		throw redirect({ to: "/atlas" });
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./tools.earth-motion-Bk5jvMwi.mjs");
var Route$4 = createFileRoute("/tools/earth-motion")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => headFor({
		title: "Earth-motion calculator",
		description: "Date and latitude to noon altitude, day length, and declination. Equation of time not included.",
		path: "/tools/earth-motion"
	})
});
var $$splitComponentImporter$3 = () => import("./tools.live-weather-o1lnUfDB.mjs");
var Route$3 = createFileRoute("/tools/live-weather")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => headFor({
		title: "Live weather",
		description: "Educational Open-Meteo weather on a map. Delayed. Not an operational forecast.",
		path: "/tools/live-weather"
	})
});
/** Used only when Open-Meteo 429s. Round, labelled, not a forecast. */
var $$splitComponentImporter$2 = () => import("./tools.map-DXBCSksw.mjs");
var Route$2 = createFileRoute("/tools/map")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => headFor({
		title: "World map studio",
		description: "Readable world map with relief, rivers, settlements, three kinds of plate boundary, and Köppen samples.",
		path: "/tools/map"
	})
});
var $$splitComponentImporter$1 = () => import("./tools.weather-i75LAZCK.mjs");
var Route$1 = createFileRoute("/tools/weather")({
	beforeLoad: () => {
		throw redirect({ to: "/tools/live-weather" });
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./topic._slug-AgqNNULk.mjs");
var Route = createFileRoute("/topic/$slug")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$21.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$22
});
var SplatRoute = Route$20.update({
	id: "/$",
	path: "/$",
	getParentRoute: () => Route$22
});
var AboutRoute = Route$19.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$22
});
var AtlasRoute = Route$18.update({
	id: "/atlas",
	path: "/atlas",
	getParentRoute: () => Route$22
});
var ExploreRoute = Route$17.update({
	id: "/explore",
	path: "/explore",
	getParentRoute: () => Route$22
});
var GlossaryRoute = Route$16.update({
	id: "/glossary",
	path: "/glossary",
	getParentRoute: () => Route$22
});
var PrivacyRoute = Route$15.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$22
});
var SearchRoute = Route$14.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$22
});
var SkillsRoute = Route$13.update({
	id: "/skills",
	path: "/skills",
	getParentRoute: () => Route$22
});
var TeachersRoute = Route$12.update({
	id: "/teachers",
	path: "/teachers",
	getParentRoute: () => Route$22
});
var CaseSlugRoute = Route$11.update({
	id: "/case/$slug",
	path: "/case/$slug",
	getParentRoute: () => Route$22
});
var LabSlugRoute = Route$10.update({
	id: "/lab/$slug",
	path: "/lab/$slug",
	getParentRoute: () => Route$22
});
var PathsIndexRoute = Route$9.update({
	id: "/paths/",
	path: "/paths/",
	getParentRoute: () => Route$22
});
var PathsSlugRoute = Route$8.update({
	id: "/paths/$slug",
	path: "/paths/$slug",
	getParentRoute: () => Route$22
});
var RealmsRealmRoute = Route$7.update({
	id: "/realms/$realm",
	path: "/realms/$realm",
	getParentRoute: () => Route$22
});
var ToolsIndexRoute = Route$6.update({
	id: "/tools/",
	path: "/tools/",
	getParentRoute: () => Route$22
});
var rootRouteChildren = {
	IndexRoute,
	SplatRoute,
	AboutRoute,
	AtlasRoute,
	ExploreRoute,
	GlossaryRoute,
	PrivacyRoute,
	SearchRoute,
	SkillsRoute,
	TeachersRoute,
	CaseSlugRoute,
	LabSlugRoute,
	PathsSlugRoute,
	RealmsRealmRoute,
	ToolsAtlasRoute: Route$5.update({
		id: "/tools/atlas",
		path: "/tools/atlas",
		getParentRoute: () => Route$22
	}),
	ToolsEarthMotionRoute: Route$4.update({
		id: "/tools/earth-motion",
		path: "/tools/earth-motion",
		getParentRoute: () => Route$22
	}),
	ToolsLiveWeatherRoute: Route$3.update({
		id: "/tools/live-weather",
		path: "/tools/live-weather",
		getParentRoute: () => Route$22
	}),
	ToolsMapRoute: Route$2.update({
		id: "/tools/map",
		path: "/tools/map",
		getParentRoute: () => Route$22
	}),
	ToolsWeatherRoute: Route$1.update({
		id: "/tools/weather",
		path: "/tools/weather",
		getParentRoute: () => Route$22
	}),
	TopicSlugRoute: Route.update({
		id: "/topic/$slug",
		path: "/topic/$slug",
		getParentRoute: () => Route$22
	}),
	PathsIndexRoute,
	ToolsIndexRoute
};
var routeTree = Route$22._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
//#endregion
export { Route$11 as a, CASES as c, siteOrigin as d, Route$10 as i, CASE_BY_SLUG as l, Route as n, NotFoundPage as o, Route$7 as r, LAB_SCENES as s, router_exports as t, learningResourceJsonLd as u };
