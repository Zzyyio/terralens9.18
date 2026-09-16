import type { FigureProps } from "@/components/figure";
import type { RealmSlug } from "@/lib/labs/types";

type Fig = Pick<FigureProps, "src" | "alt" | "caption" | "credit">;

const P = "/photos";

const earth: Fig = {
  src: `${P}/earth-apollo17.jpg`,
  alt: "The whole Earth as a sphere seen from space, Africa and Antarctica under cloud.",
  caption: "A sphere, not a table of seasons. Axial tilt writes the calendar.",
  credit: "NASA / Apollo 17, public domain",
};
const moon: Fig = {
  src: `${P}/moon.jpg`,
  alt: "Gibbous Moon with visible craters, half the disk in sunlight.",
  caption: "Half the Moon is always sunlit. Phase is the viewing angle.",
  credit: "NASA, public domain",
};
const volcano: Fig = {
  src: `${P}/stratovolcano.jpg`,
  alt: "A steep snow-capped stratovolcano cone rising above cloud.",
  caption: "Stickier magma stacks a steep cone.",
  credit: "USGS / public domain",
};
const shield: Fig = {
  src: `${P}/shield-volcano.jpg`,
  alt: "A broad shield volcano of stacked basalt, gentle slopes from a central summit.",
  caption: "Low-viscosity basalt builds a shield, not a steep cone.",
  credit: "USGS, public domain",
};
const glacier: Fig = {
  src: `${P}/glacier.jpg`,
  alt: "A thick valley glacier filling a U-shaped trough between rock walls.",
  caption: "Ice has thickness. It is not a white sticker.",
  credit: "Wikimedia Commons, CC BY-SA",
};
const yosemite: Fig = {
  src: `${P}/yosemite.jpg`,
  alt: "Yosemite Valley: a wide U-trough with steep granite walls and a hanging valley.",
  caption: "A glacial trough, not a river canyon.",
  credit: "NPS, public domain",
};
const soil: Fig = {
  src: `${P}/soil-profile.jpg`,
  alt: "A vertical soil pit showing dark A horizon over paler and redder layers to weathered rock.",
  caption: "A field pit. Horizons have thickness; E can be missing in some soils.",
  credit: "USDA NRCS, public domain",
};
const soilHorizons: Fig = {
  src: `${P}/soil-horizons.jpg`,
  alt: "A labelled soil profile with O, A, E, B, C and R horizons visible in section.",
  caption: "O–A–E–B–C–R. The pale E is leaching, not missing rock.",
  credit: "USDA / Wikimedia Commons, public domain",
};
const hurricane: Fig = {
  src: `${P}/hurricane.jpg`,
  alt: "Satellite view of a tropical cyclone with a clear eye and spiral rainbands.",
  caption: "Eye, eyewall, rainbands. Warm-core. Not a UK winter storm.",
  credit: "NASA, public domain",
};
const tsunami: Fig = {
  src: `${P}/tsunami.jpg`,
  alt: "Coastal streets inundated by a tsunami, water drawn inland across a town.",
  caption: "A tsunami is a long wave, not a hurricane. Deep-ocean amplitude is small.",
  credit: "USGS / public domain",
};
const fault: Fig = {
  src: `${P}/san-andreas.jpg`,
  alt: "A linear scar of the San Andreas Fault cutting arid hills in California.",
  caption: "A transform slide, not a volcanic arc. Keep this photo on plates, not every quake.",
  credit: "USGS, public domain",
};
const rupture: Fig = {
  src: `${P}/earthquake-rupture.jpg`,
  alt: "A surface rupture offsetting a road after an earthquake.",
  caption: "Focus at depth, epicentre above. The scar is the slip, not a volcano.",
  credit: "USGS, public domain",
};
const meander: Fig = {
  src: `${P}/meander.jpg`,
  alt: "A river looping across a floodplain with an oxbow lake beside the channel.",
  caption: "Outer bend erodes. Inner bend deposits.",
  credit: "USGS, public domain",
};
const karst: Fig = {
  src: `${P}/limestone-pavement.jpg`,
  alt: "A limestone pavement of clints split by grykes.",
  caption: "Carbonation along joints. Not a granite slab.",
  credit: "Wikimedia Commons, CC BY-SA",
};
const spit: Fig = {
  src: `${P}/spit.jpg`,
  alt: "A sand spit built by longshore drift, curving into open water.",
  caption: "Longshore drift with a free end.",
  credit: "Wikimedia Commons, CC BY-SA",
};
const stack: Fig = {
  src: `${P}/stack.jpg`,
  alt: "Sea stacks standing off a chalk headland after the arch has collapsed.",
  caption: "Cave–arch–stack–stump is one rock, cut in stages.",
  credit: "Wikimedia Commons, CC BY-SA",
};
const barchan: Fig = {
  src: `${P}/barchan.jpg`,
  alt: "Wind-built dunes in the Namib, crescent forms with horns pointing downwind.",
  caption: "A barchan’s horns point downwind.",
  credit: "NASA / Wikimedia Commons, public domain",
};
const fold: Fig = {
  src: `${P}/anticline.jpg`,
  alt: "Upturned sedimentary beds forming an anticline in a road cut.",
  caption: "Oldest beds in the core of an anticline.",
  credit: "USGS / Wikimedia Commons, public domain",
};
const syncline: Fig = {
  src: `${P}/syncline.jpg`,
  alt: "A syncline road cut with beds folding down into a trough.",
  caption: "Youngest beds in the core of a syncline.",
  credit: "USGS / Wikimedia Commons, public domain",
};
const front: Fig = {
  src: `${P}/cold-front.jpg`,
  alt: "A shelf cloud along a cold-front gust, dark and linear.",
  caption: "A cold front is a wedge of denser air, not a painted line.",
  credit: "NOAA, public domain",
};
const frontSat: Fig = {
  src: `${P}/cold-front-sat.jpg`,
  alt: "Satellite image of a cold-front cloud band sweeping across a continent.",
  caption: "The cloud band is the slope of the wedge, seen from above.",
  credit: "NOAA / NASA, public domain",
};
const cirque: Fig = {
  src: `${P}/cirque.jpg`,
  alt: "A steep-walled cirque bowl holding a tarn.",
  caption: "Cirque: the armchair the ice sat in.",
  credit: "Wikimedia Commons, CC BY-SA",
};
const horn: Fig = {
  src: `${P}/horn.jpg`,
  alt: "A sharp pyramidal horn peak with arêtes dropping from the summit.",
  caption: "Three cirques back-to-back leave a horn.",
  credit: "Wikimedia Commons, CC BY-SA",
};
const terminator: Fig = {
  src: `${P}/terminator.jpg`,
  alt: "Earth from orbit with a sharp day-night terminator and city lights on the night side.",
  caption: "The terminator walks with tilt through the year.",
  credit: "NASA, public domain",
};
const ridge: Fig = {
  src: `${P}/iceland.jpg`,
  alt: "Iceland from space, a volcanic island sitting on the Mid-Atlantic Ridge.",
  caption: "New crust at a ridge. Iceland sits on the split.",
  credit: "NASA, public domain",
};
const canyon: Fig = {
  src: `${P}/grand-canyon.jpg`,
  alt: "Grand Canyon layered sedimentary walls cut by the Colorado River.",
  caption: "A river canyon. Yosemite is the glacial pair, not this.",
  credit: "NPS, public domain",
};
const chalk: Fig = {
  src: `${P}/chalk.jpg`,
  alt: "White chalk cliffs above a pebble beach.",
  caption: "Chalk is limestone. An aquifer, not an underground lake.",
  credit: "Wikimedia Commons, CC BY-SA",
};
const patterned: Fig = {
  src: `${P}/patterned-ground.jpg`,
  alt: "Polygonal patterned ground in a periglacial landscape.",
  caption: "Freeze–thaw without a glacier.",
  credit: "USGS, public domain",
};
const clouds: Fig = {
  src: `${P}/orographic.jpg`,
  alt: "Cloud piled on the windward face of a mountain range, clear on the lee.",
  caption: "Air cools as it rises. The lee is the rain shadow.",
  credit: "NASA, public domain",
};
const interior: Fig = {
  src: `${P}/earth-interior.jpg`,
  alt: "Scientific cutaway of Earth showing a thin crust, thick mantle, liquid outer core and solid inner core.",
  caption: "Scientific visualization, not a photograph. Crust is a film. Outer core is liquid metal.",
  credit: "USGS, public domain",
};
const arete: Fig = {
  src: `${P}/arete.jpg`,
  alt: "A sharp glacial arête ridge with steep walls dropping to tarns.",
  caption: "Two cirques back-to-back leave a knife ridge.",
  credit: "Wikimedia Commons, CC BY-SA",
};
const flood: Fig = {
  src: `${P}/flood.jpg`,
  alt: "A river in flood over a levee breach, water covering fields.",
  caption: "The hydrograph’s peak is this: water still arriving after the rain has stopped.",
  credit: "USACE / public domain",
};
const stormCloud: Fig = {
  src: `${P}/cumulonimbus.jpg`,
  alt: "A cumulonimbus tower with an anvil spreading in the upper troposphere.",
  caption: "Weather lives in the troposphere. The anvil is the lid.",
  credit: "Wikimedia Commons, CC BY-SA",
};
const forest: Fig = {
  src: `${P}/carbon-store.jpg`,
  alt: "A closed tropical forest canopy, a living carbon store.",
  caption: "A carbon reservoir. Fossil fuel is an extra flux, not another water cycle.",
  credit: "NASA, public domain",
};
const currents: Fig = {
  src: `${P}/ocean-currents.jpg`,
  alt: "Sea-surface temperature showing a warm western-boundary current peeling from a coast.",
  caption: "A current is a moving water mass, not a painted arrow on a map.",
  credit: "NASA / NOAA, public domain",
};
const enso: Fig = {
  src: `${P}/enso.jpg`,
  alt: "Pacific sea-surface temperature anomaly map with a warm tongue in the east.",
  caption: "El Niño: warm water in the east Pacific, rain follows the warm pool.",
  credit: "NOAA, public domain",
};
const landslide: Fig = {
  src: `${P}/landslide.jpg`,
  alt: "A rotational landslide scar with a hummocky toe of debris.",
  caption: "A mass of rock and soil moved downslope. Not a beach spit.",
  credit: "USGS, public domain",
};
const biome: Fig = {
  src: `${P}/climate-biome.jpg`,
  alt: "A savanna of scattered trees and grass under a high sun.",
  caption: "A climate type is a vegetation and water story, not a flag colour.",
  credit: "Wikimedia Commons, CC BY-SA",
};
const granite: Fig = {
  src: `${P}/rock-granite.jpg`,
  alt: "A close granite outcrop with visible crystals of quartz, feldspar and mica.",
  caption: "Igneous texture you can name. The rock cycle is a path, not a colour.",
  credit: "NPS / public domain",
};
const rebound: Fig = {
  src: `${P}/isostasy.jpg`,
  alt: "A raised shoreline left after ice unloaded the crust.",
  caption: "Unload ice, the crust rises. Isostasy is a balance, not a flood myth.",
  credit: "USGS / public domain",
};
const itcz: Fig = {
  src: `${P}/itcz.jpg`,
  alt: "A band of equatorial thunderstorms marking the ITCZ from space.",
  caption: "The ITCZ is a rain band, not the whole Hadley cell.",
  credit: "NASA, public domain",
};
const waterCarbon: Fig = {
  src: `${P}/carbon-store.jpg`,
  alt: "A closed tropical forest canopy, a living carbon store above a wet catchment.",
  caption: "Water and carbon as stores and flows. Not a river meander.",
  credit: "NASA, public domain",
};
const solarSystem: Fig = {
  src: `${P}/earth-apollo17.jpg`,
  alt: "The whole Earth as a sphere seen from space — one planet, not a seasons table.",
  caption: "A sphere among other spheres. This is not a table of seasons.",
  credit: "NASA / Apollo 17, public domain",
};

