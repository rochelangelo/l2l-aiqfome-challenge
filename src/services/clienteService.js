const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function criarCliente({ nome, email }) {
  const clienteCadastrado = await prisma.cliente.findUnique({
    where: { email },
  });

  if (clienteCadastrado) {
    throw new Error("Email já cadastrado para outro cliente.");
  }

  const novoCliente = await prisma.cliente.create({
    data: {
      nome,
      email,
    },
  });

  return novoCliente;
}

async function listarClientes() {
  const clientes = await prisma.cliente.findMany({
    include: {
      favoritos: true,
    },
  });
  return clientes;
}

async function listarClientesPorId(id) {
  const clienteCadastrado = await prisma.cliente.findUnique({
    where: { id: Number(id) },
  });

  if (!clienteCadastrado) {
    throw new Error("Cliente não encontrado.");
  }

  return clienteCadastrado;
}

async function atualizarCliente(id, { nome, email }) {
  const clienteCadastrado = await prisma.cliente.findUnique({
    where: { id: Number(id) },
  });

  if (!clienteCadastrado) {
    throw new Error("Cliente não encontrado.");
  }

  const clienteAtualizado = await prisma.cliente.update({
    where: { id: Number(id) },
    data: { nome, email },
  });

  return clienteAtualizado;
}

module.exports = {
  criarCliente,
  listarClientes,
  listarClientesPorId,
  atualizarCliente,
};
