"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { drawPixelated } from "@/lib/pixelate";
import { usePrefersReducedMotion } from "@/lib/intro";

const BLOCKS = [44, 32, 22, 14, 8, 4]; // coarse -> nearly sharp
const START_DELAY = 300; // let the loader tiles start clearing first
const STEP_MS = 120;
const FADE_MS = 280; // must match .hero-pixel-canvas.is-fading in globals.css

type Props = {
  /** The real background <img>; the canvas samples it so nothing is fetched twice. */
  imgRef: RefObject<HTMLImageElement | null>;
  play: boolean;
  background: string;
  alpha?: number;
};

/**
 * Covers the hero photo with a pixelated copy of it, then steps the block size
 * down until it matches the photo and fades away.
 */
export default function PixelatedBackground({ imgRef, play, background, alpha = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blockRef = useRef(BLOCKS[0]);
  const [stage, setStage] = useState<"cover" | "fading" | "gone">("cover");
  const reduced = usePrefersReducedMotion();
  const gone = stage === "gone";

  // Draw the coarsest frame as soon as the photo is available, and keep the
  // canvas sized to the section while it is visible.
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (gone || !canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      if (img.complete && img.naturalWidth) {
        drawPixelated(ctx, img, w, h, blockRef.current, { background, alpha });
      }
    };

    draw();
    img.addEventListener("load", draw);
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    const redraw = () => draw();
    canvas.addEventListener("pixel:redraw", redraw);
    return () => {
      img.removeEventListener("load", draw);
      ro.disconnect();
      canvas.removeEventListener("pixel:redraw", redraw);
    };
  }, [imgRef, background, alpha, gone]);

  // Step the block size down once the intro is allowed to play.
  useEffect(() => {
    if (!play || reduced) return;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const timers: number[] = [];
    const run = () => {
      BLOCKS.forEach((block, i) => {
        timers.push(
          window.setTimeout(() => {
            blockRef.current = block;
            canvas.dispatchEvent(new Event("pixel:redraw"));
          }, START_DELAY + i * STEP_MS)
        );
      });
      const end = START_DELAY + BLOCKS.length * STEP_MS;
      timers.push(window.setTimeout(() => setStage("fading"), end));
      timers.push(window.setTimeout(() => setStage("gone"), end + FADE_MS));
    };

    // Wait for the photo, otherwise we would be sharpening an empty canvas.
    if (img.complete && img.naturalWidth) run();
    else img.addEventListener("load", run, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      img.removeEventListener("load", run);
    };
  }, [play, reduced, imgRef]);

  if (gone || reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`hero-pixel-canvas pointer-events-none absolute inset-0 h-full w-full [image-rendering:pixelated] ${
        stage === "fading" ? "is-fading" : ""
      }`}
      style={{ background }}
    />
  );
}
