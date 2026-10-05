import { hash } from "./intro";

/**
 * The pixel transition between two screens: screen A breaks up into pixels in
 * its own colours, the pixels bleed into a gradient cloud, and the cloud takes
 * on the colours of screen B before it clears. Flat, opaque pixels throughout.
 *
 * Two stacked canvases draw it:
 * - pixels: one canvas pixel per grid cell stretched crisp, the pixels
 *   themselves,
 * - fragments: a few loose pixels that drift a little at the edge.
 *
 * Everything below is tuning. "Sweep units" are fractions of the distance the
 * edge travels across the screen.
 */
export const TRANSITION = {
  // Set to false to have links navigate straight away. The boot loader still
  // clears through the transition either way.
  betweenPages: true,

  // Timing (ms)
  coverMs: 380, // screen A breaking up; the navigation starts when it is covered
  revealMs: 560, // screen B emerging
  bootRevealMs: 1050, // the boot loader clearing
  maxHoldMs: 5000, // stop waiting for the next page after this and clear anyway

  // Pixel density
  cells: 88, // cells along the longer side of the viewport
  cellsMobile: 52,
  minCell: 10, // px
  medium: 0.2, // share of 2x2 areas merged into one medium pixel
  large: 0.05, // share of 4x4 areas merged into one large pixel

  // Edge
  spread: 0.46, // width of the dithered edge in sweep units; 0 is a hard wipe
  softness: 0.24, // longest fade of a single pixel in sweep units; most are much quicker

  // Gradient and colour
  bleed: 0.4, // how far behind the edge the pixels turn from page colours to the gradient
  tint: 0.68, // how much of the cloud is gradient rather than page colours
  texture: 0.06, // tone variation between neighbouring pixels in the cloud
  accent: "#cb9437", // warms the lit side of the gradient
  shade: "#2b2119", // deepens the far side
  warmth: 0.4, // how far the lit side of the gradient leans to the accent
  depth: 0.4, // how far the far side leans to the shade
  highlight: "#f7e3bd", // lightens the lit side

  // Drifting pixels
  fragments: 0.03, // share of the pixels that come loose at the edge
  maxFragments: 140,
  maxFragmentsMobile: 45,
  drift: 8, // px they travel
  driftMobile: 4,
};

const MOBILE_QUERY = "(max-width: 767px), (pointer: coarse)";
const LEAD = 0.27; // sweep units the loose pixels may run ahead of the edge
const TAIL = 0.35; // and linger behind it
const NOISE_CELLS = 9; // cells per feature of the edge's large-scale wobble
const MID_EASE = 170; // ms, how fast the cloud follows a change of gradient
const THUMB = 24; // images are sampled from a copy this many px wide

export type SweepAxis = "right" | "left" | "down";

export type CoverOptions = {
  /** Direction the edge travels in. */
  axis: SweepAxis;
  /** Called once the screen is fully covered, which is the moment to swap what is under it. */
  onCovered?: () => void;
  /** Cover in a single frame, for when the screen is about to change anyway. */
  instant?: boolean;
  /** Cover with this colour instead of the colours of the screen. */
  flat?: string;
  revealMs?: number;
};

export type PixelTransition = {
  /** Cover the screen, or cover it again if it was clearing. */
  cover(options: CoverOptions): void;
  /** The next screen is in place: clear as soon as the cover is complete. */
  release(): void;
  destroy(): void;
};

type RGB = [number, number, number];
type RGBA = [number, number, number, number];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: RGB, b: RGB, t: number): RGB => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

function sstep(from: number, to: number, v: number) {
  if (v <= from) return 0;
  if (v >= to) return 1;
  const t = (v - from) / (to - from);
  return t * t * (3 - 2 * t);
}

/** Smooth noise in 0..1 with features one unit wide. */
function valueNoise(x: number, y: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const u = sstep(0, 1, x - xi);
  const v = sstep(0, 1, y - yi);
  const at = (i: number, j: number) => hash(seed + i * 374761 + j * 668265);
  return lerp(lerp(at(xi, yi), at(xi + 1, yi), u), lerp(at(xi, yi + 1), at(xi + 1, yi + 1), u), v);
}

/* ------------------------------------------------------------------ */
/* Reading the colours of the screen                                    */
/* ------------------------------------------------------------------ */

