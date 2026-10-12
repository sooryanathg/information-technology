'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import type { PlacementNotice } from '@/types/placement';

export const formatDeadline = (date: string, withYear = false) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    ...(withYear && { year: 'numeric' }),
    timeZone: 'UTC',
  });

interface InternshipModalProps {
  notice: PlacementNotice;
  onClose: () => void;
}

// Shows only what the placement sheet row contains; empty / NA cells are skipped.
export default function InternshipModal({ notice, onClose }: InternshipModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const previousOverflow = document.body.style.overflow;

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const fields = [
    { label: 'Eligibility', value: notice.eligibility },
    { label: 'CTC / Benefits', value: notice.ctc },
    {
      label: 'Registration Deadline',
      value: notice.deadline ? formatDeadline(notice.deadline, true) : '',
    },
    { label: 'Details', value: notice.details },
  ].filter((field) => field.value);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#3D2B1F]/60 backdrop-blur-sm p-4 font-poppins"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="internship-modal-title"
        className="relative w-full max-w-[560px] max-h-[85vh] overflow-y-auto rounded-[20px] bg-[#FFFCF8] p-6 sm:p-8"
        style={{ boxShadow: '0px 8px 24px 0px #00000040' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#7A6758] hover:bg-[#E8DCCB] transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-8">
          <div className="flex flex-wrap items-center gap-2">
            {notice.company && (
              <p className="text-sm text-[#7A6758]">{notice.company}</p>
            )}
            {notice.status && (
              <span className="text-[11px] font-semibold uppercase tracking-wide text-[#3D2B1F] bg-[#E8DCCB] rounded-full px-2.5 py-0.5">
                {notice.status}
              </span>
            )}
          </div>
          <h3
            id="internship-modal-title"
            className="mt-1.5 text-lg sm:text-xl font-bold text-[#3D2B1F] leading-snug"
          >
            {notice.role}
          </h3>
          <div className="h-[3.5px] w-16 bg-[#C89B3C] rounded-full mt-3" />
        </div>

        {/* Sheet fields */}
        {fields.length > 0 && (
          <dl className="mt-5 space-y-4">
            {fields.map((field) => (
              <div key={field.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-[#7A6758]">
                  {field.label}
                </dt>
                <dd className="mt-1 text-sm text-[#3D2B1F] leading-relaxed whitespace-pre-line">
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {/* CTA */}
        <div className="mt-6">
          {notice.applyLink ? (
            <a
              href={notice.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full h-[52px] rounded-[12px] bg-[#7A6758] hover:bg-[#6c5a4d] active:scale-[0.98] text-white font-semibold text-[15px] transition-all duration-200"
              style={{ boxShadow: '4px 4px 8px 2px #BB8B5A' }}
            >
              Apply Now
              <ArrowUpRight className="w-4 h-4" />
            </a>
          ) : (
            notice.linkNote && (
              <p className="w-full rounded-[12px] border border-[#7A6758] px-4 py-3 text-center text-sm text-[#3D2B1F] first-letter:uppercase">
                {notice.linkNote}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
