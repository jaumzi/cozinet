'use strict';

const { Encriptar } = require('../../util/Criptografia');
const EnumPermissao = require('../../util/EnumPermissao');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    const mesQvem = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    return queryInterface.sequelize.transaction(async (t) => {

      const senhaAdmim = await Encriptar('123123');
      const senhaCliente = await Encriptar('123123');

      return Promise.all([
        queryInterface.bulkInsert(
          'Usuario',
          [
            {
              nome: 'Administrador',
              email: 'admin@admin.com',
              senha: senhaAdmim,
              // cpf: '12345678910',
              // dataNascimento: new Date(1997, 5, 21),
              permissao: EnumPermissao.Admin,
              createdAt: now,
              updatedAt: now
            },
            {
              nome: 'Fulano da Silva',
              email: 'basico@basico.com',
              senha: senhaCliente,
              // cpf: '12345678911',
              // dataNascimento: new Date(1997, 5, 22),
              permissao: EnumPermissao.Basic,
              createdAt: now,
              updatedAt: now
            }
          ],
          {}
        ),
        
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {}
};
