import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useCurrency } from "../context/CurrencyContext";
import { Link } from "react-router-dom";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();
  const { convertPrice, getCurrencySymbol } = useCurrency();

  // Use memo to recreate slides when translations or currency changes
  const slides = useMemo(() => {
    const samplePrice = convertPrice(25.99);
    return [
      {
        bg: "bg-gradient-to-r from-green-500 to-green-700",
        title: t("banner.slide1.title"),
        subtitle: t("banner.slide1.subtitle"),
        description: t("banner.slide1.description"),
        price: samplePrice,
      },
      {
        bg: "bg-gradient-to-r from-blue-500 to-blue-700",
        title: t("banner.slide2.title"),
        subtitle: t("banner.slide2.subtitle"),
        description: t("banner.slide2.description"),
        price: samplePrice,
      },
      {
        bg: "bg-gradient-to-r from-purple-500 to-purple-700",
        title: t("banner.slide3.title"),
        subtitle: t("banner.slide3.subtitle"),
        description: t("banner.slide3.description"),
        price: samplePrice,
      },
    ];
  }, [t, convertPrice]); // Recreate when translations or currency changes

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? "opacity-100 z-0"
              : "opacity-0 z-0 pointer-events-none"
          } ${slide.bg}`}
        >
          <div className="flex items-center justify-center h-full text-white px-4">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {slide.title}
              </h1>
              <h2 className="text-xl md:text-3xl mb-4 font-light">
                {slide.subtitle}
              </h2>
              <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
                {slide.description}
              </p>

              {/* Dynamic Price Display */}
              <div className="mb-8 text-xl font-bold">
                {t("banner.startingAt")} {getCurrencySymbol()}
                {slide.price.toFixed(2)}
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/products"
                  className="inline-block bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  {t("banner.shopButton")}
                </Link>

                <Link
                  to="/about"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300"
                >
                  {t("banner.learnButton")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white p-3 rounded-full transition-all duration-300 z-10"
        aria-label={t("banner.prevSlide")}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white p-3 rounded-full transition-all duration-300 z-10"
        aria-label={t("banner.nextSlide")}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              aria-label={`${t("banner.goToSlide")} ${index + 1}`}
              aria-current={index === currentSlide ? "true" : "false"}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {slides.length > 1 && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-30 text-white px-3 py-1 rounded-full text-sm z-10">
          {currentSlide + 1} / {slides.length}
        </div>
      )}
    </div>
  );
};

export default Banner;
