const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Zone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Zone.init({
    rusName: DataTypes.STRING,
    zoneName: DataTypes.STRING,
    status: DataTypes.STRING,
    powerValue: DataTypes.BOOLEAN,
    soundValue: DataTypes.BOOLEAN,
    ledValue: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Zone',
  });
  return Zone;
};
