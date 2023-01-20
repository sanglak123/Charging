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
      this.belongsTo(models.Prices, { foreignKey: "idPrice" });
      this.belongsTo(models.Users, { foreignKey: "idUser" });
    }
  }
  Cards.init({
    idPrice: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    command: DataTypes.STRING,
    code: DataTypes.STRING,
    serial: DataTypes.STRING,
    amount: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cards',
  });
  return Cards;
};