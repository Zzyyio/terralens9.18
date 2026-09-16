import bpy
import math
from mathutils import Vector

from lib import (
    empty, tag, parent, grid, box, uv_sphere, ico, cylinder, cone,
    displace, joint_cuts, apply_boolean, water_volume, ice_tongue,
    volcano_edifice, channel, doline, dripstone, barchan, fold_bed,
    fbm, mats, assign, look_at, torus,
)

LABS = {}


def lab(slug):
    def deco(fn):
        LABS[slug] = fn
        return fn
    return deco


def exag_root(factor, note="Teaching vertical exaggeration. T collapses it."):
    e = empty("Exag")
    tag(e, note, "exag", factor)
    return e


# ---------------------------------------------------------------------------
# Coasts
# ---------------------------------------------------------------------------
@lab("coasts")
def build_coasts():
    ex = exag_root(6, "Vertical exaggeration ×6. T is true beach slope.")

    def cliff_h(x, y):
        shore = 0.5 * (1 + math.tanh(y * 2.4))
        h = 0.04 + shore * 0.22
        cliff = 0.5 * (1 + math.tanh((y - 0.85) * 10))
        h += cliff * 1.55
        h += 0.03 * math.sin(x * 2.6) * shore
        if y < -0.4:
            h = min(h, 0.03)
        return max(0.02, h + 0.02 * fbm(Vector((x, y, 0))))

    cliff = grid("Coast_Cliff", 110, 56, 12.0, 6.2, cliff_h, "chalk")
    joint_cuts(cliff, 0.018)
    tag(cliff, "One chalk, one budget. Waves cut the cliff; longshore walks the sand. Holderness is till, not this chalk.")
    parent(cliff, ex)

    def chalk_mass(name, loc, sx=1.45, sy=1.35, sz=1.4):
        m = box(name, sx, sy, sz, nx=14, ny=12, nz=10, mat="chalk", loc=loc)
        displace(m, 0.028, 2.4)
        joint_cuts(m, 0.022, 7.2)
        return m

    cave = chalk_mass("Coast_Cave", (-4.2, -0.35, 0.72), 1.55, 1.5, 1.42)
    cutter = uv_sphere("cave_cut", 0.42, 20, 14, "basalt", loc=(-4.2, 0.42, 0.52))
    cutter.scale = (0.95, 1.7, 0.9)
    bpy = __import__("bpy")
    bpy.context.view_layer.update()
    apply_boolean(cave, cutter)
    tag(cave, "Waves excavate a weakness. Same chalk as the arch, stack and stump.", "show_stage:0")
    parent(cave, ex)

    arch = chalk_mass("Coast_Arch", (-1.35, -0.3, 0.7), 1.5, 1.2, 1.5)
    hole = cylinder("arch_cut", 0.34, 1.8, 20, "basalt", loc=(-1.35, 0.05, 0.48))
    hole.rotation_euler = (math.pi / 2, 0, 0)
    bpy.context.view_layer.update()
    apply_boolean(arch, hole)
    tag(arch, "Two caves meet. The roof is still the headland — same rock.", "show_stage:1")
    parent(arch, ex)

    stack = cone("Coast_Stack", 0.48, 0.12, 1.55, 28, "chalk", loc=(1.4, -0.45, 0.78))
    displace(stack, 0.04, 3.2)
    joint_cuts(stack, 0.02)
    # wave-cut notch: boolean a thin torus-ish cylinder at waterline
    notch = cylinder("notch", 0.55, 0.16, 16, "basalt", loc=(1.4, -0.45, 0.18))
    bpy.context.view_layer.update()
    apply_boolean(stack, notch)
    tag(stack, "The roof collapsed. A pillar of the same chalk stands off the cliff.", "show_stage:2")
    parent(stack, ex)

    stump = cone("Coast_Stump", 0.55, 0.18, 0.38, 22, "chalk", loc=(4.15, -0.4, 0.2))
    displace(stump, 0.03, 2.8)
    tag(stump, "The stack has fallen. A stump is the last of the headland.", "show_stage:3")
    parent(stump, ex)

    water = water_volume("Coast_Water", 12.0, 3.4, 0.45, 0.06, loc=(0, -1.7, 0.12))
    tag(water, "Water has volume and a free surface. Constructive berm vs destructive cut.")
    parent(water, ex)

    spit = grid(
        "Coast_Spit",
        28,
        8,
        2.8,
        0.55,
        lambda x, y: 0.12 * math.exp(-(y * y) / 0.08) * (0.4 + 0.6 * (x + 1.4) / 2.8) + 0.01 * fbm(Vector((x, y, 2))),
        "sand",
    )
    spit.location = (4.6, 0.35, 0.05)
    spit.rotation_euler = (0, 0, -0.5)
    tag(spit, "Longshore drift with a free end. Grows where the coast turns. Spurn Head is this.", "scale_t:x")
    parent(spit, ex)

    berm = grid(
        "Coast_Berm",
        36,
        6,
        8.5,
        0.7,
        lambda x, y: 0.14 * math.exp(-(y * y) / 0.07) + 0.01 * math.sin(x * 2),
        "sand",
    )
    berm.location = (0, 0.5, 0.04)
    tag(berm, "Low steepness: swash stronger than backwash. Beach builds.")
    parent(berm, ex)

    gro = empty("Coast_Groyne")
    for i in range(8):
        p = cylinder(f"Coast_GroynePost_{i}", 0.045, 0.42, 8, "wood", loc=(1.2, -0.4 + i * 0.14, 0.2))
        parent(p, gro)
    tag(gro, "Traps sand up-drift and can starve down-drift. Mappleton is this bargain.")
    parent(gro, ex)


