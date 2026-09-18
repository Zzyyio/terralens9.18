#!/usr/bin/env python3
"""Rebuild photo-assign.ts from on-disk unique JPEGs.

Keeps existing dests when their content hash is not already used by another slot.
Copies unique case photos into /photos/cases/{slug}.jpg.
Replaces teacher/cover hash collisions with a unique classroom diagram.
Optionally fetches Wikimedia FilePath titles for known-mismatch cases.
Writes src/lib/photo-assign.ts and public/photos/manifest.json ONCE at the end.
"""
from __future__ import annotations

import hashlib
import importlib.util
import json
import shutil
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path("/workspace")
PHOTO = ROOT / "public" / "photos"
COVER = PHOTO / "covers"
TEACH = PHOTO / "teachers"
GLOSS = PHOTO / "glossary"
REALM = PHOTO / "realms"
CASES = PHOTO / "cases"
for d in (COVER, TEACH, GLOSS, REALM, CASES):
    d.mkdir(parents=True, exist_ok=True)

spec = importlib.util.spec_from_file_location("ui", str(ROOT / "scripts" / "unique-images.py"))
ui = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ui)

UA = "TerraLens/2.0 classroom studio (https://terralens.grok.me; educational)"
SLOT_HASH: set[str] = set()
ROWS: list[dict] = []

