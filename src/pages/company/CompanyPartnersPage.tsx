import React from "react";

const PartnersPage: React.FC = () => {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-semibold text-gray-900">Партнёры</h1>

      <p className="mb-8 text-sm leading-relaxed text-gray-700">
        Все наши партнёры отличаются большим опытом работы, наличием
        необходимой квалификации и высоким качеством сервиса...
      </p>

      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        Зарубежные бренды
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex items-center justify-center border border-gray-100 bg-white px-6 py-10">
          <div className="text-center text-sm">
            <img src="/images/partners/knauf.jpg" alt="Knauf" className="mx-auto mb-4 h-10" />
            <p>KNAUF – международная группа предприятий</p>
          </div>
        </div>
        <div className="flex items-center justify-center border border-gray-100 bg-white px-6 py-10">
          <div className="text-center text-sm">
            <img src="/images/partners/FineBer.jpg" alt="Knauf" className="mx-auto mb-4 h-10" />
            <p>FINEBEER</p>
          </div>
        </div>
        <div className="flex items-center justify-center border border-gray-100 bg-white px-6 py-10">
          <div className="text-center text-sm">
            <img src="/images/partners/weber.jpg" alt="Knauf" className="mx-auto mb-4 h-10" />
            <p>Weber-Vetonit</p>
          </div>
        </div>
        <div className="flex items-center justify-center border border-gray-100 bg-white px-6 py-10">
          <div className="text-center text-sm">
            <img src="/images/partners/rockwool.jpg" alt="Knauf" className="mx-auto mb-4 h-10" />
            <p>ROCKWOOL</p>
          </div>
        </div>
        <div className="flex items-center justify-center border border-gray-100 bg-white px-6 py-10">
          <div className="text-center text-sm">
            <img src="/images/partners/пеноплекс.jpg" alt="Knauf" className="mx-auto mb-4 h-10" />
            <p>Пеноплекс</p>
          </div>
        </div>
        <div className="flex items-center justify-center border border-gray-100 bg-white px-6 py-10">
          <div className="text-center text-sm">
            <img src="/images/partners/метал_профиль.jpg" alt="Knauf" className="mx-auto mb-4 h-10" />
            <p>"Металл Профиль"</p>
          </div>
        </div>
        <div className="flex items-center justify-center border border-gray-100 bg-white px-6 py-10">
          <div className="text-center text-sm">
            <img src="/images/partners/grand_line.jpg" alt="Knauf" className="mx-auto mb-4 h-10" />
            <p>Grand Line</p>
          </div>
        </div>
        <div className="flex items-center justify-center border border-gray-100 bg-white px-6 py-10">
          <div className="text-center text-sm">
            <img src="/images/partners/docke.jpg" alt="Knauf" className="mx-auto mb-4 h-10" />
            <p>Docke</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PartnersPage;
