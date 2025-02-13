const Conversation = require("../model/Message");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";
// Fetch all chat rooms (conversations)
const getChatRooms = async (req, res) => {
  try {
    const chatRooms = await Conversation.find({}, "participants").lean();
    res.status(200).json(chatRooms);
  } catch (error) {
    console.error("Error fetching chat rooms:", error.message);
    res.status(500).json({ error: "Failed to fetch chat rooms" });
  }
};

const sendMessage = async (data, io) => {
  const { token, message, sender_id, receiver_id } = data;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const senderUserId = sender_id.toString();  // Ensure IDs are strings
    const receiverUserId = receiver_id.toString();  

    // The conversation ID is always the customer's userId
    const conversationId = decoded.role === "customer" ? senderUserId : receiverUserId;

    const messageData = {
      sender: senderUserId,
      message: message,
      timestamp: new Date()
    };

    let conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      // If customer initiates the chat, create a new conversation
      if (decoded.role === "customer") {
        conversation = new Conversation({
          _id: senderUserId, // Customer ID as conversation ID
          participants: [senderUserId, "2"], // Assuming "employee_1" is the support agent
          messages: [messageData]
        });
      } else {
        return console.error("❌ Employee cannot start a new conversation");
      }
    } else {
      conversation.messages.push(messageData);
    }

    await conversation.save();

    if (io) {
      io.emit("receive_message", {
        conversationId: conversation._id,
        messageData});
    }
    // 🔹 Return the conversation ID
    console.log("✅ Conversation ID:", conversation._id);
    return conversation._id;

  } catch (error) {
    console.error("Error sending message:", error.message);
  }
};



const getMessages = async (req, res) => {
  const { roomId } = req.params; // roomId is customerId

  try {
    const conversation = await Conversation.findById(roomId);
    if (!conversation) {
      return res.status(404).json({ error: "No messages found" });
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};


module.exports = {
  getChatRooms,
  sendMessage,
  getMessages,
};


