// src/pages/ProductDetails.jsx
import React from "react";
import { useLocation, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const product = state?.product;

  if (!product) {
    return (
      <div className="p-4 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p>Please go back to the product list and select a product.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div
          className="w-full h-64 md:w-1/2 rounded"
          style={{ backgroundColor: product.color }}
        />
        <div className="md:w-1/2">
          <p className="text-xl font-semibold mb-2">Price: ${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
