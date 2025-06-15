// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import { SearchProvider } from "./context/SearchContext";
import SearchResults from "./pages/SearchResults";
import { CurrencyProvider } from "./context/CurrencyContext";
import ErrorBoundary from "./ErrorBoundary";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <CurrencyProvider>
        <CartProvider>
          <Router>
            <SearchProvider>
              <ErrorBoundary>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
                <Footer />
              </ErrorBoundary>
            </SearchProvider>
          </Router>
        </CartProvider>
      </CurrencyProvider>
    </div>
  );
};

export default App;
