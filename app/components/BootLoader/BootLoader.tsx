"use client";

import { useEffect, useRef, useState } from "react";
import { drawPixelated } from "@/lib/pixelate";
import { BOOT_DONE_EVENT, BOOT_EVENT, BOOT_SEEN_KEY, hash } from "@/lib/intro";
import { FRAME_COLOR, frameGeometry } from "@/lib/pixelFrame";

const MIN_DURATION = 2600; // ms the counter takes to reach 100
const MAX_WAIT = 5000; // stop waiting for window "load" after this
const HOLD_AT_100 = 450; // pause on 100 before dissolving
const SEGMENTS = 20;
const LOGO_SIZE = 94; // 2x the 47px logo so final pixels stay crisp
const LOGO_BLOCKS = [24, 16, 12, 8, 5, 3, 2]; // coarse -> sharp
const TILE_SPREAD = 650; // ms from the first to the last tile vanishing
const TILE_JITTER = 220;
const TILE_OUT_MS = 160; // must match .boot-tile in globals.css

const INK = "#2f2925";
const GOLD = "#b8822a";

type Tile = { x: number; y: number; size: number; delay: number };

const STATUS = [
  [25, "loading modules"],
  [50, "compiling vision"],
  [75, "syncing mission"],
  [100, "almost there"],
  [101, "ready"],
] as const;

function statusFor(p: number) {
  return STATUS.find(([max]) => p < max)?.[1] ?? "ready";
}

/**
 * Tiles covering the viewport, anchored to the bottom-left like the hero's
 * pixel frame but twice its tile size, which keeps the number of animated
 * elements down.
 */
function buildTiles(): { tiles: Tile[]; total: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const size = frameGeometry(vw, vh).size * 2;
  const cols = Math.ceil(vw / size);
  const rows = Math.ceil(vh / size);

  const tiles: Tile[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      tiles.push({
        x: c * size,
        y: vh - (rows - r) * size,
        size,
        // Clears top to bottom.
        delay: Math.round((r / Math.max(1, rows - 1)) * TILE_SPREAD + hash(r * cols + c) * TILE_JITTER),
      });
    }
  }
  return { tiles, total: TILE_SPREAD + TILE_JITTER + TILE_OUT_MS + 60 };
}

export default function BootLoader() {
  const [phase, setPhase] = useState<"boot" | "exit" | "done">("boot");
  const [progress, setProgress] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const logoRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const timers: number[] = [];

    if (root.dataset.boot !== "run") {
      raf = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(raf);
    }

    // Block scrolling without overflow:hidden, so the scrollbar (and with it
    // the page width) never changes under the loader's tiles.
    const SCROLL_KEYS = new Set([" ", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowDown"]);
    const block = (e: Event) => e.preventDefault();
    const blockKeys = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) e.preventDefault();
    };
    window.scrollTo(0, 0);
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", blockKeys);
    const unblockScroll = () => {
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", blockKeys);
    };

    // Logo, drawn pixelated and sharpened as progress climbs.
    const logo = new Image();
    logo.src = "/logo/Object.png";
    const ctx = logoRef.current?.getContext("2d") ?? null;
    let lastBlock = 0;
    const drawLogo = (p: number) => {
      if (!ctx || !logo.complete || !logo.naturalWidth) return;
      const idx = Math.min(LOGO_BLOCKS.length - 1, Math.floor((p / 100) * LOGO_BLOCKS.length));
      const block = LOGO_BLOCKS[idx];
      if (block === lastBlock) return;
      lastBlock = block;
      drawPixelated(ctx, logo, LOGO_SIZE, LOGO_SIZE, block, { fit: "contain" });
    };

    let loaded = document.readyState === "complete";
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);

    const start = performance.now();
    let shown = -1;
    let doneAt = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed > MAX_WAIT) loaded = true;
      const x = Math.min(1, elapsed / MIN_DURATION);
      const eased = 1 - Math.pow(1 - x, 2.2);
      const p = Math.floor(loaded ? eased * 100 : Math.min(eased * 100, 90));

      if (p !== shown) {
        shown = p;
        setProgress(p);
      }
      drawLogo(p);

      if (p >= 100) {
        doneAt ||= now;
        if (now - doneAt >= HOLD_AT_100) {
          startExit();
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const startExit = () => {
      try {
        sessionStorage.setItem(BOOT_SEEN_KEY, "1");
      } catch {}
      const { tiles, total } = buildTiles();
      setTiles(tiles);
      setPhase("exit");
      root.dataset.boot = "exit";
      window.dispatchEvent(new Event(BOOT_EVENT));
      timers.push(
        window.setTimeout(() => {
          root.dataset.boot = "done";
          unblockScroll();
          window.dispatchEvent(new Event(BOOT_DONE_EVENT));
          setPhase("done");
        }, total)
      );
    };

    raf = requestAnimationFrame(tick);
    return () => {
      unblockScroll();
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (phase === "done") return null;

  const filled = Math.round((progress / 100) * SEGMENTS);
  const exiting = phase === "exit";

  return (
    <div
      aria-hidden="true"
      className="boot-loader fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: exiting ? "transparent" : FRAME_COLOR }}
    >
      {exiting &&
        tiles.map((t, i) => (
          <span
            key={i}
            className="boot-tile absolute"
            style={{
              left: t.x,
              top: t.y,
              width: t.size + 1,
              height: t.size + 1,
              background: FRAME_COLOR,
              animationDelay: `${t.delay}ms`,
            }}
          />
        ))}

      <div
        className={`relative flex w-[260px] flex-col items-center gap-7 font-mono ${
          exiting ? "boot-content-out" : ""
        }`}
        style={{ color: INK }}
      >
        <div className="flex h-[118px] w-[118px] items-center justify-center" style={{ background: INK }}>
          <canvas
            ref={logoRef}
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            className="h-[94px] w-[94px] [image-rendering:pixelated]"
          />
        </div>

        <div className="flex w-full flex-col gap-3">
          <div className="flex items-baseline justify-between text-[13px] font-semibold uppercase tracking-[0.2em]">
            <span>dept.of.it</span>
            <span className="tabular-nums">{String(progress).padStart(3, "0")}%</span>
          </div>

          <div className="flex gap-[3px]">
            {Array.from({ length: SEGMENTS }, (_, i) => (
              <span
                key={i}
                className="h-[7px] flex-1"
                style={{ background: i < filled ? GOLD : "rgba(47,41,37,0.14)" }}
              />
            ))}
          </div>

          <p className="text-[13px] font-medium tracking-[0.12em]">
            <span style={{ color: GOLD }}>&gt;</span> {statusFor(progress)}
            <span
              className="boot-caret ml-1 inline-block h-[11px] w-[6px] translate-y-[1px]"
              style={{ background: INK }}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
