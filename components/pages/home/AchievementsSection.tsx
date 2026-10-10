
"use client";

import Image from "next/image";
import { Star, X } from "lucide-react";
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

// Leaf positions in the canopy, newest poster first. x/y place the leaf's
// centre (% of the canopy); w/h are the largest box it may fill, and each
// poster keeps its own shape inside that box so nothing is cropped.
const LEAVES = [
  { x: 50, y: 54, w: 32, h: 62, rot: -1, z: 30 },
  { x: 20, y: 30, w: 22, h: 44, rot: -6, z: 20 },
  { x: 80, y: 30, w: 22, h: 44, rot: 5, z: 20 },
  { x: 23, y: 74, w: 20, h: 40, rot: 4, z: 10 },
  { x: 77, y: 74, w: 20, h: 40, rot: -5, z: 10 },
  { x: 50, y: 13, w: 16, h: 26, rot: 3, z: 5 },
];

// Until an image loads we assume a portrait poster.
const DEFAULT_RATIO = 4 / 5;

export default function AchievementsSection() {
  const [posterImages, setPosterImages] = useState<AchievementImage[]>([]);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const [openPoster, setOpenPoster] = useState<AchievementImage | null>(null);
  const [loading, setLoading] = useState(true);

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
      const latestImages = (data.images ?? []).slice(0, LEAVES.length);

      setPosterImages((previous) => {
        // Avoid re-rendering the canopy when the image list has not changed.
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

  // Close the enlarged poster with Escape.
  useEffect(() => {
    if (!openPoster) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPoster(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openPoster]);

  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { threshold: 0.6, once: false });
  const ready = useIntroReady();
  const play = inView && ready;

  const postersRef = useRef<HTMLDivElement>(null);
  const postersPlay =
    useInView(postersRef, { threshold: 0.15, once: false }) && ready;

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
          {loading && posterImages.length === 0 && (
            <p className="py-10 text-sm text-gray-600">Loading achievements...</p>
          )}

          {!loading && posterImages.length === 0 && (
            <p className="py-10 text-sm text-gray-600">
              No achievement posters are available right now.
            </p>
          )}

          {posterImages.length > 0 && (
            // Phones: a tilted two-column stack. sm and up: leaves placed in a
            // tree-crown shape, sized in container units of the canopy box.
            <div
              role="list"
              aria-label="Student achievement posters"
              className="mx-auto mt-5 max-w-[1170px] columns-2 gap-3 sm:relative sm:mt-8 sm:aspect-[16/10] sm:columns-auto sm:[container-type:size] lg:mt-10"
            >
              {/* Trunk and branches, mostly hidden behind the leaves. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 hidden h-full w-full text-[#c9a37c] sm:block"
              >
                <path d="M47 100 L48.5 70 L51.5 70 L53 100 Z" fill="currentColor" opacity="0.45" />
                {LEAVES.slice(0, posterImages.length).map((leaf, index) => (
                  <path
                    key={index}
                    d={`M50 82 Q${(50 + leaf.x) / 2} ${leaf.y + 12} ${leaf.x} ${leaf.y}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    opacity="0.55"
                  />
                ))}
              </svg>

              {posterImages.map((poster, index) => {
                const leaf = LEAVES[index];
                const ratio = ratios[poster.id] ?? DEFAULT_RATIO;

                return (
                  <div
                    key={poster.id}
                    role="listitem"
                    style={
                      {
                        "--x": `${leaf.x}%`,
                        "--y": `${leaf.y}%`,
                        "--bw": `${leaf.w}cqw`,
                        "--bh": `${leaf.h}cqh`,
                        "--ratio": ratio,
                        "--rot": `${leaf.rot}deg`,
                        "--z": leaf.z,
                      } as CSSProperties
                    }
                    className="group mb-3 break-inside-avoid sm:absolute sm:left-[var(--x)] sm:top-[var(--y)] sm:z-[var(--z)] sm:mb-0 sm:w-[min(var(--bw),calc(var(--bh)*var(--ratio)))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:hover:z-50 sm:focus-within:z-50"
                  >
                    <button
                      type="button"
                      aria-label={`Enlarge achievement poster: ${poster.name}`}
                      onClick={() => setOpenPoster(poster)}
                      style={
                        {
                          "--poster-from": index % 2 ? "-48px" : "48px",
                          "--intro-delay": `${index * 120}ms`,
                        } as CSSProperties
                      }
                      className="intro-item poster-crawl block w-full rotate-[var(--rot)] cursor-zoom-in rounded-xl bg-card-cream p-1.5 shadow-[0_12px_18px_rgba(44,34,25,0.22)] transition-[rotate,scale,box-shadow] duration-500 hover:rotate-0 hover:scale-[1.06] hover:shadow-[0_20px_35px_rgba(44,34,25,0.3)] focus-visible:rotate-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a96b39] sm:rounded-[18px] sm:p-2.5"
                    >
                      <div
                        className="relative w-full overflow-hidden rounded-lg bg-photo-placeholder sm:rounded-[12px]"
                        style={{ aspectRatio: ratio }}
                      >
                        <Image
                          src={poster.imageUrl}
                          alt={poster.name}
                          fill
                          unoptimized
                          sizes="(min-width: 640px) 380px, 45vw"
                          className="object-cover"
                          priority={index === 0}
                          onLoad={(event) => {
                            const { naturalWidth, naturalHeight } =
                              event.currentTarget;
                            if (!naturalWidth || !naturalHeight) return;
                            setRatios((current) => ({
                              ...current,
                              [poster.id]: naturalWidth / naturalHeight,
                            }));
                          }}
                        />
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {openPoster && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openPoster.name}
          onClick={() => setOpenPoster(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm sm:p-10"
        >
          <button
            type="button"
            aria-label="Close poster"
            autoFocus
            onClick={() => setOpenPoster(null)}
            className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-[#5f3b1d] shadow-lg transition hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative h-full w-full max-w-5xl">
            <Image
              src={openPoster.imageUrl}
              alt={openPoster.name}
              fill
              unoptimized
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
