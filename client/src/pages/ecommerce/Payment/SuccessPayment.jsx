import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/cart");
    }, 3000); // 3000 milisegundos = 3 segundos

    // Limpia el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col text-center justify-center items-center flex-wrap">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-32 text-teal-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
          />
        </svg>
        <h1 className="text-5xl font-semibold text-teal-500">
          Pago realizado con exito!{" "}
        </h1>
        <span className="text-6xl text-secondary">
          Muchas gracias por elegir a
        </span>{" "}
        <span className="text-7xl mt-8 text-primary font-bold italic">
          NINA
        </span>
      </div>
    </div>
  );
};

export default SuccessPayment;