CASE_SEED: dict[str, tuple[str, str, str, str]] = {
    "uk-daylength": ("terminator.jpg", "Earth from orbit with a sharp day-night terminator.", "Day length is tilt and latitude, not distance to the Sun.", "NASA, public domain"),
    "florida-insolation": ("sun-path.jpg", "The Sun’s path through the year as an analemma.", "Miami’s December noon Sun stays high. London’s does not.", "Wikimedia Commons, CC BY"),
    "holderness": ("holderness-till.jpg", "Soft glacial-till cliffs on the Holderness coast at Skipsea, East Yorkshire.", "Holderness is boulder clay — till — not the Seven Sisters chalk.", "Geograph / Wikimedia Commons, CC BY-SA"),
    "jurassic-coast": ("durdle-door.jpg", "Durdle Door, a limestone arch on the Dorset Jurassic Coast.", "Lias and limestone. Cave–arch–stack–stump in named rock.", "Wikimedia Commons, CC BY-SA"),
    "lake-district": ("cirque.jpg", "A steep-walled cirque bowl holding a tarn in glaciated mountains.", "A Lake District cwm. Ice cut the armchair; a river did not.", "Wikimedia Commons, CC BY-SA"),
    "snowdonia": ("arete.jpg", "A glacial arête ridge with steep walls dropping to tarns.", "Eryri: arêtes and cwms. Not a granite Yosemite poster.", "Wikimedia Commons, CC BY-SA"),
    "yorkshire-dales": ("limestone-pavement.jpg", "A limestone pavement of clints split by grykes.", "Carbonation along joints. The Dales pavement, not a granite slab.", "Wikimedia Commons, CC BY-SA"),
    "somerset-levels": ("flood.jpg", "Floodwater over fields after a river overtops its banks.", "A floodplain bargain. Hydrographs that sit for weeks.", "USACE / public domain"),
    "thames": ("thames-estuary.jpg", "The Thames Barrier spanning the drowned tidal Thames in east London.", "A drowned river and a barrier. Tides, not orographic cloud.", "Wikimedia Commons, CC BY-SA"),
    "iceland": ("iceland.jpg", "Iceland from space, a volcanic island on the Mid-Atlantic Ridge.", "A ridge with a country on it. Divergent, plus a hotspot.", "NASA, public domain"),
    "san-andreas": ("san-andreas.jpg", "The San Andreas Fault cutting arid hills in California.", "A right-lateral transform. Not a volcanic arc.", "USGS, public domain"),
    "cascadia": ("stratovolcano.jpg", "A steep snow-capped stratovolcano above cloud.", "A volcanic arc above a trench. Subduction, not Iceland.", "USGS / public domain"),
    "yellowstone": ("yellowstone-hot.jpg", "Grand Prismatic Spring: a hydrothermal pool in the Yellowstone caldera.", "A continental hotspot. Geysers, not a cutaway of Earth’s core.", "NPS, public domain"),
    "hawaii": ("shield-volcano.jpg", "A broad shield volcano of stacked basalt.", "A hotspot track of runny basalt. Not an island arc.", "USGS, public domain"),
    "grand-canyon": ("grand-canyon.jpg", "Grand Canyon layered sedimentary walls cut by the Colorado River.", "Sedimentary strata and a river. Not a granite close-up.", "NPS, public domain"),
    "mississippi": ("mississippi.jpg", "The Mississippi looping across its floodplain.", "Levées, cut-offs, a continental drain. Not a Lake District meander.", "Wikimedia Commons, CC BY"),
    "yosemite": ("yosemite.jpg", "Yosemite Valley: a wide U-trough with steep granite walls.", "A glacial trough in granite. Ice, not a young V-valley.", "NPS, public domain"),
    "katrina-sandy": ("hurricane.jpg", "Satellite view of a tropical cyclone with a clear eye.", "Warm-core. Storm surge on a coast, not a UK winter front.", "NASA, public domain"),
    "dust-bowl": ("gully.jpg", "A deep gully cut into a soil slope.", "Wind plus a broken A horizon. Soil as a resource that can leave.", "Wikimedia Commons, CC BY"),
    "colorado": ("", "The Colorado Front Range: height writes the air.", "A mile-high step onto the plains. Not the Grand Canyon.", "NPS, public domain"),
    "greenwich": ("", "The Royal Observatory at Greenwich — a political line on a spinning sphere.", "Longitude is a bargain about a line, not a physical ridge.", "Wikimedia Commons, CC BY-SA"),
    "time-zones-us": ("africa-globe.jpg", "A continent sitting on a sphere, not stretched on a rectangle.", "A time zone is a political cut of a spinning sphere.", "NASA, public domain"),
    "kola": ("earth-interior-science.jpg", "Scientific cutaway of Earth’s crust, mantle and core.", "The deepest borehole still sat in crust. Waves, not a well, read the core.", "TerraLens classroom drawing after USGS layer radii"),
    "snowdonia-moon": ("", "First-quarter Moon with earthshine.", "Weather is local; phase is not. Eryri does not change the Moon.", "NASA, public domain"),
    "yosemite-moon": ("", "A waning Moon — the same phase everywhere that night.", "Phase is a viewing angle. A valley does not change the Moon.", "NASA / Wikimedia, public domain"),
    "outer-banks": ("outer-banks.jpg", "Cape Hatteras: a sandy barrier-island chain and inlet.", "Sand in a barrier, not a chalk cliff.", "NPS / Wikimedia Commons, public domain"),
    "mammoth-cave": ("mammoth-cave.jpg", "A large limestone passage at Mammoth Cave, Kentucky.", "A cave in carbonate rock. Not a limestone pavement from above.", "Wikimedia Commons, CC BY-SA"),
    "phoenix-heat": ("phoenix-city.jpg", "Downtown Phoenix, Arizona: a desert city of asphalt and roofs.", "Urban heat in a dry basin. Not a mountain cloud.", "Wikimedia Commons, CC BY"),
    "uk-sea-breeze": ("", "Cumulus over a heated coast: a thermal starting from land.", "Land heats, a loop starts, cool air comes in from the water.", "Wikimedia Commons, CC BY-SA"),
    "cairngorms-albedo": ("greenland-ice.jpg", "A bright snow and ice surface — albedo as a lid.", "Snow is a bright lid. Albedo is a number you can change with a season.", "NASA / Wikimedia Commons, public domain"),
    "denver-air": ("airglow.jpg", "Earth’s atmosphere as a thin glowing film on the limb.", "A mile up is still troposphere. Weather’s layer is thick compared with Denver.", "NASA, public domain"),
    "hong-kong-landslide": ("hong-kong.jpg", "Hong Kong Island: steep weathered slopes above a dense city.", "Weathered granite, steep catchments, a city on the toe.", "Wikimedia Commons, CC BY-SA"),
    "shanghai-huangpu": ("shanghai.jpg", "Pudong and the Huangpu: a tidal river through a delta megacity.", "A drowned river on a delta. Meiyu, tide, and a flood wall.", "Wikimedia Commons, CC BY-SA"),
    "typhoon-mangkhut": ("", "Typhoon Mangkhut from orbit.", "A typhoon is a tropical cyclone. The same warm-core engine, a western North Pacific name.", "NOAA / NASA, public domain"),
    "loess-plateau": ("loess.jpg", "Dissected yellow loess hills of the Loess Plateau, China.", "Wind-laid silt, then water. A soil-erosion classroom the size of a province.", "Wikimedia Commons, CC BY-SA"),
}

