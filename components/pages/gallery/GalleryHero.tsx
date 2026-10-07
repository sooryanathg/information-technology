import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export default function GalleryHeroSection() {
  return (
    <section
      className={`${poppins.className} flex min-h-screen items-center justify-center bg-[#2B1C10] px-4 text-center`}
    >
      <div>
        <p className="flex items-center justify-center gap-1 text-[18px] font-normal text-white">
          Our Gallery
          <Image src="/icons/arrow.svg" alt="Arrow" width={13} height={13} />
        </p>

        <h1 className="mx-auto mt-10 max-w-[330px] text-[40px] font-semibold leading-normal tracking-normal text-white sm:max-w-[791px] sm:text-[64px]">
          Explore The Gallery And
          <br className="hidden sm:inline" /> See The Future Unfold
        </h1>
      </div>
    </section>
  );
}