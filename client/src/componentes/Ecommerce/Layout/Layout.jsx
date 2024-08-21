import React from "react";
import Filter from "../../Dashboard/Filter/Filter"

const Layout = ({ children }) => {
  return (
    <section className="bg-pink-500">
      <div className="container px-6 py-8 mx-auto">
        <div className="lg:flex lg:-mx-2">
          <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">
            <div className="mt-8">
              <h1 className="text-white text-2xl">Filtrar por categoria</h1>
              <div className="border border-gray-100 p-0 w-full"></div>
              <Filter/>
            </div>
            <div className="mt-8">
              <h1 className="text-white text-2xl">Filtrar por precio</h1>

              <div className="border border-gray-100 p-0 w-full"></div>
            </div>
          </div>

          <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
            <div className="flex items-center justify-between text-sm tracking-widest uppercase ">
              <p className="text-white ">8 Items</p>
              <div className="flex items-center">
                <p className="text-white ">Sort</p>
                <select className="font-medium text-gray-700 bg-transparent dark:text-white focus:outline-none">
                  <option value="#">Recommended</option>
                  <option value="#">Size</option>
                  <option value="#">Price</option>
                </select>
              </div>
            </div>

            <div className="mt-4">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
