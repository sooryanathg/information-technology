import Hero from '@/components/placement/Hero';
import Highlights from '@/components/placement/Highlights';
import RecruitersAndInternships from '@/components/placement/RecruitersAndInternships';
import ComingSoon, { BAND_RGB } from '@/components/placement/ComingSoon';
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
            ripple and react to the cursor, and blend into the alumni band as it scrolls in.
            The bottom padding keeps that climbing blend clear of the boards above it. */}
        <div className="relative bg-pixel-cream pb-36 sm:pb-56 lg:pb-64">
          <PixelChecks below={BAND_RGB} />

          {/* 2. Placement Highlights Cards */}
          <Highlights />

          {/* 3. Placement Notice Board & Top Recruiters */}
          <RecruitersAndInternships />
        </div>

        {/* 4. Alumni connection & success stories (one placeholder for now) */}
        <ComingSoon
          variant="band"
          title="Connect With Alumni"
          description="Alumni profiles and placement success stories from our graduates are on their way."
        />
      </main>
    </div>
  );
}
