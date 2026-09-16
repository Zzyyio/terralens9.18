"""Build every TerraLens lab as a named-mesh glTF 2.0 .glb from Blender 4.2.

Usage:
  /opt/blender/blender --background --python /workspace/scripts/blender/build_all.py -- coasts glaciers
  /opt/blender/blender --background --python /workspace/scripts/blender/build_all.py -- all
"""
from __future__ import annotations

import json
import os
import sys
import traceback

sys.path.insert(0, "/workspace/scripts/blender")

from lib import reset_scene, export_glb, mats, cycles_preview  # noqa: E402
import labs_a  # noqa: E402
import labs_b  # noqa: E402

LABS = {**labs_a.LABS, **labs_b.LABS}
MANIFEST = "/workspace/public/models/manifest.json"

PREVIEW = {
    "coasts",
}


def argv():
    if "--" in sys.argv:
        return sys.argv[sys.argv.index("--") + 1 :]
    return []


def build_one(slug: str) -> dict:
    reset_scene()
    mats()
    fn = LABS[slug]
    fn()
    path, n, tris, names = export_glb(slug)
    if slug in PREVIEW:
        try:
            cycles_preview(slug)
        except Exception as e:
            print("PREVIEW_FAIL", slug, type(e).__name__, e)
    return {
        "slug": slug,
        "glb": f"/models/{slug}.glb",
        "blender": f"scripts/blender/labs_{'a' if slug in labs_a.LABS else 'b'}.py",
        "meshes": n,
        "triangles": tris,
        "parts": [{"name": a, "tris": b} for a, b in names],
    }


def main():
    args = argv()
    slugs = list(LABS.keys()) if (not args or args[0] == "all") else args
    missing = [s for s in slugs if s not in LABS]
    if missing:
        print("UNKNOWN", missing)
        print("HAVE", sorted(LABS))
        sys.exit(2)
    results = []
    failed = []
    for slug in slugs:
        print("=" * 60)
        print("BUILD", slug)
        try:
            results.append(build_one(slug))
        except Exception:
            traceback.print_exc()
            failed.append(slug)
    # merge with existing manifest if partial rebuild
    existing = {}
    if os.path.isfile(MANIFEST) and args and args[0] != "all":
        try:
            with open(MANIFEST) as f:
                prev = json.load(f)
            for lab in prev.get("labs", []):
                existing[lab["slug"]] = lab
        except Exception:
            existing = {}
    for r in results:
        existing[r["slug"]] = r
    labs_out = list(existing.values()) if existing else results
    man = {"labs": labs_out, "failed": failed, "count": len(labs_out)}
    os.makedirs("/workspace/public/models", exist_ok=True)
    with open(MANIFEST, "w") as f:
        json.dump(man, f, indent=2)
    print("DONE", len(results), "failed", failed)
    if results:
        import subprocess

        opt = subprocess.run(
            ["sh", "/workspace/scripts/optimize-glbs.sh"],
            check=False,
        )
        print("OPTIMIZE", opt.returncode)


if __name__ == "__main__":
    main()
