import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { catalogApi, type CatalogCategory, type CatalogProduct, type CatalogSection } from "../api/catalogApi";

type CatalogContextValue = {
  loading: boolean;
  error: string | null;

  categories: CatalogCategory[];
  sections: CatalogSection[];
  products: CatalogProduct[];

  categoriesWithChildren: Array<CatalogCategory & { children: CatalogSection[] }>;
  getCategoryBySlug: (slug: string) => CatalogCategory | undefined;
  getSectionsByCategorySlug: (slug: string) => CatalogSection[];
  getProductsByCategorySlug: (slug: string) => CatalogProduct[];
  getProductById: (id: string) => CatalogProduct | undefined;

  refetch: () => Promise<void>;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [sections, setSections] = useState<CatalogSection[]>([]);
  const [products, setProducts] = useState<CatalogProduct[]>([]);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const [cats, secs, prods] = await Promise.all([
        catalogApi.getCategories(),
        catalogApi.getSections(),
        catalogApi.getProducts(),
      ]);
      setCategories(cats);
      setSections(secs);
      setProducts(prods);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось загрузить каталог");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoriesWithChildren = useMemo(() => {
    const childrenMap = new Map<string, CatalogSection[]>();

    for (const s of sections) {
      const slug = s.categorySlug;
      if (!slug) continue;

      const arr = childrenMap.get(slug) ?? [];
      arr.push(s);
      childrenMap.set(slug, arr);
    }

    return categories.map((c) => ({
      ...c,
      children: (childrenMap.get(c.slug) ?? []).slice().sort((a, b) => a.title.localeCompare(b.title, "ru")),
    }));
  }, [categories, sections]);

  const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

  const getSectionsByCategorySlug = (slug: string) =>
    categoriesWithChildren.find((c) => c.slug === slug)?.children ?? [];

  const getProductsByCategorySlug = (slug: string) =>
    products.filter((p) => p.categorySlug === slug);

  const getProductById = (id: string) => products.find((p) => String(p.id) === String(id));

  const value: CatalogContextValue = useMemo(
    () => ({
      loading,
      error,
      categories,
      sections,
      products,
      categoriesWithChildren,
      getCategoryBySlug,
      getSectionsByCategorySlug,
      getProductsByCategorySlug,
      getProductById,
      refetch,
    }),
    [loading, error, categories, sections, products, categoriesWithChildren]
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
};

export const useCatalog = () => {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
};
