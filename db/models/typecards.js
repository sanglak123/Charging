'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeCards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Prices, { foreignKey: "idType" })
    }
  }
  TypeCards.init({
    telco: DataTypes.STRING,
    type: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypeCards',
  });
  return TypeCards;
};