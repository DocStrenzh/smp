import React from "react";

const CompanyAboutPage: React.FC = () => {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-semibold text-gray-900">О компании</h1>

      <img
        src="/images/company-about.jpg"
        alt="О компании"
        className="mb-8 w-full object-cover"
      />

      <p className="mb-4 text-sm leading-relaxed text-gray-700">
        Хотите построить дом своей мечты? Мы предлагаем полный цикл услуг по
        строительству частных домов под ключ...
      </p>

      <p className="mb-4 text-sm leading-relaxed text-gray-700">
        Индивидуальный подход, опытная команда и соблюдение сроков — наши
        основные принципы работы. Мы сопровождаем проект на всех этапах:
        от разработки до сдачи объекта.
      </p>
    </div>
  );
};

export default CompanyAboutPage;
