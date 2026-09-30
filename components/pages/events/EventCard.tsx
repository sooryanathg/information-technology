import Image from "next/image";
import type { EventItem } from "./data/dataset";

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,#FFF7EC_0%,#F9E3C4_100%)] shadow-[0_8px_24px_rgba(90,55,25,0.18)]">
      {/* Photo, or a warm placeholder until one is added in the dataset. */}
      <div className="relative h-72 bg-[linear-gradient(135deg,#A98463_0%,#D9B48C_55%,#8C6A4F_100%)]">
        {event.image && (
          <Image src={event.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover sepia-[0.35]" />
        )}
        <span className="absolute left-6 top-6 rounded-full bg-white/70 px-4 py-1 text-sm font-medium text-[#3F3025] backdrop-blur-md">
          {event.mode}
        </span>
      </div>

      <div className="flex grow flex-col px-7 pb-6 pt-7 text-[#2B2119]">
        <h3 className="mb-2 text-[24px] font-extrabold leading-tight">{event.title}</h3>
        <p className="mb-4 text-sm leading-snug text-[#4A3B30]">{event.description}</p>

        <div className="mb-5 flex items-center gap-2 text-sm text-[#4A3B30]">
          <Image src="/events/clock.webp" alt="" width={16} height={16} />
          <span>{event.duration}</span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-[#3F3025]/25 pt-5">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D58B5E]">
              <svg viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.5" className="h-4 w-4">
                <circle cx="8" cy="5.5" r="2.75" />
                <path d="M2.75 14c.6-2.8 2.7-4.25 5.25-4.25S12.65 11.2 13.25 14" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-[15px] font-bold">{event.org}</span>
          </div>

          <button
            type="button"
            className="rounded-full border border-[#9C6441] px-5 py-1.5 text-xs font-bold tracking-[0.08em] text-[#9C6441] transition-colors hover:bg-[#9C6441] hover:text-white"
          >
            REGISTER
          </button>
        </div>
      </div>
    </article>
  );
}
