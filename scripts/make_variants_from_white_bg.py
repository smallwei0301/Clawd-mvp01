from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter


def make_cutout_from_white_bg(img_rgb: Image.Image) -> Image.Image:
    """Best-effort transparent PNG from a white background product photo."""
    im = img_rgb.convert("RGB")
    arr = np.asarray(im).astype(np.int16)
    # distance to white
    dist = np.linalg.norm(arr - 255, axis=2)

    # alpha: keep pixels that are not near-white
    # threshold tuned for soft shadows
    a = (dist - 10) / (70 - 10)
    a = np.clip(a, 0, 1)
    alpha = (a * 255).astype(np.uint8)

    out = img_rgb.convert("RGBA")
    out.putalpha(Image.fromarray(alpha, mode="L").filter(ImageFilter.GaussianBlur(1.6)))
    return out


def fit_canvas(img_rgba: Image.Image, w: int, h: int, *, bg=(255, 255, 255)) -> Image.Image:
    canvas = Image.new("RGB", (w, h), bg)

    # compute bbox from alpha (or full)
    bbox = img_rgba.getbbox() or (0, 0, img_rgba.width, img_rgba.height)
    crop = img_rgba.crop(bbox)

    # scale to fit with margin
    margin = 0.14
    maxw = int(w * (1 - margin * 2))
    maxh = int(h * (1 - margin * 2))
    scale = min(maxw / crop.width, maxh / crop.height)
    nw = max(1, int(crop.width * scale))
    nh = max(1, int(crop.height * scale))
    crop2 = crop.resize((nw, nh), Image.Resampling.LANCZOS)

    x = (w - nw) // 2
    y = (h - nh) // 2

    # composite if RGBA
    if crop2.mode != "RGBA":
        crop2 = crop2.convert("RGBA")
    tmp = Image.new("RGBA", (w, h), (255, 255, 255, 255))
    tmp.alpha_composite(crop2, (x, y))
    return tmp.convert("RGB")


def main():
    repo = Path(__file__).resolve().parents[1]
    exdir = repo / "public" / "examples"

    src = exdir / "output_white_bg.jpg"
    if not src.exists():
        raise SystemExit(f"Missing {src}")

    img = Image.open(src)

    cutout = make_cutout_from_white_bg(img)
    (exdir / "output_cutout.png").write_bytes(b"")
    cutout.save(exdir / "output_cutout.png")

    out_sq = fit_canvas(cutout, 1200, 1200)
    out_sq.save(exdir / "output_square_1x1.jpg", quality=92)

    out_45 = fit_canvas(cutout, 1200, 1500)
    out_45.save(exdir / "output_4x5.jpg", quality=92)

    print("Wrote variants to", exdir)


if __name__ == "__main__":
    main()
