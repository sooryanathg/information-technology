import HeroSection from "@/components/pages/home/HeroSection";
import StatsSection from "@/components/pages/home/StatsSection";
import AchievementsSection from "@/components/pages/home/AchievementsSection";
import UpdatesSection from "@/components/pages/home/UpdatesSection";
import PixelChecks from "@/components/transitions/PixelChecks";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      {/* The cream sections share one checked background, whose checks flip and react to the cursor. */}
      <div className="relative bg-pixel-cream pb-28 sm:pb-48">
        <PixelChecks below={[107, 85, 65]} />
        <StatsSection />
        <AchievementsSection />
      </div>
      <UpdatesSection />
    </main>
  );
}
