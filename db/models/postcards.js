'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostCards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {foreignKey:"idUser"})
    }
  }
  PostCards.init({
    telco: DataTypes.STRING,
    code: DataTypes.STRING,
    seri: DataTypes.STRING,
    value: DataTypes.STRING,
    amount: DataTypes.STRING,
    sign: DataTypes.STRING,
    declared_value: DataTypes.STRING,
    message: DataTypes.STRING,
    request_id: DataTypes.STRING,
    status: DataTypes.INTEGER,
    trans_id: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostCards',
  });
  return PostCards;
};