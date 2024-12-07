// src/models/Order.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
  },
  {
    timestamps: true, // Enable automatic creation of createdAt and updatedAt fields
  }
);

Order.associate = (models) => {
  Order.belongsTo(models.Table, { foreignKey: "tableId" });
  Order.belongsTo(models.User, { foreignKey: "customerId" });
  Order.belongsTo(models.User, { foreignKey: "employeeId" });
};

module.exports = Order;
