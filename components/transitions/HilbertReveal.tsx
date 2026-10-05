"use client";

import { useLayoutEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/intro";
import { hilbertPath } from "@/lib/hilbert";

const GRID = 16; // cells per side of the curve's square
const PATH = hilbertPath(GRID);
const DURATION = 1300; // ms for the curve to cross one target
const STAGGER = 150; // ms between targets starting
const TAIL = 18; // cells of fading trail behind the head of the curve
const TRAIL_COLOR = "#cb9437";

/** ms after `play` at which target `i` is about half uncovered. */
export function revealMidpoint(i: number) {
  return i * STAGGER + DURATION / 2;
}

/**
 * Hides its (positioned) parent, then uncovers it piece by piece: each
 * `[data-reveal]` element inside, together with the padding and gaps around
 * it, appears in square pixels along a Hilbert curve, one element after
 * another, with a short gold trail behind the head of the curve. The parent is
 * masked rather than painted over, so whatever lies behind it shows until then.
 * `play` false hides the parent; toggling it replays the reveal.
 */
export default function HilbertReveal({ play }: { play: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d");
    if (!canvas || !parent || !ctx || !mctx || reduced) return;

    const setMask = (on: boolean) => {
      const value = on ? `url(${mask.toDataURL()})` : "";
      parent.style.maskImage = parent.style.webkitMaskImage = value;
      parent.style.maskSize = parent.style.webkitMaskSize = on ? "100% 100%" : "";
      parent.style.maskRepeat = parent.style.webkitMaskRepeat = on ? "no-repeat" : "";
    };
    const cleanup = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setMask(false);
    };

    if (!play) {
      // Nothing of the parent shows until the reveal starts.
      mask.width = mask.height = 1;
      setMask(true);
      return cleanup;
    }

    const dpr = window.devicePixelRatio || 1;
    const box = parent.getBoundingClientRect();
    canvas.width = Math.round(box.width * dpr);
    canvas.height = Math.round(box.height * dpr);
    mask.width = Math.ceil(box.width);
    mask.height = Math.ceil(box.height);

    const targets = [...parent.querySelectorAll<HTMLElement>("[data-reveal]")].map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height };
    });
    // Grow every target by the parent's padding, which also spans the gaps, so
    // the parent's own background arrives with it.
    const pad = targets[0]?.x ?? 0;
    const regions = targets.map((r) => {
      const x = Math.max(0, r.x - pad);
      const y = Math.max(0, r.y - pad);
      const w = Math.min(box.width, r.x + r.w + pad) - x;
      const h = Math.min(box.height, r.y + r.h + pad) - y;
      // Square cells; the curve's square is centred on the region and clipped to it.
      const cell = Math.max(w, h) / GRID;
      return { x, y, w, h, cell, ox: x + (w - cell * GRID) / 2, oy: y + (h - cell * GRID) / 2 };
    });
    const total = Math.max(0, regions.length - 1) * STAGGER + DURATION;

    const draw = (elapsed: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      mctx.clearRect(0, 0, mask.width, mask.height);
      regions.forEach((r, i) => {
        const t = Math.min(1, Math.max(0, (elapsed - i * STAGGER) / DURATION));
        if (t <= 0) return;
        if (t >= 1) {
          mctx.fillRect(Math.floor(r.x), Math.floor(r.y), Math.ceil(r.w) + 1, Math.ceil(r.h) + 1);
          return;
        }
        // Cell `j` of the path as a rectangle at `scale`, with edges rounded so neighbours meet.
        const rect = (j: number, scale: number) => {
          const [cx, cy] = PATH[j];
          const gx = i % 2 ? GRID - 1 - cx : cx; // mirror every other target
          const x0 = Math.round((r.ox + gx * r.cell) * scale);
          const y0 = Math.round((r.oy + cy * r.cell) * scale);
          return [
            x0,
            y0,
            Math.round((r.ox + (gx + 1) * r.cell) * scale) - x0,
            Math.round((r.oy + (cy + 1) * r.cell) * scale) - y0,
          ] as const;
        };
        const eased = t * t * (3 - 2 * t);
        const head = eased * (PATH.length + TAIL);
        const shown = Math.min(PATH.length, Math.ceil(head));

        mctx.save();
        mctx.beginPath();
        mctx.rect(r.x, r.y, r.w, r.h);
        mctx.clip();
        for (let j = 0; j < shown; j++) mctx.fillRect(...rect(j, 1));
        mctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.rect(r.x * dpr, r.y * dpr, r.w * dpr, r.h * dpr);
        ctx.clip();
        ctx.fillStyle = TRAIL_COLOR;
        for (let j = Math.max(0, shown - TAIL); j < shown; j++) {
          ctx.globalAlpha = Math.max(0, 1 - (head - j) / TAIL);
          ctx.fillRect(...rect(j, dpr));
        }
        ctx.restore();
      });
      setMask(true);
    };

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      const elapsed = now - start;
      if (elapsed >= total) {
        cleanup();
        return;
      }
      draw(elapsed);
      raf = requestAnimationFrame(frame);
    };
    // Mask the parent before the first paint, so it never flashes whole.
    draw(0);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, [play, reduced]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
