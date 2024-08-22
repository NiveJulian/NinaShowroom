import React from "react";
import Delivery from "../Delivery/Delivery";

const StepShipping = ({
  formCliente,
  handleFormClienteChange,
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
  prevStep,
  nextStep,
}) => (
  <div>
    <h2>Información de Envío</h2>
    {/* Aquí va el componente o campos para la información de envío */}
    <div className="mt-2 flex justify-center items-center">
      <label
        className="border border-primary bg-secondary text-white p-2 text-center"
        htmlFor="provincia"
      >
        Provincia
      </label>
      <input
        type="text"
        name="provincia"
        value={formCliente.provincia}
        onChange={handleFormClienteChange}
        className="border p-2 w-full border-gray-500"
        placeholder="Provincia"
      />
    </div>
    <div className="mt-2 flex justify-center items-center">
      <label
        className="border border-primary bg-secondary text-white p-2 text-center"
        htmlFor="cp"
      >
        CP
      </label>
      <input
        type="text"
        name="cp"
        value={formCliente.cp}
        onChange={handleFormClienteChange}
        className="border p-2 w-full border-gray-500"
        placeholder="Código Postal"
      />
    </div>
    <div className="mt-2 flex justify-center items-center">
      <label
        className="border border-primary bg-secondary text-white p-2 text-center"
        htmlFor="direccion"
      >
        Direccion
      </label>
      <input
        type="text"
        name="direccion"
        value={formCliente.direccion}
        onChange={handleFormClienteChange}
        className="border p-2 w-full border-gray-500"
        placeholder="direccion"
      />
    </div>
    <div className="mt-2">
      <Delivery
        selectedOption={selectedDeliveryMethod}
        setSelectedOption={setSelectedDeliveryMethod}
      />
    </div>
    <div className="flex justify-between mt-4">
      <button
        onClick={prevStep}
        className="border p-2 text-white bg-gray-400 hover:bg-gray-500"
      >
        Anterior
      </button>
      <button
        onClick={nextStep}
        className="border p-2 text-white bg-primary hover:bg-gray-700"
      >
        Siguiente
      </button>
    </div>
  </div>
);
export default StepShipping;
