const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registrarUsuario({ email, senha }) {
  const usuarioCadastrado = await prisma.usuario.findUnique({
    where: { email },
  });

  if (usuarioCadastrado) {
    const erro = new Error("Email já cadastrado para outro usuario.");
    erro.statusCode = 400;
    throw erro;
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
    const erro = new Error("Usuário não encontrado.");
    erro.statusCode = 404;
    throw erro;
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    const erro = new Error("Senha inválida.");
    erro.statusCode = 401;
    throw erro;
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
