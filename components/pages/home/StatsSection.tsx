"use client";

import { useRef } from "react";
import {
  Award,
  BookOpenText,
  BrainCircuit,
  CalendarDays,
  FlaskConical,
  GraduationCap,
  UsersRound,
} from "lucide-react";
import CountUp from "@/components/transitions/CountUp";
import HilbertReveal, { revealMidpoint } from "@/components/transitions/HilbertReveal";
import { useInView, useIntroReady } from "@/lib/intro";

// Every card has the same four parts, at the same heights: icon, figure,
// label and a line of detail.
const stats = [
  { value: "~300", label: "Students", detail: "B.Tech + M.Tech", Icon: UsersRound },
  { value: "63 + 6", label: "B.Tech Seats", detail: "IT · since 1999 · 6 lateral entry", Icon: GraduationCap },
  { value: "18", label: "M.Tech Seats", detail: "AI & Data Science · since 2024", Icon: BrainCircuit },
  { value: "25+", label: "Years", detail: "Since 1999", Icon: CalendarDays },
  { value: "5+", label: "Labs", detail: "Seminar hall · Department library", Icon: FlaskConical },
  { value: "13", label: "Faculty", detail: "+ 12 non-teaching staff", Icon: BookOpenText },
  { value: "46", label: "Rank Holders", detail: "2006–2022", Icon: Award },
];

export default function StatsSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  // Every time the panel scrolls into view, a Hilbert curve uncovers it tile by
  // tile, brown panel and white tile together, and the numbers count up.
  const inView = useInView(gridRef, { once: false });
  const ready = useIntroReady();
  const play = inView && ready;

  return (
    <section
      aria-label="Department statistics"
      // Room above the panel, so the hero's pixels can be seen running up before the panel arrives.
      className="px-4 pb-3 pt-14 sm:px-8 sm:pb-6 sm:pt-24 lg:px-12 lg:pb-8 lg:pt-32"
    >
      <div
        ref={gridRef}
        className="
          relative z-10 mx-auto grid max-w-[1357px] grid-cols-2 gap-2
          rounded-[6px] bg-[#5D442F] p-1.5
          sm:grid-cols-4 sm:gap-2 sm:rounded-[12px] sm:p-2
          lg:grid-cols-7 lg:gap-3 lg:rounded-[19px] lg:p-3
        "
      >
        {stats.map(({ value, label, detail, Icon }, i) => (
          <div
            key={label}
            data-reveal
            // Seven cards: the last one fills its row on phones (2 columns) and tablets (4).
            className={`pixel-glitch flex flex-col items-center gap-1 rounded-[3px] bg-[#fffaf4] px-2 py-3 text-center sm:gap-1.5 sm:py-4 lg:gap-2 lg:rounded-xl lg:py-5 ${
              i === stats.length - 1 ? "col-span-2 lg:col-span-1" : ""
            }`}
          >
            <Icon aria-hidden="true" className="h-7 w-7 text-black sm:h-9 sm:w-9 lg:h-11 lg:w-11" strokeWidth={1.5} />
            <p className="whitespace-nowrap font-heading text-lg font-bold leading-tight text-black sm:text-xl lg:text-2xl">
              <CountUp text={value} play={play} delay={revealMidpoint(i)} />
            </p>
            <p className="font-heading text-xs font-bold leading-tight text-black sm:text-sm lg:text-base">{label}</p>
            <p className="text-[0.66rem] font-medium leading-snug text-[#6b5541] sm:text-xs lg:text-[0.8rem]">{detail}</p>
          </div>
        ))}
        <HilbertReveal play={play} />
      </div>
    </section>
  );
}
