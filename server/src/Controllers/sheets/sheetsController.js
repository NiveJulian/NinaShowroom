require("dotenv").config();
const { google } = require("googleapis");
// const path = require("path");

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const authClient = await auth.getClient();
  return authClient;
}

async function getSheetData(auth) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Productos!A2:I",
    });
    const rows = res.data.values || [];
    let lastId = 0;
    if (rows.length > 0) {
      lastId = parseInt(rows[rows.length - 1][0]);
    }

    const products = rows.map((row) => ({
      id: row[0],
      categoria: row[1],
      nombre: row[2],
      color: row[3],
      talle: row[4],
      cantidad: row[5],
      precio: row[6],
      url: row[7],
      sku: row[8],
    }));

    return { products, lastId };
  } catch (error) {
    console.log({ error: error.message });
  }
}

async function getSheetDataById(id, auth) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Productos!A2:I",
    });
    const rows = res.data.values || [];
    
    const products = rows.map((row) => ({
      id: row[0],
      categoria: row[1],
      nombre: row[2],
      color: row[3],
      talle: row[4],
      cantidad: row[5],
      precio: row[6],
      url: row[7],
      sku: row[8],
    }));

    const product = products.find(product => product.id === id);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  } catch (error) {
    console.log({ error: error.message });
    throw error;
  }
}

function generateSKU(category, name, color, count) {
  const categoryInitial = category.charAt(0).toLowerCase();
  const nameInitial = name.charAt(0).toLowerCase();
  const colorInitial = color.charAt(0).toLowerCase();
  const skuNumber = String(count).padStart(4, "0");
  return `${categoryInitial}-${nameInitial}-${colorInitial}-${skuNumber}`;
}

async function appendRow(auth, rowData) {
  const sheets = google.sheets({ version: "v4", auth });
  const { rows, lastId } = await getSheetData(auth);
  const newId = lastId + 1;
  const { categoria, nombre, color, tamaño, cantidad, precio, url } = rowData;
  const sku = generateSKU(categoria, nombre, color, newId);
  const urlString = Array.isArray(url) ? url.join(", ") : url;
  const newRow = [
    newId,
    categoria,
    nombre,
    color,
    tamaño,
    cantidad,
    precio,
    urlString,
    sku,
  ];
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Productos!A2:I",
    valueInputOption: "RAW",
    resource: {
      values: [newRow],
    },
  });
  return res.data.updates;
}

async function updateRow(auth, rowData) {
  const sheets = google.sheets({ version: "v4", auth });

  // Obtener los datos actuales de la hoja
  const { products } = await getSheetData(auth);

  // Buscar el índice de la fila correspondiente usando el ID
  const rowIndex = products.findIndex((product) => product.id === rowData.id);

  // Lanzar un error si el ID no se encuentra
  if (rowIndex === -1) {
    throw new Error("ID no encontrado");
  }

  // Convertir el array de URLs en una cadena, si es necesario
  const urlString = Array.isArray(rowData.url)
    ? rowData.url.join(", ")
    : rowData.url;

  // Construir la fila actualizada con los datos de rowData
  const updatedRow = [
    rowData.id,
    rowData.categoria,
    rowData.nombre,
    rowData.color,
    rowData.tamaño,
    rowData.cantidad,
    rowData.precio,
    urlString,
    rowData.sku,
  ];

  // Actualizar la fila en la hoja de cálculo
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `Productos!A${rowIndex + 2}:I${rowIndex + 2}`,
    valueInputOption: "RAW",
    resource: {
      values: [updatedRow],
    },
  });

  return res.data;
}

