"""Planet, atmosphere, water, skills labs — Blender named meshes."""
from __future__ import annotations

import math
from mathutils import Vector

from lib import (
    empty, tag, parent, grid, box, uv_sphere, ico, cylinder, cone,
    displace, joint_cuts, apply_boolean, water_volume, ice_tongue,
    torus, channel, fbm, fold_bed,
)

LABS = {}


def lab(slug):
    def deco(fn):
        LABS[slug] = fn
        return fn
    return deco


def exag_root(factor, note="Teaching exaggeration. T collapses it."):
    e = empty("Exag")
    tag(e, note, "exag", factor)
    return e


@lab("seasons")
def build_seasons():
    sun = uv_sphere("Season_Sun", 0.45, 32, 24, "sun", loc=(0, 0, 0))
    tag(sun, "The lamp. Distance is not the season.")
    earth = uv_sphere("Season_Earth", 0.22, 48, 32, "earth", loc=(3.4, 0, 0))
    tag(earth, "Tilted 23.44°. June: NH leans toward the Sun. Perihelion is early January — NH winter.", "spin")
    orbit = torus("Season_Orbit", 3.4, 0.012, 64, 8, "gold")
    tag(orbit, "Near-circular orbit. Radius is shrunk so Earth is readable. Tilt is true.")
    axis = cylinder("Season_Axis", 0.012, 0.7, 8, "iron", loc=(3.4, 0, 0))
    axis.rotation_euler = (math.radians(23.44), 0, 0)
    tag(axis, "Axial tilt 23.44°. This is the season machine.", "tilt_axis")
    peri = ico("Season_Perihelion", 0.05, 1, "gold", loc=(3.4 * 0.97, 0.4, 0))
    tag(peri, "Perihelion — nearest the Sun — early January, northern winter.")


@lab("rotation")
def build_rotation():
    earth = uv_sphere("Rotation_Earth", 1.15, 64, 48, "earth")
    tag(earth, "West to east, 15° per hour. The terminator is geometry, not a painted line.", "spin")
    # thin dawn tube along terminator (y=0 plane ring)
    term = torus("Rotation_Terminator", 1.16, 0.012, 64, 8, "gold")
    term.rotation_euler = (math.pi / 2, 0, 0)
    tag(term, "The terminator walks with tilt through the year.")


@lab("moon-phases")
def build_moon_phases():
    sun = uv_sphere("Moon_Sun", 0.35, 24, 16, "sun", loc=(-3.6, 0, 0))
    tag(sun, "The lamp. Phase is the viewing angle, not a texture swap.")
    earth = uv_sphere("Moon_Earth", 0.5, 48, 32, "earth")
    tag(earth, "We stand here. Half the Moon is always lit.")
    moon = uv_sphere("Moon_Moon", 0.18, 32, 24, "moon", loc=(1.6, 0, 0))
    tag(moon, "Cratered Moon, half-lit by the Sun. New Moon plus a node is a solar eclipse.", "spin")


@lab("sun-earth")
def build_sun_earth():
    sun = uv_sphere("SE_Sun", 0.5, 32, 24, "sun", loc=(-2.8, 0, 0))
    tag(sun, "Photosphere. Spots are a labelled extra, not weather.")
    earth = uv_sphere("SE_Earth", 0.7, 56, 40, "earth")
    tag(earth, "Noon-face flux. Incidence is a cosine, not a lamp on a stick.", "spin")
    flux = cylinder("SE_Flux", 0.04, 1.6, 10, "gold", loc=(-1.1, 0, 0))
    flux.rotation_euler = (0, math.pi / 2, 0)
    tag(flux, "A beam of insolation. Area on the ground grows as the angle falls.")


@lab("solar-altitude")
def build_solar_altitude():
    land = grid("Alt_Land", 28, 28, 4.2, 4.2, lambda x, y: 0.04 * fbm(Vector((x, y, 0))), "sand")
    tag(land, "A local horizon. Latitude writes the path.")
    dome = uv_sphere("Alt_SkyDome", 2.2, 32, 16, "cloud", cut_theta=None)
    # hemisphere: scale and clip by deleting bottom — scale z * 0.5 and shift
    dome.scale = (1, 1, 0.55)
    dome.location = (0, 0, 0.05)
    tag(dome, "A stand-in for the celestial hemisphere. The path is today's arc.")
    sun = uv_sphere("Alt_Sun", 0.12, 16, 12, "sun", loc=(0.8, -1.4, 1.5))
    tag(sun, "Noon altitude = 90° − |φ − δ|. The Sun is not overhead everywhere.", "sun_path")
    gno = cylinder("Alt_Gnomon", 0.03, 0.55, 10, "wood", loc=(0, 0, 0.28))
    tag(gno, "School geometry. Shadow length is 1 / tan(altitude).")
    sh = box("Alt_Shadow", 0.08, 0.9, 0.01, mat="basalt", loc=(0, 0.45, 0.02))
    tag(sh, "The gnomon writes solar altitude on the ground.")


