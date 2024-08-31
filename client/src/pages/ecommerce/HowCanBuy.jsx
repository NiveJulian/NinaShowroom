import React from "react";
import Navigation from "../../componentes/Ecommerce/Nav/Navigation";
import FooterPage from "../../componentes/Ecommerce/Footer/FooterPage";

const HowCanBuy = () => {
  return (
    <>
      <Navigation />
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-semibold italic mt-4 mb-4">
            ¿Como <span className="text-secondary">comprar?</span>
          </h1>
          <div
            className="w-full mt-4 mb-16 gap-6 md:mb-10
           grid grid-cols-2 md:grid-cols-3 md:gap-4"
          >
            <div className="flex w-auto md:w-64 flex-col p-2 border border-gray-500 rounded-md hover:animate-pulse">
              <div className="relative w-full">
                <span className="absolute text-4xl left-2 -top-10 md:top-0 z-10 font-bold text-white p-2">
                  1
                </span>
                <span className="absolute size-14 -top-9 md:top-1 font-bold bg-secondary p-4 border border-primary rounded-full"></span>
              </div>
              <div className="p-2 flex flex-col gap-4 justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>

                <h2 className="text-xl font-bold text-gray-500">Registrate</h2>
              </div>
              <div className="flex justify-center items-center p-2 text-center text-gray-600">
                <p>
                  Selecciona el link "registrate" ubicado en la esquina superior
                  derecha de la página.
                </p>
              </div>
            </div>
            <div className="flex w-auto md:w-64 flex-col p-2 border border-gray-500 rounded-md hover:animate-pulse">
              <div className="relative w-full">
                <span className="absolute text-4xl left-2 -top-10 md:top-0 z-10 font-bold text-white p-2">
                  2
                </span>
                <span className="absolute size-14 -top-9 md:top-1 font-bold bg-secondary p-4 border border-primary rounded-full"></span>
              </div>
              <div className="p-2 flex flex-col gap-2 md:gap-4 text-center justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>

                <h2 className="text-xl font-bold text-gray-500">Completa</h2>
              </div>
              <div className="flex justify-center items-center p-2 text-center text-gray-600">
                <p>
                  Completá tus datos personales y presioná "registrarme". Accedé
                  al catálogo completo.
                </p>
              </div>
            </div>
            <div className="flex w-auto md:w-64 flex-col justify-center items-center p-2 border border-gray-500 rounded-md hover:animate-pulse">
              <div className="relative w-full">
                <span className="absolute text-4xl -top-10 md:top-0 left-3 z-10 font-bold text-white p-2">
                  3
                </span>
                <span className="absolute size-14 -top-9 md:top-1 left-[2px] font-bold bg-secondary p-4 border border-primary rounded-full"></span>
              </div>
              <div className="p-2 relative flex flex-col gap-4 justify-center items-center">
                <div className="border border-gray-800 rounded-full p-2">
                  <div className="block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
                      />
                    </svg>
                  </div>
                  <div className="absolute left-8 top-8">
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
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-500">Navega</h2>
              </div>
              <div className="flex justify-center items-center p-2 text-center text-gray-600">
                <p>
                  Agregá a tu carrito los productos que quieras. Luego,
                  seleccionalo para verlo en detalle.
                </p>
              </div>
            </div>
            <div className="flex w-auto md:w-64 flex-col p-2 border border-gray-500 rounded-md hover:animate-pulse">
              <div className="relative w-full">
                <span className="absolute text-4xl left-2 -top-10 md:top-0 z-10 font-bold text-white p-2">
                  4
                </span>
                <span className="absolute size-14 -top-9 md:top-1 font-bold bg-secondary p-4 border border-primary rounded-full"></span>
              </div>
              <div className="p-2 flex gap-2 flex-col justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>

                <h2 className="text-xl font-bold text-gray-500">Verifica</h2>
              </div>
              <div className="flex justify-center items-center p-2 text-center text-gray-600">
                <p>Verifica los detalles y el mínimo de tu compra.</p>
              </div>
            </div>
            <div className="flex w-auto md:w-64 flex-col p-2 border border-gray-500 rounded-md hover:animate-pulse">
              <div className="relative w-full">
                <span className="absolute text-4xl left-2 -top-10 md:top-0 z-10 font-bold text-white p-2">
                  5
                </span>
                <span className="absolute size-14 -top-9 md:top-1 font-bold bg-secondary p-4 border border-primary rounded-full"></span>
              </div>
              <div className="p-2 flex flex-col gap-4 justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                  />
                </svg>

                <h2 className="text-xl font-bold text-gray-500">Elegí</h2>
              </div>
              <div className="flex justify-center items-center p-2 text-center text-gray-600">
                <p>
                  Elegí la forma de entrega más conveniente y luego seleccioná
                  la forma de pago.
                </p>
              </div>
            </div>
            <div className="flex w-auto md:w-64 flex-col p-2 border border-gray-500 rounded-md hover:animate-pulse">
              <div className="relative w-full">
                <span className="absolute text-4xl left-2 -top-10 md:top-0 z-10 font-bold text-white p-2">
                  6
                </span>
                <span className="absolute size-14 -top-9 md:top-1 font-bold bg-secondary p-4 border border-primary rounded-full"></span>
              </div>
              <div className="p-2 flex flex-col gap-4 justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  />
                </svg>

                <h2 className="text-xl font-bold text-gray-500">Disfruta</h2>
              </div>
              <div className="flex justify-center items-center p-2 text-center text-gray-600">
                <p>
                  ¡Listo! Podés ingresar a tu casilla de correo y ver tu compra
                  en detalle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default HowCanBuy;
