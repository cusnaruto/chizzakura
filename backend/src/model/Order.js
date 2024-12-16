const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");
const Table = require("./Table");
const OrderDetail = require("./OrderDetail");

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
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("pending", "completed", "cancelled"),
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Define associations
Order.belongsTo(Table, { foreignKey: "tableId" });
Order.hasMany(OrderDetail, { foreignKey: "orderId" });

module.exports = Order;
