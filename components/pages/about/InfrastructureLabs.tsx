"use client";

import { useRef } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { infrastructureCards } from "./data/infrastructure";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function InfrastructureLabs() {
  const scrollRef = useRef<HTMLDivElement>(null);



  function scrollByCard(dir: 1 | -1) {
    scrollRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  }

  return (
    <section
  className={`${poppins.className}  pt-[27px] pb-[61px]`}
>
      <div className="mx-auto w-full max-w-[1800px] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-[78px]">
        <h2 className="text-3xl font-bold uppercase text-[#2A2522] sm:text-4xl xl:text-[40px]">
          Infrastructure / Labs
        </h2>
        <span className="mt-2 block h-[3px] w-[100px] rounded-full bg-[#C9963A]" />

        <div className="relative mt-8 lg:mt-[41px]">
          <div
            ref={scrollRef}
           
            className="flex snap-x snap-proximity scroll-smooth gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {infrastructureCards.map((item) => (
                <div key={item.id} className="w-[360px] shrink-0 snap-start lg:w-[400px]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-sm">
                    <Image
                    src={item.image}
                    alt={item.roleLabel}
                    fill
                    sizes="400px"
                    className="object-cover"
                    />
                </div>
                </div>
            ))}
          </div>

          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll left"
            className="absolute left-2 top-[40%] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-[#2A2522] shadow-md transition hover:bg-white md:flex"
          >
            ‹
          </button>
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Scroll right"
            className="absolute right-2 top-[40%] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg text-[#2A2522] shadow-md transition hover:bg-white md:flex"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}