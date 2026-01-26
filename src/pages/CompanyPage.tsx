import React from "react";
import SideMenuPageLayout, {
  SideMenuItem,
} from "../layouts/SideMenuPageLayout";

const companyMenu: SideMenuItem[] = [
  { label: "О компании", to: "/company" },
  { label: "Сотрудники", to: "/company/staff" },
  { label: "Партнеры", to: "/company/partners" },
  { label: "Отзывы", to: "/company/reviews" },
  { label: "Сертификаты", to: "/company/certificates" },
  { label: "Реквизиты", to: "/company/requisites" },
  { label: "Вопрос - ответ", to: "/company/faq" },
  { label: "Фотогалерея", to: "/company/gallery" },
];

const advantagesCards = [
  { title: "Под ключ", icon: "/images/icon/key.jpg" },
  { title: "Индивидуальный подход", icon: "/images/icon/hand-house.jpg" },
  { title: "Качественные материалы", icon: "/images/icon/roller-house.jpg" },
  { title: "Опытная команда", icon: "/images/icon/worker.jpg" },
  { title: "Соблюдение сроков", icon: "/images/icon/calendar.jpg" },
  { title: "Послепродажное обслуживание", icon: "/images/icon/tools.jpg" },
];

const CompanyPage: React.FC = () => {
  return (
    <div
    >
      <h1 className="mb-8 text-3xl font-semibold text-gray-900">О компании</h1>

      <img
        src="/images/company-about.jpg"
        alt="О компании"
        className="mb-8 w-full object-cover"
      />

      <div className="[&>p]:mt-4 [&>p:first-child]:mt-0">
        <p>
          Хотите построить дом своей мечты? Мы предлагаем полный цикл услуг по
          строительству частных домов под ключ!
        </p>

        <p className="font-semibold mt-4">Наши преимущества:</p>

        <p>
          Индивидуальный подход: Мы разработаем проект, учитывающий ваши
          пожелания и бюджет.
        </p>

        <p>
          Качественные материалы: Используем только надёжные и проверенные
          материалы для долговечности вашего дома.
        </p>

        <p>
          Опытная команда: Наши специалисты имеют богатый опыт и гарантируют высокое качество выполнения работ.
        </p>

        <p>
          Соблюдение сроков: Мы ценим ваше время и придерживаемся согласованных сроков выполнения работ.
        </p>

        <p>
          Послепродажное обслуживание: Мы всегда на связи и готовы помочь после завершения проекта.
        </p>
      </div>

      {/* Блок с карточками преимуществ — только ОН⬇️ */}
      <div className="mt-10 space-y-4">
        {advantagesCards.map((item) => (
          <div
            key={item.title}
            className="flex items-center border border-gray-200 bg-white px-8 py-6"
          >
            <div className="mr-8 flex h-16 w-16 items-center justify-center">
              <img
                src={item.icon}
                alt={item.title}
                className="max-h-12 object-contain"
              />
            </div>

            <div className="text-base font-medium text-gray-900">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyPage;
