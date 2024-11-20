// migrations/xxxx-update-role-column.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cập nhật cột 'role' để thêm 'admin' vào ENUM
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.ENUM("owner", "employee", "customer"), // Thêm giá trị 'admin'
      allowNull: false,
      defaultValue: "customer", // Mặc định là 'customer'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Quay lại thay đổi trong trường hợp rollback
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.ENUM("owner", "employee", "customer"),
      allowNull: false,
      defaultValue: "customer",
    });
  },
};
