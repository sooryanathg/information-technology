"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/intro";

type Props = {
  text: string;
  play: boolean;
  /** ms before the first character */
  delay?: number;
  /** ms per character */
  speed?: number;
  className?: string;
};

/** ms `text` takes to type at `speed`, to start the next piece when this one ends. */
export function typingTime(text: string, speed = 40) {
  return text.length * speed;
}

/**
 * Renders `text` and, once `play` is true, types it out a character at a time
 * behind a blinking caret. Screen readers get the plain text; layout never
 * shifts because the part still to come reserves its space.
 */
export default function TypeText({ text, play, delay = 0, speed = 40, className }: Props) {
  const reduced = usePrefersReducedMotion();
  const [typed, setTyped] = useState<number | null>(null);

  // Start over whenever `play` changes, so the typing can replay.
  const [prevPlay, setPrevPlay] = useState(play);
  if (prevPlay !== play) {
    setPrevPlay(play);
    setTyped(null);
  }

  useEffect(() => {
    if (!play || reduced) return;
    let raf = 0;
    let shown = -1;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const count = Math.min(text.length, Math.max(0, Math.floor((now - start) / speed)));
      if (count !== shown) setTyped((shown = count));
      if (count < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, reduced, delay, speed, text]);

  // Before the intro (and during SSR) show the whole text; whatever plays the intro hides it.
  const count = play && !reduced ? (typed ?? 0) : text.length;
  const typing = play && !reduced && count > 0 && count < text.length;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {typing && (
          <span className="relative">
            <span className="type-caret absolute left-px top-[0.12em] h-[1em] w-[2px] bg-current" />
          </span>
        )}
        <span className="invisible">{text.slice(count)}</span>
      </span>
    </span>
  );
}
