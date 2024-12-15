const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");
const Items = require("./Items");
const User = require("./user");

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
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'ItemReviews',
    timestamps: false
});

// Define associations with aliases
ItemReview.belongsTo(Items, { foreignKey: 'itemId', as: 'Item' });
ItemReview.belongsTo(User, { foreignKey: 'userId', as: 'User' });

module.exports = ItemReview;