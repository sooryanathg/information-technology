"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { hash, useBootPhase, usePrefersReducedMotion } from "@/lib/intro";
import { blurredCover } from "@/lib/pixelate";
import {
  FRAME_COLOR,
  frameGeometry,
  frameLayout,
  paged,
  risen,
  risenLead,
  tilePosition,
  type FrameGeometry,
} from "@/lib/pixelFrame";

const START_DELAY = 1000; // once the photo has sharpened
const ROW_STAGGER = 55;
const JITTER = 160;

// Blurred copy of the photo that the tiles are cut from
const BLUR = 18; // px of the photo averaged into each sample
const LIFT = 0.1; // white mixed in, so the tiles read as frosted rather than just soft
// The tiles sit above the hero's dark overlays, which makes them glare against
// the bright sky at the top. This shades the top of the blurred copy back down.
const TOP_SHADE = "rgb(47 41 37 / 0.42)";
const TOP_SHADE_REACH = 0.4; // share of the hero height over which the shade fades out

// Idle shimmer
const SHIMMER_SHARE = 0.18; // share of the dithered tiles that drop out and fall back in
const SHIMMER_MIN = 9000; // ms, each tile's own cycle
const SHIMMER_MAX = 20000;

// Soft shadow under the tiles, so they read as blocks lying on the photo.
const SHADOW = "[filter:drop-shadow(0_2px_5px_rgb(43_33_25/0.3))]";

// Scroll rise
const RISE = 0.65; // px the band climbs per px scrolled, on top of the scroll itself
const LEAD_TINT = 0.4; // page colour mixed into the tiles running ahead of the band, so they stand out
const RISE_STEPS = 4; // the band moves in 1/4-tile steps

// Cursor trail
const TRAIL_FADE = 800; // ms for a tile under the mouse to come back into focus
const TRAIL_REACH = 0; // tiles around the one under the mouse that blur fully with it
const TRAIL_STRENGTH = 0.7; // how far a tile goes out of focus at most
const TRAIL_LEVELS = 5; // in visible steps instead of smoothly, for the pixel feel
const TRAIL_SCATTER = 3; // tiles further out that may blur too, per step

type Tile = { key: number; x: number; y: number; delay: number; className: string; shimmer?: [number, number] };

type Props = {
  /** The hero's background <img>; the tiles show a blurred copy of it. */
  imgRef: RefObject<HTMLImageElement | null>;
  /** Colour behind the photo and the photo's opacity, to blur the same picture the hero shows. */
  background: string;
  alpha?: number;
};

/**
 * Pixel frame along the bottom of the hero and behind the logo. Every tile is
 * a window onto a blurred copy of the hero photo, so the frame looks like the
 * photo going out of focus in blocks. The tiles step in from the edges.
 *
 * At rest the dithered edge shimmers: some of its tiles drop out and fall back
 * into place, and a few more fall into empty cells for a while. While
 * scrolling, the bottom band climbs over the hero (content included), so the
 * whole hero blurs from the bottom up.
 *
 * Along the very bottom the tiles go one step further, to the colour of the
 * page below, and that edge follows the rising band. So the hero blends into
 * the next section: sharp photo, blurred tiles, page.
 *
 * The mouse leaves a trail of the same blurred tiles, which step back into
 * focus behind it. This replaces the site's off-white cursor trail over the
 * hero: PixelCursor leaves out whatever lies under `[data-pixel-frame]`.
 */
