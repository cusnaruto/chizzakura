// models/bill.js
module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define("Bill", {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Bill.associate = (models) => {
    Bill.belongsTo(models.Order, { foreignKey: "orderId" });
  };

  return Bill;
};
