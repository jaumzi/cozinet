module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define(
    'Usuario',
    {
      nome: DataTypes.STRING,
      // cpf: DataTypes.STRING,
      // dataNascimento: DataTypes.DATE,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      permissao: DataTypes.INTEGER
    },
    {
      freezeTableName: true
    }
  );

  table.associate = function (models) {
    // models.Usuario.hasMany(models.Mensagem, { foreignKey: 'idUsuario' });
    // models.Usuario.hasMany(models.Contato, { foreignKey: 'idUsuario' });
  
    // models.Usuario.hasMany(models.UsuarioLojista, { foreignKey: 'idUsuario' });
  };
  
  return table;
};
