import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import StarDivider from '@/app/Components/StarDivider';

const alumniList = [
  {
    id: 'alumni-1',
    name: 'Alumni Name',
    designation: 'Designation',
    company: 'Company Name',
    location: 'Location',
  },
  {
    id: 'alumni-2',
    name: 'Alumni Name',
    designation: 'Designation',
    company: 'Company Name',
    location: 'Location',
  },
  {
    id: 'alumni-3',
    name: 'Alumni Name',
    designation: 'Designation',
    company: 'Company Name',
    location: 'Location',
  },
  {
    id: 'alumni-4',
    name: 'Alumni Name',
    designation: 'Designation',
    company: 'Company Name',
    location: 'Location',
  },
  {
    id: 'alumni-5',
    name: 'Alumni Name',
    designation: 'Designation',
    company: 'Company Name',
    location: 'Location',
  },
];

export default function AlumniSection() {
  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-poppins">
      {/* Section Title */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-[#1A2332]">
          ALUMNI CONNECTION
        </h2>
        <StarDivider />
      </div>

      {/* Alumni Cards Carousel / Grid */}
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {alumniList.map((alumni) => (
            <div
              key={alumni.id}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
            >
              {/* Exact Golden Avatar SVG */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-[#F4B942] mb-4 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                  <circle cx="24" cy="24" r="22" stroke="#F4B942" strokeWidth="2.5" />
                  <circle cx="24" cy="18" r="6" stroke="#F4B942" strokeWidth="2.5" />
                  <path d="M12 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#F4B942" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Name & Title */}
              <h4 className="font-bold text-gray-900 text-sm sm:text-base tracking-tight font-poppins">
                {alumni.name}
              </h4>
              <p className="text-xs text-gray-500 mt-1 font-medium font-poppins">
                {alumni.designation}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 font-normal font-poppins">
                {alumni.company}
              </p>

              {/* Divider */}
              <div className="w-full border-t border-gray-100 my-3" />

              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium font-poppins">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{alumni.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Next Arrow on the Right */}
        <button
          aria-label="Next Alumni"
          className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-black hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Connect With Alumni CTA Button */}
      <div className="mt-10 sm:mt-12 text-center">
        <button className="bg-[#F4B942] hover:bg-[#e5a82e] active:scale-98 text-white font-bold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer font-poppins">
          Connect With Alumni
        </button>
      </div>
    </section>
  );
}
