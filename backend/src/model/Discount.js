// src/models/Discount.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Discount = sequelize.define("Discounts", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  discount_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  value: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: false,
    validate: {
      min: 0,
      max: 1
    }
  },
  valid_from: {
    type: DataTypes.DATE,
    allowNull: false,
  },
    valid_until: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
  freezeTableName: true, // Prevent Sequelize from pluralizing the table name
  timestamps: false, // Disable the automatic creation of createdAt and updatedAt fields
});

module.exports = Discount;