# ---------------------------------------------------------------------------
# Volcanoes
# ---------------------------------------------------------------------------
@lab("volcanoes")
def build_volcanoes():
    rift = volcano_edifice("Volcano_Rift", 0.08, 80)
    tag(rift, "Rift: the cone barely stands. Magma finds a crack. Iceland, not Fuji.", "visc_band:0:0.22")
    shield = volcano_edifice("Volcano_Shield", 0.32, 80)
    tag(shield, "Shield: runny basalt travels far. Mauna Loa is a warrior’s shield, not a party hat.", "visc_band:0.22:0.5")
    strato = volcano_edifice("Volcano_Strato", 0.78, 80)
    tag(strato, "Stratovolcano: sticky magma stacks lava and ash. Steep because it cannot flow.", "visc_band:0.5:1")
    conduit = cylinder("Volcano_Conduit", 0.12, 2.4, 20, "lava", loc=(0, 0, 1.2))
    tag(conduit, "The pipe. Slice (X) to see magma rise. Not a hollow mountain.")
    lava = grid(
        "Volcano_Lava",
        28,
        18,
        5.5,
        3.2,
        lambda x, y: 0.06 * math.exp(-((x - 1.2) ** 2 + (y - 0.4) ** 2) / 1.8) + 0.02 * fbm(Vector((x, y, 3))),
        "lava",
    )
    lava.location = (0.8, 1.4, 0.04)
    tag(lava, "Runny basalt travels far and thin. Sticky magma makes short thick lobes.", "visc_band:0:0.55")
    ash = cone("Volcano_Ash", 0.2, 1.1, 2.2, 20, "ash", loc=(0, 0, 3.1))
    displace(ash, 0.08, 1.6)
    tag(ash, "Gas cannot escape sticky magma, so a column. Runny basalt has none.", "visc_band:0.55:1")
    apron = grid(
        "Volcano_Apron",
        36,
        36,
        12,
        12,
        lambda x, y: 0.04 * math.exp(-(x * x + y * y) / 28) + 0.01 * fbm(Vector((x, y, 0)) * 0.4),
        "basalt",
    )
    tag(apron, "The surrounding lava field. Shield basalt travels; strato ash falls closer.")


# ---------------------------------------------------------------------------
# Glaciers
# ---------------------------------------------------------------------------
@lab("glaciers")
def build_glaciers():
    ex = exag_root(6)

    def rock_h(x, y):
        trough = math.exp(-((x + 0.1) ** 2) / 0.5) * (0.8 + 0.4 * (y + 2.2) / 5)
        left = 2.2 * math.exp(-((x + 1.9) ** 2 + (y + 1.5) ** 2) / 0.9)
        right = 2.05 * math.exp(-((x - 1.6) ** 2 + (y + 1.7) ** 2) / 0.75)
        back = 1.8 * math.exp(-((x) ** 2 + (y + 2.3) ** 2) / 0.55)
        return max(0.05, left + right + back + 0.1 - trough * 1.35)

    ut = grid("Glacier_UTrough", 96, 80, 8.4, 7.4, rock_h, "granite")
    tag(ut, "Ice cut a wide floor and steep walls. Yosemite is this, not a river canyon.")
    parent(ut, ex)
    ice = ice_tongue("Glacier_Ice", 4.4, 1.35, 0.9, loc=(-0.1, 0.2, 0.55))
    tag(ice, "Ice has thickness, crevasses and a dirty medial moraine. Advance scrapes; retreat dumps the load.", "scale_t:y")
    parent(ice, ex)
    cirque = doline("Glacier_Cirque", 0.85, 0.45, loc=(-1.85, -1.5, 1.2))
    cirque.rotation_euler = (0.3, 0.2, 0)
    tag(cirque, "The armchair the ice sat in. A steep-walled bowl, often with a tarn.")
    parent(cirque, ex)
    horn = cone("Glacier_Horn", 0.42, 0.02, 0.95, 24, "snow", loc=(-0.05, -2.1, 2.15))
    displace(horn, 0.03, 4)
    tag(horn, "Three cirques back-to-back leave a pyramidal peak.")
    parent(horn, ex)
    arete = grid(
        "Glacier_Arete",
        4,
        22,
        0.18,
        1.9,
        lambda x, y: 0.42 * math.sin((y + 0.95) / 1.9 * math.pi) + 0.04,
        "granite",
    )
    arete.location = (-0.1, -1.6, 1.55)
    tag(arete, "Two cirques back-to-back leave a knife ridge.")
    parent(arete, ex)
    mor = grid(
        "Glacier_Moraine",
        18,
        8,
        2.2,
        0.55,
        lambda x, y: 0.28 * math.exp(-(y * y) / 0.08) * math.exp(-(x * x) / 1.4),
        "till",
    )
    mor.location = (-0.15, 2.5, 0.2)
    tag(mor, "Advance scrapes. Retreat dumps the load as a ridge of till.")
    parent(mor, ex)
    drum = ico("Glacier_Drumlin", 0.28, 2, "till", loc=(1.7, 1.6, 0.22))
    drum.scale = (1.1, 2.4, 0.7)
    tag(drum, "A streamlined hill of till. The blunt end faces up-ice.")
    parent(drum, ex)


