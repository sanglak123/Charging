'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      displayName: {
        type: Sequelize.STRING
      },
      pass1: {
        type: Sequelize.STRING
      },
      pass2: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      partnerId: {
        type: Sequelize.STRING
      },
      partnerKey: {
        type: Sequelize.STRING
      },
      walletNumber: {
        type: Sequelize.STRING
      },
      surplus: {
        type: Sequelize.STRING,
        defaultValue: "0"
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      activeAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      lever: {
        type: Sequelize.INTEGER,
        defaultValue: -1
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
    await queryInterface.dropTable('Users');
  }
};