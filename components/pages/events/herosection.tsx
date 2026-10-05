"use client";

import { useRef } from "react";
import Image from "next/image";
import DecodeText from "@/components/transitions/DecodeText";
import PixelText from "@/components/transitions/PixelText";
import PixelatedBackground from "@/components/transitions/PixelatedBackground";
import PixelFrame from "@/components/transitions/PixelFrame";
import HilbertAssemble from "@/components/transitions/HilbertAssemble";
import { useIntroReady } from "@/lib/intro";
import { PAST_EVENTS_ANCHOR } from "./EventFilters";

// The photo at 50% over black: the same picture as a black/50 overlay, but one
// the pixel effects can copy, so their tiles are as dark as the photo around them.
const HERO_BG = "#000000";
const HERO_ALPHA = 0.5;
// The top of the events section's bg-cream-fade, which the frame's bottom edge blends into.
const NEXT_BG = "#fffbf7";
const CTA_BG = "#c98c5f";

const HEADING = ["Explore, learn and grow exciting events", "organised by the department of IT"];

const ctaBase =
  "pixel-glitch flex h-14 w-[260px] items-center justify-center rounded-[10px] border-2 border-tan text-xl font-semibold text-white transition-colors md:w-[300px] md:text-[22px]";

export default function HeroSection() {
  const imgRef = useRef<HTMLImageElement>(null);
  const ready = useIntroReady();

  return (
    <section
      data-intro={ready ? "play" : "pending"}
      className="relative h-dvh min-h-[600px] w-full overflow-hidden bg-black font-heading"
    >
      <Image
        ref={imgRef}
        src="/events/heroevents.png"
        alt="IT Department building corridor"
        fill
        priority
        className="object-cover"
        style={{ opacity: HERO_ALPHA }}
      />
      <PixelatedBackground imgRef={imgRef} play={ready} background={HERO_BG} alpha={HERO_ALPHA} />
      <PixelFrame imgRef={imgRef} background={HERO_BG} alpha={HERO_ALPHA} edge={NEXT_BG} />

      <div className="relative z-10 flex h-full items-center justify-center px-6 pb-24">
        <div className="flex flex-col items-center gap-10">
          <PixelText
            as="h1"
            play={ready}
            startDelay={3000}
            className="intro-item max-w-[1280px] text-center text-[clamp(2rem,4.3vw,4rem)] font-semibold leading-[1.2] text-white drop-shadow-[0_2px_6px_rgb(0_0_0/0.25)]"
            layout={
              <>
                {HEADING[0]}
                <br className="hidden md:block" /> {HEADING[1]}
              </>
            }
          >
            <DecodeText text={HEADING[0]} play={ready} delay={450} />
            <br className="hidden md:block" />{" "}
            <DecodeText text={HEADING[1]} play={ready} delay={450} offset={HEADING[0].length} />
          </PixelText>

          {/* The buttons are built from falling pixels that land along a Hilbert curve, like the home hero's. */}
          <div className="relative flex flex-col gap-3 sm:flex-row">
            <div data-assemble className="intro-item">
              <a href="#events" className={`${ctaBase} bg-tan/85 hover:bg-tan`}>
                Explore Events
              </a>
            </div>
            <div data-assemble className="intro-item">
              <a href={`#${PAST_EVENTS_ANCHOR}`} className={`${ctaBase} backdrop-blur-[2px] hover:bg-white/10`}>
                View Past Events
              </a>
            </div>
            <HilbertAssemble play={ready} delay={1500} color={CTA_BG} />
          </div>
        </div>
      </div>
    </section>
  );
}
