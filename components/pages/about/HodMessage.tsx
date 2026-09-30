import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export default function HodMessage() {
  return (
    <section className={`${poppins.className} bg-[#CBAE8D]`}>
      <div className="mx-auto max-w-[1800px] px-4 py-10 sm:px-6 md:px-8 lg:px-12 lg:py-12 xl:px-16">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
          {/* HOD photo + name */}
          <div className="flex shrink-0 flex-col items-center text-center">
            <div className="relative h-[200px] w-[175px] overflow-hidden rounded-[64px] bg-[#EEC578] lg:h-[257px] lg:w-[225px] lg:rounded-[85px]">
              <Image
                src="/about/hod.jpeg"
                alt="Dr. Safeer Babu T, Head of Department"
                fill
                sizes="225px"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-base font-bold text-[#1E1B18]">
              Dr. Safeer Babu T
            </p>
            <p className="text-[15px] leading-snug text-[#1E1B18]">
              Head of Department
              <br />
              Information Technology
            </p>
          </div>

          {/* Heading + message, heading now sits above the message column only */}
          <div className="w-full">
            <h2 className="text-center text-3xl font-semibold uppercase leading-tight text-[#2A2522] sm:text-4xl xl:text-[44px]">
              HOD Message
            </h2>
            <span className="mx-auto mt-2 block h-[3px] w-[60px] rounded-full bg-[#C9963A]" />

            <div className="mt-6 space-y-6 text-justify text-base italic leading-normal text-[#1E1B18] md:text-center">
              <p>
                &quot;It gives me immense pleasure to lead the Department of
                Information Technology at Government Engineering College,
                Sreekrishnapuram. Our department strives for excellence in
                education and research while fostering innovation and
                entrepreneurship among our students.
              </p>
              <p>
                We are committed to providing quality technical education and
                producing competent professionals who can meet the evolving
                needs of the industry. Our curriculum is regularly updated to
                incorporate the latest technological advancements, and our
                faculty members are dedicated to nurturing the talents of our
                students.
              </p>
              <p>
                The department maintains strong industry connections and
                promotes research activities, ensuring our students are
                well-prepared for their professional careers. We encourage our
                students to participate in various technical events,
                workshops, and internships to enhance their practical
                knowledge and skills.
              </p>
              <p>
                I welcome you to explore the opportunities our department
                offers and join us in our journey towards academic excellence
                and technological innovation.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}