const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registrarUsuario({ email, senha }) {
  const usuarioCadastrado = await prisma.usuario.findUnique({
    where: { email },
  });

  if (usuarioCadastrado) {
    throw new Error("Email já cadastrado para outro cliente.");
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  const novoUsuario = await prisma.usuario.create({
    data: {
      email,
      senha: senhaHash,
    },
  });

  return novoUsuario;
}

async function loginUsuario({ email, senha }) {
  const usuario = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado.");
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error("Senha inválida.");
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
}

module.exports = {
  registrarUsuario,
  loginUsuario,
};
