import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { http } from "../api/http";
import { serviceDetails } from "../constants/serviceDetails";
import { searchSite } from "../constants/search_index";

type ApiSectionListItem = {
  id: string;
  title: string;
  label: string;
  slug: string;
  image: string;
  hasGallery: boolean;
  hasCatalog: boolean;
};

type ApiSectionListResponse = {
  items: ApiSectionListItem[];
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage: React.FC = () => {
  const query = useQuery();
  const q = (query.get("q") || "").trim().toLowerCase();

  const [sections, setSections] = useState<ApiSectionListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!q) return; // если запрос пустой — не дёргаем бэк
      try {
        setLoading(true);
        setError(null);

        const { data } = await http.get<ApiSectionListResponse>("/sections");

        if (!mounted) return;
        setSections(data.items ?? []);
      } catch (e: any) {
        if (!mounted) return;
        setError(
          e?.response?.data?.message ||
          e?.message ||
          "Не удалось загрузить данные для поиска."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [q]);

  const results = useMemo(() => {
    if (!q) return [];

    const matches: { type: string; title: string; url: string; snippet?: string }[] = [];

    const staticHits = searchSite(q).map((x) => ({
      type: x.category,
      title: x.title,
      url: x.url,
      snippet: undefined as string | undefined,
    }));
    matches.push(...staticHits);

    sections.forEach((s) => {
      const hay = `${s.title} ${s.label} ${s.slug}`.toLowerCase();
      if (hay.includes(q)) {
        matches.push({
          type: "Услуги",
          title: s.label || s.title,
          url: `/services/${s.slug}`,
        });
      }
    });

    serviceDetails.forEach((d) => {
      const text = [...d.introParagraphs, ...(d.advantages ?? [])].join(" ");
      if (text.toLowerCase().includes(q)) {
        const service = sections.find((s) => s.slug === d.slug);
        matches.push({
          type: "Услуги",
          title: service?.label || service?.title || d.slug,
          url: `/services/${d.slug}`,
          snippet: text.slice(0, 160) + (text.length > 160 ? "…" : ""),
        });
      }
    });

    const uniq = new Map<string, (typeof matches)[number]>();
    matches.forEach((m) => {
      const key = `${m.url}__${m.title}`;
      if (!uniq.has(key)) uniq.set(key, m);
    });

    return Array.from(uniq.values());
  }, [q, sections]);

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

        {q !== "" && loading && (
          <p className="text-sm text-gray-600">Ищем…</p>
        )}

        {q !== "" && error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {q !== "" && !loading && !error && results.length === 0 && (
          <p className="text-sm text-gray-500">
            По запросу «{q}» ничего не найдено.
          </p>
        )}

        {results.length > 0 && (
          <ul className="space-y-4">
            {results.map((r, idx) => (
              <li key={`${r.url}-${idx}`} className="border-b border-gray-100 pb-3">
                <div className="text-[11px] uppercase text-gray-400">{r.type}</div>
                <Link to={r.url} className="text-sm text-lime-500 hover:text-lime-600">
                  {r.title}
                </Link>
                {r.snippet && <p className="mt-1 text-xs text-gray-600">{r.snippet}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default SearchResultsPage;
