import Image from "next/image";
import { categories, type EventCategory } from "./data/dataset";
import { poppins } from "./fonts";

type Props = {
  active: EventCategory | "all";
  /** Clicking the active tile again clears the category filter. */
  onSelect: (category: EventCategory | "all") => void;
};

export default function CategoryBar({ active, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 shadow-[0_10px_30px_rgba(80,45,20,0.25)] md:grid-cols-4">
      {categories.map((c) => {
        const isActive = active === c.title;
        return (
          <button
            key={c.title}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(isActive ? "all" : c.title)}
            className={`flex flex-col items-center justify-center gap-4 py-10 text-white transition-colors focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white md:py-14 ${c.bg} ${c.hover} ${
              isActive ? "shadow-[inset_0_-5px_0_rgba(255,255,255,0.85)]" : ""
            }`}
          >
            <Image src={c.icon} alt="" width={80} height={64} className="h-16 w-auto" />
            <span className={`${poppins.className} text-2xl font-semibold md:text-[34px]`}>{c.title}</span>
          </button>
        );
      })}
    </div>
  );
}
