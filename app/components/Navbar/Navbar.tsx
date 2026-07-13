"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navigationLinks } from "../../data/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="
        relative
        h-[77px]
        bg-transparent
        shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
      "
    >
      <div className="h-full flex items-center px-4 md:px-8 lg:px-[51px]">

        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo/dept-logo.svg"
            alt="Department of IT Logo"
            width={47}
            height={47}
            priority
          />

          <h1
            className="
              text-white
              text-[24px]
              font-semibold
              tracking-[-0.6px]
            "
          >
            Dept. of IT
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="ml-auto hidden md:flex items-center gap-2 lg:gap-[20px]">
          {navigationLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className={`
                min-w-[90px]
                lg:w-[124px]
                h-[36px]
                rounded-[10px]
                flex
                items-center
                justify-center
                text-white
                text-[14px]
                font-semibold
                tracking-[0.35px]
                transition-all
                ${
                  index === 0
                    ? "bg-[rgba(217,217,217,0.40)]"
                    : "bg-[rgba(217,217,217,0.05)]"
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="ml-auto md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <Image
  src="/icons/hamburger.svg"
  alt="Menu"
  width={69}
  height={69}
  priority
/>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="
            absolute
            right-4
            top-[90px]
            w-[169px]
            rounded-[25px]
            bg-[rgba(225,229,233,0.04)]
            backdrop-blur-md
            p-6
            flex
            flex-col
            gap-[35px]
            md:hidden
          "
        >
          {navigationLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`
                w-[124px]
                h-[36px]
                rounded-[10px]
                flex
                items-center
                justify-center
                text-white
                text-[14px]
                font-semibold
                tracking-[0.35px]
                ${
                  index === 0
                    ? "bg-[rgba(217,217,217,0.50)]"
                    : "bg-[rgba(217,217,217,0.05)]"
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}