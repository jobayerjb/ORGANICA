// src/pages/SearchResults.jsx
import React, { useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const { searchQuery, searchResults } = useSearch();
  const navigate = useNavigate();

  // Redirect to products page if no search query
  useEffect(() => {
    if (!searchQuery) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  if (!searchQuery) {
    return null; // Or a loading spinner
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for "{searchQuery}"
      </h1>

      {searchResults && searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <div
              key={product.id}
              onClick={() =>
                navigate(`/product/${product.id}`, { state: { product } })
              }
              className="cursor-pointer border rounded p-4 shadow hover:shadow-lg transition-all"
            >
              <div
                className="w-full h-40 rounded mb-4"
                style={{ backgroundColor: product.color || "#ddd" }}
              ></div>
              <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
              <p className="text-gray-700">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">No products found</h2>
          <p>Try different search terms</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Browse All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
