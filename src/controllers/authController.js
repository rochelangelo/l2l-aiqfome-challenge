const authService = require("../services/authService");

async function registrar(req, res) {
  try {
    const { email, senha } = req.body;
    const usuario = await authService.registrarUsuario({ email, senha });

    res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso.", usuario });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const token = await authService.loginUsuario({ email, senha });

    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = {
  registrar,
  login,
};
