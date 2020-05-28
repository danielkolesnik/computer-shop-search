
/**
 * Ram Schema
 */
module.exports = (sequelize, DataTypes) => {
  const Ram = sequelize.define('Ram', {
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    frequency: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    memory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    memoryType: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Ram.associate = function(models) {
    Ram.belongsToMany(models.Computer, {through: {model: models.RamsToComputers, unique: false}});
  }

  return Ram;
};
