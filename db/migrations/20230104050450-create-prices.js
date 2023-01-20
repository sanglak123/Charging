'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Prices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },    
      value: {
        type: Sequelize.STRING
      },
      feesBuy: {
        type: Sequelize.FLOAT
      },
      feesChange: {
        type: Sequelize.FLOAT
      },
      idType: {
        type: Sequelize.INTEGER,
        references: {
          model: "TypeCards",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Prices');
  }
};