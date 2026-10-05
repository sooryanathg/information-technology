"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/intro";
import { HILBERT_ROW, strokeHilbertRow, strokeHilbertRunners } from "@/lib/hilbert";
import { pageTileSize } from "@/lib/pixelFrame";

const FPS = 20;

/**
 * Background of Hilbert curves, the line counterpart of the cream sections'
 * checks: squares of the curve side by side, each running into the next, on a
 * grid the size of the hero's pixel-frame tiles. A few gold runners follow the
 * lines. Covers its (positioned) parent, behind any content that is stacked
 * above it.
 */
export default function HilbertLines() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    const lines = document.createElement("canvas");
    const lctx = lines.getContext("2d");
    if (!canvas || !host || !ctx || !lctx) return;

    let width = 0;
    let height = 0;
    let cell = 0;
    let rows = 0;

    const measure = () => {
      const dpr = window.devicePixelRatio || 1;
      width = host.clientWidth;
      height = host.clientHeight;
      cell = pageTileSize();
      rows = Math.ceil(height / (cell * HILBERT_ROW));
      for (const [c, context] of [[canvas, ctx], [lines, lctx]] as const) {
        c.width = Math.round(width * dpr);
        c.height = Math.round(height * dpr);
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      // The lines themselves never change, so they are drawn once.
      for (let row = 0; row < rows; row++) strokeHilbertRow(lctx, row, cell, width);
      draw();
    };

    const draw = () => {
      // Nothing to draw on while the host has no size, e.g. as its page is leaving.
      if (!lines.width || !lines.height) return;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(lines, 0, 0, width, height);
      if (reduced) return;
      for (let row = 0; row < rows; row++) strokeHilbertRunners(ctx, row, cell, width, performance.now());
    };

    // Only tick while some of the host is on screen.
    let timer = 0;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      timer = entry.isIntersecting && !reduced ? window.setInterval(draw, 1000 / FPS) : 0;
    });
    io.observe(host);
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    return () => {
      clearInterval(timer);
      io.disconnect();
      ro.disconnect();
    };
  }, [reduced]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
