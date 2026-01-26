import React from "react";
import { useQuickActions } from "../../components/QuickActionProvider";

const FaqPage: React.FC = () => {
  const { openAction } = useQuickActions();

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-semibold text-gray-900">
        Вопрос - ответ
      </h1>

      <div className="flex flex-col items-center gap-10 md:flex-row md:items-center">
        <div className="flex-shrink-0">
          <div className="h-64 w-64 overflow-hidden rounded-full md:h-72 md:w-72">
            <img
              src="/images/support2.jpg"
              alt="Консультант компании"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-6 md:max-w-xl">
          <p className="text-2xl font-semibold leading-snug text-gray-900 md:text-3xl">
            Хотите стать лучше, но не знаете, с чего начать?
          </p>

          <p className="text-sm leading-relaxed text-gray-700 md:text-base">
            Напишите нам или закажите звонок — мы ответим на ваши вопросы
            и поделимся советом.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => openAction("question")}
              className="
                bg-lime-400 px-8 py-3
                text-sm font-semibold uppercase tracking-wide text-black
                transition hover:bg-lime-300
              "
            >
              Задать вопрос
            </button>

            <button
              type="button"
              onClick={() => openAction("callback")}
              className="
                border border-gray-300 px-8 py-3
                text-sm font-semibold uppercase tracking-wide text-gray-800
                transition hover:bg-gray-50
              "
            >
              Заказать звонок
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
