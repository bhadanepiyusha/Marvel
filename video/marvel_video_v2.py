import math
import random
import numpy as np

from PIL import Image, ImageDraw, ImageFont, ImageFilter
from moviepy import VideoClip


# ============================================================
# MARVEL CINEMATIC HERO VIDEO V2
# 15 seconds | 1280 x 720 | 30 FPS
# ============================================================

WIDTH = 1280
HEIGHT = 720
FPS = 30
DURATION = 15

random.seed(42)

# ------------------------------------------------------------
# FONTS
# ------------------------------------------------------------

def get_font(size, bold=False):
    candidates = []

    if bold:
        candidates = [
            r"C:\Windows\Fonts\arialbd.ttf",
            r"C:\Windows\Fonts\segoeuib.ttf",
        ]
    else:
        candidates = [
            r"C:\Windows\Fonts\arial.ttf",
            r"C:\Windows\Fonts\segoeui.ttf",
        ]

    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except:
            pass

    return ImageFont.load_default()


FONT_BIG = get_font(82, True)
FONT_MED = get_font(38, True)
FONT_SMALL = get_font(22, False)


# ------------------------------------------------------------
# STAR FIELD
# ------------------------------------------------------------

STARS = []

for _ in range(260):
    STARS.append({
        "x": random.uniform(0, WIDTH),
        "y": random.uniform(0, HEIGHT),
        "size": random.choice([1, 1, 1, 2, 2, 3]),
        "speed": random.uniform(10, 70),
        "brightness": random.randint(100, 255),
        "phase": random.uniform(0, math.pi * 2)
    })


# ------------------------------------------------------------
# PARTICLES
# ------------------------------------------------------------

PARTICLES = []

for _ in range(180):
    PARTICLES.append({
        "x": random.uniform(0, WIDTH),
        "y": random.uniform(0, HEIGHT),
        "vx": random.uniform(-1, 1),
        "vy": random.uniform(-1, 1),
        "size": random.uniform(1, 4),
        "phase": random.uniform(0, 10)
    })


# ------------------------------------------------------------
# HELPERS
# ------------------------------------------------------------

def clamp(v, a=0, b=255):
    return max(a, min(b, int(v)))


def lerp(a, b, t):
    return a + (b - a) * t


def smoothstep(t):
    t = max(0, min(1, t))
    return t * t * (3 - 2 * t)


def alpha_overlay(base, overlay):
    return Image.alpha_composite(base, overlay)


def add_glow(base, layer, radius=18):
    blurred = layer.filter(ImageFilter.GaussianBlur(radius))
    return Image.alpha_composite(base, blurred)


def draw_centered_text(draw, text, y, font, fill, stroke=0, stroke_fill=None):
    box = draw.textbbox((0, 0), text, font=font, stroke_width=stroke)
    w = box[2] - box[0]

    x = (WIDTH - w) // 2

    draw.text(
        (x, y),
        text,
        font=font,
        fill=fill,
        stroke_width=stroke,
        stroke_fill=stroke_fill
    )


# ------------------------------------------------------------
# SPACE BACKGROUND
# ------------------------------------------------------------

def draw_space(img, t):
    draw = ImageDraw.Draw(img, "RGBA")

    # Deep space gradient
    for y in range(HEIGHT):
        ratio = y / HEIGHT

        r = int(3 + ratio * 5)
        g = int(5 + ratio * 4)
        b = int(15 + ratio * 15)

        draw.line(
            [(0, y), (WIDTH, y)],
            fill=(r, g, b, 255)
        )

    # Nebula clouds
    nebula = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    nd = ImageDraw.Draw(nebula, "RGBA")

    for i in range(14):
        x = WIDTH * (0.1 + 0.8 * math.sin(i * 1.73 + t * 0.08) * 0.5 + 0.5)
        y = HEIGHT * (0.2 + 0.6 * math.cos(i * 1.21 + t * 0.06) * 0.5 + 0.5)

        radius = 100 + 80 * math.sin(i + t)

        nd.ellipse(
            [
                x - radius,
                y - radius * 0.5,
                x + radius,
                y + radius * 0.5
            ],
            fill=(
                25 + i * 3,
                5,
                55 + i * 5,
                22
            )
        )

    nebula = nebula.filter(ImageFilter.GaussianBlur(70))
    img.alpha_composite(nebula)

    # Stars
    for star in STARS:
        x = (star["x"] + t * star["speed"]) % WIDTH
        y = star["y"]

        twinkle = (
            math.sin(t * 3 + star["phase"]) + 1
        ) / 2

        brightness = int(
            star["brightness"] * (0.55 + 0.45 * twinkle)
        )

        s = star["size"]

        draw.ellipse(
            [
                x - s,
                y - s,
                x + s,
                y + s
            ],
            fill=(brightness, brightness, 255, 230)
        )


