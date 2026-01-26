import React from 'react';
import {promos} from "../constants/ads";

const PromotionsSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-gray-900">Акции</h2>
          <button className="text-xs font-semibold uppercase tracking-wide text-lime-400 hover:text-lime-500">
            все акции
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {promos.map((promo) => (
            <article
              key={promo.id}
              className="group relative h-72 cursor-pointer overflow-hidden rounded-md bg-gray-200 shadow-md"
            >
              <img
                src={promo.image}
                alt={promo.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-black/45 transition-colors duration-300 group-hover:bg-black/25" />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4">
                <p className="text-[13px] font-semibold leading-snug text-white">
                  {promo.title}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;