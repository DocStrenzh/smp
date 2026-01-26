import { useState, useEffect } from "react";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-10 z-50 px-6 py-2 rounded-full text-white
                  bg-gradient-to-r from-lime-300 to-lime-500 shadow-lg
                  transition-all duration-300 
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
    >
      ↑ НАВЕРХ
    </button>
  );
};

export default ScrollTopButton;
