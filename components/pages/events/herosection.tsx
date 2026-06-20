import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-dvh w-full overflow-hidden">
      <Image
        src="/events/heroevents.webp"
        alt="IT Department building"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/10" />


      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-8">

          <p className="max-w-7xl text-left text-[64px] font-semibold bg-gradient-to-b from-[#BABABA] to-[#FFFFFF] bg-clip-text text-transparent">
            Explore, learn and grow exciting events
            organised by the department of IT
          </p>

          <div className="flex gap-40 h-14 ">
            <button className=" rounded-[15px] border-3 border-white bg-white px-15 py-3 text-[24px] font-semibold text-blue-900 transition-colors hover:bg-gray-200 text-center -mt-2">
              Explore Events
            </button>

            <button className="rounded-[15px] border-3 border-[#133D65] bg-transparent px-15 py-3 text-[24px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 text-center -mt-2">
              Explore Events
            </button>
          </div>

        </div>
      </div>

    </section>

  );
}