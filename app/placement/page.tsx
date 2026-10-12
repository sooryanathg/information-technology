import Hero from '@/components/placement/Hero';
import Highlights from '@/components/placement/Highlights';
import RecruitersAndInternships from '@/components/placement/RecruitersAndInternships';
import ComingSoon from '@/components/placement/ComingSoon';
import PixelChecks from '@/components/transitions/PixelChecks';
// AlumniSection and SuccessStories are ready in components/placement; swap them back in
// for the ComingSoon placeholders below once real alumni data and testimonials exist.

export default function PlacementPage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(180deg, #FFFCF8 0%, #B88A5A 100%)' }}
    >
      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {/* 1. Placement Hero Banner */}
        <Hero />

        {/* The cream sections share one checked background, like the home page's: its checks
            ripple and react to the cursor, and blend into the alumni band as it scrolls in. */}
        <div className="relative bg-pixel-cream pb-28 sm:pb-48">
          <PixelChecks below={[61, 43, 31]} />

          {/* 2. Placement Highlights Cards */}
          <Highlights />

          {/* 3. Top Recruiters & Placement Notice Board */}
          <RecruitersAndInternships />
        </div>

        {/* 4. Alumni connection & success stories (one placeholder for now) */}
        <ComingSoon
          variant="dark"
          title="Connect With Alumni"
          description="Alumni profiles and placement success stories from our graduates are on their way."
        />
      </main>
    </div>
  );
}
