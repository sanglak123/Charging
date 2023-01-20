'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TypeCards', [
      {
        //1
        telco: 'Viettel',
        type: "phone",
        img: "/img/card/the_viettel.png"
      },
      {
        //2
        telco: 'Mobifone',
        type: "phone",
        img: "/img/card/the_mobifone.jpeg"
      },
      {
        //3
        telco: 'Vinaphone',
        type: "phone",
        img: "/img/card/the_vinaphone.jpeg"
      },
      {
        //4
        telco: 'Vnmobi',
        type: "phone",
        img: "/img/card/the_vietnamobile.jpeg"
      },
      {
        //5
        telco: 'Garena',
        type: "game",
        img: "/img/card/the_garena.png"
      },
      {
        //6
        telco: 'Sohacoin',
        type: "game",
        img: "/img/card/the_sohacoin.png"
      },
      {
        //7
        telco: 'Bitvn',
        type: "game",
        img: "/img/card/the_bitvn.jpg"
      },
      {
        //8
        telco: 'Appota',
        type: "game",
        img: "/img/card/the_appota.png"
      },
      {
        //9
        telco: 'Zing',
        type: "game",
        img: "/img/card/the_zing.png"
      },
      {
        //10
        telco: 'Vcoin',
        type: "game",
        img: "/img/card/the_vcoin.png"
      },
      {
        //11
        telco: 'Gate',
        type: "game",
        img: "/img/card/the_gate.png"
      },
      {
        //12
        telco: 'Carot',
        type: "game",
        img: "/img/card/the_Carot.jpg"
      },
      {
        //13
        telco: 'Funcard',
        type: "game",
        img: "/img/card/the_funcard.jpg"
      },
      {
        //14
        telco: 'Vega',
        type: "game",
        img: "/img/card/the_vega.png"
      }

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TypeCards', null, {});
  }
};
