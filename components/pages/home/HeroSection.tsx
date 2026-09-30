"use client";

import { useEffect, useState } from "react";
import { Eye, Shield, GraduationCap, X } from "lucide-react";
import Image from "next/image";
import HeroButton from "./HeroButton";

const departmentDetails = {
  vision: {
    title: "Department Vision",
    icon: <Eye size={23} />,
    content: (
      <p>
        To achieve excellent standards in IT education and research by keeping
        abreast of innovations in Information Technology.
      </p>
    ),
  },
  mission: {
    title: "Department Mission",
    icon: <Shield size={23} />,
    content: (
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          To nurture and develop students as competent IT professionals capable
          of undertaking challenging and innovative work.
        </li>
        <li>
          To foster self-discipline and socially committed entrepreneurs.
        </li>
      </ol>
    ),
  },
  objectives: {
    title: "Educational Objectives",
    icon: <GraduationCap size={23} />,
    content: (
      <div className="space-y-3">
        <p className="font-semibold">Program Educational Objectives (PEOs)</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Apply computing knowledge to solve real-world problems.</li>
          <li>Build successful careers and contribute to the IT profession.</li>
          <li>Continue learning and adapt to emerging technologies.</li>
          <li>Work ethically and collaboratively for society.</li>
        </ol>
      </div>
    ),
  },
} as const;

type DepartmentDetail = keyof typeof departmentDetails;

export default function HeroSection() {
  const [activeDetail, setActiveDetail] = useState<DepartmentDetail | null>(null);

  useEffect(() => {
    if (!activeDetail) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveDetail(null);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeDetail]);

  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#6d5b4d]">
      <Image
        src="/hero-bg.webp"
        alt="Department building surrounded by trees"
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover opacity-[0.94]"
      />
      <div className="absolute inset-0 bg-[#8a7768]/8" />
      <div className="absolute inset-0 bg-black/22" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(47,41,37,0.28),rgba(47,41,37,0.16),rgba(47,41,37,0.06))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(232,226,219,0.05),rgba(232,226,219,0.02),rgba(232,226,219,0))]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_48%,rgba(238,232,225,0.08)_0%,rgba(238,232,225,0.03)_28%,transparent_60%),radial-gradient(ellipse_at_78%_84%,rgba(226,218,204,0.04)_0%,transparent_54%),linear-gradient(0deg,rgba(232,225,214,0.025),transparent_48%)]"
      />

      <div className="relative z-10 mx-auto flex w-full flex-col items-center gap-8 px-5 py-12 sm:gap-12 sm:px-8 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-[5vw] lg:px-[5vw] lg:py-10">
        <div className="flex w-full flex-1 flex-col text-center lg:text-left">
          <h1 className="font-poppins text-[clamp(1.8rem,7.4vw,2.45rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.22)] sm:text-[clamp(2.5rem,4.2vw,4.5rem)]">
            <span className="block">DEPARTMENT OF</span>
            <span className="block">INFORMATION <span className="block sm:inline">TECHNOLOGY</span></span>
          </h1>

          <div className="mx-auto my-6 h-[3px] w-full max-w-[960px] rounded-full bg-white/80 lg:mx-0 sm:my-7" />

          <p className="mx-auto max-w-[540px] font-inter text-base font-semibold leading-snug text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)] sm:max-w-[820px] sm:text-xl md:text-2xl lg:mx-0">
            Empowering innovation through knowledge and technology,
            <br className="hidden md:block" />
            creating future ready engineers for a connected world
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 sm:gap-5 lg:w-[25vw] lg:max-w-[440px] lg:gap-8">
          {(Object.keys(departmentDetails) as DepartmentDetail[]).map((key) => {
            const detail = departmentDetails[key];
            return (
              <HeroButton
                key={key}
                title={detail.title}
                icon={detail.icon}
                onClick={() => setActiveDetail(key)}
              />
            );
          })}
        </div>
      </div>

      {activeDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-5 py-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveDetail(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="department-dialog-title"
            className="relative w-full max-w-[560px] rounded-[10px] bg-[#b7885a] px-6 py-5 text-white shadow-[0_16px_50px_rgba(0,0,0,0.35)] sm:px-8 sm:py-6"
          >
            <button
              type="button"
              aria-label="Close dialog"
              onClick={() => setActiveDetail(null)}
              className="absolute right-3 top-3 rounded p-1 text-white/90 transition hover:bg-black/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X size={18} />
            </button>
            <h2
              id="department-dialog-title"
              className="mb-3 pr-7 font-inter text-base font-bold uppercase"
            >
              {departmentDetails[activeDetail].title}:
            </h2>
            <div className="font-inter text-sm leading-relaxed text-white/95">
              {departmentDetails[activeDetail].content}
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
