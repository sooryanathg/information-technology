"use client";

import { useEffect, useRef } from "react";
import { hash, usePrefersReducedMotion } from "@/lib/intro";
import { HILBERT_ROW, strokeHilbertRow, strokeHilbertRunners } from "@/lib/hilbert";
import { pageTileSize } from "@/lib/pixelFrame";

// The checks are the size of the hero's pixel-frame tiles. The row counts and
// the inset below were set for checks of this size and scale with the real one.
const BASE_CELL = 32; // px
const INSET = 2; // px kept clear on every side, so the grid's soft lines stay visible
const FPS = 24;
const FADE_IN = 96; // px from the top over which the checks fade in, like the texture

// Waves: rings of colour that spread from the top-left corner and travel
// diagonally across the checks, strongest near that corner.
const WAVE_LENGTH = 300; // px from one ring to the next
const WAVE_SPEED = 55; // px per second
const WAVE_ALPHA = 0.2; // of a check on the crest of a ring
const WAVE_FALLOFF = 0.55; // share of that lost by the far corner
const WAVE_LEVELS = 6; // shades a check steps through, for the pixel feel
const WAVE_ORIGIN = [-0.08, -0.12]; // of the width and height, so just outside the corner

// Ripples: the mouse drops rings of its own, which spread out and push the
// waves out of step where they pass.
const RIPPLE_GAP = 46; // px the mouse travels between two ripples
const RIPPLE_LIFE = 1700; // ms
const RIPPLE_SPEED = 230; // px per second
const RIPPLE_WIDTH = 30; // px, thickness of the ring
const RIPPLE_SHIFT = 2.6; // radians the waves are pushed out of step on the ring
const RIPPLE_ALPHA = 0.2; // extra colour on the ring itself
const RIPPLES = 10; // at most at once

// Blend into the section below: checks along the bottom turn its colour, more
// of them the lower they sit, and that edge climbs as the section scrolls in.
const BLEND_BASE = 7; // rows (of BASE_CELL) of blend when the next section is only just in view
const BLEND_EDGE = 11; // rows over which the blend thins out
const BLEND_RISE = 0.3; // px the blend climbs per px of the next section in view
const BLEND_MAX = 7; // rows it may climb at most

// Below the blend the next section starts on a chipped edge: solid checks of
// its colour in columns of uneven height, which climb with the blend.
const CHIP_MIN = 1; // checks
const CHIP_MAX = 5;
const CHIP_WIDTH = 2; // columns that share a height, so the edge steps in blocks
const CHIP_RISE = 0.6; // share of the blend's climb the solid edge follows

// Falling blocks, above the blend and below the top edge
const DROP = 6; // checks a block falls
const FALL_MS = 600;
const HOLD_MS = 2600; // how long it stays once landed
const FALL_PERIOD_MIN = 7000;
const FALL_PERIOD_MAX = 16000;
const TOP_ROWS = 6; // rows under the top edge that blocks fall into
const TOP_SHARE = 0.09;
const BOTTOM_SHARE = 0.16;

type RGB = [number, number, number];
// The waves run from the first colour on a crest to the second between crests.
const WAVE_COLORS: [RGB, RGB] = [
  [224, 169, 74],
  [189, 122, 75],
];
const GOLD: RGB = [203, 148, 55];
const TAN: RGB = [205, 164, 116];
const rgb = (c: RGB) => `rgb(${c.join(" ")})`;
const mix = (a: RGB, b: RGB, t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t)) as RGB;

type Props = {
  /** Background colour of the section below, which the bottom checks blend into. */
  below: RGB;
};

/**
 * Brings the checks of the cream background to life. Rings of gold and copper
 * spread from the top-left corner and travel diagonally across the checks,
 * one check a shade; the mouse drops ripples that spread out and push those
 * waves out of step where they pass. Blocks fall
 * in under the top edge, and along the bottom the checks blend into the colour
 * of the section below, down to a chipped edge of solid checks in that colour,
 * with blocks falling onto the blend and both climbing check by check as that
 * section scrolls into view. The solid checks carry on the Hilbert lines of
 * that section (HilbertLines), so its pattern runs right up into the chips.
 * Covers its (positioned) parent, behind any content that is stacked above it.
 */
