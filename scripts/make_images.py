import math
import random
import sys
from pathlib import Path

OUT = Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)
W, H = 400, 300
CX, CY = 200, 160

def svg(bg, body):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">'
        f'<rect width="{W}" height="{H}" fill="{bg}"/>'
        f'<g opacity="0.12" fill="none" stroke="#1F4D3A" stroke-width="2">'
        f'<path d="M20 20 l20 20 l-20 20 l-20 -20z"/><path d="M380 260 l20 20 l-20 20 l-20 -20z"/>'
        f'<path d="M360 30 l14 14 l-14 14 l-14 -14z"/><path d="M40 250 l14 14 l-14 14 l-14 -14z"/></g>'
        f'{body}</svg>'
    )

def plate(r=118):
    return (
        f'<ellipse cx="{CX}" cy="{CY + 14}" rx="{r + 6}" ry="{r * 0.5 + 6}" fill="#000" opacity="0.10"/>'
        f'<ellipse cx="{CX}" cy="{CY}" rx="{r}" ry="{r * 0.62}" fill="#FFFDF7"/>'
        f'<ellipse cx="{CX}" cy="{CY}" rx="{r - 16}" ry="{r * 0.62 - 12}" fill="none" stroke="#E9DFC9" stroke-width="3"/>'
    )

def bowl(color="#FFFDF7", r=100):
    return (
        f'<ellipse cx="{CX}" cy="{CY + 30}" rx="{r + 4}" ry="22" fill="#000" opacity="0.10"/>'
        f'<path d="M{CX - r} {CY - 10} Q{CX} {CY + 110} {CX + r} {CY - 10}z" fill="{color}"/>'
        f'<ellipse cx="{CX}" cy="{CY - 10}" rx="{r}" ry="{r * 0.36}" fill="{color}" stroke="#E2D5BA" stroke-width="3"/>'
    )

def dots(n, rx, ry, colors, size=(2, 4), cx=CX, cy=CY, seed=1):
    rnd = random.Random(seed)
    out = []
    for _ in range(n):
        a = rnd.random() * 2 * math.pi
        d = math.sqrt(rnd.random())
        x, y = cx + math.cos(a) * rx * d, cy + math.sin(a) * ry * d
        out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{rnd.uniform(*size):.1f}" fill="{rnd.choice(colors)}"/>')
    return "".join(out)

def leaf(x, y, rot, color="#3E8E41", s=1.0):
    return (f'<path transform="translate({x} {y}) rotate({rot}) scale({s})" '
            f'd="M0 0 Q12 -10 24 0 Q12 10 0 0z" fill="{color}"/>')

def skewer(y, chunks, colors, x0=90, x1=310):
    out = [f'<line x1="{x0 - 20}" y1="{y}" x2="{x1 + 20}" y2="{y}" stroke="#8A6A45" stroke-width="5" stroke-linecap="round"/>']
    step = (x1 - x0) / chunks
    for i in range(chunks):
        c = colors[i % len(colors)]
        x = x0 + step * i + step / 2
        out.append(f'<rect x="{x - 15}" y="{y - 15}" width="30" height="30" rx="9" fill="{c}"/>')
        out.append(f'<rect x="{x - 9}" y="{y - 10}" width="10" height="5" rx="2" fill="#fff" opacity="0.18"/>')
    return "".join(out)

images = {}

images["hummus"] = svg("#F6E7C8", bowl() +
    f'<ellipse cx="{CX}" cy="{CY - 10}" rx="86" ry="28" fill="#E8CF9A"/>'
    f'<path d="M140 {CY - 12} Q200 {CY - 40} 260 {CY - 12} Q200 {CY + 10} 140 {CY - 12}" fill="none" stroke="#D9B978" stroke-width="5"/>'
    f'<ellipse cx="{CX}" cy="{CY - 12}" rx="30" ry="10" fill="#D9A441" opacity="0.85"/>'
    + dots(10, 22, 6, ["#E6C27A"], (4, 5), cy=CY - 12, seed=3)
    + dots(18, 70, 20, ["#C8553D"], (1.5, 2.5), cy=CY - 10, seed=4)
    + leaf(150, CY - 22, -20) + leaf(236, CY - 6, 160))

images["falafel"] = svg("#EAD9C0", plate() +
    "".join(f'<circle cx="{x}" cy="{y}" r="26" fill="#8B5A2B"/><circle cx="{x - 7}" cy="{y - 8}" r="8" fill="#A97142"/>'
            + dots(8, 20, 20, ["#5E3A1A", "#6B8E23"], (1.5, 2.5), cx=x, cy=y, seed=x)
            for x, y in [(160, 145), (215, 135), (250, 168), (185, 180), (140, 182)])
    + '<path d="M120 150 Q170 120 230 150 T290 150" fill="none" stroke="#F3E6CC" stroke-width="5" stroke-linecap="round"/>'
    + leaf(270, 120, 30) + leaf(110, 170, -150) + '<circle cx="290" cy="190" r="12" fill="#C8553D"/>')

