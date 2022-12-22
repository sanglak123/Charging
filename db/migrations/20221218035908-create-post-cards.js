'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PostCards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      telco: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      seri: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      sign: {
        type: Sequelize.STRING
      },
      declared_value: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      request_id: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      trans_id: {
        type: Sequelize.STRING
      },
      idUser: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('PostCards');
  }
};