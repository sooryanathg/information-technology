"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CategoryBar from "./CategoryBar";
import EventCard from "./EventCard";
import EventFilters, { PAST_EVENTS_ANCHOR, type FilterState } from "./EventFilters";
import { eventStatus } from "./data/dataset";
import { events } from "./data/events";
import { useInView, useIntroReady } from "@/lib/intro";

const INITIAL_VISIBLE = 6;
const NO_FILTERS: FilterState = { category: "all", status: "all", date: "", query: "" };

export default function Cards() {
  const hasUpcoming = events.some((e) => eventStatus(e) === "upcoming");
  // With nothing coming up, open on past events instead of an empty list.
  const [filter, setFilter] = useState<FilterState>(() => ({
    category: "all",
    status: hasUpcoming ? "upcoming" : "past",
    date: "",
    query: "",
  }));
  const [showAll, setShowAll] = useState(false);
  const update = (patch: Partial<FilterState>) => setFilter((f) => ({ ...f, ...patch }));
  // Every time the filters scroll into view they step in again.
  const filtersRef = useRef<HTMLDivElement>(null);
  const filtersInView = useInView(filtersRef, { threshold: 0.6, once: false });
  const ready = useIntroReady();

  useEffect(() => {
    const syncWithHash = () => {
      if (window.location.hash === `#${PAST_EVENTS_ANCHOR}`) setFilter((f) => ({ ...f, status: "past" }));
    };
    const raf = requestAnimationFrame(syncWithHash);
    window.addEventListener("hashchange", syncWithHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", syncWithHash);
    };
  }, []);

  const matches = useMemo(() => {
    const query = filter.query.trim().toLowerCase();
    return events.filter(
      (e) =>
        (filter.category === "all" || e.category === filter.category) &&
        (filter.status === "all" || eventStatus(e) === filter.status) &&
        (!filter.date || (!!e.date && e.date <= filter.date && filter.date <= (e.endDate ?? e.date))) &&
        (!query || `${e.title} ${e.description} ${e.org}`.toLowerCase().includes(query))
    );
  }, [filter]);

  const visible = showAll ? matches : matches.slice(0, INITIAL_VISIBLE);

  return (
    <section id="events" className="w-full scroll-mt-6 bg-cream-fade">
      <div className="relative z-20 mx-auto -mt-[72px] w-[90vw] max-w-[1190px] pb-16">
        <CategoryBar active={filter.category} onSelect={(category) => update({ category })} />
        <div ref={filtersRef} data-intro={filtersInView && ready ? "play" : "pending"} className="mt-12">
          <EventFilters value={filter} onChange={update} />
        </div>
      </div>

      <div className="mx-auto w-[90vw] max-w-[1344px] pb-20">
        {!hasUpcoming && (
          <p className="mx-auto mb-10 flex w-fit max-w-full items-center gap-3 rounded-full border border-cocoa/20 bg-white/70 px-5 py-2.5 text-center text-sm text-mocha shadow-soft">
            <span aria-hidden className="size-2 shrink-0 rounded-full bg-cocoa/40" />
            No upcoming events right now. Everything below is a past event; new ones will be
            posted here soon.
          </p>
        )}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">
            {filter.status === "upcoming" && !hasUpcoming
              ? "No upcoming events right now. Check back soon."
              : "No events match these filters."}
          </p>
        )}
      </div>

      <div className="flex justify-center pb-24">
        <button
          type="button"
          onClick={() => {
            setFilter(NO_FILTERS);
            setShowAll(true);
          }}
          className="pixel-glitch h-16 rounded-full bg-caramel px-[70px] font-heading text-[22px] font-semibold text-white shadow-raised transition hover:brightness-95"
        >
          Explore All
        </button>
      </div>
    </section>
  );
}