# ---------------------------------------------------------------------------
# Interior
# ---------------------------------------------------------------------------
@lab("earth-interior")
def build_interior():
    open_w = 1.45
    crust = uv_sphere("Interior_Crust", 1.0, 128, 80, "earth", cut_theta=(-open_w / 2, open_w))
    tag(crust, "0–35 km continental crust. A film on a 6371 km radius. T collapses the ×4 teaching shell.", "exag_crust")
    mantle = uv_sphere("Interior_Mantle", 0.978, 112, 72, "mantle", cut_theta=(-open_w / 2, open_w))
    tag(mantle, "Solid rock that creeps. Not a magma ocean.", "true_fill")
    mantle["tl_inner"] = 0.978
    mantle["tl_true"] = 0.9945
    outer = uv_sphere("Interior_OuterCore", 0.547, 80, 56, "outer", cut_theta=(-open_w / 2, open_w))
    tag(outer, "Liquid Fe–Ni. S-waves die. The magnetic field lives here.", "explode")
    inner = uv_sphere("Interior_InnerCore", 0.191, 48, 32, "inner")
    tag(inner, "Solid Fe–Ni under immense pressure.", "explode")
    crust["tl_exag"] = 4.0


# ---------------------------------------------------------------------------
# Earthquakes
# ---------------------------------------------------------------------------
@lab("earthquakes")
def build_earthquakes():
    hang = box("Quake_HangingWall", 1.55, 2.05, 1.35, nx=40, ny=44, nz=24, mat="sandstone", loc=(-0.55, 0, 0.9))
    joint_cuts(hang, 0.02, 8)
    displace(hang, 0.015, 3)
    tag(hang, "The block above the fault. Bedding is offset. Play to see the slip grow.", "slip_hang")
    foot = box("Quake_Footwall", 1.55, 2.05, 1.35, nx=40, ny=44, nz=24, mat="limestone", loc=(0.7, 0, 0.9))
    joint_cuts(foot, 0.02, 8)
    tag(foot, "The block below the fault. It does not hang — it is the floor.")
    fault = grid(
        "Quake_Fault",
        18,
        12,
        2.1,
        1.45,
        lambda x, y: 0.012 * math.sin(y * 22) + 0.016 * fbm(Vector((x, y, 0)) * 3),
        "basalt",
    )
    fault.rotation_euler = (0, 0.55, 0)
    fault.location = (0.05, 0, 0.95)
    tag(fault, "A break in the rock. Slip starts at the focus on this plane. San Andreas is a transform slide, not a volcanic arc.")
    focus = ico("Quake_Focus", 0.07, 2, "lava", loc=(0.02, 0.04, 0.7))
    tag(focus, "The point on the fault where slip starts. Depth is a slider.", "param_z:depth:1.52:0.58")
    epi = ico("Quake_Epicentre", 0.06, 2, "gold", loc=(0.05, 0.05, 1.78))
    tag(epi, "The point on the ground above the focus. Not a volcano.")


# ---------------------------------------------------------------------------
# Rivers
# ---------------------------------------------------------------------------
@lab("rivers")
def build_rivers():
    ex = exag_root(12, "Vertical exaggeration ×12 on the long profile. T flattens to a true gradient.")

    def long_h(x, y):
        # x = downstream
        u = (x + 4.2) / 8.4
        v = abs(y)
        valley = 0.08 + (1 - u) * 1.15 * math.exp(-(v * v) / (0.18 + u * 1.6))
        meander = 0.04 * math.sin(x * 1.6) * u
        return max(0.03, valley + meander + 0.02 * fbm(Vector((x, y, 0))))

    land = grid("River_Valley", 110, 48, 8.6, 4.4, long_h, "grass")
    tag(land, "Long profile: steep V, then meander belt, then floodplain. Schematic, not a traced catchment.")
    parent(land, ex)
    pts = []
    for i in range(40):
        u = i / 39
        x = -4.1 + u * 8.2
        y = 0.55 * math.sin(u * 7.5) * max(0, u - 0.28)
        z = 0.12 + (1 - u) * 0.85
        pts.append(Vector((x, y, z)))
    water = channel("River_Water", pts, 0.16, 0.1)
    tag(water, "A river is a channel with a bed, not a painted line. Discharge widens and deepens it.", "discharge")
    parent(water, ex)
    fall = grid("River_Waterfall", 6, 12, 0.32, 0.6, lambda x, y: 0.01 * math.sin(y * 18), "water")
    fall.location = (-3.2, 0.02, 0.7)
    fall.rotation_euler = (1.2, 0, 0)
    tag(fall, "A nick in the long profile. Hard rock holds a lip.")
    parent(fall, ex)
    knick = box("River_Knickpoint", 0.45, 0.22, 0.18, nx=4, ny=3, nz=3, mat="granite", loc=(-3.15, 0, 0.55))
    tag(knick, "The knickpoint. Play walks it upstream.")
    parent(knick, ex)
    pb = grid("River_PointBar", 10, 8, 0.85, 0.45, lambda x, y: 0.05 * math.exp(-(x * x) / 0.2) * math.exp(-(y * y) / 0.1), "sand")
    pb.location = (1.1, 0.45, 0.18)
    tag(pb, "Inner bend deposits. The slip-off slope.")
    parent(pb, ex)
    cb = grid("River_CutBank", 8, 6, 0.55, 0.38, lambda x, y: 0.02 * fbm(Vector((x, y, 1)) * 4), "soilA")
    cb.location = (1.15, -0.42, 0.22)
    cb.rotation_euler = (1.3, 0, 0)
    tag(cb, "Outer bend erodes. The cut bank.")
    parent(cb, ex)
    me = empty("River_Meander")
    tag(me, "Sinuosity grows with a gentle gradient and cohesive banks.")
    parent(me, ex)
    delta = grid(
        "River_Delta",
        16,
        22,
        2.2,
        2.0,
        lambda x, y: 0.07 * max(0, 1 - math.hypot(x, y) / 1.8) + 0.015 * fbm(Vector((x, y, 2))),
        "sand",
    )
    delta.location = (3.9, 0, 0.08)
    tag(delta, "Load dumped where the river meets stiller water.")
    parent(delta, ex)


