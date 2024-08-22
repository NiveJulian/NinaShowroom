import React from "react";

const StepContact = ({ formCliente, handleFormClienteChange, nextStep }) => (
  <div>
    <h2>Información de Contacto</h2>
    <div className="mt-2 flex justify-center items-center">
      <label
        className="border border-primary bg-secondary text-white p-2 text-center"
        htmlFor="nombre"
      >
        Nombre
      </label>
      <input
        type="text"
        name="nombre"
        value={formCliente.nombre}
        onChange={handleFormClienteChange}
        className="border p-2 w-full border-gray-500"
        placeholder="Nombre"
      />
    </div>
    <div className="mt-2 flex justify-center items-center">
      <label
        className="border border-primary bg-secondary text-white p-2 text-center"
        htmlFor="correo"
      >
        Correo
      </label>
      <input
        type="email"
        name="correo"
        value={formCliente.correo}
        onChange={handleFormClienteChange}
        className="border p-2 w-full border-gray-500"
        placeholder="Email"
      />
    </div>
    <div className="mt-2 flex justify-center items-center">
      <label
        className="border border-primary bg-secondary text-white p-2 text-center"
        htmlFor="celular"
      >
        Celular
      </label>
      <input
        type="text"
        name="celular"
        value={formCliente.celular}
        onChange={handleFormClienteChange}
        className="border p-2 w-full border-gray-500"
        placeholder="Número de celular"
      />
    </div>
    {/* Resto de los campos */}
    <button
      onClick={nextStep}
      className="border p-2 text-white bg-primary w-full hover:bg-pink-700 mt-4"
    >
      Siguiente
    </button>
  </div>
);

export default StepContact;
