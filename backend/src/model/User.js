const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");
const mongoose = require('mongoose');
const Message = require('./Messages'); // Import the Message model

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM("owner", "employee", "customer"),
    allowNull: false,
    defaultValue: "customer",
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Hook to delete associated messages when a user is deleted
User.beforeDestroy(async (user, options) => {
  try {
    // Delete all messages where the user is either sender or receiver
    await Message.deleteMany({
      $or: [
        { sender_id: user.id },
        { receiver_id: user.id }
      ]
    });
  } catch (error) {
    console.error('Error deleting MongoDB messages:', error);
    throw error; // This will rollback the MySQL transaction
  }
});

module.exports = User;