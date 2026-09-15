//#region node_modules/.nitro/vite/services/ssr/assets/catalog-OOT9SqiM.js
function steps(observe, tinker, explain) {
	return [
		{
			id: "observe",
			title: "Observe",
			body: observe
		},
		{
			id: "tinker",
			title: "Tinker",
			body: tinker
		},
		{
			id: "explain",
			title: "Explain",
			body: explain
		},
		{
			id: "check",
			title: "Check",
			body: "Three to five questions. Instant feedback. Not a score-gate."
		}
	];
}
function q(prompt, choices, answer, explain) {
	return {
		prompt,
		choices,
		answer,
		explain
	};
}
function mc(claim, truth) {
	return {
		claim,
		truth
	};
}
function lab(meta) {
	return meta;
}
var ATMOSPHERE_LABS = [
	lab({
		slug: "atmosphere-layers",
		title: "Atmosphere as a thin film",
		hook: "Weather lives in a thin film. The rest of the stack is overhead, not climate.",
		objective: "Name the main layers, state that weather is tropospheric, and read a lapse rate as temperature falling with height.",
		realm: "atmosphere",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS",
			"APES"
		],
		curriculum: [
			"KS3",
			"GCSE weather",
			"NGSS MS-ESS2-5",
			"APES 4.4"
		],
		steps: steps("Explode the shells. Troposphere, stratosphere, mesosphere, thermosphere. Almost all clouds sit in the inner film.", "Drag the lapse-rate slider. Colour the troposphere. A radiosonde is this diagram going up.", "Weather is troposphere. Ozone heating makes the stratosphere’s temperature rise. The stack is mostly empty of weather."),
		questions: [
			q("Where does almost all weather happen?", [
				"Thermosphere",
				"Mesosphere",
				"Troposphere",
				"Exosphere"
			], 2, "The troposphere is the thin inner film. Clouds, rain, and most winds live there."),
			q("A lapse rate of 6.5 °C/km means…", [
				"Temperature rises 6.5 °C each kilometre up.",
				"Temperature falls about 6.5 °C each kilometre up in the troposphere, on average.",
				"Pressure is constant.",
				"The stratosphere is boiling."
			], 1, "Environmental lapse rate is a fall of temperature with height, on average, in the troposphere."),
			q("Why is the stratosphere warmer as you go up?", [
				"Closer to the Sun in kilometres that matter.",
				"Ozone absorbs ultraviolet and heats that layer.",
				"Clouds trap heat there.",
				"It is closer to space heaters."
			], 1, "Ozone absorption, not ‘closer to the Sun’ in any useful sense."),
			q("Denver is a mile high. Is its weather still troposphere weather?", [
				"No — it is already in space.",
				"Yes. The tropopause is still many kilometres above the city.",
				"Only in winter.",
				"No, because air is 100% oxygen there."
			], 1, "A mile is small next to a 10–12 km troposphere. Denver sits near 1.6 km.")
		],
		why: [
			"Weather lives in a thin film, not in the whole sky. A last-period class on a UK sea-breeze coast and a playground in mile-high Denver are both still in the troposphere: a few kilometres of mixing, cloud, rain, and the winds that make a forecast. The tropopause is a lid, not the edge of space. Above it the air is real (ozone, meteors, aurora) but almost none of the weather you teach. Aircraft cruise near that lid because the film ends and the ride gets smoother. A Met Office radiosonde and a Denver sounding are the same stack with a different starting height. GCSE weather and NGSS Earth systems both need this picture before fronts, cells, or climate types. If pupils think space begins just above the clouds, every later lab is a cartoon. Draw the film first. Then London fog, Florida convection, and Phoenix heat all have a place to live.",
			"The stack from the ground up is troposphere, tropopause, stratosphere, mesosphere, thermosphere. Thickness is not equal. The troposphere is roughly 8 to 12 km, thinner over the poles, thicker in the tropics. Almost all clouds, rain, and the mixing that makes weather sit in that inner film. Temperature in the troposphere falls with height on average: a school environmental lapse rate of about 6.5 °C km⁻¹. A radiosonde is that diagram going up. The tropopause is where the fall stops. In the stratosphere, ozone absorbs ultraviolet and heats the layer, so temperature rises as you go up, not because those kilometres are meaningfully closer to the Sun. Mesosphere cools again. Thermosphere is thin, energetic, and still not weather. Pressure falls with height the whole way; we do not run out of air at the tropopause. Denver at about 1.6 km is a higher starting point in the same troposphere. A UK sounding from a coastal station starts near sea level and still finds the same lid many kilometres up. Colour the troposphere, explode the shells so the class can name them, then push the shells back so the film looks like a film. The lapse-rate slider is a school average, not a local sounding on a given Tuesday, and not a claim that every parcel cools at 6.5 °C km⁻¹.",
			"Drag to orbit. Space plays and pauses. Arrow keys nudge time. L toggles labels so you can hide names and ask the back row. R resets the stack and the lapse slider. P switches projector mode for a clean board. E explodes the shells; push them back before you sit down so thickness stays honest. Scrub Lapse rate and watch troposphere colour. This lab has no year clock; the motion is the explode and the slider. Share the URL once the shells sit where you want them.",
			"If JavaScript or WebGL dies, the 2D fallback still shows the stack as a labelled diagram. Teach from Observe, Tinker, Explain and finish in Check: weather in the troposphere, lapse as a fall, ozone heating the stratosphere, Denver still troposphere. Print the teacher script from the Teacher tab. The glossary still carries tropopause, radiosonde, and ozone layer. Cases still point at Denver mile-high air and a UK sounding. You lose explode, orbit, and the lapse colour, not the film. A paper radiosonde trace can stand in for the slider. The Why copy on this page is the lesson if the canvas is a still."
		],
		glossary: [
			{
				term: "Troposphere",
				def: "Lowest layer. Weather lives here. Roughly 8–12 km thick, thinner at the poles."
			},
			{
				term: "Tropopause",
				def: "The lid of the troposphere, where temperature stops falling with height."
			},
			{
				term: "Lapse rate",
				def: "How temperature changes with height. A positive environmental lapse usually means it gets colder up."
			},
			{
				term: "Stratosphere",
				def: "Layer above the tropopause, heated by ozone absorbing ultraviolet."
			},
			{
				term: "Mesosphere",
				def: "Layer above the stratosphere. Temperature falls with height again. Meteors burn here."
			},
			{
				term: "Thermosphere",
				def: "Very thin upper layer. Energetic, aurora country, still not weather."
			},
			{
				term: "Radiosonde",
				def: "Balloon-borne package that profiles temperature, humidity and pressure with height."
			},
			{
				term: "Ozone layer",
				def: "Region of higher ozone in the stratosphere that absorbs ultraviolet and heats that layer."
			}
		],
		misconception: {
			claim: "Space begins just above the clouds.",
			truth: "Clouds are in a thin film. There is a lot of atmosphere above them, but almost no weather."
		},
		misconceptions: [
			{
				claim: "Space begins just above the clouds.",
				truth: "Clouds are in a thin film. There is a lot of atmosphere above them, but almost no weather."
			},
			{
				claim: "The troposphere is about half the stack.",
				truth: "On a fair drawing it is a film. School shells are exploded so you can name them, not so you can measure thickness from the poster."
			},
			{
				claim: "We run out of air at the tropopause, so Denver is halfway to space.",
				truth: "Pressure falls with height, but air continues. Denver at about 1.6 km is still deep in a 10–12 km troposphere."
			}
		],
		cases: [{
			slug: "denver-air",
			label: "Denver mile-high air"
		}, {
			slug: "uk-sea-breeze",
			label: "UK radiosonde / sea breeze"
		}],
		teacher: {
			script: "Explode the shells. Name layers from the inside: troposphere, stratosphere, mesosphere, thermosphere.\nAsk where rain is allowed before you reveal. Weather lives in the troposphere.\nClouds sit in that thin inner film. Space does not begin just above them.\nThat is the misconception. There is atmosphere above, but almost no weather.\nRun the Lapse rate slider. Colour the troposphere. Temperature falls with height, on average.\nA school figure is about 6.5 °C km⁻¹. A radiosonde is this diagram going up.\nOzone heating makes the stratosphere’s temperature rise as you go up, not because it is closer to the Sun in kilometres that matter.\nCompare a UK sounding with Denver. A mile-high city is still troposphere.\nPush the shells back. Do not leave them exploded as if thickness were equal.\nDo not draw the troposphere as half the stack. Do not say we run out of air at the tropopause.\nFinish in Check.",
			pitfalls: [
				"Drawing the troposphere as half the stack.",
				"Saying we ‘run out of air’ at the tropopause.",
				"Leaving exploded shells on the board as if they were to scale.",
				"Teaching ‘closer to the Sun’ as the reason the stratosphere warms with height."
			]
		},
		sources: [{ label: "NOAA layers of the atmosphere" }, { label: "Met Office radiosondes" }],
		controls: {
			time: "none",
			explode: true,
			extra: [{
				key: "lapse",
				label: "Lapse rate",
				min: 4,
				max: 10,
				step: .1,
				unit: " °C/km",
				default: 6.5
			}]
		}
	}),
	lab({
		slug: "energy-budget",
		title: "Earth’s energy budget",
		hook: "The ground, not the air, takes the Sun’s punch first.",
		objective: "Trace incoming shortwave, albedo, longwave from the ground, and a simple greenhouse return.",
		realm: "atmosphere",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS",
			"APES"
		],
		curriculum: [
			"KS3",
			"GCSE climate",
			"NGSS MS-ESS2-6",
			"APES 4.4"
		],
		steps: steps("Watch the yellow shortwave hit the ground. Some bounces. The ground then glows longwave.", "Raise albedo (snow). Less is absorbed. Toggle greenhouse return.", "The air is mostly heated from below. Albedo is a surface choice. Greenhouse gases return longwave; they do not ‘trap the Sun’s yellow light’ as a blanket over the beam."),
		questions: [
			q("What hits the ground first from the Sun?", [
				"Longwave from the air",
				"Shortwave (visible + near-IR + UV)",
				"Earth’s magnetic field",
				"Only infrared"
			], 1, "The solar beam is shortwave. The ground then emits longwave."),
			q("Albedo is…", [
				"Wind speed",
				"The fraction of incoming shortwave a surface reflects",
				"A cloud type",
				"Ocean salinity"
			], 1, "Fresh snow: high. Dark peat: low."),
			q("Why can a snowy Cairngorm plateau heat the air less than bare peat?", [
				"Snow is closer to space.",
				"Higher albedo, so less absorbed shortwave.",
				"Snow creates wind.",
				"Peat is magnetic."
			], 1, "Colour and cover first. Then latent heat if melt or moisture."),
			q("Greenhouse return in this lab is…", [
				"A GCM of 2026 climate.",
				"Longwave from the atmosphere back to the ground — a school box, not a forecast.",
				"The Sun getting hotter.",
				"Albedo of space."
			], 1, "Simplification. Teacher notes say so.")
		],
		why: [
			"Urban heat and snowmelt are budget stories, not moods of the air. A snowy Cairngorm plateau and a paved Phoenix afternoon are the same arrows with different numbers: incoming shortwave, a bounce, absorption at the surface, then longwave up from the ground. The air is mostly heated from below. That is why a dark playground cooks and a bright snowfield does not, and why a UK winter park under fresh snow can stay stubbornly cold while a Florida car park does not. GCSE climate and APES energy-budget diagrams both start here. If pupils think the air takes the Sun’s punch first, every later sentence about greenhouse return, sea breezes, and urban heat islands sits on the wrong floor. Trace the yellow beam to the ground. Then talk about London brick, Arizona desert, and mountain snow as surfaces, not as weather personalities.",
			"The solar beam is shortwave: ultraviolet, visible, and near-infrared. Some of that beam reflects to space; that fraction is albedo. The rest is absorbed, mostly by ground and ocean, some by atmosphere and cloud. The warmed surface emits longwave infrared. Greenhouse gases absorb and re-radiate that longwave; the school box labelled greenhouse return is longwave from the atmosphere back to the ground, not a blanket that blocks the yellow beam on the way in, and not a 2026 climate forecast. Raise albedo toward snow and less shortwave is absorbed, so the red glow fades. Drop albedo toward dark peat or asphalt and the surface takes more of the punch. Phoenix heat is a low-albedo, dry, urban-surface story. Cairngorm snow is a high-albedo story until melt changes the cover. London brick and a Florida wetland sit between those poles, with water and evaporation arguing as well. Units in the adult literature are watts per square metre (W m⁻²); this lab is the arrow diagram, not an inventory you should invent numbers for. Toggle greenhouse return off to see the surface glow without the return, then on again so the class hears the honest sentence: school box, not a GCM.",
			"Drag to orbit the globe of arrows. Space plays and pauses the beam. Arrows left and right nudge time. L hides labels so you can ask what yellow and red mean. R resets albedo and the greenhouse toggle. P is projector. Scrub Albedo from peat toward snow and watch absorbed shortwave fall. Toggle Greenhouse return off, then on. Time is not a year clock here; the drive is the slider and the toggle. Share the URL when the snow and the return sit where you want the question.",
			"If JavaScript or WebGL dies, the 2D fallback still shows the budget as labelled arrows. Teach from the steps: yellow shortwave to the ground, bounce, red longwave, greenhouse return as a school box. Check still asks what hits first, what albedo is, why Cairngorm snow heats the air less than peat, and what the greenhouse toggle is not. Print the teacher script. The glossary still names albedo, shortwave, and longwave. Cases still point at Cairngorms and Phoenix. You lose the moving beams, not the floor the air is heated from. A board sketch of yellow in and red out can stand in for the canvas."
		],
		glossary: [
			{
				term: "Albedo",
				def: "Fraction of incoming shortwave reflected by a surface. Fresh snow high; dark peat low."
			},
			{
				term: "Shortwave",
				def: "Solar radiation: ultraviolet, visible, near-infrared."
			},
			{
				term: "Longwave",
				def: "Earth-emitted infrared from the ground, ocean, and atmosphere."
			},
			{
				term: "Greenhouse effect",
				def: "Atmosphere absorbing and re-radiating longwave. School box, not a GCM."
			},
			{
				term: "Energy budget",
				def: "Balance of incoming and outgoing radiation for a surface or the planet."
			},
			{
				term: "Absorption",
				def: "Radiation taken up by a surface or gas and converted to energy in that matter."
			},
			{
				term: "Emission",
				def: "Radiation given out. Warm ground emits longwave."
			},
			{
				term: "Insolation",
				def: "Incoming solar radiation at a surface, after geometry and, at the ground, atmosphere."
			}
		],
		misconception: {
			claim: "The air takes the Sun’s heat, then warms the ground.",
			truth: "The ground (and ocean) take most of the beam. The air is heated from below, plus some absorption."
		},
		misconceptions: [
			{
				claim: "The air takes the Sun’s heat, then warms the ground.",
				truth: "The ground (and ocean) take most of the beam. The air is heated from below, plus some absorption."
			},
			{
				claim: "Greenhouse gases trap the Sun’s yellow light as a blanket over the beam.",
				truth: "The solar beam is shortwave. Greenhouse return is longwave from the atmosphere back to the ground."
			},
			{
				claim: "Albedo is how hot a surface feels to the hand.",
				truth: "Albedo is the reflected fraction of shortwave. A dark dry pavement can run hot because it absorbs more, then emits longwave."
			}
		],
		cases: [{
			slug: "cairngorms-albedo",
			label: "Cairngorms snow albedo"
		}, {
			slug: "phoenix-heat",
			label: "Arizona desert / Phoenix"
		}],
		teacher: {
			script: "Trace one yellow shortwave arrow to the ground. Some bounces. The ground then glows longwave.\nThe air is mostly heated from below. That is the misconception in reverse.\nSnap Albedo toward snow. Less shortwave is absorbed.\nAsk what happens to the red glow. It should fade.\nToggle Greenhouse return off, then on. Longwave from the atmosphere back to the ground — a school box, not a forecast.\nGreenhouse gases do not trap the Sun’s yellow light as a blanket over the beam.\nAlbedo is a surface choice. Fresh snow high, dark peat low. Cairngorms versus Phoenix.\nThis is not a climate prediction. Say so.\nArizona desert and Cairngorm snow are the same arrows with different numbers.\nFinish in Check.",
			pitfalls: [
				"Calling this a climate prediction.",
				"‘The atmosphere is a blanket that blocks sunlight.’",
				"Inventing watt-per-square-metre inventories the lab does not show.",
				"Teaching albedo as a feeling of warmth rather than a reflected fraction."
			]
		},
		sources: [{ label: "NASA energy budget diagram" }, { label: "NOAA climate" }],
		controls: {
			time: "none",
			extra: [{
				key: "albedo",
				label: "Albedo",
				min: .1,
				max: .9,
				step: .05,
				default: .3
			}],
			toggles: [{
				key: "greenhouse",
				label: "Greenhouse return",
				defaultOn: true
			}]
		}
	}),
	lab({
		slug: "thermal-circulation",
		title: "Thermal circulation",
		hook: "A coastal school feels the sea breeze at last period for a reason.",
		objective: "Heat one column, watch the loop, and switch between land–sea breeze and a simple urban-heat island.",
		realm: "atmosphere",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: [
			"KS3",
			"GCSE weather",
			"NGSS MS-ESS2-5"
		],
		steps: steps("Two columns. The land one is warm. Particles rise, travel, sink over the cool column, return.", "Toggle urban heat: a paved patch as the warm column. Then land–sea.", "Uneven heating starts a pressure difference. Air starts ‘downhill’ on that slope. Coriolis is a later lab."),
		questions: [
			q("A sea breeze at the surface blows…", [
				"From land to sea",
				"From sea to land",
				"Straight up",
				"Only at night"
			], 1, "Land hotter by day → rise over land → onshore flow at the surface."),
			q("At night the land often cools faster. The surface flow…", [
				"Stays onshore",
				"Can reverse as a land breeze",
				"Stops the planet",
				"Becomes a hurricane"
			], 1, "The loop can reverse. Not always; moisture and clouds argue."),
			q("An urban heat island is…", [
				"A sea.",
				"A city that stays warmer, especially at night, because of surface materials and less evaporative cooling.",
				"A type of cloud.",
				"A polar cell."
			], 1, "Budget plus roughness. Phoenix is a large example; a playground is a small one."),
			q("Coriolis on a 20 km sea breeze is…", [
				"Essential; the wind would not exist without it.",
				"A later lab. This loop is thermal, local, and too small to need the twist.",
				"Why the sea is always cold.",
				"Why Phoenix has no heat island."
			], 1, "Leave Coriolis off this scale. The pressure slope from uneven heating is enough.")
		],
		why: [
			"Last period on a sunny coastal site is a field trip you do not leave the playground for. A UK sea breeze is the same thermal loop as a Phoenix afternoon pulling air off a cooler canal or desert edge: land or pavement heats faster, air rises, surface air replaces it from the cooler side. London brick versus a park, Florida sea breeze versus inland convection, a playground versus a playing field: uneven heating, then a pressure difference, then wind. GCSE weather wants the sea breeze by name. NGSS wants the idea that heating differences drive circulation. If pupils think wind starts because the sea is always cold, they will never reverse the loop at night and they will brand every coastal wind a monsoon. Heat one column. Watch the return. Then say Phoenix heat island and UK sea breeze in the same sentence.",
			"Two columns. By day the land (or the paved patch) takes more of the shortwave budget, warms, and the air above it becomes less dense. That column rises. Aloft, air moves toward the cooler column. There it sinks. At the surface, air flows toward the warm column: onshore as a sea breeze, or toward the city as a weak urban circulation. The sea’s slower temperature change is the contrast, not a permanent cold machine. At night the land often cools faster, and the loop can reverse as a land breeze; moisture, cloud, and a stubborn urban heat store all argue, so it is not a clock. Phoenix stays warmer at night because materials and less evaporative cooling hold heat; that is an urban heat island, not a sea. A UK sea-breeze front can lift a line of cloud a few kilometres inland on a spring afternoon. Do not draw Coriolis on a 20 km loop. Do not call every coastal wind a monsoon. Pressure difference first, then the arrows. The next lab adds Earth’s twist at a scale that can feel it.",
			"Leave Land–sea on to start. Space plays the day–night walk so the loop can reverse. Arrow keys nudge time if you want a freeze-frame for the board. L hides labels; ask for the surface arrow before you reveal. R resets toggles. P is projector for a clean front. Toggle Urban heat to make the paved patch the warm column, then off again so the coast is the story. This is a local loop, not a year clock of cells. Share the URL when the surface arrow sits onshore, then again at night so the reverse is a link, not a rumour.",
			"If JavaScript or WebGL dies, the 2D fallback still shows two columns and a loop. Teach from the steps: rise over the warm column, sink over the cool, surface flow toward the heat by day. Check still names sea breeze, land breeze, urban heat island, and why Coriolis waits. Print the teacher script. The glossary still carries onshore flow and evaporative cooling. Cases still point at a UK sea breeze and Phoenix heat. You lose the particles, not the reason a coastal school feels the breeze at last period. A board loop of four arrows can stand in for the canvas."
		],
		glossary: [
			{
				term: "Sea breeze",
				def: "Daytime onshore flow driven by land heating faster than the sea."
			},
			{
				term: "Land breeze",
				def: "Night-time offshore flow when land has cooled faster than the sea. Not a clock."
			},
			{
				term: "Urban heat island",
				def: "City warmer than surroundings, especially at night, from materials and less evaporative cooling."
			},
			{
				term: "Thermal circulation",
				def: "A loop driven by uneven heating and the pressure difference that follows."
			},
			{
				term: "Onshore flow",
				def: "Surface wind from sea toward land."
			},
			{
				term: "Pressure difference",
				def: "Uneven heating builds a slope on the pressure field. Air starts downhill on that slope."
			},
			{
				term: "Evaporative cooling",
				def: "Heat used to evaporate water, so a wet surface warms more slowly than a dry one."
			}
		],
		misconception: {
			claim: "Wind starts because the sea is always cold.",
			truth: "It starts because heating is uneven. The sea’s slower temperature change is the contrast, not a permanent cold machine."
		},
		misconceptions: [
			{
				claim: "Wind starts because the sea is always cold.",
				truth: "It starts because heating is uneven. The sea’s slower temperature change is the contrast, not a permanent cold machine."
			},
			{
				claim: "Every coastal wind is a monsoon.",
				truth: "A sea breeze is a local thermal loop, kilometres not ocean basins. Monsoon is a seasonal, much larger reversal."
			},
			{
				claim: "Cities are warmer only because of car exhaust.",
				truth: "Surface materials, geometry, and less evaporative cooling do most of the school-level work, especially at night."
			}
		],
		cases: [{
			slug: "uk-sea-breeze",
			label: "UK sea breeze"
		}, {
			slug: "phoenix-heat",
			label: "Phoenix urban heat"
		}],
		teacher: {
			script: "Leave Land–sea on. Heat the land column. Wait for the loop.\nParticles rise over the warm column, travel, sink over the cool, return.\nName the surface arrow: by day, sea to land.\nWind starts because heating is uneven, not because the sea is always cold.\nThe sea’s slower temperature change is the contrast, not a permanent cold machine.\nAt night the loop can reverse as a land breeze. Not always; moisture and clouds argue.\nToggle Urban heat on. A paved patch is now the warm column.\nAn urban heat island is materials and less evaporative cooling, especially at night. Phoenix is the large locator.\nDo not draw Coriolis on a 20 km sea breeze. Do not call every coastal wind a monsoon.\nFinish in Check.",
			pitfalls: [
				"Drawing Coriolis on a 20 km sea breeze.",
				"Calling every coastal wind a monsoon.",
				"Teaching the night reversal as a clock that always rings.",
				"Blaming urban heat on exhaust alone and skipping surfaces."
			]
		},
		sources: [{ label: "Met Office sea breezes" }, { label: "NOAA urban heat" }],
		controls: {
			time: "none",
			toggles: [{
				key: "landsea",
				label: "Land–sea",
				defaultOn: true
			}, {
				key: "urban",
				label: "Urban heat"
			}]
		}
	}),
	lab({
		slug: "wind",
		title: "Wind, PGF and Coriolis",
		hook: "Air starts downhill on the pressure slope. Earth then twists the path.",
		objective: "Name PGF, switch Coriolis on, compare NH and SH, and add friction near the surface.",
		realm: "atmosphere",
		ages: [
			"GCSE",
			"A-level",
			"NGSS MS",
			"HS Earth Sci"
		],
		curriculum: [
			"GCSE weather",
			"A-level atmosphere",
			"NGSS HS-ESS2"
		],
		steps: steps("High to low: the PGF arrow. No spin yet, so flow is straight down the slope.", "Coriolis on. NH left-looking-downslope becomes a right deflection. Toggle SH. Add friction: surface flow cuts across isobars toward low.", "Geostrophic is PGF vs Coriolis, no friction. The ground slows the wind and lets PGF win a bit."),
		questions: [
			q("PGF points…", [
				"From low to high pressure",
				"From high to low pressure",
				"Always east",
				"Only upward"
			], 1, "Pressure-gradient force is downhill on the pressure surface."),
			q("In the northern hemisphere Coriolis deflects…", [
				"Left",
				"Right",
				"Up",
				"Not at all"
			], 1, "To the right of the motion. SH: left."),
			q("Friction near the surface makes wind…", [
				"Faster and more geostrophic",
				"Cross isobars toward low pressure",
				"Stop Coriolis existing",
				"Blow only at night"
			], 1, "Slower wind → weaker Coriolis → PGF pulls across the isobars."),
			q("Coriolis is zero at…", [
				"The poles",
				"The equator",
				"London",
				"The tropopause only"
			], 1, "No deflection at the equator. Maximum at the poles.")
		],
		why: [
			"Met Office isobars are this lab printed on a chart. A UK depression approaching London, a Great Plains nocturnal jet arguing with friction, and a Denver lee trough are the same three ideas: pressure-gradient force, Coriolis, friction. GCSE wants the names and the spin. A-level wants geostrophic balance and why surface winds cut across isobars toward low. NGSS wants a rotating Earth that deflects, not a magic force in the room. If pupils think Coriolis swirls a sink, they will never trust a weather chart. If they skip friction, they will never see why air piles into a low at the ground. Start downhill on the pressure slope. Then twist. Then slow it. Florida’s latitude still has Coriolis; a playground sea breeze does not need it. Scale first, then the keys.",
			"Air starts because pressure is uneven: the pressure-gradient force (PGF) points from high to low, downhill on the pressure surface. With no rotation and no friction, flow would run straight down that slope. We measure on a rotating Earth, so the path appears to deflect: right of the motion in the northern hemisphere, left in the southern. That apparent deflection is Coriolis. It is zero at the equator and largest at the poles. It is not a force you can point at in the room, and it does not run a bathroom sink; basin scale is too small, weather systems are large enough. Geostrophic wind is PGF balanced by Coriolis with friction neglected, flow along the isobars. Near the ground, friction slows the wind. Weaker wind means weaker Coriolis, so PGF wins a bit and the surface flow cuts across isobars toward low. That is why lows fill from below and why a UK surface chart is not a replica of the 500 hPa chart. Toggle Southern hemisphere and the deflection flips. Toggle Friction and the arrows bite toward the low. Leave Coriolis off once so the class sees the naked slope.",
			"Toggle Coriolis off first so PGF is the only arrow. Space plays the flow. Arrow keys nudge time. L hides labels; ask which way is downhill before you reveal. R resets Coriolis, friction, and hemisphere. P is projector. Then Coriolis on, then Southern hemisphere, then Friction. Time is not a year clock; the drive is the three toggles and a pause for the geostrophic pair. Share the URL when the surface arrows cut across isobars, and again with friction off so the textbook balance is a link the class can reopen.",
			"If JavaScript or WebGL dies, the 2D fallback still shows high, low, and isobars. Teach from the steps: PGF downhill, Coriolis on, friction across the isobars. Check still names PGF, northern-hemisphere deflection, friction, and the equator. Print the teacher script. The glossary still carries geostrophic wind and Buys Ballot’s law. You lose the moving arrows, not the sink-scale warning. A printed Met Office chart can stand in for the canvas; point downhill, then right, then across the isobars toward low."
		],
		glossary: [
			{
				term: "Coriolis",
				def: "Apparent deflection because we measure on a rotating Earth. Right in NH, left in SH. Zero at the equator."
			},
			{
				term: "PGF",
				exam: "Pressure-gradient force",
				def: "Force from high to low pressure, downhill on the pressure surface."
			},
			{
				term: "Geostrophic wind",
				def: "PGF balanced by Coriolis. Friction neglected. Flow along the isobars."
			},
			{
				term: "Friction",
				def: "Surface drag that slows the wind, weakens Coriolis, and lets PGF pull across isobars toward low."
			},
			{
				term: "Isobar",
				def: "A line of equal pressure on a chart. Tight packing means a steep PGF."
			},
			{
				term: "Buys Ballot’s law",
				def: "In the northern hemisphere, with your back to the wind, low pressure is on the left. School rule of thumb."
			},
			{
				term: "Pressure gradient",
				def: "How pressure changes with distance. Steep gradient, strong PGF, strong wind."
			}
		],
		misconception: {
			claim: "Coriolis makes water swirl in a sink.",
			truth: "Basin scale is too small. Weather systems are large enough. Sinks are not."
		},
		misconceptions: [
			{
				claim: "Coriolis makes water swirl in a sink.",
				truth: "Basin scale is too small. Weather systems are large enough. Sinks are not."
			},
			{
				claim: "Coriolis is a real force you can point at in the room.",
				truth: "It is an apparent deflection because we measure on a rotating Earth. You cannot hang a label on a bit of air and call it Coriolis."
			},
			{
				claim: "Friction makes the wind faster.",
				truth: "Friction slows the wind. Weaker Coriolis then lets PGF pull the surface flow across isobars toward low."
			}
		],
		cases: [{
			slug: "uk-sea-breeze",
			label: "Met Office isobars"
		}, {
			slug: "time-zones-us",
			label: "US Great Plains"
		}],
		teacher: {
			script: "Toggle Coriolis off. PGF only: high to low, straight down the pressure slope.\nToggle Coriolis on. In the northern hemisphere the path deflects right.\nToggle Southern hemisphere. Deflection flips left.\nCoriolis is an apparent deflection because we measure on a rotating Earth. You cannot point at it in the room.\nToggle Friction on. Surface flow cuts across isobars toward low.\nGeostrophic is PGF versus Coriolis with friction neglected. Ask which arrow a textbook pair is missing.\nCoriolis does not make water swirl in a sink. Basin scale is too small.\nWeather systems are large enough. Sinks are not.\nCoriolis is zero at the equator and largest at the poles. London feels it; a washbasin does not.\nFinish in Check.",
			pitfalls: [
				"Coriolis as a real force you can point at in the room.",
				"NH vs SH mix-up.",
				"Sinks and toilets as evidence.",
				"Teaching friction as something that speeds the wind."
			]
		},
		sources: [{ label: "Met Office charts" }, { label: "NOAA jet stream" }],
		controls: {
			time: "none",
			toggles: [
				{
					key: "coriolis",
					label: "Coriolis",
					defaultOn: true
				},
				{
					key: "friction",
					label: "Friction"
				},
				{
					key: "sh",
					label: "Southern hemisphere"
				}
			]
		}
	}),
	lab({
		slug: "three-cell",
		title: "Three-cell circulation",
		hook: "One cell would be the textbook. Three cells are the planet we have.",
		objective: "Toggle 1-cell vs 3-cell, name Hadley / Ferrel / Polar, and watch the ITCZ walk with the seasons.",
		realm: "atmosphere",
		ages: [
			"GCSE",
			"A-level",
			"NGSS MS",
			"APES"
		],
		curriculum: [
			"GCSE weather",
			"A-level",
			"NGSS HS-ESS2-4",
			"APES 4.5"
		],
		steps: steps("One cell: hot equator rise, pole sink. Too simple for a spinning planet.", "Three cells. Hadley, Ferrel, Polar. Play a year: ITCZ walks.", "Hadley is the tropical loop. Ferrel is the midlatitude indirect cell. Polar is the high-latitude loop. ITCZ is the meeting of the trades."),
		questions: [
			q("The Hadley cell has rising air near…", [
				"The poles",
				"The equator / ITCZ",
				"London only",
				"The ocean floor"
			], 1, "Warm, moist rise near the thermal equator."),
			q("The ITCZ walks because…", [
				"The Moon",
				"The subsolar latitude shifts with tilt through the year",
				"Tides",
				"Time zones"
			], 1, "Seasons move the heat. West African rains follow."),
			q("Ferrel cell is called indirect because…", [
				"It does not exist.",
				"It is driven by the cells either side, not just by local heating.",
				"It only works at night.",
				"It is underground."
			], 1, "School model. Real midlatitudes are stormier than a clean loop."),
			q("A 1-cell planet fails mainly because…", [
				"There is no Sun.",
				"Rotation (Coriolis) breaks the single loop into cells.",
				"Oceans freeze instantly.",
				"Albedo is 1."
			], 1, "Spin plus the size of Earth.")
		],
		why: [
			"ITCZ and West African rains, the Florida wet season, and a UK westerly year are this walk. One cell would send rise at the equator and sink at the pole; London would sit in a steady polar northerly and Florida would never see a season in the rain. Three cells are the planet we have: Hadley in the tropics, Ferrel in the midlatitudes, Polar at high latitude. GCSE names the cells. A-level and APES need the ITCZ as a moving rainband, not a painted equator. If pupils think the equator is always the wettest place, fixed, they will misread a June Florida convective afternoon and a January UK chart in the same breath. Play a year. Watch the thermal equator walk. Then put the UK in the Ferrel story, not in Hadley.",
			"On a non-rotating planet a single thermally direct cell could run from equator to pole. Earth rotates, Coriolis breaks that loop, and the school model is three cells each side of the equator. Hadley: rise near the thermal equator (ITCZ), poleward aloft, sink in the subtropics, return as the trades. Ferrel: the midlatitude indirect cell, driven more by the cells and the eddies either side than by local heating alone; real midlatitudes are storm tracks, not a clean classroom loop. Polar: rise near 60°, sink at the pole. The ITCZ is where the trades meet and air rises; it walks with the subsolar latitude through the year, so rain follows heat. Florida’s wet season is that walk in one peninsula. West African rains are the same walk on another coast. The UK sits in westerlies under the Ferrel story, not in Hadley; do not draw three equal cells, and do not park London on the equator. Toggle Three cells off to show the failed 1-cell planet, then on again. Play a year so the ITCZ is a traveller, not a tattoo.",
			"Toggle Three cells off for the 1-cell planet, then on. Space plays a year so the ITCZ walks. Arrow keys scrub the seasons; freeze on a solstice and ask where the rain went. L hides labels; make them name Hadley, Ferrel, Polar. R resets the year and the toggle. P is projector. This lab has a year clock: 1× 2× 4× if you need a faster walk. Share the URL on a June ITCZ over Florida’s latitude, then again in December, so the walk is a pair of links not a hand wave.",
			"If JavaScript or WebGL dies, the 2D fallback still shows the three loops. Teach from the steps: 1-cell failure, three names, ITCZ walks with the year. Check still asks where Hadley rises, why the ITCZ walks, why Ferrel is indirect, and why one cell fails. Print the teacher script. The glossary still names trades, subtropical high, and westerlies. You lose the globe tour, not the reason Florida wet season and UK westerlies are different cells. A board sketch of three loops can stand in for the year walk."
		],
		glossary: [
			{
				term: "Hadley cell",
				def: "Tropical thermally direct cell. Rise near the ITCZ, sink in the subtropics."
			},
			{
				term: "Ferrel cell",
				def: "Midlatitude cell, indirect in the school model, driven by the cells and storms either side."
			},
			{
				term: "Polar cell",
				def: "High-latitude cell. Rise near 60°, sink at the pole."
			},
			{
				term: "ITCZ",
				exam: "Intertropical convergence zone",
				def: "Belt where the trades meet and air rises. Walks with the seasons."
			},
			{
				term: "Trade winds",
				def: "Surface return of the Hadley cell, toward the ITCZ, deflected by Coriolis."
			},
			{
				term: "Subtropical high",
				def: "Belt of sinking air on the poleward side of Hadley. Deserts often sit under it."
			},
			{
				term: "Thermal equator",
				def: "Latitude of strongest heating, not always 0°. The ITCZ follows it."
			},
			{
				term: "Westerlies",
				def: "Midlatitude west-to-east winds. The UK’s usual steering, under the Ferrel story."
			}
		],
		misconception: {
			claim: "The equator is always the wettest place, fixed.",
			truth: "The rain follows the ITCZ, which walks with the seasons."
		},
		misconceptions: [
			{
				claim: "The equator is always the wettest place, fixed.",
				truth: "The rain follows the ITCZ, which walks with the seasons."
			},
			{
				claim: "The UK sits in the Hadley cell.",
				truth: "Hadley is tropical. The UK’s westerlies live in the midlatitude Ferrel story, storm tracks included."
			},
			{
				claim: "The three cells are equal in size and equally clean.",
				truth: "Hadley is the big thermally direct loop. Ferrel is indirect and stormy. Do not draw three matching doughnuts."
			}
		],
		cases: [{
			slug: "florida-insolation",
			label: "Florida wet season"
		}, {
			slug: "uk-daylength",
			label: "ITCZ and seasons"
		}],
		teacher: {
			script: "Toggle Three cells off. One cell: hot equator rise, pole sink.\nAsk why UK westerlies would not exist on that planet.\nToggle Three cells on. Name Hadley, Ferrel, Polar.\nPlay a year. The ITCZ walks with the subsolar latitude.\nThe equator is not always the wettest place, fixed. Rain follows the ITCZ.\nThat is the misconception.\nHadley is the tropical loop. Ferrel is the midlatitude indirect cell. Polar is the high-latitude loop.\nDo not draw three equal cells. Do not put the UK in the Hadley cell.\nWest African rains and the Florida wet season are this walk.\nFinish in Check.",
			pitfalls: [
				"Drawing three equal cells.",
				"Putting the UK in the Hadley cell.",
				"Teaching the ITCZ as a painted line on the equator.",
				"Selling Ferrel as a clean thermally direct loop."
			]
		},
		sources: [{ label: "NOAA circulation" }, { label: "Met Office tropical weather" }],
		controls: {
			time: "year",
			toggles: [{
				key: "three",
				label: "Three cells",
				defaultOn: true
			}]
		}
	}),
	lab({
		slug: "fronts",
		title: "Fronts as wedges",
		hook: "A cold front is a wedge, not a line on a TV map.",
		objective: "Distinguish warm, cold, and occluded fronts as 3D wedges with cloud and rain symbols.",
		realm: "atmosphere",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: [
			"KS3",
			"GCSE weather",
			"NGSS MS-ESS2-5"
		],
		steps: steps("Cold wedge undercuts. Warm wedge overruns. Clouds sit on the slope.", "Play the midlatitude system. Occlusion when the cold catches the warm.", "A front is a boundary with a slope. The map line is the surface trace."),
		questions: [
			q("A cold front is…", [
				"A vertical wall of cold",
				"A wedge of colder air undercutting warmer air",
				"A hurricane eye",
				"A sea breeze only"
			], 1, "Dense cold air makes a steep wedge. Rain often narrow and showery."),
			q("A warm front typically has…", [
				"A steeper wedge than cold",
				"A gentler slope, cloud thickening ahead",
				"No clouds",
				"Only snow"
			], 1, "Warm air rides up. Rain can be longer, lighter."),
			q("Occlusion means…", [
				"The Sun is blocked forever",
				"Cold front catches the warm front; warm air is lifted off the surface",
				"High pressure at the equator",
				"A tornado"
			], 1, "The comma tail of a mature midlatitude cyclone."),
			q("The line on a Met Office chart is…", [
				"The whole front, vertical from ground to space",
				"The surface trace of a sloping wedge; the weather sits on the slope",
				"A painted television graphic with no height",
				"Only valid in Florida"
			], 1, "The map is a cut at the ground. Clouds and rain are on the slope.")
		],
		why: [
			"UK midlatitude fronts and a US Midwest squall share the wedge idea, not the violence. A Met Office chart approaching London is a set of surface traces; the weather is on the slope above them. GCSE wants cold, warm, and occluded named and drawn. NGSS wants a boundary with height, not a felt-tip line. If pupils think a front is painted on the television, they will never put cloud ahead of a warm front or a narrow shower on a cold wedge, and they will call every UK rainband a hurricane. Build the wedge. Sit the rain on the slope. Then contrast a quiet UK warm front with a Midwest squall so the class keeps the geometry and drops the cinema.",
			"A front is a sloping boundary between air masses. The map line is where that wedge meets the ground: the surface trace. Dense cold air undercuts; the cold-front wedge is steep, so ascent is sharp and rain is often narrow and showery. Warm air overruns; the warm-front slope is gentler, so cloud thickens ahead and rain can be longer and lighter. Between them sits the warm sector. Occlusion is the cold front catching the warm front so the warm air is lifted off the surface: the comma tail of a mature midlatitude cyclone, not a tropical eyewall. A UK winter depression approaching London is this machine. A US Midwest squall can be a violent cold-front cousin; Sandy is a hybrid caution, not a reason to brand every UK rainband a hurricane. Do not teach fronts only as symbols on a key. Do not draw a vertical wall. Clouds sit on the slope because that is where the air is lifted. Play the system so occlusion is a catch, not a vocabulary word. A sea-breeze front is a tiny cousin of the same idea, kilometres not a depression.",
			"Space plays the midlatitude system so the cold wedge can catch the warm. Arrow keys freeze the occlusion for the board. L hides labels; ask where the rain sits before you reveal the slope. R resets the wedges. P is projector. Time is a process clock, not a year; the drive is Space to play, arrows to scrub, and a pause on the comma tail. Share the URL when the rainband sits on the cold slope, then again at occlusion, so the catch is a link the class can reopen after the bell.",
			"If JavaScript or WebGL dies, the 2D fallback still shows a wedge and a map line. Teach from the steps: cold undercuts, warm overruns, occlusion when the cold catches the warm. Check still names the steep wedge, the gentle slope, the catch, and the surface trace. Print the teacher script. The glossary still carries warm sector, surface trace, and squall line. You lose the 3D rainband, not the reason a Met Office line is not a wall. A paper cross-section of two wedges can stand in for the canvas; sit the cloud on the slope, not on the ink."
		],
		glossary: [
			{
				term: "Cold front",
				def: "Leading edge of colder air. Steeper wedge. Rain often narrow and showery."
			},
			{
				term: "Warm front",
				def: "Leading edge of warmer air. Gentler slope. Cloud thickening ahead."
			},
			{
				term: "Occlusion",
				exam: "Occluded front",
				def: "Cold front catching a warm front; warm air lifted off the surface."
			},
			{
				term: "Warm sector",
				def: "The milder air between the warm front and the cold front in a midlatitude cyclone."
			},
			{
				term: "Surface trace",
				def: "Where the sloping front meets the ground. The line on the chart."
			},
			{
				term: "Air mass",
				def: "A large body of air with fairly even temperature and humidity, sitting on a source region."
			},
			{
				term: "Squall line",
				def: "A narrow, often violent band of convection, commonly along or ahead of a cold front."
			}
		],
		misconception: {
			claim: "A front is a painted line.",
			truth: "The line is where the wedge meets the ground. The weather is on the slope."
		},
		misconceptions: [
			{
				claim: "A front is a painted line.",
				truth: "The line is where the wedge meets the ground. The weather is on the slope."
			},
			{
				claim: "A cold front is a vertical wall of cold.",
				truth: "It is a steep wedge. Dense air undercuts. Rain sits on the slope, often narrow and showery."
			},
			{
				claim: "Every UK rainband is a hurricane.",
				truth: "A midlatitude front is a different machine from a tropical eyewall. Share the wedge idea, not the violence."
			}
		],
		cases: [{
			slug: "uk-sea-breeze",
			label: "UK midlatitude front"
		}, {
			slug: "katrina-sandy",
			label: "US Midwest squall / Sandy contrast"
		}],
		teacher: {
			script: "Build the cold wedge. Dense cold air undercuts. The slope is steep.\nAsk where the rain is. It sits on the slope, often narrow and showery.\nThen the warm wedge. Gentler slope, cloud thickening ahead.\nA front is not a painted line on a television map. The line is the surface trace.\nThe weather is on the slope. That is the misconception.\nPlay the midlatitude system. Occlusion when the cold catches the warm.\nWarm air is lifted off the surface. That is the comma tail of a mature cyclone.\nUK midlatitude fronts and a US Midwest squall share the wedge idea, not the violence.\nDo not call every UK rainband a hurricane.\nFinish in Check.",
			pitfalls: [
				"Teaching fronts only as symbols.",
				"Calling every UK rainband a hurricane.",
				"Drawing a cold front as a vertical wall.",
				"Putting all the weather on the map line instead of on the slope."
			]
		},
		sources: [{ label: "Met Office fronts" }, { label: "NOAA weather systems" }],
		controls: { time: "none" }
	}),
	lab({
		slug: "cyclone-anticyclone",
		title: "Cyclone and anticyclone",
		hook: "A midlatitude cyclone is a spinning comma of fronts, not a hurricane.",
		objective: "Contrast a NH cyclone (anticlockwise, low) with an anticyclone (clockwise, high), and attach fronts to the low.",
		realm: "atmosphere",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: [
			"KS3",
			"GCSE weather",
			"NGSS MS-ESS2-5"
		],
		steps: steps("Low in the middle, isobars, anticlockwise in NH. Fronts on the comma.", "Toggle anticyclone: high, clockwise, sinking, often clearer.", "Names: depression / cyclone vs anticyclone. Tropical cyclones are a later lab."),
		questions: [
			q("In the northern hemisphere a midlatitude cyclone spins…", [
				"Clockwise",
				"Anticlockwise",
				"Not at all",
				"Only vertically"
			], 1, "In toward the low, deflected right → anticlockwise."),
			q("An anticyclone is associated with…", [
				"A surface low and rising air",
				"A surface high and sinking air, often clearer skies",
				"Always a hurricane",
				"The ITCZ only"
			], 1, "Sink, compress, warm, dry. Not a guarantee of sunshine in a British winter fog."),
			q("A UK winter depression is…", [
				"A tropical cyclone",
				"A midlatitude cyclone with fronts",
				"An anticyclone",
				"A sea breeze"
			], 1, "Different machine from a hurricane."),
			q("Clockwise surface flow around a high in the northern hemisphere is…", [
				"A midlatitude cyclone",
				"An anticyclone: high, sinking, often clearer",
				"A hurricane eye",
				"Only a UK sea breeze"
			], 1, "High, clockwise in NH. The low is the other way.")
		],
		why: [
			"Do not call a UK windy day a hurricane unless the Met Office does. A winter depression approaching London is a midlatitude cyclone: a low, a comma of fronts, anticlockwise in the northern hemisphere. An anticyclone is the other machine: high, clockwise, sinking, often clearer, and still able to sit a freezing fog over a British morning. Sandy is a hybrid caution, not a licence to mix the words. GCSE wants depression versus anticyclone and the spin. NGSS wants low versus high and why one rains. Phoenix heat is not this lab; Florida’s hurricane is a later engine. If pupils hear cyclone and see an eyewall, they will misread every Met Office chart. Name the family. Then name the member.",
			"In the northern hemisphere, air flows in toward a surface low and Coriolis deflects it right, so the cyclone spins anticlockwise. Fronts attach to that low as a comma: warm front, cold front, then occlusion as the system matures. That is a midlatitude cyclone, a depression in UK exam language, extra-tropical in adult charts. It is not a tropical cyclone. Tropical cyclones have an eye and an eyewall and live on warm ocean; they are a later lab. Toggle anticyclone and the centre is a high: air sinks, compresses, warms, and dries, so skies are often clearer, and the NH spin is clockwise. Sinking is not a guarantee of sunshine in a British winter anticyclone; fog and stratus can sit under the lid. Southern-hemisphere spin flips; do not mix the diagrams. Ask which one rains. The low, usually, if the fronts are working. A UK sea breeze is a local thermal loop, not a cyclone. Phoenix heat is a budget story, not a spinning comma. Keep the word cyclone as the family, then attach midlatitude or tropical so the third row cannot swap the machines.",
			"Leave Anticyclone off to start. Space plays the comma so the fronts rotate with the low. Arrow keys freeze a spoke for the board. L hides labels; ask for spin before you reveal. R resets the toggle. P is projector. Toggle Anticyclone on for the high, clockwise, sinking story, then off again so the depression is the default. Time is a process clock, not a year. Share the URL on the low, then on the high, and do not leave both stories unnamed when the class walks out.",
			"If JavaScript or WebGL dies, the 2D fallback still shows a low and a high. Teach from the steps: anticlockwise comma with fronts, then the anticyclone. Check still names northern-hemisphere spin, sinking under a high, and why a UK depression is not a hurricane. Print the teacher script. The glossary still carries depression, comma cloud, and extra-tropical. You lose the rotating comma, not the vocabulary. A Met Office chart can stand in for the canvas; point at the low, then at the high, and refuse the word hurricane unless it is earned."
		],
		glossary: [
			{
				term: "Cyclone",
				def: "Low-pressure system. Midlatitude: fronts. Tropical: eye and eyewall, a later lab."
			},
			{
				term: "Anticyclone",
				def: "High-pressure system. Sinking air, often clearer, not a sunshine guarantee in winter fog."
			},
			{
				term: "Depression",
				def: "UK exam name for a midlatitude cyclone."
			},
			{
				term: "Convergence",
				def: "Air flowing together. At a surface low it feeds rise."
			},
			{
				term: "Divergence",
				def: "Air spreading apart. Aloft over a low, or at the surface of a high."
			},
			{
				term: "Comma cloud",
				def: "The satellite signature of a mature midlatitude cyclone, fronts on the tail."
			},
			{
				term: "Extra-tropical",
				def: "Outside the tropics. A midlatitude depression is extra-tropical; a hurricane is not."
			}
		],
		misconception: {
			claim: "Cyclone means hurricane.",
			truth: "Cyclone is the family. Tropical cyclone is one member. Midlatitude depressions are another."
		},
		misconceptions: [
			{
				claim: "Cyclone means hurricane.",
				truth: "Cyclone is the family. Tropical cyclone is one member. Midlatitude depressions are another."
			},
			{
				claim: "High pressure always means sunshine.",
				truth: "Sink, compress, warm, dry: often clearer. A British winter anticyclone can still sit fog and stratus under the lid."
			},
			{
				claim: "Northern- and southern-hemisphere cyclones spin the same way.",
				truth: "NH cyclone anticlockwise, SH cyclone clockwise. Flip the hemisphere and the diagram must flip."
			}
		],
		cases: [{
			slug: "uk-sea-breeze",
			label: "UK depression"
		}, {
			slug: "katrina-sandy",
			label: "Sandy as a hybrid caution"
		}],
		teacher: {
			script: "Leave Anticyclone off. Low in the middle, isobars, anticlockwise in the northern hemisphere.\nAttach the fronts on the comma. This is a midlatitude cyclone, a depression.\nCyclone does not mean hurricane. That is the misconception.\nCyclone is the family. Tropical cyclone is one member. Midlatitude depressions are another.\nToggle Anticyclone on. High, clockwise in the northern hemisphere, sinking, often clearer.\nSink, compress, warm, dry. Not a guarantee of sunshine in a British winter fog.\nAsk which one rains. The low, usually, if the fronts are working.\nA UK winter depression is this machine, not an eyewall.\nDo not mix northern- and southern-hemisphere spin. Names matter more than the word cyclone alone.\nFinish in Check.",
			pitfalls: [
				"NH/SH spin mix-up.",
				"One word ‘cyclone’ for two machines.",
				"Promising sunshine under every anticyclone.",
				"Calling a UK gale a hurricane without the Met Office."
			]
		},
		sources: [{ label: "Met Office depressions" }, { label: "NOAA extra-tropical" }],
		controls: {
			time: "none",
			toggles: [{
				key: "anti",
				label: "Anticyclone"
			}]
		}
	}),
	lab({
		slug: "climate-types",
		title: "Climate types",
		hook: "Köppen is a map of plants pretending to be a map of weather. The tiles are biomes with a temperature–rain story.",
		objective: "Match a Köppen letter to a simple 3D biome and say what temperature and rainfall are doing.",
		realm: "atmosphere",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS",
			"APES"
		],
		curriculum: [
			"GCSE climate",
			"NGSS MS-ESS2-6",
			"APES 4.7"
		],
		steps: steps("Orbit the globe of biome tiles. A is tropical, B dry, C temperate, D continental, E polar.", "Select a tile. The 3D biome on the bench is that climate, not a postcard.", "Köppen is a classification, not a forecast. Boundaries are fuzzy. Mountains punch holes in the map."),
		questions: [
			q("Köppen A climates are…", [
				"Polar ice",
				"Tropical, no real winter",
				"Deserts only",
				"Tundra"
			], 1, "Warm all year. Rain amount splits rainforest from savanna."),
			q("A B climate is dry because…", [
				"It is always cold",
				"Evaporation can beat rainfall — desert and steppe",
				"It sits on a mid-ocean ridge",
				"The Moon"
			], 1, "Hot deserts and cold deserts both live here."),
			q("London is roughly…", [
				"Af rainforest",
				"Cfb — temperate, no dry season, warm summer",
				"ET tundra",
				"BW Sahara"
			], 1, "School map, not a street-by-street verdict."),
			q("Why is Köppen useful in this lab?", [
				"It predicts next Tuesday",
				"It ties climate to biomes you can picture",
				"It replaces plates",
				"It is a tide table"
			], 1, "Plants are a slow rain-and-temperature instrument.")
		],
		why: [
			"Florida wet season versus UK Cfb versus Arizona BWh are the same legend with different tiles. London is roughly Cfb: temperate, no dry season, warm summer. Phoenix sits in a hot dry B climate where evaporation can beat rain. Florida’s humid tropical edge is an A-story with a wet season, not a postcard. GCSE climate and APES both need a map that is not a colouring book: letters tied to temperature and rainfall, then to a biome you can picture. If pupils think climate is the weather this week, one hot July makes the UK tropical and one Phoenix storm makes a rainforest. Köppen classifies the longer pattern. Weather is the day. Hold both sentences, then walk Cairngorm altitude as a hole punched in the London tile.",
			"Köppen letters start with a temperature family: A tropical, no real winter; B dry, where evaporation can beat rainfall; C temperate; D continental, hard winter; E polar. Second letters split rain: f no dry season, w dry winter, s dry summer, W desert, S steppe. London Cfb is mild, wet-enough all year, warm summer, not a Mediterranean Cs and not an Af rainforest. Phoenix BWh is hot desert. Florida’s peninsula runs humid subtropical toward tropical, with a wet season that is an ITCZ-and-convection story, not a Köppen forecast of next Tuesday. Plants are a slow rain-and-temperature instrument, which is why the globe is tiled with biomes: rainforest, desert, temperate forest, grassland, tundra. Boundaries are fuzzy. Mountains and coasts punch holes in the map. A Cairngorm plateau is not London’s Cfb written larger; altitude and snow change the tile. Denver’s mile-high steppe-edge is another hole. Köppen is a classification, not law at a school field, and not a GCM. Scrub the biome slider. For each tile ask rain or temperature first, then name the letter. One hot week does not move London into A.",
			"Orbit the globe of tiles. Space is quiet here; the drive is the Biome slider, 0 to 4, plus the keys the rest of TerraLens already taught. Arrow keys still nudge time if anything is walking. L hides labels; cover the letter and make them name tropical, dry, temperate, continental, polar. R resets the slider. P is projector. Click through London, Phoenix, a polar tile. Share the URL on Cfb, then on BWh, and ask what rain and temperature are doing before you reveal the postcard.",
			"If JavaScript or WebGL dies, the 2D fallback still shows the tiles. Teach from the steps: A to E, then one biome on the bench, then classification not forecast. Check still asks what A is, why B is dry, what London is, and why Köppen is useful. Print the teacher script. The glossary still names Cfb, BWh, and continentality. You lose the 3D biome, not the reason one hot July does not make the UK tropical. A printed Köppen map can stand in for the globe; point at London, Phoenix, and Florida, and refuse the postcard."
		],
		glossary: [
			{
				term: "Köppen",
				def: "A climate classification using temperature and precipitation, often mapped to biomes."
			},
			{
				term: "Biome",
				def: "A large-scale living landscape (rainforest, desert, tundra) written by climate plus more."
			},
			{
				term: "Cfb",
				def: "Temperate, no dry season, warm summer. London’s usual school letter, not a street verdict."
			},
			{
				term: "BWh",
				def: "Hot desert. Evaporation beats rainfall. Phoenix / Arizona desert in the school map."
			},
			{
				term: "Af",
				def: "Tropical rainforest. No real winter, no dry season."
			},
			{
				term: "Continentality",
				def: "How much a place’s temperature range is set by inland position rather than ocean."
			},
			{
				term: "Climate",
				def: "The longer pattern of temperature and rain. Weather is the day."
			}
		],
		misconception: {
			claim: "Climate is the weather this week.",
			truth: "Climate is the longer pattern. Weather is the day. Köppen classifies the pattern."
		},
		misconceptions: [
			{
				claim: "Climate is the weather this week.",
				truth: "Climate is the longer pattern. Weather is the day. Köppen classifies the pattern."
			},
			{
				claim: "The UK is tropical because one July is hot.",
				truth: "London is roughly Cfb. One hot week does not move the letter. Climate is the pattern, not the headline."
			},
			{
				claim: "Köppen boundaries are sharp lines on the ground.",
				truth: "Boundaries are fuzzy. Mountains, coasts, and altitude punch holes. Not law at a school field."
			}
		],
		cases: [{
			slug: "florida-insolation",
			label: "Florida tropical / humid"
		}, {
			slug: "uk-daylength",
			label: "UK temperate"
		}],
		teacher: {
			script: "Name A to E: tropical, dry, temperate, continental, polar.\nScrub the Biome slider. Each tile is a climate with a 3D biome on the bench, not a postcard.\nClick through London, Nairobi, Phoenix, a polar tile. For each, ask rain or temperature first.\nClimate is not the weather this week. Köppen classifies the longer pattern.\nThat is the misconception.\nLondon is roughly Cfb: temperate, no dry season, warm summer. One hot July does not make the UK tropical.\nBoundaries are fuzzy. Mountains and coasts punch holes in the map.\nKöppen is a classification, not a forecast and not law at a school field.\nPlants are a slow rain-and-temperature instrument.\nFinish in Check.",
			pitfalls: [
				"Treating the map as law at a school field.",
				"Calling the UK tropical because one July is hot.",
				"Teaching weather this week as climate.",
				"Drawing Köppen boundaries as fences on the playground."
			]
		},
		sources: [{ label: "Köppen–Geiger maps (Beck et al.)" }, { label: "Met Office UK climate" }],
		controls: {
			time: "none",
			extra: [{
				key: "biome",
				label: "Biome",
				min: 0,
				max: 4,
				step: 1,
				default: 2
			}]
		}
	})
];
var HAZARD_LABS = [
	lab({
		slug: "earthquakes",
		title: "Earthquakes",
		hook: "Focus is in the rock. Epicentre is the map dot. P, then S, then the surface wave that does the damage in town.",
		objective: "Place focus and epicentre and watch P, S, and surface waves.",
		realm: "hazards",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS",
			"HS Earth Sci"
		],
		curriculum: ["GCSE AQA 3.1.1.4", "NGSS MS-ESS3-2"],
		steps: steps("Focus at depth. Epicentre above.", "Play P (fast), S (shear), surface.", "S dies in liquid — interior lab."),
		questions: [
			q("The focus (hypocentre) is…", [
				"The map dot",
				"The point of slip in the rock",
				"The Moon",
				"Always at 0 km"
			], 1, "Epicentre is the surface point above."),
			q("P-waves…", [
				"Are slowest",
				"Are fastest and travel through solid and liquid",
				"Are only sound in air",
				"Need water"
			], 1, "Primary."),
			q("Surface waves…", [
				"Arrive first",
				"Often do the damage at the surface, arriving later",
				"Are P-waves",
				"Only exist in space"
			], 1, "Love and Rayleigh."),
			q("Magnitude versus intensity…", [
				"They are the same number",
				"Magnitude is the source size; intensity is what a place feels",
				"Intensity is only at the focus",
				"Magnitude is rainfall"
			], 1, "Keep it qualitative here. One is the machine. One is the town.")
		],
		why: [
			"San Andreas and Cascadia teach the same waves on different machines. The San Andreas is a transform: Pacific plate northwest, North American southeast, strike-slip you can walk on the Carrizo Plain. 1906 San Francisco and 1989 Loma Prieta are this boundary in living memory. Cascadia is a megathrust: Juan de Fuca diving under North America, a locked subduction zone with a 1700 earthquake dated from Japanese tsunami records and drowned forests. Same P, S and surface waves. Different fault, different depth story, different tsunami story. GCSE AQA 3.1.1.4 and NGSS MS-ESS3-2 both need focus versus epicentre before anyone colours a shake map. UK students will not feel these plates under the desk; they will meet them on the paper. Hawaii and Iceland are volcano labs. Katrina and Sandy are water and wind. This lab is slip in the rock and the three-wave sequence that follows. Map dot is not the underground spark.",
			"Slip starts at the focus, also called the hypocentre: a point (really a patch) in the rock. The epicentre is the surface point vertically above it, the map dot, not a cave. Elastic strain stored on a locked fault becomes kinetic energy and heat when the fault slips. Body waves leave first. P-waves are compressional, fastest, and travel through solid and liquid — primary, the first arrival. S-waves are shear, slower, and die in liquid; that fact is the outer-core argument in the interior lab, reused here as a reminder. Surface waves (Love and Rayleigh) travel along the free surface, arrive later, and often do the damage in town because they shake the ground where buildings sit. Play in this lab: P shell grows, then S, then a surface ring and a ripple on the top face. Magnitude is a source-size scale. Intensity is what a place feels — distance, geology, building. Keep that pair qualitative. San Andreas creep versus locked segments, Cascadia’s long recurrence, shallow versus deep: all of that sits on top of focus, epicentre, P, S, surface. Get those five words right and the case pages can work.",
			"Play from t = 0. A glowing focus sits inside the block. A cool marker on the top face is the epicentre, joined by a vertical line. P expands as a fast shell. S follows, slower, shearing the block. Then a surface ring and a ripple on the ground, and later a couple of toppled boxes as damage. Orbit so you can see that the epicentre is on the map, not underground. Pause after P and ask who arrived first. Step the camera down to the focus, then up to the epicentre. Labels: Focus, Epicentre, P, S, Surface, Damage. San Andreas and Cascadia are the locators after the sequence, not before it.",
			"Without the canvas the sequence is still the lesson. Focus (hypocentre) is the point of slip in the rock. Epicentre is the surface point above it, the map dot, not underground. P-waves are fastest and travel through solid and liquid. S-waves shear and die in liquid. Surface waves arrive later and often do the damage in town. Magnitude is the source; intensity is what a place feels. San Andreas is transform; Cascadia is subduction. Same waves, different machine. Do not put the epicentre in a cave."
		],
		glossary: [
			{
				term: "Focus",
				exam: "Hypocentre",
				def: "Where the slip starts in the rock."
			},
			{
				term: "Epicentre",
				def: "Surface point vertically above the focus. The map dot."
			},
			{
				term: "P-wave",
				exam: "Primary wave",
				def: "Fastest body wave. Compressional. Travels through solid and liquid."
			},
			{
				term: "S-wave",
				exam: "Secondary wave",
				def: "Shear body wave. Slower than P. Dies in liquid."
			},
			{
				term: "Surface wave",
				def: "Love and Rayleigh waves along the free surface. Often the damage in town."
			},
			{
				term: "Magnitude",
				def: "A scale for source size. Not the same as intensity."
			},
			{
				term: "Intensity",
				def: "What a place feels, given distance, ground and buildings."
			}
		],
		misconception: {
			claim: "The epicentre is underground.",
			truth: "Epicentre is on the map. Focus is in the rock."
		},
		misconceptions: [
			{
				claim: "The epicentre is underground.",
				truth: "Epicentre is on the map. Focus is in the rock."
			},
			{
				claim: "The biggest wave arrives first.",
				truth: "P arrives first. Surface waves come later and often do the damage."
			},
			{
				claim: "Magnitude and intensity are the same number.",
				truth: "One is the source. One is what a town feels."
			}
		],
		cases: [{
			slug: "san-andreas",
			label: "San Andreas"
		}, {
			slug: "cascadia",
			label: "Cascadia"
		}],
		teacher: {
			script: "Place the focus in the rock. That is the hypocentre, where slip starts.\nThe epicentre is the map dot above it, on the surface, not underground.\nThat is the misconception.\nFire the waves. P first: fastest, through solid and liquid.\nThen S: shear. S dies in liquid — the interior lab.\nThen the surface wave. It arrives later and often does the damage in town.\nAsk who arrives first. P. Ask what knocks the boxes. Surface.\nKeep magnitude versus intensity qualitative here. One is the source. One is what a place feels.\nSan Andreas and Cascadia: same waves, different machine. Transform versus megathrust.\nFinish in Check.",
			pitfalls: [
				"Magnitude vs intensity mix-up — keep it qualitative here.",
				"Epicentre drawn as a cave.",
				"S-waves through the outer core in this lab’s story.",
				"Calling every California quake a subduction event."
			]
		},
		sources: [{ label: "USGS earthquakes" }, { label: "BGS seismology" }],
		controls: { extra: [{
			key: "depth",
			label: "Focus depth",
			min: 0,
			max: 1,
			step: .01,
			default: .45
		}] }
	}),
	lab({
		slug: "volcanoes",
		title: "Volcanoes",
		hook: "Viscosity is the plot. Shield, strato, rift — three shapes from one slider.",
		objective: "Contrast shield, stratovolcano, and rift; use a viscosity slider.",
		realm: "hazards",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: ["GCSE AQA 3.1.1.3", "NGSS MS-ESS2-2"],
		steps: steps("Low viscosity: shield. High: strato. Rift: fissure.", "Slide viscosity.", "Hawaii vs St Helens vs Iceland fissure."),
		questions: [
			q("Shield volcanoes form from…", [
				"High-viscosity rhyolite only",
				"Low-viscosity basalt, long flows, gentle slopes",
				"Only ice",
				"Wind"
			], 1, "Mauna Loa."),
			q("Stratovolcanoes are steep because…", [
				"They are older hills",
				"Stickier, gassier magma builds layers of lava and ash",
				"Tides",
				"They are dunes"
			], 1, "Cascades."),
			q("A rift eruption…", [
				"Needs a hotspot always",
				"Can be a fissure of basalt at a divergent boundary",
				"Is a hurricane",
				"Is a meander"
			], 1, "Iceland."),
			q("Sticky magma explodes more readily because…", [
				"It is colder than space",
				"Gas cannot escape easily, so pressure builds",
				"It is always underwater",
				"Tides trap it"
			], 1, "Runny basalt degasses and pours. Viscosity is the plot.")
		],
		why: [
			"Viscosity is the plot, not ‘bigger boom’ as a personality trait. Hawaii’s Mauna Loa and Kīlauea are shields: low-viscosity basalt, long flows, gentle slopes on a hotspot under an oceanic plate. Cascadia’s arc — St Helens, Rainier, Hood — is the sticky end-member: water from the slab, andesite and dacite, layers of lava and ash, steep cones. Iceland sits on the Mid-Atlantic Ridge plus a plume: usually basalt fissures you can walk at places like Thingvellir, and occasional explosive events when ice and evolved magma meet, as in Eyjafjallajökull 2010. GCSE AQA 3.1.1.3 and NGSS want that contrast without a league table of famous eruptions. San Andreas does not make this chain; it slides. Katrina and Sandy are a different hazard. One slider, three shapes: shield, strato, rift. UK students meet these as named case studies, not as a local cone. The chemistry and the gas decide the slope. The poster that says all volcanoes explode has already failed the lab.",
			"Magma is silicate liquid plus crystals plus dissolved gas. Viscosity is resistance to flow. Low silica, hot, crystal-poor basalt is runny: gas escapes, lava travels far, the edifice spreads into a shield. High silica, cooler, stickier melts hold gas. Pressure builds, fragmentation makes ash, and the cone steepens as lava and pyroclasts stack: a stratovolcano, a composite cone. A divergent boundary can skip the cone and erupt along a fissure — Iceland’s ridge habit, not a cartoon cube. Hotspot versus arc versus ridge is the setting; viscosity is still the plot inside the conduit. Water from a subducting slab lowers melting point in the mantle wedge and tends to give the Cascades their sticky, explosive character. A plume under ocean crust, Hawaii, tends to give basalt. Ice on a central volcano can add ash even when the ridge itself is basaltic. Supervolcano headlines are not a course. Yellowstone is a continental hotspot, a different lab. Here the crater and channel stay while the slope steepens as you raise the slider. Ask why sticky explodes and runny pours. That question is the mechanism.",
			"Leave Viscosity low. This is a shield: a crater, a wide slope, low-viscosity basalt. Drop it further and a fissure opens — Iceland’s habit, not a cube. Raise the slider. The same conduit steepens into a stratovolcano. Keep going and an ash column appears only because the melt is sticky. Slice or step to the conduit: magma is a path, not a random cone. Name Hawaii, Iceland, Cascades after the shapes, not before. Orbit. Then sit down in Check.",
			"Without the canvas viscosity is still the plot. Shield volcanoes: low-viscosity basalt, long flows, gentle slopes — Hawaii. Stratovolcanoes: stickier, gassier magma, layers of lava and ash, steep cones — Cascadia’s arc. A rift eruption can be a basalt fissure at a divergent boundary — Iceland. Not all volcanoes explode. Basalt often pours. Explosions need gas and stickiness. San Andreas is a slide, not this chain. One slider, three shapes. Do not teach supervolcano headlines as the whole course. Viscosity still decides the shape."
		],
		glossary: [
			{
				term: "Viscosity",
				def: "Resistance to flow. High viscosity plus gas makes explosive eruptions more likely."
			},
			{
				term: "Shield volcano",
				def: "Broad, gentle edifice from low-viscosity basalt. Mauna Loa type."
			},
			{
				term: "Stratovolcano",
				exam: "Composite cone",
				def: "Steep cone of lava and ash from stickier magma. Cascades type."
			},
			{
				term: "Fissure eruption",
				def: "Magma erupting along a crack, often basalt at a rift. Iceland habit."
			},
			{
				term: "Basalt",
				def: "Low-silica, typically runny lava. Builds shields and many rift flows."
			},
			{
				term: "Conduit",
				def: "The path magma takes through the edifice. Not a random cone."
			},
			{
				term: "Pyroclastic",
				def: "Fragmented material from explosive eruption: ash, pumice, blocks."
			}
		],
		misconception: {
			claim: "All volcanoes explode.",
			truth: "Basalt often pours. Explosions need gas and stickiness."
		},
		misconceptions: [
			{
				claim: "All volcanoes explode.",
				truth: "Basalt often pours. Explosions need gas and stickiness."
			},
			{
				claim: "Bigger volcano means bigger boom.",
				truth: "Viscosity and gas set the style. Shields can be huge and quiet-ish."
			},
			{
				claim: "Every volcano sits on the Ring of Fire.",
				truth: "Hawaii is a hotspot. Iceland is a ridge plus a plume."
			}
		],
		cases: [{
			slug: "hawaii",
			label: "Hawaii shields"
		}, {
			slug: "iceland",
			label: "Iceland rift"
		}],
		teacher: {
			script: "Slider low. This is a shield: low viscosity basalt, a crater, a wide slope. Hawaii.\nDrop viscosity further. A fissure opens. Iceland is this, not a cartoon cube.\nRaise viscosity. The same conduit steepens into a stratovolcano. Cascades, St Helens.\nKeep raising. An ash column appears only when magma is sticky.\nSlice or step to the conduit. Magma is a path, not a random cone.\nAsk why sticky magma explodes and runny magma pours. Viscosity is the plot.\nAll volcanoes do not explode. Basalt often pours. Explosions need gas and stickiness.\nThat is the misconception.\nDo not teach supervolcano headlines as the whole course. Do not put San Andreas under a cone.\nFinish in Check.",
			pitfalls: [
				"Supervolcano headlines as the whole course.",
				"All volcanoes explode.",
				"Ring of Fire as the only address.",
				"Shields called worn-down stratovolcanoes."
			]
		},
		sources: [{ label: "USGS volcanoes" }, { label: "IMO" }],
		controls: {
			time: "none",
			extra: [{
				key: "visc",
				label: "Viscosity",
				min: 0,
				max: 1,
				step: .01,
				default: .25
			}]
		}
	}),
	lab({
		slug: "tsunami",
		title: "Tsunami",
		hook: "Seafloor slip lifts a water column. In deep water the wave is fast and low. At the coast it stands up.",
		objective: "Play seafloor slip to a coastal wave.",
		realm: "hazards",
		ages: [
			"GCSE",
			"NGSS MS",
			"HS Earth Sci"
		],
		curriculum: ["GCSE", "NGSS MS-ESS3-2"],
		steps: steps("Slip. The column lifts.", "The wave races. Amplitude small at sea.", "Shallow water: slower, taller."),
		questions: [
			q("A tsunami starts with…", [
				"Wind swell",
				"A sudden shift of the water column, often seafloor slip",
				"A tide",
				"A sea breeze"
			], 1, "Not a wind wave."),
			q("In deep water a tsunami is…", [
				"A 30 m wall everywhere",
				"Fast and often unnoticed at sea",
				"Stationary",
				"Only in rivers"
			], 1, "Ships may not feel it."),
			q("It grows at the coast because…", [
				"The Moon",
				"Shoaling: energy in a shallower, slower water column",
				"Albedo",
				"Coriolis only"
			], 1, "Green’s law as a story, not a formula dump."),
			q("Katrina and Sandy’s water at the coast was…", [
				"A megathrust tsunami",
				"Storm surge from wind and pressure, not seafloor slip",
				"A spring tide only",
				"A lava delta"
			], 1, "Different machine. Cascadia is the tsunami drill.")
		],
		why: [
			"A tsunami is a long-period wave from a sudden displacement of the water column, most often seafloor slip on a megathrust. Cascadia is the North American drill: Juan de Fuca under North America, a 1700 wave written in Japanese records and in drowned coastal forests. Schools on that coast practise a vertical evacuation for a reason. Hawaii feels distant Pacific tsunamis; Iceland’s ridge is usually the wrong machine. San Andreas is mostly strike-slip: it shakes, it does not typically lift a whole water column. Katrina and Sandy pushed water by wind and pressure — storm surge, a different hazard that still floods a city. Holderness and the 1953 North Sea flood are UK surge and wave attack, not a megathrust. GCSE and NGSS both need that split: displacement wave versus wind sea versus tide. Do not call a UK gale a tsunami. Do not call a hurricane a tsunami. The physics is a lifted column, a fast low wave at sea, a tall slow wave at the coast.",
			"Start with slip. A patch of seafloor jumps up (or down). The whole water column above it moves. That is the source, not a gust and not the Moon. In deep water the wavelength is huge, the amplitude is small, and the speed is high — ships may not notice. Energy is in the column, not in a wind-chopped surface. As the wave enters shallow water it shoals: speed falls roughly with the square root of depth, wavelength shortens, amplitude grows. Green’s law is that story, not a formula dump for KS3. The wave that was a ripple at sea can stand up at a harbour. Bay shape, shelf width and drawdown before the crest all matter; this lab is the cross-section, not a run-up atlas. A storm surge is wind piled against a coast plus a pressure set-up. A tide is gravity of Moon and Sun. A tsunami is displacement. Three water-level machines. Cascadia is the first. Katrina and Sandy are the second. Do not file 1953 under the first. Holderness till cliffs are ordinary storm waves plus a budget, another lab. Keep the verbs: lift, race, shoal, flood.",
			"Play from the start. The seafloor block lifts; the water column follows. Watch the pulse race across deep water: fast and low. As it reaches the shelf it slows and stands up — shoaling. Labels: Seafloor slip, Deep = fast and low, Shoaling. Orbit between the profile and the plan if both are in view. Pause at sea and ask whether a ship would feel a wall; it would not. Pause at the coast and name why it grew. Contrast once with surge: Sandy is wind and pressure, not this slip. Cascadia drills are this lab. Then sit down.",
			"Without the canvas the machine is still displacement, not wind. Seafloor slip lifts a water column. In deep water a tsunami is fast and low, often unnoticed at sea. At the coast it shoals: slower, taller, energy in a shallower column. It is not a wind storm surge. Surge is wind and pressure. Tide is the Moon and Sun. Tsunami is a sudden shift of water, often a megathrust. Cascadia is the drill. Katrina and Sandy are surge. Do not call the 1953 North Sea flood a tsunami. Green’s law is the story, not a formula dump."
		],
		glossary: [
			{
				term: "Tsunami",
				def: "Long-period wave from a sudden water displacement, often seafloor slip."
			},
			{
				term: "Shoaling",
				def: "Wave slowing and growing as it enters shallow water."
			},
			{
				term: "Storm surge",
				def: "Sea-level rise from wind pile-up and low pressure. Not a tsunami."
			},
			{
				term: "Megathrust",
				def: "The big subduction fault. Cascadia’s tsunami source."
			},
			{
				term: "Wavelength",
				def: "Crest to crest. A tsunami’s is huge in deep water."
			},
			{
				term: "Drawdown",
				def: "Sea pulling back before some tsunami crests. Not a reliable gift of time."
			},
			{
				term: "Run-up",
				def: "How high the water reaches on land. Not the same as deep-water amplitude."
			}
		],
		misconception: {
			claim: "A tsunami is a wind storm surge.",
			truth: "Different machine. Surge is wind and pressure. Tsunami is displacement."
		},
		misconceptions: [
			{
				claim: "A tsunami is a wind storm surge.",
				truth: "Different machine. Surge is wind and pressure. Tsunami is displacement."
			},
			{
				claim: "A tsunami is a 30 m wall everywhere, including mid-ocean.",
				truth: "In deep water it is fast and low. It stands up at the coast."
			},
			{
				claim: "The 1953 North Sea flood was a tsunami.",
				truth: "It was a storm surge. Wrong machine."
			}
		],
		cases: [{
			slug: "cascadia",
			label: "Cascadia"
		}, {
			slug: "katrina-sandy",
			label: "Surge is not tsunami"
		}],
		teacher: {
			script: "Play the seafloor slip. The water column lifts.\nThe wave races. In deep water it is fast and low, often unnoticed at sea.\nShallow water: slower, taller. Shoaling: energy in a shallower, slower water column.\nA tsunami is not a wind storm surge. Surge is wind and pressure. Tsunami is displacement.\nThat is the misconception.\nDo not call the 1953 North Sea flood a tsunami.\nCascadia drills are this lab. Holderness is a different wave.\nSandy is surge, not tsunami. Contrast them once.\nGreen’s law is the story, not a formula dump.\nFinish in Check.",
			pitfalls: [
				"Calling 1953 North Sea a tsunami.",
				"A mid-ocean wall in every drawing.",
				"Surge and tsunami as synonyms.",
				"Tide and tsunami mixed because both change water level."
			]
		},
		sources: [{ label: "NOAA tsunami" }, { label: "USGS" }],
		controls: { time: "none" }
	}),
	lab({
		slug: "tropical-cyclone",
		title: "Tropical cyclone",
		hook: "Eye, eyewall, rainbands. Warm sea is the fuel. A UK depression is usually a different machine.",
		objective: "Orbit eye/eyewall/rainbands and keep UK language honest.",
		realm: "hazards",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS",
			"APES"
		],
		curriculum: [
			"GCSE hazards",
			"NGSS MS-ESS3-2",
			"APES"
		],
		steps: steps("Cross-section: eye calm, eyewall violent, bands.", "Intensity slider.", "Katrina/Sandy vs a UK windy Tuesday."),
		questions: [
			q("The eyewall is…", [
				"The calm centre",
				"The ring of strongest winds and rain around the eye",
				"A front in Yorkshire",
				"A dune"
			], 1, "Damage ring."),
			q("Tropical cyclones need…", [
				"Snow cover",
				"Warm ocean and low shear, among other things",
				"A glacier",
				"Pangaea"
			], 1, "School list, not a forecast."),
			q("A UK winter storm is usually…", [
				"A tropical cyclone",
				"A midlatitude cyclone with fronts",
				"An eyewall",
				"A tsunami"
			], 1, "Fronts lab."),
			q("Saffir–Simpson rates…", [
				"Every Met Office named storm",
				"Tropical cyclones, not UK extra-tropical gales",
				"Tsunamis",
				"Earthquakes"
			], 1, "Do not put that scale on a Yorkshire wind.")
		],
		why: [
			"Katrina and Sandy are the locators. Katrina (2005) was a large tropical cyclone on the Gulf Coast; the catastrophe in New Orleans was surge plus levée failure on a sinking delta. Sandy (2012) was a late-season hybrid that struck the New York–New Jersey Bight: surge in a funnel, high tide, a dense shoreline. Both are North Atlantic heat engines with an eye, an eyewall and rainbands — until Sandy’s hybrid caution. A UK winter storm is usually a midlatitude cyclone with fronts, not an eyewall. Met Office names storms; they are still extra-tropical unless stated. Do not brand a Yorkshire gale as a hurricane. Do not put Saffir–Simpson on a UK depression. Hawaii sees true tropical cyclones in season; Iceland and Cascadia are other machines; San Andreas is slip. GCSE hazards and NGSS want the structure named and the UK language kept honest. Warm sea is the fuel. A front is a different lab. Same word ‘cyclone’, two engines.",
			"A tropical cyclone is an organised warm-core storm over a warm ocean. The eye is a calm, often clear centre of descending air. The eyewall is the ring of strongest convection, wind and rain — the damage ring. Spiral rainbands sit outside. Fuel is latent heat from warm water, plus low vertical shear so the tower can stand, plus enough Coriolis to spin (not on the equator). That is a school list, not a forecast model. Intensity in this lab is a slider, not a 2026 track. Play spins the spiral. Slice the storm to see the eye well. Storm surge is wind pile-up and pressure, the water-level cousin of Katrina and Sandy; rainfall is a hydrograph story inland. A midlatitude cyclone is a different machine: comma cloud, warm front, cold front, energy from horizontal temperature contrast. Toggle UK low in this lab and the eye dies into that comma. Saffir–Simpson is a tropical-cyclone wind scale. It does not grade a Met Office named storm over Wales. Sandy’s hybrid nature is a teacher’s caution, not a KS3 requirement. Keep the verbs: warm sea, eye, eyewall, bands. Then say what a UK Tuesday is not.",
			"Leave the Hurricane / UK low button on Hurricane. Orbit the eye, then the eyewall, then the rainbands. Slice to cut the well. Raise Intensity; the engine is still a school box over warm sea. Play to spin the spiral. Toggle UK low: the eye goes, fronts appear, the readout says comma-shaped mid-latitude low. That toggle is the language lesson. Name the eyewall out loud while it exists. Do not put Saffir–Simpson on the UK shape. Katrina and Sandy after the structure, not instead of it. Then Check.",
			"Without the canvas the structure is still the lesson. Eye: calm centre. Eyewall: ring of strongest winds and rain. Rainbands outside. Fuel: warm ocean and low shear, among other things — a school list, not a forecast. A UK winter storm is usually a midlatitude cyclone with fronts, not an eyewall. Met Office names storms; they are still extra-tropical unless stated. Katrina and Sandy are the locators. Sandy is a hybrid caution. Do not brand a UK gale as a hurricane. Do not put Saffir–Simpson on a Yorkshire wind. Different engine."
		],
		glossary: [
			{
				term: "Tropical cyclone",
				exam: "Hurricane / typhoon",
				def: "Warm-core organised storm over a warm ocean. Name depends on basin."
			},
			{
				term: "Eye",
				def: "Calm centre of a tropical cyclone, often with descending air."
			},
			{
				term: "Eyewall",
				def: "Ring of strongest convection, wind and rain around the eye."
			},
			{
				term: "Rainband",
				def: "Spiral band of showers and storms outside the eyewall."
			},
			{
				term: "Storm surge",
				def: "Sea-level rise from wind and pressure in a cyclone. Not a tsunami."
			},
			{
				term: "Saffir–Simpson",
				def: "Wind-scale for tropical cyclones. Not for UK extra-tropical gales."
			},
			{
				term: "Midlatitude cyclone",
				exam: "Depression / extra-tropical cyclone",
				def: "Frontal storm driven by horizontal temperature contrast. UK winter default."
			}
		],
		misconception: {
			claim: "Every windy UK day is a hurricane.",
			truth: "Different engine. Met Office names storms; they are still extra-tropical unless stated."
		},
		misconceptions: [
			{
				claim: "Every windy UK day is a hurricane.",
				truth: "Different engine. Met Office names storms; they are still extra-tropical unless stated."
			},
			{
				claim: "The eye is the most dangerous place.",
				truth: "The eyewall is the damage ring. The eye is calm. The far side still comes."
			},
			{
				claim: "Saffir–Simpson grades Met Office named storms.",
				truth: "That scale is for tropical cyclones. A UK depression is a different machine."
			}
		],
		cases: [{
			slug: "katrina-sandy",
			label: "Katrina / Sandy"
		}, {
			slug: "uk-sea-breeze",
			label: "UK contrast"
		}],
		teacher: {
			script: "Slice the storm. Eye calm, eyewall the ring of strongest winds and rain, then rainbands.\nName the eyewall out loud. Damage sits there, not in the eye.\nRaise Intensity. The engine is warm ocean and low shear, among other things — a school list, not a forecast.\nToggle UK low. The eye dies. Fronts appear. A comma, not a hurricane.\nEvery windy UK day is not a hurricane. Different engine.\nThat is the misconception.\nA UK winter storm is usually a midlatitude cyclone with fronts. Met Office names storms; they are still extra-tropical unless stated.\nDo not put Saffir–Simpson on a UK gale.\nKatrina and Sandy are the locators. Sandy is a hybrid caution.\nKeep UK language honest, then sit down in Check.",
			pitfalls: [
				"Saffir–Simpson for UK gales.",
				"Eye as the damage zone.",
				"Naming every Met Office storm a hurricane.",
				"Surge called a tsunami because both wet a street."
			]
		},
		sources: [{ label: "NOAA NHC" }, { label: "Met Office" }],
		controls: {
			time: "none",
			extra: [{
				key: "intensity",
				label: "Intensity",
				min: .3,
				max: 1,
				step: .05,
				default: .7
			}],
			slice: true
		}
	})
];
var INTERIOR_LABS = [
	lab({
		slug: "continental-drift",
		title: "Continental drift",
		hook: "250 Ma the pieces fit. Fossils agree. The ocean is not a static floor continents plough through.",
		objective: "Scrub 250 Ma to now, toggle fossil/fit overlay, and treat Pangaea as the same plates earlier.",
		realm: "interior",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: ["GCSE AQA 3.1.1", "NGSS MS-ESS2-3"],
		steps: steps("Pangaea. Fit the coasts.", "Scrub to now. India walks north.", "Fossils and fit are evidence. Plates are the mechanism."),
		questions: [
			q("Pangaea was…", [
				"The first crust",
				"A late Palaeozoic–Mesozoic supercontinent, not the only one",
				"A moon",
				"A hurricane"
			], 1, "Not Earth’s starting position."),
			q("Wegener’s fit argument is strongest when…", [
				"You ignore shelves",
				"You fit continental shelves, not today’s beaches",
				"You use flags",
				"You use time zones"
			], 1, "Shelf edge."),
			q("Continents move because…", [
				"They plough a static ocean",
				"They are passengers on plates",
				"The Moon drags them",
				"Wind"
			], 1, "Ocean floor is plate too."),
			q("The Himalaya record…", [
				"A hotspot track like Hawaii",
				"Continent–continent collision after India walked north",
				"A mid-ocean ridge like Iceland",
				"Wind piles at San Andreas"
			], 1, "Same plates, stacked. Iceland makes crust; collision stacks it.")
		],
		why: [
			"A GCSE class that still thinks continents plough a static ocean will misread Iceland, the Himalaya, and every earthquake map that follows. The United Kingdom is not a plate. It rides the Eurasian plate. The Mid-Atlantic Ridge at Iceland is where that plate is born, a few centimetres per year, with a country sitting on the split. San Andreas is the United States pair: the Pacific and North American plates slide past, so California’s hazard is transform motion, not a continent chewing through a frozen Pacific. Wegener’s coast fit and matching fossils across the young Atlantic are the evidence. Plates are the mechanism he did not have. Himalaya collision is the same machine stacking crust that Iceland makes at a ridge. If the ocean floor were static, those fossils would be a miracle and India would have no walk north into Eurasia. News maps that freeze today’s beaches as eternal outlines hide 250 million years of passengers. Treat Pangaea as the same plates at an earlier time, not a mythic first Earth.",
			"Continents are passengers on lithospheric plates. Oceanic lithosphere is plate too: born at ridges, destroyed at trenches. From about 300 to 180 Ma a supercontinent, Pangaea, sat assembled. It was not Earth’s starting position and not the only supercontinent in the record. After it rifted, the Atlantic opened. India walked north and stacked into Eurasia as the Himalaya. Wegener argued fit, fossils, and palaeoclimate; he lacked a driving mechanism. Seafloor spreading and subduction supply it. Fit the continental shelves, not today’s beaches: the real outline is the shelf edge, the shallow submerged margin. Matching fossils across South America and Africa sit on crust that was once adjacent. The United Kingdom was already a Eurasian passenger. San Andreas did not yet cut California as it does now. The model’s labelled lie is the cartoon you are looking at. Continents are extruded polygons. Motion is a straight interpolation from 250 Ma to the present. Two hundred and fifty million years play in one lesson. Real plate paths curve, rotate, and include microplates this scene omits. The globe is a teaching sphere, not a palaeogeographic reconstruction you could navigate. Fossil matches are dots, not assemblages. What remains true: the pieces fit at the shelf, the Atlantic is young, India has moved north, and neither continent nor ocean is a static stage.",
			"Set the Ma before present slider to 250 Ma. The pieces fit. Toggle Fossil / fit overlay on so matching fossils and the shelf argument read from the back row. When paused, that slider is the clock; Space play overrides it and walks Pangaea to now. Left and right arrows nudge time. Watch India walk north as the Atlantic widens. L toggles labels. R resets to the lab defaults. P switches projector mode. E explode and X slice do nothing here: this is a globe of passengers, not a cut apple. Pause near 0 Ma and name what changed.",
			"Without the 3D view the lesson still holds. At about 250 Ma the continental shelves fit as Pangaea. Matching fossils across the South Atlantic are the evidence; plates are the mechanism. Continents do not plough a static ocean: both are plate. Iceland makes crust at a ridge. The Himalaya stacks it at collision. San Andreas slides. The United Kingdom rides Eurasia. Kola never cored this history; we reconstruct it from fit, fossils, and the ocean floor. If JavaScript is off you still have the caption, the glossary, and Check. Draw two outlines, fit the shelves, then pull them apart. That sketch is the model."
		],
		glossary: [
			{
				term: "Pangaea",
				def: "Supercontinent ~300–180 Ma. Not the first, not the only, not Earth’s starting position."
			},
			{
				term: "Continental shelf",
				def: "Shallow submerged margin. Fit this edge, not today’s beaches."
			},
			{
				term: "Lithosphere",
				def: "Crust plus the rigid top of the mantle. Plates are lithosphere, not crust alone."
			},
			{
				term: "Continental drift",
				def: "Wegener’s description of moving continents. Plates are the mechanism he lacked."
			},
			{
				term: "Seafloor spreading",
				def: "New oceanic crust at a ridge. Ocean floor is plate too, born and later destroyed."
			},
			{
				term: "Subduction",
				def: "Oceanic plate consumed at a trench. The conveyor’s far end."
			},
			{
				term: "Supercontinent",
				def: "An assembly of most continents. Pangaea is one of several in Earth history."
			},
			{
				term: "Shelf fit",
				exam: "Continental reconstruction",
				def: "Matching continents at the shelf edge. Beaches are a Holocene disguise."
			}
		],
		misconception: {
			claim: "Continents plough through static oceans.",
			truth: "Both are plate."
		},
		misconceptions: [
			{
				claim: "Continents plough through static oceans.",
				truth: "Both are plate."
			},
			{
				claim: "Pangaea was Earth’s first crust, and the only supercontinent.",
				truth: "It is a late Palaeozoic–Mesozoic assembly, not a starting position, and not the only one."
			},
			{
				claim: "You fit today’s beaches to prove drift.",
				truth: "Fit continental shelves. The holiday sand is not the outline."
			}
		],
		cases: [{
			slug: "iceland",
			label: "Iceland"
		}, {
			slug: "san-andreas",
			label: "San Andreas"
		}],
		teacher: {
			script: "Set Ma before present to 250 Ma. The pieces fit.\nToggle Fossil / fit overlay on. Fossils and the shelf edge are the evidence.\nFit continental shelves, not today’s beaches.\nScrub toward now. India walks north.\nPangaea is a late Palaeozoic–Mesozoic supercontinent, not Earth’s starting position, and not the only one.\nContinents do not plough a static ocean. Both are plate.\nThey are passengers. Ocean floor is plate too.\nWegener had the fit. Plates are the mechanism.\nName Iceland (makes crust), Himalaya (stacks it), San Andreas (slides).\nThe United Kingdom rides Eurasia. It is not a plate.\nPause near 0 Ma and name what changed.\nFinish in Check.",
			pitfalls: [
				"Pangaea as the only supercontinent.",
				"Fitting today’s beaches instead of continental shelves.",
				"Calling the United Kingdom a plate. It rides Eurasia.",
				"Drawing the ocean as a static floor continents plough through."
			]
		},
		sources: [{ label: "USGS plates" }, { label: "BGS" }],
		controls: {
			time: "none",
			extra: [{
				key: "ageMa",
				label: "Ma before present",
				min: 0,
				max: 250,
				step: 1,
				unit: " Ma",
				default: 200
			}],
			toggles: [{
				key: "fossils",
				label: "Fossil / fit overlay"
			}]
		}
	}),
	lab({
		slug: "hotspots",
		title: "Hotspots",
		hook: "Hawaii and Yellowstone are holes the plate is sliding over — not the same as a plate edge.",
		objective: "Draw the Hawaii chain and the Yellowstone track independently.",
		realm: "interior",
		ages: [
			"GCSE",
			"A-level",
			"NGSS MS",
			"HS Earth Sci"
		],
		curriculum: ["GCSE", "NGSS MS-ESS2-3"],
		steps: steps("Hawaii: young island, older seamounts NW.", "Yellowstone: calderas older to the SW.", "Two plumes. One idea."),
		questions: [
			q("A hotspot volcano far from a boundary shows…", [
				"Plates do not move",
				"A plume can punch a plate interior",
				"The Moon",
				"Only mid-ocean ridges exist"
			], 1, "Hawaii."),
			q("Older Hawaii volcanoes lie…", [
				"Southeast",
				"Northwest along the chain",
				"In the UK",
				"On the Moon"
			], 1, "Pacific plate motion."),
			q("Yellowstone is…", [
				"A mid-ocean ridge",
				"A continental hotspot track",
				"A transform only",
				"A spit"
			], 1, "Snake River Plain ages."),
			q("Iceland is a poor copy of Hawaii because…", [
				"It has no volcanoes",
				"It sits on a mid-ocean ridge, with a plume as a bonus, not a plate-interior hole alone",
				"It is in the UK",
				"It is Cascadia"
			], 1, "Ridge first. Hawaii is intraplate. Two different machines.")
		],
		why: [
			"A UK class that dumps every volcano on the Ring of Fire will fail Hawaii and Yellowstone the moment they appear on a map. Most volcanoes do sit on plate edges: Iceland on the Mid-Atlantic Ridge, Cascadia’s arc above a slab. Hawaii does not. It is a hole the Pacific plate is sliding over, a chain of islands and seamounts that get older to the northwest. Yellowstone is the continental analogue: calderas older to the southwest along the Snake River Plain. Two plumes. One idea. Do not teach one plume for both. The United Kingdom rides Eurasia far from either track, which is why British volcanoes are deep-time history, not a live hotspot. United States exam maps pair Hawaii with Yellowstone for a reason: ocean plate versus continent, same mechanism. If all volcanoes were plate-boundary volcanoes, those two tracks would be a mystery and plate motion would lose its best interior clock. Kola never sampled a plume. Age direction on the chain is the clock we actually have.",
			"A hotspot is a long-lived mantle plume that can punch magma through a plate interior. The plume stays relatively fixed in the mantle frame; the plate slides. Hawaii: the active island is young; drowned seamounts and atolls age to the northwest along the chain, recording Pacific motion of centimetres per year. Yellowstone: a continental hotspot. Calderas and rhyolite ages young at the park, older toward the southwest. Cascadia is not this story. It is a subduction zone, a volcanic arc above a slab. Iceland is a ridge with a plume bonus, which is why it has a country on it, not a simple Hawaii copy. The model’s labelled lie is the pipe. The plume is drawn as a glowing cylinder you could climb. It is not. It is a thermal anomaly, schematic. Hawaii ages are a 0–10 Ma teaching set, not the full Emperor–Hawaiian bend. Yellowstone is a slab with a track tube, not a geologic map of the Snake River Plain. Motion is sped up by millions of years so a lesson can see the slide. What remains true: two independent plumes, age direction records plate motion, and not every volcano sits on a plate edge. That exception is the proof that plates move.",
			"Leave the Hawaii toggle on. Press Space: the chain slides northwest while the plume stays. Left and right arrows scrub the same motion. Toggle Yellowstone on and read calderas older to the southwest. Two plumes — do not treat them as one. L toggles labels. R resets. P switches projector mode. E explode and X slice are idle here; there is no onion to pull apart. Ask which way each plate is going from the age direction before you name it. Then turn one track off so the class cannot blur them.",
			"Without WebGL the caption still teaches the exception. Hawaii is young at the southeast end, older seamounts northwest. The plume stays; the Pacific plate slides. Yellowstone is a second plume under a continent, ages older to the southwest. Iceland is a ridge, not this story. Cascadia is subduction, not this story. The United Kingdom is not on either track. If JavaScript is off you still have the glossary and Check. Sketch a fixed dot and a sliding plate with dated volcanoes. That drawing is the lab. Two dots if you add Yellowstone. Never one pipe feeding both."
		],
		glossary: [
			{
				term: "Hotspot",
				def: "Long-lived mantle plume that can punch a volcano through a plate interior."
			},
			{
				term: "Seamount",
				def: "Drowned volcano on the track. Older, farther from the active island."
			},
			{
				term: "Mantle plume",
				def: "A thermal upwelling, relatively fixed in the mantle frame. Not a climbable pipe."
			},
			{
				term: "Caldera",
				def: "Collapse crater after a large eruption. Yellowstone’s track is dated calderas."
			},
			{
				term: "Age-progressive chain",
				def: "Volcanoes that get older away from the active centre, recording plate motion."
			},
			{
				term: "Intraplate volcanism",
				def: "Melting inside a plate, not at a ridge, trench, or transform."
			},
			{
				term: "Partial melt",
				def: "A fraction of the rock is liquid. A plume is not a magma ocean."
			},
			{
				term: "Guyot",
				exam: "Flat-topped seamount",
				def: "An eroded, drowned volcano on a hotspot track, often now an atoll or bank."
			}
		],
		misconception: {
			claim: "All volcanoes are plate-boundary volcanoes.",
			truth: "Hotspots are the exception that proves motion."
		},
		misconceptions: [
			{
				claim: "All volcanoes are plate-boundary volcanoes.",
				truth: "Hotspots are the exception that proves motion."
			},
			{
				claim: "Hawaii and Yellowstone are one plume.",
				truth: "Two plumes. One idea. Age tracks point different ways on different plates."
			},
			{
				claim: "Iceland is a Hawaii copy, and Yellowstone is a mid-ocean ridge.",
				truth: "Iceland sits on a ridge with a plume bonus. Yellowstone is a continental hotspot. Cascadia is subduction."
			}
		],
		cases: [{
			slug: "hawaii",
			label: "Hawaii"
		}, {
			slug: "yellowstone",
			label: "Yellowstone"
		}],
		teacher: {
			script: "Leave Hawaii on. Young island, older seamounts northwest.\nThe chain is the Pacific plate sliding over a plume, not a plate edge.\nAsk which way the plate is going from the age direction.\nToggle Yellowstone on. Calderas older to the southwest.\nTwo plumes. One idea. Do not teach one plume for both.\nAll volcanoes are not plate-boundary volcanoes. That is the misconception.\nHotspots are the exception that proves motion.\nIceland is a ridge with a plume bonus, not a Hawaii copy. Cascadia is subduction, not this.\nA plume can punch a plate interior. Hawaii is the type case.\nYellowstone is a continental hotspot track, not a mid-ocean ridge.\nFinish in Check.",
			pitfalls: [
				"One plume for both.",
				"Dumping Hawaii on the Ring of Fire.",
				"Treating Iceland as a Hawaii copy, or Yellowstone as a mid-ocean ridge.",
				"Drawing the plume as a lava pipe you could climb."
			]
		},
		sources: [{ label: "USGS HVO" }, { label: "USGS YVO" }],
		controls: {
			time: "none",
			toggles: [{
				key: "hawaii",
				label: "Hawaii",
				defaultOn: true
			}, {
				key: "yellowstone",
				label: "Yellowstone"
			}]
		}
	}),
	lab({
		slug: "seafloor-spreading",
		title: "Seafloor spreading",
		hook: "Magnetic stripes are a tape recorder. New crust at the ridge, older away.",
		objective: "Watch stripes move apart from the Mid-Atlantic Ridge.",
		realm: "interior",
		ages: [
			"GCSE",
			"A-level",
			"NGSS MS"
		],
		curriculum: ["GCSE AQA 3.1.1", "NGSS MS-ESS2-3"],
		steps: steps("Ridge. New stripe.", "Play: bands walk away, mirrored.", "Reversals record time. Iceland sits on this."),
		questions: [
			q("Newest crust is…", [
				"At the continents",
				"At the ridge axis",
				"At the trench only",
				"In the inner core"
			], 1, "Spreading centre."),
			q("Stripes are symmetric because…", [
				"Wind",
				"Both sides of the ridge add crust",
				"Tides",
				"One plate only"
			], 1, "Mirror."),
			q("Magnetic stripes record…", [
				"Rain",
				"Geomagnetic reversals frozen in cooling basalt",
				"Moon phases",
				"Albedo"
			], 1, "Vine–Matthews."),
			q("Old ocean floor is destroyed at…", [
				"Every beach",
				"Trenches such as Cascadia, not at San Andreas",
				"The inner core",
				"Kola"
			], 1, "Born at ridges, eaten at trenches. Transform is a different job.")
		],
		why: [
			"Iceland is the ridge with a country on it, which is why every UK specification parks a case study there. New crust at the axis, older as you walk toward Europe or North America, centimetres per year. Magnetic stripes are the tape recorder: geomagnetic reversals frozen in cooling basalt, mirrored on both flanks. The United States pair is not a second Iceland. Cascadia consumes old Pacific crust at a trench; San Andreas is a transform that does not make ocean floor. Together they complete the conveyor: born at Iceland’s ridge, aged across the basin, destroyed or slid at the far edge. If ocean floor were all the same age, those stripes would not exist and Iceland would be a mystery island. A class that treats the Atlantic as primordial water has not met Vine–Matthews. Kola’s borehole never reached this story; this is surface basalt writing time, not a 12 km scratch in continental crust. UK and US maps both freeze today’s ocean as if it had always been there. It has not.",
			"At a mid-ocean ridge, plates diverge. Magma fills the gap; new oceanic crust records the field as it cools through the Curie point. Newest crust sits at the ridge axis. Stripes are symmetric because both sides add crust. Vine–Matthews: reversals frozen in basalt, a tape recorder of time. Spreading rate is how fast plates separate, typically centimetres per year, not a weather story. Iceland sits on the Mid-Atlantic Ridge, plume-boosted, which is why there is land. Old crust is not immortal: it ages away and is swallowed at trenches such as Cascadia. San Andreas is a different boundary — transform, no stripe factory. The Himalaya stack continent on continent; they do not print this tape. The model’s labelled lie is printed on the studio: vertical exaggeration ×12. The ridge is a mountain under the sea, but this height field is a classroom cliff. Stripes are colour bands, not a magnetometer record. Spreading that fills a lesson is millions of years of centimetres per year. Transform offsets on the ridge are a sine wobble, not a fracture-zone chart. What remains true: young at the axis, old away, mirrored polarity, Iceland on the ridge. Ocean floor is not all the same age.",
			"There is no extra slider on this lab. Find the ridge axis — newest crust sits there. Press Space: new stripes walk away, mirrored. Left and right arrows nudge the same tape. L toggles labels. R resets. P switches projector mode. E explode and X slice do nothing; this is a seafloor, not an onion. Point at the mirror. Pause and say young at the axis, old on the flanks. Name Iceland as the land on this machine, Cascadia as a place old floor can die, San Andreas as a boundary that does not print stripes.",
			"Without the 3D view a ridge axis, magnetic stripes as a mirror, and age increasing away still teach the tape. Newest crust at the axis; both sides add crust. Reversals frozen in cooling basalt are the clock. Iceland sits on this ridge. Cascadia is where old floor can die; San Andreas is not a spreading centre. The fallback caption is the whole mechanism. Draw a centre line, hatch mirrored bands, and arrow them outward. That sketch is Vine–Matthews. If JavaScript is off you still have the glossary and Check. Do not wait for WebGL to say the ocean has an age."
		],
		glossary: [
			{
				term: "Spreading rate",
				def: "How fast plates separate at a ridge. Centimetres per year, not a weather story."
			},
			{
				term: "Magnetic reversal",
				def: "The geomagnetic field flips. Cooling basalt keeps a snapshot of polarity."
			},
			{
				term: "Mid-ocean ridge",
				def: "Divergent plate boundary. New oceanic crust at the axis. Iceland sits on one."
			},
			{
				term: "Vine–Matthews",
				exam: "Vine–Matthews–Morley hypothesis",
				def: "Magnetic stripes as a tape recorder of reversals and spreading."
			},
			{
				term: "Oceanic crust",
				def: "Basalt and gabbro, ~7 km thick, young at ridges, old toward trenches."
			},
			{
				term: "Magnetic stripe",
				def: "A band of normal or reversed polarity, mirrored on both flanks of the ridge."
			},
			{
				term: "Curie point",
				def: "Temperature below which cooling rock locks in the ambient magnetic field."
			},
			{
				term: "Fracture zone",
				def: "A scar of transform offset on the ridge. This lab only hints at it."
			}
		],
		misconception: {
			claim: "Ocean floor is all the same age.",
			truth: "Young at ridges, old at trenches."
		},
		misconceptions: [
			{
				claim: "Ocean floor is all the same age.",
				truth: "Young at ridges, old at trenches."
			},
			{
				claim: "Magnetic stripes are waves on the sea.",
				truth: "They are polarity frozen in cooling basalt, a tape recorder, not a swell."
			},
			{
				claim: "San Andreas is a spreading centre, like Iceland.",
				truth: "San Andreas is transform. Iceland is the ridge. Cascadia is where old floor can be swallowed."
			}
		],
		cases: [{
			slug: "iceland",
			label: "Iceland / MAR"
		}, {
			slug: "san-andreas",
			label: "A different boundary"
		}],
		teacher: {
			script: "Find the ridge axis. Newest crust sits there.\nPlay spreading. New stripes walk away, mirrored.\nPoint at the mirror. Both sides of the ridge add crust.\nMagnetic stripes record geomagnetic reversals frozen in cooling basalt.\nThey are not waves. That pitfall is on the board.\nOcean floor is not all the same age. Young at ridges, old at trenches.\nIceland sits on this ridge with a country on it.\nCascadia can swallow old floor. San Andreas does not make stripes.\nVine–Matthews is the tape recorder. Reversals are time.\nSpreading rate is how fast the plates separate, not a weather story.\nThe ridge height is exaggerated ×12. Say the labelled lie out loud.\nFinish in Check.",
			pitfalls: [
				"Stripes as waves.",
				"Ocean floor all the same age.",
				"Calling San Andreas a spreading centre.",
				"Forgetting the vertical exaggeration ×12 on the ridge."
			]
		},
		sources: [{ label: "USGS seafloor" }, { label: "NOAA" }],
		controls: { time: "none" }
	})
];
var LANDFORM_LABS = [
	lab({
		slug: "landform-types",
		title: "Landform types",
		hook: "A mountain is not a hill with ambition. Height, slope, and a flat top are different machines.",
		objective: "Compare mountain, hill, plateau, plain, and basin at one scale.",
		realm: "landforms",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: [
			"KS3",
			"GCSE landscapes",
			"NGSS MS-ESS2-2"
		],
		steps: steps("Orbit the five. Same scale bar.", "Hide labels and name them.", "Plateau is height with a flat top. Basin is a bowl. Plain is low and open."),
		questions: [
			q("A plateau is…", [
				"A V-valley",
				"An elevated area with a relatively flat top",
				"Always volcanic",
				"A spit"
			], 1, "Height plus a table top."),
			q("A basin is…", [
				"A peak",
				"A depression; drainage often inward or along the floor",
				"A delta",
				"An arête"
			], 1, "The opposite of a dome."),
			q("A mountain vs a hill is mainly…", [
				"Colour",
				"Relief, slope and local height — a continuum, not a law",
				"Always ice",
				"Always granite"
			], 1, "Definitions vary by country. Compare, don’t legislate."),
			q("The Grand Canyon is best described as…", [
				"A mountain range",
				"A canyon cut into a plateau",
				"A glacial U-trough",
				"A basin with no river"
			], 1, "Height with a table, then a hole. Not a mountain. Not ice.")
		],
		why: [
			"Snowdonia is mountains: steep relief, cwms, a peak that is not a table. The Grand Canyon is a canyon cut into a plateau — high land with a relatively flat top, then a hole. A Yorkshire Dales knoll is smaller relief; the Mississippi floodplain is a plain. Those four, plus a basin as a bowl, are different machines, not a ranking of ambition. UK GCSE physical landscapes and NGSS MS-ESS2-2 both ask students to name a landform from height, slope, and plan shape. Fieldwork in Eryri and a rim walk at Grand Canyon fail if every high place is called a mountain. A plateau is height with a table. A basin is a depression. A plain is low and open. Mountain versus hill is a continuum of relief; definitions vary by country. The lab compares at one scale. It does not legislate. Same scale bar, different jobs: that is the whole argument.",
			"Four patches sit on one studio floor with one scale bar. Vertical exaggeration is labelled ×8 so the set reads from the back of the room; true relief on a table-sized floor would be millimetres. Mountain: high local relief, steep slopes, a peak — Snowdonia’s machine, not a hill with ambition. Hill: smaller relief, rounded slopes — a continuum, not a law; countries disagree on the cut. Plateau: elevated land with a relatively flat top. The Colorado Plateau that the Grand Canyon cuts is this shape; the canyon is the hole, not the landform type. Plain: low, gently sloping, open — Mississippi alluvium, not a failed mountain. Basin: a bowl; drainage often inward or along the floor. Height plus slope plus plan is the classifier. Colour is not. Granite does not make a mountain if the relief is small; limestone can make a plateau. The five words are not five laws of nature. The model is invented teaching terrain, not a traced OS sheet or a USGS quad. Orbit at one scale; hide the labels and name them; then reveal. A plateau is not a mountain with the top sawn off as a moral. It is a different slope history, and the exaggeration caption is the honesty.",
			"Orbit the five at one scale. Hide labels. Point. Wait. Then reveal. The same scale bar is the argument: a mountain is not a hill with ambition, and a plateau is height with a table. Ask which patch is the Grand Canyon’s host landform before you name plateau. Keyboard: L labels, R reset, arrows to step the camera along the patches. There is no time slider; the land does not play. Vertical exaggeration is ×8 and labelled on the caption. Finish in Check. The wrong answer is always that every high place is a mountain.",
			"Without the 3D view the sentence still holds. Mountain, hill, plateau, plain, and basin are height-and-slope machines compared at one scale. A plateau is high and flat. A basin is a bowl. A plain is low and open. Mountain versus hill is relief, not a law. Grand Canyon is a canyon in a plateau. Snowdonia is mountains. Vertical exaggeration is ×8 and labelled; the patches are invented teaching terrain. Five words are not five laws of nature. Colour is not a classifier. Definitions vary by country; compare, do not legislate."
		],
		glossary: [
			{
				term: "Mountain",
				def: "High local relief, steep slopes, a peak. Not a hill with ambition."
			},
			{
				term: "Hill",
				def: "Smaller relief, often rounded. A continuum with mountain, not a fixed-height law."
			},
			{
				term: "Plateau",
				def: "Elevated land with a relatively flat top."
			},
			{
				term: "Plain",
				def: "Low, gently sloping, open land."
			},
			{
				term: "Basin",
				def: "A bowl. Interior drainage or a low among highs."
			},
			{
				term: "Relief",
				def: "The difference in height across a landscape. The classifier, not colour."
			},
			{
				term: "Canyon",
				def: "A deep, steep-sided incision, often cut into a plateau. The hole, not the host landform."
			}
		],
		misconception: {
			claim: "Every high place is a mountain.",
			truth: "Plateaus are high and flat. Hills are smaller relief."
		},
		misconceptions: [
			{
				claim: "Every high place is a mountain.",
				truth: "Plateaus are high and flat. Hills are smaller relief."
			},
			{
				claim: "The Grand Canyon is a mountain range.",
				truth: "It is a canyon cut into a plateau. The plateau is the landform type; the canyon is the hole."
			},
			{
				claim: "Mountain versus hill is a law with a fixed height.",
				truth: "Definitions vary by country. Compare relief, slope and local height. Do not legislate."
			}
		],
		cases: [{
			slug: "snowdonia",
			label: "Snowdonia"
		}, {
			slug: "grand-canyon",
			label: "Grand Canyon plateau"
		}],
		teacher: {
			script: "Orbit the five at one scale: mountain, hill, plateau, plain, basin.\nCover the labels. Point. Wait. Then reveal.\nA plateau is height with a relatively flat top. A basin is a bowl. A plain is low and open.\nEvery high place is not a mountain. Plateaus are high and flat. Hills are smaller relief.\nThat is the misconception.\nMountain versus hill is relief, slope and local height — a continuum, not a law.\nDefinitions vary by country. Compare, do not legislate.\nGrand Canyon is a canyon in a plateau. Snowdonia is mountains. Same lab, different places.\nVertical exaggeration is ×8 and labelled. Five words are not five laws of nature.\nFinish in Check.",
			pitfalls: [
				"Teaching five words as five laws of nature.",
				"Calling the Grand Canyon a mountain range.",
				"Treating mountain versus hill as a fixed-height law."
			]
		},
		sources: [{ label: "USGS landforms" }, { label: "BGS" }],
		controls: { time: "none" }
	}),
	lab({
		slug: "river-erosion",
		title: "River erosion",
		hook: "A waterfall is a nick point walking upstream.",
		objective: "Match waterfall, gorge, pothole, V-valley, and play nick-point retreat.",
		realm: "landforms",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: ["GCSE AQA 3.1.3.1", "NGSS MS-ESS2-2"],
		steps: steps("Upper course: V, waterfall, plunge pool.", "Play: the nick point retreats, leaving a gorge.", "Hydraulic action, abrasion, attrition. Vertical erosion dominates here."),
		questions: [
			q("Nick-point retreat leaves…", [
				"A delta",
				"A gorge upstream of the old fall",
				"A spit",
				"An oxbow"
			], 1, "The fall walks back; a gorge is the scar."),
			q("Potholes form by…", [
				"Wind only",
				"Pebbles swirling and abrading the bed",
				"Lava",
				"Tides"
			], 1, "Corrosion plus abrasion in a hollow."),
			q("V-valleys are typical of…", [
				"Glaciers",
				"Upland fluvial vertical erosion",
				"Fold mountains only",
				"Karst only"
			], 1, "Ice makes U. Water makes V — until ice has been there first."),
			q("The Grand Canyon formed mainly by…", [
				"A glacier cutting a U",
				"A rift pulling apart",
				"A river incising a plateau",
				"Wind carving a yardang"
			], 2, "Incision. Ice makes U. This is a river in a plateau. The hole is younger than the rocks.")
		],
		why: [
			"A Lake District waterfall sits on a resistant band and walks slowly upstream. The gorge behind it is the scar. The Colorado River cut a plateau; the Grand Canyon is incision, not a rift and not a glacial U. UK GCSE rivers and NGSS MS-ESS2-2 both need that distinction. A beck in spate is vertical erosion: V-valley, plunge pool, potholes where pebbles swirl. Hydraulic action, abrasion, and attrition are the toolkit; corrosion helps on limestone. Niagara is the famous slow walk, not a waterfall that stays put. Fieldwork in Borrowdale and a rim talk at Grand Canyon fail if every valley is called a canyon and every fall is treated as furniture. Nick-point retreat is the plot. Water makes a V until ice has been there first.",
			"Upper course: steep gradient, high potential energy, vertical erosion dominating. A nick point is a break of slope — often a waterfall on a resistant band — with a plunge pool at its foot. Play the lab and the lip walks upstream; the gorge is the slot the fall leaves as it retreats. Potholes form where pebbles are trapped and swirl, abrading the bed. V-valleys are the fluvial cross-profile; ice makes a U, water a V, until ice has been there first and the beck cuts a V into a trough floor, as in the Lake District. Hydraulic action, abrasion, and attrition do the cutting. The Grand Canyon is the same machine at plateau scale: the river exports, weathering and mass movement deliver from the walls, the hole is younger than the rocks. Vertical exaggeration is labelled ×12 on the long profile so the lip and the V read from the back row. True gradient on a table would be almost flat. Water is a thin surface, not a fat pipe. The valley is a teaching mesh, not a traced catchment. Waterfalls do not stay put. Niagara is the slow famous walk; a Lake District fall on Borrowdale volcanic rock is the same retreat at a smaller station.",
			"Freeze on the waterfall. Name V-valley, fall, and plunge pool before you press play. Play nick-point retreat; the fall walks upstream. Ask what the gorge is — it is the scar the lip leaves. Keyboard: space play, arrows scrub, L labels, R reset. There is no discharge slider here; that lives on the rivers long-profile lab. Vertical exaggeration is ×12 and labelled. Finish in Check. The wrong answer is that waterfalls stay put, or that every valley is a canyon.",
			"Without the 3D view: a nick point retreats; a gorge is the scar; potholes are pebbles swirling on the bed; V-valleys are upland fluvial; ice makes U. Lake District falls sit on resistant bands. The Colorado cut a plateau. Vertical exaggeration is ×12 and labelled. Water is not a pipe. Waterfalls walk. Niagara is the slow famous walk. Do not call every valley a canyon. Hydraulic action, abrasion, and attrition are the toolkit; vertical erosion dominates here. The age of the rock is not the age of the hole."
		],
		glossary: [
			{
				term: "Nick point",
				exam: "Knickpoint",
				def: "A break of slope, often a waterfall, that can retreat upstream."
			},
			{
				term: "Gorge",
				def: "Steep-sided valley, often the scar a retreating fall leaves."
			},
			{
				term: "Plunge pool",
				def: "Deep hollow at the foot of a fall, scoured by falling water and load."
			},
			{
				term: "Pothole",
				def: "Bed hollow where pebbles swirl and abrade."
			},
			{
				term: "V-valley",
				def: "Cross-profile of upland fluvial vertical erosion. Ice makes U."
			},
			{
				term: "Hydraulic action",
				def: "Force of water and trapped air on joints and the bed."
			},
			{
				term: "Abrasion",
				exam: "Corrasion",
				def: "Load scratching and grinding the bed and banks."
			},
			{
				term: "Attrition",
				def: "Load particles colliding and rounding each other."
			}
		],
		misconception: {
			claim: "Waterfalls stay put.",
			truth: "They retreat. Niagara is the famous slow walk."
		},
		misconceptions: [
			{
				claim: "Waterfalls stay put.",
				truth: "They retreat. Niagara is the famous slow walk. A Lake District fall on a resistant band does the same."
			},
			{
				claim: "Every valley is a canyon.",
				truth: "A canyon is a deep, steep-sided incision. V-valleys are upland fluvial. Ice makes U."
			},
			{
				claim: "The age of the canyon is the age of the rocks in the walls.",
				truth: "Rocks can be hundreds of millions of years old. The hole is much younger. Incision is not the birthday of the beds."
			}
		],
		cases: [{
			slug: "lake-district",
			label: "Lake District"
		}, {
			slug: "grand-canyon",
			label: "Grand Canyon incision"
		}],
		teacher: {
			script: "Freeze on the waterfall. Upper course: V-valley, fall, plunge pool.\nPlay nick-point retreat. The fall walks upstream.\nAsk what the gorge is. It is the scar the fall leaves as it retreats.\nWaterfalls do not stay put. Niagara is the famous slow walk.\nThat is the misconception.\nPotholes form where pebbles swirl and abrade the bed.\nHydraulic action, abrasion, attrition. Vertical erosion dominates here.\nV-valleys are upland fluvial. Ice makes U. Water makes V — until ice has been there first.\nGrand Canyon is a river cutting a plateau, not a glacial U. Vertical exaggeration is ×12 and labelled.\nDo not call every valley a canyon. Finish in Check.",
			pitfalls: [
				"Calling every valley a canyon.",
				"Teaching waterfalls as furniture that never moves.",
				"Confusing the age of the rocks with the age of the hole."
			]
		},
		sources: [{ label: "BGS fluvial" }, { label: "USGS" }],
		controls: { time: "none" }
	}),
	lab({
		slug: "river-deposition",
		title: "River deposition",
		hook: "When the water slows, the load sits down: slip-off slope, levée, floodplain, delta, estuary.",
		objective: "Name slip-off slope, levées, floodplain, delta, estuary and say why UK rivers often end in estuaries.",
		realm: "landforms",
		ages: [
			"KS3",
			"GCSE",
			"A-level"
		],
		curriculum: ["GCSE AQA 3.1.3.1", "A-level"],
		steps: steps("Inner bank: slip-off. Flood: levées and floodplain.", "Play the delta building into still water.", "Estuary if tides win. Delta if load wins."),
		questions: [
			q("A slip-off slope is…", [
				"The outer bank cliff",
				"Deposition on the inner bend of a meander",
				"A waterfall",
				"A stack"
			], 1, "Helicoidal flow dumps on the inside."),
			q("Levées form when…", [
				"Tides cut a cliff",
				"Floodwater leaves the channel and dumps coarse load on the banks",
				"Ice ploughs",
				"Wind piles sand"
			], 1, "Raised banks."),
			q("Many UK rivers end in estuaries because…", [
				"No load ever",
				"Tidal range and a drowned coast can outpace delta building",
				"No rain",
				"They are all glaciers"
			], 1, "Mississippi: huge load, modest tides."),
			q("The outer bank of a meander is mainly a site of…", [
				"Deposition of a point bar",
				"Erosion of a cut bank",
				"A terminal moraine",
				"A swallow hole"
			], 1, "Helicoidal flow: dump inside, cut outside.")
		],
		why: [
			"When the water slows, the load sits down. A Lake District beck rarely builds a classic delta because the load meets a lake or a tide that can take it. The Mississippi drops a continental load into a modest-tide Gulf and keeps a bird-foot delta. Somerset Levels are floodplain and levée at UK scale. Many UK rivers end in estuaries because tidal range and a drowned coast outpace delta building. GCSE AQA 3.1.3.1 and A-level fluvial both need that split. Channel management — dredge, levée, cut-off — fights or copies these processes. Students who label a UK estuary a delta to tidy the diagram will misread Holderness’s neighbour coasts and the Mississippi alike. Slip-off slope, levée, floodplain, delta, estuary: five names, one slowing.",
			"Helicoidal flow in a meander dumps on the inner bend: that is the slip-off slope, or point bar. The outer bank is the cut bank, eroded, not deposited. In flood, water leaves the channel; coarse load dumps first on the banks and builds levées; the rest of the floodplain takes finer sediment. A delta grows where a river enters stiller water faster than tides and waves can steal the load. An estuary is a tidal mouth: mixing, often no classic delta. Estuary if tides win; delta if load wins. Mississippi: huge load, modest tides. Many UK mouths: smaller load, larger tidal range, often a drowned valley. Play the lab and the flood stage rises; overbank water is the floodplain argument. Vertical exaggeration is labelled ×8 so meander, levée and delta fingers read from the back of the room. The channel is a teaching mesh, not the Parrett or the Mississippi traced. Water is a thin surface. Every river does not build a delta. Tides and waves can steal the load. Raised banks are levées, not walls invented by engineers — though engineers copy them. Somerset Levels sit on this machine at UK scale; the bird-foot at the Gulf is the same slowing with more sand.",
			"Point inner bank versus outer. Name the slip-off slope on the inside before you reveal the tag. Raise the idea of flood: coarse load on the banks is levées; the floodplain is the rest. Play until the delta fingers read, then ask estuary or delta and why a UK mouth often loses. Keyboard: space, arrows, L labels, R reset. Vertical exaggeration is ×8 and labelled. Play once, rewind, name the five landforms. Finish in Check. The wrong answer is that every river builds a delta.",
			"Without the 3D view: when water slows, load sits down. Inner bend: slip-off. Flood: levées and floodplain. Delta if load wins; estuary if tides win. Many UK rivers end in estuaries. Mississippi: huge load, modest tides. Somerset Levels are deposition at another scale. Vertical exaggeration is ×8 and labelled. Do not label a UK estuary a delta to make the diagram tidy. Helicoidal flow dumps on the inside; the outer bank is the cut. Engineers copy levées; they did not invent the process."
		],
		glossary: [
			{
				term: "Slip-off slope",
				exam: "Point bar",
				def: "Deposition on the inner bend of a meander."
			},
			{
				term: "Cut bank",
				def: "The outer bank, eroded by faster flow."
			},
			{
				term: "Levée",
				exam: "Levee",
				def: "Raised bank of coarse flood deposits."
			},
			{
				term: "Floodplain",
				def: "The floor a river builds and occasionally floods beside the channel."
			},
			{
				term: "Delta",
				def: "Load dropped into stiller water faster than tides and waves can steal it."
			},
			{
				term: "Estuary",
				def: "Tidal mouth. Mixing, often no classic delta."
			},
			{
				term: "Helicoidal flow",
				def: "The corkscrew current in a meander: outer erosion, inner deposition."
			}
		],
		misconception: {
			claim: "Every river builds a delta.",
			truth: "Tides and waves can steal the load."
		},
		misconceptions: [
			{
				claim: "Every river builds a delta.",
				truth: "Tides and waves can steal the load. Many UK mouths are estuaries."
			},
			{
				claim: "The outer bank is where the river dumps sand.",
				truth: "Outer is the cut bank. Inner is the slip-off slope. Helicoidal flow."
			},
			{
				claim: "Levées are only built by engineers.",
				truth: "Natural levées are coarse flood deposits on the banks. Engineers copy them."
			}
		],
		cases: [{
			slug: "mississippi",
			label: "Mississippi delta"
		}, {
			slug: "somerset-levels",
			label: "Somerset Levels"
		}],
		teacher: {
			script: "Point inner bank versus outer. Slip-off slope is deposition on the inner bend.\nRaise the idea of flood. Coarse load dumps on the banks: levées. The floodplain is the rest.\nPlay the delta building into still water.\nEvery river does not build a delta. Tides and waves can steal the load.\nThat is the misconception.\nEstuary if tides win. Delta if load wins.\nMany UK rivers end in estuaries because tidal range and a drowned coast can outpace delta building.\nMississippi: huge load, modest tides. Somerset Levels are deposition at another scale.\nVertical exaggeration is ×8 and labelled. Do not label a UK estuary a delta to make the diagram tidy.\nFinish in Check.",
			pitfalls: [
				"UK ‘deltas’ that are estuaries.",
				"Mixing inner-bank deposition with outer-bank erosion.",
				"Teaching levées as only an engineering product."
			]
		},
		sources: [{ label: "USGS Mississippi" }, { label: "BGS" }],
		controls: { time: "none" }
	}),
	lab({
		slug: "river-capture",
		title: "River capture",
		hook: "A more aggressive neighbour can steal a headwater. The elbow is the scar.",
		objective: "Animate elbow of capture and a beheaded stream.",
		realm: "landforms",
		ages: [
			"GCSE",
			"A-level",
			"NGSS MS"
		],
		curriculum: ["GCSE", "A-level fluvial"],
		steps: steps("Two catchments. One nick point is lower.", "Play: the pirate cuts back, captures, elbow forms, the loser is beheaded.", "Wind gap / dry valley may remain."),
		questions: [
			q("An elbow of capture is…", [
				"A meander",
				"A sharp bend where the captured stream now turns into the pirate",
				"A delta",
				"A spit"
			], 1, "The turn is the evidence."),
			q("A beheaded stream…", [
				"Gains water",
				"Loses its headwaters and often shrinks",
				"Becomes a glacier",
				"Always dries in a day"
			], 1, "Misfit in a too-big valley."),
			q("Capture is more likely when…", [
				"Both rivers sit at the same height forever",
				"One has a steeper gradient or weaker rock and cuts back faster",
				"There is no rain",
				"Tides are huge"
			], 1, "Headward erosion."),
			q("Old River on the Mississippi is…", [
				"A waterfall",
				"Capture at engineering scale — the Atchafalaya would take the flow",
				"A spit",
				"A cirque"
			], 1, "USACE holds a steal the hills would finish.")
		],
		why: [
			"Watersheds move. A more aggressive neighbour can steal a headwater, and the elbow is the scar. Old River on the Mississippi is capture at engineering scale: the Atchafalaya would take the flow if the USACE structure were not there. UK upland divides in the Lake District and the Pennines have quieter elbows and misfit beheaded streams. GCSE and A-level fluvial treat capture as headward erosion, not magic. A wind gap or dry valley may remain where the loser used to flow. Students who think a watershed is a fence that never moves will misread both a UK divide and the Old River Control Structure. The pirate is the steeper or weaker-rock neighbour. The loser shrinks. That steal is slow in the hills and sudden only in the cartoon.",
			"Two catchments. One nick point is lower. The pirate cuts back by headward erosion, captures the higher stream, and the water turns: that sharp bend is the elbow of capture. The loser is a beheaded stream, often a misfit in a too-big valley. A wind gap or dry valley may remain on the old course. Capture is more likely when one river has a steeper gradient or weaker rock and so cuts back faster. It is not instant. Play the lab: before the steal, two valleys; after, an elbow, a wind gap, a beheaded reach. Vertical exaggeration is labelled ×10 so the two valley floors and the divide read from the back of the room; true divide relief on a table would almost vanish. Water is a thin surface. The mesh is teaching terrain, not a traced Atchafalaya. Old River is the named US case: capture that engineers spend a century holding back. Lake District divides are the UK pair, slower, still the same steal. Watersheds are not painted fences. Headward erosion moves them. The elbow is the evidence; the wind gap is the ghost of the old route; the beheaded stream is the loser living in a valley cut for more water than it now has.",
			"Pause before capture. Two catchments. One nick point is lower. Predict which neighbour is the pirate before you press play. Play: the pirate cuts back, captures, an elbow forms, the loser is beheaded. Name the elbow of capture and the wind gap out loud. Keyboard: space, arrows, L labels, R reset. Vertical exaggeration is ×10 and labelled. Do not skip the pause before the steal. Finish in Check. The wrong answer is that watersheds never move, or that capture is instant magic.",
			"Without the 3D view: a lower, steeper neighbour can cut back and steal a headwater. The elbow is the turn into the pirate. The beheaded stream is the loser, often a misfit in a too-big valley. A wind gap may remain. Watersheds move by headward erosion. Old River on the Mississippi is capture at engineering scale. Lake District divides are the quieter UK pair. Vertical exaggeration is ×10 and labelled. It is not instant magic. The pirate is the steeper or weaker-rock neighbour."
		],
		glossary: [
			{
				term: "Elbow of capture",
				def: "Sharp turn at the capture point, where water now flows into the pirate."
			},
			{
				term: "Beheaded stream",
				def: "The loser, missing its headwaters, often a misfit in a too-big valley."
			},
			{
				term: "Pirate stream",
				def: "The aggressor that captures by headward erosion."
			},
			{
				term: "Wind gap",
				def: "A dry col on the old course, left after capture."
			},
			{
				term: "Headward erosion",
				def: "Cutting back at the source, which can move a watershed."
			},
			{
				term: "Watershed",
				exam: "Drainage divide",
				def: "The rim of a catchment. It can move."
			},
			{
				term: "Misfit stream",
				def: "A stream too small for the valley it occupies — often a beheaded loser."
			}
		],
		misconception: {
			claim: "Watersheds never move.",
			truth: "Headward erosion moves them."
		},
		misconceptions: [
			{
				claim: "Watersheds never move.",
				truth: "Headward erosion moves them. The elbow is the scar."
			},
			{
				claim: "Capture is instant magic.",
				truth: "It is slow headward cutting. A wind gap or dry valley may remain."
			},
			{
				claim: "The beheaded stream gains water.",
				truth: "It loses its headwaters and often shrinks. Misfit in a too-big valley."
			}
		],
		cases: [{
			slug: "mississippi",
			label: "Mississippi / Atchafalaya"
		}, {
			slug: "lake-district",
			label: "UK upland divides"
		}],
		teacher: {
			script: "Pause before capture. Two catchments. One nick point is lower.\nPredict which neighbour is the pirate.\nPlay: the pirate cuts back, captures, an elbow forms, the loser is beheaded.\nName the elbow of capture: the sharp turn into the pirate.\nName the beheaded stream: missing its headwaters, often a misfit in a too-big valley.\nName the wind gap: the ghost of the old course.\nWatersheds do move. Headward erosion moves them.\nThat is the misconception.\nCapture is more likely when one has a steeper gradient or weaker rock and cuts back faster. It is not instant magic.\nOld River is the US engineering-scale steal. Vertical exaggeration is ×10 and labelled. Finish in Check.",
			pitfalls: [
				"Teaching capture as instant magic.",
				"Drawing watersheds as fences that never move.",
				"Forgetting the wind gap as evidence."
			]
		},
		sources: [{ label: "USACE Old River" }, { label: "BGS" }],
		controls: { time: "none" }
	}),
	lab({
		slug: "coasts",
		title: "Coasts",
		hook: "Constructive waves build. Destructive waves take. Longshore drift is the conveyor. Cave–arch–stack–stump is the headland’s life.",
		objective: "Toggle wave type, watch longshore particles, step cave to stump, and grow a spit.",
		realm: "landforms",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: ["GCSE AQA 3.1.3.2", "NGSS MS-ESS2-2"],
		steps: steps("Constructive: strong swash. Destructive: backwash wins.", "Particles walk alongshore. A spit grows where the coast turns.", "Stage slider: cave, arch, stack, stump."),
		questions: [
			q("Longshore drift moves sediment…", [
				"Straight out to sea only",
				"Along the beach in the direction of the angled swash",
				"Only on rivers",
				"Up cliffs"
			], 1, "Zigzag of swash and backwash."),
			q("A stack is…", [
				"A spit",
				"An isolated pillar after an arch collapses",
				"A levée",
				"A cirque"
			], 1, "Cave → arch → stack → stump."),
			q("Mappleton groynes…", [
				"Create sand everywhere",
				"Trap sediment up-drift and can starve down-drift",
				"Stop the Earth rotating",
				"Build deltas"
			], 1, "Holderness bargain."),
			q("A sea wall along a whole coast…", [
				"Fixes the sediment budget forever",
				"Moves the problem along the budget",
				"Creates a delta",
				"Stops longshore drift worldwide"
			], 1, "Protection here, starvation there. Holderness and the Outer Banks share the budget idea.")
		],
		why: [
			"Holderness till cliffs lose metres a year into the North Sea; Mappleton’s groynes trap sand up-drift and can starve down-drift. Spurn Head is the spit at the turn into the Humber. The Outer Banks of North Carolina are sand in a barrier-island chain, not a till cliff, with longshore drift, storm inlets, and Cape Hatteras as a famous turn. Same budget idea: supply, transport, deposition, interruption. The Jurassic Coast writes cave–arch–stack–stump in Lias and chalk — Durdle Door, Old Harry — a harder lithology, a slower headland life. GCSE AQA 3.1.3.2 and NGSS MS-ESS2-2 both need wave type, longshore drift, and a headland sequence, plus the honesty that a sea wall does not fix the whole coast. It moves the problem along the budget.",
			"Constructive waves: strong swash, a berm can build. Destructive waves: backwash wins, the cliff is cut. Longshore drift is the conveyor: angled swash, backwash down the steepest slope, sediment walking alongshore. A spit grows where the coast turns and the drift has somewhere to dump. Cave, arch, stack, stump is the headland’s life: joints exploited, roof fails, pillar stands, stump sits in the surf. Hydraulic action, abrasion, attrition, plus weathering from above. Holderness is glacial till — boulder clay, not lithified rock — so the sequence is fast enough to see in a school lifetime. Jurassic Coast headlands are harder rock; the sequence is the same, slower. Outer Banks: barrier sand, overwash, inlets; not a cliff, still a budget. Vertical exaggeration is labelled ×6 so cliff, berm, and headland stages read from the back of the room. Particles are a teaching sprinkle, not a grain-size model. Groynes and sea walls interrupt the conveyor; they do not cancel it. One landform, one process, no budget is the pitfall. Mappleton is the bargain: protection here, starvation there. Spurn is the depositional end-member, not immortal. A barrier island is not a permanent wall; storms punch inlets and the island can roll toward the mainland.",
			"Toggle Constructive waves on. Strong swash builds a berm. Toggle off: destructive, backwash wins, the till cliff is cut. Leave Longshore particles on; sediment walks alongshore in the direction of the angled swash. Freeze on the spit where the coast turns. Scrub Headland stage: cave, arch, stack, stump. Ask where a groyne would starve the spit. Keyboard: L labels, R reset. Vertical exaggeration is ×6 and labelled. Finish in Check. Mappleton groynes trap up-drift and can starve down-drift. Sea walls do not fix the whole coast.",
			"Without the 3D view: constructive waves build, destructive waves take, longshore drift is the conveyor, cave–arch–stack–stump is the headland’s life. Holderness till versus Outer Banks sand: same budget, different landform. Jurassic Coast is the harder-rock sequence. Sea walls move the problem along the budget. Vertical exaggeration is ×6 and labelled. Groynes are a bargain, not a cure. Spurn Head is a spit, not a promise. A barrier is not a permanent wall. Supply, transport, deposition, interruption: say the four words."
		],
		glossary: [
			{
				term: "Constructive wave",
				def: "Strong swash, weaker backwash. Can build a berm."
			},
			{
				term: "Destructive wave",
				def: "Backwash wins. Cuts the beach and attacks the cliff."
			},
			{
				term: "Longshore drift",
				def: "Alongshore transport by angled waves."
			},
			{
				term: "Spit",
				def: "Beach that grows out where the coast turns."
			},
			{
				term: "Stack",
				def: "Pillar left after an arch collapses."
			},
			{
				term: "Stump",
				def: "What remains in the surf after a stack fails."
			},
			{
				term: "Groyne",
				def: "A barrier across the beach that traps sediment up-drift and can starve down-drift."
			},
			{
				term: "Sediment budget",
				def: "Supply, transport, deposition, interruption. The whole-coast accounts."
			}
		],
		misconception: {
			claim: "Sea walls fix the whole coast.",
			truth: "They move the problem along the budget."
		},
		misconceptions: [
			{
				claim: "Sea walls fix the whole coast.",
				truth: "They move the problem along the budget. Protection here, starvation there."
			},
			{
				claim: "A stack is a spit.",
				truth: "A stack is an isolated pillar after an arch collapses. A spit is a beach that grows where the coast turns."
			},
			{
				claim: "Holderness and the Outer Banks are the same landform.",
				truth: "Till cliff versus barrier sand. Shared budget: supply, transport, deposition, interruption."
			}
		],
		cases: [{
			slug: "holderness",
			label: "Holderness"
		}, {
			slug: "outer-banks",
			label: "Outer Banks"
		}],
		teacher: {
			script: "Toggle Constructive waves on. Strong swash builds. Toggle off: destructive, backwash wins.\nLeave Longshore particles on. Sediment walks alongshore in the direction of the angled swash.\nFreeze on the spit. It grows where the coast turns.\nScrub Headland stage: cave, arch, stack, stump.\nA stack is an isolated pillar after an arch collapses.\nSea walls do not fix the whole coast. They move the problem along the budget.\nThat is the misconception.\nMappleton groynes trap sediment up-drift and can starve down-drift. Holderness is that bargain.\nJurassic Coast is the harder-rock sequence. Outer Banks are sand barriers, same budget idea.\nVertical exaggeration is ×6 and labelled. One landform, one process, no budget is the pitfall. Finish in Check.",
			pitfalls: [
				"One landform, one process, no budget.",
				"Calling a stack a spit, or a spit a stack.",
				"Teaching a sea wall as a whole-coast cure."
			]
		},
		sources: [{ label: "BGS Holderness" }, { label: "USGS barriers" }],
		controls: {
			time: "none",
			extra: [{
				key: "stage",
				label: "Headland stage",
				min: 0,
				max: 3,
				step: 1,
				default: 1
			}],
			toggles: [{
				key: "constructive",
				label: "Constructive waves",
				defaultOn: true
			}, {
				key: "drift",
				label: "Longshore particles",
				defaultOn: true
			}]
		}
	}),
	lab({
		slug: "glaciers",
		title: "Glacial landforms",
		hook: "Ice is a river that can be a kilometre thick. It leaves a cirque, an arête, a horn, a U, and a pile of till.",
		objective: "Name cirque, arête, horn, U-trough, moraines and play ice advance/retreat.",
		realm: "landforms",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: ["GCSE AQA 3.1.3.3", "NGSS MS-ESS2-2"],
		steps: steps("Cirque armchair, arête knife, horn peak.", "Play ice: U-trough deepens. Moraines dump at the snout.", "Ice vs water: U vs V."),
		questions: [
			q("An arête is…", [
				"A spit",
				"A knife ridge between two cirques",
				"A delta",
				"A barchan"
			], 1, "Two cwms eating a ridge."),
			q("A horn is…", [
				"Three or more cirques eating a peak",
				"A stack",
				"A levée",
				"A sinkhole"
			], 0, "Pyramidal peak."),
			q("A U-shaped trough vs a V…", [
				"Same process",
				"Ice overdeepens a wide floor; rivers cut a V",
				"Wind",
				"Tides"
			], 1, "Yosemite vs a beck."),
			q("Yosemite Valley is mainly…", [
				"A river canyon like the Grand Canyon",
				"A glacial U-trough in granite",
				"A limestone pavement",
				"A barchan field"
			], 1, "Ice in granite. Grand Canyon is a river in a plateau. Cross-profile tells them apart.")
		],
		why: [
			"Ice is a river that can be a kilometre thick. It leaves a cirque, an arête, a horn, a U, and a pile of till. The Lake District and Snowdonia are the UK pair: Helvellyn’s Red Tarn, Striding Edge, Crib Goch, cwms eating a ridge. Yosemite is the US pair: a deeper U in granite, hanging valleys, Half Dome, moraines down-valley. Same ice logic, different rock and a different poster. GCSE AQA 3.1.3.3 and NGSS MS-ESS2-2 both need U versus V, and the honesty that Yosemite is not a river canyon like the Grand Canyon. Glaciers exist where snow survives the year — latitude and altitude — not only at the poles. A UK upland trough with a beck in the floor is ice first, water second.",
			"A cirque (cwm, corrie) is an armchair hollow with a steep backwall. Two cirques eating a ridge leave an arête, a knife. Three or more eating a peak leave a horn, a pyramidal peak. Ice overdeepens a wide floor: a U-trough, truncated spurs, hanging valleys that dump waterfalls. Till is dumped as moraines — lateral, medial, terminal — at the ice margin. A drumlin is a streamlined till hill. Play advance: the tongue thickens and the U deepens. Play retreat: the snout dumps the pile. Ice versus water is U versus V. Yosemite is ice in granite; the Grand Canyon is a river in a plateau; do not swap the names. Vertical exaggeration is labelled ×6. Ice has thickness; it is not a white sticker on a hill. The tongue is a teaching flow, not a traced glacier. Lake District ice is mostly gone; the landforms remain. Yosemite’s glaciers are remnants; the valley is the scar. Glaciers are not only polar. They exist where snow survives the year. Abrasion and plucking do the cutting; freeze–thaw helps the backwall. A hanging valley is a tributary trough left high when the trunk ice overdeepened. That is why Yosemite Falls start in mid-air.",
			"Labels off. Name cirque, arête, horn before you reveal. Cirque is the armchair. Arête is the knife between two cirques. Horn is three or more eating a peak. Advance the ice; the U-trough deepens. Retreat to the snout; moraines dump till. Keyboard: space, arrows, L labels, R reset. Vertical exaggeration is ×6; ice is thick, not a sticker. Till is the pile. The landform names are the scar. Finish in Check. Yosemite is not a river canyon like the Grand Canyon. Lake District and Yosemite are the pair.",
			"Without the 3D view: ice is a thick river. Cirque armchair, arête knife, horn peak, U-trough, moraine pile. Ice versus water is U versus V. Lake District and Yosemite are the pair. Snowdonia’s Crib Goch is an arête you remember with your hands. Glaciers exist where snow survives the year, not only at the poles. Vertical exaggeration is ×6 and labelled. Ice has thickness. Do not call Yosemite a river canyon like the Grand Canyon. Till is the pile; the names are the scar."
		],
		glossary: [
			{
				term: "Cirque",
				exam: "Cwm / corrie",
				def: "Armchair hollow with a steep backwall."
			},
			{
				term: "Arête",
				def: "Knife ridge between cirques."
			},
			{
				term: "Horn",
				def: "Pyramidal peak eaten by three or more cirques."
			},
			{
				term: "U-trough",
				exam: "Glacial trough",
				def: "Wide floor and steep walls overdeepened by ice."
			},
			{
				term: "Moraine",
				def: "Till ridge dumped by ice at the margin."
			},
			{
				term: "Till",
				def: "Unsorted debris dropped by ice. The pile."
			},
			{
				term: "Hanging valley",
				def: "A tributary trough left high when the trunk ice overdeepened."
			},
			{
				term: "Drumlin",
				def: "Streamlined till hill, blunt up-ice, tapered down-ice."
			}
		],
		misconception: {
			claim: "Glaciers only exist at the poles.",
			truth: "They exist where snow survives the year. Latitude and altitude."
		},
		misconceptions: [
			{
				claim: "Glaciers only exist at the poles.",
				truth: "They exist where snow survives the year. Latitude and altitude."
			},
			{
				claim: "Yosemite is a river canyon like the Grand Canyon.",
				truth: "Yosemite is ice in granite — a U. Grand Canyon is a river in a plateau. Cross-profile tells them apart."
			},
			{
				claim: "Ice is a white sticker on a hill.",
				truth: "Ice is a thick river. It has thickness. Vertical exaggeration here is ×6 and labelled."
			}
		],
		cases: [{
			slug: "lake-district",
			label: "Lake District"
		}, {
			slug: "yosemite",
			label: "Yosemite"
		}],
		teacher: {
			script: "Labels off. Name cirque, arête, horn before you reveal.\nCirque is the armchair. Arête is the knife between two cirques. Horn is three or more eating a peak.\nAdvance the ice. The U-trough deepens.\nRetreat to the snout. Moraines dump till.\nIce versus water: U versus V. Yosemite is not a river canyon like the Grand Canyon.\nGlaciers do not only exist at the poles. They exist where snow survives the year.\nLatitude and altitude. That is the misconception.\nLake District and Yosemite are the pair. Snowdonia’s Crib Goch is an arête you remember with your hands.\nVertical exaggeration is ×6. Ice has thickness; it is not a white sticker.\nTill is the pile. The landform names are the scar. Finish in Check.",
			pitfalls: [
				"Calling Yosemite a river canyon like the Grand Canyon.",
				"Teaching glaciers as polar-only.",
				"Drawing ice as a white sticker with no thickness."
			]
		},
		sources: [{ label: "BGS glaciation" }, { label: "NPS Yosemite" }],
		controls: { time: "none" }
	}),
	lab({
		slug: "karst",
		title: "Karst",
		hook: "Limestone does not just break. It dissolves along joints: pavement, swallow hole, cave.",
		objective: "Read clints and grykes, a sinkhole, and a cave passage.",
		realm: "landforms",
		ages: [
			"KS3",
			"GCSE",
			"A-level"
		],
		curriculum: ["GCSE", "A-level carbonation"],
		steps: steps("Pavement: clints and grykes.", "A stream swallows. Toggle the cutaway cave.", "Carbonation plus joints. Granite does not do this."),
		questions: [
			q("Grykes are…", [
				"Sand dunes",
				"Dissolved fissures between clints on a limestone pavement",
				"Moraines",
				"Spits"
			], 1, "Joints widened."),
			q("A swallow hole…", [
				"A stack",
				"Where a surface stream sinks underground",
				"A volcano",
				"A time zone"
			], 1, "Gaping Gill is the UK poster."),
			q("Karst clusters on carbonate rocks because…", [
				"They are magnetic",
				"Carbonation of CaCO₃ along joints",
				"They never joint",
				"Wind only"
			], 1, "Chemistry."),
			q("The caves in this lab are…", [
				"Lava tubes",
				"Solution caves in carbonate",
				"Glacial tunnels only",
				"Faults pulled open"
			], 1, "Carbonation, not magma. Granite does not do this.")
		],
		why: [
			"Limestone does not just break. It dissolves along joints: pavement, swallow hole, cave. The Yorkshire Dales are the UK classroom — Malham Cove’s clints and grykes, Gaping Gill taking Fell Beck underground, a resurgence kilometres away. Mammoth Cave, Kentucky, is the US pair: a long, lower-gradient carbonate system in Mississippian limestone, sinkholes on the Chester Upland, the same chemistry at a different map scale. GCSE and A-level carbonation both need that sequence. Soil is thin. Farmers talk limestone in the same breath as drainage. Students who think caves are lava tubes, or that every hole is a volcano, will misread both Malham and Mammoth. Granite does not do this. Chemistry, not magnetism. A surface watershed on limestone may not match the cave.",
			"Rainwater picks up carbon dioxide and becomes a weak carbonic acid. It works on calcium carbonate along bedding and joints. The surface becomes a limestone pavement: clints are the blocks, grykes the dissolved fissures. A stream that meets a swallow hole (sinkhole, doline) leaves the surface and may return as a resurgence. Cave passages follow joints and bedding; stalactites need a drip with time. Carbonation plus joints is the machine. Granite does not dissolve that way; these are solution caves in carbonate, not lava tubes. Toggle the cutaway and the chamber appears under the doline. Vertical exaggeration is labelled ×6 so pavement, grykes, and the doline cone read from the back of the room. True grykes on a table would be scratches. The pavement is teaching terrain, not a traced Malham sheet. Gaping Gill is the UK poster for a swallow. Mammoth Cave is the long US system. Karst clusters on carbonate rocks because of chemistry. Sequence it: rainfall, carbonation, widened joints, swallow hole, cave passage, then a stalactite if the drip has time. Gordale Scar is a different argument — a gorge, possibly collapse or meltwater — still useful, still not a volcano.",
			"Pavement first. Clints are the blocks. Grykes are the dissolved fissures between them. A stream swallows — that is the swallow hole, where drainage leaves the surface. Toggle Cave cutaway on. A passage in carbonate, not a lava tube. Keyboard: L labels, R reset. Vertical exaggeration is ×6 and labelled. Granite does not do this. Say so. Finish in Check. Yorkshire Dales pavement and Mammoth Cave are the pair. Every hole is not a volcano. Gaping Gill is the UK poster for a swallow.",
			"Without the 3D view: carbonation of limestone along joints makes pavement, swallow holes, and solution caves. Clints and grykes. A swallow is where a stream leaves the surface. These are not lava tubes. Granite does not do this. Yorkshire Dales and Mammoth Cave are the pair. Vertical exaggeration is ×6 and labelled. Chemistry, not magnetism. Gaping Gill is the UK poster. A surface divide on karst may not match the cave beneath. Sequence rainfall to stalactite if you have time."
		],
		glossary: [
			{
				term: "Limestone pavement",
				def: "Clints and grykes on a bare carbonate surface."
			},
			{
				term: "Clint",
				def: "The block on a limestone pavement."
			},
			{
				term: "Gryke",
				exam: "Grike",
				def: "Dissolved fissure between clints."
			},
			{
				term: "Swallow hole",
				exam: "Sinkhole / doline",
				def: "Point where drainage leaves the surface."
			},
			{
				term: "Carbonation",
				def: "Weak carbonic acid working on calcium carbonate."
			},
			{
				term: "Resurgence",
				def: "Where underground drainage returns to the surface."
			},
			{
				term: "Stalactite",
				def: "Dripstone growing down from a cave roof, if the drip has time."
			}
		],
		misconception: {
			claim: "Caves are lava tubes.",
			truth: "These are solution caves in carbonate."
		},
		misconceptions: [
			{
				claim: "Caves are lava tubes.",
				truth: "These are solution caves in carbonate. Carbonation along joints."
			},
			{
				claim: "Every hole is a volcano.",
				truth: "A swallow hole is where a stream leaves the surface on limestone. Not magma."
			},
			{
				claim: "Granite does this too if it rains hard enough.",
				truth: "Karst clusters on carbonate rocks because of chemistry, not rainfall volume alone."
			}
		],
		cases: [{
			slug: "yorkshire-dales",
			label: "Yorkshire Dales"
		}, {
			slug: "mammoth-cave",
			label: "Mammoth Cave"
		}],
		teacher: {
			script: "Pavement first. Clints are the blocks. Grykes are the dissolved fissures between them.\nA stream swallows. That is the swallow hole, where drainage leaves the surface.\nToggle Cave cutaway on. A passage in carbonate, not a lava tube.\nThese are solution caves. Carbonation of calcium carbonate along joints.\nGranite does not do this. Every hole is not a volcano.\nThat is the misconception, plus the lava-tube mix-up.\nKarst clusters on carbonate rocks because of chemistry, not magnetism.\nYorkshire Dales pavement and Mammoth Cave are the pair.\nGaping Gill is the UK poster for a swallow. Vertical exaggeration is ×6 and labelled.\nFinish in Check.",
			pitfalls: [
				"Every hole is a volcano.",
				"Calling solution caves lava tubes.",
				"Teaching granite as a karst rock."
			]
		},
		sources: [{ label: "BGS karst" }, { label: "NPS Mammoth Cave" }],
		controls: {
			time: "none",
			toggles: [{
				key: "cutaway",
				label: "Cave cutaway"
			}]
		}
	}),
	lab({
		slug: "folds-faults",
		title: "Folds and faults",
		hook: "Rocks bend or they break. Anticline, syncline, then the three fault slips.",
		objective: "Identify anticline, syncline, normal, reverse, and strike-slip, and explode the blocks.",
		realm: "interior",
		ages: [
			"GCSE",
			"A-level",
			"NGSS MS",
			"HS Earth Sci"
		],
		curriculum: ["GCSE AQA 3.1.1", "NGSS MS-ESS2-2"],
		steps: steps("Anticline up, syncline down.", "Explode. Normal (extension), reverse (shortening), strike-slip (San Andreas).", "Inversion can lift an old basin."),
		questions: [
			q("An anticline is…", [
				"A downfold",
				"An upfold; oldest rocks in the core",
				"A spit",
				"A cell"
			], 1, "A-shape."),
			q("A normal fault forms in…", [
				"Compression",
				"Extension; hanging wall down",
				"Only ice",
				"Only granite"
			], 1, "Stretch."),
			q("San Andreas is…", [
				"Normal",
				"Reverse",
				"Strike-slip (transform)",
				"A fold only"
			], 2, "Slide past."),
			q("The hanging wall is…", [
				"Always the downthrown block",
				"The block above the fault plane",
				"A cliff of till",
				"Only found in folds"
			], 1, "Above the plane. Footwall is below. Get the names right before the arrows.")
		],
		why: [
			"Rocks bend or they break. Jurassic Coast folds — Lulworth, the crumpled beds in the cliffs — are the UK locator: anticline up, syncline down, in sedimentary sequence you can walk. San Andreas is the US locator for strike-slip: Pacific plate northwest, North American plate southeast, fences offset, no volcano chain. GCSE AQA 3.1.1 and NGSS MS-ESS2-2 both need two folds and three fault slips. Inversion can lift an old basin. Students who think folds only happen in soft clay, or who mix hanging wall with footwall, will misread both a Dorset cliff and a Californian fence. Given time and depth, rock flows. Then it may still break. Cascadia to the north of San Andreas is a different boundary and a different volcano story.",
			"An anticline is an upfold, oldest rocks in the core, A-shape. A syncline is a downfold. Normal fault: extension, hanging wall down. Reverse (and thrust): shortening, hanging wall up. Strike-slip: horizontal slip, transform cousin — San Andreas is the named slide. Hanging wall is the block above the fault plane; footwall is below. Get the names right before the arrows. Explode the blocks so the slip reads from the back of the room: the gap is labelled teaching, not a canyon. Beds in this lab are a sine fold of sandstone, limestone, shale, greywacke, basalt — a schematic stack, not a traced Lulworth log. Folds are not only for soft clay. Given time and depth, rock flows; then it may still break. Inversion can lift an old basin into a high. Jurassic Coast folds are the walkable UK pair. San Andreas is strike-slip, not a fold only, and not Cascadia’s subduction. Three fault slips, two folds, one explode control. The explode gap is the honesty caption: we pull the walls apart so the class can see hanging wall versus footwall. Real faults are not that open. Colour of the beds is a legend, not a law of lithology.",
			"Name the fold. Anticline up, oldest in the core. Syncline down. Explode the blocks. Normal: hanging wall down. Reverse: hanging wall up. Strike-slip: lateral. Point at the San Andreas colour and say transform cousin, slide past. Keyboard: E explode, L labels, R reset. Hanging wall versus footwall: get the names right before the arrows. Folds are not only for soft clay. Inversion can lift an old basin. Use the explode control. Finish in Check. Jurassic Coast folds are the other locator.",
			"Without the 3D view: rocks bend or they break. Anticline up, syncline down. Normal in extension (hanging wall down), reverse in shortening (hanging wall up), strike-slip sideways. San Andreas is strike-slip. Jurassic Coast folds are the UK walk. Exploded blocks are a labelled teaching gap, not a canyon. Folds can happen in hard rock given time and depth. Then rock may still break. Inversion can lift an old basin. Get hanging wall and footwall right before the arrows. Three fault slips, two folds. Cascadia is not this machine."
		],
		glossary: [
			{
				term: "Anticline",
				def: "Upfold. Oldest rocks in the core."
			},
			{
				term: "Syncline",
				def: "Downfold."
			},
			{
				term: "Normal fault",
				def: "Extension. Hanging wall down."
			},
			{
				term: "Reverse fault",
				def: "Shortening. Hanging wall up. Thrust if the plane is gentle."
			},
			{
				term: "Strike-slip",
				def: "Horizontal slip. Transform cousin."
			},
			{
				term: "Hanging wall",
				def: "The block above the fault plane."
			},
			{
				term: "Footwall",
				def: "The block below the fault plane."
			},
			{
				term: "Inversion",
				def: "An old basin later lifted, so low becomes high."
			}
		],
		misconception: {
			claim: "Folds only happen in soft clay.",
			truth: "Given time and depth, rock flows. Then it may still break."
		},
		misconceptions: [
			{
				claim: "Folds only happen in soft clay.",
				truth: "Given time and depth, rock flows. Then it may still break."
			},
			{
				claim: "The hanging wall is always the downthrown side.",
				truth: "Hanging wall is the block above the plane. It goes down in a normal fault, up in a reverse fault."
			},
			{
				claim: "San Andreas is a fold, or a subduction zone like Cascadia.",
				truth: "It is strike-slip. Cascadia to the north is the subduction zone."
			}
		],
		cases: [{
			slug: "san-andreas",
			label: "San Andreas"
		}, {
			slug: "jurassic-coast",
			label: "Jurassic Coast folds"
		}],
		teacher: {
			script: "Name the fold. Anticline up, oldest in the core. Syncline down.\nFolds are not only for soft clay. Given time and depth, rock flows. Then it may still break.\nThat is the misconception.\nExplode the blocks. Normal fault: extension, hanging wall down.\nReverse: shortening, hanging wall up. Strike-slip: horizontal slip.\nPoint at the San Andreas colour. Transform cousin, slide past. Not Cascadia.\nHanging wall versus footwall: get the names right before the arrows.\nInversion can lift an old basin. Jurassic Coast folds are the other locator.\nThe explode gap is labelled teaching, not a canyon. Real faults are not that open.\nThree fault slips, two folds, one explode control. Use it. Finish in Check.",
			pitfalls: [
				"Hanging wall vs footwall mix-up.",
				"Teaching folds as clay-only.",
				"Colouring San Andreas as Cascadia’s subduction."
			]
		},
		sources: [{ label: "USGS faults" }, { label: "BGS structure" }],
		controls: {
			time: "none",
			explode: true
		}
	}),
	lab({
		slug: "aeolian",
		title: "Wind landforms",
		hook: "Yardangs are carved. Barchans are built. Wind is a sculptor where vegetation is thin.",
		objective: "Orbit a yardang ridge and a barchan, and play sand along the horns.",
		realm: "landforms",
		ages: [
			"GCSE",
			"A-level",
			"NGSS MS"
		],
		curriculum: ["A-level", "NGSS MS-ESS2-2"],
		steps: steps("Yardang: streamlined ridge, wind-parallel.", "Barchan: crescent, horns downwind.", "World examples, not a single-country exam core."),
		questions: [
			q("A barchan’s horns point…", [
				"Upwind",
				"Downwind",
				"Always north",
				"To the sea only"
			], 1, "Crescent; horns downwind."),
			q("A yardang is…", [
				"A spit",
				"A wind-carved ridge",
				"A moraine",
				"A meander"
			], 1, "Erosional."),
			q("Aeolian work needs…", [
				"A rainforest canopy",
				"Loose sediment and enough wind, often sparse vegetation",
				"A glacier always",
				"Tides"
			], 1, "Dust Bowl was land use plus drought plus wind."),
			q("The Dust Bowl’s headline process was…", [
				"A barchan dune sea covering the plains",
				"Deflation of a bare A horizon after plough and drought",
				"A lava tube",
				"Nick-point retreat"
			], 1, "Land use plus drought plus wind. Not a textbook erg as the default landform.")
		],
		why: [
			"Yardangs are carved. Barchans are built. Wind is a sculptor where vegetation is thin. The Dust Bowl is the process without needing a Chinese exam map as the hero: 1930s Great Plains, a plough, a drought, a wind that took the A horizon off the prairie. Deflation and transport of farmed silt, not a textbook dune sea. Grand Canyon country is dryland weathering and wind on rock and pavement as much as sand. UK blown sand on some coasts and bare peat in a dry spring are the small cousins. GCSE is light here; A-level and NGSS MS-ESS2-2 still need carved versus built, and the honesty that many deserts are rock. Dunes need a sand supply. Land use plus drought plus wind is the Dust Bowl sentence, not a morality play.",
			"A yardang is a streamlined wind-eroded ridge, wind-parallel — carved. A barchan is a crescent dune, horns pointing downwind — built. Play the lab and sand walks along the horns; the crescent migrates downwind. Aeolian work needs loose sediment and enough wind, often sparse vegetation. All deserts are not dune seas. Many are rock and pavement. Dunes need a sand supply. Dust Bowl was land use plus drought plus wind, deflation of an A horizon, not a barchan field as the default landform. Yardangs and barchans are the world-example kit. Vertical exaggeration is labelled ×8 so the carved ridges and the built crescents read from the back of the room. True dune relief on a table would be a film of sand. The mesh is teaching terrain, not a traced erg. Horns point downwind, not upwind, not always north. Carved versus built. Say the pair. A nabkha is sand trapped at a plant; that is vegetation as roughness, the opposite of a bare Dust Bowl field. Wind direction is the arrow in this lab. Saltation hops grains; suspension takes dust. The 1930s black blizzards were suspension of farmed silt, not a yardang lesson first.",
			"Orbit the yardang. It is a wind-carved ridge, streamlined, wind-parallel. Then the barchan: a crescent, horns downwind. Carved versus built. Say the pair out loud. Play sand along the horns and watch the crescent migrate. Keyboard: space, arrows, L labels, R reset. Vertical exaggeration is ×8 and labelled. This is not the homepage special effect. Keep it as a process. Finish in Check. All deserts are not dune seas. Dust Bowl was land use plus drought plus wind, not a dune-sea poster.",
			"Without the 3D view: yardangs are carved, barchans are built, horns point downwind. Aeolian work needs loose sediment, wind, and often thin vegetation. Many deserts are rock and pavement; dunes need a sand supply. Dust Bowl was land use plus drought plus wind, not a dune-sea poster. Vertical exaggeration is ×8 and labelled. This is a process, not a homepage special effect. Grand Canyon dryland is rock and pavement as much as sand. Horns are not a compass. Carved versus built. Say the pair. Vegetation is roughness."
		],
		glossary: [
			{
				term: "Yardang",
				def: "Streamlined wind-eroded ridge, wind-parallel. Carved."
			},
			{
				term: "Barchan",
				def: "Crescent dune, horns downwind. Built."
			},
			{
				term: "Deflation",
				def: "Wind lifting and removing loose particles from a surface."
			},
			{
				term: "Saltation",
				def: "Grains hopping in the near-surface wind."
			},
			{
				term: "Suspension",
				def: "Fine dust carried high. Dust Bowl black blizzards."
			},
			{
				term: "Nabkha",
				def: "Sand trapped at a plant. Vegetation as roughness."
			},
			{
				term: "Erg",
				def: "A sand sea. Needs a sand supply. Not every desert."
			}
		],
		misconception: {
			claim: "All deserts are dune seas.",
			truth: "Many are rock and pavement. Dunes need a sand supply."
		},
		misconceptions: [
			{
				claim: "All deserts are dune seas.",
				truth: "Many are rock and pavement. Dunes need a sand supply."
			},
			{
				claim: "A barchan’s horns point upwind.",
				truth: "Horns point downwind. The crescent migrates that way."
			},
			{
				claim: "The Dust Bowl was a textbook barchan field.",
				truth: "It was land use plus drought plus wind: deflation of a farmed A horizon, not an erg as the default landform."
			}
		],
		cases: [{
			slug: "dust-bowl",
			label: "Dust Bowl"
		}, {
			slug: "grand-canyon",
			label: "Dryland weathering"
		}],
		teacher: {
			script: "Orbit the yardang. It is a wind-carved ridge, streamlined, wind-parallel.\nThen the barchan. It is built: a crescent, horns downwind.\nCarved versus built. Say the pair.\nPlay sand along the horns. Horns point downwind, not upwind.\nAll deserts are not dune seas. Many are rock and pavement. Dunes need a sand supply.\nThat is the misconception.\nAeolian work needs loose sediment and enough wind, often sparse vegetation.\nDust Bowl was land use plus drought plus wind, not a single-country exam map as the hero.\nVertical exaggeration is ×8 and labelled. This is not the homepage special effect. Keep it as a process.\nFinish in Check.",
			pitfalls: [
				"Making this the homepage hero.",
				"Teaching every desert as a dune sea.",
				"Pointing barchan horns upwind."
			]
		},
		sources: [{ label: "USGS dunes" }, { label: "NOAA Dust Bowl" }],
		controls: { time: "none" }
	})
];
var PLANET_LABS = [
	lab({
		slug: "solar-system",
		title: "Solar system",
		hook: "Eight planets, one star. Distances are the lie a classroom model always tells — we exaggerate so you can see them.",
		objective: "Name the eight planets, compare orbital periods, and treat size as labelled exaggeration.",
		realm: "planet",
		ages: ["KS3", "NGSS MS"],
		curriculum: [
			"KS3 Earth and atmosphere",
			"NGSS MS-ESS1-2",
			"GCSE background"
		],
		steps: steps("Play a year. Inner planets lap the outer.", "Pause on Saturn’s ring and Jupiter’s size.", "Periods lengthen with distance. Sizes here are not to scale with orbits."),
		questions: [
			q("Which planet orbits fastest?", [
				"Neptune",
				"Mercury",
				"Jupiter",
				"Earth"
			], 1, "Kepler: closer, faster. Mercury."),
			q("Saturn is famous in this lab for…", [
				"Liquid water oceans on the surface",
				"A ring you can orbit",
				"Being the closest to the Sun",
				"Having no orbit"
			], 1, "Ice and rock ring. Size exaggerated."),
			q("Why exaggerate planet size?", [
				"To lie about science",
				"So the set reads from the back of the room; teacher notes flag it",
				"NASA asked",
				"Because orbits are square"
			], 1, "Honesty in the pitfall list."),
			q("If I turn True distance on, what happens?", [
				"Planets swell until they fill the orbits",
				"Orbits stretch toward AU and planets shrink toward dust",
				"The Sun vanishes and astrology begins",
				"Mercury and Neptune swap periods"
			], 1, "Two scales cannot both be true on one table. Visible mode is the classroom lie; True distance is the other one.")
		],
		why: [
			"A London planetarium kit parks Jupiter beside Mars on a table. A night sky over Miami does not. Distances are the first lie every classroom model tells, and this lab names it. Greenwich treats Earth as a labelled planet, not a special case. The same star that lights a Holderness beach lights Hawaii. Eight names. Two families: rock, then gas and ice. A ring you can point at from the back row. Scale literacy is the skill. If you cannot say which number is size and which is orbit, you cannot read a NASA poster, a GCSE diagram, or a news graphic that sits Saturn next to Earth. Fieldwork does not need the plastic kit. It needs one sentence: closer planets lap the outer ones; periods lengthen with distance; sizes on the table are not the same lie as the gaps. That sentence travels from Leeds to a Florida pier without changing.",
			"Input is time: one school year on the slider. The Sun sits still. Eight planets run their rings. Mercury, Venus, Earth, Mars lap the outer four. Jupiter, Saturn, Uranus, Neptune take longer because they are farther, not because this lab plots mass as the clock. What moves: position on the orbit. What does not: the order of the eight, the Sun’s place at the centre of this set, the fact of closed paths. What is conserved: Kepler’s bargain — closer, faster. Period squared with distance cubed, in school language. Toggle True distance and the set tells a different honesty. Orbits stretch toward astronomical units. Planets shrink toward dust. You cannot keep both size and orbit honest on one table. That is the lie visible mode tells on purpose, so the back row can still name Saturn’s ring. The ring is ice and rock, drawn fat. The Sun is a ball you can see, not a 109-Earth-diameter monster at a true gap. Periods stay true-ish: Mercury about 88 days, Earth a year, Neptune about 165 years. Astrology is not in the room. Size is not orbit scale. If the orbits were true and the planets were true, you would need a field, not a screen.",
			"Play a year. Space toggles play. Arrows nudge time. Speed is 1×, 2×, or 4× on the bar. Toggle True distance: classroom set versus compressed AU. L labels. R reset. P projector. No explode, no slice. Pause on Saturn’s ring. Pause on Mercury lapping Earth. Reset if the class has lost the inner four. The year slider is the orbit clock. Names are the point. The toggle is the honesty. Leave True distance off for the back row, then on once so they hear the dust sentence.",
			"If the model will not spin, keep the sentences. Eight planets, one star. Inner four are rock. Outer four are gas and ice giants. Closer orbits are faster. Sizes in a kit are exaggerated so you can see them. True orbits would leave planets as dust. Saturn has a ring of ice and rock. Neptune takes far longer than Earth. Pluto is not on this table. That is enough to sit Check without WebGL, and enough to catch a poster that pretends two scales at once."
		],
		glossary: [
			{
				term: "Orbital period",
				def: "Time for one trip around the Sun. Mercury ~88 days. Earth 1 year. Neptune ~165 years."
			},
			{
				term: "Terrestrial planet",
				exam: "Rocky planet",
				def: "Mercury, Venus, Earth, Mars: rock and metal, close in."
			},
			{
				term: "Gas giant",
				def: "Jupiter and Saturn: thick hydrogen–helium envelopes. Not small rocky worlds with weather like ours."
			},
			{
				term: "Ice giant",
				def: "Uranus and Neptune: ices of water, ammonia, methane over a denser interior. Farther and slower than the gas giants."
			},
			{
				term: "Astronomical unit",
				exam: "AU",
				def: "Earth–Sun distance, about 150 million km. The school unit for the inner system."
			},
			{
				term: "Kepler’s third law",
				def: "Closer orbits are faster. Period squared scales with distance cubed. This lab shows the qualitative half."
			},
			{
				term: "True scale",
				def: "A mode where distances lean toward AU and planets shrink toward dust. Still compressed. Still a lie, just a different one."
			},
			{
				term: "Planetary ring",
				def: "Ice and rock in orbit, here Saturn’s. Drawn fat so the back row can see it. Not a solid disc."
			}
		],
		misconception: {
			claim: "The model on the table is to scale.",
			truth: "If orbits were to scale, planets would be dust."
		},
		misconceptions: [
			mc("The model on the table is to scale.", "If orbits were to scale, planets would be dust."),
			mc("Pluto should be on this table as a planet.", "Eight planets. Pluto is a dwarf planet. This lab does not park it in the set."),
			mc("The outer planets take longer because they are bigger.", "Period follows distance, not girth. Kepler: closer, faster. Neptune is slow because it is far.")
		],
		cases: [{
			slug: "greenwich",
			label: "Earth as a labelled planet"
		}, {
			slug: "florida-insolation",
			label: "Insolation starts at the Sun"
		}],
		teacher: {
			script: "Play a year. Name the inner four, then the gas giants, then the ice giants.\nSaturn’s ring is ice and rock, size exaggerated. Say that before anyone calls it a solid disc.\nToggle True distance. Planets become dust. That is the honest sentence.\nToggle back to visible mode so the set reads from the back row.\nPeriods lengthen with distance. Kepler, not astrology.\nAsk which planet laps Earth first. Mercury.\nAsk why Neptune is slow. Distance, not bulk.\nPluto is not on this table. Do not apologise for that.\nTwo scales cannot both be true in one plastic kit.\nFinish in Check.",
			pitfalls: [
				"Astrology dressed as orbital period.",
				"Treating size and orbit as one scale.",
				"Parking Pluto as a ninth planet in this set.",
				"Calling Saturn’s ring a solid disc."
			]
		},
		sources: [{ label: "NASA solar system" }],
		controls: {
			time: "year",
			toggles: [{
				key: "trueScale",
				label: "True distance"
			}]
		}
	}),
	lab({
		slug: "sun-earth",
		title: "Sun and Earth",
		hook: "The solar constant is a number. Latitude is why a playground in London and one in Nairobi disagree.",
		objective: "Link solar constant, insolation by latitude, and sunspots as a school-level activity toggle — not astrology.",
		realm: "planet",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS",
			"APES"
		],
		curriculum: [
			"KS3",
			"NGSS MS-ESS1-1",
			"APES 4.7"
		],
		steps: steps("Beam hits a globe. Bars of insolation by latitude.", "Toggle sunspots — a magnetic blemish, not a weather spell.", "Same solar constant; different incidence."),
		questions: [
			q("The solar constant is measured…", [
				"At Earth’s surface always",
				"At the top of the atmosphere, ~1366 W m⁻², a school figure",
				"Only at night",
				"In the core of Earth"
			], 1, "Surface gets less. Atmosphere and angle."),
			q("Insolation at the poles is low mainly because…", [
				"The Sun is farther in kilometres that matter",
				"The beam is oblique and, in winter, absent",
				"There is no atmosphere",
				"Time zones"
			], 1, "Geometry."),
			q("Sunspots are…", [
				"Holes to another universe",
				"Cooler, magnetically active patches; they do not run the seasons",
				"The cause of tides",
				"Clouds"
			], 1, "Toggle, not astrology."),
			q("If I toggle Sunspots on, what happens to a London December playground?", [
				"It goes dark because spots block the beam.",
				"Almost nothing you can feel. Spots are a small, separate story. Latitude and tilt still run the season.",
				"The solar constant doubles.",
				"Miami freezes and London becomes tropical."
			], 1, "The toggle is honesty, not weather magic. Incidence by latitude is the plot.")
		],
		why: [
			"A playground in London and one in Nairobi disagree at noon. Same star. Same solar constant at the top of the atmosphere. Different incidence. Miami in December still takes a high beam; Leeds does not. That is this lab plus tilt, not a farther Sun in kilometres that matter. UK glasshouses plot hours above a useful angle. Florida growers plot the same number with a different latitude. Snowdonia fieldwork in June is long light on a steep slope. Holderness in December is a low, weak punch on wet till. The skill is to separate the constant from the geometry. If you mix them, you will blame sunspots for winter, or blame distance for the poles. Neither is the story. The beam is the story. The bars by latitude are the story. Seasons are a tilt lab. This one is the punch the tilt then aims.",
			"Input is the solar beam. The school figure is about 1366 W m⁻² at 1 AU, top of atmosphere. That number does not change with latitude. What changes is incidence: how oblique the beam is when it meets a patch of ground. Equator bars stand tall. Polar bars sit low, and in winter they vanish. What moves: the globe’s face, the height of the bars, the season’s aiming if you let time walk. What does not: the solar constant as a top-of-atmosphere number, the fact of a beam, the order of the latitudes. What is conserved: energy in the beam before atmosphere and angle take a cut. Surface flux is less. Always. Sunspots are cooler, magnetically active patches on the photosphere. Toggle them. They do not run the seasons. They do not dim a London playground in any way this lab will let you claim. The lie the model tells: the Sun is a nearby ball, Earth is huge beside it, bars are lollipops stuck on a globe. The constant is true-ish. The geometry of incidence is the lesson. Astrology is not invited. Distance to the poles is not the mechanism.",
			"There is no year slider in the bar. Space still turns the globe. Arrows nudge it. Toggle Sunspots on, then off, so the class hears they are not the season. L labels. R reset. P projector. No explode, no slice. Point at the bars: equator, 55°N playground, pole. Pause. Ask which bar is London in December before you name it. The beam is the plot. The toggle is a warning label. Leave spots off when you want the bars to stay the story.",
			"If the globe will not spin, keep the sentences. Solar constant: about 1366 W m⁻² at the top of the atmosphere, a school figure. Surface gets less. Poles are cold mainly because the beam is oblique, not because the Sun is farther in kilometres that matter. A London playground and a Nairobi playground disagree by latitude. Sunspots are magnetic blemishes, not winter. Seasons are tilt. This lab is the beam. That is enough for Check on paper, and enough to kill a sunspot scare story in one line."
		],
		glossary: [
			{
				term: "Solar constant",
				exam: "Total solar irradiance (school figure)",
				def: "Solar flux at 1 AU, top of atmosphere. School figure ~1366 W m⁻². Not the flux on a playground."
			},
			{
				term: "Insolation",
				exam: "Incoming solar radiation",
				def: "Incoming solar radiation at a surface. Incidence and atmosphere both cut it."
			},
			{
				term: "Incidence",
				def: "How steeply the beam meets the ground. Oblique at high latitude. Overhead only between the tropics, and not every day."
			},
			{
				term: "Sunspot",
				def: "A cooler, magnetically active patch on the photosphere. A school toggle. Not the cause of seasons."
			},
			{
				term: "Top of atmosphere",
				exam: "TOA",
				def: "Where the solar constant is defined. Below that, air and angle take a cut."
			},
			{
				term: "Latitude",
				def: "Angle from the equator. It sets how oblique the noon beam is, before tilt aims the season."
			},
			{
				term: "Photosphere",
				def: "The Sun’s visible surface. Spots live here. It is not a hole, and it is not weather."
			}
		],
		misconception: {
			claim: "Sunspots cause seasons.",
			truth: "Tilt causes seasons. Sunspots are a small, separate story."
		},
		misconceptions: [
			mc("Sunspots cause seasons.", "Tilt causes seasons. Sunspots are a small, separate story."),
			mc("The poles are cold because they are farther from the Sun in kilometres that matter.", "The extra distance is tiny next to 1 AU. The beam is oblique. That is the cut."),
			mc("The solar constant is what hits a London playground.", "The constant is top of atmosphere. Surface flux is less: air and angle both take a share.")
		],
		cases: [{
			slug: "uk-daylength",
			label: "UK day length"
		}, {
			slug: "florida-insolation",
			label: "Florida insolation"
		}],
		teacher: {
			script: "Point at the bars of insolation by latitude. Equator high, poles low.\nThat is incidence, not a farther Sun in kilometres that matter.\nThe solar constant is about 1366 W m⁻² at the top of the atmosphere, a school figure.\nSurface flux is less: atmosphere and angle both take a cut.\nToggle Sunspots on. They are cooler, magnetically active patches.\nThey do not run the seasons. Say that out loud.\nToggle them off again so the bars stay the story.\nA playground in London and one in Nairobi disagree because of latitude, not sunspots.\nSeasons are a tilt lab. This lab is the beam.\nFinish in Check.",
			pitfalls: [
				"Sunspot scare stories as weather or seasons.",
				"Saying the poles are farther from the Sun in kilometres that matter.",
				"Treating 1366 W m⁻² as playground flux."
			]
		},
		sources: [{ label: "NASA / NOAA solar" }],
		controls: {
			time: "none",
			toggles: [{
				key: "spots",
				label: "Sunspots"
			}]
		}
	}),
	lab({
		slug: "universe-scale",
		title: "Universe scale",
		hook: "Powers of ten: Earth, then the system, then the local star field. Keep it short. You cannot see a galaxy in one glance honestly.",
		objective: "Step Earth → orbit → neighbouring stars and say what each jump does to size.",
		realm: "planet",
		ages: ["KS3", "NGSS MS"],
		curriculum: ["KS3", "NGSS MS-ESS1-2"],
		steps: steps("Earth.", "Scrub scale out to the solar system.", "Then a local star dusting. Stop. No cartoon universe tour."),
		questions: [
			q("If Earth is a pea, the Sun is roughly…", [
				"Another pea next to it",
				"A much larger ball a good walk away — this lab still exaggerates",
				"Inside the pea",
				"Invisible"
			], 1, "Order of magnitude, not a tape measure."),
			q("The next stars are…", [
				"Just beyond Neptune on the same table",
				"A jump of scale that makes planets vanish",
				"Inside the Moon",
				"UK counties"
			], 1, "Powers of ten."),
			q("This lab stops at the local galaxy hop because…", [
				"Galaxies are fake",
				"Honesty: one more jump and the screen is a lie of scale",
				"NASA forbids it",
				"It causes tides"
			], 1, "Keep it short."),
			q("If I scrub Scale jump past the solar system, what should disappear?", [
				"Only the labels",
				"Planets, if they were honest — they become a jump of scale, not a dusting on the same table",
				"The Sun, because stars have no fuel",
				"Greenwich, because Earth has no size"
			], 1, "Each hop hides a jump. Neighbouring stars are not Neptune’s neighbours.")
		],
		why: [
			"A night walk from Greenwich is still Earth underfoot. A dark sky over Yosemite is still the same jump: one planet, then a star, then a gap you cannot draw honestly on a poster. Leeds does not sit next to Hawaii in kilometres the way a wallchart parks them. Scale is a skill. Wonder without a fake fly-through. The Kola borehole is a 12 km scratch on a 6371 km radius — even crust is thin — and that is still stop one. Stop two is the solar system in AU. Stop three is neighbouring stars in light years. Stop four would be a cartoon. UK GCSE diagrams and US planetarium posters both hide the jump. Your job is to say so. If Earth is a pea, the Sun is a much larger ball a good walk away. This lab still exaggerates. The next stars are not just beyond Neptune on the same table. That sentence is the whole point.",
			"Input is the Scale jump slider: 0 Earth, 1 solar system, 2 local stars. What moves: the camera’s hop, the unit on the readout, which objects are allowed to exist on screen. What does not: the fact of nested scales, the order of the hops, the honesty that each jump hides a factor. What is conserved: powers of ten as a way of thinking, not a tape measure. Stop 1: Earth in kilometres, Moon drawn close so you can see it — real gap is about 30 Earth-diameters. Stop 2: 1 AU is about 150 million km; planets at true size would be dust. Stop 3: neighbouring stars; units are light years; planets have no right to remain as dots you could name. The lie the model tells is every poster’s lie: one frame, several scales. We stop before a galaxy tour because one more jump and the screen is decoration. Keep it short. Order of magnitude, not a ruler. Greenwich underfoot is still stop one. If the class asks for the whole universe, the answer is no, not on this glass.",
			"Drag Scale jump from 0 to 2. Pause at each stop. Ask what vanished before you scrub on. Space does little here; the slider is the drive. Arrows still nudge time if anything is turning. L labels. R reset. P projector. No explode, no slice. Reset view if the hop has left the class in empty black. Name the unit at each stop: km, AU, light years. Then stop. No cartoon universe tour. The slider is labelled Scale jump. Do not skip a stop.",
			"If the hop will not run, keep three sentences. Earth is a sphere you can name, units in kilometres. The solar system is a jump to AU; planets would be dust at true size. Neighbouring stars are another jump; they are not just beyond Neptune. Every poster hides a jump. This lab refuses a galaxy fly-through because that would be a fourth lie. Powers of ten are the skill. Wonder stays. The tape measure does not pretend. Without the 3D view, a student should still refuse a cartoon galaxy tour and still name which unit belongs to which stop."
		],
		glossary: [
			{
				term: "Astronomical unit",
				exam: "AU",
				def: "Earth–Sun distance, about 150 million km. Stop 2’s unit."
			},
			{
				term: "Light year",
				def: "Distance light travels in one year. Stop 3’s unit. Not a time."
			},
			{
				term: "Power of ten",
				def: "A jump of scale by ×10, or many tens. The skill is naming the jump, not pretending one picture holds them all."
			},
			{
				term: "Order of magnitude",
				def: "A rough size class. If Earth is a pea, the Sun is not another pea. Exact millimetres are not the point."
			},
			{
				term: "Scale jump",
				def: "This lab’s slider: Earth, then solar system, then local stars. Each hop hides a factor."
			},
			{
				term: "Parsec",
				def: "About 3.26 light years. An exam unit for stellar distance. Not used as a stop here, but it is the same idea."
			},
			{
				term: "Local stars",
				def: "The neighbouring suns, not a galaxy tour. This lab stops there on purpose."
			}
		],
		misconception: {
			claim: "Space pictures are a single scale.",
			truth: "Every poster hides a jump."
		},
		misconceptions: [
			mc("Space pictures are a single scale.", "Every poster hides a jump."),
			mc("The next stars sit just beyond Neptune on the same poster.", "That is a jump of scale that makes planets vanish. Light years, not AU."),
			mc("If Earth is a pea, the Sun is another pea beside it.", "The Sun is a much larger ball a good walk away. This lab still exaggerates.")
		],
		cases: [{
			slug: "greenwich",
			label: "Earth underfoot"
		}, {
			slug: "kola",
			label: "Even crust is thin"
		}],
		teacher: {
			script: "Start the Scale jump slider at Earth. A sphere you can name.\nScrub toward the solar system hop. Earth shrinks; the Sun becomes the object that reads.\nAsk what disappeared. Planets, if they were honest, are dust at this jump.\nScrub again to the local star field. Stop there.\nOne more jump and the screen is a lie of scale.\nEvery poster hides a jump. That is the misconception.\nIf Earth is a pea, the Sun is a much larger ball a good walk away — this lab still exaggerates.\nThe next stars are not just beyond Neptune on the same table.\nPowers of ten are the skill. Wonder without a fake fly-through.\nFinish in Check.",
			pitfalls: [
				"Endless zoom porn past the local stars.",
				"Leaving the class thinking one poster is one scale.",
				"Pea-Sun diagrams that put two peas side by side."
			]
		},
		sources: [{ label: "NASA scale" }],
		controls: {
			time: "none",
			extra: [{
				key: "zoom",
				label: "Scale jump",
				min: 0,
				max: 2,
				step: .01,
				default: 0
			}]
		}
	}),
	lab({
		slug: "geologic-time",
		title: "Geologic time",
		hook: "A spiral, not a calendar. Units in Ma. Life and continents are marks, not a cartoon parade.",
		objective: "Read deep time in millions of years and place a few honest marks.",
		realm: "planet",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS",
			"HS Earth Sci"
		],
		curriculum: [
			"KS3",
			"NGSS HS-ESS1-6",
			"GCSE"
		],
		steps: steps("The spiral is 4500 Ma to now.", "Scrub age. Marks: life, Pangaea, now.", "Humans are a hair at the end."),
		questions: [
			q("Ma means…", [
				"Minutes ago",
				"Million years",
				"Metres of altitude",
				"Magnetic"
			], 1, "Mega-annum."),
			q("Pangaea sits…", [
				"At 4500 Ma",
				"In the last few hundred Ma, not at Earth’s birth",
				"Tomorrow",
				"In the core"
			], 1, "Late Palaeozoic–Mesozoic."),
			q("Human history on this spiral is…", [
				"Half the coil",
				"A thin mark at the end",
				"The whole core",
				"Before life"
			], 1, "Humility."),
			q("If I set Time before present to 4500 Ma, where am I?", [
				"The K–Pg boundary",
				"Earth’s start on this spiral, not Pangaea and not humans",
				"The Cambrian explosion",
				"Grand Canyon tourism season"
			], 1, "4500 Ma is the birth mark. Pangaea is late. Humans are a hair at 0 Ma.")
		],
		why: [
			"Grand Canyon walls are rock age. The hole is younger. That sentence is the whole fieldwork. Snowdonia’s slates are old; the path you walk is not 4500 Ma. Holderness till is a blink. Mississippi mud is a blink. Deep time is humility with a number, and the number is Ma — million years — not a school calendar of equal boxes. UK GCSE charts that give the Mesozoic as much wall as the Precambrian are the trap. US park signs that make dinosaurs and people neighbours are the same trap. Kola is a 12 km scratch. The Canyon visor is a young cut in old rock. Place a few honest marks: Earth forms, Cambrian, Pangaea, K–Pg, now. Life is a mark on the coil, not a cartoon parade. Humans are a hair at the end. Say that before anyone asks for us beside the dinosaurs.",
			"Input is Time before present, 0 to 4500 Ma. The coil is a log spiral so the late marks can still be seen. Linear time would crush Cambrian-to-now into a speck. What moves: the bead on the coil, the readout in Ma or ka. What does not: the order of the marks, the fact that 4500 Ma is Earth’s start on this diagram, the fact that humans are last. What is conserved: sequence, not equal spacing. Pangaea sits in the last few hundred Ma, late Palaeozoic to Mesozoic, not at Earth’s birth. Cambrian is about 540 Ma. K–Pg is 66 Ma. Now is a hair. The lie the model tells: a pretty helix, a fat bead, marks you could trip over. Real duration is not a staircase of equal treads. Equal-length era boxes on a wall chart are the other lie. The spiral is still a drawing. It is a better drawing than the boxes. Units stay Ma. Do not switch to biblical calendars, Hollywood timelines, or a parade of animals walking left to right as if time were a road.",
			"Drag Time before present from 4500 Ma to 0. Space still walks the coil. Arrows nudge it. L labels. R reset. P projector. No explode, no slice. Pause at Pangaea. Pause at K–Pg. Ask where humans go before you reveal the hair. If the class treats the boxes on their wall as equal, put the spiral next to that poster and let the lengths argue. Names on the marks, not a cartoon parade. The slider is labelled Time before present, units Ma. Walk slowly through the last 500 Ma so the hair at the end can be seen.",
			"If the spiral will not turn, keep the marks. Earth about 4500 Ma. Cambrian about 540 Ma. Pangaea in the last few hundred Ma, not at the start. K–Pg at 66 Ma. Humans a hair at the end. Ma means million years. Equal boxes on a wall chart lie. Grand Canyon walls are old rock; the hole is younger. That is enough to sit Check on paper, and enough to refuse a dinosaur-and-human handshake. Without the 3D view, a student should still place those five marks in order and still refuse equal boxes."
		],
		glossary: [
			{
				term: "Ma",
				exam: "Myr / million years ago",
				def: "Mega-annum: million years ago. The unit on this spiral. Not minutes, not metres."
			},
			{
				term: "ka",
				def: "Thousand years ago. The readout may drop into ka near the hair of now."
			},
			{
				term: "Deep time",
				def: "Earth history at geologic scale. A spiral, not a school calendar."
			},
			{
				term: "Pangaea",
				def: "Late Palaeozoic–Mesozoic supercontinent. A mark in the last few hundred Ma, not Earth’s starting position."
			},
			{
				term: "Cambrian",
				def: "About 540 Ma. A mark for early animal diversity, not the start of the planet."
			},
			{
				term: "K–Pg",
				exam: "K–T boundary",
				def: "About 66 Ma. End-Cretaceous. Not the end of time, and not where humans begin."
			},
			{
				term: "Log spiral",
				def: "A coil that gives late marks room. Linear time would crush the Phanerozoic into a speck."
			},
			{
				term: "Precambrian",
				def: "Most of the coil: from Earth’s start to the Cambrian. Wall charts usually under-draw it."
			}
		],
		misconception: {
			claim: "Dinosaurs and humans overlap on a wall chart of equal boxes.",
			truth: "Boxes lie. The spiral does not."
		},
		misconceptions: [
			mc("Dinosaurs and humans overlap on a wall chart of equal boxes.", "Boxes lie. The spiral does not."),
			mc("Pangaea is how Earth started.", "Pangaea is late. 4500 Ma is the birth mark. Supercontinents come and go."),
			mc("The Grand Canyon hole is as old as the rock in the walls.", "Walls are rock age. The hole is younger. Deep time is not one number for both.")
		],
		cases: [{
			slug: "grand-canyon",
			label: "Grand Canyon time"
		}, {
			slug: "kola",
			label: "A 12 km scratch"
		}],
		teacher: {
			script: "Set Time before present to 4500 Ma. That is Earth’s start on this spiral.\nWalk the slider toward now. Units are Ma, million years, not a school calendar.\nPause at Pangaea. It sits in the last few hundred Ma, not at Earth’s birth.\nLife is a mark on the coil, not a cartoon parade.\nHumans are a hair at the end. Say that before anyone asks for dinosaurs beside us.\nEqual-length era boxes on a wall chart are the trap.\nBoxes lie. The spiral does not.\nGrand Canyon walls are rock age; the hole is younger.\nDeep time is humility with a number.\nFinish in Check.",
			pitfalls: [
				"Equal-length era boxes on the wall.",
				"Pangaea as Earth’s starting position.",
				"Letting dinosaurs and humans share a handshake on the same tread."
			]
		},
		sources: [{ label: "USGS geologic time" }, { label: "BGS" }],
		controls: {
			time: "none",
			extra: [{
				key: "ageMa",
				label: "Time before present",
				min: 0,
				max: 4500,
				step: 10,
				unit: " Ma",
				default: 0
			}]
		}
	}),
	lab({
		slug: "eclipses",
		title: "Eclipses",
		hook: "Umbra and penumbra are cones. The Moon’s 5° tilt is why most months miss.",
		objective: "Show umbra/penumbra and why a 5° lunar-orbit tilt makes eclipses rare.",
		realm: "planet",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: ["KS3", "NGSS MS-ESS1-1"],
		steps: steps("Sun, Earth, Moon. Umbra dark, penumbra pale.", "Toggle 5° vs aligned.", "New/full every month. Eclipse only near a node."),
		questions: [
			q("The umbra is…", [
				"The faint outer shadow",
				"The dark core of the shadow",
				"A planet",
				"Albedo"
			], 1, "Total eclipse sits in umbra."),
			q("Eclipses are rare because…", [
				"The Moon is too small to ever hit",
				"The orbit is tilted ~5°, so the Moon usually misses the cone",
				"Clouds",
				"Time zones"
			], 1, "Nodes."),
			q("A lunar eclipse needs…", [
				"New Moon plus a node",
				"Full Moon plus a node",
				"Any crescent",
				"Perihelion only"
			], 1, "Earth between Sun and Moon, and aligned."),
			q("If I leave Eclipse alignment off, what happens at full Moon?", [
				"A lunar eclipse every time",
				"Usually a miss: the Moon slides above or below the cone",
				"The Sun goes out",
				"Snowdonia sees a solar eclipse and Yosemite does not"
			], 1, "New and full happen every month. An eclipse needs a node. The 5° tilt is why most months miss.")
		],
		why: [
			"Snowdonia and Yosemite see the same phase on the same night. Eclipses are pickier. A full Moon over Eryri is geometry, not a promise of Earth’s shadow. A full Moon over Yosemite is the same triangle. Eclipse chasers wait for a node, not for every full. UK school trips still miss most months. US park night walks still miss most months. The skill is to split phase from eclipse. Phases are how much of the sunlit half faces us. Eclipses are alignment plus the 5° lunar-orbit tilt being near zero. Clouds are weather. Time zones are clocks. Neither is the cone. If you cannot say umbra versus penumbra, you cannot say why a total is a tunnel and a partial is a graze. Holderness does not get a private Moon. Miami does not get a different shadow. Same machine, rare hit.",
			"Input is a month on the slider, plus the Eclipse alignment toggle. Sun, Earth, Moon. The Moon runs a ring. Leave alignment off and the ring is tilted about 5° to the ecliptic. What moves: the Moon’s place, the cones if you are looking, whether a new or full sits near a node. What does not: the 5° unless you toggle it to zero, the fact of two cones, the fact that new and full happen every synodic month. What is conserved: half the Moon is always sunlit; umbra is the dark core; penumbra is the pale outer shadow. A solar eclipse needs new Moon plus a node — Moon between Sun and Earth. A lunar eclipse needs full Moon plus a node — Earth between Sun and Moon. The lie the model tells: Moon and Earth are huge beside their true gap; cones are fat enough to read from the back row; the orbit is a tidy hoop. Size is exaggerated on purpose. The tilt is the mechanism. Most months the Moon misses the cone. Every full Moon is not an eclipse. A crescent is not Earth’s shadow — that is a different lab’s trap, and it is still wrong here.",
			"Play the month. Space toggles play. Arrows nudge time. Speed 1×, 2×, 4×. Toggle Eclipse alignment off for the 5° miss, on once so the cones line up, then off again. L labels. R reset. P projector. No explode, no slice in the bar. Pause at new. Pause at full. Ask why next month fails before you toggle. Rarity is the lesson, not the special effect. The toggle is labelled Eclipse alignment. Off is the real 5°. On is the special-effect month. Use it once, not as the default.",
			"If the cones will not spin, keep the sentences. Umbra is the dark core. Penumbra is the partial shadow. The Moon’s orbit is tilted about 5°, so most months miss. New and full happen every month. An eclipse needs a node. Solar: new plus node. Lunar: full plus node. Snowdonia and Yosemite share the phase; they do not share an eclipse every month. Size in the kit is fat on purpose. That is enough for Check on paper. Without the 3D view, a student should still split phase from eclipse and still name the 5° tilt as the miss."
		],
		glossary: [
			{
				term: "Umbra",
				def: "Dark core of a shadow. A total eclipse sits here."
			},
			{
				term: "Penumbra",
				def: "Partial, paler shadow around the umbra. A graze, not the tunnel."
			},
			{
				term: "Node",
				def: "Where the Moon’s tilted orbit crosses the ecliptic. Eclipses need the Moon near a node."
			},
			{
				term: "Ecliptic",
				def: "The plane of Earth’s orbit around the Sun. The Moon’s orbit is tilted about 5° to it."
			},
			{
				term: "Orbital inclination",
				def: "The Moon’s ~5° tilt to the ecliptic. That is why eclipses are rare."
			},
			{
				term: "Solar eclipse",
				def: "New Moon plus a node. Moon between Sun and Earth. Umbra on the ground is a small track."
			},
			{
				term: "Lunar eclipse",
				def: "Full Moon plus a node. Earth between Sun and Moon. The Moon rides through Earth’s umbra."
			},
			{
				term: "Synodic month",
				def: "New to new, about 29.5 days. Phase clock. Not the eclipse clock."
			}
		],
		misconception: {
			claim: "Every full Moon is an eclipse.",
			truth: "Need a node."
		},
		misconceptions: [
			mc("Every full Moon is an eclipse.", "Need a node."),
			mc("A crescent is Earth’s shadow on the Moon.", "A crescent is the Moon’s night side. Earth’s shadow is a lunar eclipse, and it is rare."),
			mc("The Moon is too small to ever cover the Sun.", "Angular size can match. The reason most months miss is the 5° tilt, not a tiny Moon.")
		],
		cases: [{
			slug: "snowdonia-moon",
			label: "Snowdonia Moon"
		}, {
			slug: "yosemite-moon",
			label: "Yosemite Moon"
		}],
		teacher: {
			script: "Play the month. Sun, Earth, Moon: umbra dark, penumbra pale.\nThe umbra is the dark core of the shadow. A total eclipse sits there.\nLeave Eclipse alignment off. The Moon’s orbit is tilted about 5°.\nNew and full happen every month. An eclipse needs a node.\nAsk why next month’s full Moon fails. It usually misses the cone.\nToggle Eclipse alignment on once so the cones line up.\nThen off again. Rarity is the lesson, not the special effect.\nEvery full Moon is not an eclipse. That is the misconception.\nA lunar eclipse needs full Moon plus a node. A solar eclipse needs new Moon plus a node.\nFinish in Check.",
			pitfalls: [
				"Crescent as Earth’s shadow.",
				"Teaching every full Moon as an eclipse.",
				"Saying the Moon is too small to ever hit, instead of naming the 5° tilt."
			]
		},
		sources: [{ label: "NASA eclipses" }],
		controls: {
			time: "month",
			toggles: [{
				key: "align",
				label: "Eclipse alignment"
			}]
		}
	}),
	lab({
		slug: "tides",
		title: "Tides",
		hook: "Two bulges. Spring and neap are alignment, not emotion.",
		objective: "Show two tidal bulges and spring/neap with Moon–Sun alignment.",
		realm: "planet",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: [
			"KS3",
			"GCSE coasts",
			"NGSS MS-ESS1-1"
		],
		steps: steps("Two bulges: toward the Moon and opposite.", "Play the month. Align Sun and Moon: spring. Right angle: neap.", "Sun is weaker but not zero."),
		questions: [
			q("Why two bulges?", [
				"Two Moons",
				"Gravity plus the orbiting-system’s inertia — a school two-bulge model",
				"Wind only",
				"Rivers"
			], 1, "Simplification flagged in teacher notes."),
			q("Spring tides occur when…", [
				"Only in spring season",
				"Sun and Moon pull along one line",
				"There is no Moon",
				"Earth stops"
			], 1, "New or full."),
			q("Neap tides are…", [
				"The largest range",
				"The smaller range, Sun and Moon at right angles",
				"Tsunamis",
				"Only in the UK"
			], 1, "Quarter moons."),
			q("If I pause when the Sun and Moon sit at right angles, the range is…", [
				"Spring — the bulges add",
				"Neap — the bulges fight, smaller range",
				"Zero, because the Moon has vanished",
				"A tsunami on Holderness"
			], 1, "Quadrature. Quarter moons. Neap is smaller, not zero, and not a season.")
		],
		why: [
			"Holderness waves ride a tidal range. Estuaries even more. The Mississippi meets a modest Gulf tide and still dumps a delta; UK east-coast mudflats live on a larger clock. Spring and neap are alignment, not April. A Leeds student who thinks spring tide waits for daffodils will misread every tide table from the Humber to Miami. Yosemite has no sea, but the same Moon that pulls Holderness pulls a California coast twice a day. Hawaii sits in a different basin with a different range; the two-bulge idea still holds as the school start. Fieldwork on a UK beach is a timetable. Miss the range and you miss the spit, the mud, the harbour gate. The skill is two bulges, then syzygy versus quadrature. Wind is weather. Rivers are catchments. Neither is the second bulge.",
			"Input is a month. The Moon goes around. The Sun sits off-stage, weaker, not zero. Two bulges: one toward the Moon, one opposite. That opposite bulge is the school model — gravity plus the orbiting-system’s inertia — and the teacher notes flag the simplification. What moves: the Moon’s place, which way the fat water points, whether the Sun’s smaller pull adds or fights. What does not: the existence of two bulges, Earth’s spin as the thing that carries a coast through those bulges twice a day, in the simple picture. What is conserved: mass of water, the fortnightly spring–neap beat, the fact that new and full are both syzygy. Align Sun and Moon along one line: spring tide, larger range, twice a month, named for leaping, not the season. Right angles: neap, smaller range, quarter moons. The lie the model tells: water is a deformed mesh around a smooth globe; continents do not get in the way; real amphidromes, basins, and coastal funnelling are missing. Holderness and the Gulf are not the same range. The mechanism still starts here. Tsunamis are not tides. Wind setup is not the two-bulge clock.",
			"Play the month. Space toggles play. Arrows nudge time. Speed 1×, 2×, 4×. No extra slider. No toggle. L labels. R reset. P projector. No explode, no slice. Pause when the readout says spring — Sun and Moon aligned. Pause on neap — quadrature. Ask which phases give spring before you reveal: new or full, both. Quarter moons give neap. Reset if the class has named the season by accident. The month slider is the only clock. Watch the mesh deform; it is not a sticker. Name spring and neap from alignment, not from the calendar.",
			"If the bulges will not spin, keep the sentences. Two bulges: toward the Moon and opposite. Spring tide is larger range when Sun and Moon pull along one line, twice a month, not in April. Neap is smaller range at right angles. The Sun is weaker than the Moon here, but not zero. Holderness rides a real range. Gulf tides can be modest. This is a school two-bulge model, not a harbour forecast. That is enough for Check on paper."
		],
		glossary: [
			{
				term: "Spring tide",
				exam: "Syzygy tide",
				def: "Larger range. Sun and Moon pull along one line. New or full. Twice a month, not the season."
			},
			{
				term: "Neap tide",
				exam: "Quadrature tide",
				def: "Smaller range. Sun and Moon at right angles. Quarter moons."
			},
			{
				term: "Syzygy",
				def: "Sun, Moon, and Earth in one line. Spring tide. Exam word for the alignment."
			},
			{
				term: "Quadrature",
				def: "Sun and Moon at right angles as seen from Earth. Neap tide."
			},
			{
				term: "Tidal bulge",
				def: "A school picture: one bulge toward the Moon, one opposite. A simplification, flagged as such."
			},
			{
				term: "Tidal range",
				def: "High water minus low water. Springs large, neaps small. Coasts then reshape the number."
			},
			{
				term: "Semi-diurnal tide",
				def: "Two highs and two lows in about a day, in the simple spinning-through-bulges picture."
			}
		],
		misconception: {
			claim: "Spring tides happen in April.",
			truth: "Spring as in leap, twice a month."
		},
		misconceptions: [
			mc("Spring tides happen in April.", "Spring as in leap, twice a month."),
			mc("There is only one bulge, the one facing the Moon.", "Two. Toward the Moon and opposite. The second is the school-model surprise."),
			mc("The Sun does not affect tides.", "Weaker than the Moon, not zero. Alignment is why springs beat neaps.")
		],
		cases: [{
			slug: "holderness",
			label: "Holderness coast"
		}, {
			slug: "mississippi",
			label: "Modest Gulf tides"
		}],
		teacher: {
			script: "Play the month. Two bulges: one toward the Moon, one opposite.\nThat two-bulge picture is a school model. Flag the simplification.\nWhen Sun and Moon pull along one line, the range is larger: spring tide.\nSpring as in leap, twice a month, not the season.\nAt right angles the bulges fight: neap tide, smaller range.\nThe Sun is weaker than the Moon here, but not zero.\nAsk which phase gives spring: new or full — both, syzygy.\nQuarter moons give neap.\nSpring tides do not wait for April. That is the trap.\nFinish in Check.",
			pitfalls: [
				"Season named spring.",
				"Only one bulge, facing the Moon.",
				"Calling a tsunami a tide, or wind setup the two-bulge clock."
			]
		},
		sources: [{ label: "NOAA tides" }, { label: "UKHO" }],
		controls: { time: "month" }
	}),
	lab({
		slug: "solar-altitude",
		title: "Solar altitude and sun path",
		hook: "A dome over a marked horizon. Date and latitude write the path. Noon altitude and day length fall out.",
		objective: "Read noon altitude and day length from a sun-path dome for London, Nairobi, New York.",
		realm: "planet",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS",
			"APES"
		],
		curriculum: [
			"KS3",
			"NGSS MS-ESS1-1",
			"GCSE"
		],
		steps: steps("Dome. Today’s path. London marker.", "Scrub date. Change latitude toward Nairobi.", "Noon altitude = 90° − |φ − δ|."),
		questions: [
			q("Noon solar altitude is lowest in London around…", [
				"June",
				"December",
				"March only",
				"Every day the same"
			], 1, "December solstice."),
			q("At the equator day length is…", [
				"0 in June",
				"Near 12 hours all year",
				"24 hours",
				"8 hours always"
			], 1, "Small seasonal swing."),
			q("Raising latitude in winter…", [
				"Raises noon Sun",
				"Lowers noon Sun and shortens the day",
				"Stops rotation",
				"Creates sunspots"
			], 1, "Geometry."),
			q("If I drag Latitude from 51.5° toward 0°, what happens to the path?", [
				"Noon Sun goes lower and the day collapses to polar night",
				"Noon Sun stays higher and day length sits nearer 12 h — Nairobi, not London",
				"The Sun starts orbiting Earth",
				"Miami and London swap hemispheres"
			], 1, "Latitude writes the path. Equator: high noon, near-12 h days. London: winter low and short.")
		],
		why: [
			"London in December is a low noon and a short day. Miami still has a useful beam. Same dome idea. Different latitude. Leeds glasshouses plot hours above a height that plants can use. Florida growers plot the same curve with a different φ. Snowdonia fieldwork in June is a long arc; the same slope in December is a brief, low Sun. New York sits between London and Miami on that ladder. The skill is to read noon altitude and day length from a path, not from a weather app. Pairs with the calculator tool. A magnetic compass is not true south. Overhead Sun is not a global noon habit. If you cannot move latitude in your head from 51.5° to 0°, you cannot compare a UK playground with Nairobi, and you will keep saying the Sun is overhead everywhere at lunch.",
			"Input is latitude, plus the time slider that walks the Sun along the dome. Default latitude is 51.5°, London. The path is the day’s arc on a sky hemisphere over a marked horizon. Noon altitude is 90° minus the absolute difference of latitude and declination: 90° − |φ − δ|. Day length falls out of whether the path clears the horizon, and for how long. What moves: the Sun along the arc, the length of that arc when you change φ, the gnomon’s shadow. What does not: the formula, the fact of a horizon, the fact that overhead Sun only happens between the tropics, and not every day. What is conserved: spherical geometry. Raise latitude in winter: noon Sun drops, day shortens. Toward the equator: noon stays high, day length sits near 12 h. Polar extremes are a longer day or a night that will not end, depending on season, but this slider caps short of the pole. The lie the model tells: a small dome, a fat Sun, a toy gnomon, a teaching plinth instead of a real playground. The path is the lesson. The numbers on the readout are the lesson. Seasons still come from tilt; this lab aims the beam for one place.",
			"Leave Latitude near 51.5°. That is London. Play. Space toggles play. Arrows nudge the Sun along the path. Speed 1×, 2×, 4×. Drag Latitude toward 0° for Nairobi, or toward Miami’s band, or south. Read noon altitude and day length from the readout. L labels. R reset. P projector. No explode, no slice in the bar. Reset if the dome has walked off a useful latitude. True south is not a magnetic compass. The Latitude slider is the extra. The time slider walks the Sun on the dome. Read the gnomon shadow as well as the numbers.",
			"If the dome will not spin, keep the formula and the places. Noon altitude = 90° − |φ − δ|. London winter: low noon, short day. Equator: day length near 12 h, noon Sun high. Overhead at noon only between the tropics, and not every day. Raising latitude in winter lowers the Sun and shortens the day. Miami is not London. Snowdonia in June is not Snowdonia in December. That is enough for Check on paper, and enough to kill ‘the Sun is overhead everywhere at noon’."
		],
		glossary: [
			{
				term: "Solar altitude",
				exam: "Elevation angle",
				def: "Angle of the Sun above the horizon. Noon altitude is the day’s peak."
			},
			{
				term: "Sun path",
				def: "The day’s arc on the sky dome. Date and latitude write it."
			},
			{
				term: "Declination",
				def: "The latitude where the Sun is overhead at noon. It travels between 23.44°N and 23.44°S."
			},
			{
				term: "Noon altitude",
				def: "90° − |φ − δ|. School formula. φ is latitude, δ is declination."
			},
			{
				term: "Day length",
				def: "Hours the Sun is above the horizon. Near 12 h at the equator. A wide swing at London."
			},
			{
				term: "Gnomon",
				def: "A stick that casts a shadow. Shadow length is a readout of solar altitude."
			},
			{
				term: "Tropics",
				def: "23.44°N to 23.44°S. Overhead Sun lives only in this belt, and not every day."
			},
			{
				term: "Latitude",
				exam: "φ",
				def: "Angle from the equator. This lab’s slider. Default 51.5° is London."
			}
		],
		misconception: {
			claim: "The Sun is overhead at noon everywhere.",
			truth: "Only between the tropics, and not every day."
		},
		misconceptions: [
			mc("The Sun is overhead at noon everywhere.", "Only between the tropics, and not every day."),
			mc("Day length is 12 hours everywhere, every day.", "Near 12 h at the equator. London swings from a short December to a long June."),
			mc("Raising latitude always makes the Sun higher.", "In winter it lowers noon Sun and shortens the day. Geometry, not a hill.")
		],
		cases: [{
			slug: "uk-daylength",
			label: "London day length"
		}, {
			slug: "florida-insolation",
			label: "New York / Miami"
		}],
		teacher: {
			script: "Leave Latitude near 51.5°. That is London.\nPlay. Watch the path on the dome. Read noon altitude and day length.\nThe Sun is overhead at noon only between the tropics, and not every day.\nThat is the misconception: overhead everywhere.\nScrub Latitude toward the equator, near Nairobi.\nDay length sits nearer 12 h. Noon Sun stays high.\nRaising latitude in winter lowers noon Sun and shortens the day.\nNoon altitude is 90° minus the absolute difference of latitude and declination.\nA magnetic compass is not true south. Say that once.\nFinish in Check.",
			pitfalls: [
				"Magnetic compass vs true south.",
				"Overhead Sun as a global noon habit.",
				"Forgetting that day length and noon altitude both move with latitude."
			]
		},
		sources: [{ label: "NOAA solar calculator" }],
		controls: {
			time: "year",
			extra: [{
				key: "latitude",
				label: "Latitude",
				min: -60,
				max: 65,
				step: .5,
				unit: "°",
				default: 51.5
			}]
		}
	})
];
var SKILL_LABS = [
	lab({
		slug: "graticule",
		title: "Graticule and coordinates",
		hook: "Latitude is how far from the equator. Longitude is how far from Greenwich. Together they are an address, not a decoration.",
		objective: "Drop a point on a 3D Earth, read lat/long, and relate 15° of longitude to one hour.",
		realm: "skills",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: [
			"KS3 map skills",
			"GCSE",
			"NGSS MS-ESS1-1"
		],
		steps: steps("The mesh of meridians and parallels is the graticule. Equator 0° latitude. Greenwich 0° longitude.", "Scrub the marker. Read the coordinates. 15° of longitude is one hour of Earth rotation.", "Coordinates are a grid on a sphere. They do not make the Earth flat."),
		questions: [
			q("Latitude measures…", [
				"Distance from Greenwich",
				"Angle from the equator, 0° to 90° N or S",
				"Height in metres",
				"Time zones only"
			], 1, "Parallels. 90°N is the North Pole."),
			q("The Greenwich meridian is…", [
				"The equator",
				"0° longitude, the school prime meridian",
				"180° always",
				"A climate belt"
			], 1, "Civil time grew from this line. The Earth does not care."),
			q("15° of longitude is about…", [
				"One year",
				"One hour of rotation",
				"One kilometre",
				"A contour interval"
			], 1, "360° / 24 h. Pair with the rotation lab."),
			q("A point at 0°, 0° sits…", [
				"In London",
				"In the Atlantic, south of Ghana, where equator meets Greenwich",
				"At the North Pole",
				"In New York"
			], 1, "Gulf of Guinea. Not a capital.")
		],
		why: [
			"Every case locator on this site is a lat/long pair. Greenwich is the civil zero for longitude — a plaque on a rotating sphere, not a machine that makes day and night. US Eastern, Central, Mountain, and Pacific are four civil labels across about 60° of longitude; the terminator ignores the jogs around state lines. A Leeds frost at 07:00 is already sunlight on a Berlin school roof. Snowdonia and Yosemite sit at different longitudes, so the same full Moon rises at different clock times; the coordinate is an address, not a decoration. Railways forced time zones onto 15° meridians. Rescue, aviation, and every atlas pin still speak this language. The equator does none of that work: it is 0° latitude, a different axis of the same net. Live weather satellites in geostationary slots match this spin. Historical noon was local until the railways forced zones.",
			"The graticule is the network of meridians and parallels on a globe or map. Latitude is the angle from the equator, 0° to 90° north or south. Parallels never meet; they shrink toward the poles. Longitude is the angle from the Greenwich meridian, 0° to 180° east or west. Meridians run pole to pole and meet at the poles. The two families cross at right angles. The equator is 0° latitude, not a line of longitude. Greenwich is 0° longitude, a convention; the spin does not care which meridian we labelled zero. Fifteen degrees of longitude is about one hour of Earth rotation: 360° divided by 24 hours. Coordinates are a grid on a sphere. They do not make the Earth flat. A point at 0°, 0° sits in the Atlantic, south of Ghana, in the Gulf of Guinea — not in London. The International Date Line is near 180°, not the Greenwich meridian, and it jogs for islands. This lab draws the Tropic of Cancer at 23.44°N and the Arctic Circle at 66.56°N; they are tilt geometry, not climate belts painted on the sea. East and west mix-ups are the classic error: New York is west of Greenwich.",
			"Scrub Latitude and Longitude. Drop a marker on London, then New York. Read the coordinates aloud. East and west mix-ups happen here. Point at the equator, then Greenwich: they cross at right angles. Ask the hour difference before you reveal: 15° of longitude is about one hour. Orbit the globe so meridians and parallels read as a net, not a decoration. Pause on Greenwich 0°, then on a US time-zone longitude, and count the hours. Keyboard: L labels, R reset. Latitude and Longitude sliders live in the control bar. The readout follows the pin, including the hour offset.",
			"The globe is a sphere of true shape. The net is a teaching mesh, denser than a school atlas so it reads from the back of the room. The marker is a teaching pin, not a surveyed monument. Tropics and polar circles are drawn true. Time-zone jogs are omitted so the 15° hour stays the lesson. Without the 3D view: latitude is angle from the equator; longitude is angle from Greenwich; meridians meet at the poles and parallels never do; 15° is about one hour; 0°, 0° is the Gulf of Guinea, not London."
		],
		glossary: [
			{
				term: "Graticule",
				def: "The network of meridians and parallels on a globe or map."
			},
			{
				term: "Meridian",
				def: "A line of longitude, pole to pole. Meridians meet at the poles."
			},
			{
				term: "Parallel",
				def: "A line of latitude, parallel to the equator. Parallels never meet."
			},
			{
				term: "Latitude",
				def: "Angle from the equator, 0° to 90° N or S. Not a distance in kilometres."
			},
			{
				term: "Longitude",
				def: "Angle from the prime meridian, 0° to 180° E or W. 15° is about one hour."
			},
			{
				term: "Prime meridian",
				exam: "Greenwich meridian",
				def: "The civil zero of longitude. Greenwich is the school choice. The Earth does not care."
			},
			{
				term: "Equator",
				def: "0° latitude. It is a parallel, not a meridian."
			},
			{
				term: "International Date Line",
				def: "The civil date-change near 180°. It is not the Greenwich meridian, and it jogs for islands."
			}
		],
		misconception: {
			claim: "The equator is a line of longitude.",
			truth: "The equator is 0° latitude. Greenwich is 0° longitude. They cross at right angles."
		},
		misconceptions: [
			{
				claim: "The equator is a line of longitude.",
				truth: "The equator is 0° latitude. Greenwich is 0° longitude. They cross at right angles."
			},
			{
				claim: "0°, 0° is in London, because Greenwich is there.",
				truth: "Greenwich is about 51.5°N, 0°. The equator meets Greenwich in the Gulf of Guinea, south of Ghana."
			},
			{
				claim: "The International Date Line is the Greenwich meridian.",
				truth: "Greenwich is 0°. The date line is near 180°, with jogs for islands. Time zones are civil labels on longitude, not the cause of day and night."
			}
		],
		cases: [{
			slug: "greenwich",
			label: "Greenwich meridian"
		}, {
			slug: "time-zones-us",
			label: "US time zones"
		}],
		teacher: {
			script: "Point at the equator, then Greenwich. Equator is 0° latitude. Greenwich is 0° longitude.\nThey cross at right angles. The equator is not a line of longitude.\nThat is the misconception.\nScrub Latitude and Longitude. Drop a marker on London, then New York.\nRead the coordinates aloud. East and west mix-ups happen here.\nAsk the hour difference before you reveal: 15° of longitude is about one hour of Earth rotation.\nCoordinates are a grid on a sphere. They do not make the Earth flat.\nA point at 0°, 0° sits in the Atlantic, south of Ghana, not in London.\nThe International Date Line is not the Greenwich meridian.\nTime zones are labels on longitude. They do not cause day and night.\nFinish in Check.",
			pitfalls: [
				"E/W mix-up: New York is west of Greenwich.",
				"Calling the International Date Line the Greenwich meridian.",
				"Putting 0°, 0° in London because the prime meridian is there.",
				"Teaching time zones as the machinery of day and night."
			]
		},
		sources: [{ label: "Royal Observatory Greenwich" }, { label: "OS / USGS map skills" }],
		controls: {
			time: "none",
			extra: [{
				key: "lat",
				label: "Latitude",
				min: -80,
				max: 80,
				step: .5,
				unit: "°",
				default: 51.5
			}, {
				key: "lon",
				label: "Longitude",
				min: -180,
				max: 180,
				step: .5,
				unit: "°",
				default: -.1
			}]
		}
	}),
	lab({
		slug: "map-projections",
		title: "Map projections",
		hook: "Peel an orange and the skin tears. Every world map is a compromise. Greenland is the giveaway.",
		objective: "Morph a globe to Mercator, equal-area, and a compromise, and say what each distorts.",
		realm: "skills",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: ["GCSE map skills", "NGSS MS-ESS2-2"],
		steps: steps("Start on the globe. Greenland is smaller than Africa.", "Mercator: rhumb lines straight, high latitudes balloon. Equal-area: sizes fair, shapes suffer. Compromise: neither perfect.", "There is no honest single map of the whole Earth. Choose the lie you can live with."),
		questions: [
			q("On a Mercator world map Greenland looks…", [
				"Tiny",
				"About the size of Africa — a distortion; Africa is far larger",
				"The same as on the globe",
				"A river"
			], 1, "Mercator inflates high latitudes."),
			q("An equal-area projection is built to…", [
				"Keep compass bearings",
				"Keep relative sizes of regions",
				"Make the UK huge",
				"Hide the poles"
			], 1, "Shapes then take the hit."),
			q("Why do we still use Mercator at sea historically?", [
				"It is equal-area",
				"Rhumb lines (constant bearing) are straight",
				"It is newest",
				"NASA requires it"
			], 1, "Navigation, not fairness."),
			q("The globe in this lab is the…", [
				"Most distorted view",
				"Reference: a sphere (almost) does not need a projection",
				"Mercator already",
				"A contour map"
			], 1, "Projections start when you flatten.")
		],
		why: [
			"A classroom wall map is a projection, not the true size of countries. News maps that grow Russia and shrink Africa are a choice about area, not a verdict on people. Start with area. Greenland is the giveaway: on Mercator it looks about the size of Africa; on the globe it is far smaller. Iceland sits at high latitude, so it balloons on the same family of maps. Greenwich is a meridian, not a map — the plaque does not flatten the Earth. An OS sheet of Snowdonia and a USGS quad of Yosemite are local projections with different jobs; they are not a moral statement about the world. Atlas versus this site’s tools/map: both flatten; this lab says how, and what you lose when you peel the orange.",
			"Do not start a culture war. Start with area. A sphere does not flatten without tears. Peel an orange: the skin rips. Every world map chooses what to keep and what to distort. Mercator keeps local shape — it is conformal — and makes rhumb lines, paths of constant bearing, straight, which is why it was used at sea. High latitudes balloon, so Greenland and Iceland swell while Africa looks small. Africa is about fourteen times the area of Greenland. Mercator hides that. An equal-area projection keeps relative sizes of regions; shapes then take the hit. A compromise is neither perfect. The globe in this lab is the reference: a sphere almost does not need a projection. Projections start when you flatten. Orange-peel gores show the tears at the cuts. Local OS maps and USGS quads are a different problem — a projected grid on a small patch, not a world poster. There is no honest single map of the whole Earth. Choose the lie you can live with. Do not teach one projection as morally pure. Area first, then shape, then the navigation story.",
			"Start on the globe. Ask Greenland versus Africa. Greenland is smaller than Africa. Scrub Flatten toward the orange-peel gores: the skin tears at the cuts. Then Mercator: high latitudes balloon. Ask what happened to Greenland’s area before you name the projection. Leave labels off until the class can say which view is the globe. Do not start a culture war at the slider. Start with area, then rhumb lines as the navigation reason Mercator survived. Keyboard: L labels, R reset. Flatten slider lives in the control bar. The readout names globe, gores, then Mercator-like flatten. Compare sizes before names.",
			"The land outlines are teaching silhouettes, not a traced census of coastlines. Greenland and Africa are sized so the area lie reads from the back row. Gores are schematic strips, not a printer’s template. Mercator here is Mercator-like: enough stretch to see the balloon, not a navigation chart. Local OS and USGS sheets are off-stage; they flatten a county, not a planet. Without the 3D view: a globe needs no projection; flattening tears; Mercator inflates high latitudes; equal-area keeps size and spends shape; there is no honest single world map. Start with area, not with a quarrel."
		],
		glossary: [
			{
				term: "Projection",
				def: "A rule for flattening the globe onto a plane. Every rule distorts something."
			},
			{
				term: "Mercator",
				def: "Conformal cylindrical. Rhumb lines straight. Distorts area toward the poles."
			},
			{
				term: "Equal-area",
				exam: "Equivalent projection",
				def: "Preserves relative area of regions. Distorts shape."
			},
			{
				term: "Conformal",
				exam: "Orthomorphic",
				def: "Preserves local shape and angles. Area then takes the hit."
			},
			{
				term: "Rhumb line",
				exam: "Loxodrome",
				def: "A path of constant bearing. Straight on Mercator; not the shortest route."
			},
			{
				term: "Gores",
				def: "Orange-peel strips of the globe. The tears at the cuts are the cost of flattening."
			},
			{
				term: "Compromise projection",
				def: "A map that splits the distortion so nothing is perfect and nothing is ruinous."
			},
			{
				term: "Distortion",
				def: "What a projection spends: area, shape, distance, or direction. You cannot keep all four on a world map."
			}
		],
		misconception: {
			claim: "The classroom wall map is the true size of countries.",
			truth: "It is a projection. Compare Greenland and Africa on the globe first."
		},
		misconceptions: [
			{
				claim: "The classroom wall map is the true size of countries.",
				truth: "It is a projection. Compare Greenland and Africa on the globe first."
			},
			{
				claim: "Mercator is a political lie designed to make the north look powerful.",
				truth: "Mercator was built for rhumb-line navigation. High latitudes balloon as a geometric cost. Start with area, not with a culture war."
			},
			{
				claim: "There is one honest map of the whole Earth.",
				truth: "Every world map is a compromise. Equal-area keeps size and spends shape. The globe is the reference; local OS maps are a different problem."
			}
		],
		cases: [{
			slug: "greenwich",
			label: "Greenwich as a meridian, not a map"
		}, {
			slug: "iceland",
			label: "High-latitude size trap"
		}],
		teacher: {
			script: "Start on the globe. Ask Greenland versus Africa. Greenland is smaller than Africa.\nDo not start a culture war. Start with area.\nScrub Flatten toward the gores. The orange peel tears at the cuts.\nThen Mercator. High latitudes balloon. Rhumb lines go straight.\nSizes on the wall map are not true sizes. It is a projection.\nThat is the misconception. Compare Greenland and Africa on the globe first.\nEqual-area keeps relative size; shapes then take the hit.\nThere is no honest single map of the whole Earth. Choose the lie you can live with.\nDo not teach one projection as morally pure. Local OS maps are a different problem.\nNews maps that grow Russia and shrink Africa are a projection choice.\nFinish in Check.",
			pitfalls: [
				"Teaching one projection as morally pure.",
				"Starting a culture war instead of starting with area.",
				"Forgetting that local OS maps and USGS quads are a different problem.",
				"Treating Greenland’s Mercator size as a fact about ice, not a fact about the map."
			]
		},
		sources: [{ label: "USGS map projections" }, { label: "Natural Earth" }],
		controls: {
			time: "none",
			extra: [{
				key: "morph",
				label: "Flatten",
				min: 0,
				max: 1,
				step: .01,
				default: 0
			}]
		}
	}),
	lab({
		slug: "grid-references",
		title: "Grid references",
		hook: "An OS six-figure reference is a 100 m square, not a pin. Eastings then northings. Along the corridor, up the stairs.",
		objective: "Read and plot a six-figure grid reference on a small UK tile.",
		realm: "skills",
		ages: ["KS3", "GCSE"],
		curriculum: [
			"GCSE map skills",
			"AQA 3.3",
			"KS3"
		],
		steps: steps("The blue grid is a kilometre. A four-figure reference names a 1 km square. Six-figure splits it into 100 m.", "Drop a marker. Read eastings first, then northings.", "This is not lat/long. OSGB is a projected grid on Britain. The graticule lab is the sphere."),
		questions: [
			q("You read a grid reference…", [
				"Northings then eastings",
				"Eastings then northings — along the corridor, up the stairs",
				"Latitude only",
				"In random order"
			], 1, "The school mnemonic still earns marks."),
			q("A six-figure reference locates to about…", [
				"1 km",
				"100 m",
				"1 m",
				"A county"
			], 1, "Each extra pair of digits divides by ten."),
			q("Four-figure 1234 means…", [
				"A point",
				"The 1 km square whose SW corner is easting 12, northing 34",
				"A contour",
				"A latitude"
			], 1, "The square, not a pin."),
			q("OS grid is…", [
				"The same as the graticule",
				"A projected kilometre grid on Great Britain",
				"US state plane",
				"A climate map"
			], 1, "Different tool from lat/long.")
		],
		why: [
			"GCSE paper 3 lives here. Walkers on Snowdonia still use six-figure references; phones hide them behind a pin. The OS sheet of Eryri is a projected kilometre grid, not lat/long. Yosemite’s USGS quad is a different national grid — often feet on older plates — the same idea of a square on a projected plane, different letters and units. Lake District tiles use the same OSGB habit: eastings then northings. Rescue, Duke of Edinburgh, and the map paper all punish northings first. A six-figure is a 100 m square you can stand in, not a lamp-post. Along the corridor, up the stairs is still the mnemonic that earns marks. A missed digit on a mountain day is a 100 m error you can walk; a swapped easting and northing is a kilometre in the wrong direction. Phones will not sit the exam.",
			"You read a grid reference eastings then northings. Along the corridor, then up the stairs. The blue grid is a kilometre. A four-figure reference names a 1 km square by its south-west corner: 1234 means easting 12, northing 34. Six-figure splits that square into a 100 m cell. Eight-figure is 10 m. This is not lat/long. OSGB is a projected kilometre grid on Great Britain. The graticule lab is the sphere. GPS is a pin on WGS84; it is something else, then converted for the sheet. A six-figure is a square, not a single lamp-post. Northings first is the classic mark-loser. The numbers increase east and north from a false origin south-west of the Isles. 100 km letters (SH, NY) name the big square; this lab’s tile is the numbers inside one square. Each extra pair of digits divides by ten. To plot: find the easting to the west of the point, then the northing to the south, then estimate tenths inside the square. That estimate is why six-figure is 100 m, not a pin. Never read the numbers as latitude. Never start with the northing. The school mnemonic is not a joke; it is the mark scheme.",
			"Give a six-figure. Wait for fingers on the tile. Eastings first, then northings. Then drop the marker. Reverse: hide the numbers, ask the class to read. Scrub Easting and Northing so the point walks. Play so the marker walks the tile and freeze when the six-figure matches the one on the board. Ask which 1 km square you are in before you ask the 100 m cell. Point at the easting arrow first. Keyboard: L labels, R reset. Easting and Northing sliders live in the control bar. The readout prints the six-figure and the 1 km square.",
			"The tile is invented teaching ground, not a traced OS sheet of Snowdonia. The 100 m cell is a square you can see, not a surveyed lamp-post. Blue lines are the kilometre grid; the inner mesh is the 100 m split of one square. Houses on the tile are props, not addresses. Without the 3D view: eastings then northings; four-figure is 1 km by the south-west corner; six-figure is 100 m; this is OSGB, not the graticule; GPS is a different tool."
		],
		glossary: [
			{
				term: "Easting",
				def: "How far east in the grid. Read first. Along the corridor."
			},
			{
				term: "Northing",
				def: "How far north in the grid. Read second. Up the stairs."
			},
			{
				term: "Four-figure grid reference",
				def: "Names a 1 km square by its south-west corner."
			},
			{
				term: "Six-figure grid reference",
				def: "Locates a 100 m square on the OS grid. Not a pin."
			},
			{
				term: "OSGB",
				exam: "British National Grid",
				def: "A projected kilometre grid on Great Britain. Different tool from lat/long."
			},
			{
				term: "False origin",
				def: "The south-west point from which eastings and northings are counted, off the Isles so all numbers stay positive."
			},
			{
				term: "Grid square",
				def: "The cell the reference names. Four-figure: 1 km. Six-figure: 100 m. Eight-figure: 10 m."
			},
			{
				term: "WGS84",
				def: "The GPS ellipsoid and datum. A phone pin is not an OS six-figure until it is converted."
			}
		],
		misconception: {
			claim: "A six-figure reference is a single lamp-post.",
			truth: "It is a 100 m square. Eight-figure is 10 m. GPS is something else."
		},
		misconceptions: [
			{
				claim: "A six-figure reference is a single lamp-post.",
				truth: "It is a 100 m square. Eight-figure is 10 m. GPS is something else."
			},
			{
				claim: "You read northings first, then eastings.",
				truth: "Eastings then northings. Along the corridor, up the stairs. Northings first is the classic mark-loser."
			},
			{
				claim: "OS grid is the same as lat/long.",
				truth: "OSGB is a projected kilometre grid on Great Britain. The graticule lab is the sphere. GPS on WGS84 is a third tool."
			}
		],
		cases: [{
			slug: "snowdonia",
			label: "Snowdonia OS tile"
		}, {
			slug: "lake-district",
			label: "Lake District OS tile"
		}],
		teacher: {
			script: "Give a six-figure. Wait for fingers on the tile. Eastings first, then northings: along the corridor, up the stairs.\nThen drop the marker. Reverse: hide the numbers, ask the class to read.\nScrub Easting and Northing so the point walks.\nA six-figure reference locates a 100 m square, not a single lamp-post.\nThat is the misconception. Eight-figure is 10 m. GPS is something else.\nFour-figure names a 1 km square by its south-west corner.\nThis is not lat/long. OSGB is a projected kilometre grid on Great Britain.\nThe graticule lab is the sphere. Do not call this the graticule.\nNorthings first is the classic mark-loser. Easting then northing, every time.\nYosemite’s USGS quad is a cousin, not this grid. Same square idea, different letters.\nFinish in Check.",
			pitfalls: [
				"Northings first.",
				"Calling it lat/long or the graticule.",
				"Treating a six-figure as a lamp-post instead of a 100 m square.",
				"Mixing OSGB letters with a phone GPS pin and calling them the same."
			]
		},
		sources: [{ label: "Ordnance Survey map skills" }, { label: "OS GetOutside grid references" }],
		controls: {
			time: "none",
			extra: [{
				key: "easting",
				label: "Easting",
				min: 0,
				max: 999,
				step: 1,
				default: 246
			}, {
				key: "northing",
				label: "Northing",
				min: 0,
				max: 999,
				step: 1,
				default: 513
			}]
		}
	})
];
var SOIL_LABS = [
	lab({
		slug: "rock-cycle",
		title: "Rock cycle",
		hook: "Igneous, sedimentary, metamorphic. Arrows, not a one-way ladder. Temperature and pressure bias the path.",
		objective: "Animate the trio and use T/P sliders to bias the path.",
		realm: "soils",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: [
			"KS3",
			"GCSE rocks",
			"NGSS MS-ESS2-1"
		],
		steps: steps("Three rocks. Arrows.", "Raise T/P: toward metamorphic/melt.", "Weathering toward sediment."),
		questions: [
			q("Metamorphic rock needs…", [
				"Only wind",
				"Heat and/or pressure on existing rock, without full melt (school)",
				"A beach day",
				"A tide"
			], 1, "Then it can still melt."),
			q("Sedimentary rock typically starts as…", [
				"Magma only",
				"Weathered bits deposited then lithified",
				"The inner core",
				"Clouds"
			], 1, "Grand Canyon walls."),
			q("The cycle is…", [
				"One-way",
				"A set of paths; rock can loop",
				"A hurricane",
				"A time zone"
			], 1, "Not a ladder."),
			q("Raising temperature and pressure without full melt produces…", [
				"A soil horizon",
				"Metamorphic rock",
				"A named storm",
				"A spit"
			], 1, "Full melt is igneous again.")
		],
		why: [
			"The Jurassic Coast and the Grand Canyon are one rock cycle at walking distance. Dorset’s Lias, Oolite and chalk are a sedimentary sequence you can stand on in an afternoon; Arizona’s walls are sandstone, shale and limestone stacked above Vishnu Schist. A UK party names beds. A US party names formations. Both sentences are about type, not about a birthday. GCSE and NGSS both ask students to move material among igneous, sedimentary and metamorphic without treating the poster as a one-way ladder. Age is independent of type: a Palaeozoic limestone is old and sedimentary; a Holocene basalt is young and igneous. Somerset Levels alluvium was rock somewhere up-catchment. Dust Bowl silt was a mineral in a parent. Yorkshire Dales limestone is a carbonate bed waiting for carbonation. A cliff, a soil and a quarry are the same budget in different rooms. Temperature and pressure light melt and metamorphism; weathering and lithification light the other arrows. UK coast, US canyon: same machine, different outcrop.",
			"Igneous rock crystallises from melt. Intrusive bodies cool slowly and grow visible crystals; extrusive lava cools fast and is often finer. Weathering and erosion then break any rock into sediment. Deposition, burial, compaction and cementation lithify that sediment into sedimentary rock: beds you can count on a Dorset cliff or a canyon wall. If burial and tectonics raise temperature and pressure without a full melt, minerals recrystallise in the solid state. That is metamorphic rock, often foliated when directed stress is present. Raise heat further and the rock melts; magma is igneous waiting to happen again. Those are paths, not a ranking and not a staircase. Granite can weather to sand. Sandstone can become quartzite. Quartzite can melt. Limestone can become marble without ever being called young. In this lab the sliders bias the arrows: high temperature and pressure favour metamorphism and melt; cooler conditions keep the weathering arrow lit. School diagrams that draw a circle with three boxes are a cartoon of that network. The honest sentence is that any type can become any other if the conditions exist. Full melt is igneous. Change in the solid is metamorphic. Bits stuck together are sedimentary. That distinction is the plot.",
			"Orbit the trio. A granite plug with crystals sits on top. Horizontal sedimentary beds sit to the right. Foliated metamorphic beds sit to the left. Magma glows below. Play to watch the magma pulse. Raise Temperature and Pressure together. When their mean is high, hot arrows toward melt and metamorphism brighten and cool weathering arrows dim. Drop both sliders and the cool arrows return. Read T and P on the studio readout. Labels name the three rocks. Step the camera for a closer look at one type. The arrows loop both ways. Do not teach them as a ladder.",
			"Without the canvas you still have the cycle in sentences. Igneous crystallises from melt. Sedimentary is deposited bits lithified into beds. Metamorphic is existing rock changed in the solid by heat and pressure. Arrows run both ways: weathering toward sediment, burial and heat toward metamorphism and melt. The Jurassic Coast is a sedimentary sequence. Grand Canyon walls are that idea with metamorphic basement at the river. Sedimentary is not always young. Age is independent of type. Temperature and pressure bias the path; they do not invent a fourth rock. A one-way ladder is the diagram to refuse."
		],
		glossary: [
			{
				term: "Igneous",
				def: "Rock crystallised from melt. Intrusive cools slowly; extrusive cools at the surface."
			},
			{
				term: "Sedimentary",
				def: "Rock from deposited fragments or precipitates, then lithified."
			},
			{
				term: "Metamorphic",
				def: "Existing rock changed in the solid by heat and/or pressure, without full melt."
			},
			{
				term: "Lithification",
				def: "Compaction and cementation that turn sediment into sedimentary rock."
			},
			{
				term: "Foliation",
				def: "Layered mineral fabric from directed stress during metamorphism."
			},
			{
				term: "Magma",
				def: "Molten rock below the surface. Lava is the same material once it erupts."
			},
			{
				term: "Weathering (to sediment)",
				def: "Breakdown that feeds the sedimentary path. Not the same as erosion."
			}
		],
		misconception: {
			claim: "Sedimentary is ‘young’ always.",
			truth: "Age is independent of type."
		},
		misconceptions: [
			{
				claim: "Sedimentary is ‘young’ always.",
				truth: "Age is independent of type."
			},
			{
				claim: "The cycle is a one-way ladder: igneous, then sedimentary, then metamorphic.",
				truth: "Any type can become any other if the conditions exist. Arrows loop."
			},
			{
				claim: "Metamorphic means the rock melted and froze again.",
				truth: "School story: change in the solid. Full melt is igneous again."
			}
		],
		cases: [{
			slug: "grand-canyon",
			label: "Grand Canyon"
		}, {
			slug: "jurassic-coast",
			label: "Jurassic Coast"
		}],
		teacher: {
			script: "Name the trio out loud: igneous, sedimentary, metamorphic. Point at granite, beds, foliated rock.\nThe arrows loop both ways. This is not a one-way ladder.\nRaise Temperature and Pressure. Watch the hot arrows toward metamorphic rock and melt.\nDrop both sliders. Cool weathering arrows toward sediment come back.\nSedimentary is not always young. Age is independent of type.\nThat is the misconception. Palaeozoic limestone is old and still sedimentary.\nMetamorphic needs heat and/or pressure on existing rock, without full melt in the school story. Then it can still melt.\nSedimentary typically starts as weathered bits deposited then lithified. Grand Canyon walls. Jurassic Coast beds.\nDo not teach a staircase diagram. Do not invent a fourth rock.\nFinish in Check.",
			pitfalls: [
				"One-way diagram.",
				"Age equals type.",
				"Calling marble a sediment because it was once limestone.",
				"Full melt labelled metamorphic."
			]
		},
		sources: [{ label: "USGS rocks" }, { label: "BGS" }],
		controls: {
			time: "none",
			extra: [{
				key: "temp",
				label: "Temperature",
				min: 0,
				max: 1,
				step: .05,
				default: .3
			}, {
				key: "pressure",
				label: "Pressure",
				min: 0,
				max: 1,
				step: .05,
				default: .3
			}]
		}
	}),
	lab({
		slug: "soil-profile",
		title: "Soil profile",
		hook: "O A E B C R — a stack, not dirt. Compare brown earth, mollisol, oxisol.",
		objective: "Name horizons and compare three profiles.",
		realm: "soils",
		ages: [
			"GCSE",
			"A-level",
			"NGSS MS",
			"APES"
		],
		curriculum: [
			"GCSE",
			"APES 4.3",
			"A-level"
		],
		steps: steps("Stack O to R.", "Switch UK brown earth, US mollisol, tropical oxisol.", "Oxisol: deep, leached, red. Mollisol: thick A. Brown earth: UK woodland/farm default."),
		questions: [
			q("The R horizon is…", [
				"Leaf litter",
				"Bedrock",
				"The ozone layer",
				"A front"
			], 1, "Rock."),
			q("A thick dark A is typical of…", [
				"Oxisol",
				"Mollisol (grassland)",
				"Bare dune only",
				"Glacier ice"
			], 1, "Prairies."),
			q("An oxisol is…", [
				"A UK peat always",
				"A highly weathered tropical soil",
				"A lava",
				"A tide"
			], 1, "Not a UK default."),
			q("The E horizon is…", [
				"Always peat",
				"A leached, often paler eluviated layer",
				"The inner core",
				"A storm surge"
			], 1, "Present in the brown earth; weak or gone in the mollisol and oxisol here.")
		],
		why: [
			"A soil is a stack written by climate, organisms, relief, parent rock and time, not a single colour of mud. UK woodland and farm default is a brown earth: modest O, mixed A, a weak pale E, then B, C and bedrock. Yorkshire Dales soils over Carboniferous limestone are often thin; R is close to the boot. The US grassland pair is a mollisol: a thick dark A, little or no E, the prairie store that the Dust Bowl spent. An oxisol is the tropical end-member: deep, leached, red, not a Peak District peat. GCSE, A-level and APES all need named horizons. Geography posters that show one UK profile as universal leave a class unable to read a Great Plains pit or a laterite cut. The stack is the win because colour alone does not name a soil. O is litter. A is mineral mixed with organic. E is leached. B is accumulation. C is parent. R is rock. Say the letters before you say the place.",
			"Horizons form because water, roots, fauna and chemistry move material down and sometimes up. Organic matter collects at the top as O, then mixes into A. In wetter, forested temperate climates clay and iron can be washed from an E horizon, leaving it paler; they accumulate in B. Grasslands keep adding roots and organic matter to A, so the dark layer thickens and E may never read. In hot, wet tropics intense leaching and oxidation build a deep red B and eat the rest of the story; nutrients sit in the biomass more than in the clay. Parent rock still matters: limestone in the Dales weathers to a thin rendzina-like cover; loess and glacial till on the Great Plains gave a deep mineral start. Time is a budget. A young dune has little profile; an old tropical surface has a thick one. This lab’s three slabs are types, not every soil on Earth. Brown earth, mollisol, oxisol. Name what is thick, what is missing, and what colour the B is. That is profile literacy: three climates, three stacks, not one UK pit drawn as the world.",
			"Scrub the Profile slider through 0, 1 and 2. Brown earth, mollisol, oxisol. Read the name and the note on the slab. Orbit so O sits at the top and R at the floor. Name each horizon out loud as the letters appear. Compare A thickness: thin-to-modest on the brown earth, thick and dark on the mollisol, thinner on the oxisol above a deep red B. Look for E: present and pale on the UK default, gone on the other two here. Step the camera to a side-on cut. Do not leave until the class can point at R and not call it compost.",
			"Without the canvas the stack is still the lesson. O organic, A mixed mineral and organic, E leached, B accumulation, C parent, R bedrock. Brown earth is the UK woodland and farm default with a weak pale E. Mollisol is grassland with a thick dark A — Dust Bowl country when the cover goes. Oxisol is a highly weathered tropical soil, deep and red, not a UK peat. Yorkshire Dales limestone soils can be thin over R. Soil is not one kind of dirt. Horizons and climate write different profiles. Name the letters. Then name which layer is thick."
		],
		glossary: [
			{
				term: "Horizon",
				def: "A layer in a soil profile with its own colour, texture and chemistry."
			},
			{
				term: "O horizon",
				def: "Organic layer at the top: litter and decomposing material."
			},
			{
				term: "A horizon",
				def: "Upper mineral soil mixed with organic matter. Topsoil in farm talk."
			},
			{
				term: "E horizon",
				def: "Eluviated, often paler layer from which clay and iron have been washed."
			},
			{
				term: "B horizon",
				def: "Subsoil where materials accumulate. Colour and clay often change here."
			},
			{
				term: "R horizon",
				def: "Bedrock. Not soil."
			},
			{
				term: "Mollisol",
				exam: "Chernozem / grassland soil",
				def: "Grassland soil with a thick dark A. Prairie and steppe store."
			},
			{
				term: "Oxisol",
				def: "Highly weathered tropical soil; deep, leached, often red."
			}
		],
		misconception: {
			claim: "Soil is just dirt of one kind.",
			truth: "Horizons and climate write different profiles."
		},
		misconceptions: [
			{
				claim: "Soil is just dirt of one kind.",
				truth: "Horizons and climate write different profiles."
			},
			{
				claim: "The dark layer is always the whole soil.",
				truth: "A is one horizon. B, C and R still sit underneath."
			},
			{
				claim: "Every country has the same stack as a UK brown earth.",
				truth: "Mollisols and oxisols are different machines. Teach three, not one."
			}
		],
		cases: [{
			slug: "yorkshire-dales",
			label: "Thin limestone soils"
		}, {
			slug: "dust-bowl",
			label: "Mollisol at risk"
		}],
		teacher: {
			script: "Name O to R out loud: organic, A, E, B, C, then bedrock.\nScrub the Profile slider: UK brown earth, US mollisol, tropical oxisol.\nMollisol: thick dark A, grassland. Oxisol: deep, leached, red. Brown earth: UK woodland and farm default.\nPoint at E on the brown earth. It is weak or gone on the other two here.\nSoil is not just dirt of one kind. Horizons and climate write different profiles.\nThat is the misconception.\nDo not teach one UK profile as universal. Yorkshire Dales can be thin over limestone. Dust Bowl is mollisol at risk.\nThe R horizon is rock. O is litter, not the whole story.\nA stack, not a colour of mud.\nFinish in Check.",
			pitfalls: [
				"Teaching one UK profile as universal.",
				"Calling the whole stack ‘topsoil’.",
				"Oxisol as a Peak District peat.",
				"R horizon as compost."
			]
		},
		sources: [{ label: "USDA NRCS" }, { label: "BGS soils" }],
		controls: {
			time: "none",
			extra: [{
				key: "profile",
				label: "Profile",
				min: 0,
				max: 2,
				step: 1,
				default: 0
			}]
		}
	}),
	lab({
		slug: "soil-texture",
		title: "Soil texture triangle",
		hook: "Sand, silt, clay. Plot a sample. Name the class. Loam is a place on the triangle, not a brand.",
		objective: "Move a point on the texture triangle and read the class.",
		realm: "soils",
		ages: [
			"GCSE",
			"A-level",
			"APES",
			"NGSS MS"
		],
		curriculum: ["GCSE", "APES 4.3"],
		steps: steps("Triangle. Three axes.", "Drag sand/silt/clay.", "Read loam, clay, sand…"),
		questions: [
			q("Clay particles are…", [
				"The coarsest",
				"The finest of the three",
				"Always yellow",
				"Ice"
			], 1, "Feel: sticky."),
			q("Loam is…", [
				"Pure clay",
				"A balanced mix near the middle — good for many farms",
				"Bedrock",
				"A cloud"
			], 1, "Not a brand of bag."),
			q("A soil with 90% sand is…", [
				"Clay",
				"Sand / sandy class",
				"Peat by definition",
				"A mollisol always"
			], 1, "Triangle."),
			q("Sand, silt and clay on the triangle must…", [
				"Sum to 50%",
				"Sum to 100%",
				"Ignore silt",
				"Be equal always"
			], 1, "Silt is the remainder. Move sand and clay; silt follows.")
		],
		why: [
			"Texture is a particle-size mix, not a colour and not a bag from a garden centre. Plot sand, silt and clay, then name the USDA class. Loam is a place near the middle of the triangle, not a brand. That sentence is the UK and US share: GCSE talks sand, silt and clay; APES and NRCS use the same triangle. Somerset Levels clays and peats sit toward fine; they hold water and stick. Dust Bowl silts sat on the wind because the particles were small enough to lift once the cover went. A Yorkshire Dales rendzina over limestone can be thin and stony, not a loam by slogan. Grand Canyon colluvium and Jurassic Coast cliff falls start as rock fragments and weather toward these three sizes. Farmers care because texture sets drainage, workability and how fast a rill can cut. A sandy soil drinks and dries. A clay holds and ponds. Loam is the compromise many crops like. Colour can lie. Particle size does not.",
			"Sand, silt and clay are size classes of mineral particles. Sand is the coarsest of the three and feels gritty. Silt feels floury. Clay is the finest and feels sticky when wet because the particles have huge surface area and often a charge. Organic matter is a separate story; peat is not a point on this mineral triangle. The USDA texture triangle is a ternary plot: the three percentages must sum to 100. A class name — sand, sandy loam, loam, clay loam, clay, silt loam — is a region on that plot, not a personality. Loam sits near the middle: enough sand to drain, enough clay and silt to hold nutrients and water. Move toward a corner and the class follows the dominant size. Feel tests in the field (gritty, smooth, ribbon length) are the same triangle without the printed chart. This lab is the chart. It does not measure a real sample; it teaches the geometry so a field sentence can be plotted. Texture is not structure (crumbs and blocks) and not colour (iron, organic matter). Keep those words apart.",
			"Show the USDA triangle, not a 3D cone. Move Sand % and Clay %. Silt is the remainder so the three sum to 100. The point walks. Read the class name out loud from the readout: loam, clay, sandy loam, silt. Push sand toward 90 and name a sandy class. Push clay up until the point enters clay. Come back toward the middle and say loam as a place, not a brand of bag. Ask for a field sample in words — ‘more sand than clay’ — then plot it. Orbit if you need the labels; the skill is the point, not the camera. Finish when the class can refuse ‘brown soil’ as a texture answer.",
			"Without the canvas the triangle is still a ternary plot. Sand, silt and clay sum to 100 percent. Clay is the finest of the three; sand is the coarsest. Loam is a mixed class near the middle, not a brand of bag. Somerset Levels often sit toward clay and peat; Dust Bowl silt was fine enough to fly. Texture is particle size, not colour and not pottery. A 90 percent sand sample is a sandy class. Plot a sentence, then name the region. That is the whole check."
		],
		glossary: [
			{
				term: "Texture",
				def: "The sand, silt and clay proportions of the mineral soil."
			},
			{
				term: "Sand",
				def: "Coarsest of the three mineral sizes. Gritty. Drains fast."
			},
			{
				term: "Silt",
				def: "Medium size. Feels floury. Easily carried by wind and water."
			},
			{
				term: "Clay",
				def: "Finest mineral size. Sticky when wet. Holds water and nutrients."
			},
			{
				term: "Loam",
				def: "A mixed class near the middle of the USDA triangle, not a brand."
			},
			{
				term: "USDA texture triangle",
				def: "Ternary chart that names a class from sand, silt and clay percentages."
			},
			{
				term: "Ternary plot",
				def: "Three components that must sum to 100 percent. Silt is the remainder here."
			}
		],
		misconception: {
			claim: "Clay means pottery only.",
			truth: "It is a particle size."
		},
		misconceptions: [
			{
				claim: "Clay means pottery only.",
				truth: "It is a particle size."
			},
			{
				claim: "Loam is a brand of bag.",
				truth: "Loam is a place near the middle of the triangle."
			},
			{
				claim: "Brown soil is a texture class.",
				truth: "Colour is iron and organic matter. Texture is sand, silt, clay."
			}
		],
		cases: [{
			slug: "somerset-levels",
			label: "Clay / peat levels"
		}, {
			slug: "dust-bowl",
			label: "Silt on the wind"
		}],
		teacher: {
			script: "Show the USDA triangle, not a 3D cone.\nMove sand, then clay. Silt is the remainder. The point walks. Read the class name out loud.\nLoam is a place near the middle, not a brand of bag.\nClay is a particle size, not a kiln. That is the misconception.\nPush sand toward 90 percent. Name a sandy class. Push clay up. Name clay.\nAsk for a field sample in words: ‘more sand than clay’ — then plot it.\nSomerset Levels sit toward fine. Dust Bowl silt sat on the wind.\nColour is not texture. Brown is not a class.\nFinish in Check.",
			pitfalls: [
				"RGB colour as texture.",
				"Loam as a shop brand.",
				"Forgetting silt must make the three sum to 100.",
				"Peat treated as a mineral corner."
			]
		},
		sources: [{ label: "USDA texture triangle" }],
		controls: {
			time: "none",
			extra: [{
				key: "sand",
				label: "Sand %",
				min: 0,
				max: 100,
				step: 1,
				default: 40
			}, {
				key: "clay",
				label: "Clay %",
				min: 0,
				max: 100,
				step: 1,
				default: 20
			}]
		}
	}),
	lab({
		slug: "weathering",
		title: "Weathering",
		hook: "Mechanical, chemical, biological — three blocks, side by side, not a ranking of virtue.",
		objective: "Compare frost, carbonation, and roots on three rocks.",
		realm: "soils",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: [
			"KS3",
			"GCSE",
			"NGSS MS-ESS2-1"
		],
		steps: steps("Three blocks.", "Frost wedges. Carbonation pits. Roots.", "Climate chooses the mix."),
		questions: [
			q("Frost shattering is…", [
				"Chemical",
				"Mechanical",
				"A tide",
				"A front"
			], 1, "Water freezes, expands."),
			q("Carbonation attacks…", [
				"Granite first always",
				"Carbonate rocks with weak carbonic acid",
				"Gold",
				"Ice only"
			], 1, "Karst cousin."),
			q("Biological weathering includes…", [
				"Only lions",
				"Roots, lichens, burrowers",
				"Tsunamis",
				"Time zones"
			], 1, "Living agents."),
			q("Weathering versus erosion…", [
				"The same word",
				"Weathering breaks in place; erosion moves the bits",
				"Erosion only happens at sea",
				"Weathering is a forecast"
			], 1, "Break versus transport.")
		],
		why: [
			"Weathering is rock breakdown in place. It is not the Met Office forecast and it is not erosion. UK limestone country makes the chemical case: Yorkshire Dales pavements, grykes and swallow holes are carbonation along joints, rainwater plus carbon dioxide as a weak acid. The US pair in this lab is the Grand Canyon stack: joints, unloading, and freeze on the rim open the walls; the river then exports what falls. Jurassic Coast cliffs add salt, spray and lithology changes along the shore. Somerset Levels sit on already-weathered fines. Dust Bowl silt was a weathered particle that wind later moved — weathering first, transport second. GCSE and NGSS both want three agents named without a league table: mechanical, chemical, biological. Climate chooses the mix. Frost-heavy uplands favour ice in cracks. Warm wet carbonate country favours carbonation. Roots and lichens work wherever they can sit. Three blocks, side by side, not a ranking of virtue.",
			"Mechanical weathering breaks rock without changing the minerals. Frost shattering is the school example: water in a joint freezes, expands, and wedges the block. Unloading and thermal stress do similar work on canyon rims and granite sheets. Chemical weathering changes the minerals. Carbonation is the carbonate special: carbonic acid from rain and soil air attacks calcite, widening joints into grykes and feeding caves. Hydrolysis and oxidation work on silicates and iron; they matter, but this lab’s chemical block is the karst cousin you can see. Biological weathering is living agents: roots pry joints, lichens etch, burrowers mix. It is not a separate physics; it is mechanical and chemical work done by organisms. The three overlap. A root in a Dales gryke is biological and mechanical on a chemically opened crack. Weathering produces sediment and soil parent material; erosion carries it. Mix those verbs and the Grand Canyon becomes a riddle: the walls weather and fail, the river removes. Climate sets rates, not moral rank. Cold wet, warm wet, and rooted surfaces write different mixes of the same three blocks on any one hillside.",
			"Play. Three blocks advance together. Left: frost wedges a granite cube as ice thickens in the crack. Middle: carbonation pits a carbonate face — the karst cousin. Right: a root thickens in a joint. Orbit so each agent is named. They are not a ranking. Pause and ask which block would dominate in the Dales (chemical on limestone) and which on a freezing canyon rim (mechanical). Do not skip the labels Physical, Chemical, Biological. The readout says three mechanisms side by side. That is the lesson. Then sit down.",
			"Without the canvas the three agents still stand. Mechanical: frost shattering, water freezes and expands in a crack. Chemical: carbonation, weak carbonic acid on carbonate rock — Yorkshire Dales karst. Biological: roots, lichens, burrowers. Weathering is rock breakdown, not the weather forecast. Weathering breaks in place; erosion moves the bits. Climate chooses the mix; there is no league table. Grand Canyon joints and Dales grykes are the locators. Name break versus transport before you leave the page. Play is optional; the three agents are not."
		],
		glossary: [
			{
				term: "Mechanical weathering",
				exam: "Physical weathering",
				def: "Break without composition change. Frost, unloading, thermal stress."
			},
			{
				term: "Chemical weathering",
				def: "Change the minerals. Carbonation, hydrolysis, oxidation."
			},
			{
				term: "Biological weathering",
				def: "Living agents: roots, lichens, burrowers. Mechanical and chemical work by organisms."
			},
			{
				term: "Frost shattering",
				exam: "Freeze–thaw",
				def: "Water in a joint freezes, expands, and wedges the rock."
			},
			{
				term: "Carbonation",
				def: "Weak carbonic acid attacking carbonate rock. Karst’s chemistry."
			},
			{
				term: "Weathering",
				def: "Rock breakdown in place. Not the atmosphere’s mood."
			},
			{
				term: "Erosion",
				def: "Movement of weathered material by water, wind, ice or gravity."
			}
		],
		misconception: {
			claim: "Weathering is weather.",
			truth: "Weathering is rock breakdown. Weather is the atmosphere’s mood."
		},
		misconceptions: [
			{
				claim: "Weathering is weather.",
				truth: "Weathering is rock breakdown. Weather is the atmosphere’s mood."
			},
			{
				claim: "Weathering and erosion are the same word.",
				truth: "Weathering breaks in place. Erosion moves the bits."
			},
			{
				claim: "Chemical weathering is ‘stronger’ than mechanical.",
				truth: "Climate chooses the mix. Not a ranking of virtue."
			}
		],
		cases: [{
			slug: "yorkshire-dales",
			label: "Carbonation"
		}, {
			slug: "grand-canyon",
			label: "Joints / canyon rim"
		}],
		teacher: {
			script: "Point at each of the three blocks: mechanical, chemical, biological.\nPlay. Frost wedges: water freezes, expands. Mechanical.\nCarbonation pits carbonate rock with weak carbonic acid. Chemical. Karst cousin. Dales.\nRoots, lichens, burrowers. Biological.\nClimate chooses the mix. Not a ranking of virtue.\nWeathering is not weather. Weathering is rock breakdown. Weather is the atmosphere’s mood.\nThat is the misconception.\nDo not mix erosion with weathering. Weathering breaks. Erosion moves. Grand Canyon walls weather; the river exports.\nFinish in Check.",
			pitfalls: [
				"Erosion vs weathering mix-up.",
				"Weathering as the forecast.",
				"Ranking the three agents as good, better, best.",
				"Carbonation taught on granite as the default."
			]
		},
		sources: [{ label: "BGS weathering" }, { label: "USGS" }],
		controls: { time: "none" }
	}),
	lab({
		slug: "soil-erosion",
		title: "Soil erosion",
		hook: "Rain splash, rill, wind. Vegetation on, the A horizon stays. Vegetation off, it leaves.",
		objective: "Toggle cover and watch splash, rill, and wind.",
		realm: "soils",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS",
			"APES"
		],
		curriculum: [
			"GCSE",
			"APES 4.3",
			"NGSS"
		],
		steps: steps("Bare soil. Splash. Rill. Wind.", "Vegetation on.", "Dust Bowl is this toggle in history."),
		questions: [
			q("Rain splash…", [
				"Builds mountains",
				"Detaches particles at the surface",
				"Is a tide",
				"Is a geyser"
			], 1, "First move."),
			q("A rill is…", [
				"A glacier",
				"A small channel cut by running water",
				"A front",
				"A planet"
			], 1, "Then gully."),
			q("Vegetation reduces erosion because…", [
				"It heats magma",
				"Cover and roots hold particles and slow water/wind",
				"It creates tsunamis",
				"It reverses plates"
			], 1, "The toggle."),
			q("Wind erosion of dry bare soil is…", [
				"A tsunami",
				"Deflation and transport of loose particles",
				"A lava flow",
				"A spring tide"
			], 1, "Dust Bowl headline. Water still cuts rills when it rains.")
		],
		why: [
			"An A horizon is a budget, not an infinite floor. Cover and roots hold it. Bare ground gives it away. The Dust Bowl on the southern Great Plains is the US scale of that sentence: prairie plough, drought, wind, and silt that left the county. UK pairs are smaller and wetter — peaty upland scars, Somerset Levels fields that lose fines when winter rain sits on bare maize, Jurassic Coast and Dales slopes that rill after a wet week. Same physics, different storm. GCSE and APES both want splash, rill and wind named before anyone reaches for a sermon. Raindrop impact detaches. Flow concentrates into rills, then gullies. Wind lifts dry loose grains: deflation. Vegetation raises roughness, intercepts drops, and ties particles with roots. Grand Canyon walls are rock weathering plus export; this lab is the soil skin. Process first. History second. The 1930s are this toggle in the archive, not a morality play without a mechanism.",
			"Detachment, then transport, then deposition somewhere else. Rain splash is the first detachment on bare soil: a drop hits, a particle jumps, a crust can form. Once water flows, shear in tiny threads cuts rills — small channels you can step across — which can deepen into gullies. Gradient, texture and storm intensity set the rate. Clay and silt travel in suspension; sand hops. Wind needs dry, loose, unsheltered grains; it is deflation and saltation, the Dust Bowl headline, not a desert-dune textbook by default. Vegetation works three ways: canopy intercepts splash, stems slow water and wind, roots bind. Take the cover off and the same storm writes channels on the plot. Keep it on and the A horizon stays. The lab exaggerates rill depth so the class can see them; real rills are often centimetres. That caption is on the studio. Texture from the triangle lab matters here: silt is easy to lift; a Somerset clay may slake and crust; a sandy A can both drain and blow. Land use is a roughness choice. The physics does not moralise. It just moves particles when nothing holds them.",
			"Two plots sit side by side. Left is bare: play the storm and watch splash drops, then rills cut the surface, then a wind arrow. Right is cover: cones of vegetation, the A horizon intact. Play through a storm cycle. Orbit from the bare rills to the vegetated plot. Read the studio line: storm fraction, bare rills, vegetated plot stays. Name splash, rill, deflation out loud before you sit down. If Vegetation is on the bar, leave the comparison as two plots; the mechanism is cover versus none. Dust Bowl is the history after the process.",
			"Without the canvas the toggle is still the lesson. Bare soil: rain splash detaches, rills cut, wind can lift dry fines. Vegetation on: cover and roots hold the A horizon and slow water and wind. A rill is a small erosional channel; a gully is the next size. Deflation is wind removing loose particles. Soil is not infinite. Dust Bowl spent a prairie A horizon. Somerset Levels and UK uplands are the same idea at smaller, wetter scale. Process first. Then the history. Name splash, rill, wind. Then sit down."
		],
		glossary: [
			{
				term: "Rain splash",
				def: "Drop impact that detaches particles at the soil surface."
			},
			{
				term: "Rill",
				def: "Small erosional channel cut by running water. Can grow into a gully."
			},
			{
				term: "Gully",
				def: "Larger than a rill; a channel you cannot remove with ordinary tillage."
			},
			{
				term: "Deflation",
				def: "Wind removing loose particles from a surface."
			},
			{
				term: "A horizon",
				def: "Upper mixed mineral-organic soil. The budget this lab spends."
			},
			{
				term: "Cover",
				def: "Vegetation or residue that intercepts splash and raises roughness."
			},
			{
				term: "Saltation",
				def: "Grains hopping in wind or water. Sand’s usual travel mode."
			}
		],
		misconception: {
			claim: "Soil is infinite.",
			truth: "A horizon is a budget. Dust Bowl spent it."
		},
		misconceptions: [
			{
				claim: "Soil is infinite.",
				truth: "A horizon is a budget. Dust Bowl spent it."
			},
			{
				claim: "Only wind erodes soil.",
				truth: "Splash and rill are water. Wind is the dry extra. Name all three."
			},
			{
				claim: "Vegetation is decoration.",
				truth: "Cover and roots are the hold. Bare is the experiment."
			}
		],
		cases: [{
			slug: "dust-bowl",
			label: "Dust Bowl"
		}, {
			slug: "somerset-levels",
			label: "Wet lowland contrast"
		}],
		teacher: {
			script: "Two plots. Bare on the left, cover on the right.\nPlay the storm. Splash detaches, then rills cut, then wind on the bare plot.\nRain splash is the first move. A rill is a small channel. Then gully.\nThe vegetated plot holds. Cover and roots slow water and wind.\nSoil is not infinite. An A horizon is a budget. Dust Bowl spent it.\nThat is the misconception.\nDust Bowl is this toggle in history. Peaty UK uplands and Somerset bare fields are the same idea at smaller scale.\nProcess first, then the history. Do not moralise without the mechanism.\nName splash, rill, deflation before you sit down.\nFinish in Check.",
			pitfalls: [
				"Moralising without process.",
				"Wind-only story on a wet UK field.",
				"Calling every channel a canyon.",
				"Inventing Dust Bowl tonnages."
			]
		},
		sources: [{ label: "USDA NRCS" }, { label: "NOAA Dust Bowl" }],
		controls: {
			time: "none",
			toggles: [{
				key: "veg",
				label: "Vegetation",
				defaultOn: true
			}]
		}
	})
];
var WATER_LABS = [
	lab({
		slug: "drainage-basin",
		title: "Drainage basin",
		hook: "Click the divide. Source, tributary, confluence, mouth — one budget with a rim.",
		objective: "Trace a watershed and name source, tributary, confluence, and mouth as stations on one basin, not four separate rivers.",
		realm: "water",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS"
		],
		curriculum: [
			"KS3",
			"GCSE rivers",
			"NGSS MS-ESS2-4"
		],
		steps: steps("Toggle the basin overlay. The rim is the watershed — the drainage divide. Trace it before any names.", "Name the stations: source, tributary, confluence, mouth. Hide labels and point again.", "Rain on one side of the rim is this river; the other side is someone else’s. The basin is the hillside, not just the channel."),
		questions: [
			q("A watershed is…", [
				"The mouth",
				"The drainage divide",
				"The ocean",
				"A tide"
			], 1, "The rim. Not a garden shed."),
			q("A confluence is…", [
				"A waterfall",
				"Where tributaries meet",
				"A spit",
				"A front"
			], 1, "Join. Two channels, one thereafter."),
			q("The mouth is…", [
				"The source",
				"Where the river meets sea, lake, or a larger river",
				"Always a delta",
				"A cirque"
			], 1, "Exit. Tides and load decide whether a delta sits there."),
			q("The drainage basin includes…", [
				"Only the blue channel on the map",
				"The whole hillside that drains to this river, bounded by the divide",
				"The ocean store",
				"A water company office"
			], 1, "Channel plus slopes, soils and floodplain. The rim is the budget edge.")
		],
		why: [
			"The Thames and the Mississippi are the same diagram at different size. A GCSE class that can name source, tributary, confluence and mouth on a Thames tributary tree can read the Mississippi without a new theory. The Severn and the Thames share a divide: rain on one side is this river, rain on the other is someone else’s. Colorado’s basin is the same rim at a drier number — dams and abstraction sit inside a watershed, they do not redraw it. Flood warnings, water-company licences, and a school fieldwork sheet all start with one question: which hillside drains here? The basin is the collecting surface, not the blue line on the OS sheet. US counties and UK Environment Agency catchments are administrative names laid on this physical machine. Holderness is a different coast; this lab is the inland bowl that feeds a river to a mouth.",
			"A drainage basin is the area of land drained by a river and its tributaries, bounded by a watershed — the drainage divide. Precipitation that falls inside the rim becomes this river’s budget; the other side belongs to a neighbour. Source is where channelised flow begins, often a spring or a gathering of rills. A tributary is a joining stream. A confluence is where they meet. The mouth is where the river exits to sea, lake, or a larger river, and it is not always a delta. The channel is only the drain. Hillsides, soils, floodplain and channel together are the basin. Overlay on: the rim lights as a line you can trace. Overlay off: you still have to point at it on the hill. Vertical exaggeration is labelled ×8 so the bowl reads from the back of the room; a real Thames divide can be a low ridge or a field boundary, not a crater rim. Size is not type. Stations stay the same from a Lake District beck to the Mississippi. Rain on one side of the rim is this river. Rain on the other is someone else’s. Do not confuse the watershed with a building. Do not teach the blue OS line as the whole catchment.",
			"Toggle Basin overlay on. Trace the rim before any station names. Hide labels with L and ask the class to point: source, tributary, confluence, mouth. Toggle the overlay off and make them find the divide on the hill alone. Orbit the bowl; it is a 3D catchment, not a 2D paint fill. Step the camera from source hill to mouth so each station fills the frame. The green rim is the overlay, not a painted county. Keyboard: L labels, R reset. No year slider — this is a static machine. Finish in Check.",
			"Without the 3D view: a rim, a source, tributaries joining at a confluence, a mouth. Rain inside the rim is this river; rain outside is another. The basin is the hillside that drains here, not just the channel. Thames and Mississippi are the same stations at different kilometres. A watershed is a divide, not a garden shed. Vertical exaggeration is a teaching lie; the real divide can be a hedge. Overlay on or off, the divide is still the budget edge. Dams on the Colorado sit inside the rim. Mouth is the exit — estuary or delta as the coast allows."
		],
		glossary: [
			{
				term: "Watershed",
				exam: "Drainage divide",
				def: "The rim of a drainage basin. Rain inside is this river; rain outside is another."
			},
			{
				term: "Drainage basin",
				exam: "Catchment",
				def: "The area of land drained by a river and its tributaries, bounded by the watershed."
			},
			{
				term: "Source",
				def: "Where channelised flow begins — a spring, a gathering of rills, or a lake outlet."
			},
			{
				term: "Tributary",
				def: "A stream that joins a larger channel."
			},
			{
				term: "Confluence",
				def: "The meeting of two streams."
			},
			{
				term: "Mouth",
				def: "Where the river exits to sea, lake, or a larger river. Not always a delta."
			},
			{
				term: "Interfluve",
				def: "The higher ground between neighbouring channels, inside the basin."
			}
		],
		misconception: {
			claim: "The basin is just the channel.",
			truth: "It is the whole hillside that drains here."
		},
		misconceptions: [
			{
				claim: "The basin is just the channel.",
				truth: "It is the whole hillside that drains here."
			},
			{
				claim: "A watershed is a building that stores water.",
				truth: "Watershed means drainage divide — the rim. Say the word as a divide."
			},
			{
				claim: "The mouth is always a delta.",
				truth: "The mouth is the exit. Tides and waves can steal the load; many UK rivers end in estuaries."
			}
		],
		cases: [{
			slug: "thames",
			label: "Thames / Severn"
		}, {
			slug: "mississippi",
			label: "Mississippi"
		}],
		teacher: {
			script: "Toggle Basin overlay on. Trace the rim. That rim is the watershed, the drainage divide.\nIt is not a garden shed. Say the word as a divide.\nHide the labels. Name source, tributary, confluence, mouth.\nThe basin is not just the channel. It is the whole hillside that drains here.\nRain on one side is this river. The other side is someone else’s.\nA confluence is where tributaries meet. The mouth is the exit, not always a delta.\nThames and Mississippi are the same diagram at different size. Colorado is the same rim, drier numbers.\nHide the overlay once and ask the class to point at the divide. Then put it back.\nOrbit so the bowl reads as a catchment, not a paint fill. Exaggeration is ×8; say so.\nFinish in Check.",
			pitfalls: [
				"Confusing watershed with water-shed as in shed building.",
				"Teaching the basin as only the blue channel on the map.",
				"Calling every mouth a delta."
			]
		},
		sources: [{ label: "UKCEH" }, { label: "USGS" }],
		controls: {
			time: "none",
			toggles: [{
				key: "overlay",
				label: "Basin overlay",
				defaultOn: true
			}]
		}
	}),
	lab({
		slug: "hydrograph",
		title: "Storm hydrograph",
		hook: "Rain is the input. The river’s reply has a rising limb, a peak, a lag, a falling limb.",
		objective: "Read rising limb, peak, lag and falling limb, and toggle urban versus rural to change the shape.",
		realm: "water",
		ages: [
			"GCSE",
			"A-level",
			"NGSS MS",
			"APES"
		],
		curriculum: [
			"GCSE",
			"A-level hydrology",
			"APES"
		],
		steps: steps("Play the storm. Rain falls, then the river replies: rising limb, peak, lag, falling limb.", "Raise Urban cover. The hydrograph gets flashier: shorter lag, higher peak. Drop it toward rural: fatter, later.", "Lag is rain peak to discharge peak. The hill has to drain. Stage is height; discharge is volume per time."),
		questions: [
			q("Lag time is…", [
				"Peak rainfall to peak discharge",
				"Sunrise",
				"Tide",
				"A year"
			], 0, "Hours after rain. The hill has to drain."),
			q("Urban land use typically…", [
				"Lengthens lag",
				"Shortens lag and raises peak",
				"Stops rain",
				"Creates glaciers"
			], 1, "Impermeable surfaces. Water cannot wait in the soil."),
			q("A falling limb is…", [
				"The start of rain",
				"Discharge declining after the peak",
				"A cliff",
				"Wind"
			], 1, "Somerset can sit here for weeks."),
			q("Stage and discharge are…", [
				"The same number with two names",
				"Height of the water surface versus volume of water per time — do not mix them",
				"Rain and snow",
				"Lag and peak"
			], 1, "A high stage in a narrow channel is not the same discharge as that height in a wide one.")
		],
		why: [
			"Somerset Levels can sit on a falling limb for weeks after the rain has stopped. A paved UK high street and a US urban drain flash in hours. Same storm-hydrograph machine, different numbers. Lag time is why a village floods after the radar looks quiet, and why a city gully roars while the cloud is still overhead. Land use is a control, not a personality: impermeable roofs shorten lag and raise the peak; vegetated soil lengthens lag and fattens the falling limb. Environment Agency flood warnings and USGS stream gauges both plot this graph. The Levels are peat, clay and tide-lock; Katrina-Sandy urban flooding is a different surface on the same axes. Do not mix the two as one story. The graph is the reply of a catchment to a pulse of rain.",
			"A storm hydrograph plots discharge against time after rainfall. Rain is the input. The river’s reply has four named parts: a rising limb as the catchment starts to contribute, a peak, a lag from rainfall peak to discharge peak, and a falling limb as the hill empties. The river does not peak when the rain peaks. The hillside, soil and channel have to drain. Urban cover raises the fraction of impermeable surface: water cannot wait in the soil, so lag shortens and the peak rises — a flashier graph. Rural cover does the opposite: fatter, later. Baseflow is the slow groundwater contribution under the storm pulse. Stage is height of the water surface; discharge is volume per time. Do not mix them. A high stage in a narrow urban drain is not the same discharge as that height on the Parrett. Somerset’s almost-flat long profile and saturated peat stretch the falling limb. A flashy urban drain does not. Throughflow and overland flow are the hill’s pipes; impermeable cover skips the slow ones. This lab holds storm size still so land use is the knob you turn. This lab is hours, not the year — that is the regime lab.",
			"Play the storm (space). Watch rain fall, then the river’s reply on the graph: rising limb, peak, lag, falling limb. Raise Urban cover toward 1 and run it again: shorter lag, higher peak, roofs instead of trees. Drop Urban cover toward rural and compare. Freeze on the peak and read the lag tag in hours. There is no labelled time slider — space still plays the pulse, arrows still scrub it. Name the four parts out loud before you leave the graph. Keyboard: space play, arrows scrub the storm, L labels, R reset. Urban cover lives in the bar. Finish in Check.",
			"Without the 3D view: rain is the input; the river replies after a lag. Rising limb, peak, falling limb. Urban surfaces shorten lag and raise the peak. Rural catchments are fatter and later. Stage is height; discharge is volume per time. Somerset can sit on a falling limb for weeks. A hydrograph is hours. A regime graph is the year. Impermeable roofs skip the soil store. Baseflow sits under the pulse. The hill is teaching terrain, not a traced Parrett."
		],
		glossary: [
			{
				term: "Hydrograph",
				def: "Discharge plotted against time after rain. A storm hydrograph is hours; a regime graph is the year."
			},
			{
				term: "Lag time",
				def: "Time from peak rainfall to peak discharge. The hill has to drain."
			},
			{
				term: "Rising limb",
				def: "The increase in discharge as the catchment starts to contribute."
			},
			{
				term: "Peak discharge",
				def: "The highest discharge in the storm reply."
			},
			{
				term: "Falling limb",
				def: "Discharge declining after the peak as the catchment empties."
			},
			{
				term: "Baseflow",
				def: "Slow groundwater contribution under the storm pulse."
			},
			{
				term: "Stage",
				def: "Height of the water surface. Not the same as discharge."
			},
			{
				term: "Discharge",
				exam: "Q",
				def: "Volume of water per time passing a point. Cubic metres per second in school units."
			}
		],
		misconception: {
			claim: "The river peaks when the rain peaks.",
			truth: "Lag. The hill has to drain."
		},
		misconceptions: [
			{
				claim: "The river peaks when the rain peaks.",
				truth: "Lag. The hill has to drain."
			},
			{
				claim: "Stage and discharge are the same thing.",
				truth: "Stage is height. Discharge is volume per time. A narrow drain and a wide floodplain disagree."
			},
			{
				claim: "Urban land use stops flooding by putting water in pipes.",
				truth: "Pipes and roofs shorten lag and raise the peak. The water still has to go somewhere."
			}
		],
		cases: [{
			slug: "somerset-levels",
			label: "Somerset Levels"
		}, {
			slug: "katrina-sandy",
			label: "Urban flood contrast"
		}],
		teacher: {
			script: "Watch the storm input. Then the river’s reply: rising limb, peak, lag, falling limb.\nLag time is rain peak to discharge peak. The hill has to drain.\nThe river does not peak when the rain peaks. That is the misconception.\nRaise Urban cover. The hydrograph gets flashier: shorter lag, higher peak.\nImpermeable surfaces. Water cannot wait in the soil.\nDrop Urban cover toward rural. Fatter, later.\nDo not mix stage and discharge. Stage is height. Discharge is volume per time.\nSomerset Levels can sit on a falling limb for weeks. A flashy urban drain does not.\nName rising, peak, lag, falling out loud before you leave the graph.\nFinish in Check.",
			pitfalls: [
				"Mixing stage and discharge.",
				"Teaching the river as peaking with the rain.",
				"Calling every flood a flash flood — Somerset’s falling limb can last weeks."
			]
		},
		sources: [{ label: "UKCEH" }, { label: "USGS NWIS" }],
		controls: {
			time: "none",
			extra: [{
				key: "urban",
				label: "Urban cover",
				min: 0,
				max: 1,
				step: .05,
				default: .2
			}, {
				key: "rain",
				label: "Rain",
				min: .2,
				max: 1.6,
				step: .05,
				default: 1
			}]
		}
	}),
	lab({
		slug: "river-hydrology",
		title: "River regime",
		hook: "A UK upland nival/pluvial mix vs the Mississippi: the same year, different graphs.",
		objective: "Compare two annual regimes and say what rain, snowmelt and dams do to the year’s personality.",
		realm: "water",
		ages: [
			"A-level",
			"GCSE",
			"APES"
		],
		curriculum: ["A-level", "GCSE"],
		steps: steps("Play the year. Two traces: a UK upland and the Mississippi. Name the bump.", "UK upland: rain plus a snowmelt bump, nival and pluvial mixed. Mississippi: a broader continental year, managed by dams.", "Regime is the year’s personality, not one storm. Hydrograph is hours; this is the year."),
		questions: [
			q("A nival regime is driven by…", [
				"Tides",
				"Snowmelt",
				"Hurricanes only",
				"Albedo in space"
			], 1, "Spring peak. UK highland snow, Colorado snowpack, Alpine melt."),
			q("A pluvial regime follows…", [
				"Rainfall seasonality",
				"Only earthquakes",
				"The Moon’s nodes",
				"Hotspots"
			], 0, "UK west is often pluvial. The Mississippi year is a broader continental mix."),
			q("The Mississippi’s year is…", [
				"A Lake District beck",
				"A continental drain with snowmelt and rain, managed by dams",
				"A karst spring only",
				"A geyser"
			], 1, "Do not invent numbers."),
			q("A storm hydrograph and a regime graph differ because…", [
				"They are the same plot",
				"One is hours after a rain pulse; the other is the typical year",
				"One is wind",
				"One is a tide gauge"
			], 1, "Do not paste a storm limb onto a monthly axis and call it a regime.")
		],
		why: [
			"A Lake District beck and the Mississippi are the same year on different graphs. UK upland catchments often mix winter rain with a spring snowmelt bump; the west coast is frequently pluvial. The Mississippi is a continental drain with snowmelt, rain and a dam-managed year — do not invent cubic metres. Colorado’s snowpack is a nival store that becomes spring discharge; dams then flatten what the mountain wrote. Regime is why a reservoir rule-curve and a UK abstraction licence care about the month, not the Thursday storm. Hydrograph is hours. This lab is the year. All rivers do not peak in summer. Alps, Rockies and a Cumbrian winter disagree with a tropical wet season, and that is the point of two traces on one axis.",
			"Regime is the typical annual variation of discharge — the year’s personality, not one storm. A nival regime is snowmelt-dominated: a spring peak as the pack goes. A pluvial regime follows rainfall seasonality: UK western winters often sit here. Many UK upland rivers are a mix: rain in the wings, a snowmelt bump in spring. The Mississippi trace in this lab is a broader continental year, rain-fed with a snowmelt contribution and flattened in the real world by dams. Play the year and watch two ribbons: UK highland nival-green, Mississippi pluvial-blue. A marker walks the month. A snow sphere lights on the UK trace in spring. All rivers do not peak in summer. It depends on rain, snow, ice and management. A glacier-fed river can peak later still. Colorado’s pack is the same nival idea at drier numbers; dams then rewrite the month. Do not paste a storm hydrograph onto a monthly axis. Hours and months are different machines. One graph is not all climates. The traces are school shapes, not NRFA or USGS station numbers — do not invent a peak flow and write it in an exam.",
			"Play the year. Two traces: nival UK highland and Mississippi pluvial. Pause on the UK spring bump and name it snowmelt. Scrub the Year slider month by month and ask which trace would change if you turned snow off in the story. Hide labels (L) and make the class assign nival versus pluvial. Watch the marker walk J to D; a snow sphere lights on the UK ribbon in spring. Keyboard: space play, arrows scrub the year, L labels, R reset. Speed 1× / 2× / 4× is in the bar. Finish in Check.",
			"Without the 3D view: two annual traces. UK upland: rain plus a snowmelt bump. Mississippi: a broader continental year, managed by dams in the real river. Nival is snowmelt. Pluvial follows rain. Regime is the year; a storm hydrograph is hours. All rivers do not peak in summer. Colorado’s snowpack is a nival store that dams can flatten. The ribbons are school shapes, not station numbers. Do not invent cubic metres. One graph is not all climates. Say so plainly."
		],
		glossary: [
			{
				term: "Regime",
				def: "Typical annual variation of discharge. The year’s personality, not one storm."
			},
			{
				term: "Nival",
				def: "Snowmelt-dominated regime. Spring peak as the pack goes."
			},
			{
				term: "Pluvial",
				def: "Rainfall-seasonality regime. UK west is often pluvial."
			},
			{
				term: "Snowmelt",
				def: "Stored winter snow becoming spring discharge. A nival bump."
			},
			{
				term: "Discharge",
				exam: "Q",
				def: "Volume per time. Regime plots it by month, not by hour."
			},
			{
				term: "Baseflow",
				def: "The slow groundwater contribution that sits under the year’s wiggles."
			},
			{
				term: "Dam regulation",
				def: "Storage that flattens or shifts the natural year. Mississippi and Colorado both live with it."
			}
		],
		misconception: {
			claim: "All rivers peak in summer.",
			truth: "Depends on rain, snow, dams, ice."
		},
		misconceptions: [
			{
				claim: "All rivers peak in summer.",
				truth: "Depends on rain, snow, dams, ice."
			},
			{
				claim: "A storm hydrograph and a regime graph are the same plot.",
				truth: "Hours versus the year. Do not paste a rising limb onto a monthly axis."
			},
			{
				claim: "One graph will do for all climates.",
				truth: "UK upland mix, Mississippi continental year, Colorado snowpack: different machines, same idea."
			}
		],
		cases: [{
			slug: "lake-district",
			label: "UK upland"
		}, {
			slug: "mississippi",
			label: "Mississippi"
		}],
		teacher: {
			script: "Play the year. Two traces: a UK upland and the Mississippi.\nName the bump. UK upland: rain plus a snowmelt bump, nival and pluvial mixed.\nA nival regime is snowmelt. A pluvial regime follows rainfall seasonality.\nThe Mississippi is a continental drain with snowmelt and rain, managed by dams. Do not invent numbers.\nRegime is the year’s personality, not one storm. Hydrograph is hours; this is the year.\nAll rivers do not peak in summer. That is the misconception.\nIt depends on rain, snow, dams, ice. Colorado’s pack is a nival store; dams then flatten.\nOne graph is not all climates. Say so.\nAsk which trace would change if you turned snow off in the story.\nFinish in Check.",
			pitfalls: [
				"One graph for all climates.",
				"Pasting a storm hydrograph onto a monthly axis.",
				"Inventing peak-flow numbers the traces do not give."
			]
		},
		sources: [{ label: "NRFA" }, { label: "USGS" }],
		controls: { time: "year" }
	}),
	lab({
		slug: "ocean-currents",
		title: "Ocean currents",
		hook: "Gyres are the loops. The Gulf Stream is a warm ribbon the UK notices in the air, not as a miracle heater of every garden.",
		objective: "See surface gyres and a Gulf Stream ribbon, and keep UK winter language honest: one term in a budget, not a magic radiator.",
		realm: "water",
		ages: [
			"GCSE",
			"A-level",
			"NGSS MS",
			"APES"
		],
		curriculum: [
			"GCSE",
			"A-level",
			"APES 4.5"
		],
		steps: steps("Orbit the globe. Five gyres are the loops. Subtropical highs help.", "Point at the Gulf Stream ribbon: a warm western-boundary current of the North Atlantic.", "UK mild winters are a mix of latitude, westerlies, and ocean heat. Do not overclaim. Florida and Holderness sit on the same ocean, different coasts."),
		questions: [
			q("A gyre is…", [
				"A waterfall",
				"A large looping surface current system",
				"A fault",
				"A dune"
			], 1, "Subtropical highs help. Five big subtropical loops on a school globe."),
			q("The Gulf Stream is…", [
				"A cold coastal current off Peru",
				"A warm western-boundary current of the North Atlantic",
				"A river in Ohio",
				"Wind only"
			], 1, "Ribbon. Narrow, fast, warm on the western side of the gyre."),
			q("UK mild winters are…", [
				"100% Gulf Stream and nothing else",
				"A mix of latitude, westerlies, and ocean heat — do not overclaim",
				"Caused by deserts",
				"Caused by Yellowstone"
			], 1, "Honest language. One term in a budget."),
			q("A western-boundary current is typically…", [
				"Broad, slow and cold",
				"Narrow, fast and warm on the western side of a subtropical gyre",
				"A river mouth",
				"A tide"
			], 1, "Gulf Stream, Kuroshio. The eastern side of the same gyre is broader and cooler — Canary in the North Atlantic.")
		],
		why: [
			"Florida and Holderness sit on the same ocean, different coasts. Miami feels a warm western-boundary ribbon; a Holderness till cliff feels North Sea weather on the other side of the gyre. UK mild winters are a mix of latitude, westerlies and ocean heat — the Gulf Stream helps, it does not magically heat every British garden. A GCSE class that treats the ribbon as a radiator will misread both a January frost in Leeds and a hurricane season off Florida. Surface gyres move heat, salt and floating debris; they are not a personality of the sea. News maps that colour the Atlantic red and call it a heater skip the rest of the budget: the westerlies, the latitude, the heat already in the basin. Honest language is the skill. Same ocean, different coast, one physical machine.",
			"A gyre is a large looping surface current system. Five subtropical gyres sit under subtropical highs on a school globe: North Atlantic, South Atlantic, North Pacific, South Pacific, Indian. Wind stress and the Earth’s rotation pile water; western-boundary currents then run narrow, fast and warm — Gulf Stream, Kuroshio. Eastern-boundary currents on the same loop are broader and cooler — Canary in the North Atlantic. The Gulf Stream is a warm western-boundary current of the North Atlantic, drawn here as a ribbon from the Florida Strait toward north-west Europe. Colour in this lab is a temperature story, not a paint chart. UK mild winters are latitude, westerlies and ocean heat together. The ribbon is one term in that budget, not the reason Britain has weather at all. It is not a miracle heater of every garden. Florida and Holderness share the basin and disagree at the beach. This is a surface schematic, not a GCM, not the deep conveyor — that is the thermohaline lab. Particles on the ribbon are tracers, not a census of every eddy. The globe is true-ish shape; current tubes are fat so they read from the back row.",
			"Orbit the globe. Name the North Atlantic loop before the ribbon. Point at the Gulf Stream, then the UK, then Florida, then Holderness. Hide labels (L) and ask which coast sits on the warm western boundary. Step the camera if the set has wandered. Particles on the ribbon are tracers so the loop reads; they are not a forecast. Keyboard: L labels, R reset. No year slider — gyres are the standing machine. Honest language, then sit down. Finish in Check.",
			"Without the 3D view: five gyres as loops; the Gulf Stream as a warm western-boundary ribbon. UK mild winters are latitude, westerlies and ocean heat. The ribbon helps; it is not a magic radiator. Florida and Holderness sit on the same ocean, different coasts. Western-boundary currents are narrow and fast; eastern-boundary currents are broader and cooler. This is a surface schematic, not the deep conveyor and not a climate model. Colour is a temperature story. The tubes are fat on purpose so the set reads."
		],
		glossary: [
			{
				term: "Gyre",
				def: "A basin-scale looping surface current system. Five subtropical gyres on a school globe."
			},
			{
				term: "Western boundary current",
				def: "Narrow, fast, warm current on the western side of a subtropical gyre — Gulf Stream, Kuroshio."
			},
			{
				term: "Eastern boundary current",
				def: "Broader, cooler return on the eastern side of the same gyre — Canary in the North Atlantic."
			},
			{
				term: "Gulf Stream",
				def: "Warm western-boundary current of the North Atlantic. A ribbon, not a miracle heater."
			},
			{
				term: "Canary Current",
				def: "Cooler eastern-boundary current of the North Atlantic gyre."
			},
			{
				term: "Subtropical high",
				def: "The high-pressure cell that helps organise a subtropical gyre."
			},
			{
				term: "Surface current",
				def: "Wind-driven flow in the upper ocean. Not the deep density conveyor."
			}
		],
		misconception: {
			claim: "The Gulf Stream is why Britain has weather at all.",
			truth: "It is one term in a budget."
		},
		misconceptions: [
			{
				claim: "The Gulf Stream is why Britain has weather at all.",
				truth: "It is one term in a budget."
			},
			{
				claim: "The Gulf Stream is a magic radiator for every British garden.",
				truth: "Latitude, westerlies and ocean heat share the work. The ribbon helps; it does not run the seasons."
			},
			{
				claim: "All ocean currents are the deep conveyor.",
				truth: "These are surface gyres. The density-driven loop is a different lab."
			}
		],
		cases: [{
			slug: "holderness",
			label: "North Sea / UK"
		}, {
			slug: "florida-insolation",
			label: "Florida current"
		}],
		teacher: {
			script: "Orbit the globe. Five gyres are the loops.\nA gyre is a large looping surface current system. Subtropical highs help.\nPoint at the Gulf Stream ribbon: a warm western-boundary current of the North Atlantic.\nUK mild winters are a mix of latitude, westerlies, and ocean heat. Do not overclaim.\nThe Gulf Stream is not why Britain has weather at all. It is one term in a budget.\nThat is the misconception. Not a magic radiator.\nFlorida and Holderness sit on the same ocean, different coasts.\nThe ribbon matters. It is not the only reason we are not tundra.\nHonest language, then sit down.\nFinish in Check.",
			pitfalls: [
				"Gulf Stream as a magic radiator.",
				"Treating surface gyres as the deep conveyor.",
				"Overclaiming UK winter as 100% Gulf Stream."
			]
		},
		sources: [{ label: "NOAA ocean" }, { label: "Met Office" }],
		controls: { time: "none" }
	}),
	lab({
		slug: "thermohaline",
		title: "Thermohaline conveyor",
		hook: "Density is colour. Cold salty water sinks. The conveyor is slow and global.",
		objective: "Follow the school conveyor, read density as colour, and flag that this is a schematic — not a pipe you can visit, not a Tuesday switch.",
		realm: "water",
		ages: [
			"A-level",
			"APES",
			"HS Earth Sci"
		],
		curriculum: [
			"A-level",
			"APES",
			"NGSS HS-ESS2"
		],
		steps: steps("Read density as colour. Blue-dark: cold dense. Red-warm: light. Swatches sit on the floor.", "Play the loop: surface, NADW sink, deep return, Indo-Pacific upwell.", "School conveyor — not a pipe you can visit. Centuries, not a day. Headlines are not a lab."),
		questions: [
			q("Thermohaline means…", [
				"Wind only",
				"Temperature and salinity control density",
				"Tides only",
				"Ice albedo only"
			], 1, "Both. Heat and salt. Density decides who sinks."),
			q("Deep water forms in…", [
				"The equatorial shallows only",
				"Cold, often salty high-latitude seas",
				"The Sahara",
				"Lake District tarns"
			], 1, "North Atlantic / Southern Ocean story. Iceland sits near a famous sink region in the school map."),
			q("The conveyor is…", [
				"A 2-minute current",
				"A slow global density circulation — simplified here",
				"A river",
				"A hurricane"
			], 1, "Flag the simplification. Centuries, not a day."),
			q("Freshwater input at high latitude…", [
				"Always switches the conveyor off next Tuesday",
				"Can change density and therefore sinking; it is a caution, not a countdown",
				"Turns the Gulf Stream into a river",
				"Creates a gyre from nothing"
			], 1, "Mississippi-scale freshwater is a caution in the school story, not cinema.")
		],
		why: [
			"Iceland sits near a famous sink region in the school story of North Atlantic Deep Water. Cold, often salty water can become dense enough to dive; that dive is one engine of a slow global loop. A UK A-level class that treats the conveyor as a pipe under the Atlantic will misread both a Met Office ocean brief and a US east-coast headline. Mississippi-scale freshwater at high latitude is a density caution, not a countdown clock. Holderness waves and the Gulf Stream ribbon are surface machines; this lab is density in the deep. The timescale is centuries, not a day. Nuclear-test tracers and ocean arrays read this loop; a classroom globe cannot. The skill is to follow the school conveyor, name temperature and salinity as the density pair, and refuse cinema that switches it off next Tuesday.",
			"Thermohaline means temperature and salinity control density. Cold water is denser; salty water is denser; the combination can sink. Deep water forms in cold, often salty high-latitude seas — North Atlantic and Southern Ocean in the school map — not in equatorial shallows. Iceland sits near a famous North Atlantic sink region. Play the loop: warm, lighter water at the surface, a dive where it is cold-saline, a deep return, then upwelling in the Indo-Pacific story. Colour is density: darker cold-saline, warmer light. Swatches on the floor are the key: warm/light versus cold-saline. NADW is the school name for the North Atlantic dive. This is a school conveyor, not a pipe you can visit, not a single ribbon in the real ocean, not the AMOC in a research paper. Flag the simplification out loud. It can change. That is not the same sentence as cinema. Freshwater input — a big river, ice melt — can lower density and argue with sinking. Mississippi as a freshwater caution belongs here as a mechanism, not a prophecy. Gyres are wind-driven surface loops; this is the density machine underneath, slower by orders of magnitude. Centuries, not a day.",
			"Read the swatches first: warm/light versus cold-saline. Then play the loop. Point at the NADW sink, the deep return, the Indo-Pacific upwell. Hide labels (L) and ask which limb is sinking. Orbit so the globe and the schematic tubes both read. A dark sphere marks the North Atlantic dive near Iceland’s story. Keyboard: space play, L labels, R reset. Particles are tracers on a cartoon, centuries sped into a lesson. Flag the schematic out loud before you leave. Finish in Check.",
			"Without the 3D view: cold salty water sinks; warm light water stays up. Temperature and salinity set density. Deep water forms in high-latitude seas, not on the equator. Iceland sits near a famous sink in the school story. The conveyor is a slow global schematic — centuries, not a day, not a pipe, not a Tuesday switch. Freshwater can change density; that is a caution, not a countdown. Gyres are a different lab. Colour is density, not a travel poster."
		],
		glossary: [
			{
				term: "Thermohaline",
				def: "Density-driven ocean circulation from heat (thermo) and salt (haline)."
			},
			{
				term: "Density",
				def: "Mass per volume. Cold and salty both raise seawater density."
			},
			{
				term: "NADW",
				exam: "North Atlantic Deep Water",
				def: "Cold, often salty water that can sink in the North Atlantic school story."
			},
			{
				term: "Deep water formation",
				def: "Sinking where the surface becomes dense enough. High-latitude seas, not equatorial shallows."
			},
			{
				term: "Upwelling",
				def: "Return of deeper water toward the surface. Indo-Pacific in this schematic."
			},
			{
				term: "Conveyor",
				def: "School cartoon of a global density loop. Not a pipe. Not a GCM."
			},
			{
				term: "Salinity",
				def: "Salt content. More salt, higher density, all else equal."
			}
		],
		misconception: {
			claim: "It will switch off next Tuesday.",
			truth: "It can change; headlines are not a lab."
		},
		misconceptions: [
			{
				claim: "It will switch off next Tuesday.",
				truth: "It can change; headlines are not a lab."
			},
			{
				claim: "The conveyor is a pipe you could visit in a submarine.",
				truth: "It is a school cartoon of a slow, messy, global density circulation. Flag the simplification."
			},
			{
				claim: "Deep water forms in the warm equatorial shallows because the Sun is strongest there.",
				truth: "Sinking wants density. Cold, often salty high-latitude seas, not the equator."
			}
		],
		cases: [{
			slug: "iceland",
			label: "North Atlantic"
		}, {
			slug: "mississippi",
			label: "Freshwater input caution"
		}],
		teacher: {
			script: "Read density as colour. Dark: cold dense. Warm: light.\nThermohaline means temperature and salinity control density.\nPlay the loop: surface, sink, deep return, upwell.\nDeep water forms in cold, often salty high-latitude seas, not in equatorial shallows.\nIceland sits near a famous sink region in the school story.\nThis is a school conveyor, not a pipe you can visit. Flag the simplification.\nIt will not switch off next Tuesday. Headlines are not a lab.\nIt can change. That is not the same sentence as cinema.\nFreshwater input is a caution, not a countdown. Mississippi belongs here as density, not prophecy.\nFinish in Check.",
			pitfalls: [
				"Day-after-tomorrow cinema as fact.",
				"Teaching the conveyor as a pipe under the Atlantic.",
				"Putting deep-water formation on the equator because the Sun is ‘stronger’ there."
			]
		},
		sources: [{ label: "NOAA AMOC" }, { label: "UK Met Office ocean" }],
		controls: { time: "none" }
	}),
	lab({
		slug: "carbon-cycle",
		title: "Carbon cycle",
		hook: "Fast stores and slow stores. The fossil-fuel tap is a human transfer from slow to fast.",
		objective: "Name stores, watch arrows, and open a fossil-fuel tap as a transfer from a slow geologic store into the fast cycle.",
		realm: "water",
		ages: [
			"GCSE",
			"A-level",
			"NGSS MS",
			"APES"
		],
		curriculum: [
			"GCSE",
			"A-level carbon",
			"APES 1.4 / 4.6"
		],
		steps: steps("Name the stores: atmosphere, biosphere, ocean, rock, fossil. Then the arrows.", "Photosynthesis, respiration, dissolution, weathering. Fast thin arrows; slow rock arrows.", "Open the Fossil-fuel tap. Atmosphere store grows. Slow store falls. The tap moves carbon; it does not invent atoms."),
		questions: [
			q("Fossil fuels are…", [
				"A fast plant store",
				"A slow geologic store we tap into the fast cycle",
				"Oxygen",
				"Albedo"
			], 1, "The tap. Atoms already in the rock."),
			q("The ocean store…", [
				"Does not talk to the air",
				"Exchanges carbon with the atmosphere",
				"Is only plastic",
				"Is granite"
			], 1, "Both ways. Dissolution and return."),
			q("Weathering is a…", [
				"Fast daily flux always",
				"Slow transfer toward rock/ocean stores",
				"Hurricane",
				"Tide"
			], 1, "A-level slow cycle."),
			q("Burning fuel…", [
				"Creates new carbon atoms",
				"Moves carbon from a slow geologic store into the atmosphere",
				"Destroys the ocean store",
				"Stops photosynthesis"
			], 1, "Conservation of atoms. The tap is a transfer, not a factory.")
		],
		why: [
			"A-level water and carbon is one pair of diagrams: stores, fluxes, a budget. Thames-side power and heating are a fossil tap on the slow store; a US Dust Bowl land-use story is carbon in soil and vegetation, still the same boxes. The atmosphere store is the small, fast box that people breathe and plants use; rock and fossil are huge and slow. Opening the tap grows the air box and shrinks the slow box. That is why a school carbon diagram and a NOAA flask record are the same machine at different honesty. Do not preach a policy. Stay on the physical transfer. The ocean talks to the air both ways. Weathering is slow. Photosynthesis and respiration are fast. A UK GCSE class that thinks burning creates new carbon atoms will misread every later climate sentence. The atoms were already in the rock.",
			"Carbon sits in stores: atmosphere, biosphere, ocean, sediment and rock, fossil fuel. A flux is a transfer between stores. Fast cycle: photosynthesis pulls carbon into the biosphere; respiration and decay send it back; the ocean exchanges with the air both ways. Slow cycle: weathering, burial, rock. Fossil fuel is a slow geologic store. The Fossil-fuel tap in this lab is a human flux from that slow box into the atmosphere — a thick arrow, not a new element. Open the tap: the atmosphere sphere grows; the fossil box shrinks. Burning does not create carbon atoms; it moves them. Weathering is not a daily flux. Do not serve an arrow salad with no named stores. Box sizes here are teaching volumes, not IPCC petagrams — do not invent a number and write it as fact. The water cycle lab is mass conserved in H2O; this lab is mass conserved in C. Pair them. Land-use change is another flux on the same diagram, still a transfer, still not a sermon. Stay on the boxes and the arrows. The thick orange arrow is the tap. Fast arrows stay thin.",
			"Name stores first, out loud: atmosphere, biosphere, ocean, rock, fossil. Then chase one fast arrow and one slow arrow. Open the Fossil-fuel tap and watch the air box grow as the slow box falls. Hide labels (L) and ask which box is the tap’s source. Scrub the slider back to low so the class sees the reverse. Keyboard: L labels, R reset. The slider lives in the bar. Particles on the thick arrow are the anthropogenic flux, not a new element. Finish in Check.",
			"Without the 3D view: five stores — atmosphere, biosphere, ocean, rock, fossil. Fluxes between them. Fast: photosynthesis and respiration. Slow: weathering and burial. The fossil tap moves carbon from a slow geologic store into the air; it does not invent atoms. The ocean exchanges with the atmosphere both ways. Box sizes are teaching, not a litre census. Stay on the physical machine. Land-use change is another flux on the same diagram, still a transfer, still not a sermon. The tap is a transfer."
		],
		glossary: [
			{
				term: "Store",
				exam: "Reservoir",
				def: "A place carbon sits: atmosphere, biosphere, ocean, rock, fossil."
			},
			{
				term: "Flux",
				def: "A transfer between stores."
			},
			{
				term: "Photosynthesis",
				def: "Fast flux from atmosphere into the biosphere."
			},
			{
				term: "Respiration",
				def: "Fast flux from biosphere back to the atmosphere."
			},
			{
				term: "Weathering",
				def: "Slow transfer toward rock and ocean stores. Not a daily flux."
			},
			{
				term: "Fossil fuel",
				def: "A slow geologic store of carbon. The tap moves it into the fast cycle."
			},
			{
				term: "Fast cycle",
				def: "Atmosphere–biosphere–ocean exchanges on human timescales."
			},
			{
				term: "Slow cycle",
				def: "Rock, burial, weathering. Geologic time unless we tap it."
			}
		],
		misconception: {
			claim: "Burning fuel creates new carbon atoms.",
			truth: "It moves them from a slow store to the air."
		},
		misconceptions: [
			{
				claim: "Burning fuel creates new carbon atoms.",
				truth: "It moves them from a slow store to the air."
			},
			{
				claim: "The ocean store does not talk to the air.",
				truth: "It exchanges carbon with the atmosphere both ways."
			},
			{
				claim: "Weathering is a fast daily flux like respiration.",
				truth: "Weathering is slow. Fast and slow are different arrows on the same diagram."
			}
		],
		cases: [{
			slug: "thames",
			label: "UK energy / stores"
		}, {
			slug: "dust-bowl",
			label: "Land-use carbon"
		}],
		teacher: {
			script: "Name the stores: atmosphere, biosphere, ocean, rock, fossil.\nThen the arrows: photosynthesis, respiration, dissolution, weathering.\nA store is a reservoir. A flux is a transfer. Do not serve an arrow salad.\nOpen the Fossil-fuel tap. The atmosphere store grows. The slow store falls.\nFossil fuels are a slow geologic store we tap into the fast cycle.\nBurning fuel does not create new carbon atoms. It moves them from a slow store to the air.\nThat is the misconception. Stay on the physical transfer.\nWeathering is a slow transfer toward rock and ocean stores, not a daily flux.\nThe ocean exchanges carbon with the atmosphere both ways.\nFinish in Check.",
			pitfalls: [
				"One arrow salad with no named stores.",
				"Teaching burning as creating new carbon atoms.",
				"Inventing petagram numbers the boxes do not give."
			]
		},
		sources: [{ label: "NOAA carbon" }, { label: "IPCC FAQ as school context — no invented stats" }],
		controls: {
			time: "none",
			extra: [{
				key: "fossil",
				label: "Fossil-fuel tap",
				min: 0,
				max: 1,
				step: .05,
				default: .2
			}]
		}
	}),
	lab({
		slug: "enso",
		title: "ENSO and the Walker cell",
		hook: "The Walker cell can flip. El Niño is a warm pool shift, not a personality. UK weather language stays honest.",
		objective: "See the Walker cell, El Niño and La Niña as Pacific ocean–atmosphere states, and refuse overclaim for a UK winter.",
		realm: "water",
		ages: [
			"A-level",
			"APES",
			"HS Earth Sci"
		],
		curriculum: [
			"A-level",
			"APES 4.9",
			"NGSS HS-ESS2"
		],
		steps: steps("Leave the ENSO slider at 0. Normal Walker cell: rise in the west Pacific, sink in the east.", "Slide toward El Niño. The warm pool shifts east. Slide the other way for La Niña: the opposite extra.", "UK/US: teleconnections exist; they bias odds. They do not write a British month in advance."),
		questions: [
			q("The Walker cell is…", [
				"A polar cell",
				"An east–west tropical Pacific loop",
				"A meander",
				"A dune"
			], 1, "Zonal. Rise west, sink east, in the neutral cartoon."),
			q("El Niño’s warm pool…", [
				"Vanishes",
				"Shifts east in the tropical Pacific",
				"Sits over the UK",
				"Is a glacier"
			], 1, "School cartoon, not a GCM."),
			q("For UK winter, ENSO…", [
				"Always means a White Christmas",
				"May bias odds; it does not write the month in advance",
				"Stops the Gulf Stream",
				"Creates volcanoes"
			], 1, "No overclaim. Teleconnections are not a forecast of snow."),
			q("La Niña in this lab is…", [
				"A storm that hits London",
				"The opposite extra: cooler east Pacific, stronger Walker-like pattern",
				"A river regime",
				"A gyre"
			], 1, "Not a personality. A Pacific state.")
		],
		why: [
			"El Niño is a Pacific ocean–atmosphere state, not a storm that hits London. Florida’s wet season, Pacific fisheries and an east-Pacific upwelling coast feel the warm-pool shift more clearly than a British playground. Teleconnections exist: they can bias the odds of a UK winter pattern. They do not write December in advance, and they do not promise snow. A tabloid ENSO is the wrong machine. The Walker cell is an east–west tropical loop; when it sloshes, rainfall and upwelling in the equatorial Pacific move with it. US exam language (APES) and UK A-level both need that honesty. Holderness gales and a Thames flood have their own machines. This lab is the Pacific cell and the refusal to overclaim. Same planet, different teleconnection strength. Stay on the physical state: warm pool, rise, sink, return flow.",
			"The Walker cell is an east–west tropical Pacific circulation. Neutral cartoon: air rises over the warm west Pacific, travels east aloft, sinks over the cooler east, and returns west at the surface — trade-wind sense. El Niño: the warm pool slides east; the rise shifts with it; the east Pacific warms; upwelling there weakens in the school story. La Niña: the opposite extra, a stronger Walker-like pattern, cooler east. ENSO is that coupled ocean–atmosphere state, not a personality and not a UK storm. Teleconnections are remote statistical links. They may bias UK winter odds; they do not schedule a White Christmas. Florida and Pacific fisheries are closer to the engine. This is a school cartoon of an equatorial trough, not a GCM, not a forecast, not a Gulf Stream switch. Colour and the sliding warm-pool sphere are the mechanism. Do not put the warm pool over the UK. Do not call El Niño a hurricane. The slider is a phase, from La Niña through neutral to El Niño, not a volume knob for British rain. West Pacific and east Pacific are labelled coasts on the trough. The readout names the phase.",
			"Leave ENSO at 0. Name rise in the west, sink in the east, return flow. Slide toward El Niño and watch the warm pool travel east; the Walker arrows follow. Slide the other way for La Niña. Hide labels (L) and ask which coast is west Pacific. Read the phase in the readout before you claim a UK winter. Keyboard: L labels, R reset. The ENSO slider lives in the bar, −1 to +1. No UK snow button. Finish in Check.",
			"Without the 3D view: a Walker cell — rise west, sink east — in the neutral Pacific. El Niño slides the warm pool east. La Niña is the opposite extra. ENSO is a Pacific ocean–atmosphere state with teleconnections. Those links may bias UK winter odds; they do not write the month, and they do not promise snow. Florida and Pacific fisheries feel it more clearly. School cartoon, not a GCM, not a personality. The slider is a phase, not a volume knob for British rain."
		],
		glossary: [
			{
				term: "Walker cell",
				def: "Zonal tropical Pacific circulation. Neutral: rise west, sink east."
			},
			{
				term: "ENSO",
				exam: "El Niño–Southern Oscillation",
				def: "Coupled ocean–atmosphere state of the tropical Pacific. Neutral, El Niño, La Niña."
			},
			{
				term: "El Niño",
				def: "Warm phase. The warm pool shifts east in the tropical Pacific."
			},
			{
				term: "La Niña",
				def: "Cool phase. The opposite extra: cooler east, stronger Walker-like pattern."
			},
			{
				term: "Warm pool",
				def: "The pile of warm surface water. It slides east in El Niño in this cartoon."
			},
			{
				term: "Teleconnection",
				def: "A remote statistical link. May bias odds; does not write a UK month in advance."
			},
			{
				term: "Upwelling",
				def: "East-Pacific rise of cooler water in the neutral and La Niña school story."
			}
		],
		misconception: {
			claim: "El Niño is a storm that hits London.",
			truth: "It is a Pacific ocean–atmosphere state with teleconnections."
		},
		misconceptions: [
			{
				claim: "El Niño is a storm that hits London.",
				truth: "It is a Pacific ocean–atmosphere state with teleconnections."
			},
			{
				claim: "ENSO always means a White Christmas in the UK.",
				truth: "Teleconnections may bias odds. They do not write the month, and they do not promise snow."
			},
			{
				claim: "El Niño is a personality of the weather.",
				truth: "It is a named phase of a Pacific state. Neutral, El Niño, La Niña — not moods."
			}
		],
		cases: [{
			slug: "florida-insolation",
			label: "US ENSO flavour"
		}, {
			slug: "uk-daylength",
			label: "Honest UK language"
		}],
		teacher: {
			script: "Leave the ENSO slider at 0. Normal Walker cell: rise in the west Pacific, sink in the east.\nSlide toward El Niño. The warm pool shifts east in the tropical Pacific.\nSlide the other way for La Niña: the opposite extra.\nEl Niño is not a storm that hits London. It is a Pacific ocean–atmosphere state with teleconnections.\nThat is the misconception. We do not promise UK snow.\nTeleconnections exist. They bias odds. They do not write the month in advance.\nThis is a school cartoon, not a GCM.\nFlorida and Pacific fisheries feel it more clearly than a British playground.\nKeep UK weather language honest. No tabloid ENSO.\nFinish in Check.",
			pitfalls: [
				"Tabloid ENSO.",
				"Promising a UK White Christmas from the slider.",
				"Putting the warm pool over the British Isles."
			]
		},
		sources: [{ label: "NOAA ENSO" }, { label: "Met Office ENSO" }],
		controls: {
			time: "none",
			extra: [{
				key: "enso",
				label: "ENSO",
				min: -1,
				max: 1,
				step: .05,
				default: 0
			}]
		}
	})
];
/** Eight curriculum-gap labs. Built only after the original 54 were projector-ready. */
var WAVE6_LABS = [
	lab({
		slug: "mass-movement",
		title: "Mass movement",
		hook: "Holderness till does not wait for a wave. After rain the cliff rotates on a curved shear and the toe shoves the beach.",
		objective: "Name crown, shear surface and toe on a rotational slump, and say what rain does to the strength of till.",
		realm: "landforms",
		ages: [
			"GCSE",
			"A-level",
			"NGSS MS",
			"HS Earth Sci"
		],
		curriculum: ["GCSE AQA 3.1.3.2", "NGSS MS-ESS2-2"],
		steps: steps("Name crown, scar, shear, toe on a still cliff.", "Raise pore pressure. The block rotates.", "Rain weakens till. Waves only remove the toe."),
		questions: [
			q("A rotational slump moves on…", [
				"A vertical cliff face only",
				"A curved shear surface, like a spoon scoop",
				"A sand dune slipface",
				"A mid-ocean ridge"
			], 1, "The back tilts; the toe shoves."),
			q("Rain makes till more likely to fail because…", [
				"It freezes the cliff",
				"Pore water pressure reduces effective strength",
				"It adds longshore drift",
				"It raises viscosity of magma"
			], 1, "Wet till is weaker till."),
			q("If I raise the rain slider, what should the block do?", [
				"Stand taller",
				"Rotate: crown drops, toe shoves seaward",
				"Turn into a shield volcano",
				"Become a contour"
			], 1, "Rotation is the plot."),
			q("Palos Verdes slides are the same machine as Holderness because…", [
				"Both sit on basalt shields",
				"Weak coastal sediment fails on a curved surface after water is added",
				"Both are transform faults",
				"Both are rain shadows"
			], 1, "Place changes. Mechanism does not.")
		],
		why: [
			"Holderness loses metres of till each year. Waves undercut, but the cliff also fails on its own after rain: a rotational slump, crown dropping, toe shoving the beach. Palos Verdes, California, is the US pair — weak coastal sediment, water in the pores, a curved shear. AQA coasts and NGSS mass wasting both want this as a process you can turn, not a photograph of a scar. If a class only blames the North Sea, they will miss the wet week that actually dropped the block.",
			"Input is water in the pores. Till is glacial sediment: strong when dry-ish, weak when saturated. Effective strength falls as pore pressure rises. Failure finds a curved surface. The head drops and tilts back; the toe shoves out. That is a slump, not a rockfall and not a flow. What moves: the block, rotating about a hinge. What does not: the idea of a shear surface. What is conserved: mass of the failed slice, until waves pick the toe apart. The lie the model tells: one clean spoon-shaped cut, sped up from days to a slider. Real Holderness is many slices, many wet weeks. Vertical exaggeration so the back row can see the rotation. Waves in the coasts lab remove debris. This lab is the failure itself.",
			"Leave rain low. Name crown, scar, shear, toe. Raise pore pressure. Watch the block rotate — do not skip to the beach. Keyboard: Space play, arrows, L labels, R reset, P projector. The rain slider is the plot. Ask what the third row thinks makes the cliff fall before you move it.",
			"Without the canvas: a rotational slump rides a curved shear. Rain raises pore pressure and the till fails. Crown drops, toe shoves. Holderness till; Palos Verdes coastal slides. Waves remove the toe later. Rockfall is a different machine: free fall of jointed rock. This lab is the spoon scoop. That is enough for Check."
		],
		glossary: [
			{
				term: "Rotational slump",
				def: "A slice of slope that rotates on a curved shear. Crown drops; toe shoves."
			},
			{
				term: "Shear surface",
				def: "The failure plane. Curved in a slump. Not a vertical cliff face."
			},
			{
				term: "Crown",
				def: "The upslope crack and head of the failed block."
			},
			{
				term: "Toe",
				def: "The downslope bulge. On a coast, waves pick it apart."
			},
			{
				term: "Pore pressure",
				def: "Water pressure in the gaps. Raised, it reduces effective strength."
			},
			{
				term: "Till",
				def: "Unsorted glacial sediment. Holderness cliffs are till. Weak when wet."
			},
			{
				term: "Mass movement",
				exam: "Mass wasting",
				def: "Downslope movement of rock or soil under gravity. Water is a trigger, not the transport."
			}
		],
		misconception: {
			claim: "The sea ate the whole cliff in one bite.",
			truth: "Waves remove debris. Failure often starts as a wet slump on a curved shear."
		},
		misconceptions: [
			mc("The sea ate the whole cliff in one bite.", "Waves remove debris. Failure often starts as a wet slump on a curved shear."),
			mc("Landslides are just fast rockfalls.", "A slump rotates. A flow mixes. A fall is free. Name the machine."),
			mc("Dry cliffs are the dangerous ones.", "Pore water is the usual trigger in till. Rain first, then the drop.")
		],
		cases: [{
			slug: "holderness",
			label: "Holderness till cliffs"
		}, {
			slug: "outer-banks",
			label: "US Atlantic barrier and slides"
		}],
		teacher: {
			script: "Name crown, scar, shear, toe on a still cliff. Do not play yet.\\nAsk the third row what will make it fall. Wait.\\nRaise rain. The block rotates. Crown drops. Toe shoves.\\nThat is a slump, not a bite from the sea.\\nHolderness till. Palos Verdes is the same machine.\\nWaves pick the toe apart later — coasts lab, not this one.\\nPore pressure reduces strength. Say that in school words.\\nSpace, L, P. Then Check.",
			pitfalls: [
				"Blaming only waves.",
				"Calling every failure a rockfall.",
				"Treating dry cliffs as the hazard."
			]
		},
		sources: [{ label: "BGS mass movement" }, { label: "USGS landslides" }],
		controls: {
			time: "none",
			extra: [{
				key: "rain",
				label: "Pore pressure",
				min: 0,
				max: 1,
				step: .02,
				default: .15
			}]
		}
	}),
	lab({
		slug: "rain-shadow",
		title: "Rain shadow",
		hook: "The Lake District is wet on the west. Penrith, just over the ridge, is drier. The mountain is a barrier, not a cloud factory.",
		objective: "Lift moist air over a ridge, watch it cool and drop rain windward, and say why the leeward slope is dry.",
		realm: "atmosphere",
		ages: [
			"KS3",
			"GCSE",
			"NGSS MS",
			"APES"
		],
		curriculum: [
			"GCSE AQA 3.1.2",
			"NGSS MS-ESS2-4",
			"APES 4.8"
		],
		steps: steps("Moist air hits the ridge.", "Raise the barrier. Windward rain, leeward dry.", "Sierra Nevada is the same machine at a larger scale."),
		questions: [
			q("Air rising on the windward slope…", [
				"Heats and dries",
				"Cools, and water can condense",
				"Turns into a plate",
				"Becomes a tsunami"
			], 1, "Adiabatic cooling. Clouds on the upslope."),
			q("A rain shadow sits…", [
				"On the windward coast always",
				"Leeward of a barrier, where air has already dropped its water",
				"Only at the equator",
				"Inside the outer core"
			], 1, "The mountain took the rain first."),
			q("If I raise ridge height, what happens?", [
				"Both sides get wetter equally",
				"Windward precipitation increases; the lee dries further",
				"The ocean vanishes",
				"Coriolis switches off"
			], 1, "A taller barrier is a sharper shadow."),
			q("Owens Valley east of the Sierra is dry for the same reason Penrith is drier than Keswick because…", [
				"Both sit in a transform fault",
				"Moist air rose, rained, and descended dry",
				"Both are till cliffs",
				"Both are at 60°N"
			], 1, "Barrier first. Latitude second.")
		],
		why: [
			"Keswick is wet. Penrith, over the Helvellyn ridge, is drier. The Lake District is a barrier in the westerlies, not a magic cloud. The Sierra Nevada does the same job at a continental scale: California’s Central Valley and the Owens Valley sit in the lee. GCSE weather and APES 4.8 both want orographic lift as a 3D machine, not a textbook cross-section you cannot turn. If a class thinks mountains ‘make rain’, they will not understand a desert next door.",
			"Input is moist air forced up. As the parcel rises it expands and cools. Relative humidity climbs; cloud and rain on the windward face. Over the crest the air descends, compresses, warms, and dries. That is the rain shadow. What moves: the parcel, the cloud, the rain streaks. What does not: the ridge, until you raise it. What is conserved: water in the parcel until it rains out. The lie: a single ridge, a single wind, no season. Real Lake District weather has fronts as well. Real Sierra has a rain shadow and a seasonal snowpack. This lab isolates the barrier. Coriolis is not invited. The three-cell lab is the planetary machine; this is the hill in the way.",
			"Point at the windward cloud before any place names. Raise Ridge height. Watch the lee dry. Keyboard: Space, L, R, P. The wind slider is optional weather; the ridge is the plot. Name Keswick then Penrith, then Sierra then Owens, after the air has moved.",
			"Without WebGL: moist air rises, cools, rains on the windward slope, then descends dry. That is a rain shadow. Lake District west versus Penrith. Sierra Nevada versus Owens Valley. Mountains do not make rain from nothing; they force air up. A taller ridge is a sharper shadow. That is enough for Check."
		],
		glossary: [
			{
				term: "Orographic rainfall",
				def: "Rain forced by air rising over high ground."
			},
			{
				term: "Rain shadow",
				def: "Dry region leeward of a barrier, after the air has already dropped water."
			},
			{
				term: "Windward",
				def: "The upslope side that faces the incoming moist air."
			},
			{
				term: "Leeward",
				exam: "Lee",
				def: "The downslope side. Air descends, warms, dries."
			},
			{
				term: "Adiabatic cooling",
				def: "A rising parcel expands and cools without heat being taken out by a fridge. School mechanism for cloud on the upslope."
			},
			{
				term: "Föhn / chinook",
				def: "Warm dry descent on the lee. A named wind, same machine."
			},
			{
				term: "Barrier",
				def: "The ridge that forces the lift. Height matters. Geology of the rock does not, in this lab."
			}
		],
		misconception: {
			claim: "Mountains make rain.",
			truth: "Mountains force air up. The water was already in the air."
		},
		misconceptions: [
			mc("Mountains make rain.", "Mountains force air up. The water was already in the air."),
			mc("The desert next door means the mountain is in a different climate belt.", "Often it is the same air, after the rain fell."),
			mc("Leeward slopes are wet because clouds spill over.", "Descent warms and dries. Spillover happens; it is not the shadow.")
		],
		cases: [{
			slug: "lake-district",
			label: "Lake District west vs Penrith"
		}, {
			slug: "colorado",
			label: "Sierra / Owens rain shadow"
		}],
		teacher: {
			script: "Point at moist air hitting the ridge. Do not name places yet.\\nAsk where the rain will fall. Wait.\\nRaise the barrier. Windward cloud. Lee dries.\\nKeswick wet, Penrith drier. Same air.\\nSierra Nevada, then Owens Valley. Same machine, bigger ridge.\\nMountains do not make rain from nothing.\\nSpace, L, P. Then Check.",
			pitfalls: [
				"Mountains as cloud factories.",
				"Confusing rain shadow with latitude belts.",
				"Calling every dry valley a desert climate type."
			]
		},
		sources: [{ label: "Met Office orographic rain" }, { label: "NOAA / WRCC Sierra precipitation" }],
		controls: {
			time: "none",
			extra: [{
				key: "ridge",
				label: "Ridge height",
				min: .3,
				max: 1,
				step: .02,
				default: .7
			}, {
				key: "wind",
				label: "Moist wind",
				min: .2,
				max: 1,
				step: .05,
				default: .7
			}]
		}
	}),
	lab({
		slug: "groundwater",
		title: "Groundwater",
		hook: "A Chalk well in Yorkshire and an Ogallala centre-pivot in Kansas both drink a store you cannot see. The water table is a surface, not a underground lake.",
		objective: "Find the water table in a cut hillside, lower it with a well, and say what an aquifer is — and is not.",
		realm: "water",
		ages: [
			"GCSE",
			"A-level",
			"NGSS MS",
			"APES"
		],
		curriculum: [
			"GCSE",
			"A-level water cycle",
			"NGSS MS-ESS2-4",
			"APES 4.2"
		],
		steps: steps("Read the water table on the cut.", "Pump the well. The cone of depression.", "Confined versus unconfined in one sentence."),
		questions: [
			q("The water table is…", [
				"An underground lake with a shore",
				"The top of the saturated zone in the pores",
				"A river under the ground always",
				"The outer core"
			], 1, "Pores full of water. Not a cave lake."),
			q("An aquifer is…", [
				"Any hole",
				"A rock or sediment that stores and yields useful water",
				"Only granite",
				"A rain shadow"
			], 1, "Chalk and Ogallala sands both qualify. Clay often does not."),
			q("If I pump the well, what happens to the water table nearby?", [
				"It rises into a fountain",
				"It lowers in a cone of depression",
				"The ocean falls",
				"Till becomes magma"
			], 1, "You are mining a store."),
			q("Yorkshire Chalk and the Ogallala are paired in this lab because…", [
				"Both are lava tubes",
				"Both are major aquifers people actually drink, one UK, one US",
				"Both are till cliffs",
				"Both sit on San Andreas"
			], 1, "Same machine. Different rock.")
		],
		why: [
			"Yorkshire’s Chalk feeds springs and public supply. The Ogallala, under the High Plains, feeds centre-pivots that wrote the Dust Bowl’s agricultural sequel. Both are groundwater: water in pores, a water table you can draw, a well that mines a store. A-level water and APES groundwater both fail students who picture an underground river with banks. If you cannot see the table on a cut face, you will not understand a drought, a spring line, or why a well goes dry.",
			"Input is recharge from rain, and a pump. Pores below the water table are saturated. Above it, unsaturated. An unconfined aquifer has the table as its top. A confined aquifer sits under an aquitard; pressure can push a flowing well. What moves: the table, the cone around the well. What does not: the rock. What is conserved: water as a budget — pump faster than recharge and the table falls. The lie: a glass tank with a blue lake. Real Chalk is a dual-porosity rock, fractures plus matrix. Real Ogallala is sediment, not a cave. This cutaway is a teaching tank. Springs appear where the table hits the hillside. That sentence is the field trip.",
			"Read the table on the cut before you pump. Lower the well slider. Watch the cone. Toggle confined if you need the aquitard lid. Keyboard: L, R, P, arrows on the table. Ask where a spring would break out before you reveal the label.",
			"Without the canvas: groundwater lives in pores. The water table is the top of the saturated zone, not an underground lake. A well mines that store and draws a cone of depression. Chalk in Yorkshire; Ogallala under Kansas. Recharge slowly; pump fast and the table falls. A spring is the table meeting the hill. That is enough for Check."
		],
		glossary: [
			{
				term: "Water table",
				def: "Top of the saturated zone. A surface through the pores, not a lake shore."
			},
			{
				term: "Aquifer",
				def: "Rock or sediment that stores and yields useful water."
			},
			{
				term: "Aquitard",
				def: "A layer that slows flow. Clay, often. The lid on a confined aquifer."
			},
			{
				term: "Cone of depression",
				def: "Lowering of the table around a pumping well."
			},
			{
				term: "Recharge",
				def: "Water added to the aquifer, usually from rain and infiltration."
			},
			{
				term: "Spring line",
				def: "Where the water table meets the hillside and water emerges."
			},
			{
				term: "Confined aquifer",
				def: "Saturated rock under an aquitard. Pressure can drive a flowing well."
			}
		],
		misconception: {
			claim: "Groundwater is an underground river or lake.",
			truth: "It is water in pores. The table is a surface through sediment or rock."
		},
		misconceptions: [
			mc("Groundwater is an underground river or lake.", "It is water in pores. The table is a surface through sediment or rock."),
			mc("Wells create water.", "Wells mine a store. Pump faster than recharge and the table falls."),
			mc("All rock is aquifer.", "Granite and clay often yield little. Chalk and clean sand often yield a lot.")
		],
		cases: [{
			slug: "yorkshire-dales",
			label: "Yorkshire Chalk / limestone water"
		}, {
			slug: "dust-bowl",
			label: "Ogallala under the High Plains"
		}],
		teacher: {
			script: "Point at the cut. The blue is pores, not a cave lake.\\nName the water table. Ask where a spring would break out.\\nPump the well. The cone of depression.\\nYou are mining a store. Recharge is slow.\\nYorkshire Chalk. Ogallala sands. Same machine.\\nToggle confined once so they hear aquitard.\\nL, P. Then Check.",
			pitfalls: [
				"Underground rivers as the default picture.",
				"Wells as magic water creators.",
				"Every rock called aquifer."
			]
		},
		sources: [{ label: "BGS groundwater" }, { label: "USGS Ogallala / High Plains aquifer" }],
		controls: {
			time: "none",
			extra: [{
				key: "table",
				label: "Water table",
				min: .15,
				max: .85,
				step: .02,
				default: .55
			}, {
				key: "pump",
				label: "Pump",
				min: 0,
				max: 1,
				step: .05,
				default: 0
			}],
			toggles: [{
				key: "confined",
				label: "Confined lid"
			}]
		}
	}),
	lab({
		slug: "isostasy",
		title: "Isostasy",
		hook: "Scotland is still rising after the ice. Hudson Bay is still rising too. The crust floats. Load it, it sinks. Unload it, it comes back.",
		objective: "Load a crustal block with ice, watch it sink into the mantle, unload it, and name rebound.",
		realm: "interior",
		ages: [
			"A-level",
			"HS Earth Sci",
			"NGSS MS"
		],
		curriculum: ["A-level plate tectonics background", "NGSS HS-ESS2-1"],
		steps: steps("A crustal block floats on a denser mantle.", "Add ice. The block sinks.", "Remove ice. Rebound. Scotland and Hudson Bay."),
		questions: [
			q("Isostasy means…", [
				"Plates do not move",
				"The crust floats in a denser mantle, like wood in water",
				"The Moon pulls continents",
				"Wind piles till"
			], 1, "Archimedes for lithosphere."),
			q("After an ice sheet melts, the land…", [
				"Stays down forever",
				"Rises as the mantle flows back — glacial rebound",
				"Turns into a hotspot",
				"Becomes a rain shadow"
			], 1, "Scotland and Hudson Bay are still coming up."),
			q("If I add ice on the slider, the crustal block should…", [
				"Float higher",
				"Sink, displacing mantle",
				"Evaporate",
				"Slide like San Andreas"
			], 1, "Load down. Unload up."),
			q("Raised beaches in western Scotland and the rising shore of Hudson Bay are the same story because…", [
				"Both are till slumps",
				"Both unloaded ice and the crust is still rebounding",
				"Both are transform faults",
				"Both are Chalk aquifers"
			], 1, "Ice was the load. Time is still paying it back.")
		],
		why: [
			"Western Scotland has raised beaches. The ice went; the land is still coming up. Hudson Bay’s shore is doing the same work. A-level and NGSS treat isostasy as why mountains have roots and why ice can bend a continent. If a class thinks crust sits on a rigid floor, rebound is a miracle and gravity anomalies are a rumour. Holderness till is a load too small to see. An ice sheet is not.",
			"Input is a load: ice, or sediment, or a mountain root. Lithosphere is rigid enough to act as a raft; the mantle beneath is solid but it creeps. Add ice, the raft sinks, mantle flows out. Remove ice, the raft rises, mantle flows back. That is glacial isostatic adjustment. What moves: the block’s height, the mantle under it. What does not: the fact of buoyancy. What is conserved: mass — ice mass leaves, rock mass stays. The lie: a wood-block-in-honey tank, sped up from millennia to a slider. Real rebound is still going, millimetres a year. The mantle is not lava. It is the same solid rock as the interior lab, creeping. Sea level in this scene is a local line so you can see emergence. Global sea level is a different budget.",
			"Start with no ice. Note the waterline. Add ice. The block sinks. Remove ice. Watch rebound. Keyboard: Space, arrows on the load, L, R, P. Ask whether the mantle is liquid before you say creep. Caption stays: mantle is solid rock that flows slowly.",
			"Without the canvas: crust floats on a denser mantle. Ice is a load. Load down, unload up. Scotland’s raised beaches and Hudson Bay’s rising shore are rebound still in progress. The mantle creeps; it is not a magma ocean. Mountains have roots for the same reason. That is enough for Check."
		],
		glossary: [
			{
				term: "Isostasy",
				def: "Buoyancy of the crust (and lithosphere) in a denser mantle. Load down, unload up."
			},
			{
				term: "Glacial rebound",
				exam: "Glacial isostatic adjustment",
				def: "Land rising after ice has gone. Scotland, Hudson Bay, Fennoscandia."
			},
			{
				term: "Raised beach",
				def: "An old shoreline now above the sea. A rebound fossil."
			},
			{
				term: "Lithosphere",
				def: "The rigid raft: crust plus the stiff top of the mantle."
			},
			{
				term: "Asthenosphere",
				def: "Weaker mantle below that can creep. Solid, not a magma ocean."
			},
			{
				term: "Root",
				def: "Thick crust under a mountain, the submerged part of the raft."
			},
			{
				term: "Eustatic",
				def: "Global sea-level change. Not the same as local rebound."
			}
		],
		misconception: {
			claim: "The ground under our feet is a rigid floor that never moves up or down.",
			truth: "It floats. Ice can sink it. Melt can raise it, slowly."
		},
		misconceptions: [
			mc("The ground under our feet is a rigid floor that never moves up or down.", "It floats. Ice can sink it. Melt can raise it, slowly."),
			mc("Rebound means the mantle is lava.", "The mantle is solid rock that creeps. Same story as the interior lab."),
			mc("Raised beaches mean the sea fell everywhere.", "Local land rose. Global sea level is a different number.")
		],
		cases: [{
			slug: "lake-district",
			label: "Scottish / Lake District rebound"
		}, {
			slug: "yosemite",
			label: "North American ice load"
		}],
		teacher: {
			script: "A block floating on a denser mantle. Wood in water, school Archimedes.\\nAdd ice. The block sinks. Ask why before you name isostasy.\\nRemove ice. Rebound.\\nScotland’s raised beaches. Hudson Bay’s rising shore.\\nThe mantle creeps. It is not lava. Point at the interior lab if they protest.\\nMillimetres a year in the real world. This slider is a lie of time.\\nL, P. Then Check.",
			pitfalls: [
				"Rigid-floor crust.",
				"Mantle as magma ocean.",
				"Mixing eustatic sea level with local rebound."
			]
		},
		sources: [{ label: "BGS glacial rebound" }, { label: "USGS / NRC Hudson Bay uplift" }],
		controls: {
			time: "none",
			extra: [{
				key: "ice",
				label: "Ice load",
				min: 0,
				max: 1,
				step: .02,
				default: .55
			}]
		}
	}),
	lab({
		slug: "wilson-cycle",
		title: "Wilson cycle",
		hook: "The Atlantic is opening. One day it will close. The Caledonides and the Appalachians are an older ocean that already did.",
		objective: "Scrub rift → ocean → subduction → collision and treat the Caledonides and Appalachians as one old ocean’s scar.",
		realm: "interior",
		ages: ["A-level", "HS Earth Sci"],
		curriculum: ["A-level plate tectonics", "NGSS HS-ESS2-1"],
		steps: steps("A continent rifts.", "An ocean opens, like today’s Atlantic.", "It closes. Collision. Caledonides / Appalachians."),
		questions: [
			q("The Wilson cycle is…", [
				"One year of weather",
				"Oceans opening and closing over geologic time",
				"A rain shadow",
				"A soil texture class"
			], 1, "Tuzo Wilson. Supercontinents as a loop."),
			q("The Caledonides and Appalachians record…", [
				"A hotspot like Hawaii",
				"An older ocean that opened and then collided shut",
				"A till slump",
				"A Chalk aquifer"
			], 1, "One orogeny, two country names."),
			q("If I scrub the stage slider toward collision, the ocean should…", [
				"Widen forever",
				"Close, with trenches, then mountains",
				"Turn into ice",
				"Become a time zone"
			], 1, "Close, then stack."),
			q("Iceland on today’s Mid-Atlantic is which stage?", [
				"Collision",
				"Young ocean / ridge, still opening",
				"A rain shadow",
				"A slump toe"
			], 1, "The Atlantic is the open-ocean chapter.")
		],
		why: [
			"Scotland’s Caledonian mountains and the US Appalachians are not two mysteries. They are one old ocean that opened and shut, then weathered. Today’s Atlantic is the open chapter of the same play. A-level tectonics and HS-ESS2 want the cycle as a process you can scrub, not a named era to memorise. If Pangaea is taught as a one-off, the next collision is a surprise.",
			"Input is time, in stages. A continent rifts — East African flavour, but this is a teaching strip. Ocean crust is born at a ridge; the basin widens. One margin can become a trench; the ocean starts to close. Collision stacks crust; a mountain belt. Erosion and isostasy then wear it. What moves: the stage. What does not: the menu of jobs from the plate-boundaries lab. What is conserved: lithosphere created and later destroyed. The lie: six clean stages, no microplates, a straight strip not a sphere. Real Wilson cycles overlap. Real Caledonian–Appalachian geometry is a puzzle of terranes. This lab is the loop, not the map. Iceland is today’s ridge, not a collision. Himalaya is collision now. The UK rides a quiet margin of a still-opening Atlantic.",
			"Scrub Stage from rift to collision. Pause on ocean. Point at Iceland as that chapter. Pause on collision. Caledonides, Appalachians. Keyboard: arrows on the stage, L, R, P. Do not skip a stage. Name the job at each stop before the place.",
			"Without the canvas: oceans open and close. Rift, ocean, trench, collision, wear. Caledonides and Appalachians are a closed ocean’s scar. The Atlantic is still opening. Iceland is a ridge. Himalaya is collision. Pangaea was a gathering, not the only one. That is enough for Check."
		],
		glossary: [
			{
				term: "Wilson cycle",
				def: "The opening and closing of ocean basins, named for Tuzo Wilson."
			},
			{
				term: "Rift",
				def: "A continent splitting. The birth of an ocean."
			},
			{
				term: "Passive margin",
				def: "A quiet continent–ocean edge after rifting, like much of the modern Atlantic."
			},
			{
				term: "Orogeny",
				def: "A mountain-building episode, often from collision."
			},
			{
				term: "Caledonides",
				def: "Palaeozoic collision belt through Scotland and Norway. Pair of the Appalachians."
			},
			{
				term: "Appalachians",
				def: "The North American scar of that same old ocean’s close."
			},
			{
				term: "Terrane",
				def: "A crustal piece with its own history, later stitched on. This lab omits them on purpose."
			}
		],
		misconception: {
			claim: "Pangaea was the only time continents gathered, and the Atlantic will stay.",
			truth: "Oceans open and close. The Caledonides already did this play."
		},
		misconceptions: [
			mc("Pangaea was the only time continents gathered, and the Atlantic will stay.", "Oceans open and close. The Caledonides already did this play."),
			mc("Mountains are just wrinkled crust with no ocean in their past.", "Collision belts often close an ocean first."),
			mc("Iceland is a collision orogeny.", "Iceland is a ridge on an opening ocean.")
		],
		cases: [{
			slug: "iceland",
			label: "Atlantic still opening"
		}, {
			slug: "san-andreas",
			label: "A different job on a different edge"
		}],
		teacher: {
			script: "Start at rift. A continent splitting.\\nScrub to open ocean. Iceland lives here.\\nScrub toward a trench. The ocean starts to close.\\nCollision. Caledonides. Appalachians. One scar, two names.\\nAsk whether Pangaea was the only gathering. It was not.\\nThe Atlantic will not stay this width forever on geologic time.\\nArrows on the stage. L, P. Then Check.",
			pitfalls: [
				"Pangaea as a one-off.",
				"Iceland as a collision.",
				"Mountains with no ocean in their past."
			]
		},
		sources: [{ label: "BGS Caledonian" }, { label: "USGS Appalachians" }],
		controls: {
			time: "none",
			extra: [{
				key: "stage",
				label: "Stage",
				min: 0,
				max: 5,
				step: 1,
				default: 2
			}]
		}
	}),
	lab({
		slug: "soil-catena",
		title: "Soil catena",
		hook: "One Yorkshire hillside, four soils. Crest is thin and dry. Toe is thick and wet. The hill is the factory.",
		objective: "Read a crest-to-toe sequence of profiles on one slope and say what water and sediment do at each station.",
		realm: "soils",
		ages: [
			"GCSE",
			"A-level",
			"APES"
		],
		curriculum: [
			"GCSE soils",
			"A-level soils",
			"APES 4.3"
		],
		steps: steps("Four pits on one hill.", "Crest thin, backslope eroded, toe thick.", "Iowa loess hills do the same work."),
		questions: [
			q("A catena is…", [
				"A texture class",
				"A sequence of soils down one slope, linked by water and sediment",
				"A plate boundary",
				"A rain shadow"
			], 1, "One hill. Several profiles."),
			q("The crest soil is often thinner because…", [
				"It is nearer the Moon",
				"Water and sediment leave; the toe receives them",
				"It is always clay",
				"It sits on an aquifer lake"
			], 1, "Export at the top. Import at the bottom."),
			q("If I steepen the slope slider, the backslope should…", [
				"Thicken with peat",
				"Thin as erosion wins",
				"Become a shield volcano",
				"Gain a confined lid"
			], 1, "Steeper, more export."),
			q("A Yorkshire valley side and an Iowa loess hill pair because…", [
				"Both are mid-ocean ridges",
				"Both show crest-to-toe change on one material",
				"Both are till slumps only",
				"Both are Wilson stages"
			], 1, "Catena is the hill, not the county.")
		],
		why: [
			"A single Yorkshire hillside can show a thin crest ranker, a washed backslope, and a thick wet toe. Iowa’s loess hills do the same: crest dry, toe gleyed. GCSE and APES soils are often taught as a texture triangle plus a profile poster. The catena is why those profiles differ in a field you can walk. If a class thinks soil type is only climate, they will not read a slope.",
			"Input is a slope and water. Crest: more free drainage, more erosion, thinner A and B. Backslope: transit, often the most eroded. Footslope and toe: water and sediment arrive, horizons thicken, mottles if wet. What moves: water and particles downslope. What does not: the parent material in this teaching strip. What is conserved: mass — what leaves the crest arrives below, unless a river takes it. The lie: four pits, one parent, no farmer, no time except a slider for steepness. Real Yorkshire has till over limestone in places, and land use. Real Iowa has loess thickness changing on its own. This lab isolates the hill as the factory. Texture triangle is a different lab. Profile names are a different lab. Here the sequence is the point.",
			"Name the four stations before any soil name. Crest, shoulder, backslope, toe. Steepen the slope. Watch the crest thin and the toe thicken. Keyboard: L, R, P, slope slider. Ask which pit is wettest before you reveal mottles.",
			"Without the canvas: a catena is soils down one slope. Crest exports; toe imports. Thinner and drier up top; thicker and wetter at the foot. Yorkshire valley side; Iowa loess hill. Climate sets the palette; the hill rearranges it. That is enough for Check."
		],
		glossary: [
			{
				term: "Catena",
				def: "A sequence of soils down a slope, linked by water and sediment."
			},
			{
				term: "Crest",
				def: "The top. Often thinner, freer drained."
			},
			{
				term: "Backslope",
				def: "The steep transit zone. Erosion often wins."
			},
			{
				term: "Toe",
				exam: "Footslope / toeslope",
				def: "The base. Water and sediment arrive. Horizons thicken."
			},
			{
				term: "Gley",
				def: "Grey, mottled soil from waterlogging. Common at toes."
			},
			{
				term: "Ranker",
				def: "A thin soil over rock, often on a crest or steep slope. School UK term."
			},
			{
				term: "Colluvium",
				def: "Sediment moved downslope by gravity and wash, dumped toward the toe."
			}
		],
		misconception: {
			claim: "Soil type is only climate.",
			truth: "On one hillside the climate is the same. Water and sediment still rewrite the profile."
		},
		misconceptions: [
			mc("Soil type is only climate.", "On one hillside the climate is the same. Water and sediment still rewrite the profile."),
			mc("The thickest soil is at the crest because it is oldest.", "The toe often thickens because it receives what the crest lost."),
			mc("A profile poster is the whole soil course.", "A catena is why neighbouring pits disagree.")
		],
		cases: [{
			slug: "yorkshire-dales",
			label: "Yorkshire hillside catena"
		}, {
			slug: "dust-bowl",
			label: "Iowa / High Plains hillslope soils"
		}],
		teacher: {
			script: "Four pits on one hill. Name crest, shoulder, backslope, toe.\nAsk which is wettest. Wait for the room.\nCrest is thin. Toe is thick. Water and sediment moved downhill.\nSteepen the slope. Export increases. The toe thickens further.\nYorkshire Dales. Iowa loess. Same machine, different rock.\nClimate is not the only author of a soil. Position on the slope writes thickness.\nThis is not the texture triangle. That lab names sand, silt, clay. This lab names place.\nL labels. P projector. Then Check.",
			pitfalls: [
				"Climate-only soils.",
				"Thickest soil assumed at the crest.",
				"Texture triangle treated as a catena."
			]
		},
		sources: [{ label: "Cranfield / LandIS soils" }, { label: "USDA NRCS catenas" }],
		controls: {
			time: "none",
			extra: [{
				key: "slope",
				label: "Slope",
				min: .2,
				max: 1,
				step: .05,
				default: .55
			}]
		}
	}),
	lab({
		slug: "periglacial",
		title: "Periglacial landforms",
		hook: "The Cairngorms still carry freeze–thaw scars. Alaska still has ice wedges growing. Cold without a glacier is its own factory.",
		objective: "Grow an ice wedge and patterned ground with freeze–thaw, and distinguish this machine from a glacier’s U-trough.",
		realm: "landforms",
		ages: [
			"GCSE",
			"A-level",
			"HS Earth Sci"
		],
		curriculum: ["GCSE AQA cold environments", "A-level glacial / periglacial"],
		steps: steps("A cold ground, no ice sheet required.", "Freeze–thaw opens a wedge. Patterned ground.", "Not a U-trough. That is the glacier lab."),
		questions: [
			q("Periglacial means…", [
				"Under a glacier always",
				"Cold-climate processes at the edge of, or without, glacier ice",
				"A plate boundary",
				"A texture class"
			], 1, "Beside the ice. Not the ice."),
			q("An ice wedge grows because…", [
				"A river cuts it",
				"Winter cracks fill with water or snow, freeze, and widen the crack year on year",
				"Wind piles sand",
				"A hotspot punches it"
			], 1, "Crack, fill, freeze, repeat."),
			q("If I raise freeze–thaw cycles, patterned ground should…", [
				"Vanish",
				"Sharpen as wedges and sorting work",
				"Become a shield volcano",
				"Turn into a rain shadow"
			], 1, "More cycles, clearer pattern."),
			q("Cairngorm blockfields and Alaskan ice-wedge polygons pair because…", [
				"Both are mid-ocean ridges",
				"Both are freeze–thaw factories without needing a valley glacier on the spot",
				"Both are Chalk aquifers",
				"Both are Wilson collision"
			], 1, "Cold ground. Not a U-trough.")
		],
		why: [
			"The Cairngorm plateau is a museum of freeze–thaw: blockfields, nivation hollows, soils that move when they thaw. Alaska’s coastal plain grows ice-wedge polygons you can see from the air. GCSE cold environments mix glacial and periglacial until students call every cold landform a glacier. This lab is the other machine. If they only remember U-troughs, they will misread a patterned-ground question and a Yorkshire-Dales limestone pavement alike — karst is yet another lab.",
			"Input is freeze and thaw, again and again. Water in a crack expands when it freezes; the crack widens; summer melt lets more water in. Ice wedges grow. Stones are heaved and sorted into polygons and stripes. Nivation hollows deepen under lingering snow. What moves: ice in the crack, stones toward polygon edges. What does not: a valley glacier. What is conserved: the ground as the stage — this is not ice flowing downhill. The lie: neat hexagons, a single season on a slider. Real polygons take centuries. Real Cairngorms are relict in today’s milder climate; Alaska is live. Vertical exaggeration on the wedge so the back row can see thickness. The glacier lab’s ice has a tongue. This ice is in the ground.",
			"Leave cycles low. A quiet ground. Raise freeze–thaw. Wedges thicken; polygons read. Keyboard: Space, arrows, L, R, P. Ask whether a glacier is required before you reveal the caption. Toggle labels on the wedge and the polygon, not on a U-trough.",
			"Without the canvas: periglacial is cold-ground process without a glacier doing the carving. Freeze–thaw grows ice wedges and patterned ground. Cairngorms relict; Alaska live. A U-trough is the glacier lab. A clint-and-gryke pavement is karst. That is enough for Check."
		],
		glossary: [
			{
				term: "Periglacial",
				def: "Cold-climate processes at the ice margin, or in cold ground with no glacier."
			},
			{
				term: "Ice wedge",
				def: "A crack that fills and freezes, widening year on year."
			},
			{
				term: "Patterned ground",
				def: "Sorted stones in polygons or stripes from freeze–thaw heave."
			},
			{
				term: "Nivation",
				def: "Erosion under a lingering snow patch. A hollow, not a cirque on its own."
			},
			{
				term: "Blockfield",
				exam: "Felsenmeer",
				def: "A sheet of frost-shattered blocks on a plateau."
			},
			{
				term: "Active layer",
				def: "The top that thaws in summer over permafrost."
			},
			{
				term: "Permafrost",
				def: "Ground that stays frozen through the year. Not the same as a glacier."
			}
		],
		misconception: {
			claim: "Every cold landform was carved by a glacier.",
			truth: "Freeze–thaw in the ground is a different factory. Look for wedges and polygons, not a U-trough."
		},
		misconceptions: [
			mc("Every cold landform was carved by a glacier.", "Freeze–thaw in the ground is a different factory. Look for wedges and polygons, not a U-trough."),
			mc("Ice wedges are tiny rivers.", "They are cracks that freeze. Water is a filler, not a channel."),
			mc("The Cairngorms have no periglacial story because the ice has gone.", "Relict forms remain. Alaska is the live pair.")
		],
		cases: [{
			slug: "cairngorms-albedo",
			label: "Cairngorm freeze–thaw"
		}, {
			slug: "yosemite",
			label: "Alaska / high-Sierra cold ground"
		}],
		teacher: {
			script: "A cold ground. No valley glacier on stage.\\nAsk whether freeze–thaw can build landforms without ice flowing. Wait.\\nRaise cycles. Ice wedges thicken. Polygons sort.\\nCairngorms relict. Alaska live.\\nA U-trough is the glacier lab. Do not steal it.\\nCaption: ice is in the ground, and it has thickness.\\nSpace, L, P. Then Check.",
			pitfalls: [
				"All cold = glacial.",
				"Ice wedges as rivers.",
				"Relict Cairngorms treated as empty of this story."
			]
		},
		sources: [{ label: "BGS periglacial" }, { label: "USGS / NSIDC permafrost" }],
		controls: {
			time: "none",
			extra: [{
				key: "cycles",
				label: "Freeze–thaw",
				min: 0,
				max: 1,
				step: .02,
				default: .45
			}]
		}
	}),
	lab({
		slug: "storm-surge",
		title: "Storm surge",
		hook: "The 1953 North Sea flood was wind piling water onto a shelf. Katrina’s surge was the same machine on the Gulf. It is not a tsunami.",
		objective: "Pile water with wind on a shallow shelf, and contrast that with a tsunami’s seafloor slip.",
		realm: "hazards",
		ages: [
			"GCSE",
			"NGSS MS",
			"HS Earth Sci",
			"APES"
		],
		curriculum: ["GCSE AQA 3.1.1.4", "NGSS MS-ESS3-2"],
		steps: steps("A shallow shelf. Wind toward the coast.", "Water piles. The surge.", "Tsunami lab is seafloor slip. Do not mix them."),
		questions: [
			q("A storm surge is…", [
				"A seafloor earthquake wave",
				"Wind-driven pile-up of water on a shallow shelf, plus low pressure",
				"A spring tide only",
				"A rain shadow"
			], 1, "Wind and shelf. Not slip."),
			q("A tsunami starts with…", [
				"Wind swell",
				"A sudden shift of the water column, often seafloor slip",
				"A till slump only",
				"A Chalk well"
			], 1, "Different lab. Different machine."),
			q("If I raise the wind slider toward the coast, the water should…", [
				"Flatten",
				"Pile higher on the shelf",
				"Freeze into an ice wedge",
				"Open an ocean"
			], 1, "Wind setup."),
			q("1953 eastern England and Katrina’s Gulf Coast pair because…", [
				"Both were tsunamis",
				"Both were wind and pressure piling water onto a shallow coast",
				"Both were Wilson collisions",
				"Both were rain shadows"
			], 1, "Same machine. Different ocean.")
		],
		why: [
			"January 1953: a North Sea storm, a surge, Canvey and the Netherlands. August 2005: Katrina, a Gulf shelf, a surge into New Orleans. GCSE flooding and NGSS hazards mix surge and tsunami until a class calls every wall of water an earthquake. This lab is wind on a shelf. The tsunami lab is seafloor slip. If you cannot tell them apart, you will fail the ‘what to do’ question as well as the physics.",
			"Input is wind toward a shallow coast, and a low-pressure lift. Water is pushed and piled; the shelf makes a wall because it is shallow. Tide can add. What moves: the sea surface, piled against the land. What does not: the seafloor. What is conserved: the water — it came from the basin, piled here. The lie: one wind arrow, a rectangular shelf, no barrier islands. Real 1953 had a surge on a high tide. Real Katrina had levees and a bowl. This lab isolates wind setup. A tsunami is fast in deep water and stands up at the coast because the seafloor moved. Different starting sentence. Colour-blind safe: we do not encode ‘danger’ as red versus green only; the pile height is the readout.",
			"Point at the shelf. Wind toward the coast. Raise wind. Watch the pile. Keyboard: Space, L, R, P, wind slider. Say out loud: the floor did not slip. Send them to the tsunami lab for the other machine. Ask which one you can forecast from a weather map.",
			"Without the canvas: storm surge is wind and low pressure piling water on a shallow shelf. Tsunami is seafloor slip. 1953 North Sea; Katrina on the Gulf. Tides can add. The floor stays put in a surge. That is enough for Check, and enough to refuse ‘every flood is a tsunami’."
		],
		glossary: [
			{
				term: "Storm surge",
				def: "Wind-driven pile-up of water, plus low pressure, on a shallow coast."
			},
			{
				term: "Wind setup",
				def: "The slope of the sea surface forced by wind stress."
			},
			{
				term: "Inverse barometer",
				def: "Low pressure lets the sea surface rise a little. Wind usually does more."
			},
			{
				term: "Shelf",
				def: "Shallow seafloor beside a continent. It lets a surge stand up."
			},
			{
				term: "Tsunami",
				def: "A wave from a sudden water-column shift, often seafloor slip. A different lab."
			},
			{
				term: "Still-water flood",
				def: "The surge height before wind waves are added on top."
			},
			{
				term: "Barrier island",
				def: "A sandy shield. It can take the first pile, then fail. Outer Banks flavour."
			}
		],
		misconception: {
			claim: "Every sudden coastal flood is a tsunami.",
			truth: "A surge is wind on a shelf. A tsunami is a moved seafloor. Forecasts and drills differ."
		},
		misconceptions: [
			mc("Every sudden coastal flood is a tsunami.", "A surge is wind on a shelf. A tsunami is a moved seafloor. Forecasts and drills differ."),
			mc("Surge is just big wind waves.", "Waves ride on top. The surge is the still-water pile."),
			mc("Deep water makes a bigger surge.", "A shallow shelf is what lets the pile stand up.")
		],
		cases: [{
			slug: "holderness",
			label: "North Sea 1953 / East coast"
		}, {
			slug: "katrina-sandy",
			label: "Katrina / Sandy surge"
		}],
		teacher: {
			script: "A shallow shelf. Wind toward the coast.\\nAsk what will happen to the water. Wait.\\nRaise wind. The surface piles. The floor did not slip.\\n1953 North Sea. Katrina on the Gulf.\\nTsunami is the other lab. Seafloor slip. Fast in deep water.\\nYou can see a surge coming on a weather map. Say that.\\nSpace, L, P. Then Check.",
			pitfalls: [
				"Surge = tsunami.",
				"Surge = wind waves only.",
				"Deep water as the amplifier."
			]
		},
		sources: [{ label: "Met Office / EA 1953" }, { label: "NOAA / NHC storm surge" }],
		controls: {
			time: "none",
			extra: [{
				key: "wind",
				label: "Onshore wind",
				min: 0,
				max: 1,
				step: .02,
				default: .4
			}]
		}
	})
];
var REALMS = [
	{
		slug: "planet",
		title: "Planet",
		kicker: "Motion of a tilted sphere",
		blurb: "Rotation, revolution, seasons, and the Moon. The clockwork that makes day, night, and the calendar."
	},
	{
		slug: "interior",
		title: "Interior & Plates",
		kicker: "A layered, restless shell",
		blurb: "Crust to inner core, then the plates that carry continents. Boundaries write mountains, trenches, and faults."
	},
	{
		slug: "atmosphere",
		title: "Atmosphere",
		kicker: "Air as a heat engine",
		blurb: "Layers, insolation, wind, cells, fronts, and storms. The film of air that writes weather."
	},
	{
		slug: "water",
		title: "Water & Carbon",
		kicker: "Stores, flows, and time",
		blurb: "The water cycle as a closed budget. Reservoirs, transfers, and a basin you can drain."
	},
	{
		slug: "landforms",
		title: "Landforms",
		kicker: "Water carving rock",
		blurb: "Rivers from source to mouth, then coasts, ice, karst, and folds. Landforms you can orbit."
	},
	{
		slug: "soils",
		title: "Soils & Rocks",
		kicker: "The skin of the land",
		blurb: "Rock cycle, soil profile, texture triangle, weathering, and erosion. The skin of the land, in 3D."
	},
	{
		slug: "hazards",
		title: "Hazards",
		kicker: "Sudden Earth",
		blurb: "Quakes, volcanoes, tsunami, tropical cyclones. Sudden Earth, drawn as a process."
	},
	{
		slug: "skills",
		title: "Skills",
		kicker: "Read the map, then the hill",
		blurb: "Contours, graticule, projections, and grid references. The classroom skill behind the map paper."
	}
];
var LABS = [
	...[
		{
			slug: "seasons",
			title: "Why seasons happen",
			hook: "In December, London is dark by late afternoon while Sydney is in high summer. The Earth is not closer to the Sun in July.",
			objective: "Explain seasons using axial tilt, not distance from the Sun, and predict which hemisphere is in summer on a given date.",
			realm: "planet",
			ages: [
				"KS3",
				"GCSE",
				"NGSS MS",
				"APES"
			],
			curriculum: [
				"KS3 Earth and atmosphere",
				"GCSE background",
				"NGSS MS-ESS1-1",
				"APES 4.7 Solar radiation and Earth’s seasons"
			],
			steps: [
				{
					id: "observe",
					title: "Observe",
					body: "Play a year at 23.44°. Watch the terminator walk the globe and the marked cities. London and Sydney are never in the same season."
				},
				{
					id: "tinker",
					title: "Tinker",
					body: "Set tilt to 0°. The terminator stops its seasonal walk. Then try 35° and scrub June versus December."
				},
				{
					id: "explain",
					title: "Explain",
					body: "Tilt keeps the same orientation as Earth orbits. June: northern hemisphere leans toward the Sun. December: the opposite. Distance is the common misconception."
				},
				{
					id: "check",
					title: "Check",
					body: "Four questions. Instant feedback. Not a score-gate."
				}
			],
			questions: [
				{
					prompt: "What would happen to seasons if axial tilt were 0°?",
					choices: [
						"Seasons would reverse: June would be winter in London.",
						"Almost no seasons: day length and noon Sun height would stay nearly constant at each latitude.",
						"Seasons would get stronger because the orbit would become more elliptical.",
						"The equator would freeze and the poles would heat up."
					],
					answer: 1,
					explain: "With no tilt, every latitude keeps a nearly fixed day length and solar altitude. The small remaining change is orbital eccentricity, which is not what we mean by seasons."
				},
				{
					prompt: "Why is December summer in Sydney?",
					choices: [
						"Australia is closer to the Sun in December.",
						"The southern hemisphere is tilted toward the Sun in December.",
						"Ocean currents reverse in December.",
						"The Moon pulls the southern oceans toward the Sun."
					],
					answer: 1,
					explain: "In December the South Pole leans toward the Sun. Sydney gets higher noon Sun and longer days. London gets the opposite."
				},
				{
					prompt: "Earth is slightly nearer the Sun in early January. Does that cause northern winter?",
					choices: [
						"Yes — closer means colder because of faster orbit.",
						"Yes — perihelion always means winter.",
						"No. Perihelion is in January, but northern winter is a tilt effect. The southern hemisphere is in summer then.",
						"No, because January is actually aphelion."
					],
					answer: 2,
					explain: "Perihelion is early January, a 3% extra insolation globally. If distance caused seasons, both hemispheres would have summer together. They do not."
				},
				{
					prompt: "At the equator, how do day length and solar altitude change through the year compared with London?",
					choices: [
						"The equator has polar night in June.",
						"Day length stays near 12 hours; noon Sun stays high, shifting only with the 23.44° declination. London’s day length swings from about 8 to 16 hours.",
						"They change the same way; only temperature differs.",
						"The equator has no noon Sun in December."
					],
					answer: 1,
					explain: "Equatorial day length is always close to 12 hours. Solar altitude stays high. Mid-latitude places like London swing hard in both day length and noon altitude."
				}
			],
			why: [
				"Leeds in December is dark by late afternoon. Miami still has a high noon Sun. Same star, same calendar month. The difference is latitude on a 23.44° axis, not a closer orbit. UK horticulture, Scottish day length, and a Californian winter greenhouse all run on this geometry. Fieldwork in Snowdonia in June is long light; the same slope in December is a short, low Sun. Florida growers care about hours above a useful incidence angle — the same number UK glasshouses plot on a yield curve. A Lerwick December is shorter still. If a class blames July closeness, they will misread every OS day-length graph and every USGS insolation map they meet next.",
				"Earth’s spin axis keeps nearly the same direction as the planet goes around the Sun. June: the northern hemisphere leans toward the Sun, so London’s noon Sun is high and the day is long. December: the opposite. What moves: the planet’s place on the orbit, and which hemisphere is leaned toward the lamp. What does not: the axis’s aim, near Polaris, over one year. What is conserved: the 23.44° lean, and a nearly circular orbit. Distance to the Sun is the trap. Perihelion — nearest the Sun — falls in early January, during northern winter. If distance caused seasons, London and Sydney would share summer. They do not. The small extra insolation at perihelion is a few percent, a school figure, not a season. The terminator walks north and south because of tilt. Equatorial day length stays near 12 hours; London swings from about 8 to 16. The lie the model tells: orbit radius is shrunk so Earth is readable. Tilt is true. Eccentricity is a labelled switch.",
				"Play a year at 23.44°. Watch the terminator walk. Pause on 21 June, then 21 December. Drag tilt to 0° and play again: the seasonal walk dies. Then 35° to see polar extremes grow. Toggle ‘Exaggerate distance’ so the orbit looks stretched, then turn it off: the real orbit is almost a circle. Keyboard: Space play, arrows scrub the year, L labels, R reset, P projector. City markers: London, Cairo, Nairobi, Sydney, Ushuaia. Ask which city is in summer before you reveal the label.",
				"The globe is to scale as a sphere. The orbit radius is not: if it were, Earth would be a speck. The Sun is drawn large enough to read from the back of the room. Tilt is true. Eccentricity is offered as a labelled lie so you can switch it off. Without the 3D view keep four sentences. A tilted axis. A nearly circular orbit. June is northern summer. December is southern summer. Perihelion is in January, so distance is not the season. London and Sydney never share summer. That is enough for Check on paper."
			],
			glossary: [
				{
					term: "Axial tilt",
					exam: "Obliquity of the ecliptic",
					def: "The 23.44° lean of Earth’s spin axis relative to its orbit. The lean’s direction stays nearly fixed as Earth goes around the Sun."
				},
				{
					term: "Terminator",
					def: "The moving line between day and night. In this lab it walks north and south through the year because of tilt."
				},
				{
					term: "Solstice",
					def: "When one hemisphere leans most toward the Sun (June, NH) or most away (December, NH)."
				},
				{
					term: "Equinox",
					def: "When neither pole leans toward the Sun. Day and night are about equal everywhere."
				},
				{
					term: "Declination",
					def: "The latitude where the Sun is overhead at noon. It travels between 23.44°N and 23.44°S."
				},
				{
					term: "Perihelion",
					def: "Nearest point to the Sun. Early January. A few percent extra insolation, not the cause of seasons."
				},
				{
					term: "Revolution",
					def: "One trip around the Sun. About 365.25 days. Not the same as rotation (the daily spin)."
				}
			],
			misconception: {
				claim: "Summer happens because Earth is closer to the Sun.",
				truth: "Seasons are a tilt effect. Earth is actually nearest the Sun in early January, during northern winter."
			},
			misconceptions: [
				{
					claim: "Summer happens because Earth is closer to the Sun.",
					truth: "Seasons are a tilt effect. Earth is actually nearest the Sun in early January, during northern winter."
				},
				{
					claim: "The axis wobbles each year, pointing first north then south.",
					truth: "Over one year the axis stays pointed the same way, near Polaris. The hemisphere that leans toward the Sun changes because Earth has moved around the orbit."
				},
				{
					claim: "The equator has no seasons, so the Sun is always overhead there.",
					truth: "Equatorial day length stays near 12 hours, but noon altitude still shifts with declination. Overhead Sun only happens between the tropics, and not every day."
				}
			],
			cases: [{
				slug: "uk-daylength",
				label: "UK seasonal day length"
			}, {
				slug: "florida-insolation",
				label: "Florida / California insolation"
			}],
			teacher: {
				script: "Projector on. Start at tilt 0° and play a year.\nAsk: does London’s day length change? It barely does.\nSnap tilt to 23.44°. Hide Sydney’s label.\nScrub to the June solstice. Ask which city is in summer before you reveal.\nThen December. London dark, Sydney high sun.\nPoint at perihelion in January. Distance is the trap.\nTurn eccentricity exaggeration on, then off, so the orbit looks almost circular again.\nRead London’s hours. Then Nairobi. Then Sydney.\nSpace plays. Arrows scrub. P projector. L labels.\nFinish in Check. The wrong answer is always ‘closer in July’.",
				pitfalls: [
					"Students treat the orbit drawing as highly elliptical. Keep the real orbit almost circular.",
					"Confusing Earth’s rotation (day) with revolution (year).",
					"Thinking the axis ‘wobbles’ each year. It stays pointed the same way (near Polaris) over one orbit."
				]
			},
			sources: [
				{
					label: "NASA SVS — Earth’s seasons",
					href: "https://svs.gsfc.nasa.gov/"
				},
				{ label: "NOAA Solar Calculator" },
				{ label: "Met Office — UK day length" }
			],
			controls: {
				time: "year",
				extra: [{
					key: "tilt",
					label: "Axial tilt",
					min: 0,
					max: 45,
					step: .1,
					unit: "°",
					default: 23.44
				}, {
					key: "ecc",
					label: "Orbit stretch",
					min: 0,
					max: .4,
					step: .01,
					default: 0
				}]
			}
		},
		{
			slug: "rotation",
			title: "Earth rotation and the terminator",
			hook: "Frost on a window at 07:00 in Leeds is sunlight already on the school roof in Berlin. The Sun did not jump. The planet turned.",
			objective: "State that Earth rotates west to east, that 15° of longitude is one hour, and that time zones are a consequence of rotation, not the cause of day and night.",
			realm: "planet",
			ages: [
				"KS3",
				"GCSE",
				"NGSS MS"
			],
			curriculum: [
				"KS3 Earth and atmosphere",
				"NGSS MS-ESS1-1",
				"GCSE background"
			],
			steps: [
				{
					id: "observe",
					title: "Observe",
					body: "Watch the terminator sweep west to east. London dawn, then Cairo, then Nairobi’s afternoon, then Sydney’s night."
				},
				{
					id: "tinker",
					title: "Tinker",
					body: "Pause and drag the hour slider. One hour is 15° of longitude. Toggle the time-zone bands. They follow the spin; they do not cause it."
				},
				{
					id: "explain",
					title: "Explain",
					body: "Earth rotates once in about 23 h 56 min relative to the stars (sidereal), 24 h relative to the Sun. We face the Sun, then we face away. The Sun is not circling us each day."
				},
				{
					id: "check",
					title: "Check",
					body: "Four questions. Instant feedback."
				}
			],
			questions: [
				{
					prompt: "Which way does Earth rotate, viewed from above the North Pole?",
					choices: [
						"Clockwise (east to west).",
						"Anticlockwise (west to east).",
						"It does not rotate; the Sun orbits Earth.",
						"It alternates each six months."
					],
					answer: 1,
					explain: "West to east. That is why the Sun appears to rise in the east."
				},
				{
					prompt: "Why is 15° of longitude equal to one hour?",
					choices: [
						"Because there are 15 time zones.",
						"360° / 24 h = 15° per hour. Time zones were drawn to match that geometry.",
						"Because Greenwich is at 15°E.",
						"It is a coincidence of the metric system."
					],
					answer: 1,
					explain: "A full turn is 360° in 24 solar hours. Time zones are a human overlay on that arithmetic."
				},
				{
					prompt: "What is the common misconception this lab targets?",
					choices: [
						"That Earth is a sphere.",
						"That the Sun moves around Earth each day.",
						"That time zones cause rotation.",
						"Both the Sun-around-Earth idea and the idea that time zones cause day and night."
					],
					answer: 3,
					explain: "Day and night are the planet turning. Time zones are a civil convenience on top."
				},
				{
					prompt: "If it is noon in London, about what local solar time is it in Cairo (~30°E)?",
					choices: [
						"10:00 — Cairo is west of London.",
						"About 14:00 — 30° is two hours ahead.",
						"Midnight.",
						"The same, because they share a continent."
					],
					answer: 1,
					explain: "30° / 15° per hour = 2 hours. East is later in the day."
				}
			],
			why: [
				"Jet lag is a body clock arguing with a spinning planet. A Leeds frost at 07:00 is already sunlight on a Berlin school roof. The Sun did not jump. Earth turned west to east. Greenwich marks a meridian, not a magic lamp. New York is five school hours behind London because of longitude, not because the Sun prefers the Hudson. Time zones are labels we printed on that spin. They do not cause day and night. A GCSE map that treats the International Date Line as a weather machine has already failed this lab. Fieldwork on a Holderness beach at dawn is the same geometry as a Miami sunrise: we rotated into the beam.",
				"Earth rotates west to east. We face the Sun, then we face away. One hour is about 15° of longitude. The terminator — the day–night line — sweeps that way because the planet turns, not because the Sun circles us. What moves: which meridians are in the beam. What does not: the Sun’s place as the lamp, the fact of a hard terminator. What is conserved: 360° in about 24 hours relative to the Sun, 15° per school hour. Sidereal day is about 23 h 56 min; solar day is 24 h. Equation of time is a sundial footnote, not the plot. Time-zone bands follow the spin as a political overlay. They kink for borders. They do not drive the terminator. Night side is kept dark on purpose so the lesson reads from the back row. The lie the model tells: rotation is sped up so a day fits a lesson. Shape is a true sphere. The Sun is not circling us each day.",
				"Play a day. Freeze the terminator over the Atlantic and ask who is in daylight: London or New York. Advance one hour. Count 15° of longitude. Overlay time zones, then take them off. Keyboard: Space play, arrows scrub the hour, L labels, R reset, P projector. Toggle time-zone bands. Pause. Ask what ‘the Sun rises’ actually means before you name rotation. Reset if the class has lost Greenwich.",
				"The globe is a sphere of true shape. Rotation rate is sped up so a day fits a lesson. Night side is kept dark on purpose. Without the 3D view keep the sentences. Earth rotates west to east. One hour is 15° of longitude. Time zones are labels, not machinery. Dawn is the planet turning into the beam. The Sun is not circling us each day. Greenwich is a meridian. That is enough for Check on paper, and enough to kill a ‘Sun goes round us’ sentence in one line."
			],
			glossary: [
				{
					term: "Rotation",
					def: "Earth spinning on its axis. One solar day ≈ 24 hours."
				},
				{
					term: "Terminator",
					def: "The day/night boundary. It sweeps west to east as the planet turns."
				},
				{
					term: "Meridian",
					def: "A line of longitude. Local solar noon is when the Sun crosses your meridian."
				},
				{
					term: "Time zone",
					def: "A civil band, typically 15° wide, so clocks stay in step with neighbours. Not a physical cause of day and night."
				},
				{
					term: "Sidereal day",
					def: "Time to face the same star again: about 23 h 56 min. Shorter than the solar day because Earth also orbits."
				},
				{
					term: "Solar day",
					def: "Noon to noon. About 24 hours. The school-clock day."
				}
			],
			misconception: {
				claim: "The Sun moves around Earth once a day.",
				truth: "Earth rotates west to east. The Sun only appears to move."
			},
			misconceptions: [
				{
					claim: "The Sun moves around Earth once a day.",
					truth: "Earth rotates west to east. The Sun only appears to move."
				},
				{
					claim: "Time zones cause day and night.",
					truth: "Zones are civil labels on meridians. Day and night are which face of the planet sees the Sun."
				},
				{
					claim: "A 24-hour day is the time Earth takes to face the same star again.",
					truth: "That is the sidereal day, about 23 h 56 min. The solar day is 24 h because Earth has also moved along its orbit."
				}
			],
			cases: [{
				slug: "greenwich",
				label: "Greenwich meridian"
			}, {
				slug: "time-zones-us",
				label: "US lower-48 time zones"
			}],
			teacher: {
				script: "Freeze the globe with the terminator over the Atlantic.\nAsk who is in daylight: London or New York? Wait for the room.\nAdvance one hour. Count 15° of longitude.\nOverlay time zones. Take them off again.\nTime zones are labels, not machinery. The planet turns west to east.\nAsk what ‘the Sun rises’ actually means. We rotated into the beam.\nMention equation of time once: 15° is a school hour, not a sundial hour.\nNight is dark on purpose so the terminator reads from the back row.\nSpace plays a day. Arrows scrub. P projector.\nFinish in Check.",
				pitfalls: ["Globe animations that rotate the wrong way (east to west).", "Calling 24 h the sidereal day."]
			},
			sources: [{ label: "Royal Observatory Greenwich" }, { label: "USNO — sidereal vs solar day" }],
			controls: {
				time: "day",
				toggles: [{
					key: "zones",
					label: "Time zones"
				}]
			}
		},
		{
			slug: "moon-phases",
			title: "Moon phases and Sun–Earth–Moon geometry",
			hook: "A full Moon over Yosemite is the same geometry a student sees from Snowdonia: the Moon is opposite the Sun, not a different Moon.",
			objective: "Link each phase to the Moon’s position around Earth, distinguish the synodic month from a single night, and show why eclipses are rare.",
			realm: "planet",
			ages: [
				"KS3",
				"GCSE",
				"NGSS MS"
			],
			curriculum: [
				"KS3 Earth and atmosphere",
				"NGSS MS-ESS1-1",
				"GCSE background"
			],
			steps: [
				{
					id: "observe",
					title: "Observe",
					body: "Play a synodic month. Watch the lit half of the Moon always face the Sun, while the face we see from Earth changes."
				},
				{
					id: "tinker",
					title: "Tinker",
					body: "Pause at first quarter and full. Toggle the Earth-view disc. Then turn on eclipse alignment: the 5° orbital tilt is why most months have no eclipse."
				},
				{
					id: "explain",
					title: "Explain",
					body: "Phases are geometry, not Earth’s shadow (except during a lunar eclipse). New Moon is between us and the Sun; full Moon is opposite."
				},
				{
					id: "check",
					title: "Check",
					body: "Four questions. Instant feedback."
				}
			],
			questions: [
				{
					prompt: "At first quarter, where is the Moon relative to the Sun and Earth?",
					choices: [
						"Between the Sun and Earth.",
						"About 90° around its orbit from the Sun–Earth line.",
						"In Earth’s shadow.",
						"Behind the Sun."
					],
					answer: 1,
					explain: "We see half the near side lit. That is a right angle in the Sun–Earth–Moon triangle."
				},
				{
					prompt: "Does Earth’s shadow cause the ordinary crescent Moon?",
					choices: [
						"Yes, always.",
						"No. The dark part is the Moon’s own night side. Earth’s shadow is a lunar eclipse, and it is rare.",
						"Yes, but only in winter.",
						"Only from the southern hemisphere."
					],
					answer: 1,
					explain: "Phases are illumination. Eclipses are alignment plus the 5° tilt being near zero."
				},
				{
					prompt: "Why are eclipses rarer than full and new Moons?",
					choices: [
						"The Moon’s orbit is tilted about 5° to the ecliptic, so it usually passes above or below Earth’s shadow.",
						"The Moon is too small.",
						"Clouds hide them.",
						"They only happen at perihelion."
					],
					answer: 0,
					explain: "New and full happen every synodic month. Eclipses need the Moon near a node."
				},
				{
					prompt: "A synodic month is about 29.5 days. What is it measuring?",
					choices: [
						"Earth’s year.",
						"The time from new Moon to new Moon as seen from Earth.",
						"One Earth rotation.",
						"The time for the Moon to rotate once."
					],
					answer: 1,
					explain: "The Moon also has to catch up with Earth’s motion around the Sun, so the synodic month is longer than the sidereal month (~27.3 days)."
				}
			],
			why: [
				"Tides, festivals, and a Snowdonia night walk all run on the same Sun–Earth–Moon triangle. A full Moon over Yosemite is geometry, not a mood. Lunar calendars count phases. Eclipse chasers wait for node crossings, not for every full Moon. A first-quarter Moon is high over Leeds in the afternoon; that surprises a class that thinks the Moon is a night-only lamp. The same triangle lights a Holderness tide table and a California eclipse map. If you teach Earth’s shadow as the crescent, every later eclipse lesson has to unteach it.",
				"The Moon is a ball half-lit by the Sun. What we call a phase is how much of that sunlit half faces Earth. New, first quarter, full, last quarter are four camera angles on one sphere. A crescent is not Earth’s shadow — that is a lunar eclipse, and it needs alignment. What moves: the Moon’s place around Earth, and therefore the viewing angle. What does not: the fact that half the Moon is always sunlit. What is conserved: the Sun as the lamp, the Moon as a sphere. The Moon’s orbit is tilted about 5° to the ecliptic, so most months it misses Earth’s shadow. Size here is exaggerated so the set reads from the back of the room; the real Moon is about 30 Earth-diameters away. Synodic month, new to new, is about 29.53 days, longer than the sidereal month because Earth has moved. The lamp-and-ball demo that parks the Moon in Earth’s shadow for a crescent is the wrong machine.",
				"Freeze at new, first quarter, full, last quarter. For each, ask the class to sketch the triangle before you rotate the view. Toggle eclipse alignment — the 5° tilt going to zero — and ask why next month’s full Moon will not be an eclipse. Keyboard: Space play, arrows through the month, L labels, R reset, P projector. Turn alignment on once, then off. Size is the labelled lie. Geometry is the plot.",
				"Without the 3D view: half the Moon is always sunlit; phases are the viewing angle from Earth; eclipses need the Moon near a node of its tilted orbit. The lamp-and-ball demo that puts the Moon in Earth’s shadow for a crescent is the wrong machine. New Moon sits between us and the Sun. Full Moon sits opposite. First quarter is a right angle. A synodic month is new to new, about 29.5 days. That is enough for Check, and enough to refuse ‘the crescent is Earth’s shadow’."
			],
			glossary: [
				{
					term: "Phase",
					def: "The fraction of the near side that is sunlit, as seen from Earth."
				},
				{
					term: "Synodic month",
					def: "New Moon to new Moon: about 29.53 days."
				},
				{
					term: "Umbra",
					def: "The dark core of a shadow. A total lunar eclipse puts the Moon in Earth’s umbra."
				},
				{
					term: "Orbital inclination",
					def: "The Moon’s orbit is tilted ~5° to Earth’s orbit. That is why eclipses are rare."
				},
				{
					term: "Node",
					def: "Where the Moon’s orbit crosses the ecliptic. Eclipses need the Moon near a node."
				},
				{
					term: "Ecliptic",
					def: "The plane of Earth’s orbit. The Moon is tilted about 5° to it."
				},
				{
					term: "Near side",
					def: "The Moon face locked toward Earth. Phases are how much of this face is sunlit."
				},
				{
					term: "Penumbra",
					def: "The pale outer shadow. A penumbral lunar eclipse is easy to miss."
				}
			],
			misconception: {
				claim: "The crescent is Earth’s shadow on the Moon.",
				truth: "The crescent is the Moon’s night side. Earth’s shadow is an eclipse."
			},
			misconceptions: [
				{
					claim: "The crescent is Earth’s shadow on the Moon.",
					truth: "The crescent is the Moon’s night side. Earth’s shadow is an eclipse."
				},
				{
					claim: "The Moon is only in the sky at night, and only when it is full.",
					truth: "A first-quarter Moon is high in the afternoon. Phase is a viewing angle, not a schedule of appearance."
				},
				{
					claim: "Every full Moon is a lunar eclipse.",
					truth: "The Moon’s orbit is tilted about 5°. Full happens every month; an eclipse needs the Moon near a node."
				}
			],
			cases: [{
				slug: "snowdonia-moon",
				label: "Moonrise, Snowdonia"
			}, {
				slug: "yosemite-moon",
				label: "Full Moon, Yosemite"
			}],
			teacher: {
				script: "Freeze at new Moon. Sketch the Sun–Earth–Moon triangle on the board.\nFirst quarter. Full. Last quarter. Same sketch, different angle.\nAsk why the dark of the Moon is not Earth’s shadow. Wait before you reveal.\nEnable the 5° tilt. Ask why next month’s full Moon is not an eclipse.\nTurn eclipse alignment on once, then off.\nSize is exaggerated so the geometry reads from the back row.\nA first-quarter Moon can be high in the afternoon. Say that.\nSpace plays the month. Arrows scrub. P projector.\nFinish in Check.",
				pitfalls: ["Ball-and-lamp demos that put the Moon in Earth’s shadow for a crescent.", "Scale: the Moon is 30 Earth-diameters away. This lab exaggerates size so the geometry reads from the back of the room."]
			},
			sources: [{ label: "NASA Moon phases" }, { label: "USGS / NASA SVS Moon kit" }],
			controls: {
				time: "month",
				toggles: [{
					key: "align",
					label: "Eclipse alignment"
				}]
			}
		},
		{
			slug: "earth-interior",
			title: "Earth’s interior",
			hook: "A cut apple is a bad model of Earth: the ‘skin’ would be thinner than the apple’s, and the outer core is liquid metal.",
			objective: "Name the four main layers, their state, and why a liquid outer core plus P/S-wave shadows tell us the inside is not uniform rock.",
			realm: "interior",
			ages: [
				"KS3",
				"GCSE",
				"A-level",
				"NGSS MS",
				"HS Earth Sci"
			],
			curriculum: [
				"KS3 Earth and atmosphere",
				"GCSE AQA 3.1.1",
				"NGSS MS-ESS2-1",
				"A-level plate tectonics background"
			],
			steps: [
				{
					id: "observe",
					title: "Observe",
					body: "Spin the intact Earth, then explode the layers. Crust, mantle, outer core, inner core. Read thicknesses and state."
				},
				{
					id: "tinker",
					title: "Tinker",
					body: "Slice. Fire a P-wave and an S-wave from a surface quake. S-waves stop at the liquid outer core. P-waves leave a shadow zone."
				},
				{
					id: "explain",
					title: "Explain",
					body: "We have never drilled the mantle. Layering is inferred from seismic waves, density, and the magnetic field that needs a convecting liquid metal outer core."
				},
				{
					id: "check",
					title: "Check",
					body: "Four questions. Instant feedback."
				}
			],
			questions: [
				{
					prompt: "Which layer is liquid metal?",
					choices: [
						"Crust",
						"Mantle",
						"Outer core",
						"Inner core"
					],
					answer: 2,
					explain: "The outer core is liquid iron–nickel. The inner core is solid iron–nickel despite being hotter, because pressure is higher."
				},
				{
					prompt: "Why do S-waves fail to reach the far side of Earth?",
					choices: [
						"They are too weak.",
						"S-waves cannot travel through the liquid outer core, so a shadow covers the far side.",
						"The crust absorbs them.",
						"They only travel east."
					],
					answer: 1,
					explain: "S-waves are shear. Liquids do not take a shear. That is the classic evidence for a liquid core."
				},
				{
					prompt: "Why does a liquid outer core matter for the magnetic field?",
					choices: [
						"It does not.",
						"Moving conducting metal can sustain a geodynamo. A fully solid Earth would not.",
						"It makes the planet heavier.",
						"It causes seasons."
					],
					answer: 1,
					explain: "The geodynamo needs a convecting, electrically conducting fluid. That is the outer core."
				},
				{
					prompt: "About how thick is continental crust compared with Earth’s radius (~6371 km)?",
					choices: [
						"About 35 km — a thin shell.",
						"About 2000 km.",
						"Half the radius.",
						"The same as the outer core."
					],
					answer: 0,
					explain: "Continental crust averages ~35 km; oceanic ~7 km. It is a skin, not a layer you could walk around inside."
				}
			],
			why: [
				"The Kola Superdeep borehole, on the Kola Peninsula, reached a little over 12 km — a scratch on a 6371 km radius. Yellowstone’s magma is still in the crust. A cut apple is a bad model: the skin would be thinner than the apple’s, and the outer core is liquid metal, not fruit. UK GCSE AQA 3.1.1 and NGSS MS-ESS2-1 both need the four layers by name and state. If the mantle looks like lava, students keep the magma-ocean myth the copy is trying to kill. Holderness till and Himalayan rock both sit on that thin crust. San Andreas is a crustal slide, not a window into the core.",
				"Four layers, four jobs. Crust: a thin rigid skin — oceanic about 7 km, continental about 35 km, drawn ×4 here so you can see it. Mantle: solid silicate rock that creeps over geologic time. It is not a magma ocean. Partial melt exists in thin zones; the bulk is solid. Outer core: liquid iron–nickel. S-waves die there. That liquid metal, stirring, is the school story of the magnetic field. Inner core: solid iron–nickel, crystallising as the planet cools. What moves in this lab: explode offset, slice plane, P- and S-wave fronts. What does not: the order of the four, the fact of a liquid outer core. What is conserved: seismic rules — P through liquid, S not. The lie the model tells is crust thickness. Mantle colour is rock, not lava. Outer core is metal in slow spin, not fire.",
				"Explode pulls the shells apart. Slice cuts a plane. Toggle P/S waves or press play. Keyboard: E explode, X slice, L labels, R reset, Space play, P projector. Ask which layer is liquid before you reveal the key. Fire S-waves and wait until they die at the outer core. Then P-waves and the shadow zone. Close on the magnetic field as a liquid-core story, not a bar magnet in a kit. The caption stays on: crust ×4, mantle is solid rock.",
				"Without the 3D view: Earth is a thin rocky skin, a solid convecting mantle, a liquid metal outer core, and a solid metal inner core. Crust is kilometres, not hundreds. Mantle is not lava. S-waves stop at the outer core; P-waves go through. Kola was a scratch. Yellowstone is crustal. The apple is a bad model. That paragraph is the lab if WebGL is off, and it is the sentence that kills ‘magma ocean’."
			],
			glossary: [
				{
					term: "Crust",
					def: "Rigid outer rock. Oceanic ~7 km; continental ~35 km."
				},
				{
					term: "Mantle",
					def: "Solid but convecting silicate rock to ~2900 km. Most of Earth’s volume. Not a magma ocean."
				},
				{
					term: "Outer core",
					def: "Liquid iron–nickel. S-waves stop here. Source of the magnetic field."
				},
				{
					term: "Inner core",
					def: "Solid iron–nickel sphere ~1220 km in radius."
				},
				{
					term: "P-wave",
					exam: "Primary / compressional wave",
					def: "Travels through solid and liquid. Fastest."
				},
				{
					term: "S-wave",
					exam: "Secondary / shear wave",
					def: "Travels through solids only. Dies in the outer core."
				},
				{
					term: "Lithosphere",
					def: "Crust plus the rigid top of the mantle. Plates are lithosphere, not crust alone."
				},
				{
					term: "Geodynamo",
					def: "Magnetic field generated by convection in the liquid, conducting outer core."
				}
			],
			misconception: {
				claim: "The mantle is a sea of molten lava.",
				truth: "The mantle is overwhelmingly solid. Magma is a local, partial melt. The liquid layer is the outer core, and it is metal, not lava."
			},
			misconceptions: [
				{
					claim: "The mantle is a sea of molten lava.",
					truth: "The mantle is overwhelmingly solid. Magma is a local, partial melt. The liquid layer is the outer core, and it is metal, not lava."
				},
				{
					claim: "We have samples from the core, like we have Moon rocks.",
					truth: "We have not. The deepest borehole is crust. Core composition is inferred from seismology, density, and meteorite chemistry."
				},
				{
					claim: "The crust is a thick layer you could walk around inside.",
					truth: "Continental crust averages about 35 km on a 6371 km radius. This lab draws it ×4 so you can see it. It is a film."
				}
			],
			cases: [{
				slug: "kola",
				label: "Kola Superdeep borehole"
			}, {
				slug: "yellowstone",
				label: "Yellowstone — a mantle plume"
			}],
			teacher: {
				script: "Explode the shells. Ask which layer is liquid before you reveal the key.\nSlice. The crust is a film. Say that out loud.\nThe mantle is solid rock that creeps. It is not a magma ocean.\nFire S-waves. Wait until the class sees them die at the outer core.\nThen P-waves and the shadow zone.\nClose on the magnetic field as a liquid-core story, not a bar magnet in a kit.\nCaption stays: crust drawn ×4. Mantle is solid rock.\nE explode. X slice. Space play. P projector.\nFinish in Check.",
				pitfalls: [
					"Textbook colours that look like lava for the whole mantle.",
					"Saying we have ‘samples from the core’ — we have not.",
					"Calling the crust thick because this lab draws it ×4. The caption is the truth."
				]
			},
			sources: [
				{ label: "USGS — Earth’s interior" },
				{ label: "BGS — seismology" },
				{ label: "PREM density model (Dziewonski & Anderson)" }
			],
			controls: {
				time: "none",
				explode: true,
				slice: true,
				toggles: [{
					key: "waves",
					label: "P/S waves"
				}]
			}
		},
		{
			slug: "plate-boundaries",
			title: "Plate boundaries",
			hook: "Holderness loses metres of till each year; the Himalaya gain millimetres of rock. Both are plates doing different jobs at their edges.",
			objective: "Distinguish divergent, convergent, and transform boundaries, name a landform for each, and read Pangaea as the same plates at an earlier time.",
			realm: "interior",
			ages: [
				"KS3",
				"GCSE",
				"A-level",
				"NGSS MS",
				"HS Earth Sci"
			],
			curriculum: [
				"GCSE AQA 3.1.1",
				"NGSS MS-ESS2-3",
				"A-level plate tectonics"
			],
			steps: [
				{
					id: "observe",
					title: "Observe",
					body: "Three colours of boundary on a real-ish plate mesh. Mid-Atlantic Ridge, Himalaya, San Andreas. Velocity arrows show who is moving where."
				},
				{
					id: "tinker",
					title: "Tinker",
					body: "Scrub Pangaea to present. Toggle the Hawaii hotspot: the plume stays, the Pacific plate slides, a chain of islands records the track."
				},
				{
					id: "explain",
					title: "Explain",
					body: "Divergent: plates apart, new crust, ridges and rift valleys. Convergent: together, trenches or collision mountains. Transform: slide, earthquakes without a volcano chain."
				},
				{
					id: "check",
					title: "Check",
					body: "Four questions. Instant feedback."
				}
			],
			questions: [
				{
					prompt: "The Mid-Atlantic Ridge is which boundary type?",
					choices: [
						"Convergent",
						"Divergent",
						"Transform",
						"Hotspot"
					],
					answer: 1,
					explain: "Plates move apart. New oceanic crust forms. Iceland sits on the ridge."
				},
				{
					prompt: "The Himalaya form at a…",
					choices: [
						"Ocean–ocean transform.",
						"Continent–continent convergence.",
						"Mantle hotspot only.",
						"Passive margin."
					],
					answer: 1,
					explain: "India collided with Eurasia. No ocean trench now — two continents stacked."
				},
				{
					prompt: "The San Andreas Fault is famous because it is a…",
					choices: [
						"Divergent ridge under California.",
						"Transform boundary between the Pacific and North American plates.",
						"Subduction zone like Cascadia.",
						"Rift valley."
					],
					answer: 1,
					explain: "Plates slide past. Big earthquakes, few volcanoes. Cascadia to the north is the subduction zone."
				},
				{
					prompt: "A hotspot track like Hawaii is evidence that…",
					choices: [
						"Plates do not move.",
						"A plate can move over a relatively fixed mantle plume, leaving a chain of volcanoes that get older away from the active island.",
						"The Moon causes volcanoes.",
						"All volcanoes sit on mid-ocean ridges."
					],
					answer: 1,
					explain: "Loihi and Hawaiʻi are young; Emperor seamounts are old and to the northwest."
				}
			],
			why: [
				"Holderness loses metres of till each year; the Himalaya gain millimetres of rock. Both are plates doing different jobs at their edges. Iceland makes crust at a ridge. San Andreas slides. Cascadia dives. The United Kingdom is not a plate: it rides Eurasia. Hawaii is a hole the Pacific is sliding over, not a boundary volcano. A GCSE class that paints every edge the same colour will fail the map question that asks which job this line is doing. USGS and BGS draw those jobs for a reason.",
				"Three colours, three jobs. Divergent: plates move apart, new crust at a ridge — Iceland, Mid-Atlantic. Convergent: plates move together — trench and arc, or continent smash, Himalaya. Transform: plates slide past, San Andreas. What moves: the plates, centimetres a year, sped up here. What does not: the menu of three jobs. What is conserved: lithosphere created at ridges, destroyed at trenches, conserved along transforms. Arrows along motion, not at the painted line. Pangaea is the same plates earlier, not a mythic first Earth. Hypsometry is schematic bathymetry so trench, ridge and arc read as different work. The lie: millions of years in one lesson, cartoon plate outlines. Boundary type is the mechanism. Pretty topography is not.",
				"Name the three colours before any place names. Point at Iceland, Himalaya, San Andreas. Wait for the class to assign types. Scrub time toward Pangaea. Toggle Hawaii and ask which way the Pacific is going from the age chain. Keyboard: Space, arrows, L labels, R reset, P projector. Arrows along plate motion, not at the line. The UK sits on Eurasia; it is not a plate.",
				"The hypsometry is schematic. Motion is sped up by tens of millions of years. Boundary type is the mechanism; pretty topography is the poster. Without the 3D view: three jobs — diverge, converge, slide. Iceland makes crust. Himalaya stacks it. San Andreas slides. Hawaii is not a plate edge. The UK rides Eurasia. That is enough for Check, and enough to read a USGS hazard map without painting every line red."
			],
			glossary: [
				{
					term: "Divergent",
					def: "Plates move apart. Mid-ocean ridge or continental rift."
				},
				{
					term: "Convergent",
					def: "Plates move together. Subduction or collision."
				},
				{
					term: "Transform",
					def: "Plates slide past. Strike-slip faults."
				},
				{
					term: "Hotspot",
					def: "A long-lived mantle plume that can punch a volcano through a plate interior."
				},
				{
					term: "Pangaea",
					def: "The late Palaeozoic–Mesozoic supercontinent. Not the only one in Earth history."
				},
				{
					term: "Transform",
					def: "Plates slide past. San Andreas type. Lithosphere is neither made nor destroyed."
				},
				{
					term: "Subduction",
					def: "Oceanic plate consumed at a trench. The convergent job under an arc."
				},
				{
					term: "Mid-ocean ridge",
					def: "Divergent boundary that makes new oceanic crust. Iceland sits on one."
				}
			],
			misconception: {
				claim: "Continents plough through a static ocean floor.",
				truth: "Continents are passengers on plates. Ocean floor is also plate, created at ridges and destroyed at trenches."
			},
			misconceptions: [
				{
					claim: "Continents plough through a static ocean floor.",
					truth: "Continents are passengers on plates. Ocean floor is also plate, created at ridges and destroyed at trenches."
				},
				{
					claim: "The UK is its own plate.",
					truth: "The UK sits on the Eurasian plate. Iceland sits on the Mid-Atlantic Ridge, a divergent boundary."
				},
				{
					claim: "All volcanoes sit on plate edges.",
					truth: "Most do. Hawaii is a hotspot punching through a plate interior. The age chain records plate motion."
				}
			],
			cases: [{
				slug: "san-andreas",
				label: "San Andreas"
			}, {
				slug: "iceland",
				label: "Iceland / Mid-Atlantic Ridge"
			}],
			teacher: {
				script: "Name the three colours before any place names.\nPoint at Iceland, Himalaya, San Andreas. Wait for the class to assign types.\nArrows along plate motion, not at the line.\nScrub toward Pangaea. The UK sits on Eurasia; it is not a plate.\nHawaii on. Ask which way the Pacific plate is going from the age chain.\nThree jobs: diverge, converge, slide. Not three moods.\nHolderness loses till; Himalaya gain rock. Same machine, different edges.\nSpace, arrows, L, P. Then Check.",
				pitfalls: ["Calling the UK a plate. It sits on the Eurasian plate.", "Drawing arrows that point at the boundary instead of along plate motion."]
			},
			sources: [
				{ label: "USGS plate boundaries" },
				{ label: "Natural Earth" },
				{ label: "BGS — plate tectonics" }
			],
			controls: {
				time: "none",
				extra: [{
					key: "ageMa",
					label: "Time before present",
					min: 0,
					max: 200,
					step: 1,
					unit: " Ma",
					default: 0
				}],
				toggles: [{
					key: "hotspot",
					label: "Hawaii hotspot"
				}]
			}
		},
		{
			slug: "contours",
			title: "Contours ↔ 3D terrain",
			hook: "A GCSE map question is a hill wearing a disguise. The spur and the valley are the same lines, bending opposite ways.",
			objective: "Read contour lines as a 3D surface, tell spur from valley, and drop a spot height that matches the 3D hill.",
			realm: "skills",
			ages: [
				"KS3",
				"GCSE",
				"NGSS MS"
			],
			curriculum: [
				"GCSE map skills",
				"AQA 3.3 Geographical applications",
				"KS3 map skills"
			],
			steps: [
				{
					id: "observe",
					title: "Observe",
					body: "Toggle 2D map and 3D hill. Same land. The V of the contours points up-valley; the spur’s V points downslope."
				},
				{
					id: "tinker",
					title: "Tinker",
					body: "Change the contour interval. Drop a spot height. Tight lines are steep. Wide lines are gentle."
				},
				{
					id: "explain",
					title: "Explain",
					body: "A contour is a line of equal height. Walk it and you neither climb nor descend. The knoll is a closed loop; the col is the saddle between two knolls."
				},
				{
					id: "check",
					title: "Check",
					body: "Four questions. Instant feedback."
				}
			],
			questions: [
				{
					prompt: "Contour lines that form a V pointing uphill usually mark a…",
					choices: [
						"Spur",
						"Valley or stream",
						"Cliff",
						"Spot height"
					],
					answer: 1,
					explain: "Water flows out of the V. Valley contours point upstream (uphill)."
				},
				{
					prompt: "A spur is…",
					choices: [
						"A closed depression.",
						"A ridge of high ground poking into lower ground; contour Vs point downhill.",
						"Always a cliff.",
						"The same as a valley."
					],
					answer: 1,
					explain: "Spur and valley are opposites in how the Vs point."
				},
				{
					prompt: "If the contour interval is 10 m and five lines sit between two spots, the height difference is about…",
					choices: [
						"10 m",
						"25 m",
						"50 m",
						"500 m"
					],
					answer: 2,
					explain: "Five intervals × 10 m = 50 m. Count the gaps, not just the lines."
				},
				{
					prompt: "Widely spaced contours mean…",
					choices: [
						"A steep slope",
						"A gentle slope",
						"A cliff",
						"Sea level"
					],
					answer: 1,
					explain: "Steep = packed lines. Gentle = open lines. A cliff may show as coincident lines or a symbol."
				}
			],
			why: [
				"A GCSE map question is a hill wearing a disguise. The spur and the valley are the same lines, bending opposite ways. Walk a contour on Snowdonia and you neither climb nor descend. Yosemite’s valley walls pack the lines; the floor opens them. OS 1:25 000 and USGS quads both hide the hill in the interval. If a student counts lines instead of intervals they will misread every height question. North is not up the slope.",
				"A contour joins equal height. Walk it and you neither climb nor descend. Packed lines: steep. Open lines: gentle. A V pointing upslope is a valley; a V pointing downslope is a spur. What moves in this lab: the interval slider, the 2D/3D flip. What does not: the hill. What is conserved: height along a line. Interval is the step between lines, not the line count. Spot heights and trig points are extras. The hill is invented teaching terrain, not a traced OS sheet. Vertical scale is readable, not a 1:1 mountain. The lie is the pretty slope; the skill is reading the disguise. Flip 2D to 3D and the same V must still be a valley.",
				"Start in 2D. Ask spur or valley on the marked V. Flip to 3D without telling them. Change interval from 5 m to 20 m and ask what disappeared. Keyboard: L labels, R reset, P projector. Students count intervals, not lines. North is not ‘up the slope’. Reset view if the hill has been orbited into a puzzle.",
				"The hill is invented teaching terrain, not a traced OS sheet. Vertical scale is readable, not a 1:1 mountain. Without the 3D view: packed lines are steep, open lines are gentle, a V pointing upslope is a valley, a spur bends the other way. Count intervals, not lines. North is a grid, not the slope. That is enough for Check, and enough to sit an OS extract without the 3D crutch."
			],
			glossary: [
				{
					term: "Contour",
					def: "Line joining points of equal height above datum."
				},
				{
					term: "Contour interval",
					def: "The height step between adjacent contours."
				},
				{
					term: "Spot height",
					def: "A surveyed point with a printed elevation."
				},
				{
					term: "Spur",
					def: "A ridge of high ground. Contours V downhill."
				},
				{
					term: "Valley",
					def: "Low ground, often with a stream. Contours V uphill."
				},
				{
					term: "Knoll",
					def: "A small isolated hill: closed contour loops."
				}
			],
			misconception: {
				claim: "Contours are paths.",
				truth: "They are height. A path may follow a contour, but the line itself is not a trail."
			},
			misconceptions: [
				{
					claim: "Contours are paths.",
					truth: "They are height. A path may follow a contour, but the line itself is not a trail."
				},
				{
					claim: "The V of a contour always points downhill.",
					truth: "Valley Vs point uphill (upstream). Spur Vs point downhill. Same ink, opposite jobs."
				},
				{
					claim: "You count the brown lines to get the height change.",
					truth: "Count the intervals (gaps) and multiply by the contour interval. Five gaps at 10 m is 50 m."
				}
			],
			cases: [{
				slug: "snowdonia",
				label: "Snowdonia / Eryri"
			}, {
				slug: "yosemite",
				label: "Yosemite Valley rim"
			}],
			teacher: {
				script: "Start in 2D. Ask spur or valley on the marked V. Wait.\nFlip to 3D without telling them. The hill should match the map.\nChange interval from 5 m to 20 m. Ask what disappeared.\nStudents count intervals, not lines.\nNorth is not ‘up the slope’.\nPacked lines are steep. Open lines are gentle.\nThis is teaching terrain, not a traced OS sheet. Say so.\nL labels. R reset. P projector.\nFinish in Check.",
				pitfalls: ["Students counting lines instead of intervals.", "Assuming north is always ‘up the slope’."]
			},
			sources: [{ label: "OS map skills" }, { label: "USGS topographic maps" }],
			controls: {
				time: "none",
				extra: [{
					key: "interval",
					label: "Contour interval",
					min: 5,
					max: 20,
					step: 5,
					unit: " m",
					default: 10
				}],
				toggles: [{
					key: "mode3d",
					label: "3D hill",
					defaultOn: true
				}]
			}
		},
		{
			slug: "rivers",
			title: "River long profile",
			hook: "A Lake District beck in spate and the Mississippi in flood are the same machine at different stations: steep and narrow, then lazy and wide.",
			objective: "Walk a river from source to mouth, match landforms to course, and use a discharge slider to change competence and floodplain water.",
			realm: "landforms",
			ages: [
				"KS3",
				"GCSE",
				"A-level",
				"NGSS MS"
			],
			curriculum: [
				"GCSE AQA 3.1.3.1",
				"Edexcel rivers",
				"NGSS MS-ESS2-2"
			],
			steps: [
				{
					id: "observe",
					title: "Observe",
					body: "Upper: vertical erosion, V-valley, waterfall. Middle: meanders. Lower: floodplain, levées, delta."
				},
				{
					id: "tinker",
					title: "Tinker",
					body: "Raise discharge. Competence rises; the floodplain takes water. Play the neck cut-off until an oxbow is left behind."
				},
				{
					id: "explain",
					title: "Explain",
					body: "Gradient falls downstream. Energy shifts from vertical to lateral erosion. The long profile is concave: steep headwaters, gentle mouth."
				},
				{
					id: "check",
					title: "Check",
					body: "Four questions. Instant feedback."
				}
			],
			questions: [
				{
					prompt: "Where is vertical erosion most important?",
					choices: [
						"Delta",
						"Floodplain",
						"Upper course",
						"Estuary only"
					],
					answer: 2,
					explain: "Steep gradient, high potential energy, V-shaped valleys and waterfalls."
				},
				{
					prompt: "An oxbow lake forms when…",
					choices: [
						"A waterfall retreats.",
						"A meander neck is cut off, usually in flood, and the old loop is abandoned.",
						"A glacier melts.",
						"Levées burst permanently."
					],
					answer: 1,
					explain: "Helicoidal flow erodes the outer bank. The neck thins. A cutoff shortens the river."
				},
				{
					prompt: "Raising discharge typically…",
					choices: [
						"Lowers competence.",
						"Raises competence and can put water onto the floodplain.",
						"Turns the river into a glacier.",
						"Stops meandering."
					],
					answer: 1,
					explain: "Competence is the largest grain the flow can move. More discharge, more ability — up to a point."
				},
				{
					prompt: "A delta needs…",
					choices: [
						"A river dropping load as it enters stiller water, faster than tides/waves can remove it.",
						"A waterfall.",
						"A transform fault.",
						"Perennial ice."
					],
					answer: 0,
					explain: "Mississippi: huge load, modest tides. Many UK upland rivers never build a classic delta."
				}
			],
			why: [
				"Somerset Levels and the Mississippi delta are flood stories on the same long profile. Channel management — dredge, levée, dam — is an argument with energy and sediment, not a personality of the river. Lake District upper courses cut V-valleys; the Thames lower course sits on a floodplain. US levées and UK washlands are the same machine with different politics. If a class thinks a river is a blue line of constant width they will fail every landform question from knickpoint to oxbow.",
				"A river is a slope with water on it. Upper course: steep, vertical erosion, V-valley, knickpoints. Middle: meanders, helicoidal flow, erosion on the outer bend, deposition on the inner. Lower: floodplain, levées, then a delta or, in tidal UK, often an estuary. What moves: water and sediment. What does not: the long-profile idea of energy falling downstream. What is conserved: water as a budget, sediment until it is dropped. Discharge thickens the channel here; play cuts a neck toward an oxbow. The valley is a teaching mesh, not a traced catchment. Water is a thin free surface in that valley, not a fat pipe. Vertical exaggeration ×12 on the long profile. UK ‘deltas’ are often estuaries because of tides. Say so.",
				"Walk source to mouth with labels off. Ask the class to name each station. Raise discharge and freeze on the floodplain. Play the oxbow once, then rewind. Keyboard: Space play, arrows, L labels, R reset, P projector. The discharge slider is the flood. Labels on only after they have named V-valley, knickpoint, meander, levée, delta.",
				"The valley is a teaching mesh, not a traced catchment. Water is a thin surface, not a fat pipe. Without the 3D view: source, V-valley, knickpoint, meander, floodplain, levée, mouth. Energy falls downstream. UK mouths are often estuaries. Mississippi builds a delta. Discharge up, floodplain wet. Play cuts an oxbow. That is enough for Check on paper."
			],
			glossary: [
				{
					term: "Long profile",
					def: "Height of the bed from source to mouth."
				},
				{
					term: "Competence",
					def: "Largest particle the flow can move."
				},
				{
					term: "Meander",
					def: "A bend. Erosion on the outer bank, deposition on the inner (slip-off slope)."
				},
				{
					term: "Oxbow",
					def: "Abandoned meander loop, left as a lake, then a wetland, then a meander scar."
				},
				{
					term: "Levée",
					exam: "Levee",
					def: "Raised bank of coarse load dumped as floodwater leaves the channel."
				},
				{
					term: "Delta",
					def: "Distributaries and deposited load at a river mouth."
				}
			],
			misconception: {
				claim: "Rivers always take the shortest path to the sea.",
				truth: "They meander on low gradients. The shortest path is a cutoff after a flood, not the default."
			},
			misconceptions: [
				{
					claim: "Rivers always take the shortest path to the sea.",
					truth: "They meander on low gradients. The shortest path is a cutoff after a flood, not the default."
				},
				{
					claim: "Upper, middle and lower course are three different rivers.",
					truth: "They are stations on one long profile. Energy and load change downstream."
				},
				{
					claim: "Every UK river ends in a delta like the Mississippi.",
					truth: "Many UK mouths are estuaries because of tides. A classic delta needs a large load and modest tidal range."
				}
			],
			cases: [{
				slug: "lake-district",
				label: "A UK upland river"
			}, {
				slug: "mississippi",
				label: "Mississippi and delta"
			}],
			teacher: {
				script: "Walk source to mouth with labels off. Name each station.\nV-valley and knickpoint upstream. Meanders in the middle. Floodplain and levée down.\nRaise discharge. Freeze on the floodplain.\nPlay the oxbow once, then rewind.\nUK ‘deltas’ are often estuaries because of tides. Say so.\nWater is a thin surface in a valley, not a fat pipe.\nSpace plays. Arrows scrub. P projector.\nFinish in Check.",
				pitfalls: ["Teaching the upper/middle/lower courses as three different rivers.", "Forgetting that UK ‘deltas’ are often estuaries because of tides."]
			},
			sources: [{ label: "BGS — fluvial geomorphology" }, { label: "USGS Mississippi River" }],
			controls: {
				time: "none",
				extra: [{
					key: "discharge",
					label: "Discharge",
					min: .2,
					max: 1.6,
					step: .05,
					unit: "×",
					default: .7
				}]
			}
		},
		{
			slug: "water-cycle",
			title: "Water cycle stores and flows",
			hook: "A blackout after a blizzard is weather. The reason there is snow to melt into the reservoir is a closed budget of stores and transfers.",
			objective: "Name the main stores and transfers, read a drainage-basin overlay, and see how human abstraction lowers a reservoir.",
			realm: "water",
			ages: [
				"KS3",
				"GCSE",
				"NGSS MS",
				"APES"
			],
			curriculum: [
				"KS3",
				"GCSE water cycle",
				"NGSS MS-ESS2-4",
				"APES 4.1 / 4.2"
			],
			steps: [
				{
					id: "observe",
					title: "Observe",
					body: "Stores: ocean, atmosphere, ice, groundwater, soil, lakes. Flows: evaporation, transpiration, condensation, precipitation, interception, infiltration, runoff, groundwater flow."
				},
				{
					id: "tinker",
					title: "Tinker",
					body: "Toggle the drainage-basin overlay. Open the abstraction tap and watch the reservoir fall. The ocean does not notice; the town does."
				},
				{
					id: "explain",
					title: "Explain",
					body: "Globally the cycle is closed. Locally a basin can be in deficit. Hydrographs (a later skills lab) are this diagram plotted against hours after rain."
				},
				{
					id: "check",
					title: "Check",
					body: "Four questions. Instant feedback."
				}
			],
			questions: [
				{
					prompt: "The largest store of fresh water is…",
					choices: [
						"Rivers",
						"The atmosphere",
						"Ice sheets and glaciers",
						"Soil moisture"
					],
					answer: 2,
					explain: "Most water is ocean (salt). Of the fresh remainder, ice dominates; then groundwater; rivers are a trickle."
				},
				{
					prompt: "Infiltration is…",
					choices: [
						"Water vapour becoming cloud.",
						"Water soaking into the soil surface.",
						"A river entering the sea.",
						"Trees intercepting rain."
					],
					answer: 1,
					explain: "If the soil cannot take more, water runs off. That is the flood story."
				},
				{
					prompt: "Abstraction in this lab lowers the reservoir because…",
					choices: [
						"It destroys the global cycle.",
						"A local store is being mined faster than precipitation and inflow refill it.",
						"It stops evaporation.",
						"It creates new oceans."
					],
					answer: 1,
					explain: "Closed globally, open locally. Groundwater and reservoirs can be over-drawn."
				},
				{
					prompt: "A drainage basin is…",
					choices: [
						"The ocean.",
						"The area of land drained by a river and its tributaries, bounded by a watershed.",
						"A man-made canal.",
						"Only the channel."
					],
					answer: 1,
					explain: "The watershed is the divide. Rain on one side goes to this river; on the other side, another."
				}
			],
			why: [
				"Thames and Severn abstraction, Somerset Levels flooding, and western US Colorado reservoirs are the same diagram with different taps. Stores first, then transfers. A flood is a transfer the soil cannot take. A drought is a store running down. GCSE and APES both fail students who draw arrow salad with no boxes. Ice and groundwater dominate fresh water. Rivers are a fast trickle in the global budget, which is why a Thames low flow can still look like a lot of water on a local map.",
				"Water is conserved. Stores: ocean, ice, groundwater, lakes, soil, air. Transfers: evaporation, transpiration, precipitation, infiltration, runoff, throughflow, groundwater flow. What moves: the tracer particle, the abstraction tap. What does not: the closed budget. What is conserved: mass of water, in school language. Abstraction mines a named store — a town taking from a river or an aquifer — it does not delete the ocean. Arrow sizes here are teaching, not USGS fluxes to the litre. The particle is a tracer, not a molecule census. Toggle the basin overlay to see a catchment as a budget boundary. The lie: pretty arrows. The skill: name the store before you chase the transfer. Rivers are a flow, not a major global store.",
				"Name stores first, then chase one particle from ocean to snow to river and back. Toggle the basin. Then open abstraction and ask who loses: the ocean or the town. Keyboard: Space, L labels, R reset, P projector. The abstraction slider is the tap. Leave it closed until stores are named. Then open it.",
				"Arrow sizes are teaching, not USGS fluxes to the litre. The particle is a tracer, not a molecule census. Without the 3D view: name stores, then transfers. Ocean, ice, groundwater, soil, lakes, air. Evaporation, precipitation, infiltration, runoff. Abstraction mines a store. Rivers are a flow. A flood is a transfer the soil cannot take. That is enough for Check, and enough to read a UKCEH or USGS water-cycle poster without drowning in arrows."
			],
			glossary: [
				{
					term: "Store",
					def: "A place water sits: ocean, ice, aquifer, lake, soil, air."
				},
				{
					term: "Transfer",
					def: "A flow between stores."
				},
				{
					term: "Watershed",
					exam: "Drainage divide",
					def: "The boundary of a drainage basin."
				},
				{
					term: "Abstraction",
					def: "Human removal of water from a store."
				},
				{
					term: "Interception",
					def: "Rain caught on vegetation before it hits the ground."
				},
				{
					term: "Abstraction",
					def: "Water taken from a named store for people. A tap on a river or aquifer, not a deleted ocean."
				},
				{
					term: "Residence time",
					def: "How long a molecule stays in a store. Ice is long. Rivers are short."
				},
				{
					term: "Evapotranspiration",
					exam: "ET",
					def: "Evaporation plus transpiration. A land transfer back to air."
				}
			],
			misconception: {
				claim: "Water is used up.",
				truth: "The global mass is conserved. Quality, location, and timing change. A dry reservoir is a local budget failure."
			},
			misconceptions: [
				{
					claim: "Water is used up.",
					truth: "The global mass is conserved. Quality, location, and timing change. A dry reservoir is a local budget failure."
				},
				{
					claim: "Rivers are a major global store of fresh water.",
					truth: "Ice then groundwater dominate fresh water. Rivers are a fast transfer, a trickle in the budget."
				},
				{
					claim: "The cycle is a circle of arrows with no stores.",
					truth: "Stores first, then transfers. Abstraction mines a named store. A flood is a transfer the soil cannot take."
				}
			],
			cases: [{
				slug: "thames",
				label: "Thames / Severn"
			}, {
				slug: "colorado",
				label: "Colorado River reservoirs"
			}],
			teacher: {
				script: "Name stores first. Ocean, atmosphere, ice, groundwater, soil, lakes.\nChase one particle from ocean to snow to river and back.\nToggle the basin overlay.\nOpen the abstraction tap. Ask who loses: the ocean or the town.\nRivers are a flow, not a major global store.\nA flood is a transfer the soil cannot take.\nStores first, then arrows. That is the misconception to kill.\nSpace, L, R, P.\nFinish in Check.",
				pitfalls: ["Arrow salad with no stores.", "Teaching the cycle as if rivers were a major global store."]
			},
			sources: [
				{ label: "USGS Water Science School" },
				{ label: "NOAA water cycle" },
				{ label: "UK Centre for Ecology & Hydrology" }
			],
			controls: {
				time: "none",
				extra: [{
					key: "abstraction",
					label: "Abstraction",
					min: 0,
					max: 1,
					step: .05,
					default: 0
				}],
				toggles: [{
					key: "basin",
					label: "Drainage basin"
				}]
			}
		}
	],
	...PLANET_LABS,
	...INTERIOR_LABS,
	...ATMOSPHERE_LABS,
	...WATER_LABS,
	...LANDFORM_LABS,
	...SOIL_LABS,
	...HAZARD_LABS,
	...SKILL_LABS,
	...WAVE6_LABS
];
var LAB_BY_SLUG = Object.fromEntries(LABS.map((l) => [l.slug, l]));
function labsInRealm(realm) {
	return LABS.filter((l) => l.realm === realm);
}
//#endregion
export { labsInRealm as i, LAB_BY_SLUG as n, REALMS as r, LABS as t };
