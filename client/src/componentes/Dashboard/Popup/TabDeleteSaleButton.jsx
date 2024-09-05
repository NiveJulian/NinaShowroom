import React from "react";
import { useDispatch } from "react-redux";
import { deleteSaleRow } from "../../../redux/actions/salesActions";
import Loader from "../../Ecommerce/Loader/Loader";

const TabDeleteSaleButton = ({ rowIndex, onClose, loading }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteSaleRow(rowIndex));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white p-6 flex flex-col gap-2 justify-center items-center rounded-md m-6">
          <div className="justify-center items-center">
            <h1>¿Estás seguro/a de eliminar este producto?</h1>
          </div>
          <div className="flex flex-row gap-2">
            <button
              className="border p-2 rounded-md border-gray-400 hover:shadow-md hover:border-gray-200 hover:bg-gray-200 hover:text-gray-500"
              onClick={onClose}
            >
              Cerrar
            </button>
            <button
              className="border p-2 rounded-md border-red-400 hover:shadow-md hover:border-red-200 hover:bg-red-200 hover:text-white"
              onClick={() => handleDelete()}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabDeleteSaleButton;
