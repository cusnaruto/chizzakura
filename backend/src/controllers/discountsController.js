const Discount = require("../model/Discount");

// Create a new Discount
const createDiscount = async (req, res) => {
  try {
    const Discount = await Discount.create(req.body);
    res.status(201).json(Discount);
  } catch (error) {
    console.error("Error creating Discount:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all Discounts
const getDiscounts = async (req, res) => {
  try {
    const Discounts = await Discount.findAll();
    res.status(200).json(Discounts);
  } catch (error) {
    console.error("Error fetching Discounts:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single Discount by ID
const getDiscountById = async (req, res) => {
  try {
    const Discount = await Discount.findByPk(req.params.id);
    if (Discount) {
      res.status(200).json(Discount);
    } else {
      res.status(404).json({ error: "Discount not found" });
    }
  } catch (error) {
    console.error("Error fetching Discount by ID:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a Discount by ID
const updateDiscount = async (req, res) => {
  try {
    const [updated] = await Discount.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedDiscount = await Discount.findByPk(req.params.id);
      res.status(200).json(updatedDiscount);
    } else {
      res.status(404).json({ error: "Discount not found" });
    }
  } catch (error) {
    console.error("Error updating Discount:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a Discount by ID
const deleteDiscount = async (req, res) => {
  try {
    const deleted = await Discount.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Discount not found" });
    }
  } catch (error) {
    console.error("Error deleting Discount:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDiscount,
  getDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
};
