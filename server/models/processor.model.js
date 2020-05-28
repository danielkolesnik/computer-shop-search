
/**
 * Processor Schema
 */
module.exports = (sequelize, DataTypes) => {
  const Processor = sequelize.define('Processor', {
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
    cores: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    threads: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Processor.associate = function(models) {
    Processor.hasMany(models.Computer);
  };

  return Processor;
};
