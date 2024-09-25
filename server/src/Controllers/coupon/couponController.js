// controllers/couponController.js

const moment = require("moment");
const { google } = require("googleapis");
const { v4: uuidv4 } = require("uuid"); // Para generar IDs únicos
const { authorize } = require("../sheets/sheetsController");

const createCoupon = async (req, res) => {
  try {
    const auth = await authorize();
    const sheets = google.sheets({ version: "v4", auth });

    const {
      code,
      name,
      discountType,
      discountValue,
      expirationDate,
      usageLimit,
      categories, // Recibir las categorías
    } = req.body;

    if (!code || !name || !discountType || !discountValue || !expirationDate || !usageLimit || !categories) {
      return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    const id = uuidv4();
    const usageCount = 0;

    const newCoupon = [
      id,
      code,
      name,
      discountType,
      discountValue,
      expirationDate,
      "active",
      usageLimit,
      usageCount,
      categories.join(", "), // Almacenar las categorías seleccionadas en una cadena
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Cupones!A:J",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      resource: {
        values: [newCoupon],
      },
    });

    return res.status(201).json({ message: "Cupón creado exitosamente", data: newCoupon });
  } catch (error) {
    console.error("Error creando el cupón:", error.message);
    return res.status(500).json({ message: "Error creando el cupón", error: error.message });
  }
};

const toggleCouponStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    const auth = await authorize();
    const sheets = google.sheets({ version: "v4", auth });

    if (!["activate", "deactivate"].includes(action)) {
      return res
        .status(400)
        .json({ message: 'La acción debe ser "activate" o "deactivate".' });
    }

    // Obtener todas las filas de "Cupones"
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Cupones!A:I",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No se encontraron cupones." });
    }

    // Encontrar la fila que coincide con el ID
    const rowIndex = rows.findIndex((row) => row[0] === id);
    if (rowIndex === -1) {
      return res.status(404).json({ message: "Cupón no encontrado." });
    }

    // Determinar el nuevo estado
    const newStatus = action === "activate" ? "active" : "inactive";

    // Actualizar el estado en la fila del cupón
    const rangeToUpdate = `Cupones!G${rowIndex + 1}:G${rowIndex + 1}`; // +2 para ajustarse a la fila correcta

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: rangeToUpdate, // Rango específico para la columna de estado
      valueInputOption: "RAW",
      resource: {
        values: [[newStatus]], // Actualiza solo el estado
      },
    });

    return res.status(200).json({
      message: `Cupón ${
        action === "activate" ? "activado" : "desactivado"
      } exitosamente.`,
    });
  } catch (error) {
    console.error("Error al cambiar el estado del cupón:", error.message);
    return res.status(500).json({
      message: "Error al cambiar el estado del cupón",
      error: error.message,
    });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const auth = await authorize();
    const sheets = google.sheets({ version: "v4", auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Cupones!A:I",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(200).json({ coupons: [] });
    }

    // Convertir las filas a objetos
    const coupons = rows.slice(1).map((row) => ({
      id: row[0],
      code: row[1],
      name: row[2],
      discountType: row[3],
      discountValue: row[4],
      expirationDate: row[5],
      status: row[6],
      usageLimit: row[7],
      usageCount: row[8],
    }));

    return res.status(200).json({ coupons });
  } catch (error) {
    console.error("Error obteniendo cupones:", error.message);
    return res
      .status(500)
      .json({ message: "Error obteniendo cupones", error: error.message });
  }
};

async function validateCouponAndCalculateTotal(auth, data) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const { productos, codigoDescuento } = data;

    // Calcular el total sin descuento
    let totalVenta = productos.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);

    // Validar el código de descuento
    let descuentoAplicado = 0;
    let descuentoType = "";
    let descuentoValue = 0;

    if (codigoDescuento) {
      const responseCoupons = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: "Cupones!A:J", // Asegúrate de que esta columna incluya las categorías (columna J en este caso)
      });

      const cupones = responseCoupons.data.values || [];

      // Buscar el cupón que coincida con el código y esté activo
      const cupon = cupones.find((row) => row[1] === codigoDescuento && row[6] === "active");

      if (cupon) {
        const expirationDate = moment(cupon[5], "YYYY-MM-DD HH:mm:ss");
        const currentDate = moment();

        // Verificar si el cupón ha expirado
        if (currentDate.isAfter(expirationDate)) {
          return { message: "El cupón ha expirado", total: totalVenta, descuento: 0, isValid: false };
        }

        // Obtener las categorías asociadas al cupón
        const categoriasDelCupon = cupon[9]?.split(", ") || [];

        // Verificar si los productos pertenecen a las categorías del cupón
        const productosValidos = productos.filter((prod) => categoriasDelCupon.includes(prod.categoria));

        if (productosValidos.length === 0) {
          return { message: "El cupón no aplica a los productos seleccionados", total: totalVenta, descuento: 0, isValid: false };
        }

        // Calcular el total de productos que aplican para el cupón
        let totalVentaConCategoriasValidas = productosValidos.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);

        const tipoDescuento = cupon[3]; // Ejemplo: "percentage" o "fixed"
        const valorDescuento = parseFloat(cupon[4]);
        descuentoType = tipoDescuento;
        descuentoValue = valorDescuento;

        // Aplicar descuento según el tipo
        if (tipoDescuento === "percentage") {
          descuentoAplicado = (totalVentaConCategoriasValidas * valorDescuento) / 100;
        } else if (tipoDescuento === "fixed") {
          descuentoAplicado = Math.min(valorDescuento, totalVentaConCategoriasValidas); // Evitar que el descuento fijo sea mayor que el total
        }
      } else {
        return { message: "Cupón inválido o inactivo", total: totalVenta, descuento: 0, isValid: false };
      }
    }

    // Calcular el total final después del descuento
    const totalFinal = totalVenta - descuentoAplicado;

    return {
      message: descuentoAplicado > 0 ? "Cupón aplicado exitosamente" : "No se aplicó ningún cupón",
      total: totalFinal,
      descuento: descuentoAplicado,
      type: descuentoType,
      value: descuentoValue,
      isValid: true,
    };
  } catch (error) {
    console.error("Error al validar el cupón:", error.message);
    throw new Error(`Error al validar el cupón: ${error.message}`);
  }
}


async function deleteCouponById(auth, id) {
  const sheets = google.sheets({ version: "v4", auth });

  // Obtener todos los datos de la hoja
  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Cupones!A:I", // Ajusta el rango según sea necesario
  });

  const rows = getRows.data.values;
  let rowIndexToDelete = null;

  // Encontrar la fila con el ID proporcionado
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] == id) {
      // Asumiendo que la columna ID es la primera (A)
      rowIndexToDelete = i;
      break;
    }
  }

  if (rowIndexToDelete === null) {
    throw new Error("ID not found");
  }

  // Eliminar la fila encontrada
  const requests = [
    {
      deleteDimension: {
        range: {
          sheetId: 0, // Asegúrate de que este sea el ID correcto de la hoja
          dimension: "ROWS",
          startIndex: rowIndexToDelete,
          endIndex: rowIndexToDelete + 1,
        },
      },
    },
  ];

  const res = await sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    resource: {
      requests,
    },
  });

  return res.data;
}


module.exports = {
  validateCouponAndCalculateTotal,
  createCoupon,
  toggleCouponStatus,
  getAllCoupons,
};
