'use client';

import React, { useRef } from 'react';
import DecodeText from '@/components/transitions/DecodeText';
import PixelText from '@/components/transitions/PixelText';
import StarDivider from '@/components/StarDivider';
import { useInView, useIntroReady } from '@/lib/intro';

interface PlacementHeadingProps {
  text: string;
  /** Classes for the <h2>. */
  className: string;
}

/**
 * A placement section's heading and star divider. Like the About headings, it
 * decodes every time it scrolls into view and gets the gold pixel sweep and
 * hover glow; the divider wipes in after it.
 */
export default function PlacementHeading({ text, className }: PlacementHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.6, once: false });
  const ready = useIntroReady();
  const play = inView && ready;

  return (
    <div ref={ref} data-intro={play ? 'play' : 'pending'} className="flex flex-col items-center text-center">
      <PixelText as="h2" play={play} startDelay={1800} className={`intro-item ${className}`} layout={text}>
        <DecodeText text={text} play={play} delay={150} />
      </PixelText>
      <div
        className="intro-item intro-wipe"
        style={{ '--intro-delay': '450ms' } as React.CSSProperties}
      >
        <StarDivider />
      </div>
    </div>
  );
}
