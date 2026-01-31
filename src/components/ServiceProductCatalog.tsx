import React, { useMemo } from "react";
import type { ServiceProduct } from "../constants/serviceProducts";

type Props = {
  products: ServiceProduct[];
  onConsult: (product: ServiceProduct) => void;
  title?: string;
};

const formatRub = (value: number) => `${value.toLocaleString("ru-RU")} ₽`;

const ServiceProductsCatalog: React.FC<Props> = ({ products, onConsult, title = "Каталог продукции" }) => {
  const grouped = useMemo(() => {
    const map = new Map<string, ServiceProduct[]>();

    for (const p of products) {
      const key = (p.category || "Другое").trim() || "Другое";
      const arr = map.get(key) ?? [];
      arr.push(p);
      map.set(key, arr);
    }

    const entries = Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0], "ru"));

    for (const [, arr] of entries) {
      arr.sort((a, b) => (a.title || "").localeCompare(b.title || "", "ru"));
    }

    return entries;
  }, [products]);

  if (!products?.length) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-semibold font-AppFont text-neutral-900">{title}</h2>
        <div className="text-sm text-neutral-400">Товаров: {products.length}</div>
      </div>

      <div className="space-y-10">
        {grouped.map(([categoryTitle, items]) => (
          <div key={categoryTitle} className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold font-AppFont text-neutral-900">{categoryTitle}</h3>
              <div className="text-sm text-neutral-400">{items.length} шт.</div>
            </div>

            <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <ProductCard key={p.id} p={p} onConsult={onConsult} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceProductsCatalog;

function ProductCard({
                       p,
                       onConsult,
                     }: {
  p: ServiceProduct;
  onConsult: (product: ServiceProduct) => void;
}) {
  return (
    <div className="h-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow">
      <div className="flex h-full flex-col p-5">
        {/* TOP */}
        <div>
          <div className="h-44 w-full overflow-hidden rounded-lg bg-neutral-50">
            {p.image ? (
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-contain p-3"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                Нет изображения
              </div>
            )}
          </div>

          <div className="mt-4 text-base font-semibold font-AppFont text-neutral-900">
            <div className="line-clamp-2">{p.title}</div>
          </div>

          <div className="mt-3 text-sm text-neutral-500">
            <div className="line-clamp-1">{p.category}</div>
          </div>

          {p.shortSpecs?.length ? (
            <ul className="mt-3 space-y-1 text-sm text-neutral-600">
              {p.shortSpecs.slice(0, 4).map((s, idx) => (
                <li key={`${p.id}-spec-${idx}`} className="line-clamp-1">
                  {s}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-3 h-[72px]" />
          )}

          <div className="mt-4 text-lg font-semibold text-neutral-900">
            {formatRub(p.priceRub)}
          </div>
        </div>

        <div className="mt-auto pt-5">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onConsult(p)}
            className="h-11 w-full rounded-lg bg-lime-400 text-sm font-semibold font-AppFont text-black transition hover:bg-lime-300"
          >
            Получить консультацию
          </button>
        </div>
      </div>
    </div>
  );
}
