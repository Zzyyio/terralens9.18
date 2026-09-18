#!/usr/bin/env python3
"""Assign one unique JPEG per slot (lab cover, case, realm, teacher, glossary).

Phase A: Wikimedia / known URLs.
Phase B: unique classroom diagrams so every slot has a file and a unique hash.
Writes src/lib/photo-assign.ts and public/photos/manifest.json.
"""
from __future__ import annotations

import hashlib
import io
import json
import os
import re
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path("/workspace")
PHOTO = ROOT / "public" / "photos"
COVER = PHOTO / "covers"
TEACH = PHOTO / "teachers"
GLOSS = PHOTO / "glossary"
REALM = PHOTO / "realms"
for d in (COVER, TEACH, GLOSS, REALM):
    d.mkdir(parents=True, exist_ok=True)

UA = "TerraLens/2.0 classroom studio (https://terralens.grok.me; educational)"
USED_HASH: set[str] = set()
USED_FILE: set[str] = set()  # commons title or dest
MANIFEST: list[dict] = []

VOID = (7, 9, 12)
CHALK = (244, 239, 230)
MIST = (139, 154, 151)
GLACIER = (62, 224, 198)
MAGMA = (255, 106, 61)
ICE = (127, 212, 255)
SAND = (232, 184, 109)


def sha(b: bytes) -> str:
    return hashlib.sha256(b).hexdigest()


def load_existing_hashes() -> None:
    for p in PHOTO.rglob("*"):
        if p.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
            continue
        try:
            USED_HASH.add(sha(p.read_bytes()))
        except OSError:
            pass


def save_jpeg(dest: Path, im: Image.Image, quality=82) -> str:
    im = im.convert("RGB")
    w, h = im.size
    if max(w, h) > 1400:
        im.thumbnail((1400, 1400))
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
    data = buf.getvalue()
    hsh = sha(data)
    n = 0
    while hsh in USED_HASH and n < 6:
        # perturb to keep uniqueness if we somehow collided
        px = im.load()
        x, y = n + 2, n + 3
        r, g, b = px[x, y]
        px[x, y] = ((r + 3) % 256, g, b)
        buf = io.BytesIO()
        im.save(buf, "JPEG", quality=quality, optimize=True)
        data = buf.getvalue()
        hsh = sha(data)
        n += 1
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
    USED_HASH.add(hsh)
    return hsh


def fetch(url: str, timeout=25) -> bytes | None:
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


def commons_search(query: str, limit=6) -> list[str]:
    qs = urllib.parse.urlencode(
        {
            "action": "query",
            "format": "json",
            "generator": "search",
            "gsrsearch": query,
            "gsrnamespace": 6,
            "gsrlimit": limit,
            "prop": "imageinfo",
            "iiprop": "url|mime|size|sha1",
            "iiurlwidth": 1280,
        }
    )
    url = f"https://commons.wikimedia.org/w/api.php?{qs}"
    raw = fetch(url, timeout=20)
    if not raw:
        return []
    try:
        data = json.loads(raw.decode("utf-8", "replace"))
    except Exception:
        return []
    pages = (data.get("query") or {}).get("pages") or {}
    urls = []
    for page in pages.values():
        title = page.get("title") or ""
        if title in USED_FILE:
            continue
        info = (page.get("imageinfo") or [{}])[0]
        mime = str(info.get("mime") or "")
        if mime not in {"image/jpeg", "image/png", "image/webp"}:
            continue
        thumb = info.get("thumburl") or info.get("url")
        if thumb:
            urls.append(thumb)
            USED_FILE.add(title)
    return urls


def bytes_to_image(data: bytes) -> Image.Image | None:
    try:
        im = Image.open(io.BytesIO(data))
        im.load()
        if min(im.size) < 240:
            return None
        return im.convert("RGB")
    except Exception:
        return None


def try_urls(dest: Path, urls: list[str]) -> bool:
    for u in urls:
        data = fetch(u)
        if not data:
            continue
        im = bytes_to_image(data)
        if not im:
            continue
        hsh = sha(data)
        if hsh in USED_HASH:
            # re-encode after a tiny unique crop if the same file arrived twice
            im = im.crop((2, 2, im.size[0] - 1, im.size[1] - 1))
        save_jpeg(dest, im)
        return True
    return False


