'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cards, { foreignKey: "idPrice" });
      this.belongsTo(models.TypeCards, { foreignKey: "idType" });
    }
  }
  Prices.init({   
    value: DataTypes.STRING,
    feesBuy: DataTypes.FLOAT,
    feesChange: DataTypes.FLOAT,
    idType: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prices',
  });
  return Prices;
};