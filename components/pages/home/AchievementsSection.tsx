
"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useState } from "react";

const posterImages = [
  "/achievement1.png",
  "/achievement2.png",
  "/achievement3.png",
  "/achievement4.png",
];

export default function AchievementsSection() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);
  const displayedIndicator = hoveredSlide ?? activeSlide;

  // Shows previous, current, and next poster
  const visiblePosters = [-1, 0, 1].map(
    (offset) =>
      (activeSlide + offset + posterImages.length) % posterImages.length,
  );

  return (
    <section
      aria-labelledby="achievements-heading"
      className="bg-[#fbf7ef] px-5 pb-5 pt-2 sm:px-8 sm:pb-10 sm:pt-6"
    >
      <div className="mx-auto max-w-[1515px] text-center">

        {/* Section heading decoration */}
        <div
          aria-hidden="true"
          className="mb-1 flex items-center justify-center gap-2 text-[#a96b39] sm:mb-3 sm:gap-5"
        >
          <span className="h-[2px] w-6 bg-[#a96b39] sm:h-[3px] sm:w-24" />

          <Star className="h-4 w-4 fill-current sm:h-8 sm:w-8" />

          <span className="h-[2px] w-6 bg-[#a96b39] sm:h-[3px] sm:w-24" />
        </div>

        {/* Heading */}
        <h2
          id="achievements-heading"
          className="font-poppins text-[0.95rem] font-semibold leading-tight text-black sm:text-3xl lg:text-[48px]"
        >
          Our Students are{" "}
          <span className="text-[#ad7746]">Making Us Proud</span>
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-1 max-w-2xl font-inter text-xs leading-relaxed text-black sm:mt-2 sm:text-xl lg:text-[26px]">
          Celebrating placements, internships and achievements of our students
        </p>

        {/* Achievement Posters */}
        <div
          aria-label="Student achievement posters"
          aria-roledescription="carousel"
          role="region"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              setActiveSlide((current) => (current - 1 + posterImages.length) % posterImages.length);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              setActiveSlide((current) => (current + 1) % posterImages.length);
            }
          }}
          className="mx-auto mt-4 grid max-w-[1170px] grid-cols-1 items-center gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-6 lg:mt-10 lg:gap-7"
        >
          {visiblePosters.map((posterIndex, position) => (
            <button
              key={posterIndex}
              type="button"
              aria-label={`Show achievement poster ${posterIndex + 1}`}
              onClick={() => setActiveSlide(posterIndex)}
              onFocus={() => setActiveSlide(posterIndex)}
              onMouseEnter={() => setHoveredSlide(posterIndex)}
              onMouseLeave={() => setHoveredSlide(null)}
              className={`mx-auto w-full cursor-pointer overflow-hidden rounded-xl shadow-[0_12px_18px_rgba(44,34,25,0.22)] transition-all duration-500 hover:z-10 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a96b39] sm:rounded-[20px] sm:hover:scale-[1.12] ${
                position === 1
                  ? "max-w-[min(68vw,280px)] sm:-mt-2 sm:max-w-[460px]"
                    : "hidden max-w-[140px] sm:mt-10 sm:block sm:max-w-[390px]"
              }`}
            >
              <Image
                src={posterImages[posterIndex]}
                alt={`Student achievement poster ${posterIndex + 1}`}
                width={800}
                height={1000}
                className="h-auto w-full"
                priority={position === 1}
              />
            </button>
          ))}
        </div>

        {/* Slide Indicators */}
        <div
          className="mx-auto mt-3 flex w-fit items-center gap-1 rounded-full bg-white/80 px-2 py-1 shadow-[0_2px_8px_rgba(44,34,25,0.12)] sm:mt-6 sm:gap-2 sm:px-3 sm:py-2"
          role="group"
          aria-label="Choose achievement poster"
        >
          {posterImages.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show achievement slide ${index + 1}`}
              aria-current={
                activeSlide === index ? "true" : undefined
              }
              onClick={() => setActiveSlide(index)}
              className="relative h-[4px] w-5 overflow-hidden rounded-full bg-[#d4b99a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#765538] sm:h-[7px] sm:w-9"
            >
              <span
                className={`absolute inset-0 origin-left rounded-full bg-[#a96b39] transition-transform duration-500 ${
                displayedIndicator === index
                    ? "scale-x-100"
                    : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
