"use client";

import { useRef } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { galleryItems, type GalleryItem } from "./data/gallery";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function GalleryGrid() {
 
  const rows: GalleryItem[][] = [];
  const rowIndexByNumber = new Map<number, number>();

  for (const item of galleryItems) {
    let idx = rowIndexByNumber.get(item.row);
    if (idx === undefined) {
      idx = rows.length;
      rowIndexByNumber.set(item.row, idx);
      rows.push([]);
    }
    rows[idx].push(item);
  }

  return (
    <section
      className={`${poppins.className} bg-[#F3E6D3] px-4 py-10 sm:px-6 md:px-10 lg:px-16 lg:py-14`}
    >
      <div className="space-y-7">
        {rows.map((items, rowIndex) => (
          <GalleryRow key={rowIndex} items={items} big={items[0]?.size === "big"} />
        ))}
      </div>
    </section>
  );
}



function GalleryRow({ items, big }: { items: GalleryItem[]; big: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>("[data-gallery-card]");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 20;

    el.scrollBy({ left: direction * (cardWidth + gap), behavior: "smooth" });
  }

  return (
    <div className="relative">
      <button
        onClick={() => scrollByCard(-1)}
        aria-label="Scroll gallery left"
        className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-[#2A2522] shadow-md transition hover:bg-white sm:h-11 sm:w-11 md:flex"
      >
        ‹
      </button>

      <div
        ref={scrollRef}
        className="flex snap-x snap-proximity gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.id}
            data-gallery-card
            className={`relative shrink-0 snap-start overflow-hidden rounded-md bg-[#8A7461] ${
              big
                ? "aspect-[16/10] w-[380px] sm:w-[520px] md:w-[600px] lg:w-[650px]"
                : "aspect-[4/3] w-[300px] sm:w-[380px] md:w-[450px] lg:w-[500px]"
            }`}
          >
            {item.image && (
              <Image
                src={item.image}
                alt={item.label || "Gallery photo"}
                fill
                sizes="650px"
                className="object-cover"
              />
            )}

            {item.label && (
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="h-4 w-[2px] bg-[#E05B3C]" />
                <span className="text-xs font-semibold uppercase tracking-wide text-white drop-shadow-sm sm:text-sm">
                  {item.label}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollByCard(1)}
        aria-label="Scroll gallery right"
        className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-[#2A2522] shadow-md transition hover:bg-white sm:h-11 sm:w-11 md:flex"
      >
        ›
      </button>
    </div>
  );
}