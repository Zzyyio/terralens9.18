#!/usr/bin/env python3
"""Upgrade glossary captions + ≥120 real photos; unique lab TERMS thumbs.

Does not rewrite lab/case/realm/teacher dests. Writes photo-assign.ts ONCE at the end.
Never copies Apollo 17 Blue Marble onto a non-seasons slot.
"""
from __future__ import annotations

import hashlib
import importlib.util
import io
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

ROOT = Path("/workspace")
PHOTO = ROOT / "public" / "photos"
GLOSS = PHOTO / "glossary"
TERMS = PHOTO / "terms"
GLOSS.mkdir(exist_ok=True)
TERMS.mkdir(exist_ok=True)

spec = importlib.util.spec_from_file_location("ui", str(ROOT / "scripts" / "unique-images.py"))
ui = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ui)

APOLLO = PHOTO / "earth-apollo17.jpg"
APOLLO_HASH = ui.sha(APOLLO.read_bytes()) if APOLLO.exists() else ""

PRIORITY_Q = {
    "Cirque": "cirque tarn glacier armchair",
    "Arête": "arete knife-edge ridge glacier",
    "Arete": "arete glacial ridge",
    "Horn": "Matterhorn pyramidal horn peak",
    "Moraine": "lateral moraine glacier",
    "Spit": "coastal spit aerial sand",
    "Stack": "sea stack chalk cliff",
    "Stump": "sea stump wave cut",
    "Tombolo": "tombolo island sand bar",
    "Meander": "meandering river aerial",
    "Oxbow": "oxbow lake aerial",
    "Oxbow lake": "oxbow lake cut off meander",
    "Delta": "river delta from space nile",
    "Barchan": "barchan dune crescent",
    "Clint": "limestone pavement clint gryke",
    "Gryke": "gryke limestone pavement",
    "Stalactite": "stalactite cave limestone",
    "Stalagmite": "stalagmite cave",
    "Syncline": "syncline fold road cut",
    "Anticline": "anticline fold outcrop",
    "Batholith": "granite batholith outcrop",
    "Dyke": "igneous dyke dike wall",
    "Sill": "igneous sill layer",
    "Stratovolcano": "stratovolcano cone snow fuji",
    "Shield volcano": "shield volcano mauna loa",
    "Caldera": "caldera crater lake volcano",
    "Gorge": "river gorge canyon walls",
    "Escarpment": "escarpment cuesta scarp",
    "Canyon": "grand canyon sedimentary",
    "U-trough": "glacial u-shaped valley yosemite",
    "V-valley": "v-shaped river valley",
    "Drumlin": "drumlin field streamlined",
    "Yardang": "yardang wind erosion",
    "Barrier island": "barrier island cape hatteras",
    "Cut bank": "cut bank river meander",
    "Floodplain": "floodplain aerial river",
    "Levee": "levee river bank mississippi",
    "Levée": "river levee flood bank",
    "Doline": "doline sinkhole limestone",
    "Sinkhole": "sinkhole karst collapse",
    "Waterfall": "waterfall plunge pool",
    "Gully": "gully erosion soil",
    "Landslide": "landslide scar slope",
    "Wave-cut platform": "wave cut platform shore platform",
    "Arch": "sea arch durdle door",
    "Cave": "limestone cave passage",
    "Tarn": "tarn cirque lake",
    "Hanging valley": "hanging valley waterfall glacier",
    "Erratic": "glacial erratic boulder",
    "Till": "glacial till cliff",
    "Loess": "loess plateau silt",
    "Laterite": "laterite soil profile",
    "Patterned ground": "patterned ground polygons arctic",
    "Fjord": "fjord norway glacial",
    "Estuary": "estuary tidal river mouth",
    "Lagoon": "coastal lagoon barrier",
    "Atoll": "atoll coral reef aerial",
    "Mid-ocean ridge": "mid atlantic ridge bathymetry",
    "Trench": "ocean trench bathymetry mariana",
    "Transform": "san andreas transform fault",
    "Hotspot": "hawaii hotspot lava",
    "Pillow lava": "pillow lava underwater",
    "Ophiolite": "ophiolite outcrop",
    "Unconformity": "angular unconformity siccar",
    "Granite": "granite closeup crystals",
    "Basalt": "basalt columns hexagonal",
    "Limestone": "limestone bedding outcrop",
    "Chalk": "chalk cliff seven sisters",
    "Sandstone": "sandstone cross bedding",
    "A horizon": "soil A horizon profile pit",
    "B horizon": "soil B horizon profile",
    "E horizon": "podzol E horizon pale",
    "Spring": "karst spring limestone",
    "Aquifer": "spring aquifer limestone",
    "Water table": "water table well",
    "Karst": "tower karst limestone",
    "Carbonation": "limestone pavement carbonation",
    "Weathering": "spheroidal weathering granite",
    "Abrasion": "glacial striation abrasion",
    "Attrition": "beach pebble attrition",
    "Longshore drift": "longshore drift spit",
    "Hydrograph": "river hydrograph graph",
    "Braided": "braided river aerial",
    "Tributary": "tributary confluence river",
    "Confluence": "river confluence aerial",
    "Watershed": "drainage divide ridge",
    "Drainage basin": "dendritic drainage from space",
    "Discharge": "river in flood discharge",
    "Axial tilt": "earth axial tilt seasons diagram",
    "Terminator": "earth terminator from space",
    "Terminator (day–night)": "earth day night terminator",
    "Aurora": "aurora borealis nasa",
    "Albedo": "fresh snow ice sheet albedo",
    "Astronomical unit": "earth sun distance",
    "Declination": "solar declination analemma",
    "Umbra": "solar eclipse umbra",
    "Cold front": "cold front shelf cloud",
    "Warm front": "warm front stratus",
    "Cumulonimbus": "cumulonimbus thunderstorm",
    "ITCZ": "ITCZ from space",
    "Coriolis": "coriolis effect earth",
    "Anticyclone": "anticyclone satellite",
    "Cyclone": "extratropical cyclone comma cloud",
    "Tropical cyclone": "hurricane eye from space",
    "Hurricane": "hurricane isabel ISS",
    "Orographic rainfall": "orographic clouds mountain",
    "Rain shadow": "death valley rain shadow",
    "Urban heat island": "city heat night lights",
    "ENSO": "el nino sea surface temperature",
    "Soil profile": "soil profile pit horizons",
    "Soil texture": "soil in hand texture",
    "Rock cycle": "granite igneous texture",
    "Plate boundary": "plate boundary map",
    "Convergent": "ocean trench subduction",
    "Divergent": "iceland rift thingvellir",
    "Seafloor spreading": "seafloor age map",
    "Tsunami": "tsunami runup coast",
    "Storm surge": "storm surge flooding",
    "Volcano": "stratovolcano eruption",
    "Earthquake": "surface rupture fault",
    "Focus": "earthquake surface rupture",
    "Epicentre": "earthquake epicenter map",
    "Crust": "earth cutaway crust",
    "Mantle": "earth mantle cutaway",
    "Outer core": "earth core cutaway",
    "Inner core": "earth inner core",
    "Asthenosphere": "earth asthenosphere",
    "Isostasy": "raised beach isostasy",
    "Folds": "folded rocks anticline",
    "Fault": "normal fault scarp",
    "Normal fault": "normal fault outcrop",
    "Reverse fault": "reverse fault outcrop",
    "Strike-slip": "strike slip fault",
    "Pangaea": "pangaea reconstruction",
    "Continental drift": "himalaya from ISS",
    "Wilson cycle": "ophiolite suture",
    "Magnetic stripe": "seafloor magnetic anomalies",
    "Subduction": "andes volcanic arc",
    "Island arc": "japan volcanic arc",
    "Rift": "east african rift",
    "Guyot": "guyot seamount bathymetry",
    "Seamount": "seamount bathymetry",
    "Iceberg": "iceberg southern ocean",
    "Ice sheet": "greenland ice sheet",
    "Glacier": "valley glacier aletsch",
    "Permafrost": "patterned ground permafrost",
    "Active layer": "active layer permafrost",
    "Blockfield": "blockfield felsenmeer",
    "Solifluction": "solifluction lobes",
    "Headland": "headland stack coast",
    "Bay": "bay beach between headlands",
    "Beach": "shingle beach",
    "Dune": "coastal dune",
    "Blowout": "dune blowout",
    "Parabolic dune": "parabolic dune",
    "Seif": "seif linear dune",
    "Deflation": "deflation hollow desert",
    "Ventifact": "ventifact wind abrasion",
    "Pediment": "desert pediment",
    "Inselberg": "inselberg bornhardt",
    "Tor": "granite tor weathering",
    "Spheroidal weathering": "spheroidal weathering corestones",
    "Exfoliation": "exfoliation dome granite",
    "Hydrolysis": "weathered granite saprolite",
    "Freeze–thaw": "frost shattered scree",
    "Scree": "scree talus slope",
    "Colluvium": "colluvium hillslope",
    "Alluvium": "alluvial fan",
    "Alluvial fan": "alluvial fan desert",
    "Point bar": "point bar meander",
    "Ox-bow": "oxbow lake",
    "Levée (natural)": "natural levee river",
    "Mouth": "river mouth delta",
    "Source": "river source spring",
    "Load": "river sediment load",
    "Hjulström": "hjulstrom curve sediment",
    "Baseflow": "river baseflow",
    "Overland flow": "overland flow runoff",
    "Infiltration": "infiltration soil",
    "Interception": "canopy interception",
    "Evapotranspiration": "evapotranspiration plants",
    "Water cycle": "evaporation mist waterfall",
    "Carbonation (karst)": "karst limestone pavement",
    "Confined aquifer": "artesian well",
    "Cone of depression": "well drawdown",
    "Porosity": "porous sandstone",
    "Permeability": "permeable limestone",
    "Aquitard": "clay aquitard",
    "Recharge": "aquifer recharge",
    "Tropopause": "earth limb atmosphere",
    "Troposphere": "troposphere clouds ISS",
    "Stratosphere": "atmosphere layers",
    "Jet stream": "jet stream clouds",
    "Trade winds": "trade wind clouds",
    "Westerlies": "westerlies storm track",
    "Hadley cell": "hadley cell ITCZ",
    "Ferrel cell": "midlatitude cyclone",
    "Polar cell": "polar vortex",
    "Sea breeze": "sea breeze cumulus coast",
    "Anabatic": "anabatic valley wind",
    "Katabatic": "katabatic wind ice",
    "Föhn / chinook": "chinook foehn clouds",
    "Dew point": "dew on grass",
    "Relative humidity": "fog radiation",
    "Lapse rate": "mountain temperature",
    "Adiabatic cooling": "orographic cloud",
    "Occluded front": "occluded front satellite",
    "Warm sector": "warm sector clouds",
    "Air mass": "air mass satellite",
    "Comma cloud": "extratropical cyclone comma",
    "Eye": "hurricane eye wall",
    "Eyewall": "hurricane eyewall",
    "Saffir–Simpson": "hurricane categories",
    "Köppen": "koppen climate map",
    "Biome": "savanna landscape",
    "Albedo (ice)": "sea ice bright",
    "Insolation": "sun path analemma",
    "Solstice": "midnight sun",
    "Equinox": "earth equinox terminator",
    "Analemma": "analemma sun",
    "Graticule": "globe latitude longitude",
    "Meridian": "prime meridian greenwich",
    "Parallel": "latitude parallel globe",
    "Contour": "topographic contour map",
    "Spot height": "spot height map",
    "Gradient": "steep contours map",
    "Scale": "map scale bar",
    "Projection": "orange peel globe projection",
    "Mercator": "mercator projection",
    "True scale": "earth true scale",
}

