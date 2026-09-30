import { hash } from "./intro";

// Off-white shared by the boot loader and the pixel frame it leaves behind on
// the hero. Ideally this also matches the background of the section below the hero.
export const FRAME_COLOR = "#f1ede7";

export type FrameGeometry = { size: number; cols: number; rows: number; width: number; height: number };

/** Square tile grid covering `width` x `height`, anchored to the bottom-left. */
export function frameGeometry(width: number, height: number): FrameGeometry {
  const size = Math.max(14, Math.ceil(Math.max(width, height) / 52));
  return { size, cols: Math.ceil(width / size), rows: Math.ceil(height / size), width, height };
}

/** Top-left position of tile (c, r); rows are laid out upwards from the bottom edge. */
export function tilePosition(g: FrameGeometry, c: number, r: number) {
  return { x: c * g.size, y: g.height - (g.rows - r) * g.size };
}

/**
 * Which tiles form the frame: a solid stepped band along the bottom that rises
 * towards the right, topped by a dithered zone whose pixels thin out the
 * higher they sit, so the band dissolves into the photo instead of ending on
 * a hard edge. Deterministic, so the loader and hero agree.
 * Returns tile indices (r * cols + c).
 */
export function frameTiles(g: FrameGeometry): Set<number> {
  const { cols, rows } = g;
  const keep = new Set<number>();
  if (cols < 2 || rows < 8) return keep;
  const maxSolid = rows >= 24 ? 4 : 3;
  const DITHER = 5; // rows of thinning pixels above the solid band
  const add = (c: number, r: number) => {
    if (c >= 0 && c < cols && r >= 0 && r < rows) keep.add(r * cols + c);
  };

  for (let c = 0; c < cols; c++) {
    const t = c / (cols - 1);
    const solid = Math.max(
      0,
      Math.min(maxSolid, Math.round(Math.pow(t, 1.3) * maxSolid + (hash(c * 7 + 1) - 0.5) * 2))
    );
    for (let k = 0; k < solid; k++) add(c, rows - 1 - k);

    // Dither: density falls off with height, and is richer towards the right.
    for (let k = 1; k <= DITHER; k++) {
      const density = Math.pow(1 - k / (DITHER + 1), 1.6) * (0.3 + 0.55 * t);
      if (hash(c * 31 + k * 977) < density) add(c, rows - solid - k);
    }
  }

  // Top-left corner: the same idea mirrored. A stepped block that shrinks
  // towards the right, dithering downwards into the photo.
  const span = Math.max(4, Math.round(cols * 0.32));
  const maxTop = rows >= 24 ? 3 : 2;
  for (let c = 0; c < span; c++) {
    const t = 1 - c / span; // 1 at the corner, 0 at the far end
    const solid = Math.max(
      0,
      Math.min(maxTop, Math.round(Math.pow(t, 1.2) * maxTop + (hash(c * 5 + 701) - 0.5) * 1.6))
    );
    for (let k = 0; k < solid; k++) add(c, k);
    for (let k = 1; k <= DITHER; k++) {
      const density = Math.pow(1 - k / (DITHER + 1), 1.6) * (0.2 + 0.6 * t);
      if (hash(c * 29 + k * 613 + 17) < density) add(c, solid - 1 + k);
    }
  }
  return keep;
}
