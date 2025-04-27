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

async function listarClientes(req, res) {
  try {
    const clientes = await clienteService.listarClientes();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function listarClientesPorId(req, res) {
  try {
    const { id } = req.params;
    const cliente = await clienteService.listarClientesPorId(id);

    res.status(200).json(cliente);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function atualizarCliente(req, res) {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const cliente = await clienteService.atualizarCliente(id, { nome, email });

    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletarCliente(req, res) {
  try {
    const { id } = req.params;

    const resultado = await clienteService.deletarCliente(id);

    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  criarCliente,
  listarClientes,
  listarClientesPorId,
  atualizarCliente,
  deletarCliente,
};