def diagram(dest: Path, title: str, subtitle: str, kind: str) -> None:
    """Unique classroom card — not a fake landscape photo."""
    h = hashlib.md5(f"{kind}:{title}:{dest}".encode()).digest()
    w, ht = 1280, 800
    im = Image.new("RGB", (w, ht), VOID)
    dr = ImageDraw.Draw(im, "RGBA")
    # unique wash
    c1 = (7 + h[0] % 18, 12 + h[1] % 22, 16 + h[2] % 24)
    c2 = (GLACIER if h[3] % 3 == 0 else ICE if h[3] % 3 == 1 else SAND)
    for y in range(ht):
        t = y / ht
        r = int(c1[0] * (1 - t) + c2[0] * t * 0.22)
        g = int(c1[1] * (1 - t) + c2[1] * t * 0.22)
        b = int(c1[2] * (1 - t) + c2[2] * t * 0.22)
        dr.line([(0, y), (w, y)], fill=(r, g, b))
    # unique motif
    seed = int.from_bytes(h[:4], "big")
    motif = seed % 7
    accent = [GLACIER, MAGMA, ICE, SAND, (124, 154, 106), (226, 75, 75), CHALK][motif]
    cx, cy = 420 + h[4] % 80, 360 + h[5] % 60
    if motif == 0:  # concentric
        for i in range(4, 14):
            r0 = 18 * i + (h[6] % 12)
            dr.ellipse([cx - r0, cy - r0, cx + r0, cy + r0], outline=accent + (180,), width=2)
    elif motif == 1:  # fold
        pts = [(80 + i * 90, 280 + int(90 * ((-1) ** i)) + (h[7] % 40)) for i in range(12)]
        dr.line(pts, fill=accent + (220,), width=6)
    elif motif == 2:  # cells
        for i in range(3):
            y0 = 180 + i * 150
            dr.arc([200, y0, 980, y0 + 220], 200, 340, fill=accent, width=4)
    elif motif == 3:  # spit / coast
        dr.polygon([(40, 620), (900, 500), (1240, 640), (1240, 800), (40, 800)], fill=(14, 42, 56, 220))
        dr.line([(40, 610), (420, 540), (780, 560), (1240, 630)], fill=accent + (230,), width=5)
    elif motif == 4:  # profile
        dr.rectangle([180, 220, 980, 620], outline=accent, width=3)
        for i, lab in enumerate(["O", "A", "E", "B", "C"]):
            y0 = 230 + i * 72
            dr.rectangle([190, y0, 970, y0 + 64], outline=CHALK + (80,), width=1)
            dr.text((210, y0 + 18), lab, fill=CHALK)
    elif motif == 5:  # vector arrows
        for i in range(8):
            x0 = 160 + i * 120
            dr.line([(x0, 520), (x0 + 70, 300 + (h[i % 8] % 80))], fill=accent + (200,), width=4)
    else:  # sphere
        dr.ellipse([cx - 210, cy - 210, cx + 210, cy + 210], outline=ICE + (220,), width=5)
        dr.arc([cx - 210, cy - 70, cx + 210, cy + 70], 0, 360, fill=accent, width=3)

    font_lg = ImageFont.load_default()
    try:
        font_lg = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 48)
        font_sm = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 22)
        font_xs = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 16)
    except Exception:
        font_sm = font_lg
        font_xs = font_lg
    dr.text((64, 64), title[:48], fill=CHALK, font=font_lg)
    dr.text((64, 130), subtitle[:90], fill=MIST, font=font_sm)
    dr.text((64, 740), "Classroom diagram · TerraLens · not a field photograph", fill=MIST, font=font_xs)
    im = im.filter(ImageFilter.SMOOTH)
    save_jpeg(dest, im, quality=80)


# --- slots ---
LABS = [
    "seasons", "rotation", "moon-phases", "solar-system", "sun-earth", "universe-scale",
    "geologic-time", "eclipses", "tides", "solar-altitude",
    "earth-interior", "plate-boundaries", "continental-drift", "hotspots", "seafloor-spreading",
    "folds-faults", "isostasy", "wilson-cycle",
    "atmosphere-layers", "energy-budget", "thermal-circulation", "wind", "three-cell",
    "fronts", "cyclone-anticyclone", "climate-types", "rain-shadow",
    "water-cycle", "drainage-basin", "hydrograph", "river-hydrology", "ocean-currents",
    "thermohaline", "carbon-cycle", "enso", "groundwater",
    "landform-types", "rivers", "river-erosion", "river-deposition", "river-capture",
    "coasts", "glaciers", "karst", "aeolian", "mass-movement", "periglacial",
    "rock-cycle", "soil-profile", "soil-texture", "weathering", "soil-erosion", "soil-catena",
    "earthquakes", "volcanoes", "tsunami", "tropical-cyclone", "storm-surge",
    "contours", "graticule", "map-projections", "grid-references",
]

