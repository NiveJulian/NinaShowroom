import React, { useState } from "react";
import Loader from "../../Ecommerce/Loader/Loader";

const TabViewSale = ({ isOpen, onClose, sale, loading }) => {
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

  // Obtener solo el primer objeto de la lista de ventas para formas de envío
  const primerVenta = sale[0] || {};

  // Mapear las formas de envío del primer objeto
  const formasEnvio = primerVenta?.formaEnvio ? (
    <li className="bg-gray-100 p-4 rounded-lg mb-2">
      <p>
        <span className="font-bold">Forma de Envío: </span>
        {primerVenta?.formaEnvio}
      </p>
      <p>
        <span className="font-bold">Dirección: </span>
        {primerVenta?.direccion}
      </p>
      <p>
        <span className="font-bold">Provincia: </span>
        {primerVenta?.provincia}
      </p>
      <p>
        <span className="font-bold">Código Postal: </span>
        {primerVenta?.cp}
      </p>
      <p>
        <span className="font-bold">Teléfono: </span>
        {primerVenta?.celular}
      </p>
      <p>
        <span className="font-bold">Correo: </span>
        {primerVenta?.correo}
      </p>
      <p>
        <span className="font-bold">Hora: </span>
        {primerVenta?.hora}
      </p>
      {primerVenta.paymentInfo ? (
        <p>
          <span className="font-bold">Estado del pago: </span>
          <span
            className={`p-2 border border-gray-200 rounded-md bg-gray-400 text-white ${
              primerVenta?.paymentInfo === "approved" ? "bg-green-500" : ""
            }`}
          >
            {primerVenta?.paymentInfo}
          </span>
        </p>
      ) : (
        ""
      )}
    </li>
  ) : (
    <p>No hay información de envío disponible</p>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`flex flex-col md:flex-row mx-2 md:mx-8 md:h-4/5 h-full w-full overflow-y-scroll md:overflow-hidden bg-gray-200 md:w-4/5 rounded-lg`}
        >
          <div className="p-8 rounded-3xl w-full md:w-1/2">
            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full bg-gray-900 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-white hover:text-gray-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
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
                <h3 className="font-medium text-lg tracking-tight text-gray-900 leading-tight">
                  Información de ventas
                </h3>
                <p className="text-sm font-normal text-gray-400 leading-none">
                  Fecha {primerVenta?.fecha}
                </p>
              </div>
            </div>
            <div className="mt-9 relative flex flex-col gap-2.5">
              {sale &&
                sale.map((info, i) => (
                  <div key={i}>
                    <button onClick={() => toggleExpand(i)} className="w-full">
                      <div
                        className={`flex items-center space-x-4 p-3.5 bg-gray-100`}
                      >
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
                          <h3 className="text-sm font-medium">
                            {info.cliente}
                          </h3>
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
                      <div className="w-full bg-gray-100 absolute -mt-2 p-2 rounded-md">
                        <div className="flex justify-center items-center flex-col">
                          <p>
                            <span className="text-gray-800 p-2 font-bold">
                              Cod. Producto:
                            </span>

                            {info.idProducto}
                          </p>
                          <p>
                            <span className="text-gray-800 p-2 font-bold">
                              SKU:
                            </span>

                            {info.sku}
                          </p>
                          <p>
                            <span className="text-gray-800 p-2 font-bold">
                              Talle:
                            </span>

                            {info.talle}
                          </p>
                          <p>
                            <span className="text-gray-800 p-2 font-bold">
                              Color:
                            </span>

                            {info.color}
                          </p>
                          <p>
                            <span className="text-gray-800 p-2 font-bold">
                              Subtotal:
                            </span>
                            ${info.subtotal}
                          </p>
                          <p>
                            <span className="text-gray-800 p-2 font-bold">
                              Pago:
                            </span>

                            {info.pago}
                          </p>
                          <p>
                            <span className="text-gray-800 p-2 font-bold">
                              Fecha:
                            </span>

                            {info.fecha}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="md:w-1/2 p-8 w-full rounded-3xl">
            <div className="flex justify-center items-center space-x-2">
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
              <div className="md:space-y-0.5 md:flex-1">
                <h3 className="font-medium textLg tracking-tight text-gray-900 leading-tight">
                  Informacion de Envío
                </h3>
              </div>
            </div>
            <ul className="mt-8">{formasEnvio}</ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabViewSale;