images["kebab"] = svg("#F3D9C4", plate() +
    skewer(135, 6, ["#7A3B1E", "#C8553D", "#7A3B1E", "#E8B04A"]) +
    skewer(180, 6, ["#7A3B1E", "#7A3B1E", "#4E8B3A", "#7A3B1E"]) +
    leaf(110, 215, -10) + leaf(270, 105, 20))

images["taouk"] = svg("#F4E4C6", plate() +
    skewer(140, 6, ["#E3A548", "#F0C06A", "#E3A548"]) +
    skewer(185, 6, ["#F0C06A", "#E3A548", "#B5452F"]) +
    '<ellipse cx="300" cy="105" rx="34" ry="14" fill="#fff" stroke="#E2D5BA" stroke-width="3"/>'
    '<ellipse cx="300" cy="103" rx="24" ry="8" fill="#FBF8F0"/>')

images["manakish"] = svg("#E6D6B8",
    f'<ellipse cx="{CX}" cy="{CY + 14}" rx="130" ry="64" fill="#000" opacity="0.10"/>'
    f'<ellipse cx="{CX}" cy="{CY}" rx="125" ry="72" fill="#E2B36A"/>'
    f'<ellipse cx="{CX}" cy="{CY}" rx="110" ry="60" fill="#6B6B2A"/>'
    + dots(240, 104, 56, ["#4F5A1E", "#8C8A3A", "#3D4417", "#B9A15A"], (1.5, 3), seed=7)
    + dots(25, 100, 52, ["#F2E6C2"], (1.5, 2.2), seed=8)
    + f'<path d="M{CX} {CY} L{CX + 110} {CY}" stroke="#E2B36A" stroke-width="5"/>'
    f'<path d="M{CX} {CY} L{CX - 70} {CY + 46}" stroke="#E2B36A" stroke-width="5"/>'
    f'<path d="M{CX} {CY} L{CX - 50} {CY - 56}" stroke="#E2B36A" stroke-width="5"/>')

images["cheese"] = svg("#F1E3C5",
    f'<ellipse cx="{CX}" cy="{CY + 14}" rx="130" ry="64" fill="#000" opacity="0.10"/>'
    f'<ellipse cx="{CX}" cy="{CY}" rx="125" ry="72" fill="#D9A257"/>'
    f'<path d="M95 {CY} Q110 {CY - 70} 200 {CY - 58} Q300 {CY - 66} 305 {CY} Q300 {CY + 58} 200 {CY + 56} Q100 {CY + 62} 95 {CY}z" fill="#FFF1C9"/>'
    + dots(40, 95, 48, ["#F6D88B", "#E9B65C"], (3, 7), seed=11)
    + dots(14, 95, 48, ["#3E8E41"], (1.5, 2.5), seed=12))

images["fattoush"] = svg("#DDEBD0", bowl() +
    f'<ellipse cx="{CX}" cy="{CY - 12}" rx="88" ry="30" fill="#7DB65A"/>'
    + "".join(leaf(x, y, r, c, 1.4) for x, y, r, c in [
        (130, 140, -20, "#4E9A3A"), (170, 130, 10, "#6DB34B"), (215, 132, -30, "#3E8E41"),
        (240, 150, 15, "#8BC34A"), (150, 160, 30, "#5DA040"), (195, 155, -10, "#7CB342")])
    + "".join(f'<circle cx="{x}" cy="{y}" r="9" fill="#D7372F"/>' for x, y in [(160, 150), (230, 140), (198, 135), (255, 160)])
    + "".join(f'<rect x="{x}" y="{y}" width="14" height="12" rx="2" fill="#D9A441" transform="rotate({r} {x} {y})"/>'
              for x, y, r in [(180, 160, 15), (140, 135, -20), (220, 160, 30), (205, 125, 5)])
    + "".join(f'<circle cx="{x}" cy="{y}" r="8" fill="#B5D99C" stroke="#4E8B3A" stroke-width="2"/>' for x, y in [(240, 128), (170, 145)]))

images["tabbouleh"] = svg("#E3EFD6", bowl() +
    f'<ellipse cx="{CX}" cy="{CY - 12}" rx="88" ry="30" fill="#4E8B3A"/>'
    + dots(260, 84, 27, ["#2F6B2A", "#5DA040", "#7CB342", "#3E8E41", "#E8D7A8"], (1.5, 3), cy=CY - 12, seed=21)
    + dots(18, 80, 24, ["#D7372F"], (3, 5), cy=CY - 12, seed=22)
    + '<path d="M250 108 q22 -8 30 8 q-12 10 -30 -8z" fill="#F2D64B"/>' + leaf(130, 110, -40, "#3E8E41", 1.2))

