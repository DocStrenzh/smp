import React from "react";

const EmployeesPage: React.FC = () => {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-semibold text-gray-900">Сотрудники</h1>

      <p className="mb-6 text-sm leading-relaxed text-gray-700">
        Одним из условий качественной работы нашей компании является высокий
        уровень профессионализма каждого сотрудника.
      </p>

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Руководители
      </h2>

      <div className="inline-block bg-lime-400">
        <img
          src="/images/director.jpg"
          alt="Генеральный директор"
          className="h-80 w-64 object-cover"
        />
        <div className="px-4 py-3 text-sm font-semibold uppercase text-white">
          Генеральный директор<br />
          Ардаков Алексей...
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
