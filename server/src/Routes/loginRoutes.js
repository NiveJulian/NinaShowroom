require("dotenv").config();
const { Router } = require("express");
const loginRoutes = Router();
const { verifyToken, isAdmin } = require("../Middleware/authMiddleware");
// const { authThird } = require("../Controllers/login/login");
const {
  isSeller,
  getUserByEmail,
  createUser,
} = require("../Controllers/user/userController");
const { authorize } = require("../Controllers/sheets/sheetsController");

loginRoutes.post("/third", async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await verifyToken(token);
    const email = decodedToken.email;

    // Configura el cliente de autenticación de Google
    const authClient = await authorize();

    const userData = await getUserByEmail(authClient, email);

    // Si el usuario no existe, crea uno nuevo
    if (!userData) {
      userData = await createUser(authClient, {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
        role: "user", // Asigna el rol por defecto como "user"
      });
    }

    // Asigna el rol basado en la verificación de admin o vendedor
    if (await isAdmin(email)) {
      userData.rol = "admin";
    } else if (await isSeller(authClient, email)) {
      userData.rol = "vendedor";
    }

    res.status(200).json({
      message: "Authentication successful",
      theUser: userData,
    });
  } catch (error) {
    console.log({ error: error.message });
    res
      .status(500)
      .json({ message: "Authentication failed", error: error.message });
  }
});

loginRoutes.post("/email", async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await verifyToken(token);
    const email = decodedToken.email;

    const authClient = await authorize();
    const sellerData = await getUserByEmail(authClient, email);

    if (sellerData) {
      res.status(200).json({
        ...sellerData,
        rol: sellerData.rol, // Asegúrate de que el rol esté incluido
      });
    } else {
      res.status(403).json({ message: "User is not authorized" });
    }
  } catch (error) {
    console.log({ error: error.message });
    res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
});

module.exports = loginRoutes;
