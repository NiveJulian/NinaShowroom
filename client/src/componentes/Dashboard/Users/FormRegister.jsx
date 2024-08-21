import React, { useState } from "react"; // Asegúrate de que la ruta sea correcta
import {
  createNewUser,
  doSignInWithEmailAndPassword,
} from "../../../firebase/auth";

export const FormRegister = () => {
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        email,
        password,
        name,
        state,
        address,
        postalCode,
        role: "user",
      };
      await createNewUser(data);
    } catch (error) {
      console.error("Error al ingresar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center text-center text-gray-500 mb-4 font-bold">
        <h1 className="text-4xl">Registrate</h1>
      </div>
      <div className="flex justify-center items-center text-center mt-2">
        <label
          className="p-2 border border-gray-300 bg-pink-500 text-white rounded-l-md"
          htmlFor="name"
        >
          Nombre
        </label>
        <input
          className="p-2 border border-gray-400 w-full rounded-r-md"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-center items-center text-center mt-2">
        <label
          className="p-2 border border-gray-300 bg-pink-500 text-white rounded-l-md"
          htmlFor="email"
        >
          Correo
        </label>
        <input
          className="p-2 border border-gray-400 w-full rounded-r-md"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-row text-center mt-2 gap-2">
        <div className="flex justify-center items-center">
          <label
            className="p-2 border border-gray-300 bg-pink-500 text-white rounded-l-md"
            htmlFor="state"
          >
            Provincia
          </label>
          <input
            className="p-2 border border-gray-400 rounded-r-md"
            type="text"
            name="state"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center items-center">
          <label
            className="p-2 border border-gray-300 bg-pink-500 text-white rounded-l-md"
            htmlFor="postalCode"
          >
            CP
          </label>
          <input
            className="p-2 border border-gray-400 rounded-r-md"
            type="text"
            name="postalCode"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex justify-center items-center text-center mt-2">
        <label
          className="p-2 border border-gray-300 bg-pink-500 text-white rounded-l-md"
          htmlFor="address"
        >
          Direccion
        </label>
        <input
          className="p-2 border border-gray-400 w-full rounded-r-md"
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-center items-center text-center mt-2">
        <label
          className="p-2 border border-gray-300 bg-pink-500 text-white rounded-l-md"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="p-2 border border-gray-400 w-full rounded-r-md"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="p-2 border mt-3 bg-secondary text-white rounded-full hover:bg-primary w-full"
      >
        Ingresar
      </button>
    </form>
  );
};