export const LAB_FIGURE: Record<string, Fig> = {
  seasons: earth,
  rotation: terminator,
  "moon-phases": moon,
  "earth-interior": interior,
  "plate-boundaries": ridge,
  contours: yosemite,
  rivers: meander,
  "water-cycle": chalk,
  volcanoes: volcano,
  "soil-texture": soil,
  "solar-system": solarSystem,
  tides: moon,
  "seafloor-spreading": ridge,
  "atmosphere-layers": stormCloud,
  glaciers: glacier,
  "sun-earth": earth,
  "solar-altitude": earth,
  eclipses: moon,
  "universe-scale": earth,
  "geologic-time": canyon,
  "continental-drift": ridge,
  hotspots: shield,
  earthquakes: rupture,
  tsunami,
  "tropical-cyclone": hurricane,
  "energy-budget": earth,
  "thermal-circulation": clouds,
  wind: clouds,
  "three-cell": itcz,
  fronts: frontSat,
  "cyclone-anticyclone": front,
  "climate-types": biome,
  enso,
  "drainage-basin": meander,
  hydrograph: flood,
  "river-hydrology": meander,
  "ocean-currents": currents,
  thermohaline: currents,
  "carbon-cycle": forest,
  "landform-types": yosemite,
  "river-erosion": canyon,
  "river-deposition": meander,
  "river-capture": meander,
  coasts: spit,
  karst,
  "folds-faults": fold,
  aeolian: barchan,
  "rock-cycle": granite,
  "soil-profile": soilHorizons,
  weathering: chalk,
  "soil-erosion": soil,
  graticule: earth,
  "map-projections": earth,
  "grid-references": yosemite,
  "mass-movement": landslide,
  "rain-shadow": clouds,
  groundwater: chalk,
  isostasy: rebound,
  "wilson-cycle": ridge,
  "soil-catena": soil,
  periglacial: patterned,
  "storm-surge": flood,
};

