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
      className="flex min-h-[48px] w-full items-center justify-between gap-2 rounded-[10px] border border-driftwood/30 bg-linen/90 px-3 py-1.5 text-left text-cocoa shadow-[0_1px_4px_rgb(33_24_18/0.1)] transition-transform hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-h-[53px]"
    >
      <span className="flex min-w-0 items-center gap-2 sm:gap-3">
        <span className="flex size-5 shrink-0 items-center justify-center sm:size-6">{icon}</span>
        <span className="text-sm font-medium sm:text-base">{title}</span>
      </span>
      <span aria-hidden="true" className="shrink-0 text-xl font-light leading-none sm:text-2xl">
        ›
      </span>
    </button>
  );
}
