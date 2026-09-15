export type PathMeta = {
  slug: string;
  title: string;
  kicker: string;
  blurb: string;
  board: string;
  labs: string[];
  later: string[];
};

export const PATHS: PathMeta[] = [
  {
    slug: "gcse-physical-landscapes",
    title: "GCSE Physical Landscapes",
    kicker: "AQA 8035 · Edexcel · OCR",
    blurb:
      "Read a hill, then follow water off it, then the sea, then ice. Contours first. Rivers. Coasts. Glaciers.",
    board: "UK GCSE Geography",
    labs: ["contours", "rivers", "coasts", "glaciers", "mass-movement", "periglacial"],
    later: [],
  },
  {
    slug: "gcse-natural-hazards",
    title: "GCSE Natural Hazards",
    kicker: "AQA 3.1.1 · Edexcel hazards",
    blurb: "Plates first, then the sudden Earth: quakes, volcanoes, tsunami, tropical cyclones.",
    board: "UK GCSE Geography",
    labs: ["plate-boundaries", "earthquakes", "volcanoes", "tsunami", "tropical-cyclone", "storm-surge"],
    later: [],
  },
  {
    slug: "alevel-water-and-carbon",
    title: "A-level Water and Carbon",
    kicker: "AQA 3.1.1 · 3.1.2",
    blurb: "Stores and flows, then a basin, a hydrograph, a river regime, and the carbon cycle with a fossil-fuel tap.",
    board: "UK A-level Geography",
    labs: ["water-cycle", "drainage-basin", "hydrograph", "river-hydrology", "carbon-cycle", "enso", "groundwater"],
    later: [],
  },
  {
    slug: "ngss-earth-in-space",
    title: "NGSS Earth in Space",
    kicker: "MS-ESS1-1 · HS-ESS1",
    blurb: "Rotation, seasons, the Sun’s path, and the Moon. The clockwork that makes day, night, and the calendar.",
    board: "NGSS",
    labs: ["rotation", "seasons", "solar-altitude", "moon-phases"],
    later: [],
  },
  {
    slug: "apes-earth-systems",
    title: "APES Earth systems",
    kicker: "AP Environmental Science",
    blurb: "Atmosphere, water, soil, carbon. The systems APES treats as one planet, not eight topics.",
    board: "APES",
    labs: [
      "atmosphere-layers",
      "energy-budget",
      "water-cycle",
      "soil-profile",
      "carbon-cycle",
      "climate-types",
    ],
    later: [],
  },
  {
    slug: "why-seasons-happen",
    title: "Why seasons happen",
    kicker: "One question, three labs",
    blurb: "Tilt, then the Sun’s path over a school yard, then the year on a calculator.",
    board: "KS3 · NGSS",
    labs: ["seasons", "solar-altitude", "rotation"],
    later: [],
  },
  {
    slug: "how-a-river-ages",
    title: "How a river ages",
    kicker: "Source to mouth",
    blurb: "Long profile, then erosion, deposition, capture, and a hydrograph after rain.",
    board: "GCSE · A-level",
    labs: ["rivers", "river-erosion", "river-deposition", "river-capture", "hydrograph"],
    later: [],
  },
  {
    slug: "what-happens-at-a-plate-boundary",
    title: "What happens at a plate boundary",
    kicker: "Three colours, then the sudden Earth",
    blurb: "Divergent, convergent, transform. Then the hazards those edges write.",
    board: "GCSE · NGSS",
    labs: ["plate-boundaries", "folds-faults", "earthquakes", "volcanoes", "seafloor-spreading", "wilson-cycle", "isostasy"],
    later: [],
  },
  {
    slug: "planet-clockwork",
    title: "The planet as a clock",
    kicker: "KS3 · NGSS MS-ESS1-1",
    blurb: "Tilt, then the spinning Earth, then the Moon. The three labs that make day, night, season, and phase.",
    board: "KS3 · NGSS",
    labs: ["seasons", "rotation", "moon-phases"],
    later: [],
  },
];

export const PATH_BY_SLUG: Record<string, PathMeta> = Object.fromEntries(
  PATHS.map((p) => [p.slug, p]),
);
