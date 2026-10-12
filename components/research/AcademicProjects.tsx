"use client";

import { useEffect, useState } from "react";
import type { AcademicProject } from "@/types/research";
import { PROJECT_SUBMISSION_FORM_URL } from "@/data/research/links";
import AcademicProjectCard from "./AcademicProjectCard";

export default function AcademicProjects() {
  const [projects, setProjects] = useState<AcademicProject[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    fetch("/api/research")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: AcademicProject[]) => {
        setProjects(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section
      className="
        relative w-full
        px-6
        pb-12
        pt-10
        md:px-10
        lg:px-[40px]
      "
      style={{
        background: "linear-gradient(180deg, #F3E7D7 0%, #EBDEC8 50%, #E3D1BA 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-[1316px]">

        {/* Heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <h2 className="text-[28px] font-bold leading-[36px] tracking-[-0.5px] text-[#171717] md:text-[32px] md:leading-[40px]">
              Student Academic Projects
            </h2>

            <p className="mt-1 text-[14px] leading-[22px] text-[#6B5E52]">
              What our students are building, and where each idea could go next.
            </p>
          </div>

          {PROJECT_SUBMISSION_FORM_URL ? (
            <a
              href={PROJECT_SUBMISSION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-1 shrink-0 self-start rounded-full bg-[#3D2B1F] px-5 py-2 text-[13px] font-semibold text-[#FFF8EE] transition-opacity hover:opacity-85 sm:self-auto"
            >
              Submit your project →
            </a>
          ) : (
            <span className="mb-1 shrink-0 self-start rounded-full border border-dashed border-[#8F7357] px-5 py-2 text-[13px] font-medium text-[#6B5E52] sm:self-auto">
              Project submission form opening soon
            </span>
          )}
        </div>

        {/* Project cards (from the "research" tab of the placement sheet via /api/research) */}
        {status !== "ready" || projects.length === 0 ? (
          <p className="mt-8 text-center text-[14px] text-[#6B5E52]">
            {status === "loading"
              ? "Loading projects..."
              : status === "error"
                ? "Could not load projects right now."
                : "No projects listed yet. Check back soon."}
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {projects.map((project) => (
              <AcademicProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Conference publications: data still being collected */}
        <div className="mt-6 flex flex-col gap-1 rounded-[12px] border border-dashed border-[#C9B39A] bg-[rgba(255,253,249,0.6)] px-6 py-5 sm:flex-row sm:items-center sm:gap-4">
          <span className="shrink-0 text-[15px] font-bold text-[#29231E]">
            Conference Publications
          </span>
          <p className="text-[13px] leading-[20px] text-[#786E65]">
            We&apos;re collecting details of projects that have been presented or
            published at conferences. Please check back soon.
          </p>
        </div>

      </div>
    </section>
  );
}
