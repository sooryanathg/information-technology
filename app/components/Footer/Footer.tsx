"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { navigationLinks } from "@/app/data/navigation";
import TypeText, { typingTime } from "@/components/transitions/TypeText";
import { useInView } from "@/lib/intro";

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: "/icons/footer-linkedin.svg" },
  { label: "Instagram", href: "#", icon: "/icons/footer-instagram.svg" },
];

const sectionTitle =
  "mb-5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-coffee lg:mb-4 lg:text-[0.85rem] lg:font-semibold lg:tracking-wide";
const bodyText = "font-heading text-[0.88rem] text-walnut lg:text-[0.82rem]";
const iconSize = "size-[18px] shrink-0 lg:size-4";

function Divider() {
  return (
    <div
      aria-hidden="true"
      className="my-7 h-px w-full bg-latte/50 lg:my-0 lg:h-auto lg:w-px lg:justify-self-center lg:bg-white"
    />
  );
}

const HEADING = ["Department", "of", "Information Technology"];
const BLURB =
  "Empowering innovation through knowledge and technology, creating future ready engineers for a connected world";

// The columns step in slowly, one after another, and their text types itself out.
const STEP = 260; // ms between columns
const FADE = { "--intro-fade-duration": "1100ms", "--intro-fade-steps": 10 } as React.CSSProperties;
const HEADING_SPEED = 55; // ms per character
const BLURB_SPEED = 16;
const stepIn = (i: number) => ({ "--intro-delay": `${i * STEP}ms` }) as React.CSSProperties;
/** ms into the heading at which line `i` starts typing. */
const headingStart = (i: number) => HEADING.slice(0, i).reduce((ms, line) => ms + typingTime(line, HEADING_SPEED), 200);

export default function Footer() {
  // The columns step in, left to right, the first time the footer scrolls into
  // view, and the heading, blurb and column titles type themselves out.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.2 });

  return (
    <footer className="w-full">
      <div className="bg-sand px-6 py-10 md:px-12 lg:px-16 xl:px-20">
        <div
          ref={ref}
          data-intro={inView ? "play" : "pending"}
          style={FADE}
          className="relative z-10 mx-auto flex max-w-[1280px] flex-col lg:grid lg:grid-cols-[1.2fr_auto_0.7fr_auto_1fr_1.4fr] lg:gap-10"
        >
          <div className="intro-item intro-fade flex flex-col gap-4" style={stepIn(0)}>
            <h2 className="text-[1.65rem] font-extrabold uppercase leading-[1.25] tracking-tight text-coffee md:text-[1.8rem] lg:text-[1.35rem] lg:font-bold lg:leading-[1.3]">
              {HEADING.map((line, i) => (
                <TypeText key={line} className="block" text={line} play={inView} delay={headingStart(i)} speed={HEADING_SPEED} />
              ))}
            </h2>

            <p className="max-w-[340px] text-[0.85rem] leading-[1.6] text-walnut lg:max-w-[280px] lg:text-[0.82rem] lg:leading-[1.55]">
              <TypeText text={BLURB} play={inView} delay={headingStart(HEADING.length)} speed={BLURB_SPEED} />
            </p>

            <div className="flex items-center gap-3.5 pt-2 lg:gap-3 lg:pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-full border-[1.5px] border-coffee transition-colors hover:bg-sand-deep lg:size-9 lg:border lg:border-latte"
                >
                  <Image src={social.icon} alt="" width={18} height={18} className={iconSize} />
                </a>
              ))}
            </div>
          </div>

          <Divider />

          <nav aria-label="Quick links" className="intro-item intro-fade" style={stepIn(1)}>
            <h3 className={sectionTitle}>
              <TypeText text="Quick Links" play={inView} delay={STEP + 300} speed={HEADING_SPEED} />
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3.5 lg:grid-cols-1 lg:gap-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-heading text-[0.92rem] text-walnut hover:underline lg:text-[0.84rem]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Divider />

          <div className="intro-item intro-fade" style={stepIn(2)}>
            <h3 className={sectionTitle}>
              <TypeText text="Contact Us" play={inView} delay={STEP * 2 + 300} speed={HEADING_SPEED} />
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href="https://maps.app.goo.gl/pVKDeuSTWuVTPoN46"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-start gap-3 leading-[1.65] hover:underline lg:gap-2.5 lg:leading-[1.6] ${bodyText}`}
              >
                <Image src="/icons/footer-location.svg" alt="" width={18} height={18} className={`mt-[3px] ${iconSize}`} />
                <span>
                  WG3M+8GW, Government Engineering
                  <br />
                  College Rd, Manampatta,
                  <br />
                  Sreekrishnapuram, Kerala 678633
                </span>
              </a>

              <a
                href="mailto:itassociation@gecskp.ac.in"
                className={`flex items-center gap-3 hover:underline lg:gap-2.5 ${bodyText}`}
              >
                <Image src="/icons/footer-mail.svg" alt="" width={18} height={18} className={iconSize} />
                <span>itassociation@gecskp.ac.in</span>
              </a>
            </div>
          </div>

          <div className="intro-item intro-fade mt-8 flex items-start justify-center lg:mt-0 lg:justify-end" style={stepIn(3)}>
            <div className="w-full max-w-[380px] overflow-hidden rounded-[14px] shadow-photo lg:max-w-[400px] lg:rounded-2xl">
              <Image
                src="/images/department-building.png"
                alt="Department of Information Technology building at GEC Sreekrishnapuram"
                width={400}
                height={260}
                className="h-auto w-full scale-[1.02] object-cover lg:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-coffee px-6 py-3 md:px-12 lg:px-16 xl:px-20">
        <p className="relative z-10 mx-auto max-w-[1280px] text-[0.75rem] text-parchment">
          © 2026 Department of IT, GEC Sreekrishnapuram. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