async function registerSale(auth, data) {
  try {
    const { productos, nombreCliente, formaPago } = data;

    const sheets = google.sheets({ version: "v4", auth });

    // Obtener la última fila para determinar el ID más reciente
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A:A", // Ajusta esto si tu ID no está en la columna A
    });

    const rows = response.data.values;
    let lastId = 0;

    if (rows && rows.length > 1) {
      lastId = rows.length - 1;
    }

    const newId = lastId + 1;

    const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const ventaData = productos.map((prod) => [
      newId,
      prod.id,
      nombreCliente,
      prod.sku,
      prod.cantidad,
      prod.talle,
      prod.color,
      prod.precio,
      formaPago,
      prod.cantidad * prod.precio,
      currentDate,
    ]);

    // Append the data to the spreadsheet
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:I",
      valueInputOption: "RAW",
      resource: {
        values: ventaData,
      },
    });

    return { message: "Venta registrada exitosamente", data: res.data };
  } catch (error) {
    console.error("Error registrando la venta:", error);
    throw new Error("Error registrando la venta");
  }
}

async function getSaleDataUnitiInfo(auth, id) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:K",
    });
    const rows = res.data.values || [];

    // Filtrar las ventas con el id correspondiente y mapear a objetos
    const sales = rows
      .filter((row) => row[0] === id.toString())
      .map((row) => ({
        id: row[0],
        idProducto: row[1],
        cliente: row[2],
        sku: row[3],
        cantidad: row[4],
        talle: row[5],
        color: row[6],
        subtotal: row[7],
        pago: row[8],
        total: row[9],
        fecha: row[10],
      }));

    return sales;
  } catch (error) {
    console.log({ error: error.message });
    throw error;
  }
}

async function getSaleData(auth) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:K",
    });
    const rows = res.data.values || [];
    let lastId = 0;
    if (rows.length > 0) {
      lastId = parseInt(rows[rows.length - 1][0]);
    }

    const salesMap = {};

    rows.forEach((row) => {
      const id = row[0];
      if (!salesMap[id]) {
        salesMap[id] = {
          id: row[0],
          idProducto: row[1],
          cliente: row[2],
          sku: row[3],
          cantidad: parseInt(row[4]),
          talle: row[5],
          color: row[6],
          subtotal: parseFloat(row[7]),
          pago: row[8],
          total: parseFloat(row[9]),
          fecha: row[10],
        };
      } else {
        salesMap[id].cantidad += parseInt(row[4]);
        salesMap[id].subtotal += parseFloat(row[7]);
        salesMap[id].total += parseFloat(row[9]);
      }
    });

    const salesData = Object.values(salesMap);

    return { salesData, lastId };
  } catch (error) {
    console.log({ error: error.message });
  }
}

async function getSalesByDate(auth, date) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:K", // Ajusta el rango según tu hoja de ventas
    });
    
    const rows = res.data.values || [];

    // Filtrar las ventas que coinciden con la fecha
    const salesForDate = rows.filter((row) => row[10] === date).map((row) => row[0]);

    return salesForDate;
  } catch (error) {
    console.error("Error obteniendo ventas por fecha:", error);
    throw new Error("Error obteniendo ventas por fecha");
  }
}

async function increaseStock(auth, productId, amount) {
  const sheets = google.sheets({ version: "v4", auth });
  const { rows } = await getSheetData(auth);
  const rowIndex = rows.findIndex((row) => row[0] === productId);
  if (rowIndex === -1) {
    throw new Error("ID no encontrado");
  }
  rows[rowIndex][5] = parseInt(rows[rowIndex][5]) + amount; // Suponiendo que la columna 5 es la cantidad en stock
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `Productos!A${rowIndex + 2}:I${rowIndex + 2}`,
    valueInputOption: "RAW",
    resource: {
      values: [rows[rowIndex]],
    },
  });
  return res.data;
}

