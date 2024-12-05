const express = require("express");
const router = express.Router();

const {
    getMessages,
    sendMessage,
    markAsRead
  } = require("../controllers/messageController");

  router.get("/:userId", getMessages); // Fetch messages for a user
  router.post("/send", (req, res) => {
    // Send message using REST (if needed)
    const { data, io } = req.body;
    sendMessage(data, io);
  });
  router.put("/read", markAsRead); // Mark messages as read

module.exports = router;