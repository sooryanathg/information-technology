import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import BootLoader from "@/app/components/BootLoader/BootLoader";
import PixelCursor from "@/app/components/PixelCursor/PixelCursor";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Department of Information Technology",
  description:
    "Empowering innovation through knowledge and technology, creating future ready engineers for a connected world",
};

// Runs before first paint: decides whether the boot loader plays this session.
// Skipped once seen in this tab session, or when the user prefers reduced motion.
const bootScript = `(function(){var d=document.documentElement;try{var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;d.dataset.boot=r||sessionStorage.getItem("it-boot-seen")?"skip":"run"}catch(e){d.dataset.boot="skip"}})()`;

// Without JavaScript nothing would ever clear the intro states.
const noScriptCss =
  ".boot-loader,.hero-pixel-canvas{display:none!important}[data-intro] .intro-item{opacity:1!important}";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{noScriptCss}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <BootLoader />
        <Navbar />
        {children}
        <Footer />
        <PixelCursor />
      </body>
    </html>
  );
}
