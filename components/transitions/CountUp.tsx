"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/intro";

const DURATION = 1300; // ms to run from 1 to the figure

type Props = {
  /** A figure with whatever stands around it, e.g. "~300" or "63 + 6"; every number in it counts. */
  text: string;
  play: boolean;
  /** ms before the count starts */
  delay?: number;
  className?: string;
};

/**
 * Renders `text` and, once `play` is true, counts every number in it up from
 * 1 to its value, quick at first and settling at the end. Screen readers get
 * the final text.
 */
export default function CountUp({ text, play, delay = 0, className }: Props) {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  // Start over whenever `play` changes, so the count can replay.
  const [prevPlay, setPrevPlay] = useState(play);
  if (prevPlay !== play) {
    setPrevPlay(play);
    setProgress(0);
  }

  useEffect(() => {
    if (!play || reduced) return;
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / DURATION));
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, reduced, delay]);

  const shown =
    !play || reduced || progress === 1
      ? text
      : text.replace(/\d+/g, (figure) => String(Math.max(1, Math.round(+figure * progress))));

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="tabular-nums">
        {shown}
      </span>
    </span>
  );
}