@lab("eclipses")
def build_eclipses():
    sun = uv_sphere("Ecl_Sun", 0.62, 32, 24, "sun", loc=(-3.4, 0, 0))
    tag(sun, "The lamp. A solar eclipse needs new Moon plus a node.")
    earth = uv_sphere("Ecl_Earth", 0.45, 40, 28, "earth")
    tag(earth, "Umbra is the dark cone. A total eclipse is a line on the ground, not a planet-wide night.")
    moon = uv_sphere("Ecl_Moon", 0.16, 28, 20, "moon", loc=(1.5, 0.12, 0))
    tag(moon, "Tilted about 5° unless alignment is on.")
    umbra = cone("Ecl_Umbra", 0.22, 0.02, 1.8, 20, "basalt", loc=(0.7, 0, 0))
    umbra.rotation_euler = (0, math.pi / 2, 0)
    tag(umbra, "The dark core of the shadow.")
    pen = cone("Ecl_Penumbra", 0.45, 0.12, 1.8, 20, "cloud", loc=(0.7, 0, 0))
    pen.rotation_euler = (0, math.pi / 2, 0)
    tag(pen, "The pale outer shadow. A graze, not the tunnel.")


@lab("tides")
def build_tides():
    earth = uv_sphere("Tide_Earth", 0.85, 48, 32, "earth")
    tag(earth, "Two bulges: one toward the Moon, one opposite. Continents then reshape the range.")
    moon = uv_sphere("Tide_Moon", 0.18, 24, 16, "moon", loc=(2.4, 0, 0))
    tag(moon, "The nearer body. Two bulges, not one under the Moon.", "spin")
    sun = uv_sphere("Tide_Sun", 0.28, 20, 14, "sun", loc=(-3.2, 0, 0))
    tag(sun, "The Sun also raises tides, weaker than the Moon. Spring tides when they align.")
    bulge = uv_sphere("Tide_Bulge", 0.92, 40, 28, "water")
    bulge.scale = (1.12, 0.92, 0.92)
    tag(bulge, "Two bulges from the Moon's gravity plus the orbiting system's inertia — a school model, flagged as such.")


@lab("solar-system")
def build_solar_system():
    sun = uv_sphere("SS_Sun", 0.35, 32, 24, "sun")
    tag(sun, "The Sun. Planets would be dust at true scale.")
    for name, r, dist, mat, note in [
        ("SS_Mercury", 0.04, 0.7, "iron", "Mercury."),
        ("SS_Venus", 0.07, 1.0, "sandstone", "Venus."),
        ("SS_Earth", 0.08, 1.35, "earth", "Earth. T swaps vis distances for compressed AU."),
        ("SS_Mars", 0.05, 1.75, "oxisol", "Mars."),
        ("SS_Jupiter", 0.18, 2.5, "sandstone", "Jupiter. Size here is still a classroom lie."),
    ]:
        p = uv_sphere(name, r, 24, 16, mat, loc=(dist, 0, 0))
        tag(p, note, "spin")
        orb = torus(f"{name}_Orbit", dist, 0.006, 48, 6, "gold")
        tag(orb, "Orbit. True scale would empty this room.")


