"use client";

import { useEffect, useState } from "react";
import { hash, usePrefersReducedMotion } from "@/lib/intro";

const GLYPHS = "01<>/\\{}[]#=+*_";
const STAGGER = 24; // ms between each character starting
const SCRAMBLE = 300; // ms each character spends scrambling
const FRAME = 55; // ms per glyph change

type Props = {
  text: string;
  play: boolean;
  /** ms before the first character starts */
  delay?: number;
  /** character index offset, so consecutive lines continue the sweep */
  offset?: number;
  /** ms between each character starting; lower for long texts */
  stagger?: number;
  className?: string;
};

/**
 * Renders `text` and, once `play` is true, reveals it left to right with each
 * character cycling through code glyphs before locking in. Screen readers get
 * the plain text; layout never shifts because the real glyph reserves space.
 */
export default function DecodeText({ text, play, delay = 0, offset = 0, stagger = STAGGER, className }: Props) {
  const reduced = usePrefersReducedMotion();
  const [t, setT] = useState<number | null>(null);

  // Start over whenever `play` changes, so the decode can replay.
  const [prevPlay, setPrevPlay] = useState(play);
  if (prevPlay !== play) {
    setPrevPlay(play);
    setT(null);
  }
  const chars = [...text];
  const total = delay + (offset + chars.length) * stagger + SCRAMBLE;

  useEffect(() => {
    if (!play || reduced) return;
    let raf = 0;
    let lastFrame = -1;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const frame = Math.floor(elapsed / FRAME);
      if (frame !== lastFrame) {
        lastFrame = frame;
        setT(elapsed);
      }
      if (elapsed < total) raf = requestAnimationFrame(tick);
      else setT(Infinity);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, reduced, total]);

  // Before the intro (and during SSR) show the final text; the section hides it.
  const animating = play && !reduced && t !== Infinity;
  const now = t ?? -1;
  const frame = Math.floor(Math.max(0, now) / FRAME);

  // Split into words so lines only wrap between words.
  let index = 0;
  const words = text.split(" ");

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={w}>
            {w > 0 && " "}
            <span className="inline-block whitespace-nowrap">
              {[...word].map((ch, c) => {
                const i = offset + index++;
                if (!animating) return <span key={c}>{ch}</span>;
                const startAt = delay + i * stagger;
                if (now < startAt) {
                  return (
                    <span key={c} className="invisible">
                      {ch}
                    </span>
                  );
                }
                if (now < startAt + SCRAMBLE) {
                  const glyph = GLYPHS[Math.floor(hash(i * 131 + frame) * GLYPHS.length)];
                  return (
                    <span key={c} className="relative">
                      <span className="invisible">{ch}</span>
                      <span className="absolute left-0 top-0 text-[#CB9437]">{glyph}</span>
                    </span>
                  );
                }
                return <span key={c}>{ch}</span>;
              })}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
