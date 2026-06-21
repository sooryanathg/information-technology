export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt="Hero Background"
          className="h-full w-full object-cover"
        />

        {/* Soft Light Filter */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--hero-soft-filter)" }}
        />

        {/* Dark Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--hero-overlay)" }}
        />
      </div>

      {/* Content */}
    <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-12 pb-20 lg:px-20">

  <h1 className="font-poppins max-w-[var(--hero-heading-width)] text-[64px] font-semibold leading-[61px] text-[var(--color-text-light)]">
    DEPARTMENT OF INFORMATION TECHNOLOGY
  </h1>

  <div className="mt-6 h-1 w-full max-w-[var(--hero-heading-width)] bg-[var(--color-divider)]" />

  <p className="font-inter mt-8 max-w-[var(--hero-description-width)] text-[28px] font-semibold leading-[24px] text-[var(--color-text-light)]">
    Empowering innovation through knowledge and technology,
    creating future ready engineers for a connected world
  </p>

</div>
    </section>
  );
}