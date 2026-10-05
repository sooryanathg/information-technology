"use client";

import { useRef } from "react";
import Image from "next/image";
import DecodeText from "@/components/transitions/DecodeText";
import PixelText from "@/components/transitions/PixelText";
import PixelatedBackground from "@/components/transitions/PixelatedBackground";
import PixelFrame from "@/components/transitions/PixelFrame";
import HilbertAssemble from "@/components/transitions/HilbertAssemble";
import { useIntroReady } from "@/lib/intro";

// The photo at 60% over black: the same picture as a black/40 overlay, but one
// the pixel effects can copy, so their tiles are as dark as the photo around them.
const HERO_BG = "#000000";
const HERO_ALPHA = 0.6;
// AboutHistory's background, which the frame's bottom edge blends into.
const NEXT_BG = "#EFE4D3";
const CTA_BG = "#cb9437";

const headingLine = "block text-[clamp(3.5rem,9vw,6rem)] font-bold leading-none drop-shadow-[0_4px_4px_rgb(0_0_0/0.25)]";

const HEADING = [
  { text: "25 Years", className: `${headingLine} mb-5` },
  { text: "One", className: `${headingLine} mb-5` },
  {
    text: "Vision",
    className: `${headingLine} mb-2 bg-[linear-gradient(180deg,white_20%,var(--color-gold-soft)_100%)] bg-clip-text text-transparent`,
  },
];

export default function AboutHero() {
  const imgRef = useRef<HTMLImageElement>(null);
  const ready = useIntroReady();

  return (
    <section data-intro={ready ? "play" : "pending"} className="relative min-h-screen overflow-hidden bg-black">
      <Image
        ref={imgRef}
        src="/about/about-hero.svg"
        alt="Corridor of the IT department building"
        fill
        priority
        className="object-cover"
        style={{ opacity: HERO_ALPHA }}
      />
      <PixelatedBackground imgRef={imgRef} play={ready} background={HERO_BG} alpha={HERO_ALPHA} />
      <PixelFrame
        imgRef={imgRef}
        background={HERO_BG}
        alpha={HERO_ALPHA}
        edge={NEXT_BG}
        // The content runs close to the bottom of this hero: keep the rising band beneath it.
        overContent={false}
      />

      <div className="relative z-10 flex min-h-screen flex-col px-6 pb-16 pt-20 md:px-12 lg:px-24">
        <div className="mt-24 max-w-3xl lg:mt-36">
          <p className="intro-item mb-1 text-xl font-medium uppercase tracking-[0.3em] text-white md:text-2xl">
            <DecodeText text="About Us" play={ready} delay={300} />
          </p>

          <PixelText
            as="h1"
            play={ready}
            startDelay={3000}
            className="intro-item uppercase text-white"
            layout={HEADING.map(({ text }, i) => (
              // The layers carry their own colour, so the last line drops its gradient here.
              <span key={text} className={i === HEADING.length - 1 ? `${headingLine} mb-2` : HEADING[i].className}>
                {text}
              </span>
            ))}
          >
            {HEADING.map(({ text, className }, i) => (
              <DecodeText
                key={text}
                className={className}
                text={text}
                play={ready}
                delay={450}
                // Each line carries on the sweep where the one above ended.
                offset={HEADING.slice(0, i).reduce((n, line) => n + line.text.length, 0)}
              />
            ))}
          </PixelText>

          <p
            className="intro-item intro-fade mt-12 max-w-xl text-xl text-white/90 md:mt-16 md:text-2xl"
            style={{ "--intro-delay": "1450ms" } as React.CSSProperties}
          >
            Inspiring innovation, advancing knowledge, and driving technological excellence since 1999.
          </p>

          {/* The button is built from falling pixels that land along a Hilbert curve, like the home hero's. */}
          <div className="relative mt-10 w-fit">
            <div data-assemble className="intro-item">
              <a
                href="https://www.gecskp.ac.in/IT.php"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-glitch flex w-[235px] items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-xl font-medium leading-none text-white transition hover:brightness-110"
              >
                explore more
                <Image src="/icons/arrow-up-right.svg" alt="" width={13} height={13} />
              </a>
            </div>
            <HilbertAssemble play={ready} delay={1700} color={CTA_BG} />
          </div>
        </div>
      </div>
    </section>
  );
}
