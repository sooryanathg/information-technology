type HeroButtonProps = {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  /** Whether what this button shows is currently on screen. */
  active?: boolean;
};

export default function HeroButton({ title, icon, onClick, active = false }: HeroButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      // A square with the icon over the title on phones, a row from sm up.
      className={`pixel-glitch flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-[10px] border px-1.5 py-2 text-center text-cocoa shadow-[0_1px_4px_rgb(33_24_18/0.1)] transition-transform hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:aspect-auto sm:min-h-[53px] sm:flex-row sm:justify-between sm:px-3 sm:py-1.5 sm:text-left ${
        active ? "border-gold bg-white" : "border-driftwood/30 bg-linen/90"
      }`}
    >
      <span className="flex min-w-0 flex-col items-center gap-1.5 sm:flex-row sm:gap-3">
        <span className="flex size-6 shrink-0 items-center justify-center">{icon}</span>
        <span className="text-[0.74rem] font-medium leading-tight sm:text-base sm:leading-normal">{title}</span>
      </span>
      <span aria-hidden="true" className="hidden shrink-0 text-2xl font-light leading-none sm:block">
        ›
      </span>
    </button>
  );
}
