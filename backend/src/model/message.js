const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConnection');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
  },
  status: {
      type: DataTypes.ENUM("sent", "read"),
      defaultValue: "sent",
  }
}, {
    tableName: 'messages',
    freezeTableName: true,
    timestamps: false,
});

module.exports = Message;