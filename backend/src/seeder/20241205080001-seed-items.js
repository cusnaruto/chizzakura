'use strict';

const defaultImage = 'https://cdn.i-scmp.com/sites/default/files/d8/images/methode/2019/03/14/5cacc3ac-4547-11e9-b5dc-9921d5eb8a6d_image_hires_110410.jpg';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      return await queryInterface.bulkInsert('Items', [
        {
          id: 1,
          name: 'Margherita Pizza',
          price: 12.99,
          categoryId: 1,
          is_available: true,
          image: defaultImage,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Pepperoni Pizza',
          price: 14.99,
          categoryId: 1,
          is_available: true,
          image: defaultImage,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'Hawaiian Pizza',
          price: 13.99,
          categoryId: 1,
          is_available: true,
          image: defaultImage,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: 'Coca Cola',
          price: 2.99,
          categoryId: 2,
          is_available: true,
          image: defaultImage,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: 'Chocolate Cake',
          price: 6.99,
          categoryId: 4,
          is_available: true,
          image: defaultImage,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], { transaction: t });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      return await queryInterface.bulkDelete('Items', null, { transaction: t });
    });
  }
};