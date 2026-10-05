import { hash } from "./intro";

/**
 * The cells of an `n` x `n` grid (`n` a power of two) in the order a Hilbert
 * curve visits them: every step moves to a neighbouring cell, and the path
 * fills one quarter of the square before moving on to the next.
 */
export function hilbertPath(n: number): [number, number][] {
  const path: [number, number][] = [];
  for (let d = 0; d < n * n; d++) {
    let x = 0;
    let y = 0;
    let t = d;
    for (let s = 1; s < n; s *= 2) {
      const rx = 1 & (t >> 1);
      const ry = 1 & (t ^ rx);
      if (!ry) {
        if (rx) {
          x = s - 1 - x;
          y = s - 1 - y;
        }
        [x, y] = [y, x];
      }
      x += s * rx;
      y += s * ry;
      t >>= 2;
    }
    path.push([x, y]);
  }
  return path;
}

/* ------------------------------------------------------------------ */
/* Hilbert curves as a line pattern (HilbertLines, PixelChecks)          */
/* ------------------------------------------------------------------ */

const GRID = 16; // cells per side of one square of the curve
const PATH = hilbertPath(GRID);
const LINE_COLOR = "rgb(240 227 208 / 0.13)";
const LINE_WIDTH = 0.12; // of a cell

// Gold runners that travel along the lines
const RUNNERS = 2; // per row of squares
const RUNNER_COLOR = "224 169 74";
const SPEED = 24; // cells per second
const TAIL = 26; // cells of fading trail behind a runner

/** Height in cells of one row of the pattern. */
export const HILBERT_ROW = GRID;

/**
 * Point `g` along row `row` of the pattern: squares of the curve side by side,
 * each leaving at its bottom corner next to where the following one starts.
 * Every other row is flipped. Row 0 starts at y = 0; rows above it are negative.
 */
function rowPoint(row: number, g: number, cell: number): [number, number] {
  const [cx, cy] = PATH[g % PATH.length];
  const square = Math.floor(g / PATH.length);
  return [(square * GRID + cx + 0.5) * cell, (row * GRID + (row % 2 ? GRID - 1 - cy : cy) + 0.5) * cell];
}

function rowLength(width: number, cell: number) {
  return Math.ceil(width / (cell * GRID)) * PATH.length;
}

function setLine(ctx: CanvasRenderingContext2D, cell: number) {
  ctx.lineWidth = Math.max(1.5, cell * LINE_WIDTH);
  ctx.lineCap = "square";
}

/** Strokes the faint lines of row `row` across `width`, in cells of `cell` px. */
export function strokeHilbertRow(ctx: CanvasRenderingContext2D, row: number, cell: number, width: number) {
  setLine(ctx, cell);
  ctx.strokeStyle = LINE_COLOR;
  ctx.beginPath();
  for (let g = 0; g < rowLength(width, cell); g++) ctx.lineTo(...rowPoint(row, g, cell));
  ctx.stroke();
}

/** Strokes the gold runners of row `row` where they are at time `now` (ms). */
export function strokeHilbertRunners(ctx: CanvasRenderingContext2D, row: number, cell: number, width: number, now: number) {
  setLine(ctx, cell);
  const length = rowLength(width, cell);
  const travelled = (now / 1000) * SPEED;
  for (let n = 0; n < RUNNERS; n++) {
    const head = Math.floor(travelled + hash(row * 17 + n * 31 + 7) * length) % length;
    for (let k = 0; k < TAIL && head - k > 0; k++) {
      ctx.strokeStyle = `rgb(${RUNNER_COLOR} / ${(1 - k / TAIL) * 0.85})`;
      ctx.beginPath();
      ctx.moveTo(...rowPoint(row, head - k - 1, cell));
      ctx.lineTo(...rowPoint(row, head - k, cell));
      ctx.stroke();
    }
  }
}
