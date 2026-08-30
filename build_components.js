const fs = require('fs');
const path = require('path');

// 1. Helper StarDivider Component
const starDividerCode = `import React from 'react';

interface StarDividerProps {
  light?: boolean;
}

export default function StarDivider({ light = false }: StarDividerProps) {
  return (
    <div className="flex items-center justify-center gap-3 my-3">
      <div className={\`h-[2px] w-14 sm:w-20 rounded-full \${light ? 'bg-[#F4B942]' : 'bg-[#F4B942]'}\`} />
      <span className="text-[#F4B942] text-xl sm:text-2xl leading-none select-none">★</span>
      <div className={\`h-[2px] w-14 sm:w-20 rounded-full \${light ? 'bg-[#F4B942]' : 'bg-[#F4B942]'}\`} />
    </div>
  );
}
`;
fs.writeFileSync('app/Components/StarDivider.tsx', starDividerCode, 'utf8');

// 2. Navbar Component
const navbarCode = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('PLACEMENT');

  const navItems = [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT', href: '#' },
    { label: 'EVENTS', href: '#' },
    { label: 'GALLERY', href: '#' },
    { label: 'RESEARCH', href: '#' },
    { label: 'PLACEMENT', href: '#' },
  ];

  return (
    <header className="w-full bg-[#384351]/95 backdrop-blur-md sticky top-0 z-50 border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-md bg-white/15 flex items-center justify-center border border-white/20 group-hover:border-white/40 transition shadow-inner">
            <span className="font-bold italic text-white text-lg font-serif tracking-tighter">IT</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">
            Dept of IT
          </span>
        </Link>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-2.5 lg:gap-3.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={\`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer \${
                  isActive
                    ? 'bg-[#B0BCCB] text-slate-900 shadow-sm font-bold'
                    : 'bg-white/15 text-white/90 hover:bg-white/25 hover:text-white'
                }\`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Navigation Pill */}
        <div className="md:hidden flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#B0BCCB] text-slate-900 text-xs font-bold">
            PLACEMENT
          </span>
        </div>
      </div>
    </header>
  );
}
`;
fs.writeFileSync('app/Components/Navbar.tsx', navbarCode, 'utf8');

// 3. Hero Component
const heroCode = `import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#2D3642] text-white min-h-[480px] lg:min-h-[560px] flex items-center">
      {/* Background Image Container with Gradient Blend */}
      <div className="absolute inset-0 z-0">
        {/* Right side students photo */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 lg:w-1/2 opacity-70 md:opacity-85 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700">
          <Image
            src="/hero-students.png"
            alt="IT Students Placements and Team"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        {/* Dark Slate Gradients for seamless text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D3642] via-[#2D3642]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D3642] via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24 w-full">
        <div className="max-w-2xl">
          {/* Main Headings */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white font-sans drop-shadow-sm">
              PLACEMENT
            </h1>
            <div className="inline-block bg-[#F4B942] px-3 sm:px-4 py-1 rounded-sm shadow-md">
              <span className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white font-sans drop-shadow">
                STATISTICS
              </span>
            </div>
          </div>

          {/* Subtitles */}
          <div className="mt-8 sm:mt-10 space-y-2">
            <p className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              From campus to career:
            </p>
            <p className="text-base sm:text-lg text-gray-300 font-normal">
              Turning potential into professional success...
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-8 sm:mt-12">
            <button className="group inline-flex items-center justify-center gap-3 bg-[#F4B942] hover:bg-[#e5a82e] active:scale-98 text-slate-950 font-bold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-4.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
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

// 4. Highlights Component
const highlightsCode = `import React from 'react';
import { Users, IndianRupee, TrendingUp, Building2, GraduationCap, Calendar } from 'lucide-react';
import StarDivider from '@/app/Components/StarDivider';

interface HighlightItem {
  id: string;
  icon: React.ElementType;
  value: string;
  label: string;
}

const highlights: HighlightItem[] = [
  {
    id: 'rate',
    icon: Users,
    value: '95%',
    label: 'Placement Rate',
  },
  {
    id: 'highest',
    icon: IndianRupee,
    value: '18.6LPA',
    label: 'Highest package',
  },
  {
    id: 'avg',
    icon: TrendingUp,
    value: '9.2 LPA',
    label: 'Average package',
  },
  {
    id: 'companies',
    icon: Building2,
    value: '120+',
    label: 'Companies visited',
  },
  {
    id: 'placed',
    icon: GraduationCap,
    value: '350+',
    label: 'Students placed',
  },
  {
    id: 'batch',
    icon: Calendar,
    value: '2026-2027',
    label: 'Placement Batch',
  },
];

export default function Highlights() {
  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-[#1A2332]">
          PLACEMENT HIGHLIGHTS
        </h2>
        <StarDivider />
      </div>

      {/* Grid of 6 Highlight Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/80 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-amber-50/60 flex items-center justify-center mb-3 group-hover:bg-[#F4B942]/10 transition-colors">
                <Icon className="w-7 h-7 text-[#F4B942] stroke-[1.75]" />
              </div>

              {/* Number/Stat */}
              <div className="text-xl sm:text-2xl font-bold text-gray-900 font-sans tracking-tight">
                {item.value}
              </div>

              {/* Label */}
              <div className="text-xs sm:text-sm font-medium text-gray-500 mt-1 leading-snug">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
`;
fs.writeFileSync('app/Components/Pages/placement/Highlights.tsx', highlightsCode, 'utf8');

// 5. Recruiters and Internships Component
const recruitersAndInternshipsCode = `import React from 'react';
import Link from 'next/link';
import { ArrowRight, Pin, MapPin, Clock } from 'lucide-react';

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
    <section className="w-full py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        {/* LEFT BOX: TOP RECRUITERS */}
        <div className="bg-[#DCE4ED] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#CBD7E2] flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-300/60 pb-4 mb-6">
              <div className="relative">
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#0E2038]">
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
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#0E2038]">
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
                      <Pin className="w-4 h-4 text-slate-800 rotate-45 shrink-0 fill-slate-800" />
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base tracking-tight">
                        {item.role}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-500 pl-6">
                      {item.company}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 pl-6 pt-1">
                      <span className="flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        {item.mode}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="sm:self-center pl-6 sm:pl-0">
                    <button className="w-full sm:w-auto bg-[#0284C7] hover:bg-[#0369A1] active:scale-98 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-xs hover:shadow transition-all duration-200 cursor-pointer whitespace-nowrap">
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

// 6. Alumni Section Component
const alumniSectionCode = `import React from 'react';
import { User, MapPin, ChevronRight } from 'lucide-react';
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
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
              {/* Avatar Icon */}
              <div className="w-20 h-20 rounded-full border-2 border-[#F4B942] flex items-center justify-center text-[#F4B942] bg-[#FFFBF0] mb-4 group-hover:scale-105 transition-transform">
                <User className="w-10 h-10 stroke-[1.5]" />
              </div>

              {/* Name & Title */}
              <h4 className="font-bold text-gray-900 text-sm sm:text-base tracking-tight">
                {alumni.name}
              </h4>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                {alumni.designation}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 font-normal">
                {alumni.company}
              </p>

              {/* Divider */}
              <div className="w-full border-t border-gray-100 my-3" />

              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
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
        <button className="bg-[#F4B942] hover:bg-[#e5a82e] active:scale-98 text-white font-bold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer">
          Connect With Alumni
        </button>
      </div>
    </section>
  );
}
`;
fs.writeFileSync('app/Components/Pages/placement/AlumniSection.tsx', alumniSectionCode, 'utf8');

// 7. Success Stories Component
const successStoriesCode = `import React from 'react';
import { PenLine } from 'lucide-react';
import StarDivider from '@/app/Components/StarDivider';

const testimonials = [
  {
    id: '1',
    quote:
      'This department provided me with the perfect blend of knowledge, exposure and opportunities to grow.',
    author: 'Alumni name',
    batch: 'BTECH (2023)',
  },
  {
    id: '2',
    quote:
      'This department provided me with the perfect blend of knowledge, exposure and opportunities to grow.',
    author: 'Alumni name',
    batch: 'BTECH (2023)',
  },
  {
    id: '3',
    quote:
      'This department provided me with the perfect blend of knowledge, exposure and opportunities to grow.',
    author: 'Alumni name',
    batch: 'BTECH (2023)',
  },
  {
    id: '4',
    quote:
      'This department provided me with the perfect blend of knowledge, exposure and opportunities to grow.',
    author: 'Alumni name',
    batch: 'BTECH (2023)',
  },
];

export default function SuccessStories() {
  return (
    <section className="w-full bg-[#091B38] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 mt-12">
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
              className="bg-white text-gray-900 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 relative group"
            >
              {/* Cyan Icon Top Left */}
              <div className="mb-4">
                <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center text-[#06B6D4] group-hover:bg-[#06B6D4] group-hover:text-white transition-colors">
                  <PenLine className="w-5 h-5 stroke-[2.2]" />
                </div>
              </div>

              {/* Quote text */}
              <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed italic mb-8">
                {item.quote}
              </p>

              {/* Author & Batch */}
              <div className="border-t border-gray-100 pt-3">
                <h4 className="font-bold text-gray-900 text-sm tracking-tight">
                  {item.author}
                </h4>
                <p className="text-[11px] text-gray-400 font-semibold tracking-wider uppercase mt-0.5">
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

// 8. Footer Component
const footerCode = `import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Globe, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#F7EFE8] text-gray-800">
      {/* 4 Column Top Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Department Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-extrabold text-gray-900 text-sm sm:text-base tracking-wider uppercase leading-tight">
              DEPARTMENT<br />OF<br />INFORMATION TECHNOLOGY
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed max-w-sm">
              Empowering innovation through knowledge and technology, creating future ready engineers for a connected world.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-gray-400/80 flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all shadow-xs"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                aria-label="Website"
                className="w-8 h-8 rounded-full border border-gray-400/80 flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all shadow-xs"
              >
                <Globe className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-gray-900 text-xs sm:text-sm tracking-wider uppercase">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900 hover:underline transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 hover:underline transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 hover:underline transition">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 hover:underline transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 hover:underline transition">
                  Research
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900 hover:underline transition font-semibold text-gray-900">
                  Placements
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-gray-900 text-xs sm:text-sm tracking-wider uppercase">
              CONTACT US
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-gray-600">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-sm border border-gray-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3 h-3 text-gray-700" />
                </div>
                <p className="leading-relaxed">
                  WC3M+8GW, Government Engineering College Rd, Mannampatta, Sreekrishnapuram, Kerala 679633
                </p>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-sm border border-gray-400 flex items-center justify-center shrink-0">
                  <Mail className="w-3 h-3 text-gray-700" />
                </div>
                <a
                  href="mailto:informationtechnologygecskp@gmail.com"
                  className="hover:text-gray-900 hover:underline transition break-all"
                >
                  informationtechnologygecskp@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Department Building Photo Card (3 cols) */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-gray-300/70 aspect-[16/10] group">
              <Image
                src="/dept-hallway.png"
                alt="Dept. of Information Technology Facility"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] sm:text-xs font-bold text-center py-1 px-2 rounded-md tracking-wider">
                Dept. OF INFORMATION TECHNOLOGY
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Strip */}
      <div className="w-full bg-[#18212D] text-gray-400 text-xs text-center py-4 px-4 border-t border-white/5 font-medium">
        © 2026 Department of IT, GEC Sreekrishnapuram. All rights reserved.
      </div>
    </footer>
  );
}
`;
fs.writeFileSync('app/Components/Footer.tsx', footerCode, 'utf8');

// 9. Main page.tsx
const pageCode = `import Navbar from './Components/Navbar';
import Hero from './Components/Pages/placement/hero';
import Highlights from './Components/Pages/placement/Highlights';
import RecruitersAndInternships from './Components/Pages/placement/RecruitersAndInternships';
import AlumniSection from './Components/Pages/placement/AlumniSection';
import SuccessStories from './Components/Pages/placement/SuccessStories';
import Footer from './Components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {/* 1. Placement Hero Banner */}
        <Hero />

        {/* 2. Placement Highlights Cards */}
        <Highlights />

        {/* 3. Top Recruiters & Internship Notice Board */}
        <RecruitersAndInternships />

        {/* 4. Alumni Connection */}
        <AlumniSection />

        {/* 5. Placement Success Stories Testimonials */}
        <SuccessStories />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
`;
fs.writeFileSync('app/page.tsx', pageCode, 'utf8');

console.log('All components and page.tsx created successfully!');
