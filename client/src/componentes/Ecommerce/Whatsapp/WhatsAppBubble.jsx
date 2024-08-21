import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const WhatsAppBubble = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const phoneNumber = "2614161558";

  // Maneja la redirección a WhatsApp con mensaje
  const handleSendMessage = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    setMessage(""); // Limpia el mensaje después de enviarlo
  };

  // Maneja el cierre del cuadro de bienvenida o del chat
  const handleClose = () => {
    setIsVisible(false);
    setIsChatOpen(false); // Asegura que el chat se cierre también
  };

  // Abre el cuadro de mensaje cuando se hace clic en la burbuja
  const handleBubbleClick = () => {
    setIsChatOpen(true);
    setIsVisible(false); // Oculta el cuadro de bienvenida cuando se abre el chat
  };

  // Oculta automáticamente el cuadro de bienvenida después de 20 segundos
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 20000);

      return () => clearTimeout(timer); // Limpia el temporizador cuando el componente se desmonta
    }
  }, [isVisible]);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center z-50">
      {isVisible && !isChatOpen && (
        <div className="bg-white p-2 rounded shadow-lg mb-2 flex items-center transition-opacity duration-300">
          <span className="absolute top-0 left-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
          <span className="text-black mr-2">
            ¡Hola! 👋 Un asesor ya está listo para ayudarte.
          </span>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <AiOutlineClose size={18} />
          </button>
        </div>
      )}
      {isChatOpen && (
        <div className="bg-white p-4 rounded shadow-lg mb-2 flex flex-col items-center transition-opacity duration-300 w-64">
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-black">
              ¡Hola! 👋 ¿En qué podemos ayudarte?
            </span>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <AiOutlineClose size={18} />
            </button>
          </div>
          <textarea
            className="border rounded p-2 w-full resize-none"
            rows="3"
            placeholder="Escribe tu mensaje aquí..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-500 text-white rounded-full p-2 mt-2 flex items-center justify-center w-full"
          >
            <FaWhatsapp size={20} className="mr-2" />
            Enviar a WhatsApp
          </button>
        </div>
      )}
      {!isChatOpen && (
        <div className="relative">
          {/* Contenedor con la animación de rotación de la sombra */}
          <div className="absolute top-0 left-0 w-14 h-14 rounded-full border border-white animate-ping"></div>
          <div
            className="w-14 h-14 bg-green-500 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:animate-pulse"
            onClick={handleBubbleClick}
          >
            <FaWhatsapp size={24} className="text-white relative" />
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppBubble;
