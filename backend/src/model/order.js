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
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "cancelled"),
      defaultValue: "pending",
      allowNull: false,
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Table, { foreignKey: "tableId" });
    Order.belongsTo(models.User, { foreignKey: "customerId" });
    Order.belongsTo(models.User, { foreignKey: "employeeId" });
  };

  return Order;
};
