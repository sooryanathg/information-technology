import { hash } from "./intro";

// Off-white of the boot loader and of the pixel trails (cursor, falling tiles).
// Matches the background of the section below the hero.
export const FRAME_COLOR = "#fbf7ef";

export type FrameGeometry = { size: number; cols: number; rows: number; width: number; height: number };

/** Square tile grid covering `width` x `height`, anchored to the bottom-left. */
export function frameGeometry(width: number, height: number): FrameGeometry {
  const size = Math.max(8, Math.ceil(Math.max(width, height) / 96));
  return { size, cols: Math.ceil(width / size), rows: Math.ceil(height / size), width, height };
}

/**
 * Tile size shared by the pixel effects of a page: that of the pixel frame on
 * it (the home hero's), or what a frame over the viewport would use. Browser only.
 */
export function pageTileSize() {
  const frame = document.querySelector("[data-pixel-frame]")?.getBoundingClientRect();
  return frameGeometry(frame?.width || window.innerWidth, frame?.height || window.innerHeight).size;
}

/** Top-left position of tile (c, r); rows are laid out upwards from the bottom edge. */
export function tilePosition(g: FrameGeometry, c: number, r: number) {
  return { x: c * g.size, y: g.height - (g.rows - r) * g.size };
}

const DITHER = 9; // rows of thinning pixels beyond a solid band
const SPARKS = 0.035; // share of the empty dither cells that may flicker on

/** Too small for a frame. */
function tooSmall(g: FrameGeometry) {
  return g.cols < 2 || g.rows < 14;
}

/** Solid rows of the bottom band in column `c`: stepped, rising towards the right. */
export function bandHeight(g: FrameGeometry, c: number) {
  if (tooSmall(g)) return 0;
  const maxSolid = g.rows >= 44 ? 8 : 5;
  const t = c / (g.cols - 1);
  return Math.max(0, Math.min(maxSolid, Math.round(Math.pow(t, 1.3) * maxSolid + (hash(c * 7 + 1) - 0.5) * 3.6)));
}

/**
 * The frame: a solid stepped band along the bottom that rises towards the
 * right, topped by a dithered zone whose pixels thin out the higher they sit,
 * so the band dissolves into the photo instead of ending on a hard edge.
 * Deterministic, so it is the same on every render. All sets hold tile
 * indices (r * cols + c):
 * - `tiles`: every tile of the frame at rest,
 * - `dither`: the subset of `tiles` that sits in the dithered zones,
 * - `sparks`: empty cells in the dithered zones that may flicker on.
 */
export function frameLayout(g: FrameGeometry) {
  const { cols, rows } = g;
  const tiles = new Set<number>();
  const dither = new Set<number>();
  const sparks = new Set<number>();
  if (tooSmall(g)) return { tiles, dither, sparks };
  const index = (c: number, r: number) => (c >= 0 && c < cols && r >= 0 && r < rows ? r * cols + c : -1);
  const scatter = (i: number, on: boolean, seed: number) => {
    if (i < 0) return;
    if (on) {
      tiles.add(i);
      dither.add(i);
    } else if (hash(seed) < SPARKS) sparks.add(i);
  };

  for (let c = 0; c < cols; c++) {
    const t = c / (cols - 1);
    const solid = bandHeight(g, c);
    for (let k = 0; k < solid; k++) tiles.add(index(c, rows - 1 - k));

    // Dither: density falls off with height, and is richer towards the right.
    for (let k = 1; k <= DITHER; k++) {
      const density = Math.pow(1 - k / (DITHER + 1), 1.6) * (0.3 + 0.55 * t);
      scatter(index(c, rows - solid - k), hash(c * 31 + k * 977) < density, c * 53 + k * 389);
    }
  }

  // Top-left corner: the same idea mirrored. A stepped block that shrinks
  // towards the right, dithering downwards into the photo.
  const span = Math.max(4, Math.round(cols * 0.32));
  const maxTop = rows >= 44 ? 7 : 4;
  for (let c = 0; c < span; c++) {
    const t = 1 - c / span; // 1 at the corner, 0 at the far end
    const solid = Math.max(
      0,
      Math.min(maxTop, Math.round(Math.pow(t, 1.2) * maxTop + (hash(c * 5 + 701) - 0.5) * 1.8))
    );
    for (let k = 0; k < solid; k++) tiles.add(index(c, k));
    for (let k = 1; k <= DITHER; k++) {
      const density = Math.pow(1 - k / (DITHER + 1), 1.6) * (0.2 + 0.6 * t);
      scatter(index(c, solid - 1 + k), hash(c * 29 + k * 613 + 17) < density, c * 59 + k * 401 + 23);
    }
  }

  tiles.delete(-1);
  for (const i of sparks) if (tiles.has(i)) sparks.delete(i);
  return { tiles, dither, sparks };
}

const RISE_EDGE = 16; // rows of dither leading the rising band

/**
 * Whether the tile in column `c`, `k` rows above the bottom edge, is filled
 * once the bottom band has risen by `front` rows. The band keeps its stepped
 * shape and leads with a dithered edge. Each tile has a fixed threshold, so
 * tiles only ever switch on as `front` grows, and off again as it shrinks.
 */
export function risen(g: FrameGeometry, c: number, k: number, front: number) {
  const depth = (bandHeight(g, c) + front - k) / RISE_EDGE;
  if (depth <= 0) return false;
  return depth >= 1 || hash(c * 37 + k * 859 + 5) < Math.pow(depth, 1.6);
}

/**
 * How close to the running front of the risen band the tile in column `c`,
 * `k` rows above the bottom edge, sits: 1 for a tile that has only just
 * switched on, falling to 0 where the band is solid, and 0 for tiles that are
 * not filled at all.
 */
export function risenLead(g: FrameGeometry, c: number, k: number, front: number) {
  const depth = (bandHeight(g, c) + front - k) / RISE_EDGE;
  if (depth <= 0 || depth >= 1 || hash(c * 37 + k * 859 + 5) >= Math.pow(depth, 1.6)) return 0;
  return 1 - depth;
}

const PAGE_BASE = 3; // rows of page-coloured dither along the bottom edge once it has come in
const PAGE_IN = 3; // rows the band has to rise for that dither to come in fully; there is none at rest
const PAGE_EDGE = 5; // rows over which that dither thins out
const PAGE_RATE = 0.12; // how fast it follows the rising band; higher leaves a taller empty strip

/**
 * Whether the tile in column `c`, `k` rows above the bottom edge, has gone all
 * the way to the page colour. This is a dithered edge along the very bottom
 * that follows the rising band at a slower pace, so the hero ends as sharp
 * photo, then blurred tiles, then the page, instead of on a straight line.
 * At rest (`front` 0) there is none of it, only the blurred tiles; it comes in
 * over the first rows of the rise and goes again on the way back.
 */
export function paged(g: FrameGeometry, c: number, k: number, front: number) {
  if (tooSmall(g)) return false;
  const grown = Math.min(1, front / PAGE_IN);
  const depth = ((PAGE_BASE + (hash(c * 11 + 3) - 0.5) * 2) * grown + front * PAGE_RATE - k) / PAGE_EDGE;
  if (depth <= 0) return false;
  return depth >= 1 || hash(c * 41 + k * 733 + 9) < Math.pow(depth, 1.6);
}
