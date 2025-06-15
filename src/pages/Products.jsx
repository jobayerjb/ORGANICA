// src/pages/Products.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const generateProducts = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 1,
    description: `This is a detailed description of Product ${
      i + 1
    }. It includes features, benefits, and other relevant info to help users make informed decisions.`,
    color: `hsl(${Math.random() * 360}, 70%, 80%)`,
    features: [
      "High-quality materials",
      "Eco-friendly packaging",
      "2-year warranty",
      "Free shipping",
      "Easy returns",
    ],
    specifications: {
      dimensions: "6.5 x 4.2 x 2.1 inches",
      weight: "0.8 lbs",
      material: "Premium materials",
      color: "Elegant finish",
    },
    rating: 4.5,
    reviews: 128,
  }));
};

const sortProducts = (products, sortType) => {
  const sorted = [...products];
  switch (sortType) {
    case "priceLowToHigh":
      return sorted.sort((a, b) => a.price - b.price);
    case "priceHighToLow":
      return sorted.sort((a, b) => b.price - a.price);
    case "aToZ":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "zToA":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
};

const Products = () => {
  const navigate = useNavigate();
  const { searchQuery } = useSearch();
  const [sortType, setSortType] = useState("");

  // Generate products only once
  const products = useMemo(() => generateProducts(), []);

  // Compute filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    return sortProducts(result, sortType);
  }, [products, searchQuery, sortType]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : "Products Page"}
        </h1>

        <div className="flex justify-end">
          <select
            className="border p-2 rounded shadow"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="aToZ">Name: A to Z</option>
            <option value="zToA">Name: Z to A</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">No products found</h2>
          <p>Try different search terms or clear your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() =>
                navigate(`/product/${product.id}`, { state: { product } })
              }
              className="cursor-pointer border rounded p-4 shadow hover:shadow-lg transition-all"
            >
              <div
                className="w-full h-40 rounded mb-4"
                style={{ backgroundColor: product.color }}
              ></div>
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating}
                  </span>
                </div>
              </div>
              <p className="text-gray-700">${product.price}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {product.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
