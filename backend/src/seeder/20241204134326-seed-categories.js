"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert dữ liệu vào bảng Category
    await queryInterface.bulkInsert(
      "Categories",
      [
        { name: "Main Course", createdAt: new Date(), updatedAt: new Date() },
        { name: "Appetizers", createdAt: new Date(), updatedAt: new Date() },
        { name: "Desserts", createdAt: new Date(), updatedAt: new Date() },
        { name: "Beverages", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa dữ liệu từ bảng Category
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.sequelize.query(
      "ALTER TABLE Categories AUTO_INCREMENT = 1"
    );
  },
};
