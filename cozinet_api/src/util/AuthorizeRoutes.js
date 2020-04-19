
const { userAccess, verifyJWT } = require('./VerifyPermission');
const EnumCookies = require('./EnumCookies');
const EnumPermissao = require('./EnumPermissao');

async function Authorize(req, res, next, permissoes = [EnumPermissao.Basic]) {
    const token = req.cookies[EnumCookies.User] || req.headers[EnumCookies.User];
    const user = await verifyJWT(token);
  
    if (!user) {
      return res
        .status(400)
        .json({ error: 'Você não tem permissão para acessar!' });
    }
    const { email, senha } = user;
  
    if (!email || !senha) {
      return res
        .status(400)
        .json({ error: 'Você não tem permissão para acessar!' });
    }
    const access = await userAccess(email, senha, permissoes);
    if (!access) {
      return res
        .status(400)
        .json({ error: 'Você não tem permissão para acessar!' });
    }
    req['currentUser'] = access;
    next();
  }

  module.exports = Authorize;