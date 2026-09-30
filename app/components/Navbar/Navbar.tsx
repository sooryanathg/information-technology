"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/app/data/navigation";

const MOBILE_MENU_ID = "mobile-nav-menu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Close the mobile menu on navigation (adjusting state during render avoids an extra effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const linkClass = (href: string) =>
    `flex h-9 items-center justify-center whitespace-nowrap rounded-[10px] px-3 text-sm font-semibold tracking-[0.35px] text-white transition-colors hover:bg-mist/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
      isActive(href) ? "bg-mist/40" : "bg-mist/5"
    }`;

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="absolute inset-x-0 top-0 z-50 h-[77px] font-heading"
    >
      {/* Top shade for link legibility. Masked off on the left so it doesn't
          grey out the hero's off-white pixel corner behind the logo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 to-transparent [mask-image:linear-gradient(90deg,transparent_0%,transparent_28%,#000_50%)]"
      />
      <div className="relative flex h-full items-center px-4 md:px-8 lg:px-[51px]">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Image src="/logo/Object.png" alt="" width={47} height={47} priority />
          <span className="whitespace-nowrap text-xl font-bold tracking-[-0.6px] text-bark lg:text-2xl">
            Dept. of <span className="text-[#b8822a]">IT</span>
          </span>
        </Link>

        <ul className="ml-auto hidden items-center gap-1.5 md:flex lg:gap-3 xl:gap-5">
          {navigationLinks.map((link) => (
            <li key={link.href}>
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

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls={MOBILE_MENU_ID}
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
        >
          <Image src="/icons/hamburger.svg" alt="" width={36} height={36} priority />
        </button>
      </div>

      {menuOpen && (
        <ul
          id={MOBILE_MENU_ID}
          className="absolute right-4 top-[84px] flex w-[169px] flex-col gap-2 rounded-[25px] border border-white/15 bg-bark/85 p-4 shadow-[0_8px_24px_rgb(0_0_0/0.35)] backdrop-blur-md md:hidden"
        >
          {navigationLinks.map((link) => (
            <li key={link.href}>
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
