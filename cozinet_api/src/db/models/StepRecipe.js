module.exports = (sequelize, DataTypes) => {
  const table = sequelize.define(
    'StepRecipe',
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      duration: DataTypes.TIME,
      idRecipe: DataTypes.INTEGER,
    },
    {
      freezeTableName: true
    }
  );

  table.associate = function (models) {
  };
  
  return table;
};
