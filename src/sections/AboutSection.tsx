import React from "react";
import {useQuickActions} from "../components/QuickActionProvider";
import {Link} from "react-router-dom";

const AboutSection: React.FC = () => {
  const { openAction } = useQuickActions()

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto flex w-full flex-col lg:flex-row lg:items-stretch">
        <div className="flex w-full lg:w-1/2 justify-center lg:justify-end pr-10 px-4">

          <div className="w-full max-w-[540px] font-AppFont">

            <h2 className="mb-6 text-3xl font-semibold text-gray-900">
              О компании
            </h2>

            <p className="mb-6 text-base leading-relaxed text-gray-800 font-semibold">
              Хотите построить дом своей мечты? Мы предлагаем полный цикл услуг по строительству
              частных домов под ключ!
            </p>

            <p className="mb-4 text-sm text-gray-800">
              Наши преимущества:
            </p>

            <div className="space-y-3 text-sm leading-relaxed text-gray-700">
              <p>
                Индивидуальный подход: Мы разработаем проект, учитывающий ваши пожелания и бюджет.
              </p>
              <p>
                Качественные материалы: Используем только надёжные и проверенные материалы
                для долговечности вашего дома.
              </p>
              <p>
                Опытная команда: Наши специалисты имеют богатый опыт в строительстве
                и гарантируют высокое качество выполнения работ.
              </p>
              <p>
                Соблюдение сроков: Мы ценим ваше время и придерживаемся согласованных
                сроков выполнения работ.
              </p>
              <p>
                Послепродажное обслуживание: Мы всегда на связи и готовы помочь вам даже
                после завершения проекта.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                className="bg-lime-400 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black shadow-md transition hover:bg-lime-300"
                onClick={() => openAction("callback")}
              >
                Оставить заявку
              </button>

              <Link
                to="/company"
                className="bg-lime-400 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-black shadow-md transition hover:bg-lime-300"
              >
                Подробности
              </Link>
            </div>

          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="h-full w-full overflow-hidden">
            <img
              src="/images/about-company.jpg"
              alt="Проектирование дома"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}


export default AboutSection;