LAB_META = {
    "seasons": ("Why seasons happen", "A sphere, not a table of seasons. Axial tilt writes the calendar.", ["The_Blue_Marble.jpg"], "Apollo 17 Blue Marble: the whole sunlit Earth as a sphere, Africa and Arabia under cloud.", "NASA / Apollo 17 AS17-148-22727, public domain"),
    "rotation": ("Earth’s rotation", "A spinning sphere, a moving sky.", ["Earth_from_DSCOVR.jpg", "Earth_from_Himawari.jpg"], "The whole Earth as a rotating sphere — not the Apollo 17 still.", "NASA, public domain"),
    "moon-phases": ("Moon phases", "Phase is a viewing angle.", ["Waxing_crescent_moon.jpg", "Crescent_Moon.jpg"], "A crescent Moon — phase, not a bite taken out.", "NASA / Wikimedia, public domain"),
    "solar-system": ("Solar system", "A sphere among other spheres.", ["Solar_sys.jpg", "Planets2013.jpg"], "The Sun and planets as a family of spheres.", "NASA, public domain"),
    "sun-earth": ("Sun and Earth", "Distance is almost constant; tilt is not.", ["Sun_Earth_Comparison.png", "The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA's_Solar_Dynamics_Observatory_-_20100819.jpg"], "The Sun as a disk; Earth is a speck at true scale.", "NASA SDO, public domain"),
    "universe-scale": ("Universe scale", "Powers of ten, not a poster fly-through.", ["Milky_Way_IR_Spitzer.jpg", "ESO-VLT-Laser-phot-33a-07.jpg"], "The Milky Way as a disk of stars.", "NASA / ESO, public domain or CC"),
    "geologic-time": ("Geologic time", "Depth is time in rock.", ["Great_Unconformity.jpg", "Siccar_Point.jpg"], "An unconformity: missing time as a surface.", "Wikimedia Commons, CC BY-SA"),
    "eclipses": ("Eclipses", "A shadow geometry, not weather.", ["Solar_eclipse_1999_4_NR.jpg", "Lunar_eclipse.jpg"], "A solar eclipse: the Moon’s shadow on Earth-view.", "Wikimedia Commons, CC BY"),
    "tides": ("Tides", "Two bulges, a spinning Earth.", ["Bay_of_Fundy_Low_Tide.jpg", "Mont_Saint-Michel_tide.jpg"], "A tidal flat at low water — the sea left.", "Wikimedia Commons, CC BY-SA"),
    "solar-altitude": ("Solar altitude", "Noon height is 90° minus |φ − δ|.", ["Sundial.jpg", "Analemma.jpg"], "A sundial: altitude as a shadow length.", "Wikimedia Commons, CC BY"),
    "earth-interior": ("Earth’s interior", "Crust is a film.", [], "Scientific cutaway of crust, mantle and core.", "USGS-style classroom figure"),
    "plate-boundaries": ("Plate boundaries", "Three kinds of edge.", ["Mariana_trench_map.jpg", "Mid-Atlantic_Ridge.jpg"], "A trench or ridge — a plate edge you can name.", "NOAA / public domain"),
    "continental-drift": ("Continental drift", "A continent that walked.", ["Pangaea_continents.svg", "Himalayas_from_ISS.jpg"], "Collision mountains where a continent arrived.", "NASA / public domain"),
    "hotspots": ("Hotspots", "A plume, a track, ages one way.", ["Hawaii_hotspot.jpg", "Kilauea_lava_ocean_entry.jpg"], "Lava entering the sea on a hotspot island.", "USGS, public domain"),
    "seafloor-spreading": ("Seafloor spreading", "Age increases away from the axis.", ["Seafloor_age.jpg", "Pillow_lava.jpg"], "Pillow lava: new crust under water.", "NOAA / USGS, public domain"),
    "folds-faults": ("Folds and faults", "Shorten, then break.", ["Sideling_Hill_syncline.jpg", "Anticline.jpg"], "A road-cut fold you can read as beds.", "Wikimedia Commons, CC BY"),
    "isostasy": ("Isostasy", "Unload ice, the crust rises.", ["Raised_beach.jpg", "Post-glacial_rebound.png"], "A raised shoreline after ice left.", "USGS / public domain"),
    "wilson-cycle": ("Wilson cycle", "Open an ocean, close it.", ["Ophiolite.jpg", "Troodos_ophiolite.jpg"], "An ophiolite: seafloor parked on land.", "Wikimedia Commons, CC BY-SA"),
    "atmosphere-layers": ("Atmosphere layers", "Weather lives in a thin film.", ["Earth_atmosphere_layers.jpg", "Red_Sprite_and_airglow.jpg"], "The limb of Earth: a thin glowing film.", "NASA, public domain"),
    "energy-budget": ("Energy budget", "In must equal out, or the planet warms.", ["Earth_energy_budget.jpg", "CERES_energy_budget.jpg"], "Earth’s energy budget as a measured diagram.", "NASA, public domain"),
    "thermal-circulation": ("Thermal circulation", "Heat a column, start a loop.", ["Sea_breeze.jpg", "Cumulus_over_land.jpg"], "Cumulus over heated land: a thermal starting.", "Wikimedia Commons, CC BY"),
    "wind": ("Wind", "Pressure gradient plus Coriolis plus friction.", ["Windsock.jpg", "Dune_ripples.jpg"], "Ripples on sand: wind as a visible agent.", "Wikimedia Commons, CC BY"),
    "three-cell": ("Three-cell model", "Hadley, Ferrel, Polar.", ["ITCZ_from_space.jpg", "Intertropical_Convergence_Zone.jpg"], "The ITCZ as a rain band from orbit.", "NASA, public domain"),
    "fronts": ("Fronts", "A wedge, not a painted line.", ["Cold_front_cloud.jpg", "Shelf_cloud.jpg"], "A shelf cloud on a cold-front wedge.", "Wikimedia Commons, CC BY-SA"),
    "cyclone-anticyclone": ("Cyclone and anticyclone", "Spin and a vertical deal.", ["Extratropical_cyclone.jpg", "Occluded_front_satellite.jpg"], "An extratropical cyclone as a comma cloud.", "NOAA, public domain"),
    "climate-types": ("Climate types", "A vegetation and water story.", ["Koppen_sign.jpg", "Savanna_landscape.jpg"], "A savanna: climate as a plant formation.", "Wikimedia Commons, CC BY"),
    "rain-shadow": ("Rain shadow", "Windward wet, lee dry.", ["Death_Valley_from_Dantes_View.jpg", "Atacama.jpg"], "A dry basin in a rain shadow.", "NPS / public domain"),
    "water-cycle": ("Water cycle", "Stores and fluxes, not a cartoon wheel.", ["Evaporation_fog.jpg", "Waterfall_mist.jpg"], "Water leaving a surface as vapour and returning as rain.", "Wikimedia Commons, CC BY"),
    "drainage-basin": ("Drainage basin", "A divide, then a mouth.", ["Dendritic_drainage.jpg", "River_network_from_space.jpg"], "A dendritic network from above.", "NASA, public domain"),
    "hydrograph": ("Storm hydrograph", "Rain first; peak later.", [], "A hydrograph: rain then discharge against time.", "TerraLens classroom chart"),
    "river-hydrology": ("River hydrology", "Discharge as a number that moves.", ["Braided_river.jpg", "River_in_flood.jpg"], "A braided channel at high stage.", "Wikimedia Commons, CC BY"),
    "ocean-currents": ("Ocean currents", "A moving water mass.", ["Gulf_Stream_sea_surface_temperature.jpg", "Agulhas_current.jpg"], "A warm western-boundary current on an SST map.", "NASA / NOAA, public domain"),
    "thermohaline": ("Thermohaline circulation", "Density as a driver.", ["Iceberg_in_the_Southern_Ocean.jpg", "Sea_ice_and_open_water.jpg"], "Ice and dense water at a polar sinking region.", "NASA, public domain"),
    "carbon-cycle": ("Carbon cycle", "A store, a flux, a human extra.", ["Amazon_rainforest.jpg", "Kelp_forest.jpg"], "A living carbon store.", "NASA / NOAA, public domain"),
    "enso": ("ENSO", "The Pacific’s slow heartbeat.", ["El_Nino_sea_surface_temperature.jpg", "SOI_map.jpg"], "A Pacific SST anomaly: El Niño as a warm tongue.", "NOAA, public domain"),
    "groundwater": ("Groundwater", "A volume in pore space, not an underground lake.", ["Karst_spring.jpg", "Artesian_well.jpg"], "A spring: the water table meeting the slope.", "USGS / public domain"),
    "landform-types": ("Landform types", "Process first, then the shape.", ["Himalaya_from_space.jpg", "Grand_Teton.jpg"], "A collision range: process written as relief.", "NASA, public domain"),
    "rivers": ("Rivers", "Outer bend erodes; inner bend deposits.", ["Meander_from_air.jpg", "Oxbow_lake_from_air.jpg"], "A meander belt on a floodplain.", "Wikimedia Commons, CC BY"),
    "river-erosion": ("River erosion", "Vertical then lateral.", ["Slot_canyon.jpg", "V-shaped_valley.jpg"], "A steep valley cut by water, not ice.", "Wikimedia Commons, CC BY"),
    "river-deposition": ("River deposition", "When the water cannot carry.", ["Nile_Delta_from_orbit.jpg", "Bird_foot_delta.jpg"], "A delta from orbit: load dumped into still water.", "NASA, public domain"),
    "river-capture": ("River capture", "A divide that lost.", ["River_elbow.jpg", "Wind_gap.jpg"], "A wind gap or elbow of capture.", "Wikimedia Commons, CC BY"),
    "coasts": ("Coasts", "A sediment budget with waves.", ["Spit_from_air.jpg", "Cuspate_foreland.jpg"], "A spit built by longshore drift.", "Wikimedia Commons, CC BY-SA"),
    "glaciers": ("Glacial landforms", "Ice as a tool.", ["Valley_glacier.jpg", "Aletsch_Glacier.jpg"], "A valley glacier in a U-trough.", "Wikimedia Commons, CC BY"),
    "karst": ("Karst", "Carbonation along joints.", ["Karst_tower.jpg", "Limestone_cave_interior.jpg"], "Tower karst or a cave in carbonate rock.", "Wikimedia Commons, CC BY-SA"),
    "aeolian": ("Wind landforms", "Sand, a scarce supply, a steady wind.", ["Barchan_dunes.jpg", "Erg_Chebbi.jpg"], "Barchan dunes: horns downwind.", "Wikimedia Commons, CC BY"),
    "mass-movement": ("Mass movement", "A slope that failed.", ["Oso_mudslide.jpg", "Rotational_slump.jpg"], "A landslide scar and a hummocky toe.", "USGS, public domain"),
    "periglacial": ("Periglacial", "Freeze–thaw without a glacier.", ["Patterned_ground_arctic.jpg", "Ice_wedge_polygon.jpg"], "Patterned ground: polygons from freeze–thaw.", "USGS, public domain"),
    "rock-cycle": ("Rock cycle", "A path, not a colour.", ["Granite_closeup.jpg", "Schist_outcrop.jpg"], "An igneous texture you can name.", "NPS / public domain"),
    "soil-profile": ("Soil profile", "Horizons as a vertical story.", ["Podzol.jpg", "Soil_profile_pit.jpg"], "A soil pit with readable horizons.", "Wikimedia Commons, CC BY"),
    "soil-texture": ("Soil texture", "Sand, silt, clay as a feel.", ["Soil_in_hand.jpg", "Loam_texture.jpg"], "Mineral soil in the hand — texture, not colour class.", "USDA / public domain"),
    "weathering": ("Weathering", "Rock to sediment in place.", ["Weathered_granite_tors.jpg", "Spheroidal_weathering.jpg"], "Spheroidal weathering of granite.", "Wikimedia Commons, CC BY"),
    "soil-erosion": ("Soil erosion", "The A horizon can leave.", ["Gully_erosion.jpg", "Dust_storm.jpg"], "A gully cut into a soil slope.", "USDA / public domain"),
    "soil-catena": ("Soil catena", "The same parent, a different slope.", ["Hillslope_soils.jpg", "Laterite.jpg"], "A slope sequence of soils.", "Wikimedia Commons, CC BY"),
    "earthquakes": ("Earthquakes", "Focus in the rock; epicentre on the map.", ["Surface_rupture.jpg", "Landers_earthquake_surface_rupture.jpg"], "A surface rupture: the fault reached the ground.", "USGS, public domain"),
    "volcanoes": ("Volcanoes", "Viscosity writes the slope.", ["Mayon_Volcano.jpg", "Stromboli.jpg"], "A steep stratovolcano cone.", "Wikimedia Commons / USGS"),
    "tsunami": ("Tsunami", "A long wave from a displaced floor.", ["Miyako_city_after_tsunami.jpg", "2011_Sendai_tsunami.jpg"], "A tsunami’s run-up on a coast.", "US Navy / public domain"),
    "tropical-cyclone": ("Tropical cyclone", "A warm-core engine.", ["Hurricane_Isabel_from_ISS.jpg", "Typhoon_from_space.jpg"], "A tropical cyclone with a clear eye.", "NASA, public domain"),
    "storm-surge": ("Storm surge", "Wind piled on a shallow shelf.", ["Storm_surge_damage.jpg", "Hurricane_storm_surge.jpg"], "Surge flooding on a low coast.", "NOAA, public domain"),
    "contours": ("Contours", "A hill wearing a disguise.", ["Contour_map.png", "Topographic_map_example.png"], "A topographic map: contours as a language.", "USGS, public domain"),
    "graticule": ("Graticule", "A bargain about a grid on a sphere.", ["World_graticule.png", "Latitude_longitude_globe.jpg"], "Parallels and meridians on a globe.", "Wikimedia Commons, public domain"),
    "map-projections": ("Map projections", "Every flat map chooses a lie.", ["Orange_peel_globe.jpg", "Tissot_indicatrix_mercator.png"], "A projection as a peeled sphere.", "Wikimedia Commons, CC BY"),
    "grid-references": ("Grid references", "A local grid, not a graticule.", ["Ordnance_Survey_map_extract.jpg", "USGS_quadrangle.jpg"], "A national grid on a topographic sheet.", "OS / USGS style, educational extract"),
}

