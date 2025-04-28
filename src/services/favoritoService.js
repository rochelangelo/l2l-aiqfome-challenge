const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");

async function adicionarProdutoFavorito(clienteId, produtoId) {
  const clienteCadastrado = await prisma.cliente.findUnique({
    where: { id: Number(clienteId) },
  });

  if (!clienteCadastrado) {
    throw new Error("Cliente não encontrado.");
  }

  const produtoFavoritado = await prisma.favorito.findFirst({
    where: {
      clienteId: Number(clienteId),
      produtoId: Number(produtoId),
    },
  });

  if (produtoFavoritado) {
    throw new Error("Produto já pertence aos favoritos.");
  }

  const response = await axios.get(
    `https://fakestoreapi.com/products/${produtoId}`
  );
  const produto = response.data;

  if (!produto || !produto.id) {
    throw new Error("Produto não encontrado.");
  }

  const favoritado = await prisma.favorito.create({
    data: {
      produtoId: produto.id,
      titulo: produto.title,
      imagem: produto.image,
      preco: produto.price,
      review: produto.rating?.rate || null,
      clienteId: Number(clienteId),
    },
  });

  return favoritado;
}

async function listarFavoritosPorCliente(clienteId) {
  const clienteCadastrado = await prisma.cliente.findUnique({
    where: { id: Number(clienteId) },
  });

  if (!clienteCadastrado) {
    throw new Error("Cliente não encontrado.");
  }

  const favoritosCliente = await prisma.favorito.findMany({
    where: { clienteId: Number(clienteId) },
  });

  return favoritosCliente;
}

async function removerFavorito(clienteId, produtoId) {
  const clienteCadastrado = await prisma.cliente.findUnique({
    where: { id: Number(clienteId) },
  });

  if (!clienteCadastrado) {
    throw new Error("Cliente não encontrado.");
  }

  const produtoFavoritado = await prisma.favorito.findFirst({
    where: {
      clienteId: Number(clienteId),
      produtoId: Number(produtoId),
    },
  });

  if (!produtoFavoritado) {
    throw new Error("Produto não está nos favoritos deste cliente.");
  }

  await prisma.favorito.delete({
    where: {
      id: Number(produtoFavoritado.id),
    },
  });

  return { message: "Produto removido dos  favoritos." };
}

module.exports = {
  adicionarProdutoFavorito,
  listarFavoritosPorCliente,
  removerFavorito,
};
