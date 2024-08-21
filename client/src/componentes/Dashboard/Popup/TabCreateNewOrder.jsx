import React from "react";

const TabCreateNewOrder = ({ onClose, isOpen, product }) => {
  if (!isOpen) {
    return null;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form
        className="bg-white h-auto text-center shadow-md p-6 rounded-xl w-1/3 m-2 flex flex-col"
        onSubmit={handleSubmit}
      >
        <button
          onClick={onClose}
          className="text-gray-400 flex text-3xl hover:text-gray-500"
        >
          &times;
        </button>
        <button
          type="submit"
          className="p-4 shadow-lg bg-blue-300 text-gray-500 rounded-md text-center border mt-2 hover:bg-blue-500 hover:text-white active:translate-y-1 active:bg-blue-500 w-full"
        >
          {product ? "Editar" : "Crear"} producto
        </button>
      </form>
    </div>
  );
};

export default TabCreateNewOrder;
