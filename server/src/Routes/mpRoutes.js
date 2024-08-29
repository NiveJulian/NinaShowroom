const { Router } = require("express");
const mpRouter = Router();
const {
  createPayment,
  handlePaymentNotification,
  // getPaymentStatus,
} = require("../Controllers/mercadopago/mpControllers");

// Ruta para crear un nuevo pago
mpRouter.post("/create-payment", createPayment);

// Ruta para manejar notificaciones de pagos
mpRouter.post("/webhook", handlePaymentNotification);

// Ruta para obtener el estado de un pago
// mpRouter.get("/payment-status/:id", getPaymentStatus);

module.exports = mpRouter;
