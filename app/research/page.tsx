import ResearchHero from "@/components/research/ResearchHero";
import PublishedWorks from "@/components/research/PublishedWorks";
import ResearchProjects from "@/components/research/ResearchProjects";

export default function ResearchPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <ResearchHero />

      <PublishedWorks />

      <ResearchProjects />
    </main>
  );
}