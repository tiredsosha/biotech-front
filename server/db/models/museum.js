const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Museum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Museum.init(
    {
      powerValue: DataTypes.BOOLEAN,
      soundValue: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Museum',
    },
  );
  return Museum;
};