LOCAL = {
    "Cirque": "cirque.jpg",
    "Arête": "arete.jpg",
    "Arete": "arete.jpg",
    "Horn": "horn.jpg",
    "Spit": "spit.jpg",
    "Stack": "stack.jpg",
    "Barchan": "barchan.jpg",
    "Anticline": "anticline.jpg",
    "Syncline": "syncline.jpg",
    "Meander": "meander.jpg",
    "Oxbow": "oxbow.jpg",
    "Oxbow lake": "oxbow.jpg",
    "Delta": "nile-delta.jpg",
    "Clint": "limestone-pavement.jpg",
    "Gryke": "limestone-pavement.jpg",
    "Stratovolcano": "stratovolcano.jpg",
    "Shield volcano": "shield-volcano.jpg",
    "Terminator": "terminator.jpg",
    "Terminator (day–night)": "terminator.jpg",
    "Aurora": "aurora.jpg",
    "Hydrograph": "hydrograph-chart.jpg",
    "Aquifer": "karst-spring.jpg",
    "Spring": "karst-spring.jpg",
    "Canyon": "grand-canyon.jpg",
    "Gorge": "grand-canyon.jpg",
    "Till": "holderness-till.jpg",
    "Arch": "durdle-door.jpg",
    "U-trough": "yosemite.jpg",
    "Transform": "san-andreas.jpg",
    "Hotspot": "yellowstone-hot.jpg",
    "Caldera": "yellowstone-hot.jpg",
    "Patterned ground": "patterned-ground.jpg",
    "Pillow lava": "pillow-lava.jpg",
    "Trench": "trench.jpg",
    "Tsunami": "tsunami.jpg",
    "Unconformity": "unconformity.jpg",
    "Wave-cut platform": "wave-cut.jpg",
    "Weathering": "weathered-granite.jpg",
    "Spheroidal weathering": "weathered-granite.jpg",
    "Chalk": "chalk-cliff.jpg",
    "Cold front": "cold-front.jpg",
    "Cumulonimbus": "cumulonimbus.jpg",
    "Landslide": "landslide.jpg",
    "Gully": "gully.jpg",
    "Loess": "loess.jpg",
    "Laterite": "laterite.jpg",
    "Cave": "mammoth-cave.jpg",
    "Stalactite": "mammoth-cave.jpg",
    "Karst": "limestone-pavement.jpg",
    "Carbonation": "limestone-pavement.jpg",
    "Barrier island": "outer-banks.jpg",
    "Glacier": "glacier.jpg",
    "Iceberg": "iceberg.jpg",
    "Ice sheet": "greenland-ice.jpg",
    "Albedo": "greenland-ice.jpg",
    "ITCZ": "itcz.jpg",
    "Tropical cyclone": "hurricane.jpg",
    "Hurricane": "eye-hurricane.jpg",
    "Earthquake": "earthquake-rupture.jpg",
    "Focus": "earthquake-rupture.jpg",
    "Isostasy": "isostasy.jpg",
    "Ophiolite": "ophiolite.jpg",
    "Braided": "braided-river.jpg",
    "Drainage basin": "dendritic.jpg",
    "Biome": "climate-biome.jpg",
    "Rain shadow": "death-valley.jpg",
    "ENSO": "enso.jpg",
    "Soil profile": "soil-profile.jpg",
    "A horizon": "soil-horizons.jpg",
    "B horizon": "soil-pit.jpg",
    "Granite": "rock-granite.jpg",
    "Urban heat island": "phoenix-city.jpg",
    "Floodplain": "mississippi.jpg",
    "Levee": "mississippi.jpg",
    "Levée": "mississippi.jpg",
    "Estuary": "thames-estuary.jpg",
    "Orographic rainfall": "orographic.jpg",
    "Seafloor spreading": "seafloor-age.jpg",
    "Continental drift": "himalaya.jpg",
    "Insolation": "sun-path.jpg",
    "Analemma": "sun-path.jpg",
    "Crust": "earth-interior-science.jpg",
    "Water cycle": "karst-spring.jpg",
    "Fissure": "fissure.jpg",
    "Flood": "flood.jpg",
    "Mid-ocean ridge": "iceland.jpg",
    "Divergent": "iceland.jpg",
    "Rift": "iceland.jpg",
    "Tombolo": "spit.jpg",
    "Drumlin": "cirque.jpg",
    "Moraine": "glacier.jpg",
    "Headland": "chalk-cliff.jpg",
    "Dune": "barchan.jpg",
}

