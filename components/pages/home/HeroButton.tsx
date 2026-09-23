type HeroButtonProps = {
  title: string;
  icon: React.ReactNode;
};

export default function HeroButton({ title, icon }: HeroButtonProps) {
  return (
    <button
      type="button"
      className="flex min-h-[62px] w-full items-center justify-between gap-4 rounded-2xl border border-[#5b4c40]/15 bg-[#eeeae5]/90 px-5 py-3 text-left shadow-[0_3px_8px_rgba(33,24,18,0.14)] transition-transform hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex w-6 shrink-0 items-center justify-center text-[#4d3b2d]">
          {icon}
        </span>

        <span className="font-inter text-base font-medium text-[#4d3b2d] sm:text-lg">
          {title}
        </span>
      </div>

      <span aria-hidden="true" className="shrink-0 text-3xl font-light leading-none text-[#4d3b2d]">›</span>
    </button>
  );
}