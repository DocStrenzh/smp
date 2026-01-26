import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Header from "./Header";
import Navbar from "./Navbar";
import SearchOverlay from "../components/SearchOverlay";

const AppHeader: React.FC = () => {
  const { pathname } = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (pathname === "/") {
        setShowNavbar(y < 130);
      } else {
        setShowNavbar(y < 50);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <Header onSearchClick={() => setIsSearchOpen(true)} />

        <div
          className={`transition-all duration-300 overflow-hidden ${
            showNavbar ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Navbar />
        </div>
      </header>

      {isSearchOpen && (
        <SearchOverlay onClose={() => setIsSearchOpen(false)} />
      )}
    </>
  );
};

export default AppHeader;
