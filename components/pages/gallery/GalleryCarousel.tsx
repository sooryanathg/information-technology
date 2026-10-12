"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export interface CarouselSlide {
  id: string;
  image: string;
  label: string;
}

interface Props {
  slides: CarouselSlide[];
  /** Called with the slide nearest the middle whenever it changes. */
  onCenterChange?: (index: number) => void;
}

const SPEED = 38; // px per second
const GAP = 18;
const MAX_TILT = 38; // deg, at the edges of the strip
const MAX_DEPTH = 110; // px brought forward at the edges

// A strip of glass photo cards sliding right to left on a curved wall that wraps
// around the viewer: towards the edges, cards come forward and turn to face the middle.
// Positions are written straight to the DOM every frame, so React never re-renders.
export default function GalleryCarousel({ slides, onCenterChange }: Props) {
  const stripRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const paused = useRef(false);

  // Repeat the slides so the loop never shows a gap, even on wide screens.
  const copies = slides.length < 8 ? 3 : 2;
  const cards = Array.from({ length: copies }, () => slides).flat();

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || cards.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let offset = 0;
    let last = performance.now();
    let center = -1;
    let frame = 0;

    const layout = () => {
      const half = strip.clientWidth / 2;
      const cardWidth = cardRefs.current[0]?.offsetWidth ?? 0;
      const step = cardWidth + GAP;
      const total = step * cards.length;
      let nearest = 0;
      let nearestDist = Infinity;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        // Wrap each card into [-total/2, total/2) around the middle of the strip.
        const x = ((((i * step - offset) % total) + total * 1.5) % total) - total / 2;
        const d = Math.max(-1.25, Math.min(1.25, x / half));
        const depth = Math.abs(d) * MAX_DEPTH;
        el.style.transform = `translate3d(${x - cardWidth / 2}px, 0, ${depth}px) rotateY(${-d * MAX_TILT}deg)`;
        el.style.opacity = String(Math.max(0, 1 - Math.max(0, Math.abs(d) - 0.85) * 2.5));
        el.style.zIndex = String(Math.round(Math.abs(d) * 50));

        if (Math.abs(x) < nearestDist) {
          nearestDist = Math.abs(x);
          nearest = i % slides.length;
        }
      });

      if (nearest !== center) {
        center = nearest;
        onCenterChange?.(nearest);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!paused.current) offset += SPEED * dt;
      layout();
      frame = requestAnimationFrame(tick);
    };

    if (reduceMotion) {
      layout();
      window.addEventListener("resize", layout);
      return () => window.removeEventListener("resize", layout);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [cards.length, slides.length, onCenterChange]);

  return (
    <div
      ref={stripRef}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      className="relative h-[230px] w-full [perspective:1100px] sm:h-[290px] lg:h-[320px]"
      style={{
        // Fade the strip out at both ends.
        maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div className="absolute inset-0 [transform-style:preserve-3d]">
        {cards.map((slide, i) => (
          <div
            key={`${slide.id}-${i}`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            aria-hidden={i >= slides.length}
            className="
              group absolute left-1/2 top-2
              w-[150px] sm:w-[190px] lg:w-[215px]
              will-change-transform
              [-webkit-box-reflect:below_10px_linear-gradient(transparent_70%,rgb(255_255_255/0.18))]
            "
          >
            {/* Glass frame */}
            <div className="rounded-[18px] border border-white/25 bg-white/10 p-1.5 shadow-[0_18px_40px_rgb(0_0_0/0.45),inset_0_1px_0_rgb(255_255_255/0.35)]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[13px]">
                <Image
                  src={slide.image}
                  alt={i < slides.length ? slide.label : ""}
                  fill
                  sizes="(max-width: 640px) 150px, (max-width: 1024px) 190px, 215px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Glossy sheen across the top-left */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgb(255_255_255/0.28)_0%,transparent_38%)]" />
                <span className="absolute bottom-2 left-2 rounded-full border border-white/25 bg-black/30 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                  {slide.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
