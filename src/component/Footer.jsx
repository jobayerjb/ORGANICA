import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = [
    {
      titleKey: "footer.extras.title",
      links: [
        { to: "/about", labelKey: "footer.extras.brands" },
        { to: "/careers", labelKey: "footer.extras.gift_vouchers" },
        { to: "/blog", labelKey: "footer.extras.affiliates" },
        { to: "/contact", labelKey: "footer.extras.our_service" },
        { to: "/faq", labelKey: "footer.extras.special" },
      ],
    },
    {
      titleKey: "footer.products.title",
      links: [
        { to: "/shop", labelKey: "footer.products.price_drop" },
        { to: "/new", labelKey: "footer.products.new_products" },
        { to: "/sale", labelKey: "footer.products.best_sales" },
        { to: "/categories", labelKey: "footer.products.contact_us" },
        { to: "/featured", labelKey: "footer.products.sitemap" },
      ],
    },
    {
      titleKey: "footer.our_company.title",
      links: [
        { to: "/about", labelKey: "footer.our_company.delivery" },
        { to: "/team", labelKey: "footer.our_company.legal_notice" },
        { to: "/careers", labelKey: "footer.our_company.about_us" },
        { to: "/press", labelKey: "footer.our_company.contact_us" },
        { to: "/blog", labelKey: "footer.our_company.stores" },
      ],
    },
    {
      titleKey: "footer.your_account.title",
      links: [
        { to: "/login", labelKey: "footer.your_account.login" },
        { to: "/register", labelKey: "footer.your_account.register" },
        { to: "/orders", labelKey: "footer.your_account.orders" },
        { to: "/wishlist", labelKey: "footer.your_account.wishlist" },
        { to: "/settings", labelKey: "footer.your_account.settings" },
      ],
    },
  ];

  return (
    <footer className="bg-white text-black py-8 uppercase font-roboto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 border border-black divide-y md:divide-y-0 md:divide-x divide-black">
          {footerLinks.map((section) => (
            <div key={section.titleKey} className="p-4">
              <h3 className="text-lg font-semibold mb-4">
                {t(section.titleKey)}
              </h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.labelKey} className="mb-2">
                    <NavLink
                      to={link.to}
                      className="block transition-all duration-200 hover:text-green-600 hover:translate-x-2"
                    >
                      {t(link.labelKey)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm uppercase">
        <div 
          dangerouslySetInnerHTML={{
            __html: t('footer.copyright', {
              year: new Date().getFullYear(),
              interpolation: { escapeValue: false }
            })
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;