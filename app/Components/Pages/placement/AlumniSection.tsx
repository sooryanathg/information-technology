'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import StarDivider from '@/app/Components/StarDivider';

const alumniList = [
  {
    id: 'alumni-1',
    name: 'Alumni Name',
    designation: 'Software Engineer',
    company: 'Google',
    location: 'Bangalore',
  },
  {
    id: 'alumni-2',
    name: 'Alumni Name',
    designation: 'Product Manager',
    company: 'Microsoft',
    location: 'Hyderabad',
  },
  {
    id: 'alumni-3',
    name: 'Alumni Name',
    designation: 'Frontend Lead',
    company: 'Amazon',
    location: 'Chennai',
  },
  {
    id: 'alumni-4',
    name: 'Alumni Name',
    designation: 'Data Scientist',
    company: 'IBM',
    location: 'Kochi',
  },
  {
    id: 'alumni-5',
    name: 'Alumni Name',
    designation: 'DevOps Engineer',
    company: 'Oracle',
    location: 'Pune',
  },
  {
    id: 'alumni-6',
    name: 'Alumni Name',
    designation: 'Systems Architect',
    company: 'Cisco',
    location: 'Bangalore',
  },
  {
    id: 'alumni-7',
    name: 'Alumni Name',
    designation: 'Cloud Engineer',
    company: 'Adobe',
    location: 'Noida',
  },
  {
    id: 'alumni-8',
    name: 'Alumni Name',
    designation: 'Security Analyst',
    company: 'Intel',
    location: 'Bangalore',
  },
];

export default function AlumniSection() {
  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-poppins">
      {/* Section Title */}
      <div className="flex flex-col items-center justify-center text-center mb-8 sm:mb-12">
        <h2 
          className="font-poppins font-bold text-[#3D2B1F] uppercase text-[36px] leading-[100%] tracking-[0%] w-[392px] max-w-full min-h-[54px] flex items-center justify-center"
        >
          ALUMNI CONNECTION
        </h2>
        <StarDivider />
      </div>

      {/* Alumni Cards Row */}
      <div className="relative w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-start lg:justify-center gap-4 sm:gap-5 overflow-x-auto pb-6 pt-2 px-2 scrollbar-none">
          {alumniList.map((alumni) => (
            <div
              key={alumni.id}
              className="w-[220px] h-[320px] rounded-[12px] p-[10px] bg-[#FFFCF8] border border-[#7A6758] flex-shrink-0 flex flex-col items-center justify-between text-center shadow-[0_4px_16px_rgba(61,43,31,0.06)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group select-none"
            >
              <div className="w-full flex flex-col items-center pt-2">
                {/* Exact Golden Avatar SVG */}
                <div className="w-[84px] h-[84px] rounded-full flex items-center justify-center text-[#C89B3C] mb-3 group-hover:scale-105 transition-transform">
                  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                    <circle cx="24" cy="24" r="22" stroke="#C89B3C" strokeWidth="2" />
                    <circle cx="24" cy="18" r="6" stroke="#C89B3C" strokeWidth="2" />
                    <path d="M12 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#C89B3C" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Name & Title */}
                <h4 className="font-bold text-[#3D2B1F] text-[16px] leading-tight font-poppins">
                  {alumni.name}
                </h4>
                <p className="text-[13px] text-[#7A6758] mt-1 font-medium font-poppins">
                  {alumni.designation}
                </p>
                <p className="text-[12px] text-[#7A6758]/90 mt-0.5 font-normal font-poppins">
                  {alumni.company}
                </p>

                {/* Divider */}
                <div className="w-[140px] border-t border-[#7A6758]/30 my-3" />
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs text-[#7A6758] font-medium font-poppins pb-2">
                <MapPin className="w-3.5 h-3.5 text-[#7A6758]" />
                <span>{alumni.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connect With Alumni CTA Button */}
      <div className="mt-8 sm:mt-10 text-center">
        <button className="bg-[#C89B3C] hover:bg-[#b88a32] active:scale-98 text-white font-bold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl shadow-[0_4px_14px_rgba(200,155,60,0.35)] hover:shadow-lg transition-all duration-200 cursor-pointer font-poppins">
          Connect With Alumni
        </button>
      </div>
    </section>
  );
}
