"use client";

import { useEffect, useMemo, useState } from "react";
import CategoryBar from "./CategoryBar";
import EventCard from "./EventCard";
import EventFilters, { PAST_EVENTS_ANCHOR, type FilterState } from "./EventFilters";
import { events } from "./data/dataset";

const INITIAL_VISIBLE = 6;
const INITIAL_FILTERS: FilterState = { category: "all", status: "upcoming", date: "", query: "" };
const NO_FILTERS: FilterState = { category: "all", status: "all", date: "", query: "" };

export default function Cards() {
  const [filter, setFilter] = useState<FilterState>(INITIAL_FILTERS);
  const [showAll, setShowAll] = useState(false);
  const update = (patch: Partial<FilterState>) => setFilter((f) => ({ ...f, ...patch }));

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
        (filter.status === "all" || e.status === filter.status) &&
        (!filter.date || e.date === filter.date) &&
        (!query || `${e.title} ${e.description} ${e.org}`.toLowerCase().includes(query))
    );
  }, [filter]);

  const visible = showAll ? matches : matches.slice(0, INITIAL_VISIBLE);

  return (
    <section id="events" className="w-full scroll-mt-6 bg-cream-fade">
      <div className="relative z-20 mx-auto -mt-[72px] w-[90vw] max-w-[1190px] pb-16">
        <CategoryBar active={filter.category} onSelect={(category) => update({ category })} />
        <div className="mt-12">
          <EventFilters value={filter} onChange={update} />
        </div>
      </div>

      <div className="mx-auto w-[90vw] max-w-[1344px] pb-20">
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg">No events match these filters.</p>
        )}
      </div>

      <div className="flex justify-center pb-24">
        <button
          type="button"
          onClick={() => {
            setFilter(NO_FILTERS);
            setShowAll(true);
          }}
          className="h-16 rounded-full bg-caramel px-[70px] font-heading text-[22px] font-semibold text-white shadow-raised transition hover:brightness-95"
        >
          Explore All
        </button>
      </div>
    </section>
  );
}
