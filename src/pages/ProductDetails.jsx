// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaRegStar,
  FaHeart,
  FaRegHeart,
  FaArrowLeft,
  FaShoppingCart,
} from "react-icons/fa";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext"; // Add this

const ProductDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { setLastSearchQuery } = useSearch();
  const { addToCart } = useCart();
  const { getCurrencySymbol, convert } = useCurrency(); // Add this
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Preserve search query when entering product details
  useEffect(() => {
    if (window.history.state?.searchQuery) {
      setLastSearchQuery(window.history.state.searchQuery);
    }
  }, [setLastSearchQuery]);

  // Generate mock product if state is missing
  useEffect(() => {
    if (!product) {
      const mockProduct = {
        id: parseInt(id),
        name: `Premium Product ${id}`,
        price: Math.floor(Math.random() * 100) + 50, // USD price
        description: `This premium product offers exceptional quality and value.`,
        color: `hsl(${(parseInt(id) * 137.508) % 360}, 70%, 80%)`,
        features: [
          "High-quality materials",
          "Eco-friendly packaging",
          "2-year warranty",
        ],
        specifications: {
          dimensions: "6.5 x 4.2 x 2.1 inches",
          weight: "0.8 lbs",
          material: "Premium materials",
        },
        rating: 4.5,
        reviews: 128,
        image: `https://picsum.photos/400/400?random=${id}`,
      };
      setProduct(mockProduct);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl text-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Loading Product...
          </h2>
        </div>
      </div>
    );
  }

  // Render star rating
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating || 0);
    const hasHalfStar = (product.rating || 0) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaRegStar key="half" className="text-yellow-400" />);
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Products
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isFavorite ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-gray-500 text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main product content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product images */}
          <div className="lg:w-1/2">
            <div className="w-full h-96 rounded-2xl shadow-lg overflow-hidden relative">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Product details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">{renderRating()}</div>
                    <span className="text-gray-500 text-sm">
                      ({product.reviews || 0} reviews)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {isFavorite ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-500 text-xl" />
                  )}
                </button>
              </div>

              <div className="mb-6">
                <p className="text-4xl font-bold text-gray-900 mb-4">
                  {getCurrencySymbol()}
                  {convert(product.price).toFixed(2)}
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Description
                  </h3>
                  <p
                    className={`text-gray-600 ${
                      showFullDescription ? "" : "line-clamp-3"
                    }`}
                  >
                    {product.description}
                  </p>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-600 hover:text-blue-800 mt-2 text-sm font-medium"
                  >
                    {showFullDescription ? "Show Less" : "Read More"}
                  </button>
                </div>

                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center mb-8">
                  <span className="text-gray-700 mr-4">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-gray-800 font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      navigate("/cart");
                    }}
                    className="flex-1 bg-white border-2 border-blue-500 text-blue-600 font-medium py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
