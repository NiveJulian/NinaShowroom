const { MercadoPagoConfig, Preference } = require("mercadopago");
require("dotenv").config();
const { google } = require("googleapis");
const {
  authorize,
  appendRowPayment,
  getSaleData,
} = require("../sheets/sheetsController");

// Configura tu clave de acceso de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

const createPayment = async (req, res) => {
  const { productos, cliente, total } = req.body;

  const items = productos.map((producto) => ({
    id: producto.id,
    title: producto.nombre,
    quantity: Number(producto.cantidad),
    unit_price: Number(producto.precio),
    currency_id: "ARS", // Asumiendo que usas pesos argentinos (ARS)
    description: `Color: ${producto.color}, Talle: ${
      producto.talle ? producto.talle : "N/A"
    }, SKU: ${producto.sku}`, // Agregar detalles adicionales si es necesario
  }));

  const body = {
    items: items,
    payer: {
      name: cliente.nombre,
      email: cliente.correo,
      phone: {
        number: cliente.celular,
      },
      address: {
        zip_code: cliente.cp,
        street_name: cliente.direccion,
      },
    },
    back_urls: {
      success: "http://localhost:5173/success",
      failure: "http://localhost:5173/failure",
      pending: "http://localhost:5173/pending",
    },
    auto_return: "approved",
    notification_url:
      "https://joe-referral-inclusion-walking.trycloudflare.com/api/mp/webhook", // Cambia esto a tu URL de notificaciones
    statement_descriptor: "Nina Showroom",
  };

  try {
    const preference = await new Preference(client).create({ body });
    res.json({ redirectUrl: preference.init_point });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Error al crear el pago" });
  }
};

const handlePaymentNotification = async (req, res) => {
  const paymentId = req.query.id;

  try {
    // Obtener los detalles del pago de MercadoPago
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${client.accessToken}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const auth = await authorize();

      // Obtener el último ID de venta registrado
      const { lastId } = await getSaleData(auth);

      // Extraer los datos relevantes y añadir el ID de la venta
      const paymentDetails = [
        lastId, // Último ID de la venta registrado
        data.order.id, // OrdenId
        data.id, // PagoID
        data.status, // Estado
        data.status_detail, // DetalleEstado
        data.date_created, // Fec Creacion
        data.date_approved, // Fec Aprobado
        data.transaction_amount, // Monto total
        data.installments, // Cuotas
        data.payer.id, // Pagador
        data.payer.email, // Email
        data.payer.identification?.number || "", // DNI
        data.payer.first_name || "", // Nombre
        data.payer.last_name || "", // Apellido
      ];

      // Registrar en Google Sheets
      await appendRowPayment(auth, paymentDetails);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error handling payment notification:", error);
    res.status(500).json({ error: "Error al procesar la notificación" });
  }
};

const getPaymentsMercadopago = async (req, res) => {
  try {
    const auth = await authorize();
    const sheets = google.sheets({ version: "v4", auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "PagosMp!A2:N", // Asegúrate de que el rango cubra todas las columnas necesarias
    });

    const rows = response.data.values || [];

    const paymentsMp = rows.map((row) => ({
      ventaId: row[0],
      ordenId: row[1],
      pagoId: row[2],
      estado: row[3],
      detalleEstado: row[4],
      fecCreacion: row[5],
      fecAprobado: row[6],
      montoTotal: parseFloat(row[7]),
      cuotas: parseInt(row[8]),
      idPagador: row[9],
      email: row[10],
      dni: row[11],
      nombre: row[12],
      apellido: row[13],
    }));

    res.json({ paymentsMp });
  } catch (error) {
    console.error("Error al obtener los pagos de MercadoPago:", error.message);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createPayment,
  handlePaymentNotification,
  getPaymentsMercadopago,
};
