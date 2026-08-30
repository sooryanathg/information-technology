import React from 'react';
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
                <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wider text-[#1E3A5F]">
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
