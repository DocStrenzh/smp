import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import CatalogSidebar from "../../components/CatalogSidebar";
import { useCatalog } from "../../catalog/CatalogProvider";

const CatalogPage: React.FC = () => {
  const { loading, error, categoriesWithChildren, products } = useCatalog();

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of categoriesWithChildren) {
      map[c.slug] = products.filter((p) => p.categorySlug === c.slug).length;
    }
    return map;
  }, [categoriesWithChildren, products]);

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-10">Загрузка каталога…</div>;
  if (error) return <div className="mx-auto max-w-6xl px-4 py-10 text-red-600">{error}</div>;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
      <div className="text-xs text-neutral-400">Главная - Продукция</div>
      <h1 className="mt-3 text-4xl font-light text-neutral-900">Продукция</h1>

      <section className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[300px_1fr]">
        <CatalogSidebar categories={categoriesWithChildren} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoriesWithChildren.map((c) => (
            <Link
              key={c.id}
              to={`/catalog/${c.slug}`}
              className="group rounded-xl border bg-white shadow-sm transition hover:shadow"
            >
              <div className="flex h-56 items-center justify-center overflow-hidden rounded-t-xl bg-neutral-50">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-full w-full object-contain p-6 transition group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-xs text-neutral-400">Нет изображения</div>
                )}
              </div>

              <div className="px-5 pb-6 pt-4 text-center">
                <div className="text-lg font-medium text-neutral-900">{c.title}</div>
                <div className="mt-1 text-sm text-neutral-300">Товаров {counts[c.slug] ?? 0}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CatalogPage;
