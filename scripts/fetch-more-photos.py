#!/usr/bin/env python3
"""Unique classroom photos so Why pairs do not reuse one Earth on unrelated labs."""
from __future__ import annotations

import io
import os
import urllib.request

from PIL import Image

OUT = "/workspace/public/photos"
UA = "TerraLens/1.0 educational geoscience studio"
CANDIDATES: dict[str, list[str]] = {
    "nile-delta.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Nile_Delta_from_orbit.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Nile_River_Delta.jpg?width=1280",
        "https://eoimages.gsfc.nasa.gov/images/imagerecords/5000/5646/NileDelta.A2002362.0850.250m.jpg",
    ],
    "mississippi.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Mississippi_River_delta.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Mississippi_River_meanders.jpg?width=1280",
        "https://eoimages.gsfc.nasa.gov/images/imagerecords/86000/86314/iss043e091800_lrg.jpg",
    ],
    "braided-river.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Waimakariri_River.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Braided_river.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Rakaia_River.jpg?width=1280",
    ],
    "dendritic.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Dendritic_drainage.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Yarlung_Tsangpo.jpg?width=1280",
        "https://eoimages.gsfc.nasa.gov/images/imagerecords/42000/42354/lhasa_tm5_1987218.jpg",
    ],
    "himalaya.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Himalayas.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Himalaya_annotated.jpg?width=1280",
        "https://eoimages.gsfc.nasa.gov/images/imagerecords/36000/36051/himalaya_tmo_2008121_lrg.jpg",
    ],
    "fissure.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Holuhraun_fissure.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Krafla_fissure.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Fissure_eruption.jpg?width=1280",
    ],
    "gully.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Gully.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Soil_erosion.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Gully_erosion.jpg?width=1280",
    ],
    "death-valley.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Death_Valley.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Death_Valley_sand_dunes.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Badwater_Death_Valley.jpg?width=1280",
    ],
    "iceberg.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Iceberg.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Iceberg_in_the_Arctic.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Icebergs.jpg?width=1280",
    ],
    "airglow.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Earth_atmosphere_from_ISS.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Atmosphere_Earth.jpg?width=1280",
        "https://eoimages.gsfc.nasa.gov/images/imagerecords/78000/78314/iss030e020326_lrg.jpg",
    ],
    "sun-path.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Analemma.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Solar_analemma.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Sun_path.jpg?width=1280",
    ],
    "unconformity.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Great_Unconformity.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Hutton_Unconformity.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Angular_unconformity.jpg?width=1280",
    ],
    "karst-spring.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Karst_spring.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Resurgence.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Vaucluse_spring.jpg?width=1280",
    ],
    "ophiolite.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Ophiolite.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Oman_ophiolite.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Pillow_lava.jpg?width=1280",
    ],
    "laterite.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Laterite.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Laterite_soil.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Red_soil.jpg?width=1280",
    ],
    "weathered-granite.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Weathered_granite.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Granite_weathering.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Tors.jpg?width=1280",
    ],
    "milky-way.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Milky_Way_Arch.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Milky_Way.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Night_sky_milky_way.jpg?width=1280",
    ],
    "africa-globe.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Africa_satellite_orthographic.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Africa_from_space.jpg?width=1280",
        "https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57752/land_shallow_topo_2048.jpg",
    ],
    "greenland-ice.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Greenland_ice_sheet.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Greenland_from_space.jpg?width=1280",
        "https://eoimages.gsfc.nasa.gov/images/imagerecords/36000/36972/greenland_tmo_2008124_lrg.jpg",
    ],
    "pillow-lava.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Pillow_lava_Hawaii.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Pillow_basalt.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Pillow_lava.jpg?width=1280",
    ],
    "wave-cut.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Wave-cut_platform.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Wave_cut_platform.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Shore_platform.jpg?width=1280",
    ],
    "oxbow.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Oxbow_lake.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Oxbow.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Meander_cutoff.jpg?width=1280",
    ],
    "eye-hurricane.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Hurricane_Isabel_from_ISS.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Hurricane_eye.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Typhoon_eye.jpg?width=1280",
    ],
    "aurora.jpg": [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Aurora_borealis.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Aurora.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Northern_lights.jpg?width=1280",
    ],
}


def fetch(url: str) -> bytes | None:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "image/*,*/*"})
    try:
        with urllib.request.urlopen(req, timeout=22) as r:
            data = r.read()
            ctype = r.headers.get("Content-Type", "")
            if len(data) < 12000:
                return None
            if "html" in ctype.lower() and data[:3] != b"\xff\xd8" and not data.startswith(b"\x89PNG"):
                return None
            return data
    except Exception as e:
        print(" fail", url[-60:], e)
        return None


def save(name: str, data: bytes) -> bool:
    try:
        im = Image.open(io.BytesIO(data)).convert("RGB")
        im.thumbnail((1400, 1050))
        path = os.path.join(OUT, name)
        im.save(path, "JPEG", quality=86, optimize=True)
        print(" wrote", name, im.size, os.path.getsize(path))
        return True
    except Exception as e:
        print(" decode", name, e)
        return False


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    ok = 0
    for name, urls in CANDIDATES.items():
        path = os.path.join(OUT, name)
        if os.path.isfile(path) and os.path.getsize(path) > 25000:
            print("skip", name)
            ok += 1
            continue
        for url in urls:
            data = fetch(url)
            if data and save(name, data):
                ok += 1
                break
        else:
            print("MISS", name)
    print("done", ok, "/", len(CANDIDATES))


if __name__ == "__main__":
    main()
