'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import DecodeText from '@/components/transitions/DecodeText';
import PixelText from '@/components/transitions/PixelText';
import PixelatedBackground from '@/components/transitions/PixelatedBackground';
import PixelFrame from '@/components/transitions/PixelFrame';
import HilbertAssemble from '@/components/transitions/HilbertAssemble';
import { useIntroReady } from '@/lib/intro';

// The photo at 35% over dark brown, in place of a brown overlay, so the pixel
// effects (which copy the photo onto canvases) come out the same colour as the hero.
const HERO_BG = '#3D2B1F';
const HERO_ALPHA = 0.35;
// Top of bg-pixel-cream below the hero, which the frame's bottom edge blends into.
const NEXT_BG = '#fbf7ef';
const CTA_BG = '#D9C3A5';

const stepIn = (ms: number) => ({ '--intro-delay': `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);
  const ready = useIntroReady();

  return (
    <section
      data-intro={ready ? 'play' : 'pending'}
      className="relative w-full overflow-hidden text-white h-[640px] sm:h-[720px] lg:h-[784px]"
      style={{ background: HERO_BG }}
    >
      {/* Background Image */}
      <Image
        ref={imgRef}
        src="/latest.png"
        alt="Placement Statistics Background"
        fill
        priority
        className="object-cover pointer-events-none select-none"
        style={{ opacity: HERO_ALPHA }}
      />
      <PixelatedBackground imgRef={imgRef} play={ready} background={HERO_BG} alpha={HERO_ALPHA} />
      <PixelFrame
        imgRef={imgRef}
        background={HERO_BG}
        alpha={HERO_ALPHA}
        edge={NEXT_BG}
        // The CTA sits low in the hero: keep the rising band beneath it.
        overContent={false}
      />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[81px]">
        {/* Main Heading: PLACEMENT */}
        <div className="absolute left-6 sm:left-12 lg:left-[81px] top-[180px] sm:top-[200px] lg:top-[221px] max-w-[381px]">
          <PixelText
            as="h1"
            play={ready}
            startDelay={3000}
            className="intro-item font-poppins font-bold text-white text-[44px] sm:text-[54px] lg:text-[64px] leading-none tracking-normal select-none"
            layout="PLACEMENT"
          >
            <DecodeText text="PLACEMENT" play={ready} delay={450} />
          </PixelText>
        </div>

        {/* Highlighted Heading: STATISTICS */}
        <div className="absolute left-6 sm:left-12 lg:left-[78px] top-[236px] sm:top-[265px] lg:top-[291px] max-w-[366px]">
          <PixelText
            as="p"
            play={ready}
            startDelay={3000}
            className="intro-item font-poppins font-bold text-[#C89B3C] text-[44px] sm:text-[54px] lg:text-[64px] leading-none tracking-normal select-none"
            layout="STATISTICS"
          >
            <DecodeText text="STATISTICS" play={ready} delay={450} offset={'PLACEMENT'.length} />
          </PixelText>
          {/* Gold accent line */}
          <span
            className="intro-item intro-wipe block h-[3.5px] w-14 bg-[#C89B3C] rounded-full mt-2 lg:mt-2.5"
            style={stepIn(1100)}
          />
        </div>

        {/* Subheading */}
        <div
          className="intro-item intro-fade absolute font-poppins font-semibold text-white text-[18px] sm:text-[22px] lg:text-[24px] leading-none tracking-normal flex items-center left-6 sm:left-12 lg:left-[81px] top-[335px] sm:top-[370px] lg:top-[395px] max-w-[447px]"
          style={stepIn(1200)}
        >
          From campus to career:
        </div>

        {/* Tagline Description */}
        <div
          className="intro-item intro-fade absolute font-poppins font-normal text-[#FFFCF8] text-[15px] sm:text-[18px] lg:text-[20px] leading-none tracking-normal flex items-center left-6 sm:left-12 lg:left-[81px] top-[375px] sm:top-[415px] lg:top-[439px] max-w-[447px]"
          style={stepIn(1350)}
        >
          Turning potential into professional success..
        </div>

        {/* Call-to-Action Button: built from falling pixels, like the home and events heroes' */}
        <div
          className="absolute left-6 sm:left-12 lg:left-[80px] top-[425px] sm:top-[470px] lg:top-[500px]"
        >
          <div data-assemble className="intro-item">
            <a
              href="https://gecskp.ac.in/it_placement.php"
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-glitch group h-10 sm:h-14 inline-flex items-center justify-center bg-[#D9C3A5] hover:bg-[#cbb393] active:scale-98 text-[#3D2B1F] font-semibold rounded-lg sm:rounded-[10px] px-4 sm:px-8 shadow-[0px_4px_14px_0px_rgba(61,43,31,0.25)] gap-2 transition-all duration-200 cursor-pointer font-poppins"
            >
              <span className="font-poppins font-semibold text-[13px] sm:text-[17px] leading-tight tracking-normal text-[#3D2B1F]">
                View Placement Report
              </span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200 text-[#3D2B1F] stroke-[2.5]" />
            </a>
          </div>
          <HilbertAssemble play={ready} delay={1500} color={CTA_BG} />
        </div>
      </div>
    </section>
  );
}