CASE_FETCH: dict[str, list[str]] = {
    "colorado": ["Longs_Peak.jpg", "Rocky_Mountain_National_Park.jpg", "Front_Range_Colorado.jpg"],
    "greenwich": ["Royal_Observatory_Greenwich.jpg", "Royal_Observatory,_Greenwich.jpg", "Prime_meridian_in_Greenwich.jpg"],
    "snowdonia-moon": ["First_Quarter_Moon.jpg", "Waxing_crescent_moon.jpg"],
    "yosemite-moon": ["Waning_gibbous_moon.jpg", "FullMoon2010.jpg"],
    "typhoon-mangkhut": ["Typhoon_Mangkhut_2018-09-12.jpg", "Mangkhut_2018-09-11_0320Z.jpg", "Typhoon_Mangkhut_2018.jpg"],
    "uk-sea-breeze": ["Cumulus_humilis_clouds.jpg", "Cumulus_over_sea.jpg", "Sea_breeze_front.jpg"],
    "denver-air": ["Denver_skyline.jpg", "Downtown_Denver.jpg", "Denver_from_the_air.jpg"],
    "cairngorms-albedo": ["Cairn_Gorm.jpg", "Cairngorms_National_Park.jpg", "Cairngorm_plateau.jpg"],
    "time-zones-us": ["Earth_at_Night.jpg", "United_States_at_night_by_VIIRS.jpg", "Earth_lights_vs_night.jpg"],
    "kola": ["Kola_Superdeep_Borehole.jpg", "Kola_borehole.jpg"],
    "dust-bowl": ["Dust_Storm_Texas_1935.jpg", "Black_Sunday_dust_storm.jpg", "Dust_bowl.jpg"],
    "katrina-sandy": ["Hurricane_Katrina_August_28_2005_NASA.jpg", "Hurricane_Sandy_2012-10-28.jpg"],
}

LAB_FETCH: dict[str, list[str]] = {
    "rivers": ["Meander.jpg", "Oxbow_lake_from_air.jpg", "River_meander_aerial.jpg"],
    "contours": ["USGS_topographic_map.jpg", "Contour_lines_on_map.jpg"],
    "grid-references": ["Ordnance_Survey_map.jpg", "USGS_quadrangle.jpg"],
    "skills": ["Topographic_map_example.jpg"],
}


def sha_bytes(b: bytes) -> str:
    return hashlib.sha256(b).hexdigest()


def sha_path(p: Path) -> str:
    return sha_bytes(p.read_bytes())


def is_diagram(p: Path) -> bool:
    try:
        im = Image.open(p)
        return im.size == (1280, 800)
    except Exception:
        return False


def fetch(url: str, timeout=22) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            data = r.read()
            if len(data) < 8000:
                return None
            return data
    except Exception:
        return None


def commons_thumb(title: str, width=1280) -> str:
    return f"https://commons.wikimedia.org/wiki/Special:FilePath/{urllib.parse.quote(title)}?width={width}"


def try_fetch_files(dest: Path, files: list[str]) -> bool:
    for title in files:
        data = fetch(commons_thumb(title))
        if not data:
            continue
        try:
            im = Image.open(__import__("io").BytesIO(data)).convert("RGB")
        except Exception:
            continue
        if min(im.size) < 240:
            continue
        hsh = sha_bytes(data)
        if hsh in SLOT_HASH or hsh in ui.USED_HASH:
            continue
        ui.save_jpeg(dest, im)
        return True
    return False


def add_row(kind: str, key: str, dest: Path, alt: str, caption: str, credit: str, label: str) -> dict:
    hsh = sha_path(dest)
    rec = {
        "path": "/" + str(dest.relative_to(ROOT / "public")),
        "used_on": f"{kind}:{key}",
        "source": credit,
        "content_hash": hsh,
        "alt": alt,
        "caption": caption,
        "credit": credit,
        "kind": label,
    }
    SLOT_HASH.add(hsh)
    ui.USED_HASH.add(hsh)
    ROWS.append(rec)
    return rec


def keep_or_diagram(kind: str, key: str, dest: Path, title: str, alt: str, caption: str, credit: str, fetch_files: list[str] | None = None) -> dict:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if fetch_files and (not dest.exists() or is_diagram(dest) or dest.stat().st_size < 14000):
        try_fetch_files(dest, fetch_files)
    if dest.exists() and dest.stat().st_size > 8000:
        hsh = sha_path(dest)
        if hsh not in SLOT_HASH:
            label = "diagram" if is_diagram(dest) else "photo"
            cred = "TerraLens classroom diagram" if label == "diagram" else credit
            cap = caption
            if label == "diagram" and "Classroom diagram" not in cap:
                cap = f"{caption} Classroom diagram, not a field photograph."
            return add_row(kind, key, dest, alt, cap, cred, label)
        # duplicate of another slot — must replace
    ui.diagram(dest, title, caption, kind)
    cap = f"{caption} Classroom diagram, not a field photograph."
    return add_row(kind, key, dest, alt, cap, "TerraLens classroom diagram", "diagram")


