import type { LabMeta } from "./types";
import { lab, q, steps } from "./make";

export const SKILL_LABS: LabMeta[] = [
  lab({
    slug: "graticule",
    title: "Graticule and coordinates",
    hook: "Latitude is how far from the equator. Longitude is how far from Greenwich. Together they are an address, not a decoration.",
    objective: "Drop a point on a 3D Earth, read lat/long, and relate 15° of longitude to one hour.",
    realm: "skills",
    ages: ["KS3", "GCSE", "NGSS MS"],
    curriculum: ["KS3 map skills", "GCSE", "NGSS MS-ESS1-1"],
    steps: steps(
      "The mesh of meridians and parallels is the graticule. Equator 0° latitude. Greenwich 0° longitude.",
      "Scrub the marker. Read the coordinates. 15° of longitude is one hour of Earth rotation.",
      "Coordinates are a grid on a sphere. They do not make the Earth flat.",
    ),
    questions: [
      q("Latitude measures…", ["Distance from Greenwich", "Angle from the equator, 0° to 90° N or S", "Height in metres", "Time zones only"], 1, "Parallels. 90°N is the North Pole."),
      q("The Greenwich meridian is…", ["The equator", "0° longitude, the school prime meridian", "180° always", "A climate belt"], 1, "Civil time grew from this line. The Earth does not care."),
      q("15° of longitude is about…", ["One year", "One hour of rotation", "One kilometre", "A contour interval"], 1, "360° / 24 h. Pair with the rotation lab."),
      q("A point at 0°, 0° sits…", ["In London", "In the Atlantic, south of Ghana, where equator meets Greenwich", "At the North Pole", "In New York"], 1, "Gulf of Guinea. Not a capital."),
    ],
    why: [
      "Every case locator on this site is a lat/long pair. Greenwich is the civil zero for longitude — a plaque on a rotating sphere, not a machine that makes day and night. US Eastern, Central, Mountain, and Pacific are four civil labels across about 60° of longitude; the terminator ignores the jogs around state lines. A Leeds frost at 07:00 is already sunlight on a Berlin school roof. Snowdonia and Yosemite sit at different longitudes, so the same full Moon rises at different clock times; the coordinate is an address, not a decoration. Railways forced time zones onto 15° meridians. Rescue, aviation, and every atlas pin still speak this language. The equator does none of that work: it is 0° latitude, a different axis of the same net. Live weather satellites in geostationary slots match this spin. Historical noon was local until the railways forced zones.",
      "The graticule is the network of meridians and parallels on a globe or map. Latitude is the angle from the equator, 0° to 90° north or south. Parallels never meet; they shrink toward the poles. Longitude is the angle from the Greenwich meridian, 0° to 180° east or west. Meridians run pole to pole and meet at the poles. The two families cross at right angles. The equator is 0° latitude, not a line of longitude. Greenwich is 0° longitude, a convention; the spin does not care which meridian we labelled zero. Fifteen degrees of longitude is about one hour of Earth rotation: 360° divided by 24 hours. Coordinates are a grid on a sphere. They do not make the Earth flat. A point at 0°, 0° sits in the Atlantic, south of Ghana, in the Gulf of Guinea — not in London. The International Date Line is near 180°, not the Greenwich meridian, and it jogs for islands. This lab draws the Tropic of Cancer at 23.44°N and the Arctic Circle at 66.56°N; they are tilt geometry, not climate belts painted on the sea. East and west mix-ups are the classic error: New York is west of Greenwich.",
      "Scrub Latitude and Longitude. Drop a marker on London, then New York. Read the coordinates aloud. East and west mix-ups happen here. Point at the equator, then Greenwich: they cross at right angles. Ask the hour difference before you reveal: 15° of longitude is about one hour. Orbit the globe so meridians and parallels read as a net, not a decoration. Pause on Greenwich 0°, then on a US time-zone longitude, and count the hours. Keyboard: L labels, R reset. Latitude and Longitude sliders live in the control bar. The readout follows the pin, including the hour offset.",
      "The globe is a sphere of true shape. The net is denser than a school atlas so it reads from the back of the room. The marker is a teaching pin, not a surveyed monument. Tropics and polar circles are drawn true. Time-zone jogs are omitted so the 15° hour stays the lesson. Without the 3D view: latitude is angle from the equator; longitude is angle from Greenwich; meridians meet at the poles and parallels never do; 15° is about one hour; 0°, 0° is the Gulf of Guinea, not London.",
    ],
    glossary: [
      { term: "Graticule", def: "The network of meridians and parallels on a globe or map." },
      { term: "Meridian", def: "A line of longitude, pole to pole. Meridians meet at the poles." },
      { term: "Parallel", def: "A line of latitude, parallel to the equator. Parallels never meet." },
      { term: "Latitude", def: "Angle from the equator, 0° to 90° N or S. Not a distance in kilometres." },
      { term: "Longitude", def: "Angle from the prime meridian, 0° to 180° E or W. 15° is about one hour." },
      { term: "Prime meridian", exam: "Greenwich meridian", def: "The civil zero of longitude. Greenwich is the school choice. The Earth does not care." },
      { term: "Equator", def: "0° latitude. It is a parallel, not a meridian." },
      { term: "International Date Line", def: "The civil date-change near 180°. It is not the Greenwich meridian, and it jogs for islands." },
    ],
    misconception: {
      claim: "The equator is a line of longitude.",
      truth: "The equator is 0° latitude. Greenwich is 0° longitude. They cross at right angles.",
    },
    misconceptions: [
      {
        claim: "The equator is a line of longitude.",
        truth: "The equator is 0° latitude. Greenwich is 0° longitude. They cross at right angles.",
      },
      {
        claim: "0°, 0° is in London, because Greenwich is there.",
        truth: "Greenwich is about 51.5°N, 0°. The equator meets Greenwich in the Gulf of Guinea, south of Ghana.",
      },
      {
        claim: "The International Date Line is the Greenwich meridian.",
        truth: "Greenwich is 0°. The date line is near 180°, with jogs for islands. Time zones are civil labels on longitude, not the cause of day and night.",
      },
    ],
    cases: [
      { slug: "greenwich", label: "Greenwich meridian" },
      { slug: "time-zones-us", label: "US time zones" },
    ],
    teacher: {
      script:
        "Point at the equator, then Greenwich. Equator is 0° latitude. Greenwich is 0° longitude.\nThey cross at right angles. The equator is not a line of longitude.\nThat is the misconception.\nScrub Latitude and Longitude. Drop a marker on London, then New York.\nRead the coordinates aloud. East and west mix-ups happen here.\nAsk the hour difference before you reveal: 15° of longitude is about one hour of Earth rotation.\nCoordinates are a grid on a sphere. They do not make the Earth flat.\nA point at 0°, 0° sits in the Atlantic, south of Ghana, not in London.\nThe International Date Line is not the Greenwich meridian.\nTime zones are labels on longitude. They do not cause day and night.\nFinish in Check.",
      pitfalls: [
        "E/W mix-up: New York is west of Greenwich.",
        "Calling the International Date Line the Greenwich meridian.",
        "Putting 0°, 0° in London because the prime meridian is there.",
        "Teaching time zones as the machinery of day and night.",
      ],
    },
    sources: [{ label: "Royal Observatory Greenwich" }, { label: "OS / USGS map skills" }],
    controls: {
      time: "none",
      extra: [
        { key: "lat", label: "Latitude", min: -80, max: 80, step: 0.5, unit: "°", default: 51.5 },
        { key: "lon", label: "Longitude", min: -180, max: 180, step: 0.5, unit: "°", default: -0.1 },
      ],
    },
  }),
  lab({
    slug: "map-projections",
    title: "Map projections",
    hook: "Peel an orange and the skin tears. Every world map is a compromise. Greenland is the giveaway.",
    objective: "Morph a globe to Mercator, equal-area, and a compromise, and say what each distorts.",
    realm: "skills",
    ages: ["KS3", "GCSE", "NGSS MS"],
    curriculum: ["GCSE map skills", "NGSS MS-ESS2-2"],
    steps: steps(
      "Start on the globe. Greenland is smaller than Africa.",
      "Mercator: rhumb lines straight, high latitudes balloon. Equal-area: sizes fair, shapes suffer. Compromise: neither perfect.",
      "There is no honest single map of the whole Earth. Choose the lie you can live with.",
    ),
    questions: [
      q("On a Mercator world map Greenland looks…", ["Tiny", "About the size of Africa — a distortion; Africa is far larger", "The same as on the globe", "A river"], 1, "Mercator inflates high latitudes."),
      q("An equal-area projection is built to…", ["Keep compass bearings", "Keep relative sizes of regions", "Make the UK huge", "Hide the poles"], 1, "Shapes then take the hit."),
      q("Why do we still use Mercator at sea historically?", ["It is equal-area", "Rhumb lines (constant bearing) are straight", "It is newest", "NASA requires it"], 1, "Navigation, not fairness."),
      q("The globe in this lab is the…", ["Most distorted view", "Reference: a sphere (almost) does not need a projection", "Mercator already", "A contour map"], 1, "Projections start when you flatten."),
    ],
    why: [
      "A classroom wall map is a projection, not the true size of countries. News maps that grow Russia and shrink Africa are a choice about area, not a verdict on people. Start with area. Greenland is the giveaway: on Mercator it looks about the size of Africa; on the globe it is far smaller. Iceland sits at high latitude, so it balloons on the same family of maps. Greenwich is a meridian, not a map — the plaque does not flatten the Earth. An OS sheet of Snowdonia and a USGS quad of Yosemite are local projections with different jobs; they are not a moral statement about the world. Atlas versus this site’s tools/map: both flatten; this lab says how, and what you lose when you peel the orange.",
      "Do not start a culture war. Start with area. A sphere does not flatten without tears. Peel an orange: the skin rips. Every world map chooses what to keep and what to distort. Mercator keeps local shape — it is conformal — and makes rhumb lines, paths of constant bearing, straight, which is why it was used at sea. High latitudes balloon, so Greenland and Iceland swell while Africa looks small. Africa is about fourteen times the area of Greenland. Mercator hides that. An equal-area projection keeps relative sizes of regions; shapes then take the hit. A compromise is neither perfect. The globe in this lab is the reference: a sphere almost does not need a projection. Projections start when you flatten. Orange-peel gores show the tears at the cuts. Local OS maps and USGS quads are a different problem — a projected grid on a small patch, not a world poster. There is no honest single map of the whole Earth. Choose the lie you can live with. Do not teach one projection as morally pure. Area first, then shape, then the navigation story.",
      "Start on the globe. Ask Greenland versus Africa. Greenland is smaller than Africa. Scrub Flatten toward the orange-peel gores: the skin tears at the cuts. Then Mercator: high latitudes balloon. Ask what happened to Greenland’s area before you name the projection. Leave labels off until the class can say which view is the globe. Do not start a culture war at the slider. Start with area, then rhumb lines as the navigation reason Mercator survived. Keyboard: L labels, R reset. Flatten slider lives in the control bar. The readout names globe, gores, then Mercator-like flatten. Compare sizes before names.",
      "The land outlines are teaching silhouettes, not a traced census of coastlines. Greenland and Africa are sized so the area lie reads from the back row. Gores are schematic strips, not a printer’s template. Mercator here is Mercator-like: enough stretch to see the balloon, not a navigation chart. Local OS and USGS sheets are off-stage; they flatten a county, not a planet. Without the 3D view: a globe needs no projection; flattening tears; Mercator inflates high latitudes; equal-area keeps size and spends shape; there is no honest single world map. Start with area, not with a quarrel.",
    ],
    glossary: [
      { term: "Projection", def: "A rule for flattening the globe onto a plane. Every rule distorts something." },
      { term: "Mercator", def: "Conformal cylindrical. Rhumb lines straight. Distorts area toward the poles." },
      { term: "Equal-area", exam: "Equivalent projection", def: "Preserves relative area of regions. Distorts shape." },
      { term: "Conformal", exam: "Orthomorphic", def: "Preserves local shape and angles. Area then takes the hit." },
      { term: "Rhumb line", exam: "Loxodrome", def: "A path of constant bearing. Straight on Mercator; not the shortest route." },
      { term: "Gores", def: "Orange-peel strips of the globe. The tears at the cuts are the cost of flattening." },
      { term: "Compromise projection", def: "A map that splits the distortion so nothing is perfect and nothing is ruinous." },
      { term: "Distortion", def: "What a projection spends: area, shape, distance, or direction. You cannot keep all four on a world map." },
    ],
    misconception: {
      claim: "The classroom wall map is the true size of countries.",
      truth: "It is a projection. Compare Greenland and Africa on the globe first.",
    },
    misconceptions: [
      {
        claim: "The classroom wall map is the true size of countries.",
        truth: "It is a projection. Compare Greenland and Africa on the globe first.",
      },
      {
        claim: "Mercator is a political lie designed to make the north look powerful.",
        truth: "Mercator was built for rhumb-line navigation. High latitudes balloon as a geometric cost. Start with area, not with a culture war.",
      },
      {
        claim: "There is one honest map of the whole Earth.",
        truth: "Every world map is a compromise. Equal-area keeps size and spends shape. The globe is the reference; local OS maps are a different problem.",
      },
    ],
    cases: [
      { slug: "greenwich", label: "Greenwich as a meridian, not a map" },
      { slug: "iceland", label: "High-latitude size trap" },
    ],
    teacher: {
      script:
        "Start on the globe. Ask Greenland versus Africa. Greenland is smaller than Africa.\nDo not start a culture war. Start with area.\nScrub Flatten toward the gores. The orange peel tears at the cuts.\nThen Mercator. High latitudes balloon. Rhumb lines go straight.\nSizes on the wall map are not true sizes. It is a projection.\nThat is the misconception. Compare Greenland and Africa on the globe first.\nEqual-area keeps relative size; shapes then take the hit.\nThere is no honest single map of the whole Earth. Choose the lie you can live with.\nDo not teach one projection as morally pure. Local OS maps are a different problem.\nNews maps that grow Russia and shrink Africa are a projection choice.\nFinish in Check.",
      pitfalls: [
        "Teaching one projection as morally pure.",
        "Starting a culture war instead of starting with area.",
        "Forgetting that local OS maps and USGS quads are a different problem.",
        "Treating Greenland’s Mercator size as a fact about ice, not a fact about the map.",
      ],
    },
    sources: [{ label: "USGS map projections" }, { label: "Natural Earth" }],
    controls: {
      time: "none",
      extra: [{ key: "morph", label: "Flatten", min: 0, max: 1, step: 0.01, default: 0 }],
    },
  }),
  lab({
    slug: "grid-references",
    title: "Grid references",
    hook: "An OS six-figure reference is a 100 m square, not a pin. Eastings then northings. Along the corridor, up the stairs.",
    objective: "Read and plot a six-figure grid reference on a small UK tile.",
    realm: "skills",
    ages: ["KS3", "GCSE"],
    curriculum: ["GCSE map skills", "AQA 3.3", "KS3"],
    steps: steps(
      "The blue grid is a kilometre. A four-figure reference names a 1 km square. Six-figure splits it into 100 m.",
      "Drop a marker. Read eastings first, then northings.",
      "This is not lat/long. OSGB is a projected grid on Britain. The graticule lab is the sphere.",
    ),
    questions: [
      q("You read a grid reference…", ["Northings then eastings", "Eastings then northings — along the corridor, up the stairs", "Latitude only", "In random order"], 1, "The school mnemonic still earns marks."),
      q("A six-figure reference locates to about…", ["1 km", "100 m", "1 m", "A county"], 1, "Each extra pair of digits divides by ten."),
      q("Four-figure 1234 means…", ["A point", "The 1 km square whose SW corner is easting 12, northing 34", "A contour", "A latitude"], 1, "The square, not a pin."),
      q("OS grid is…", ["The same as the graticule", "A projected kilometre grid on Great Britain", "US state plane", "A climate map"], 1, "Different tool from lat/long."),
    ],
    why: [
      "GCSE paper 3 lives here. Walkers on Snowdonia still use six-figure references; phones hide them behind a pin. The OS sheet of Eryri is a projected kilometre grid, not lat/long. Yosemite’s USGS quad is a different national grid — often feet on older plates — the same idea of a square on a projected plane, different letters and units. Lake District tiles use the same OSGB habit: eastings then northings. Rescue, Duke of Edinburgh, and the map paper all punish northings first. A six-figure is a 100 m square you can stand in, not a lamp-post. Along the corridor, up the stairs is still the mnemonic that earns marks. A missed digit on a mountain day is a 100 m error you can walk; a swapped easting and northing is a kilometre in the wrong direction. Phones will not sit the exam.",
      "You read a grid reference eastings then northings. Along the corridor, then up the stairs. The blue grid is a kilometre. A four-figure reference names a 1 km square by its south-west corner: 1234 means easting 12, northing 34. Six-figure splits that square into a 100 m cell. Eight-figure is 10 m. This is not lat/long. OSGB is a projected kilometre grid on Great Britain. The graticule lab is the sphere. GPS is a pin on WGS84; it is something else, then converted for the sheet. A six-figure is a square, not a single lamp-post. Northings first is the classic mark-loser. The numbers increase east and north from a false origin south-west of the Isles. 100 km letters (SH, NY) name the big square; this lab’s tile is the numbers inside one square. Each extra pair of digits divides by ten. To plot: find the easting to the west of the point, then the northing to the south, then estimate tenths inside the square. That estimate is why six-figure is 100 m, not a pin. Never read the numbers as latitude. Never start with the northing. The school mnemonic is not a joke; it is the mark scheme.",
      "Give a six-figure. Wait for fingers on the tile. Eastings first, then northings. Then drop the marker. Reverse: hide the numbers, ask the class to read. Scrub Easting and Northing so the point walks. Play so the marker walks the tile and freeze when the six-figure matches the one on the board. Ask which 1 km square you are in before you ask the 100 m cell. Point at the easting arrow first. Keyboard: L labels, R reset. Easting and Northing sliders live in the control bar. The readout prints the six-figure and the 1 km square.",
      "The tile is a schematic grid, not a traced OS sheet of Snowdonia. The 100 m cell is a square you can see, not a surveyed lamp-post. Blue lines are the kilometre grid; the inner mesh is the 100 m split of one square. Houses on the tile are props, not addresses. Without the 3D view: eastings then northings; four-figure is 1 km by the south-west corner; six-figure is 100 m; this is OSGB, not the graticule; GPS is a different tool.",
    ],
    glossary: [
      { term: "Easting", def: "How far east in the grid. Read first. Along the corridor." },
      { term: "Northing", def: "How far north in the grid. Read second. Up the stairs." },
      { term: "Four-figure grid reference", def: "Names a 1 km square by its south-west corner." },
      { term: "Six-figure grid reference", def: "Locates a 100 m square on the OS grid. Not a pin." },
      { term: "OSGB", exam: "British National Grid", def: "A projected kilometre grid on Great Britain. Different tool from lat/long." },
      { term: "False origin", def: "The south-west point from which eastings and northings are counted, off the Isles so all numbers stay positive." },
      { term: "Grid square", def: "The cell the reference names. Four-figure: 1 km. Six-figure: 100 m. Eight-figure: 10 m." },
      { term: "WGS84", def: "The GPS ellipsoid and datum. A phone pin is not an OS six-figure until it is converted." },
    ],
    misconception: {
      claim: "A six-figure reference is a single lamp-post.",
      truth: "It is a 100 m square. Eight-figure is 10 m. GPS is something else.",
    },
    misconceptions: [
      {
        claim: "A six-figure reference is a single lamp-post.",
        truth: "It is a 100 m square. Eight-figure is 10 m. GPS is something else.",
      },
      {
        claim: "You read northings first, then eastings.",
        truth: "Eastings then northings. Along the corridor, up the stairs. Northings first is the classic mark-loser.",
      },
      {
        claim: "OS grid is the same as lat/long.",
        truth: "OSGB is a projected kilometre grid on Great Britain. The graticule lab is the sphere. GPS on WGS84 is a third tool.",
      },
    ],
    cases: [
      { slug: "snowdonia", label: "Snowdonia OS tile" },
      { slug: "lake-district", label: "Lake District OS tile" },
    ],
    teacher: {
      script:
        "Give a six-figure. Wait for fingers on the tile. Eastings first, then northings: along the corridor, up the stairs.\nThen drop the marker. Reverse: hide the numbers, ask the class to read.\nScrub Easting and Northing so the point walks.\nA six-figure reference locates a 100 m square, not a single lamp-post.\nThat is the misconception. Eight-figure is 10 m. GPS is something else.\nFour-figure names a 1 km square by its south-west corner.\nThis is not lat/long. OSGB is a projected kilometre grid on Great Britain.\nThe graticule lab is the sphere. Do not call this the graticule.\nNorthings first is the classic mark-loser. Easting then northing, every time.\nYosemite’s USGS quad is a cousin, not this grid. Same square idea, different letters.\nFinish in Check.",
      pitfalls: [
        "Northings first.",
        "Calling it lat/long or the graticule.",
        "Treating a six-figure as a lamp-post instead of a 100 m square.",
        "Mixing OSGB letters with a phone GPS pin and calling them the same.",
      ],
    },
    sources: [{ label: "Ordnance Survey map skills" }, { label: "OS GetOutside grid references" }],
    controls: {
      time: "none",
      extra: [
        { key: "easting", label: "Easting", min: 0, max: 999, step: 1, default: 246 },
        { key: "northing", label: "Northing", min: 0, max: 999, step: 1, default: 513 },
      ],
    },
  }),
];
