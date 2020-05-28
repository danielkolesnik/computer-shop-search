
/**
 * RAMs To Computers Relation Schema
 */
module.exports = (sequelize, DataTypes) => {
  const RamsToComputers = sequelize.define('RamsToComputers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, { timestamps: false });

  return RamsToComputers;
};
