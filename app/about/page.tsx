import AboutHero from "@/components/pages/about/AboutHero";
import AboutHistory from "@/components/pages/about/AboutHistory";
import HodMessage from "@/components/pages/about/HodMessage";
import Faculty from "@/components/pages/about/Faculty";
import DepartmentAchievements from "@/components/pages/about/DepartmentAchievements";
import InfrastructureLabs from "@/components/pages/about/InfrastructureLabs";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutHistory />
      <HodMessage />
      <div className="bg-gradient-to-b from-[#EFE2CF] to-[#FFD29E]">
        <Faculty />
        <DepartmentAchievements />
        <InfrastructureLabs />
        
      </div>
    </>
  );
}