# ------------------------------------------------------------
# PORTAL
# ------------------------------------------------------------

def draw_portal(img, cx, cy, radius, t, intensity=1.0):
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow, "RGBA")

    # Outer energy glow
    for r in range(int(radius * 1.45), int(radius * 0.7), -10):
        a = int(
            max(
                0,
                35 * intensity *
                (1 - abs(r - radius) / radius)
            )
        )

        gd.ellipse(
            [
                cx - r,
                cy - r,
                cx + r,
                cy + r
            ],
            outline=(120, 50, 255, a),
            width=10
        )

    glow = glow.filter(ImageFilter.GaussianBlur(25))
    img.alpha_composite(glow)

    draw = ImageDraw.Draw(img, "RGBA")

    # Energy rings
    for ring in range(9):
        rr = radius * (
            0.68 +
            ring * 0.045 +
            math.sin(t * 4 + ring) * 0.012
        )

        color_phase = math.sin(t * 2 + ring)

        if color_phase > 0:
            color = (70, 160, 255, 180)
        else:
            color = (190, 40, 255, 180)

        draw.ellipse(
            [
                cx - rr,
                cy - rr,
                cx + rr,
                cy + rr
            ],
            outline=color,
            width=3
        )

    # Portal interior
    inner = int(radius * 0.66)

    draw.ellipse(
        [
            cx - inner,
            cy - inner,
            cx + inner,
            cy + inner
        ],
        fill=(4, 4, 20, 230)
    )

    # Rotating energy arcs
    for i in range(20):
        start = (t * 100 + i * 23) % 360
        extent = 18 + 12 * math.sin(i + t)

        draw.arc(
            [
                cx - radius,
                cy - radius,
                cx + radius,
                cy + radius
            ],
            start=start,
            end=start + extent,
            fill=(100, 190, 255, 220),
            width=5
        )


# ------------------------------------------------------------
# FUTURISTIC CITY
# ------------------------------------------------------------

def draw_city(img, t):
    draw = ImageDraw.Draw(img, "RGBA")

    base_y = HEIGHT

    # Buildings
    x = -20

    while x < WIDTH:
        bw = random.randint(35, 85)
        bh = random.randint(100, 330)

        top = base_y - bh

        draw.rectangle(
            [x, top, x + bw, base_y],
            fill=(7, 8, 18, 255)
        )

        # Building edge
        draw.line(
            [(x, top), (x, base_y)],
            fill=(35, 50, 90, 130),
            width=1
        )

        # Windows
        for wy in range(int(top + 20), base_y - 10, 28):
            for wx in range(int(x + 10), int(x + bw - 5), 20):

                if random.random() < 0.35:
                    glow = int(
                        120 +
                        80 * math.sin(
                            t * 2 + wx + wy
                        )
                    )

                    draw.rectangle(
                        [
                            wx,
                            wy,
                            wx + 5,
                            wy + 9
                        ],
                        fill=(80, 180, 255, clamp(glow))
                    )

        x += bw + random.randint(8, 20)

    # Horizon glow
    horizon = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    hd = ImageDraw.Draw(horizon, "RGBA")

    for r in range(160, 0, -8):
        a = int(35 * (1 - r / 160))

        hd.ellipse(
            [
                WIDTH // 2 - r * 3,
                HEIGHT - r,
                WIDTH // 2 + r * 3,
                HEIGHT + r
            ],
            fill=(30, 90, 255, a)
        )

    horizon = horizon.filter(ImageFilter.GaussianBlur(30))
    img.alpha_composite(horizon)


# ------------------------------------------------------------
# HERO SILHOUETTE
# ------------------------------------------------------------

