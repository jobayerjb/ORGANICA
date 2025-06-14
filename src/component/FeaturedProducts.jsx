import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FiChevronLeft, FiChevronRight, FiStar, FiShoppingCart } from 'react-icons/fi';
import products from '../data/products.json';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../context/CurrencyContext';

const FeaturedProducts = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const { convertPrice, getCurrencySymbol } = useCurrency();
  
  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  // Custom arrow components
 const NextArrow = ({ currentSlide, slideCount, ...restProps }) => (
  <button 
    {...restProps}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-green-100 transition-colors"
    aria-label="Next products"
  >
    <FiChevronRight className="text-gray-700 text-xl" />
  </button>
);

const PrevArrow = ({ currentSlide, slideCount, ...restProps }) => (
  <button 
    {...restProps}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-green-100 transition-colors"
    aria-label="Previous products"
  >
    <FiChevronLeft className="text-gray-700 text-xl" />
  </button>
);

  const handleAddToCart = (product) => {
    // Add your cart logic here
    console.log('Adding to cart:', product);
  };

  return (
    <div className="py-12 px-4 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {currentLang === 'bn' ? 'বিশেষ পণ্য' : 'Featured Products'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {currentLang === 'bn' 
              ? 'আমাদের সাবধানে নির্বাচিত প্রিমিয়াম পণ্যগুলির সংগ্রহ আবিষ্কার করুন। প্রতিটি আইটেম গুণমান এবং স্টাইলের জন্য হ্যান্ডপিক করা হয়েছে।' 
              : 'Discover our carefully curated selection of premium products. Each item is handpicked for quality and style.'}
          </p>
        </div>

        <div className="relative">
          <Slider 
            {...settings} 
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {products.map((product) => (
              <div key={product.id} className="px-3 py-6 focus:outline-none">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Product Image */}
                  <div 
                    className="w-full h-56 flex items-center justify-center"
                    style={{ backgroundColor: product.color || '#f3f4f6' }}
                  >
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-center font-bold text-gray-800">
                          {currentLang === 'bn' ? 'পণ্য' : 'Product'} {product.id}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                      {currentLang === 'bn' && product.nameBn ? product.nameBn : product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={`text-sm ${
                            i < Math.floor(product.rating || 0)
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <span className="text-gray-500 text-sm ml-2">
                        ({product.rating || 0}.0)
                      </span>
                    </div>
                    
                    {/* Price and Add to Cart */}
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-600">
                        {getCurrencySymbol()}{convertPrice(product.price)}
                      </span>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <FiShoppingCart className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            {currentLang === 'bn' ? 'সমস্ত পণ্য দেখুন' : 'View All Products'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;