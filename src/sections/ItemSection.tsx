import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ItemSectionCard from "../components/ItemSectionCard";
import { http } from "../api/http";
import type { BuildItem } from "../constants/item_section";

type ApiSectionListItem = {
  id: string;
  title: string;
  label: string;
  slug: string;
  image: string;
  hasGallery: boolean;
  hasCatalog: boolean;
  sortOrder?: number;
};

type ApiSectionListResponse = {
  items: ApiSectionListItem[];
};

const ItemSection: React.FC = () => {
  const [items, setItems] = useState<BuildItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await http.get<ApiSectionListResponse>("/sections");

        const mapped: BuildItem[] = (data.items ?? []).map((s) => ({
          id: s.id,
          title: s.title,
          label: s.label,
          slug: s.slug,
          image: s.image,
        }));

        const sorted = [...mapped].sort((a, b) =>
          (a.label || a.title).localeCompare(b.label || b.title, "ru")
        );

        if (mounted) setItems(sorted);
      } catch (e: any) {
        if (!mounted) return;
        setError(
          e?.response?.data?.message ||
          e?.message ||
          "Не удалось загрузить секции."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const hasItems = useMemo(() => items.length > 0, [items]);

  return (
    <section className="w-full bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Строим</h2>

          <Link
            to="/services"
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-lime-400 hover:text-lime-500"
          >
            все услуги
          </Link>
        </div>

        {loading && <p className="text-sm text-gray-600">Загрузка…</p>}

        {!loading && error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !error && !hasItems && (
          <p className="text-sm text-gray-600">Секции пока не добавлены.</p>
        )}

        {!loading && !error && hasItems && (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <ItemSectionCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ItemSection;
