import { categories, type EventCategory, type EventStatus } from "./data/dataset";

/** Anchor on the filter row; the hero's "View Past Events" link targets it. */
export const PAST_EVENTS_ANCHOR = "past-events";

export type StatusFilter = EventStatus | "all";

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "upcoming", label: "Up Coming" },
  { value: "past", label: "Past" },
  { value: "all", label: "All" },
];

export type FilterState = {
  category: EventCategory | "all";
  status: StatusFilter;
  date: string;
  query: string;
};

type Props = {
  value: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
};

const inputClass =
  "h-[42px] w-full rounded-md border border-[#3F3025]/12 bg-white px-3 text-sm text-[#3F3025] shadow-[0_2px_6px_rgba(80,45,20,0.1)] outline-none placeholder:text-[#3F3025]/75 focus-visible:border-[#C98C5F] focus-visible:ring-3 focus-visible:ring-[#C98C5F]/30";

export default function EventFilters({ value, onChange }: Props) {
  return (
    // Anchor target for the hero's "View Past Events" link.
    <div
      id={PAST_EVENTS_ANCHOR}
      className="mx-auto grid max-w-[1070px] scroll-mt-24 grid-cols-2 gap-4 md:grid-cols-4 md:gap-[60px]"
    >
      <div className="relative">
        <select
          aria-label="Category"
          value={value.category}
          onChange={(e) => onChange({ category: e.target.value as FilterState["category"] })}
          className={`${inputClass} appearance-none pr-8`}
        >
          <option value="all">All Category</option>
          {categories.map((c) => (
            <option key={c.title} value={c.title}>
              {c.title}
            </option>
          ))}
        </select>
        <Chevron />
      </div>

      <input
        type="date"
        aria-label="Select date"
        value={value.date}
        onChange={(e) => onChange({ date: e.target.value })}
        className={inputClass}
      />

      <div className="relative">
        <select
          aria-label="Status"
          value={value.status}
          onChange={(e) => onChange({ status: e.target.value as StatusFilter })}
          className={`${inputClass} appearance-none pr-8`}
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Chevron />
      </div>

      <input
        type="search"
        aria-label="Search events"
        placeholder="Search Events"
        value={value.query}
        onChange={(e) => onChange({ query: e.target.value })}
        className={inputClass}
      />
    </div>
  );
}

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 8"
      fill="none"
      stroke="#2B2119"
      strokeWidth="1.6"
      className="pointer-events-none absolute right-3 top-1/2 h-2 w-3 -translate-y-1/2"
    >
      <path d="M1 1.5l5 5 5-5" />
    </svg>
  );
}