@lab("universe-scale")
def build_universe():
    earth = uv_sphere("Uni_Earth", 0.4, 40, 28, "earth")
    tag(earth, "12 742 km across. Units here are kilometres, not AU.", "zoom_band:0:0.7")
    moon = uv_sphere("Uni_Moon", 0.11, 24, 16, "moon", loc=(1.4, 0, 0))
    tag(moon, "About 30 Earth-diameters away. Drawn close so both fit — a labelled lie of scale.", "zoom_band:0:0.7")
    sun = uv_sphere("Uni_Sun", 0.5, 32, 20, "sun", loc=(0, 0, 0))
    tag(sun, "1 AU is 150 million km. Planets would be dust at true scale.", "zoom_band:0.7:1.4")
    au = torus("Uni_AU", 2.2, 0.01, 48, 6, "gold")
    tag(au, "Earth's path. If this ring is honest, Earth is a speck you cannot click.", "zoom_band:0.7:1.4")
    star = ico("Uni_LocalStars", 0.08, 1, "sun", loc=(1.2, 0.8, 0.4))
    tag(star, "Units are light years. Planets have no right to remain as named dots.", "zoom_band:1.4:3")


@lab("geologic-time")
def build_geologic_time():
    colors = ["soilR", "sandstone", "limestone", "schist", "granite", "basalt"]
    names = [
        ("Time_Precambrian", "Deep time. Most of Earth is this stack."),
        ("Time_Paleozoic", "Paleozoic beds."),
        ("Time_Mesozoic", "Mesozoic. The canyon starts to cut late."),
        ("Time_Cenozoic", "Cenozoic. The last few Ma of incision."),
    ]
    for i, (name, note) in enumerate(names):
        b = box(name, 3.4, 1.6, 0.38, nx=10, ny=6, nz=3, mat=colors[i], loc=(0, 0, i * 0.4))
        joint_cuts(b, 0.01, 9)
        tag(b, note, "age_peel")
    canyon = grid(
        "Time_Canyon",
        24,
        16,
        1.2,
        1.6,
        lambda x, y: -0.55 * math.exp(-(x * x) / 0.12),
        "sandstone",
    )
    canyon.location = (0, 0, 1.4)
    tag(canyon, "A young V cut in older strata. Linear Ma would crush the Phanerozoic.")


@lab("atmosphere-layers")
def build_atmosphere():
    earth = uv_sphere("Atmo_Earth", 1.0, 56, 40, "earth")
    tag(earth, "The solid planet. The air is a film on this.")
    trop = uv_sphere("Atmo_Troposphere", 1.04, 64, 44, "cloud")
    tag(trop, "Troposphere. Weather lives here. T collapses it to a film.", "shell_true")
    trop["tl_true"] = 1.005 / 1.04
    trop["tl_exag"] = 8
    strat = uv_sphere("Atmo_Stratosphere", 1.12, 56, 40, "ice")
    tag(strat, "Stratosphere. The anvil is the lid.", "shell_true")
    strat["tl_true"] = 1.02 / 1.12
    meso = uv_sphere("Atmo_Mesosphere", 1.2, 48, 32, "outer")
    tag(meso, "Mesosphere.", "shell_true")
    meso["tl_true"] = 1.04 / 1.2
    therm = uv_sphere("Atmo_Thermosphere", 1.32, 40, 28, "gold")
    tag(therm, "Thermosphere. Aurora lives high. Not weather.", "shell_true")
    therm["tl_true"] = 1.08 / 1.32


@lab("energy-budget")
def build_energy():
    earth = uv_sphere("Budget_Earth", 1.05, 56, 40, "earth")
    tag(earth, "Albedo skin. Ice, cloud, desert, forest — different returns.")
    sw = cylinder("Budget_Shortwave", 0.05, 1.6, 10, "gold", loc=(0, -1.8, 0.4))
    sw.rotation_euler = (math.pi / 2, 0, 0)
    tag(sw, "Shortwave in. Arrow width = flux.")
    alb = cylinder("Budget_Albedo", 0.04, 1.1, 10, "cloud", loc=(0.6, -1.5, 0.6))
    alb.rotation_euler = (1.0, 0.4, 0)
    tag(alb, "Albedo. Ice returns more than forest.")
    lw = cylinder("Budget_Longwave", 0.045, 1.3, 10, "lava", loc=(0, 1.7, 0.3))
    lw.rotation_euler = (-math.pi / 2, 0, 0)
    tag(lw, "Longwave out.")
    gh = torus("Budget_Greenhouse", 1.18, 0.03, 40, 8, "gold")
    tag(gh, "Greenhouse. The film that keeps the longwave honest.")


