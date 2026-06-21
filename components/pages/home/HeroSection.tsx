import HeroButton from "./HeroButton";
import { Eye, Shield, GraduationCap } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
    
    >
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt="Hero Background"
          className="h-full w-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--hero-soft-filter)" }}
        />

        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--hero-overlay)" }}
        />
      </div>

      <div
        className="relative z-10 grid min-h-screen items-center justify-center"
        style={{
          gridTemplateColumns:
            "var(--hero-left-column-width) var(--hero-button-column-width)",
          columnGap: "var(--hero-column-gap)",
          paddingLeft: "var(--hero-horizontal-padding)",
          paddingRight: "var(--hero-horizontal-padding)",
        }}
      >
        <div>
          <h1 className="[font-family:var(--font-poppins)] text-[52px] font-semibold leading-[50px] text-[var(--color-text-light)]">
            <span className="block">DEPARTMENT OF</span>
            <span className="block whitespace-nowrap">
              INFORMATION TECHNOLOGY
            </span>
          </h1>

          <div
            className="mt-4 h-1 w-full bg-[var(--color-divider)]"
            style={{ maxWidth: "var(--hero-divider-width)" }}
          />

          <p
            className="[font-family:var(--font-inter)] mt-6 text-[22px] font-semibold leading-[28px] text-[var(--color-text-light)]"
            style={{ maxWidth: "var(--hero-description-width)" }}
          >
            Empowering innovation through knowledge and technology,
            creating future ready engineers for a connected world
          </p>
        </div>

        <div
          className="flex shrink-0 flex-col"
          style={{ gap: "var(--hero-button-stack-gap)" }}
        >
          <HeroButton title="Department Vision" icon={<Eye size={20} />} />
          <HeroButton title="Department Mission" icon={<Shield size={20} />} />
          <HeroButton
            title="Educational Objectives"
            icon={<GraduationCap size={20} />}
          />
        </div>
      </div>
    </section>
  );
}