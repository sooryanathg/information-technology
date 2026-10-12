import GalleryGridClient, { type GalleryDriveItem } from "./GalleryGridClient";

interface GalleryApiImage {
  id: string;
  row: number;
  size: "big" | "small";
  label: string;
  imageUrl: string;
}

// Server component: calls our own /api/gallery route (same pattern as
// /api/home-achievements) to get the current list of Drive photos.
export default async function GalleryGrid() {
  // Build an absolute URL for the server-side fetch. Next.js needs this
  // when fetching your own API route from a server component.
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const res = await fetch(`${base}/api/gallery`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Could not load gallery images");
  }

  const data: { images: GalleryApiImage[] } = await res.json();

  const items: GalleryDriveItem[] = data.images.map((img) => ({
    id: img.id,
    image: img.imageUrl,
    label: img.label,
    row: img.row,
    size: img.size,
  }));

  return <GalleryGridClient items={items} />;
}