@lab("thermal-circulation")
def build_thermal():
    land = grid("Thermal_Land", 36, 28, 5.5, 4.0, lambda x, y: 0.18 + 0.05 * fbm(Vector((x, y, 0))), "sand")
    land.location = (-1.4, 0, 0)
    tag(land, "Land heats and cools fast. Day-sea breeze toward the land.")
    sea = water_volume("Thermal_Sea", 4.2, 4.0, 0.35, 0.03, loc=(1.8, 0, 0.05))
    tag(sea, "Sea. High heat capacity. Night-land breeze toward the water.")
    urb = box("Thermal_Urban", 1.4, 1.4, 0.22, nx=8, ny=8, nz=3, mat="basalt", loc=(-1.5, 0, 0.28))
    tag(urb, "Urban fabric. Extra heat, extra roughness.")


@lab("wind")
def build_wind():
    p = grid(
        "Wind_Pressure",
        40,
        40,
        6.0,
        6.0,
        lambda x, y: 0.15 + 0.35 * math.exp(-(x * x + y * y) / 1.8),
        "cloud",
    )
    tag(p, "A pressure surface. The PGF points toward the low.")
    low = ico("Wind_Low", 0.12, 2, "lava", loc=(0, 0, 0.55))
    tag(low, "Low. PGF is inward. Coriolis then turns the wind.")
    arr = cylinder("Wind_PGF", 0.03, 1.4, 8, "gold", loc=(0.8, 0, 0.4))
    arr.rotation_euler = (0, math.pi / 2, 0)
    tag(arr, "Pressure-gradient force. Always toward low, not along the isobar.")


@lab("three-cell")
def build_three_cell():
    earth = uv_sphere("Cell_Earth", 1.1, 48, 32, "earth")
    tag(earth, "Three cells because Earth rotates. A one-cell planet is a textbook that does not spin.")
    had = torus("Cell_Hadley", 0.7, 0.08, 40, 12, "gold", loc=(0, 0, 0.55))
    had.scale = (1, 1, 1.4)
    tag(had, "Hadley. Rises at the ITCZ, sinks at 30°. The UK is not here.")
    fer = torus("Cell_Ferrel", 0.95, 0.07, 40, 12, "iron", loc=(0, 0, 0.2))
    tag(fer, "Ferrel. The midlatitude cell. Surface westerlies. The UK sits here.")
    pol = torus("Cell_Polar", 0.45, 0.06, 32, 10, "ice", loc=(0, 0, 0.95))
    tag(pol, "Polar. Rises at 60°, sinks at the pole.")


@lab("fronts")
def build_fronts():
    cold = grid(
        "Front_Cold",
        20,
        12,
        4.8,
        3.2,
        lambda x, y: max(0, 0.7 - 0.55 * (x + 1.7) / 3.4) + 0.02 * fbm(Vector((x, y, 0))),
        "ice",
    )
    tag(cold, "Cold front: a dense 3D undercutting wedge, not a cloud sticker.")
    warm = grid(
        "Front_Warm",
        20,
        12,
        4.8,
        3.2,
        lambda x, y: 0.15 + 0.22 * (x + 1.7) / 3.4,
        "sand",
    )
    warm.location = (0, 1.7, 0)
    tag(warm, "Warm front: a gentle ramp. The cloud band is the slope of the wedge.")
    occ = grid("Front_Occlusion", 16, 10, 2.4, 1.2, lambda x, y: 0.35 * math.exp(-(x * x) / 0.8), "cloud")
    occ.location = (0, -1.6, 0.2)
    tag(occ, "Occlusion. The cold wedge has caught the warm ramp.")


@lab("cyclone-anticyclone")
def build_cyc_anti():
    dep = torus("Cyc_Depression", 1.4, 0.18, 40, 12, "cloud")
    tag(dep, "A midlatitude depression. Frontal comma, not an eyewall. UK-honest.")
    anti = torus("Cyc_Anticyclone", 1.8, 0.1, 40, 10, "gold")
    tag(anti, "Anticyclone. Opposite spin, sinking air, quieter weather.")
    earth = uv_sphere("Cyc_Earth", 0.35, 24, 16, "earth", loc=(0, 0, -0.2))
    tag(earth, "Hemisphere flip reverses the spin.")


