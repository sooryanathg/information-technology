"use client";

import { useRef } from "react";
import Image from "next/image";
import HilbertReveal from "@/components/transitions/HilbertReveal";
import { useInView, useIntroReady } from "@/lib/intro";
import { categories, type EventCategory } from "./data/dataset";

type Props = {
  active: EventCategory | "all";
  onSelect: (category: EventCategory | "all") => void;
};

export default function CategoryBar({ active, onSelect }: Props) {
  // Every time the bar scrolls into view, a Hilbert curve uncovers it tile by
  // tile, like the stats panel on the home page.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });
  const ready = useIntroReady();

  return (
    <div ref={ref} className="relative grid grid-cols-2 shadow-panel md:grid-cols-4">
      {categories.map((c) => {
        const isActive = active === c.title;
        return (
          <button
            key={c.title}
            data-reveal
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(isActive ? "all" : c.title)}
            className={`pixel-glitch flex flex-col items-center justify-center gap-4 py-10 text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white md:py-14 ${c.color} ${
              isActive ? "shadow-[inset_0_-5px_0_rgb(255_255_255/0.85)]" : ""
            }`}
          >
            <Image src={c.icon} alt="" width={80} height={64} className="h-16 w-auto" />
            <span className="font-heading text-2xl font-semibold md:text-[34px]">{c.title}</span>
          </button>
        );
      })}
      <HilbertReveal play={inView && ready} />
    </div>
  );
}
