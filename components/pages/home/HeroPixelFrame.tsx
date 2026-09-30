"use client";

import { useEffect, useRef, useState } from "react";
import { hash, useBootPhase, usePrefersReducedMotion } from "@/lib/intro";
import { FRAME_COLOR, frameGeometry, frameTiles, tilePosition, type FrameGeometry } from "@/lib/pixelFrame";

const START_DELAY = 1000; // when animating in on its own, once the photo has sharpened
const ROW_STAGGER = 55;
const JITTER = 160;

/**
 * Pixel frame along the bottom of the hero. On a session's first visit the boot
 * loader leaves exactly these tiles behind and this component takes over from
 * them invisibly ("handoff"). Otherwise the tiles step in from the bottom.
 */
export default function HeroPixelFrame({ color = FRAME_COLOR }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<FrameGeometry | null>(null);
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

  const visible = phase !== "pending" && geo;
  const animate = phase === "free" && !reduced;

  const tiles: { key: number; x: number; y: number; delay: number }[] = [];
  if (visible) {
    for (const idx of frameTiles(geo)) {
      const c = idx % geo.cols;
      const r = Math.floor(idx / geo.cols);
      const { x, y } = tilePosition(geo, c, r);
      // Step in outward from whichever edge (top or bottom) the tile belongs to.
      const fromEdge = Math.min(geo.rows - 1 - r, r);
      tiles.push({ key: idx, x, y, delay: START_DELAY + fromEdge * ROW_STAGGER + hash(idx) * JITTER });
    }
  }

  return (
    <div ref={ref} data-pixel-frame aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {tiles.map((t) => (
        <span
          key={t.key}
          className={`absolute ${animate ? "pixel-tile-in" : ""}`}
          style={{
            left: t.x,
            top: t.y,
            width: (geo?.size ?? 0) + 1,
            height: (geo?.size ?? 0) + 1,
            background: color,
            animationDelay: animate ? `${Math.round(t.delay)}ms` : undefined,
          }}
        />
      ))}
    </div>
  );
}
