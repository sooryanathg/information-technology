import Image from "next/image";
import { PAST_EVENTS_ANCHOR } from "./EventFilters";
import { poppins } from "./fonts";

const ctaBase =
  "flex h-14 w-[260px] items-center justify-center rounded-[10px] border-2 border-[#C98C5F] text-[20px] font-semibold text-white transition-colors [font-family:inherit] md:w-[300px] md:text-[22px]";

export default function HeroSection() {
  return (
    <section className={`relative h-dvh min-h-[600px] w-full ${poppins.className}`}>
      <Image
        src="/events/heroevents.png"
        alt="IT Department building corridor"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 pb-24">
        <div className="flex flex-col items-center gap-10">
          <h1 className="max-w-[1280px] text-center text-[clamp(2rem,4.3vw,4rem)] font-semibold leading-[1.2] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
            Explore, learn and grow exciting events
            <br className="hidden md:block" /> organised by the department of IT
          </h1>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#events" className={`${ctaBase} bg-[#C98C5F]/85 hover:bg-[#C98C5F]`}>
              Explore Events
            </a>
            {/* Jumps to the filters, which switch to "Past" on arrival. */}
            <a
              href={`#${PAST_EVENTS_ANCHOR}`}
              className={`${ctaBase} bg-transparent backdrop-blur-[2px] hover:bg-white/10`}
            >
              View Past Events
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
