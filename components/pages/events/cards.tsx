"use client";

import { useEffect, useMemo, useState } from "react";
import CategoryBar from "./CategoryBar";
import EventCard from "./EventCard";
import EventFilters, { PAST_EVENTS_ANCHOR, type FilterState } from "./EventFilters";
import { events } from "./data/dataset";
import { inter, poppins } from "./fonts";

const INITIAL_VISIBLE = 6;

const INITIAL_FILTERS: FilterState = { category: "all", status: "upcoming", date: "", query: "" };

const SHOW_EVERYTHING: FilterState = { category: "all", status: "all", date: "", query: "" };

export default function Cards() {
  const [filter, setFilter] = useState<FilterState>(INITIAL_FILTERS);
  const [showAll, setShowAll] = useState(false);
  const update = (patch: Partial<FilterState>) => setFilter((f) => ({ ...f, ...patch }));

  // The hero's "View Past Events" link points at the filters' anchor.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === `#${PAST_EVENTS_ANCHOR}`) setFilter((f) => ({ ...f, status: "past" }));
    };
    const raf = requestAnimationFrame(sync);
    window.addEventListener("hashchange", sync);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const matches = useMemo(() => {
    const q = filter.query.trim().toLowerCase();
    return events.filter(
      (e) =>
        (filter.category === "all" || e.category === filter.category) &&
        (filter.status === "all" || e.status === filter.status) &&
        (!filter.date || e.date === filter.date) &&
        (!q || `${e.title} ${e.description} ${e.org}`.toLowerCase().includes(q))
    );
  }, [filter]);

  const visible = showAll ? matches : matches.slice(0, INITIAL_VISIBLE);

  return (
    <section
      id="events"
      className={`w-full scroll-mt-6 bg-[linear-gradient(180deg,#FFFBF7_0%,#FBEFE3_45%,#EBCBA6_100%)] ${inter.className}`}
    >
      <div className="relative z-20 mx-auto -mt-[72px] w-[90vw] max-w-[1190px] pb-16">
        <CategoryBar active={filter.category} onSelect={(category) => update({ category })} />
        <div className="mt-12">
          <EventFilters value={filter} onChange={update} />
        </div>
      </div>

      {/* Wider than the category bar, as in the design. */}
      <div className="mx-auto w-[90vw] max-w-[1344px] pb-20">
        {visible.length ? (
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-[#2B2119]">No events match these filters.</p>
        )}
      </div>

      <div className="flex justify-center pb-24">
        <button
          type="button"
          onClick={() => {
            setFilter(SHOW_EVERYTHING);
            setShowAll(true);
          }}
          className={`${poppins.className} h-16 rounded-full bg-[#B8804F] px-[70px] text-[22px] font-semibold text-white shadow-[0_4px_12px_rgba(120,70,30,0.25)] transition-colors hover:bg-[#a9733f]`}
        >
          Explore All
        </button>
      </div>
    </section>
  );
}