def draw_hero(img, x, y, scale, color, pose=0):
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow, "RGBA")

    # Glow silhouette
    gd.ellipse(
        [
            x - 32 * scale,
            y - 125 * scale,
            x + 32 * scale,
            y - 61 * scale
        ],
        fill=(*color, 110)
    )

    gd.rectangle(
        [
            x - 42 * scale,
            y - 65 * scale,
            x + 42 * scale,
            y + 45 * scale
        ],
        fill=(*color, 90)
    )

    glow = glow.filter(ImageFilter.GaussianBlur(28))
    img.alpha_composite(glow)

    draw = ImageDraw.Draw(img, "RGBA")

    # Head
    draw.ellipse(
        [
            x - 25 * scale,
            y - 125 * scale,
            x + 25 * scale,
            y - 75 * scale
        ],
        fill=(3, 3, 8, 255)
    )

    # Body
    draw.polygon(
        [
            (x - 38 * scale, y - 70 * scale),
            (x + 38 * scale, y - 70 * scale),
            (x + 55 * scale, y + 40 * scale),
            (x - 55 * scale, y + 40 * scale)
        ],
        fill=(2, 2, 7, 255)
    )

    # Arms
    arm_offset = math.sin(pose) * 20 * scale

    draw.line(
        [
            (x - 32 * scale, y - 55 * scale),
            (x - 85 * scale, y + arm_offset * 0.5),
            (x - 105 * scale, y + 45 * scale)
        ],
        fill=(2, 2, 7, 255),
        width=max(3, int(25 * scale))
    )

    draw.line(
        [
            (x + 32 * scale, y - 55 * scale),
            (x + 85 * scale, y - arm_offset * 0.5),
            (x + 105 * scale, y + 45 * scale)
        ],
        fill=(2, 2, 7, 255),
        width=max(3, int(25 * scale))
    )

    # Legs
    draw.line(
        [
            (x - 20 * scale, y + 38 * scale),
            (x - 35 * scale, y + 140 * scale)
        ],
        fill=(2, 2, 7, 255),
        width=max(4, int(28 * scale))
    )

    draw.line(
        [
            (x + 20 * scale, y + 38 * scale),
            (x + 35 * scale, y + 140 * scale)
        ],
        fill=(2, 2, 7, 255),
        width=max(4, int(28 * scale))
    )

    # Eye / energy accents
    draw.ellipse(
        [
            x - 12 * scale,
            y - 105 * scale,
            x - 4 * scale,
            y - 99 * scale
        ],
        fill=(*color, 255)
    )

    draw.ellipse(
        [
            x + 4 * scale,
            y - 105 * scale,
            x + 12 * scale,
            y - 99 * scale
        ],
        fill=(*color, 255)
    )


# ------------------------------------------------------------
# LIGHTNING
# ------------------------------------------------------------

def draw_lightning(img, x, y, length, t, color=(80, 170, 255)):
    draw = ImageDraw.Draw(img, "RGBA")

    points = [(x, y)]

    current_x = x
    current_y = y

    segments = 9

    for i in range(segments):
        current_x += random.randint(-45, 45)
        current_y += length / segments

        points.append(
            (current_x, current_y)
        )

    # Glow
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow, "RGBA")

    gd.line(
        points,
        fill=(*color, 180),
        width=18,
        joint="curve"
    )

    glow = glow.filter(ImageFilter.GaussianBlur(20))
    img.alpha_composite(glow)

    draw.line(
        points,
        fill=(*color, 255),
        width=5,
        joint="curve"
    )


# ------------------------------------------------------------
# ENERGY PARTICLES
# ------------------------------------------------------------

def draw_particles(img, t, cx=WIDTH / 2, cy=HEIGHT / 2):
    draw = ImageDraw.Draw(img, "RGBA")

    for p in PARTICLES:
        angle = math.atan2(
            p["y"] - cy,
            p["x"] - cx
        )

        distance = math.sqrt(
            (p["x"] - cx) ** 2 +
            (p["y"] - cy) ** 2
        )

        speed = 25 + distance * 0.03

        x = (
            cx +
            math.cos(angle) *
            (distance + t * speed)
        )

        y = (
            cy +
            math.sin(angle) *
            (distance + t * speed)
        )

        x %= WIDTH
        y %= HEIGHT

        alpha = int(
            100 +
            100 *
            (math.sin(t * 4 + p["phase"]) + 1) / 2
        )

        s = p["size"]

        draw.ellipse(
            [
                x - s,
                y - s,
                x + s,
                y + s
            ],
            fill=(130, 190, 255, alpha)
        )


# ------------------------------------------------------------
# CAMERA ZOOM / VIGNETTE
# ------------------------------------------------------------

