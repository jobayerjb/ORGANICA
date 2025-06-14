import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  
  // Function to change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
  };

  // Navigation links data
  const navLinks = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.about'), path: '/about' },
    { name: t('navbar.products'), path: '/products' },
    { name: t('navbar.contact'), path: '/contact' }
  ];

  return (
    <nav className="max-w-[1300px] mx-auto bg-white shadow-md">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4">
        {/* Hamburger Menu Button */}
        <button 
          className="p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
        
        {/* Logo */}
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
        
        {/* Cart Icon */}
        <button className="relative p-2">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 text-xs">0</span>
        </button>
      </div>

      {/* Mobile Menu - Toggle based on state */}
      <div 
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} p-4 border-t transition-all duration-300`}
      >
        <div className="flex flex-col gap-3">
          {/* Navigation Links */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="py-2 font-medium text-gray-700 hover:text-green-500 
                       transition-colors duration-300 hover:animate-shake"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Language Selector */}
          <select 
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="mt-2 p-2 rounded border border-gray-300"
          >
            <option value="en">English</option>
            <option value="bn">বাংলা</option>
          </select>
          
          {/* Phone Number */}
          <div className="mt-4 pt-4 border-t">
            <span className="font-medium text-gray-700">
              {t('navbar.phone')}: +880 1234-567890
            </span>
          </div>
          
          {/* Search Input */}
          <div className="relative mt-2">
            <input
              type="text"
              placeholder={t('navbar.search')}
              className="w-full h-10 rounded border border-gray-300 px-4 text-sm"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8" cy="8" r="7" />
                <path d="M14 14l-4-4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between p-4">
        {/* Left Section - Phone and Search */}
        <div className="flex items-center gap-6">
          <span className="font-medium text-gray-700">
            {t('navbar.phone')}: +880 1234-567890
          </span>
          <div className="relative">
            <input
              type="text"
              placeholder={t('navbar.search')}
              className="w-32 h-8 rounded border border-gray-300 px-2 text-sm"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="7" cy="7" r="6" />
                <path d="M12 12l-3-3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Center Section - Navigation Links and Logo */}
        <div className="flex items-center gap-8">
          {/* Left Links */}
          <div className="flex gap-6">
            <Link
              to="/"
              className="font-medium text-gray-700 hover:text-green-500 
                         transition-colors duration-300 hover:animate-shake"
            >
              {t('navbar.home')}
            </Link>
            <Link
              to="/about"
              className="font-medium text-gray-700 hover:text-green-500 
                         transition-colors duration-300 hover:animate-shake"
            >
              {t('navbar.about')}
            </Link>
          </div>

          {/* Logo */}
          <Link to="/" className="hover:animate-shake">
            <img src={logo} alt="Logo" className="h-10" />
          </Link>

          {/* Right Links */}
          <div className="flex gap-6">
            <Link
              to="/products"
              className="font-medium text-gray-700 hover:text-green-500 
                         transition-colors duration-300 hover:animate-shake"
            >
              {t('navbar.products')}
            </Link>
            <Link
              to="/contact"
              className="font-medium text-gray-700 hover:text-green-500 
                         transition-colors duration-300 hover:animate-shake"
            >
              {t('navbar.contact')}
            </Link>
          </div>
        </div>

        {/* Right Section - Language and Cart */}
        <div className="flex items-center gap-4">
          <select 
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="p-1 rounded border border-gray-300 text-sm cursor-pointer"
          >
            <option value="en">English</option>
            <option value="bn">বাংলা</option>
          </select>
          
          <button className="relative hover:animate-shake">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="absolute top-[-6px] right-[-6px] bg-red-600 text-white rounded-full px-1 text-xs">
              0
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;