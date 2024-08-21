require("dotenv").config();
const { google } = require("googleapis");

async function createUser(authClient, data) {
  try {
    const { uid, email, name, address, state, postalCode, role } = data;
    const sheets = google.sheets({ version: "v4", auth: authClient });
    const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: `Usuarios!A1:H1`,
      valueInputOption: "RAW",
      resource: {
        values: [
          [uid, email, name, address, state, postalCode, role, currentDate],
        ],
      },
    });
    return response;
  } catch (error) {
    console.log({ error: error.message });
  }
}

async function createSeller(authClient, data) {
  try {
    const { uid, email, name, role } = data;
    const sheets = google.sheets({ version: "v4", auth: authClient });
    const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: `Vendedores!A1:E1`,
      valueInputOption: "RAW",
      resource: {
        values: [[uid, email, name, role, currentDate]],
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getSeller(authClient) {
  try {
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: `Vendedores!A2:E`,
    });

    const rows = response.data.values;

    const data = rows.map((row) => ({
      uid: row[0],
      email: row[1],
      nombre: row[2],
      rol: row[3],
      fecha: row[4],
    }));

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getUser(authClient) {
  try {
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: `Usuarios!A2:H`,
    });

    const rows = response.data.values;

    const data = rows.map((row) => ({
      uid: row[0],
      email: row[1],
      nombre: row[2],
      direccion: row[3],
      provincia: row[4],
      cp: row[5],
      rol: row[6],
      fecha: row[7],
    }));

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function isSeller(authClient, email) {
  try {
    const sellers = await getSeller(authClient);
    const userExist = sellers.find((seller) => seller.email === email);

    return userExist;
  } catch (error) {
    console.log(error);
  }
}

async function getUserByEmail(authClient, email) {
  try {
    const sellers = await getSeller(authClient);
    const user = sellers.find((seller) => seller.email === email);

    if (!user) {
      const users = await getUser(authClient);
      const user = users.find((user) => user.email === email);

      if (!user) {
        throw new Error("User not found");
      }
      return {
        uid: user.uid,
        email: user.email,
        nombre: user.nombre,
        direccion: user.direccion,
        provincia: user.provincia,
        cp: user.cp,
        rol: user.rol,
      };
    }
    else{
      return {
        uid: user.uid,
        email: user.email,
        nombre: user.nombre,
        rol: user.rol,
      };
    }

    
  } catch (error) {
    console.log({ error: error.message });
    throw error;
  }
}

module.exports = {
  createUser,
  createSeller,
  getSeller,
  isSeller,
  getUser,
  getUserByEmail,
};
