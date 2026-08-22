import math
import random
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio.v2 as imageio

# ============================================================
# MARVEL-STYLE CINEMATIC HERO BACKGROUND
# 15 seconds / 1280x720 / 30 FPS
# ============================================================

WIDTH = 1280
HEIGHT = 720
FPS = 30
DURATION = 15
TOTAL_FRAMES = FPS * DURATION

OUTPUT = "marvel_hero.mp4"

random.seed(42)

# ------------------------------------------------------------
# Fonts
# ------------------------------------------------------------

def get_font(size, bold=False):
    paths = [
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
    ]

    for path in paths:
        try:
            return ImageFont.truetype(path, size)
        except:
            pass

    return ImageFont.load_default()


FONT_BIG = get_font(72, True)
FONT_MEDIUM = get_font(42, True)
FONT_SMALL = get_font(24, True)

# ------------------------------------------------------------
# Star field
# ------------------------------------------------------------

stars = []

for _ in range(500):
    stars.append({
        "x": random.uniform(0, WIDTH),
        "y": random.uniform(0, HEIGHT),
        "size": random.choice([1, 1, 1, 2, 2, 3]),
        "speed": random.uniform(0.15, 0.8),
        "phase": random.uniform(0, math.pi * 2)
    })

# ------------------------------------------------------------
# Floating particles
# ------------------------------------------------------------

particles = []

for _ in range(120):
    particles.append({
        "x": random.uniform(0, WIDTH),
        "y": random.uniform(0, HEIGHT),
        "size": random.uniform(1, 4),
        "speed": random.uniform(0.3, 1.8),
        "phase": random.uniform(0, math.pi * 2)
    })

# ------------------------------------------------------------
# Cinematic words
# ------------------------------------------------------------

hero_words = [
    "IRON MAN",
    "THOR",
    "HULK",
    "SPIDER-MAN",
    "CAPTAIN AMERICA",
    "DOCTOR STRANGE",
    "BLACK PANTHER",
    "THE AVENGERS"
]

# ------------------------------------------------------------
# Utility functions
# ------------------------------------------------------------

def ease_in_out(x):
    return x * x * (3 - 2 * x)


def alpha_fade(local_time, duration=1.0):
    fade = min(local_time / duration, 1)
    fade_out = min((duration - local_time) / duration, 1)

    if local_time < duration:
        return max(0, ease_in_out(fade))

    return max(0, min(1, fade_out))


def add_glow(base, layer, radius=25):
    glow = layer.filter(ImageFilter.GaussianBlur(radius))
    base.alpha_composite(glow)


def draw_portal(layer, cx, cy, radius, rotation, intensity=1.0):
    draw = ImageDraw.Draw(layer, "RGBA")

    # Outer rings
    for ring in range(5):
        r = radius + ring * 12

        alpha = int(90 * intensity * (1 - ring / 6))

        bbox = (
            cx - r,
            cy - r,
            cx + r,
            cy + r
        )

        draw.ellipse(
            bbox,
            outline=(255, 20, 40, alpha),
            width=5
        )

    # Rotating energy arcs
    for arc in range(12):
        start = rotation + arc * 30
        end = start + 18

        r = radius * (0.72 + 0.05 * math.sin(arc))

        bbox = (
            cx - r,
            cy - r,
            cx + r,
            cy + r
        )

        draw.arc(
            bbox,
            start=start,
            end=end,
            fill=(255, 70, 70, int(170 * intensity)),
            width=4
        )

    # Bright core
    core = int(radius * 0.55)

    for r in range(core, 10, -5):
        a = int(20 * intensity * (1 - r / core))

        draw.ellipse(
            (cx-r, cy-r, cx+r, cy+r),
            fill=(120, 0, 255, a)
        )


def draw_lightning(layer, x1, y1, x2, y2, segments=12):
    draw = ImageDraw.Draw(layer, "RGBA")

    points = [(x1, y1)]

    for i in range(1, segments):
        t = i / segments

        x = x1 + (x2 - x1) * t
        y = y1 + (y2 - y1) * t

        x += random.uniform(-25, 25)
        y += random.uniform(-25, 25)

        points.append((x, y))

    points.append((x2, y2))

    draw.line(
        points,
        fill=(170, 210, 255, 220),
        width=4
    )