# ---------------------------------------------------------------------------
# Karst
# ---------------------------------------------------------------------------
@lab("karst")
def build_karst():
    ex = exag_root(6)
    pav = grid(
        "Karst_Pavement",
        48,
        48,
        4.4,
        4.4,
        lambda x, y: 0.08 + 0.04 * fbm(Vector((x, y, 0)) * 1.4) - 0.12 * max(0, 0.08 - min(abs(math.sin(x * 4)), abs(math.sin(y * 4)))),
        "limestone",
    )
    joint_cuts(pav, 0.04, 4.2)
    tag(pav, "Limestone pavement: clints split by grykes. Carbonation along joints, not a granite slab.")
    parent(pav, ex)
    dol = doline("Karst_Doline", 0.95, 0.62, loc=(0.2, -0.15, 0.12))
    tag(dol, "A doline: solution widening a joint until the roof cannot hold.")
    parent(dol, ex)
    stc = dripstone("Karst_Stalactite", 0.7, 0.08, True, loc=(0.15, -0.1, 0.05))
    tag(stc, "Stalactite. Water films down a joint and leaves calcite.")
    parent(stc, ex)
    stg = dripstone("Karst_Stalagmite", 0.42, 0.1, False, loc=(0.18, -0.08, -0.55))
    tag(stg, "Stalagmite. The drip hits the floor. Same water, opposite direction.")
    parent(stg, ex)
    gry = box("Karst_Gryke", 0.08, 2.2, 0.35, nx=2, ny=10, nz=4, mat="limestone", loc=(0.9, 0.4, -0.05))
    tag(gry, "A gryke: the enlarged joint. A clint is the block between grykes.")
    parent(gry, ex)


# ---------------------------------------------------------------------------
# Soil profile
# ---------------------------------------------------------------------------
@lab("soil-profile")
def build_soil_profile():
    hill = grid(
        "Hillside",
        64,
        48,
        6.4,
        4.6,
        lambda x, z: 1.62 + (0.38 * max(0, -z) / 2.1 if z < -0.12 else 0) + 0.03 * fbm(Vector((x, z, 0))),
        "grass",
    )
    tag(hill, "A soil pit cut into a slope. The face is the profile; grass sits on the uncut top.")
    layers = [
        ("Horizon_O", 0.08, "soilO", "Organic litter. Thin on grassland, thicker in woodland."),
        ("Horizon_A", 0.30, "soilA", "Mixed mineral-organic topsoil."),
        ("Horizon_E", 0.16, "soilE", "Eluviated: pale because clay and iron have washed down. Can be missing.", "profile_hide_e"),
        ("Horizon_B", 0.52, "soilB", "Illuviated: clay and iron accumulate."),
        ("Horizon_C", 0.42, "soilC", "Weathered parent. Not yet soil. Stones sit here."),
        ("Horizon_R", 0.95, "soilR", "Bedrock. The R in O–A–E–B–C–R."),
    ]
    y = 1.62
    for name, h, mat, note, *rig in layers:
        y1, y0 = y, y - h
        band = grid(
            name,
            22,
            10,
            2.85,
            1.22,
            lambda x, z, y0=y0, y1=y1: y0 + (y1 - y0) * ((z + 0.4) / 1.22) + 0.03 * math.sin(x * 3),
            mat,
        )
        band.location = (0, 0.08, 0)
        rigname = rig[0] if rig else None
        tag(band, note, rigname)
        y = y0


@lab("soil-texture")
def build_soil_texture():
    ground = grid(
        "Texture_Ground",
        72,
        72,
        5.4,
        5.4,
        lambda x, y: 0.03 + 0.02 * fbm(Vector((x, y, 0))),
        "sand",
    )
    tag(ground, "USDA texture triangle as a face you can put a point on. Sand, silt, clay — not a colour.")
    prism = cone("Texture_Prism", 1.35, 1.35, 0.07, 3, "soilB", loc=(0, 0, 0.08))
    bpy.ops.object.select_all(action="DESELECT")
    prism.select_set(True)
    bpy.context.view_layer.objects.active = prism
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.subdivide(number_cuts=18)
    bpy.ops.object.mode_set(mode="OBJECT")
    tag(prism, "The texture classes live inside this triangle. Sand % and clay % sliders; silt is the remainder.")
    sand = ico("Texture_Sand", 0.14, 3, "sand", loc=(-0.95, -0.55, 0.16))
    tag(sand, "Sand corner. Coarse, little surface, drains.")
    silt = ico("Texture_Silt", 0.14, 3, "soilC", loc=(0.95, -0.55, 0.16))
    tag(silt, "Silt corner. Smooth, holds some water.")
    clay = ico("Texture_Clay", 0.14, 3, "oxisol", loc=(0, 1.05, 0.16))
    tag(clay, "Clay corner. Tiny particles, holds water and nutrients, can lock.")
    marker = ico("Texture_Marker", 0.08, 2, "gold", loc=(0.1, 0.1, 0.2))
    tag(marker, "The class sits here. Sand % and clay % sliders; silt is the remainder.", "texture_marker")


