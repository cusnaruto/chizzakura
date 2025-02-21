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

// Add indexes for better query performance
conversationSchema.index({ _id: 1 });
conversationSchema.index({ 'participants': 1 });

module.exports = mongoose.model("Conversation", conversationSchema);
