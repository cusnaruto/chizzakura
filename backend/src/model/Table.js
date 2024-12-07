const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Table = sequelize.define("Tables", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  table_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  qr_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  freezeTableName: true
});

module.exports = Table;