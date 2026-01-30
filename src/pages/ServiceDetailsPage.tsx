import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuickActions } from "../components/QuickActionProvider";
import ServiceProductsCatalog from "../components/ServiceProductCatalog";
import { http } from "../api/http";
import type { ServiceProduct } from "../constants/serviceProducts";

const VISIBLE_COUNT = 3;

// Если где-то в роутинге/старых ссылках встречается "metal" — приведём к slug из бэка
const normalizeSlug = (s?: string) => {
  if (!s) return "";
  if (s === "metal") return "metall";
  return s;
};

type ApiSectionListItem = {
  id: string;
  title: string;
  label: string;
  slug: string;
  image: string;
  hasGallery: boolean;
  hasCatalog: boolean;
  sortOrder?: number; // на будущее (если добавят)
};

type ApiSectionListResponse = {
  items: ApiSectionListItem[];
};

type ApiGalleryItem = {
  id: string;
  name: string;
  url: string;
  sortOrder: number;
};

type ApiCatalogCategory = {
  id: string;
  title: string;
  slug: string;
  sortOrder: number;
};

type ApiCatalogItemSpec = {
  key: string;
  value: string;
};

type ApiCatalogItem = {
  id: string;
  categoryId: string;
  title: string;
  priceRub: number;
  imageUrl: string;
  sortOrder: number;
  badges?: string[];
  specs?: ApiCatalogItemSpec[];
};

type ApiSectionDetails = {
  id: string;
  title: string;
  label: string;
  slug: string;
  image: string;
  advantegesText?: string;
  advantegesArray?: string[];
  hasGallery: boolean;
  hasCatalog: boolean;
  gallery?: ApiGalleryItem[];
  catalog?: {
    categories?: ApiCatalogCategory[];
    items?: ApiCatalogItem[];
  };
};

type UiGalleryItem = {
  id: string;
  src: string;
  alt: string;
};

