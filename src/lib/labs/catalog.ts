import type { LabMeta, RealmMeta } from "./types";
import { ATMOSPHERE_LABS } from "./labs-atmosphere";
import { HAZARD_LABS } from "./labs-hazards";
import { INTERIOR_LABS } from "./labs-interior";
import { LANDFORM_LABS } from "./labs-landforms";
import { PLANET_LABS } from "./labs-planet";
import { SKILL_LABS } from "./labs-skills";
import { SOIL_LABS } from "./labs-soils";
import { WATER_LABS } from "./labs-water";
import { WAVE6_LABS } from "./labs-wave6";

export const REALMS: RealmMeta[] = [
  {
    slug: "planet",
    title: "Planet",
    kicker: "Motion of a tilted sphere",
    blurb: "Rotation, revolution, seasons, and the Moon. The clockwork that makes day, night, and the calendar.",
  },
  {
    slug: "interior",
    title: "Interior & Plates",
    kicker: "A layered, restless shell",
    blurb: "Crust to inner core, then the plates that carry continents. Boundaries write mountains, trenches, and faults.",
  },
  {
    slug: "atmosphere",
    title: "Atmosphere",
    kicker: "Air as a heat engine",
    blurb: "Layers, insolation, wind, cells, fronts, and storms. The film of air that writes weather.",
  },
  {
    slug: "water",
    title: "Water & Carbon",
    kicker: "Stores, flows, and time",
    blurb: "The water cycle as a closed budget. Reservoirs, transfers, and a basin you can drain.",
  },
  {
    slug: "landforms",
    title: "Landforms",
    kicker: "Water carving rock",
    blurb: "Rivers from source to mouth, then coasts, ice, karst, and folds. Landforms you can orbit.",
  },
  {
    slug: "soils",
    title: "Soils & Rocks",
    kicker: "The skin of the land",
    blurb: "Rock cycle, soil profile, texture triangle, weathering, and erosion. The skin of the land, in 3D.",
  },
  {
    slug: "hazards",
    title: "Hazards",
    kicker: "Sudden Earth",
    blurb: "Quakes, volcanoes, tsunami, tropical cyclones. Sudden Earth, drawn as a process.",
  },
  {
    slug: "skills",
    title: "Skills",
    kicker: "Read the map, then the hill",
    blurb: "Contours, graticule, projections, and grid references. The classroom skill behind the map paper.",
  },
];

