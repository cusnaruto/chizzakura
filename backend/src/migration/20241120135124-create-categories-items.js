// migrations/xxxxxx-create-categories-items.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CategoryItems", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories", // Tên bảng Categories
          key: "id",
        },
        allowNull: false,
      },
      itemId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Items", // Tên bảng Items
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("CategoryItems");
  },
};
