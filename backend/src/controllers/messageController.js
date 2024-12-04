const Message = require("../model/message");
// Create a new Message
const createMessage = async (req, res) => {
  try {
    const Message = await Message.create(req.body);
    res.status(201).json(Message);
  } catch (error) {
    console.error("Error creating Message:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all Messages
const getMessages = async (req, res) => {
  try {
    const Messages = await Message.findAll();
    res.status(200).json(Messages);
  } catch (error) {
    console.error("Error fetching Messages:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single Message by ID
const getMessageById = async (req, res) => {
  try {
    const Message = await Message.findByPk(req.params.id);
    if (Message) {
      res.status(200).json(Message);
    } else {
      res.status(404).json({ error: "Message not found" });
    }
  } catch (error) {
    console.error("Error fetching Message by ID:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a Message by ID
const deleteMessage = async (req, res) => {
  try {
    const deleted = await Message.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Message not found" });
    }
  } catch (error) {
    console.error("Error deleting Message:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMessage,
  getMessages,
  getMessageById,
  deleteMessage,
};
