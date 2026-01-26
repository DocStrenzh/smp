import React from "react";
import {useQuickActions} from "../components/QuickActionProvider";

const HouseForm: React.FC = () => {
  const {openAction} = useQuickActions()

  return (
    <section
      className="relative w-full bg-cover bg-center py-24"
      style={{ backgroundImage: `url('/images/build-house-bg.jpg')` }}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />

      <div className="relative mx-auto max-w-5xl px-4 py-6 text-center bg-white/40 backdrop-blur-sm">
        <h2 className="text-3xl font-semibold text-gray-900">
          Хотите построить дом?
        </h2>
        <p className="mt-3 text-xl font-semibold text-gray-900">
          Получите расчет прямо сейчас!
        </p>
        <p className="mt-4 text-gray-800">
          Напишите нам или закажите звонок — мы ответим на Ваши вопросы уже через 5 минут.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            className="bg-lime-400 px-10 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-lime-300"
            onClick={() => openAction("question")}
          >
            Задать вопрос
          </button>

          <button
            type="button"
            className="border-2 border-lime-400 px-10 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-lime-300 hover:text-black"
            onClick={() => openAction("callback")}
          >
            Заказать звонок
          </button>
        </div>
      </div>
    </section>
  );
};

export default HouseForm;
