import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FailurePayment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/cart");
    }, 2000); // 2000 milisegundos = 2 segundos

    // Limpia el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-row">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-12 text-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <h1 className="text-5xl font-semibold text-black">Pago fallido!</h1>
      </div>
    </div>
  );
};

export default FailurePayment;
