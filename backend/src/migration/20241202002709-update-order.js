"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Orders", "customerId", {
      type: Sequelize.INTEGER,
      allowNull: true, // Nếu cần khóa ngoại có thể null, nếu không thì đổi thành false
      references: {
        model: "Users", // Tên bảng khách hàng
        key: "id", // Tên cột khóa chính trong bảng Customers
      },
      onUpdate: "CASCADE", // Hành vi khi cập nhật id trong bảng Customers
      onDelete: "SET NULL", // Hành vi khi xóa khách hàng
    });

    await queryInterface.addColumn("Orders", "employeeId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Users", // Tên bảng nhân viên
        key: "id", // Tên cột khóa chính trong bảng Employees
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Orders", "customerId");
    await queryInterface.removeColumn("Orders", "employeeId");
  },
};
