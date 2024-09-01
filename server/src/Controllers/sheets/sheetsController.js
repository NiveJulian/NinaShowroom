require("dotenv").config();
const { google } = require("googleapis");
const { getUserByEmail } = require("../user/userController");
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
      range: "Productos!A2:J",
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
      stock: parseInt(row[5]),
      precio: parseInt(row[6]),
      url: row[7],
      sku: row[8],
      publicado: row[9],
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
      range: "Productos!A2:J",
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
      publicado: row[9],
    }));

    const product = products.find((product) => product.id === id.toString());

    if (!product) {
      throw new Error("Producto no encontrado");
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
  const { categoria, nombre, color, tamaño, cantidad, precio, url, publicado } =
    rowData;
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
    (publicado = "no"),
  ];
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Productos!A2:J",
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
    rowData.publicado,
  ];

  // Actualizar la fila en la hoja de cálculo
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `Productos!A${rowIndex + 2}:J${rowIndex + 2}`,
    valueInputOption: "RAW",
    resource: {
      values: [updatedRow],
    },
  });

  return res.data;
}

async function registerSale(auth, data) {
  try {
    const sheets = google.sheets({ version: "v4", auth });

    const {productos, formaPago, tipoEnvio, provincia, direccion, celular, medio, cp, correo} = data

    // Obtener la última fila para determinar el ID más reciente
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A:A",
    });

    const rows = response.data.values;
    let lastId = 0;

    if (rows && rows.length > 1) {
      lastId = rows.length - 1;
    }

    const newId = lastId + 1;
    const currentDate = new Date().toLocaleDateString("es-AR").slice(0, 10);
    const currentTime = new Date().toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const user = await getUserByEmail(auth, correo);
    const cliente = user ? user.uid : nombreCliente;
    const statePayment = "Pendiente";

    const ventaData = productos.map((prod) => [
      newId,
      prod.id,
      cliente,
      prod.sku,
      prod.cantidad,
      prod.talle,
      prod.color,
      prod.precio,
      formaPago,
      statePayment,
      prod.cantidad * prod.precio,
      currentDate,
      currentTime,  // Agregar la hora actual
      tipoEnvio || "",
      correo || "",
      direccion || "",
      provincia || "",
      cp || "",
      celular || "",
      medio,
    ]);

    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:T",
      valueInputOption: "RAW",
      resource: {
        values: ventaData,
      },
    });

    for (const prod of productos) {
      const amount = parseInt(prod.cantidad);
      if (amount > 0) {
        await decreaseStock(auth, prod.id, amount);
      }
    }

    return { message: "Venta registrada exitosamente", data: res.data };
  } catch (error) {
    console.error("Error registrando la venta:", error);
    throw new Error(`Error registrando la venta: ${error.message}`);
  }
}


async function getSaleDataUnitiInfo(auth, id) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:T",
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
        hora: row[11],
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
      range: "Ventas!A2:T",
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
          hora: row[11],
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
      range: "Ventas!A2:T", // Ajusta el rango según tu hoja de ventas
    });

    const rows = res.data.values || [];

    // Filtrar las ventas que coinciden con la fecha
    const salesForDate = rows
      .filter((row) => row[10] === date)
      .map((row) => row[0]);

    return salesForDate;
  } catch (error) {
    console.error("Error obteniendo ventas por fecha:", error);
    throw new Error("Error obteniendo ventas por fecha");
  }
}

async function getSaleByUserId(auth, uid) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:T", // Ajusta el rango según tu hoja de ventas
    });

    const rows = res.data.values || [];

    // Filtrar las ventas que coinciden con el uid en la columna "cliente"
    const salesForUser = rows.filter((row) => row[2] === uid);

    // Obtener la información del producto para cada venta
    const salesData = await Promise.all(
      salesForUser.map(async (row) => {
        const product = await getSheetDataById(Number(row[1]), auth); // Convertir productId a número
        return {
          id: row[0],
          productId: row[1],
          clientId: row[2],
          sku: row[3],
          quantity: row[4],
          size: row[5],
          color: row[6],
          price: row[7],
          paymentMethod: row[8],
          status: row[9],
          totalPrice: row[10],
          date: row[11],
          time: row[12],
          shippingType: row[13],
          email: row[14],
          address: row[15],
          province: row[16],
          product, // Añadir la información del producto
        };
      })
    );

    return salesData;
  } catch (error) {
    console.error("Error obteniendo ventas por UID:", error);
    throw new Error("Error obteniendo ventas por UID");
  }
}

