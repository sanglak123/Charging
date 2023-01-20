'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BankOfUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Banks, { foreignKey: "idBank" });
      this.belongsTo(models.Users, { foreignKey: "idUser" });
    }
  }
  BankOfUsers.init({
    idBank: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    owner: DataTypes.STRING,
    numberCard: DataTypes.STRING,
    numberBank: DataTypes.STRING,
    branch: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BankOfUsers',
  });
  return BankOfUsers;
};