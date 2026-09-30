import HeroSection from "../components/pages/home/HeroSection";
import StatsSection from "../components/pages/home/StatsSection";
import AchievementsSection from "../components/pages/home/AchievementsSection";
import ResourcesSection from "../components/pages/home/ResourcesSection";
import NotificationsSection from "../components/pages/home/NotificationsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <AchievementsSection />
      <section aria-label="Department resources and notifications" className="border-t-2 border-[#a96b39] bg-[#6b5541] px-4 py-3 sm:px-6 sm:py-7">
        <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-2 md:gap-4">
          <ResourcesSection />
          <NotificationsSection />
        </div>
      </section>
    </main>
  );
}
