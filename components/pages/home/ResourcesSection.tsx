"use client";

import {
  BookOpen,
  Code2,
  FileQuestion,
  FileText,
  Link2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { notesLinks } from "./Resources/NotesLinks";
import { pyqLinks } from "./Resources/PyqLinks";

const programs = ["All", "B.Tech", "M.Tech"];

const btechSchemes = ["2019", "2024"];

const semesters = [
  "S1",
  "S2",
  "S3",
  "S4",
  "S5",
  "S6",
  "S7",
  "S8",
];

const resources = [
  { label: "Notes", Icon: FileText },
  { label: "Code Library", Icon: Code2 },
  { label: "Lab Manual", Icon: BookOpen },
  { label: "PYQ", Icon: FileQuestion },
  { label: "Useful Links", Icon: Link2 },
];

export default function ResourcesSection() {
  const [selectedProgram, setSelectedProgram] =
    useState("All");

  const [selectedScheme, setSelectedScheme] =
    useState("2024");

  const [selectedSemester, setSelectedSemester] =
    useState("S3");

  // Popup message
  const [notice, setNotice] = useState<string | null>(
    null
  );

  // Popup timer
  const noticeTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  // --------------------------------------------------
  // SHOW POPUP
  // --------------------------------------------------

  const showNotice = (message: string) => {
    setNotice(message);

    if (noticeTimer.current) {
      clearTimeout(noticeTimer.current);
    }

    noticeTimer.current = setTimeout(() => {
      setNotice(null);
    }, 3000);
  };

  // --------------------------------------------------
  // CLEANUP TIMER
  // --------------------------------------------------

  useEffect(() => {
    return () => {
      if (noticeTimer.current) {
        clearTimeout(noticeTimer.current);
      }
    };
  }, []);

  // --------------------------------------------------
  // SEMESTERS
  // --------------------------------------------------

  const visibleSemesters =
    selectedProgram === "M.Tech"
      ? semesters.slice(0, 4)
      : semesters;

  // --------------------------------------------------
  // PROGRAM CHANGE
  // --------------------------------------------------

  const handleProgramChange = (program: string) => {
    setSelectedProgram(program);

    // B.Tech → default scheme = 2024
    if (program === "B.Tech") {
      setSelectedScheme("2024");
    }

    // M.Tech only has S1-S4
    if (
      program === "M.Tech" &&
      Number(selectedSemester.slice(1)) > 4
    ) {
      setSelectedSemester("S1");
    }
  };

  // --------------------------------------------------
  // RESOURCE CLICK
  // --------------------------------------------------

  const handleResourceClick = (label: string) => {
    // ==================================================
    // OTHER RESOURCES
    // ==================================================

    if (
      label === "Code Library" ||
      label === "Lab Manual" ||
      label === "Useful Links"
    ) {
      showNotice(
        `${label} is currently unavailable.`
      );

      return;
    }

    let link: string | null | undefined;

    // ==================================================
    // NOTES
    // ==================================================

    if (label === "Notes") {
      // B.Tech Notes
      if (selectedProgram === "B.Tech") {
        link =
          notesLinks.BTech[
            selectedScheme as "2019" | "2024"
          ][
            selectedSemester as keyof (typeof notesLinks.BTech)["2019"]
          ];
      }

      // M.Tech Notes
      if (selectedProgram === "M.Tech") {
        link =
          notesLinks.MTech[
            selectedSemester as keyof typeof notesLinks.MTech
          ];
      }
    }

    // ==================================================
    // PYQ
    // ==================================================

    if (label === "PYQ") {
      // B.Tech PYQ
      if (selectedProgram === "B.Tech") {
        link =
          pyqLinks.BTech[
            selectedScheme as "2019" | "2024"
          ][
            selectedSemester as keyof (typeof pyqLinks.BTech)["2019"]
          ];
      }

      // M.Tech PYQ
      if (selectedProgram === "M.Tech") {
        link =
          pyqLinks.MTech[
            selectedSemester as keyof typeof pyqLinks.MTech
          ];
      }
    }

    // ==================================================
    // ALL
    // ==================================================

    if (selectedProgram === "All") {
      showNotice(
        `${label} is available after selecting B.Tech or M.Tech.`
      );

      return;
    }

    // ==================================================
    // LINK NOT AVAILABLE
    // ==================================================

    if (!link) {
      const programText =
        selectedProgram === "B.Tech"
          ? `B.Tech — ${selectedScheme}`
          : "M.Tech";

      showNotice(
        `${label} for ${programText} — ${selectedSemester} is currently unavailable.`
      );

      return;
    }

    // ==================================================
    // OPEN GOOGLE DRIVE
    // ==================================================

    window.open(
      link,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      {/* ==================================================
          POPUP / TOAST
      ================================================== */}

      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2"
        >
          <div className="pointer-events-auto flex items-start gap-3 rounded-[12px] border border-[#b99b76] bg-[#f0e3d0] px-4 py-3 text-[#30251c] shadow-[0_8px_25px_rgba(44,32,21,0.22)]">
            {/* Icon */}

            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#bc8b57] text-[#30251c]">
              <FileText
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={2}
              />
            </span>

            {/* Message */}

            <div className="min-w-0 flex-1">
              <p className="text-[0.7rem] font-semibold">
                Resource unavailable
              </p>

              <p className="mt-0.5 text-[0.62rem] leading-4 text-[#594430]">
                {notice}
              </p>
            </div>

            {/* Close button */}

            <button
              type="button"
              onClick={() => setNotice(null)}
              aria-label="Close notification"
              className="mt-0.5 shrink-0 rounded-full p-1 text-[#806d5d] transition-colors hover:bg-[#e2ccb0] hover:text-[#30251c]"
            >
              <X
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />
            </button>
          </div>
        </div>
      )}

      {/* ==================================================
          RESOURCES SECTION
      ================================================== */}

      <section
        aria-labelledby="resources-heading"
        className="rounded-[19px] border border-[#d4c2aa] bg-[#f0e3d0] p-4 shadow-[0_2px_5px_rgba(44,32,21,0.12)] sm:p-5"
      >
        {/* ==================================================
            TITLE
        ================================================== */}

        <h2
          id="resources-heading"
          className="font-heading text-[1.35rem] font-bold uppercase text-[#30251c] sm:text-[1.5rem]"
        >
          Resources
        </h2>

        {/* ==================================================
            PROGRAMS
        ================================================== */}

        <div className="mt-4 flex flex-wrap gap-2 border-b border-[#dbc9b0] pb-3">
          {programs.map((program) => (
            <button
              key={program}
              type="button"
              onClick={() =>
                handleProgramChange(program)
              }
              className={`rounded-[9px] border px-3 py-1.5 text-[0.6rem] font-medium transition-colors sm:px-4 sm:text-[0.65rem] ${
                selectedProgram === program
                  ? "border-[#65472d] bg-[#65472d] text-white"
                  : "border-[#d9c2a2] bg-transparent text-[#594430] hover:bg-[#e7d6be]"
              }`}
            >
              {program}
            </button>
          ))}
        </div>

        {/* ==================================================
            B.TECH SCHEMES
        ================================================== */}

        {selectedProgram === "B.Tech" && (
          <div className="mt-3 flex flex-wrap gap-2">
            {btechSchemes.map((scheme) => (
              <button
                key={scheme}
                type="button"
                onClick={() =>
                  setSelectedScheme(scheme)
                }
                aria-pressed={
                  selectedScheme === scheme
                }
                className={`rounded-[6px] border px-4 py-1.5 text-[0.6rem] font-medium transition-colors sm:text-[0.65rem] ${
                  selectedScheme === scheme
                    ? "border-[#806d5d] bg-[#806d5d] text-white"
                    : "border-[#d9c2a2] bg-[#f8efe3] text-[#34281e] hover:bg-[#e6d4bb]"
                }`}
              >
                {scheme}
              </button>
            ))}
          </div>
        )}

        {/* ==================================================
            SEMESTERS
        ================================================== */}

        <div className="mt-3 flex flex-wrap gap-2">
          {visibleSemesters.map((semester) => (
            <button
              key={semester}
              type="button"
              onClick={() =>
                setSelectedSemester(semester)
              }
              aria-pressed={
                selectedSemester === semester
              }
              className={`min-w-8 rounded-[3px] px-2 py-1.5 text-[0.6rem] transition-colors sm:text-[0.65rem] ${
                selectedSemester === semester
                  ? "bg-[#806d5d] text-white"
                  : "bg-[#f8efe3] text-[#34281e] hover:bg-[#e6d4bb]"
              }`}
            >
              {semester}
            </button>
          ))}
        </div>

        {/* ==================================================
            RESOURCE CARDS
        ================================================== */}

        <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {resources.map(({ label, Icon }) => (
            <li key={label}>
              <button
                type="button"
                onClick={() =>
                  handleResourceClick(label)
                }
                className="flex min-h-[102px] w-full flex-col items-center justify-center gap-2 rounded-[6px] border border-[#e1cdb0] bg-[#ead8be] px-2 py-3 text-center text-[#33271d] shadow-[0_2px_4px_rgba(60,43,27,0.12)] transition-colors hover:bg-[#e2ccb0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#765538]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-[3px] bg-[#bc8b57] text-[#33271d]">
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </span>

                <span className="text-[0.65rem] font-medium">
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}