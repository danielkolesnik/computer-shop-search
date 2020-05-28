
/**
 * Processor Schema
 */
module.exports = (sequelize, DataTypes) => {
  const Computer = sequelize.define('Computer', {
    model: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      unique: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Computer.associate = function(models) {
    Computer.belongsTo(models.Processor);
    Computer.belongsTo(models.Gpu);
    Computer.belongsToMany(models.Ram, {through: {model: models.RamsToComputers, unique: false}, as: 'rams'});
  };

  return Computer;
};

