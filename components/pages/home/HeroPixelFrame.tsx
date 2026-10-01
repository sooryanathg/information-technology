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
const RISE = 0.45; // px the band climbs per px scrolled, on top of the scroll itself
const RISE_STEPS = 4; // the band moves in 1/4-tile steps

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
 */
export default function HeroPixelFrame({ imgRef, background, alpha = 1 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const riseRef = useRef<HTMLCanvasElement>(null);
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