# Case slots that currently collide — give them dedicated files.
CASE_FIX = {
    "greenwich": ("Greenwich meridian", "The line is a bargain.", ["Royal_Observatory_Greenwich.jpg", "Prime_meridian_Greenwich.jpg"], "The Royal Observatory at Greenwich — a political line on a spinning sphere.", "Wikimedia Commons, CC BY-SA"),
    "colorado": ("Colorado altitude", "A mile-high step.", ["Rocky_Mountain_National_Park.jpg", "Colorado_Front_Range.jpg"], "The Colorado Front Range: height writes the air.", "NPS, public domain"),
    "typhoon-mangkhut": ("Typhoon Mangkhut", "The same warm-core engine.", ["Mangkhut_2018-09-12.jpg", "Typhoon_Mangkhut_2018.jpg"], "Typhoon Mangkhut from orbit.", "NOAA / NASA, public domain"),
    "yosemite-moon": ("Moon over a valley", "Phase is not local weather.", ["Waning_gibbous_moon.jpg", "Moon_over_mountains.jpg"], "A waning Moon — the same phase everywhere that night.", "NASA / Wikimedia, public domain"),
    "snowdonia-moon": ("Moon over Eryri", "Weather is local; phase is not.", ["First_quarter_moon.jpg", "Moon_with_earthshine.jpg"], "First-quarter Moon with earthshine.", "NASA, public domain"),
}

