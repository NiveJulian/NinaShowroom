import instance from "../../api/axiosConfig";
import renderEmail from "../../componentes/Mails/renderEmail";
import renderEmailOrder from "../../componentes/Mails/renderEmailOrder";

export const sendEmail = async (userMail, paymentDetail) => {
  const emailContent = {
    to: userMail,
    subject: "Gracias por tu compra",
    message: renderEmail(paymentDetail), // Renderiza el HTML en el frontend
  };

  try {
    const response = await instance.post(`/api/mails/`, emailContent);
    return response;
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
    throw error; // Lanza el error para que pueda ser capturado en createSale
  }
};

export const sendEmailOrder = async (userMail, paymentDetail) => {
  const emailContent = {
    to: userMail,
    subject: "Tenes una nueva Venta!",
    message: renderEmailOrder(paymentDetail), // Renderiza el HTML en el frontend
  };

  try {
    const response = await instance.post(`/api/mails/`, emailContent);
    return response;
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
    throw error; // Lanza el error para que pueda ser capturado en createSale
  }
};
