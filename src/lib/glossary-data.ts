import { LABS } from "./labs/catalog";

export type GlossaryEntry = {
  term: string;
  def: string;
  exam?: string;
  lab: string;
  labTitle: string;
};

/** 3–5 sentence classroom defs for landforms that must not stay as one-liners. */
const RICH: Record<string, string> = {
  Cirque:
    "A cirque is a steep-walled armchair hollow at the head of a valley glacier, cut by freeze–thaw on the back wall and rotational ice at the floor. A tarn often ponds there after the ice leaves. Helvellyn’s Red Tarn is the UK classroom pair; the Alps and the Rockies repeat the same bowl. It is not a volcanic crater and not a river meander. If three cirques eat the same peak they leave a horn.",
  "Arête":
    "An arête is a knife-edged ridge left where two cirques cut back-to-back. The ice steepens both walls; the crest is what remains. Striding Edge on Helvellyn is the named UK walk. Do not call a river interfluve an arête — there was no ice. US papers often drop the accent and write arete; both spellings name the same ridge.",
  Arete:
    "US spelling of arête: a knife ridge between two cirques. Ice, not a river, cut both walls. Striding Edge is the UK walk; the Tetons repeat it. Keep the accent in UK exam language if the paper uses it.",
  Horn:
    "A horn is a sharp pyramidal peak left when three or more cirques cut the same mountain from different sides. The Matterhorn is the poster; Yr Wyddfa is not a horn in the same textbook sense. It is not a volcano. Ice ate the sides; the point is what they failed to remove.",
  Spit:
    "A spit is a ridge of sand or shingle built by longshore drift with a free end in open water. Spurn Head off Holderness is the UK case; it is till-fed, not chalk. A tombolo joins an island; a spit does not. Groynes interrupt the same conveyor — they do not invent a new sediment budget.",
  Stack:
    "A stack is a pillar of the same cliff rock left after a cave became an arch and the roof fell. Old Harry and Durdle Door’s neighbours are chalk versions; they are not sand dunes. Cave–arch–stack–stump is one rock, one budget, four stages. Holderness till rarely lasts long enough to make a textbook stack.",
  Barchan:
    "A barchan is a crescent dune whose horns point downwind. Sand is scarce, wind is steady, and the slip face is the steep lee. Namib and Sahara examples are the photographs; a parabolic dune is the opposite orientation. It is not a spit and not a drumlin.",
  Anticline:
    "An anticline is an up-fold: oldest beds in the core, limbs dipping away. Lulworth’s folds and Pennsylvania’s ridges are readable sections, not a group portrait in a wood. A syncline is the down-fold pair. Folds record shortening; they are not faults until they break.",
  Syncline:
    "A syncline is a down-fold: youngest beds in the core, limbs dipping in. Road cuts make the trough obvious. Do not swap it with an anticline because the ridge looks high — erosion can invert relief. Pennsylvania’s valley-and-ridge is the US pair; Lulworth is the UK walk.",
  "Soil profile":
    "A soil profile is a vertical section through horizons O–A–E–B–C–R. Thickness matters; colour is not the class. The pale E is leaching, not missing rock, and some soils skip it. A USDA inch diagram is a cartoon; a field pit is the evidence. Texture (sand, silt, clay) is a different lab from this sequence.",
  Terminator:
    "The terminator is the line on Earth between day and night. It walks with axial tilt through the year, which is why polar day and polar night exist. Seasons are that walk, not a changing Earth–Sun distance. Click the 3D Earth on the seasons lab and the terminator is the mesh to name.",
  "Terminator (day–night)":
    "The terminator is the line on Earth between day and night. It walks with axial tilt through the year, which is why polar day and polar night exist. Seasons are that walk, not a changing Earth–Sun distance. Click the 3D Earth on the seasons lab and the terminator is the mesh to name.",
  Hydrograph:
    "A hydrograph plots rainfall then river discharge against time. Rain first; peak later; lag is the catchment’s delay. A flashy basin peaks soon; a rural basin delays. The Spanish-labelled LLUVIA chart is not this lab’s figure — we keep SI units and an English axis. A flood is the peak you can walk; the graph is the same event as numbers.",
  Stratovolcano:
    "A stratovolcano (composite cone) stacks sticky lava and ash into a steep cone. Viscosity holds the slope. Fuji, Vesuvius, and Japan’s arc volcanoes are this shape. It is not a Hawaiian shield and not a mid-ocean ridge. Subduction usually feeds it; a hotspot of runny basalt does not.",
  "Shield volcano":
    "A shield volcano is a broad pile of runny basalt with gentle slopes. Mauna Loa is the type; Iceland’s shields are cousins. Viscosity is low, so lava travels. It is not a stratovolcano and not an island arc. Hawaii is a hotspot track, not a subduction chain.",
  Meander:
    "A meander is a river loop: outer bend erodes, inner bend deposits. Given time, the neck cuts and an oxbow is left. The Mississippi and many UK floodplains show the same geometry. It is not a glacial trough and not a tidal creek by definition — the process is a sinuous channel on a gentle gradient.",
  Oxbow:
    "An oxbow is a cut-off meander loop that the river abandoned. Still water fills it; the channel has already moved on. It is the end of a meander, not a lake the ice sat in. Floodplains collect them. Do not call a cirque tarn an oxbow.",
  "Oxbow lake":
    "An oxbow lake is a cut-off meander loop that the river abandoned. Still water fills it; the channel has already moved on. It is the end of a meander, not a lake the ice sat in. Floodplains collect them.",
  Delta:
    "A delta is where a river dumps load into stiller water: the sea, a lake, or a lagoon. Distributaries split the last job. The Nile and the Mississippi are the satellite pair; Bangladesh is a delta the size of a country. It is not a spit, and not an estuary without deposition.",
  "Cold front":
    "A cold front is a wedge of denser air lifting warmer air ahead of it. The cloud band is the slope of that wedge, not a painted line on a chart. Cumulonimbus and a sharp temperature drop are the weather. A UK winter front is not a hurricane eyewall.",
  "Transform fault":
    "A transform fault is where plates slide past. The San Andreas is right-lateral; it is not a subduction trench and not a volcanic arc. Earthquakes are shallow and frequent. New crust is not made here. California’s exam sentence is this, not Hawaii and not Japan.",
  Trench:
    "A trench is a deep slot where an oceanic plate dives. Convergent. Challenger Deep is bathymetry, not a photograph of water. It is not a river canyon and not a glacial trough. Japan and the Andes sit above trenches; Iceland does not.",
  "Mid-ocean ridge":
    "A mid-ocean ridge is a divergent spreading axis: new crust, magnetic stripes, shallow quakes. Iceland is a ridge with a country on it because a hotspot thickens the pile. It is not a subduction arc. Age of the seafloor increases away from the axis.",
  Drumlin:
    "A drumlin is a streamlined hill of till, blunt up-ice and tapered down-ice. Ice sheets moulded it; rivers did not. Northern Ireland and Wisconsin are classrooms of them. It is not a barchan (wind) and not a spit (waves). The long axis points the ice flow.",
  Tombolo:
    "A tombolo is a ridge of sand or shingle that joins an island to the mainland, built by wave refraction and longshore drift. Chesil is a cousin of the idea; a spit has a free end and is not a tombolo until it docks. Do not call Spurn a tombolo — it is still free.",
  Levee:
    "A levee (US) or levée (UK) is a raised bank along a channel, natural from overbank silt or built as a flood wall. The Mississippi and Dutch polders both use the word. It is not a spit and not a groyne. Breach it, and the floodplain takes the water.",
  Levée:
    "A levée (UK) or levee (US) is a raised bank along a channel, natural from overbank silt or built as a flood wall. Both spellings are kept. The Mississippi and Dutch polders both use the word. It is not a spit and not a groyne.",
  Floodplain:
    "A floodplain is the flat land a river has built and still occasionally floods. Meanders, oxbows, and levées live on it. It is not a glacial trough and not a delta until the river meets still water. Somerset Levels and the Mississippi are the wet pair.",
  Doline:
    "A doline (sinkhole) is a closed depression in limestone, opened along joints by carbonation. The Burren, Kentucky, and Florida’s karst all show them. It is not a cirque and not a volcanic crater. Water leaves through rock, not as an underground lake.",
  Sinkhole:
    "A sinkhole is the everyday word for a doline: a closed depression in limestone opened along joints. Florida’s karst and Kentucky’s Mammoth Cave country are the US pair. Not a glacial bowl.",
};

