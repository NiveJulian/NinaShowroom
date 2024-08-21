const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./Routes/indexRoutes");
const invalidRoute = require("./Middleware/invalidRoute");
require("dotenv").config(); // Configuración de entorno

const server = express();

server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: [
      "https://ninashowroom.techwebstudio.com.ar",
      "https://nina-ecommerce-roan.vercel.app",
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

// Rutas API y middleware
server.use("/api", router); // Montar el router

// Middleware para rutas no válidas de la API
server.use("/api/*", invalidRoute);

module.exports = server;