@lab("soil-erosion")
def build_soil_erosion():
    ex = exag_root(8)
    slope = grid(
        "Erosion_Slope",
        48,
        32,
        6.0,
        4.2,
        lambda x, y: 0.15 + 0.55 * (y + 2.1) / 4.2 - 0.25 * math.exp(-(x * x) / 0.15) * max(0, (y + 0.5) / 2) + 0.02 * fbm(Vector((x, y, 0))),
        "soilA",
    )
    tag(slope, "One hillslope. Rain cuts rills; they join a gully. Cover is the brake.")
    parent(slope, ex)
    gully = grid(
        "Erosion_Gully",
        8,
        24,
        0.45,
        3.2,
        lambda x, y: -0.22 * math.exp(-(x * x) / 0.04),
        "soilB",
    )
    tag(gully, "A gully: too deep to plough out. Erosion removes soil. Weathering only prepares it.")
    parent(gully, ex)
    cover = ico("Erosion_Cover", 0.05, 1, "grass", loc=(-1.4, 0.8, 0.55))
    cover.scale = (8, 8, 0.4)
    tag(cover, "Vegetation intercepts rain and binds the A horizon.", "show_if_param_gt:veg:0.4")
    parent(cover, ex)


@lab("soil-catena")
def build_soil_catena():
    slope = grid(
        "Catena_Slope",
        40,
        24,
        7.2,
        3.4,
        lambda x, y: 0.2 + 1.3 * (1 - (x + 3.6) / 7.2) ** 1.4 + 0.03 * fbm(Vector((x, y, 0))),
        "grass",
    )
    tag(slope, "One parent, one climate, four pits. Thickness and wetness change downslope.")
    for i, (name, loc, note) in enumerate(
        [
            ("Catena_Crest", (-2.8, 0, 1.35), "Thin, well drained. More R, less A."),
            ("Catena_Shoulder", (-1.0, 0, 0.95), "Shedding. Colluvium starts."),
            ("Catena_Backslope", (0.8, 0, 0.55), "Transport. Moderate A and B."),
            ("Catena_Toe", (2.6, 0, 0.22), "Receiving. Thick, gleyed, wet."),
        ]
    ):
        p = box(name, 0.7, 0.55, 0.55, nx=6, ny=5, nz=6, mat="soilA", loc=loc)
        joint_cuts(p, 0.01)
        tag(p, note)


@lab("weathering")
def build_weathering():
    tor = box("Weathering_Tor", 1.6, 1.4, 1.8, nx=10, ny=9, nz=12, mat="granite", loc=(0, 0, 0.9))
    joint_cuts(tor, 0.045, 5.5)
    displace(tor, 0.03, 2.2)
    tag(tor, "Jointed granite. Freeze–thaw pries the joints. Weathering is breakdown in place.", "scale_t:z")
    pav = grid(
        "Weathering_Pavement",
        18,
        18,
        2.6,
        2.6,
        lambda x, y: 0.06 - 0.1 * max(0, 0.07 - min(abs(math.sin(x * 5)), abs(math.sin(y * 5)))),
        "limestone",
        center=True,
    )
    pav.location = (2.4, 0, 0.05)
    tag(pav, "Carbonation along joints. A pavement, not a granite slab.", "scale_t:x")


@lab("rock-cycle")
def build_rock_cycle():
    g = box("Rock_Granite", 1.3, 1.3, 1.4, nx=8, ny=8, nz=8, mat="granite", loc=(-2.1, 0, 0.7))
    joint_cuts(g, 0.03)
    tag(g, "Igneous granite. Slow cooling underground. Weathering feeds the sedimentary path.")
    s = fold_bed("Rock_Sandstone", 0.08, 0.1, 0.0, 0.2, "sandstone")
    s.location = (0.2, 0, 0.3)
    tag(s, "Sedimentary beds. Burial and cement, not a melt.")
    m = box("Rock_Schist", 1.4, 1.1, 0.9, nx=8, ny=6, nz=10, mat="schist", loc=(2.3, 0, 0.5))
    # foliation as joint cuts in Z
    joint_cuts(m, 0.02, 14)
    tag(m, "Metamorphic foliation. Heat and directed pressure align minerals.")
    mag = ico("Rock_Magma", 0.45, 3, "lava", loc=(0, -1.6, 0.35))
    tag(mag, "Melt. Cool it slowly and you get granite; erupt it and you get lava.")


@lab("landform-types")
def build_landform_types():
    ex = exag_root(8)
    mtn = grid("Land_Mountain", 28, 28, 2.4, 2.4, lambda x, y: 1.3 * math.exp(-(x * x + y * y) / 0.55) + 0.04 * fbm(Vector((x, y, 1))), "granite")
    mtn.location = (-4.2, 0, 0)
    tag(mtn, "Mountain: high relief, steep slopes.")
    parent(mtn, ex)
    hill = grid("Land_Hill", 22, 22, 2.2, 2.2, lambda x, y: 0.45 * math.exp(-(x * x + y * y) / 0.7), "grass")
    hill.location = (-1.6, 0, 0)
    tag(hill, "Hill: lower, rounded. Same process family, smaller relief.")
    parent(hill, ex)
    plat = grid("Land_Plateau", 24, 24, 2.4, 2.4, lambda x, y: 0.72 * (1 if abs(x) < 0.9 and abs(y) < 0.9 else max(0, 0.72 - 0.8 * (abs(x) - 0.9 if abs(x) > 0.9 else abs(y) - 0.9))), "sandstone")
    plat.location = (1.1, 0, 0)
    tag(plat, "Plateau: high and flat. Cliffs at the edge, not a cone.")
    parent(plat, ex)
    plain = grid("Land_Plain", 22, 22, 2.4, 2.4, lambda x, y: 0.06 + 0.02 * fbm(Vector((x, y, 0))), "grass")
    plain.location = (3.6, 0, 0)
    tag(plain, "Plain: low relief. Rivers write the texture.")
    parent(plain, ex)
    basin = grid("Land_Basin", 22, 22, 2.2, 2.2, lambda x, y: 0.35 - 0.32 * math.exp(-(x * x + y * y) / 0.5), "sand")
    basin.location = (0, -2.6, 0)
    tag(basin, "Basin: a bowl. Water and sediment collect.")
    parent(basin, ex)


