'use strict';

/** @idtype {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Prices', [
      {
        value: "10000",
        feesBuy: 2.3,
        feesChange: 14,
        idtype: 1
      },
      {
        value: "20000",
        feesBuy: 2.4,
        feesChange: 14,
        idtype: 1
      },
      {
        value: "30000",
        feesBuy: 2.3,
        feesChange: 14,
        idtype: 1
      },
      {
        value: "50000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 1
      },
      {
        value: "100000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 1
      },
      {
        value: "200000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 1
      },
      {
        value: "300000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 1
      },
      {
        value: "500000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 1
      },
      {
        value: "1000000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 1
      },
      //Mobile
      {
        value: "10000",
        feesBuy: 2.3,
        feesChange: 14,
        idtype: 2
      },
      {
        value: "20000",
        feesBuy: 2.4,
        feesChange: 14,
        idtype: 1
      },
      {
        value: "30000",
        feesBuy: 2.3,
        feesChange: 14,
        idtype: 2
      },
      {
        value: "50000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 2
      },
      {
        value: "100000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 2
      },
      {
        value: "200000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 2
      },
      {
        value: "300000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 2
      },
      {
        value: "500000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 2
      },
      //Vinaphone
      {
        value: "10000",
        feesBuy: 2.3,
        feesChange: 14,
        idtype: 3
      },
      {
        value: "20000",
        feesBuy: 2.4,
        feesChange: 14,
        idtype: 3
      },
      {
        value: "30000",
        feesBuy: 2.3,
        feesChange: 14,
        idtype: 3
      },
      {
        value: "50000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 3
      },
      {
        value: "100000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 3
      },
      {
        value: "200000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 3
      },
      {
        value: "300000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 3
      },
      {
        value: "500000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 3
      },
      //Vnmobi
      {
        value: "10000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 4
      },
      {
        value: "20000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 4
      },
      {
        value: "50000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 4
      },
      {
        value: "100000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 4
      },
      {
        value: "200000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 4
      },
      {
        value: "300000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 4
      },
      {
        value: "500000",
        feesBuy: 2.8,
        feesChange: 14,
        idtype: 4
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Prices', null, {});
  }
};
