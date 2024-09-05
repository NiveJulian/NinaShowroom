import { FaWhatsapp } from "react-icons/fa";
import Loader from "../../Ecommerce/Loader/Loader";
import { useEffect, useState } from "react";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

const SheetsSales = ({ data, onViewSale, toggleDelete, changeState }) => {
  const [visibleProducts, setVisibleProducts] = useState(9); // Mostrar 8 productos inicialmente

  // Control de los productos actuales visibles basados en el estado visibleProducts
  const currentProducts = data.slice(0, visibleProducts);

  useEffect(() => {
    setVisibleProducts(9); // Reiniciar a 9 productos visibles cuando cambien los productos
  }, [data]);

  const handleLoadMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 9); // Incrementa los productos visibles en 9 cada vez que se presiona el botón
  };

  const handleSendMessage = (phoneNumber) => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border border-gray-300 rounded-md">
        {currentProducts.length > 0 ? (
          currentProducts.map((prod, index) => (
            <div
              key={index}
              className="border border-gray-400 p-4 rounded-lg shadow-lg flex flex-col justify-between"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold mb-2">Venta #{prod.id}</h3>
                <div className="flex flex-col-reverse justify-end items-end gap-2">
                  <span className={`flex gap-1 border border-gray-400 p-1 rounded-md bg-gray-200 ${prod.hora !== "" ? "" : "invisible" }`}>
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    {prod.hora}
                  </span>
                  <span
                    className={`p-2 border border-gray-300 rounded-md ${
                      prod.estadoPago === "Confirmada"
                        ? "bg-green-400 text-white"
                        : prod.estadoPago === "Pendiente"
                        ? "bg-orange-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {prod.estadoPago}
                  </span>
                </div>
              </div>
              <div>
                <p>
                  <strong>Cliente:</strong> {prod.cliente}
                </p>
                <p>
                  <strong>Forma de pago:</strong> {prod.pago}
                </p>
                <p>
                  <strong>Total:</strong> ${prod.total}
                </p>
                <p>
                  <strong>Medio:</strong> {prod.medio}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4 w-full rounded-md p-1">
                <div className="flex border border-gray-300 p-2 rounded-md bg-gray-200 gap-2 text-xs">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                    <path
                      fillRule="evenodd"
                      d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {prod.fecha}
                </div>
                <div className="flex flex-row">
                  <button
                    onClick={() => handleSendMessage(prod.celular)}
                    className={`hover:text-green-500 hover:border-green-500 border border-gray-200 rounded-full p-2 mr-2 ${
                      prod.celular !== "" ? "block" : "invisible"
                    }`}
                  >
                    <FaWhatsapp size={22} className="relative" />
                  </button>
                  <button
                    className="hover:text-blue-500 hover:border-blue-500 border border-gray-200 rounded-full p-2 mr-2"
                    onClick={() => changeState(prod.id, prod.estadoPago)}
                  >
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
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                  <button
                    className="hover:text-green-500 hover:border-green-500 border border-gray-200 rounded-full p-2 mr-2"
                    onClick={() => onViewSale(prod)}
                  >
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
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </button>
                  <button
                    className="hover:text-red-500 hover:border-red-500 border border-gray-200 rounded-full p-2"
                    onClick={() => toggleDelete(prod.id)}
                  >
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
      {visibleProducts < data.length && (
        <div className="flex justify-center items-center w-full mt-4">
          <InfiniteScroll
            visibleProducts={visibleProducts}
            totalProducts={data.length}
            onLoadMore={handleLoadMore}
            text={"Ver más ventas"}
          />
        </div>
      )}
    </div>
  );
};

export default SheetsSales;

