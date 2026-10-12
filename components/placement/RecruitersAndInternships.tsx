'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import DecodeText from '@/components/transitions/DecodeText';
import { useInView, useIntroReady } from '@/lib/intro';
import { topRecruiters } from '@/data/placement/recruiters';
import type { PlacementNotice } from '@/types/placement';
import InternshipModal, { formatDeadline } from './InternshipModal';

// Recruiter tiles crawl into place one after another, rising and falling in
// turn, like the About page's achievement cards.
const crawl = (i: number) =>
  ({ '--poster-from': i % 2 ? '-48px' : '48px', '--intro-delay': `${200 + i * 90}ms` }) as React.CSSProperties;
// Shared by the two boxes' titles and their gold bars.
const BOX_TITLE = 'text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-wide text-[#3D2B1F] font-poppins';
const BOX_BAR = 'h-[3px] w-20 bg-[#C89B3C] rounded-full mt-2';
const stepIn = (ms: number) => ({ '--intro-delay': `${ms}ms` }) as React.CSSProperties;

export default function RecruitersAndInternships() {
  // Every time the two boxes scroll into view, their headings decode, the
  // recruiter tiles crawl in and the notices step in.
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { threshold: 0.25, once: false });
  const ready = useIntroReady();
  const play = inView && ready;

  const [notices, setNotices] = useState<PlacementNotice[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [selected, setSelected] = useState<PlacementNotice | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    fetch('/api/placements')
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: PlacementNotice[]) => {
        setNotices(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section
      ref={sectionRef}
      data-intro={play ? 'play' : 'pending'}
      className="relative z-10 w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-poppins"
    >
      <div className="flex flex-col xl:flex-row items-center xl:items-stretch justify-center gap-6 sm:gap-8 xl:gap-10 w-full">
        {/* ================================================================= */}
        {/* FIRST BOX: PLACEMENT NOTICE BOARD                                 */}
        {/* Data source: placement Google Sheet via /api/placements           */}
        {/* ================================================================= */}
        <div 
          className="w-full max-w-[720px] xl:max-w-none xl:flex-1 xl:min-w-0 rounded-[20px] bg-[#FFFCF8] p-5 sm:p-7 flex flex-col"
          style={{
            boxShadow: '0px 8px 24px 0px rgba(61, 43, 31, 0.18)',
          }}
        >
          {/* Header */}
          <div className="mb-2">
            <div className="relative">
              <h3 className={`intro-item ${BOX_TITLE}`}>
                <DecodeText text="PLACEMENT NOTICE BOARD" play={play} delay={150} />
              </h3>
              <div className={`intro-item intro-wipe ${BOX_BAR}`} style={stepIn(450)} />
            </div>
            <p className="intro-item intro-fade text-xs sm:text-sm text-[#7A6758] mt-2 font-normal font-poppins" style={stepIn(600)}>
              Latest placement and internship opportunities for IT students
            </p>
          </div>

          {/* Internship List Items (from the placement Google Sheet via /api/placements) */}
          <div className="mt-4 space-y-3 sm:max-h-[360px] sm:overflow-y-auto sm:pr-1">
            {status !== 'ready' || notices.length === 0 ? (
              <p className="text-sm text-[#7A6758] font-poppins pt-4 text-center">
                {status === 'loading'
                  ? 'Loading opportunities...'
                  : status === 'error'
                    ? 'Could not load opportunities right now.'
                    : 'No open opportunities right now. Check back soon.'}
              </p>
            ) : (
              notices.map((item, i) => {
                // One line on mobile (full-width button), two lines in the 120px desktop button.
                const ctaLabel = item.deadline ? (
                  <span className="flex sm:flex-col gap-1 sm:gap-0">
                    <span>Apply Before</span>
                    <span>{formatDeadline(item.deadline)}</span>
                  </span>
                ) : (
                  'Apply Now'
                );

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelected(item)}
                    style={stepIn(700 + i * 140)}
                    className="intro-item intro-fade border border-[#7A6758] bg-[#FFFCF8] rounded-[16px] px-4 py-2.5 sm:px-5 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#F5ECE0]"
                  >
                    {/* Left Detail */}
                    <div className="space-y-0.5 min-w-0 flex-1">
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
                      <div className="flex items-center justify-between gap-3 pl-6 pt-1">
                        <p className="text-[13px] text-[#3D2B1F] font-poppins truncate">
                          {item.ctc || item.eligibility}
                        </p>
                        <button
                          type="button"
                          aria-haspopup="dialog"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(item);
                          }}
                          className="shrink-0 inline-flex items-center gap-1 text-[13px] font-semibold text-[#C89B3C] hover:text-[#a87f2c] underline-offset-2 hover:underline cursor-pointer font-poppins"
                        >
                          Read more
                          <span aria-hidden className="leading-none">→</span>
                        </button>
                      </div>
                    </div>

                    {/* Apply CTA (application link from the sheet) */}
                    <div className="shrink-0 pl-6 sm:pl-0">
                      {item.applyLink ? (
                        <a
                          href={item.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="pixel-glitch w-full sm:w-[112px] h-11 sm:h-[52px] px-2 bg-[#7A6758] hover:bg-[#6c5a4d] active:scale-95 text-white font-poppins font-normal text-[13px] leading-tight rounded-[12px] transition-all duration-200 cursor-pointer flex items-center justify-center text-center"
                          style={{ boxShadow: '4px 4px 8px 2px #BB8B5A' }}
                        >
                          {ctaLabel}
                        </a>
                      ) : (
                        // Not a link, so styled as a note rather than a button
                        item.linkNote && (
                          <p className="w-full sm:w-[112px] px-2 py-2 sm:min-h-[52px] border border-dashed border-[#7A6758] text-[#7A6758] font-poppins text-[12px] leading-tight rounded-[12px] flex items-center justify-center text-center">
                            <span className="inline-block first-letter:uppercase">{item.linkNote}</span>
                          </p>
                        )
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* SECOND BOX: TOP RECRUITERS                                        */}
        {/* Data source: @/data/placement/recruiters.ts                       */}
        {/* ================================================================= */}
        <div 
          className="w-full max-w-[720px] xl:max-w-none xl:flex-1 xl:min-w-0 rounded-[20px] bg-[#E8DCCB] p-5 sm:p-7 flex flex-col"
          style={{
            boxShadow: '0px 8px 24px 0px rgba(61, 43, 31, 0.18)',
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="relative min-w-0">
              <h3 className={`intro-item ${BOX_TITLE}`}>
                <DecodeText text="TOP RECRUITERS" play={play} delay={150} />
              </h3>
              <div className={`intro-item intro-wipe ${BOX_BAR}`} style={stepIn(450)} />
            </div>
            <a
              href="https://gecskp.ac.in/it_placement.php"
              target="_blank"
              rel="noopener noreferrer"
              className="intro-item intro-fade group shrink-0 flex items-center gap-1.5 whitespace-nowrap text-xs sm:text-sm font-medium text-[#3D2B1F] hover:text-[#7A6758] transition font-poppins mt-1"
              style={stepIn(600)}
            >
              <span className="sm:hidden">View all</span>
              <span className="hidden sm:inline">View All Recruiters</span>
              <span className="leading-none group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          {/* Recruiter Logos Grid: easily updated in @/data/placement/recruiters.ts */}
          <div className="flex-1 flex items-center mt-5 sm:mt-6">
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {topRecruiters.slice(0, 8).map((recruiter, index) => {
                const name = typeof recruiter === 'string' ? recruiter : recruiter.name;
                const logoUrl = typeof recruiter === 'object' ? recruiter.logoUrl : undefined;
                const websiteUrl = typeof recruiter === 'object' ? recruiter.websiteUrl : undefined;

                const content = (
                  <div
                    key={index}
                    style={crawl(index)}
                    className="intro-item poster-crawl bg-[#FFFCF8] rounded-2xl p-3 sm:p-4 flex items-center justify-center text-center shadow-[0px_2px_8px_rgba(61,43,31,0.04)] hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-[76px] sm:h-[96px] lg:h-[104px]"
                  >
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt={name}
                        width={120}
                        height={60}
                        className="max-h-8 sm:max-h-11 max-w-full w-auto object-contain"
                      />
                    ) : (
                      <span className="text-[13px] sm:text-sm font-semibold text-[#3D2B1F] font-poppins tracking-normal leading-tight">
                        {name}
                      </span>
                    )}
                  </div>
                );

                return websiteUrl ? (
                  <a
                    key={index}
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus:outline-none"
                  >
                    {content}
                  </a>
                ) : (
                  content
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <InternshipModal notice={selected} onClose={closeModal} />
      )}
    </section>
  );
}
