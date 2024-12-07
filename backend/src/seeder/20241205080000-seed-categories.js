'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      return await queryInterface.bulkInsert('Categories', [
        {
          id: 1,
          name: 'Pizza',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Drinks',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'Sides',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: 'Desserts',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], { transaction: t });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      return await queryInterface.bulkDelete('Categories', null, { transaction: t });
    });
  }
};