/** Field example + mechanism. Two photos per Why panel. */
export const LAB_FIGURES: Record<string, [Fig, Fig]> = {
  seasons: [earth, terminator],
  rotation: [terminator, earth],
  "moon-phases": [moon, earth],
  "earth-interior": [interior, rupture],
  "plate-boundaries": [ridge, fault],
  contours: [yosemite, glacier],
  rivers: [meander, flood],
  "water-cycle": [chalk, clouds],
  volcanoes: [volcano, shield],
  "soil-texture": [soil, soilHorizons],
  "solar-system": [solarSystem, moon],
  tides: [moon, earth],
  "seafloor-spreading": [ridge, fault],
  "atmosphere-layers": [stormCloud, terminator],
  glaciers: [glacier, yosemite],
  "sun-earth": [earth, terminator],
  "solar-altitude": [earth, terminator],
  eclipses: [moon, earth],
  "universe-scale": [earth, moon],
  "geologic-time": [canyon, chalk],
  "continental-drift": [ridge, fold],
  hotspots: [shield, volcano],
  earthquakes: [rupture, fault],
  tsunami: [tsunami, ridge],
  "tropical-cyclone": [hurricane, stormCloud],
  "energy-budget": [earth, clouds],
  "thermal-circulation": [clouds, stormCloud],
  wind: [clouds, frontSat],
  "three-cell": [itcz, clouds],
  fronts: [frontSat, front],
  "cyclone-anticyclone": [front, hurricane],
  "climate-types": [biome, clouds],
  enso: [enso, currents],
  "drainage-basin": [meander, flood],
  hydrograph: [flood, meander],
  "river-hydrology": [meander, flood],
  "ocean-currents": [currents, enso],
  thermohaline: [currents, glacier],
  "carbon-cycle": [forest, stormCloud],
  "landform-types": [yosemite, canyon],
  "river-erosion": [canyon, meander],
  "river-deposition": [meander, spit],
  "river-capture": [meander, canyon],
  coasts: [spit, stack],
  karst: [karst, chalk],
  "folds-faults": [fold, syncline],
  aeolian: [barchan, clouds],
  "rock-cycle": [granite, fold],
  "soil-profile": [soilHorizons, soil],
  weathering: [chalk, karst],
  "soil-erosion": [soil, flood],
  graticule: [earth, terminator],
  "map-projections": [earth, ridge],
  "grid-references": [yosemite, earth],
  "mass-movement": [landslide, soil],
  "rain-shadow": [clouds, barchan],
  groundwater: [chalk, karst],
  isostasy: [rebound, glacier],
  "wilson-cycle": [ridge, fold],
  "soil-catena": [soil, soilHorizons],
  periglacial: [patterned, glacier],
  "storm-surge": [flood, hurricane],
};

