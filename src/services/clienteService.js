const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function criarCliente({ nome, email }) {
  const clienteCadastrado = await prisma.cliente.findUnique({
    where: { email },
  });

  if (clienteCadastrado) {
    const erro = new Error("Email já cadastrado para outro cliente.");
    erro.statusCode = 400;
    throw erro;
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
    const erro = new Error("Cliente não encontrado.");
    erro.statusCode = 404;
    throw erro;
  }

  return clienteCadastrado;
}

async function atualizarCliente(id, { nome, email }) {
  const clienteCadastrado = await prisma.cliente.findUnique({
    where: { id: Number(id) },
  });

  if (!clienteCadastrado) {
    const erro = new Error("Cliente não encontrado.");
    erro.statusCode = 404;
    throw erro;
  }

  const clienteAtualizado = await prisma.cliente.update({
    where: { id: Number(id) },
    data: { nome, email },
  });

  return clienteAtualizado;
}

async function deletarCliente(id) {
  const clienteCadastrado = await prisma.cliente.findUnique({
    where: { id: Number(id) },
  });

  if (!clienteCadastrado) {
    const erro = new Error("Cliente não encontrado.");
    erro.statusCode = 404;
    throw erro;
  }

  await prisma.cliente.delete({
    where: { id: Number(id) },
  });

  return { message: "Cliente deletado." };
}

module.exports = {
  criarCliente,
  listarClientes,
  listarClientesPorId,
  atualizarCliente,
  deletarCliente,
};
