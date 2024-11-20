// models/orderdetail.js
module.exports = (sequelize, DataTypes) => {
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
  });

  OrderDetail.associate = (models) => {
    OrderDetail.belongsTo(models.Order, { foreignKey: "orderId" });
    OrderDetail.belongsTo(models.Item, { foreignKey: "itemId" });
  };

  return OrderDetail;
};
