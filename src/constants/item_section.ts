export type BuildItem = {
  id: number;
  title: string;
  image: string;
  label: string;
  slug: string;
};

export const items: BuildItem[] = [
  {
    id: 1,
    title: "Металлоконструкции",
    image: "/images/sections/build-1.jpg",
    label: "Металлоконструкции",
    slug: "metal",
  },
  {
    id: 2,
    title: "БСУ",
    image: "/images/sections/build-2.jpg",
    label: "БСУ",
    slug: "bsu",
  },
  {
    id: 3,
    title: "БПС",
    image: "/images/sections/build-3.jpg",
    label: "БПС",
    slug: "bps",
  }
];