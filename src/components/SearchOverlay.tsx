import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type SearchOverlayProps = {
  onClose: () => void;
};

const SearchOverlay: React.FC<SearchOverlayProps> = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // запуск анимации после маунта
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // ESC для закрытия
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    onClose();
  };

  return (
    <div
      className={`
        fixed inset-x-0 top-0 z-[60]
        transform-gpu border-b border-gray-200 bg-white shadow
        transition-transform duration-300
        ${visible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder=""
            className="w-full border-b border-gray-300 pb-2 text-sm outline-none focus:border-lime-400"
          />
        </form>

        <button
          type="submit"
          onClick={handleSubmit}
          className="rounded-sm bg-lime-400 px-8 py-2 text-sm font-semibold text-white hover:bg-lime-300"
        >
          Найти
        </button>

        <button
          type="button"
          onClick={onClose}
          className="ml-4 text-xl text-gray-700 hover:text-black"
          aria-label="Закрыть поиск"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default SearchOverlay;
