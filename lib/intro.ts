"use client";

import { useSyncExternalStore } from "react";

// The boot loader drives <html data-boot>:
//   "run"  -> loader is showing, page intros should wait
//   "exit" -> loader is clearing, page intros may start
//   "skip" / "done" / missing -> no loader, page intros start right away
export const BOOT_EVENT = "it:boot-exit";
export const BOOT_DONE_EVENT = "it:boot-done";
export const BOOT_SEEN_KEY = "it-boot-seen";

function subscribeBoot(onChange: () => void) {
  window.addEventListener(BOOT_EVENT, onChange);
  return () => window.removeEventListener(BOOT_EVENT, onChange);
}

/** True once the boot loader is out of the way (always false during SSR). */
export function useIntroReady() {
  return useSyncExternalStore(
    subscribeBoot,
    () => document.documentElement.dataset.boot !== "run",
    () => false
  );
}

function subscribeBootPhase(onChange: () => void) {
  window.addEventListener(BOOT_EVENT, onChange);
  window.addEventListener(BOOT_DONE_EVENT, onChange);
  return () => {
    window.removeEventListener(BOOT_EVENT, onChange);
    window.removeEventListener(BOOT_DONE_EVENT, onChange);
  };
}

/**
 * Where the boot loader is: "pending" while it covers the page (or during SSR),
 * "free" once it is gone and page elements should animate in themselves.
 */
export function useBootPhase(): "pending" | "free" {
  return useSyncExternalStore(
    subscribeBootPhase,
    () => {
      const { boot } = document.documentElement.dataset;
      return boot === "run" || boot === "exit" ? "pending" : "free";
    },
    () => "pending"
  );
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );
}

/** Small deterministic hash, used for pseudo-random but render-pure values. */
export function hash(n: number) {
  let x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 0xffffffff;
}
