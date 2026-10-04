'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import StarDivider from '@/components/StarDivider';
import { successStories } from '@/data/placement/stories';

// Brown pen icon provided in public asset / data URI
const PEN_ICON_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAjCAYAAAD8BaggAAADtklEQVR4AbyYy08TQRjAZxZa+sI0+g/UiyTGA70Zw6MNguHAK4gUgaQbo8UT602LSctF0AtwE4gpHgzVGC0xxhhNiho1xijejLcevEhEKhGrpO34fSvbtHS2u6WPzXzZ7uzMN7/9XjtbgVT5kKRe+xXf4MzEhaFNv8/DJnye6OUxj0PBqCrQ57fLjoHW9rU6o0FilNkRghHiEtJsTYGqGpD//NnGlQfPoyaT0XGq/QQxGmuR579QahcYCRA4BJCKN/+Yx0spi25tbTuePntDjAYDyYMCSyFIxYH8vqFZwkhIcdGv7QThQYHrYhUFkiB4MWAJYeO4ULZwoRhdwjEVsRDGiyVhWoOnduEiPMmG6upsjZ8Z6ljBcWUHUuIFlDtACjaEiq6+j9hslri1tu4hDi4r0N54wQUKCVgw9vXvuigINMIYkx+gLEBYQ9TiRRWI0TijxH2xf0BiaealKdKHY0sGwniBGhJlhKjGC+EcSZISxeEuL2VknKSI+4h7+BMOKwkIyr+E9QUUOUB0tzQjwXOjPY17YVDBvoE+PFkMWuvNM0p9QWW6hNGIONoFz5FrGWXuvoC+vLoThMwIYLWFs6JL8wxujQ32n4zxLKNMLhoIYWByAITYrGb5FaALCoK4u7N11Ww2ebNjBvVkS1FAUGOCjx6/DOzsJDM69EJhEB88dKCxEAwq1Q2EqU3gjfxj86f8LioGCoP4xsK9SEPzsFPJJlycJ7qBMLUVBUVBQRBPL4QnlblaZ11A6CpQlJPaeqAwiNMCuwRzdTdNoKtjHhe6iqexIJTVIlfi6ZtheVvBm8/rKwgkwRYC/B/iTVT61KB6e91isTCosyCQJWEOwqAcV8F1XsuDosx7tGU0kjdQR4cqkOwqzuZKTacCRQCmoWnktto4rX4uEKa4lqv2KsYA3tjYcpUCgzq5QJDiWIk1XYUKUNKELCXMf5xTi8sv8LoUyQOCFPeCQhQ4aTR4HSRZum96PizOzkbiGqN13c4BQleppXieNkYjvy2Jw1iB8+6V0JEDpMtVu1a5trDcVy6rZPNngAq4KjMeAncVKq+z3FbJLAA/ZCD85u7vbpux2SzQxWlglRRh0tR82L2fYsfRqNolA9UkWchWb7HzNlyKVa7P351T1VLGGzIQJUzOkJy9TRWtkv08MtDrdx8zfQjV0XY8hrFSLatkFocfQssxR/BW6L5r/dt3Cco+fl8Ha8wGZ6VjBdbmNviviPWkGHU3nx6fa2gaEWFXN+l0i7ILuTMq3PkPAAD//4GXky8AAAAGSURBVAMAodGmX8x3HQMAAAAASUVORK5CYII=';

export default function SuccessStories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const ratio = scrollLeft / maxScroll;
        const newIndex = Math.min(3, Math.max(0, Math.round(ratio * 3)));
        setCurrentIndex(newIndex);
      }
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const targetLeft = (index / 3) * maxScroll;
        scrollRef.current.scrollTo({
          left: targetLeft,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#3D2B1F] rounded-t-[48px] py-16 lg:py-20 font-poppins">
      {/* Title and Divider */}
      <div className="w-full flex flex-col items-center justify-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold uppercase tracking-wide text-white text-center font-poppins">
          Placement Success Stories
        </h2>
        <StarDivider />
      </div>

      {/* Cards Container */}
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="w-full max-w-7xl">
          {/* Carousel Cards Track */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex items-center justify-start gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-none"
          >
            {successStories.map((story) => (
              <div
                key={story.id}
                className="w-[297px] h-[224px] rounded-[20px] p-[20px] bg-[#FFFCF8] flex-shrink-0 flex flex-col justify-between shadow-[0px_4px_16px_rgba(0,0,0,0.12)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 select-none"
              >
                {/* Top Section with Pen Icon & Testimonial */}
                <div>
                  {/* Pen Icon */}
                  <div
                    className="relative shrink-0 select-none pointer-events-none"
                    style={{
                      width: '35px',
                      height: '35px',
                      top: '2.99px',
                      left: '2.15px',
                      opacity: 1,
                    }}
                  >
                    <Image
                      src={PEN_ICON_BASE64}
                      alt="Pen icon"
                      width={35}
                      height={35}
                      unoptimized
                      priority
                      className="w-[35px] h-[35px] object-contain"
                    />
                  </div>

                  {/* Testimonial Text */}
                  <div className="ml-auto w-[196px] mt-2">
                    <p className="text-[#3D2B1F] text-[11px] leading-[18px] font-poppins font-normal">
                      {story.testimonial}
                    </p>
                  </div>
                </div>

                {/* Bottom Section - Alumni details */}
                <div className="pt-2">
                  <h4 className="font-bold text-[#3D2B1F] text-[15px] leading-tight font-poppins">
                    {story.name}
                  </h4>
                  <p className="text-[#3D2B1F] text-[12px] font-poppins mt-1">
                    {story.batch}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Indicator */}
      <div className="w-full flex justify-center pb-8">
        <div className="w-[329px] h-[38px] rounded-[20px] bg-[#D9D9D966] backdrop-blur-sm shadow-[0px_4px_4px_0px_#0000001A] flex items-center justify-between px-3 gap-2">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full hover:opacity-80 cursor-pointer h-3 border-0 ${
                index === currentIndex % 4
                  ? 'w-[60px] bg-[#C89B3C]'
                  : 'w-[44px] bg-[#D9D9D9]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
