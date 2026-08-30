const fs = require('fs');

// 1. StarDivider.tsx
const starDividerCode = `import React from 'react';

interface StarDividerProps {
  light?: boolean;
}

export default function StarDivider({ light = false }: StarDividerProps) {
  return (
    <div className="flex items-center justify-center gap-3.5 my-3.5">
      <div className="h-[2.5px] w-16 sm:w-24 rounded-full bg-[#F4B942]" />
      <span className="text-[#F4B942] text-2xl sm:text-3xl leading-none select-none drop-shadow-xs">★</span>
      <div className="h-[2.5px] w-16 sm:w-24 rounded-full bg-[#F4B942]" />
    </div>
  );
}
`;
fs.writeFileSync('app/Components/StarDivider.tsx', starDividerCode, 'utf8');

// 2. hero.tsx
const heroCode = `import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#2D3642] text-white min-h-[500px] lg:min-h-[580px] flex items-center">
      {/* Background Image Container with Gradient Blend */}
      <div className="absolute inset-0 z-0">
        {/* Right side students photo */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 lg:w-1/2 opacity-80 md:opacity-90">
          <Image
            src="/hero-students.png"
            alt="IT Students Placements and Team"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        {/* Dark Slate Gradients for seamless text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D3642] via-[#2D3642]/95 md:via-[#2D3642]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D3642]/60 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24 w-full">
        <div className="max-w-2xl font-poppins">
          {/* Main Headings */}
          <div className="space-y-1.5">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white drop-shadow-sm font-poppins">
              PLACEMENT
            </h1>
            <div className="inline-block">
              <span className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#F4B942] drop-shadow-sm font-poppins">
                STATISTICS
              </span>
            </div>
          </div>

          {/* Subtitles */}
          <div className="mt-8 sm:mt-10 space-y-2">
            <p className="text-xl sm:text-2xl font-bold text-white tracking-tight font-poppins">
              From campus to career:
            </p>
            <p className="text-base sm:text-lg text-gray-200 font-normal font-poppins">
              Turning potential into professional success..
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-8 sm:mt-10">
            <button className="group inline-flex items-center justify-center gap-3 bg-[#F4B942] hover:bg-[#e5a82e] active:scale-98 text-slate-950 font-bold text-base sm:text-lg px-8 sm:px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer font-poppins">
              <span>View Placement Report</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200 text-slate-950 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync('app/Components/Pages/placement/hero.tsx', heroCode, 'utf8');

// 3. Highlights.tsx with custom exact SVG icons
const highlightsCode = `import React from 'react';
import StarDivider from '@/app/Components/StarDivider';

interface HighlightItem {
  id: string;
  renderIcon: () => React.ReactNode;
  value: string;
  label: string;
}

const highlights: HighlightItem[] = [
  {
    id: 'rate',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F4B942" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    value: '95%',
    label: 'Placement Rate',
  },
  {
    id: 'highest',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F4B942" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M6 3h12M6 8h12M6 13l7 8M6 13h3a4.5 4.5 0 0 0 0-9" />
      </svg>
    ),
    value: '18.6LPA',
    label: 'Highest package',
  },
  {
    id: 'avg',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F4B942" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M3 20h18M6 16v4M12 10v10M18 4v16" />
      </svg>
    ),
    value: '9.2 LPA',
    label: 'Average package',
  },
  {
    id: 'companies',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F4B942" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
      </svg>
    ),
    value: '120+',
    label: 'Companies visited',
  },
  {
    id: 'placed',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F4B942" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    value: '350+',
    label: 'Students placed',
  },
  {
    id: 'batch',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#F4B942" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    value: '2026-2027',
    label: 'Placement Batch',
  },
];