export const TERM_FIGURE: Record<string, Fig> = {
  Cirque: cirque,
  Arête: arete,
  Arete: arete,
  "Arête / arete": arete,
  Horn: horn,
  Spit: spit,
  Stack: stack,
  Barchan: barchan,
  Anticline: fold,
  Syncline: syncline,
  "Soil profile": soilHorizons,
  "A horizon": soil,
  "E horizon": soilHorizons,
  Terminator: terminator,
  "Terminator (day–night)": terminator,
  "Terminator (seasonal walk)": terminator,
  Hydrograph: flood,
  Stratovolcano: volcano,
  "Shield volcano": shield,
  Shield: shield,
  Meander: meander,
  "Cold front": frontSat,
  "Axial tilt": earth,
  "Outer core": interior,
  Hotspot: shield,
  Pangaea: ridge,
  "Limestone pavement": karst,
  Clint: karst,
  Gryke: karst,
  Viscosity: volcano,
  "Longshore drift": spit,
  "U-shaped valley": yosemite,
  "U-trough": glacier,
  "Patterned ground": patterned,
  Permafrost: patterned,
  "Rain shadow": clouds,
  "Orographic rainfall": clouds,
  Aquifer: chalk,
  "Water table": chalk,
  "Storm surge": flood,
  Eye: hurricane,
  Eyewall: hurricane,
  Tsunami: tsunami,
  "Tropical cyclone": hurricane,
  "Mid-ocean ridge": ridge,
  "Magnetic stripe": ridge,
  "San Andreas": fault,
  Transform: fault,
  "Transform fault": fault,
  Focus: rupture,
  Epicentre: rupture,
  "P-wave": interior,
  "S-wave": interior,
  Mantle: interior,
  Crust: interior,
  "Inner core": interior,
  Oxbow: meander,
  Levée: meander,
  Levee: meander,
  Floodplain: flood,
  "Peak discharge": flood,
  Lag: flood,
  "Rising limb": flood,
  Glacier: glacier,
  "Valley glacier": glacier,
  Tarn: cirque,
  Cumulonimbus: stormCloud,
  Troposphere: stormCloud,
  ITCZ: itcz,
  "Hadley cell": itcz,
  "Carbon store": forest,
  "Walker cell": enso,
  "El Niño": enso,
};

export const REALM_FIGURE: Record<RealmSlug, Fig> = {
  planet: terminator,
  interior: interior,
  atmosphere: stormCloud,
  water: waterCarbon,
  landforms: yosemite,
  soils: soilHorizons,
  hazards: volcano,
  skills: earth,
};

export function labFigure(slug: string): Fig | undefined {
  return LAB_FIGURE[slug];
}

export function labFigures(slug: string): Fig[] {
  const pair = LAB_FIGURES[slug];
  if (pair) return pair;
  const one = LAB_FIGURE[slug];
  return one ? [one] : [];
}

export function termFigure(term: string): Fig | undefined {
  if (TERM_FIGURE[term]) return TERM_FIGURE[term];
  const hit = Object.keys(TERM_FIGURE).find((k) => k.toLowerCase() === term.toLowerCase());
  if (hit) return TERM_FIGURE[hit];
  const stripped = term.replace(/s$/, "");
  return TERM_FIGURE[stripped];
}
