const { Op } = require("sequelize");
const Message = require("../model/message");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";
const sequelize = require('../config/databaseConnection');

// Fetch all chat rooms with messages
const getChatRooms = async (req, res) => {
  try {
    const chatRooms = await Message.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('receiver_id')), 'room_id'],
        [sequelize.fn('MAX', sequelize.col('timestamp')), 'latest_message_timestamp'],
      ],
      group: ['receiver_id'],
      order: [[sequelize.fn('MAX', sequelize.col('timestamp')), 'DESC']],
    });

    res.status(200).json(chatRooms);
  } catch (error) {
    console.error("Error fetching chat rooms:", error.message);
    res.status(500).json({ error: "Failed to fetch chat rooms" });
  }
};

const sendMessage = async (data, io) => {
  const { token, room, message, sender_id} = data;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').replace('Z', ''); // Format to YYYY-MM-DD HH:MM:SS.SSSSSS
    const messageData = {
      sender_id: sender_id,
      receiver_id: parseInt(room, 10), // Ensure receiver_id is an integer
      content: message,
      timestamp: timestamp,
      status: "sent",
    };

    console.log("Message data being saved:", messageData); // Log the message data

    // Save the message to the database
    await Message.create(messageData);

    // Emit the message to the room
    if (io) {
      io.emit("receive_message", messageData);
    }
    else {
      console.log("io? what io?");
    }
  } catch (error) {
    console.error("Error sending message:", error.message);
  }
};

// Fetch all messages for a user
const getMessages = async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: roomId  }, // Sent messages
          { receiver_id: roomId }, // Received messages
        ],
      },
      order: [["timestamp", "ASC"]],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Mark messages as read
const markAsRead = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    await Message.update(
      { status: "read" },
      {
        where: {
          sender_id: senderId,
          receiver_id: receiverId,
          status: { [Op.ne]: "read" },
        },
      }
    );
    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    console.error("Error marking messages as read:", error.message);
    res.status(500).json({ error: "Failed to mark messages as read" });
  }
};

module.exports = {
  getMessages,
  sendMessage,
  markAsRead,
  getChatRooms
};