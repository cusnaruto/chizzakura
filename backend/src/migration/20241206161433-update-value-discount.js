'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Discounts', 'value', {
      type: Sequelize.DECIMAL(3, 2),
      allowNull: false,
      validate: {
        min: 0,
        max: 1
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Discounts', 'value', {

      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });
  }
};
