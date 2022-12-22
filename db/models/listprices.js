'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListPrices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ListPrices.init({
    telco: DataTypes.STRING,
    value: DataTypes.STRING,
    fees: DataTypes.STRING,
    penalty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ListPrices',
  });
  return ListPrices;
};