"use client";

import { useEffect, useRef } from "react";
import { FRAME_COLOR } from "@/lib/pixelFrame";

const GRID = 12; // px, cells snap to this grid
const FADE_MS = 750; // how long a lit cell takes to fade out
const LEVELS = 5; // fade in visible steps instead of smoothly, for the pixel feel
const MAX_ALPHA = 0.7;
const SCATTER = 3; // neighbour cells lit around the cursor, per step
const MAX_CELLS = 600;

/**
 * Site-wide pixel trail: grid cells under the mouse light up in the frame's
 * off-white with a soft gold glow (so they still read on light sections) and
 * fade out in steps. Mouse only; off for reduced motion.
 */
export default function PixelCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Touch and pen are filtered per event (pointerType), which also keeps the
    // trail working on touchscreen laptops when a mouse is used.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cells = new Map<number, number>(); // key -> intensity 0..1
    const key = (cx: number, cy: number) => cx * 100000 + cy;
    let raf = 0;
    let last = 0;
    let prev: { x: number; y: number } | null = null;

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const light = (cx: number, cy: number, v: number) => {
      if (cx < 0 || cy < 0) return;
      const k = key(cx, cy);
      if ((cells.get(k) ?? 0) < v) cells.set(k, v);
    };

    const frame = (now: number) => {
      const dt = last ? now - last : 16;
      last = now;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = FRAME_COLOR;
      for (const [k, v] of cells) {
        const next = v - dt / FADE_MS;
        if (next <= 0) {
          cells.delete(k);
          continue;
        }
        cells.set(k, next);
        const cx = Math.floor(k / 100000);
        const cy = k - cx * 100000;
        ctx.globalAlpha = (Math.ceil(next * LEVELS) / LEVELS) * MAX_ALPHA;
        ctx.fillRect(cx * GRID, cy * GRID, GRID, GRID);
      }
      ctx.globalAlpha = 1;
      if (cells.size) raf = requestAnimationFrame(frame);
      else {
        raf = 0;
        last = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const x = e.clientX;
      const y = e.clientY;
      // Fill in the path between events so fast moves leave a continuous trail.
      const from = prev ?? { x, y };
      const steps = Math.max(1, Math.ceil(Math.hypot(x - from.x, y - from.y) / GRID));
      for (let i = 1; i <= steps; i++) {
        const px = from.x + ((x - from.x) * i) / steps;
        const py = from.y + ((y - from.y) * i) / steps;
        const cx = Math.floor(px / GRID);
        const cy = Math.floor(py / GRID);
        light(cx, cy, 1);
        for (let s = 0; s < SCATTER; s++) {
          if (Math.random() < 0.5) {
            const dx = Math.round((Math.random() - 0.5) * 4);
            const dy = Math.round((Math.random() - 0.5) * 4);
            light(cx + dx, cy + dy, 0.35 + Math.random() * 0.35);
          }
        }
      }
      prev = { x, y };
      if (cells.size > MAX_CELLS) {
        // Drop the oldest entries (Map keeps insertion order).
        const extra = cells.size - MAX_CELLS;
        let n = 0;
        for (const k of cells.keys()) {
          if (n++ >= extra) break;
          cells.delete(k);
        }
      }
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onLeave = () => (prev = null);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // z-[5]: above section backgrounds and the pixel frame, below content
      // layers (z-10+) such as hero text and buttons, so it never covers text.
      className="pointer-events-none fixed inset-0 z-[5] h-full w-full [filter:blur(0.4px)_drop-shadow(0_0_5px_rgba(203,148,55,0.85))]"
    />
  );
}