const RGB_PATTERN = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/;
const COLOR_PATTERN = /(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\([^()]*\)|#[0-9a-f]{3,8}\b/gi;

// A linear gradient that does not run top to bottom.
const ANGLED = /^linear-gradient\(\s*(?!180deg)(?:-?[\d.]+[a-z]+|to (?!bottom\b))/;

const parsed = new Map<string, RGBA>();
let probe: CanvasRenderingContext2D | null = null;
let thumb: CanvasRenderingContext2D | null = null;

function scratchContext(size: number) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  return canvas.getContext("2d", { willReadFrequently: true });
}

/** Any CSS colour as [r, g, b, alpha]. Formats other than rgb() are resolved by a canvas. */
function parseColor(css: string): RGBA {
  let color = parsed.get(css);
  if (color) return color;
  const m = RGB_PATTERN.exec(css);
  if (m) color = [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]];
  else {
    probe ??= scratchContext(1);
    color = [0, 0, 0, 0];
    if (probe) {
      probe.clearRect(0, 0, 1, 1);
      probe.fillStyle = "rgba(0,0,0,0)";
      probe.fillStyle = css;
      probe.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = probe.getImageData(0, 0, 1, 1).data;
      // The canvas stores premultiplied colour, so undo that.
      if (a) color = [Math.min(255, (r * 255) / a), Math.min(255, (g * 255) / a), Math.min(255, (b * 255) / a), a / 255];
    }
  }
  parsed.set(css, color);
  return color;
}

const rgb = (css: string) => parseColor(css).slice(0, 3) as RGB;

/** What an element paints, as far as the transition cares. */
type Paint = {
  rect: DOMRect;
  opacity: number;
  color: RGBA | null;
  /** Colours of its gradient, and whether they can be read top to bottom. */
  stops: RGBA[] | null;
  vertical: boolean;
  /** Small copy of its picture, with the area of `rect` the picture covers. */
  image: { data: Uint8ClampedArray; x: number; y: number; w: number; h: number } | null;
};

function readImage(el: Element, rect: DOMRect, fit: string): Paint["image"] {
  const isImg = el instanceof HTMLImageElement;
  if (!isImg && !(el instanceof HTMLCanvasElement)) return null;
  const iw = isImg ? el.naturalWidth : el.width;
  const ih = isImg ? el.naturalHeight : el.height;
  if (!iw || !ih || !rect.width || !rect.height || (isImg && !el.complete)) return null;
  thumb ??= scratchContext(THUMB);
  if (!thumb) return null;
  try {
    thumb.clearRect(0, 0, THUMB, THUMB);
    thumb.drawImage(el, 0, 0, THUMB, THUMB);
    const data = thumb.getImageData(0, 0, THUMB, THUMB).data;
    // Where the picture sits in the element's box, as CSS object-fit places it.
    let w = rect.width;
    let h = rect.height;
    if (isImg && (fit === "cover" || fit === "contain")) {
      const scale = fit === "cover" ? Math.max(w / iw, h / ih) : Math.min(w / iw, h / ih);
      w = iw * scale;
      h = ih * scale;
    }
    return { data, x: rect.left + (rect.width - w) / 2, y: rect.top + (rect.height - h) / 2, w, h };
  } catch {
    return null; // a cross-origin picture cannot be read
  }
}

function readPaint(el: Element): Paint | null {
  if (el.closest("[data-transition-ignore]")) return null;
  // Also catches an ancestor holding it at opacity 0, as the page intros do.
  if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return null;
  const cs = getComputedStyle(el);
  const opacity = +cs.opacity;
  if (!opacity || cs.visibility === "hidden") return null;
  const rect = el.getBoundingClientRect();
  const color = parseColor(cs.backgroundColor);
  const background = cs.backgroundImage;
  // A background clipped to the text paints no box.
  const boxed = cs.backgroundClip !== "text";
  const stops =
    boxed && background.includes("gradient(") ? (background.match(COLOR_PATTERN) ?? []).map(parseColor) : [];
  return {
    rect,
    opacity,
    color: boxed && color[3] > 0 ? color : null,
    stops: stops.length ? stops : null,
    vertical:
      background.startsWith("linear-gradient(") && background.lastIndexOf("gradient(") < 8 && !ANGLED.test(background),
    image: readImage(el, rect, cs.objectFit),
  };
}

