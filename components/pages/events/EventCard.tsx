"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useInView, useIntroReady } from "@/lib/intro";
import type { EventItem } from "./data/dataset";
import EventImageTransition from "./EventImageTransition";

type Props = {
  event: EventItem;
  /** Position in the grid; cards further along a row arrive a moment later. */
  index: number;
};

export default function EventCard({ event, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.15, once: false });
  const ready = useIntroReady();
  const [isHovered, setIsHovered] = useState(false);

  const imageList =
    event.images && event.images.length > 0
      ? event.images
      : event.image
        ? [event.image]
        : [];

  // Stagger calculation: 90ms offset per card index in the grid
  const staggerDelay = `${(index % 6) * 90}ms`;

  return (
    <div
      ref={ref}
      data-intro={inView && ready ? "play" : "pending"}
      style={{ "--stagger-delay": staggerDelay } as React.CSSProperties}
      className="card-fade-up flex h-full"
    >
      <article
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group flex w-full flex-col overflow-hidden rounded-[32px] bg-card-cream shadow-card transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_35px_rgb(90_55_25_/_0.22)]"
      >
        <EventImageTransition
          images={imageList}
          title={event.title}
          mode={event.mode}
          priority={index < 3}
          inView={inView}
          cardIndex={index}
          isParentHovered={isHovered}
        />

        <div className="flex grow flex-col px-7 pb-6 pt-7">
          <h3 className="mb-2 text-2xl font-extrabold leading-tight">{event.title}</h3>
          <p className="mb-4 text-sm leading-snug text-mocha">{event.description}</p>

          <div className="mb-5 flex items-center gap-2 text-sm text-mocha">
            <Image src="/events/clock.webp" alt="" width={16} height={16} />
            <span>{event.duration}</span>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-cocoa/25 pt-5">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-apricot">
                <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.5" className="size-4">
                  <circle cx="8" cy="5.5" r="2.75" />
                  <path d="M2.75 14c.6-2.8 2.7-4.25 5.25-4.25S12.65 11.2 13.25 14" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-[15px] font-bold">{event.org}</span>
            </div>

            <button
              type="button"
              className="pixel-glitch rounded-full border border-clay px-5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-clay transition-colors hover:bg-clay hover:text-white"
            >
              {event.status === "past" ? "Recap" : "Register"}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