def apply_vignette(img):
    vignette = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette, "RGBA")

    for i in range(100):
        alpha = int(1.8 * (100 - i))

        vd.rectangle(
            [
                i,
                i,
                WIDTH - i,
                HEIGHT - i
            ],
            outline=(0, 0, 0, alpha),
            width=3
        )

    return Image.alpha_composite(img, vignette)


# ------------------------------------------------------------
# SCENE 1
# 0 - 3 sec
# ------------------------------------------------------------

def scene_space(t):
    img = Image.new(
        "RGBA",
        (WIDTH, HEIGHT),
        (0, 0, 0, 255)
    )

    draw_space(img, t)

    # Slowly approaching portal
    progress = smoothstep(t / 3)

    radius = lerp(30, 290, progress)

    draw_portal(
        img,
        WIDTH / 2,
        HEIGHT / 2,
        radius,
        t,
        progress
    )

    draw_particles(
        img,
        t,
        WIDTH / 2,
        HEIGHT / 2
    )

    return img


# ------------------------------------------------------------
# SCENE 2
# 3 - 6 sec
# ------------------------------------------------------------

def scene_multiverse(t):
    img = Image.new(
        "RGBA",
        (WIDTH, HEIGHT),
        (2, 3, 12, 255)
    )

    draw_space(img, t)

    # Large portal
    pulse = 1 + 0.06 * math.sin(t * 7)

    draw_portal(
        img,
        WIDTH / 2,
        HEIGHT / 2,
        300 * pulse,
        t * 1.4,
        1
    )

    # Multiple smaller portals
    portals = [
        (190, 170, 90),
        (1080, 180, 110),
        (180, 570, 120),
        (1090, 560, 95)
    ]

    for i, (x, y, r) in enumerate(portals):
        draw_portal(
            img,
            x,
            y,
            r,
            t * 1.7 + i,
            0.6
        )

    draw_particles(img, t)

    return img


# ------------------------------------------------------------
# SCENE 3
# 6 - 10 sec
# ------------------------------------------------------------

def scene_heroes(t):
    img = Image.new(
        "RGBA",
        (WIDTH, HEIGHT),
        (3, 4, 12, 255)
    )

    draw_space(img, t)

    # Futuristic city
    draw_city(img, t)

    # Hero positions
    heroes = [
        (
            WIDTH * 0.18,
            HEIGHT * 0.64,
            1.0,
            (220, 45, 40)
        ),
        (
            WIDTH * 0.38,
            HEIGHT * 0.65,
            1.15,
            (50, 220, 90)
        ),
        (
            WIDTH * 0.60,
            HEIGHT * 0.64,
            1.15,
            (90, 150, 255)
        ),
        (
            WIDTH * 0.81,
            HEIGHT * 0.65,
            1.0,
            (180, 80, 255)
        )
    ]

    # Entrance movement
    for i, (x, y, scale, color) in enumerate(heroes):

        offset = (1 - smoothstep(
            max(0, min(1, t / 4))
        )) * (100 + i * 30)

        draw_hero(
            img,
            x,
            y + offset,
            scale,
            color,
            t + i
        )

    # Energy flashes
    if int(t * 5) % 4 == 0:
        draw_lightning(
            img,
            WIDTH * 0.53,
            40,
            360,
            t
        )

    if int(t * 7) % 5 == 0:
        draw_lightning(
            img,
            WIDTH * 0.72,
            20,
            300,
            t
        )

    draw_particles(img, t)

    return img


# ------------------------------------------------------------
# SCENE 4
# 10 - 13 sec
# ------------------------------------------------------------

