'use client';

import React, { useRef } from 'react';
import { Clock } from 'lucide-react';
import HilbertLines from '@/components/transitions/HilbertLines';
import { useInView, useIntroReady } from '@/lib/intro';
import PlacementHeading, { SECTION_TITLE } from './PlacementHeading';

/** Light tan of the "band" variant; the page's PixelChecks blends into it. */
export const BAND_RGB: [number, number, number] = [230, 208, 179];

interface ComingSoonProps {
  title: string;
  description: string;
  /**
   * "band" is a light tan band with Hilbert lines behind it, for under the page's
   * PixelChecks, whose chipped edge carries those lines up into the checks.
   * Its colour is BAND_RGB, which PixelChecks blends into.
   */
  variant?: 'plain' | 'band';
}

/**
 * Placeholder for placement sections whose real content isn't ready yet.
 */
export default function ComingSoon({ title, description, variant = 'plain' }: ComingSoonProps) {
  const band = variant === 'band';
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { threshold: 0.4, once: false });
  const ready = useIntroReady();

  return (
    <section
      className={`relative w-full font-poppins px-4 sm:px-6 lg:px-8 ${
        band ? 'py-14 sm:py-16 lg:py-20' : 'py-12 sm:py-16'
      }`}
      style={band ? { background: `rgb(${BAND_RGB.join(' ')})` } : undefined}
    >
      {band && <HilbertLines />}
      <div className="relative z-10">
        <PlacementHeading
          text={title}
          className={`${SECTION_TITLE} text-[#3D2B1F]`}
        />

        <div ref={panelRef} data-intro={inView && ready ? 'play' : 'pending'}>
          <div
            style={{ '--intro-delay': '500ms', '--intro-fade-duration': '700ms', '--intro-fade-steps': '7' } as React.CSSProperties}
            className="intro-item intro-fade mt-4 sm:mt-6 mx-auto w-full max-w-[560px] rounded-[20px] border border-dashed border-[#7A6758]/50 bg-[#FFFCF8]/70 px-5 sm:px-8 py-8 sm:py-10 flex flex-col items-center text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#C89B3C] px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white">
              <Clock className="w-4 h-4" />
              Coming soon
            </span>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5B4C40]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
