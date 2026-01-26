import { http, API_BASE_URL } from "./http";

export type GalleryCategoryDto = {
  id: string;
  title: string;
  slug: string;
  createdAt?: string;
};

export type GalleryPhotoDto = {
  id: string;
  categorySlug: string;
  alt: string;
  src: string;
  sortOrder: number;
  createdAt?: string;
};

type AnyObj = Record<string, any>;

function originFromApiBase(): string {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return API_BASE_URL.replace(/\/api\/v\d+.*$/i, "");
  }
}

const API_ORIGIN = originFromApiBase();

function absUrl(v?: string): string {
  if (!v) return "";
  if (v.startsWith("http://") || v.startsWith("https://")) return v;
  return `${API_ORIGIN}${v}`;
}

function toArray(raw: any): AnyObj[] {
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.items)) return raw.items;
  if (Array.isArray(raw?.data)) return raw.data;
  if (Array.isArray(raw?.data?.items)) return raw.data.items;
  return [];
}

export const galleryApi = {
  async categories(): Promise<GalleryCategoryDto[]> {
    const res = await http.get<any>("/gallery/categories");
    const arr = toArray(res.data);

    return arr.map((c) => ({
      id: String(c.id),
      title: String(c.title),
      slug: String(c.slug),
      createdAt: c.created_at ? String(c.created_at) : undefined,
    }));
  },

  async photosBySlug(slug: string): Promise<GalleryPhotoDto[]> {
    const res = await http.get<any>(`/gallery/${encodeURIComponent(slug)}/photos`);
    const arr = toArray(res.data);

    const mapped = arr.map((p, i) => {
      const id = String(p.id ?? i);
      const categorySlug = String(p.category_slug ?? slug);
      const alt = String(p.alt ?? `Фото ${i + 1}`);
      const src = absUrl(String(p.image ?? ""));
      const sortOrderRaw = p.sort_order ?? p.sortOrder ?? 0;
      const sortOrder = Number.isFinite(Number(sortOrderRaw)) ? Number(sortOrderRaw) : 0;

      return {
        id,
        categorySlug,
        alt,
        src,
        sortOrder,
        createdAt: p.created_at ? String(p.created_at) : undefined,
      } satisfies GalleryPhotoDto;
    });

    mapped.sort((a, b) => a.sortOrder - b.sortOrder);
    return mapped.filter((x) => Boolean(x.src));
  },
};
