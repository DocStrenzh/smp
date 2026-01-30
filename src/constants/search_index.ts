export type SearchIndexItem = {
  id: string;
  title: string;
  url: string;
  category: string;
  text: string;
};

export const searchIndex: SearchIndexItem[] = [
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