export default function PixelFrame({ imgRef, background, alpha = 1 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const riseRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);
  const [geo, setGeo] = useState<FrameGeometry | null>(null);
  const [glass, setGlass] = useState<{ canvas: HTMLCanvasElement; url: string } | null>(null);
  const phase = useBootPhase();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setGeo((prev) =>
        prev && prev.width === width && prev.height === height ? prev : frameGeometry(width, height)
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Blurred copy of the photo, cropped exactly like the hero crops it.
  useEffect(() => {
    const img = imgRef.current;
    if (!img || !geo) return;
    const make = () => {
      if (!img.complete || !img.naturalWidth) return;
      const canvas = blurredCover(img, geo.width, geo.height, BLUR, { background, alpha, lift: LIFT });
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const shade = ctx.createLinearGradient(0, 0, 0, canvas.height * TOP_SHADE_REACH);
      shade.addColorStop(0, TOP_SHADE);
      shade.addColorStop(1, "transparent");
      ctx.fillStyle = shade;
      ctx.fillRect(0, 0, canvas.width, canvas.height * TOP_SHADE_REACH);
      setGlass({ canvas, url: canvas.toDataURL("image/jpeg", 0.85) });
    };
    const raf = requestAnimationFrame(make);
    img.addEventListener("load", make);
    return () => {
      cancelAnimationFrame(raf);
      img.removeEventListener("load", make);
    };
  }, [imgRef, geo, background, alpha]);

  // Bottom edge in the page colour, and on scroll the risen tiles filled with
  // the blurred photo, with that edge following them up.
  useEffect(() => {
    const el = ref.current;
    const canvas = riseRef.current;
    const ctx = canvas?.getContext("2d");
    if (!el || !canvas || !ctx || !geo) return;
    const { size, cols, rows } = geo;
    canvas.width = cols * size;
    canvas.height = rows * size;

    let raf = 0;
    let drawn = -1;
    const draw = () => {
      raf = 0;
      const scrolled = reduced ? 0 : Math.max(0, -el.getBoundingClientRect().top);
      if (scrolled >= geo.height) return; // hero is out of view
      const front = Math.floor(((scrolled * RISE) / size) * RISE_STEPS) / RISE_STEPS;
      if (front === drawn) return;
      drawn = front;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const fill = (on: typeof risen) => {
        for (let c = 0; c < cols; c++) {
          for (let k = 0; k < rows; k++) {
            if (on(geo, c, k, front)) ctx.fillRect(c * size, (rows - 1 - k) * size, size, size);
          }
        }
      };
      if (front && glass) {
        fill(risen);
        // Keep the blurred photo only where a tile was filled.
        ctx.globalCompositeOperation = "source-in";
        ctx.drawImage(glass.canvas, 0, canvas.height - geo.height, geo.width, geo.height);
        ctx.globalCompositeOperation = "source-over";
        // The tiles running ahead of the band lean to the page colour, most
        // where they have only just switched on.
        ctx.fillStyle = FRAME_COLOR;
        for (let c = 0; c < cols; c++) {
          for (let k = 0; k < rows; k++) {
            const lead = risenLead(geo, c, k, front);
            if (!lead) continue;
            ctx.globalAlpha = lead * LEAD_TINT;
            ctx.fillRect(c * size, (rows - 1 - k) * size, size, size);
          }
        }
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = FRAME_COLOR;
      fill(paged);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    draw();
    if (reduced) return;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [geo, glass, reduced]);

  // Cursor trail: the tiles the mouse passes over go out of focus, then step back.
  useEffect(() => {
    const el = ref.current;
    const canvas = trailRef.current;
    const ctx = canvas?.getContext("2d");
    if (!el || !canvas || !ctx || !geo || !glass || reduced) return;
    const { size, cols, rows } = geo;
    canvas.width = cols * size;
    canvas.height = rows * size;
    const top = canvas.height - geo.height; // of the hero within the canvas
    const fx = glass.canvas.width / geo.width;
    const fy = glass.canvas.height / geo.height;

    const tiles = new Map<number, number>(); // tile -> blur 0..1
    let raf = 0;
    let last = 0;
    let prev: { x: number; y: number } | null = null;

    const blur = (c: number, r: number, v: number) => {
      if (c < 0 || r < 0 || c >= cols || r >= rows) return;
      const k = r * cols + c;
      if ((tiles.get(k) ?? 0) < v) tiles.set(k, v);
    };

    const frame = (now: number) => {
      const dt = last ? now - last : 16;
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const [k, v] of tiles) {
        const next = v - dt / TRAIL_FADE;
        if (next <= 0) {
          tiles.delete(k);
          continue;
        }
        tiles.set(k, next);
        const x = (k % cols) * size;
        const y = Math.floor(k / cols) * size;
        ctx.globalAlpha = (Math.ceil(next * TRAIL_LEVELS) / TRAIL_LEVELS) * TRAIL_STRENGTH;
        ctx.drawImage(glass.canvas, x * fx, (y - top) * fy, size * fx, size * fy, x, y, size, size);
      }
      ctx.globalAlpha = 1;
      if (tiles.size) raf = requestAnimationFrame(frame);
      else {
        raf = 0;
        last = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const box = el.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      if (x < 0 || y < 0 || x >= box.width || y >= box.height) {
        prev = null;
        return;
      }
      // Fill in the path between events so fast moves leave a continuous trail.
      const from = prev ?? { x, y };
      const steps = Math.max(1, Math.ceil(Math.hypot(x - from.x, y - from.y) / size));
      for (let i = 1; i <= steps; i++) {
        const c = Math.floor((from.x + ((x - from.x) * i) / steps) / size);
        const r = Math.floor((from.y + ((y - from.y) * i) / steps + top) / size);
        for (let dr = -TRAIL_REACH; dr <= TRAIL_REACH; dr++) {
          for (let dc = -TRAIL_REACH; dc <= TRAIL_REACH; dc++) blur(c + dc, r + dr, 1);
        }
        for (let s = 0; s < TRAIL_SCATTER; s++) {
          if (Math.random() < 0.5) {
            blur(
              c + Math.round((Math.random() - 0.5) * 4),
              r + Math.round((Math.random() - 0.5) * 4),
              0.35 + Math.random() * 0.35
            );
          }
        }
      }
      prev = { x, y };
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [geo, glass, reduced]);

  const visible = phase !== "pending" && geo && glass;
  const animate = !reduced;

  const tiles: Tile[] = [];
  if (visible) {
    const layout = frameLayout(geo);
    const place = (idx: number) => {
      const c = idx % geo.cols;
      const r = Math.floor(idx / geo.cols);
      return { key: idx, r, ...tilePosition(geo, c, r) };
    };
    // Each falling tile runs its own cycle, started part-way through so they
    // never sync up. All the movement sits in the last 30% of the cycle, which
    // no tile starts in, so the frame is whole at first.
    const shimmer = (idx: number): [number, number] => {
      const duration = SHIMMER_MIN + hash(idx * 3 + 11) * (SHIMMER_MAX - SHIMMER_MIN);
      return [duration, -hash(idx * 7 + 29) * duration * 0.68];
    };

    for (const idx of layout.tiles) {
      const { key, r, x, y } = place(idx);
      const blinks = animate && layout.dither.has(idx) && hash(idx * 13 + 5) < SHIMMER_SHARE;
      // Step in outward from whichever edge (top or bottom) the tile belongs to.
      const fromEdge = Math.min(geo.rows - 1 - r, r);
      tiles.push({
        key,
        x,
        y,
        delay: START_DELAY + fromEdge * ROW_STAGGER + hash(idx) * JITTER,
        className: `${animate ? "pixel-tile-in" : ""} ${blinks ? "pixel-shimmer" : ""}`,
        shimmer: blinks ? shimmer(idx) : undefined,
      });
    }
    if (animate) {
      for (const idx of layout.sparks) {
        const { key, x, y } = place(idx);
        tiles.push({ key, x, y, delay: 0, className: "pixel-spark", shimmer: shimmer(idx) });
      }
    }
  }

  return (
    <>
      <div
        ref={ref}
        data-pixel-frame
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${SHADOW}`}
        style={
          {
            color: FRAME_COLOR, // the falling tiles' ghost trail
            "--tile": `${geo?.size ?? 0}px`,
            "--glass": glass && `url(${glass.url})`,
            "--glass-size": geo && `${geo.width}px ${geo.height}px`,
          } as React.CSSProperties
        }
      >
        {tiles.map((t) => (
          <span
            key={t.key}
            className={`pixel-glass absolute ${t.className}`}
            style={
              {
                left: t.x,
                top: t.y,
                width: (geo?.size ?? 0) + 1,
                height: (geo?.size ?? 0) + 1,
                backgroundPosition: `${-t.x}px ${-t.y}px`,
                "--tile-delay": `${Math.round(t.delay)}ms`,
                "--shimmer-duration": t.shimmer && `${Math.round(t.shimmer[0])}ms`,
                "--shimmer-delay": t.shimmer && `${Math.round(t.shimmer[1])}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* z-[5]: like the site's cursor trail, above the photo and below the content. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        <canvas
          ref={trailRef}
          className={`absolute bottom-0 left-0 max-w-none [image-rendering:pixelated] ${SHADOW}`}
          style={geo ? { width: geo.cols * geo.size, height: geo.rows * geo.size } : undefined}
        />
      </div>

      {/* z-20: above the hero content, which the rising band covers too. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <canvas
          ref={riseRef}
          className={`absolute bottom-0 left-0 max-w-none [image-rendering:pixelated] ${SHADOW}`}
          style={geo ? { width: geo.cols * geo.size, height: geo.rows * geo.size } : undefined}
        />
      </div>
    </>
  );
}