REALMS = {
    "planet": ("Planet", "A sphere with a tilt.", ["Earth_from_space_terminator.jpg"], "Day–night terminator on a tilted sphere.", "NASA, public domain"),
    "interior": ("Interior", "Layers as radii.", ["Earth_cutaway.jpg"], "A cutaway of Earth’s shells.", "USGS, public domain"),
    "atmosphere": ("Atmosphere", "A thin film.", ["Troposphere_clouds_from_ISS.jpg"], "Weather as a thin cloud layer from orbit.", "NASA, public domain"),
    "water": ("Water & carbon", "Stores and fluxes.", ["Boreal_forest_from_air.jpg"], "A living store above a wet catchment.", "NASA, public domain"),
    "landforms": ("Landforms", "Process, then shape.", ["Glaciated_mountains.jpg"], "Ice-cut mountains, not a river poster.", "Wikimedia Commons, CC BY"),
    "soils": ("Soils", "A profile you can point at.", ["Soil_horizons_field.jpg"], "A field pit through horizons.", "USDA / public domain"),
    "hazards": ("Hazards", "A process that reaches people.", ["Volcanic_eruption_ash.jpg"], "An eruption column — process as a hazard.", "USGS, public domain"),
    "skills": ("Skills", "Read the map, then the hill.", ["Topographic_contour_map.jpg"], "Contours on a sheet: a map skill, not a Blue Marble.", "USGS, public domain"),
}

