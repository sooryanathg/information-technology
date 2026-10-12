import type { AcademicProject } from "@/types/research";

interface AcademicProjectCardProps {
  project: AcademicProject;
}

// Short label for a project link, e.g. "GitHub" or "drive.google.com".
const linkLabel = (url: string) => {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return host === "github.com" ? "GitHub" : host;
  } catch {
    return "Link";
  }
};

export default function AcademicProjectCard({
  project,
}: AcademicProjectCardProps) {
  // "Sustainability / Environmental Education" -> separate tags
  const domains = project.domain.split("/").map((d) => d.trim()).filter(Boolean);

  return (
    <article
      className="
        flex
        w-full
        flex-col
        rounded-[12px]
        border
        border-[#EADBCE]
        bg-[#FFFDF9]
        px-6
        py-5
        shadow-[0_2px_8px_rgba(0,0,0,0.04)]
      "
    >
      {/* Domain tags */}
      {domains.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {domains.map((d) => (
            <span
              key={d}
              className="rounded-full bg-[#F3ECE4] px-3 py-1 text-[12px] font-medium text-[#6B5E52]"
            >
              {d}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <h3 className="mt-3 text-[18px] font-bold leading-[24px] text-[#1A1816]">
        {project.title}
      </h3>

      {/* Overview */}
      {project.overview && (
        <p className="mt-2 text-[13px] leading-[20px] text-[#786E65]">
          {project.overview}
        </p>
      )}

      {(project.stack || project.stage) && (
        <dl className="mt-3 space-y-1 text-[13px] leading-[19px]">
          {project.stack && (
            <div>
              <dt className="inline font-semibold text-[#29231E]">Tech stack: </dt>
              <dd className="inline text-[#6B5E52]">{project.stack}</dd>
            </div>
          )}
          {project.stage && (
            <div>
              <dt className="inline font-semibold text-[#29231E]">Stage: </dt>
              <dd className="inline text-[#6B5E52]">{project.stage}</dd>
            </div>
          )}
        </dl>
      )}

      {/* Research & opportunity potential */}
      {project.potential && (
        <details className="group mt-3 rounded-[8px] bg-[#FAF4EC] px-4 py-2.5 text-[13px]">
          <summary className="cursor-pointer list-none font-semibold text-[#4A3A2D] [&::-webkit-details-marker]:hidden">
            <span className="inline-block transition-transform group-open:rotate-90">›</span>{" "}
            Research &amp; opportunity potential
          </summary>
          <p className="mt-2 leading-[20px] text-[#786E65]">{project.potential}</p>
        </details>
      )}

      {/* Team, mentor and links */}
      <div className="mt-auto flex flex-col gap-2 border-t border-[#F0E6DC] pt-3 text-[13px] sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-0.5 text-[#6B5E52]">
          {project.team && (
            <p>
              <span className="font-semibold text-[#29231E]">Team:</span> {project.team}
            </p>
          )}
          {project.mentor && (
            <p>
              <span className="font-semibold text-[#29231E]">Mentor:</span> {project.mentor}
            </p>
          )}
        </div>

        {project.links.length > 0 && (
          <div className="flex shrink-0 flex-wrap gap-3">
            {project.links.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#1A1816] transition-opacity hover:opacity-70"
              >
                {linkLabel(url)} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