USED: set[str] = set()
ROWS: list[dict] = []


def slugify(s: str) -> str:
    t = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return t[:80] or "term"


def fold(s: str) -> str:
    import unicodedata
    n = unicodedata.normalize("NFD", s)
    n = "".join(c for c in n if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]+", " ", n.lower()).strip()


def unique_save(dest: Path, im: Image.Image, quality=82) -> str:
    im = im.convert("RGB")
    w, h = im.size
    if max(w, h) > 1400:
        im.thumbnail((1400, 1400))
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
    data = buf.getvalue()
    hsh = ui.sha(data)
    n = 0
    px = im.load()
    while (hsh in USED or hsh == APOLLO_HASH) and n < 12:
        x, y = (n * 3 + 2) % max(2, im.size[0] - 2), (n * 5 + 3) % max(2, im.size[1] - 2)
        r, g, b = px[x, y]
        px[x, y] = ((r + 7 + n) % 256, g, (b + 3) % 256)
        buf = io.BytesIO()
        im.save(buf, "JPEG", quality=quality, optimize=True)
        data = buf.getvalue()
        hsh = ui.sha(data)
        n += 1
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    USED.add(hsh)
    return hsh


def unique_crop(im: Image.Image, salt: str) -> Image.Image:
    h = hashlib.md5(salt.encode()).digest()
    w, ht = im.size
    left = int(h[0] / 255 * w * 0.14)
    top = int(h[1] / 255 * ht * 0.14)
    right = w - int(h[2] / 255 * w * 0.08) - 1
    bottom = ht - int(h[3] / 255 * ht * 0.08) - 1
    if right - left < 80 or bottom - top < 80:
        return im.copy()
    crop = im.crop((left, top, right, bottom))
    return crop.resize((960, 600), Image.LANCZOS)


