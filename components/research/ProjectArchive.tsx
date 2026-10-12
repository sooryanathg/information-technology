"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProjectBatch } from "@/types/research";

// Every word of the query must appear in the title, a member's name or the guide.
const matches = (query: string) => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return (text: string) => words.every((w) => text.includes(w));
};

export default function ProjectArchive() {
  const [projectArchive, setProjectArchive] = useState<ProjectBatch[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/project-archive")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: ProjectBatch[]) => {
        setProjectArchive(data);
        setSelected(data[0]?.batch ?? "");
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);
  const searching = query.trim() !== "";

  // While searching, look across every batch so students can see if an idea was done before.
  const visible: ProjectBatch[] = useMemo(() => {
    if (!searching) return projectArchive.filter((b) => b.batch === selected);
    const isMatch = matches(query);
    return projectArchive
      .map((b) => ({
        ...b,
        projects: b.projects.filter((p) =>
          isMatch([p.title, p.guide, ...p.members].join(" ").toLowerCase())
        ),
      }))
      .filter((b) => b.projects.length > 0);
  }, [projectArchive, searching, query, selected]);

  const matchCount = visible.reduce((n, b) => n + b.projects.length, 0);

  return (
    <section
      className="
        relative
        w-full
        px-6
        pb-12
        pt-8
        md:px-10
        lg:px-[40px]
      "
      style={{
        background:
          "linear-gradient(180deg, #E5D0B7 0%, #D9BFA0 30%, #CBAA87 65%, #C3A07A 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-[1316px]">

        {/* Heading */}
        <div className="text-center">
          <h2
            className="
              text-[30px]
              font-bold
              leading-[38px]
              tracking-[-0.4px]
              text-[#171717]
              md:text-[32px]
            "
          >
            Final Year &amp; Mini Projects
          </h2>

          <p className="mx-auto mt-1 max-w-[620px] text-[13px] leading-[19px] text-[#63574D]">
            Projects done by every batch. Planning a project? Search here first: if
            someone has worked on a similar idea, talk to that team or their guide
            and build on it.
          </p>
        </div>

        {status !== "ready" || projectArchive.length === 0 ? (
          <p className="mt-8 text-center text-[14px] text-[#493B30]">
            {status === "loading"
              ? "Loading projects..."
              : status === "error"
                ? "Could not load projects right now."
                : "No projects listed yet. Check back soon."}
          </p>
        ) : (
        <>
        {/* Search (data from the "project_archive" tab of the placement sheet via /api/project-archive) */}
        <div className="mx-auto mt-5 max-w-[520px]">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all batches: e.g. chatbot, IoT, blockchain, a name…"
            className="
              w-full
              rounded-full
              border
              border-[#8F7357]
              bg-[rgba(255,248,238,0.85)]
              px-5
              py-2.5
              text-[14px]
              text-[#29231E]
              placeholder:text-[#8A7B6D]
              focus:outline-none
              focus:ring-2
              focus:ring-[#8F7357]/40
            "
          />
        </div>

        {/* Batch filter */}
        {searching ? (
          <p className="mt-4 text-center text-[13px] text-[#493B30]">
            {matchCount === 0
              ? "No matching projects yet. Your idea looks new!"
              : `${matchCount} matching project${matchCount === 1 ? "" : "s"} across all batches`}
          </p>
        ) : (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {projectArchive.map((b) => (
              <button
                key={b.batch}
                type="button"
                onClick={() => setSelected(b.batch)}
                aria-pressed={selected === b.batch}
                className={`
                  rounded-full
                  border
                  px-4
                  py-1.5
                  text-[12px]
                  font-medium
                  transition-colors
                  duration-200
                  ${
                    selected === b.batch
                      ? "border-[#3D2B1F] bg-[#3D2B1F] text-[#FFF8EE]"
                      : "border-[#8F7357] bg-[rgba(255,248,238,0.35)] text-[#493B30] hover:bg-[rgba(255,248,238,0.6)]"
                  }
                `}
              >
                {b.batch} · {b.kind === "Mini Project" ? "Mini" : "Final Year"}
              </button>
            ))}
          </div>
        )}

        {/* Projects, grouped by batch */}
        {visible.map((b) => (
          <div key={b.batch} className="mt-6">
            <div className="flex items-baseline gap-3 border-b border-[#A88B6C]/50 pb-2">
              <h3 className="text-[17px] font-bold text-[#29231E]">{b.batch} Batch</h3>
              <span className="text-[12px] font-medium uppercase tracking-wide text-[#7A5A3A]">
                {b.kind} · {b.projects.length}
              </span>
            </div>

            <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {b.projects.map((p) => (
                <li
                  key={p.title}
                  className="
                    flex
                    flex-col
                    rounded-[8px]
                    border
                    border-[#D7C2AA]
                    bg-[rgba(255,248,238,0.88)]
                    px-4
                    py-3
                    shadow-[0_3px_7px_rgba(65,45,28,0.10)]
                  "
                >
                  <p className="text-[14px] font-bold leading-[19px] text-[#171717]">
                    {p.title}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-[17px] text-[#625B55]">
                    {p.members.join(", ")}
                  </p>
                  {p.guide && (
                    <p className="mt-auto pt-2 text-[11px] font-medium text-[#9A6637]">
                      Guide: {p.guide}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        </>
        )}

      </div>
    </section>
  );
}