def draw_superhero_silhouette(layer, cx, cy, scale):
    draw = ImageDraw.Draw(layer, "RGBA")

    # Head
    head_r = int(28 * scale)

    draw.ellipse(
        (
            cx - head_r,
            cy - 180 * scale,
            cx + head_r,
            cy - 180 * scale + head_r * 2
        ),
        fill=(0, 0, 0, 220)
    )

    # Body
    draw.polygon(
        [
            (cx - 45 * scale, cy - 125 * scale),
            (cx + 45 * scale, cy - 125 * scale),
            (cx + 60 * scale, cy + 20 * scale),
            (cx - 60 * scale, cy + 20 * scale)
        ],
        fill=(0, 0, 0, 225)
    )

    # Legs
    draw.polygon(
        [
            (cx - 45 * scale, cy + 10 * scale),
            (cx - 5 * scale, cy + 10 * scale),
            (cx - 25 * scale, cy + 160 * scale),
            (cx - 70 * scale, cy + 160 * scale)
        ],
        fill=(0, 0, 0, 230)
    )

    draw.polygon(
        [
            (cx + 5 * scale, cy + 10 * scale),
            (cx + 45 * scale, cy + 10 * scale),
            (cx + 70 * scale, cy + 160 * scale),
            (cx + 25 * scale, cy + 160 * scale)
        ],
        fill=(0, 0, 0, 230)
    )

    # Arms
    draw.line(
        [
            (cx - 35 * scale, cy - 110 * scale),
            (cx - 120 * scale, cy - 20 * scale)
        ],
        fill=(0, 0, 0, 230),
        width=max(5, int(28 * scale))
    )

    draw.line(
        [
            (cx + 35 * scale, cy - 110 * scale),
            (cx + 120 * scale, cy - 20 * scale)
        ],
        fill=(0, 0, 0, 230),
        width=max(5, int(28 * scale))
    )


# ------------------------------------------------------------
# Video writer
# ------------------------------------------------------------

writer = imageio.get_writer(
    OUTPUT,
    fps=FPS,
    codec="libx264",
    quality=8,
    pixelformat="yuv420p"
)

print("Creating cinematic Marvel hero video...")
print(f"Frames: {TOTAL_FRAMES}")

# ------------------------------------------------------------
# Main animation
# ------------------------------------------------------------

