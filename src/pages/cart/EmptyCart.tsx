import React from "react";
import { Link } from "react-router-dom";

const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="mb-8 text-gray-300">
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
        </svg>
      </div>

      <h2 className="mb-2 text-xl font-medium text-gray-900">
        Ваша корзина пуста
      </h2>

      <p className="mb-8 max-w-md text-center text-sm text-gray-500">
        Исправить это просто: выберите в каталоге интересующий товар и нажмите
        кнопку «В корзину»
      </p>

      <Link
        to="/catalog"
        className="bg-lime-400 px-8 py-3 text-xs font-semibold uppercase tracking-wide text-black shadow-md hover:bg-lime-300 transition"
      >
        В каталог
      </Link>
    </div>
  );
};

export default EmptyCart;
