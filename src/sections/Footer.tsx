import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const { pathname } = useLocation();

  const companyLinks = [
    { to: "/company", label: "О компании" },
    { to: "/company/employees", label: "Сотрудники" },
    { to: "/company/partners", label: "Партнёры" },
    { to: "/company/reviews", label: "Отзывы" },
    { to: "/company/certificates", label: "Сертификаты" },
    { to: "/company/requisites", label: "Реквизиты" },
    { to: "/company/faq", label: "Вопрос — ответ" },
    { to: "/company/gallery", label: "Фотогалерея" },
  ];

  const isCompanyLinkActive = (to: string) => {
    if (to === "/company") {
      return pathname === "/company";
    }

    return pathname === to || pathname.startsWith(`${to}/`);
  };

  return (
    <footer className="w-full bg-[#2f3237] text-gray-300 py-12">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-white font-semibold mb-4">УСЛУГИ</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Металлоконструкции</a></li>
            <li><a href="#" className="hover:text-white">БСУ</a></li>
            <li><a href="#" className="hover:text-white">БПС</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">КОМПАНИЯ</h3>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((link) => {
              const isActive = isCompanyLinkActive(link.to);

              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`transition ${
                      isActive
                        ? "text-lime-400 font-semibold"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">КОНТАКТЫ</h3>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-lime-400">📞</span>
              <div>
                <p className="text-white font-semibold">+7 (920) 461-18-01</p>
                <p className="text-[11px] uppercase text-gray-400">заказать звонок</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lime-400">✉️</span>
              <p>01@sp01.ru</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-lime-400">📍</span>
              <p>г. Воронеж, Монтажный проезд, д. 5/1</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start">
          <button className="w-full bg-[#3a3d41] border border-gray-500 px-6 py-3 text-sm rounded-md flex justify-between items-center hover:bg-gray-600 transition">
            ПОДПИСКА НА РАССЫЛКУ
            <span className="bg-gray-600 text-white px-2 py-1 rounded-full">→</span>
          </button>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
        © СМП97. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
