import type { FigureProps } from "@/components/figure";
import { CASE_COVER_EXTRA } from "@/lib/photo-assign";

type Fig = Pick<FigureProps, "src" | "alt" | "caption" | "credit">;
const P = "/photos";

/** One photograph per case. Bound by case slug — never fall back to a lab cover. */
export const CASE_FIGURE: Record<string, Fig> = {
  "uk-daylength": {
    src: `${P}/terminator.jpg`,
    alt: "Earth from orbit with a sharp day-night terminator.",
    caption: "Day length is tilt and latitude, not distance to the Sun.",
    credit: "NASA, public domain",
  },
  "florida-insolation": {
    src: `${P}/sun-path.jpg`,
    alt: "The Sun’s path through the year as an analemma.",
    caption: "Miami’s December noon Sun stays high. London’s does not.",
    credit: "Wikimedia Commons, CC BY",
  },
  holderness: {
    src: `${P}/holderness-till.jpg`,
    alt: "Soft glacial-till cliffs and caravans on the Holderness coast at Skipsea, East Yorkshire.",
    caption: "Holderness is boulder clay — till — not the Seven Sisters chalk.",
    credit: "Geograph / Wikimedia Commons, CC BY-SA",
  },
  "jurassic-coast": {
    src: `${P}/durdle-door.jpg`,
    alt: "Durdle Door, a limestone arch on the Dorset Jurassic Coast.",
    caption: "Lias and limestone. Cave–arch–stack–stump in named rock, not Sussex chalk cliffs.",
    credit: "Wikimedia Commons, CC BY-SA",
  },
  "lake-district": {
    src: `${P}/cirque.jpg`,
    alt: "A steep-walled cirque bowl holding a tarn in glaciated mountains.",
    caption: "A Lake District cwm. Ice cut the armchair; a river did not.",
    credit: "Wikimedia Commons, CC BY-SA",
  },
  snowdonia: {
    src: `${P}/arete.jpg`,
    alt: "A glacial arête ridge with steep walls dropping to tarns.",
    caption: "Eryri: arêtes and cwms. Not a granite Yosemite poster.",
    credit: "Wikimedia Commons, CC BY-SA",
  },
  "yorkshire-dales": {
    src: `${P}/limestone-pavement.jpg`,
    alt: "A limestone pavement of clints split by grykes.",
    caption: "Carbonation along joints. The Dales pavement, not a granite slab.",
    credit: "Wikimedia Commons, CC BY-SA",
  },
  "somerset-levels": {
    src: `${P}/flood.jpg`,
    alt: "Floodwater over fields after a river overtops its banks.",
    caption: "A floodplain bargain. Hydrographs that sit for weeks.",
    credit: "USACE / public domain",
  },
  thames: {
    src: `${P}/thames-estuary.jpg`,
    alt: "The Thames Barrier spanning the drowned tidal Thames in east London.",
    caption: "A drowned river and a barrier. Tides, not orographic cloud.",
    credit: "Wikimedia Commons, CC BY-SA",
  },
  iceland: {
    src: `${P}/iceland.jpg`,
    alt: "Iceland from space, a volcanic island on the Mid-Atlantic Ridge.",
    caption: "A ridge with a country on it. Divergent, plus a hotspot.",
    credit: "NASA, public domain",
  },
  "san-andreas": {
    src: `${P}/san-andreas.jpg`,
    alt: "The San Andreas Fault cutting arid hills in California.",
    caption: "A right-lateral transform. Not a volcanic arc.",
    credit: "USGS, public domain",
  },
  cascadia: {
    src: `${P}/stratovolcano.jpg`,
    alt: "A steep snow-capped stratovolcano above cloud.",
    caption: "A volcanic arc above a trench. Subduction, not the San Andreas.",
    credit: "USGS / public domain",
  },
  yellowstone: {
    src: `${P}/yellowstone-hot.jpg`,
    alt: "Grand Prismatic Spring: a hydrothermal pool in the Yellowstone caldera.",
    caption: "A continental hotspot. Geysers, not a cutaway of Earth’s core.",
    credit: "Wikimedia Commons / NPS, public domain",
  },
  hawaii: {
    src: `${P}/shield-volcano.jpg`,
    alt: "A broad shield volcano of stacked basalt.",
    caption: "A hotspot track of runny basalt. Not an island arc.",
    credit: "USGS, public domain",
  },
  "grand-canyon": {
    src: `${P}/grand-canyon.jpg`,
    alt: "Grand Canyon layered sedimentary walls cut by the Colorado River.",
    caption: "Sedimentary strata and a river. Not a granite close-up.",
    credit: "NPS, public domain",
  },
  mississippi: {
    src: `${P}/mississippi.jpg`,
    alt: "The Mississippi looping across its floodplain.",
    caption: "Levées, cut-offs, a continental drain.",
    credit: "Wikimedia Commons, CC BY",
  },
  yosemite: {
    src: `${P}/yosemite.jpg`,
    alt: "Yosemite Valley: a wide U-trough with steep granite walls.",
    caption: "A glacial trough in granite. Ice, not a young V-valley.",
    credit: "NPS, public domain",
  },
  "katrina-sandy": {
    src: `${P}/hurricane.jpg`,
    alt: "Satellite view of a tropical cyclone with a clear eye.",
    caption: "Warm-core. Storm surge on a coast, not a UK winter front.",
    credit: "NASA, public domain",
  },
  "dust-bowl": {
    src: `${P}/gully.jpg`,
    alt: "A deep gully cut into a soil slope.",
    caption: "Wind plus a broken A horizon. Soil as a resource that can leave.",
    credit: "Wikimedia Commons, CC BY",
  },
  colorado: {
    src: `${P}/cases/colorado.jpg`,
    alt: "The Colorado Front Range: height writes the air.",
    caption: "A mile-high step onto the plains. Height writes the air.",
    credit: "NPS, public domain",
  },
  greenwich: {
    src: `${P}/cases/greenwich.jpg`,
    alt: "The Royal Observatory at Greenwich — a political line on a spinning sphere.",
    caption: "Longitude is a bargain about a line, not a physical ridge.",
    credit: "Wikimedia Commons, CC BY-SA",
  },
  "time-zones-us": {
    src: `${P}/africa-globe.jpg`,
    alt: "A continent sitting on a sphere, not stretched on a rectangle.",
    caption: "A time zone is a political cut of a spinning sphere.",
    credit: "NASA, public domain",
  },
  kola: {
    src: `${P}/earth-interior-science.jpg`,
    alt: "Scientific cutaway of Earth’s crust, mantle and core.",
    caption: "The deepest borehole still sat in crust. Waves, not a well, read the core.",
    credit: "TerraLens classroom drawing after USGS layer radii",
  },
  "snowdonia-moon": {
    src: `${P}/cases/snowdonia-moon.jpg`,
    alt: "First-quarter Moon with earthshine.",
    caption: "The same phase is up in Eryri that night. Weather is local. Phase is not.",
    credit: "NASA, public domain",
  },
  "yosemite-moon": {
    src: `${P}/cases/yosemite-moon.jpg`,
    alt: "A waning Moon — the same phase everywhere that night.",
    caption: "Phase is a viewing angle. A valley does not change the Moon.",
    credit: "NASA / Wikimedia, public domain",
  },
  "outer-banks": {
    src: `${P}/outer-banks.jpg`,
    alt: "Cape Hatteras National Seashore: a sandy barrier-island chain and inlet.",
    caption: "Sand in a barrier, not a chalk cliff. Longshore still writes the budget.",
    credit: "NPS / Wikimedia Commons, public domain",
  },
  "mammoth-cave": {
    src: `${P}/mammoth-cave.jpg`,
    alt: "Tourists inside a large limestone passage at Mammoth Cave, Kentucky.",
    caption: "A cave in carbonate rock. Not a limestone pavement photographed from above.",
    credit: "Wikimedia Commons, CC BY-SA",
  },
  "phoenix-heat": {
    src: `${P}/phoenix-city.jpg`,
    alt: "Downtown Phoenix, Arizona, at night: a desert city of asphalt and roofs.",
    caption: "Urban heat in a dry basin. Not a mountain cloud.",
    credit: "Wikimedia Commons, CC BY",
  },
  "uk-sea-breeze": {
    src: `${P}/cumulonimbus.jpg`,
    alt: "A cumulonimbus tower with an anvil in the troposphere.",
    caption: "Land heats, a loop starts, cool air comes in from the water.",
    credit: "Wikimedia Commons, CC BY-SA",
  },
  "cairngorms-albedo": {
    src: `${P}/greenland-ice.jpg`,
    alt: "A thick ice sheet with crevasses and a bright surface.",
    caption: "Snow is a bright lid. Albedo is a number you can change with a season.",
    credit: "NASA / Wikimedia Commons, public domain",
  },
  "denver-air": {
    src: `${P}/airglow.jpg`,
    alt: "Earth’s atmosphere as a thin glowing film on the limb.",
    caption: "A mile up is still troposphere. Weather’s layer is thick compared with Denver.",
    credit: "NASA, public domain",
  },
  "hong-kong-landslide": {
    src: `${P}/hong-kong.jpg`,
    alt: "Hong Kong Island and Victoria Harbour, steep weathered slopes above a dense city.",
    caption: "Weathered granite, steep catchments, a city on the toe. Mass movement is the syllabus.",
    credit: "Wikimedia Commons, CC BY-SA",
  },
  "shanghai-huangpu": {
    src: `${P}/shanghai.jpg`,
    alt: "Pudong and the Huangpu: a tidal river through a delta megacity.",
    caption: "A drowned river on a delta. Meiyu, tide, and a flood wall.",
    credit: "Wikimedia Commons, CC BY-SA",
  },
  "typhoon-mangkhut": {
    src: `${P}/cases/typhoon-mangkhut.jpg`,
    alt: "Typhoon Mangkhut from orbit.",
    caption: "A typhoon is a tropical cyclone. The same warm-core engine, a western North Pacific name.",
    credit: "NASA, public domain",
  },
  "loess-plateau": {
    src: `${P}/loess.jpg`,
    alt: "Dissected yellow loess hills of the Loess Plateau, China.",
    caption: "Wind-laid silt, then water. A soil-erosion classroom the size of a province.",
    credit: "Wikimedia Commons, CC BY-SA",
  },
};

export function caseFigure(slug: string): Fig | undefined {
  const extra = CASE_COVER_EXTRA[slug];
  if (extra) {
    return { src: extra.src, alt: extra.alt, caption: extra.caption, credit: extra.credit };
  }
  const base = CASE_FIGURE[slug];
  if (!base) return undefined;
  return { ...base, src: `/photos/cases/${slug}.jpg` };
}