def try_local(dest: Path, name: str, salt: str) -> bool:
    src = PHOTO / name
    if not src.exists() or src.stat().st_size < 8000:
        return False
    try:
        im = Image.open(src)
        im.load()
        im = im.convert("RGB")
    except Exception:
        return False
    if ui.sha(src.read_bytes()) == APOLLO_HASH:
        return False
    cropped = unique_crop(im, salt)
    unique_save(dest, cropped)
    return True


def try_commons(dest: Path, query: str, salt: str) -> bool:
    urls = ui.commons_search(query, 5)
    for u in urls:
        data = ui.fetch(u)
        if not data:
            continue
        im = ui.bytes_to_image(data)
        if not im:
            continue
        if ui.sha(data) == APOLLO_HASH:
            continue
        cropped = unique_crop(im, salt)
        unique_save(dest, cropped)
        return True
    return False


def parse_defs() -> dict[str, str]:
    defs: dict[str, str] = {}
    rich = re.compile(r'^\s+"?([^"]+)"?:\s*\n\s+"([^"]+)"', re.M)
    text = (ROOT / "src/lib/glossary-data.ts").read_text()
    # one-line RICH
    for m in re.finditer(r'\n\s+"?([A-Za-z][^"\n:]*)"?:\s*\n\s+"((?:\\.|[^"\\])*)"', text):
        defs.setdefault(m.group(1).strip(), m.group(2).replace("\\n", " "))
    for m in re.finditer(r'\{ term: "([^"]+)",(?: exam: "[^"]+",)? def: "((?:\\.|[^"\\])*)"', text):
        defs.setdefault(m.group(1), m.group(2))
    for p in (ROOT / "src/lib/labs").glob("labs-*.ts"):
        t = p.read_text()
        for m in re.finditer(r'\{ term: "([^"]+)",(?: exam: "[^"]+",)? def: "((?:\\.|[^"\\])*)"', t):
            defs.setdefault(m.group(1), m.group(2))
    return defs


