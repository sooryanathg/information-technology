import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function ResearchHero() {
  return (
    <section
      className={`
        ${poppins.className}
        relative
        w-full
        max-w-[1512px]
        h-[762px]
        mx-auto
        overflow-hidden
        text-white
      `}
    >

      {/* =========================================================
          BACKGROUND
          ========================================================= */}

      <div className="absolute inset-0 overflow-hidden">

        {/* -------------------------------------------------------
            BASE IMAGE
            ------------------------------------------------------- */}

        <Image
          src="/research/research-hero-page.png"
          alt="IT Department Research Lab"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />


        {/* =======================================================
            VERY LIGHT BLUR — UPPER AREA

            The upper part should remain comparatively clear.
            ======================================================= */}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backdropFilter: "blur(0.5px)",
            WebkitBackdropFilter: "blur(0.5px)",

            maskImage:
              "linear-gradient(to bottom, black 0%, black 42%, transparent 62%)",

            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 42%, transparent 62%)",
          }}
        />


        {/* =======================================================
            STRONGER BLUR — LOWER AREA

            Blur gradually becomes stronger toward the bottom.
            ======================================================= */}

        <div
          className="absolute inset-[-8px] pointer-events-none"
          style={{
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            background: "rgba(0, 0, 0, 0.30)",
            maskImage:
              "linear-gradient(to bottom, transparent 38%, rgba(0,0,0,0.15) 48%, rgba(0,0,0,0.55) 65%, black 82%, black 100%)",

            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 38%, rgba(0,0,0,0.15) 48%, rgba(0,0,0,0.55) 65%, black 82%, black 100%)",
          }}
        />


        {/* =======================================================
            FIGMA GRADIENT 1
            #1E0E06
            ======================================================= */}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(
                180deg,
                rgba(30, 14, 6, 0.80) 0%,
                rgba(30, 14, 6, 0.72) 25%,
                rgba(30, 14, 6, 0.50) 50%,
                rgba(30, 14, 6, 0.12) 75%,
                rgba(30, 14, 6, 0.00) 100%
              )
            `,
          }}
        />


        {/* =======================================================
            FIGMA GRADIENT 2
            #2A1D17
            ======================================================= */}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(
                180deg,
                rgba(42, 29, 23, 0.30) 0%,
                rgba(42, 29, 23, 0.00) 25%,
                rgba(42, 29, 23, 0.00) 50%,
                rgba(42, 29, 23, 0.00) 75%,
                rgba(42, 29, 23, 0.55) 100%
              )
            `,
          }}
        />

      </div>


      {/* =========================================================
          HERO CONTENT
          ========================================================= */}

      <div className="absolute inset-0 z-10">


        {/* =======================================================
            MAIN HEADING

            Position adjusted for the 762px hero.

            We are NOT using Figma's original Y=551 directly,
            because that coordinate belonged to the original
            Figma composition.
            ======================================================= */}

        <h1
          className="
            absolute
            top-[400px]
            left-1/2
            -translate-x-1/2
            w-[calc(100%-98px)]
            text-center
            uppercase
            font-semibold
            whitespace-nowrap
          "
          style={{
            fontFamily: "Poppins",
            fontWeight: 600,

            fontSize: "clamp(32px, 5.29vw, 80px)",

            lineHeight: "100px",
            letterSpacing: "1px",

            backgroundImage: `
              linear-gradient(
                180deg,
                #FFF6E8 0%,
                #F4E7D3 50%,
                #C78A45 100%
              )
            `,

            WebkitBackgroundClip: "text",
            backgroundClip: "text",

            WebkitTextFillColor: "transparent",
            color: "transparent",

            filter:
              "drop-shadow(0px 3px 5px rgba(0,0,0,0.30))",
          }}
        >
          INNOVATE.INVESTIGATE.IMPACT
        </h1>


        {/* =======================================================
            SUBTITLE

            Moved upward and slightly narrowed so that the
            ending sits more naturally around the third monitor
            in the background composition.
            ======================================================= */}

        <p
  className="
    absolute
    top-[525px]
    left-1/2
    -translate-x-1/2
    w-[1025px]
    max-w-[calc(100%-80px)]
    text-center
    whitespace-nowrap
  "
          style={{
            fontFamily: "Poppins",
            fontWeight: 600,

            fontSize: "clamp(16px, 2.38vw, 36px)",

            lineHeight: "33.8px",
            letterSpacing: "0px",

            color: "#D9C3A2",

            filter:
              "drop-shadow(0px 2px 4px rgba(0,0,0,0.35))",
          }}
        >
          Advancing Knowledge. Building a Better Tomorrow.
        </p>

      </div>


      {/* =========================================================
          MOBILE VERSION
          ========================================================= */}

      <div
        className="
          absolute
          inset-0
          z-20
          flex
          flex-col
          items-center
          justify-center
          px-5
          text-center
          lg:hidden
        "
      >

        <h1
          className="
            w-full
            font-semibold
            uppercase
          "
          style={{
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: "clamp(28px, 8vw, 55px)",
            lineHeight: "1.15",
            letterSpacing: "0.5px",

            backgroundImage: `
              linear-gradient(
                180deg,
                #FFF6E8 0%,
                #F4E7D3 50%,
                #C78A45 100%
              )
            `,

            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",

            filter:
              "drop-shadow(0px 3px 5px rgba(0,0,0,0.35))",
          }}
        >
          INNOVATE.INVESTIGATE.IMPACT
        </h1>

        <p
          className="mt-5 max-w-[90%]"
          style={{
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: "clamp(14px, 3.5vw, 24px)",
            lineHeight: "1.3",
            color: "#D9C3A2",
          }}
        >
          Advancing Knowledge. Building a Better Tomorrow.
        </p>

      </div>

    </section>
  );
}