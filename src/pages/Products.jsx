// pages/products.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const generateProducts = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 1,
    description: `This is a detailed description of Product ${
      i + 1
    }. It includes features, benefits, and other relevant info to help users make informed decisions.`,
    color: `hsl(${Math.random() * 360}, 70%, 80%)`,
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
  const [sortType, setSortType] = useState("");
  const [products] = useState(generateProducts());

  const sortedProducts = sortProducts(products, sortType);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Products Page</h1>

      <div className="flex justify-end mb-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
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
            <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
