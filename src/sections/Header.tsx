import React from "react";
import Dropdown from "../components/Dropdown";
import { phones } from "../constants/Phones";
import { Link } from "react-router-dom";
import CartIcon from "../components/CartIcon";
import {useState} from "react";
import BurgerMenu from "../components/BurgerMenu";
import {useCart} from "../cart/CartProvider";

type HeaderProps = {
  onSearchClick: () => void;
};

const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const {count} = useCart()

  return (
    <header className="w-full shadow-2">
      <div className="border-black/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:py-4">
          <button
            type="button"
            onClick={() => setBurgerOpen(true)}
            aria-label="Открыть меню"
            className="group rounded-lg p-2 text-neutral-700 hover:bg-neutral-50"
          >
            <span className="text-xl text-neutral-700 group-hover:text-lime-500">☰</span>
          </button>

          <BurgerMenu open={burgerOpen} onClose={() => setBurgerOpen(false)} />

          <div className="ml-4 flex-none">
            <Dropdown content={phones} />
          </div>

          <div className="flex flex-1 justify-center">
            <Link
              to="/"
              className="text-2xl sm:text-3xl font-bold tracking-wide"
            >
              СМП
              <span className="text-lime-400">97</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <button className="hidden sm:flex items-center gap-1 text-gray-800">
              <span className="text-lime-500 text-lg">●</span>
              <span className="border-b border-dotted border-gray-500">
                Воронеж
              </span>
            </button>

            <button
              aria-label="Поиск"
              className="hidden sm:block text-lg leading-none"
              onClick={onSearchClick}
            >
              🔍
            </button>

            <Link
              to="/cart"
              aria-label="Корзина"
              className="relative flex items-center justify-center"
            >
              <CartIcon className="h-5 w-5 text-black" />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
    {count}
  </span>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
