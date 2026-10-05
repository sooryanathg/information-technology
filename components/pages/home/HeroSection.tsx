"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Eye, GraduationCap, Shield, X } from "lucide-react";
import HeroButton from "./HeroButton";
import DecodeText from "@/components/transitions/DecodeText";
import PixelText from "@/components/transitions/PixelText";
import PixelatedBackground from "@/components/transitions/PixelatedBackground";
import PixelFrame from "@/components/transitions/PixelFrame";
import HilbertAssemble from "@/components/transitions/HilbertAssemble";
import { useIntroReady } from "@/lib/intro";

const HERO_BG = "#6d5b4d";
const BUTTON_BG = "#efeae6";

const HEADING = ["DEPARTMENT OF", "INFORMATION TECHNOLOGY"];

const TAGLINE = [
  "Empowering innovation through knowledge and technology,",
  "creating future ready engineers for a connected world",
];

// Text under the heading. It starts as the tagline; the vision and mission
// buttons swap in their own text, at the same size.
const SUBTEXT =
  "col-start-1 row-start-1 mx-auto max-w-[540px] text-base font-semibold leading-snug text-white drop-shadow-[0_1px_2px_rgb(0_0_0/0.18)] sm:max-w-[820px] sm:text-xl md:text-2xl lg:mx-0";
const LINE = "block mt-1.5 first:mt-0";

const departmentDetails = {
  vision: {
    title: "Department Vision",
    icon: Eye,
    lines: [
      "To achieve excellent standards in IT education and research by keeping abreast of innovations in Information Technology.",
    ],
  },
  mission: {
    title: "Department Mission",
    icon: Shield,
    lines: [
      "1. To nurture and develop students as competent IT professionals capable of undertaking challenging and innovative work.",
      "2. To foster self-discipline and socially committed entrepreneurs.",
    ],
  },
};

// Too long for the hero: the objectives open in a dialog instead.
const OBJECTIVES_TITLE = "Educational Objectives";
const OBJECTIVES_STAGGER = 45; // ms between the lines of the dialog starting to decode
const objectives: { heading: string; intro?: string; items: string[] }[] = [
  {
    heading: "Programme Educational Objectives (PEOs)",
    items: [
      "The graduates of the program will have strong foundation in mathematics, science and basic engineering concepts to solve engineering problems.",
      "They will possess in-depth knowledge in core subjects, enabling them to provide efficient, workable solutions for problems in various areas of IT.",
      "The graduates will have good interpersonal, leadership and communication skills, which will equip them to perform well in any environment.",
      "They will excel in IT professional careers and/or higher studies applying their technical knowledge and creative skills.",
      "They will be technically and ethically strong to relate engineering issues to the society, global economy and to emerging technologies.",
    ],
  },
  {
    heading: "Program Specific Outcomes (PSOs)",
    items: [
      "Design and develop software and hardware systems in computing, IT, ITES and embedded systems.",
      "Apply mathematics, science, management and engineering concepts to solve emerging real world problems using suitable data structures and algorithms.",
    ],
  },
  {
    heading: "Program Outcomes (POs)",
    intro: "Engineering Graduates will be able to:",
    items: [
      "Engineering knowledge: Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.",
      "Problem analysis: Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.",
      "Design/development of solutions: Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.",
      "Conduct investigations of complex problems: Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.",
      "Modern tool usage: Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.",
      "The engineer and society: Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.",
      "Environment and sustainability: Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.",
      "Ethics: Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.",
      "Individual and team work: Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.",
      "Communication: Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.",
      "Project management and finance: Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.",
      "Life-long learning: Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.",
    ],
  },
];

type DepartmentDetail = keyof typeof departmentDetails;

const detailKeys = Object.keys(departmentDetails) as DepartmentDetail[];

/** The tagline as plain text, on two lines from md up. */
const taglineLayout = (
  <>
    {TAGLINE[0]} <br className="hidden md:block" />
    {TAGLINE[1]}
  </>
);

const detailLayout = (key: DepartmentDetail) =>
  departmentDetails[key].lines.map((line) => (
    <span key={line} className={LINE}>
      {line}
    </span>
  ));