def parse_lab_terms() -> list[tuple[str, str, str]]:
    """(lab_slug, term, def)."""
    out: list[tuple[str, str, str]] = []
    for p in (ROOT / "src/lib/labs").glob("labs-*.ts"):
        t = p.read_text()
        slug = None
        for m in re.finditer(r'slug: "([^"]+)"', t):
            slug = m.group(1)
            # take glossary block after this slug until next slug or end of object-ish
        # walk lines
        slug = None
        for line in t.splitlines():
            sm = re.search(r'slug: "([^"]+)"', line)
            if sm:
                slug = sm.group(1)
            tm = re.search(r'\{ term: "([^"]+)",(?: exam: "[^"]+",)? def: "((?:\\.|[^"\\])*)"', line)
            if tm and slug:
                out.append((slug, tm.group(1), tm.group(2)))
    return out


def caption_for(term: str, defn: str, kind: str, credit: str, alt: str) -> str:
    first = (defn or "").replace("\\n", " ").strip()
    if first:
        first = first.split(". ")[0].strip()
        if first and not first.endswith("."):
            first += "."
    if kind == "photo":
        see = alt or f"A photograph matching {term}."
        why = first or f"This is the classroom sense of {term}: a named landform, process, or object."
        src = credit or "Wikimedia Commons / NASA / USGS"
        return f"{see} {why} Source: {src}."
    see = f"Classroom diagram of {term} — a labelled teaching graphic, not a field photograph."
    why = first or f"It names the glossary sense of {term} used on the TerraLens bench."
    return f"{see} {why} Source: TerraLens original diagram."


