const mercadopago = require("mercadopago");

// Configura tu clave de acceso de Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

const createPayment = async (req, res) => {
  try {
    const { items, payer } = req.body;

    // Crear una preferencia de pago
    const preference = {
      items: items,
      payer: payer,
      back_urls: {
        success: process.env.MERCADOPAGO_SUCCESS_URL,
        failure: process.env.MERCADOPAGO_FAILURE_URL,
        pending: process.env.MERCADOPAGO_PENDING_URL,
      },
      auto_return: "approved",
    };

    const response = await mercadopago.Preference.create(preference);
    res.json({ id: response.body.id, init_point: response.body.init_point });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Error al crear el pago" });
  }
};

const handlePaymentNotification = async (req, res) => {
  try {
    const paymentId = req.query["data.id"];

    if (paymentId) {
      const payment = await mercadopago.Payment.findById(paymentId);

      // Aquí puedes procesar la notificación como guardar en base de datos, etc.
      console.log("Payment notification received:", payment);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error handling payment notification:", error);
    res.status(500).json({ error: "Error al procesar la notificación" });
  }
};

const getPaymentStatus = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await mercadopago.Payment.findById(paymentId);

    res.json(payment.body);
  } catch (error) {
    console.error("Error getting payment status:", error);
    res.status(500).json({ error: "Error al obtener el estado del pago" });
  }
};

module.exports = {
  createPayment,
  handlePaymentNotification,
  getPaymentStatus,
};
