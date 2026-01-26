import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuickActions } from "../components/QuickActionProvider"

type TopItemId = "services" | "company" | null;

const servicesLinks = [
  { label: "Металлоконструкции", to: "/services/metal" },
  { label: "БСУ", to: "/services/bsu" },
  { label: "БПС", to: "/services/bps" },
];

const companyLinks = [
  { label: "О компании", to: "/company" },
  { label: "Сотрудники", to: "/company/staff" },
  { label: "Партнеры", to: "/company/partners" },
  { label: "Отзывы", to: "/company/reviews" },
  { label: "Сертификаты", to: "/company/certificates" },
  { label: "Реквизиты", to: "/company/requisites" },
  { label: "Вопрос - ответ", to: "/company/faq" },
  { label: "Фотогалерея", to: "/company/gallery" },
];

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState<TopItemId>(null);
  const { openAction } = useQuickActions();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <nav
      className="relative w-full max-h-20 bg-black text-white"
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <ul className="flex items-center gap-6 text-[11px] sm:text-xs font-semibold uppercase tracking-wide">
          <li>
            <Link
              to="/"
              className={`block py-3 sm:py-4 transition-colors ${
                isActive("/") ? "text-lime-400" : "hover:text-lime-400"
              }`}
            >
              Главная
            </Link>
          </li>

          <li onMouseEnter={() => setOpenMenu("services")} className="relative">
            <Link
              to="/services"
              className={`block py-3 sm:py-4 transition-colors ${
                isActive("/services") || openMenu === "services"
                  ? "text-lime-400"
                  : "hover:text-lime-400"
              }`}
            >
              Услуги
            </Link>
          </li>

          <li onMouseEnter={() => setOpenMenu("company")} className="relative">
            <Link
              to="/company"
              className={`block py-3 sm:py-4 transition-colors ${
                isActive("/company") || openMenu === "company"
                  ? "text-lime-400"
                  : "hover:text-lime-400"
              }`}
            >
              Компания
            </Link>
          </li>

          <li>
            <Link
              to="/contacts"
              className={`block py-3 sm:py-4 transition-colors ${
                isActive("/contacts") ? "text-lime-400" : "hover:text-lime-400"
              }`}
            >
              Контакты
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => openAction("callback")}
          className="ml-4 bg-lime-400 px-5 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-black shadow-md transition hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300/60"
        >
          Оставить звонок
        </button>
      </div>

      {openMenu && (
        <div className="absolute left-0 right-0 flex justify-center">
          <div className="mx-auto mt-0.5 w-full max-w-5xl bg-white text-gray-900 shadow-xl">
            {openMenu === "services" && (
              <div className="grid grid-cols-3 gap-0">
                {servicesLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="border-r border-b border-gray-100 px-6 py-4 text-sm hover:bg-gray-50 last:border-r-0"
                    onClick={() => setOpenMenu(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {openMenu === "company" && (
              <div className="grid grid-cols-1 gap-0">
                {companyLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="border-b border-gray-100 px-6 py-4 text-sm hover:bg-gray-50"
                    onClick={() => setOpenMenu(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
