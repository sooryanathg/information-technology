type HeroButtonProps = {
  title: string;
  icon: React.ReactNode;
};

export default function HeroButton({ title, icon }: HeroButtonProps) {
  return (
    <button
      type="button"
      className="flex min-h-[55px] w-full items-center justify-between gap-2 rounded-[10px] border border-[#5b4c40]/30 bg-[#efeae6]/90 px-3 py-1.5 text-left shadow-[0_1px_4px_rgba(33,24,18,0.10)] transition-transform hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center text-[#3f3025]">
          {icon}
        </span>

        <span className="font-inter text-[1.05rem] font-medium text-[#3f3025] sm:text-[1rem]">
          {title}
        </span>
      </div>

      <span aria-hidden="true" className="shrink-0 text-[1.5rem] font-light leading-none text-[#3f3025]">›</span>
    </button>
  );
}