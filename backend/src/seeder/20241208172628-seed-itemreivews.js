"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const reviews = [
      {
        orderId: 1,
        itemId: 1, // Pizza Margherita
        userId: 1, // Assuming User 1
        rating: 5,
        comment: "Absolutely delicious! Best pizza ever.",
      },
      {
        orderId: 1,
        itemId: 2, // Spaghetti Carbonara
        userId: 2, // Assuming User 2
        rating: 4,
        comment: "Great taste, but a bit salty for my liking.",
      },
      {
        orderId: 2,
        itemId: 3, // Caesar Salad
        userId: 3, // Assuming User 3
        rating: 5,
        comment: "Fresh and crunchy! Loved the dressing.",
      },
      {
        orderId: 2,
        itemId: 4, // Tiramisu
        userId: 4, // Assuming User 4
        rating: 3,
        comment: "Decent, but I've had better tiramisu.",
      },
      {
        orderId: 2,
        itemId: 1, // Pizza Margherita
        userId: 5, // Assuming User 5
        rating: 4,
        comment: "Tasty, but the crust could be crispier.",
      },
    ];

    await queryInterface.bulkInsert("Itemreviews", reviews, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Itemreviews", null, {});
  },
};
