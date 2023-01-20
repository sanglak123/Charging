'use strict';

/** @idType {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Prices', [

      //Garena
      {
        value: "20000",
        feesBuy: 2.8,
        feesChange: 14,
        idType: 5
      },
      {
        value: "50000",
        feesBuy: 2.8,
        feesChange: 14,
        idType: 5
      },
      {
        value: "100000",
        feesBuy: 2.8,
        feesChange: 14,
        idType: 5
      },
      {
        value: "200000",
        feesBuy: 2.8,
        feesChange: 14,
        idType: 5
      },
      {
        value: "500000",
        feesBuy: 2.8,
        feesChange: 14,
        idType: 5
      },
      //Sohacoin
      {
        value: "10000",
        feesBuy: 2.8,
        idType: 6
      },
      {
        value: "20000",
        feesBuy: 2.8,
        idType: 6
      },
      {
        value: "30000",
        feesBuy: 2.8,
        idType: 6
      },
      {
        value: "50000",
        feesBuy: 2.8,
        idType: 6
      },
      {
        value: "100000",
        feesBuy: 2.8,
        idType: 6
      },
      {
        value: "200000",
        feesBuy: 2.8,
        idType: 6
      },
      {
        value: "500000",
        feesBuy: 2.8,
        idType: 6
      },
      {
        value: "1000000",
        feesBuy: 2.8,
        idType: 6
      },
      {
        value: "2000000",
        feesBuy: 2.8,
        idType: 6
      },
      {
        value: "5000000",
        feesBuy: 2.8,
        idType: 6
      },
      //Bitvn
      {
        value: "50000",
        feesBuy: 2.8,
        idType: 7
      },
      {
        value: "100000",
        feesBuy: 2.8,
        idType: 7
      },
      {
        value: "200000",
        feesBuy: 2.8,
        idType: 7
      },
      {
        value: "300000",
        feesBuy: 2.8,
        idType: 7
      },
      {
        value: "500000",
        feesBuy: 2.8,
        idType: 7
      },
      {
        value: "1000000",
        feesBuy: 2.8,
        idType: 7
      },
      {
        value: "2000000",
        feesBuy: 2.8,
        idType: 7
      },
      {
        value: "5000000",
        feesBuy: 2.8,
        idType: 7
      },
      //Appota
      {
        value: "50000",
        feesBuy: 2.8,
        idType: 8
      },
      {
        value: "100000",
        feesBuy: 2.8,
        idType: 8
      },
      {
        value: "200000",
        feesBuy: 2.8,
        idType: 8
      },
      {
        value: "300000",
        feesBuy: 2.8,
        idType: 8
      },
      {
        value: "500000",
        feesBuy: 2.8,
        idType: 8
      },
      {
        value: "1000000",
        feesBuy: 2.8,
        idType: 8
      },
      {
        value: "2000000",
        feesBuy: 2.8,
        idType: 8
      },
      {
        value: "3000000",
        feesBuy: 2.8,
        idType: 8
      },
      {
        value: "5000000",
        feesBuy: 2.8,
        idType: 8
      },
      //Zing
      {

        value: "10000",
        feesBuy: 2.8,
        idType: 9
      },
      {

        value: "20000",
        feesBuy: 2.8,
        idType: 9
      },
      {

        value: "50000",
        feesBuy: 2.8,
        idType: 9
      },
      {

        value: "100000",
        feesBuy: 2.8,
        idType: 9
      },
      {

        value: "200000",
        feesBuy: 2.8,
        idType: 9
      },
      {

        value: "500000",
        feesBuy: 2.8,
        idType: 9
      },
      {

        value: "1000000",
        feesBuy: 2.8,
        idType: 9
      },
      //Vcoin
      {

        value: "10000",
        feesBuy: 4.3,
        feesChange: 14,
        idType: 10
      },
      {

        value: "20000",
        feesBuy: 4.3,
        feesChange: 30,
        idType: 10
      },
      {

        value: "50000",
        feesBuy: 4.3,
        feesChange: 30,
        idType: 10
      },
      {

        value: "100000",
        feesBuy: 4.3,
        feesChange: 30,
        idType: 10
      },
      {

        value: "200000",
        feesBuy: 4.3,
        feesChange: 30,
        idType: 10
      },
      {

        value: "300000",
        feesBuy: 4.3,
        feesChange: 30,
        idType: 10
      },
      {

        value: "500000",
        feesBuy: 4.3,
        feesChange: 25,
        idType: 10
      },
      {

        value: "1000000",
        feesBuy: 4.3,
        feesChange: 25,
        idType: 10
      },
      {

        value: "2000000",
        feesBuy: 4.3,
        idType: 10
      },
      {

        value: "3000000",
        feesBuy: 4.3,
        idType: 10
      },
      {

        value: "5000000",
        feesBuy: 4.3,
        idType: 10
      },
      //Gate
      {
        value: "10000",
        feesBuy: 4.4,
        feesChange: 23,
        idType: 11
      },
      {
        value: "20000",
        feesBuy: 4.4,
        feesChange: 23,
        idType: 11
      },
      {
        value: "50000",
        feesBuy: 4.4,
        feesChange: 23,
        idType: 11
      },
      {
        value: "100000",
        feesBuy: 4.4,
        feesChange: 23,
        idType: 11
      },
      {
        value: "200000",
        feesBuy: 4.4,
        feesChange: 23,
        idType: 11
      },
      {
        value: "500000",
        feesBuy: 4.4,
        feesChange: 23,
        idType: 11
      },
      {
        value: "1000000",
        feesBuy: 4.4,
        feesChange: 23,
        idType: 11
      },
      {
        value: "2000000",
        feesBuy: 4.2,
        idType: 11
      },
      {
        value: "3000000",
        feesBuy: 4.2,
        idType: 11
      },
      {
        value: "5000000",
        feesBuy: 4.2,
        idType: 11
      },
      //Carot
      {
        value: "100000",
        feesBuy: 15,
        idType: 12
      },
      {
        value: "200000",
        feesBuy: 16,
        idType: 12
      },
      {
        value: "500000",
        feesBuy: 16,
        idType: 12
      },
      //Funcard
      {
        value: "10000",
        feesBuy: 5.2,
        idType: 13
      },
      {
        value: "20000",
        feesBuy: 5.2,
        idType: 13
      },
      {
        value: "50000",
        feesBuy: 5.2,
        idType: 13
      },
      {
        value: "100000",
        feesBuy: 5.2,
        idType: 13
      },
      {
        value: "200000",
        feesBuy: 5.2,
        idType: 13
      },
      {
        value: "500000",
        feesBuy: 5.2,
        idType: 13
      },
      {
        value: "1000000",
        feesBuy: 5.2,
        idType: 13
      },
      //Vega
      {
        value: "20000",
        feesBuy: 5.2,
        idType: 14
      },
      {
        value: "50000",
        feesBuy: 5.2,
        idType: 14
      },
      {
        value: "100000",
        feesBuy: 5.2,
        idType: 14
      },
      {
        value: "200000",
        feesBuy: 5.2,
        idType: 14
      },
      {
        value: "500000",
        feesBuy: 5.2,
        idType: 14
      },
      {
        value: "1000000",
        feesBuy: 5.2,
        idType: 14
      },
      {
        value: "2000000",
        feesBuy: 5.2,
        idType: 14
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Prices', null, {});
  }
};
