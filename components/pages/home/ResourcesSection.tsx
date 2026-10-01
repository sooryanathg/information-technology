"use client";

import {
  BookOpen,
  ClipboardList,
  Code2,
  FileText,
  Link2,
  MessageSquareMore,
} from "lucide-react";
import { useState } from "react";

const programs = ["All", "B.Tech", "M.Tech"];
const semesters = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];
const resources = [
  { label: "Notes", Icon: FileText },
  { label: "Code Library", Icon: Code2 },
  { label: "Lab Manual", Icon: BookOpen },
  { label: "Assignments", Icon: ClipboardList },
  { label: "Q&A", Icon: MessageSquareMore },
  { label: "Useful Links", Icon: Link2 },
];

export default function ResourcesSection() {
  const [selectedProgram, setSelectedProgram] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("S3");
  const visibleSemesters = selectedProgram === "M.Tech"
    ? semesters.slice(0, 4)
    : semesters;

  const handleProgramChange = (program: string) => {
    setSelectedProgram(program);

    if (program === "M.Tech" && Number(selectedSemester.slice(1)) > 4) {
      setSelectedSemester("S1");
    }
  };

  return (
    <section data-reveal aria-labelledby="resources-heading" className="rounded-[19px] border border-[#d4c2aa] bg-[#f0e3d0] p-4 shadow-[0_2px_5px_rgba(44,32,21,0.12)] sm:p-8">
      <h2 id="resources-heading" className="font-heading text-[1.2rem] font-bold uppercase text-[#30251c] sm:text-[2rem]">Resources</h2>

      <div className="mt-3 flex flex-wrap gap-2 border-b border-[#dbc9b0] pb-3 sm:mt-5 sm:gap-2.5 sm:pb-4">
        {programs.map((program) => (
          <button
            key={program}
            type="button"
            onClick={() => handleProgramChange(program)}
            className={`rounded-[9px] border px-3.5 py-1.5 text-[0.72rem] font-medium transition-colors sm:px-5 sm:py-2 sm:text-[0.9rem] ${selectedProgram === program ? "border-[#65472d] bg-[#65472d] text-white" : "border-[#d9c2a2] bg-transparent text-[#594430] hover:bg-[#e7d6be]"}`}
          >
            {program}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2.5">
        {visibleSemesters.map((semester) => (
          <button
            key={semester}
            type="button"
            onClick={() => setSelectedSemester(semester)}
            aria-pressed={selectedSemester === semester}
            className={`min-w-8 rounded-[3px] px-2 py-1.5 text-[0.72rem] transition-colors sm:min-w-11 sm:px-3 sm:py-2 sm:text-[0.9rem] ${selectedSemester === semester ? "bg-[#806d5d] text-white" : "bg-[#f8efe3] text-[#34281e] hover:bg-[#e6d4bb]"}`}
          >
            {semester}
          </button>
        ))}
      </div>

      <ul className="mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-4">
        {resources.map(({ label, Icon }) => (
          <li key={label}>
            <button
              type="button"
              className="flex min-h-[84px] w-full flex-col items-center justify-center gap-2 rounded-[6px] sm:min-h-[150px] sm:gap-3 border border-[#e1cdb0] bg-[#ead8be] px-2 py-3 text-center text-[#33271d] shadow-[0_2px_4px_rgba(60,43,27,0.12)] transition-colors hover:bg-[#e2ccb0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#765538]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-[3px] bg-[#bc8b57] text-[#33271d] sm:h-11 sm:w-11">
                <Icon aria-hidden="true" className="h-4 w-4 sm:h-6 sm:w-6" strokeWidth={1.8} />
              </span>
              <span className="text-[0.68rem] font-medium leading-tight sm:text-[0.95rem]">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
