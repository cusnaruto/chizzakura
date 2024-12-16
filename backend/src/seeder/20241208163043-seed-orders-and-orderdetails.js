"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const orderDetails = [
      {
        orderId: 1,
        itemId: 1, // Pizza Margherita
        quantity: 2,
        unit_price: 120000,
        total_price: 240000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        itemId: 2, // Spaghetti Carbonara
        quantity: 1,
        unit_price: 150000,
        total_price: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        itemId: 3, // Caesar Salad
        quantity: 3,
        unit_price: 90000,
        total_price: 270000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        itemId: 4, // Tiramisu
        quantity: 2,
        unit_price: 80000,
        total_price: 160000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Orderdetails", orderDetails, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orderdetails", null, {});
  },
};
