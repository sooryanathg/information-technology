import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Placement Statistics | Department of Information Technology",
  description: "Placement statistics, highlights, recruiters, alumni connections and success stories for Department of IT, GEC Sreekrishnapuram.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased scroll-smooth`}
    >
      <body 
        className="min-h-full flex flex-col font-sans text-[#3D2B1F] selection:bg-[#C89B3C] selection:text-white"
        style={{ background: 'linear-gradient(180deg, #FFFCF8 0%, #B88A5A 100%)' }}
      >
        {children}
      </body>
    </html>
  );
}