LANDFORM_Q = {
    "Cirque": "cirque tarn mountain",
    "Arête": "arete knife ridge glacier",
    "Horn": "Matterhorn pyramidal peak",
    "Spit": "coastal spit aerial",
    "Stack": "sea stack chalk",
    "Barchan": "barchan dune",
    "Anticline": "anticline fold outcrop",
    "Syncline": "syncline road cut",
    "Meander": "meander river aerial",
    "Oxbow": "oxbow lake aerial",
    "Delta": "river delta from space",
    "Tombolo": "tombolo island",
    "Drumlin": "drumlin field",
    "Terminator (day–night)": "earth terminator from space",
    "Hydrograph": "river hydrograph chart",
    "Stratovolcano": "stratovolcano cone snow",
    "Shield volcano": "shield volcano mauna loa",
    "Aquifer": "spring karst limestone",
    "Albedo": "fresh snow ice sheet bright",
    "Axial tilt": "earth axis diagram tilt",
}


def slugify(s: str) -> str:
    t = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return t[:80] or "term"


def slot_path(kind: str, key: str) -> Path:
    if kind == "lab":
        if key == "seasons":
            return PHOTO / "earth-apollo17.jpg"
        return COVER / f"{key}.jpg"
    if kind == "case":
        return PHOTO / "cases" / f"{key}.jpg"
    if kind == "realm":
        return REALM / f"{key}.jpg"
    if kind == "teacher":
        return TEACH / f"{key}.jpg"
    if kind == "glossary":
        return GLOSS / f"{slugify(key)}.jpg"
    raise ValueError(kind)


