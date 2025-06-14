// components/Banner.jsx
import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      bg: 'bg-gradient-to-r from-green-500 to-green-700',
      title: 'Fresh Organic Produce',
      subtitle: 'Farm to Table Excellence',
      description: 'Discover the finest organic fruits and vegetables, handpicked for quality and freshness.'
    },
    {
      bg: 'bg-gradient-to-r from-blue-500 to-blue-700',
      title: 'Natural & Pure',
      subtitle: '100% Organic Guarantee',
      description: 'All our products are certified organic, free from harmful pesticides and chemicals.'
    },
    {
      bg: 'bg-gradient-to-r from-purple-500 to-purple-700',
      title: 'Sustainable Farming',
      subtitle: 'Eco-Friendly Choices',
      description: 'Supporting local farmers and sustainable agricultural practices for a better tomorrow.'
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
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
              ? 'opacity-100 transform translate-x-0' 
              : 'opacity-0 transform translate-x-full'
          } ${slide.bg}`}
        >
          <div className="flex items-center justify-center h-full text-white px-4">
            <div className="text-center max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                {slide.title}
              </h1>
              <h2 className="text-xl md:text-3xl mb-6 font-light">
                {slide.subtitle}
              </h2>
              <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                {slide.description}
              </p>
              <div className="space-x-4">
                <button className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  Shop Now
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white p-3 rounded-full transition-all duration-300 z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-60 text-white p-3 rounded-full transition-all duration-300 z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-30 text-white px-3 py-1 rounded-full text-sm z-10">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Banner;