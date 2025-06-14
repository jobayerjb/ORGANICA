// src/context/CurrencyContext.js
import { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  
  // Exchange rates (simplified)
  const rates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.75,
    BDT: 105.50,
  };
  
  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };
  
  const convertPrice = (price) => {
    return (price * rates[currency]).toFixed(2);
  };
  
  const getCurrencySymbol = () => {
    switch(currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'BDT': return '৳';
      default: return '$';
    }
  };
  
  return (
    <CurrencyContext.Provider 
      value={{ 
        currency, 
        changeCurrency, 
        convertPrice,
        getCurrencySymbol
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);