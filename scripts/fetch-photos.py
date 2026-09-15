#!/usr/bin/env python3
"""Download classroom photos from NASA/USGS/Wikimedia. Skip if already present and >20 kB."""
from __future__ import annotations

import io
import os
import urllib.request

from PIL import Image

OUT = "/workspace/public/photos"
UA = "TerraLens/1.0 educational geoscience studio (https://terralens.grok.me)"

# dest -> list of candidate URLs (first success wins)
CANDIDATES: dict[str, list[str]] = {
    "tsunami.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Miyako_city_after_tsunami.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/2011_Sendai_tsunami.jpg?width=960",
        "https://upload.wikimedia.org/wikipedia/commons/4/4a/2011_Sendai_tsunami.jpg",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Rikuzentakata_after_tsunami.jpg?width=960",
    ],
    "shield-volcano.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Mauna_Loa.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Mauna_Loa_from_the_air.jpg?width=960",
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Mauna_Loa.jpg",
    ],
    "stack.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Old_Harry_Rocks.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/The_Twelve_Apostles_Victoria_Australia.jpg?width=960",
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/Old_Harry_Rocks.jpg",
    ],
    "horn.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Matterhorn_from_Domh%C3%BCtte_-_2.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Matterhorn_from_Zermatt.jpg?width=960",
        "https://upload.wikimedia.org/wikipedia/commons/6/6e/Matterhorn_from_Domh%C3%BCtte_-_2.jpg",
    ],
    "syncline.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Sideling_Hill_syncline.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Sideling_Hill.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Rainbow_Basin.jpg?width=960",
    ],
    "soil-horizons.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Podzol.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Soil_profile.png?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/SoilProfile.jpg?width=960",
    ],
    "earthquake-rupture.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Landers_earthquake_surface_rupture.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Surface_rupture.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Kumamoto_earthquake_surface_rupture.jpg?width=960",
    ],
    "enso.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/El_Nino_sea_surface_temperature.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/ElNi%C3%B1o.png?width=960",
        "https://www.nnvl.noaa.gov/images/global/SSTAnom.png",
    ],
    "carbon-store.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Amazon_rainforest.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Amazon_Rainforest.jpg?width=960",
        "https://eoimages.gsfc.nasa.gov/images/imagerecords/36000/36019/amazon_amo_2008219_lrg.jpg",
    ],
    "ocean-currents.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Gulf_Stream_sea_surface_temperature.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Gulf_Stream_SST.jpg?width=960",
        "https://www.ghrsst.org/wp-content/uploads/2021/05/ghrsst-sst.jpg",
    ],
    "landslide.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Oso_mudslide.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Oso_landslide.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Landslide.jpg?width=960",
    ],
    "cold-front-sat.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/GOES_East_full_disk.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Cold_front.jpg?width=960",
        "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/thumbnail.jpg",
    ],
    "climate-biome.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Savanna.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Acacia_savanna.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Serengeti.jpg?width=960",
    ],
    "rock-granite.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Granite_Yosemite.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Granite_closeup.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Granite.jpg?width=960",
    ],
    "isostasy.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Raised_beach.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Post-glacial_rebound.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Raised_beach_Isle_of_Arran.jpg?width=960",
    ],
    "itcz.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/ITCZ.jpg?width=960",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Intertropical_Convergence_Zone.jpg?width=960",
        "https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57747/africa_amo_2005193_lrg.jpg",
    ],
}


def fetch(url: str) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "image/*,*/*"})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            data = r.read()
            ctype = r.headers.get("Content-Type", "")
            if len(data) < 8000:
                return None
            if "html" in ctype.lower() and not data[:8].startswith(b"\x89PNG") and data[:3] != b"\xff\xd8":
                return None
            return data
    except Exception as e:
        print(f"  fail {url[:80]}: {e}")
        return None


def save_jpeg(name: str, data: bytes) -> bool:
    path = os.path.join(OUT, name)
    try:
        im = Image.open(io.BytesIO(data))
        im = im.convert("RGB")
        w, h = im.size
        if max(w, h) > 1280:
            im.thumbnail((1280, 1280))
        im.save(path, "JPEG", quality=86, optimize=True)
        print(f"  wrote {name} {im.size} {os.path.getsize(path)} bytes")
        return True
    except Exception as e:
        print(f"  decode fail {name}: {e}")
        return False


def already(name: str) -> bool:
    path = os.path.join(OUT, name)
    return os.path.isfile(path) and os.path.getsize(path) > 20_000


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    for name, urls in CANDIDATES.items():
        if already(name):
            print(f"skip {name}")
            continue
        print(f"get {name}")
        ok = False
        for url in urls:
            data = fetch(url)
            if data and save_jpeg(name, data):
                ok = True
                break
        if not ok:
            print(f"MISSING {name}")


if __name__ == "__main__":
    main()