def scene_collision(t):
    img = Image.new(
        "RGBA",
        (WIDTH, HEIGHT),
        (2, 2, 8, 255)
    )

    draw_space(img, t)

    progress = smoothstep(t / 3)

    # Energy rings expanding
    for i in range(12):
        radius = 40 + progress * (100 + i * 65)

        alpha = int(
            max(
                0,
                190 - i * 12
            )
        )

        draw = ImageDraw.Draw(img, "RGBA")

        draw.ellipse(
            [
                WIDTH / 2 - radius,
                HEIGHT / 2 - radius,
                WIDTH / 2 + radius,
                HEIGHT / 2 + radius
            ],
            outline=(
                255 if i % 2 == 0 else 70,
                60 if i % 2 == 0 else 160,
                40 if i % 3 == 0 else 255,
                alpha
            ),
            width=4
        )

    # Huge central energy burst
    burst = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    bd = ImageDraw.Draw(burst, "RGBA")

    burst_radius = 100 + progress * 500

    bd.ellipse(
        [
            WIDTH / 2 - burst_radius,
            HEIGHT / 2 - burst_radius,
            WIDTH / 2 + burst_radius,
            HEIGHT / 2 + burst_radius
        ],
        fill=(100, 70, 255, int(30 * (1 - progress)))
    )

    burst = burst.filter(ImageFilter.GaussianBlur(80))
    img.alpha_composite(burst)

    draw_particles(
        img,
        t * 2,
        WIDTH / 2,
        HEIGHT / 2
    )

    # Flash
    if progress > 0.82:
        flash = int(
            220 *
            (1 - (progress - 0.82) / 0.18)
        )

        overlay = Image.new(
            "RGBA",
            (WIDTH, HEIGHT),
            (255, 255, 255, flash)
        )

        img.alpha_composite(overlay)

    return img


# ------------------------------------------------------------
# SCENE 5
# 13 - 15 sec
# ------------------------------------------------------------

def scene_title(t):
    img = Image.new(
        "RGBA",
        (WIDTH, HEIGHT),
        (2, 2, 5, 255)
    )

    draw_space(img, t)

    progress = smoothstep(t / 2)

    # Fading energy behind title
    glow = Image.new(
        "RGBA",
        (WIDTH, HEIGHT),
        (0, 0, 0, 0)
    )

    gd = ImageDraw.Draw(glow, "RGBA")

    radius = 170 + 40 * math.sin(t * 2)

    gd.ellipse(
        [
            WIDTH / 2 - radius,
            HEIGHT / 2 - radius,
            WIDTH / 2 + radius,
            HEIGHT / 2 + radius
        ],
        fill=(190, 20, 30, 80)
    )

    glow = glow.filter(ImageFilter.GaussianBlur(70))
    img.alpha_composite(glow)

    draw = ImageDraw.Draw(img, "RGBA")

    # MARVEL
    alpha = int(255 * progress)

    draw_centered_text(
        draw,
        "MARVEL",
        285,
        FONT_BIG,
        (235, 235, 235, alpha),
        stroke=3,
        stroke_fill=(180, 20, 25, alpha)
    )

    # UNIVERSE
    draw_centered_text(
        draw,
        "UNIVERSE",
        385,
        FONT_MED,
        (220, 220, 230, alpha)
    )

    # Subtitle
    if progress > 0.45:
        sub_alpha = int(
            255 *
            ((progress - 0.45) / 0.55)
        )

        draw_centered_text(
            draw,
            "EVERY STORY. EVERY REALITY.",
            455,
            FONT_SMALL,
            (150, 170, 200, sub_alpha)
        )

    draw_particles(
        img,
        t,
        WIDTH / 2,
        HEIGHT / 2
    )

    return img


# ------------------------------------------------------------
# MAIN FRAME FUNCTION
# ------------------------------------------------------------

def make_frame(t):

    if t < 3:
        img = scene_space(t)

    elif t < 6:
        img = scene_multiverse(t - 3)

    elif t < 10:
        img = scene_heroes(t - 6)

    elif t < 13:
        img = scene_collision(t - 10)

    else:
        img = scene_title(t - 13)

    # Cinematic vignette
    img = apply_vignette(img)

    # Convert to RGB
    return np.array(img.convert("RGB"))


# ------------------------------------------------------------
# CREATE VIDEO
# ------------------------------------------------------------

print("=" * 50)
print("CREATING MARVEL CINEMATIC HERO VIDEO V2")
print("=" * 50)
print(f"Resolution: {WIDTH}x{HEIGHT}")
print(f"Duration: {DURATION} seconds")
print(f"FPS: {FPS}")
print()

video = VideoClip(
    make_frame,
    duration=DURATION
)

output_file = "marvel_hero_v2.mp4"

video.write_videofile(
    output_file,
    fps=FPS,
    codec="libx264",
    audio=False,
    preset="medium",
    bitrate="6000k"
)

video.close()

print()
print("=" * 50)
print("VIDEO CREATED SUCCESSFULLY")
print("=" * 50)
print(f"File: {output_file}")
print(f"Duration: {DURATION} seconds")
print(f"Resolution: {WIDTH}x{HEIGHT}")
print("=" * 50)