import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useQuickActions } from "../components/QuickActionProvider"; // проверь путь: у тебя components/QuickActionProvider.tsx

const companyLinks = [
  { to: "/company", label: "О компании", end: true },
  { to: "/company/employees", label: "Сотрудники" },
  { to: "/company/partners", label: "Партнёры" },
  { to: "/company/reviews", label: "Отзывы" },
  { to: "/company/certificates", label: "Сертификаты" },
  { to: "/company/requisites", label: "Реквизиты" },
  { to: "/company/faq", label: "Вопрос - ответ" },
  { to: "/company/gallery", label: "Фотогалерея" },
];

const CompanyLayout: React.FC = () => {
  const { openAction } = useQuickActions();

  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <nav className="border border-gray-100">
              {companyLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    [
                      "block border-b border-gray-100 px-6 py-4 text-sm",
                      "hover:bg-gray-50",
                      isActive ? "bg-gray-50 font-semibold" : "bg-white",
                    ].join(" ")
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-8 space-y-4">
              <div className="w-full overflow-hidden rounded-sm bg-gray-100">
                <img
                  src="/images/support.jpg"
                  alt="Мы всегда на связи"
                  className="w-full object-cover"
                />
              </div>

              <div className="border border-gray-100">
                <button
                  type="button"
                  onClick={() => openAction("callback")}
                  className="flex w-full items-center justify-between px-6 py-3 text-sm hover:bg-gray-50"
                >
                  <span>Заказать звонок</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAction("question")}
                  className="flex w-full items-center justify-between border-t border-gray-100 px-6 py-3 text-sm hover:bg-gray-50"
                >
                  <span>Написать сообщение</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAction("review")}
                  className="flex w-full items-center justify-between border-t border-gray-100 px-6 py-3 text-sm hover:bg-gray-50"
                >
                  <span>Оставить отзыв</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAction("map")}
                  className="flex w-full items-center justify-between border-t border-gray-100 px-6 py-3 text-sm hover:bg-gray-50"
                >
                  <span>Ближайшая студия</span>
                </button>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyLayout;
