'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cards.init({
    telco: DataTypes.STRING,
    code: DataTypes.STRING,
    seri: DataTypes.STRING,
    value: DataTypes.STRING,
    check: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Cards',
  });
  return Cards;
};