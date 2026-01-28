import React from 'react';
import {BuildItem} from "../constants/item_section";
import {Link} from "react-router-dom";

type BuildCardProps = {
  item: BuildItem;
};

const ItemSectionCard: React.FC<BuildCardProps> = ({ item }) => {
  return (
    <Link to={`/services/${item.slug}`} className="group relative h-[220px] sm:h-[260px] md:h-[280px] cursor-pointer overflow-hidden bg-gray-200 shadow-sm">
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute bottom-4 left-0 z-20 bg-black px-4 py-2 text-sm font-medium font-AppFont text-white transition-all duration-300 group-hover:translate-y-2 group-hover:opacity-0">
        {item.title}
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-lime-400/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-0 z-20 flex items-start px-6 py-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-xl font-semibold font-AppFont text-gray-900">
          {item.title}
        </h3>
      </div>
    </Link>
  );
};

export default ItemSectionCard;