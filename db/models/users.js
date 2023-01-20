'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.BankOfUsers, { foreignKey: "idUser" });
      this.hasMany(models.Cards, { foreignKey: "idUser" });
    }
  }
  Users.init({
    userName: DataTypes.STRING,
    displayName: DataTypes.STRING,
    pass1: DataTypes.STRING,
    pass2: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    partnerId: DataTypes.STRING,
    partnerKey: DataTypes.STRING,
    walletNumber: DataTypes.STRING,
    surplus: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    activeAdmin: DataTypes.BOOLEAN,
    lever: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};