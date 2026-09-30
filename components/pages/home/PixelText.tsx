"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/intro";

// Auto sweep
const SWEEP_MIN = 5000;
const SWEEP_MAX = 7000;
const SWEEP_MS = 3000; // must match .heading-sweep in globals.css

// Gold pixels under the cursor
const CELL = 8; // px per mask cell
const RADIUS = 4; // cells; inner half is solid, outer half dithers
const FADE_MS = 700; // fade back once the cursor has left the text
const LEVELS = 4;
const REACH = 24; // px around the text where the cursor still counts as on it
const GLOW_COLOR = "#e3ae55";

type Props = {
  as?: "h1" | "p";
  /** What is actually shown and read (e.g. the decoding heading). */
  children: ReactNode;
  /** The same text with the same line breaks, used for the effect layers. */
  layout: ReactNode;
  play: boolean;
  /** ms after `play` before the first sweep and before hover is armed. */
  startDelay?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Text with two pixel effects on top of it:
 * - a gold pixel band that sweeps across the letters every 5-7 s and on hover,
 * - letters turning gold in a blocky, dithered patch under the cursor. The gold
 *   stays while the cursor is on the text and fades back once it leaves.
 */
export default function PixelText({
  as: Tag = "p",
  children,
  layout,
  play,
  startDelay = 3000,
  className = "",
  style,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const [sweepId, setSweepId] = useState(0);
  const lastSweep = useRef(0);
  const enabled = play && !reduced;

  // Auto sweep on a slightly irregular 5-7 s rhythm.
  useEffect(() => {
    if (!enabled) return;
    let timer = 0;
    const schedule = (delay: number) => {
      timer = window.setTimeout(() => {
        lastSweep.current = performance.now();
        setSweepId((n) => n + 1);
        schedule(SWEEP_MIN + Math.random() * (SWEEP_MAX - SWEEP_MIN));
      }, delay);
    };
    schedule(startDelay);
    return () => clearTimeout(timer);
  }, [enabled, startDelay]);

  // Hover: replay the sweep straight away, unless one is already running.
  const onPointerEnter = () => {
    if (!enabled) return;
    const now = performance.now();
    if (now - lastSweep.current < SWEEP_MS + 200) return;
    lastSweep.current = now;
    setSweepId((n) => n + 1);
  };

  // Gold pixels under the cursor.
  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const glow = glowRef.current;
    if (!root || !glow) return;

    const mask = document.createElement("canvas");
    const ctx = mask.getContext("2d");
    if (!ctx) return;

    const cells = new Map<number, number>(); // index -> intensity
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let last = 0;
    let inside = false;
    let armedAt = performance.now() + startDelay - 1000; // let the intro finish

    const draw = () => {
      ctx.clearRect(0, 0, cols, rows);
      ctx.fillStyle = "#000";
      for (const [i, v] of cells) {
        ctx.globalAlpha = Math.ceil(v * LEVELS) / LEVELS;
        ctx.fillRect(i % cols, Math.floor(i / cols), 1, 1);
      }
      ctx.globalAlpha = 1;
      const url = `url(${mask.toDataURL()})`;
      glow.style.maskImage = url;
      glow.style.webkitMaskImage = url;
    };

    // Only fades while the cursor is off the text; stops once nothing is lit.
    const frame = (now: number) => {
      const dt = last ? now - last : 16;
      last = now;
      if (!inside) {
        for (const [i, v] of cells) {
          const next = v - dt / FADE_MS;
          if (next <= 0) cells.delete(i);
          else cells.set(i, next);
        }
      }
      draw();
      if (!inside && cells.size) raf = requestAnimationFrame(frame);
      else {
        raf = 0;
        last = 0;
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const leave = () => {
      if (!inside) return;
      inside = false;
      kick();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || performance.now() < armedAt) return;
      const rect = root.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < -REACH || y < -REACH || x > rect.width + REACH || y > rect.height + REACH) {
        leave();
        return;
      }
      inside = true;

      const c = Math.ceil(rect.width / CELL);
      const r = Math.ceil(rect.height / CELL);
      if (c !== cols || r !== rows) {
        cols = mask.width = c;
        rows = mask.height = r;
        cells.clear();
      }

      const cx = Math.floor(x / CELL);
      const cy = Math.floor(y / CELL);
      for (let dy = -RADIUS; dy <= RADIUS; dy++) {
        for (let dx = -RADIUS; dx <= RADIUS; dx++) {
          const px = cx + dx;
          const py = cy + dy;
          if (px < 0 || py < 0 || px >= cols || py >= rows) continue;
          const d = Math.hypot(dx, dy) / RADIUS;
          if (d > 1) continue;
          // Solid core, dithered edge that thins out towards the rim.
          if (d > 0.5 && Math.random() > (1 - d) * 2) continue;
          const i = py * cols + px;
          const v = d <= 0.5 ? 1 : 0.6;
          if ((cells.get(i) ?? 0) < v) cells.set(i, v);
        }
      }
      // Draw now; no animation loop is needed while the gold is held.
      draw();
    };

    const onWindowLeave = () => leave();

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onWindowLeave);
    window.addEventListener("blur", onWindowLeave);
    return () => {
      armedAt = Infinity;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onWindowLeave);
      window.removeEventListener("blur", onWindowLeave);
    };
  }, [enabled, startDelay]);

  return (
    <Tag
      ref={rootRef as React.Ref<HTMLHeadingElement & HTMLParagraphElement>}
      onPointerEnter={onPointerEnter}
      className={`relative ${className}`}
      style={style}
    >
      {children}

      {enabled && sweepId > 0 && (
        <span key={sweepId} aria-hidden="true" className="heading-sweep pointer-events-none absolute inset-0">
          {layout}
        </span>
      )}

      {enabled && (
        <span
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            color: GLOW_COLOR,
            maskImage: "linear-gradient(transparent, transparent)",
            WebkitMaskImage: "linear-gradient(transparent, transparent)",
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          {layout}
        </span>
      )}
    </Tag>
  );
}
