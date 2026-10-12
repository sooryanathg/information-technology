'use client';

import React, { useRef } from 'react';
import CountUp from '@/components/transitions/CountUp';
import HilbertReveal, { revealMidpoint } from '@/components/transitions/HilbertReveal';
import { useInView, useIntroReady } from '@/lib/intro';
import { highlightsData } from '@/data/placement/highlights';
import PlacementHeading from './PlacementHeading';

// Plain counts ("74", "33+") count up; ranges like "2021-2025" are shown as they are.
const countable = (value: string) => /^\d+\+?$/.test(value);

// SVG icon helpers for each highlight metric
const highlightIcons: Record<string, React.ReactNode> = {
  'placed-recent': (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C89B3C"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  'offers-recent': (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C89B3C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  'offers-2025': (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C89B3C"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <path d="M3 20h18M6 16v4M12 10v10M18 4v16" />
    </svg>
  ),
  companies: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C89B3C"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </svg>
  ),
  'placed-2025': (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C89B3C"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  batch: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C89B3C"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
};

export default function Highlights() {
  // Every time the cards scroll into view, a Hilbert curve uncovers them one
  // after another and the numbers count up, like the home page's stats panel.
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: false });
  const ready = useIntroReady();
  const play = inView && ready;

  return (
    <section className="relative z-10 w-full font-inter py-16 sm:py-20 lg:py-24">
      {/* SECTION TITLE */}
      <div className="w-[535px] max-w-full h-[119px] mx-auto flex flex-col items-center justify-center pt-[20px] px-4 mb-8 sm:mb-12">
        <PlacementHeading
          text="PLACEMENT HIGHLIGHTS"
          className="font-poppins font-bold text-[26px] sm:text-[36px] leading-[100%] uppercase text-[#3D2B1F] text-center"
        />
      </div>

      {/* HIGHLIGHT CARDS GRID */}
      <div ref={gridRef} className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 justify-items-center">
        {highlightsData.map((item, i) => (
          <div
            key={item.id}
            data-reveal
            className="pixel-glitch bg-[#FFFCF8] rounded-2xl flex flex-col items-center text-center border border-[#E8DCCB] shadow-[0_8px_24px_rgba(61,43,31,0.06)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group h-[254px] w-full pt-[53px]"
          >
            {/* ICON */}
            <div className="w-8 h-8 flex items-center justify-center mb-[66px] group-hover:scale-110 transition-transform">
              {item.renderIcon ? item.renderIcon() : highlightIcons[item.id]}
            </div>

            {/* VALUE */}
            <div className="w-[119px] h-[29px] flex items-center justify-center font-inter font-bold text-[24px] leading-[100%] text-[#3D2B1F] text-center whitespace-nowrap">
              {countable(item.value) ? (
                <CountUp text={item.value} play={play} delay={revealMidpoint(i)} />
              ) : (
                item.value
              )}
            </div>

            {/* LABEL */}
            <div className="w-full px-2 flex items-center justify-center font-inter font-normal text-[15px] leading-tight text-[#7A6758] text-center mt-[16px]">
              {item.label}
            </div>
          </div>
        ))}
        <HilbertReveal play={play} />
      </div>
    </section>
  );
}
