import GalleryGrid from "@/components/pages/gallery/GalleryGrid";
import GalleryHero from "@/components/pages/gallery/GalleryHero";
import { GALLERY_ANCHOR, galleryItems } from "@/components/pages/gallery/data/gallery";

// One card per photo in the hero strip (the grid repeats some photos across rows).
const heroSlides = galleryItems.filter(
  (item, i) => galleryItems.findIndex((other) => other.image === item.image) === i
);

export default function GalleryPage() {
  return (
    <>
      <GalleryHero slides={heroSlides} />
      <div id={GALLERY_ANCHOR} className="scroll-mt-20">
        <GalleryGrid />
      </div>
    </>
  );
}
