"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "./data/gallery";

interface Props {
  items: GalleryItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const SWIPE_DISTANCE = 50; // px

// Full-screen photo viewer: arrows, keyboard (← → Esc), swipe on touch screens,
// and a thumbnail strip to jump between photos. Wraps around at both ends.
export default function GalleryLightbox({ items, index, onIndexChange, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const item = items[index];

  const go = (step: 1 | -1) => onIndexChange((index + step + items.length) % items.length);

  // Keyboard, page scroll lock, and focus: into the viewer on open, back to the photo on close.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onIndexChange((index + 1) % items.length);
      else if (e.key === "ArrowLeft") onIndexChange((index - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, items.length, onClose, onIndexChange]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, []);

  // Keep the current thumbnail in view.
  useEffect(() => {
    thumbsRef.current
      ?.querySelector<HTMLElement>(`[data-thumb="${index}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [index]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${items.length}${item.label ? `: ${item.label}` : ""}`}
      className="fixed inset-0 z-[100] flex flex-col bg-[#120b06]/95 font-heading text-white backdrop-blur-md"
      onClick={onClose}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > SWIPE_DISTANCE) go(dx < 0 ? 1 : -1);
      }}
    >
      {/* Top bar: label, counter, close */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex min-w-0 items-center gap-3">
          {item.label && (
            <>
              <span className="h-4 w-[2px] shrink-0 bg-[#E05B3C]" />
              <span className="truncate text-sm font-semibold uppercase tracking-wide sm:text-base">
                {item.label}
              </span>
            </>
          )}
          <span className="shrink-0 text-sm text-white/60">
            {index + 1} / {items.length}
          </span>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-tan"
        >
          <X className="size-6" />
        </button>
      </div>

      {/* Photo with previous / next */}
      <div className="relative min-h-0 flex-1 px-2 sm:px-20">
        <div key={item.id} className="lightbox-photo relative mx-auto h-full w-full max-w-[1400px]">
          <Image
            src={item.image}
            alt={item.label || "Gallery photo"}
            fill
            sizes="100vw"
            priority
            className="object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2.5 backdrop-blur-sm transition hover:bg-white/20 sm:left-5 sm:block"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2.5 backdrop-blur-sm transition hover:bg-white/20 sm:right-5 sm:block"
            >
              <ChevronRight className="size-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {items.length > 1 && (
        <div
          ref={thumbsRef}
          className="flex justify-start gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:justify-center sm:py-4 [&::-webkit-scrollbar]:hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((thumb, i) => (
            <button
              key={thumb.id}
              type="button"
              data-thumb={i}
              onClick={() => onIndexChange(i)}
              aria-label={`Show photo ${i + 1}${thumb.label ? `: ${thumb.label}` : ""}`}
              aria-current={i === index}
              className={`relative h-12 w-[72px] shrink-0 overflow-hidden rounded-md transition sm:h-14 sm:w-20 ${
                i === index ? "opacity-100 ring-2 ring-tan" : "opacity-45 hover:opacity-80"
              }`}
            >
              <Image src={thumb.image} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
