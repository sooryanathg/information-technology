
"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import DecodeText from "@/components/transitions/DecodeText";
import PixelText from "@/components/transitions/PixelText";
import { useInView, useIntroReady } from "@/lib/intro";

const HEADING = ["Our Students are", "Making Us Proud"];

type AchievementImage = {
  id: string;
  name: string;
  createdTime: string | null;
  imageUrl: string;
};

export default function AchievementsSection() {
  const [posterImages, setPosterImages] = useState<AchievementImage[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  const totalSlides = posterImages.length;

  // Fetch the latest six images from Google Drive.
  const fetchAchievements = useCallback(async (initial = false) => {
    try {
      const response = await fetch("/api/home-achievements", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch achievements");
      }

      const data: { images?: AchievementImage[] } = await response.json();
      const latestImages = data.images ?? [];

      setPosterImages((previous) => {
        // Avoid resetting the carousel when the image list has not changed.
        if (
          previous.length === latestImages.length &&
          previous.every(
            (image, index) => image.id === latestImages[index]?.id
          )
        ) {
          return previous;
        }

        return latestImages;
      });

      setActiveSlide((current) =>
        latestImages.length ? current % latestImages.length : 0
      );
    } catch (error) {
      console.error("Failed to load achievements:", error);
    } finally {
      if (initial) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAchievements(true);

    const timer = window.setInterval(() => {
      void fetchAchievements();
    }, 60_000);

    return () => window.clearInterval(timer);
  }, [fetchAchievements]);

  const goToNext = useCallback(() => {
    setActiveSlide((current) =>
      totalSlides ? (current + 1) % totalSlides : 0
    );
  }, [totalSlides]);

  const goToPrevious = useCallback(() => {
    setActiveSlide((current) =>
      totalSlides ? (current - 1 + totalSlides) % totalSlides : 0
    );
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  // Keyboard navigation.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        goToNext();
      } else if (event.key === "ArrowLeft") {
        goToPrevious();
      } else {
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Automatic movement every three seconds.
  useEffect(() => {
    if (totalSlides <= 1) return;

    const timer = window.setInterval(goToNext, 3000);
    return () => window.clearInterval(timer);
  }, [goToNext, totalSlides]);

  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { threshold: 0.6, once: false });
  const ready = useIntroReady();
  const play = inView && ready;

  const postersRef = useRef<HTMLDivElement>(null);
  const postersPlay =
    useInView(postersRef, { threshold: 0.15, once: false }) && ready;

  // Show the previous, current and next posters.
  const visiblePosters =
    totalSlides > 0
      ? [-1, 0, 1].map(
          (offset) => (activeSlide + offset + totalSlides) % totalSlides
        )
      : [];

  return (
    <section
      aria-labelledby="achievements-heading"
      className="px-5 pb-5 pt-2 sm:px-8 sm:pb-10 sm:pt-6"
    >
      <div className="relative z-10 mx-auto max-w-[1515px] text-center">
        <div data-intro={play ? "play" : "pending"}>
          <div
            aria-hidden="true"
            className="intro-item intro-fade mb-1 flex items-center justify-center gap-2 text-[#a96b39] sm:mb-3 sm:gap-5"
          >
            <span className="h-[2px] w-6 bg-[#a96b39] sm:h-[3px] sm:w-24" />
            <Star className="h-4 w-4 fill-current sm:h-8 sm:w-8" />
            <span className="h-[2px] w-6 bg-[#a96b39] sm:h-[3px] sm:w-24" />
          </div>

          <div ref={headingRef}>
            <PixelText
              as="h2"
              id="achievements-heading"
              play={play}
              startDelay={1800}
              className="intro-item font-heading text-[0.95rem] font-semibold leading-tight text-black sm:text-3xl lg:text-[48px]"
              layout={HEADING.join(" ")}
            >
              <DecodeText text={HEADING[0]} play={play} delay={150} />{" "}
              <span className="text-[#ad7746]">
                <DecodeText
                  text={HEADING[1]}
                  play={play}
                  delay={150}
                  offset={HEADING[0].length}
                />
              </span>
            </PixelText>
          </div>

          <p
            className="intro-item intro-fade mx-auto mt-1 max-w-2xl text-xs leading-relaxed text-black sm:mt-2 sm:text-xl lg:text-[26px]"
            style={{ "--intro-delay": "650ms" } as CSSProperties}
          >
            Celebrating placements, internships and achievements of our students
          </p>
        </div>

        <div
          ref={postersRef}
          data-intro={postersPlay ? "play" : "pending"}
          style={
            {
              "--intro-fade-duration": "1100ms",
              "--intro-fade-steps": 10,
            } as CSSProperties
          }
        >
          <div className="relative mx-auto max-w-[1170px]">
            {totalSlides > 1 && (
              <button
                type="button"
                aria-label="Previous achievement poster"
                onClick={goToPrevious}
                className="absolute -left-1 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-[#c9b497] bg-white/90 p-1.5 text-[#5f3b1d] shadow-[0_8px_18px_rgba(44,34,25,0.12)] transition hover:scale-105 hover:bg-white sm:-left-2 sm:p-2"
              >
                <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
              </button>
            )}

            <div
              aria-label="Student achievement posters"
              aria-roledescription="carousel"
              role="region"
              tabIndex={0}
              className="mx-auto mt-4 grid max-w-[1170px] grid-cols-1 items-center gap-2 outline-none sm:mt-8 sm:grid-cols-3 sm:gap-6 lg:mt-10 lg:gap-7"
            >
              {loading && posterImages.length === 0 && (
                <p className="col-span-full py-10 text-sm text-gray-600">
                  Loading achievements...
                </p>
              )}

              {!loading && posterImages.length === 0 && (
                <p className="col-span-full py-10 text-sm text-gray-600">
                  No achievement posters are available right now.
                </p>
              )}

              {visiblePosters.map((posterIndex, position) => {
                const poster = posterImages[posterIndex];
                if (!poster) return null;

                return (
                  <button
                    key={poster.id}
                    type="button"
                    aria-label={`Show achievement poster ${posterIndex + 1}`}
                    onClick={() => goToSlide(posterIndex)}
                    style={
                      {
                        "--poster-from": position === 1 ? "64px" : "-64px",
                        "--intro-delay": position === 1 ? "160ms" : "0ms",
                      } as CSSProperties
                    }
                    className={`intro-item poster-crawl mx-auto w-full cursor-pointer rounded-xl bg-card-cream p-1.5 shadow-[0_12px_18px_rgba(44,34,25,0.22)] transition-all duration-500 hover:z-10 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a96b39] sm:rounded-[20px] sm:p-3 sm:hover:scale-[1.12] ${
                      position === 1
                        ? "max-w-[min(68vw,280px)] sm:-mt-2 sm:max-w-[460px]"
                        : "hidden max-w-[140px] sm:mt-10 sm:block sm:max-w-[390px]"
                    }`}
                  >
                    {/* Fixed 4:5 frame so posters of any shape render at the same size. */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-photo-placeholder sm:rounded-[14px]">
                      <Image
                        src={poster.imageUrl}
                        alt={poster.name}
                        fill
                        unoptimized
                        sizes="(min-width: 640px) 460px, 68vw"
                        className="object-cover"
                        priority={position === 1}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {totalSlides > 1 && (
              <button
                type="button"
                aria-label="Next achievement poster"
                onClick={goToNext}
                className="absolute -right-1 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-[#c9b497] bg-white/90 p-1.5 text-[#5f3b1d] shadow-[0_8px_18px_rgba(44,34,25,0.12)] transition hover:scale-105 hover:bg-white sm:-right-2 sm:p-2"
              >
                <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
              </button>
            )}
          </div>

          <div
            className="intro-item intro-fade mx-auto mt-3 flex w-fit items-center gap-1 rounded-full bg-white/80 px-2 py-1 shadow-[0_2px_8px_rgba(44,34,25,0.12)] sm:mt-6 sm:gap-2 sm:px-3 sm:py-2"
            style={{ "--intro-delay": "900ms" } as CSSProperties}
            role="group"
            aria-label="Choose achievement poster"
          >
            {posterImages.map((poster, index) => (
              <button
                key={poster.id}
                type="button"
                aria-label={`Show achievement slide ${index + 1}`}
                aria-current={activeSlide === index ? "true" : undefined}
                onClick={() => goToSlide(index)}
                className="relative h-[4px] w-5 overflow-hidden rounded-full bg-[#d4b99a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#765538] sm:h-[7px] sm:w-9"
              >
                <span
                  className={`absolute inset-0 origin-left rounded-full bg-[#a96b39] transition-transform duration-300 ${
                    activeSlide === index ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
