'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDescription = await queryInterface.describeTable('Items');

    if (!tableDescription.is_available) {
      await queryInterface.addColumn('Items', 'is_available', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      });
    }

    if (!tableDescription.image) {
      await queryInterface.addColumn('Items', 'image', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    await queryInterface.changeColumn('Items', 'price', {
      type: Sequelize.FLOAT,
      allowNull: false,
    });

    await queryInterface.changeColumn('Items', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });

    await queryInterface.changeColumn('Items', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Items', 'price', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.removeColumn('Items', 'is_available');

    await queryInterface.removeColumn('Items', 'image');

    await queryInterface.changeColumn('Items', 'createdAt', {
      allowNull: true,
      type: Sequelize.DATE,
    });

    await queryInterface.changeColumn('Items', 'updatedAt', {
      allowNull: true,
      type: Sequelize.DATE,
    });
  },
};