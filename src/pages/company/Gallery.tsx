import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { galleryApi, type GalleryCategoryDto, type GalleryPhotoDto } from "../../api/galleryApi";

const LS_KEY = "gallery.activeSlug";

const Gallery: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState<GalleryCategoryDto[]>([]);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const [photos, setPhotos] = useState<GalleryPhotoDto[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [catsLoading, setCatsLoading] = useState(false);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      setCatsLoading(true);
      setError(null);

      try {
        const list = await galleryApi.categories();
        if (!alive) return;

        setCategories(list);

        const fromUrl = searchParams.get("cat")?.trim() || null;
        const fromLs = (localStorage.getItem(LS_KEY) || "").trim() || null;

        const exists = (s: string | null) => !!s && list.some((c) => c.slug === s);

        const next =
          (exists(fromUrl) ? fromUrl : null) ??
          (exists(fromLs) ? fromLs : null) ??
          (list[0]?.slug ?? null);

        setActiveSlug(next);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Не удалось загрузить категории");
      } finally {
        if (!alive) return;
        setCatsLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!activeSlug) return;

    localStorage.setItem(LS_KEY, activeSlug);

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("cat", activeSlug);
      return next;
    }, { replace: true });
  }, [activeSlug, setSearchParams]);

  useEffect(() => {
    let alive = true;

    (async () => {
      if (!activeSlug) {
        setPhotos([]);
        return;
      }

      setPhotosLoading(true);
      setError(null);
      setLightboxIndex(null);

      try {
        const list = await galleryApi.photosBySlug(activeSlug);
        if (!alive) return;
        setPhotos(list);
      } catch (e) {
        if (!alive) return;
        setPhotos([]);
        setError(e instanceof Error ? e.message : "Не удалось загрузить фотографии");
      } finally {
        if (!alive) return;
        setPhotosLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [activeSlug]);

  const imagesInCategory = useMemo(() => photos, [photos]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = () => {
    if (lightboxIndex === null || imagesInCategory.length === 0) return;
    setLightboxIndex((lightboxIndex - 1 + imagesInCategory.length) % imagesInCategory.length);
  };

  const showNext = () => {
    if (lightboxIndex === null || imagesInCategory.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % imagesInCategory.length);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">Фотогалерея</h1>

      <p className="max-w-3xl text-sm leading-relaxed text-gray-700">
        Мастера универсалы и специалисты узкого профиля готовы прийти к вам на помощь в решении любых задач.
        Наш многолетний опыт позволяет справляться со сложными объектами, а довольные клиенты подтверждают качество нашей работы.
      </p>

      <div className="border-b border-gray-200 text-sm font-semibold">
        <div className="flex flex-wrap gap-8">
          {catsLoading ? (
            <div className="pb-3 text-sm text-gray-500">Загрузка категорий…</div>
          ) : categories.length === 0 ? (
            <div className="pb-3 text-sm text-gray-500">Категорий пока нет.</div>
          ) : (
            categories.map((cat) => {
              const isActive = cat.slug === activeSlug;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveSlug(cat.slug);
                    setLightboxIndex(null);
                  }}
                  className={[
                    "relative pb-3 transition-colors",
                    isActive ? "text-lime-500" : "text-gray-700 hover:text-gray-900",
                  ].join(" ")}
                >
                  {cat.title}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-lime-500" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!error && photosLoading && <div className="text-sm text-gray-600">Загрузка фотографий…</div>}

      {!error && !photosLoading && imagesInCategory.length === 0 && (
        <div className="text-sm text-gray-600">Фотографий пока нет.</div>
      )}

      {!error && imagesInCategory.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {imagesInCategory.map((img, index) => (
            <button
              key={img.id}
              type="button"
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden border border-gray-200 bg-white"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 text-xs font-semibold uppercase tracking-wide text-white transition group-hover:bg-black/30">
                <span className="rounded-full bg-black/60 px-3 py-1 opacity-0 transition group-hover:opacity-100">
                  Открыть
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {lightboxIndex !== null && imagesInCategory[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          <div className="pointer-events-none absolute left-4 right-4 top-4 flex items-center justify-between text-xs text-white/80">
            <span className="pointer-events-auto rounded-full bg-black/60 px-3 py-1">
              {lightboxIndex + 1} / {imagesInCategory.length}
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
              src={imagesInCategory[lightboxIndex].src}
              alt={imagesInCategory[lightboxIndex].alt}
              className="max-h-[92vh] w-auto max-w-full rounded-sm object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
