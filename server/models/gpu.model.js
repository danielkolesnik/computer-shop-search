
/**
 * GPU Schema
 */
module.exports = (sequelize, DataTypes) => {
  const Gpu = sequelize.define('Gpu', {
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    model: {
      type: DataTypes.STRING,
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

  Gpu.associate = function(models) {
    Gpu.hasMany(models.Computer);
  };

  return Gpu;
};
