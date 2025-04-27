const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

router.post("/", clienteController.criarCliente);
router.get("/", clienteController.listarClientes);
router.get("/:id", clienteController.listarClientesPorId);

module.exports = router;