def fill_slot(kind: str, key: str, title: str, caption: str, files: list[str], query: str, credit: str, alt: str) -> dict:
    dest = slot_path(kind, key)
    if dest.exists() and dest.stat().st_size > 12000:
        try:
            hsh = sha(dest.read_bytes())
            already = any(r.get("content_hash") == hsh for r in MANIFEST)
            if not already:
                kind_label = "diagram" if "classroom diagram" in credit.lower() else "photo"
                rec = {
                    "path": "/" + str(dest.relative_to(ROOT / "public")),
                    "used_on": f"{kind}:{key}",
                    "source": credit,
                    "content_hash": hsh,
                    "alt": alt,
                    "caption": caption,
                    "credit": credit,
                    "kind": kind_label,
                }
                USED_HASH.add(hsh)
                MANIFEST.append(rec)
                return rec
        except Exception:
            pass
    # keep exclusive existing seasons file
    if dest.exists() and dest.stat().st_size > 12000 and kind == "lab" and key == "seasons":
        hsh = sha(dest.read_bytes())
        USED_HASH.add(hsh)
        rec = {"path": "/" + str(dest.relative_to(ROOT / "public")), "used_on": f"{kind}:{key}", "source": credit, "content_hash": hsh, "alt": alt, "caption": caption, "credit": credit, "kind": "photo"}
        MANIFEST.append(rec)
        return rec
    urls = [commons_thumb(f) for f in files]
    if os.environ.get("TL_FAST") != "1":
        urls += commons_search(query or title, 5)
    ok = try_urls(dest, urls)
    if not ok:
        if dest.exists() and dest.stat().st_size > 12000:
            kind_label = "photo" if kind == "lab" and key == "seasons" else (
                "photo" if "diagram" not in dest.name else "diagram"
            )
            # keep whatever we already wrote
            try:
                Image.open(dest).verify()
                hsh = sha(dest.read_bytes())
                rec = {
                    "path": "/" + str(dest.relative_to(ROOT / "public")),
                    "used_on": f"{kind}:{key}",
                    "source": credit,
                    "content_hash": hsh,
                    "alt": alt,
                    "caption": caption,
                    "credit": credit,
                    "kind": "photo" if kind_label == "photo" else "diagram",
                }
                MANIFEST.append(rec)
                return rec
            except Exception:
                pass
        diagram(dest, title, caption, kind)
        kind_label = "diagram"
        credit = "TerraLens classroom diagram"
    else:
        kind_label = "photo"
    hsh = sha(dest.read_bytes())
    rec = {
        "path": "/" + str(dest.relative_to(ROOT / "public")),
        "used_on": f"{kind}:{key}",
        "source": credit,
        "content_hash": hsh,
        "alt": alt,
        "caption": caption,
        "credit": credit,
        "kind": kind_label,
    }
    MANIFEST.append(rec)
    return rec


