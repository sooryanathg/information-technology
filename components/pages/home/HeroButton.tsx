type HeroButtonProps = {
  title: string;
  icon: React.ReactNode;
};

export default function HeroButton({ title, icon }: HeroButtonProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-xl border border-[#4F5D75]/20 bg-[#E2DDD7] px-4 py-3"
    >
      <div className="flex w-full items-center gap-3">
        {/* Fixed width 'w-8' forces icon alignment */}
        <span className="flex w-8 shrink-0 items-center justify-center text-[#1E3A5F]">
          {icon}
        </span>

        <span className="whitespace-nowrap font-inter text-[15px] font-medium text-[#1E3A5F]">
          {title}
        </span>
      </div>

      <span className="shrink-0 text-2xl leading-none text-[#1E3A5F]">
        ›
      </span>
    </button>
  );
}