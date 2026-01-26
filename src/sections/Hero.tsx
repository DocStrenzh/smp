import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Slide = {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  buttonText: string;
};

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/hero_section/slide1.jpg",
    title: "Производство металлоконструкций,\nдоставка, монтаж",
    buttonText: "Узнать подробнее",
  },
  {
    id: 2,
    image: "/images/hero_section/slide2.jpg",
    title: "Второй слайд (заглушка)",
    buttonText: "Узнать подробнее",
  },
  {
    id: 3,
    image: "/images/hero_section/slide3.jpg",
    title: "Третий слайд (заглушка)",
    buttonText: "Узнать подробнее",
  },
];

const Hero: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev: number) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const activeSlide = slides[index];

  return (
    <section className="relative w-full">
      <div
        className="relative mx-auto h-[260px] sm:h-[320px] md:h-[400px] lg:h-[480px] w-full overflow-hidden bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${activeSlide.image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-black/0" />

        <div className="relative z-10 flex h-full max-w-xl flex-col justify-center px-4 sm:px-8 md:px-12">
          <h1 className="max-w-xl text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-white whitespace-pre-line">
            <span className="text-lime-400">Производство</span>{" "}
            металлоконструкций,
            <br />
            доставка, монтаж
          </h1>

          <Link
            to="/services"
            className="mt-6 inline-block bg-lime-400 px-6 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide text-black shadow-md hover:bg-lime-300"
          >
            Узнать подробнее
          </Link>
        </div>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setIndex(idx)}
              className={`h-3 w-3 rounded-full border border-white transition-all duration-300 ${
                idx === index ? "bg-lime-400 scale-110" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