@lab("climate-types")
def build_climate():
    earth = uv_sphere("Climate_Earth", 1.15, 56, 40, "earth")
    tag(earth, "Köppen is vegetation and water, not a flag colour.")
    trop = ico("Climate_A", 0.12, 2, "grass", loc=(0.2, 0.9, 0.55))
    tag(trop, "A tropical — no real winter.")
    dry = ico("Climate_B", 0.12, 2, "sand", loc=(0.7, 0.3, 0.85))
    tag(dry, "B dry — evaporation beats rain.")
    temp = ico("Climate_C", 0.12, 2, "soilA", loc=(0.5, 0.7, 0.7))
    tag(temp, "C temperate — mild winter. The UK lives here.")
    cold = ico("Climate_D", 0.12, 2, "granite", loc=(0.3, 0.5, 0.95))
    tag(cold, "D continental — real winter.")
    polar = ico("Climate_E", 0.12, 2, "ice", loc=(0.05, 0.15, 1.12))
    tag(polar, "E polar — no true summer.")


@lab("rain-shadow")
def build_rain_shadow():
    ex = exag_root(6)
    ridge = grid(
        "Shadow_Ridge",
        36,
        24,
        3.2,
        5.0,
        lambda x, y: 1.4 * math.exp(-(x * x) / 0.45) + 0.05 * fbm(Vector((x, y, 0))),
        "granite",
    )
    tag(ridge, "One ridge, one wind. Air cools as it rises.")
    parent(ridge, ex)
    cloud = torus("Shadow_WindwardCloud", 0.9, 0.22, 24, 10, "cloud", loc=(-1.1, 0, 1.3))
    tag(cloud, "Windward cloud and rain. Keswick / Sierra.")
    parent(cloud, ex)
    lee = grid("Shadow_Lee", 20, 20, 2.4, 3.2, lambda x, y: 0.08 + 0.02 * fbm(Vector((x, y, 1))), "sand")
    lee.location = (1.8, 0, 0)
    tag(lee, "The lee is the rain shadow. Penrith / Death Valley. Air already dumped its water.")
    parent(lee, ex)


@lab("water-cycle")
def build_water_cycle():
    ocean = water_volume("Cycle_Ocean", 6.5, 4.0, 0.4, 0.04, loc=(0, -0.8, 0.05))
    tag(ocean, "Ocean store. The big reservoir.")
    ice = ice_tongue("Cycle_Glacier", 2.0, 1.1, 0.5, loc=(-2.2, 1.4, 0.7))
    tag(ice, "Ice store. Slow.")
    gw = box("Cycle_Groundwater", 2.4, 1.6, 0.5, nx=8, ny=6, nz=4, mat="limestone", loc=(1.8, 1.0, 0.1))
    joint_cuts(gw, 0.02)
    tag(gw, "Groundwater in rock, not an underground lake.")
    atm = uv_sphere("Cycle_Atmosphere", 0.35, 20, 14, "cloud", loc=(0, 0.4, 1.6))
    tag(atm, "A thin atmospheric store. Abstraction is a tap on the basin.")


@lab("drainage-basin")
def build_drainage():
    div = grid(
        "Basin_Divide",
        48,
        36,
        7.0,
        5.2,
        lambda x, y: 0.15 + 0.85 * math.exp(-((abs(x) - 2.4) ** 2) / 0.35) * (0.4 + 0.6 * (y + 2.6) / 5.2) + 0.04 * fbm(Vector((x, y, 0))),
        "grass",
    )
    tag(div, "The watershed is a ridge. Water inside falls to this trunk.")
    pts = [Vector((0, -2.2 + i * 0.18, 0.12 + (1 - i / 26) * 0.5)) for i in range(27)]
    ch = channel("Basin_Channel", pts, 0.14, 0.1)
    tag(ch, "The trunk. A basin is a tree of channels inside a divide.")
    tri = channel("Basin_Tributary", [Vector((-1.6, 0.4, 0.35)), Vector((-0.6, 0.1, 0.22)), Vector((0, -0.2, 0.18))], 0.07, 0.06)
    tag(tri, "A tributary. Dendritic on uniform rock.")


@lab("hydrograph")
def build_hydrograph():
    catch = grid("Hydro_Catchment", 32, 24, 4.5, 3.2, lambda x, y: 0.2 + 0.4 * math.exp(-(x * x + y * y) / 3), "grass")
    tag(catch, "The catchment. Urbanisation steepens the rising limb.")
    pts = [Vector((-1.5, 0, 0.2),), Vector((0, 0.1, 0.15)), Vector((1.6, 0, 0.12))]
    ch = channel("Hydro_Channel", [Vector((-1.5, 0, 0.2)), Vector((0, 0.1, 0.15)), Vector((1.6, 0, 0.12))], 0.12, 0.08)
    tag(ch, "Channel. Rain first. Peak later. Lag is the catchment’s delay.")
    # 3D bars for a hydrograph
    for i in range(12):
        h = 0.08 + 0.7 * math.exp(-((i - 5) ** 2) / 8)
        b = box(f"Hydro_Bar_{i}", 0.18, 0.12, h, mat="water", loc=(-1.2 + i * 0.28, -2.2, h / 2))
        tag(b, "Storm hydrograph bar. SI units. Rising limb, peak, falling limb.")


