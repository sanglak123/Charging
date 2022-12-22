'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('ListPrices', [
      // VIETTEL
      {
        telco: "VIETTEL",
        value: "10000",
        fees: "14.5",
        penalty: 50
      },
      {
        telco: "VIETTEL",
        value: "20000",
        fees: "14.5",
        penalty: 50
      },
      {
        telco: "VIETTEL",
        value: "30000",
        fees: "14.5",
        penalty: 50
      },
      {
        telco: "VIETTEL",
        value: "50000",
        fees: "12",
        penalty: 50
      },
      {
        telco: "VIETTEL",
        value: "100000",
        fees: "12",
        penalty: 50
      },
      {
        telco: "VIETTEL",
        value: "200000",
        fees: "13",
        penalty: 50
      },
      {
        telco: "VIETTEL",
        value: "300000",
        fees: "13.5",
        penalty: 50
      },
      {
        telco: "VIETTEL",
        value: "500000",
        fees: "17",
        penalty: 50
      },
      {
        telco: "VIETTEL",
        value: "1000000",
        fees: "17",
        penalty: 50
      },

      // MOBIFONE
      {
        telco: "MOBIFONE",
        value: "10000",
        fees: "18.5",
        penalty: 50
      },
      {
        telco: "MOBIFONE",
        value: "20000",
        fees: "18.5",
        penalty: 50
      },
      {
        telco: "MOBIFONE",
        value: "30000",
        fees: "18.5",
        penalty: 50
      },
      {
        telco: "MOBIFONE",
        value: "50000",
        fees: "19",
        penalty: 50
      },
      {
        telco: "MOBIFONE",
        value: "100000",
        fees: "19",
        penalty: 50
      },
      {
        telco: "MOBIFONE",
        value: "200000",
        fees: "19",
        penalty: 50
      },
      {
        telco: "MOBIFONE",
        value: "300000",
        fees: "19",
        penalty: 50
      },
      {
        telco: "MOBIFONE",
        value: "500000",
        fees: "19",
        penalty: 50
      },

      // VINAPHONE
      {
        telco: "VINAPHONE",
        value: "10000",
        fees: "12.5",
        penalty: 50
      },
      {
        telco: "VINAPHONE",
        value: "20000",
        fees: "12.5",
        penalty: 50
      },
      {
        telco: "VINAPHONE",
        value: "30000",
        fees: "12.5",
        penalty: 50
      },
      {
        telco: "VINAPHONE",
        value: 50000,
        fees: "13",
        penalty: 50
      },
      {
        telco: "VINAPHONE",
        value: "100000",
        fees: "13",
        penalty: 50
      },
      {
        telco: "VINAPHONE",
        value: "200000",
        fees: "13",
        penalty: 50
      },
      {
        telco: "VINAPHONE",
        value: "300000",
        fees: "13",
        penalty: 50
      },
      {
        telco: "VINAPHONE",
        value: "500000",
        fees: "16",
        penalty: 50
      },

      // VNMOBI
      {
        telco: "VNMOBI",
        value: "10000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "VNMOBI",
        value: "20000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "VNMOBI",
        value: "30000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "VNMOBI",
        value: "50000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "VNMOBI",
        value: "100000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "VNMOBI",
        value: "200000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "VNMOBI",
        value: "300000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "VNMOBI",
        value: "500000",
        fees: "18",
        penalty: 50
      },
    
      // GATE
      {
        telco: "GATE",
        value: "10000",
        fees: "26",
        penalty: 50
      },
      {
        telco: "GATE",
        value: "20000",
        fees: "26",
        penalty: 50
      },      
      {
        telco: "GATE",
        value: "50000",
        fees: "26",
        penalty: 50
      },
      {
        telco: "GATE",
        value: "100000",
        fees: "26",
        penalty: 50
      },
      {
        telco: "GATE",
        value: "200000",
        fees: "26",
        penalty: 50
      },      
      {
        telco: "GATE",
        value: "500000",
        fees: "26",
        penalty: 50
      },
      {
        telco: "GATE",
        value: "1000000",
        fees: "26",
        penalty: 50
      },

      // ZING
      {
        telco: "ZING",
        value: "10000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "ZING",
        value: "20000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "ZING",
        value: "30000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "ZING",
        value: "50000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "ZING",
        value: "100000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "ZING",
        value: "200000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "ZING",
        value: "300000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "ZING",
        value: "500000",
        fees: "18",
        penalty: 50
      },
      {
        telco: "ZING",
        value: "1000000",
        fees: "18",
        penalty: 50
      },

      // GARENA      
      {
        telco: "GARENA",
        value: "20000",
        fees: "20",
        penalty: 50
      },     
      {
        telco: "GARENA",
        value: "50000",
        fees: "20",
        penalty: 50
      },
      {
        telco: "GARENA",
        value: "100000",
        fees: "20",
        penalty: 50
      },
      {
        telco: "GARENA",
        value: "200000",
        fees: "20",
        penalty: 50
      },    
      {
        telco: "GARENA",
        value: "500000",
        fees: "20",
        penalty: 50
      },
      // VCOIN
      {
        telco: "VCOIN",
        value: "10000",
        fees: "30",
        penalty: 50
      },
      {
        telco: "VCOIN",
        value: "20000",
        fees: "30",
        penalty: 50
      },    
      {
        telco: "VCOIN",
        value: "50000",
        fees: "30",
        penalty: 50
      },
      {
        telco: "VCOIN",
        value: "100000",
        fees: "25",
        penalty: 50
      },
      {
        telco: "VCOIN",
        value: "200000",
        fees: "25",
        penalty: 50
      },
      {
        telco: "VCOIN",
        value: "300000",
        fees: "25",
        penalty: 50
      },
      {
        telco: "VCOIN",
        value: "500000",
        fees: "25",
        penalty: 50
      },
      {
        telco: "VCOIN",
        value: "1000000",
        fees: "25",
        penalty: 50
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ListPrices', null, {});
  }
};
