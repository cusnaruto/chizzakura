const express = require("express");
const router = express.Router();

const {
    getMessages,
    sendMessage,
    markAsRead,
    getChatRooms
  } = require("../controllers/messageController");

  router.get("/rooms", getChatRooms); // Fetch all chat rooms with messages
  router.get("/:roomId", getMessages); // Fetch messages for a user
  router.post("/send", async (req, res) => {
    // Send message using REST (if needed)
    const { data } = req.body;
    try {
        await sendMessage(data, null); // Pass null for io since it's not used in REST
        res.status(200).json({ message: "Message sent" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }
});
  router.put("/read", markAsRead); // Mark messages as read

module.exports = router;