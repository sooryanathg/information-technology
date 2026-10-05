"use client";

import { useRef } from "react";
import Image from "next/image";
import { useInView, useIntroReady } from "@/lib/intro";
import type { EventItem } from "./data/dataset";

type Props = {
  event: EventItem;
  /** Position in the grid; cards further along a row arrive a moment later. */
  index: number;
};

export default function EventCard({ event, index }: Props) {
  // Every time the card scrolls into view it crawls into place, like the
  // posters on the home page.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.15, once: false });
  const ready = useIntroReady();

  return (
    <div ref={ref} data-intro={inView && ready ? "play" : "pending"} className="flex">
      <article
        style={{ "--poster-from": "64px", "--intro-delay": `${(index % 3) * 120}ms` } as React.CSSProperties}
        className="intro-item poster-crawl flex w-full flex-col overflow-hidden rounded-[32px] bg-card-cream shadow-card"
      >
        <div className="relative h-72 bg-photo-placeholder">
          {event.image && (
            <Image
              src={event.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover sepia-[0.35]"
            />
          )}
          <span className="absolute left-6 top-6 rounded-full bg-white/70 px-4 py-1 text-sm font-medium text-cocoa backdrop-blur-md">
            {event.mode}
          </span>
        </div>

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
              Register
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