@lab("river-hydrology")
def build_river_hydrology():
    niv = grid("Hydro_Nival", 28, 18, 5.6, 4.0, lambda x, y: 0.15 + 0.7 * math.exp(-(y * y) / 0.4) * (0.5 + 0.5 * (1 - (x + 1.8) / 3.6)), "snow")
    niv.location = (-2.2, 0, 0)
    tag(niv, "Nival valley. Spring melt lifts the peak. Rain-fed rivers lack this spike.")
    plu = grid("Hydro_Pluvial", 28, 18, 5.6, 4.0, lambda x, y: 0.12 + 0.45 * math.exp(-(y * y) / 0.5) * (0.5 + 0.5 * (1 - (x + 1.8) / 3.6)), "grass")
    plu.location = (2.2, 0, 0)
    tag(plu, "Pluvial valley. The year is the regime. A storm hydrograph is hours, not months.")


@lab("ocean-currents")
def build_ocean_currents():
    earth = uv_sphere("Current_Earth", 1.05, 48, 32, "earth")
    tag(earth, "Gyres as wide-shallow ribbons. Western boundary is narrow and fast.")
    gs = torus("Current_GulfStream", 0.7, 0.04, 32, 8, "lava")
    gs.location = (0.45, 0.35, 0.35)
    gs.scale = (0.55, 1.1, 0.4)
    tag(gs, "Gulf Stream. Narrow, fast western boundary. Not a fat pipe.")
    can = torus("Current_Canary", 0.85, 0.05, 32, 8, "ice")
    can.location = (0.2, 0.55, 0.15)
    can.scale = (0.9, 0.7, 0.35)
    tag(can, "Canary. Broad, slow eastern boundary.")


@lab("thermohaline")
def build_thermohaline():
    earth = uv_sphere("TH_Earth", 1.0, 40, 28, "earth")
    tag(earth, "The conveyor is schematic. Density, not a painted arrow.")
    ice = ice_tongue("TH_Ice", 1.4, 1.0, 0.4, loc=(0, 0.9, 0.7))
    ice.scale = (0.6, 0.6, 0.6)
    tag(ice, "High-latitude ice. Brine rejection and cooling help make the surface dense enough to sink.")
    nadw = cone("TH_NADW", 0.18, 0.05, 1.1, 16, "ice", loc=(0.2, 0.55, 0.1))
    tag(nadw, "Cold salty NADW sinks in the North Atlantic as a descending water volume. Centuries, not a day.")


@lab("carbon-cycle")
def build_carbon():
    forest = grid("Carbon_Forest", 20, 20, 2.6, 2.6, lambda x, y: 0.15 + 0.08 * fbm(Vector((x, y, 0))), "grass")
    forest.location = (-2.0, 0, 0)
    tag(forest, "A living carbon store.")
    soil = box("Carbon_Soil", 2.4, 2.4, 0.35, nx=8, ny=8, nz=4, mat="soilA", loc=(-2.0, 0, -0.1))
    tag(soil, "Soil carbon. Slow.")
    ocean = water_volume("Carbon_Ocean", 3.2, 2.6, 0.35, 0.03, loc=(1.8, 0, 0.05))
    tag(ocean, "Ocean store.")
    foss = box("Carbon_Fossil", 1.6, 0.8, 0.18, nx=6, ny=4, nz=3, mat="basalt", loc=(0, -1.8, 0.1))
    tag(foss, "Coal/oil seam. Fossil fuel is an extra flux, not another water cycle.")


@lab("enso")
def build_enso():
    pac = water_volume("ENSO_Pacific", 8.0, 3.6, 0.4, 0.04)
    tag(pac, "Equatorial Pacific. Rain follows the warm pool.")
    walk = cylinder("ENSO_Walker", 0.05, 3.5, 10, "gold", loc=(0, 0, 0.8))
    walk.rotation_euler = (0, math.pi / 2, 0)
    tag(walk, "Walker cell. El Niño slides the warm pool east; La Niña piles it west.", "loc_t:x:1.6")


