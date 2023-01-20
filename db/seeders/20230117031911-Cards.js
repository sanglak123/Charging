'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cards', [
      //Đổi thẻ => type = true
      {
        idPrice: 78,
        idUser: 1,
        command: "change",
        code: "1234567895235",
        serial: "1234567895235",
        amount: "195000",
        status: "Success"
      },
      {
        idPrice: 79,
        idUser: 1,
        command: "change",
        code: "1234567895235",
        serial: "1234567895235",
        amount: "195000",
        status: "Penanty"
      },
      {
        idPrice: 80,
        idUser: 1,
        command: "change",
        code: "1234567895235",
        serial: "1234567895235",
        amount: "195000",
        status: "Error"
      },
      {
        idPrice: 81,
        idUser: 1,
        command: "change",
        code: "1234567895235",
        serial: "1234567895235",
        amount: "195000",
        status: "Waitting"
      },
      {
        idPrice: 82,
        idUser: 1,
        command: "change",
        code: "1234567895235",
        serial: "1234567895235",
        amount: "195000",
        status: "Success"
      },
      {
        idPrice: 83,
        idUser: 1,
        command: "change",
        code: "1234567895235",
        serial: "1234567895235",
        amount: "195000",
        status: "Error"
      },
      //Mua thẻ
      {
        idPrice: 78,
        idUser: 1,
        command: "buy",
        code: "1234567895235",
        serial: "1234567895235",
        amount: "195000",
        status: "Success"
      },
      {
        idPrice: 79,
        idUser: 1,
        command: "buy",
        code: "1234567895235",
        serial: "1234567895235",
        amount: "195000",
        status: "Success"
      },
      {
        idPrice: 80,
        idUser: 1,
        command: "buy",
        code: "1234567895235",
        serial: "1234567895235",
        amount: "195000",
        status: "Success"
      },
      {
        idPrice: 81,
        idUser: 1,
        command: "buy",
        code: "1234567895235",
        serial: "1234567895235",
        amount: "195000",
        status: "Success"
      },
      {
        idPrice: 82,
        idUser: 1,
        command: "buy",
        code: "1234567895235",
        serial: "1234567895235",
        amount: "195000",
        status: "Success"
      },
      {
        idPrice: 83,
        idUser: 1,
        command: "buy",
        code: "1234567895235",
        serial: "1234567895235",
        amount: "195000",
        status: "Success"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cards', null, {});
  }
};
