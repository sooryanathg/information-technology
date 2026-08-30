import Hero from './Components/Pages/placement/hero';
import Highlights from './Components/Pages/placement/Highlights';
import RecruitersAndInternships from './Components/Pages/placement/RecruitersAndInternships';
import AlumniSection from './Components/Pages/placement/AlumniSection';
import SuccessStories from './Components/Pages/placement/SuccessStories';
// import Footer from './Components/Pages/placement/Footer';

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #999999 100%)' }}
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

        {/* 6. Footer */}
        {/* <Footer /> */}
      </main>
    </div>
  );
}


