import Image from "next/image";
import { Eye, GraduationCap, Shield } from "lucide-react";
import HeroButton from "./HeroButton";

const heroLinks = [
  { title: "Department Vision", icon: Eye },
  { title: "Department Mission", icon: Shield },
  { title: "Educational Objectives", icon: GraduationCap },
];

export default function HeroSection() {
  const [activeDetail, setActiveDetail] = useState<DepartmentDetail | null>(null);

  useEffect(() => {
    if (!activeDetail) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveDetail(null);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeDetail]);

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-umber">
      <Image
        src="/home/hero-bg.webp"
        alt="Department building surrounded by trees"
        fill
        priority
        className="object-cover opacity-[0.94]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-taupe/8" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/22 bg-[linear-gradient(90deg,rgb(47_41_37/0.28),rgb(47_41_37/0.16),rgb(47_41_37/0.06))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_48%,rgb(238_232_225/0.08)_0%,rgb(238_232_225/0.03)_28%,transparent_60%),radial-gradient(ellipse_at_78%_84%,rgb(226_218_204/0.04)_0%,transparent_54%),linear-gradient(0deg,rgb(232_225_214/0.025),transparent_48%),linear-gradient(90deg,rgb(232_226_219/0.05),rgb(232_226_219/0.02),transparent)]"
      />

      <div className="relative z-10 mx-auto flex w-full flex-col items-center gap-8 px-6 py-12 lg:flex-row lg:justify-between lg:gap-[2vw] lg:px-[4vw] lg:py-0">
        <div className="flex w-full flex-1 flex-col">
          <h1 className="font-heading text-[clamp(2.5rem,4.2vw,4.5rem)] font-semibold uppercase leading-[0.99] tracking-[-0.02em] text-white/75 drop-shadow-[0_3px_3px_rgb(35_29_25/0.55)]">
            <span className="block">Department of</span>
            <span className="block">Information Technology</span>
          </h1>

          <div className="mx-auto my-6 h-[3px] w-full max-w-[960px] rounded-full bg-white/80 lg:mx-0 sm:my-7" />

          <p className="max-w-[1060px] text-lg font-semibold leading-[1.2] text-white drop-shadow-[0_1px_2px_rgb(0_0_0/0.18)] md:text-[1.75rem]">
            Empowering innovation through knowledge and technology,{" "}
            <br className="hidden lg:block" />
            creating future ready engineers for a connected world
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-9 lg:mr-[3vw] lg:w-[360px]">
          {heroLinks.map(({ title, icon: Icon }) => (
            <HeroButton key={title} title={title} icon={<Icon size={23} />} />
          ))}
        </div>
      </div>

      {activeDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-5 py-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveDetail(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="department-dialog-title"
            className="relative w-full max-w-[560px] rounded-[10px] bg-[#b7885a] px-6 py-5 text-white shadow-[0_16px_50px_rgba(0,0,0,0.35)] sm:px-8 sm:py-6"
          >
            <button
              type="button"
              aria-label="Close dialog"
              onClick={() => setActiveDetail(null)}
              className="absolute right-3 top-3 rounded p-1 text-white/90 transition hover:bg-black/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X size={18} />
            </button>
            <h2
              id="department-dialog-title"
              className="mb-3 pr-7 font-inter text-base font-bold uppercase"
            >
              {departmentDetails[activeDetail].title}:
            </h2>
            <div className="font-inter text-sm leading-relaxed text-white/95">
              {departmentDetails[activeDetail].content}
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
