import React from "react";
import { Link } from "react-router-dom";

export type SideMenuItem = {
  label: string;
  to: string;
};

export type SideMenuPageLayoutProps = {
  title: string;
  menuItems: SideMenuItem[];
  activePath: string;
  heroImage: string;
  heroAlt: string;
  children: React.ReactNode;
};

const SideMenuPageLayout: React.FC<SideMenuPageLayoutProps> = ({
                                                                 title,
                                                                 menuItems,
                                                                 activePath,
                                                                 heroImage,
                                                                 heroAlt,
                                                                 children,
                                                               }) => {
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:flex-row lg:gap-12">
        <aside className="w-full max-w-xs space-y-6">
          <nav className="border border-gray-200 text-sm">
            {menuItems.map((item) => {
              const isActive = item.to === activePath;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block border-b border-gray-200 px-5 py-3 last:border-b-0 ${
                    isActive
                      ? "bg-black text-lime-400 font-semibold"
                      : "bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border border-gray-200">
            <img
              src="/images/support.jpg"
              alt="Мы всегда на связи"
              className="w-full object-cover"
            />
          </div>

          <div className="border border-gray-200 text-sm">
            <button className="flex w-full items-center justify-between border-b border-gray-200 px-5 py-3 hover:bg-gray-50">
              <span className="flex items-center gap-2">
                <span>📞</span>
                <span>Заказать звонок</span>
              </span>
            </button>
            <button className="flex w-full items-center justify-between border-b border-gray-200 px-5 py-3 hover:bg-gray-50">
              <span className="flex items-center gap-2">
                <span>✉️</span>
                <span>Написать сообщение</span>
              </span>
            </button>
            <button className="flex w-full items-center justify-between border-b border-gray-200 px-5 py-3 hover:bg-gray-50">
              <span className="flex items-center gap-2">
                <span>💬</span>
                <span>Оставить отзыв</span>
              </span>
            </button>
            <button className="flex w-full items-center justify-between px-5 py-3 hover:bg-gray-50">
              <span className="flex items-center gap-2">
                <span>📍</span>
                <span>Ближайшая студия</span>
              </span>
            </button>
          </div>
        </aside>

        <div className="flex-1 space-y-8">
          <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>

          <div className="w-full border border-gray-200">
            <img
              src={heroImage}
              alt={heroAlt}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-gray-800">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideMenuPageLayout;