async function decreaseStock(auth, productId, amount) {
  const sheets = google.sheets({ version: "v4", auth });
  const { rows } = await getSheetData(auth);
  const rowIndex = rows.findIndex((row) => row[0] === productId);
  if (rowIndex === -1) {
    throw new Error("ID no encontrado");
  }
  rows[rowIndex][5] = parseInt(rows[rowIndex][5]) - amount; // Suponiendo que la columna 5 es la cantidad en stock
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `Productos!A${rowIndex + 2}:I${rowIndex + 2}`,
    valueInputOption: "RAW",
    resource: {
      values: [rows[rowIndex]],
    },
  });
  return res.data;
}

async function getProductsByCategory(auth, category) {
  try {
    const { products } = await getSheetData(auth);

    // Normaliza y elimina espacios en blanco de la categoría recibida
    const trimmedCategory = category.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    
    // Filtra los productos basándose en la categoría normalizada
    const filteredProducts = products.filter(
      (product) =>
        product.categoria.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === trimmedCategory
    );

    

    // Si no se encuentran productos, lanzar un error personalizado
    if (filteredProducts.length === 0) {
      throw new Error("Producto no encontrado");
    }

    return { products: filteredProducts };
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error.message);
  }
}

async function getAllCategories(auth) {
  try {
    const { products } = await getSheetData(auth);
    
    const normalizedCategories = products.map((product) =>
      product.categoria.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );

    const categories = [...new Set(normalizedCategories)];

    return categories;
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error.message);
  }
}

async function getAllColors (auth) {
  try {
    const { products } = await getSheetData(auth);

    const colors = [...new Set(products.map((product) => product.color.trim().toLowerCase().
    normalize("NFD").replace(/[\u0300-\u036f]/g, "")))];

    return colors;
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error.message);
  }
}

async function getProductsByColor (auth, color) {
  try {
    const { products } = await getSheetData(auth);

    const trimmedColor = color.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const filteredProducts = products.filter(
      (product) =>
        product.color.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === trimmedColor
    );

    if (filteredProducts.length === 0) {
      throw new Error("Producto no encontrado");
    }

    return { products: filteredProducts };
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error.message);
  }
}


async function deleteRowById(auth, id) {
  const sheets = google.sheets({ version: "v4", auth });

  // Obtener todos los datos de la hoja
  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Productos!A:I", // Ajusta el rango según sea necesario
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

async function deleteSalesById(auth, id) {
  const sheets = google.sheets({ version: "v4", auth });

  // Obtener todos los datos de la hoja
  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Ventas!A:K", // Ajusta el rango según sea necesario
  });

  const rows = getRows.data.values;
  let rowsToDelete = [];

  // Encontrar las filas con el ID proporcionado
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] == id) {
      // Asumiendo que la columna ID es la primera (A)
      rowsToDelete.push(i);
    }
  }

  if (rowsToDelete.length === 0) {
    throw new Error("ID not found");
  }

  console.log("rowsToDelete: ",rowsToDelete);

  // Crear solicitudes de eliminación para cada fila encontrada
  const requests = rowsToDelete.map((rowIndex) => ({
    deleteDimension: {
      range: {
        sheetId: 0, // Asegúrate de que este sea el ID correcto de la hoja
        dimension: "ROWS",
        startIndex: rowIndex,
        endIndex: rowIndex + 1,
      },
    },
  }));

  // Las solicitudes deben ser enviadas en orden inverso para evitar conflictos de índice
  requests.reverse();

  const res = await sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    resource: {
      requests,
    },
  });

  return res.data;
}

