const clienteService = require("../services/clienteService");

async function criarCliente(req, res) {
  try {
    const { nome, email } = req.body;

    const cliente = await clienteService.criarCliente({ nome, email });

    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  criarCliente,
};