@lab("river-erosion")
def build_river_erosion():
    ex = exag_root(12)
    v = grid(
        "River_VValley",
        48,
        28,
        6.5,
        3.6,
        lambda x, y: 0.1 + 0.95 * math.exp(-(y * y) / 0.22) * (0.4 + 0.6 * (1 - (x + 3.2) / 6.5)) + 0.03 * fbm(Vector((x, y, 0))),
        "granite",
    )
    tag(v, "A V-valley. Vertical erosion dominates while the river is steep.")
    parent(v, ex)
    pts = [Vector((-3 + i * 0.22, 0.02 * math.sin(i * 0.4), 0.15 + (1 - i / 28) * 0.7)) for i in range(29)]
    ch = channel("River_Channel", pts, 0.12, 0.1)
    tag(ch, "Bedload and hydraulic action work the bed. Potholes live here.")
    parent(ch, ex)
    fall = grid("River_Waterfall", 6, 14, 0.3, 0.7, lambda x, y: 0.01 * math.sin(y * 16), "water")
    fall.location = (-1.4, 0, 0.55)
    fall.rotation_euler = (1.15, 0, 0)
    tag(fall, "Fall: a lip of harder rock. The plunge pool undercuts.")
    parent(fall, ex)
    kn = box("River_Knickpoint", 0.4, 0.2, 0.16, mat="granite", loc=(-1.35, 0, 0.42))
    tag(kn, "Knickpoint. Play walks it upstream.")
    parent(kn, ex)


@lab("river-deposition")
def build_river_deposition():
    ex = exag_root(8)
    fp = grid("River_Floodplain", 48, 28, 7.0, 3.8, lambda x, y: 0.12 + 0.04 * math.sin(x * 1.4) * math.exp(-(y * y) / 2.2), "grass")
    tag(fp, "Floodplain: the river’s dump when it spills.")
    parent(fp, ex)
    pb = grid("River_PointBar", 12, 8, 1.0, 0.5, lambda x, y: 0.06 * math.exp(-(x * x + y * y) / 0.2), "sand")
    pb.location = (0.4, 0.55, 0.14)
    tag(pb, "Point bar. Inner bend.")
    parent(pb, ex)
    cb = box("River_CutBank", 0.15, 0.7, 0.35, mat="soilA", loc=(0.45, -0.55, 0.22))
    tag(cb, "Cut bank. Outer bend.")
    parent(cb, ex)
    lev = grid("River_Levee", 30, 6, 4.5, 0.4, lambda x, y: 0.16 * math.exp(-(y * y) / 0.04), "sand")
    lev.location = (0, 0.15, 0.16)
    tag(lev, "Natural levée. Coarser load dumps first at the bank.")
    parent(lev, ex)
    d = grid("River_Delta", 18, 20, 2.4, 2.2, lambda x, y: 0.08 * max(0, 1 - math.hypot(x, y) / 1.7), "sand")
    d.location = (3.2, 0, 0.08)
    tag(d, "Delta fan. Distributaries.")
    parent(d, ex)


@lab("river-capture")
def build_river_capture():
    ex = exag_root(10)
    land = grid(
        "Capture_Land",
        48,
        36,
        7.0,
        5.0,
        lambda x, y: 0.2 + 0.7 * math.exp(-((x + 0.2) ** 2) / 0.35) + 0.04 * fbm(Vector((x, y, 0))),
        "grass",
    )
    tag(land, "Two catchments, one divide. The pirate is steeper.")
    parent(land, ex)
    pirate = channel("Capture_Pirate", [Vector((0.2, 2.2, 0.15)), Vector((0.1, 0.6, 0.22)), Vector((-0.8, -0.4, 0.18)), Vector((-2.2, -1.8, 0.1))], 0.14, 0.1)
    tag(pirate, "The pirate stream. Steeper, lower outlet, it wins.", "show_if_param_gt:t:0.52")
    parent(pirate, ex)
    elbow = ico("Capture_Elbow", 0.08, 2, "sand", loc=(0.1, 0.55, 0.24))
    tag(elbow, "Elbow of capture. The turn is the scar of the steal.")
    parent(elbow, ex)
    gap = grid("Capture_WindGap", 8, 6, 0.7, 0.4, lambda x, y: 0.05, "sand")
    gap.location = (0.3, 0.2, 0.55)
    tag(gap, "Wind gap: a dry col the beheaded river used to cross.")
    parent(gap, ex)
    beh = channel("Capture_Beheaded", [Vector((2.4, 0.3, 0.4)), Vector((1.2, 0.25, 0.38)), Vector((0.35, 0.2, 0.36))], 0.08, 0.05)
    tag(beh, "Beheaded misfit. Too small for its valley.")
    parent(beh, ex)


@lab("aeolian")
def build_aeolian():
    b = barchan("Aeolian_Barchan", 1.15, loc=(0, 0, 0))
    tag(b, "A barchan’s horns point downwind. Steep lee, gentle windward.", "loc_t:y:1.4")
    yrd = box("Aeolian_Yardang", 0.35, 1.8, 0.4, nx=6, ny=12, nz=5, mat="sandstone", loc=(-2.2, 0, 0.2))
    displace(yrd, 0.04, 3)
    tag(yrd, "Yardang: wind-carved ridge, streamlined.")
    floor = grid("Aeolian_Floor", 36, 36, 8, 8, lambda x, y: 0.02 * fbm(Vector((x, y, 0))), "sand")
    tag(floor, "Sand supply plus a unimodal wind writes the dune field.")