def seed_cases() -> None:
    for slug, (src_name, alt, cap, credit) in CASE_SEED.items():
        dest = CASES / f"{slug}.jpg"
        if dest.exists() and dest.stat().st_size > 14000 and not is_diagram(dest):
            continue
        if not src_name:
            continue
        src = PHOTO / src_name
        if not src.exists() or src.stat().st_size < 8000:
            continue
        hsh = sha_path(src)
        if hsh in SLOT_HASH:
            continue
        shutil.copy2(src, dest)


def glossary_terms() -> list[str]:
    for p in (ROOT / "scripts" / "glossary-terms.txt", Path("/tmp/glossary-terms.txt")):
        if p.exists():
            return [ln for ln in p.read_text().splitlines() if ln.strip()]
    return []


def main() -> None:
    ui.USED_HASH.clear()
    seed_cases()

    # Labs
    for slug in ui.LABS:
        title, cap, files, alt, credit = ui.LAB_META[slug]
        dest = PHOTO / "earth-apollo17.jpg" if slug == "seasons" else COVER / f"{slug}.jpg"
        if slug == "seasons":
            alt = "Apollo 17 Blue Marble: the whole sunlit Earth as a sphere, Africa and Arabia under cloud."
            cap = "A sphere, not a table of seasons. Axial tilt writes the calendar."
            credit = "NASA / Apollo 17 AS17-148-22727, public domain"
        keep_or_diagram("lab", slug, dest, title, alt, cap, credit, LAB_FETCH.get(slug) or files)

    # Cases — all 35
    for slug, (src_name, alt, cap, credit) in CASE_SEED.items():
        dest = CASES / f"{slug}.jpg"
        title = slug.replace("-", " ").title()
        keep_or_diagram("case", slug, dest, title, alt, cap, credit, CASE_FETCH.get(slug))

    # Realms
    for slug, meta in ui.REALMS.items():
        title, cap, files, alt, credit = meta
        dest = REALM / f"{slug}.jpg"
        keep_or_diagram("realm", slug, dest, title, alt, cap, credit, files)

    # Teachers — must not share hash with the matching lab cover
    for slug in ui.LABS:
        title = ui.LAB_META[slug][0]
        dest = TEACH / f"{slug}.jpg"
        alt = f"Field or official figure for teaching {title}."
        cap = "A second photograph for the projector script — not the lab cover."
        credit = "Wikimedia Commons / NASA / USGS"
        extras = ui.LAB_META[slug][2][1:] or ui.LAB_META[slug][2]
        keep_or_diagram("teacher", slug, dest, f"Teacher · {title}", alt, cap, credit, extras)

    # Glossary
    terms = glossary_terms()
    for t in terms:
        dest = GLOSS / f"{ui.slugify(t)}.jpg"
        qfiles = []
        if t in ui.LANDFORM_Q:
            # try a couple of obvious titles
            qfiles = [f"{t.replace(' ', '_')}.jpg", f"{t.replace(' ', '_')}.JPG"]
        alt = f"Illustration of {t} matching the glossary definition."
        cap = f"{t} as used in the TerraLens labs."
        keep_or_diagram("glossary", t, dest, t, alt, cap, "Wikimedia Commons / NASA / USGS / classroom diagram", qfiles)

    ui.MANIFEST[:] = ROWS
    ui.write_assign(ROWS)
    hashes = [r["content_hash"] for r in ROWS]
    n_photo = sum(1 for r in ROWS if r["kind"] == "photo")
    n_diag = sum(1 for r in ROWS if r["kind"] == "diagram")
    print(
        "done",
        len(ROWS),
        "unique hashes",
        len(set(hashes)),
        "photos",
        n_photo,
        "diagrams",
        n_diag,
        flush=True,
    )
    if len(set(hashes)) != len(hashes):
        print("WARNING hash collision", flush=True)
        seen: dict[str, str] = {}
        for r in ROWS:
            h = r["content_hash"]
            if h in seen:
                print("  DUP", seen[h], r["used_on"], r["path"])
            else:
                seen[h] = r["used_on"]


if __name__ == "__main__":
    main()
