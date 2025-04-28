const express = require("express");
const router = express.Router();
const favoritoController = require("../controllers/favoritoController");

/**
 * @swagger
 * tags:
 *   name: Favoritos
 *   description: API de gestão dos produtos favoritos de cliente
 */

/**
 * @swagger
 * /clientes/{clienteId}/favoritos:
 *   post:
 *     summary: Adicionar um produto aos favoritos de um cliente
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produtoId:
 *                 type: integer
 *                 description: ID do produto na API externa
 *     responses:
 *       201:
 *         description: Produto adicionado aos favoritos
 *       400:
 *         description: Erro ao adicionar favorito
 */
router.post(
  "/:clienteId/favoritos",
  favoritoController.adicionarProdutoFavorito
);

/**
 * @swagger
 * /clientes/{clienteId}/favoritos:
 *   get:
 *     summary: Listar todos os produtos favoritos de um cliente
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Lista de produtos favoritos
 *       400:
 *         description: Erro ao buscar favoritos
 */
router.get(
  "/:clienteId/favoritos",
  favoritoController.listarFavoritosPorCliente
);

/**
 * @swagger
 * /clientes/{clienteId}/favoritos/{produtoId}:
 *   delete:
 *     summary: Remover um produto da lista de favoritos de um cliente
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *       - in: path
 *         name: produtoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto favorito a ser removido
 *     responses:
 *       200:
 *         description: Produto removido dos favoritos
 *       400:
 *         description: Erro ao remover favorito
 */
router.delete(
  "/:clienteId/favoritos/:produtoId",
  favoritoController.removerFavorito
);

module.exports = router;
