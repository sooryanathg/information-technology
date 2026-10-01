"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Eye, GraduationCap, Shield, X } from "lucide-react";
import HeroButton from "./HeroButton";
import DecodeText from "./DecodeText";
import PixelText from "./PixelText";
import PixelatedBackground from "./PixelatedBackground";
import HeroPixelFrame from "./HeroPixelFrame";
import { useIntroReady } from "@/lib/intro";

const HERO_BG = "#6d5b4d";

const HEADING = ["DEPARTMENT OF", "INFORMATION TECHNOLOGY"];

const TAGLINE = (
  <>
    Empowering innovation through knowledge and technology,
    <br className="hidden md:block" /> creating future ready engineers for a connected world
  </>
);

const departmentDetails = {
  vision: {
    title: "Department Vision",
    icon: Eye,
    content: (
      <p>
        To achieve excellent standards in IT education and research by keeping abreast of innovations in
        Information Technology.
      </p>
    ),
  },
  mission: {
    title: "Department Mission",
    icon: Shield,
    content: (
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          To nurture and develop students as competent IT professionals capable of undertaking challenging and
          innovative work.
        </li>
        <li>To foster self-discipline and socially committed entrepreneurs.</li>
      </ol>
    ),
  },
  objectives: {
    title: "Educational Objectives",
    icon: GraduationCap,
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
};

type DepartmentDetail = keyof typeof departmentDetails;

const detailKeys = Object.keys(departmentDetails) as DepartmentDetail[];

export default function HeroSection() {
  const [activeDetail, setActiveDetail] = useState<DepartmentDetail | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const ready = useIntroReady();

  useEffect(() => {
    if (!activeDetail) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveDetail(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeDetail]);

  return (
    <section
      data-intro={ready ? "play" : "pending"}
      className="relative flex min-h-svh w-full items-center overflow-hidden bg-umber"
    >
      <Image
        ref={imgRef}
        src="/home/hero-bg.webp"
        alt="Department building surrounded by trees"
        fill
        priority
        className="object-cover opacity-[0.94]"
      />
      <PixelatedBackground imgRef={imgRef} play={ready} background={HERO_BG} alpha={0.94} />
      <div aria-hidden="true" className="absolute inset-0 bg-taupe/8" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/22 bg-[linear-gradient(90deg,rgb(47_41_37/0.28),rgb(47_41_37/0.16),rgb(47_41_37/0.06))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_48%,rgb(238_232_225/0.08)_0%,rgb(238_232_225/0.03)_28%,transparent_60%),radial-gradient(ellipse_at_78%_84%,rgb(226_218_204/0.04)_0%,transparent_54%),linear-gradient(0deg,rgb(232_225_214/0.025),transparent_48%),linear-gradient(90deg,rgb(232_226_219/0.05),rgb(232_226_219/0.02),transparent)]"
      />

      <HeroPixelFrame imgRef={imgRef} background={HERO_BG} alpha={0.94} />

      <div className="relative z-10 mx-auto flex w-full flex-col items-center gap-8 px-5 py-12 sm:gap-12 sm:px-8 sm:py-16 lg:flex-row lg:justify-between lg:gap-[5vw] lg:px-[5vw] lg:py-10">
        <div className="flex w-full flex-1 flex-col text-center lg:text-left">
          <PixelText
            as="h1"
            play={ready}
            startDelay={3000}
            className="intro-item font-heading text-[clamp(1.8rem,7.4vw,2.45rem)] font-semibold uppercase leading-[1.02] tracking-[-0.02em] text-white drop-shadow-[0_2px_3px_rgb(0_0_0/0.22)] sm:text-[clamp(2.5rem,4.2vw,4.5rem)]"
            layout={HEADING.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          >
            <DecodeText className="block" text={HEADING[0]} play={ready} delay={450} />
            <DecodeText className="block" text={HEADING[1]} play={ready} delay={450} offset={HEADING[0].length} />
          </PixelText>

          <div
            className="intro-item intro-wipe mx-auto my-6 h-[3px] w-full max-w-[960px] rounded-full bg-white/80 sm:my-7 lg:mx-0"
            style={{ "--intro-delay": "1100ms", "--intro-steps": 24, "--intro-duration": "650ms" } as React.CSSProperties}
          />

          <PixelText
            play={ready}
            startDelay={3800} // offset from the heading so the two sweeps don't sync up
            className="intro-item intro-fade mx-auto max-w-[540px] text-base font-semibold leading-snug text-white drop-shadow-[0_1px_2px_rgb(0_0_0/0.18)] sm:max-w-[820px] sm:text-xl md:text-2xl lg:mx-0"
            style={{ "--intro-delay": "1450ms" } as React.CSSProperties}
            layout={TAGLINE}
          >
            {TAGLINE}
          </PixelText>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 sm:gap-5 lg:w-[25vw] lg:max-w-[440px] lg:gap-8">
          {detailKeys.map((key, i) => {
            const { title, icon: Icon } = departmentDetails[key];
            return (
              <div
                key={key}
                className="intro-item intro-wipe"
                style={{ "--intro-delay": `${1300 + i * 140}ms`, "--intro-steps": 10 } as React.CSSProperties}
              >
                <HeroButton title={title} icon={<Icon size={23} />} onClick={() => setActiveDetail(key)} />
              </div>
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
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="department-dialog-title"
            className="relative w-full max-w-[560px] rounded-[10px] bg-toffee px-6 py-5 text-white shadow-[0_16px_50px_rgb(0_0_0/0.35)] sm:px-8 sm:py-6"
          >
            <button
              type="button"
              aria-label="Close dialog"
              onClick={() => setActiveDetail(null)}
              className="absolute right-3 top-3 rounded p-1 text-white/90 transition hover:bg-black/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X size={18} />
            </button>
            <h2 id="department-dialog-title" className="mb-3 pr-7 text-base font-bold uppercase">
              {departmentDetails[activeDetail].title}:
            </h2>
            <div className="text-sm leading-relaxed text-white/95">{departmentDetails[activeDetail].content}</div>
          </div>
        </div>
      )}
    </section>
  );
}
