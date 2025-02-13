const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender_id: { type: Number, required: true },
    receiver_id: { type: Number, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ["sent", "read"], default: "sent" }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;