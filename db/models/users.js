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
      this.hasOne(models.RefreshTokens,{foreignKey:"idUser"});
      this.hasMany(models.PostCards, {foreignKey:"idUser"});
    }
  }
  Users.init({
    userName: DataTypes.STRING,
    pass: DataTypes.STRING,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    surplus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};