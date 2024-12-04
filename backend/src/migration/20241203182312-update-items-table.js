// migrations/xxxxxx-update-items-table.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Items", "price", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });

    await queryInterface.renameColumn("Items", "categoryId", "categoryid");

    await queryInterface.addColumn("Items", "is_available", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Set a default value to avoid errors when updating existing records
    });

    await queryInterface.addColumn("Items", "image", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn("Items", "createdAt", {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });

    await queryInterface.changeColumn("Items", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Items", "price", {
      type: Sequelize.FLOAT,
      allowNull: false,
    });

    await queryInterface.renameColumn("Items", "categoryid", "categoryId");

    await queryInterface.removeColumn("Items", "is_available");

    await queryInterface.removeColumn("Items", "image");

    await queryInterface.changeColumn("Items", "createdAt", {
      allowNull: false,
      type: Sequelize.DATE,
    });

    await queryInterface.changeColumn("Items", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },
};
