// models/order.js
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    tableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Table, { foreignKey: "tableId" });
  };

  return Order;
};
