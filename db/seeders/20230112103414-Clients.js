'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        userName: "user1",
        displayName: "User1",
        pass1: "123",
        pass2: "123",
        email: "user1@gmail.com",
        phone: "0943830707",
        partnerId: "123",
        partnerKey: "123",
        walletNumber: "123",
        surplus: "0",
        admin: false,
        activeAdmin: false,
        lever: 0
      },
      {
        userName: "user2",
        displayName: "User2",
        pass1: "123",
        pass2: "123",
        email: "user2@gmail.com",
        phone: "0943830707",
        partnerId: "123",
        partnerKey: "123",
        walletNumber: "123",
        surplus: "0",
        admin: false,
        activeAdmin: false,
        lever: 0
      },
      {
        userName: "user3",
        displayName: "User3",
        pass1: "123",
        pass2: "123",
        email: "user3@gmail.com",
        phone: "0943830707",
        partnerId: "123",
        partnerKey: "123",
        walletNumber: "123",
        surplus: "0",
        admin: false,
        activeAdmin: false,
        lever: 0
      },
      {
        userName: "user4",
        displayName: "User4",
        pass1: "123",
        pass2: "123",
        email: "user4@gmail.com",
        phone: "0943830707",
        partnerId: "123",
        partnerKey: "123",
        walletNumber: "123",
        surplus: "0",
        admin: false,
        activeAdmin: false,
        lever: 1
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
