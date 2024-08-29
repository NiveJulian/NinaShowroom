import React from 'react'

const StepPayment = ({
    formaPago,
    handleFormaPagoChange,
    prevStep,
    handleCreateVenta,
  }) => (
    <div>
      <h2>Forma de Pago</h2>
      <div className="flex gap-2 mt-2 justify-center items-center">
        <button
          onClick={() => handleFormaPagoChange("Efectivo")}
          className={`border p-2 text-gray-500 w-40 hover:bg-gray-100 shadow-md active:translate-y-[2px] ${
            formaPago === "Efectivo" ? "border-primary bg-primary text-white" : "border-gray-400"
          }`}
        >
          Efectivo
        </button>

        <button
          onClick={() => handleFormaPagoChange("Mercadopago")}
          className={`border p-2 text-gray-500 w-40 hover:bg-gray-100 shadow-md active:translate-y-[2px] ${
            formaPago === "Mercadopago" ? "border-blue-500 bg-blue-400 text-white" : "border-gray-400"

          }`}
        >
          Mercado Pago
        </button>
        {/* Resto de los botones de forma de pago */}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={prevStep}
          className="border p-2 text-white bg-gray-800 hover:bg-gray-700"
        >
          Anterior
        </button>
        <button
          onClick={handleCreateVenta}
          className="border p-2 text-white bg-gray-800 w-full hover:bg-gray-700"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );

export default StepPayment