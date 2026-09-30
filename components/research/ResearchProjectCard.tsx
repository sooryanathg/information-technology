import Image from "next/image";
import { ResearchProject } from "@/data/research/researchProjects";

interface ResearchProjectCardProps {
  project: ResearchProject;
}

export default function ResearchProjectCard({
  project,
}: ResearchProjectCardProps) {
  return (
    <article
      className="
        group
        flex
        min-w-0
        flex-col
        overflow-hidden
        rounded-[8px]
        border
        border-[#D7C2AA]
        bg-[rgba(255,248,238,0.88)]
        shadow-[0_3px_7px_rgba(65,45,28,0.10)]
        backdrop-blur-[2px]
      "
    >
      {/* Image */}
      <div className="relative h-[150px] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="
            object-cover
            transition-transform
            duration-300
            group-hover:scale-[1.03]
          "
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">

        <p className="text-[9px] font-semibold uppercase leading-[13px] text-[#9A6637]">
          {project.category}
        </p>

        <h3 className="mt-1.5 text-[15px] font-bold leading-[18px] text-[#171717]">
          {project.title}
        </h3>

        <p className="mt-2.5 text-[10px] leading-[15px] text-[#625B55]">
          {project.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-[#E0D1C0] pt-3">
          <p className="text-[9px] leading-[13px] text-[#6D655E]">
            {project.team}
          </p>

          <button
            type="button"
            aria-label={`View ${project.title}`}
            className="
              flex
              h-5
              w-5
              items-center
              justify-center
              text-[13px]
              text-[#66594D]
              transition-transform
              duration-200
              group-hover:translate-x-0.5
            "
          >
            ↗
          </button>
        </div>

      </div>
    </article>
  );
}