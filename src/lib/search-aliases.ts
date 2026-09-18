/** Course codes and Chinese synonyms that should hit English labs, cases, and places. */
export const SEARCH_ALIASES: Record<string, string> = {
  季节: "seasons",
  四季: "seasons",
  台风: "tropical-cyclone",
  飓风: "tropical-cyclone",
  滑坡: "mass-movement",
  黄土: "loess",
  三峡: "three gorges",
  香港: "hong kong",
  上海: "shanghai",
  黄浦: "shanghai",
  台湾: "taiwan",
  臺灣: "taiwan",
  澳门: "macau",
  澳門: "macau",
  月球: "moon",
  潮汐: "tides",
  板块: "plate",
  冰川: "glacier",
  河流: "river",
  海岸: "coast",
  土壤: "soil",
  地震: "earthquake",
  火山: "volcano",
  等高线: "contours",
  "aqa 8035": "gcse",
  "ms-ess1-1": "seasons",
  "hs-ess1": "solar-system",
};

export function expandSearchNeedle(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  const hit = SEARCH_ALIASES[t] ?? SEARCH_ALIASES[t.toLowerCase()];
  return (hit ?? t).toLowerCase();
}
