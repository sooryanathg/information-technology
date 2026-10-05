# Transitions

The site's pixel and Hilbert effects, one per file. Each is a client component
you drop into a page; import it by path, e.g.
`import DecodeText from "@/components/transitions/DecodeText"`.

All of them stand still under `prefers-reduced-motion` and are hidden from
assistive tech where they are decoration.

## Site-wide (mounted once in `app/layout.tsx`)

| Name | What it does |
| --- | --- |
| `BootLoader` | First-visit loader: logo sharpening from pixels, a counter, then it clears through `PageTransition`. |
| `PageTransition` | Pixel cover between pages: the screen breaks into pixels in its own colours, navigates, and clears in the next page's colours. Add `data-transition-ignore` to anything it should not read colours from. |
| `PixelCursor` | Off-white pixel trail behind the mouse. Leaves out whatever sits under a `PixelFrame`. |

## Text

| Name | What it does | Use |
| --- | --- | --- |
| `DecodeText` | Reveals text left to right, each character scrambling through code glyphs first. | `<DecodeText text="…" play={inView} />` |
| `TypeText` | Types text out a character at a time behind a blinking caret. | `<TypeText text="…" play={inView} />` |
| `CountUp` | Counts every number in a text up from 1 to its value. | `<CountUp text="~300" play={inView} />` |
| `PixelText` | Gold pixel band that sweeps across text now and then and on hover; letters turn gold under the cursor. | Wrap the text, and pass the same text as `layout`. |

## Reveals (put inside a positioned parent)

| Name | What it does | Use |
| --- | --- | --- |
| `HilbertReveal` | Uncovers its parent piece by piece along a Hilbert curve, one `[data-reveal]` child after another. | `<HilbertReveal play={inView} />` as the last child. |
| `HilbertAssemble` | Builds each `[data-assemble]` child out of falling pixels that land along a Hilbert curve. | `<HilbertAssemble play={ready} color="#efeae6" />` |

## Backgrounds (cover a positioned parent, behind content at `z-10` or higher)

| Name | What it does | Use |
| --- | --- | --- |
| `PixelatedBackground` | A photo that starts as coarse pixels and sharpens. | Give it the `<img>`'s ref and `play`. |
| `PixelFrame` | Blurred-tile frame over a photo: falling tiles at rest, a band that climbs with scroll, a page-coloured edge, and a blurred cursor trail. | Give it the `<img>`'s ref. |
| `PixelChecks` | Checked background for `bg-pixel-cream`: diagonal waves, cursor ripples, and a chipped blend into the section below. | `<PixelChecks below={[107, 85, 65]} />` |
| `HilbertLines` | Faint Hilbert-curve lines with gold runners. | `<HilbertLines />` |

## Shared code

- `lib/intro.ts` — `useInView`, `useIntroReady`, `usePrefersReducedMotion`, `hash`.
- `lib/pageTransition.ts` — the drawing behind `PageTransition`; its `TRANSITION` object holds all the timing and density settings.
- `lib/pixelFrame.ts` — tile grid and edge shapes for `PixelFrame`; `pageTileSize()` keeps other effects on the same grid.
- `lib/hilbert.ts` — the Hilbert curve and its line pattern.
- `lib/pixelate.ts` — pixelated and blurred copies of an image.

The CSS these rely on (`intro-item`, `intro-fade`, `intro-wipe`, `pixel-glitch`,
`heading-sweep`, `poster-crawl`, `bg-pixel-cream`) lives in `app/globals.css`. To
step an element in on scroll, set `data-intro="play" | "pending"` on a wrapper
and give the element `intro-item intro-fade`.
