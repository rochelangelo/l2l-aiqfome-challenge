require("dotenv").config();
const express = require("express");
const app = express();

const clienteRoutes = require("./routes/clienteRoutes");
const favoritoRoutes = require("./routes/favoritoRoutes");
const authRoutes = require("./routes/authRoutes");
const autenticarToken = require("./middlewares/authMiddleware");
const swagger = require("./swagger");

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/clientes", autenticarToken, clienteRoutes);
app.use("/clientes", autenticarToken, favoritoRoutes);

swagger(app);

module.exports = app;
