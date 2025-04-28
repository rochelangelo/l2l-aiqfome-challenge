const express = require("express");
const router = express.Router();
const favoritoController = require("../controllers/favoritoController");

router.post(
  "/:clienteId/favoritos",
  favoritoController.adicionarProdutoFavorito
);

module.exports = router;
