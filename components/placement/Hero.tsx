'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden text-white h-[640px] sm:h-[720px] lg:h-[784px]">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/latest.png"
          alt="Placement Statistics Background"
          width={1762}
          height={793}
          priority
          className="absolute top-[-10px] left-[-70px] w-[1762px] h-[793px] max-w-none object-cover"
        />
      </div>

      {/* Linear Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(122, 103, 88, 0.7) 8.17%, rgba(61, 43, 31, 0.7) 52.4%)',
        }}
      />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[81px]">
        {/* Main Heading: PLACEMENT */}
        <h1 
          className="absolute font-poppins font-bold text-white text-[44px] sm:text-[54px] lg:text-[64px] leading-none tracking-normal select-none left-6 sm:left-12 lg:left-[81px] top-[180px] sm:top-[200px] lg:top-[221px] max-w-[381px]"
        >
          PLACEMENT
        </h1>

        {/* Highlighted Heading: STATISTICS */}
        <div 
          className="absolute font-poppins font-bold text-[#C89B3C] text-[44px] sm:text-[54px] lg:text-[64px] leading-none tracking-normal select-none left-6 sm:left-12 lg:left-[78px] top-[236px] sm:top-[265px] lg:top-[291px] max-w-[366px]"
        >
          STATISTICS
          {/* Gold accent line */}
          <div className="h-[3.5px] w-14 bg-[#C89B3C] rounded-full mt-2 lg:mt-2.5" />
        </div>

        {/* Subheading */}
        <div
          className="absolute font-poppins font-semibold text-white text-[18px] sm:text-[22px] lg:text-[24px] leading-none tracking-normal flex items-center left-6 sm:left-12 lg:left-[81px] top-[335px] sm:top-[370px] lg:top-[395px] max-w-[447px]"
        >
          From campus to career:
        </div>

        {/* Tagline Description */}
        <div
          className="absolute font-poppins font-normal text-[#FFFCF8] text-[15px] sm:text-[18px] lg:text-[20px] leading-none tracking-normal flex items-center left-6 sm:left-12 lg:left-[81px] top-[375px] sm:top-[415px] lg:top-[439px] max-w-[447px]"
        >
          Turning potential into professional success..
        </div>

        {/* Call-to-Action Button */}
        <div
          className="absolute left-6 sm:left-12 lg:left-[80px] top-[430px] sm:top-[475px] lg:top-[510px] w-[calc(100%-48px)] sm:w-[446px]"
        >
          <button 
            type="button"
            className="group w-full sm:w-[446px] h-[64px] sm:h-[72px] inline-flex items-center justify-center bg-[#D9C3A5] hover:bg-[#cbb393] active:scale-98 text-[#3D2B1F] font-bold rounded-[10px] px-4 sm:px-6 shadow-[0px_4px_14px_0px_rgba(61,43,31,0.25)] gap-2.5 transition-all duration-200 cursor-pointer font-poppins"
          >
            <span className="font-poppins font-bold text-[18px] sm:text-[20px] leading-tight tracking-normal text-[#3D2B1F]">
              View Placement Report
            </span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform duration-200 text-[#3D2B1F] stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
