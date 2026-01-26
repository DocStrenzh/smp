import React, { useEffect, useMemo, useState } from "react";
import { useQuickActions } from "../../components/QuickActionProvider";
import { reviewsApi, type ReviewDto } from "../../api/reviewsApi";

const ITEMS_PER_PAGE = 3;

const ReviewsPage: React.FC = () => {
  const { openAction } = useQuickActions();

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ReviewDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const list = await reviewsApi.list();
        if (!alive) return;

        setItems(list);
        setPage(1);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Не удалось загрузить отзывы");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));
  }, [items.length]);

  const currentReviews = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  }, [items, page]);

  const handleChangePage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const starsCount = (rating: number) => {
    const r = Number(rating ?? 0);
    const safe = Number.isFinite(r) ? r : 0;
    return Math.max(0, Math.min(5, Math.round(safe)));
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold text-gray-900">Отзывы</h1>

      <p className="mb-6 text-sm leading-relaxed text-gray-700">
        Спасибо нашим клиентам за оказанное внимание нашей компании. Мы рады стараться для вас
        и предлагать самые лучшие цены и качество услуг.
      </p>

      <button
        type="button"
        onClick={() => openAction("review")}
        className="mb-10 inline-flex items-center bg-lime-400 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-black shadow-md transition hover:bg-lime-300"
      >
        Оставить отзыв
      </button>

      {loading && <div className="text-sm text-gray-600">Загрузка отзывов...</div>}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {currentReviews.length === 0 ? (
            <div className="text-sm text-gray-600">Отзывов пока нет.</div>
          ) : (
            <div className="space-y-10">
              {currentReviews.map((review) => (
                <article key={String(review.id)} className="border-t border-gray-100 pt-8">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.photo || "/images/reviews/default-avatar.jpg"}
                        alt={review.name}
                        className="h-20 w-20 rounded-full object-cover"
                        loading="lazy"
                      />

                      <div>
                        <div className="mb-1 text-lg font-semibold text-gray-900">{review.name}</div>

                        {review.position && (
                          <div className="mb-2 text-xs text-gray-400">{review.position}</div>
                        )}

                        {review.date && (
                          <div className="mb-2 text-xs text-gray-400">{formatDate(review.date)}</div>
                        )}

                        <p className="max-w-3xl text-sm leading-relaxed text-gray-700">{review.text}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: starsCount(review.rating) }).map((_, i) => (
                        <span key={i} className="text-lg">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handleChangePage(page - 1)}
            className="rounded border border-gray-300 px-3 py-1 text-xs uppercase tracking-wide text-gray-600 hover:bg-gray-100 disabled:opacity-40"
            disabled={page === 1}
          >
            Назад
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const p = index + 1;
            const isActive = p === page;

            return (
              <button
                key={p}
                type="button"
                onClick={() => handleChangePage(p)}
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                  isActive
                    ? "bg-lime-400 text-black"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
                ].join(" ")}
              >
                {p}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => handleChangePage(page + 1)}
            className="rounded border border-gray-300 px-3 py-1 text-xs uppercase tracking-wide text-gray-600 hover:bg-gray-100 disabled:opacity-40"
            disabled={page === totalPages}
          >
            Вперёд
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
