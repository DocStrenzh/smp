import React, { useMemo, useState } from "react";
import EmptyCart from "./EmptyCart";
import { useCart } from "../../cart/CartProvider";
import { useCatalog } from "../../catalog/CatalogProvider";
import { ordersApi } from "../../api/ordersApi";

type CheckoutForm = {
  company: string;
  email: string;
  address: string;
  comment: string;
  name: string;
  phone: string;
  agree: boolean;
};

const CartPage: React.FC = () => {
  const { items, isReady, setQty, remove, clear } = useCart();
  const { loading: catalogLoading, error: catalogError, products } = useCatalog();

  const [form, setForm] = useState<CheckoutForm>({
    company: "",
    email: "",
    address: "",
    comment: "",
    name: "",
    phone: "",
    agree: false,
  });

  const [sending, setSending] = useState(false);

  const lines = useMemo(() => {
    const map = new Map(products.map((p) => [String(p.id), p]));

    return items
      .map((i) => {
        const p = map.get(String(i.productId));
        if (!p) return null;

        const old = p.oldPrice ?? p.price;
        return {
          item: i,
          product: p,
          sum: p.price * i.qty,
          oldSum: old * i.qty,
        };
      })
      .filter(Boolean) as Array<{
      item: { productId: string; qty: number };
      product: (typeof products)[number];
      sum: number;
      oldSum: number;
    }>;
  }, [items, products]);

  const totals = useMemo(() => {
    const total = lines.reduce((acc, l) => acc + l.sum, 0);
    const oldTotal = lines.reduce((acc, l) => acc + l.oldSum, 0);
    const savings = Math.max(0, oldTotal - total);
    return { total, oldTotal, savings };
  }, [lines]);

  const hasItems = items.length > 0;

  const formatRub = (value: number) => `${value.toLocaleString("ru-RU")} ₽`;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    if (!items.length) return alert("Корзина пуста");
    if (!form.name.trim()) return alert("Введите имя");
    if (!form.phone.trim()) return alert("Введите телефон");
    if (!form.agree) return alert("Нужно согласие на обработку персональных данных");

    const payload = {
      companyName: form.company.trim(),
      email: form.email.trim(),
      deliveryAddress: form.address.trim(),
      comment: form.comment.trim(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      consent: form.agree,
      items: items.map((i) => ({
        productId: String(i.productId),
        qty: Number(i.qty),
      })),
    };

    setSending(true);
    try {
      await ordersApi.createOrder(payload);
      alert("Заказ отправлен!");
      clear();
      setForm({
        company: "",
        email: "",
        address: "",
        comment: "",
        name: "",
        phone: "",
        agree: false,
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Не удалось отправить заказ. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  };

  if (!isReady) return null;

  if (!hasItems) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 text-xs text-gray-400">
          Главная <span className="mx-1">/</span> Корзина
        </div>
        <h1 className="mb-10 text-3xl font-semibold text-gray-900">Корзина</h1>
        <EmptyCart />
      </div>
    );
  }

  if (catalogLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 text-xs text-gray-400">
          Главная <span className="mx-1">/</span> Корзина
        </div>
        <h1 className="mb-10 text-3xl font-semibold text-gray-900">Корзина</h1>
        <div className="text-sm text-neutral-600">Загрузка товаров...</div>
      </div>
    );
  }

  if (catalogError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 text-xs text-gray-400">
          Главная <span className="mx-1">/</span> Корзина
        </div>
        <h1 className="mb-10 text-3xl font-semibold text-gray-900">Корзина</h1>

        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Не удалось загрузить каталог: {catalogError}
        </div>

        <button
          type="button"
          onClick={clear}
          className="mt-6 h-12 w-52 bg-lime-400 text-xs font-semibold uppercase tracking-wide text-black hover:bg-lime-300"
        >
          Очистить корзину
        </button>
      </div>
    );
  }

  const missingCount = items.length - lines.length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6 text-xs text-gray-400">
        Главная <span className="mx-1">/</span> Корзина
      </div>

      <h1 className="mb-10 text-3xl font-semibold text-gray-900">Корзина</h1>

      {missingCount > 0 && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          В корзине есть товары, которых больше нет в каталоге: {missingCount}. Их можно удалить или очистить корзину.
        </div>
      )}

      <div className="hidden grid-cols-[1fr_160px_180px_160px_40px] items-center gap-4 border-b pb-3 text-xs font-semibold uppercase tracking-wide text-neutral-400 md:grid">
        <div>Наименование</div>
        <div className="text-right">Цена</div>
        <div className="text-center">Количество</div>
        <div className="text-right">Сумма</div>
        <div />
      </div>

      <div className="divide-y">
        {lines.map(({ item, product, sum }) => (
          <div
            key={item.productId}
            className="grid grid-cols-1 gap-4 py-6 md:grid-cols-[1fr_160px_180px_160px_40px] md:items-center"
          >
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-50">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain p-2"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-neutral-400">
                    IMG
                  </div>
                )}

                {typeof product.salePercent === "number" && (
                  <div className="absolute -left-2 -top-2 rounded-full bg-red-500 px-2 py-1 text-[10px] font-semibold text-white">
                    {product.salePercent}%
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="font-semibold text-neutral-900">{product.title}</div>
                <div
                  className={[
                    "mt-1 text-xs font-semibold",
                    product.inStock ? "text-green-600" : "text-neutral-400",
                  ].join(" ")}
                >
                  {product.inStock ? "В НАЛИЧИИ" : "НЕТ В НАЛИЧИИ"}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold text-neutral-900">{formatRub(product.price)}</div>
              {product.oldPrice && (
                <div className="mt-1 text-sm text-neutral-400 line-through">
                  {formatRub(product.oldPrice)}
                </div>
              )}
            </div>

            <div className="flex items-center justify-start gap-2 md:justify-center">
              <button
                type="button"
                onClick={() => setQty(item.productId, item.qty - 1)}
                className="h-9 w-9 rounded-md border text-lg leading-none hover:bg-neutral-50"
              >
                −
              </button>

              <input
                value={item.qty}
                onChange={(e) => setQty(item.productId, Number(e.target.value))}
                className="h-9 w-14 rounded-md border text-center text-sm outline-none"
                inputMode="numeric"
              />

              <button
                type="button"
                onClick={() => setQty(item.productId, item.qty + 1)}
                className="h-9 w-9 rounded-md border text-lg leading-none hover:bg-neutral-50"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <div className="font-semibold text-neutral-900">{formatRub(sum)}</div>
            </div>

            <button
              type="button"
              onClick={() => remove(item.productId)}
              className="justify-self-end rounded-md p-2 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-700"
              aria-label="Удалить"
              title="Удалить"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={onSubmit} className="rounded-xl border bg-white p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border text-neutral-500">
              i
            </div>
            <div>
              <div className="text-lg font-semibold text-neutral-900">Оформление заказа</div>
              <div className="mt-1 text-sm text-neutral-500">
                Заполните простую форму, и наши менеджеры свяжутся с вами, ответят на любые вопросы и подготовят счет на
                оплату.
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <Input
              placeholder="Название компании"
              value={form.company}
              onChange={(v) => setForm((s) => ({ ...s, company: v }))}
            />
            <Input
              placeholder="E-Mail"
              value={form.email}
              onChange={(v) => setForm((s) => ({ ...s, email: v }))}
            />
            <Input
              placeholder="Адрес доставки"
              value={form.address}
              onChange={(v) => setForm((s) => ({ ...s, address: v }))}
            />
            <Input
              placeholder="Комментарий к заказу"
              value={form.comment}
              onChange={(v) => setForm((s) => ({ ...s, comment: v }))}
            />
            <Input
              placeholder="Ваше имя *"
              value={form.name}
              onChange={(v) => setForm((s) => ({ ...s, name: v }))}
            />
            <Input
              placeholder="Ваш телефон *"
              value={form.phone}
              onChange={(v) => setForm((s) => ({ ...s, phone: v }))}
            />

            <label className="flex items-center gap-3 text-sm text-neutral-600">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setForm((s) => ({ ...s, agree: e.target.checked }))}
              />
              <span>
                Я согласен на обработку{" "}
                <span className="text-lime-600">персональных данных</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={sending}
              className="h-12 w-52 bg-lime-400 text-xs font-semibold uppercase tracking-wide text-black hover:bg-lime-300 disabled:opacity-60"
            >
              {sending ? "Отправляем..." : "Оформить заказ"}
            </button>
          </div>
        </form>

        <aside className="rounded-xl border bg-white p-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="text-lg font-semibold text-neutral-900">Ваш заказ</div>
            <button
              type="button"
              onClick={clear}
              className="text-xs font-semibold uppercase tracking-wide text-lime-600 hover:text-lime-700"
            >
              Очистить корзину
            </button>
          </div>

          <div className="mt-6 rounded-xl border p-5">
            <div className="flex items-end justify-between">
              <div className="text-sm text-neutral-600">Итого:</div>
              <div className="text-xl font-semibold text-neutral-900">{formatRub(totals.total)}</div>
            </div>

            {totals.oldTotal > totals.total && (
              <div className="mt-2 flex items-center justify-end gap-3">
                <div className="text-sm text-neutral-400 line-through">{formatRub(totals.oldTotal)}</div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-end gap-3">
              <div className="text-sm text-neutral-500">Экономия</div>
              <div className="rounded bg-lime-400 px-3 py-1 text-sm font-semibold text-black">
                {formatRub(totals.savings)}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;

function Input(props: { placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <input
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className="w-full border-b border-neutral-200 bg-transparent py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-300"
    />
  );
}
