'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('employees', [
      {
        name: 'John Doe',
        age: 30,
        department_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Doe',
        age: 25,
        department_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Super",

        mobile: "+209992345679",
        department_id: 9,

      },
      {
        name: "ايمان",

        mobile: "+209992345672",
        department_id: 9,

      },
      {
        name: "استاذ محمد",

        mobile: "+209992345673",

        department_id: null
      },
      {
        name: "ابراهيم",

        mobile: "+209992345674",

        department_id: null
      },
      {
        name: "السيد",

        mobile: "+209992345675",

        department_id: null
      },
      {
        name: "مريم",

        mobile: "+209992345676",

        department_id: null
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
