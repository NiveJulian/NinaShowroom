const { Router } = require("express");
const { authorize } = require("../Controllers/sheets/sheetsController");
const {
  createSeller,
  getSeller,
  getUserByEmail,
  createUser,
} = require("../Controllers/user/userController");
const userRoutes = Router();

userRoutes.get("/users", async (req, res) => {
  try {
    const authClient = await authorize();
    const users = await getSeller(authClient);
    res.status(200).json(users);
  } catch (error) {
    console.log({ error: error.message });
    res.status(401).json({ message: "Fetch failed", error: error.message });
  }
});

userRoutes.post("/seller", async (req, res) => {
  try {
    const data = req.body;
    const authClient = await authorize();
    const response = await createSeller(authClient, data);
    res.status(200).json({
      message: "User created and saved in Google Sheets",
      data: response.data,
    });
  } catch (error) {
    console.log({ error: error.message });
    res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
});

userRoutes.post("/create", async (req, res) => {
  try {
    const data = req.body;
    const authClient = await authorize();
    const response = await createUser(authClient, data);
    res.status(200).json({
      message: "User created and saved in Google Sheets",
      data: response,
    });
  } catch (error) {
    console.log({ error: error.message });
    res
      .status(500)
      .json({ message: "Authentication failed", error: error.message });
  }
});

userRoutes.post("/auth/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const authClient = await authorize();
    const sellerExists = await getUserByEmail(authClient, email);

    res.status(200).json(sellerExists);
  } catch (error) {
    console.log({ error: error.message });
    res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
});

module.exports = userRoutes;
