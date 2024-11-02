// src/models/Table.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Table = sequelize.define("Table", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  qr_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  freezeTableName: true, // Prevent Sequelize from pluralizing the table name
  timestamps: false, // Disable the automatic creation of createdAt and updatedAt fields
});

module.exports = Table;