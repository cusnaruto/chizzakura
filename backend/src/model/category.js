// models/category.js
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Category.associate = (models) => {
    // Định nghĩa quan hệ nếu có (nếu cần thiết)
  };

  return Category;
};
