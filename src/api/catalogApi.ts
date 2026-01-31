import { http } from "./http";

export type CatalogCategory = {
  id: string;
  slug: string;
  title: string;
  image?: string;
};

export type CatalogSection = {
  id: string;
  slug: string;
  title: string;
  image?: string;

  // связь с категорией
  categorySlug?: string;
  categoryId?: string;
};

export type CatalogProduct = {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  salePercent?: number;
  inStock: boolean;
  image?: string;

  brand: string;
  type: string;

  categorySlug?: string;
  categoryId?: string;
  sectionSlug?: string;
  sectionId?: string;

  badges?: string[];
};

type ListResp<T> = T[] | { data: T[] };

const toArray = <T,>(x: ListResp<T>): T[] => (Array.isArray(x) ? x : x?.data ?? []);

const s = (v: any) => (v == null ? "" : String(v));
const n = (v: any, fallback = 0) => {
  const num = Number(v);
  return Number.isFinite(num) ? num : fallback;
};
const b = (v: any, fallback = false) => {
  if (typeof v === "boolean") return v;
  const t = String(v).toLowerCase().trim();
  if (t === "true" || t === "1" || t === "yes") return true;
  if (t === "false" || t === "0" || t === "no") return false;
  return fallback;
};

function mapCategory(raw: any): CatalogCategory {
  const id = s(raw.id || raw.ID || raw._id);
  const slug = s(raw.slug || raw.code || raw.key || raw.categorySlug);
  const title = s(raw.title || raw.name || raw.label);

  const image = raw.imagePath || raw.image || raw.img || raw.icon || undefined;

  return {
    id: id || slug || title,
    slug: slug || id || title,
    title: title || slug || id,
    image,
  };
}

function mapSection(raw: any): CatalogSection {
  const id = s(raw.id || raw.ID || raw._id);
  const slug = s(raw.slug || raw.code || raw.key || raw.sectionSlug);
  const title = s(raw.title || raw.name || raw.label);

  const image = raw.imagePath || raw.image || raw.img || raw.icon || undefined;

  const categorySlug =
    raw.parentCategorySlug ||
    raw.categorySlug ||
    raw.category_slug ||
    raw.category ||
    undefined;

  const categoryId = raw.categoryId || raw.category_id || undefined;

  return {
    id: id || slug || title,
    slug: slug || id || title,
    title: title || slug || id,
    image,
    categorySlug: categorySlug ? s(categorySlug) : undefined,
    categoryId: categoryId ? s(categoryId) : undefined,
  };
}

function mapProduct(raw: any): CatalogProduct {
  const id = s(raw.id || raw.ID || raw._id);
  const title = s(raw.title || raw.name || raw.label);

  const price = n(raw.price ?? raw.currentPrice ?? raw.cost ?? 0, 0);

  const oldPriceRaw = raw.oldPrice ?? raw.old_price ?? raw.prevPrice ?? undefined;
  const salePercentRaw = raw.salePercent ?? raw.sale_percent ?? raw.discountPercent ?? undefined;

  const inStock = b(raw.inStock ?? raw.in_stock ?? raw.available ?? true, true);

  const image =
    raw.imagePath ||
    raw.image ||
    raw.img ||
    raw.photo ||
    raw.picture ||
    undefined;

  const brand = s(raw.brand || raw.vendor || raw.manufacturer || "—");
  const type = s(raw.type || raw.kind || raw.productType || "—");

  const categorySlug =
    raw.categorySlug || raw.category_slug || raw.category || undefined;
  const categoryId = raw.categoryId || raw.category_id || undefined;

  const sectionSlug =
    raw.sectionSlug || raw.section_slug || raw.section || undefined;
  const sectionId = raw.sectionId || raw.section_id || undefined;

  const badges = Array.isArray(raw.badges)
    ? raw.badges.map((x: any) => s(x)).filter(Boolean)
    : undefined;

  return {
    id: id || title,
    title: title || id,
    price,
    oldPrice: oldPriceRaw != null ? n(oldPriceRaw, undefined as any) : undefined,
    salePercent: salePercentRaw != null ? n(salePercentRaw, undefined as any) : undefined,
    inStock,
    image,
    brand,
    type,
    categorySlug: categorySlug ? s(categorySlug) : undefined,
    categoryId: categoryId ? s(categoryId) : undefined,
    sectionSlug: sectionSlug ? s(sectionSlug) : undefined,
    sectionId: sectionId ? s(sectionId) : undefined,
    badges,
  };
}

export const catalogApi = {
  async getCategories(): Promise<CatalogCategory[]> {
    const res = await http.get<ListResp<any>>("/products/categories");
    return toArray(res.data).map(mapCategory);
  },

  async getSections(): Promise<CatalogSection[]> {
    const res = await http.get<ListResp<any>>("/products/sections");
    return toArray(res.data).map(mapSection);
  },

  async getProducts(): Promise<CatalogProduct[]> {
    const res = await http.get<ListResp<any>>("/products/");
    return toArray(res.data).map(mapProduct);
  },
};
