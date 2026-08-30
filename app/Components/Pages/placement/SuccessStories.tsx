'use client';

import React, { useState } from 'react';

function PenIcon() {
  return (
    <svg
      viewBox="0 0 200 200"
      width="32"
      height="32"
      fill="none"
    >
      {/* Pen body - blue */}
      <path
        d="M80 160 L100 40 L120 50 L100 170 Z"
        fill="#0066CC"
      />
      {/* Pen tip - dark */}
      <circle cx="100" cy="172" r="6" fill="#1a1a1a" />
      {/* Gold band 1 (middle) */}
      <rect x="70" y="110" width="60" height="16" fill="#F4B942" rx="2" />
      {/* Gold band 2 (top) */}
      <rect x="75" y="45" width="50" height="14" fill="#F4B942" rx="2" />
      {/* Pen cap circle */}
      <circle cx="100" cy="35" r="12" fill="#0066CC" />
      <circle cx="100" cy="35" r="8" fill="#F4B942" />
    </svg>
  );
}

interface SuccessStory {
  id: string;
  testimonial: string;
  name: string;
  batch: string;
}

function StarDivider() {
  return (
    <div className="flex items-center justify-center gap-5 mt-3">
      <div className="w-[80px] h-[4px] bg-[#F4B942]" />
      <div className="w-[40px] h-[40px] flex items-center justify-center">
        <span className="text-[#F4B942] text-4xl leading-none">
          ★
        </span>
      </div>
      <div className="w-[80px] h-[4px] bg-[#F4B942]" />
    </div>
  );
}

const successStories: SuccessStory[] = [
  {
    id: '1',
    testimonial: 'This department provided me with the perfect blend of knowledge, exposure and opportunities to grow.',
    name: 'Alumni name',
    batch: 'Batch(Year)',
  },
  {
    id: '2',
    testimonial: 'This department provided me with the perfect blend of knowledge, exposure and opportunities to grow.',
    name: 'Alumni name',
    batch: 'Batch(Year)',
  },
  {
    id: '3',
    testimonial: 'This department provided me with the perfect blend of knowledge, exposure and opportunities to grow.',
    name: 'Alumni name',
    batch: 'Batch(Year)',
  },
  {
    id: '4',
    testimonial: 'This department provided me with the perfect blend of knowledge, exposure and opportunities to grow.',
    name: 'Alumni name',
    batch: 'Batch(Year)',
  },
];

export default function SuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0F1C3A] py-16 lg:py-20">
      {/* Title and Divider */}
      <div className="w-full flex flex-col items-center justify-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold uppercase tracking-wide text-white text-center">
          Placement Success Stories
        </h2>
        <StarDivider />
      </div>

      {/* Cards Container */}
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 mb-16">
        <div className="w-full max-w-7xl">
          {/* Carousel Cards */}
          <div className="flex justify-center gap-6 overflow-hidden">
            {successStories.slice(currentIndex, currentIndex + 4).map((story) => (
              <div
                key={story.id}
                className="flex-shrink-0 w-64 bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Icon */}
                <div className="mb-6">
                  <PenIcon />
                </div>

                {/* Testimonial */}
                <p className="text-gray-700 text-sm mb-6 leading-relaxed font-poppins">
                  {story.testimonial}
                </p>

                {/* Alumni Info */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-gray-900 text-sm font-poppins">
                    {story.name}
                  </p>
                  <p className="text-gray-600 text-xs font-poppins">
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
        <div className="w-[329px] h-[38px] rounded-[20px] bg-gray-500/60 backdrop-blur-sm shadow-[0px_4px_4px_0px_#0000001A] flex items-center justify-between px-3 gap-2">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full hover:opacity-80 cursor-pointer h-3 border-0 ${
                index === currentIndex % 4
                  ? 'w-[60px] bg-[#F4B942]'
                  : 'w-[44px] bg-[#BFA876]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}