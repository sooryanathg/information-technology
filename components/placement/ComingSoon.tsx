'use client';

import React, { useRef } from 'react';
import { Clock } from 'lucide-react';
import HilbertLines from '@/components/transitions/HilbertLines';
import { useInView, useIntroReady } from '@/lib/intro';
import PlacementHeading from './PlacementHeading';

interface ComingSoonProps {
  title: string;
  description: string;
  /**
   * "dark" is a brown band with Hilbert lines behind it, for under the page's
   * PixelChecks, whose chipped edge carries those lines up into the checks.
   */
  variant?: 'light' | 'dark';
}

/**
 * Placeholder for placement sections whose real content isn't ready yet.
 */
export default function ComingSoon({ title, description, variant = 'light' }: ComingSoonProps) {
  const dark = variant === 'dark';
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { threshold: 0.4, once: false });
  const ready = useIntroReady();

  return (
    <section
      className={`relative w-full font-poppins px-4 sm:px-6 lg:px-8 ${
        dark ? 'bg-[#3D2B1F] py-16 lg:py-20' : 'py-12 sm:py-16'
      }`}
    >
      {dark && <HilbertLines />}
      <div className="relative z-10">
        <PlacementHeading
          text={title}
          className={`font-bold uppercase text-[26px] sm:text-[36px] leading-tight ${
            dark ? 'text-white' : 'text-[#3D2B1F]'
          }`}
        />

        <div ref={panelRef} data-intro={inView && ready ? 'play' : 'pending'}>
          <div
            style={{ '--intro-delay': '500ms', '--intro-fade-duration': '700ms', '--intro-fade-steps': '7' } as React.CSSProperties}
            className={`intro-item intro-fade mt-6 mx-auto w-full max-w-[560px] rounded-[20px] border border-dashed px-6 py-10 sm:py-12 flex flex-col items-center text-center ${
              dark ? 'border-[#C89B3C]/60 bg-white/5' : 'border-[#7A6758]/60 bg-[#FFFCF8]/70'
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#C89B3C] px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white">
              <Clock className="w-4 h-4" />
              Coming soon
            </span>
            <p className={`mt-4 text-sm sm:text-base leading-relaxed ${dark ? 'text-[#E8DCCB]' : 'text-[#7A6758]'}`}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
