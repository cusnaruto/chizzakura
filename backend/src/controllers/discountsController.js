const Discount = require("../model/Discount");

// Create a new Discount
const createDiscount = async (req, res) => {
  try {
    const { discount_code, value, description, valid_from, valid_until } = req.body;

    if (value < 0 || value > 1) {
      return res.status(400).json({ error: "Value must be between 0 and 1"});
    }

    if (!discount_code || !value || !description || !valid_from || !valid_until) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const validFromDate = new Date(valid_from);
    const validUntilDate = new Date(valid_until);

    const newDiscount = await Discount.create({
      discount_code,
      value,
      description,
      valid_from: validFromDate,
      valid_until: validUntilDate
    });

    const formattedDiscount = {
      ...newDiscount.toJSON(),
      valid_from: validFromDate.toISOString().split('T')[0],  // 'yyyy-MM-dd'
      valid_until: validUntilDate.toISOString().split('T')[0] // 'yyyy-MM-dd'
    };

    res.status(201).json(formattedDiscount);
  } catch (error) {
    // console.error("Error creating Discount:", error.stack);
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