/** Colour of a gradient at `t` along it; stacked or angled gradients are averaged instead. */
function gradientAt(stops: RGBA[], vertical: boolean, t: number): RGBA {
  if (vertical && stops.length > 1) {
    const at = clamp01(t) * (stops.length - 1);
    const i = Math.min(stops.length - 2, Math.floor(at));
    const [a, b] = [stops[i], stops[i + 1]];
    const k = at - i;
    return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k), lerp(a[3], b[3], k)];
  }
  const sum: RGBA = [0, 0, 0, 0];
  for (const s of stops) {
    sum[0] += s[0] * s[3];
    sum[1] += s[1] * s[3];
    sum[2] += s[2] * s[3];
    sum[3] += s[3];
  }
  if (!sum[3]) return sum;
  return [sum[0] / sum[3], sum[1] / sum[3], sum[2] / sum[3], sum[3] / stops.length];
}

/**
 * Colour of the screen at (x, y): the backgrounds and pictures of the elements
 * under that point, composited top to bottom. Text is left out, and so is
 * anything with pointer-events: none, which elementsFromPoint skips.
 */
function colorAt(x: number, y: number, paints: Map<Element, Paint | null>, fallback: RGB): RGB {
  const out: RGB = [0, 0, 0];
  let rest = 1; // how much still shows through
  const add = (r: number, g: number, b: number, a: number) => {
    out[0] += r * a * rest;
    out[1] += g * a * rest;
    out[2] += b * a * rest;
    rest *= 1 - a;
  };

  for (const el of document.elementsFromPoint(x, y)) {
    let paint = paints.get(el);
    if (paint === undefined) paints.set(el, (paint = readPaint(el)));
    if (!paint) continue;
    const { rect, opacity, image, stops, color } = paint;
    if (image) {
      const u = Math.floor(((x - image.x) / image.w) * THUMB);
      const v = Math.floor(((y - image.y) / image.h) * THUMB);
      if (u >= 0 && u < THUMB && v >= 0 && v < THUMB) {
        const i = (v * THUMB + u) * 4;
        add(image.data[i], image.data[i + 1], image.data[i + 2], (image.data[i + 3] / 255) * opacity);
      }
    }
    if (stops) {
      const [r, g, b, a] = gradientAt(stops, paint.vertical, (y - rect.top) / (rect.height || 1));
      add(r, g, b, a * opacity);
    }
    if (color) add(color[0], color[1], color[2], color[3] * opacity);
    if (rest < 0.04) break;
  }
  add(fallback[0], fallback[1], fallback[2], 1);
  return out;
}

/* ------------------------------------------------------------------ */
/* The grid                                                             */
/* ------------------------------------------------------------------ */

type Fragment = {
  cell: number;
  x: number;
  y: number;
  size: number;
  early: number; // sweep units it shows up ahead of its cell
  late: number; // and outstays it
  inX: number; // offset it drifts in from, px
  inY: number;
  outX: number; // offset it drifts away to
  outY: number;
};

type Grid = {
  size: number;
  cols: number;
  rows: number;
  width: number;
  height: number;
  top: number; // the grid is anchored to the bottom-left, like the hero's pixel frame
  /** Cell that leads the pixel each cell belongs to; a cell of a plain small pixel leads itself. */
  owner: Int32Array;
  x: Float32Array; // centre of the cell's pixel, in px
  y: Float32Array;
  sweep: Float32Array; // 0 where the edge starts, 1 where it ends
  arrive: Float32Array; // when the pixel shows up, in sweep units
  depart: Float32Array; // when it leaves
  fade: Float32Array; // how long that takes
  tone: Float32Array; // its brightness within the cloud
  phase: Float32Array; // of its shimmer
  from: Float32Array; // rgb per cell: screen A
  to: Float32Array; // screen B
  mid: Float32Array; // the cloud right now
  midTarget: Float32Array; // the gradient the cloud is heading for
  fragments: Fragment[];
  drift: [number, number];
};

const DIRECTION: Record<SweepAxis, [number, number]> = { right: [1, 0], left: [-1, 0], down: [0, 1] };

/** Position along the sweep, 0..1. The edge leans a little so it never runs dead straight. */
function sweepAt(axis: SweepAxis, nx: number, ny: number) {
  if (axis === "down") return (ny + 0.1 * nx) / 1.1;
  return ((axis === "right" ? nx : 1 - nx) + 0.2 * ny) / 1.2;
}

