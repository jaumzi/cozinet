const UsuarioService = require('../services/UsuarioService');
const { Usuario } = require('../db/models');
var jwt = require('jsonwebtoken');
const ParametrosDoSistema = require('./ParametrosDoSistema');

const usuarioService = new UsuarioService(Usuario);

async function userLogged(email, senha) {
  if (!email) {
    return undefined;
  }
  if (!senha) {
    return undefined;
  }

  const usuario = await usuarioService.ObterCompletoPorEmail(email);
  if (!usuario) {
    return undefined;
  }
  if (usuario.senha !== senha) {
    return undefined;
  }

  return usuario;
}

module.exports = {
  async userAccess(email, senha, permissoes) {
    const currentUser = await userLogged(email, senha);

    if (!currentUser || !permissoes.includes(currentUser.permissao)) {
      return undefined;
    }

    return currentUser;
  },
  async verifyJWT(token) {
    const { params } = await ParametrosDoSistema();
    return jwt.verify(token, params.jwt, function(err, decoded) {
      if (err) {
        return undefined;
      }
      return decoded;
    });
  }
};