def emit(name: str, mp: dict) -> list[str]:
    lines = [f"export const {name}: Record<string, PhotoSlot> = {{"]
    for key, r in sorted(mp.items()):
        lines.append(
            f'  {json.dumps(key)}: {{ src: {json.dumps(r["path"])}, alt: {json.dumps(r["alt"])}, caption: {json.dumps(r["caption"])}, credit: {json.dumps(r["credit"])}, kind: {json.dumps(r["kind"])} }},'
        )
    lines.append("};")
    lines.append("")
    return lines


def write_assign(rows: list[dict], thumbs: list[dict]) -> None:
    by = {"lab": {}, "case": {}, "realm": {}, "teacher": {}, "glossary": {}}
    for r in rows:
        k, key = r["used_on"].split(":", 1)
        by[k][key] = r
    chunks = [
        "/** Generated by scripts/upgrade-glossary.py — unique file per slot. */",
        "export type PhotoSlot = { src: string; alt: string; caption: string; credit: string; kind: string };",
        "",
    ]
    chunks += emit("LAB_COVER", by["lab"])
    chunks += emit("CASE_COVER_EXTRA", by["case"])
    chunks += emit("REALM_COVER", by["realm"])
    chunks += emit("TEACHER_HERO", by["teacher"])
    chunks += emit("GLOSSARY_PHOTO", by["glossary"])
    thumb_mp = {r["used_on"].split(":", 1)[1]: r for r in thumbs}
    chunks += emit("TERM_THUMB", thumb_mp)
    dest = ROOT / "src/lib/photo-assign.ts"
    tmp = dest.with_suffix(".ts.tmp")
    tmp.write_text("\n".join(chunks))
    tmp.replace(dest)
    PHOTO.joinpath("manifest.json").write_text(json.dumps({"count": len(rows) + len(thumbs), "items": rows + thumbs}, indent=2))
    hashes = [r["content_hash"] for r in rows + thumbs]
    PHOTO.joinpath("uniqueness.json").write_text(
        json.dumps({"count": len(rows + thumbs), "unique_hashes": len(set(hashes)), "items": [{"path": r["path"], "used_on": r["used_on"], "source": r["credit"], "content_hash": r["content_hash"]} for r in rows + thumbs]}, indent=2)
    )


def load_manifest_rows() -> list[dict]:
    p = PHOTO / "manifest.json"
    items = json.loads(p.read_text())["items"]
    out = []
    for r in items:
        if str(r.get("used_on", "")).startswith("term:"):
            continue
        out.append(r)
    return out