async function increaseStock(auth, productId, amount) {
  const sheets = google.sheets({ version: "v4", auth });
  const { products } = await getSheetData(auth);
  const rowIndex = products.findIndex((row) => row.id === productId);
  if (rowIndex === -1) {
    throw new Error("ID no encontrado");
  }
  // Convertir cantidad a número y sumarle la cantidad a aumentar
  const currentAmount = parseInt(products[rowIndex].cantidad) || 0;
  products[rowIndex].cantidad = currentAmount + amount;

  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `Productos!A${rowIndex + 2}:J${rowIndex + 2}`,
    valueInputOption: "RAW",
    resource: {
      values: [Object.values(products[rowIndex])],
    },
  });
  return res.data;
}

async function decreaseStock(auth, productId, amount) {
  const sheets = google.sheets({ version: "v4", auth });
  const { products } = await getSheetData(auth);
  const rowIndex = products.findIndex((row) => row.id === productId);
  if (rowIndex === -1) {
    throw new Error("ID no encontrado");
  }
  // Convertir cantidad a número y restarle la cantidad a disminuir
  const currentAmount = parseInt(products[rowIndex].stock) || 0;
  products[rowIndex].stock = currentAmount - amount;

  // Asegúrate de que solo se escriban las columnas A:J
  const updatedRow = Object.values(products[rowIndex]).slice(0, 10);

  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `Productos!A${rowIndex + 2}:J${rowIndex + 2}`,
    valueInputOption: "RAW",
    resource: {
      values: [updatedRow],
    },
  });
  return res.data;
}


async function getProductsByCategory(auth, category) {
  try {
    const { products } = await getSheetData(auth);

    // Normaliza y elimina espacios en blanco de la categoría recibida
    const trimmedCategory = category
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    // Filtra los productos basándose en la categoría normalizada y en el estado de publicación
    const filteredProducts = products.filter((product) => {
      return (
        product.publicado === "si" &&
        product.categoria
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") === trimmedCategory
      );
    });

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

    // Filtra las categorías de los productos que están en publicado = "si"
    const normalizedCategories = products
      .filter((product) => product.publicado === "si")
      .map((product) =>
        product.categoria
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      );

    const categories = [...new Set(normalizedCategories)];

    return categories;
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error.message);
  }
}

async function getAllColors(auth) {
  try {
    const { products } = await getSheetData(auth);

    const colors = [
      ...new Set(
        products.map((product) =>
          product.color
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        )
      ),
    ];

    return colors;
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error.message);
  }
}

async function getProductsByColor(auth, color) {
  try {
    const { products } = await getSheetData(auth);

    const trimmedColor = color
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const filteredProducts = products.filter(
      (product) =>
        product.color
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") === trimmedColor
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

async function activeProductById(auth, id) {
  const sheets = google.sheets({ version: "v4", auth });

  // Obtener todos los datos de la hoja
  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Productos!A:J", // Ajusta el rango para incluir hasta la columna J
  });

  const rows = getRows.data.values;
  let rowIndexToUpdate = null;

  // Encontrar la fila con el ID proporcionado
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] == id) {
      // Asumiendo que la columna ID es la primera (A)
      rowIndexToUpdate = i;
      break;
    }
  }

  if (rowIndexToUpdate === null) {
    throw new Error("ID not found");
  }

  // Obtener el valor actual de la columna "Publicado" (columna J, índice 9)
  const currentPublishedValue = rows[rowIndexToUpdate][9];
  const newPublishedValue = currentPublishedValue === "si" ? "no" : "si"; // Alternar entre "si" y "no"

  // Actualizar la celda con el nuevo valor
  const updateResponse = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `Productos!J${rowIndexToUpdate + 1}`, // J es la columna 10, sumamos 1 al índice para la referencia en Sheets
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[newPublishedValue]],
    },
  });

  // Determinar el estado de "Publicado" y enviar el mensaje correspondiente
  const statusMessage =
    newPublishedValue === "si" ? "publicado" : "no publicado";

  return {
    message: `El producto cambio a ${statusMessage}.`,
    updateResponse: updateResponse.data,
  };
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

  console.log("rowsToDelete: ", rowsToDelete);

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