const ServiceDetailsPage: React.FC = () => {
  const { openAction } = useQuickActions();
  const { slug } = useParams<{ slug: string }>();

  const apiSlug = useMemo(() => normalizeSlug(slug), [slug]);

  const [sections, setSections] = useState<ApiSectionListItem[]>([]);
  const [details, setDetails] = useState<ApiSectionDetails | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setLightboxIndex(null);
    setStartIndex(0);
  }, [apiSlug]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!apiSlug) {
        setError("Некорректный адрес услуги.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const safeSlug = encodeURIComponent(apiSlug);

        const [listRes, detailsRes] = await Promise.all([
          http.get<ApiSectionListResponse>("/sections"),
          http.get<ApiSectionDetails>(`/sections/${safeSlug}`),
        ]);

        if (!mounted) return;

        setSections(listRes.data.items ?? []);
        setDetails(detailsRes.data);
      } catch (e: any) {
        if (!mounted) return;
        setError(
          e?.response?.data?.message ||
          e?.message ||
          "Не удалось загрузить данные услуги."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [apiSlug]);

  const serviceForSidebar = useMemo(() => {
    if (!apiSlug) return null;
    return sections.find((s) => normalizeSlug(s.slug) === apiSlug) ?? null;
  }, [sections, apiSlug]);

  const serviceTitle = details?.title ?? serviceForSidebar?.title ?? "";
  const serviceLabel = details?.label ?? serviceForSidebar?.label ?? "";
  const serviceImage = details?.image ?? serviceForSidebar?.image ?? "";

  const introParagraphs: string[] = useMemo(() => {
    const text = (details?.advantegesText ?? "").trim();
    if (!text) return [];

    return text
      .split(/\n\s*\n|\\n\\n|\r\n\r\n/g)
      .map((p) => p.trim())
      .filter(Boolean);
  }, [details?.advantegesText]);

  const advantages: string[] = useMemo(() => {
    return (details?.advantegesArray ?? [])
      .map((x) => (x ?? "").trim())
      .filter(Boolean);
  }, [details?.advantegesArray]);

  const gallery: UiGalleryItem[] = useMemo(() => {
    const arr = details?.gallery ?? [];
    return [...arr]
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((g) => ({
        id: g.id,
        src: g.url,
        alt: g.name || "Фото",
      }));
  }, [details?.gallery]);

  const products: ServiceProduct[] = useMemo(() => {
    if (!details?.slug) return [];

    const categories = details.catalog?.categories ?? [];
    const items = details.catalog?.items ?? [];

    const catTitleById = new Map<string, string>(
      [...categories]
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
        .map((c) => [c.id, c.title])
    );

    const sortedItems = [...items].sort(
      (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
    );

    return sortedItems.map((it) => {
      const categoryTitle = catTitleById.get(it.categoryId) ?? it.categoryId;

      const specs = (it.specs ?? [])
        .map((s) => {
          const k = (s.key ?? "").trim();
          const v = (s.value ?? "").trim();
          if (!k && !v) return "";
          if (k && v) return `${k}: ${v}`;
          return k || v;
        })
        .filter(Boolean);

      const badges = (it.badges ?? []).map((b) => (b ?? "").trim()).filter(Boolean);
      const shortSpecs = badges.length ? [...badges, ...specs] : specs;

      return {
        id: it.id,
        serviceSlug: details.slug,
        category: categoryTitle,
        title: it.title,
        image: it.imageUrl,
        priceRub: it.priceRub,
        shortSpecs,
      };
    });
  }, [details]);

  const sidebarSections = useMemo(() => {
    const copy = [...sections];
    copy.sort((a, b) => {
      const sa = a.sortOrder ?? 999;
      const sb = b.sortOrder ?? 999;
      if (sa !== sb) return sa - sb;
      return (a.label || a.title).localeCompare(b.label || b.title, "ru");
    });
    return copy;
  }, [sections]);

  const openLightbox = (index: number) => {
    if (!gallery.length) return;
    setLightboxIndex(index);
  };
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = () => {
    if (gallery.length <= 1) return;
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length
    );
  };

  const showNext = () => {
    if (gallery.length <= 1) return;
    setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % gallery.length));
  };

  const sliderPrev = () => {
    if (gallery.length <= VISIBLE_COUNT) return;
    setStartIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const sliderNext = () => {
    if (gallery.length <= VISIBLE_COUNT) return;
    setStartIndex((prev) => (prev + 1) % gallery.length);
  };

  const visibleImages = useMemo(() => {
    if (!gallery.length) return [] as { img: UiGalleryItem; index: number }[];
    const count = Math.min(VISIBLE_COUNT, gallery.length);

    const result: { img: UiGalleryItem; index: number }[] = [];
    for (let i = 0; i < count; i += 1) {
      const idx = (startIndex + i) % gallery.length;
      result.push({ img: gallery[idx], index: idx });
    }
    return result;
  }, [gallery, startIndex]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm text-gray-700">Загрузка…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm text-red-600">{error}</p>
        <div className="pt-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-black transition hover:bg-lime-300"
          >
            ← Назад к списку
          </Link>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p>Услуга не найдена.</p>
        <div className="pt-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-lime-400 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-black transition hover:bg-lime-300"
          >
            ← Назад к списку
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="relative h-[360px] w-full overflow-hidden md:h-[420px] lg:h-[480px]">
        <img src={serviceImage} alt={serviceTitle} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-white/40" />

        <div className="absolute inset-0 flex max-w-5xl flex-col justify-center px-6 md:px-16">
          <h1 className="mb-10 text-3xl font-AppFont font-semibold text-gray-900 md:text-4xl">
            {serviceTitle}
          </h1>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => openAction("callback")}
              className="bg-lime-400 px-8 py-3 text-sm font-semibold font-AppFont uppercase tracking-wide text-black shadow-md transition hover:bg-lime-300"
            >
              Заказать услугу
            </button>

            <button
              type="button"
              onClick={() => openAction("question")}
              className="bg-lime-400 px-8 py-3 text-sm font-semibold font-AppFont uppercase tracking-wide text-black shadow-md transition hover:bg-lime-300"
            >
              Задать вопрос
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-[260px,1fr]">
        <aside className="space-y-6">
          <div className="border border-gray-200 bg-white">
            {sidebarSections.map((s) => {
              const isActive = normalizeSlug(s.slug) === apiSlug;
              return (
                <Link
                  key={s.id}
                  to={`/services/${s.slug}`}
                  className={[
                    "block border-b border-gray-100 px-5 py-4 text-sm transition last:border-b-0",
                    isActive
                      ? "bg-lime-400 font-semibold text-black"
                      : "bg-white text-gray-800 hover:bg-gray-50",
                  ].join(" ")}
                >
                  {s.label || s.title}
                </Link>
              );
            })}
          </div>

          <div className="overflow-hidden border border-gray-200 bg-white">
            <img
              src="/images/support.jpg"
              alt="Мы всегда на связи"
              className="w-full object-cover"
            />
          </div>

          <div className="space-y-1">
            <button
              type="button"
              onClick={() => openAction("callback")}
              className="flex w-full items-center gap-3 border border-gray-200 bg-white px-5 py-4 font-AppFont text-left text-sm hover:bg-gray-50"
            >
              <span className="text-lg">📞</span>
              <span>Заказать звонок</span>
            </button>

            <button
              type="button"
              onClick={() => openAction("question")}
              className="flex w-full items-center gap-3 border border-gray-200 bg-white px-5 py-4 font-AppFont text-left text-sm hover:bg-gray-50"
            >
              <span className="text-lg">✉️</span>
              <span>Написать сообщение</span>
            </button>

            <button
              type="button"
              onClick={() => openAction("review")}
              className="flex w-full items-center gap-3 border border-gray-200 bg-white px-5 py-4 font-AppFont text-left text-sm hover:bg-gray-50"
            >
              <span className="text-lg">💬</span>
              <span>Оставить отзыв</span>
            </button>

            <button
              type="button"
              onClick={() => openAction("map")}
              className="flex w-full items-center gap-3 border border-gray-200 bg-white px-5 py-4 font-AppFont text-left text-sm hover:bg-gray-50"
            >
              <span className="text-lg">📍</span>
              <span>Ближайшая студия</span>
            </button>
          </div>
        </aside>

        <div className="space-y-10">
          {introParagraphs.length > 0 && (
            <div className="space-y-4 text-sm leading-relaxed text-gray-800">
              {introParagraphs.map((p, idx) => (
                <p key={`${idx}-${p.slice(0, 20)}`}>{p}</p>
              ))}
            </div>
          )}

          {advantages.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold font-AppFont">
                Преимущества {serviceLabel || serviceTitle}
              </h2>
              <ul className="ml-5 list-disc space-y-2 text-sm text-gray-800">
                {advantages.map((adv, idx) => (
                  <li key={`${idx}-${adv}`}>{adv}</li>
                ))}
              </ul>
            </div>
          )}

          {products.length > 0 && (
            <ServiceProductsCatalog
              products={products}
              onConsult={() => openAction("callback")}
            />
          )}

          {gallery.length > 0 && (
            <div>
              <h2 className="mb-6 text-xl font-semibold">Галерея</h2>

              <div className="flex items-center gap-4">
                {gallery.length > VISIBLE_COUNT && (
                  <button
                    type="button"
                    onClick={sliderPrev}
                    className="hidden h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-xl text-gray-700 hover:bg-gray-50 md:flex"
                    aria-label="Предыдущие изображения"
                  >
                    ‹
                  </button>
                )}

                <div className="flex gap-6">
                  {visibleImages.map(({ img, index }) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => openLightbox(index)}
                      className="group relative overflow-hidden border border-gray-200 bg-white"
                    >
                      <div className="h-52 w-64 overflow-hidden md:h-56 md:w-72">
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </button>
                  ))}
                </div>

                {gallery.length > VISIBLE_COUNT && (
                  <button
                    type="button"
                    onClick={sliderNext}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-xl text-gray-700 hover:bg-gray-50"
                    aria-label="Следующие изображения"
                  >
                    ›
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="pt-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-lime-400 px-6 py-3 text-xs font-semibold font-AppFont uppercase tracking-wide text-black transition hover:bg-lime-300"
            >
              ← Назад к списку
            </Link>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && gallery[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          <div className="pointer-events-none absolute left-4 right-4 top-4 flex items-center justify-between text-xs text-white/80">
            <span className="pointer-events-auto rounded-full bg-black/60 px-3 py-1">
              {lightboxIndex + 1} / {gallery.length}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-2xl text-white hover:bg-black"
            aria-label="Предыдущая"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-2xl text-white hover:bg-black"
            aria-label="Следующая"
          >
            ›
          </button>

          <div
            className="flex max-h-[92vh] max-w-[92vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[lightboxIndex].src}
              alt={gallery[lightboxIndex].alt}
              className="max-h-[92vh] max-w-full rounded-sm object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetailsPage;
