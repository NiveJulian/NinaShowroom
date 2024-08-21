import React, { useState } from "react";
import FilterCategories from "../Filters/FilterCategories";
import FilterColor from "../Filters/FilterColor";

const Layout = ({ children, items }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <section className="bg-gray-100">
      <div className="container px-6 py-8 mx-auto">
        <div className="lg:flex lg:-mx-2">
          {/* Sidebar responsive toggle button */}
          <button
            className="lg:hidden bg-gray-800 text-white p-2 rounded flex flex-row gap-2 justify-center items-center"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>

            {isSidebarOpen ? "Cerrar Filtros" : "Abrir Filtros"}
          </button>

          {/* Sidebar */}
          <div
            className={`space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4 ${
              isSidebarOpen ? "block" : "hidden lg:block"
            }`}
          >
            {/* Categorías */}
            <div className="mt-8">
              <h1
                className="text-black text-2xl cursor-pointer"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              >
                Filtrar por categoría
              </h1>
              <div className="border border-gray-400 my-2 p-0 w-full"></div>
              {isCategoriesOpen && (
                <div className="max-h-52 overflow-y-auto overflow-x-hidden">
                  <FilterCategories />
                </div>
              )}
            </div>

            {/* Color */}
            <div className="mt-8">
              <h1
                className="text-black text-2xl cursor-pointer"
                onClick={() => setIsColorOpen(!isColorOpen)}
              >
                Filtrar por color
              </h1>
              <div className="border border-gray-400 my-2 p-0 w-full"></div>
              {isColorOpen && (
                <div className="max-h-52 overflow-y-auto overflow-x-hidden">
                  <FilterColor />
                </div>
              )}
            </div>
          </div>

          {/* Products Section */}
          <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5">
            <div className="flex items-center justify-between text-sm tracking-widest uppercase">
              <p className="text-black">{items} Items</p>
              <div className="flex items-center">
                <p className="text-black">Sort</p>
                <select className="font-medium text-gray-700 bg-transparent dark:text-black focus:outline-none">
                  <option value="#">Recommended</option>
                  <option value="#">Size</option>
                  <option value="#">Price</option>
                </select>
              </div>
            </div>

            <div className="mt-4 border-l border-t rounded-md border-gray-800">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
