// src/component/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCurrency } from "../context/CurrencyContext";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext"; // Add this
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const { t, i18n } = useTranslation();
  const { currency, changeCurrency, getCurrencySymbol } = useCurrency();
  const { cartCount } = useCart(); // Add this

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearchOpen,
    setIsSearchOpen,
    lastSearchQuery,
    setLastSearchQuery,
  } = useSearch();

  const [localQuery, setLocalQuery] = useState("");
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Sync localQuery with context searchQuery
  useEffect(() => {
    if (searchQuery && searchQuery !== localQuery) {
      setLocalQuery(searchQuery);
    }
  }, [searchQuery]);

  // Scroll effect for fixed navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Change currency when language changes
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;

    if (lng === "bn") {
      changeCurrency("BDT");
    } else {
      changeCurrency("USD");
    }
  };

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localQuery.trim().length > 0) {
        setSearchQuery(localQuery);
        setLastSearchQuery(localQuery);
        setIsSearchOpen(true);
        searchProducts(localQuery);
      } else {
        setIsSearchOpen(false);
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [localQuery]);

  // Click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search function
  const searchProducts = async (query) => {
    const allProducts = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 100) + 1,
    }));

    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results.slice(0, 5));
  };

  // Restore search when returning to products page
  useEffect(() => {
    if (location.pathname === "/products" && lastSearchQuery) {
      setLocalQuery(lastSearchQuery);
      setSearchQuery(lastSearchQuery);
      setIsSearchOpen(false);
    }
  }, [location.pathname, lastSearchQuery]);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localQuery) {
      setLastSearchQuery(localQuery);
      navigate("/products");
      setIsSearchOpen(false);
    }
  };

  // Navigation links data using translations
  const navLinks = [
    { name: t("navbar.home"), path: "/" },
    { name: t("navbar.about"), path: "/about" },
    { name: t("navbar.products"), path: "/products" },
    { name: t("navbar.contact"), path: "/contact" },
  ];

  // Currency options
  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "BDT", symbol: "৳", name: "Bangladeshi Taka" },
  ];

  return (
    <nav
      className={`max-w-[1300px] mx-auto bg-white shadow-md ${
        isFixed ? "fixed top-0 left-0 right-0 z-50" : ""
      }`}
    >
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4">
        <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>

        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        {/* Mobile Cart Button */}
        <Link to="/cart" className="relative p-2">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Desktop Navigation - Two Rows */}
      <div className="hidden md:flex flex-col">
        {/* Top Row - Phone, Search, Currency & Language */}
        <div className="flex items-center justify-between p-4 bg-gray-50">
          <div className="flex items-center gap-6">
            <span className="font-medium text-gray-700">
              {t("navbar.phone")}: +880 1234-567890
            </span>
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder={t("navbar.search")}
                  className="w-48 h-10 rounded-full border border-gray-300 px-4 text-sm"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="7" cy="7" r="6" />
                    <path d="M12 12l-3-3" />
                  </svg>
                </button>
              </form>

              {/* Search Results Dropdown */}
              {isSearchOpen && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-md z-[1000] max-h-80 overflow-y-auto">
                  {searchResults && searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => {
                          navigate(`/product/${product.id}`);
                          setIsSearchOpen(false);
                        }}
                      >
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-3">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-gray-600">${product.price}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No products found
                    </div>
                  )}
                  <div className="border-t p-2 text-center">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={handleSearchSubmit}
                    >
                      View all results
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Currency Selector */}
            <div className="relative group inline-block">
              <button className="flex items-center text-gray-700 group-hover:text-green-600 transition-colors">
                <span>{getCurrencySymbol()}</span>
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {/* Dropdown with padding bridge */}
              <div className="absolute right-0 top-full pt-1 w-48 hidden group-hover:block z-10">
                {/* Invisible bridge for mouse transition */}
                <div className="h-2 -mb-2 pointer-events-none"></div>

                <div className="bg-white shadow-lg rounded-md py-2 pointer-events-auto">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => changeCurrency(curr.code)}
                      className={`block w-full text-left px-4 py-2 hover:bg-green-50 ${
                        currency === curr.code
                          ? "text-green-600 font-medium"
                          : ""
                      }`}
                    >
                      {curr.symbol} {curr.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="relative group inline-block">
              <button className="flex items-center text-gray-700 group-hover:text-green-600 transition-colors">
                <span>{i18n.language === "en" ? "English" : "বাংলা"}</span>
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              <div className="absolute right-0 top-full pt-1 w-32 hidden group-hover:block z-10">
                {/* Invisible bridge for mouse transition */}
                <div className="h-2 -mb-2 pointer-events-none"></div>

                <div className="bg-white shadow-lg rounded-md py-2 pointer-events-auto">
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`block w-full text-left px-4 py-2 hover:bg-green-50 ${
                      i18n.language === "en" ? "text-green-600 font-medium" : ""
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage("bn")}
                    className={`block w-full text-left px-4 py-2 hover:bg-green-50 ${
                      i18n.language === "bn" ? "text-green-600 font-medium" : ""
                    }`}
                  >
                    বাংলা
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Logo and Navigation Links */}
        <div className="flex items-center justify-between p-8 relative">
          {/* Left Navigation Links */}
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="font-medium text-gray-700 hover:text-green-500 transition-colors duration-300 hover:animate-shake"
            >
              {t("navbar.home")}
            </Link>
            <Link
              to="/about"
              className="font-medium text-gray-700 hover:text-green-500 transition-colors duration-300 hover:animate-shake"
            >
              {t("navbar.about")}
            </Link>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="hover:animate-shake">
              <img src={logo} alt="Logo" className="h-16" />
            </Link>
          </div>

          {/* Right Navigation Links + Cart */}
          <div className="flex items-center gap-10">
            <Link
              to="/products"
              className="font-medium text-gray-700 hover:text-green-500 transition-colors duration-300 hover:animate-shake"
            >
              {t("navbar.products")}
            </Link>
            <Link
              to="/contact"
              className="font-medium text-gray-700 hover:text-green-500 transition-colors duration-300 hover:animate-shake"
            >
              {t("navbar.contact")}
            </Link>

            {/* Cart Icon for Desktop */}
            <Link to="/cart" className="relative hover:animate-shake">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-[-6px] right-[-6px] bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
