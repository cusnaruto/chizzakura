const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");
const Items = require("./Items");

const ItemReview = sequelize.define("ItemReview", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Items',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'ItemReviews',
  timestamps: false
});

// Define associations
ItemReview.belongsTo(Items, { foreignKey: 'itemId' });

module.exports = ItemReview;