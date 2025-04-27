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

module.exports = {
  criarCliente,
};
