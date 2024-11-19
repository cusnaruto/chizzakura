const express = require("express");
const router = express.Router();

const {
    createTable,
    getTables,
    getTableById,
    updateTable,
    deleteTable
  } = require("../controllers/tableController");

router.post("/create-table", createTable);
router.get("/get-tables", getTables);
router.get("/get-table-by-id/:id", getTableById);
router.put("/update-table/:id", updateTable);
router.delete("/delete-table/:id", deleteTable);

module.exports = router;