images["baklava"] = svg("#F5E3C2", plate() +
    "".join(
        f'<path d="M{x} {y - 26} L{x + 30} {y} L{x} {y + 26} L{x - 30} {y}z" fill="#D99A3D" stroke="#B87926" stroke-width="2"/>'
        f'<path d="M{x} {y - 16} L{x + 18} {y} L{x} {y + 16} L{x - 18} {y}z" fill="#E8B45A"/>'
        f'<circle cx="{x}" cy="{y}" r="6" fill="#7BA23F"/>'
        for x, y in [(150, 140), (210, 140), (270, 140), (180, 180), (240, 180)]))

images["knefeh"] = svg("#F6DCC4", plate() +
    f'<ellipse cx="{CX}" cy="{CY + 8}" rx="96" ry="52" fill="#FFF3D6"/>'
    f'<ellipse cx="{CX}" cy="{CY}" rx="96" ry="52" fill="#E8742E"/>'
    + dots(160, 90, 46, ["#D9601E", "#F08A3E", "#C9541A"], (1.5, 3), seed=31)
    + dots(30, 50, 26, ["#7BA23F", "#9BC25A"], (2, 3.5), seed=32)
    + '<path d="M120 150 Q200 120 280 150" stroke="#F9E2A8" stroke-width="3" fill="none" opacity="0.8"/>')

images["lemonade"] = svg("#E8F3D6",
    '<ellipse cx="200" cy="262" rx="62" ry="12" fill="#000" opacity="0.10"/>'
    '<path d="M150 70 L250 70 L238 255 Q200 266 162 255z" fill="#D4E9A8" stroke="#BFD98A" stroke-width="3"/>'
    '<path d="M154 105 L246 105 L238 252 Q200 262 162 252z" fill="#B7DB6E"/>'
    + dots(14, 34, 50, ["#E7F4C8"], (3, 6), cx=200, cy=190, seed=41)
    + '<circle cx="250" cy="78" r="30" fill="#F2D64B"/><circle cx="250" cy="78" r="23" fill="#FBE98A"/>'
    '<path d="M250 55 V101 M227 78 H273 M234 62 L266 94 M266 62 L234 94" stroke="#F2D64B" stroke-width="2"/>'
    + leaf(172, 70, -60, "#3E8E41", 1.4) + leaf(190, 66, -110, "#4E9A3A", 1.3)
    + '<rect x="214" y="30" width="7" height="140" fill="#C8553D" transform="rotate(12 214 30)"/>')

images["jallab"] = svg("#EBDDE3",
    '<ellipse cx="200" cy="262" rx="62" ry="12" fill="#000" opacity="0.10"/>'
    '<path d="M150 70 L250 70 L238 255 Q200 266 162 255z" fill="#E7D3DC" stroke="#D3B7C4" stroke-width="3"/>'
    '<path d="M153 95 L247 95 L238 252 Q200 262 162 252z" fill="#6B1E3A"/>'
    + dots(14, 34, 40, ["#E7D3DC"], (3, 6), cx=200, cy=200, seed=51)
    + dots(16, 36, 8, ["#F3E6C8"], (2, 3), cx=200, cy=95, seed=52)
    + dots(8, 30, 6, ["#5A3A22"], (2.5, 3.5), cx=200, cy=95, seed=53))

images["coffee"] = svg("#E9DCCB",
    '<ellipse cx="200" cy="222" rx="110" ry="26" fill="#000" opacity="0.10"/>'
    '<ellipse cx="200" cy="212" rx="105" ry="24" fill="#FFFDF7" stroke="#E2D5BA" stroke-width="3"/>'
    '<path d="M140 110 L260 110 L250 200 Q200 214 150 200z" fill="#FFFDF7" stroke="#E2D5BA" stroke-width="3"/>'
    '<path d="M150 125 L250 125" stroke="#1F4D3A" stroke-width="6"/>'
    '<path d="M150 140 L250 140" stroke="#D9A441" stroke-width="3"/>'
    '<ellipse cx="200" cy="110" rx="60" ry="12" fill="#4A2C17"/>'
    '<path d="M258 130 q34 4 26 34 q-6 18 -30 18" fill="none" stroke="#E2D5BA" stroke-width="8"/>'
    '<path d="M185 92 q-12 -18 0 -36 q12 -18 0 -36 M215 92 q-12 -18 0 -36" fill="none" stroke="#B9A894" stroke-width="4" stroke-linecap="round" opacity="0.7"/>')

images["mixed-grill"] = svg("#F1D6C2", plate(124) +
    skewer(128, 5, ["#7A3B1E", "#5E2E16"], 100, 300) +
    skewer(165, 5, ["#E3A548", "#F0C06A"], 100, 300) +
    skewer(202, 5, ["#8E4A2A", "#C8553D", "#8E4A2A"], 100, 300) +
    leaf(96, 110, -30, "#3E8E41", 1.3) + '<circle cx="315" cy="115" r="14" fill="#C8553D"/>')

for name, content in images.items():
    (OUT / f"{name}.svg").write_text(content)
print("wrote", len(images), "images to", OUT)