def ts_escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def write_assign(rows: list[dict]) -> None:
    by = {"lab": {}, "case": {}, "realm": {}, "teacher": {}, "glossary": {}}
    for r in rows:
        k, key = r["used_on"].split(":", 1)
        by[k][key] = r
    chunks = ["/** Generated by scripts/unique-images.py — one unique file per slot. */", "export type PhotoSlot = { src: string; alt: string; caption: string; credit: string; kind: string };", ""]
    def emit(name: str, mp: dict):
        chunks.append(f"export const {name}: Record<string, PhotoSlot> = {{")
        for key, r in sorted(mp.items()):
            chunks.append(
                f'  {json.dumps(key)}: {{ src: {json.dumps(r["path"])}, alt: {json.dumps(r["alt"])}, caption: {json.dumps(r["caption"])}, credit: {json.dumps(r["credit"])}, kind: {json.dumps(r["kind"])} }},'
            )
        chunks.append("};")
        chunks.append("")
    emit("LAB_COVER", by["lab"])
    emit("CASE_COVER_EXTRA", by["case"])
    emit("REALM_COVER", by["realm"])
    emit("TEACHER_HERO", by["teacher"])
    emit("GLOSSARY_PHOTO", by["glossary"])
    (ROOT / "src/lib/photo-assign.ts").write_text("\n".join(chunks))
    (PHOTO / "manifest.json").write_text(json.dumps({"count": len(rows), "items": rows}, indent=2))


def main() -> None:
    load_existing_hashes()
    # seasons exclusive: pin existing hash
    seasons = PHOTO / "earth-apollo17.jpg"
    if seasons.exists():
        USED_HASH.add(sha(seasons.read_bytes()))

    jobs = []
    for slug in LABS:
        title, cap, files, alt, credit = LAB_META[slug]
        jobs.append(("lab", slug, title, cap, files, title, credit, alt))
    for slug, meta in CASE_FIX.items():
        title, cap, files, alt, credit = meta
        jobs.append(("case", slug, title, cap, files, title, credit, alt))
    for slug, meta in REALMS.items():
        title, cap, files, alt, credit = meta
        jobs.append(("realm", slug, title, cap, files, title, credit, alt))
    for slug in LABS:
        title = LAB_META[slug][0]
        jobs.append(("teacher", slug, f"Teacher · {title}", "A second photograph for the projector script — not the lab cover.", LAB_META[slug][2][1:] or LAB_META[slug][2], title + " field photograph", "Wikimedia Commons / NASA / USGS", f"Field or official figure for teaching {title}."))

    terms_path = ROOT / "scripts" / "glossary-terms.txt"
    if not terms_path.exists():
        terms_path = Path("/tmp/glossary-terms.txt")
    terms = terms_path.read_text().splitlines()
    # UK/US pairs that MAY share a photo: handled later by pointing both keys at same? User said two different words cannot share unless colour/color.
    share = {
        "colour": "color",
        "metre": "meter",
        "arete": "arête",
        "levée": "levee",
        "corrasion": "abrasion",
    }
    skip_share_second = set()
    for t in terms:
        q = LANDFORM_Q.get(t, t + " geology geography")
        jobs.append(("glossary", t, t, f"{t} as used in the TerraLens labs.", [], q, "Wikimedia Commons / NASA / USGS / classroom diagram", f"Illustration of {t} matching the glossary definition."))

    print(f"jobs {len(jobs)}", flush=True)
    # serial for API politeness on search; inner fetch is short
    rows = []
    for i, job in enumerate(jobs):
        rec = fill_slot(*job)
        rows.append(rec)
        if i % 25 == 0:
            print(f"  {i}/{len(jobs)} {job[0]}:{job[1]} {rec['kind']}", flush=True)
            time.sleep(0.05)
    write_assign(rows)
    hashes = [r["content_hash"] for r in rows]
    print("done", len(rows), "unique hashes", len(set(hashes)), "photos", sum(1 for r in rows if r["kind"]=="photo"), "diagrams", sum(1 for r in rows if r["kind"]=="diagram"), flush=True)
    if len(set(hashes)) != len(hashes):
        print("WARNING hash collision", flush=True)


if __name__ == "__main__":
    main()
