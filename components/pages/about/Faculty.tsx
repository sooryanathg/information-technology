"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useInView, useIntroReady } from "@/lib/intro";
import { facultyMembers, type FacultyCategory } from "./data/faculty";
import SectionHeading from "./SectionHeading";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const TABS: FacultyCategory[] = ["Teaching staff", "Technical staff"];

// The cards crawl into place one after another, rising and falling in turn
// like the posters on the home page.
const crawl = (i: number) =>
  ({ "--poster-from": i % 2 ? "-64px" : "64px", "--intro-delay": `${200 + i * 110}ms` }) as React.CSSProperties;

export default function Faculty() {
  const [activeTab, setActiveTab] = useState<FacultyCategory>("Teaching staff");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  // Every time the cards scroll into view they step in again.
  const bodyRef = useRef<HTMLDivElement>(null);
  const inView = useInView(bodyRef, { threshold: 0.15, once: false });
  const ready = useIntroReady();
  const play = inView && ready;
  const intro = play ? "play" : "pending";

  const filtered = useMemo(
    () => facultyMembers.filter((f) => f.category === activeTab),
    [activeTab]
  );

  function handleTabChange(tab: FacultyCategory) {
    setActiveTab(tab);
    setActiveDot(0);
    scrollRef.current?.scrollTo({ left: 0 });
  }

  
  function handleScroll() {
    const el = scrollRef.current;
    if (!el || filtered.length === 0) return;

    
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
      setActiveDot(filtered.length - 1);
      return;
    }

    const cardWidth = el.scrollWidth / filtered.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveDot(Math.min(index, filtered.length - 1));
  }

  
  function scrollByCard(dir: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 324, behavior: "smooth" });
  }

  return (
    <section className={`${poppins.className} md:min-h-[700px] `}>
      <div className="mx-auto w-full max-w-[1800px] px-4 py-15 sm:px-6 md:px-10 lg:px-16 lg:py-16 xl:px-24">
        <SectionHeading
          text="Faculty"
          className="text-3xl font-bold uppercase text-[#2A2522] sm:text-4xl xl:text-5xl"
          barClassName="mt-2 h-[3px] w-[80px] rounded-full bg-[#C9963A]"
        />

        <div ref={bodyRef} data-intro={intro}>
          {/* Tabs */}
          <div className="intro-item intro-fade mt-5 flex flex-wrap gap-4">
            {TABS.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`pixel-glitch rounded-lg px-6 py-2.5 text-sm font-medium transition sm:text-base ${
                    isActive
                      ? "bg-[#B9752F] text-white"
                      : "bg-[#E3B67C] text-[#2A2522] hover:bg-[#D9A567]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* One swipeable strip of cards on every screen size; arrows on desktop, swipe on touch. */}
          <p className="intro-item intro-fade mt-6 text-sm text-[#6B6560] md:hidden">
            Swipe to see all {filtered.length} →
          </p>
          <div className="mt-3 md:mt-15">
            <div className="relative">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex snap-x snap-mandatory scroll-smooth gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:snap-proximity md:gap-6 [&::-webkit-scrollbar]:hidden"
              >
                {filtered.map((member, i) => (
                  <div
                    // Keyed by tab too, so a new tab's cards crawl in afresh.
                    key={`${activeTab}-${member.id}`}
                    style={crawl(i)}
                    className="intro-item poster-crawl w-[44vw] max-w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl bg-[#FBF3E8] shadow-sm sm:w-[240px] sm:max-w-none lg:w-[19%] lg:min-w-[230px] lg:max-w-[270px]"
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="300px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="p-3 sm:p-5">
                      <p className="text-sm font-bold leading-snug text-[#2A2522] sm:text-base">{member.name}</p>
                      <p className="text-xs text-[#6B6560] sm:text-sm">{member.designation}</p>
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="mt-1 block truncate text-[11px] italic text-[#8A7B6D] hover:text-[#B9752F] sm:text-xs"
                        >
                          {member.email}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollByCard(-1)}
                aria-label="Scroll left"
                className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-[#2A2522] shadow-md transition hover:bg-white md:flex"
              >
                ‹
              </button>
              <button
                onClick={() => scrollByCard(1)}
                aria-label="Scroll right"
                className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-[#2A2522] shadow-md transition hover:bg-white md:flex"
              >
                ›
              </button>
            </div>

            {filtered.length > 1 && (
              <div
                className="intro-item intro-fade mt-6 flex justify-center md:mt-12"
                // The dots fade in slowly, once the cards have settled.
                style={{ "--intro-delay": "900ms", "--intro-fade-duration": "1100ms", "--intro-fade-steps": 10 } as React.CSSProperties}
              >
                <div className="flex items-center gap-1.5 rounded-full bg-[#FBEBD3] px-3 py-2.5 shadow-[0_2px_6px_rgba(0,0,0,0.08)] md:gap-3 md:px-4 md:py-3">
                  {filtered.map((member, i) => (
                    <span
                      key={member.id}
                      className={`h-1.5 w-3.5 rounded-full transition-colors md:h-2 md:w-[46px] ${
                        i === activeDot ? "bg-[#EE9B1E]" : "bg-[#FFD69B]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}