#!/usr/bin/env python3
"""Honest classroom figures: SI hydrograph, scientific interior cutaway, fetch anticline/soil pit."""
from __future__ import annotations

import io
import math
import os
import urllib.request

from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = "/workspace/public/photos"
TEX = "/workspace/public/textures/earth-day.jpg"
UA = "TerraLens/1.0 educational geoscience studio (https://terralens.grok.me)"


def fetch(url: str, dest: str, min_kb: int = 40) -> bool:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            data = r.read()
        if len(data) < min_kb * 1024:
            print(f"too small {url} {len(data)}")
            return False
        img = Image.open(io.BytesIO(data)).convert("RGB")
        img.thumbnail((1600, 1200))
        img.save(dest, "JPEG", quality=88)
        print(f"wrote {dest} {os.path.getsize(dest)}")
        return True
    except Exception as e:
        print(f"fail {url}: {e}")
        return False


def font(size: int):
    for p in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSans.ttf",
    ):
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def hydrograph(path: str) -> None:
    w, h = 1280, 720
    img = Image.new("RGB", (w, h), "#0e1412")
    d = ImageDraw.Draw(img)
    left, right, top, bottom = 90, 1180, 70, 620
    d.rectangle([left, top, right, bottom], fill="#121a18", outline="#3a4844")
    hours = 24
    rain = []
    q = []
    base = 8.0
    for i in range(241):
        t = i / 10
        r = 0.0
        if 2.0 <= t <= 6.5:
            r = 9.5 * math.exp(-0.5 * ((t - 3.8) / 1.05) ** 2)
        rain.append(r)
        acc = base
        for j, rr in enumerate(rain):
            lag = t - j / 10
            if lag < 0:
                continue
            acc += rr * 1.85 * (lag / 3.8) * math.exp(-lag / 3.8)
        q.append(acc)
    rmax = max(rain) or 1
    qmax = max(q) * 1.08
    # rain inverted bars at top
    n = len(rain)
    for i, r in enumerate(rain):
        x = left + (i / (n - 1)) * (right - left)
        bh = (r / rmax) * 110
        d.line([(x, top + 8), (x, top + 8 + bh)], fill="#7FD4FF", width=2)
    # discharge polyline
    pts = []
    for i, v in enumerate(q):
        x = left + (i / (n - 1)) * (right - left)
        y = bottom - (v / qmax) * (bottom - top - 160)
        pts.append((x, y))
    d.line(pts, fill="#3EE0C6", width=3)
    # axes
    d.line([(left, bottom), (right, bottom)], fill="#C4D0CC", width=2)
    d.line([(left, top), (left, bottom)], fill="#C4D0CC", width=2)
    d.line([(right, top), (right, bottom)], fill="#C4D0CC", width=2)
    ft = font(18)
    fs = font(14)
    d.text((left, 24), "Storm hydrograph — SI units", fill="#F4EFE6", font=font(26))
    d.text((left, 52), "Classroom drawing after a temperate-catchment pattern (USGS style). Not a live gauge.", fill="#C4D0CC", font=fs)
    d.text((left, bottom + 12), "Time (hours after rainfall onset)", fill="#C4D0CC", font=ft)
    d.text((16, 280), "Discharge\n(m³ s⁻¹)", fill="#3EE0C6", font=fs)
    d.text((right - 160, 80), "Rainfall\n(mm h⁻¹)", fill="#7FD4FF", font=fs)
    for hr in range(0, 25, 4):
        x = left + (hr / 24) * (right - left)
        d.line([(x, bottom), (x, bottom + 6)], fill="#C4D0CC")
        d.text((x - 8, bottom + 10), str(hr), fill="#C4D0CC", font=fs)
    d.text((left + 20, bottom - 40), "Rising limb", fill="#F4EFE6", font=fs)
    d.text((left + 420, bottom - 180), "Peak", fill="#F4EFE6", font=fs)
    d.text((left + 720, bottom - 80), "Falling limb", fill="#F4EFE6", font=fs)
    d.text((left + 40, bottom - 90), "Baseflow", fill="#8aa", font=fs)
    img.save(path, "JPEG", quality=90)
    print(f"wrote {path}")


