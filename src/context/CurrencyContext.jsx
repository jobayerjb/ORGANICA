// src/context/CurrencyContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const savedCurrency = localStorage.getItem("currency");
    return savedCurrency || "USD";
  });

  // Save currency preference
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  // Get currency symbol
  const getCurrencySymbol = () => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "BDT":
        return "৳";
      default:
        return "$";
    }
  };

  // Convert prices based on selected currency
  const convert = (amount) => {
    const conversionRates = {
      USD: 1,
      EUR: 0.93,
      GBP: 0.79,
      BDT: 109.5,
    };

    return amount * (conversionRates[currency] || 1);
  };

  // Alias for convert function
  const convertPrice = convert;

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        getCurrencySymbol,
        convert,
        convertPrice, // Add this alias
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