@lab("mass-movement")
def build_mass_movement():
    slope = grid("Mass_Slope", 36, 24, 6.6, 4.4, lambda x, y: 0.2 + 1.1 * (y + 1.8) / 3.6, "soilA")
    tag(slope, "A hillslope waiting. Pore pressure is the switch.")
    block = box("Mass_Block", 1.6, 1.1, 0.55, nx=8, ny=6, nz=5, mat="limestone", loc=(0, 0.2, 1.15))
    joint_cuts(block, 0.025)
    tag(block, "The sliding mass. Rain (pore pressure) rotates it on the shear.", "slip_hang")
    crown = grid("Mass_Crown", 10, 6, 1.8, 0.5, lambda x, y: 0.08, "soilB")
    crown.location = (0, 1.1, 1.45)
    tag(crown, "Crown crack. The first scar.")
    toe = grid("Mass_Toe", 14, 8, 2.0, 0.9, lambda x, y: 0.18 * math.exp(-(x * x + (y + 0.2) ** 2) / 0.5), "till")
    toe.location = (0, -1.2, 0.25)
    tag(toe, "Hummocky toe. The debris that arrived.")
    shear = grid("Mass_Shear", 12, 8, 1.8, 1.2, lambda x, y: 0.01 * math.sin(x * 8), "basalt")
    shear.location = (0, 0, 0.85)
    shear.rotation_euler = (0.7, 0, 0)
    tag(shear, "Shear surface. Rotational slump, not a beach spit.")


@lab("periglacial")
def build_periglacial():
    pg = grid(
        "Periglacial_Patterned",
        36,
        36,
        5.0,
        5.0,
        lambda x, y: 0.06 + 0.05 * math.cos(math.hypot(x, y) * 6) * math.cos(math.atan2(y, x) * 3),
        "till",
    )
    tag(pg, "Patterned ground. Freeze–thaw without a glacier.")
    wedge = box("Periglacial_IceWedge", 0.12, 2.4, 0.55, nx=3, ny=14, nz=6, mat="ice", loc=(0, 0, -0.1))
    tag(wedge, "Ice wedge. Ground ice, not a valley glacier.", "scale_t:z")
    ping = ico("Periglacial_Pingo", 0.35, 2, "ice", loc=(1.6, 1.2, 0.2))
    ping.scale = (1, 1, 0.7)
    tag(ping, "A pingo: a hill of injected ice. Permafrost country.")


@lab("folds-faults")
def build_folds_faults():
    a = fold_bed("Fold_Anticline", 0.42, 0.12, 0.55, 0.0, "sandstone")
    tag(a, "Anticline. Oldest beds in the core.")
    s = fold_bed("Fold_Syncline", 0.42, 0.12, 0.15, math.pi, "limestone")
    tag(s, "Syncline. Youngest beds in the core.")
    h = box("Fold_HangingWall", 1.4, 1.8, 1.1, nx=8, ny=10, nz=7, mat="sandstone", loc=(-1.8, -2.4, 0.6))
    joint_cuts(h, 0.015)
    tag(h, "Hanging wall. Explode to see down / up / sideways slip.", "slip_hang")
    f = box("Fold_Footwall", 1.4, 1.8, 1.1, nx=8, ny=10, nz=7, mat="limestone", loc=(-0.2, -2.4, 0.6))
    tag(f, "Footwall.")


@lab("plate-boundaries")
def build_plate_boundaries():
    ridge = grid(
        "Plate_Ridge",
        40,
        24,
        5.5,
        3.2,
        lambda x, y: 0.55 * math.exp(-(x * x) / 0.18) + 0.08 * math.sin(y * 4) * math.exp(-(x * x) / 0.4) + 0.03 * fbm(Vector((x, y, 0))),
        "basalt",
    )
    tag(ridge, "Divergent: new crust at a ridge. Iceland sits on this split.", "site_band:0:0.4")
    trench = grid(
        "Plate_Trench",
        40,
        24,
        5.5,
        3.2,
        lambda x, y: -0.85 * math.exp(-((x - 0.6) ** 2) / 0.12) + 0.7 * math.exp(-((x + 1.1) ** 2) / 0.55) + 0.02 * fbm(Vector((x, y, 1))),
        "basalt",
    )
    trench.location = (0, 0, 0)
    tag(trench, "Convergent: a trench is a subduction slot; the arc stacks volcanoes behind it.", "site_band:0.4:0.7")
    arc = volcano_edifice("Plate_Arc", 0.75, 48)
    arc.location = (-1.3, 0, 0.2)
    arc.scale = (0.35, 0.35, 0.35)
    tag(arc, "Island arc. Sticky magma on the overriding plate.", "site_band:0.4:0.7")
    xf = grid(
        "Plate_Transform",
        36,
        20,
        5.0,
        2.8,
        lambda x, y: 0.12 + 0.08 * math.sin(x * 2) * (1 if abs(y) > 0.15 else 0.2) + 0.15 * (1 if y > 0.1 else -1) * (1 if abs(x) < 0.08 else 0),
        "sandstone",
    )
    tag(xf, "Transform: plates slide past. San Andreas is this, not a volcanic arc.", "site_band:0.7:1")


@lab("continental-drift")
def build_continental_drift():
    earth = uv_sphere("Drift_Earth", 1.05, 48, 32, "earth")
    tag(earth, "A sphere. Continents are passengers, not a fit on a table.")
    for i, (name, loc, sc, note) in enumerate(
        [
            ("Drift_Africa", (0.15, 0.05, 0.95), (0.55, 0.7, 0.12), "Africa. The shape that still fits South America."),
            ("Drift_SAmerica", (-0.45, -0.15, 0.85), (0.35, 0.7, 0.1), "South America. The Atlantic is a wound that is still opening."),
            ("Drift_India", (0.55, 0.15, 0.75), (0.22, 0.28, 0.08), "India walked north. The Himalaya are the crumple."),
        ]
    ):
        p = ico(name, 0.35, 2, "crust", loc=loc)
        p.scale = sc
        tag(p, note, "age_drift")