for frame in range(TOTAL_FRAMES):

    t = frame / FPS

    # Base dark background
    image = Image.new(
        "RGBA",
        (WIDTH, HEIGHT),
        (4, 4, 10, 255)
    )

    # --------------------------------------------------------
    # Cosmic gradient
    # --------------------------------------------------------

    gradient = Image.new(
        "RGBA",
        (WIDTH, HEIGHT),
        (0, 0, 0, 0)
    )

    gp = gradient.load()

    for y in range(0, HEIGHT, 4):

        normalized = y / HEIGHT

        r = int(5 + 8 * normalized)
        g = int(5 + 2 * normalized)
        b = int(15 + 22 * normalized)

        for x in range(0, WIDTH, 4):
            gp[x, y] = (r, g, b, 255)

    image.alpha_composite(gradient)

    # --------------------------------------------------------
    # Stars
    # --------------------------------------------------------

    star_layer = Image.new(
        "RGBA",
        (WIDTH, HEIGHT),
        (0, 0, 0, 0)
    )

    draw = ImageDraw.Draw(star_layer, "RGBA")

    for s in stars:

        x = (s["x"] + t * s["speed"] * 35) % WIDTH

        y = s["y"]

        twinkle = (
            math.sin(t * 2 + s["phase"]) + 1
        ) / 2

        brightness = int(80 + 175 * twinkle)

        size = s["size"]

        draw.ellipse(
            (
                x - size,
                y - size,
                x + size,
                y + size
            ),
            fill=(
                brightness,
                brightness,
                min(255, brightness + 30),
                brightness
            )
        )

    image.alpha_composite(star_layer)

    # --------------------------------------------------------
    # Floating particles
    # --------------------------------------------------------

    particle_layer = Image.new(
        "RGBA",
        (WIDTH, HEIGHT),
        (0, 0, 0, 0)
    )

    draw = ImageDraw.Draw(particle_layer, "RGBA")

    for p in particles:

        x = (
            p["x"]
            + math.sin(t * 0.7 + p["phase"]) * 30
        ) % WIDTH

        y = (
            p["y"]
            - t * p["speed"] * 20
        ) % HEIGHT

        alpha = int(
            70
            + 80 * (
                math.sin(t * 2 + p["phase"]) + 1
            ) / 2
        )

        draw.ellipse(
            (
                x - p["size"],
                y - p["size"],
                x + p["size"],
                y + p["size"]
            ),
            fill=(255, 60, 70, alpha)
        )

    image.alpha_composite(particle_layer)

    # --------------------------------------------------------
    # Main portal
    # --------------------------------------------------------

    portal_layer = Image.new(
        "RGBA",
        (WIDTH, HEIGHT),
        (0, 0, 0, 0)
    )

    portal_x = WIDTH / 2
    portal_y = HEIGHT / 2

    portal_radius = (
        150
        + 25 * math.sin(t * 1.5)
    )

    draw_portal(
        portal_layer,
        portal_x,
        portal_y,
        portal_radius,
        t * 80,
        1.0
    )

    # Glow
    glow = portal_layer.filter(
        ImageFilter.GaussianBlur(35)
    )

    image.alpha_composite(glow)
    image.alpha_composite(portal_layer)

    # --------------------------------------------------------
    # Lightning flashes
    # --------------------------------------------------------

    if 3.0 < t < 6.0 or 9.0 < t < 12.0:

        lightning_layer = Image.new(
            "RGBA",
            (WIDTH, HEIGHT),
            (0, 0, 0, 0)
        )

        if frame % 9 < 3:

            draw_lightning(
                lightning_layer,
                random.randint(100, 400),
                0,
                random.randint(250, 500),
                random.randint(300, 650)
            )

            draw_lightning(
                lightning_layer,
                random.randint(800, 1100),
                0,
                random.randint(700, 1050),
                random.randint(300, 650)
            )

        image.alpha_composite(
            lightning_layer.filter(
                ImageFilter.GaussianBlur(10)
            )
        )

        image.alpha_composite(lightning_layer)

    # --------------------------------------------------------
    # Character silhouette sequence
    # --------------------------------------------------------

    sequence_index = int(t / 1.7)

    if sequence_index < len(hero_words):

        local = t - sequence_index * 1.7

        fade = alpha_fade(
            local,
            0.35
        )

        silhouette_layer = Image.new(
            "RGBA",
            (WIDTH, HEIGHT),
            (0, 0, 0, 0)
        )

        # Move silhouette slightly
        sx = WIDTH / 2 + math.sin(t * 1.5) * 80
        sy = HEIGHT / 2 + 180

        draw_superhero_silhouette(
            silhouette_layer,
            sx,
            sy,
            1.25
        )

        # Fade silhouette
        alpha = silhouette_layer.getchannel("A")
        alpha = alpha.point(
            lambda value: int(value * fade * 0.65)
        )

        silhouette_layer.putalpha(alpha)

        image.alpha_composite(
            silhouette_layer
        )

        # ----------------------------------------------------
        # Character name
        # ----------------------------------------------------

        text_layer = Image.new(
            "RGBA",
            (WIDTH, HEIGHT),
            (0, 0, 0, 0)
        )

        td = ImageDraw.Draw(text_layer)

        text = hero_words[sequence_index]

        bbox = td.textbbox(
            (0, 0),
            text,
            font=FONT_MEDIUM
        )

        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]

        tx = (WIDTH - tw) / 2
        ty = 85

        td.text(
            (tx + 2, ty + 2),
            text,
            font=FONT_MEDIUM,
            fill=(0, 0, 0, int(220 * fade))
        )

        td.text(
            (tx, ty),
            text,
            font=FONT_MEDIUM,
            fill=(255, 255, 255, int(255 * fade))
        )

        image.alpha_composite(text_layer)

    # --------------------------------------------------------
    # Cinematic red bars
    # --------------------------------------------------------

    bar_layer = Image.new(
        "RGBA",
        (WIDTH, HEIGHT),
        (0, 0, 0, 0)
    )

    bd = ImageDraw.Draw(bar_layer)

    bd.rectangle(
        (0, 0, WIDTH, 35),
        fill=(0, 0, 0, 220)
    )

    bd.rectangle(
        (0, HEIGHT - 35, WIDTH, HEIGHT),
        fill=(0, 0, 0, 220)
    )

    image.alpha_composite(bar_layer)

    # --------------------------------------------------------
    # Opening / closing MARVEL title
    # --------------------------------------------------------

    if t < 2.0 or t > 13.5:

        title_layer = Image.new(
            "RGBA",
            (WIDTH, HEIGHT),
            (0, 0, 0, 0)
        )

        td = ImageDraw.Draw(title_layer)

        if t < 2:

            progress = min(1, t / 0.8)

        else:

            progress = min(
                1,
                (15 - t) / 1.0
            )

        alpha = int(
            255 * ease_in_out(progress)
        )

        text = "MARVEL"

        bbox = td.textbbox(
            (0, 0),
            text,
            font=FONT_BIG
        )

        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]

        x = (WIDTH - tw) / 2
        y = (HEIGHT - th) / 2

        # Red cinematic box
        td.rounded_rectangle(
            (
                x - 35,
                y - 20,
                x + tw + 35,
                y + th + 20
            ),
            radius=8,
            fill=(220, 0, 30, alpha)
        )

        td.text(
            (x, y),
            text,
            font=FONT_BIG,
            fill=(255, 255, 255, alpha)
        )

        image.alpha_composite(title_layer)

    # --------------------------------------------------------
    # Convert frame
    # --------------------------------------------------------

    frame_array = np.array(
        image.convert("RGB")
    )

    writer.append_data(frame_array)

    if frame % 30 == 0:
        print(
            f"Progress: {frame / TOTAL_FRAMES * 100:.0f}%"
        )

writer.close()

print()
print("======================================")
print("VIDEO CREATED SUCCESSFULLY")
print("======================================")
print(f"File: {OUTPUT}")
print(f"Duration: {DURATION} seconds")
print(f"Resolution: {WIDTH}x{HEIGHT}")
print("======================================")