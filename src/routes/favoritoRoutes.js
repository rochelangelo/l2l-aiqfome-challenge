const express = require("express");
const router = express.Router();
const favoritoController = require("../controllers/favoritoController");

router.post(
  "/:clienteId/favoritos",
  favoritoController.adicionarProdutoFavorito
);
router.get(
  "/:clienteId/favoritos",
  favoritoController.listarFavoritosPorCliente
);
router.delete("/:clienteId/favoritos", favoritoController.removerFavorito);

module.exports = router;
