type HeroButtonProps = {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export default function HeroButton({ title, icon, onClick }: HeroButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[53px] w-full items-center justify-between gap-2 rounded-[10px] border border-[#5b4c40]/30 bg-[#efeae6]/90 px-3 py-1.5 text-left shadow-[0_1px_4px_rgba(33,24,18,0.10)] transition-transform hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex size-6 shrink-0 items-center justify-center">{icon}</span>
        <span className="text-[1.05rem] font-medium sm:text-base">{title}</span>
      </span>
      <span aria-hidden="true" className="shrink-0 text-2xl font-light leading-none">
        ›
      </span>
    </button>
  );
}
