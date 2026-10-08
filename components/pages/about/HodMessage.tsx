"use client";

import { useRef } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import HilbertReveal from "@/components/transitions/HilbertReveal";
import { useInView, useIntroReady } from "@/lib/intro";
import SectionHeading from "./SectionHeading";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

// The paragraphs step in one after another.
const stepIn = (i: number) =>
  ({ "--intro-delay": `${300 + i * 180}ms` }) as React.CSSProperties;

export default function HodMessage() {
  // Every time the section scrolls into view a Hilbert curve uncovers the
  // photo, like the panels on the home page, and the message steps in.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.25, once: false });
  const ready = useIntroReady();
  const play = inView && ready;
  const intro = play ? "play" : "pending";

  return (
    <section className={`${poppins.className} bg-[#CBAE8D]`}>
      <div className="mx-auto max-w-[1800px] px-4 py-10 sm:px-6 md:px-8 lg:px-12 lg:py-12 xl:px-16">
        <div
          ref={ref}
          className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12"
        >
          {/* HOD photo + name */}
          <div
            data-intro={intro}
            className="flex shrink-0 flex-col items-center text-center"
          >
            <div className="relative h-[200px] w-[175px] overflow-hidden rounded-[64px] bg-[#EEC578] lg:h-[257px] lg:w-[225px] lg:rounded-[85px]">
              <div data-reveal className="absolute inset-0">
                <Image
                  src="/about/Hod.jpeg"
                  alt="Dr. Rendhir R Prasad, Head of Department"
                  fill
                  sizes="225px"
                  className="object-cover"
                />
              </div>
              <HilbertReveal play={play} />
            </div>

            <p
              className="intro-item intro-fade mt-4 text-base font-bold text-[#1E1B18]"
              style={stepIn(3)}
            >
              Dr. Rendhir R Prasad
            </p>

            <p
              className="intro-item intro-fade text-[15px] leading-snug text-[#1E1B18]"
              style={stepIn(4)}
            >
              Head of Department
              <br />
              Information Technology
            </p>
          </div>

          {/* Heading + original HOD message */}
          <div className="w-full">
            <SectionHeading
              text="HOD Message"
              className="text-center text-3xl font-semibold uppercase leading-tight text-[#2A2522] sm:text-4xl xl:text-[44px]"
              barClassName="mx-auto mt-2 h-[3px] w-[60px] rounded-full bg-[#C9963A]"
            />

            <div
              data-intro={intro}
              className="mt-6 space-y-6 text-justify text-base italic leading-normal text-[#1E1B18] md:text-center"
            >
              <p className="intro-item intro-fade" style={stepIn(0)}>
                It gives me great pride to welcome you to the Department of
                Information Technology at Government Engineering College,
                Sreekrishnapuram (GEC Palakkad). Since the founding of our
                B.Tech programme in 1999, and through the years of affiliation
                with the APJ Abdul Kalam Technological University, this
                department has grown into a vibrant academic community
                dedicated to nurturing engineers who are as skilled in
                fundamentals as they are curious about what comes next. Our NBA
                accreditation stands as a testament to the rigour of our
                curriculum and the commitment of our faculty, staff, and
                students.
              </p>

              <p className="intro-item intro-fade" style={stepIn(1)}>
                We stand today at a remarkable moment in the history of
                computing. Artificial intelligence, data science, and
                intelligent automation are not distant possibilities but
                present realities reshaping every industry and profession. In
                recognition of this shift, our department has expanded its
                offerings with a dedicated M.Tech programme in Artificial
                Intelligence and Data Science, equipping postgraduate scholars
                to lead research and innovation in this transformative field.
                Alongside our well-established undergraduate programme, our
                laboratories, research initiatives, and industry-linked
                activities are designed to give students hands-on exposure to
                emerging technologies — from machine learning and data
                engineering to software systems and networked computing.
              </p>

              <p className="intro-item intro-fade" style={stepIn(2)}>
                Our vision — to achieve excellence in IT education and research
                by keeping pace with innovation — has never felt more relevant.
                We believe that true engineering education lies not merely in
                mastering today&apos;s tools, but in cultivating the adaptability,
                ethical grounding, and problem-solving temperament needed to
                navigate a future being redefined by AI. Our faculty combine
                academic depth with active engagement in research and industry
                collaboration, and our students consistently carry forward
                this spirit through projects, internships, and placements with
                leading organisations.
              </p>

              <p className="intro-item intro-fade" style={stepIn(3)}>
                As we look ahead, the Department of Information Technology
                remains committed to being a nurturing ground for talented,
                socially conscious technologists — professionals and
                entrepreneurs who will shape, question, and responsibly steer
                the age of intelligent technology. I invite prospective
                students, collaborators, and well-wishers to be part of this
                journey with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

