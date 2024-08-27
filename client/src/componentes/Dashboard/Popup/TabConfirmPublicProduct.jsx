import React from "react";
import { useDispatch } from "react-redux";
import { publicProductById } from "../../../redux/actions/actions";

const TabConfirmPublicProduct = ({ id, onClose }) => {
  const dispatch =  useDispatch()
  const handleActiveProduct = () => {
    dispatch(publicProductById(id))
    console.log(id);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 flex flex-col gap-8 justify-center items-center rounded-md m-6">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-semibold text-lg">
            Estas a punto de publicar un producto!
          </h1>
          <p className="text-sm text-gray-500">Al confirmar este producto se vera en la pagina principal</p>
        </div>
        <div className="flex flex-row gap-2">
          <button
            className="border p-2 rounded-md border-gray-400 hover:shadow-md hover:border-gray-200 hover:bg-gray-200 hover:text-gray-500"
            onClick={onClose}
          >
            Cerrar
          </button>
          <button
            className="border p-2 rounded-md bg-blue-600 text-white border-blue-400 hover:shadow-md hover:border-blue-500 hover:bg-blue-200 hover:text-gray-500"
            onClick={() => handleActiveProduct()}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabConfirmPublicProduct;
