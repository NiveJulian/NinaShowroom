import React from "react";

const TabConfirmStateChangeSale = ({ isOpen, buttonChange, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 flex flex-col gap-4 justify-center items-center rounded-md m-6 h-auto">
        <div className="relative w-full">
          <button
            className="absolute top-1 right-2 rounded-full text-2xl text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-lg font-semibold">Estado del Pedido</h1>
          <p>Vamos a avisar al cliente cómo está su pedido</p>
        </div>
        <div className="flex flex-row gap-2">
          <button
            className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => buttonChange("Pendiente")}
          >
            Pendiente
          </button>
          <button
            className="px-4 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600"
            onClick={() => buttonChange("Enproceso")}
          >
            En proceso
          </button>
          <button
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-teal-600"
            onClick={() => buttonChange("Confirmada")}
          >
            Confirmada
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabConfirmStateChangeSale;
