# TerraLens

See how the Earth works. A free English-language geoscience studio for secondary and high-school students worldwide.

## Run

```bash
npm install
npm run dev
```

Open the printed local URL. The studio is dark by default.

## How to add a lab

1. Add a `LabMeta` object to the matching `src/lib/labs/labs-*.ts` file (title, hook, curriculum, steps, questions, teacher note, sources). Do not list a lab that has no scene.
2. Create `src/labs/<slug>/scene.tsx` as a **default export**. Use `useLabControls()` for play/pause, `t` (0–1), explode/slice, labels, and extra params. Drive motion with `useLabTick(rate)` so delta time stays capped.
3. Register the lazy import in `src/labs/registry.ts`.
4. Put the scene on the shared player: `/lab/<slug>` is already wired by `src/routes/lab.$slug.tsx`.
5. Hide unfinished work. No grey placeholder cards.

Shared HUD lives in `src/components/lab/`. Globe primitives live in `src/components/globe/`. Named-object tick list: [models.md](./models.md).

## Data sources

- NASA Blue Marble (day / night / topology) — `public/textures/`
- USGS, BGS, NOAA, Met Office, Natural Earth, Open-Meteo, OpenStreetMap / OpenFreeMap

## Stack

TanStack Start, React 19, Tailwind v4, React Three Fiber, drei, Zustand, MapLibre GL.

## Licence

Free for students and teachers. Always.

## Wave 0

Harden the original eight labs and the chrome. Do not restyle.

- Header: Realms · Explore · Paths · Atlas · Tools · Teachers. Search in Tools. No login.
- Left stepper **Check** opens the right-hand CHECK tab.
- Curriculum chips wrap with gaps; they no longer concatenate.
- Below 1100px the HUD stacks under the canvas instead of covering 3D labels.
- Lab load fallback times out at 2.5s to a still + Play. No infinite “Loading lab…”.
- Existing eight labs keep their scenes; tilt defaults to 23.44°; P/S waves, time zones, hotspot, basin, 2D/3D hill sit on the control bar.
- `/search` indexes labs, glossary, and cases. Unknown URLs keep the empty-ocean 404.
- Case pages: 400–700 words, MapLibre locator, exam question, sources. No “Phase 1 pointer”.
- Explore headline uses the real lab count.

## Wave 1

Atmosphere parity. Shipped: atmosphere-layers, energy-budget, thermal-circulation, wind, three-cell, fronts, cyclone-anticyclone. Realm hub lists them. Glossary grows from each lab. Atmosphere is not Later.

## Wave 2

Landforms parity. Shipped: landform-types, river-erosion, river-deposition, river-capture, coasts, glaciers, karst, folds-faults. GCSE Physical Landscapes path is contours → rivers → coasts → glaciers. Holderness is a full coastal case.

## Wave 3

Tools and atlas. Shipped: solar-altitude, earth-motion calculator, graticule, map-projections, grid-references, atlas (countries + UK nations + US states), MapLibre studio, live weather (Open-Meteo, educational disclaimer). NGSS Earth in Space path uses rotation, seasons, solar-altitude, moon-phases.

## Wave 4

Soils, carbon, water depth. Shipped: rock-cycle, soil-profile, soil-texture, weathering, soil-erosion, drainage-basin, hydrograph, river-hydrology, carbon-cycle, ocean-currents, thermohaline, enso. A-level water-and-carbon and APES Earth systems paths. Skills page adds hydrograph and the texture triangle.

## Wave 5

Remaining planet and hazards. Shipped: solar-system, sun-earth, universe-scale, geologic-time, eclipses, tides, continental-drift, hotspots, seafloor-spreading, earthquakes, volcanoes, tsunami, tropical-cyclone, climate-types, aeolian. GCSE natural hazards path. Named-object list ≥50, all ticked. Explore uses the real count. About still says free forever.
