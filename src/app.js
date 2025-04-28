require("dotenv").config();
const express = require("express");
const app = express();

const clienteRoutes = require("./routes/clienteRoutes");
const favoritoRoutes = require("./routes/favoritoRoutes");

app.use(express.json());

app.use("/clientes", clienteRoutes);
app.use("/clientes", favoritoRoutes);

module.exports = app;
