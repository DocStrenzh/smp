import { items } from "./item_section";
import { serviceDetails } from "./serviceDetails";

export type SearchIndexItem = {
  id: string;
  title: string;
  url: string;
  category: string;
  text: string;
};

export const searchIndex: SearchIndexItem[] = [
  ...items.map((s) => ({
    id: `service-${s.id}`,
    title: s.label,
    url: `/services/${s.slug}`,
    category: "Услуги",
    text: s.title,
  })),

  ...serviceDetails.map((d, i) => ({
    id: `service-detail-${i}`,
    title: items.find((s) => s.slug === d.slug)?.label ?? "Услуга",
    url: `/services/${d.slug}`,
    category: "Услуги",
    text: [...d.introParagraphs, ...(d.advantages ?? [])].join(" "),
  })),

  {
    id: "company-about",
    title: "О компании",
    url: "/company",
    category: "Компания",
    text: "информация о компании строительство домов под ключ преимущества индивидуальный подход качественные материалы опытная команда",
  },
];

export const searchSite = (query: string): SearchIndexItem[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return searchIndex.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.text.toLowerCase().includes(q)
  );
};