export default function HeroSection() {
  // Which button's text stands under the heading; null for the tagline.
  const [activeDetail, setActiveDetail] = useState<DepartmentDetail | null>(null);
  // Until a button is first used the tagline keeps its part in the intro;
  // after that every text, the tagline included, decodes in like the heading.
  const [switched, setSwitched] = useState(false);
  const [objectivesOpen, setObjectivesOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const ready = useIntroReady();

  const showDetail = (key: DepartmentDetail) => {
    setSwitched(true);
    setActiveDetail(key);
  };

  // A click anywhere but on the buttons (or in the dialog) gives the tagline back.
  useEffect(() => {
    if (!activeDetail) return;
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest("[data-hero-detail]")) return;
      setActiveDetail(null);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [activeDetail]);

  useEffect(() => {
    if (!objectivesOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setObjectivesOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [objectivesOpen]);

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

      <PixelFrame imgRef={imgRef} background={HERO_BG} alpha={0.94} />

      <div className="relative z-10 mx-auto flex w-full flex-col items-center gap-8 px-5 py-12 sm:gap-12 sm:px-8 sm:py-16 lg:flex-row lg:justify-between lg:gap-[5vw] lg:px-[5vw] lg:py-10">
        <div className="flex w-full flex-1 flex-col text-center lg:text-left">
          <PixelText
            as="h1"
            play={ready}
            startDelay={3000}
            className="intro-item font-heading text-[clamp(2.1rem,9.6vw,3rem)] font-semibold uppercase leading-[1.02] tracking-[-0.02em] text-white drop-shadow-[0_2px_3px_rgb(0_0_0/0.22)] sm:text-[clamp(2.5rem,4.2vw,4.5rem)]"
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

          <div aria-live="polite" className="grid">
            {/* Unseen copies of the other texts keep this block as tall as the
                tallest of them, so nothing moves when the text changes. */}
            {activeDetail && (
              <p aria-hidden="true" className={`invisible ${SUBTEXT}`}>
                {taglineLayout}
              </p>
            )}
            {detailKeys.map(
              (key) =>
                key !== activeDetail && (
                  <p key={key} aria-hidden="true" className={`invisible ${SUBTEXT}`}>
                    {detailLayout(key)}
                  </p>
                )
            )}

            {!switched ? (
              <PixelText
                play={ready}
                startDelay={3800} // offset from the heading so the two sweeps don't sync up
                className={`intro-item intro-fade ${SUBTEXT}`}
                style={{ "--intro-delay": "1450ms" } as React.CSSProperties}
                layout={taglineLayout}
              >
                {taglineLayout}
              </PixelText>
            ) : activeDetail ? (
              <PixelText
                key={activeDetail}
                play={ready}
                startDelay={2600}
                className={`intro-item ${SUBTEXT}`}
                layout={detailLayout(activeDetail)}
              >
                {/* The lines decode side by side, so a long text takes no longer than a short one. */}
                {departmentDetails[activeDetail].lines.map((line, i) => (
                  <DecodeText key={line} className={LINE} text={line} play={ready} delay={i * 90} stagger={9} />
                ))}
              </PixelText>
            ) : (
              <PixelText
                key="tagline"
                play={ready}
                startDelay={2600}
                className={`intro-item ${SUBTEXT}`}
                layout={taglineLayout}
              >
                <DecodeText text={TAGLINE[0]} play={ready} stagger={12} /> <br className="hidden md:block" />
                <DecodeText text={TAGLINE[1]} play={ready} stagger={12} offset={TAGLINE[0].length} />
              </PixelText>
            )}
          </div>
        </div>

        {/* Three squares side by side on phones, a column of rows from sm up. */}
        <div className="relative mx-auto grid w-full max-w-[330px] shrink-0 grid-cols-3 gap-3 sm:flex sm:max-w-none sm:flex-col sm:gap-5 lg:w-[25vw] lg:max-w-[440px] lg:gap-8">
          {detailKeys.map((key) => {
            const { title, icon: Icon } = departmentDetails[key];
            return (
              <div key={key} data-assemble data-hero-detail className="intro-item">
                <HeroButton
                  title={title}
                  icon={<Icon size={23} />}
                  active={activeDetail === key}
                  onClick={() => showDetail(key)}
                />
              </div>
            );
          })}
          <div data-assemble data-hero-detail className="intro-item">
            <HeroButton
              title={OBJECTIVES_TITLE}
              icon={<GraduationCap size={23} />}
              active={objectivesOpen}
              onClick={() => setObjectivesOpen(true)}
            />
          </div>
          {/* The buttons are built from falling pixels that land along a Hilbert curve. */}
          <HilbertAssemble play={ready} delay={1100} color={BUTTON_BG} />
        </div>
      </div>

      {objectivesOpen && (
        <div
          data-hero-detail
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-6 py-10"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setObjectivesOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="objectives-dialog-title"
            className="flex max-h-[70svh] w-full max-w-[330px] flex-col overflow-hidden rounded-[14px] bg-[#5d442f] text-sand shadow-[0_16px_50px_rgb(0_0_0/0.4)] sm:max-h-[78svh] sm:max-w-[680px]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/15 px-4 py-3 sm:px-7 sm:py-4">
              <h2 id="objectives-dialog-title" className="font-heading text-base font-semibold uppercase text-white sm:text-xl">
                {OBJECTIVES_TITLE}
              </h2>
              <button
                type="button"
                autoFocus
                aria-label="Close dialog"
                onClick={() => setObjectivesOpen(false)}
                className="rounded p-1 text-white/90 transition hover:bg-black/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Everything decodes in like the heading, each line a moment after the one before. */}
            <div className="space-y-5 overflow-y-auto overscroll-contain px-4 py-4 text-[0.8rem] leading-relaxed sm:space-y-6 sm:px-7 sm:py-5 sm:text-[0.95rem]">
              {objectives.map(({ heading, intro, items }, s) => {
                const before = objectives.slice(0, s).reduce((n, o) => n + o.items.length + 1, 0);
                const delay = (line: number) => (before + line) * OBJECTIVES_STAGGER;
                return (
                  <section key={heading}>
                    <h3 className="mb-2 font-heading text-[0.85rem] font-semibold uppercase tracking-wide text-gold-soft sm:text-base">
                      <DecodeText text={heading} play delay={delay(0)} stagger={12} />
                    </h3>
                    {intro && (
                      <p className="mb-2">
                        <DecodeText text={intro} play delay={delay(0)} stagger={6} />
                      </p>
                    )}
                    <ol className="list-decimal space-y-2 pl-5 marker:text-gold-soft">
                      {items.map((item, i) => {
                        // "Label: text" items get their label set apart.
                        const colon = intro ? item.indexOf(": ") + 1 : 0;
                        return (
                          <li key={item}>
                            {colon > 0 && (
                              <DecodeText
                                className="font-semibold text-white"
                                text={item.slice(0, colon)}
                                play
                                delay={delay(i + 1)}
                                stagger={3}
                              />
                            )}
                            <DecodeText text={item.slice(colon)} play delay={delay(i + 1)} offset={colon} stagger={3} />
                          </li>
                        );
                      })}
                    </ol>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
