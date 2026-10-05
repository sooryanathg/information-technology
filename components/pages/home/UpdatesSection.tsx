"use client";

import { useRef } from "react";
import HilbertLines from "@/components/transitions/HilbertLines";
import HilbertReveal from "@/components/transitions/HilbertReveal";
import NotificationsSection from "./NotificationsSection";
import ResourcesSection from "./ResourcesSection";
import { useInView, useIntroReady } from "@/lib/intro";

export default function UpdatesSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  // Every time the two panels scroll into view, a Hilbert curve uncovers them
  // tile by tile, one after the other, like the stats panel.
  const inView = useInView(gridRef, { threshold: 0.2, once: false });
  const ready = useIntroReady();

  return (
    <section
      aria-label="Department resources and notifications"
      className="relative bg-[#6b5541] px-8 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
    >
      {/* Hilbert curves behind the panels, which frame them the way the checks frame the cream sections. */}
      <HilbertLines />
      <div ref={gridRef} className="relative z-10 mx-auto grid max-w-[1357px] gap-8 md:grid-cols-2 md:gap-8">
        <NotificationsSection />
        <ResourcesSection />
        <HilbertReveal play={inView && ready} />
      </div>
    </section>
  );
}
