"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useInView, useIntroReady } from "@/lib/intro";
import { eventStatus, type EventItem } from "./data/dataset";
import EventImageTransition from "./EventImageTransition";

const dayFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", timeZone: "UTC" });
const fullFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

// "2026-08-11" -> "11 Aug 2026"; with an end date in the same month -> "11–14 Aug 2026".
function formatEventDate(date?: string, endDate?: string) {
  if (!date) return "";
  const start = new Date(`${date}T00:00:00Z`);
  if (!endDate || endDate === date) return fullFormat.format(start);
  const end = new Date(`${endDate}T00:00:00Z`);
  return date.slice(0, 7) === endDate.slice(0, 7)
    ? `${dayFormat.format(start)}–${fullFormat.format(end)}`
    : `${fullFormat.format(start)} – ${fullFormat.format(end)}`;
}

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
  const isPast = eventStatus(event) === "past";
  const dateLabel = formatEventDate(event.date, event.endDate);

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
        // Past events are shown in black and white.
        className={`group flex w-full flex-col overflow-hidden rounded-[32px] bg-card-cream shadow-card transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_35px_rgb(90_55_25_/_0.22)] ${
          isPast ? "grayscale" : ""
        }`}
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
          {isPast && (
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-mocha/80">
              Past event
            </p>
          )}
          <h3 className="mb-2 text-2xl font-extrabold leading-tight">{event.title}</h3>
          <p className="mb-4 text-sm leading-snug text-mocha">{event.description}</p>

          <dl className="mb-5 space-y-1.5 text-sm text-mocha">
            {dateLabel && (
              <div className="flex items-center gap-2">
                <dt className="sr-only">Date</dt>
                <svg aria-hidden viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-4 shrink-0">
                  <rect x="2" y="3" width="12" height="11" rx="2" />
                  <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" strokeLinecap="round" />
                </svg>
                <dd>{dateLabel}</dd>
              </div>
            )}
            <div className="flex items-center gap-2">
              <dt className="sr-only">Time</dt>
              <Image src="/events/clock.webp" alt="" width={16} height={16} />
              <dd>{event.time ?? event.duration}</dd>
            </div>
            {event.venue && (
              <div className="flex items-center gap-2">
                <dt className="sr-only">Venue</dt>
                <svg aria-hidden viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-4 shrink-0">
                  <path d="M8 14.5s4.75-4.2 4.75-8.1a4.75 4.75 0 0 0-9.5 0c0 3.9 4.75 8.1 4.75 8.1Z" />
                  <circle cx="8" cy="6.4" r="1.6" />
                </svg>
                <dd>{event.venue}</dd>
              </div>
            )}
          </dl>

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
              {isPast ? "Recap" : "Register"}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
