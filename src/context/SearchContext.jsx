// src/context/SearchContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useState("");

  // Clear search when navigating to a non-product page
  useEffect(() => {
    if (
      !location.pathname.startsWith("/products") &&
      !location.pathname.startsWith("/product/") &&
      !location.pathname.startsWith("/search")
    ) {
      setSearchQuery("");
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [location.pathname]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        isSearchOpen,
        setIsSearchOpen,
        lastSearchQuery,
        setLastSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
