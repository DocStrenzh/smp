import React from "react";
import { Link } from "react-router-dom";
import { useQuickActions } from "../components/QuickActionProvider";

const ContactPage: React.FC = () => {
  const { openAction } = useQuickActions();

  const mapSrc =
    "https://yandex.ru/map-widget/v1/?um=constructor%3A03eeb9515b57dab189fdbb8ae21360379bb50ed4a9de62316915ef081ce01bea&source=constructor";

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 pb-6 pt-8">
        <div className="text-xs text-gray-400">
          <Link to="/" className="hover:text-gray-600">
            Главная
          </Link>
          <span> &nbsp;-&nbsp; </span>
          <span>Контакты</span>
        </div>

        <h1 className="mt-4 text-4xl font-medium text-gray-900">Контакты</h1>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-gray-700">
          Мы подготовили для вас универсальный корпоративный сайт с конструктором дизайна,
          посадочными страницами и адаптивной версткой. Ниже вы найдёте карту, адрес офиса
          и контактные телефоны.
        </p>
      </div>

      <div className="w-full">
        <div className="h-[420px] w-full md:h-[520px]">
          <iframe
            src={mapSrc}
            title="Yandex Map"
            className="h-full w-full"
            frameBorder={0}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-8 text-2xl font-medium text-gray-900">Воронежская область</h2>

        <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
          <div className="grid gap-8 p-6 md:grid-cols-[260px,1fr,1fr,160px] md:items-center">
            <div className="h-40 w-full overflow-hidden bg-gray-100">
              <img
                src="/images/office.jpg"
                alt="Офис СМП-97"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-2 text-sm text-gray-800">
              <p className="font-semibold">г. Воронеж, Монтажный проезд, д. 5/1</p>
              <p className="text-xs text-gray-500">Въезд с улицы Ильюшина</p>
              <p className="text-xs text-gray-500">
                Режим работы: <span className="font-medium">09:00 – 20:00</span>
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-800">
              <div>
                <p className="font-semibold">+7 (920) 461-18-01</p>
                <p className="text-xs text-gray-500">основной телефон</p>
              </div>

              <div>
                <p className="font-semibold">+7 (905) 050-61-63</p>
                <p className="text-xs text-gray-500">дополнительный номер</p>
              </div>

              <div>
                <a
                  href="mailto:01@sp01.ru"
                  className="font-semibold text-lime-400 hover:text-lime-300"
                >
                  01@sp01.ru
                </a>
                <p className="text-xs text-gray-500">электронная почта</p>
              </div>
            </div>

            <div className="flex md:justify-end">
              <button
                type="button"
                onClick={() => openAction("question")}
                className="w-full bg-lime-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black shadow-md transition hover:bg-lime-300"
              >
                Написать
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => openAction("map")}
            className="text-sm font-semibold text-gray-700 hover:text-gray-900"
          >
            Открыть карту в боковом меню →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
