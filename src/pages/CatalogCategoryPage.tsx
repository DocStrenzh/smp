import React, { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useCatalog } from "../catalog/CatalogProvider";
import type { CatalogProduct } from "../api/catalogApi";
import { useCart } from "../cart/CartProvider";

type Params = { categorySlug: string };
type SortKey = "name-asc" | "price-asc" | "price-desc";

const badgeLabel: Record<string, string> = {
  hit: "ХИТ",
  new: "НОВИНКА",
  sale: "СКИДКА",
  recommended: "РЕКОМЕНД.",
  eco: "ECO",
};

function uniqSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, "ru"));
}

export default function CatalogCategoryPage() {
  const { categorySlug = "instrument" } = useParams<Params>();
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionFromUrl = searchParams.get("section");

  const { loading, error, getCategoryBySlug, getSectionsByCategorySlug, getProductsByCategorySlug } = useCatalog();

  const category = useMemo(() => getCategoryBySlug(categorySlug), [getCategoryBySlug, categorySlug]);
  const sections = useMemo(() => getSectionsByCategorySlug(categorySlug), [getSectionsByCategorySlug, categorySlug]);
  const allProducts = useMemo(() => getProductsByCategorySlug(categorySlug), [getProductsByCategorySlug, categorySlug]);

  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("name-asc");

  const priceMinMax = useMemo(() => {
    const prices = allProducts.map((p) => p.price);
    const min = prices.length ? Math.min(...prices) : 0;
    const max = prices.length ? Math.max(...prices) : 0;
    return { min, max };
  }, [allProducts]);

  const [priceFrom, setPriceFrom] = useState<number>(priceMinMax.min);
  const [priceTo, setPriceTo] = useState<number>(priceMinMax.max);

  React.useEffect(() => {
    setPriceFrom(priceMinMax.min);
    setPriceTo(priceMinMax.max);
    setOnlyInStock(false);
    setSelectedBrands([]);
    setSelectedTypes([]);
    setSort("name-asc");

    if (sectionFromUrl && !sections.some((s) => s.slug === sectionFromUrl)) {
      setSearchParams({}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug, priceMinMax.min, priceMinMax.max, sections.length]);

  const brandOptions = useMemo(() => uniqSorted(allProducts.map((p) => p.brand)), [allProducts]);
  const typeOptions = useMemo(() => uniqSorted(allProducts.map((p) => p.type)), [allProducts]);

  const filtered = useMemo(() => {
    let items = [...allProducts];

    if (sectionFromUrl) items = items.filter((p) => p.sectionSlug === sectionFromUrl);
    if (onlyInStock) items = items.filter((p) => p.inStock);

    items = items.filter((p) => p.price >= priceFrom && p.price <= priceTo);

    if (selectedBrands.length) items = items.filter((p) => selectedBrands.includes(p.brand));
    if (selectedTypes.length) items = items.filter((p) => selectedTypes.includes(p.type));

    items.sort((a, b) => {
      if (sort === "name-asc") return a.title.localeCompare(b.title, "ru");
      if (sort === "price-asc") return a.price - b.price;
      return b.price - a.price;
    });

    return items;
  }, [allProducts, sectionFromUrl, onlyInStock, priceFrom, priceTo, selectedBrands, selectedTypes, sort]);

  const setSection = (slug: string | null) => {
    if (!slug) {
      setSearchParams({}, { replace: false });
      return;
    }
    setSearchParams({ section: slug }, { replace: false });
  };

  if (loading) return <div className="mx-auto max-w-6xl px-4 py-10">Загрузка…</div>;
  if (error) return <div className="mx-auto max-w-6xl px-4 py-10 text-red-600">{error}</div>;

  if (!category) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-xl font-semibold">Категория не найдена</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="text-sm text-neutral-500">
        <Link className="hover:text-neutral-700" to="/">Главная</Link>
        <span className="mx-2">-</span>
        <Link className="hover:text-neutral-700" to="/catalog">Продукция</Link>
        <span className="mx-2">-</span>
        <span>{category.title}</span>
      </div>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{category.title}</h1>

      {sections.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(sectionFromUrl === s.slug ? null : s.slug)}
              className={[
                "group relative overflow-hidden rounded-xl border bg-white p-4 text-left shadow-sm transition",
                sectionFromUrl === s.slug ? "border-lime-400 ring-2 ring-lime-200" : "hover:shadow",
              ].join(" ")}
            >
              <div className="flex items-center gap-4">
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-neutral-500">Раздел</div>
                  <div className="mt-1 font-semibold text-neutral-900">{s.title}</div>
                  <div className="mt-2 text-sm text-neutral-500">
                    {allProducts.filter((p) => p.sectionSlug === s.slug).length} товаров
                  </div>
                </div>

                <div className="h-16 w-16 shrink-0 rounded-lg bg-neutral-50 p-2">
                  {s.image ? (
                    <img src={s.image} alt={s.title} className="h-full w-full object-contain" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-neutral-400">
                      IMG
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">
          <FilterCard
            sections={sections.map((s) => ({ slug: s.slug, title: s.title }))}
            activeSection={sectionFromUrl}
            setActiveSection={setSection}
            priceMin={priceMinMax.min}
            priceMax={priceMinMax.max}
            priceFrom={priceFrom}
            setPriceFrom={setPriceFrom}
            priceTo={priceTo}
            setPriceTo={setPriceTo}
            onlyInStock={onlyInStock}
            setOnlyInStock={setOnlyInStock}
            brandOptions={brandOptions}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            typeOptions={typeOptions}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            sort={sort}
            setSort={setSort}
          />
        </aside>

        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-neutral-600">
              Найдено: <span className="font-semibold text-neutral-900">{filtered.length}</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function FilterCard(props: {
  sections: { slug: string; title: string }[];
  activeSection: string | null;
  setActiveSection: (v: string | null) => void;

  priceMin: number;
  priceMax: number;
  priceFrom: number;
  setPriceFrom: (v: number) => void;
  priceTo: number;
  setPriceTo: (v: number) => void;

  onlyInStock: boolean;
  setOnlyInStock: (v: boolean) => void;

  brandOptions: string[];
  selectedBrands: string[];
  setSelectedBrands: (v: string[]) => void;

  typeOptions: string[];
  selectedTypes: string[];
  setSelectedTypes: (v: string[]) => void;

  sort: SortKey;
  setSort: (v: SortKey) => void;
}) {
  const toggle = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold text-neutral-800">ФИЛЬТР</div>

      {!!props.sections.length && (
        <div className="mt-4">
          <div className="text-sm font-semibold text-neutral-800">Раздел</div>
          <div className="mt-2 space-y-2">
            {props.sections.map((s) => (
              <label key={s.slug} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="section"
                  checked={props.activeSection === s.slug}
                  onChange={() => props.setActiveSection(s.slug)}
                />
                <span className="text-neutral-700">{s.title}</span>
              </label>
            ))}

            <button
              type="button"
              className="text-sm text-neutral-500 hover:text-neutral-700"
              onClick={() => props.setActiveSection(null)}
            >
              Сбросить раздел
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 border-t pt-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-neutral-800">Цена</div>
          <div className="text-xs text-neutral-500">
            {props.priceMin} — {props.priceMax}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <input
            className="rounded-lg border px-3 py-2 text-sm"
            type="number"
            value={props.priceFrom}
            min={props.priceMin}
            max={props.priceTo}
            onChange={(e) => props.setPriceFrom(Number(e.target.value))}
            placeholder="От"
          />
          <input
            className="rounded-lg border px-3 py-2 text-sm"
            type="number"
            value={props.priceTo}
            min={props.priceFrom}
            max={props.priceMax}
            onChange={(e) => props.setPriceTo(Number(e.target.value))}
            placeholder="До"
          />
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="text-sm font-semibold text-neutral-800">Наличие</div>
        <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
          <input type="checkbox" checked={props.onlyInStock} onChange={(e) => props.setOnlyInStock(e.target.checked)} />
          В наличии
        </label>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="text-sm font-semibold text-neutral-800">Бренд</div>
        <div className="mt-2 space-y-2">
          {props.brandOptions.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={props.selectedBrands.includes(b)}
                onChange={() => props.setSelectedBrands(toggle(props.selectedBrands, b))}
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="text-sm font-semibold text-neutral-800">Тип</div>
        <div className="mt-2 space-y-2">
          {props.typeOptions.map((t) => (
            <label key={t} className="flex cursor-pointer items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={props.selectedTypes.includes(t)}
                onChange={() => props.setSelectedTypes(toggle(props.selectedTypes, t))}
              />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="text-sm font-semibold text-neutral-800">Сортировка</div>
        <select
          className="mt-2 w-full rounded-lg border bg-white px-3 py-2 text-sm"
          value={props.sort}
          onChange={(e) => props.setSort(e.target.value as SortKey)}
        >
          <option value="name-asc">По наименованию (A-Я)</option>
          <option value="price-asc">По цене (дешевле)</option>
          <option value="price-desc">По цене (дороже)</option>
        </select>
      </div>
    </div>
  );
}

function ProductCard({ p }: { p: CatalogProduct }) {
  const { add } = useCart();

  return (
    <div className="relative overflow-hidden rounded-xl border bg-white p-4 shadow-sm transition hover:shadow">
      <div className="pointer-events-none absolute left-3 top-3 z-30 flex flex-wrap gap-2">
        {p.badges?.map((b) => (
          <Badge key={b} badge={b as any} />
        ))}
      </div>

      {typeof p.salePercent === "number" && (
        <div className="pointer-events-none absolute left-3 top-14 z-30 rounded-full bg-red-500 px-3 py-2 text-xs font-semibold text-white">
          {p.salePercent}%
        </div>
      )}

      <div className="relative z-0 mt-8 flex h-44 items-center justify-center rounded-lg bg-neutral-50">
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="h-full w-full object-contain p-3"
            loading="lazy"
          />
        ) : (
          <div className="text-xs text-neutral-400">IMG</div>
        )}
      </div>

      <div className="mt-3 text-sm font-semibold leading-snug">{p.title}</div>

      <div className={["mt-2 text-xs font-semibold", p.inStock ? "text-green-600" : "text-neutral-400"].join(" ")}>
        {p.inStock ? "В НАЛИЧИИ" : "НЕТ В НАЛИЧИИ"}
      </div>

      <div className="mt-2 flex items-end gap-2">
        <div className="text-lg font-bold">{formatRub(p.price)}</div>
        {p.oldPrice && <div className="text-sm text-neutral-400 line-through">{formatRub(p.oldPrice)}</div>}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-neutral-500">
          {p.brand} • {p.type}
        </div>

        <button
          type="button"
          onClick={() => add(p.id, 1)}
          className="rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-neutral-50"
          title="В корзину"
        >
          🛒
        </button>
      </div>
    </div>
  );
}


function Badge({ badge }: { badge: string }) {
  const cls =
    badge === "hit"
      ? "bg-orange-500 text-white"
      : badge === "new"
        ? "bg-sky-500 text-white"
        : badge === "sale"
          ? "bg-pink-500 text-white"
          : badge === "recommended"
            ? "bg-green-600 text-white"
            : "bg-neutral-700 text-white";

  return <div className={["rounded-full px-3 py-1 text-xs font-semibold", cls].join(" ")}>{badgeLabel[badge] ?? badge}</div>;
}

function formatRub(value: number) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}
