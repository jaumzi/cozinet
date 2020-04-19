const express = require('express');
const routes = express.Router();

const Authorize = require('./util/AuthorizeRoutes');

const EnumPermissao = require('./util/EnumPermissao');
const UsuarioController = require('./controllers/UsuarioController');

routes.get('/', (req, res) => {
  res.json({ msg: 'Hello Cozinet' });
});

routes.post('/usuario/login', UsuarioController.login);
routes.post(
  '/usuario/login_validate',
  (req, res, next) =>
    Authorize(req, res, next, [
      EnumPermissao.Admin,
      EnumPermissao.Lojista,
      EnumPermissao.Basic
    ]),
  UsuarioController.loginValidate
);
// routes.post('/usuario/account_recovery', UsuarioController.loginValidate);
// routes.post('/usuario/forgot_password', UsuarioController.forgotPassword);

routes.get(
  '/usuario',
  (req, res, next) => Authorize(req, res, next, [EnumPermissao.Admin]),
  UsuarioController.getUsuarios
);
routes.get(
  '/usuario/:id',
  (req, res, next) => Authorize(req, res, next, [EnumPermissao.Admin]),
  UsuarioController.getUsuario
);
routes.post('/usuario', UsuarioController.cadastroUsuario);
// routes.post('/usuarioAdmin', UsuarioController.cadastroUsuarioAdmin);
routes.put('/usuario/:id', UsuarioController.updateUsuario);
routes.delete('/usuario/:id', UsuarioController.deleteUsuario);

module.exports = routes;
