"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  title: string;
  mode: string;
  priority?: boolean;
  inView?: boolean;
  cardIndex?: number;
  isParentHovered?: boolean;
};

export default function EventImageTransition({
  images,
  title,
  mode,
  priority = false,
  inView = true,
  cardIndex = 0,
  isParentHovered = false,
}: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const count = images.length;
  const hasMultiple = count > 1;
  const isPaused = isHovered || isParentHovered;

  // Stagger switch intervals so cards don't all flip at the exact same millisecond
  const intervalMs = 3500 + (cardIndex % 3) * 600;

  useEffect(() => {
    if (!hasMultiple || !inView || isPaused) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % count);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [hasMultiple, inView, isPaused, count, intervalMs]);

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveIdx((prev) => (prev + 1) % count);
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveIdx((prev) => (prev - 1 + count) % count);
  };

  const goToIdx = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveIdx(idx);
  };

  return (
    <div
      className="relative h-72 w-full overflow-hidden bg-photo-placeholder"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`${title} image gallery`}
    >
      {/* Images with smooth crossfade transition */}
      {images.map((src, i) => {
        const isActive = i === activeIdx;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isActive ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            <Image
              src={src}
              alt={`${title} - photo ${i + 1}`}
              fill
              unoptimized={src.startsWith("http")}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority={priority && i === 0}
              className="object-cover sepia-[0.25] transition-all duration-500 ease-out group-hover:scale-110 group-hover:sepia-0"
            />
          </div>
        );
      })}

      {/* Mode badge at top left */}
      <span className="absolute left-6 top-6 z-20 rounded-full bg-white/80 px-4 py-1 text-sm font-medium text-cocoa shadow-sm backdrop-blur-md">
        {mode}
      </span>

      {/* Multiple photos indicator badge at top right */}
      {hasMultiple && (
        <span className="absolute right-6 top-6 z-20 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-md transition-opacity duration-300">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-3.5 opacity-90"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.22a.75.75 0 00-1.06 0l-1.91 1.91-4.72-4.72a.75.75 0 00-1.06 0L2.5 11.06zm12-4.81a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            {activeIdx + 1}/{count}
          </span>
        </span>
      )}

      {/* Prev / Next navigation arrows on hover for multi-image events */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 backdrop-blur-md transition-all duration-200 hover:bg-black/70 hover:scale-110 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 backdrop-blur-md transition-all duration-200 hover:bg-black/70 hover:scale-110 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </>
      )}

      {/* Indicator dots at the bottom */}
      {hasMultiple && (
        <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-1.5 px-4">
          <div className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 backdrop-blur-md">
            {count <= 8 ? (
              images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => goToIdx(e, i)}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIdx
                      ? "w-4 bg-white"
                      : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))
            ) : (
              // For larger galleries (>8 images), show compact progress bar dots
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-white px-1">
                <span className="w-16 h-1 rounded-full bg-white/30 overflow-hidden relative">
                  <span
                    className="absolute inset-y-0 left-0 bg-white rounded-full transition-all duration-500"
                    style={{
                      width: `${((activeIdx + 1) / count) * 100}%`,
                    }}
                  />
                </span>
                <span className="text-[10px] text-white/90">
                  {activeIdx + 1}/{count}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
