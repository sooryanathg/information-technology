import Image from "next/image";

const headingLine = "block text-[clamp(3.5rem,9vw,6rem)] font-bold leading-none drop-shadow-[0_4px_4px_rgb(0_0_0/0.25)]";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src="/about/about-hero.svg"
        alt="Corridor of the IT department building"
        fill
        priority
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex min-h-screen flex-col px-6 pb-16 pt-20 md:px-12 lg:px-24">
        <div className="mt-24 max-w-3xl lg:mt-36">
          <p className="mb-1 text-xl font-medium uppercase tracking-[0.3em] text-white md:text-2xl">About Us</p>

          <h1 className="uppercase text-white">
            <span className={`${headingLine} mb-5`}>25 Years</span>
            <span className={`${headingLine} mb-5`}>One</span>
            <span className={`${headingLine} mb-2 bg-[linear-gradient(180deg,white_20%,var(--color-gold-soft)_100%)] bg-clip-text text-transparent`}>
              Vision
            </span>
          </h1>

          <p className="mt-12 max-w-xl text-xl text-white/90 md:mt-16 md:text-2xl">
            Inspiring innovation, advancing knowledge, and driving technological excellence since 1999.
          </p>

          <a
            href="https://www.gecskp.ac.in/IT.php"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 flex w-[235px] items-center justify-center gap-3 rounded-full bg-gold px-8 py-4 text-xl font-medium leading-none text-white transition hover:brightness-110"
          >
            explore more
            <Image src="/icons/arrow-up-right.svg" alt="" width={13} height={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
