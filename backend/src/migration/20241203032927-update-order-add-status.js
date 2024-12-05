"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Orders", "status", {
      type: Sequelize.ENUM("pending", "completed", "cancelled"),
      defaultValue: "pending",
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the ENUM type in reverse migration
    await queryInterface.removeColumn("Orders", "status");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Orders_status";'
    );
  },
};
