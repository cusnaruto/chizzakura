const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");
const Items = require("./Items");

const OrderDetail = sequelize.define("OrderDetail", {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.FLOAT,
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
      allowNull: false,
    },
});


// Define the association directly
OrderDetail.belongsTo(Items, { foreignKey: 'itemId' });

module.exports = OrderDetail;