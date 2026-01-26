import React, { useMemo, useState } from "react";
import type { ServiceProduct } from "../constants/serviceProducts";
import { formatRub } from "../constants/serviceProducts";

type Props = {
  title?: string;
  products: ServiceProduct[];
  onConsult: (product: ServiceProduct) => void;
};

const ServiceProductsCatalog: React.FC<Props> = ({
                                                   title = "Каталог",
                                                   products,
                                                   onConsult,
                                                 }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  if (!products.length) return null;

  return (
    <section className="overflow-hidden rounded-xl border border-gray bg-slate-800">
      <div className="border-b border-white bg-white px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={[
              "rounded-full px-3 py-1 transition",
              "border",
              activeCategory === "all"
                ? "border-lime-500 bg-lime-500 text-black"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            ].join(" ")}
          >
            Все
          </button>

          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCategory(c)}
              className={[
                "rounded-full px-3 py-1 transition",
                "border",
                activeCategory === c
                  ? "border-lime-500 bg-lime-500 text-black"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              ].join(" ")}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="p-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              {/* Image */}
              <div className="bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-contain p-6"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3 p-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-gray-900">{p.title}</h3>
                  <div className="text-base font-bold text-gray-900">
                    {formatRub(p.priceRub)}
                  </div>
                </div>

                <ul className="space-y-1 text-xs leading-relaxed text-gray-600">
                  {p.shortSpecs.slice(0, 4).map((s) => (
                    <li key={s} className="line-clamp-2">
                      {s}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onConsult(p)}
                  className="w-full rounded-xl bg-lime-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black transition hover:bg-lime-600"
                >
                  Получить консультацию
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProductsCatalog;