async function getCashFlow(auth, date = null) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const cashFlowRange = "FlujoDeCaja!A2:I";

    // 1. Obtener los datos del flujo de caja
    const resCashFlow = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: cashFlowRange,
    });

    const rowsCashFlow = resCashFlow.data.values || [];
    let lastId = rowsCashFlow.length > 0 ? parseInt(rowsCashFlow[rowsCashFlow.length - 1][0]) : 0;
    let saldoAcumulado = rowsCashFlow.length > 0 ? parseFloat(rowsCashFlow[rowsCashFlow.length - 1][8]) : 0;

    const cashFlowData = [];
    const cajaInicialData = []; // Array para almacenar las entradas del tipo "Caja Inicial"
    let cajaInicialMañana = 0;
    let cajaInicialTarde = 0;

    // Procesar cada fila del flujo de caja
    rowsCashFlow.forEach((row) => {
      const tipo = row[1];
      const monto = parseFloat(row[2]);
      const descripcion = row[3];
      const fecha = row[4];
      const hora = row[5];
      const periodo = row[6];
      const cajaInicial = parseFloat(row[7]) || 0;
      const cajaFinal = parseFloat(row[8]) || 0;

      if (tipo.toLowerCase() === "caja inicial") {
        cajaInicialData.push({
          id: row[0],
          tipo: tipo,
          monto: monto,
          descripcion: descripcion,
          fecha: fecha,
          hora: hora,
          periodo: periodo,
          cajaInicial: cajaInicial,
          cajaFinal: cajaFinal,
        });

        if (periodo.toLowerCase() === "mañana") {
          cajaInicialMañana = monto;
        } else if (periodo.toLowerCase() === "tarde") {
          cajaInicialTarde = monto;
        }
      } else {
        if (tipo.toLowerCase() === "ingreso") {
          saldoAcumulado += monto;
        } else if (tipo.toLowerCase() === "gasto") {
          saldoAcumulado -= monto;
        }

        cashFlowData.push({
          id: row[0],
          tipo: tipo,
          monto: monto,
          descripcion: descripcion,
          fecha: fecha,
          hora: hora,
          periodo: periodo,
          cajaInicial: cajaInicial,
          cajaFinal: cajaFinal,
        });
      }
    });

    // 2. Obtener los datos de la hoja de ventas
    const resVentas = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:T", // Ajusta el rango según tus columnas
    });

    const rowsVentas = resVentas.data.values || [];

