"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { galleryItems, type GalleryItem } from "./data/gallery";
import GalleryLightbox from "./GalleryLightbox";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function GalleryGrid() {
  // Index into galleryItems of the photo open in the viewer, or null.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeViewer = useCallback(() => setOpenIndex(null), []);
  const openPhoto = (item: GalleryItem) => setOpenIndex(galleryItems.indexOf(item));

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
          <GalleryRow key={rowIndex} items={items} big={items[0]?.size === "big"} onOpen={openPhoto} />
        ))}
      </div>

      {openIndex !== null && (
        <GalleryLightbox
          items={galleryItems}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={closeViewer}
        />
      )}
    </section>
  );
}



function GalleryRow({
  items,
  big,
  onOpen,
}: {
  items: GalleryItem[];
  big: boolean;
  onOpen: (item: GalleryItem) => void;
}) {
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
          <button
            key={item.id}
            type="button"
            data-gallery-card
            onClick={() => onOpen(item)}
            aria-label={`View photo${item.label ? `: ${item.label}` : ""}`}
            className={`group relative shrink-0 cursor-zoom-in snap-start overflow-hidden rounded-md bg-[#8A7461] text-left focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-tan ${
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
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
          </button>
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