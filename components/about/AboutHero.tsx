import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src="/about/about-hero.svg"
        alt="About Hero Background"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex h-screen flex-col px-24 pt-20">
              <div className="mt-36 max-w-3xl">

                <p className="mb-1 text-2xl font-medium uppercase tracking-[0.3em] text-white">
                  ABOUT US
                </p>

                <h1 className="leading-none">
                  <span className="block mb-5 text-[96px] leading-none font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-white">
                    25 YEARS
                  </span>

                  <span className="block mb-5 text-[96px] leading-none font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] text-white">
                    ONE
                  </span>

                  <span className="block mb-2 text-[96px] leading-none font-bold bg-[linear-gradient(180deg,_#FFFFFF_20%,_#D79B47_100%)] bg-clip-text text-transparent drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    VISION
                  </span>        
                </h1>

                <p className="mt-16 max-w-xl text-2xl text-white/90">
                Inspiring innovation, advancing knowledge, and driving technological excellence since 1999.
                </p>

                <button className="mt-10 flex w-[235px] items-center justify-center gap-3 rounded-[40px] bg-[#CB9437] px-8 py-4 text-[24px] font-medium leading-none text-white transition hover:brightness-110">
                explore more
                <Image
                    src="/Icon.svg"
                    alt="Arrow"
                    width={13}
                    height={13}
                />
                </button>
              </div>
            </div>
    </section>
  );
}