// Procesar cada fila de ventas y añadirlas como ingresos
const ventasData = rowsVentas.map((ventaRow, index) => {
  // Verificar si la columna 9 contiene "pendiente" (sin importar mayúsculas o minúsculas)
  if (ventaRow[9].toLowerCase() === "pendiente") {
    return null; // Saltear esta fila
  }

  const id = lastId + index + 1; // Incrementar el ID para las nuevas filas
  const total = parseFloat(ventaRow[10]); // Ajusta el índice según la columna de 'Total'
  const descripcion = `Venta Producto: ${ventaRow[3]}, Cliente: ${ventaRow[2]}`; // Ajusta los índices según tus columnas
  const fechaVenta = ventaRow[11]; // Ajusta el índice según la columna de 'Fecha'
  const horaVenta = ventaRow[12]; // Ajusta el índice según la columna de 'Hora'

  // Sumar el total de la venta al saldo acumulado
  saldoAcumulado += total;

  return {
    id: id.toString(),
    tipo: "Ingreso", // Todas las ventas se consideran como ingresos
    monto: total,
    descripcion: descripcion,
    fecha: fechaVenta,
    hora: horaVenta, // Registrar la hora de la venta
    periodo: "", // Puedes asignar el periodo si es necesario
    cajaInicial: saldoAcumulado - total, // Caja inicial antes de esta venta
    cajaFinal: saldoAcumulado, // Caja final actualizada
  };
}).filter(venta => venta !== null); // Filtrar las filas que fueron saltadas

    // 3. Combinar flujo de caja existente con las ventas
    const allCashFlowData = [...cashFlowData, ...ventasData, ...cajaInicialData]; // Incluir los datos de "Caja Inicial"

    // 4. Calcular la caja inicial del día siguiente
    const cajaInicialDiaSiguiente = cajaInicialTarde > 0 ? cajaInicialTarde : cajaInicialMañana;

    return { 
      cashFlowData: allCashFlowData, 
      lastId: lastId + rowsVentas.length,
      cajaInicialMañana,
      cajaInicialTarde,
      cajaInicialDiaSiguiente
    };
  } catch (error) {
    console.error("Error al obtener el flujo de caja:", error.message);
    throw new Error('Error al obtener el flujo de caja');
  }
}



async function addCashFlowEntry(auth, data) {
  try {
    const { tipo, monto, descripcion, fecha, periodo } = data;
    const hora = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'FlujoDeCaja!A:A',
    });

    const rows = response.data.values || [];
    let lastId = rows.length > 1 ? parseInt(rows[rows.length - 1][0], 10) || 0 : 0;

    // Obtener saldo acumulado y caja inicial del último movimiento del periodo específico
    const lastRowResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: `FlujoDeCaja!G2:H${rows.length + 1}`,
    });

    const lastRowData = lastRowResponse.data.values || [];
    let saldoAcumulado = lastRowData.length > 0 ? parseFloat(lastRowData[lastRowData.length - 1][1]) || 0 : 0;
    let cajaInicial = 0;

    if (tipo === 'Caja Inicial') {
      lastId += 1;
      cajaInicial = parseFloat(monto);

      // Crear una nueva fila con todos los datos y actualizar la columna "Caja inicial"
      const newRow = [
        lastId,
        tipo,
        cajaInicial,
        descripcion,
        fecha,
        hora,
        periodo,
        cajaInicial,  // Caja inicial
        saldoAcumulado,     // Caja final (puede estar en 0 o depender de lógica adicional)
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: 'FlujoDeCaja!A:I',
        valueInputOption: 'RAW',
        resource: { values: [newRow] },
      });

      return {
        id: newRow[0],
        tipo,
        monto,
        descripcion,
        fecha,
        hora,
        periodo,
        cajaInicial: newRow[7],
        cajaFinal: newRow[8],
      };
    }

    const newSaldoAcumulado = tipo === 'Ingreso' ? saldoAcumulado + parseFloat(monto) : saldoAcumulado - parseFloat(monto);

    const newRow = [
      lastId + 1,
      tipo,
      parseFloat(monto),
      descripcion,
      fecha,
      hora,
      periodo,
      cajaInicial,
      newSaldoAcumulado,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'FlujoDeCaja!A:I',
      valueInputOption: 'RAW',
      resource: { values: [newRow] },
    });

    return {
      id: newRow[0],
      tipo,
      monto,
      descripcion,
      fecha,
      hora,
      periodo,
      cajaInicial,
      cajaFinal: newSaldoAcumulado,
    };
  } catch (error) {
    console.error('Error agregando el movimiento:', error);
    throw new Error('Error agregando el movimiento al flujo de caja');
  }
}



async function appendRowPayment(auth, rowData) {
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "PagosMp!A2:M", // Ajusta el rango y hoja según corresponda
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [rowData],
    },
  });

  return res.data.updates;
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
  getProductsByColor,
  activeProductById,
  appendRowPayment,
  getSaleByUserId,
};