const CORE_LABS: LabMeta[] = [
  {
    slug: "seasons",
    title: "Why seasons happen",
    hook: "In December, London is dark by late afternoon while Sydney is in high summer. The Earth is not closer to the Sun in July.",
    objective:
      "Explain seasons using axial tilt, not distance from the Sun, and predict which hemisphere is in summer on a given date.",
    realm: "planet",
    ages: ["KS3", "GCSE", "NGSS MS", "APES"],
    curriculum: [
      "KS3 Earth and atmosphere",
      "GCSE background",
      "NGSS MS-ESS1-1",
      "APES 4.7 Solar radiation and Earth’s seasons",
    ],
    steps: [
      {
        id: "observe",
        title: "Observe",
        body: "Play a year at 23.44°. Watch the terminator walk the globe and the marked cities. London and Sydney are never in the same season.",
      },
      {
        id: "tinker",
        title: "Tinker",
        body: "Set tilt to 0°. The terminator stops its seasonal walk. Then try 35° and scrub June versus December.",
      },
      {
        id: "explain",
        title: "Explain",
        body: "Tilt keeps the same orientation as Earth orbits. June: northern hemisphere leans toward the Sun. December: the opposite. Distance is the common misconception.",
      },
      {
        id: "check",
        title: "Check",
        body: "Four questions. Instant feedback. Not a score-gate.",
      },
    ],
    questions: [
      {
        prompt: "What would happen to seasons if axial tilt were 0°?",
        choices: [
          "Seasons would reverse: June would be winter in London.",
          "Almost no seasons: day length and noon Sun height would stay nearly constant at each latitude.",
          "Seasons would get stronger because the orbit would become more elliptical.",
          "The equator would freeze and the poles would heat up.",
        ],
        answer: 1,
        explain:
          "With no tilt, every latitude keeps a nearly fixed day length and solar altitude. The small remaining change is orbital eccentricity, which is not what we mean by seasons.",
      },
      {
        prompt: "Why is December summer in Sydney?",
        choices: [
          "Australia is closer to the Sun in December.",
          "The southern hemisphere is tilted toward the Sun in December.",
          "Ocean currents reverse in December.",
          "The Moon pulls the southern oceans toward the Sun.",
        ],
        answer: 1,
        explain:
          "In December the South Pole leans toward the Sun. Sydney gets higher noon Sun and longer days. London gets the opposite.",
      },
      {
        prompt:
          "Earth is slightly nearer the Sun in early January. Does that cause northern winter?",
        choices: [
          "Yes — closer means colder because of faster orbit.",
          "Yes — perihelion always means winter.",
          "No. Perihelion is in January, but northern winter is a tilt effect. The southern hemisphere is in summer then.",
          "No, because January is actually aphelion.",
        ],
        answer: 2,
        explain:
          "Perihelion is early January, a 3% extra insolation globally. If distance caused seasons, both hemispheres would have summer together. They do not.",
      },
      {
        prompt:
          "At the equator, how do day length and solar altitude change through the year compared with London?",
        choices: [
          "The equator has polar night in June.",
          "Day length stays near 12 hours; noon Sun stays high, shifting only with the 23.44° declination. London’s day length swings from about 8 to 16 hours.",
          "They change the same way; only temperature differs.",
          "The equator has no noon Sun in December.",
        ],
        answer: 1,
        explain:
          "Equatorial day length is always close to 12 hours. Solar altitude stays high. Mid-latitude places like London swing hard in both day length and noon altitude.",
      },
    ],
    why: [
      "Leeds in December is dark by late afternoon. Miami still has a high noon Sun. Same star, same calendar month. The difference is latitude on a 23.44° axis, not a closer orbit. UK horticulture, Scottish day length, and a Californian winter greenhouse all run on this geometry. Fieldwork in Snowdonia in June is long light; the same slope in December is a short, low Sun. Florida growers care about hours above a useful incidence angle — the same number UK glasshouses plot on a yield curve. A Lerwick December is shorter still. If a class blames July closeness, they will misread every OS day-length graph and every USGS insolation map they meet next.",
      "Earth’s spin axis keeps nearly the same direction as the planet goes around the Sun. June: the northern hemisphere leans toward the Sun, so London’s noon Sun is high and the day is long. December: the opposite. What moves: the planet’s place on the orbit, and which hemisphere is leaned toward the lamp. What does not: the axis’s aim, near Polaris, over one year. What is conserved: the 23.44° lean, and a nearly circular orbit. Distance to the Sun is the trap. Perihelion — nearest the Sun — falls in early January, during northern winter. If distance caused seasons, London and Sydney would share summer. They do not. The small extra insolation at perihelion is a few percent, a school figure, not a season. The terminator walks north and south because of tilt. Equatorial day length stays near 12 hours; London swings from about 8 to 16. The lie the model tells: orbit radius is shrunk so Earth is readable. Tilt is true. Eccentricity is a labelled switch.",
      "Play a year at 23.44°. Watch the terminator walk. Pause on 21 June, then 21 December. Drag tilt to 0° and play again: the seasonal walk dies. Then 35° to see polar extremes grow. Toggle ‘Exaggerate distance’ so the orbit looks stretched, then turn it off: the real orbit is almost a circle. Keyboard: Space play, arrows scrub the year, L labels, R reset, P projector. City markers: London, Cairo, Nairobi, Sydney, Ushuaia. Ask which city is in summer before you reveal the label.",
      "The globe is to scale as a sphere. The orbit radius is not: if it were, Earth would be a speck. The Sun is drawn large enough to read from the back of the room. Tilt is true. Eccentricity is offered as a labelled lie so you can switch it off. Without the 3D view keep four sentences. A tilted axis. A nearly circular orbit. June is northern summer. December is southern summer. Perihelion is in January, so distance is not the season. London and Sydney never share summer. That is enough for Check on paper.",
    ],
    glossary: [
      {
        term: "Axial tilt",
        exam: "Obliquity of the ecliptic",
        def: "The 23.44° lean of Earth’s spin axis relative to its orbit. The lean’s direction stays nearly fixed as Earth goes around the Sun.",
      },
      {
        term: "Terminator",
        def: "The moving line between day and night. In this lab it walks north and south through the year because of tilt.",
      },
      {
        term: "Solstice",
        def: "When one hemisphere leans most toward the Sun (June, NH) or most away (December, NH).",
      },
      {
        term: "Equinox",
        def: "When neither pole leans toward the Sun. Day and night are about equal everywhere.",
      },
      {
        term: "Declination",
        def: "The latitude where the Sun is overhead at noon. It travels between 23.44°N and 23.44°S.",
      },
      {
        term: "Perihelion",
        def: "Nearest point to the Sun. Early January. A few percent extra insolation, not the cause of seasons.",
      },
      {
        term: "Revolution",
        def: "One trip around the Sun. About 365.25 days. Not the same as rotation (the daily spin).",
      },
    ],
    misconception: {
      claim: "Summer happens because Earth is closer to the Sun.",
      truth:
        "Seasons are a tilt effect. Earth is actually nearest the Sun in early January, during northern winter.",
    },
    misconceptions: [
      {
        claim: "Summer happens because Earth is closer to the Sun.",
        truth:
          "Seasons are a tilt effect. Earth is actually nearest the Sun in early January, during northern winter.",
      },
      {
        claim: "The axis wobbles each year, pointing first north then south.",
        truth: "Over one year the axis stays pointed the same way, near Polaris. The hemisphere that leans toward the Sun changes because Earth has moved around the orbit.",
      },
      {
        claim: "The equator has no seasons, so the Sun is always overhead there.",
        truth: "Equatorial day length stays near 12 hours, but noon altitude still shifts with declination. Overhead Sun only happens between the tropics, and not every day.",
      },
    ],
    cases: [
      { slug: "uk-daylength", label: "UK seasonal day length" },
      { slug: "florida-insolation", label: "Florida / California insolation" },
    ],
    teacher: {
      script:
        "Projector on. Start at tilt 0° and play a year.\nAsk: does London’s day length change? It barely does.\nSnap tilt to 23.44°. Hide Sydney’s label.\nScrub to the June solstice. Ask which city is in summer before you reveal.\nThen December. London dark, Sydney high sun.\nPoint at perihelion in January. Distance is the trap.\nTurn eccentricity exaggeration on, then off, so the orbit looks almost circular again.\nRead London’s hours. Then Nairobi. Then Sydney.\nSpace plays. Arrows scrub. P projector. L labels.\nFinish in Check. The wrong answer is always ‘closer in July’.",
      pitfalls: [
        "Students treat the orbit drawing as highly elliptical. Keep the real orbit almost circular.",
        "Confusing Earth’s rotation (day) with revolution (year).",
        "Thinking the axis ‘wobbles’ each year. It stays pointed the same way (near Polaris) over one orbit.",
      ],
    },
    sources: [
      { label: "NASA SVS — Earth’s seasons", href: "https://svs.gsfc.nasa.gov/" },
      { label: "NOAA Solar Calculator" },
      { label: "Met Office — UK day length" },
    ],
    controls: {
      time: "year",
      extra: [
        { key: "tilt", label: "Axial tilt", min: 0, max: 45, step: 0.1, unit: "°", default: 23.44 },
        { key: "ecc", label: "Orbit stretch", min: 0, max: 0.4, step: 0.01, default: 0 },
      ],
    },
  },
  {
    slug: "rotation",
    title: "Earth rotation and the terminator",
    hook: "Frost on a window at 07:00 in Leeds is sunlight already on the school roof in Berlin. The Sun did not jump. The planet turned.",
    objective:
      "State that Earth rotates west to east, that 15° of longitude is one hour, and that time zones are a consequence of rotation, not the cause of day and night.",
    realm: "planet",
    ages: ["KS3", "GCSE", "NGSS MS"],
    curriculum: ["KS3 Earth and atmosphere", "NGSS MS-ESS1-1", "GCSE background"],
    steps: [
      {
        id: "observe",
        title: "Observe",
        body: "Watch the terminator sweep west to east. London dawn, then Cairo, then Nairobi’s afternoon, then Sydney’s night.",
      },
      {
        id: "tinker",
        title: "Tinker",
        body: "Pause and drag the hour slider. One hour is 15° of longitude. Toggle the time-zone bands. They follow the spin; they do not cause it.",
      },
      {
        id: "explain",
        title: "Explain",
        body: "Earth rotates once in about 23 h 56 min relative to the stars (sidereal), 24 h relative to the Sun. We face the Sun, then we face away. The Sun is not circling us each day.",
      },
      {
        id: "check",
        title: "Check",
        body: "Four questions. Instant feedback.",
      },
    ],
    questions: [
      {
        prompt: "Which way does Earth rotate, viewed from above the North Pole?",
        choices: [
          "Clockwise (east to west).",
          "Anticlockwise (west to east).",
          "It does not rotate; the Sun orbits Earth.",
          "It alternates each six months.",
        ],
        answer: 1,
        explain: "West to east. That is why the Sun appears to rise in the east.",
      },
      {
        prompt: "Why is 15° of longitude equal to one hour?",
        choices: [
          "Because there are 15 time zones.",
          "360° / 24 h = 15° per hour. Time zones were drawn to match that geometry.",
          "Because Greenwich is at 15°E.",
          "It is a coincidence of the metric system.",
        ],
        answer: 1,
        explain:
          "A full turn is 360° in 24 solar hours. Time zones are a human overlay on that arithmetic.",
      },
      {
        prompt: "What is the common misconception this lab targets?",
        choices: [
          "That Earth is a sphere.",
          "That the Sun moves around Earth each day.",
          "That time zones cause rotation.",
          "Both the Sun-around-Earth idea and the idea that time zones cause day and night.",
        ],
        answer: 3,
        explain:
          "Day and night are the planet turning. Time zones are a civil convenience on top.",
      },
      {
        prompt: "If it is noon in London, about what local solar time is it in Cairo (~30°E)?",
        choices: [
          "10:00 — Cairo is west of London.",
          "About 14:00 — 30° is two hours ahead.",
          "Midnight.",
          "The same, because they share a continent.",
        ],
        answer: 1,
        explain: "30° / 15° per hour = 2 hours. East is later in the day.",
      },
    ],
        why: [
      "Jet lag is a body clock arguing with a spinning planet. A Leeds frost at 07:00 is already sunlight on a Berlin school roof. The Sun did not jump. Earth turned west to east. Greenwich marks a meridian, not a magic lamp. New York is five school hours behind London because of longitude, not because the Sun prefers the Hudson. Time zones are labels we printed on that spin. They do not cause day and night. A GCSE map that treats the International Date Line as a weather machine has already failed this lab. Fieldwork on a Holderness beach at dawn is the same geometry as a Miami sunrise: we rotated into the beam.",
      "Earth rotates west to east. We face the Sun, then we face away. One hour is about 15° of longitude. The terminator — the day–night line — sweeps that way because the planet turns, not because the Sun circles us. What moves: which meridians are in the beam. What does not: the Sun’s place as the lamp, the fact of a hard terminator. What is conserved: 360° in about 24 hours relative to the Sun, 15° per school hour. Sidereal day is about 23 h 56 min; solar day is 24 h. Equation of time is a sundial footnote, not the plot. Time-zone bands follow the spin as a political overlay. They kink for borders. They do not drive the terminator. Night side is kept dark on purpose so the lesson reads from the back row. The lie the model tells: rotation is sped up so a day fits a lesson. Shape is a true sphere. The Sun is not circling us each day.",
      "Play a day. Freeze the terminator over the Atlantic and ask who is in daylight: London or New York. Advance one hour. Count 15° of longitude. Overlay time zones, then take them off. Keyboard: Space play, arrows scrub the hour, L labels, R reset, P projector. Toggle time-zone bands. Pause. Ask what ‘the Sun rises’ actually means before you name rotation. Reset if the class has lost Greenwich.",
      "The globe is a sphere of true shape. Rotation rate is sped up so a day fits a lesson. Night side is kept dark on purpose. Without the 3D view keep the sentences. Earth rotates west to east. One hour is 15° of longitude. Time zones are labels, not machinery. Dawn is the planet turning into the beam. The Sun is not circling us each day. Greenwich is a meridian. That is enough for Check on paper, and enough to kill a ‘Sun goes round us’ sentence in one line.",
    ],
    glossary: [
      { term: "Rotation", def: "Earth spinning on its axis. One solar day ≈ 24 hours." },
      { term: "Terminator", def: "The day/night boundary. It sweeps west to east as the planet turns." },
      { term: "Meridian", def: "A line of longitude. Local solar noon is when the Sun crosses your meridian." },
      {
        term: "Time zone",
        def: "A civil band, typically 15° wide, so clocks stay in step with neighbours. Not a physical cause of day and night.",
      },
      {
        term: "Sidereal day",
        def: "Time to face the same star again: about 23 h 56 min. Shorter than the solar day because Earth also orbits.",
      },
      {
        term: "Solar day",
        def: "Noon to noon. About 24 hours. The school-clock day.",
      },
    ],
    misconception: {
      claim: "The Sun moves around Earth once a day.",
      truth: "Earth rotates west to east. The Sun only appears to move.",
    },
    misconceptions: [
      {
        claim: "The Sun moves around Earth once a day.",
        truth: "Earth rotates west to east. The Sun only appears to move.",
      },
      {
        claim: "Time zones cause day and night.",
        truth: "Zones are civil labels on meridians. Day and night are which face of the planet sees the Sun.",
      },
      {
        claim: "A 24-hour day is the time Earth takes to face the same star again.",
        truth: "That is the sidereal day, about 23 h 56 min. The solar day is 24 h because Earth has also moved along its orbit.",
      },
    ],
    cases: [
      { slug: "greenwich", label: "Greenwich meridian" },
      { slug: "time-zones-us", label: "US lower-48 time zones" },
    ],
    teacher: {
      script:
        "Freeze the globe with the terminator over the Atlantic.\nAsk who is in daylight: London or New York? Wait for the room.\nAdvance one hour. Count 15° of longitude.\nOverlay time zones. Take them off again.\nTime zones are labels, not machinery. The planet turns west to east.\nAsk what ‘the Sun rises’ actually means. We rotated into the beam.\nMention equation of time once: 15° is a school hour, not a sundial hour.\nNight is dark on purpose so the terminator reads from the back row.\nSpace plays a day. Arrows scrub. P projector.\nFinish in Check.",
      pitfalls: [
        "Globe animations that rotate the wrong way (east to west).",
        "Calling 24 h the sidereal day.",
      ],
    },
    sources: [
      { label: "Royal Observatory Greenwich" },
      { label: "USNO — sidereal vs solar day" },
    ],
    controls: {
      time: "day",
      toggles: [{ key: "zones", label: "Time zones" }],
    },
  },
  {
    slug: "moon-phases",
    title: "Moon phases and Sun–Earth–Moon geometry",
    hook: "A full Moon over Yosemite is the same geometry a student sees from Snowdonia: the Moon is opposite the Sun, not a different Moon.",
    objective:
      "Link each phase to the Moon’s position around Earth, distinguish the synodic month from a single night, and show why eclipses are rare.",
    realm: "planet",
    ages: ["KS3", "GCSE", "NGSS MS"],
    curriculum: ["KS3 Earth and atmosphere", "NGSS MS-ESS1-1", "GCSE background"],
    steps: [
      {
        id: "observe",
        title: "Observe",
        body: "Play a synodic month. Watch the lit half of the Moon always face the Sun, while the face we see from Earth changes.",
      },
      {
        id: "tinker",
        title: "Tinker",
        body: "Pause at first quarter and full. Toggle the Earth-view disc. Then turn on eclipse alignment: the 5° orbital tilt is why most months have no eclipse.",
      },
      {
        id: "explain",
        title: "Explain",
        body: "Phases are geometry, not Earth’s shadow (except during a lunar eclipse). New Moon is between us and the Sun; full Moon is opposite.",
      },
      { id: "check", title: "Check", body: "Four questions. Instant feedback." },
    ],
    questions: [
      {
        prompt: "At first quarter, where is the Moon relative to the Sun and Earth?",
        choices: [
          "Between the Sun and Earth.",
          "About 90° around its orbit from the Sun–Earth line.",
          "In Earth’s shadow.",
          "Behind the Sun.",
        ],
        answer: 1,
        explain: "We see half the near side lit. That is a right angle in the Sun–Earth–Moon triangle.",
      },
      {
        prompt: "Does Earth’s shadow cause the ordinary crescent Moon?",
        choices: [
          "Yes, always.",
          "No. The dark part is the Moon’s own night side. Earth’s shadow is a lunar eclipse, and it is rare.",
          "Yes, but only in winter.",
          "Only from the southern hemisphere.",
        ],
        answer: 1,
        explain: "Phases are illumination. Eclipses are alignment plus the 5° tilt being near zero.",
      },
      {
        prompt: "Why are eclipses rarer than full and new Moons?",
        choices: [
          "The Moon’s orbit is tilted about 5° to the ecliptic, so it usually passes above or below Earth’s shadow.",
          "The Moon is too small.",
          "Clouds hide them.",
          "They only happen at perihelion.",
        ],
        answer: 0,
        explain: "New and full happen every synodic month. Eclipses need the Moon near a node.",
      },
      {
        prompt: "A synodic month is about 29.5 days. What is it measuring?",
        choices: [
          "Earth’s year.",
          "The time from new Moon to new Moon as seen from Earth.",
          "One Earth rotation.",
          "The time for the Moon to rotate once.",
        ],
        answer: 1,
        explain:
          "The Moon also has to catch up with Earth’s motion around the Sun, so the synodic month is longer than the sidereal month (~27.3 days).",
      },
    ],
        why: [
      "Tides, festivals, and a Snowdonia night walk all run on the same Sun–Earth–Moon triangle. A full Moon over Yosemite is geometry, not a mood. Lunar calendars count phases. Eclipse chasers wait for node crossings, not for every full Moon. A first-quarter Moon is high over Leeds in the afternoon; that surprises a class that thinks the Moon is a night-only lamp. The same triangle lights a Holderness tide table and a California eclipse map. If you teach Earth’s shadow as the crescent, every later eclipse lesson has to unteach it.",
      "The Moon is a ball half-lit by the Sun. What we call a phase is how much of that sunlit half faces Earth. New, first quarter, full, last quarter are four camera angles on one sphere. A crescent is not Earth’s shadow — that is a lunar eclipse, and it needs alignment. What moves: the Moon’s place around Earth, and therefore the viewing angle. What does not: the fact that half the Moon is always sunlit. What is conserved: the Sun as the lamp, the Moon as a sphere. The Moon’s orbit is tilted about 5° to the ecliptic, so most months it misses Earth’s shadow. Size here is exaggerated so the set reads from the back of the room; the real Moon is about 30 Earth-diameters away. Synodic month, new to new, is about 29.53 days, longer than the sidereal month because Earth has moved. The lamp-and-ball demo that parks the Moon in Earth’s shadow for a crescent is the wrong machine.",
      "Freeze at new, first quarter, full, last quarter. For each, ask the class to sketch the triangle before you rotate the view. Toggle eclipse alignment — the 5° tilt going to zero — and ask why next month’s full Moon will not be an eclipse. Keyboard: Space play, arrows through the month, L labels, R reset, P projector. Turn alignment on once, then off. Size is the labelled lie. Geometry is the plot.",
      "Without the 3D view: half the Moon is always sunlit; phases are the viewing angle from Earth; eclipses need the Moon near a node of its tilted orbit. The lamp-and-ball demo that puts the Moon in Earth’s shadow for a crescent is the wrong machine. New Moon sits between us and the Sun. Full Moon sits opposite. First quarter is a right angle. A synodic month is new to new, about 29.5 days. That is enough for Check, and enough to refuse ‘the crescent is Earth’s shadow’.",
    ],
    glossary: [
      { term: "Phase", def: "The fraction of the near side that is sunlit, as seen from Earth." },
      { term: "Synodic month", def: "New Moon to new Moon: about 29.53 days." },
      { term: "Umbra", def: "The dark core of a shadow. A total lunar eclipse puts the Moon in Earth’s umbra." },
      { term: "Orbital inclination", def: "The Moon’s orbit is tilted ~5° to Earth’s orbit. That is why eclipses are rare." },
      { term: "Node", def: "Where the Moon’s orbit crosses the ecliptic. Eclipses need the Moon near a node." },
      { term: "Ecliptic", def: "The plane of Earth’s orbit. The Moon is tilted about 5° to it." },
      { term: "Near side", def: "The Moon face locked toward Earth. Phases are how much of this face is sunlit." },
      { term: "Penumbra", def: "The pale outer shadow. A penumbral lunar eclipse is easy to miss." },
    ],
    misconception: {
      claim: "The crescent is Earth’s shadow on the Moon.",
      truth: "The crescent is the Moon’s night side. Earth’s shadow is an eclipse.",
    },
    misconceptions: [
      {
        claim: "The crescent is Earth’s shadow on the Moon.",
        truth: "The crescent is the Moon’s night side. Earth’s shadow is an eclipse.",
      },
      {
        claim: "The Moon is only in the sky at night, and only when it is full.",
        truth: "A first-quarter Moon is high in the afternoon. Phase is a viewing angle, not a schedule of appearance.",
      },
      {
        claim: "Every full Moon is a lunar eclipse.",
        truth: "The Moon’s orbit is tilted about 5°. Full happens every month; an eclipse needs the Moon near a node.",
      },
    ],
    cases: [
      { slug: "snowdonia-moon", label: "Moonrise, Snowdonia" },
      { slug: "yosemite-moon", label: "Full Moon, Yosemite" },
    ],
    teacher: {
      script:
        "Freeze at new Moon. Sketch the Sun–Earth–Moon triangle on the board.\nFirst quarter. Full. Last quarter. Same sketch, different angle.\nAsk why the dark of the Moon is not Earth’s shadow. Wait before you reveal.\nEnable the 5° tilt. Ask why next month’s full Moon is not an eclipse.\nTurn eclipse alignment on once, then off.\nSize is exaggerated so the geometry reads from the back row.\nA first-quarter Moon can be high in the afternoon. Say that.\nSpace plays the month. Arrows scrub. P projector.\nFinish in Check.",
      pitfalls: [
        "Ball-and-lamp demos that put the Moon in Earth’s shadow for a crescent.",
        "Scale: the Moon is 30 Earth-diameters away. This lab exaggerates size so the geometry reads from the back of the room.",
      ],
    },
    sources: [
      { label: "NASA Moon phases" },
      { label: "USGS / NASA SVS Moon kit" },
    ],
    controls: {
      time: "month",
      toggles: [{ key: "align", label: "Eclipse alignment" }],
    },
  },
  {
    slug: "earth-interior",
    title: "Earth’s interior",
    hook: "A cut apple is a bad model of Earth: the ‘skin’ would be thinner than the apple’s, and the outer core is liquid metal.",
    objective:
      "Name the four main layers, their state, and why a liquid outer core plus P/S-wave shadows tell us the inside is not uniform rock.",
    realm: "interior",
    ages: ["KS3", "GCSE", "A-level", "NGSS MS", "HS Earth Sci"],
    curriculum: [
      "KS3 Earth and atmosphere",
      "GCSE AQA 3.1.1",
      "NGSS MS-ESS2-1",
      "A-level plate tectonics background",
    ],
    steps: [
      {
        id: "observe",
        title: "Observe",
        body: "Spin the intact Earth, then explode the layers. Crust, mantle, outer core, inner core. Read thicknesses and state.",
      },
      {
        id: "tinker",
        title: "Tinker",
        body: "Slice. Fire a P-wave and an S-wave from a surface quake. S-waves stop at the liquid outer core. P-waves leave a shadow zone.",
      },
      {
        id: "explain",
        title: "Explain",
        body: "We have never drilled the mantle. Layering is inferred from seismic waves, density, and the magnetic field that needs a convecting liquid metal outer core.",
      },
      { id: "check", title: "Check", body: "Four questions. Instant feedback." },
    ],
    questions: [
      {
        prompt: "Which layer is liquid metal?",
        choices: ["Crust", "Mantle", "Outer core", "Inner core"],
        answer: 2,
        explain:
          "The outer core is liquid iron–nickel. The inner core is solid iron–nickel despite being hotter, because pressure is higher.",
      },
      {
        prompt: "Why do S-waves fail to reach the far side of Earth?",
        choices: [
          "They are too weak.",
          "S-waves cannot travel through the liquid outer core, so a shadow covers the far side.",
          "The crust absorbs them.",
          "They only travel east.",
        ],
        answer: 1,
        explain: "S-waves are shear. Liquids do not take a shear. That is the classic evidence for a liquid core.",
      },
      {
        prompt: "Why does a liquid outer core matter for the magnetic field?",
        choices: [
          "It does not.",
          "Moving conducting metal can sustain a geodynamo. A fully solid Earth would not.",
          "It makes the planet heavier.",
          "It causes seasons.",
        ],
        answer: 1,
        explain: "The geodynamo needs a convecting, electrically conducting fluid. That is the outer core.",
      },
      {
        prompt: "About how thick is continental crust compared with Earth’s radius (~6371 km)?",
        choices: [
          "About 35 km — a thin shell.",
          "About 2000 km.",
          "Half the radius.",
          "The same as the outer core.",
        ],
        answer: 0,
        explain: "Continental crust averages ~35 km; oceanic ~7 km. It is a skin, not a layer you could walk around inside.",
      },
    ],
        why: [
      "The Kola Superdeep borehole, on the Kola Peninsula, reached a little over 12 km — a scratch on a 6371 km radius. Yellowstone’s magma is still in the crust. A cut apple is a bad model: the skin would be thinner than the apple’s, and the outer core is liquid metal, not fruit. UK GCSE AQA 3.1.1 and NGSS MS-ESS2-1 both need the four layers by name and state. If the mantle looks like lava, students keep the magma-ocean myth the copy is trying to kill. Holderness till and Himalayan rock both sit on that thin crust. San Andreas is a crustal slide, not a window into the core.",
      "Four layers, four jobs. Crust: a thin rigid skin — oceanic about 7 km, continental about 35 km, drawn ×4 here so you can see it. Mantle: solid silicate rock that creeps over geologic time. It is not a magma ocean. Partial melt exists in thin zones; the bulk is solid. Outer core: liquid iron–nickel. S-waves die there. That liquid metal, stirring, is the school story of the magnetic field. Inner core: solid iron–nickel, crystallising as the planet cools. What moves in this lab: explode offset, slice plane, P- and S-wave fronts. What does not: the order of the four, the fact of a liquid outer core. What is conserved: seismic rules — P through liquid, S not. The lie the model tells is crust thickness. Mantle colour is rock, not lava. Outer core is metal in slow spin, not fire.",
      "Explode pulls the shells apart. Slice cuts a plane. Toggle P/S waves or press play. Keyboard: E explode, X slice, L labels, R reset, Space play, P projector. Ask which layer is liquid before you reveal the key. Fire S-waves and wait until they die at the outer core. Then P-waves and the shadow zone. Close on the magnetic field as a liquid-core story, not a bar magnet in a kit. The caption stays on: crust ×4, mantle is solid rock.",
      "Without the 3D view: Earth is a thin rocky skin, a solid convecting mantle, a liquid metal outer core, and a solid metal inner core. Crust is kilometres, not hundreds. Mantle is not lava. S-waves stop at the outer core; P-waves go through. Kola was a scratch. Yellowstone is crustal. The apple is a bad model. That paragraph is the lab if WebGL is off, and it is the sentence that kills ‘magma ocean’.",
    ],
    glossary: [
      { term: "Crust", def: "Rigid outer rock. Oceanic ~7 km; continental ~35 km." },
      { term: "Mantle", def: "Solid but convecting silicate rock to ~2900 km. Most of Earth’s volume. Not a magma ocean." },
      { term: "Outer core", def: "Liquid iron–nickel. S-waves stop here. Source of the magnetic field." },
      { term: "Inner core", def: "Solid iron–nickel sphere ~1220 km in radius." },
      { term: "P-wave", exam: "Primary / compressional wave", def: "Travels through solid and liquid. Fastest." },
      { term: "S-wave", exam: "Secondary / shear wave", def: "Travels through solids only. Dies in the outer core." },
      { term: "Lithosphere", def: "Crust plus the rigid top of the mantle. Plates are lithosphere, not crust alone." },
      { term: "Geodynamo", def: "Magnetic field generated by convection in the liquid, conducting outer core." },
    ],
    misconception: {
      claim: "The mantle is a sea of molten lava.",
      truth: "The mantle is overwhelmingly solid. Magma is a local, partial melt. The liquid layer is the outer core, and it is metal, not lava.",
    },
    misconceptions: [
      {
        claim: "The mantle is a sea of molten lava.",
        truth: "The mantle is overwhelmingly solid. Magma is a local, partial melt. The liquid layer is the outer core, and it is metal, not lava.",
      },
      {
        claim: "We have samples from the core, like we have Moon rocks.",
        truth: "We have not. The deepest borehole is crust. Core composition is inferred from seismology, density, and meteorite chemistry.",
      },
      {
        claim: "The crust is a thick layer you could walk around inside.",
        truth: "Continental crust averages about 35 km on a 6371 km radius. This lab draws it ×4 so you can see it. It is a film.",
      },
    ],
    cases: [
      { slug: "kola", label: "Kola Superdeep borehole" },
      { slug: "yellowstone", label: "Yellowstone — a mantle plume" },
    ],
    teacher: {
      script:
        "Explode the shells. Ask which layer is liquid before you reveal the key.\nSlice. The crust is a film. Say that out loud.\nThe mantle is solid rock that creeps. It is not a magma ocean.\nFire S-waves. Wait until the class sees them die at the outer core.\nThen P-waves and the shadow zone.\nClose on the magnetic field as a liquid-core story, not a bar magnet in a kit.\nCaption stays: crust drawn ×4. Mantle is solid rock.\nE explode. X slice. Space play. P projector.\nFinish in Check.",
      pitfalls: [
        "Textbook colours that look like lava for the whole mantle.",
        "Saying we have ‘samples from the core’ — we have not.",
        "Calling the crust thick because this lab draws it ×4. The caption is the truth.",
      ],
    },
    sources: [
      { label: "USGS — Earth’s interior" },
      { label: "BGS — seismology" },
      { label: "PREM density model (Dziewonski & Anderson)" },
    ],
    controls: {
      time: "none",
      explode: true,
      slice: true,
      toggles: [{ key: "waves", label: "P/S waves" }],
    },
  },
  {
    slug: "plate-boundaries",
    title: "Plate boundaries",
    hook: "Holderness loses metres of till each year; the Himalaya gain millimetres of rock. Both are plates doing different jobs at their edges.",
    objective:
      "Distinguish divergent, convergent, and transform boundaries, name a landform for each, and read Pangaea as the same plates at an earlier time.",
    realm: "interior",
    ages: ["KS3", "GCSE", "A-level", "NGSS MS", "HS Earth Sci"],
    curriculum: ["GCSE AQA 3.1.1", "NGSS MS-ESS2-3", "A-level plate tectonics"],
    steps: [
      {
        id: "observe",
        title: "Observe",
        body: "Three colours of boundary on a real-ish plate mesh. Mid-Atlantic Ridge, Himalaya, San Andreas. Velocity arrows show who is moving where.",
      },
      {
        id: "tinker",
        title: "Tinker",
        body: "Scrub Pangaea to present. Toggle the Hawaii hotspot: the plume stays, the Pacific plate slides, a chain of islands records the track.",
      },
      {
        id: "explain",
        title: "Explain",
        body: "Divergent: plates apart, new crust, ridges and rift valleys. Convergent: together, trenches or collision mountains. Transform: slide, earthquakes without a volcano chain.",
      },
      { id: "check", title: "Check", body: "Four questions. Instant feedback." },
    ],
    questions: [
      {
        prompt: "The Mid-Atlantic Ridge is which boundary type?",
        choices: ["Convergent", "Divergent", "Transform", "Hotspot"],
        answer: 1,
        explain: "Plates move apart. New oceanic crust forms. Iceland sits on the ridge.",
      },
      {
        prompt: "The Himalaya form at a…",
        choices: [
          "Ocean–ocean transform.",
          "Continent–continent convergence.",
          "Mantle hotspot only.",
          "Passive margin.",
        ],
        answer: 1,
        explain: "India collided with Eurasia. No ocean trench now — two continents stacked.",
      },
      {
        prompt: "The San Andreas Fault is famous because it is a…",
        choices: [
          "Divergent ridge under California.",
          "Transform boundary between the Pacific and North American plates.",
          "Subduction zone like Cascadia.",
          "Rift valley.",
        ],
        answer: 1,
        explain: "Plates slide past. Big earthquakes, few volcanoes. Cascadia to the north is the subduction zone.",
      },
      {
        prompt: "A hotspot track like Hawaii is evidence that…",
        choices: [
          "Plates do not move.",
          "A plate can move over a relatively fixed mantle plume, leaving a chain of volcanoes that get older away from the active island.",
          "The Moon causes volcanoes.",
          "All volcanoes sit on mid-ocean ridges.",
        ],
        answer: 1,
        explain: "Loihi and Hawaiʻi are young; Emperor seamounts are old and to the northwest.",
      },
    ],
        why: [
      "Holderness loses metres of till each year; the Himalaya gain millimetres of rock. Both are plates doing different jobs at their edges. Iceland makes crust at a ridge. San Andreas slides. Cascadia dives. The United Kingdom is not a plate: it rides Eurasia. Hawaii is a hole the Pacific is sliding over, not a boundary volcano. A GCSE class that paints every edge the same colour will fail the map question that asks which job this line is doing. USGS and BGS draw those jobs for a reason.",
      "Three colours, three jobs. Divergent: plates move apart, new crust at a ridge — Iceland, Mid-Atlantic. Convergent: plates move together — trench and arc, or continent smash, Himalaya. Transform: plates slide past, San Andreas. What moves: the plates, centimetres a year, sped up here. What does not: the menu of three jobs. What is conserved: lithosphere created at ridges, destroyed at trenches, conserved along transforms. Arrows along motion, not at the painted line. Pangaea is the same plates earlier, not a mythic first Earth. Hypsometry is schematic bathymetry so trench, ridge and arc read as different work. The lie: millions of years in one lesson, cartoon plate outlines. Boundary type is the mechanism. Pretty topography is not.",
      "Name the three colours before any place names. Point at Iceland, Himalaya, San Andreas. Wait for the class to assign types. Scrub time toward Pangaea. Toggle Hawaii and ask which way the Pacific is going from the age chain. Keyboard: Space, arrows, L labels, R reset, P projector. Arrows along plate motion, not at the line. The UK sits on Eurasia; it is not a plate.",
      "The hypsometry is schematic. Motion is sped up by tens of millions of years. Boundary type is the mechanism; pretty topography is the poster. Without the 3D view: three jobs — diverge, converge, slide. Iceland makes crust. Himalaya stacks it. San Andreas slides. Hawaii is not a plate edge. The UK rides Eurasia. That is enough for Check, and enough to read a USGS hazard map without painting every line red.",
    ],
    glossary: [
      { term: "Divergent", def: "Plates move apart. Mid-ocean ridge or continental rift." },
      { term: "Convergent", def: "Plates move together. Subduction or collision." },
      { term: "Transform", def: "Plates slide past. Strike-slip faults." },
      { term: "Hotspot", def: "A long-lived mantle plume that can punch a volcano through a plate interior." },
      { term: "Pangaea", def: "The late Palaeozoic–Mesozoic supercontinent. Not the only one in Earth history." },
      { term: "Transform", def: "Plates slide past. San Andreas type. Lithosphere is neither made nor destroyed." },
      { term: "Subduction", def: "Oceanic plate consumed at a trench. The convergent job under an arc." },
      { term: "Mid-ocean ridge", def: "Divergent boundary that makes new oceanic crust. Iceland sits on one." },
    ],
    misconception: {
      claim: "Continents plough through a static ocean floor.",
      truth: "Continents are passengers on plates. Ocean floor is also plate, created at ridges and destroyed at trenches.",
    },
    misconceptions: [
      {
        claim: "Continents plough through a static ocean floor.",
        truth: "Continents are passengers on plates. Ocean floor is also plate, created at ridges and destroyed at trenches.",
      },
      {
        claim: "The UK is its own plate.",
        truth: "The UK sits on the Eurasian plate. Iceland sits on the Mid-Atlantic Ridge, a divergent boundary.",
      },
      {
        claim: "All volcanoes sit on plate edges.",
        truth: "Most do. Hawaii is a hotspot punching through a plate interior. The age chain records plate motion.",
      },
    ],
    cases: [
      { slug: "san-andreas", label: "San Andreas" },
      { slug: "iceland", label: "Iceland / Mid-Atlantic Ridge" },
    ],
    teacher: {
      script:
        "Name the three colours before any place names.\nPoint at Iceland, Himalaya, San Andreas. Wait for the class to assign types.\nArrows along plate motion, not at the line.\nScrub toward Pangaea. The UK sits on Eurasia; it is not a plate.\nHawaii on. Ask which way the Pacific plate is going from the age chain.\nThree jobs: diverge, converge, slide. Not three moods.\nHolderness loses till; Himalaya gain rock. Same machine, different edges.\nSpace, arrows, L, P. Then Check.",
      pitfalls: [
        "Calling the UK a plate. It sits on the Eurasian plate.",
        "Drawing arrows that point at the boundary instead of along plate motion.",
      ],
    },
    sources: [
      { label: "USGS plate boundaries" },
      { label: "Natural Earth" },
      { label: "BGS — plate tectonics" },
    ],
    controls: {
      time: "none",
      extra: [{ key: "ageMa", label: "Time before present", min: 0, max: 200, step: 1, unit: " Ma", default: 0 }],
      toggles: [{ key: "hotspot", label: "Hawaii hotspot" }],
    },
  },
  {
    slug: "contours",
    title: "Contours ↔ 3D terrain",
    hook: "A GCSE map question is a hill wearing a disguise. The spur and the valley are the same lines, bending opposite ways.",
    objective:
      "Read contour lines as a 3D surface, tell spur from valley, and drop a spot height that matches the 3D hill.",
    realm: "skills",
    ages: ["KS3", "GCSE", "NGSS MS"],
    curriculum: ["GCSE map skills", "AQA 3.3 Geographical applications", "KS3 map skills"],
    steps: [
      {
        id: "observe",
        title: "Observe",
        body: "Toggle 2D map and 3D hill. Same land. The V of the contours points up-valley; the spur’s V points downslope.",
      },
      {
        id: "tinker",
        title: "Tinker",
        body: "Change the contour interval. Drop a spot height. Tight lines are steep. Wide lines are gentle.",
      },
      {
        id: "explain",
        title: "Explain",
        body: "A contour is a line of equal height. Walk it and you neither climb nor descend. The knoll is a closed loop; the col is the saddle between two knolls.",
      },
      { id: "check", title: "Check", body: "Four questions. Instant feedback." },
    ],
    questions: [
      {
        prompt: "Contour lines that form a V pointing uphill usually mark a…",
        choices: ["Spur", "Valley or stream", "Cliff", "Spot height"],
        answer: 1,
        explain: "Water flows out of the V. Valley contours point upstream (uphill).",
      },
      {
        prompt: "A spur is…",
        choices: [
          "A closed depression.",
          "A ridge of high ground poking into lower ground; contour Vs point downhill.",
          "Always a cliff.",
          "The same as a valley.",
        ],
        answer: 1,
        explain: "Spur and valley are opposites in how the Vs point.",
      },
      {
        prompt: "If the contour interval is 10 m and five lines sit between two spots, the height difference is about…",
        choices: ["10 m", "25 m", "50 m", "500 m"],
        answer: 2,
        explain: "Five intervals × 10 m = 50 m. Count the gaps, not just the lines.",
      },
      {
        prompt: "Widely spaced contours mean…",
        choices: ["A steep slope", "A gentle slope", "A cliff", "Sea level"],
        answer: 1,
        explain: "Steep = packed lines. Gentle = open lines. A cliff may show as coincident lines or a symbol.",
      },
    ],
        why: [
      "A GCSE map question is a hill wearing a disguise. The spur and the valley are the same lines, bending opposite ways. Walk a contour on Snowdonia and you neither climb nor descend. Yosemite’s valley walls pack the lines; the floor opens them. OS 1:25 000 and USGS quads both hide the hill in the interval. If a student counts lines instead of intervals they will misread every height question. North is not up the slope.",
      "A contour joins equal height. Walk it and you neither climb nor descend. Packed lines: steep. Open lines: gentle. A V pointing upslope is a valley; a V pointing downslope is a spur. What moves in this lab: the interval slider, the 2D/3D flip. What does not: the hill. What is conserved: height along a line. Interval is the step between lines, not the line count. Spot heights and trig points are extras. The hill is invented teaching terrain, not a traced OS sheet. Vertical scale is readable, not a 1:1 mountain. The lie is the pretty slope; the skill is reading the disguise. Flip 2D to 3D and the same V must still be a valley.",
      "Start in 2D. Ask spur or valley on the marked V. Flip to 3D without telling them. Change interval from 5 m to 20 m and ask what disappeared. Keyboard: L labels, R reset, P projector. Students count intervals, not lines. North is not ‘up the slope’. Reset view if the hill has been orbited into a puzzle.",
      "The hill is invented teaching terrain, not a traced OS sheet. Vertical scale is readable, not a 1:1 mountain. Without the 3D view: packed lines are steep, open lines are gentle, a V pointing upslope is a valley, a spur bends the other way. Count intervals, not lines. North is a grid, not the slope. That is enough for Check, and enough to sit an OS extract without the 3D crutch.",
    ],
    glossary: [
      { term: "Contour", def: "Line joining points of equal height above datum." },
      { term: "Contour interval", def: "The height step between adjacent contours." },
      { term: "Spot height", def: "A surveyed point with a printed elevation." },
      { term: "Spur", def: "A ridge of high ground. Contours V downhill." },
      { term: "Valley", def: "Low ground, often with a stream. Contours V uphill." },
      { term: "Knoll", def: "A small isolated hill: closed contour loops." },
    ],
    misconception: {
      claim: "Contours are paths.",
      truth: "They are height. A path may follow a contour, but the line itself is not a trail.",
    },
    misconceptions: [
      {
        claim: "Contours are paths.",
        truth: "They are height. A path may follow a contour, but the line itself is not a trail.",
      },
      {
        claim: "The V of a contour always points downhill.",
        truth: "Valley Vs point uphill (upstream). Spur Vs point downhill. Same ink, opposite jobs.",
      },
      {
        claim: "You count the brown lines to get the height change.",
        truth: "Count the intervals (gaps) and multiply by the contour interval. Five gaps at 10 m is 50 m.",
      },
    ],
    cases: [
      { slug: "snowdonia", label: "Snowdonia / Eryri" },
      { slug: "yosemite", label: "Yosemite Valley rim" },
    ],
    teacher: {
      script:
        "Start in 2D. Ask spur or valley on the marked V. Wait.\nFlip to 3D without telling them. The hill should match the map.\nChange interval from 5 m to 20 m. Ask what disappeared.\nStudents count intervals, not lines.\nNorth is not ‘up the slope’.\nPacked lines are steep. Open lines are gentle.\nThis is teaching terrain, not a traced OS sheet. Say so.\nL labels. R reset. P projector.\nFinish in Check.",
      pitfalls: [
        "Students counting lines instead of intervals.",
        "Assuming north is always ‘up the slope’.",
      ],
    },
    sources: [
      { label: "OS map skills" },
      { label: "USGS topographic maps" },
    ],
    controls: {
      time: "none",
      extra: [{ key: "interval", label: "Contour interval", min: 5, max: 20, step: 5, unit: " m", default: 10 }],
      toggles: [{ key: "mode3d", label: "3D hill", defaultOn: true }],
    },
  },
  {
    slug: "rivers",
    title: "River long profile",
    hook: "A Lake District beck in spate and the Mississippi in flood are the same machine at different stations: steep and narrow, then lazy and wide.",
    objective:
      "Walk a river from source to mouth, match landforms to course, and use a discharge slider to change competence and floodplain water.",
    realm: "landforms",
    ages: ["KS3", "GCSE", "A-level", "NGSS MS"],
    curriculum: ["GCSE AQA 3.1.3.1", "Edexcel rivers", "NGSS MS-ESS2-2"],
    steps: [
      {
        id: "observe",
        title: "Observe",
        body: "Upper: vertical erosion, V-valley, waterfall. Middle: meanders. Lower: floodplain, levées, delta.",
      },
      {
        id: "tinker",
        title: "Tinker",
        body: "Raise discharge. Competence rises; the floodplain takes water. Play the neck cut-off until an oxbow is left behind.",
      },
      {
        id: "explain",
        title: "Explain",
        body: "Gradient falls downstream. Energy shifts from vertical to lateral erosion. The long profile is concave: steep headwaters, gentle mouth.",
      },
      { id: "check", title: "Check", body: "Four questions. Instant feedback." },
    ],
    questions: [
      {
        prompt: "Where is vertical erosion most important?",
        choices: ["Delta", "Floodplain", "Upper course", "Estuary only"],
        answer: 2,
        explain: "Steep gradient, high potential energy, V-shaped valleys and waterfalls.",
      },
      {
        prompt: "An oxbow lake forms when…",
        choices: [
          "A waterfall retreats.",
          "A meander neck is cut off, usually in flood, and the old loop is abandoned.",
          "A glacier melts.",
          "Levées burst permanently.",
        ],
        answer: 1,
        explain: "Helicoidal flow erodes the outer bank. The neck thins. A cutoff shortens the river.",
      },
      {
        prompt: "Raising discharge typically…",
        choices: [
          "Lowers competence.",
          "Raises competence and can put water onto the floodplain.",
          "Turns the river into a glacier.",
          "Stops meandering.",
        ],
        answer: 1,
        explain: "Competence is the largest grain the flow can move. More discharge, more ability — up to a point.",
      },
      {
        prompt: "A delta needs…",
        choices: [
          "A river dropping load as it enters stiller water, faster than tides/waves can remove it.",
          "A waterfall.",
          "A transform fault.",
          "Perennial ice.",
        ],
        answer: 0,
        explain: "Mississippi: huge load, modest tides. Many UK upland rivers never build a classic delta.",
      },
    ],
        why: [
      "Somerset Levels and the Mississippi delta are flood stories on the same long profile. Channel management — dredge, levée, dam — is an argument with energy and sediment, not a personality of the river. Lake District upper courses cut V-valleys; the Thames lower course sits on a floodplain. US levées and UK washlands are the same machine with different politics. If a class thinks a river is a blue line of constant width they will fail every landform question from knickpoint to oxbow.",
      "A river is a slope with water on it. Upper course: steep, vertical erosion, V-valley, knickpoints. Middle: meanders, helicoidal flow, erosion on the outer bend, deposition on the inner. Lower: floodplain, levées, then a delta or, in tidal UK, often an estuary. What moves: water and sediment. What does not: the long-profile idea of energy falling downstream. What is conserved: water as a budget, sediment until it is dropped. Discharge thickens the channel here; play cuts a neck toward an oxbow. The valley is a teaching mesh, not a traced catchment. Water is a thin free surface in that valley, not a fat pipe. Vertical exaggeration ×12 on the long profile. UK ‘deltas’ are often estuaries because of tides. Say so.",
      "Walk source to mouth with labels off. Ask the class to name each station. Raise discharge and freeze on the floodplain. Play the oxbow once, then rewind. Keyboard: Space play, arrows, L labels, R reset, P projector. The discharge slider is the flood. Labels on only after they have named V-valley, knickpoint, meander, levée, delta.",
      "The valley is a teaching mesh, not a traced catchment. Water is a thin surface, not a fat pipe. Without the 3D view: source, V-valley, knickpoint, meander, floodplain, levée, mouth. Energy falls downstream. UK mouths are often estuaries. Mississippi builds a delta. Discharge up, floodplain wet. Play cuts an oxbow. That is enough for Check on paper.",
    ],
    glossary: [
      { term: "Long profile", def: "Height of the bed from source to mouth." },
      { term: "Competence", def: "Largest particle the flow can move." },
      { term: "Meander", def: "A bend. Erosion on the outer bank, deposition on the inner (slip-off slope)." },
      { term: "Oxbow", def: "Abandoned meander loop, left as a lake, then a wetland, then a meander scar." },
      { term: "Levée", exam: "Levee", def: "Raised bank of coarse load dumped as floodwater leaves the channel." },
      { term: "Delta", def: "Distributaries and deposited load at a river mouth." },
    ],
    misconception: {
      claim: "Rivers always take the shortest path to the sea.",
      truth: "They meander on low gradients. The shortest path is a cutoff after a flood, not the default.",
    },
    misconceptions: [
      {
        claim: "Rivers always take the shortest path to the sea.",
        truth: "They meander on low gradients. The shortest path is a cutoff after a flood, not the default.",
      },
      {
        claim: "Upper, middle and lower course are three different rivers.",
        truth: "They are stations on one long profile. Energy and load change downstream.",
      },
      {
        claim: "Every UK river ends in a delta like the Mississippi.",
        truth: "Many UK mouths are estuaries because of tides. A classic delta needs a large load and modest tidal range.",
      },
    ],
    cases: [
      { slug: "lake-district", label: "A UK upland river" },
      { slug: "mississippi", label: "Mississippi and delta" },
    ],
    teacher: {
      script:
        "Walk source to mouth with labels off. Name each station.\nV-valley and knickpoint upstream. Meanders in the middle. Floodplain and levée down.\nRaise discharge. Freeze on the floodplain.\nPlay the oxbow once, then rewind.\nUK ‘deltas’ are often estuaries because of tides. Say so.\nWater is a thin surface in a valley, not a fat pipe.\nSpace plays. Arrows scrub. P projector.\nFinish in Check.",
      pitfalls: [
        "Teaching the upper/middle/lower courses as three different rivers.",
        "Forgetting that UK ‘deltas’ are often estuaries because of tides.",
      ],
    },
    sources: [
      { label: "BGS — fluvial geomorphology" },
      { label: "USGS Mississippi River" },
    ],
    controls: {
      time: "none",
      extra: [{ key: "discharge", label: "Discharge", min: 0.2, max: 1.6, step: 0.05, unit: "×", default: 0.7 }],
    },
  },
  {
    slug: "water-cycle",
    title: "Water cycle stores and flows",
    hook: "A blackout after a blizzard is weather. The reason there is snow to melt into the reservoir is a closed budget of stores and transfers.",
    objective:
      "Name the main stores and transfers, read a drainage-basin overlay, and see how human abstraction lowers a reservoir.",
    realm: "water",
    ages: ["KS3", "GCSE", "NGSS MS", "APES"],
    curriculum: ["KS3", "GCSE water cycle", "NGSS MS-ESS2-4", "APES 4.1 / 4.2"],
    steps: [
      {
        id: "observe",
        title: "Observe",
        body: "Stores: ocean, atmosphere, ice, groundwater, soil, lakes. Flows: evaporation, transpiration, condensation, precipitation, interception, infiltration, runoff, groundwater flow.",
      },
      {
        id: "tinker",
        title: "Tinker",
        body: "Toggle the drainage-basin overlay. Open the abstraction tap and watch the reservoir fall. The ocean does not notice; the town does.",
      },
      {
        id: "explain",
        title: "Explain",
        body: "Globally the cycle is closed. Locally a basin can be in deficit. Hydrographs (a later skills lab) are this diagram plotted against hours after rain.",
      },
      { id: "check", title: "Check", body: "Four questions. Instant feedback." },
    ],
    questions: [
      {
        prompt: "The largest store of fresh water is…",
        choices: ["Rivers", "The atmosphere", "Ice sheets and glaciers", "Soil moisture"],
        answer: 2,
        explain: "Most water is ocean (salt). Of the fresh remainder, ice dominates; then groundwater; rivers are a trickle.",
      },
      {
        prompt: "Infiltration is…",
        choices: [
          "Water vapour becoming cloud.",
          "Water soaking into the soil surface.",
          "A river entering the sea.",
          "Trees intercepting rain.",
        ],
        answer: 1,
        explain: "If the soil cannot take more, water runs off. That is the flood story.",
      },
      {
        prompt: "Abstraction in this lab lowers the reservoir because…",
        choices: [
          "It destroys the global cycle.",
          "A local store is being mined faster than precipitation and inflow refill it.",
          "It stops evaporation.",
          "It creates new oceans.",
        ],
        answer: 1,
        explain: "Closed globally, open locally. Groundwater and reservoirs can be over-drawn.",
      },
      {
        prompt: "A drainage basin is…",
        choices: [
          "The ocean.",
          "The area of land drained by a river and its tributaries, bounded by a watershed.",
          "A man-made canal.",
          "Only the channel.",
        ],
        answer: 1,
        explain: "The watershed is the divide. Rain on one side goes to this river; on the other side, another.",
      },
    ],
        why: [
      "Thames and Severn abstraction, Somerset Levels flooding, and western US Colorado reservoirs are the same diagram with different taps. Stores first, then transfers. A flood is a transfer the soil cannot take. A drought is a store running down. GCSE and APES both fail students who draw arrow salad with no boxes. Ice and groundwater dominate fresh water. Rivers are a fast trickle in the global budget, which is why a Thames low flow can still look like a lot of water on a local map.",
      "Water is conserved. Stores: ocean, ice, groundwater, lakes, soil, air. Transfers: evaporation, transpiration, precipitation, infiltration, runoff, throughflow, groundwater flow. What moves: the tracer particle, the abstraction tap. What does not: the closed budget. What is conserved: mass of water, in school language. Abstraction mines a named store — a town taking from a river or an aquifer — it does not delete the ocean. Arrow sizes here are teaching, not USGS fluxes to the litre. The particle is a tracer, not a molecule census. Toggle the basin overlay to see a catchment as a budget boundary. The lie: pretty arrows. The skill: name the store before you chase the transfer. Rivers are a flow, not a major global store.",
      "Name stores first, then chase one particle from ocean to snow to river and back. Toggle the basin. Then open abstraction and ask who loses: the ocean or the town. Keyboard: Space, L labels, R reset, P projector. The abstraction slider is the tap. Leave it closed until stores are named. Then open it.",
      "Arrow sizes are teaching, not USGS fluxes to the litre. The particle is a tracer, not a molecule census. Without the 3D view: name stores, then transfers. Ocean, ice, groundwater, soil, lakes, air. Evaporation, precipitation, infiltration, runoff. Abstraction mines a store. Rivers are a flow. A flood is a transfer the soil cannot take. That is enough for Check, and enough to read a UKCEH or USGS water-cycle poster without drowning in arrows.",
    ],
    glossary: [
      { term: "Store", def: "A place water sits: ocean, ice, aquifer, lake, soil, air." },
      { term: "Transfer", def: "A flow between stores." },
      { term: "Watershed", exam: "Drainage divide", def: "The boundary of a drainage basin." },
      { term: "Abstraction", def: "Human removal of water from a store." },
      { term: "Interception", def: "Rain caught on vegetation before it hits the ground." },
      { term: "Abstraction", def: "Water taken from a named store for people. A tap on a river or aquifer, not a deleted ocean." },
      { term: "Residence time", def: "How long a molecule stays in a store. Ice is long. Rivers are short." },
      { term: "Evapotranspiration", exam: "ET", def: "Evaporation plus transpiration. A land transfer back to air." },
    ],
    misconception: {
      claim: "Water is used up.",
      truth: "The global mass is conserved. Quality, location, and timing change. A dry reservoir is a local budget failure.",
    },
    misconceptions: [
      {
        claim: "Water is used up.",
        truth: "The global mass is conserved. Quality, location, and timing change. A dry reservoir is a local budget failure.",
      },
      {
        claim: "Rivers are a major global store of fresh water.",
        truth: "Ice then groundwater dominate fresh water. Rivers are a fast transfer, a trickle in the budget.",
      },
      {
        claim: "The cycle is a circle of arrows with no stores.",
        truth: "Stores first, then transfers. Abstraction mines a named store. A flood is a transfer the soil cannot take.",
      },
    ],
    cases: [
      { slug: "thames", label: "Thames / Severn" },
      { slug: "colorado", label: "Colorado River reservoirs" },
    ],
    teacher: {
      script:
        "Name stores first. Ocean, atmosphere, ice, groundwater, soil, lakes.\nChase one particle from ocean to snow to river and back.\nToggle the basin overlay.\nOpen the abstraction tap. Ask who loses: the ocean or the town.\nRivers are a flow, not a major global store.\nA flood is a transfer the soil cannot take.\nStores first, then arrows. That is the misconception to kill.\nSpace, L, R, P.\nFinish in Check.",
      pitfalls: [
        "Arrow salad with no stores.",
        "Teaching the cycle as if rivers were a major global store.",
      ],
    },
    sources: [
      { label: "USGS Water Science School" },
      { label: "NOAA water cycle" },
      { label: "UK Centre for Ecology & Hydrology" },
    ],
    controls: {
      time: "none",
      extra: [{ key: "abstraction", label: "Abstraction", min: 0, max: 1, step: 0.05, default: 0 }],
      toggles: [{ key: "basin", label: "Drainage basin" }],
    },
  },
];

export const LABS: LabMeta[] = [
  ...CORE_LABS,
  ...PLANET_LABS,
  ...INTERIOR_LABS,
  ...ATMOSPHERE_LABS,
  ...WATER_LABS,
  ...LANDFORM_LABS,
  ...SOIL_LABS,
  ...HAZARD_LABS,
  ...SKILL_LABS,
  ...WAVE6_LABS,
];

export const LAB_BY_SLUG: Record<string, LabMeta> = Object.fromEntries(
  LABS.map((l) => [l.slug, l]),
);

export function labsInRealm(realm: RealmMeta["slug"]): LabMeta[] {
  return LABS.filter((l) => l.realm === realm);
}

export const AGE_BANDS = [
  "KS3",
  "GCSE",
  "A-level",
  "NGSS MS",
  "HS Earth Sci",
  "APES",
] as const;