export default function Highlights() {
  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-poppins">
      {/* Section Title */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-[#1A2332]">
          PLACEMENT HIGHLIGHTS
        </h2>
        <StarDivider />
      </div>

      {/* Grid of 6 Highlight Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
        {highlights.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/80 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              {item.renderIcon()}
            </div>

            {/* Number/Stat */}
            <div className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight font-poppins">
              {item.value}
            </div>

            {/* Label */}
            <div className="text-xs sm:text-sm font-medium text-gray-500 mt-1 leading-snug font-poppins">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`;
fs.writeFileSync('app/Components/Pages/placement/Highlights.tsx', highlightsCode, 'utf8');

// 4. RecruitersAndInternships.tsx
const recruitersAndInternshipsCode = `import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
    <section className="w-full py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-poppins">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        {/* LEFT BOX: TOP RECRUITERS */}
        <div className="bg-[#DCE4ED] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#CBD7E2] flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-300/60 pb-4 mb-6">
              <div className="relative">
                <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wider text-[#0E2038]">
                  TOP RECRUITERS
                </h3>
                <div className="h-[3px] w-12 bg-[#0284C7] rounded-full mt-1.5" />
              </div>
              <Link
                href="#"
                className="group flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-blue-700 transition"
              >
                <span>View All Recruiters</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Recruiter Logos Grid (2 rows of 4) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
              {recruiterCompanies.map((name, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-4 sm:p-5 flex items-center justify-center text-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-h-[76px] border border-white/60"
                >
                  <span className="text-xs sm:text-sm font-semibold text-gray-600 tracking-tight">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT BOX: INTERNSHIP NOTICE BOARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="border-b border-gray-100 pb-4 mb-6">
              <div className="relative">
                <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wider text-[#0E2038]">
                  INTERNSHIP NOTICE BOARD
                </h3>
                <div className="h-[3px] w-12 bg-[#0284C7] rounded-full mt-1.5" />
              </div>
              <p className="text-xs text-gray-500 mt-2 font-normal">
                Latest opportunities for IT students
              </p>
            </div>

            {/* Internship List Items */}
            <div className="space-y-3.5 sm:space-y-4">
              {internshipList.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200/80 rounded-2xl p-4 sm:p-5 hover:border-sky-200 hover:bg-sky-50/20 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Left Detail */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {/* Exact Slanted Pushpin SVG */}
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-800 shrink-0">
                        <path d="M16 4a1 1 0 0 1 1 1v1.586a1 1 0 0 0 .293.707l1.414 1.414a1 1 0 0 1 .293.707V11a1 1 0 0 1-1 1h-4v8a1 1 0 0 1-2 0v-8H8a1 1 0 0 1-1-1V9.414a1 1 0 0 1 .293-.707l1.414-1.414A1 1 0 0 0 10 6.586V5a1 1 0 0 1 1-1h5z"/>
                      </svg>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base tracking-tight font-poppins">
                        {item.role}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-500 pl-6 font-poppins">
                      {item.company}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 pl-6 pt-1">
                      <span className="flex items-center gap-1 font-medium font-poppins">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        {item.mode}
                      </span>
                      <span className="flex items-center gap-1 font-medium font-poppins">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="sm:self-center pl-6 sm:pl-0">
                    <button className="w-full sm:w-auto bg-[#0284C7] hover:bg-[#0369A1] active:scale-98 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs hover:shadow transition-all duration-200 cursor-pointer whitespace-nowrap font-poppins">
                      {item.deadline}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync('app/Components/Pages/placement/RecruitersAndInternships.tsx', recruitersAndInternshipsCode, 'utf8');

// 5. AlumniSection.tsx with exact golden avatar icon
const alumniSectionCode = `import React from 'react';
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
`;
fs.writeFileSync('app/Components/Pages/placement/AlumniSection.tsx', alumniSectionCode, 'utf8');

// 6. SuccessStories.tsx with exact Pen Icon from Figma
const successStoriesCode = `import React from 'react';
import Image from 'next/image';
import StarDivider from '@/app/Components/StarDivider';

const testimonials = [
  {
    id: '1',
    quote:
      'This department provided me with the perfect blend of knowledge,exposure and opportunities to grow.',
    author: 'Alumni name',
    batch: 'Batch(Year)',
  },
  {
    id: '2',
    quote:
      'This department provided me with the perfect blend of knowledge,exposure and opportunities to grow.',
    author: 'Alumni name',
    batch: 'Batch(Year)',
  },
  {
    id: '3',
    quote:
      'This department provided me with the perfect blend of knowledge,exposure and opportunities to grow.',
    author: 'Alumni name',
    batch: 'Batch(Year)',
  },
  {
    id: '4',
    quote:
      'This department provided me with the perfect blend of knowledge,exposure and opportunities to grow.',
    author: 'Alumni name',
    batch: 'Batch(Year)',
  },
];

export default function SuccessStories() {
  return (
    <section className="w-full bg-[#091B38] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 mt-12 font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-white">
            PLACEMENT SUCCESS STORIES
          </h2>
          <StarDivider light />
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white text-gray-900 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 relative group min-h-[220px]"
            >
              {/* Exact Stylized Blue & Gold Pen Icon */}
              <div className="mb-4">
                <div className="relative w-8 h-8">
                  <Image
                    src="/pen-icon.png"
                    alt="Testimonial pen"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Quote text */}
              <p className="text-xs sm:text-[13px] text-gray-600 font-normal leading-relaxed mb-6 font-poppins">
                {item.quote}
              </p>

              {/* Author & Batch */}
              <div className="border-t border-gray-100 pt-3">
                <h4 className="font-bold text-gray-900 text-sm tracking-tight font-poppins">
                  {item.author}
                </h4>
                <p className="text-xs text-gray-500 font-normal tracking-wide mt-0.5 font-poppins">
                  {item.batch}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots / Pill */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <div className="bg-white/15 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/10 shadow-inner">
            <span className="w-6 h-2 rounded-full bg-white/40" />
            <span className="w-8 h-2 rounded-full bg-[#F4B942]" />
            <span className="w-6 h-2 rounded-full bg-white/40" />
            <span className="w-6 h-2 rounded-full bg-white/40" />
            <span className="w-6 h-2 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync('app/Components/Pages/placement/SuccessStories.tsx', successStoriesCode, 'utf8');

console.log('All icons and components successfully updated!');
