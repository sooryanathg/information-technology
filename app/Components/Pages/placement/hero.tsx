'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden text-white h-[784px]">
      {/* Background Image: width 1762px, height 784px, top -11px, left -70px */}
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

      {/* Figma Linear Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
         background:
          'linear-gradient(180deg, rgba(122, 103, 88, 0.7) 8.17%, rgba(61, 43, 31, 0.7) 52.4%)',
        }}
      />

      {/* Hero Content: Absolute exact coordinate positioning based on reference canvas */}
      <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto">
        {/* PLACEMENT: left: 81px, top: 221px, width: 381px, height: 96px, Poppins 700 Bold 64px */}
        <h1 
          className="absolute font-poppins font-bold text-white text-[64px] leading-none tracking-normal select-none"
          style={{
            top: '221px',
            left: '81px',
            width: '381px',
            height: '96px',
          }}
        >
          PLACEMENT
        </h1>

        {/* STATISTICS: left: 78px, top: 291px, width: 366px, height: 96px, Poppins 700 Bold 64px */}
        <div 
          className="absolute font-poppins font-bold text-[#C89B3C] text-[64px] leading-none tracking-normal select-none"
          style={{
            top: '291px',
            left: '78px',
            width: '366px',
            height: '96px',
          }}
        >
          STATISTICS
          {/* Gold accent line under STATISTICS */}
          <div className="h-[3.5px] w-14 bg-[#C89B3C] rounded-full mt-2.5" />
        </div>

        {/* SUBHEADING: left: 81px, top: 395px, width: 447px, height: 36px, Poppins 600 SemiBold 24px */}
        <div
          className="absolute font-poppins font-semibold text-white text-[24px] leading-none tracking-normal flex items-center"
          style={{
            top: '395px',
            left: '81px',
            width: '447px',
            height: '36px',
          }}
        >
          From campus to career:
        </div>

        {/* DESCRIPTION: left: 81px, top: 439px, width: 447px, height: 30px, Poppins 400 Regular 20px */}
        <div
          className="absolute font-poppins font-normal text-[#FFFCF8] text-[20px] leading-none tracking-normal flex items-center"
          style={{
            top: '439px',
            left: '81px',
            width: '447px',
            height: '30px',
          }}
        >
          Turning potential into professional success..
        </div>

        {/* CTA BUTTON: left: 80px, top: 510px, width: 446px, height: 72px */}
        <div
          className="absolute"
          style={{
            top: '510px',
            left: '80px',
          }}
        >
          <button className="group inline-flex items-center justify-center bg-[#D9C3A5] hover:bg-[#cbb393] active:scale-98 text-[#3D2B1F] font-bold transition-all duration-200 cursor-pointer font-poppins"
            style={{
              width: '446px',
              height: '72px',
              borderRadius: '10px',
              padding: '24px 16px',
              boxShadow: '0px 4px 14px 0px rgba(61, 43, 31, 0.25)',
              gap: '10px',
            }}
          >
            <span
              className="font-poppins font-bold text-[20px] leading-tight tracking-normal text-[#3D2B1F]"
            >
              View Placement Report
            </span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-200 text-[#3D2B1F] stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}





