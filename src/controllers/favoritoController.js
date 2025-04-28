const favoritoService = require("../services/favoritoService");

async function adicionarProdutoFavorito(req, res) {
  try {
    const { clienteId } = req.params;
    const { produtoId } = req.body;

    const favoritado = await favoritoService.adicionarProdutoFavorito(
      clienteId,
      produtoId
    );

    res.status(201).json(favoritado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function listarFavoritosPorCliente(req, res) {
  try {
    const { clienteId } = req.params;
    const favoritosCliente = await favoritoService.listarFavoritosPorCliente(
      clienteId
    );

    res.status(200).json(favoritosCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function removerFavorito(req, res) {
  try {
    const { clienteId } = req.params;
    const { produtoId } = req.body;

    const resultado = await favoritoService.removerFavorito(
      clienteId,
      produtoId
    );

    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  adicionarProdutoFavorito,
  listarFavoritosPorCliente,
  removerFavorito,
};
