# Department of Information Technology Website

The website of the Department of Information Technology, GEC Sreekrishnapuram.

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and TypeScript.

> This project uses Next.js 16, which differs from older versions. Check the docs in
> `node_modules/next/dist/docs/` before relying on patterns from older tutorials.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create a production build            |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

Run `npm run build` before opening a pull request. It also type-checks the project.

## Project structure

```
app/
  layout.tsx              Root layout: fonts, navbar, footer, page title
  globals.css             Theme: colors, shadows, fonts, shared gradients
  page.tsx                Home page          /
  about/page.tsx          About page         /about
  events/page.tsx         Events page        /events
  components/
    Navbar/Navbar.tsx     Site-wide navbar
    Footer/Footer.tsx     Site-wide footer
  data/
    navigation.ts         Page links used by the navbar and footer

components/pages/         Sections for each page
  home/                   HeroSection, HeroButton
  about/                  AboutHero
  events/                 herosection, cards, CategoryBar, EventFilters, EventCard
    data/dataset.ts       Event categories and the events list

public/                   Images and icons, grouped by page
  home/  about/  events/  images/  icons/  logo/
```

Files in `app/` define routes and site-wide pieces. The sections that make up each
page live in `components/pages/<page>/`.

## Where to change things

| To change…                               | Edit                                                   |
| ---------------------------------------- | ------------------------------------------------------ |
| Navbar and footer links                  | `app/data/navigation.ts`                               |
| Events and event categories              | `components/pages/events/data/dataset.ts`              |
| Footer address, email, socials, photo    | `app/components/Footer/Footer.tsx`                     |
| Logo and "Dept. of IT" label             | `app/components/Navbar/Navbar.tsx`                     |
| Home hero text and buttons               | `components/pages/home/HeroSection.tsx`                |
| About hero text                          | `components/pages/about/AboutHero.tsx`                 |
| Events hero text and buttons             | `components/pages/events/herosection.tsx`              |
| Browser tab title and description        | `metadata` in `app/layout.tsx`                         |
| Colors, shadows, fonts                   | `app/globals.css`                                      |
| Images and icons                         | `public/` (then update the path in the component)      |

### Navigation links

Both the navbar and the footer's Quick Links read from one list, so a change here
updates both:

```ts
// app/data/navigation.ts
export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  // ...
];
```

The navbar highlights the link that matches the current page. Every link except Home
also matches its sub-pages, so `/events/anything` highlights "Events".

### Adding an event

Add an entry to `events` in `components/pages/events/data/dataset.ts`:

```ts
{
  id: 9,                                  // unique
  title: "Workshop on Cloud Computing",
  description: "A hands-on introduction to deploying on the cloud.",
  duration: "3h",
  org: "IEEE",
  mode: "Offline",                        // shown as the pill on the card
  category: "Tech",                       // "Tech" | "Non-Tech" | "Talks" | "Seminars"
  status: "upcoming",                     // "upcoming" | "past"
  date: "2026-12-04",                     // yyyy-mm-dd, used by the date filter
  image: "/events/cloud-workshop.webp",   // optional, place the file in public/events/
},
```

Cards without an `image` show a warm placeholder. The page shows the first six
matching events, and "Explore All" clears the filters and shows everything.

To add a category, extend the `EventCategory` type and add an entry to `categories`
in the same file, with a background color class from the theme.

### Adding a page

1. Create `app/<page>/page.tsx`.
2. Put its sections in `components/pages/<page>/`.
3. Put its images in `public/<page>/`.
4. Add it to `app/data/navigation.ts` if it should appear in the menus.

The navbar and footer are added by the root layout, so new pages get them
automatically.

## Styling

Styles are written with Tailwind classes. Shared design values are defined once in
`app/globals.css` and used by name instead of raw hex codes.

**Fonts.** Inter is the default body font. Use `font-heading` for Poppins. Both are
loaded in `app/layout.tsx`.

**Colors.** Every theme color is available as a Tailwind class, such as `bg-tan`,
`text-walnut`, or `border-latte`, and supports opacity like `bg-tan/85`.

| Group          | Colors                                                                        |
| -------------- | ----------------------------------------------------------------------------- |
| Browns         | `espresso` `bark` `coffee` `cocoa` `mocha` `driftwood` `walnut` `umber` `taupe` |
| Warm neutrals  | `latte` `parchment` `sand-deep` `sand` `linen` `mist`                           |
| Accents        | `gold` `gold-soft` `tan` `caramel` `apricot` `clay`                             |
| Category ramp  | `copper-300` `copper-400` `copper-500`                                          |

**Shadows.** `shadow-soft`, `shadow-card`, `shadow-panel`, `shadow-raised`,
`shadow-photo`.

**Gradients.** `bg-cream-fade`, `bg-card-cream`, `bg-photo-placeholder`.

**Global or local?** If a value is a brand color or is used on more than one page, add
it to `app/globals.css`. Values that only make sense for one element, such as a
section's size, spacing, or a one-off overlay, stay as classes in that component.

## Contributing

1. Branch off `dev` with a descriptive name, for example `feature/gallery-page`.
2. Keep the build passing: `npm run lint` and `npm run build`.
3. Open a pull request into `dev`. `dev` is merged into `main` for releases.
