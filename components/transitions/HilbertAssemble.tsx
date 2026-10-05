"use client";

import { useLayoutEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/intro";
import { hilbertPath } from "@/lib/hilbert";

const ROWS = 4; // cells down a target; a 4 x 4 Hilbert square is repeated along its width
const SQUARE = hilbertPath(ROWS);
const DURATION = 1400; // ms for the curve to run the length of one target
const FALL = 5; // cells a pixel falls before it lands
const FALL_MS = 220;
const TAIL = 10; // cells' worth of time a freshly landed pixel keeps glowing
const HEADROOM = FALL + 3; // cells of canvas above the first target, for the falling pixels
const GLOW_COLOR = "#cb9437";

type Props = {
  play: boolean;
  /** ms after `play` before the first target starts, and between targets. */
  delay?: number;
  stagger?: number;
  /** Colour of the falling pixels: the targets' own background. */
  color: string;
};

/**
 * Builds every `[data-assemble]` element inside its (positioned) parent out of
 * falling pixels: they drop in one after another and land along a Hilbert
 * curve that runs the length of the element, each landed pixel uncovering that
 * piece of it. Until `play`, and while pixels are still missing, the element
 * is masked accordingly.
 */
export default function HilbertAssemble({ play, delay = 0, stagger = 200, color }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx || reduced) return;

    const targets = [...parent.querySelectorAll<HTMLElement>("[data-assemble]")];
    const setMask = (el: HTMLElement, url: string | null) => {
      const value = url ?? "";
      el.style.maskImage = value;
      el.style.webkitMaskImage = value;
      el.style.maskSize = el.style.webkitMaskSize = url ? "100% 100%" : "";
      el.style.maskRepeat = el.style.webkitMaskRepeat = url ? "no-repeat" : "";
    };
    const clear = () => targets.forEach((el) => setMask(el, null));
    if (!play) return clear;

    const dpr = window.devicePixelRatio || 1;
    const box = canvas.getBoundingClientRect();
    canvas.width = Math.round(box.width * dpr);
    canvas.height = Math.round(box.height * dpr);

    const items = targets.map((el, i) => {
      const r = el.getBoundingClientRect();
      const cell = r.height / ROWS;
      const squares = Math.ceil(r.width / cell / ROWS);
      // Each square's curve ends next to where the following one starts, so
      // together they form one unbroken path from left to right.
      const path = Array.from({ length: squares }, (_, s) =>
        SQUARE.map(([x, y]) => [s * ROWS + x, y] as const)
      ).flat();
      const mask = document.createElement("canvas");
      mask.width = Math.ceil(r.width);
      mask.height = Math.ceil(r.height);
      return {
        el,
        x: r.left - box.left,
        y: r.top - box.top,
        w: r.width,
        h: r.height,
        cell,
        path,
        mask,
        landed: -1,
        start: delay + i * stagger,
        step: DURATION / path.length,
      };
    });
    const total = Math.max(0, ...items.map((it) => it.start + DURATION + FALL_MS + TAIL * it.step));

    // Device pixels, so neighbouring cells meet exactly.
    const px = (v: number) => Math.round(v * dpr);
    const draw = (elapsed: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const it of items) {
        const { cell, path } = it;
        // A pixel starts falling at j * step and lands FALL_MS later.
        const t = elapsed - it.start;
        const landed = Math.min(path.length, Math.max(0, Math.floor((t - FALL_MS) / it.step) + 1));

        if (landed !== it.landed) {
          const mctx = it.mask.getContext("2d");
          if (mctx) {
            for (let j = Math.max(0, it.landed); j < landed; j++) {
              const [cx, cy] = path[j];
              const x0 = Math.round(cx * cell);
              const y0 = Math.round(cy * cell);
              mctx.fillRect(x0, y0, Math.round((cx + 1) * cell) - x0, Math.round((cy + 1) * cell) - y0);
            }
            setMask(it.el, `url(${it.mask.toDataURL()})`);
          }
          it.landed = landed;
        }
        if (t < 0) continue;

        const block = (cx: number, cy: number, alpha: number) => {
          const x0 = px(it.x + cx * cell);
          const y0 = px(it.y + cy * cell);
          ctx.globalAlpha = alpha;
          ctx.fillRect(x0, y0, px(it.x + (cx + 1) * cell) - x0, px(it.y + (cy + 1) * cell) - y0);
        };
        ctx.save();
        ctx.beginPath();
        ctx.rect(px(it.x), 0, px(it.x + it.w) - px(it.x), px(it.y + it.h));
        ctx.clip();

        // Freshly landed cells glow and fade.
        ctx.fillStyle = GLOW_COLOR;
        const glowMs = TAIL * it.step;
        for (let j = landed - 1; j >= 0; j--) {
          const age = t - FALL_MS - j * it.step;
          if (age >= glowMs) break;
          block(path[j][0], path[j][1], 0.85 * (1 - age / glowMs));
        }
        // Falling pixels, a cell at a time, each trailing two ghosts.
        ctx.fillStyle = color;
        for (let j = landed; j < path.length; j++) {
          const fallen = (t - j * it.step) / FALL_MS;
          if (fallen < 0) break;
          const above = Math.ceil((1 - fallen) * FALL);
          const [cx, cy] = path[j];
          block(cx, cy - above, 0.9);
          block(cx, cy - above - 1, 0.4);
          block(cx, cy - above - 2, 0.15);
        }
        ctx.restore();
      }
    };

    let raf = 0;
    const startedAt = performance.now();
    const frame = (now: number) => {
      const elapsed = now - startedAt;
      if (elapsed >= total) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        clear();
        return;
      }
      draw(elapsed);
      raf = requestAnimationFrame(frame);
    };
    // Mask the targets before the first paint, so they never flash whole.
    draw(0);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clear();
    };
  }, [play, reduced, delay, stagger, color]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 w-full"
      style={{ top: `-${HEADROOM * 14}px`, height: `calc(100% + ${HEADROOM * 14}px)` }}
    />
  );
}
