"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "../../data/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Close the mobile menu whenever the route changes (state adjusted during render).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close the mobile menu on Escape or a click outside the nav.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const linkClass = (href: string) =>
    `h-[36px] rounded-[10px] flex items-center justify-center px-3
     text-white text-[14px] font-semibold tracking-[0.35px] whitespace-nowrap
     transition-colors hover:bg-[rgba(217,217,217,0.25)]
     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
     ${
       isActive(href)
         ? "bg-[rgba(217,217,217,0.40)]"
         : "bg-[rgba(217,217,217,0.05)]"
     }`;

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="absolute inset-x-0 top-0 z-50 h-[77px] bg-linear-to-b from-black/35 to-transparent"
    >
      <div className="flex h-full items-center px-4 md:px-8 lg:px-[51px]">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Image
            src="/logo/Object.png"
            alt=""
            width={47}
            height={47}
            priority
          />
          <span className="whitespace-nowrap text-[20px] font-semibold tracking-[-0.6px] text-white lg:text-[24px]">
            Dept. of IT
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="ml-auto hidden items-center gap-1.5 md:flex lg:gap-3 xl:gap-[20px]">
          {navigationLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`${linkClass(link.href)} xl:w-[124px] xl:px-0`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-md md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Image
            src="/icons/hamburger.svg"
            alt=""
            width={36}
            height={36}
            priority
          />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <ul
          id="mobile-nav-menu"
          className="absolute right-4 top-[84px] flex w-[169px] flex-col gap-2 rounded-[25px] border border-white/15 bg-[#2f2925]/85 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-md md:hidden"
        >
          {navigationLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`${linkClass(link.href)} w-full`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
