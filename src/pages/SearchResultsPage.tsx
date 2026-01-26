import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { items } from "../constants/item_section";
import { serviceDetails } from "../constants/serviceDetails";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage: React.FC = () => {
  const query = useQuery();
  const q = (query.get("q") || "").trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];

    const matches: { type: string; title: string; url: string; snippet?: string }[] = [];

    items.forEach((s) => {
      if (
        s.title.toLowerCase().includes(q) ||
        s.label.toLowerCase().includes(q)
      ) {
        matches.push({
          type: "Услуги",
          title: s.label,
          url: `/services/${s.slug}`,
        });
      }
    });

    serviceDetails.forEach((d) => {
      const text = [...d.introParagraphs, ...(d.advantages ?? [])].join(" ");
      if (text.toLowerCase().includes(q)) {
        const service = items.find((s) => s.slug === d.slug);
        matches.push({
          type: "Услуги",
          title: service?.label || d.slug,
          url: `/services/${d.slug}`,
        });
      }
    });


    return matches;
  }, [q]);

  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="mb-6 text-3xl font-semibold text-gray-900">Поиск</h1>

        <form className="mb-8">
          <input
            type="text"
            defaultValue={q}
            readOnly
            className="w-full border-b border-gray-300 pb-2 text-sm text-gray-800 outline-none"
          />
        </form>

        {q === "" && (
          <p className="text-sm text-gray-500">
            Введите запрос в строке поиска вверху.
          </p>
        )}

        {q !== "" && results.length === 0 && (
          <p className="text-sm text-gray-500">
            По запросу «{q}» ничего не найдено.
          </p>
        )}

        {results.length > 0 && (
          <ul className="space-y-4">
            {results.map((r, idx) => (
              <li key={`${r.url}-${idx}`} className="border-b border-gray-100 pb-3">
                <div className="text-[11px] uppercase text-gray-400">
                  {r.type}
                </div>
                <Link
                  to={r.url}
                  className="text-sm text-lime-500 hover:text-lime-600"
                >
                  {r.title}
                </Link>
                {r.snippet && (
                  <p className="mt-1 text-xs text-gray-600">{r.snippet}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default SearchResultsPage;
