import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuickActions } from "../components/QuickActionProvider";

export interface ServiceItem {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface ServiceListLayoutProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  introParagraphs: string[];
  services: ServiceItem[];
  supportImage: string;
}

const ServiceListLayout: React.FC<ServiceListLayoutProps> = ({
                                                               title,
                                                               breadcrumbs,
                                                               introParagraphs,
                                                               services,
                                                               supportImage,
                                                             }) => {
  const { openAction } = useQuickActions();

  const [activeServiceId, setActiveServiceId] = useState<string>("");

  useEffect(() => {
    if (!activeServiceId && services.length > 0) {
      setActiveServiceId(services[0].id);
    }
  }, [services, activeServiceId]);

  const handleServiceClick = (id: string) => {
    setActiveServiceId(id);
    const el = document.getElementById(`service-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto max-w-6xl px-4">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="text-xs text-gray-400">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label}>
                {index > 0 && <span> &nbsp;-&nbsp; </span>}
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-gray-600">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </div>
        )}

        <h1 className="mb-8 mt-4 text-3xl font-semibold text-gray-900">{title}</h1>

        <div className="grid gap-10 lg:grid-cols-[260px,1fr]">
          <aside className="space-y-6">
            <div className="border border-gray-200 bg-white">
              {services.map((service) => {
                const isActive = service.id === activeServiceId;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceClick(service.id)}
                    className={[
                      "block w-full px-5 py-4 font-AppFont text-left text-sm transition",
                      isActive
                        ? "bg-lime-400 font-semibold text-black"
                        : "bg-white text-gray-800 hover:bg-gray-50",
                    ].join(" ")}
                  >
                    {service.name}
                  </button>
                );
              })}
            </div>

            <div className="overflow-hidden border border-gray-200 bg-white">
              <img src={supportImage} alt="Мы всегда на связи" className="w-full object-cover" />
            </div>

            <div className="space-y-1">
              <button
                type="button"
                onClick={() => openAction("callback")}
                className="flex w-full items-center gap-3 border border-gray-200 bg-white px-5 py-4 font-AppFont text-left text-sm hover:bg-gray-50"
              >
                <span className="text-lg">📞</span>
                <span>Заказать звонок</span>
              </button>

              <button
                type="button"
                onClick={() => openAction("question")}
                className="flex w-full items-center gap-3 border border-gray-200 bg-white px-5 py-4 text-left text-sm hover:bg-gray-50"
              >
                <span className="text-lg">✉️</span>
                <span>Написать сообщение</span>
              </button>

              <button
                type="button"
                onClick={() => openAction("review")}
                className="flex w-full items-center gap-3 border border-gray-200 bg-white px-5 py-4 font-AppFont text-left text-sm hover:bg-gray-50"
              >
                <span className="text-lg">💬</span>
                <span>Оставить отзыв</span>
              </button>

              <button
                type="button"
                onClick={() => openAction("map")}
                className="flex w-full items-center gap-3 border border-gray-200 bg-white px-5 py-4 font-AppFont text-left text-sm hover:bg-gray-50"
              >
                <span className="text-lg">📍</span>
                <span>Ближайшая студия</span>
              </button>
            </div>
          </aside>

          <div className="space-y-8">
            <div className="space-y-4 text-sm leading-relaxed text-gray-700">
              {introParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="space-y-6">
              {services.map((service) => (
                <Link
                  key={service.id}
                  id={`service-${service.id}`}
                  to={`/services/${service.slug}`}
                  className="flex flex-col overflow-hidden border border-gray-200 bg-white transition hover:shadow-md md:flex-row"
                >
                  <div className="md:w-1/3">
                    <img src={service.image} alt={service.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 items-center px-6 py-6 font-AppFont text-base text-gray-900">
                    {service.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceListLayout;