@lab("hotspots")
def build_hotspots():
    plume = cone("Hotspot_Plume", 0.35, 0.08, 2.4, 20, "lava", loc=(0, 0, -0.4))
    tag(plume, "A fixed upwelling. The plate writes the age trail over it. Not a climbable pipe.")
    for i in range(5):
        v = volcano_edifice(f"Hotspot_Shield_{i}", 0.3, 40)
        v.location = (-i * 1.35, 0.1 * i, 0)
        v.scale = ((1 - i * 0.12),) * 3
        tag(v, "Shield ages and shrinks away from the active island. Hawaii is this.", "hotspot_i")


@lab("seafloor-spreading")
def build_seafloor():
    def h(x, y):
        return 0.35 * math.exp(-(x * x) / 0.2) + 0.04 * math.sin(abs(x) * 6) + 0.02 * fbm(Vector((x, y, 0)))

    ridge = grid("Spread_Ridge", 56, 28, 7.4, 4.6, h, "basalt")
    tag(ridge, "New crust at the axis. Age increases with distance.")
    axis = box("Spread_Axis", 0.12, 4.4, 0.08, mat="lava", loc=(0, 0, 0.38))
    tag(axis, "Ridge axis. Basalt rises here.")
    stripe = box("Spread_Stripe", 0.55, 4.2, 0.05, mat="iron", loc=(1.1, 0, 0.22))
    tag(stripe, "A magnetic stripe. Polarity flips are a mirror across the axis. Play spreads new bands.", "scale_t:x")


@lab("isostasy")
def build_isostasy():
    ice = ice_tongue("Isostasy_Ice", 2.4, 2.2, 0.7, loc=(0, 0, 0.9))
    ice.scale = (1.4, 1.0, 0.8)
    tag(ice, "Ice load. Unload it and the crust rises.", "param_z:ice:0.4:1.1")
    crust = box("Isostasy_Crust", 3.6, 3.6, 0.35, nx=12, ny=12, nz=4, mat="crust", loc=(0, 0, 0.15))
    tag(crust, "The crustal raft. It sinks under ice and rebounds when the ice goes.", "exag")
    crust["tl_exag"] = 4
    man = box("Isostasy_Mantle", 4.2, 4.2, 1.2, nx=10, ny=10, nz=6, mat="mantle", loc=(0, 0, -0.7))
    tag(man, "Mantle is solid rock that creeps. Not a magma ocean.")


@lab("wilson-cycle")
def build_wilson():
    basin = grid("Wilson_Basin", 40, 40, 6, 6, lambda x, y: 0.15 + 0.08 * fbm(Vector((x, y, 0))) - 0.25 * math.exp(-(x * x + y * y) / 4), "basalt")
    tag(basin, "Opening ocean. New crust, a widening basin.", "stage_band:0:2")
    orogen = grid("Wilson_Orogen", 40, 40, 6, 6, lambda x, y: 1.4 * math.exp(-(x * x) / 0.8) + 0.08 * fbm(Vector((x, y, 1))), "granite")
    tag(orogen, "Collision orogen. The basin has closed. Himalaya-class crumple.", "stage_band:3:6")


@lab("tsunami")
def build_tsunami():
    sea = water_volume("Tsunami_Wave", 10, 4.5, 0.5, 0.12, loc=(0, 0, 0.1))
    tag(sea, "A tsunami is a long wave. Deep-ocean amplitude is small; it stands up at the coast.", "scale_t:z")
    coast = grid("Tsunami_Coast", 28, 16, 4.5, 2.2, lambda x, y: 0.15 + 0.45 * (1 if y > 0.3 else 0) + 0.05 * fbm(Vector((x, y, 0))), "sand")
    coast.location = (0, 2.0, 0)
    tag(coast, "The coast where the long wave shoals. Not a hurricane.")


@lab("tropical-cyclone")
def build_cyclone():
    sea = water_volume("Cyclone_Sea", 8, 8, 0.3, 0.05, loc=(0, 0, -0.05))
    tag(sea, "Warm sea. The engine is latent heat, not a UK winter front.")
    eye = cylinder("Cyclone_Eye", 0.45, 0.15, 24, "cloud", loc=(0, 0, 0.9))
    tag(eye, "The eye. Calm, warm, dry-ish. Not the whole storm.")
    wall = cylinder("Cyclone_Eyewall", 0.85, 1.4, 28, "cloud", loc=(0, 0, 1.1))
    # make it a ring by boolean inner cylinder
    inner = cylinder("eye_cut", 0.55, 1.6, 20, "basalt", loc=(0, 0, 1.1))
    apply_boolean(wall, inner)
    tag(wall, "Eyewall. The strongest winds. Warm-core.")
    band = torus("Cyclone_Rainband", 2.2, 0.22, 40, 12, "cloud", loc=(0, 0, 0.7))
    tag(band, "Rainband. Spiral inflow.", "spin")


@lab("storm-surge")
def build_storm_surge():
    coast = grid("Surge_Coast", 40, 24, 7.0, 4.0, lambda x, y: 0.08 + 0.35 * max(0, y) / 2 + 0.03 * fbm(Vector((x, y, 0))), "sand")
    tag(coast, "A low coast. Surge is a pile of water, not a tsunami.")
    water = water_volume("Surge_Water", 7.0, 4.0, 0.4, 0.05, loc=(0, -0.4, 0.05))
    tag(water, "Onshore wind piles water. The 1953 North Sea and Katrina numbers live in the Why panel.", "param_z:wind:0.0:0.45")
