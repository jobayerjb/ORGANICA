import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const footerLinks = [
  {
    title: "EXTRAS",
    links: [
      { to: "/about", label: "BRANDS" },
      { to: "/careers", label: "GIFT VOUCHERS" },
      { to: "/blog", label: "AFFILIATES" },
      { to: "/contact", label: "OUR SERVICE" },
      { to: "/faq", label: "SPECIAL" },
    ],
  },
  {
    title: "PRODUCTS",
    links: [
      { to: "/shop", label: "PRICE DROP" },
      { to: "/new", label: "NEW PRODUCTS" },
      { to: "/sale", label: "BEST SALES" },
      { to: "/categories", label: "CONTACT US" },
      { to: "/featured", label: "SITEMAP" },
    ],
  },
  {
    title: "OUR COMPANY",
    links: [
      { to: "/about", label: "DELIVERY" },
      { to: "/team", label: "LEGAL NOTICE" },
      { to: "/careers", label: "ABOUT US" },
      { to: "/press", label: "CONTACT US" },
      { to: "/blog", label: "STORES" },
    ],
  },
  {
    title: "YOUR ACCOUNT",
    links: [
      { to: "/login", label: "LOGIN" },
      { to: "/register", label: "REGISTER" },
      { to: "/orders", label: "ORDERS" },
      { to: "/wishlist", label: "WISHLIST" },
      { to: "/settings", label: "SETTINGS" },
    ],
  },
];

const Footer = () => {

  const { t } = useTranslation();
  return (
    <footer className="bg-white text-black py-8 uppercase font-roboto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 border border-black divide-y md:divide-y-0 md:divide-x divide-black">
          {footerLinks.map((section) => (
            <div key={section.title} className="p-4">
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.to} className="mb-2">
                    <NavLink
                      to={link.to}
                      className="block transition-all duration-200 hover:text-green-600 hover:translate-x-2"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm uppercase">
        &copy; {new Date().getFullYear()} Organica. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