function expandDef(term: string, def: string, exam: string | undefined, _labTitle: string): string {
  const hit =
    RICH[term] ??
    Object.entries(RICH).find(([k]) => k.toLowerCase() === term.toLowerCase())?.[1];
  if (hit) return hit;
  if (exam) return `${def} Exam papers may also write “${exam}”.`;
  return def;
}

const EXTRA: GlossaryEntry[] = [
  {
    term: "Terminator (day–night)",
    def: RICH["Terminator (day–night)"]!,
    lab: "seasons",
    labTitle: "Why seasons happen",
  },
  {
    term: "Levee",
    def: RICH.Levee!,
    exam: "Levée",
    lab: "rivers",
    labTitle: "Rivers from source to mouth",
  },
  {
    term: "Levée",
    def: RICH.Levée!,
    exam: "Levee",
    lab: "rivers",
    labTitle: "Rivers from source to mouth",
  },
  {
    term: "Trench",
    def: RICH.Trench!,
    lab: "plate-boundaries",
    labTitle: "Plate boundaries",
  },
  {
    term: "Drumlin",
    def: RICH.Drumlin!,
    lab: "glaciers",
    labTitle: "Glacial landforms",
  },
  {
    term: "Tombolo",
    def: RICH.Tombolo!,
    lab: "coasts",
    labTitle: "Coasts",
  },
  {
    term: "Doline",
    def: RICH.Doline!,
    exam: "Sinkhole",
    lab: "karst",
    labTitle: "Karst",
  },
  {
    term: "Floodplain",
    def: RICH.Floodplain!,
    lab: "rivers",
    labTitle: "Rivers from source to mouth",
  },
  {
    term: "Oxbow",
    def: RICH.Oxbow!,
    exam: "Oxbow lake",
    lab: "rivers",
    labTitle: "Rivers from source to mouth",
  },
  {
    term: "Delta",
    def: RICH.Delta!,
    lab: "river-deposition",
    labTitle: "River deposition",
  },
];

function dedupe(entries: GlossaryEntry[]): GlossaryEntry[] {
  const seen = new Map<string, GlossaryEntry>();
  for (const e of entries) {
    const k = e.term.toLowerCase();
    if (!seen.has(k)) seen.set(k, e);
  }
  return [...seen.values()].sort((a, b) => a.term.localeCompare(b.term));
}

export const GLOSSARY: GlossaryEntry[] = dedupe([
  ...LABS.flatMap((lab) =>
    lab.glossary.map((g) => ({
      term: g.term,
      def: expandDef(g.term, g.def, g.exam, lab.title),
      exam: g.exam,
      lab: lab.slug,
      labTitle: lab.title,
    })),
  ),
  ...EXTRA,
]);
