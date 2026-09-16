#!/bin/sh
# Meshopt + WebP. Keep named nodes (no flatten/join/simplify/instance).
# Draco and mesh simplify are forbidden — they blunt contours.
set -eu
ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
IN="${1:-"$ROOT/public/models"}"
OUT="${2:-"$IN"}"
BIN="$ROOT/node_modules/@gltf-transform/cli/bin/cli.js"
if [ ! -x "$BIN" ] && [ ! -f "$BIN" ]; then
  echo "gltf-transform CLI missing" >&2
  exit 1
fi
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
ok=0
fail=0
for src in "$IN"/*.glb; do
  [ -f "$src" ] || continue
  base="$(basename "$src")"
  dest="$tmp/$base"
  if node "$BIN" optimize "$src" "$dest" \
    --compress meshopt \
    --meshopt-level high \
    --simplify false \
    --join false \
    --flatten false \
    --instance false \
    --palette false \
    --texture-compress webp \
    --texture-size 1024 \
    --weld false; then
    ok=$((ok + 1))
  else
    echo "FAIL $base" >&2
    fail=$((fail + 1))
    cp "$src" "$dest"
  fi
done
mkdir -p "$OUT"
for f in "$tmp"/*.glb; do
  mv -f "$f" "$OUT/$(basename "$f")"
done
echo "optimize-glbs ok=$ok fail=$fail dest=$OUT"
