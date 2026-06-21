type HeroButtonProps = {
  title: string;
  icon: React.ReactNode;
};

export default function HeroButton({ title, icon }: HeroButtonProps) {
  return (
    <button
      className="flex items-center justify-between"
      style={{
        width: "var(--hero-button-width)",
        height: "var(--hero-button-height)",
        borderRadius: "var(--hero-button-radius)",
        paddingLeft: "var(--hero-button-padding-x)",
        paddingRight: "var(--hero-button-padding-x)",
        backgroundColor: "var(--hero-button-bg)",
        border: "1px solid var(--hero-button-border)",
      }}
    >
      <div
        className="flex items-center"
        style={{ gap: "var(--hero-button-gap)" }}
      >
        <span
          className="flex items-center justify-center"
          style={{
            width: "var(--hero-icon-size)",
            height: "var(--hero-icon-size)",
            color: "var(--hero-button-text)",
          }}
        >
          {icon}
        </span>

        <span
          className="[font-family:var(--font-inter)] text-[16px] font-medium leading-[24px]"
          style={{ color: "var(--hero-button-text)" }}
        >
          {title}
        </span>
      </div>

      <span
        className="text-[20px] leading-none"
        style={{ color: "var(--hero-button-text)" }}
      >
        ›
      </span>
    </button>
  );
}