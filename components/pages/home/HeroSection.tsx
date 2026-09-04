import HeroButton from "./HeroButton";
import { Eye, Shield, GraduationCap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden">
      <img src="/hero-bg.webp" alt="Hero Background" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_50%),linear-gradient(90deg,rgba(18,25,31,0.35),rgba(18,25,31,0.25),rgba(18,25,31,0.10))]" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-18 px-6 lg:flex-row lg:justify-between lg:px-16">
        
        {/* Left Content: Using 'flex-1' to take available space */}
        <div className="flex w-full flex-1 flex-col">
          <h1 className="font-poppins font-semibold text-[32px] leading-[40px] text-white md:text-[52px] md:leading-[55px]">
            <span className="block">DEPARTMENT OF</span>
            <span className="block whitespace-nowrap">INFORMATION TECHNOLOGY</span>
          </h1>
          
          <div className="my-6 h-[3px] w-full max-w-[800px] rounded-full bg-white" />
          
          <p className="font-inter text-[18px] font-semibold leading-[28px] text-white md:text-[22px]">
            Empowering innovation through knowledge and technology,
            <br className="hidden md:block" />
            creating future ready engineers for a connected world
          </p>
        </div>

        {/* Right Buttons: 'shrink-0' keeps them from squishing on wide screens */}
        <div className="flex w-full shrink-0 flex-col gap-9 lg:w-[300px]">
          <HeroButton title="Department Vision" icon={<Eye size={20} />} />
          <HeroButton title="Department Mission" icon={<Shield size={20} />} />
          <HeroButton title="Educational Objectives" icon={<GraduationCap size={20} />} />
        </div>
      </div>
    </section>
  );
}