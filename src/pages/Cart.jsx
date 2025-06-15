// src/pages/Cart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext"; // Add this

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  const { getCurrencySymbol, convert } = useCurrency(); // Add this
  const navigate = useNavigate();

  // Calculate shipping cost
  const shippingCost = cartItems.length > 0 ? 50 : 0;

  return (
    <div className="max-w-3xl mx-auto p-4 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Continue Shopping
      </button>

      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Add some items to your cart to get started
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => {
              const convertedPrice = convert(item.price);
              const itemTotal = convertedPrice * item.quantity;

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border rounded-lg p-4 shadow-sm bg-white"
                >
                  <div
                    className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: item.color || "#e5e7eb" }}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    <p className="text-sm text-gray-600">
                      Price: {getCurrencySymbol()}
                      {convertedPrice.toFixed(2)} × {item.quantity} =
                      <span className="font-semibold ml-1">
                        {getCurrencySymbol()}
                        {itemTotal.toFixed(2)}
                      </span>
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="min-w-[30px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 flex items-center"
                      >
                        <FaTrash className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Subtotal</h3>
              <span className="text-lg font-medium">
                {getCurrencySymbol()}
                {convert(cartTotal).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Shipping</h3>
              <span className="text-lg font-medium">
                {getCurrencySymbol()}
                {convert(shippingCost).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
              <h3 className="text-xl font-bold">Total</h3>
              <span className="text-xl font-bold">
                {getCurrencySymbol()}
                {(convert(cartTotal) + convert(shippingCost)).toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