function buildGrid(width: number, height: number, axis: SweepAxis, seed: number, mobile: boolean): Grid {
  const T = TRANSITION;
  const size = Math.max(T.minCell, Math.ceil(Math.max(width, height) / (mobile ? T.cellsMobile : T.cells)));
  const cols = Math.ceil(width / size);
  const rows = Math.ceil(height / size);
  const n = cols * rows;
  const top = height - rows * size;
  const s = seed * 7919;

  // Merge some areas into medium and large pixels.
  const owner = new Int32Array(n);
  const span = new Uint8Array(n);
  const claim = (c0: number, r0: number, w: number) => {
    for (let r = r0; r < Math.min(rows, r0 + w); r++) {
      for (let c = c0; c < Math.min(cols, c0 + w); c++) {
        owner[r * cols + c] = r0 * cols + c0;
        span[r * cols + c] = w;
      }
    }
  };
  for (let r = 0; r < rows; r += 4) {
    for (let c = 0; c < cols; c += 4) {
      if (hash(s + (r * cols + c) * 3 + 1) < T.large) {
        claim(c, r, 4);
        continue;
      }
      for (let rr = r; rr < Math.min(rows, r + 4); rr += 2) {
        for (let cc = c; cc < Math.min(cols, c + 4); cc += 2) {
          if (hash(s + (rr * cols + cc) * 3 + 2) < T.medium) claim(cc, rr, 2);
          else for (let k = 0; k < 4; k++) claim(cc + (k & 1), rr + (k >> 1), 1);
        }
      }
    }
  }

  const grid: Grid = {
    size,
    cols,
    rows,
    width,
    height,
    top,
    owner,
    x: new Float32Array(n),
    y: new Float32Array(n),
    sweep: new Float32Array(n),
    arrive: new Float32Array(n),
    depart: new Float32Array(n),
    fade: new Float32Array(n),
    tone: new Float32Array(n),
    phase: new Float32Array(n),
    from: new Float32Array(n * 3),
    to: new Float32Array(n * 3),
    mid: new Float32Array(n * 3),
    midTarget: new Float32Array(n * 3),
    fragments: [],
    drift: DIRECTION[axis],
  };

  // The edge: a sweep across the screen, bent by smooth noise and broken up
  // by a threshold of its own for every pixel, which makes the dither.
  const feature = size * NOISE_CELLS;
  const edge = (px: number, py: number, noiseSeed: number, scatter: number) =>
    sweepAt(axis, px / width, (py - top) / (rows * size)) * (1 - T.spread) +
    T.spread * (0.5 * valueNoise(px / feature, py / feature, noiseSeed) + 0.5 * scatter);

  const anchors: number[] = [];
  for (let i = 0; i < n; i++) {
    const o = owner[i];
    if (o !== i) {
      for (const field of [grid.x, grid.y, grid.sweep, grid.arrive, grid.depart, grid.fade, grid.tone, grid.phase]) {
        field[i] = field[o];
      }
      continue;
    }
    const w = span[i] * size;
    const px = (i % cols) * size + w / 2;
    const py = top + Math.floor(i / cols) * size + w / 2;
    grid.x[i] = px;
    grid.y[i] = py;
    grid.sweep[i] = sweepAt(axis, px / width, (py - top) / (rows * size));
    grid.arrive[i] = edge(px, py, s + 11, hash(s + i * 5 + 1));
    grid.depart[i] = edge(px, py, s + 23, hash(s + i * 5 + 2));
    // Most pixels switch quickly and stay sharp; a few take their time.
    grid.fade[i] = T.softness * (0.12 + 0.88 * Math.pow(hash(s + i * 5 + 3), 2.2));
    grid.tone[i] = 1 + T.texture * (hash(s + i * 5 + 4) - 0.5) * 2;
    grid.phase[i] = hash(s + i * 5 + 5) * Math.PI * 2;
    if (span[i] <= 2) anchors.push(i);
  }

  // Loose pixels: they come in from behind the edge and wander off ahead of it.
  const share = Math.min(T.fragments, (mobile ? T.maxFragmentsMobile : T.maxFragments) / Math.max(1, anchors.length));
  const reach = mobile ? T.driftMobile : T.drift;
  const [dx, dy] = grid.drift;
  for (const i of anchors) {
    if (hash(s + i * 17 + 3) >= share) continue;
    const h = (k: number) => hash(s + i * 17 + k);
    const along = (k: number) => reach * (0.5 + 0.5 * h(k));
    const across = (k: number) => reach * 0.8 * (h(k) - 0.5);
    const [inAlong, inAcross, outAlong, outAcross] = [along(4), across(5), along(6), across(7)];
    const w = span[i] * size;
    grid.fragments.push({
      cell: i,
      x: grid.x[i] - w / 2,
      y: grid.y[i] - w / 2,
      size: w,
      early: 0.1 + 0.16 * h(8),
      late: 0.12 + 0.2 * h(9),
      inX: -dx * inAlong + dy * inAcross,
      inY: -dy * inAlong + dx * inAcross,
      outX: dx * outAlong + dy * outAcross,
      outY: dy * outAlong + dx * outAcross,
    });
  }
  return grid;
}

