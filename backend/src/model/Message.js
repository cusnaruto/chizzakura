const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const conversationSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // Set _id to be a string (userId)
  participants: [{ type: String, required: true }],
  messages: [messageSchema]
});

module.exports = mongoose.model("Conversation", conversationSchema);
