import React from "react";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quality Column */}
        <div className="border-2 border-black bg-black dark:bg-green-600 dark:border-green-500 rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-center mb-3 text-white dark:text-white">
            {t("services.quality.title")}
          </h3>
          <p className="text-white  text-center">
            {t("services.quality.description")}
          </p>
        </div>

        {/* Delivery Column */}
        <div className="border-2 border-black dark:border-green-500 bg-black dark:bg-green-600 rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-center mb-3 text-white dark:text-white">
            {t("services.delivery.title")}
          </h3>
          <p className="text-white  text-center">
            {t("services.delivery.description")}
          </p>
        </div>

        {/* Returns Column */}
        <div className="border-2 border-black dark:border-green-500 bg-black dark:bg-green-600 rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-center mb-3 text-white dark:text-white">
            {t("services.returns.title")}
          </h3>
          <p className="text-white  text-center">
            {t("services.returns.description")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
