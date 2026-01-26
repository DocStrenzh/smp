import React from 'react';
import {items} from "../constants/item_section";
import ItemSectionCard from "../components/ItemSectionCard";

const ItemSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Строим</h2>

          <button className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-lime-400 hover:text-lime-500">
            все услуги
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <ItemSectionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItemSection;