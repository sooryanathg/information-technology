import { researchProjects } from "@/data/research/researchProjects";
import ResearchProjectCard from "./ResearchProjectCard";

export default function ResearchProjects() {
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
            Final Year &amp; Capstone Projects
          </h2>

          <p className="mt-1 text-[13px] leading-[19px] text-[#63574D]">
            Showcasing the practical application of theoretical knowledge by
            our graduating cohort.
          </p>
        </div>

        {/* Four project cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {researchProjects.map((project) => (
            <ResearchProjectCard
              key={project.title}
              project={project}
            />
          ))}
        </div>

        {/* More projects */}
        <div className="mt-7 flex justify-center">
          <button
            type="button"
            className="
              rounded-full
              border
              border-[#8F7357]
              bg-[rgba(255,248,238,0.35)]
              px-5
              py-2
              text-[12px]
              font-medium
              text-[#493B30]
              backdrop-blur-[2px]
              transition-all
              duration-200
              hover:bg-[rgba(255,248,238,0.6)]
            "
          >
            More Projects →
          </button>
        </div>

      </div>
    </section>
  );
}