export interface GalleryItem {
    id: string;
    image: string;
    label: string;
    row: number;
    size: "big" | "small";
  }
  
  
  export const galleryItems: GalleryItem[] = [
    // Row 1 
    { id: "gal-1", image: "/gallery/farewell-26.jpg", label: "Farewell'26", row: 1, size: "big" },
    { id: "gal-2", image: "/gallery/library.jpg", label: "Library", row: 1, size: "big" },
    { id: "gal-3", image: "/gallery/avishkar.png", label: "Avishkar-24", row: 1, size: "big" },
    
    // Row 2 
    { id: "gal-4", image: "/gallery/lab3.png", label: "Lab", row: 2, size: "small" },
    { id: "gal-5", image: "/gallery/lab.png", label: "Lab", row: 2, size: "small" },
    { id: "gal-6", image: "/gallery/library2.png", label: "Library", row: 2, size: "small" },
    { id: "gal-7", image: "/gallery/lab2.png", label: "Lab", row: 2, size: "small" },
    // Row 3 
    { id: "gal-8", image: "/gallery/avishkar2.png", label: "Avishkar-24", row: 3, size: "big" },
    { id: "gal-9", image: "/gallery/farewell-26(2).jpg", label: "Farewell'26", row: 3, size: "big" },
    { id: "gal-10", image: "/gallery/avishkar3.png", label: "Avishkar-24", row: 3, size: "big" },
  ];