export type GalleryCategoryId = "baths" | "houses" | "cottages";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategoryId;
}

export const galleryCategories: { id: GalleryCategoryId; label: string }[] = [
  { id: "baths", label: "Бани" },
  { id: "houses", label: "Дома" },
  { id: "cottages", label: "Коттеджи" },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "baths-1",
    src: "/images/gallery/baths-1.jpg",
    alt: "Баня 1",
    category: "baths",
  },
  {
    id: "baths-2",
    src: "/images/gallery/baths-2.jpg",
    alt: "Баня 2",
    category: "baths",
  },
  {
    id: "baths-3",
    src: "/images/gallery/baths-3.jpg",
    alt: "Баня 3",
    category: "baths",
  },

  {
    id: "baths-4",
    src: "/images/gallery/baths-4.jpg",
    alt: "Баня 4",
    category: "baths",
  },
  {
    id: "baths-5",
    src: "/images/gallery/baths-5.jpg",
    alt: "Баня 5",
    category: "baths",
  },
  {
    id: "baths-6",
    src: "/images/gallery/baths-6.jpg",
    alt: "Баня 6",
    category: "baths",
  },

  {
    id: "baths-7",
    src: "/images/gallery/baths-7.jpg",
    alt: "Баня 7",
    category: "baths",
  },
  {
    id: "baths-8",
    src: "/images/gallery/baths-8.jpg",
    alt: "Баня 8",
    category: "baths",
  },
  {
    id: "baths-9",
    src: "/images/gallery/baths-9.jpg",
    alt: "Баня 9",
    category: "baths",
  },

  {
    id: "houses-1",
    src: "/images/gallery/houses-1.jpg",
    alt: "Дом 1",
    category: "houses",
  },
  {
    id: "houses-2",
    src: "/images/gallery/houses-2.jpg",
    alt: "Дом 2",
    category: "houses",
  },
  {
    id: "houses-3",
    src: "/images/gallery/houses-3.jpg",
    alt: "Дом 3",
    category: "houses",
  },

  {
    id: "houses-4",
    src: "/images/gallery/houses-4.jpg",
    alt: "Дом 4",
    category: "houses",
  },
  {
    id: "houses-5",
    src: "/images/gallery/houses-5.jpg",
    alt: "Дом 5",
    category: "houses",
  },
  {
    id: "houses-6",
    src: "/images/gallery/houses-6.jpg",
    alt: "Дом 6",
    category: "houses",
  },

  {
    id: "houses-7",
    src: "/images/gallery/houses-7.jpg",
    alt: "Дом 7",
    category: "houses",
  },
  {
    id: "houses-8",
    src: "/images/gallery/houses-8.jpg",
    alt: "Дом 8",
    category: "houses",
  },

  {
    id: "cottages-1",
    src: "/images/gallery/cottages-1.jpg",
    alt: "Коттедж 1",
    category: "cottages",
  },
  {
    id: "cottages-2",
    src: "/images/gallery/cottages-2.jpg",
    alt: "Коттедж 2",
    category: "cottages",
  },
  {
    id: "cottages-3",
    src: "/images/gallery/cottages-3.jpg",
    alt: "Коттедж 3",
    category: "cottages",
  },

  {
    id: "cottages-4",
    src: "/images/gallery/cottages-4.jpg",
    alt: "Коттедж 4",
    category: "cottages",
  },
  {
    id: "cottages-5",
    src: "/images/gallery/cottages-5.jpg",
    alt: "Коттедж 5",
    category: "cottages",
  },
  {
    id: "cottages-6",
    src: "/images/gallery/cottages-6.jpg",
    alt: "Коттедж 6",
    category: "cottages",
  },

  {
    id: "cottages-7",
    src: "/images/gallery/cottages-1.jpg",
    alt: "Коттедж 1",
    category: "cottages",
  },
  {
    id: "cottages-8",
    src: "/images/gallery/cottages-2.jpg",
    alt: "Коттедж 2",
    category: "cottages",
  },
];
