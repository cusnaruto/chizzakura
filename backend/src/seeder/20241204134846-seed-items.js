"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert dữ liệu vào bảng Items
    await queryInterface.bulkInsert(
      "Items",
      [
        {
          name: "Pizza Margherita",
          price: 120000.0,
          categoryid: 1,
          is_available: true,
          image: "pizza-margherita.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Spaghetti Carbonara",
          price: 150000.0,
          categoryid: 1,
          is_available: true,
          image: "spaghetti-carbonara.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Caesar Salad",
          price: 90000.0,
          categoryid: 2,
          is_available: true,
          image: "caesar-salad.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tiramisu",
          price: 80000.0,
          categoryid: 3,
          is_available: false,
          image: "tiramisu.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa dữ liệu từ bảng Items
    await queryInterface.bulkDelete("Items", null, {});
    await queryInterface.sequelize.query(
      "ALTER TABLE Items AUTO_INCREMENT = 1"
    );
  },
};
