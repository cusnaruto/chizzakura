"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Mảng để chứa các bản ghi người dùng
    const users = [];

    // Tạo 10 người dùng tự động
    for (let i = 1; i <= 10; i++) {
      const hashedPassword = await bcrypt.hash(`password`, 10); // Mã hóa password
      users.push({
        username: `user_${i}`,
        password: hashedPassword,
        email: `user${i}@gmail.com`,
        role: i === 1 ? "owner" : i === 2 ? "employee" : "customer", // Đặt vai trò cho user 1 là 'owner', user 2 là 'employee', còn lại là 'customer'
        first_name: `First${i}`,
        last_name: `Last${i}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Thêm tất cả người dùng vào cơ sở dữ liệu
    await queryInterface.bulkInsert("Users", users);
  },

  down: async (queryInterface, Sequelize) => {
    // Xoá tất cả người dùng trong bảng Users khi rollback
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.sequelize.query(
      "ALTER TABLE Users AUTO_INCREMENT = 1"
    );
  },
};
