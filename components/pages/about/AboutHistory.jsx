import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export default function AboutHistory() {
  return (
    <section className={`${poppins.className} bg-[#EFE4D3]`}>
      <div className="mx-auto grid max-w-[1800px] items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-10 md:px-8 lg:gap-12 lg:px-12 lg:py-14 xl:px-16">
        <div>
          <h2 className="text-center text-3xl font-semibold uppercase leading-tight text-[#2A2522] sm:text-4xl xl:text-[44px]">
            History of Department
          </h2>
          <span className="mx-auto mt-2 block h-[3px] w-[60px] rounded-full bg-[#C9963A]" />

          <p className="mt-4 text-justify md:text-center text-base leading-relaxed text-[#1E1B18]">
            The Department of Information Technology was established in 1999
            with the introduction of the Bachelor of Technology (B.Tech) in
            Information Technology programme, aiming to meet the growing demand
            for skilled IT professionals in the digital era. With the
            establishment of the APJ Abdul Kalam Technological University (KTU)
            in 2015, the B.Tech programme became affiliated with the university
            and has continued to follow its academic framework and curriculum
            since then. As technology continued to evolve, the department
            expanded its academic offerings by launching the Master of
            Technology (M.Tech) in Artificial Intelligence and Data Science
            (AIDS) programme in 2024, with an approved intake of 18 students.
            This marked a significant milestone in the department&apos;s
            commitment to advanced education and research in emerging
            technologies. Over the years, the department has consistently
            worked towards academic excellence by promoting quality teaching,
            practical learning, research activities, and industry interaction.
            It continues to prepare students to become competent professionals
            capable of addressing real-world technological challenges and
            contributing to the advancement of society.
          </p>
        </div>

        <div className="relative aspect-[7/4] overflow-hidden rounded-3xl shadow-md">
          <Image
            src="/about/history.jpg"
            alt="Department of Information Technology corridor"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}