export default function PixelChecks({ below }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const [br, bg, bb] = below;

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx || reduced) return;

    const target: RGB = [br, bg, bb];
    const ripples: { x: number; y: number; at: number }[] = [];
    let dropped: { x: number; y: number } | null = null; // where the last ripple started

    // Check size: that of the hero's tiles, which also sizes the texture of
    // bg-pixel-cream through --check on the host.
    let cell = BASE_CELL;
    let inset = INSET;
    let side = cell - inset * 2;
    let per = 1; // checks per check of BASE_CELL
    const measure = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      cell = pageTileSize();
      inset = Math.max(1, Math.round((INSET * cell) / BASE_CELL));
      side = cell - inset * 2;
      per = BASE_CELL / cell;
      host.style.setProperty("--check", `${cell}px`);
    };

    const draw = () => {
      const now = performance.now();
      while (ripples.length && now - ripples[0].at > RIPPLE_LIFE) ripples.shift();
      const originX = WAVE_ORIGIN[0] * canvas.width;
      const originY = WAVE_ORIGIN[1] * canvas.height;
      const reach = Math.hypot(canvas.width - originX, canvas.height - originY);
      const travelled = (now / 1000) * WAVE_SPEED;

      const cols = Math.ceil(canvas.width / cell);
      const rows = Math.ceil(canvas.height / cell);
      const inView = Math.max(0, window.innerHeight - canvas.getBoundingClientRect().bottom);
      const front = Math.min(BLEND_MAX * per, (inView * BLEND_RISE) / cell);
      const topRows = TOP_ROWS * per;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // A block dropping into check (c, r) a check at a time, trailing two
      // ghosts, then resting there for a while.
      const faller = (c: number, r: number, seed: number, color: string, alpha: number, inset: number) => {
        const period = FALL_PERIOD_MIN + hash(seed + 41) * (FALL_PERIOD_MAX - FALL_PERIOD_MIN);
        const t = (now + hash(seed + 42) * period) % period;
        if (t >= FALL_MS + HOLD_MS) return;
        const above = t < FALL_MS ? Math.ceil((1 - t / FALL_MS) * DROP) : 0;
        const block = (row: number, a: number) => {
          ctx.globalAlpha = a;
          ctx.fillRect(c * cell + inset, row * cell + inset, cell - inset * 2, cell - inset * 2);
        };
        ctx.fillStyle = color;
        block(r - above, t > FALL_MS + HOLD_MS - 400 ? alpha / 2 : alpha);
        if (above) {
          block(r - above - 1, alpha * 0.45);
          block(r - above - 2, alpha * 0.2);
        }
      };

      const solid = new Path2D(); // the chipped edge, which gets the next section's lines
      for (let r = 0; r < rows; r++) {
        const fade = Math.min(1, (r * cell) / FADE_IN);
        const k = rows - 1 - r; // rows above the bottom edge
        for (let c = 0; c < cols; c++) {
          const seed = c * 131 + r * 977;

          // Blend into the section below. Every check has a fixed threshold, so
          // checks only switch on as the edge climbs and off as it sinks back.
          const chip =
            Math.round(CHIP_MIN + hash(Math.floor(c / CHIP_WIDTH) * 7 + 1) * (CHIP_MAX - CHIP_MIN)) +
            (hash(c * 13 + 5) < 0.3 ? 1 : 0);
          if (k < chip + front * CHIP_RISE) {
            ctx.globalAlpha = 1;
            ctx.fillStyle = rgb(target);
            ctx.fillRect(c * cell, r * cell, cell, cell);
            solid.rect(c * cell, r * cell, cell, cell);
            continue;
          }
          const depth = ((BLEND_BASE + (hash(c * 11 + 3) - 0.5) * 2) * per + chip + front - k) / (BLEND_EDGE * per);
          if (depth > 0) {
            const d = Math.min(1, depth);
            if (d >= 1 || hash(c * 41 + k * 733 + 9) < Math.pow(d, 1.2)) {
              // Paler and more see-through the higher it sits, each check a
              // slightly different shade, so the edge is a soft mix of tones.
              const tone = d >= 1 ? 1 : Math.max(0, Math.min(1, d + (hash(seed + 51) - 0.5) * 0.35));
              ctx.globalAlpha = d >= 1 ? 1 : 0.2 + 0.8 * d;
              ctx.fillStyle = rgb(mix(TAN, target, tone));
              ctx.fillRect(c * cell, r * cell, cell, cell);
              continue;
            }
            if (hash(seed + 21) < BOTTOM_SHARE) faller(c, r, seed, rgb(target), 0.8, 0);
          } else if (r > 0 && r <= topRows && hash(seed + 31) < TOP_SHARE * (1 - r / (topRows + 1)) * 2) {
            faller(c, r, seed, rgb(GOLD), 0.3, inset);
          }
          if (!fade) continue;

          // Where this check sits on the waves, and what the ripples do to it.
          const x = c * cell + cell / 2;
          const y = r * cell + cell / 2;
          const distance = Math.hypot(x - originX, y - originY);
          let phase = ((distance - travelled) / WAVE_LENGTH) * Math.PI * 2;
          let extra = 0;
          for (const ripple of ripples) {
            const age = now - ripple.at;
            const off = (Math.hypot(x - ripple.x, y - ripple.y) - (age / 1000) * RIPPLE_SPEED) / RIPPLE_WIDTH;
            if (off > 3 || off < -3) continue;
            const ring = Math.exp(-off * off) * (1 - age / RIPPLE_LIFE);
            phase += ring * RIPPLE_SHIFT;
            extra += ring * RIPPLE_ALPHA;
          }
          const crest = Math.pow(0.5 + 0.5 * Math.cos(phase), 2);
          const strength = crest * WAVE_ALPHA * (1 - (WAVE_FALLOFF * distance) / reach) + extra;
          const alpha = (Math.round(Math.min(1, strength / WAVE_ALPHA) * WAVE_LEVELS) / WAVE_LEVELS) * WAVE_ALPHA;
          if (!alpha) continue;
          ctx.globalAlpha = alpha * fade;
          ctx.fillStyle = rgb(mix(WAVE_COLORS[1], WAVE_COLORS[0], crest));
          ctx.fillRect(c * cell + inset, r * cell + inset, side, side);
        }
      }

      // The row of Hilbert lines just above the next section, which continues
      // that section's pattern upwards, shown only on the solid checks.
      ctx.save();
      ctx.clip(solid);
      ctx.translate(0, canvas.height);
      ctx.globalAlpha = 1;
      for (let row = -1; row * HILBERT_ROW * cell > -canvas.height && row >= -2; row--) {
        strokeHilbertRow(ctx, row, cell, canvas.width);
        strokeHilbertRunners(ctx, row, cell, canvas.width, now);
      }
      ctx.restore();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const box = canvas.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      if (x < 0 || y < 0 || x > box.width || y > box.height) {
        dropped = null;
        return;
      }
      if (dropped && Math.hypot(x - dropped.x, y - dropped.y) < RIPPLE_GAP) return;
      dropped = { x, y };
      ripples.push({ x, y, at: performance.now() });
      if (ripples.length > RIPPLES) ripples.shift();
    };

    // Only tick while some of the host is on screen.
    let timer = 0;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      timer = entry.isIntersecting ? window.setInterval(draw, 1000 / FPS) : 0;
    });
    io.observe(host);
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      clearInterval(timer);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      host.style.removeProperty("--check");
    };
  }, [reduced, br, bg, bb]);

  if (reduced) return null;
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