/** Fills `field` (rgb per cell) with the colours of the screen and returns their average. */
function sampleScreen(grid: Grid, field: Float32Array, mobile: boolean): RGB {
  const { width, height, owner } = grid;
  // A coarse grid of sample points, denser along the longer side.
  const [long, short] = mobile ? [10, 6] : [16, 10];
  const sx = width >= height ? long : short;
  const sy = width >= height ? short : long;
  const paints = new Map<Element, Paint | null>();
  const fallback = rgb(getComputedStyle(document.body).backgroundColor);
  const samples = new Float32Array(sx * sy * 3);
  const avg: RGB = [0, 0, 0];
  for (let j = 0; j < sy; j++) {
    for (let i = 0; i < sx; i++) {
      const c = colorAt(((i + 0.5) / sx) * width, ((j + 0.5) / sy) * height, paints, fallback);
      samples.set(c, (j * sx + i) * 3);
      for (let k = 0; k < 3; k++) avg[k] += c[k] / (sx * sy);
    }
  }

  for (let i = 0; i < owner.length; i++) {
    const o = owner[i];
    if (o !== i) {
      for (let k = 0; k < 3; k++) field[i * 3 + k] = field[o * 3 + k];
      continue;
    }
    // Blend the four samples around the pixel.
    const fx = Math.min(sx - 1, Math.max(0, (grid.x[i] / width) * sx - 0.5));
    const fy = Math.min(sy - 1, Math.max(0, (grid.y[i] / height) * sy - 0.5));
    const x0 = Math.floor(fx);
    const y0 = Math.floor(fy);
    const x1 = Math.min(sx - 1, x0 + 1);
    const y1 = Math.min(sy - 1, y0 + 1);
    for (let k = 0; k < 3; k++) {
      const at = (xx: number, yy: number) => samples[(yy * sx + xx) * 3 + k];
      field[i * 3 + k] = lerp(lerp(at(x0, y0), at(x1, y0), fx - x0), lerp(at(x0, y1), at(x1, y1), fx - x0), fy - y0);
    }
  }
  return avg;
}

/* ------------------------------------------------------------------ */
/* The transition                                                       */
/* ------------------------------------------------------------------ */

