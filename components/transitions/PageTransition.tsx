"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navigationLinks } from "@/app/data/navigation";
import { BOOT_EVENT } from "@/lib/intro";
import { FRAME_COLOR } from "@/lib/pixelFrame";
import { createPixelTransition, TRANSITION, type SweepAxis } from "@/lib/pageTransition";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

const trimSlash = (path: string) => path.replace(/\/+$/, "") || "/";

/** Towards a page further along the nav the edge travels right, otherwise left. */
function axisBetween(from: string, to: string): SweepAxis {
  const position = (path: string) => navigationLinks.findIndex((link) => link.href === path);
  return position(to) >= position(from) ? "right" : "left";
}

/**
 * Site-wide pixel transition (see lib/pageTransition.ts for the drawing).
 *
 * With `TRANSITION.betweenPages` on:
 * - Clicking an internal link covers the screen first and navigates once it
 *   is covered, then clears when the new page is in place.
 * - Back / forward cannot be held back, so the screen is covered in one frame
 *   in its own colours and clears from there.
 * Always:
 * - The boot loader clears through the same transition, starting from its
 *   flat cream.
 *
 * The layers never take pointer input and are hidden from assistive tech; with
 * reduced motion links navigate as usual.
 */
export default function PageTransition() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pixelsRef = useRef<HTMLCanvasElement>(null);
  const fragmentsRef = useRef<HTMLCanvasElement>(null);
  const arriveRef = useRef<((path: string) => void) | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const root = rootRef.current;
    const [pixels, fragments] = [pixelsRef.current, fragmentsRef.current];
    if (!root || !pixels || !fragments) return;
    const transition = createPixelTransition(root, { pixels, fragments });
    if (!transition) return;

    let current = trimSlash(window.location.pathname);
    let target: string | null = null; // page the cover is waiting for
    let holdTimer = 0;
    let frame = 0;

    const clear = () => {
      window.clearTimeout(holdTimer);
      target = null;
      transition.release();
    };

    const navigate = (href: string, to: string) => {
      target = to;
      window.clearTimeout(holdTimer);
      router.prefetch(href);
      transition.cover({
        axis: axisBetween(current, to),
        onCovered: () => {
          router.push(href);
          holdTimer = window.setTimeout(clear, TRANSITION.maxHoldMs);
        },
      });
    };

    // Capture phase on window, so this runs before next/link's own handler,
    // which leaves a click alone once its default is prevented.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      if ((link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      const to = trimSlash(url.pathname);
      // Other sites and links within the page are left to the browser.
      if (url.origin !== window.location.origin || to === trimSlash(window.location.pathname)) return;
      if (window.matchMedia(REDUCED_QUERY).matches) return;
      e.preventDefault();
      navigate(url.pathname + url.search + url.hash, to);
    };

    const onPopState = () => {
      const to = trimSlash(window.location.pathname);
      if (to === current || window.matchMedia(REDUCED_QUERY).matches) return;
      target = to;
      window.clearTimeout(holdTimer);
      transition.cover({ axis: "left", instant: true });
      holdTimer = window.setTimeout(clear, TRANSITION.maxHoldMs);
    };

    const onBootExit = () => {
      transition.cover({ axis: "down", instant: true, flat: FRAME_COLOR, revealMs: TRANSITION.bootRevealMs });
      transition.release();
    };

    arriveRef.current = (path) => {
      current = path;
      if (path !== target) return;
      // Give the new page two frames to lay out and scroll before it is read.
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (path === target) clear();
        });
      });
    };

    if (TRANSITION.betweenPages) {
      window.addEventListener("click", onClick, true);
      window.addEventListener("popstate", onPopState);
    }
    window.addEventListener(BOOT_EVENT, onBootExit);
    return () => {
      arriveRef.current = null;
      window.clearTimeout(holdTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener(BOOT_EVENT, onBootExit);
      transition.destroy();
    };
  }, [router]);

  useEffect(() => {
    arriveRef.current?.(trimSlash(pathname));
  }, [pathname]);

  return (
    // z-[90]: above the page and the navbar, below the boot loader, whose logo fades out over the cover.
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden [contain:strict]"
      style={{ visibility: "hidden" }}
    >
      <canvas ref={pixelsRef} className="absolute left-0 max-w-none [image-rendering:pixelated]" />
      <canvas ref={fragmentsRef} className="absolute left-0 max-w-none" />
    </div>
  );
}
