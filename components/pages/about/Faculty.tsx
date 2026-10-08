"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useInView, useIntroReady } from "@/lib/intro";
import { facultyMembers, type FacultyCategory } from "./data/faculty";
import SectionHeading from "./SectionHeading";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const TABS: FacultyCategory[] = ["Teaching staff", "Technical staff"];

const MOBILE_PAGE_SIZE = 2;

// The cards crawl into place one after another, rising and falling in turn
// like the posters on the home page.
const crawl = (i: number) =>
  ({ "--poster-from": i % 2 ? "-64px" : "64px", "--intro-delay": `${200 + i * 110}ms` }) as React.CSSProperties;
const stepIn = (i: number) => ({ "--intro-delay": `${i * 110}ms` }) as React.CSSProperties;

export default function Faculty() {
  const [activeTab, setActiveTab] = useState<FacultyCategory>("Teaching staff");
  const [visibleCount, setVisibleCount] = useState(MOBILE_PAGE_SIZE);
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
    setVisibleCount(MOBILE_PAGE_SIZE); 
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

  const mobileVisible = filtered.slice(0, visibleCount);

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

          <div className="mt-15 hidden md:block">
            <div className="relative">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex snap-x snap-proximity scroll-smooth gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {filtered.map((member, i) => (
                  <div
                    // Keyed by tab too, so a new tab's cards crawl in afresh.
                    key={`${activeTab}-${member.id}`}
                    style={crawl(i)}
                    className="intro-item poster-crawl w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl bg-[#FBF3E8] shadow-sm sm:w-[240px] lg:w-[19%] lg:min-w-[230px] lg:max-w-[270px]"
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
                    <div className="p-5">
                    <p className="text-base font-bold text-[#2A2522]">{member.name}</p>
                      <p className="text-sm text-[#6B6560]">{member.designation}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollByCard(-1)}
                aria-label="Scroll left"
                className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-[#2A2522] shadow-md transition hover:bg-white"
              >
                ‹
              </button>
              <button
                onClick={() => scrollByCard(1)}
                aria-label="Scroll right"
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-[#2A2522] shadow-md transition hover:bg-white"
              >
                ›
              </button>
            </div>

            {filtered.length > 1 && (
              <div
                className="intro-item intro-fade mt-12 flex justify-center"
                // The dots fade in slowly, once the cards have settled.
                style={{ "--intro-delay": "900ms", "--intro-fade-duration": "1100ms", "--intro-fade-steps": 10 } as React.CSSProperties}
              >
                <div className="flex items-center gap-3 rounded-full bg-[#FBEBD3] px-4 py-3 shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
                  {filtered.map((member, i) => (
                    <span
                      key={member.id}
                      className={`h-2 w-[46px] rounded-full transition-colors ${
                        i === activeDot ? "bg-[#EE9B1E]" : "bg-[#FFD69B]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-4 md:hidden">
            {mobileVisible.map((member, i) => (
              <div
                key={`${activeTab}-${member.id}`}
                // Cards that "Load More" adds step in on their own when they mount.
                style={stepIn(i % MOBILE_PAGE_SIZE)}
                className="intro-item intro-fade flex items-center gap-4 rounded-xl border-l-4 border-[#C9963A] bg-[#FBF3E8] p-4 shadow-sm"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-[#C9963A]">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-base font-bold text-[#2A2522]">{member.name}</p>
                  <p className="text-sm text-[#6B6560]">{member.designation}</p>
                  <p className="text-sm italic text-[#6B6560]">{member.email}</p>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="mt-6 flex justify-center md:hidden">
              <button
                onClick={() => setVisibleCount((c) => c + MOBILE_PAGE_SIZE)}
                className="pixel-glitch rounded-lg border border-[#B9752F] px-6 py-2 text-sm font-medium text-[#2A2522] transition hover:bg-[#E3B67C]"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}