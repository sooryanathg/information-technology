'use client';

import React from 'react';
import Link from 'next/link';

const recruiterCompanies = [
  'Company Logo',
  'Company Logo',
  'Company Logo',
  'Company Logo',
  'Company Logo',
  'Company Logo',
  'Company Logo',
  'Company Logo',
];

const internshipList = [
  {
    id: 'uiux',
    role: 'UI/UX Design Internship',
    company: 'ABC Technologies',
    mode: 'Remote',
    duration: '2 Months',
    deadline: 'Apply Before 15 July',
  },
  {
    id: 'webdev',
    role: 'Web Development Internship',
    company: 'ABC Technologies',
    mode: 'On-Site',
    duration: '6 Weeks',
    deadline: 'Apply Before 15 July',
  },
  {
    id: 'data',
    role: 'Data Analytics Internship',
    company: 'ABC Technologies',
    mode: 'Hybrid',
    duration: '8 Weeks',
    deadline: 'Apply Before 15 July',
  },
];

export default function RecruitersAndInternships() {
  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-[1512px] min-h-[582px] mx-auto font-poppins flex items-center justify-center">
      <div className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-10 w-full">
        {/* LEFT BOX: TOP RECRUITERS */}
        <div 
          className="w-full lg:w-[692px] h-[476px] rounded-[20px] bg-[#E8DCCB] pt-[40px] pb-[20px] px-[10px] sm:px-[14px] flex flex-col justify-between shrink-0"
          style={{
            boxShadow: '0px 8px 24px 0px #00000040',
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-[10px] sm:px-[14px]">
            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#3D2B1F] font-poppins">
                TOP RECRUITERS
              </h3>
              <div className="h-[4px] w-[170px] bg-[#C89B3C] rounded-full mt-2" />
            </div>
            <Link
              href="#"
              className="group flex items-center gap-2 text-sm sm:text-base font-normal text-[#3D2B1F] hover:opacity-80 transition font-poppins mt-1"
            >
              <span>View All Recruiters</span>
              <span className="text-lg leading-none group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Recruiter Logos Grid: w: 690, h: 300, py: 10, gap: 20 */}
          <div className="w-full max-w-[690px] h-[300px] py-[10px] px-[6px] grid grid-cols-2 sm:grid-cols-4 gap-[20px]">
            {recruiterCompanies.map((name, index) => (
              <div
                key={index}
                className="bg-[#FFFCF8] rounded-[20px] p-4 flex items-center justify-center text-center shadow-[0px_2px_8px_rgba(61,43,31,0.04)] hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-[125px]"
              >
                <span className="text-sm sm:text-[15px] font-normal text-[#3D2B1F] font-poppins tracking-normal">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT BOX: INTERNSHIP NOTICE BOARD */}
        <div 
          className="w-full lg:w-[692px] h-[476px] rounded-[20px] bg-[#FFFCF8] pt-[36px] pb-[20px] px-5 sm:px-7 flex flex-col justify-between shrink-0"
          style={{
            boxShadow: '0px 8px 24px 0px #00000040',
          }}
        >
          {/* Header */}
          <div className="mb-2">
            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#3D2B1F] font-poppins">
                INTERNSHIP NOTICE BOARD
              </h3>
              <div className="h-[3.5px] w-28 bg-[#C89B3C] rounded-full mt-2" />
            </div>
            <p className="text-xs sm:text-sm text-[#7A6758] mt-1.5 font-normal font-poppins">
              Latest opportunities for IT students
            </p>
          </div>

          {/* Internship List Items (3 cards) */}
          <div className="space-y-3">
            {internshipList.map((item) => (
              <div
                key={item.id}
                className="border border-[#7A6758] bg-[#FFFCF8] rounded-[16px] px-4 py-2.5 sm:px-5 sm:py-3 transition-all duration-200 flex items-center justify-between gap-3"
              >
                {/* Left Detail */}
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    {/* Exact Slanted Pushpin SVG in #3D2B1F */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#3D2B1F] shrink-0">
                      <path d="M16 4a1 1 0 0 1 1 1v1.586a1 1 0 0 0 .293.707l1.414 1.414a1 1 0 0 1 .293.707V11a1 1 0 0 1-1 1h-4v8a1 1 0 0 1-2 0v-8H8a1 1 0 0 1-1-1V9.414a1 1 0 0 1 .293-.707l1.414-1.414A1 1 0 0 0 10 6.586V5a1 1 0 0 1 1-1h5z"/>
                    </svg>
                    <h4 className="font-bold text-[#3D2B1F] text-[15px] sm:text-[16px] tracking-tight font-poppins truncate">
                      {item.role}
                    </h4>
                  </div>
                  <p className="text-[13px] text-[#7A6758] pl-6 font-poppins leading-none">
                    {item.company}
                  </p>
                  <div className="flex items-center gap-2.5 text-[13px] text-[#3D2B1F] pl-6 pt-1 font-poppins">
                    <span className="font-normal">{item.mode}</span>
                    {/* Bullseye / circle dot glyph */}
                    <span className="inline-flex items-center justify-center w-2.5 h-2.5 rounded-full border border-[#3D2B1F] shrink-0">
                      <span className="w-1 h-1 rounded-full bg-[#3D2B1F]" />
                    </span>
                    <span className="font-normal">{item.duration}</span>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="shrink-0">
                  <button 
                    className="w-[120px] h-[60px] bg-[#7A6758] hover:bg-[#6c5a4d] active:scale-95 text-white font-poppins font-normal text-[13px] leading-tight rounded-[12px] transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center shrink-0"
                    style={{
                      boxShadow: '4px 4px 8px 2px #BB8B5A',
                    }}
                  >
                    <span>Apply Before</span>
                    <span>15 July</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
