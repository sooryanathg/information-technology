"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DecodeText from "@/components/transitions/DecodeText";
import { useIntroReady } from "@/lib/intro";
import GalleryCarousel, { type CarouselSlide } from "./GalleryCarousel";
import { GALLERY_ANCHOR } from "./data/gallery";

const HEADING = ["Explore The Gallery And", "See The Future Unfold"];

const ctaBase =
  "pixel-glitch flex h-12 w-[220px] items-center justify-center rounded-[10px] border-2 border-tan text-[17px] font-semibold text-white transition-colors md:h-[52px] md:w-[240px] md:text-lg";

const stepIn = (ms: number) => ({ "--intro-delay": `${ms}ms` }) as React.CSSProperties;

export default function GalleryHero({ slides }: { slides: CarouselSlide[] }) {
  const ready = useIntroReady();
  const [center, setCenter] = useState(0);
  const onCenterChange = useCallback((i: number) => setCenter(i), []);

  return (
    <section
      data-intro={ready ? "play" : "pending"}
      className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-[#2B1C10] font-heading"
    >
      {/* Backdrop: the photo in the middle of the strip, blurred, crossfading as it changes */}
      <div aria-hidden className="absolute inset-0">
        {slides.map((slide, i) => (
          <Image
            key={slide.id}
            src={slide.image}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            className={`scale-110 object-cover blur-2xl transition-opacity duration-[1400ms] ${
              i === center ? "opacity-35" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_0%,rgb(43_28_16/0.55)_55%,#2B1C10_100%)]" />
      </div>

      {/* Heading and buttons */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-6 pt-28 text-center">
        <p
          className="intro-item intro-fade inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[15px] text-white backdrop-blur-sm"
          style={stepIn(150)}
        >
          Our Gallery
          <Image src="/icons/arrow.svg" alt="" width={12} height={12} />
        </p>

        <h1 className="intro-item mt-6 max-w-[860px] text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-[1.15] text-white drop-shadow-[0_2px_6px_rgb(0_0_0/0.25)]">
          <DecodeText text={HEADING[0]} play={ready} delay={300} />
          <br className="hidden sm:block" />{" "}
          <DecodeText text={HEADING[1]} play={ready} delay={300} offset={HEADING[0].length} />
        </h1>

        <p
          className="intro-item intro-fade mt-4 max-w-[560px] text-[15px] leading-relaxed text-white/75 sm:text-base"
          style={stepIn(900)}
        >
          Labs, fests, farewells and everything in between: moments from life in the
          Department of IT.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href={`#${GALLERY_ANCHOR}`}
            className={`intro-item intro-fade ${ctaBase} bg-tan/85 hover:bg-tan`}
            style={stepIn(1100)}
          >
            Browse Photos
          </a>
          <Link
            href="/events"
            className={`intro-item intro-fade ${ctaBase} backdrop-blur-[2px] hover:bg-white/10`}
            style={stepIn(1250)}
          >
            See Events
          </Link>
        </div>
      </div>

      {/* Fade into the photo grid's cream background below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-20 bg-gradient-to-b from-transparent to-[#F3E6D3]"
      />

      {/* Sliding glass cards */}
      <div
        className="intro-item intro-fade relative z-10 pb-10 sm:pb-14"
        style={{ ...stepIn(1400), "--intro-fade-duration": "700ms" } as React.CSSProperties}
      >
        <GalleryCarousel slides={slides} onCenterChange={onCenterChange} />
      </div>
    </section>
  );
}
