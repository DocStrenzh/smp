import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import AuthDrawer from "../auth/AuthDrawer";

type Props = {
  open: boolean;
  onClose: () => void;
};

const BurgerMenu: React.FC<Props> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [q, setQ] = useState("");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) setQ("");
  }, [open]);

  if (!open) return null;

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const value = q.trim();
    if (!value) return;

    navigate(`/search?q=${encodeURIComponent(value)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть меню"
          className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
        >
          ✕
        </button>

        <div className="text-3xl font-extrabold tracking-tight">
          <span className="text-neutral-900">СМП</span>{" "}
          <span className="text-lime-500">97</span>
        </div>

        <div className="w-10" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <form onSubmit={submitSearch} className="flex items-center gap-6 border-b pb-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск"
            className="w-full border-0 bg-transparent px-0 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-300"
          />
          <button
            type="submit"
            className="h-11 rounded-none bg-lime-400 px-10 text-sm font-semibold text-neutral-900 hover:bg-lime-300"
          >
            Найти
          </button>
        </form>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1fr_1fr_340px]">
          <div>
            <div className="text-sm font-semibold text-lime-500">Услуги</div>
            <div className="mt-5 space-y-3 text-sm text-neutral-600">
              <Link className="block hover:text-neutral-900" to="/services" onClick={onClose}>
                Металлоконструкции
              </Link>
              <Link className="block hover:text-neutral-900" to="/services" onClick={onClose}>
                БСУ
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-neutral-900">Компания</div>
            <div className="mt-5 space-y-3 text-sm text-neutral-600">
              <Link className="block hover:text-neutral-900" to="/company" onClick={onClose}>
                О компании
              </Link>
              <Link className="block hover:text-neutral-900" to="/company/employees" onClick={onClose}>
                Сотрудники
              </Link>
              <Link className="block hover:text-neutral-900" to="/company/partners" onClick={onClose}>
                Партнеры
              </Link>
              <Link className="block hover:text-neutral-900" to="/company/reviews" onClick={onClose}>
                Отзывы
              </Link>
              <Link className="block hover:text-neutral-900" to="/company/certificates" onClick={onClose}>
                Сертификаты
              </Link>
              <Link className="block hover:text-neutral-900" to="/company/requisites" onClick={onClose}>
                Реквизиты
              </Link>
              <Link className="block hover:text-neutral-900" to="/company/faq" onClick={onClose}>
                Вопрос - ответ
              </Link>
              <Link className="block hover:text-neutral-900" to="/company/gallery" onClick={onClose}>
                Фотогалерея
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-neutral-900">Контакты</div>
            <div className="mt-5 space-y-3 text-sm text-neutral-600">
              <Link className="block hover:text-neutral-900" to="/contacts" onClick={onClose}>
                Контакты
              </Link>
            </div>
          </div>

          <div className="rounded-xl border bg-white">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div className="text-sm font-semibold text-neutral-900">Ваша корзина</div>
              <Link to="/cart" onClick={onClose} className="flex items-center gap-2 text-sm text-neutral-900">
                <span>🛒</span>
                <span className="font-semibold">0</span>
              </Link>
            </div>

            <div className="px-5 pt-5">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                title="Выбрать город"
              >
                <span className="flex items-center gap-2">
                  <span className="text-neutral-500">📍</span>
                  Воронеж
                </span>
                <span className="text-neutral-400">▾</span>
              </button>
            </div>

            <div className="px-5 pt-4">
              {!user ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsAuthOpen(true)}
                    className="flex w-full items-center justify-between rounded-lg bg-neutral-900 px-4 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
                    title="Войти в аккаунт"
                  >
                    <span className="flex items-center gap-2">
                      <span className="opacity-90">👤</span>
                      Войти
                    </span>
                    <span className="text-white/70">→</span>
                  </button>

                  <div className="mt-2 text-xs text-neutral-400">
                    Войдите, чтобы видеть заказы и корзину
                  </div>
                </>
              ) : (
                <div className="rounded-lg border px-4 py-3">
                  <div className="text-xs text-neutral-400">Вы вошли как</div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900">{user.name}</div>

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      className="h-10 flex-1 rounded-lg bg-neutral-900 px-4 text-sm font-semibold text-white hover:bg-neutral-800"
                    >
                      Личный кабинет
                    </button>
                    <button
                      type="button"
                      onClick={() => logout()}
                      className="h-10 flex-1 rounded-lg border px-4 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                    >
                      Выйти
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 border-t px-5 py-5 text-sm text-neutral-700">
              <div className="flex items-center gap-3">
                <span className="text-neutral-400">📞</span>
                <div>
                  <div className="font-semibold text-neutral-900">+7 (920) 461-18-01</div>
                  <button type="button" className="mt-1 text-xs font-semibold text-neutral-400 hover:text-neutral-600">
                    ЗАКАЗАТЬ ЗВОНОК
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <span className="text-neutral-400">✉️</span>
                <span>01@sp01.ru</span>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <span className="pt-0.5 text-neutral-400">📍</span>
                <span>г. Воронеж, Монтажный проезд, д. 5/1</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-lime-400 px-5 py-4 text-sm font-semibold text-neutral-900 hover:bg-lime-300"
            >
              Задать вопрос
            </button>
          </div>
        </div>
      </div>

      <AuthDrawer
        open={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
};

export default BurgerMenu;
