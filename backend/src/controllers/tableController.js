const Table = require("../model/Table");

// Create a new table
const createTable = async (req, res) => {
  try {
    const { table_number } = req.body;
    const table = await Table.create({
      id: table_number, // Use table_number as id
      table_number,
      qr_code: `TABLE_QR_${table_number.toString().padStart(3, '0')}`,
      is_available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json(table);
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all tables
const getTables = async (req, res) => {
  try {
    const tables = await Table.findAll();
    res.status(200).json(tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single table by ID
const getTableById = async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id);
    if (table) {
      res.status(200).json(table);
    } else {
      res.status(404).json({ error: "Table not found" });
    }
  } catch (error) {
    console.error("Error fetching table by ID:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a table by ID
const updateTable = async (req, res) => {
  try {
    const [updated] = await Table.update({
      ...req.body,
      updatedAt: new Date()
    }, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedTable = await Table.findByPk(req.params.id);
      res.status(200).json(updatedTable);
    } else {
      res.status(404).json({ error: "Table not found" });
    }
  } catch (error) {
    console.error("Error updating table:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a table by ID
const deleteTable = async (req, res) => {
  try {
    const deleted = await Table.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Table not found" });
    }
  } catch (error) {
    console.error("Error deleting table:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTable,
  getTables,
  getTableById,
  updateTable,
  deleteTable,
};
