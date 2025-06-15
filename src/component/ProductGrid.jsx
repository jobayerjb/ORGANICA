// src/components/ProductGrid.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductGrid = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
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
  );
};

export default ProductGrid;
