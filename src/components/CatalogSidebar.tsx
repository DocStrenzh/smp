import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { CatalogCategory } from "../constants/catalog";
import {sidebarPromoImage} from "../constants/catalog";

type Props = {
  categories: CatalogCategory[];
};

const CatalogSidebar: React.FC<Props> = ({ categories }) => {
  const { pathname, search } = useLocation();

  const activeCategorySlug = useMemo(() => {
    const m = pathname.match(/^\/catalog\/([^/?#]+)/);
    return m?.[1] ?? "";
  }, [pathname]);

  const [openSlug, setOpenSlug] = useState<string>(activeCategorySlug || categories[0]?.slug || "");

  useEffect(() => {
    if (activeCategorySlug) setOpenSlug(activeCategorySlug);
  }, [activeCategorySlug]);

  const sectionParam = useMemo(() => {
    const sp = new URLSearchParams(search);
    return sp.get("section"); // string | null
  }, [search]);

  return (
    <aside className="space-y-6">
      <div className="rounded-xl border bg-white">
        <div className="border-b px-4 py-3 text-sm font-semibold text-neutral-900">ПРОДУКЦИЯ</div>

        <div className="divide-y">
          {categories.map((cat) => {
            const isOpen = openSlug === cat.slug;
            const isActive = activeCategorySlug === cat.slug;

            return (
              <div key={cat.id}>
                <button
                  type="button"
                  onClick={() => setOpenSlug((prev) => (prev === cat.slug ? "" : cat.slug))}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <span className={["text-sm", isActive ? "text-neutral-900" : "text-neutral-800"].join(" ")}>
                    {cat.title}
                  </span>

                  <span className="text-neutral-400">{isOpen ? "▴" : "▾"}</span>
                </button>

                {isOpen && (
                  <div className="pb-2">
                    <Link
                      to={`/catalog/${cat.slug}`}
                      className={[
                        "mx-4 mb-2 block rounded-lg px-3 py-2 text-sm",
                        isActive && !sectionParam ? "bg-neutral-50 text-neutral-900" : "text-neutral-700 hover:bg-neutral-50",
                      ].join(" ")}
                    >
                      Все в разделе
                    </Link>

                    {cat.children?.map((sub) => {
                      const isSubActive = isActive && sectionParam === sub.slug;

                      return (
                        <Link
                          key={sub.slug}
                          to={`/catalog/${cat.slug}?section=${sub.slug}`}
                          className={[
                            "mx-4 block rounded-lg px-3 py-2 text-sm",
                            isSubActive ? "bg-neutral-50 text-neutral-900" : "text-neutral-700 hover:bg-neutral-50",
                          ].join(" ")}
                        >
                          {sub.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="grid grid-cols-[1fr_120px] items-stretch bg-neutral-50">
          <div className="p-4">
            <div className="text-lg font-semibold text-neutral-900">Мы всегда на связи</div>
            <div className="mt-1 text-sm text-neutral-600">
              Рады будем ответить на любые ваши вопросы!
            </div>
          </div>

          <div className="relative">
            <img
              src={sidebarPromoImage}
              alt="Мы всегда на связи"
              className="absolute inset-0 h-full w-full object-cover object-right"
              loading="lazy"
            />
          </div>
        </div>
      </div>


      <div className="rounded-xl border bg-white">
        <button className="flex w-full items-center gap-3 px-4 py-4 text-sm text-neutral-800 hover:bg-neutral-50">
          <span className="text-neutral-400">📞</span> Заказать звонок
        </button>
        <div className="h-px bg-neutral-200" />
        <button className="flex w-full items-center gap-3 px-4 py-4 text-sm text-neutral-800 hover:bg-neutral-50">
          <span className="text-neutral-400">✉️</span> Написать сообщение
        </button>
        <div className="h-px bg-neutral-200" />
        <button className="flex w-full items-center gap-3 px-4 py-4 text-sm text-neutral-800 hover:bg-neutral-50">
          <span className="text-neutral-400">💬</span> Оставить отзыв
        </button>
        <div className="h-px bg-neutral-200" />
        <button className="flex w-full items-center gap-3 px-4 py-4 text-sm text-neutral-800 hover:bg-neutral-50">
          <span className="text-neutral-400">📍</span> Ближайшая студия
        </button>
      </div>
    </aside>
  );
};

export default CatalogSidebar;
