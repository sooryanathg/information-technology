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
          height={784}
          priority
          className="absolute top-[-10px] left-[-70px] w-[1762px] h-[793px] max-w-none object-cover"
        />
      </div>

      {/* Figma Linear Gradient Overlay: #1E1E1E to #6B7280 across the full frame */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
         background:
          'linear-gradient(0deg, #1E1E1EF0 -10%, #1E1E1EE0 2%, #2D3642A6 75%, #6B728040 300%)',
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
          className="absolute font-poppins font-bold text-[#F4B942] text-[64px] leading-none tracking-normal select-none"
          style={{
            top: '291px',
            left: '78px',
            width: '366px',
            height: '96px',
          }}
        >
          STATISTICS
          {/* Gold accent line under STATISTICS */}
          <div className="h-[3.5px] w-14 bg-[#F4B942] rounded-full mt-2.5" />
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
          className="absolute font-poppins font-normal text-gray-200 text-[20px] leading-none tracking-normal flex items-center"
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
          <button className="group inline-flex items-center justify-center bg-[#F4B942] hover:bg-[#e5a82e] active:scale-98 text-slate-950 font-bold transition-all duration-200 cursor-pointer font-poppins"
            style={{
              width: '446px',
              height: '72px',
              borderRadius: '10px',
              padding: '24px 16px',
              boxShadow: '0px 4px 4px 0px #00000040',
              gap: '10px',
            }}
          >
            <span
              className="font-poppins font-bold text-[20px] leading-tight tracking-normal text-slate-950"
            >
              View Placement Report
            </span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-200 text-slate-950 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}





