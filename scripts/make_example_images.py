from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


def _font(size: int):
    # best-effort default
    try:
        return ImageFont.truetype("arial.ttf", size)
    except Exception:
        return ImageFont.load_default()


def draw_bottle_scene(bg: str, *, w=1200, h=800, label="INPUT") -> Image.Image:
    img = Image.new("RGB", (w, h), bg)
    d = ImageDraw.Draw(img)

    # background pattern
    for i in range(0, w, 40):
        d.line((i, 0, i - 200, h), fill=(255, 255, 255, 30), width=2)

    # "table"
    d.rectangle((0, int(h * 0.72), w, h), fill=(30, 30, 40))

    # bottle body
    cx = int(w * 0.45)
    top = int(h * 0.18)
    bottom = int(h * 0.70)
    bw = int(w * 0.20)
    r = int(bw * 0.18)

    body = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    bd = ImageDraw.Draw(body)

    x0 = cx - bw // 2
    x1 = cx + bw // 2
    bd.rounded_rectangle((x0, top + 40, x1, bottom), radius=r, fill=(220, 220, 230, 255), outline=(180, 180, 190, 255), width=4)

    # neck
    nw = int(bw * 0.55)
    nx0 = cx - nw // 2
    nx1 = cx + nw // 2
    bd.rounded_rectangle((nx0, top + 10, nx1, top + 80), radius=int(r * 0.7), fill=(210, 210, 220, 255), outline=(175, 175, 185, 255), width=4)

    # cap
    bd.rounded_rectangle((nx0, top - 10, nx1, top + 30), radius=int(r * 0.6), fill=(40, 40, 55, 255), outline=(20, 20, 30, 255), width=4)

    # label band
    ly0 = int(top + (bottom - top) * 0.38)
    ly1 = ly0 + int((bottom - top) * 0.18)
    bd.rounded_rectangle((x0 + 18, ly0, x1 - 18, ly1), radius=14, fill=(35, 120, 220, 240))
    bd.text((x0 + 40, ly0 + 18), "CLAWD", fill=(255, 255, 255, 255), font=_font(32))

    # highlight
    bd.rounded_rectangle((x0 + 28, top + 70, x0 + 52, bottom - 30), radius=16, fill=(255, 255, 255, 40))

    # soft shadow on table
    sh = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    sd.ellipse((cx - bw, bottom - 10, cx + bw, bottom + 60), fill=(0, 0, 0, 160))
    sh = sh.filter(ImageFilter.GaussianBlur(22))

    img = Image.alpha_composite(img.convert("RGBA"), sh)
    img = Image.alpha_composite(img, body)

    # corner tag
    tag = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    td = ImageDraw.Draw(tag)
    td.rounded_rectangle((24, 24, 200, 76), radius=18, fill=(0, 0, 0, 140))
    td.text((46, 40), label, fill=(255, 255, 255, 255), font=_font(22))
    img = Image.alpha_composite(img, tag)

    return img.convert("RGBA")


def remove_bg_to_transparent(img: Image.Image) -> Image.Image:
    # This is NOT a true AI remove-bg. It's a demo asset builder.
    # We assume bottle is near center and use a crude mask by color distance to bg.
    rgb = img.convert("RGB")
    w, h = rgb.size
    px = rgb.load()

    # sample bg from top-left
    bg = px[10, 10]

    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    opx = out.load()

    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            dr = r - bg[0]
            dg = g - bg[1]
            db = b - bg[2]
            dist = math.sqrt(dr * dr + dg * dg + db * db)
            # keep foreground-ish
            a = 255 if dist > 60 else 0
            opx[x, y] = (r, g, b, a)

    # soften edges
    alpha = out.split()[-1].filter(ImageFilter.GaussianBlur(2))
    out.putalpha(alpha)
    return out


def fit_to_square_white(img_rgba: Image.Image, size=1200) -> Image.Image:
    # center-crop bounding box then paste to white
    bbox = img_rgba.getbbox() or (0, 0, img_rgba.width, img_rgba.height)
    crop = img_rgba.crop(bbox)
    # add padding
    pad = int(size * 0.10)
    tw = max(crop.width + pad * 2, crop.height + pad * 2)
    canvas = Image.new("RGBA", (tw, tw), (255, 255, 255, 255))
    x = (tw - crop.width) // 2
    y = (tw - crop.height) // 2
    canvas.alpha_composite(crop, (x, y))
    return canvas.resize((size, size), Image.Resampling.LANCZOS).convert("RGB")


def fit_to_ratio_white(img_rgba: Image.Image, w=1200, h=1500) -> Image.Image:
    bbox = img_rgba.getbbox() or (0, 0, img_rgba.width, img_rgba.height)
    crop = img_rgba.crop(bbox)
    canvas = Image.new("RGBA", (w, h), (255, 255, 255, 255))
    # scale down to fit
    scale = min((w * 0.78) / crop.width, (h * 0.78) / crop.height)
    nw = max(1, int(crop.width * scale))
    nh = max(1, int(crop.height * scale))
    crop2 = crop.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (w - nw) // 2
    y = (h - nh) // 2
    canvas.alpha_composite(crop2, (x, y))
    return canvas.convert("RGB")


def main():
    outdir = Path(__file__).resolve().parents[1] / "public" / "examples"
    outdir.mkdir(parents=True, exist_ok=True)

    inp1 = draw_bottle_scene("#86c5ff", label="INPUT")
    inp1.convert("RGB").save(outdir / "input_bottle_scene.jpg", quality=92)

    cut = remove_bg_to_transparent(inp1)
    cut.save(outdir / "output_cutout.png")

    sq = fit_to_square_white(cut, size=1200)
    sq.save(outdir / "output_square_1x1.jpg", quality=92)

    r45 = fit_to_ratio_white(cut, w=1200, h=1500)
    r45.save(outdir / "output_4x5.jpg", quality=92)

    print("Wrote:", outdir)


if __name__ == "__main__":
    main()
