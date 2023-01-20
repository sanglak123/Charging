'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Banks', [
      {
        name: 'Đầu tư và Phát triển Việt Nam',
        sign: "BIDV"
      },
      {
        name: 'Ngoại Thương Việt Nam',
        sign: "Vietcombank"
      },
      {
        name: 'Công thương Việt Nam',
        sign: "VietinBank"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Banks', null, {});
  }
};
