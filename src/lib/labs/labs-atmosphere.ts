import type { LabMeta } from "./types";
import { lab, q, steps } from "./make";

export const ATMOSPHERE_LABS: LabMeta[] = [
  lab({
    slug: "atmosphere-layers",
    title: "Atmosphere as a thin film",
    hook: "Weather lives in a thin film. The rest of the stack is overhead, not climate.",
    objective:
      "Name the main layers, state that weather is tropospheric, and read a lapse rate as temperature falling with height.",
    realm: "atmosphere",
    ages: ["KS3", "GCSE", "NGSS MS", "APES"],
    curriculum: ["KS3", "GCSE weather", "NGSS MS-ESS2-5", "APES 4.4"],
    steps: steps(
      "Explode the shells. Troposphere, stratosphere, mesosphere, thermosphere. Almost all clouds sit in the inner film.",
      "Drag the lapse-rate slider. Colour the troposphere. A radiosonde is this diagram going up.",
      "Weather is troposphere. Ozone heating makes the stratosphere’s temperature rise. The stack is mostly empty of weather.",
    ),
    questions: [
      q("Where does almost all weather happen?", ["Thermosphere", "Mesosphere", "Troposphere", "Exosphere"], 2, "The troposphere is the thin inner film. Clouds, rain, and most winds live there."),
      q("A lapse rate of 6.5 °C/km means…", ["Temperature rises 6.5 °C each kilometre up.", "Temperature falls about 6.5 °C each kilometre up in the troposphere, on average.", "Pressure is constant.", "The stratosphere is boiling."], 1, "Environmental lapse rate is a fall of temperature with height, on average, in the troposphere."),
      q("Why is the stratosphere warmer as you go up?", ["Closer to the Sun in kilometres that matter.", "Ozone absorbs ultraviolet and heats that layer.", "Clouds trap heat there.", "It is closer to space heaters."], 1, "Ozone absorption, not ‘closer to the Sun’ in any useful sense."),
      q("Denver is a mile high. Is its weather still troposphere weather?", ["No — it is already in space.", "Yes. The tropopause is still many kilometres above the city.", "Only in winter.", "No, because air is 100% oxygen there."], 1, "A mile is small next to a 10–12 km troposphere. Denver sits near 1.6 km."),
    ],
    why: [
      "Weather lives in a thin film, not in the whole sky. A last-period class on a UK sea-breeze coast and a playground in mile-high Denver are both still in the troposphere: a few kilometres of mixing, cloud, rain, and the winds that make a forecast. The tropopause is a lid, not the edge of space. Above it the air is real (ozone, meteors, aurora) but almost none of the weather you teach. Aircraft cruise near that lid because the film ends and the ride gets smoother. A Met Office radiosonde and a Denver sounding are the same stack with a different starting height. GCSE weather and NGSS Earth systems both need this picture before fronts, cells, or climate types. If pupils think space begins just above the clouds, every later lab is a cartoon. Draw the film first. Then London fog, Florida convection, and Phoenix heat all have a place to live.",
      "The stack from the ground up is troposphere, tropopause, stratosphere, mesosphere, thermosphere. Thickness is not equal. The troposphere is roughly 8 to 12 km, thinner over the poles, thicker in the tropics. Almost all clouds, rain, and the mixing that makes weather sit in that inner film. Temperature in the troposphere falls with height on average: a school environmental lapse rate of about 6.5 °C km⁻¹. A radiosonde is that diagram going up. The tropopause is where the fall stops. In the stratosphere, ozone absorbs ultraviolet and heats the layer, so temperature rises as you go up, not because those kilometres are meaningfully closer to the Sun. Mesosphere cools again. Thermosphere is thin, energetic, and still not weather. Pressure falls with height the whole way; we do not run out of air at the tropopause. Denver at about 1.6 km is a higher starting point in the same troposphere. A UK sounding from a coastal station starts near sea level and still finds the same lid many kilometres up. Colour the troposphere, explode the shells so the class can name them, then push the shells back so the film looks like a film. The lapse-rate slider is a school average, not a local sounding on a given Tuesday, and not a claim that every parcel cools at 6.5 °C km⁻¹.",
      "Drag to orbit. Space plays and pauses. Arrow keys nudge time. L toggles labels so you can hide names and ask the back row. R resets the stack and the lapse slider. P switches projector mode for a clean board. E explodes the shells; push them back before you sit down so thickness stays honest. Scrub Lapse rate and watch troposphere colour. This lab has no year clock; the motion is the explode and the slider. Share the URL once the shells sit where you want them.",
      "If JavaScript or WebGL dies, the 2D fallback still shows the stack as a labelled diagram. Teach from Observe, Tinker, Explain and finish in Check: weather in the troposphere, lapse as a fall, ozone heating the stratosphere, Denver still troposphere. Print the teacher script from the Teacher tab. The glossary still carries tropopause, radiosonde, and ozone layer. Cases still point at Denver mile-high air and a UK sounding. You lose explode, orbit, and the lapse colour, not the film. A paper radiosonde trace can stand in for the slider. The Why copy on this page is the lesson if the canvas is a still.",
    ],
    glossary: [
      { term: "Troposphere", def: "Lowest layer. Weather lives here. Roughly 8–12 km thick, thinner at the poles." },
      { term: "Tropopause", def: "The lid of the troposphere, where temperature stops falling with height." },
      { term: "Lapse rate", def: "How temperature changes with height. A positive environmental lapse usually means it gets colder up." },
      { term: "Stratosphere", def: "Layer above the tropopause, heated by ozone absorbing ultraviolet." },
      { term: "Mesosphere", def: "Layer above the stratosphere. Temperature falls with height again. Meteors burn here." },
      { term: "Thermosphere", def: "Very thin upper layer. Energetic, aurora country, still not weather." },
      { term: "Radiosonde", def: "Balloon-borne package that profiles temperature, humidity and pressure with height." },
      { term: "Ozone layer", def: "Region of higher ozone in the stratosphere that absorbs ultraviolet and heats that layer." },
    ],
    misconception: {
      claim: "Space begins just above the clouds.",
      truth: "Clouds are in a thin film. There is a lot of atmosphere above them, but almost no weather.",
    },
    misconceptions: [
      {
        claim: "Space begins just above the clouds.",
        truth: "Clouds are in a thin film. There is a lot of atmosphere above them, but almost no weather.",
      },
      {
        claim: "The troposphere is about half the stack.",
        truth: "On a fair drawing it is a film. School shells are exploded so you can name them, not so you can measure thickness from the poster.",
      },
      {
        claim: "We run out of air at the tropopause, so Denver is halfway to space.",
        truth: "Pressure falls with height, but air continues. Denver at about 1.6 km is still deep in a 10–12 km troposphere.",
      },
    ],
    cases: [
      { slug: "denver-air", label: "Denver mile-high air" },
      { slug: "uk-sea-breeze", label: "UK radiosonde / sea breeze" },
    ],
    teacher: {
      script:
        "Explode the shells. Name layers from the inside: troposphere, stratosphere, mesosphere, thermosphere.\nAsk where rain is allowed before you reveal. Weather lives in the troposphere.\nClouds sit in that thin inner film. Space does not begin just above them.\nThat is the misconception. There is atmosphere above, but almost no weather.\nRun the Lapse rate slider. Colour the troposphere. Temperature falls with height, on average.\nA school figure is about 6.5 °C km⁻¹. A radiosonde is this diagram going up.\nOzone heating makes the stratosphere’s temperature rise as you go up, not because it is closer to the Sun in kilometres that matter.\nCompare a UK sounding with Denver. A mile-high city is still troposphere.\nPush the shells back. Do not leave them exploded as if thickness were equal.\nDo not draw the troposphere as half the stack. Do not say we run out of air at the tropopause.\nFinish in Check.",
      pitfalls: [
        "Drawing the troposphere as half the stack.",
        "Saying we ‘run out of air’ at the tropopause.",
        "Leaving exploded shells on the board as if they were to scale.",
        "Teaching ‘closer to the Sun’ as the reason the stratosphere warms with height.",
      ],
    },
    sources: [{ label: "NOAA layers of the atmosphere" }, { label: "Met Office radiosondes" }],
    controls: {
      time: "none",
      explode: true,
      extra: [{ key: "lapse", label: "Lapse rate", min: 4, max: 10, step: 0.1, unit: " °C/km", default: 6.5 }],
    },
  }),
  lab({
    slug: "energy-budget",
    title: "Earth’s energy budget",
    hook: "The ground, not the air, takes the Sun’s punch first.",
    objective: "Trace incoming shortwave, albedo, longwave from the ground, and a simple greenhouse return.",
    realm: "atmosphere",
    ages: ["KS3", "GCSE", "NGSS MS", "APES"],
    curriculum: ["KS3", "GCSE climate", "NGSS MS-ESS2-6", "APES 4.4"],
    steps: steps(
      "Watch the yellow shortwave hit the ground. Some bounces. The ground then glows longwave.",
      "Raise albedo (snow). Less is absorbed. Toggle greenhouse return.",
      "The air is mostly heated from below. Albedo is a surface choice. Greenhouse gases return longwave; they do not ‘trap the Sun’s yellow light’ as a blanket over the beam.",
    ),
    questions: [
      q("What hits the ground first from the Sun?", ["Longwave from the air", "Shortwave (visible + near-IR + UV)", "Earth’s magnetic field", "Only infrared"], 1, "The solar beam is shortwave. The ground then emits longwave."),
      q("Albedo is…", ["Wind speed", "The fraction of incoming shortwave a surface reflects", "A cloud type", "Ocean salinity"], 1, "Fresh snow: high. Dark peat: low."),
      q("Why can a snowy Cairngorm plateau heat the air less than bare peat?", ["Snow is closer to space.", "Higher albedo, so less absorbed shortwave.", "Snow creates wind.", "Peat is magnetic."], 1, "Colour and cover first. Then latent heat if melt or moisture."),
      q("Greenhouse return in this lab is…", ["A GCM of 2026 climate.", "Longwave from the atmosphere back to the ground — a school box, not a forecast.", "The Sun getting hotter.", "Albedo of space."], 1, "Simplification. Teacher notes say so."),
    ],
    why: [
      "Urban heat and snowmelt are budget stories, not moods of the air. A snowy Cairngorm plateau and a paved Phoenix afternoon are the same arrows with different numbers: incoming shortwave, a bounce, absorption at the surface, then longwave up from the ground. The air is mostly heated from below. That is why a dark playground cooks and a bright snowfield does not, and why a UK winter park under fresh snow can stay stubbornly cold while a Florida car park does not. GCSE climate and APES energy-budget diagrams both start here. If pupils think the air takes the Sun’s punch first, every later sentence about greenhouse return, sea breezes, and urban heat islands sits on the wrong floor. Trace the yellow beam to the ground. Then talk about London brick, Arizona desert, and mountain snow as surfaces, not as weather personalities.",
      "The solar beam is shortwave: ultraviolet, visible, and near-infrared. Some of that beam reflects to space; that fraction is albedo. The rest is absorbed, mostly by ground and ocean, some by atmosphere and cloud. The warmed surface emits longwave infrared. Greenhouse gases absorb and re-radiate that longwave; the school box labelled greenhouse return is longwave from the atmosphere back to the ground, not a blanket that blocks the yellow beam on the way in, and not a 2026 climate forecast. Raise albedo toward snow and less shortwave is absorbed, so the red glow fades. Drop albedo toward dark peat or asphalt and the surface takes more of the punch. Phoenix heat is a low-albedo, dry, urban-surface story. Cairngorm snow is a high-albedo story until melt changes the cover. London brick and a Florida wetland sit between those poles, with water and evaporation arguing as well. Units in the adult literature are watts per square metre (W m⁻²); this lab is the arrow diagram, not an inventory you should invent numbers for. Toggle greenhouse return off to see the surface glow without the return, then on again so the class hears the honest sentence: school box, not a GCM.",
      "Drag to orbit the globe of arrows. Space plays and pauses the beam. Arrows left and right nudge time. L hides labels so you can ask what yellow and red mean. R resets albedo and the greenhouse toggle. P is projector. Scrub Albedo from peat toward snow and watch absorbed shortwave fall. Toggle Greenhouse return off, then on. Time is not a year clock here; the drive is the slider and the toggle. Share the URL when the snow and the return sit where you want the question.",
      "If JavaScript or WebGL dies, the 2D fallback still shows the budget as labelled arrows. Teach from the steps: yellow shortwave to the ground, bounce, red longwave, greenhouse return as a school box. Check still asks what hits first, what albedo is, why Cairngorm snow heats the air less than peat, and what the greenhouse toggle is not. Print the teacher script. The glossary still names albedo, shortwave, and longwave. Cases still point at Cairngorms and Phoenix. You lose the moving beams, not the floor the air is heated from. A board sketch of yellow in and red out can stand in for the canvas.",
    ],
    glossary: [
      { term: "Albedo", def: "Fraction of incoming shortwave reflected by a surface. Fresh snow high; dark peat low." },
      { term: "Shortwave", def: "Solar radiation: ultraviolet, visible, near-infrared." },
      { term: "Longwave", def: "Earth-emitted infrared from the ground, ocean, and atmosphere." },
      { term: "Greenhouse effect", def: "Atmosphere absorbing and re-radiating longwave. School box, not a GCM." },
      { term: "Energy budget", def: "Balance of incoming and outgoing radiation for a surface or the planet." },
      { term: "Absorption", def: "Radiation taken up by a surface or gas and converted to energy in that matter." },
      { term: "Emission", def: "Radiation given out. Warm ground emits longwave." },
      { term: "Insolation", def: "Incoming solar radiation at a surface, after geometry and, at the ground, atmosphere." },
    ],
    misconception: {
      claim: "The air takes the Sun’s heat, then warms the ground.",
      truth: "The ground (and ocean) take most of the beam. The air is heated from below, plus some absorption.",
    },
    misconceptions: [
      {
        claim: "The air takes the Sun’s heat, then warms the ground.",
        truth: "The ground (and ocean) take most of the beam. The air is heated from below, plus some absorption.",
      },
      {
        claim: "Greenhouse gases trap the Sun’s yellow light as a blanket over the beam.",
        truth: "The solar beam is shortwave. Greenhouse return is longwave from the atmosphere back to the ground.",
      },
      {
        claim: "Albedo is how hot a surface feels to the hand.",
        truth: "Albedo is the reflected fraction of shortwave. A dark dry pavement can run hot because it absorbs more, then emits longwave.",
      },
    ],
    cases: [
      { slug: "cairngorms-albedo", label: "Cairngorms snow albedo" },
      { slug: "phoenix-heat", label: "Arizona desert / Phoenix" },
    ],
    teacher: {
      script:
        "Trace one yellow shortwave arrow to the ground. Some bounces. The ground then glows longwave.\nThe air is mostly heated from below. That is the misconception in reverse.\nSnap Albedo toward snow. Less shortwave is absorbed.\nAsk what happens to the red glow. It should fade.\nToggle Greenhouse return off, then on. Longwave from the atmosphere back to the ground — a school box, not a forecast.\nGreenhouse gases do not trap the Sun’s yellow light as a blanket over the beam.\nAlbedo is a surface choice. Fresh snow high, dark peat low. Cairngorms versus Phoenix.\nThis is not a climate prediction. Say so.\nArizona desert and Cairngorm snow are the same arrows with different numbers.\nFinish in Check.",
      pitfalls: [
        "Calling this a climate prediction.",
        "‘The atmosphere is a blanket that blocks sunlight.’",
        "Inventing watt-per-square-metre inventories the lab does not show.",
        "Teaching albedo as a feeling of warmth rather than a reflected fraction.",
      ],
    },
    sources: [{ label: "NASA energy budget diagram" }, { label: "NOAA climate" }],
    controls: {
      time: "none",
      extra: [{ key: "albedo", label: "Albedo", min: 0.1, max: 0.9, step: 0.05, default: 0.3 }],
      toggles: [{ key: "greenhouse", label: "Greenhouse return", defaultOn: true }],
    },
  }),
  lab({
    slug: "thermal-circulation",
    title: "Thermal circulation",
    hook: "A coastal school feels the sea breeze at last period for a reason.",
    objective: "Heat one column, watch the loop, and switch between land–sea breeze and a simple urban-heat island.",
    realm: "atmosphere",
    ages: ["KS3", "GCSE", "NGSS MS"],
    curriculum: ["KS3", "GCSE weather", "NGSS MS-ESS2-5"],
    steps: steps(
      "Two columns. The land one is warm. Particles rise, travel, sink over the cool column, return.",
      "Toggle urban heat: a paved patch as the warm column. Then land–sea.",
      "Uneven heating starts a pressure difference. Air starts ‘downhill’ on that slope. Coriolis is a later lab.",
    ),
    questions: [
      q("A sea breeze at the surface blows…", ["From land to sea", "From sea to land", "Straight up", "Only at night"], 1, "Land hotter by day → rise over land → onshore flow at the surface."),
      q("At night the land often cools faster. The surface flow…", ["Stays onshore", "Can reverse as a land breeze", "Stops the planet", "Becomes a hurricane"], 1, "The loop can reverse. Not always; moisture and clouds argue."),
      q("An urban heat island is…", ["A sea.", "A city that stays warmer, especially at night, because of surface materials and less evaporative cooling.", "A type of cloud.", "A polar cell."], 1, "Budget plus roughness. Phoenix is a large example; a playground is a small one."),
      q("Coriolis on a 20 km sea breeze is…", ["Essential; the wind would not exist without it.", "A later lab. This loop is thermal, local, and too small to need the twist.", "Why the sea is always cold.", "Why Phoenix has no heat island."], 1, "Leave Coriolis off this scale. The pressure slope from uneven heating is enough."),
    ],
    why: [
      "Last period on a sunny coastal site is a field trip you do not leave the playground for. A UK sea breeze is the same thermal loop as a Phoenix afternoon pulling air off a cooler canal or desert edge: land or pavement heats faster, air rises, surface air replaces it from the cooler side. London brick versus a park, Florida sea breeze versus inland convection, a playground versus a playing field: uneven heating, then a pressure difference, then wind. GCSE weather wants the sea breeze by name. NGSS wants the idea that heating differences drive circulation. If pupils think wind starts because the sea is always cold, they will never reverse the loop at night and they will brand every coastal wind a monsoon. Heat one column. Watch the return. Then say Phoenix heat island and UK sea breeze in the same sentence.",
      "Two columns. By day the land (or the paved patch) takes more of the shortwave budget, warms, and the air above it becomes less dense. That column rises. Aloft, air moves toward the cooler column. There it sinks. At the surface, air flows toward the warm column: onshore as a sea breeze, or toward the city as a weak urban circulation. The sea’s slower temperature change is the contrast, not a permanent cold machine. At night the land often cools faster, and the loop can reverse as a land breeze; moisture, cloud, and a stubborn urban heat store all argue, so it is not a clock. Phoenix stays warmer at night because materials and less evaporative cooling hold heat; that is an urban heat island, not a sea. A UK sea-breeze front can lift a line of cloud a few kilometres inland on a spring afternoon. Do not draw Coriolis on a 20 km loop. Do not call every coastal wind a monsoon. Pressure difference first, then the arrows. The next lab adds Earth’s twist at a scale that can feel it.",
      "Leave Land–sea on to start. Space plays the day–night walk so the loop can reverse. Arrow keys nudge time if you want a freeze-frame for the board. L hides labels; ask for the surface arrow before you reveal. R resets toggles. P is projector for a clean front. Toggle Urban heat to make the paved patch the warm column, then off again so the coast is the story. This is a local loop, not a year clock of cells. Share the URL when the surface arrow sits onshore, then again at night so the reverse is a link, not a rumour.",
      "If JavaScript or WebGL dies, the 2D fallback still shows two columns and a loop. Teach from the steps: rise over the warm column, sink over the cool, surface flow toward the heat by day. Check still names sea breeze, land breeze, urban heat island, and why Coriolis waits. Print the teacher script. The glossary still carries onshore flow and evaporative cooling. Cases still point at a UK sea breeze and Phoenix heat. You lose the particles, not the reason a coastal school feels the breeze at last period. A board loop of four arrows can stand in for the canvas.",
    ],
    glossary: [
      { term: "Sea breeze", def: "Daytime onshore flow driven by land heating faster than the sea." },
      { term: "Land breeze", def: "Night-time offshore flow when land has cooled faster than the sea. Not a clock." },
      { term: "Urban heat island", def: "City warmer than surroundings, especially at night, from materials and less evaporative cooling." },
      { term: "Thermal circulation", def: "A loop driven by uneven heating and the pressure difference that follows." },
      { term: "Onshore flow", def: "Surface wind from sea toward land." },
      { term: "Pressure difference", def: "Uneven heating builds a slope on the pressure field. Air starts downhill on that slope." },
      { term: "Evaporative cooling", def: "Heat used to evaporate water, so a wet surface warms more slowly than a dry one." },
    ],
    misconception: {
      claim: "Wind starts because the sea is always cold.",
      truth: "It starts because heating is uneven. The sea’s slower temperature change is the contrast, not a permanent cold machine.",
    },
    misconceptions: [
      {
        claim: "Wind starts because the sea is always cold.",
        truth: "It starts because heating is uneven. The sea’s slower temperature change is the contrast, not a permanent cold machine.",
      },
      {
        claim: "Every coastal wind is a monsoon.",
        truth: "A sea breeze is a local thermal loop, kilometres not ocean basins. Monsoon is a seasonal, much larger reversal.",
      },
      {
        claim: "Cities are warmer only because of car exhaust.",
        truth: "Surface materials, geometry, and less evaporative cooling do most of the school-level work, especially at night.",
      },
    ],
    cases: [
      { slug: "uk-sea-breeze", label: "UK sea breeze" },
      { slug: "phoenix-heat", label: "Phoenix urban heat" },
    ],
    teacher: {
      script:
        "Leave Land–sea on. Heat the land column. Wait for the loop.\nParticles rise over the warm column, travel, sink over the cool, return.\nName the surface arrow: by day, sea to land.\nWind starts because heating is uneven, not because the sea is always cold.\nThe sea’s slower temperature change is the contrast, not a permanent cold machine.\nAt night the loop can reverse as a land breeze. Not always; moisture and clouds argue.\nToggle Urban heat on. A paved patch is now the warm column.\nAn urban heat island is materials and less evaporative cooling, especially at night. Phoenix is the large locator.\nDo not draw Coriolis on a 20 km sea breeze. Do not call every coastal wind a monsoon.\nFinish in Check.",
      pitfalls: [
        "Drawing Coriolis on a 20 km sea breeze.",
        "Calling every coastal wind a monsoon.",
        "Teaching the night reversal as a clock that always rings.",
        "Blaming urban heat on exhaust alone and skipping surfaces.",
      ],
    },
    sources: [{ label: "Met Office sea breezes" }, { label: "NOAA urban heat" }],
    controls: {
      time: "none",
      toggles: [
        { key: "landsea", label: "Land–sea", defaultOn: true },
        { key: "urban", label: "Urban heat" },
      ],
    },
  }),
  lab({
    slug: "wind",
    title: "Wind, PGF and Coriolis",
    hook: "Air starts downhill on the pressure slope. Earth then twists the path.",
    objective: "Name PGF, switch Coriolis on, compare NH and SH, and add friction near the surface.",
    realm: "atmosphere",
    ages: ["GCSE", "A-level", "NGSS MS", "HS Earth Sci"],
    curriculum: ["GCSE weather", "A-level atmosphere", "NGSS HS-ESS2"],
    steps: steps(
      "High to low: the PGF arrow. No spin yet, so flow is straight down the slope.",
      "Coriolis on. NH left-looking-downslope becomes a right deflection. Toggle SH. Add friction: surface flow cuts across isobars toward low.",
      "Geostrophic is PGF vs Coriolis, no friction. The ground slows the wind and lets PGF win a bit.",
    ),
    questions: [
      q("PGF points…", ["From low to high pressure", "From high to low pressure", "Always east", "Only upward"], 1, "Pressure-gradient force is downhill on the pressure surface."),
      q("In the northern hemisphere Coriolis deflects…", ["Left", "Right", "Up", "Not at all"], 1, "To the right of the motion. SH: left."),
      q("Friction near the surface makes wind…", ["Faster and more geostrophic", "Cross isobars toward low pressure", "Stop Coriolis existing", "Blow only at night"], 1, "Slower wind → weaker Coriolis → PGF pulls across the isobars."),
      q("Coriolis is zero at…", ["The poles", "The equator", "London", "The tropopause only"], 1, "No deflection at the equator. Maximum at the poles."),
    ],
    why: [
      "Met Office isobars are this lab printed on a chart. A UK depression approaching London, a Great Plains nocturnal jet arguing with friction, and a Denver lee trough are the same three ideas: pressure-gradient force, Coriolis, friction. GCSE wants the names and the spin. A-level wants geostrophic balance and why surface winds cut across isobars toward low. NGSS wants a rotating Earth that deflects, not a magic force in the room. If pupils think Coriolis swirls a sink, they will never trust a weather chart. If they skip friction, they will never see why air piles into a low at the ground. Start downhill on the pressure slope. Then twist. Then slow it. Florida’s latitude still has Coriolis; a playground sea breeze does not need it. Scale first, then the keys.",
      "Air starts because pressure is uneven: the pressure-gradient force (PGF) points from high to low, downhill on the pressure surface. With no rotation and no friction, flow would run straight down that slope. We measure on a rotating Earth, so the path appears to deflect: right of the motion in the northern hemisphere, left in the southern. That apparent deflection is Coriolis. It is zero at the equator and largest at the poles. It is not a force you can point at in the room, and it does not run a bathroom sink; basin scale is too small, weather systems are large enough. Geostrophic wind is PGF balanced by Coriolis with friction neglected, flow along the isobars. Near the ground, friction slows the wind. Weaker wind means weaker Coriolis, so PGF wins a bit and the surface flow cuts across isobars toward low. That is why lows fill from below and why a UK surface chart is not a replica of the 500 hPa chart. Toggle Southern hemisphere and the deflection flips. Toggle Friction and the arrows bite toward the low. Leave Coriolis off once so the class sees the naked slope.",
      "Toggle Coriolis off first so PGF is the only arrow. Space plays the flow. Arrow keys nudge time. L hides labels; ask which way is downhill before you reveal. R resets Coriolis, friction, and hemisphere. P is projector. Then Coriolis on, then Southern hemisphere, then Friction. Time is not a year clock; the drive is the three toggles and a pause for the geostrophic pair. Share the URL when the surface arrows cut across isobars, and again with friction off so the textbook balance is a link the class can reopen.",
      "If JavaScript or WebGL dies, the 2D fallback still shows high, low, and isobars. Teach from the steps: PGF downhill, Coriolis on, friction across the isobars. Check still names PGF, northern-hemisphere deflection, friction, and the equator. Print the teacher script. The glossary still carries geostrophic wind and Buys Ballot’s law. You lose the moving arrows, not the sink-scale warning. A printed Met Office chart can stand in for the canvas; point downhill, then right, then across the isobars toward low.",
    ],
    glossary: [
      { term: "Coriolis", def: "Apparent deflection because we measure on a rotating Earth. Right in NH, left in SH. Zero at the equator." },
      { term: "PGF", exam: "Pressure-gradient force", def: "Force from high to low pressure, downhill on the pressure surface." },
      { term: "Geostrophic wind", def: "PGF balanced by Coriolis. Friction neglected. Flow along the isobars." },
      { term: "Friction", def: "Surface drag that slows the wind, weakens Coriolis, and lets PGF pull across isobars toward low." },
      { term: "Isobar", def: "A line of equal pressure on a chart. Tight packing means a steep PGF." },
      { term: "Buys Ballot’s law", def: "In the northern hemisphere, with your back to the wind, low pressure is on the left. School rule of thumb." },
      { term: "Pressure gradient", def: "How pressure changes with distance. Steep gradient, strong PGF, strong wind." },
    ],
    misconception: {
      claim: "Coriolis makes water swirl in a sink.",
      truth: "Basin scale is too small. Weather systems are large enough. Sinks are not.",
    },
    misconceptions: [
      {
        claim: "Coriolis makes water swirl in a sink.",
        truth: "Basin scale is too small. Weather systems are large enough. Sinks are not.",
      },
      {
        claim: "Coriolis is a real force you can point at in the room.",
        truth: "It is an apparent deflection because we measure on a rotating Earth. You cannot hang a label on a bit of air and call it Coriolis.",
      },
      {
        claim: "Friction makes the wind faster.",
        truth: "Friction slows the wind. Weaker Coriolis then lets PGF pull the surface flow across isobars toward low.",
      },
    ],
    cases: [
      { slug: "uk-sea-breeze", label: "Met Office isobars" },
      { slug: "time-zones-us", label: "US Great Plains" },
    ],
    teacher: {
      script:
        "Toggle Coriolis off. PGF only: high to low, straight down the pressure slope.\nToggle Coriolis on. In the northern hemisphere the path deflects right.\nToggle Southern hemisphere. Deflection flips left.\nCoriolis is an apparent deflection because we measure on a rotating Earth. You cannot point at it in the room.\nToggle Friction on. Surface flow cuts across isobars toward low.\nGeostrophic is PGF versus Coriolis with friction neglected. Ask which arrow a textbook pair is missing.\nCoriolis does not make water swirl in a sink. Basin scale is too small.\nWeather systems are large enough. Sinks are not.\nCoriolis is zero at the equator and largest at the poles. London feels it; a washbasin does not.\nFinish in Check.",
      pitfalls: [
        "Coriolis as a real force you can point at in the room.",
        "NH vs SH mix-up.",
        "Sinks and toilets as evidence.",
        "Teaching friction as something that speeds the wind.",
      ],
    },
    sources: [{ label: "Met Office charts" }, { label: "NOAA jet stream" }],
    controls: {
      time: "none",
      toggles: [
        { key: "coriolis", label: "Coriolis", defaultOn: true },
        { key: "friction", label: "Friction" },
        { key: "sh", label: "Southern hemisphere" },
      ],
    },
  }),
  lab({
    slug: "three-cell",
    title: "Three-cell circulation",
    hook: "One cell would be the textbook. Three cells are the planet we have.",
    objective: "Toggle 1-cell vs 3-cell, name Hadley / Ferrel / Polar, and watch the ITCZ walk with the seasons.",
    realm: "atmosphere",
    ages: ["GCSE", "A-level", "NGSS MS", "APES"],
    curriculum: ["GCSE weather", "A-level", "NGSS HS-ESS2-4", "APES 4.5"],
    steps: steps(
      "One cell: hot equator rise, pole sink. Too simple for a spinning planet.",
      "Three cells. Hadley, Ferrel, Polar. Play a year: ITCZ walks.",
      "Hadley is the tropical loop. Ferrel is the midlatitude indirect cell. Polar is the high-latitude loop. ITCZ is the meeting of the trades.",
    ),
    questions: [
      q("The Hadley cell has rising air near…", ["The poles", "The equator / ITCZ", "London only", "The ocean floor"], 1, "Warm, moist rise near the thermal equator."),
      q("The ITCZ walks because…", ["The Moon", "The subsolar latitude shifts with tilt through the year", "Tides", "Time zones"], 1, "Seasons move the heat. West African rains follow."),
      q("Ferrel cell is called indirect because…", ["It does not exist.", "It is driven by the cells either side, not just by local heating.", "It only works at night.", "It is underground."], 1, "School model. Real midlatitudes are stormier than a clean loop."),
      q("A 1-cell planet fails mainly because…", ["There is no Sun.", "Rotation (Coriolis) breaks the single loop into cells.", "Oceans freeze instantly.", "Albedo is 1."], 1, "Spin plus the size of Earth."),
    ],
    why: [
      "ITCZ and West African rains, the Florida wet season, and a UK westerly year are this walk. One cell would send rise at the equator and sink at the pole; London would sit in a steady polar northerly and Florida would never see a season in the rain. Three cells are the planet we have: Hadley in the tropics, Ferrel in the midlatitudes, Polar at high latitude. GCSE names the cells. A-level and APES need the ITCZ as a moving rainband, not a painted equator. If pupils think the equator is always the wettest place, fixed, they will misread a June Florida convective afternoon and a January UK chart in the same breath. Play a year. Watch the thermal equator walk. Then put the UK in the Ferrel story, not in Hadley.",
      "On a non-rotating planet a single thermally direct cell could run from equator to pole. Earth rotates, Coriolis breaks that loop, and the school model is three cells each side of the equator. Hadley: rise near the thermal equator (ITCZ), poleward aloft, sink in the subtropics, return as the trades. Ferrel: the midlatitude indirect cell, driven more by the cells and the eddies either side than by local heating alone; real midlatitudes are storm tracks, not a clean classroom loop. Polar: rise near 60°, sink at the pole. The ITCZ is where the trades meet and air rises; it walks with the subsolar latitude through the year, so rain follows heat. Florida’s wet season is that walk in one peninsula. West African rains are the same walk on another coast. The UK sits in westerlies under the Ferrel story, not in Hadley; do not draw three equal cells, and do not park London on the equator. Toggle Three cells off to show the failed 1-cell planet, then on again. Play a year so the ITCZ is a traveller, not a tattoo.",
      "Toggle Three cells off for the 1-cell planet, then on. Space plays a year so the ITCZ walks. Arrow keys scrub the seasons; freeze on a solstice and ask where the rain went. L hides labels; make them name Hadley, Ferrel, Polar. R resets the year and the toggle. P is projector. This lab has a year clock: 1× 2× 4× if you need a faster walk. Share the URL on a June ITCZ over Florida’s latitude, then again in December, so the walk is a pair of links not a hand wave.",
      "If JavaScript or WebGL dies, the 2D fallback still shows the three loops. Teach from the steps: 1-cell failure, three names, ITCZ walks with the year. Check still asks where Hadley rises, why the ITCZ walks, why Ferrel is indirect, and why one cell fails. Print the teacher script. The glossary still names trades, subtropical high, and westerlies. You lose the globe tour, not the reason Florida wet season and UK westerlies are different cells. A board sketch of three loops can stand in for the year walk.",
    ],
    glossary: [
      { term: "Hadley cell", def: "Tropical thermally direct cell. Rise near the ITCZ, sink in the subtropics." },
      { term: "Ferrel cell", def: "Midlatitude cell, indirect in the school model, driven by the cells and storms either side." },
      { term: "Polar cell", def: "High-latitude cell. Rise near 60°, sink at the pole." },
      { term: "ITCZ", exam: "Intertropical convergence zone", def: "Belt where the trades meet and air rises. Walks with the seasons." },
      { term: "Trade winds", def: "Surface return of the Hadley cell, toward the ITCZ, deflected by Coriolis." },
      { term: "Subtropical high", def: "Belt of sinking air on the poleward side of Hadley. Deserts often sit under it." },
      { term: "Thermal equator", def: "Latitude of strongest heating, not always 0°. The ITCZ follows it." },
      { term: "Westerlies", def: "Midlatitude west-to-east winds. The UK’s usual steering, under the Ferrel story." },
    ],
    misconception: {
      claim: "The equator is always the wettest place, fixed.",
      truth: "The rain follows the ITCZ, which walks with the seasons.",
    },
    misconceptions: [
      {
        claim: "The equator is always the wettest place, fixed.",
        truth: "The rain follows the ITCZ, which walks with the seasons.",
      },
      {
        claim: "The UK sits in the Hadley cell.",
        truth: "Hadley is tropical. The UK’s westerlies live in the midlatitude Ferrel story, storm tracks included.",
      },
      {
        claim: "The three cells are equal in size and equally clean.",
        truth: "Hadley is the big thermally direct loop. Ferrel is indirect and stormy. Do not draw three matching doughnuts.",
      },
    ],
    cases: [
      { slug: "florida-insolation", label: "Florida wet season" },
      { slug: "uk-daylength", label: "ITCZ and seasons" },
    ],
    teacher: {
      script:
        "Toggle Three cells off. One cell: hot equator rise, pole sink.\nAsk why UK westerlies would not exist on that planet.\nToggle Three cells on. Name Hadley, Ferrel, Polar.\nPlay a year. The ITCZ walks with the subsolar latitude.\nThe equator is not always the wettest place, fixed. Rain follows the ITCZ.\nThat is the misconception.\nHadley is the tropical loop. Ferrel is the midlatitude indirect cell. Polar is the high-latitude loop.\nDo not draw three equal cells. Do not put the UK in the Hadley cell.\nWest African rains and the Florida wet season are this walk.\nFinish in Check.",
      pitfalls: [
        "Drawing three equal cells.",
        "Putting the UK in the Hadley cell.",
        "Teaching the ITCZ as a painted line on the equator.",
        "Selling Ferrel as a clean thermally direct loop.",
      ],
    },
    sources: [{ label: "NOAA circulation" }, { label: "Met Office tropical weather" }],
    controls: {
      time: "year",
      toggles: [{ key: "three", label: "Three cells", defaultOn: true }],
    },
  }),
  lab({
    slug: "fronts",
    title: "Fronts as wedges",
    hook: "A cold front is a wedge, not a line on a TV map.",
    objective: "Distinguish warm, cold, and occluded fronts as 3D wedges with cloud and rain symbols.",
    realm: "atmosphere",
    ages: ["KS3", "GCSE", "NGSS MS"],
    curriculum: ["KS3", "GCSE weather", "NGSS MS-ESS2-5"],
    steps: steps(
      "Cold wedge undercuts. Warm wedge overruns. Clouds sit on the slope.",
      "Play the midlatitude system. Occlusion when the cold catches the warm.",
      "A front is a boundary with a slope. The map line is the surface trace.",
    ),
    questions: [
      q("A cold front is…", ["A vertical wall of cold", "A wedge of colder air undercutting warmer air", "A hurricane eye", "A sea breeze only"], 1, "Dense cold air makes a steep wedge. Rain often narrow and showery."),
      q("A warm front typically has…", ["A steeper wedge than cold", "A gentler slope, cloud thickening ahead", "No clouds", "Only snow"], 1, "Warm air rides up. Rain can be longer, lighter."),
      q("Occlusion means…", ["The Sun is blocked forever", "Cold front catches the warm front; warm air is lifted off the surface", "High pressure at the equator", "A tornado"], 1, "The comma tail of a mature midlatitude cyclone."),
      q("The line on a Met Office chart is…", ["The whole front, vertical from ground to space", "The surface trace of a sloping wedge; the weather sits on the slope", "A painted television graphic with no height", "Only valid in Florida"], 1, "The map is a cut at the ground. Clouds and rain are on the slope."),
    ],
    why: [
      "UK midlatitude fronts and a US Midwest squall share the wedge idea, not the violence. A Met Office chart approaching London is a set of surface traces; the weather is on the slope above them. GCSE wants cold, warm, and occluded named and drawn. NGSS wants a boundary with height, not a felt-tip line. If pupils think a front is painted on the television, they will never put cloud ahead of a warm front or a narrow shower on a cold wedge, and they will call every UK rainband a hurricane. Build the wedge. Sit the rain on the slope. Then contrast a quiet UK warm front with a Midwest squall so the class keeps the geometry and drops the cinema.",
      "A front is a sloping boundary between air masses. The map line is where that wedge meets the ground: the surface trace. Dense cold air undercuts; the cold-front wedge is steep, so ascent is sharp and rain is often narrow and showery. Warm air overruns; the warm-front slope is gentler, so cloud thickens ahead and rain can be longer and lighter. Between them sits the warm sector. Occlusion is the cold front catching the warm front so the warm air is lifted off the surface: the comma tail of a mature midlatitude cyclone, not a tropical eyewall. A UK winter depression approaching London is this machine. A US Midwest squall can be a violent cold-front cousin; Sandy is a hybrid caution, not a reason to brand every UK rainband a hurricane. Do not teach fronts only as symbols on a key. Do not draw a vertical wall. Clouds sit on the slope because that is where the air is lifted. Play the system so occlusion is a catch, not a vocabulary word. A sea-breeze front is a tiny cousin of the same idea, kilometres not a depression.",
      "Space plays the midlatitude system so the cold wedge can catch the warm. Arrow keys freeze the occlusion for the board. L hides labels; ask where the rain sits before you reveal the slope. R resets the wedges. P is projector. Time is a process clock, not a year; the drive is Space to play, arrows to scrub, and a pause on the comma tail. Share the URL when the rainband sits on the cold slope, then again at occlusion, so the catch is a link the class can reopen after the bell.",
      "If JavaScript or WebGL dies, the 2D fallback still shows a wedge and a map line. Teach from the steps: cold undercuts, warm overruns, occlusion when the cold catches the warm. Check still names the steep wedge, the gentle slope, the catch, and the surface trace. Print the teacher script. The glossary still carries warm sector, surface trace, and squall line. You lose the 3D rainband, not the reason a Met Office line is not a wall. A paper cross-section of two wedges can stand in for the canvas; sit the cloud on the slope, not on the ink.",
    ],
    glossary: [
      { term: "Cold front", def: "Leading edge of colder air. Steeper wedge. Rain often narrow and showery." },
      { term: "Warm front", def: "Leading edge of warmer air. Gentler slope. Cloud thickening ahead." },
      { term: "Occlusion", exam: "Occluded front", def: "Cold front catching a warm front; warm air lifted off the surface." },
      { term: "Warm sector", def: "The milder air between the warm front and the cold front in a midlatitude cyclone." },
      { term: "Surface trace", def: "Where the sloping front meets the ground. The line on the chart." },
      { term: "Air mass", def: "A large body of air with fairly even temperature and humidity, sitting on a source region." },
      { term: "Squall line", def: "A narrow, often violent band of convection, commonly along or ahead of a cold front." },
    ],
    misconception: {
      claim: "A front is a painted line.",
      truth: "The line is where the wedge meets the ground. The weather is on the slope.",
    },
    misconceptions: [
      {
        claim: "A front is a painted line.",
        truth: "The line is where the wedge meets the ground. The weather is on the slope.",
      },
      {
        claim: "A cold front is a vertical wall of cold.",
        truth: "It is a steep wedge. Dense air undercuts. Rain sits on the slope, often narrow and showery.",
      },
      {
        claim: "Every UK rainband is a hurricane.",
        truth: "A midlatitude front is a different machine from a tropical eyewall. Share the wedge idea, not the violence.",
      },
    ],
    cases: [
      { slug: "uk-sea-breeze", label: "UK midlatitude front" },
      { slug: "katrina-sandy", label: "US Midwest squall / Sandy contrast" },
    ],
    teacher: {
      script:
        "Build the cold wedge. Dense cold air undercuts. The slope is steep.\nAsk where the rain is. It sits on the slope, often narrow and showery.\nThen the warm wedge. Gentler slope, cloud thickening ahead.\nA front is not a painted line on a television map. The line is the surface trace.\nThe weather is on the slope. That is the misconception.\nPlay the midlatitude system. Occlusion when the cold catches the warm.\nWarm air is lifted off the surface. That is the comma tail of a mature cyclone.\nUK midlatitude fronts and a US Midwest squall share the wedge idea, not the violence.\nDo not call every UK rainband a hurricane.\nFinish in Check.",
      pitfalls: [
        "Teaching fronts only as symbols.",
        "Calling every UK rainband a hurricane.",
        "Drawing a cold front as a vertical wall.",
        "Putting all the weather on the map line instead of on the slope.",
      ],
    },
    sources: [{ label: "Met Office fronts" }, { label: "NOAA weather systems" }],
    controls: { time: "none" },
  }),
  lab({
    slug: "cyclone-anticyclone",
    title: "Cyclone and anticyclone",
    hook: "A midlatitude cyclone is a spinning comma of fronts, not a hurricane.",
    objective: "Contrast a NH cyclone (anticlockwise, low) with an anticyclone (clockwise, high), and attach fronts to the low.",
    realm: "atmosphere",
    ages: ["KS3", "GCSE", "NGSS MS"],
    curriculum: ["KS3", "GCSE weather", "NGSS MS-ESS2-5"],
    steps: steps(
      "Low in the middle, isobars, anticlockwise in NH. Fronts on the comma.",
      "Toggle anticyclone: high, clockwise, sinking, often clearer.",
      "Names: depression / cyclone vs anticyclone. Tropical cyclones are a later lab.",
    ),
    questions: [
      q("In the northern hemisphere a midlatitude cyclone spins…", ["Clockwise", "Anticlockwise", "Not at all", "Only vertically"], 1, "In toward the low, deflected right → anticlockwise."),
      q("An anticyclone is associated with…", ["A surface low and rising air", "A surface high and sinking air, often clearer skies", "Always a hurricane", "The ITCZ only"], 1, "Sink, compress, warm, dry. Not a guarantee of sunshine in a British winter fog."),
      q("A UK winter depression is…", ["A tropical cyclone", "A midlatitude cyclone with fronts", "An anticyclone", "A sea breeze"], 1, "Different machine from a hurricane."),
      q("Clockwise surface flow around a high in the northern hemisphere is…", ["A midlatitude cyclone", "An anticyclone: high, sinking, often clearer", "A hurricane eye", "Only a UK sea breeze"], 1, "High, clockwise in NH. The low is the other way."),
    ],
    why: [
      "Do not call a UK windy day a hurricane unless the Met Office does. A winter depression approaching London is a midlatitude cyclone: a low, a comma of fronts, anticlockwise in the northern hemisphere. An anticyclone is the other machine: high, clockwise, sinking, often clearer, and still able to sit a freezing fog over a British morning. Sandy is a hybrid caution, not a licence to mix the words. GCSE wants depression versus anticyclone and the spin. NGSS wants low versus high and why one rains. Phoenix heat is not this lab; Florida’s hurricane is a later engine. If pupils hear cyclone and see an eyewall, they will misread every Met Office chart. Name the family. Then name the member.",
      "In the northern hemisphere, air flows in toward a surface low and Coriolis deflects it right, so the cyclone spins anticlockwise. Fronts attach to that low as a comma: warm front, cold front, then occlusion as the system matures. That is a midlatitude cyclone, a depression in UK exam language, extra-tropical in adult charts. It is not a tropical cyclone. Tropical cyclones have an eye and an eyewall and live on warm ocean; they are a later lab. Toggle anticyclone and the centre is a high: air sinks, compresses, warms, and dries, so skies are often clearer, and the NH spin is clockwise. Sinking is not a guarantee of sunshine in a British winter anticyclone; fog and stratus can sit under the lid. Southern-hemisphere spin flips; do not mix the diagrams. Ask which one rains. The low, usually, if the fronts are working. A UK sea breeze is a local thermal loop, not a cyclone. Phoenix heat is a budget story, not a spinning comma. Keep the word cyclone as the family, then attach midlatitude or tropical so the third row cannot swap the machines.",
      "Leave Anticyclone off to start. Space plays the comma so the fronts rotate with the low. Arrow keys freeze a spoke for the board. L hides labels; ask for spin before you reveal. R resets the toggle. P is projector. Toggle Anticyclone on for the high, clockwise, sinking story, then off again so the depression is the default. Time is a process clock, not a year. Share the URL on the low, then on the high, and do not leave both stories unnamed when the class walks out.",
      "If JavaScript or WebGL dies, the 2D fallback still shows a low and a high. Teach from the steps: anticlockwise comma with fronts, then the anticyclone. Check still names northern-hemisphere spin, sinking under a high, and why a UK depression is not a hurricane. Print the teacher script. The glossary still carries depression, comma cloud, and extra-tropical. You lose the rotating comma, not the vocabulary. A Met Office chart can stand in for the canvas; point at the low, then at the high, and refuse the word hurricane unless it is earned.",
    ],
    glossary: [
      { term: "Cyclone", def: "Low-pressure system. Midlatitude: fronts. Tropical: eye and eyewall, a later lab." },
      { term: "Anticyclone", def: "High-pressure system. Sinking air, often clearer, not a sunshine guarantee in winter fog." },
      { term: "Depression", def: "UK exam name for a midlatitude cyclone." },
      { term: "Convergence", def: "Air flowing together. At a surface low it feeds rise." },
      { term: "Divergence", def: "Air spreading apart. Aloft over a low, or at the surface of a high." },
      { term: "Comma cloud", def: "The satellite signature of a mature midlatitude cyclone, fronts on the tail." },
      { term: "Extra-tropical", def: "Outside the tropics. A midlatitude depression is extra-tropical; a hurricane is not." },
    ],
    misconception: {
      claim: "Cyclone means hurricane.",
      truth: "Cyclone is the family. Tropical cyclone is one member. Midlatitude depressions are another.",
    },
    misconceptions: [
      {
        claim: "Cyclone means hurricane.",
        truth: "Cyclone is the family. Tropical cyclone is one member. Midlatitude depressions are another.",
      },
      {
        claim: "High pressure always means sunshine.",
        truth: "Sink, compress, warm, dry: often clearer. A British winter anticyclone can still sit fog and stratus under the lid.",
      },
      {
        claim: "Northern- and southern-hemisphere cyclones spin the same way.",
        truth: "NH cyclone anticlockwise, SH cyclone clockwise. Flip the hemisphere and the diagram must flip.",
      },
    ],
    cases: [
      { slug: "uk-sea-breeze", label: "UK depression" },
      { slug: "katrina-sandy", label: "Sandy as a hybrid caution" },
    ],
    teacher: {
      script:
        "Leave Anticyclone off. Low in the middle, isobars, anticlockwise in the northern hemisphere.\nAttach the fronts on the comma. This is a midlatitude cyclone, a depression.\nCyclone does not mean hurricane. That is the misconception.\nCyclone is the family. Tropical cyclone is one member. Midlatitude depressions are another.\nToggle Anticyclone on. High, clockwise in the northern hemisphere, sinking, often clearer.\nSink, compress, warm, dry. Not a guarantee of sunshine in a British winter fog.\nAsk which one rains. The low, usually, if the fronts are working.\nA UK winter depression is this machine, not an eyewall.\nDo not mix northern- and southern-hemisphere spin. Names matter more than the word cyclone alone.\nFinish in Check.",
      pitfalls: [
        "NH/SH spin mix-up.",
        "One word ‘cyclone’ for two machines.",
        "Promising sunshine under every anticyclone.",
        "Calling a UK gale a hurricane without the Met Office.",
      ],
    },
    sources: [{ label: "Met Office depressions" }, { label: "NOAA extra-tropical" }],
    controls: {
      time: "none",
      toggles: [{ key: "anti", label: "Anticyclone" }],
    },
  }),
  lab({
    slug: "climate-types",
    title: "Climate types",
    hook: "Köppen is a map of plants pretending to be a map of weather. The tiles are biomes with a temperature–rain story.",
    objective: "Match a Köppen letter to a simple 3D biome and say what temperature and rainfall are doing.",
    realm: "atmosphere",
    ages: ["KS3", "GCSE", "NGSS MS", "APES"],
    curriculum: ["GCSE climate", "NGSS MS-ESS2-6", "APES 4.7"],
    steps: steps(
      "Orbit the globe of biome tiles. A is tropical, B dry, C temperate, D continental, E polar.",
      "Select a tile. The 3D biome on the bench is that climate, not a postcard.",
      "Köppen is a classification, not a forecast. Boundaries are fuzzy. Mountains punch holes in the map.",
    ),
    questions: [
      q("Köppen A climates are…", ["Polar ice", "Tropical, no real winter", "Deserts only", "Tundra"], 1, "Warm all year. Rain amount splits rainforest from savanna."),
      q("A B climate is dry because…", ["It is always cold", "Evaporation can beat rainfall — desert and steppe", "It sits on a mid-ocean ridge", "The Moon"], 1, "Hot deserts and cold deserts both live here."),
      q("London is roughly…", ["Af rainforest", "Cfb — temperate, no dry season, warm summer", "ET tundra", "BW Sahara"], 1, "School map, not a street-by-street verdict."),
      q("Why is Köppen useful in this lab?", ["It predicts next Tuesday", "It ties climate to biomes you can picture", "It replaces plates", "It is a tide table"], 1, "Plants are a slow rain-and-temperature instrument."),
    ],
    why: [
      "Florida wet season versus UK Cfb versus Arizona BWh are the same legend with different tiles. London is roughly Cfb: temperate, no dry season, warm summer. Phoenix sits in a hot dry B climate where evaporation can beat rain. Florida’s humid tropical edge is an A-story with a wet season, not a postcard. GCSE climate and APES both need a map that is not a colouring book: letters tied to temperature and rainfall, then to a biome you can picture. If pupils think climate is the weather this week, one hot July makes the UK tropical and one Phoenix storm makes a rainforest. Köppen classifies the longer pattern. Weather is the day. Hold both sentences, then walk Cairngorm altitude as a hole punched in the London tile.",
      "Köppen letters start with a temperature family: A tropical, no real winter; B dry, where evaporation can beat rainfall; C temperate; D continental, hard winter; E polar. Second letters split rain: f no dry season, w dry winter, s dry summer, W desert, S steppe. London Cfb is mild, wet-enough all year, warm summer, not a Mediterranean Cs and not an Af rainforest. Phoenix BWh is hot desert. Florida’s peninsula runs humid subtropical toward tropical, with a wet season that is an ITCZ-and-convection story, not a Köppen forecast of next Tuesday. Plants are a slow rain-and-temperature instrument, which is why the globe is tiled with biomes: rainforest, desert, temperate forest, grassland, tundra. Boundaries are fuzzy. Mountains and coasts punch holes in the map. A Cairngorm plateau is not London’s Cfb written larger; altitude and snow change the tile. Denver’s mile-high steppe-edge is another hole. Köppen is a classification, not law at a school field, and not a GCM. Scrub the biome slider. For each tile ask rain or temperature first, then name the letter. One hot week does not move London into A.",
      "Orbit the globe of tiles. Space is quiet here; the drive is the Biome slider, 0 to 4, plus the keys the rest of TerraLens already taught. Arrow keys still nudge time if anything is walking. L hides labels; cover the letter and make them name tropical, dry, temperate, continental, polar. R resets the slider. P is projector. Click through London, Phoenix, a polar tile. Share the URL on Cfb, then on BWh, and ask what rain and temperature are doing before you reveal the postcard.",
      "If JavaScript or WebGL dies, the 2D fallback still shows the tiles. Teach from the steps: A to E, then one biome on the bench, then classification not forecast. Check still asks what A is, why B is dry, what London is, and why Köppen is useful. Print the teacher script. The glossary still names Cfb, BWh, and continentality. You lose the 3D biome, not the reason one hot July does not make the UK tropical. A printed Köppen map can stand in for the globe; point at London, Phoenix, and Florida, and refuse the postcard.",
    ],
    glossary: [
      { term: "Köppen", def: "A climate classification using temperature and precipitation, often mapped to biomes." },
      { term: "Biome", def: "A large-scale living landscape (rainforest, desert, tundra) written by climate plus more." },
      { term: "Cfb", def: "Temperate, no dry season, warm summer. London’s usual school letter, not a street verdict." },
      { term: "BWh", def: "Hot desert. Evaporation beats rainfall. Phoenix / Arizona desert in the school map." },
      { term: "Af", def: "Tropical rainforest. No real winter, no dry season." },
      { term: "Continentality", def: "How much a place’s temperature range is set by inland position rather than ocean." },
      { term: "Climate", def: "The longer pattern of temperature and rain. Weather is the day." },
    ],
    misconception: {
      claim: "Climate is the weather this week.",
      truth: "Climate is the longer pattern. Weather is the day. Köppen classifies the pattern.",
    },
    misconceptions: [
      {
        claim: "Climate is the weather this week.",
        truth: "Climate is the longer pattern. Weather is the day. Köppen classifies the pattern.",
      },
      {
        claim: "The UK is tropical because one July is hot.",
        truth: "London is roughly Cfb. One hot week does not move the letter. Climate is the pattern, not the headline.",
      },
      {
        claim: "Köppen boundaries are sharp lines on the ground.",
        truth: "Boundaries are fuzzy. Mountains, coasts, and altitude punch holes. Not law at a school field.",
      },
    ],
    cases: [
      { slug: "florida-insolation", label: "Florida tropical / humid" },
      { slug: "uk-daylength", label: "UK temperate" },
    ],
    teacher: {
      script:
        "Name A to E: tropical, dry, temperate, continental, polar.\nScrub the Biome slider. Each tile is a climate with a 3D biome on the bench, not a postcard.\nClick through London, Nairobi, Phoenix, a polar tile. For each, ask rain or temperature first.\nClimate is not the weather this week. Köppen classifies the longer pattern.\nThat is the misconception.\nLondon is roughly Cfb: temperate, no dry season, warm summer. One hot July does not make the UK tropical.\nBoundaries are fuzzy. Mountains and coasts punch holes in the map.\nKöppen is a classification, not a forecast and not law at a school field.\nPlants are a slow rain-and-temperature instrument.\nFinish in Check.",
      pitfalls: [
        "Treating the map as law at a school field.",
        "Calling the UK tropical because one July is hot.",
        "Teaching weather this week as climate.",
        "Drawing Köppen boundaries as fences on the playground.",
      ],
    },
    sources: [{ label: "Köppen–Geiger maps (Beck et al.)" }, { label: "Met Office UK climate" }],
    controls: {
      time: "none",
      extra: [{ key: "biome", label: "Biome", min: 0, max: 4, step: 1, default: 2 }],
    },
  }),
];
