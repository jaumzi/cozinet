const BaseService = require('./BaseService');
// const { UsuarioLojista, Loja } = require('../db/models');

class UsuarioService extends BaseService {
  constructor(AbstractClass) {
    super(AbstractClass);
    this.AbstractClass = AbstractClass;
  }
  async ObterCompletoPorEmail(email) {
    if (!email) {
      return undefined;
    }
    return await this.AbstractClass.findOne({
      where: {
        email
      },
      // include: [{ model: UsuarioLojista, include: [{ model: Loja }] }]
    });
  }
  async ObterCompletoPorId(id) {
    if (!id) {
      return undefined;
    }
    return await this.AbstractClass.findOne({
      where: {
        id
      },
      // include: [{ model: UsuarioLojista, include: [{ model: Loja }] }]
    });
  }
}

module.exports = UsuarioService;
