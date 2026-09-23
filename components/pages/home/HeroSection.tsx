import HeroButton from "./HeroButton";
import { Eye, Shield, GraduationCap } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#6d5b4d]">
      <Image
        src="/hero-bg.webp"
        alt="Department building surrounded by trees"
        fill
        priority
        className="absolute inset-0 h-full w-full object-cover opacity-[0.94]"
      />
      <div className="absolute inset-0 bg-[#8a7768]/8" />
      <div className="absolute inset-0 bg-black/18" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(47,41,37,0.28),rgba(47,41,37,0.16),rgba(47,41,37,0.06))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(232,226,219,0.05),rgba(232,226,219,0.02),rgba(232,226,219,0))]" />

      <div className="relative z-10 mx-auto flex w-full flex-col items-center gap-12 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-[5vw] lg:px-[5vw] lg:py-0">
        <div className="flex w-full flex-1 flex-col">
          <h1 className="font-poppins text-[clamp(2.5rem,4.2vw,4.5rem)] font-semibold leading-[0.99] tracking-[-0.02em] text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.22)]">
            <span className="block">DEPARTMENT OF</span>
            <span className="block">INFORMATION TECHNOLOGY</span>
          </h1>

          <div className="my-7 h-[3px] w-full max-w-[960px] rounded-full bg-white/80" />

          <p className="max-w-[1060px] font-inter text-[1.125rem] font-semibold leading-[1.2] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)] md:text-[1.75rem]">
            Empowering innovation through knowledge and technology,
            <br className="hidden md:block" />
            creating future ready engineers for a connected world
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-10 lg:w-[25vw] lg:max-w-[440px]">
          <HeroButton title="Department Vision" icon={<Eye size={20} />} />
          <HeroButton title="Department Mission" icon={<Shield size={20} />} />
          <HeroButton title="Educational Objectives" icon={<GraduationCap size={20} />} />
        </div>
      </div>
    </section>
  );
}