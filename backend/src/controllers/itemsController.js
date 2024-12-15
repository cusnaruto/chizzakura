const Items = require("../model/Items");

// Create a new Item
const createItem = async (req, res) => {
  try {
    const newItem = {
      name: req.body.name,
      price: req.body.price,
      categoryid: req.body.categoryid,
      is_available: true,
      image: req.body.image,
      description: req.body.description,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const item = await Items.create(newItem);
    res.status(201).json(item);
  } catch (error) {
    console.error('Error creating Item:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get all Items
const getItems = async (req, res) => {
  try {
    const items = await Items.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching Items:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single Item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Items.findByPk(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Error fetching Item by ID:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a Item by ID
const updateItem = async (req, res) => {
  try {
    const [updated] = await Items.update({
      ...req.body,
      updatedAt: new Date()
    }, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedItem = await Items.findByPk(req.params.id);
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Error updating Item:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a Item by ID
const deleteItem = async (req, res) => {
  try {
    const deleted = await Items.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Error deleting Item:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};