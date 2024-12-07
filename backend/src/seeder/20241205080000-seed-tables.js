'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Wrap in transaction to ensure all-or-nothing insertion
    return queryInterface.sequelize.transaction(async (t) => {
      return await queryInterface.bulkInsert('Tables', [
        {
          id: 1,
          table_number: 1,
          qr_code: 'TABLE_QR_001',
          is_available: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
            id: 2,
            table_number: 2,
            qr_code: 'TABLE_QR_002',
            is_available: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 3,
            table_number: 3,
            qr_code: 'TABLE_QR_003',
            is_available: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 4,
            table_number: 4,
            qr_code: 'TABLE_QR_004',
            is_available: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 5,
            table_number: 5,
            qr_code: 'TABLE_QR_005',
            is_available: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }
      ], { transaction: t });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      return await queryInterface.bulkDelete('Tables', null, { transaction: t });
    });
  }
};