@lab("groundwater")
def build_groundwater():
    aq = box("GW_Aquifer", 3.6, 2.2, 1.1, nx=12, ny=8, nz=8, mat="limestone", loc=(0, 0, 0.2))
    joint_cuts(aq, 0.03, 6)
    tag(aq, "Limestone/chalk aquifer. Water lives in fractures plus matrix, not an underground lake.")
    table = grid("GW_WaterTable", 20, 12, 3.4, 2.0, lambda x, y: 0.02 * math.sin(x * 1.2), "water")
    table.location = (0, 0, 0.25)
    tag(table, "The water table is a free surface inside the rock.", "param_z:table:0.05:0.55")
    spr = ico("GW_Spring", 0.1, 2, "water", loc=(1.7, 0, 0.15))
    tag(spr, "A resurgence. The water was in rock.")


@lab("graticule")
def build_graticule():
    earth = uv_sphere("Grat_Earth", 1.15, 56, 40, "earth")
    tag(earth, "A sphere. Latitude and longitude are angles, not a grid on a table.")
    eq = torus("Grat_Equator", 1.16, 0.012, 64, 8, "gold")
    eq.rotation_euler = (math.pi / 2, 0, 0)
    tag(eq, "Equator. 0°.")
    trop = torus("Grat_Tropic", 1.16 * math.cos(math.radians(23.44)), 0.01, 48, 8, "lava")
    trop.location = (0, 0, 1.16 * math.sin(math.radians(23.44)))
    trop.rotation_euler = (math.pi / 2, 0, 0)
    tag(trop, "Tropic of Cancer. 23.44° N.")
    grw = cylinder("Grat_Greenwich", 0.012, 2.3, 8, "iron")
    tag(grw, "Greenwich meridian. 0° longitude. A convention, not a force.")


@lab("map-projections")
def build_projections():
    globe = uv_sphere("Proj_Globe", 1.05, 56, 40, "earth")
    tag(globe, "On a globe Africa is huge. Mercator is the disguise.")
    merc = grid("Proj_Mercator", 40, 28, 3.6, 2.8, lambda x, y: 0.02, "crust")
    merc.location = (3.2, 0, 0)
    tag(merc, "Mercator. Greenland swells. Area is the lie.")
    ea = grid("Proj_EqualArea", 40, 24, 3.6, 2.2, lambda x, y: 0.02, "grass")
    ea.location = (3.2, 0, -1.6)
    tag(ea, "Equal-area. Shapes bend; areas hold.")


@lab("grid-references")
def build_grid_ref():
    ter = grid("Grid_Terrain", 36, 36, 4.0, 4.0, lambda x, y: 0.15 + 0.45 * math.exp(-((x + 0.3) ** 2 + (y - 0.2) ** 2) / 0.8), "grass")
    tag(ter, "A 1 km tile. Easting first, then northing. 100 m square.")
    for i in range(5):
        b = box(f"Grid_Km_{i}", 0.02, 4.0, 0.04, mat="iron", loc=(-2 + i, 0, 0.02))
        tag(b, "1 km easting line.")
    sq = box("Grid_100m", 0.4, 0.4, 0.03, mat="gold", loc=(-0.6, 0.4, 0.18))
    tag(sq, "The 100 m square. Easting then northing.")


@lab("contours")
def build_contours():
    hill = grid(
        "Contour_Hill",
        48,
        48,
        5.2,
        5.2,
        lambda x, y: 1.15 * math.exp(-(x * x + y * y) / 1.6) + 0.25 * math.exp(-((x - 1.1) ** 2 + (y + 0.6) ** 2) / 0.5) + 0.04 * fbm(Vector((x, y, 0))),
        "grass",
    )
    tag(hill, "The same hill as the contour map. V upslope is a valley.")
    for i, h in enumerate((0.3, 0.5, 0.7, 0.9)):
        c = torus(f"Contour_{i}", 0.4 + i * 0.45, 0.012, 40, 8, "gold")
        c.location = (0, 0, h)
        c.rotation_euler = (math.pi / 2, 0, 0)
        tag(c, f"Contour {int(50 + i * 50)} m. Interval is a slider.")
