export default function HeroSection() {
  return (
    <section className="min-h-screen w-full bg-slate-900 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 lg:px-12">
        <h1 className="max-w-[894px] text-[64px] font-semibold leading-[61px] text-[#F8F4F3]">
          DEPARTMENT OF INFORMATION TECHNOLOGY
        </h1>

        <div className="mt-6 h-1 w-full max-w-[894px] bg-[#E0EDFF]" />

        <p className="mt-8 max-w-[894px] text-[28px] font-semibold leading-[24px] text-[#F8F4F3]">
          Empowering innovation through knowledge and technology,
          creating future ready engineers for a connected world
        </p>
      </div>
    </section>
  );
}