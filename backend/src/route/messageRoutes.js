const express = require("express");
const router = express.Router();
const { getMessages, sendMessage, getChatRooms } = require("../controllers/messageController");

router.get("/rooms", getChatRooms); // Fetch all chat rooms
router.get("/:roomId", getMessages); // Fetch messages for a room
router.post("/send", async (req, res) => {
  try {
    await sendMessage(req.body, null); // No socket.io for REST
    res.status(200).json({ message: "Message sent" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;
