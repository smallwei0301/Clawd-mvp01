from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image


def find_bbox(img: Image.Image) -> tuple[int, int, int, int]:
    im = img.convert("RGB")
    arr = np.asarray(im)
    h, w = arr.shape[:2]

    x0, y0 = int(w * 0.18), int(h * 0.12)
    sub = arr[y0:, x0:]

    bg = np.array([245, 245, 245], dtype=np.float32)
    dist = np.linalg.norm(sub.astype(np.float32) - bg, axis=2)
    mask = dist > 30
    ys, xs = np.where(mask)
    if ys.size == 0:
        return (0, 0, w, h)

    y1 = int(ys.min() + y0)
    y2 = int(ys.max() + y0)
    x1 = int(xs.min() + x0)
    x2 = int(xs.max() + x0)

    pad = 12
    x1 = max(0, x1 - pad)
    y1 = max(0, y1 - pad)
    x2 = min(w - 1, x2 + pad)
    y2 = min(h - 1, y2 + pad)
    return (x1, y1, x2, y2)


def main():
    repo = Path(__file__).resolve().parents[1]

    src = Path(r"C:\Users\KN222\.clawdbot\media\browser\cff56430-4538-4a8d-b46b-6404eeb64ffa.png")
    if not src.exists():
        raise SystemExit(f"Missing source screenshot: {src}")

    outdir = repo / "public" / "examples"
    outdir.mkdir(parents=True, exist_ok=True)

    img = Image.open(src)
    bbox = find_bbox(img)
    cropped = img.crop(bbox)

    out = outdir / "output_white_bg.jpg"
    cropped.convert("RGB").save(out, quality=92)
    print("Wrote", out, "bbox", bbox, "size", cropped.size)


if __name__ == "__main__":
    main()
