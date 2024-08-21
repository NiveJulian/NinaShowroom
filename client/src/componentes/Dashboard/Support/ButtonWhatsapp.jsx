// /src/componentes/Support/ButtonWhatsapp.jsx

import React from "react";

const ButtonWhatsapp = ({ whatsappLink, logo, name }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center border border-secondary p-4 rounded-lg hover:animate-pulse">
      <a
        href={whatsappLink}
        className="rounded-full p-2 object-cover hover:animate-pulse border w-36 border-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={logo}
          alt={`${name} WhatsApp`}
          className="w-32 h-32 rounded-full"
        />
      </a>
      <span className="font-bold text-lg m-2">{name}</span>
      <p className="w-64 text-gray-400">Apreta click a la imagen para comunicarte con el desarrollador</p>
    </div>
  );
};

export default ButtonWhatsapp;
