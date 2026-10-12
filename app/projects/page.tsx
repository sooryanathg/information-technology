import ResearchHero from "@/components/research/ResearchHero";
import AcademicProjects from "@/components/research/AcademicProjects";
import ProjectArchive from "@/components/research/ProjectArchive";

export default function ResearchPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <ResearchHero />

      <AcademicProjects />

      <ProjectArchive />
    </main>
  );
}