export function createPixelTransition(
  root: HTMLElement,
  canvases: { pixels: HTMLCanvasElement; fragments: HTMLCanvasElement }
): PixelTransition | null {
  const pixelCtx = canvases.pixels.getContext("2d");
  const fragmentCtx = canvases.fragments.getContext("2d");
  if (!pixelCtx || !fragmentCtx) return null;

  const T = TRANSITION;
  const highlight = rgb(T.highlight);
  const accent = rgb(T.accent);
  const shade = rgb(T.shade);

  // Two clocks run the whole thing: `arrived` moves the pixels in and `departed`
  // moves them out again, both in sweep units. A pixel is opaque between its
  // own arrival and departure, so the cover can be reversed at any moment.
  // `arrived` starts below zero, so the loose pixels that run ahead of the
  // edge fade in from nothing as well.
  const ARRIVED_MIN = -LEAD;
  const ARRIVED_MAX = 1 + Math.max(T.softness, T.bleed);
  const COVERED = 1 + T.softness; // every pixel is opaque from here
  const DEPARTED_MAX = T.bleed + 1 + Math.max(T.softness, TAIL);

  let phase: "idle" | "cover" | "reveal" | "recover" = "idle";
  let grid: Grid | null = null;
  let pixelImage: ImageData | null = null;
  let mobile = false;
  let cover = 0; // 0..1 through the cover
  let reveal = 0; // 0..1 through the reveal
  let revealMs = T.revealMs;
  let waiting: (() => void) | null = null;
  let released = false;
  let settling = false; // the cloud is still easing towards its gradient
  let calm = 0; // 0..1, how long the cloud has been whole
  let clock = 0;
  let last = 0;
  let raf = 0;
  let seed = 0;

  const arrivedAt = (t: number) => lerp(ARRIVED_MIN, ARRIVED_MAX, Math.pow(t, 1.5)); // the edge gathers speed
  const departedAt = (t: number) => DEPARTED_MAX * (1 - Math.pow(1 - t, 1.7)); // and slows as it clears

  /** A screen's average colour as the lit, warm end of the gradient. */
  const lit = (average: RGB) => mix(mix(average, accent, T.warmth), highlight, T.warmth * 0.8);

  /** The gradient the cloud settles into: lit and warm where the edge starts, deeper where it ends. */
  const setAtmosphere = (g: Grid, average: RGB) => {
    const near = lit(average);
    const deep = mix(average, shade, T.depth);
    const feature = g.size * NOISE_CELLS * 2;
    for (let i = 0; i < g.owner.length; i++) {
      const w = clamp01(g.sweep[i] * 1.1 - 0.05 + 0.5 * (valueNoise(g.x[i] / feature, g.y[i] / feature, 97) - 0.5));
      for (let k = 0; k < 3; k++) {
        const page = lerp(g.from[i * 3 + k], average[k], 0.5);
        g.midTarget[i * 3 + k] = lerp(page, lerp(near[k], deep[k], w), T.tint) * g.tone[i];
      }
    }
  };

  /** Screen B is in place: read it, and pull the leading side of the gradient towards its colours. */
  const takeNextScreen = (g: Grid) => {
    const average = sampleScreen(g, g.to, mobile);
    const warm = lit(average);
    for (let i = 0; i < g.owner.length; i++) {
      const near = 1 - sstep(0.1, 0.9, g.sweep[i]);
      for (let k = 0; k < 3; k++) {
        const next = lerp(lerp(g.to[i * 3 + k], average[k], 0.5), warm[k], T.tint) * g.tone[i];
        g.midTarget[i * 3 + k] = lerp(g.midTarget[i * 3 + k], next, near);
      }
    }
    settling = true;
  };

  const draw = (dt: number) => {
    const g = grid;
    if (!g || !pixelImage) return;
    const arrived = arrivedAt(cover);
    const departed = departedAt(reveal);
    const n = g.owner.length;
    const { arrive, depart, fade, from, to, mid, midTarget } = g;
    const lead = T.bleed;

    if (settling) {
      const k = 1 - Math.exp(-dt / MID_EASE);
      let far = 0;
      for (let i = 0; i < mid.length; i++) {
        const gap = midTarget[i] - mid[i];
        mid[i] += gap * k;
        if (gap > far || -gap > far) far = Math.abs(gap);
      }
      settling = far > 0.5;
    }

    // Pixels: page colours as they arrive, the gradient while they stay, the next page's colours as they go.
    const px = pixelImage.data;
    const shimmer = T.texture * 0.5 * calm;
    for (let i = 0; i < n; i++) {
      const at = arrive[i];
      const out = lead + depart[i];
      const alpha = sstep(at, at + fade[i], arrived) * (1 - sstep(out, out + fade[i], departed));
      const toMid = sstep(at + 0.04, at + lead, arrived);
      const toNext = sstep(depart[i], out - 0.04, departed);
      const lift = shimmer ? 1 + shimmer * Math.sin(clock * 0.004 + g.phase[i]) : 1;
      const p = i * 4;
      const c = i * 3;
      px[p] = lerp(lerp(from[c], mid[c] * lift, toMid), to[c], toNext);
      px[p + 1] = lerp(lerp(from[c + 1], mid[c + 1] * lift, toMid), to[c + 1], toNext);
      px[p + 2] = lerp(lerp(from[c + 2], mid[c + 2] * lift, toMid), to[c + 2], toNext);
      px[p + 3] = alpha * 255;
    }
    pixelCtx.putImageData(pixelImage, 0, 0);

    // Loose pixels: early in, late out, a few px adrift.
    fragmentCtx.clearRect(0, 0, g.width, g.height);
    for (const f of g.fragments) {
      const at = arrive[f.cell];
      const out = lead + depart[f.cell];
      if (arrived >= at + fade[f.cell] && departed <= out) continue; // its cell is solid, nothing to add
      const shown = sstep(at - f.early, at - f.early * 0.4, arrived) * (1 - sstep(out + f.late * 0.4, out + f.late, departed));
      if (shown < 0.01) continue;
      const away = 1 - sstep(at - f.early, at + fade[f.cell], arrived);
      const gone = sstep(out, out + f.late, departed);
      const x = f.x + f.inX * away * away + f.outX * gone;
      const y = f.y + f.inY * away * away + f.outY * gone;
      const p = f.cell * 4;
      fragmentCtx.globalAlpha = shown * 0.9;
      fragmentCtx.fillStyle = `rgb(${px[p]},${px[p + 1]},${px[p + 2]})`;
      fragmentCtx.fillRect(x, y, f.size, f.size);
    }
    fragmentCtx.globalAlpha = 1;
  };

  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    phase = "idle";
    grid = pixelImage = null;
    waiting = null;
    released = false;
    root.style.visibility = "hidden";
    // Give the canvas memory back until the next transition.
    for (const canvas of Object.values(canvases)) canvas.width = canvas.height = 0;
  };

  const tick = (now: number) => {
    const g = grid;
    if (!g) return;
    // Capped, so a tab coming back from the background does not jump; a slow device still keeps to the durations.
    const dt = Math.min(100, now - last);
    last = now;
    clock += dt;

    cover = Math.min(1, cover + dt / T.coverMs);
    if (phase === "reveal") reveal = Math.min(1, reveal + dt / revealMs);
    else if (phase === "recover") {
      reveal = Math.max(0, reveal - dt / (T.coverMs * 0.6));
      if (reveal === 0) phase = "cover";
    }

    if (phase === "cover" && arrivedAt(cover) >= COVERED) {
      calm = Math.min(1, calm + dt / 500);
      if (waiting) {
        const run = waiting;
        waiting = null;
        run();
      } else if (released) {
        released = false;
        calm = 0;
        takeNextScreen(g);
        phase = "reveal";
      }
    }

    draw(dt);
    if (phase === "reveal" && reveal === 1) stop();
    else raf = requestAnimationFrame(tick);
  };

  const begin = (o: CoverOptions) => {
    const width = root.clientWidth;
    const height = root.clientHeight;
    if (!width || !height) return false;
    mobile = window.matchMedia(MOBILE_QUERY).matches;
    const g = (grid = buildGrid(width, height, o.axis, ++seed, mobile));

    if (o.flat) {
      const flat = rgb(o.flat);
      for (let i = 0; i < g.from.length; i++) g.from[i] = flat[i % 3];
      setAtmosphere(g, flat);
    } else setAtmosphere(g, sampleScreen(g, g.from, mobile));
    // Covering at once shows the screen's own colours first and eases into the gradient from there.
    g.mid.set(o.instant ? g.from : g.midTarget);
    g.to.set(g.mid);
    settling = !!o.instant;

    const place = (canvas: HTMLCanvasElement, w: number, h: number, cssW: number, cssH: number, y: number) => {
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      canvas.style.top = `${y}px`;
    };
    place(canvases.pixels, g.cols, g.rows, g.cols * g.size, g.rows * g.size, g.top);
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    place(canvases.fragments, Math.round(width * dpr), Math.round(height * dpr), width, height, 0);
    fragmentCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    pixelImage = pixelCtx.createImageData(g.cols, g.rows);

    phase = "cover";
    cover = o.instant ? 1 : 0;
    reveal = 0;
    calm = 0;
    revealMs = o.revealMs ?? T.revealMs;
    root.style.visibility = "visible";
    // Draw right away, so an instant cover is on screen before anything changes under it.
    draw(0);
    last = performance.now();
    raf = requestAnimationFrame(tick);
    return true;
  };

  return {
    cover(o) {
      released = false;
      waiting = o.onCovered ?? null;
      if (phase === "reveal") phase = "recover";
      else if (phase === "idle" && !begin(o)) {
        // Nothing to draw on: just let the navigation through.
        waiting = null;
        o.onCovered?.();
      }
    },
    release() {
      if (phase !== "idle") released = true;
    },
    destroy: stop,
  };
}
