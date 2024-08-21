import React, { useState } from "react";

const TabViewSale = ({ isOpen, onClose, sale, infoVentas }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [toggle, setToggle] = useState(false);

  if (!isOpen) {
    return null;
  }

  const toggleExpand = (index) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    setToggle(!toggle);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="flex items-center justify-center h-auto rounded-md bg-gray-200">
        <div className="p-8 rounded-3xl bgWhite maxW-sm w-full">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 shrink-0"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"></path>
            </svg>
            <div className="space-y-0.5 flex-1">
              <h3 className="font-medium textLg tracking-tight text-gray-900 leading-tight">
                Informacion de ventas
              </h3>
              <p className="text-sm font-normal text-gray-400 leading-none">
                Fecha {infoVentas[0].fecha}
              </p>
            </div>
            <button
              onClick={onClose}
              className="inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M17 7l-10 10"></path>
                <path d="M8 7l9 0l0 9"></path>
              </svg>
            </button>
          </div>
          <div className="mt-9 grid gap-2.5">
            {sale &&
              sale.map((info, i) => (
                <div key={i}>
                  <button onClick={() => toggleExpand(i)} className="w-full">
                    <div className="flex items-center space-x-4 p-3.5 rounded-full bg-gray-100">
                      <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-gray-100 text-gray-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <div className="flex flex-col flex-1">
                        <h3 className="text-sm font-medium">{info.cliente}</h3>
                        <div className="divide-x divide-gray-200 mt-auto">
                          <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0">
                            {info.cantidad} cantidad
                          </span>
                          <span className="inline-block px-3 text-xs leading-none text-gray-400 font-normal first:pl-0">
                            ${info.total} total
                          </span>
                        </div>
                      </div>
                      {toggle ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 shrink-0"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M9 6l6 6l-6 6"></path>
                        </svg>
                      )}
                    </div>
                  </button>
                  {expandedItems[i] && (
                    <div className="bg-gray-100 -mt-9 rounded-t-xl p-4 rounded-b-lg">
                      <div className="mt-4 flex justify-center items-center flex-col">
                        <p>
                          <span className="text-gray-800 p-2 font-bold">
                            Cod. Producto:{" "}
                          </span>

                          {info.idProducto}
                        </p>
                        <p>
                          <span className="text-gray-800 p-2 font-bold">
                            SKU:{" "}
                          </span>

                          {info.sku}
                        </p>
                        <p>
                          <span className="text-gray-800 p-2 font-bold">
                            Talle:{" "}
                          </span>

                          {info.talle}
                        </p>
                        <p>
                          <span className="text-gray-800 p-2 font-bold">
                            Color:{" "}
                          </span>

                          {info.color}
                        </p>
                        <p>
                          <span className="text-gray-800 p-2 font-bold">
                            Subtotal:{" "}
                          </span>
                          ${info.subtotal}
                        </p>
                        <p>
                          <span className="text-gray-800 p-2 font-bold">
                            Pago:{" "}
                          </span>

                          {info.pago}
                        </p>
                        <p>
                          <span className="text-gray-800 p-2 font-bold">
                            Fecha:{" "}
                          </span>

                          {info.fecha}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            <button
              className="border p-2 rounded-md border-gray-400 hover:shadow-md hover:border-gray-200 hover:bg-gray-200 hover:text-gray-500"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabViewSale;
