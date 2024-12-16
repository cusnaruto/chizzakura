// models/categoryitem.js
module.exports = (sequelize, DataTypes) => {
  const CategoryItem = sequelize.define("CategoryItem", {
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  CategoryItem.associate = (models) => {
    CategoryItem.belongsTo(models.Category, { foreignKey: "categoryId" });
    CategoryItem.belongsTo(models.Item, { foreignKey: "itemId" });
  };

  return CategoryItem;
};