def interior(path: str) -> None:
    w, h = 1400, 900
    img = Image.new("RGB", (w, h), "#07090C")
    d = ImageDraw.Draw(img)
    cx, cy, R = 520, 450, 340
    # space
    earth = Image.open(TEX).convert("RGB").resize((R * 2, R * 2))
    mask = Image.new("L", (R * 2, R * 2), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, R * 2 - 1, R * 2 - 1], fill=255)
    img.paste(earth, (cx - R, cy - R), mask)
    # cutaway quarter (right half)
    layers = [
        (R, "#1a3a28", "Crust  ~35 km  (a film)"),
        (int(R * 0.547 / 1.0 * (2900 / 6371 + 0.547) and R * 0.547), None, None),
    ]
    # Mantle to 0.547 of radius from center... wait
    # True: crust film, mantle to 0.547 of outer (CMB), outer core 0.547-0.191, inner 0.191
    mantle_r = int(R * 0.994)  # just under crust
    cmb = int(R * 0.547)
    icb = int(R * 0.191)
    # Cover right-bottom cutaway pie with layers
    def pie(r, fill):
        box = [cx - r, cy - r, cx + r, cy + r]
        d.pieslice(box, start=-20, end=110, fill=fill)
    pie(mantle_r, "#6a4030")
    pie(cmb, "#c4a05a")
    pie(icb, "#e8d5a3")
    # thin crust arc on the cut
    d.arc([cx - R, cy - R, cx + R, cy + R], start=-20, end=110, fill="#7C9A6A", width=3)
    # labels
    ft = font(22)
    fs = font(16)
    d.text((40, 36), "Earth interior — scientific visualization", fill="#F4EFE6", font=font(28))
    d.text((40, 72), "Not a photograph. Crust is a film. Outer core is liquid metal. Mantle is solid rock.", fill="#C4D0CC", font=fs)
    labels = [
        (cx + R + 30, cy - 200, "Crust  ~35 km  (film on 6371 km)"),
        (cx + int(R * 0.75), cy + 40, "Mantle  solid rock that creeps"),
        (cx + 40, cy + 80, "Outer core  liquid Fe–Ni"),
        (cx - 40, cy + 20, "Inner core  solid Fe–Ni"),
    ]
    d.text((cx + R + 24, cy - 220), "Crust  ~35 km  — a film", fill="#7C9A6A", font=ft)
    d.text((cx + int(R * 0.62), cy - 20), "Mantle", fill="#d8c4b0", font=ft)
    d.text((cx + 30, cy + 90), "Outer core (liquid)", fill="#111", font=fs)
    d.text((cx - 70, cy - 10), "Inner", fill="#111", font=fs)
    d.text((40, h - 48), "Radii to scale. Crust thickness cannot be drawn at true scale on this page and still be visible.", fill="#8aa", font=fs)
    img.save(path, "JPEG", quality=90)
    print(f"wrote {path}")


def main() -> None:
    hydrograph(os.path.join(OUT, "hydrograph-chart.jpg"))
    interior(os.path.join(OUT, "earth-interior-science.jpg"))
    anticline_urls = [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Rainbow_Basin.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Macro_anticline.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Split_Mountain_anticline.jpg?width=1280",
        "https://upload.wikimedia.org/wikipedia/commons/8/84/Rainbow_Basin.jpg",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Upturned_beds.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Folded_sedimentary_rocks.jpg?width=1280",
    ]
    ok = False
    for u in anticline_urls:
        if fetch(u, os.path.join(OUT, "anticline.jpg")):
            ok = True
            break
    print("anticline", ok)
    pit_urls = [
        "https://commons.wikimedia.org/wiki/Special:FilePath/Soil_profile.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Alfisol.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/Mollisol.jpg?width=1280",
        "https://commons.wikimedia.org/wiki/Special:FilePath/SoilProfile.jpg?width=1280",
    ]
    pit_ok = False
    dest = os.path.join(OUT, "soil-pit.jpg")
    for u in pit_urls:
        if fetch(u, dest):
            pit_ok = True
            break
    print("soil-pit", pit_ok)


if __name__ == "__main__":
    main()