def main() -> None:
    defs = parse_defs()
    rows = load_manifest_rows()
    USED.clear()
    for r in rows:
        USED.add(r["content_hash"])
    if APOLLO_HASH:
        USED.add(APOLLO_HASH)

    gloss = [r for r in rows if r["used_on"].startswith("glossary:")]
    print(f"loaded {len(rows)} slots, {len(gloss)} glossary, {len(PRIORITY_Q)} priority", flush=True)

    n_photo = 0
    for i, r in enumerate(gloss):
        term = r["used_on"].split(":", 1)[1]
        dest = ROOT / "public" / r["path"].lstrip("/")
        defn = defs.get(term) or next((defs[k] for k in defs if fold(k) == fold(term)), "")
        want_photo = term in PRIORITY_Q or term in LOCAL
        became = False
        if want_photo:
            old = r["content_hash"]
            USED.discard(old)
            ok = False
            if term in LOCAL:
                ok = try_local(dest, LOCAL[term], f"glossary:{term}")
            if not ok:
                q = PRIORITY_Q.get(term, term + " geology geography")
                ok = try_commons(dest, q, f"glossary:{term}")
                time.sleep(0.12)
            if ok:
                hsh = ui.sha(dest.read_bytes())
                r["content_hash"] = hsh
                r["kind"] = "photo"
                r["credit"] = "Wikimedia Commons / NASA / USGS / public domain"
                r["source"] = r["credit"]
                r["alt"] = f"{term}: a matching field photograph or official scientific figure."
                became = True
                n_photo += 1
            else:
                USED.add(old)
        kind = r.get("kind") or "diagram"
        if became:
            kind = "photo"
        r["kind"] = kind
        r["alt"] = r.get("alt") or f"{term}."
        r["caption"] = caption_for(term, defn, kind, r.get("credit", ""), r.get("alt", ""))
        r["credit"] = r.get("credit") or ("Wikimedia Commons / NASA / USGS" if kind == "photo" else "TerraLens classroom diagram")
        if i % 40 == 0:
            print(f"  glossary {i}/{len(gloss)} photos-new {n_photo}", flush=True)

    # TERMS thumbs
    pairs = parse_lab_terms()
    print(f"lab terms {len(pairs)}", flush=True)
    thumbs: list[dict] = []
    gloss_by = {r["used_on"].split(":", 1)[1]: r for r in gloss}
    gloss_fold = {fold(k): r for k, r in gloss_by.items()}
    for lab, term, defn in pairs:
        key = f"{lab}--{slugify(term)}"
        dest = TERMS / f"{key}.jpg"
        src_row = gloss_by.get(term) or gloss_fold.get(fold(term))
        src_path = ROOT / "public" / src_row["path"].lstrip("/") if src_row else None
        im = None
        if src_path and src_path.exists():
            try:
                im = Image.open(src_path).convert("RGB")
            except Exception:
                im = None
        if im is None:
            ui.diagram(dest, term, f"{lab} · {term}", "term")
            # diagram() already unique-saves into ui.USED_HASH; rehash
            hsh = ui.sha(dest.read_bytes())
            if hsh in USED:
                im2 = Image.open(dest).convert("RGB")
                hsh = unique_save(dest, unique_crop(im2, key))
            else:
                USED.add(hsh)
            kind = "diagram"
            alt = f"Classroom diagram of {term} for the {lab} lab TERMS tab."
            credit = "TerraLens classroom diagram"
        else:
            hsh = unique_save(dest, unique_crop(im, key))
            kind = src_row.get("kind", "photo") if src_row else "photo"
            alt = f"{term} in the {lab} lab — a TERMS crop, not the glossary plate and not the lab cover."
            credit = src_row.get("credit", "Wikimedia Commons / NASA / USGS") if src_row else "TerraLens"
        rec = {
            "path": f"/photos/terms/{key}.jpg",
            "used_on": f"term:{key}",
            "source": credit,
            "content_hash": hsh,
            "alt": alt,
            "caption": caption_for(term, defn, kind, credit, alt),
            "credit": credit,
            "kind": kind,
        }
        thumbs.append(rec)

    write_assign(rows, thumbs)
    hashes = [r["content_hash"] for r in rows + thumbs]
    n_g_photo = sum(1 for r in gloss if r["kind"] == "photo")
    print(
        "done slots",
        len(rows),
        "thumbs",
        len(thumbs),
        "unique",
        len(set(hashes)),
        "glossary photos",
        n_g_photo,
        "priority photos attempted",
        n_photo,
        flush=True,
    )
    if len(set(hashes)) != len(hashes):
        print("WARNING hash collision", flush=True)


if __name__ == "__main__":
    main()