async function getCashFlow(auth) {
  try {
    const sheets = google.sheets({ version: "v4", auth });

    // Obtener los datos del flujo de caja
    const resCashFlow = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "FlujoDeCaja!A2:F",  // Incluye la columna F para "Caja Final"
    });

    const rowsCashFlow = resCashFlow.data.values || [];
    let lastId = 0;
    let saldoAcumulado = 0;  // Para llevar el registro del saldo acumulado

    if (rowsCashFlow.length > 0) {
      lastId = parseInt(rowsCashFlow[rowsCashFlow.length - 1][0]);
    }

    const cashFlowData = rowsCashFlow.map((row) => {
      const tipo = row[1];
      const monto = parseFloat(row[2]);

      // Calcular saldo acumulado basado en el tipo de movimiento (Ingreso/Gasto)
      if (tipo === "Ingreso") {
        saldoAcumulado += monto;
      } else if (tipo === "Gasto") {
        saldoAcumulado -= monto;
      }

      return {
        id: row[0],
        tipo: tipo,
        monto: monto,
        descripcion: row[3],
        fecha: row[4],
        cajaFinal: saldoAcumulado,  // Caja final acumulada
      };
    });

    // Obtener los datos de la hoja de ventas
    const resVentas = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:K",  // Asumiendo que las columnas de interés están en A2:K
    });

    const rowsVentas = resVentas.data.values || [];
    
    // Añadir las ventas al flujo de caja como ingresos
    const ventasData = rowsVentas.map((ventaRow, index) => {
      const id = lastId + index + 1;  // Incrementar el ID para las nuevas filas
      const subtotal = parseFloat(ventaRow[7]);  // Subtotal de la venta
      const total = parseFloat(ventaRow[9]);  // Total de la venta
      const descripcion = `Venta Producto: ${ventaRow[3]}, Cliente: ${ventaRow[2]}`;  // SKU y Cliente
      const fecha = ventaRow[10];  // Fecha de la venta

      // Sumar el total de la venta al saldo acumulado
      saldoAcumulado += total;

      return {
        id: id.toString(),
        tipo: "Ingreso",  // Todas las ventas se consideran como ingresos
        monto: total,
        descripcion: descripcion,
        fecha: fecha,
        cajaFinal: saldoAcumulado,  // Caja final actualizada
      };
    });

    // Combinar flujo de caja existente con las ventas
    const allCashFlowData = [...cashFlowData, ...ventasData];

    return { cashFlowData: allCashFlowData, lastId: lastId + rowsVentas.length };
  } catch (error) {
    console.log({ error: error.message });
  }
}

// Controlador modificado para devolver solo la nueva entrada
async function addCashFlowEntry(auth, data) {
  try {
    const { tipo, monto, descripcion, fecha } = data;
    const sheets = google.sheets({ version: "v4", auth });

    // Obtener la última fila para determinar el ID más reciente
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "FlujoDeCaja!A:A", 
    });

    const rows = response.data.values || [];
    let lastId = rows.length > 1 ? parseInt(rows[rows.length - 1][0], 10) || 0 : 0;

    let saldoAcumulado = 0;
    if (rows.length > 1) {
      const lastRow = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: `FlujoDeCaja!F${rows.length}`, 
      });

      saldoAcumulado = lastRow.data.values && lastRow.data.values[0] ? parseFloat(lastRow.data.values[0][0]) || 0 : 0;
    }

    const newSaldoAcumulado = tipo === "Ingreso" ? saldoAcumulado + parseFloat(monto) : saldoAcumulado - parseFloat(monto);
    const newRow = [lastId + 1, tipo, parseFloat(monto), descripcion, fecha, newSaldoAcumulado];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "FlujoDeCaja!A:F", 
      valueInputOption: "RAW",
      resource: { values: [newRow] },
    });

    return { id: newRow[0], tipo, monto, descripcion, fecha, cajaFinal: newSaldoAcumulado };
  } catch (error) {
    console.error("Error agregando el movimiento:", error);
    throw new Error("Error agregando el movimiento al flujo de caja");
  }
}






module.exports = {
  authorize,
  getSheetData,
  getSheetDataById,
  appendRow,
  updateRow,
  deleteRowById,
  registerSale,
  getSaleData,
  getSaleDataUnitiInfo,
  getSalesByDate,
  increaseStock,
  decreaseStock,
  getProductsByCategory,
  getAllCategories,
  deleteSalesById,
  getCashFlow,
  addCashFlowEntry,
  getAllColors,
  getProductsByColor
};
