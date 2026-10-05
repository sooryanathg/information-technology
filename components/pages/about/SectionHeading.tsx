"use client";

import { useRef } from "react";
import DecodeText from "@/components/transitions/DecodeText";
import PixelText from "@/components/transitions/PixelText";
import { useInView, useIntroReady } from "@/lib/intro";

type Props = {
  text: string;
  /** Classes for the <h2>. */
  className: string;
  /** Classes for the gold bar under it. */
  barClassName: string;
};

/**
 * An About section's heading and gold bar. Every time it scrolls into view the
 * heading decodes, like the home page's, and the bar wipes in after it; the
 * heading also gets the gold pixel sweep and hover glow.
 */
export default function SectionHeading({ text, className, barClassName }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.6, once: false });
  const ready = useIntroReady();
  const play = inView && ready;

  return (
    <div ref={ref} data-intro={play ? "play" : "pending"}>
      <PixelText as="h2" play={play} startDelay={1800} className={`intro-item ${className}`} layout={text}>
        <DecodeText text={text} play={play} delay={150} />
      </PixelText>
      <span
        className={`intro-item intro-wipe block ${barClassName}`}
        style={{ "--intro-delay": "450ms" } as React.CSSProperties}
      />
    </div>
  );
}
