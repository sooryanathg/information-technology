import Hero from '@/components/placement/Hero';
import Highlights from '@/components/placement/Highlights';
import RecruitersAndInternships from '@/components/placement/RecruitersAndInternships';
import AlumniSection from '@/components/placement/AlumniSection';
import SuccessStories from '@/components/placement/SuccessStories';

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(180deg, #FFFCF8 0%, #B88A5A 100%)' }}
    >
      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {/* 1. Placement Hero Banner */}
        <Hero />

        {/* 2. Placement Highlights Cards */}
        <Highlights />

        {/* 3. Top Recruiters & Internship Notice Board */}
        <RecruitersAndInternships />

        {/* 4. Alumni Connection */}
        <AlumniSection />

        {/* 5. Placement Success Stories Testimonials */}
        <SuccessStories />
      </main>
    </div>
  );
}
